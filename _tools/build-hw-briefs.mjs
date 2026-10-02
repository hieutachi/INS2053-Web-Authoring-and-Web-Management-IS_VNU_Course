/* =============================================================================
   build-hw-briefs.mjs — inject the detailed homework brief into every sheet.

     node _tools/build-hw-briefs.mjs            write
     node _tools/build-hw-briefs.mjs --check    report drift, write nothing

   WHAT IT DOES
   ------------
   `homework/session-NN/homework.md` and its Vietnamese twin under `i18n/vi/`
   carry the assignment itself: tasks, rubric, video brief. What they never had
   was the part a student actually needs on a Sunday night — what this homework
   is, why it matters, what "done" looks like, in which order to work, and how
   each half gets handed in.

   That content lives once per session in `_tools/hw-briefs.mjs`. This script
   splices it into all 30 sources as one new level-2 section placed directly
   after `## Requirements`, so the sheet reads as a single flow:

     Objective -> Requirements (the spec) -> Detailed Brief (how to do it and
     how to hand it in) -> Part 2 video -> Save-your-work -> Rubric

   IDEMPOTENCE
   -----------
   The injected block is wrapped in HTML comment markers. Re-running replaces
   everything between them, so editing `hw-briefs.mjs` and rebuilding is the
   only workflow; hand-editing the generated section inside a sheet is not — it
   will be overwritten. Lecturers edit the data file instead.

   WHY MARKDOWN SOURCES AND NOT THE BUILDER
   ----------------------------------------
   The site builder (`build-site.mjs`) renames machine headings and strips
   deadline wording before publishing. Anything it invented would exist only on
   the website, and the repository copy a student clones would stay thin.
   Writing into the sources means both copies tell the same story, and the
   translation tree keeps its normal rule: Vietnamese prose comes from
   `i18n/vi/`, never from a machine pass.
   ============================================================================= */

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BRIEFS } from "./hw-briefs.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const START = "<!-- HW-BRIEF:START -->";
const END = "<!-- HW-BRIEF:END -->";

/** Headings of the injected section, per language. */
const HEAD = {
  en: {
    self: "Detailed Brief — Read This First",
    scenario: "What you are actually building",
    why: "Why this homework exists",
    demo: "What \u201cdone\u201d looks like",
    steps: "How to work through it",
    pitfalls: "Where students lose marks",
    files: "Files this homework must produce",
    submit: "How to hand it in",
    codeHead: "Part 1 — the code",
    videoHead: "Part 2 — the video",
    checkHead: "Before you push",
  },
  vi: {
    self: "M\u00f4 t\u1ea3 chi ti\u1ebft — h\u00e3y \u0111\u1ecdc ph\u1ea7n n\u00e0y tr\u01b0\u1edbc",
    scenario: "B\u1ea1n th\u1ef1c s\u1ef1 \u0111ang x\u00e2y g\u00ec",
    why: "V\u00ec sao b\u00e0i t\u1eadp n\u00e0y t\u1ed3n t\u1ea1i",
    demo: "\u201cXong\u201d nh\u00ecn nh\u01b0 th\u1ebf n\u00e0o",
    steps: "C\u00e1ch l\u00e0m t\u1eebng b\u01b0\u1edbc",
    pitfalls: "N\u01a1i sinh vi\u00ean m\u1ea5t \u0111i\u1ec3m",
    files: "File b\u00e0i t\u1eadp ph\u1ea3i t\u1ea1o ra",
    submit: "C\u00e1ch n\u1ed9p b\u00e0i",
    codeHead: "Ph\u1ea7n 1 — ph\u1ea7n code",
    videoHead: "Ph\u1ea7n 2 — ph\u1ea7n video",
    checkHead: "Tr\u01b0\u1edbc khi push",
  },
};

/** Hand-in prose, keyed by language then session. */
const SUBMIT = {
  en: {
    intro:
      "This homework has two halves, handed in together and marked separately: **Part 1 code (10 points)** and **Part 2 video (4 points)**. Online submission is not enabled yet, so your own Git repository is the submission.",
    code: [
      "Make sure every file listed above exists at exactly that path — the grader looks up files by path, and a page parked somewhere else simply does not exist for it.",
      "Stage the work: `git add homework/session-{nn}/ project/` (add only what this session touched).",
      "Commit with a message that says what changed: `git commit -m \"HW{N}: <short summary>\"`.",
      "Push: `git push`. A commit that stayed on your laptop is not a submission.",
    ],
    video: [
      "Record 60–120 seconds in OBS Studio (<https://obsproject.com>): screen shared the whole time, your voice required, name and student ID stated or visible at the start.",
      "Present ONE part of this homework, not all of it. For this session: {topic}",
      "Upload the MP4 (720p or higher) to **your own Google Drive** and set sharing to **“Anyone with the link → Viewer”**.",
      "Open `homework/submissions.md` in your repository and add one line: `- Session {nn} — (paste your Google Drive link here)`.",
      "Commit and push that file together with the rest of the homework. A missing, private or dead link means the video cannot be graded.",
    ],
    check: [
      "Tick the requirements checklist under Requirements, item by item, against the actual file rather than from memory.",
      "Open the self-check tool (`site/cham-bai.html`), pick session {n}, point it at your repository folder or paste your code, and fix what it flags. It reports AUTO / MANUAL / BLOCKED — AUTO is what a machine confirmed, MANUAL is still your lecturer's call.",
      "Save the result card (screenshot showing the hash, Print → PDF, Download JSON) so you can prove what you submitted.",
    ],
  },
  vi: {
    intro:
      "Bài tập này gồm hai phần, nộp cùng nhau và chấm riêng: **Phần 1 code (10 điểm)** và **Phần 2 video (4 điểm)**. Việc nộp bài trực tuyến chưa mở, nên repository Git của bạn chính là nơi nộp.",
    code: [
      "Bảo đảm mọi file liệt kê ở trên tồn tại đúng đường dẫn đó — công cụ chấm tìm file theo đường dẫn, nên một trang đặt chỗ khác coi như không tồn tại.",
      "Thêm vào staging: `git add homework/session-{nn}/ project/` (chỉ thêm những gì buổi này động tới).",
      "Commit với message nói rõ đã đổi gì: `git commit -m \"HW{N}: <tóm tắt ngắn>\"`.",
      "Push: `git push`. Một commit nằm lại trên laptop không phải là bài nộp.",
    ],
    video: [
      "Quay 60–120 giây bằng OBS Studio (<https://obsproject.com>): chia sẻ màn hình suốt buổi, bắt buộc có giọng nói của bạn, tên và mã số sinh viên nói ra hoặc hiện trên màn hình ở đầu video.",
      "Trình bày MỘT phần của bài tập này thôi, không phải tất cả. Với buổi này: {topic}",
      "Tải file MP4 (720p trở lên) lên **Google Drive của chính bạn** và đặt quyền chia sẻ là **“Ai có liên kết → Xem”**.",
      "Mở `homework/submissions.md` trong repository và thêm một dòng: `- Session {nn} — (dán link Google Drive của bạn vào đây)`.",
      "Commit và push file đó cùng phần còn lại của bài tập. Link thiếu, để riêng tư hoặc hỏng nghĩa là phần video không chấm được.",
    ],
    check: [
      "Tick từng mục trong danh sách kiểm tra ở phần Yêu cầu, đối chiếu với file thật chứ không đoán từ trí nhớ.",
      "Mở công cụ tự chấm (`site/cham-bai.html`), chọn buổi {n}, trỏ tới thư mục repository hoặc dán code, rồi sửa những gì nó báo. Công cụ trả về AUTO / MANUAL / BLOCKED — AUTO là điểm máy xác nhận được, MANUAL vẫn thuộc phán quyết của giảng viên.",
      "Lưu thẻ kết quả (ảnh chụp thấy cả hash, Print → PDF, Download JSON) để bạn chứng minh được mình đã nộp gì.",
    ],
  },
};

const pad = (n) => String(n).padStart(2, "0");
const bullets = (items) => items.map((s) => `- ${s}`).join("\n");
const numbered = (items) => items.map((s, i) => `${i + 1}. ${s}`).join("\n");

/** Fill {nn}/{n}/{N}/{topic} placeholders in the hand-in copy. */
function fill(text, vars) {
  return text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

/** Build the injected markdown section for one session in one language. */
export function briefSection(nn, lang) {
  const brief = BRIEFS[Number(nn)]?.[lang];
  const H = HEAD[lang];
  const S = SUBMIT[lang];
  if (!brief || !H || !S) throw new Error(`no ${lang} brief for session ${nn}`);

  const vars = { nn, n: Number(nn), N: Number(nn), topic: brief.videoTopic };
  const f = (text) => fill(text, vars);

  const parts = [
    START,
    `## ${H.self}`,
    "",
    `### ${H.scenario}`,
    "",
    brief.scenario,
    "",
    `### ${H.why}`,
    "",
    bullets(brief.why),
    "",
    `### ${H.demo}`,
    "",
    brief.demo,
    "",
    `### ${H.steps}`,
    "",
    numbered(brief.steps.map(f)),
    "",
    `### ${H.pitfalls}`,
    "",
    bullets(brief.pitfalls),
    "",
    `### ${H.files}`,
    "",
    bullets(brief.files),
    "",
    `### ${H.submit}`,
    "",
    f(S.intro),
    "",
    `**${H.codeHead}**`,
    "",
    numbered(S.code.map(f)),
    "",
    `**${H.videoHead}**`,
    "",
    numbered(S.video.map(f)),
    "",
    `**${H.checkHead}**`,
    "",
    numbered(S.check.map(f)),
    "",
    END,
  ];
  return parts.join("\n");
}

/**
 * Split a document into the two parts around the injection point. Written on
 * `\n` lines — the caller normalises CRLF first and restores it afterwards.
 *
 * The insertion point is the level-2 heading that closes the `## Requirements`
 * block, found while tracking fenced blocks: sessions 8 and 11 embed markdown
 * samples whose own `## ` lines would otherwise read as real headings.
 */
function splitForInject(lines) {
  const start = lines.findIndex((l) => /^## (Requirements|Yêu cầu)\s*$/.test(l));
  if (start === -1) throw new Error("no '## Requirements' heading found");

  let fence = false;
  let insertAt = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^```/.test(lines[i])) {
      fence = !fence;
      continue;
    }
    if (!fence && /^## /.test(lines[i])) {
      insertAt = i;
      break;
    }
  }

  const trim = (arr) => {
    const a = arr.slice();
    while (a.length && !a[a.length - 1].trim()) a.pop();
    while (a.length && !a[0].trim()) a.shift();
    return a;
  };
  return { before: trim(lines.slice(0, insertAt)), after: trim(lines.slice(insertAt)) };
}

/** Rebuild the document from its three parts. Idempotent by construction. */
export function renderBrief(markdown, section) {
  const eol = markdown.includes("\r\n") ? "\r\n" : "\n";
  const lines = markdown.split("\r\n").join("\n").split("\n");

  // Drop a previous block wholesale: everything between the two marker lines.
  const si = lines.indexOf(START);
  const ei = lines.indexOf(END);
  const bare = si !== -1 && ei > si ? [...lines.slice(0, si), ...lines.slice(ei + 1)] : lines;

  const { before, after } = splitForInject(bare);
  return [...before, "", ...section.split("\n"), "", ...after].join(eol) + eol;
}

const TARGETS = [];
for (let n = 1; n <= 15; n++) {
  const nn = pad(n);
  TARGETS.push({
    n,
    lang: "en",
    file: path.join(ROOT, "homework", `session-${nn}`, "homework.md"),
  });
  TARGETS.push({
    n,
    lang: "vi",
    file: path.join(ROOT, "i18n", "vi", "homework", `session-${nn}`, "homework.md"),
  });
}

async function main() {
  const check = process.argv.includes("--check");
  let changed = 0;
  let missing = 0;

  for (const t of TARGETS) {
    if (!existsSync(t.file)) {
      console.log(`MISSING ${path.relative(ROOT, t.file)}`);
      missing++;
      continue;
    }
    const current = await readFile(t.file, "utf8");
    const wanted = renderBrief(current, briefSection(pad(t.n), t.lang));
    if (wanted === current) continue;
    changed++;
    if (check) {
      console.log(`DRIFT   ${path.relative(ROOT, t.file)}`);
    } else {
      await writeFile(t.file, wanted, "utf8");
      console.log(`wrote   ${path.relative(ROOT, t.file)}`);
    }
  }

  if (check) {
    console.log(
      missing
        ? `\n${missing} source(s) missing, ${changed} out of date — run: node _tools/build-hw-briefs.mjs`
        : changed
          ? `\n${changed} of ${TARGETS.length} sheet(s) out of date — run: node _tools/build-hw-briefs.mjs`
          : `\nall ${TARGETS.length} sheets carry the current brief`
    );
    if (missing || changed) process.exitCode = 1;
    return;
  }
  console.log(
    `\n${changed} of ${TARGETS.length} sheet(s) updated` +
      (missing ? ` — ${missing} source(s) missing!` : "")
  );
  if (missing) process.exitCode = 1;
}

main().catch((err) => {
  console.error(`\n  FAIL  ${err.message}`);
  process.exitCode = 1;
});
