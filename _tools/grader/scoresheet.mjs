#!/usr/bin/env node
/* =============================================================================
   BẢNG ĐIỂM GIẢNG VIÊN — quét thư mục JSON sinh viên nộp, xuất bảng tổng hợp.

   node _tools/grader/scoresheet.mjs <thư-mục-chứa-json> [-o bang-diem.csv]

   Quy trình nộp bài (xem HUONG-DAN-cham-bai.md):
     1. Sinh viên tự chấm tại /cham-bai.html, bấm "Tải JSON" lưu về máy.
     2. Đổi tên file thành  MSSV-HW<buổi>.json  (vd 2151012345-HW03.json),
        gửi giảng viên qua kênh lớp (email / Drive / LMS).
     3. Giảng viên gom tất cả JSON vào MỘT thư mục, chạy lệnh trên.
     4. Script đọc từng file, KIỂM TRA LẠI (SHA-256 + điểm máy, cùng cơ chế
       regrade.mjs), xuất bảng điểm — mỗi SV một dòng, mỗi buổi một cột.

   Script CHỈ ĐỌC. Không sửa JSON, không gửi gì đi.
   Cột "máy" = điểm AUTO+ASSIST máy chốt; "m" = điểm MANUAL GV phải tự chấm.
   KHÔNG có cột điểm cuối — GV chốt điểm.
   ============================================================================= */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { buildContext, gradeSubmission, canonicalBytes } from "./src/grade.js";

const HERE = dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const outIdx = args.indexOf("-o");
const outPath = outIdx > -1 ? args[outIdx + 1] : null;
const skip = new Set(args.flatMap((a, i) => (a === "-o" ? [i, i + 1] : [])));
const dir = args.find((_, i) => !skip.has(i));

if (!dir) {
  console.error("Dùng: node _tools/grader/scoresheet.mjs <thư mục JSON> [-o bang-diem.csv]");
  console.error("Tên file JSON nên là MSSV-HW<buổi>.json, ví dụ 2151012345-HW03.json");
  process.exit(2);
}

let names;
try {
  names = readdirSync(dir).filter((n) => n.toLowerCase().endsWith(".json")).sort();
} catch (err) {
  console.error(`Không đọc được thư mục: ${err.message}`);
  process.exit(2);
}
if (!names.length) {
  console.error(`Không có file JSON nào trong ${dir}`);
  process.exit(2);
}

const sessionNames = new Map(); // NN -> rubric title
const students = new Map();     // MSSV -> record
const problems = [];

for (const name of names) {
  let saved;
  try {
    saved = JSON.parse(readFileSync(join(dir, name), "utf8"));
  } catch (err) {
    problems.push(`${name}: JSON hỏng — ${err.message}`);
    continue;
  }
  const files = saved.submission;
  const sessionKey = String(saved.session ?? "").padStart(2, "0");
  if (!Array.isArray(files) || !files.length || sessionKey === "00") {
    problems.push(`${name}: không phải JSON xuất từ cham-bai.html (thiếu submission/session).`);
    continue;
  }

  let rubric;
  try {
    rubric = JSON.parse(readFileSync(join(HERE, "rubrics", `session-${sessionKey}.json`), "utf8"));
  } catch {
    problems.push(`${name}: không có rubric cho buổi ${sessionKey}.`);
    continue;
  }
  if (!sessionNames.has(sessionKey)) sessionNames.set(sessionKey, rubric.title);

  /* integrity — same recipe as regrade.mjs */
  const digest = createHash("sha256").update(canonicalBytes(files), "utf8").digest("hex").slice(0, 8);
  const report = gradeSubmission(rubric, buildContext(files));
  const stored = saved.report ?? {};
  const s = saved.student ?? {};
  const mssv = s.id || s.mssv || basename(name, ".json").split("-")[0] || "(không MSSV)";

  const flags = [];
  if (saved.contentDigestSha256 && saved.contentDigestSha256 !== digest) {
    flags.push("SỬA-SAU-KHI-CHẤM");
  } else if (!saved.contentDigestSha256) {
    flags.push("KHÔNG-CÓ-SHA");
  }
  const near = (a, b) => Math.abs((a ?? 0) - (b ?? 0)) <= 0.005;
  if (!near(stored.autoAwarded, report.autoAwarded) || !near(stored.autoPoints, report.autoPoints)) {
    flags.push(`CHẤM-LẠI-LỆCH ${report.autoAwarded}/${report.autoPoints}`);
  }

  if (!students.has(mssv)) students.set(mssv, { name: "(không tên)", klass: "—", sessions: new Map() });
  const st = students.get(mssv);
  if (s.name) st.name = s.name;
  if (s.klass || s["class"]) st.klass = s.klass || s["class"];
  st.sessions.set(sessionKey, {
    file: name,
    auto: report.autoAwarded,
    autoMax: report.autoPoints,
    manual: report.manualPoints,
    blocked: report.blockedPoints,
    source: saved.source ?? "—",
    gradedAt: saved.gradedAt?.iso ?? "—",
    sha: saved.contentDigestSha256 ?? "—",
    flags,
  });
}

/* --- console table ----------------------------------------------------------- */
const sessions = [...sessionNames.keys()].sort();
const order = [...students.entries()].sort((a, b) => String(a[1].name).localeCompare(String(b[1].name), "vi"));

console.log(`BẢNG ĐIỂM MÁY — ${order.length} sinh viên, ${names.length} file JSON, buổi ${sessions.join(", ")}`);
console.log(`(Điểm máy = AUTO+ASSIST đã chốt. Điểm m + "chưa chấm được" GV phải xem.)\n`);

const header = "MSSV".padEnd(13) + "Họ tên".padEnd(24) + "Lớp".padEnd(14)
  + sessions.map((s) => `HW${+s} máy/m`).map((h) => h.padEnd(12)).join("")
  + "GHI CHÚ";
console.log(header);
console.log("-".repeat(header.length));

for (const [mssv, st] of order) {

/* --- CSV export (UTF-8 BOM so Excel mở thẳng) --------------------------------- */
if (outPath) {
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const head = ["MSSV", "Ho ten", "Lop"]
    .concat(sessions.flatMap((s) => [
      `HW${+s} may`, `HW${+s} autoMax`, `HW${+s} manual`, `HW${+s} blocked`,
      `HW${+s} flags`, `HW${+s} sha`,
    ]))
    .map(esc).join(",");
  const lines = [head];
  for (const [mssv, st] of order) {
    const row = [mssv, st.name, st.klass];
    for (const s of sessions) {
      const r = st.sessions.get(s);
      row.push(r ? r.auto : "", r ? r.autoMax : "", r ? r.manual : "", r ? r.blocked : "",
        r ? r.flags.join("; ") : "", r ? r.sha : "");
    }
    lines.push(row.map(esc).join(","));
  }
  writeFileSync(outPath, "\uFEFF" + lines.join("\r\n") + "\r\n", "utf8");
  console.log(`\nĐã ghi CSV (mở bằng Excel, UTF-8 BOM): ${outPath}`);
}

  let line = mssv.padEnd(13) + st.name.slice(0, 22).padEnd(24) + st.klass.slice(0, 12).padEnd(14);
  const notes = [];
  for (const s of sessions) {
    const r = st.sessions.get(s);
    if (!r) { line += "—".padEnd(12); continue; }
    line += `${r.auto}/${r.autoMax} ${r.manual}m`.padEnd(12);
    for (const f of r.flags) notes.push(`HW${+s}: ${f}`);
  }
  console.log(line + (notes.length ? notes.join("; ") : ""));
}

if (problems.length) {
  console.log(`\nCẦN XEM — ${problems.length} file có vấn đề:`);
  for (const p of problems) console.log("  " + p);
}
