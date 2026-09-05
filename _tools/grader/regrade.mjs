/* =============================================================================
   Re-grade a saved submission from the JSON the student handed in.

     node _tools/grader/regrade.mjs <file.json>

   Why this exists: the PNG/PDF card is for the student, the JSON is the record.
   A score nobody can reproduce is a claim, not a measurement — so the JSON keeps
   the exact bytes that were graded, and this script runs the current rubric over
   them again and prints any disagreement.

   Three things it verifies, in order of how badly they matter:

     1. The SHA-256 digest still matches the stored files. A mismatch means the
        JSON was edited after grading.
     2. The rows score the same as the stored report. A mismatch usually means the
        rubric changed since the student ran the tool — which is legitimate, but
        the marker has to know before entering a grade.
     3. The stored tool version. An older version is not an error; it is context.

   Reads only. Writes nothing, sends nothing.
   ============================================================================= */

import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildContext, gradeSubmission, canonicalBytes } from "./src/grade.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const arg = process.argv[2];

if (!arg) {
  console.error("Dùng: node _tools/grader/regrade.mjs <file JSON của sinh viên>");
  process.exit(2);
}

let saved;
try {
  saved = JSON.parse(readFileSync(arg, "utf8"));
} catch (err) {
  console.error(`Không đọc được JSON: ${err.message}`);
  process.exit(2);
}

const files = saved.submission;
if (!Array.isArray(files) || !files.length) {
  console.error(
    "JSON không có mục \"submission\" (bài nộp dạng văn bản).\n" +
    "File này xuất từ phiên bản công cụ cũ. Chấm lại bằng cách mở cham-bai.html\n" +
    "và dán lại bài, hoặc dùng link GitHub kèm commit SHA in trên thẻ kết quả."
  );
  process.exit(2);
}

const sessionKey = String(saved.session ?? "").padStart(2, "0");
let rubric;
try {
  rubric = JSON.parse(readFileSync(join(HERE, "rubrics", `session-${sessionKey}.json`), "utf8"));
} catch {
  console.error(`Không có rubric cho buổi "${saved.session}".`);
  process.exit(2);
}

/* --- 1. digest ------------------------------------------------------------- */
/* canonicalBytes() is the single source of the recipe, shared with the browser's
   digestOf() in src/ui.js. If the two ever diverged, every honest submission
   would look tampered with. */
const digest = createHash("sha256").update(canonicalBytes(files), "utf8").digest("hex").slice(0, 8);

/* --- 2. re-grade ----------------------------------------------------------- */
const report = gradeSubmission(rubric, buildContext(files));

const problems = [];
const stored = saved.report ?? {};

if (saved.contentDigestSha256 && saved.contentDigestSha256 !== digest) {
  problems.push(
    `SHA-256 không khớp: JSON ghi ${saved.contentDigestSha256}, nội dung thật là ${digest} ` +
    "— file đã bị sửa sau khi chấm."
  );
} else if (!saved.contentDigestSha256) {
  problems.push("JSON không có SHA-256 (trình duyệt của sinh viên không tính được).");
}

const near = (a, b) => Math.abs((a ?? 0) - (b ?? 0)) <= 0.005;
if (!near(stored.autoAwarded, report.autoAwarded) || !near(stored.autoPoints, report.autoPoints)) {
  problems.push(
    `Điểm máy chấm lệch: JSON ghi ${stored.autoAwarded}/${stored.autoPoints}, ` +
    `chấm lại ra ${report.autoAwarded}/${report.autoPoints}.`
  );
}

const savedRows = new Map((stored.rows ?? []).map((r) => [r.id, r]));
for (const row of report.rows) {
  const old = savedRows.get(row.id);
  if (!old) { problems.push(`Dòng "${row.id}" không có trong JSON — rubric đã đổi.`); continue; }
  if (old.state !== row.state || !near(old.awarded, row.awarded)) {
    problems.push(
      `${row.id}: JSON ${old.state} ${old.awarded ?? "—"}/${old.points} ` +
      `→ chấm lại ${row.state} ${row.awarded ?? "—"}/${row.points}`
    );
  }
}
for (const id of savedRows.keys()) {
  if (!report.rows.some((r) => r.id === id)) problems.push(`Dòng "${id}" trong JSON không còn trong rubric.`);
}

/* --- 3. report ------------------------------------------------------------- */
const s = saved.student ?? {};
console.log(`Bài: ${s.name || "(không tên)"} · MSSV ${s.id || "—"} · Lớp ${s.klass || s.class || "—"}`);
console.log(`Buổi ${sessionKey} — ${rubric.title}`);
console.log(`Nguồn: ${saved.source ?? "—"}`);
console.log(`Chấm lần đầu: ${saved.gradedAt?.iso ?? "—"} · công cụ v${saved.tool?.version ?? "?"}`);
console.log(`SHA-256 tính lại: ${digest}`);
console.log("");
console.log(`Máy chấm được : ${report.autoAwarded} / ${report.autoPoints}`);
console.log(`Chờ người xem : ${report.manualPoints} điểm (dòng MANUAL)`);
console.log(`Chưa chấm được: ${report.blockedPoints} điểm (thiếu file, không trừ)`);
console.log(`Tổng rubric   : ${report.total} điểm — điểm cuối do giảng viên chốt`);
console.log("");
for (const row of report.rows) {
  const mark = row.state === "graded" ? `${row.awarded}/${row.points}` : `—/${row.points}`;
  console.log(`  ${row.tier.padEnd(6)} ${row.state.padEnd(7)} ${mark.padEnd(9)} ${row.criteria}`);
}

if (problems.length) {
  console.log("");
  console.error(`REGRADE KHÁC — ${problems.length} điểm cần xem:`);
  for (const p of problems) console.error("  " + p);
  process.exit(1);
}
console.log("");
console.log("REGRADE KHỚP — JSON không bị sửa và rubric hiện tại cho cùng kết quả");
