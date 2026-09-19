/* =============================================================================
   Build the instructor-only verification page.

     node _tools/build-verify.mjs "<thư mục JSON>" [thư mục khác…] [--site]

   Output   _tools/verify/kiem-tra-bai.html   (default — máy GV, không deploy)
            site/kiem-tra-bai.html            (chỉ khi có --site, opt-in)

   Trang này KHÔNG dành cho sinh viên: nó nhúng toàn bộ JSON bài nộp của lớp
   và bảng điểm tổng hợp. Vì vậy nó không bao giờ nằm trong site/ mặc định —
   bản chính là file local mở bằng file://. Bản --site có `robots noindex`
   nhưng chỉ là "không được liệt kê", không phải bí mật: GitHub hiện mọi file
   đã commit, và bất kỳ ai đoán đúng URL cũng thấy trang. Builder in cảnh báo
   đó MỖI lần ghi bản --site.

   Engine chấm (html-parse/css-parse/checks/grade) được nhúng từ
   build-grader-lib.mjs — y hệt build của cham-bai.html, nên trang này không
   bao giờ lệch với trang sinh viên.
   ============================================================================= */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SRC, CORE_MODULES, loadRubrics, wrapModuleFile, inlineConst,
} from "./build-grader-lib.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_LOCAL = join(HERE, "verify", "kiem-tra-bai.html");
const OUT_SITE = join(HERE, "..", "site", "kiem-tra-bai.html");

const args = process.argv.slice(2);
const wantSite = args.includes("--site");
const dirs = args.filter((a) => !a.startsWith("--"));

if (!dirs.length) {
  console.error('Dùng: node _tools/build-verify.mjs "<thư mục JSON>" [thư mục khác…] [--site]');
  console.error('Ví dụ: node _tools/build-verify.mjs "../nop-hw03" "../nop-hw04"');
  process.exit(2);
}

/* --- collect payloads ------------------------------------------------------- */

const payloads = [];
const problems = [];

for (const dir of dirs) {
  let names;
  try {
    names = readdirSync(dir).filter((n) => n.toLowerCase().endsWith(".json")).sort();
  } catch (err) {
    console.error(`VERIFY BUILD FAIL — không đọc được thư mục ${dir}: ${err.message}`);
    process.exit(2);
  }
  for (const name of names) {
    try {
      const saved = JSON.parse(readFileSync(join(dir, name), "utf8"));
      if (!Array.isArray(saved.submission) || !saved.submission.length) {
        problems.push(`${name}: không có "submission" — bỏ qua.`);
        continue;
      }
      if (saved.session === undefined || saved.session === null || saved.session === "") {
        problems.push(`${name}: không có "session" — bỏ qua.`);
        continue;
      }
      saved._file = name; // shown on the card; prefixed so the wrapper never clobbers a real field
      payloads.push(saved);
    } catch (err) {
      problems.push(`${name}: JSON hỏng — ${err.message}`);
    }
  }
}

if (!payloads.length) {
  console.error("VERIFY BUILD FAIL — không có JSON hợp lệ nào (cần trường submission + session).");
  for (const p of problems) console.error("  " + p);
  process.exit(2);
}

let rubrics;
try {
  ({ rubrics } = loadRubrics());
} catch (err) {
  console.error(`VERIFY BUILD FAIL — ${err.message}`);
  process.exit(1);
}

/* --- assemble ---------------------------------------------------------------- */

const parts = [];
parts.push(inlineConst("RUBRICS", rubrics,
  "/* Rubric inlined — cùng một build với cham-bai.html, không thể lệch. */"));
parts.push("");

for (const file of CORE_MODULES) {
  parts.push(wrapModuleFile(file));
  parts.push("");
}

parts.push(inlineConst("PAYLOADS", payloads,
  "/* Bài nộp của sinh viên — chỉ đọc trong trình duyệt, không gửi đi đâu. */"));
parts.push("");

// verify.js is a plain classic script (no imports/exports) — appended as-is.
parts.push(readFileSync(join(SRC, "verify.js"), "utf8"));

const css = readFileSync(join(SRC, "verify.css"), "utf8").trim();
const template = readFileSync(join(SRC, "verify.template.html"), "utf8");

if (!template.includes("/*VERIFY_CSS*/") || !template.includes("/*VERIFY_JS*/")) {
  console.error("VERIFY BUILD FAIL — template thiếu /*VERIFY_CSS*/ hoặc /*VERIFY_JS*/");
  process.exit(1);
}

// Replacer functions, not strings: `$&` and friends inside the CSS or JS would
// otherwise be interpreted as replacement patterns and corrupt the output.
const html = template
  .replace("/*VERIFY_CSS*/", () => css)
  .replace("/*VERIFY_JS*/", () => parts.join("\n"));

/* --- write -------------------------------------------------------------------- */

mkdirSync(dirname(OUT_LOCAL), { recursive: true });
writeFileSync(OUT_LOCAL, html, "utf8");

const kb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(0);
const flagged = problems.length;
console.log(`VERIFY BUILD OK — _tools/verify/kiem-tra-bai.html (${kb} KB, ${payloads.length} bài nộp${flagged ? `, ${flagged} file bỏ qua` : ""})`);
for (const p of problems) console.log("  " + p);
console.log("Bản local KHÔNG bao giờ được build-site publish (_tools/ nằm trong NEVER_PUBLISH).");

if (wantSite) {
  mkdirSync(dirname(OUT_SITE), { recursive: true });
  writeFileSync(OUT_SITE, html, "utf8");
  console.log("");
  console.log("┌─ CẢNH BÁO ────────────────────────────────────────────────────────────────┐");
  console.log("│ Đã ghi site/kiem-tra-bai.html — file chứa bài nộp CỦA CẢ LỚP.            │");
  console.log("│ File này chỉ 'không được liệt kê' (noindex), KHÔNG phải bí mật:          │");
  console.log("│ GitHub hiện mọi file đã commit, ai đoán đúng URL cũng xem được.          │");
  console.log("│ Chỉ dùng khi thật sự cần truy cập từ xa, và nhớ xóa khỏi site/ trước     │");
  console.log("│ khi publish lại cho sinh viên.                                           │");
  console.log("└───────────────────────────────────────────────────────────────────────────┘");
}
