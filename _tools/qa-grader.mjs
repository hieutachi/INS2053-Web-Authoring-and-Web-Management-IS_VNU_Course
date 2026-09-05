/* =============================================================================
   QA gate for the homework autograder.

     node _tools/qa-grader.mjs

   Prints GRADER QA PASS and exits 0, or lists every problem and exits 1.
   Touches nothing: reads rubrics and fixtures, grades them in memory.

   Eleven gates, each guarding a specific way this tool could quietly start lying
   to a student:

     G1  rubrics load, match the schema, and total exactly 10
     G2  every session has a pass fixture, a fail fixture and expected.json
     G3  the pass fixture earns full marks — a correct submission must not be
         punished for a grader bug
     G4  the fail fixture loses marks on the rows it was built to fail
     G5  an empty submission is BLOCKED, never zero
     G6  scores match expected.json — catches silent drift when a check changes
     G7  no check crashed, no unknown check type, no parse error
     G8  results are deterministic, and no check type is dead weight
     G9  no rubric line that needs human judgement is marked tier "auto"
     G10 cham-bai.html is self-contained and executes nothing from a submission
     G11 no exam or project-rubric content leaked into the grader
   ============================================================================= */

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildContext, gradeSubmission, validateRubric, isTextPath } from "./grader/src/grade.js";
import { CHECK_TYPES } from "./grader/src/checks.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const GRADER = join(HERE, "grader");
const SESSIONS = Array.from({ length: 15 }, (_, i) => String(i + 1).padStart(2, "0"));

const problems = [];
const fail = (gate, msg) => problems.push(`[${gate}] ${msg}`);
const near = (a, b, eps = 0.005) =>
  typeof a === "number" && typeof b === "number" && Math.abs(a - b) <= eps;

/**
 * Every file under `dir`, shaped exactly as the browser would hand it in.
 *
 * Text files carry their contents; an image or media file carries its PATH with
 * empty text, because that is what `cham-bai.html` collects from a folder pick or
 * a GitHub tree. Reading everything as UTF-8 here — which is what this harness
 * used to do — made the gate blind by construction: the fixtures scored 10/10
 * under Node while the shipped page silently docked marks for "thiếu: images/"
 * on the very same folder.
 */
function walk(dir, base = dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, base, out);
    else {
      const rel = relative(base, p).replace(/\\/g, "/");
      out.push({ path: rel, text: isTextPath(rel) ? readFileSync(p, "utf8") : "" });
    }
  }
  return out;
}

const usedTypes = new Set();
let graded = 0;

for (const s of SESSIONS) {
  const tag = `session-${s}`;
  const rubricPath = join(GRADER, "rubrics", `${tag}.json`);
  const fixDir = join(GRADER, "fixtures", tag);

  /* --- G1: rubric loads, validates, totals 10 ----------------------------- */
  if (!existsSync(rubricPath)) { fail("G1", `${tag}: thiếu rubrics/${tag}.json`); continue; }
  let rubric;
  try {
    rubric = JSON.parse(readFileSync(rubricPath, "utf8"));
  } catch (err) {
    fail("G1", `${tag}: rubric không parse được — ${err.message}`);
    continue;
  }
  for (const p of validateRubric(rubric)) fail("G1", `${tag}: ${p}`);
  if (rubric.total !== 10) fail("G1", `${tag}: total = ${rubric.total}, phải đúng 10`);
  if (rubric.session !== Number(s)) fail("G1", `${tag}: session = ${rubric.session}, phải là ${Number(s)}`);
  for (const row of rubric.rows ?? []) {
    for (const c of row.checks ?? []) usedTypes.add(c.type);
  }

  /* --- G2: fixtures present ---------------------------------------------- */
  const passDir = join(fixDir, "pass");
  const failDir = join(fixDir, "fail");
  const expPath = join(fixDir, "expected.json");
  let missingFixture = false;
  for (const [label, p] of [["pass/", passDir], ["fail/", failDir], ["expected.json", expPath]]) {
    if (!existsSync(p)) { fail("G2", `${tag}: thiếu fixtures/${tag}/${label}`); missingFixture = true; }
  }
  if (missingFixture) continue;

  let expected;
  try {
    expected = JSON.parse(readFileSync(expPath, "utf8"));
  } catch (err) {
    fail("G2", `${tag}: expected.json không parse được — ${err.message}`);
    continue;
  }

  const inputs = { pass: walk(passDir), fail: walk(failDir), empty: [] };
  const reports = {};
  for (const [which, files] of Object.entries(inputs)) {
    if (which !== "empty" && !files.length) fail("G2", `${tag}: fixtures/${tag}/${which}/ rỗng`);
    reports[which] = gradeSubmission(rubric, buildContext(files));
  }
  graded++;

  const P = reports.pass;
  const F = reports.fail;
  const E = reports.empty;

  /* --- G3: a correct submission earns full marks -------------------------- */
  if (!near(P.autoAwarded, P.autoPoints)) {
    fail("G3", `${tag}: fixture pass chỉ được ${P.autoAwarded}/${P.autoPoints} — bài đúng phải đạt tối đa`);
    for (const row of P.rows) {
      for (const c of row.checks ?? []) {
        if (c.score01 !== null && c.score01 < 1) {
          fail("G3", `${tag}:   ${row.id}/${c.type} = ${c.score01} — ${c.detail}`);
        }
      }
    }
  }
  if (P.blockedPoints !== 0) {
    fail("G3", `${tag}: pass fixture bị blocked ${P.blockedPoints} điểm — fixture thiếu file rubric yêu cầu`);
  }
  if (!P.totalsAgree) fail("G3", `${tag}: rows cộng lại ${P.rowTotal}, total khai ${P.total}`);

  /* --- G4: the fail fixture actually loses marks -------------------------- */
  if (F.autoPoints > 0 && F.autoAwarded >= P.autoAwarded) {
    fail("G4", `${tag}: fixture fail được ${F.autoAwarded} ≥ pass ${P.autoAwarded} — fixture không kiểm tra được gì`);
  }
  if (!F.rows.some((r) => r.state === "graded" && r.awarded < r.points - 0.005)) {
    fail("G4", `${tag}: fixture fail không làm mất điểm ở bất kỳ dòng nào`);
  }

  /* --- G5: nothing submitted means BLOCKED, never zero -------------------- */
  if (E.autoPoints !== 0) {
    fail("G5", `${tag}: bài rỗng vẫn có ${E.autoPoints} điểm chấm tự động — một check trả 0 thay vì "chưa nộp"`);
    for (const row of E.rows) {
      for (const c of row.checks ?? []) {
        if (c.score01 !== null) fail("G5", `${tag}:   ${row.id}/${c.type} = ${c.score01} — ${c.detail}`);
      }
    }
  }
  if (E.autoAwarded !== 0) fail("G5", `${tag}: bài rỗng được ${E.autoAwarded} điểm`);
  if (E.autoPercent !== null) fail("G5", `${tag}: bài rỗng có autoPercent = ${E.autoPercent}, phải là null`);
  const expectBlocked = Math.round((10 - E.manualPoints) * 100) / 100;
  if (!near(E.blockedPoints, expectBlocked)) {
    fail("G5", `${tag}: bài rỗng blocked ${E.blockedPoints} điểm, phải là ${expectBlocked}`);
  }

  /* --- G6: scores match expected.json ------------------------------------- */
  for (const [which, exp] of Object.entries(expected.cases ?? {})) {
    const got = reports[which];
    if (!got) { fail("G6", `${tag}: expected.json có case "${which}" nhưng qa không chạy case đó`); continue; }
    for (const key of ["autoAwarded", "autoPoints", "blockedPoints", "manualPoints"]) {
      if (exp[key] === undefined) continue;
      if (!near(got[key], exp[key])) {
        fail("G6", `${tag}/${which}: ${key} = ${got[key]}, expected.json ghi ${exp[key]}`);
      }
    }
    if (exp.autoPercent !== undefined && got.autoPercent !== exp.autoPercent) {
      fail("G6", `${tag}/${which}: autoPercent = ${got.autoPercent}, expected.json ghi ${exp.autoPercent}`);
    }
    for (const [rowId, expRow] of Object.entries(exp.rows ?? {})) {
      const gotRow = got.rows.find((r) => r.id === rowId);
      if (!gotRow) { fail("G6", `${tag}/${which}: expected.json nói tới row "${rowId}" không có trong rubric`); continue; }
      if (expRow.state && gotRow.state !== expRow.state) {
        fail("G6", `${tag}/${which}/${rowId}: state = ${gotRow.state}, expected ${expRow.state}`);
      }
      if (expRow.awarded === null ? gotRow.awarded !== null : !near(gotRow.awarded, expRow.awarded)) {
        fail("G6", `${tag}/${which}/${rowId}: awarded = ${gotRow.awarded}, expected ${expRow.awarded}`);
      }
      if (Array.isArray(expRow.scores)) {
        if (expRow.scores.length !== gotRow.checks.length) {
          fail("G6", `${tag}/${which}/${rowId}: ${gotRow.checks.length} check, expected.json ghi ${expRow.scores.length}`);
        } else {
          gotRow.checks.forEach((c, i) => {
            const want = expRow.scores[i];
            // 0.0005 tolerance: expected.json stores 0.3333 for a third.
            const same = want === null ? c.score01 === null : near(c.score01, want, 0.0005);
            if (!same) {
              fail("G6", `${tag}/${which}/${rowId}: check[${i}] ${c.type} = ${c.score01}, expected ${want} — ${c.detail}`);
            }
          });
        }
      }
    }
  }

  /* --- G7: nothing crashed, nothing unparseable --------------------------- */
  for (const [which, rep] of Object.entries(reports)) {
    for (const pe of rep.parseErrors ?? []) {
      fail("G7", `${tag}/${which}: ${pe.path} không parse được — ${pe.message}`);
    }
    for (const row of rep.rows) {
      for (const c of row.checks ?? []) {
        if (/^rubric dùng check không tồn tại/.test(c.detail)) {
          fail("G7", `${tag}/${which}/${row.id}: ${c.detail}`);
        }
        if (/^lỗi khi chạy check/.test(c.detail)) {
          fail("G7", `${tag}/${which}/${row.id}: ${c.detail}`);
        }
        if (!c.detail.trim()) {
          fail("G7", `${tag}/${which}/${row.id}: check ${c.type} không giải thích gì (detail rỗng)`);
        }
      }
    }
  }

  /* --- G8a: same input, same report --------------------------------------- */
  const again = gradeSubmission(rubric, buildContext(inputs.fail));
  if (JSON.stringify(again) !== JSON.stringify(F)) {
    fail("G8", `${tag}: chấm lại cùng một bài ra kết quả khác — có state rò rỉ giữa các lần chạy`);
  }
}

/* --- G8b: no dead checks --------------------------------------------------- */
if (graded === SESSIONS.length) {
  const unused = CHECK_TYPES.filter((t) => !usedTypes.has(t));
  if (unused.length) {
    fail("G8", `check không rubric nào dùng: ${unused.join(", ")} — hoặc dùng nó, hoặc xoá nó`);
  }
}
for (const t of usedTypes) {
  if (!CHECK_TYPES.includes(t)) fail("G8", `rubric dùng check "${t}" không có trong checks.js`);
}

/* --- G9: rows a machine must not claim to judge -----------------------------
   These rubric lines were read in the real homework sheets and none of them can
   be settled by reading source: "own words", "alt text is descriptive", "looks
   professional", "readable", "every nav link clicks through", "zero errors on the
   W3C validator" (a network service this tool deliberately never calls), "looks
   good on mobile", "tested at several widths".

   The gate forbids tier "auto" rather than requiring tier "manual": a row may
   legitimately measure the mechanical half and hand the judgement over, which is
   what tier "assist" means and what its `note` has to spell out. What it may
   never do is print a number and call it final.
   -------------------------------------------------------------------------- */
const NEVER_AUTO = {
  "01": ["content"],
  "03": ["images-alt"],
  "04": ["overall-look"],
  "05": ["visual-quality"],
  "06": ["overall-consistency"],
  "07": ["readability"],
  "08": ["midterm-reflection", "project-links"],
  "11": ["content-quality", "visual-polish"],
  "12": ["html-validation", "css-validation"],
  "15": ["mobile-layout", "testing"],
};

for (const [s, ids] of Object.entries(NEVER_AUTO)) {
  const tag = `session-${s}`;
  const p = join(GRADER, "rubrics", `${tag}.json`);
  if (!existsSync(p)) continue;
  let rubric;
  try {
    rubric = JSON.parse(readFileSync(p, "utf8"));
  } catch { continue; }
  for (const id of ids) {
    const row = (rubric.rows ?? []).find((r) => r.id === id);
    if (!row) { fail("G9", `${tag}: không thấy row "${id}" — danh sách bắt buộc không-auto đã lệch khỏi rubric`); continue; }
    const tier = row.tier ?? "auto";
    if (tier === "auto") {
      fail("G9", `${tag}/${id}: tier="auto" nhưng dòng này người mới kết luận được — dùng "assist" hoặc "manual"`);
    }
    if (tier === "assist" && !String(row.note ?? "").trim()) {
      fail("G9", `${tag}/${id}: tier="assist" thì phải có note nói rõ máy KHÔNG kết luận được gì`);
    }
  }
}

/* --- G10: cham-bai.html is self-contained and inert -------------------------
   The built page is checked as a build artefact, the same way qa-site.mjs reads
   site/ from disk: what ships is what gets audited, not what the sources intend.
   -------------------------------------------------------------------------- */
const BUILT = join(GRADER, "cham-bai.html");
if (!existsSync(BUILT)) {
  fail("G10", "chưa có _tools/grader/cham-bai.html — chạy `node _tools/build-grader.mjs` trước");
} else {
  const page = readFileSync(BUILT, "utf8");
  // Comments describe the forbidden APIs by name, so the scan looks at code only.
  const code = page
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^[ \t]*\/\/.*$/gm, "");

  for (const [pattern, why] of [
    [/\beval\s*\(/, "eval("],
    [/new\s+Function\s*\(/, "new Function("],
    [/document\s*\.\s*write/, "document.write"],
    [/\.\s*innerHTML\s*=/, ".innerHTML ="],
    [/\.\s*outerHTML\s*=/, ".outerHTML ="],
    [/insertAdjacentHTML/, "insertAdjacentHTML"],
    [/\bsrcdoc\b/, "srcdoc"],
    [/new\s+DOMParser/, "DOMParser"],
  ]) {
    if (pattern.test(code)) {
      fail("G10", `cham-bai.html dùng ${why} — bài của sinh viên phải là dữ liệu, không được thực thi`);
    }
  }

  for (const m of code.matchAll(/<iframe\b[^>]*>/gi)) {
    if (!/\bsandbox\b/i.test(m[0])) fail("G10", `cham-bai.html có <iframe> thiếu sandbox: ${m[0].slice(0, 60)}`);
    if (/allow-scripts/i.test(m[0])) fail("G10", "cham-bai.html có <iframe sandbox> kèm allow-scripts");
    if (/allow-same-origin/i.test(m[0])) fail("G10", "cham-bai.html có <iframe sandbox> kèm allow-same-origin");
  }

  // Self-contained: inside the MARKUP only. The script region legitimately builds
  // strings like `href="${x}"` when quoting a student's own line back to them, and
  // scanning that as if it were a live reference gives a false alarm.
  const markup = code
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "");
  for (const m of markup.matchAll(/\b(?:src|href)\s*=\s*"([^"]*)"/gi)) {
    const v = m[1].trim();
    if (!v || v.startsWith("#") || v.startsWith("data:") || v.startsWith("blob:")) continue;
    fail("G10", `cham-bai.html tham chiếu file ngoài: ${v} — phải tự chứa hoàn toàn`);
  }

  // github.com itself is allowed as a literal because the GitHub tab has to
  // recognise the links students paste. What actually constrains the network is
  // connect-src below plus the fetch check: nothing is ever fetched from it.
  const HOST_OK = new Set(["api.github.com", "raw.githubusercontent.com", "github.com", "www.github.com"]);
  for (const m of code.matchAll(/https?:\/\/([a-z0-9.-]+)/gi)) {
    const h = m[1].toLowerCase();
    if (!HOST_OK.has(h)) fail("G10", `cham-bai.html nhắc tới host lạ: ${h}`);
  }
  // Every literal URL handed to fetch must be one of the two read-only hosts.
  for (const m of code.matchAll(/fetch\w*\s*\(\s*["'`](https?:\/\/[a-z0-9.-]+)/gi)) {
    const host = m[1].replace(/^https?:\/\//i, "").toLowerCase();
    if (host !== "api.github.com" && host !== "raw.githubusercontent.com") {
      fail("G10", `cham-bai.html fetch tới ${host} — chỉ được phép api.github.com và raw.githubusercontent.com`);
    }
  }

  const csp = page.match(/<meta\s+http-equiv="Content-Security-Policy"[^>]*?content="([^"]+)"/i);
  if (!csp) {
    fail("G10", "cham-bai.html thiếu <meta http-equiv=\"Content-Security-Policy\">");
  } else {
    if (!/default-src\s+'none'/.test(csp[1])) fail("G10", "CSP thiếu default-src 'none'");
    const connect = csp[1].match(/connect-src([^;]*)/i);
    const allowed = (connect?.[1] ?? "").trim().split(/\s+/).filter(Boolean).sort().join(" ");
    if (allowed !== "https://api.github.com https://raw.githubusercontent.com") {
      fail("G10", `CSP connect-src phải đúng hai host GitHub, đang là: ${allowed || "(trống)"}`);
    }
  }
  // Build freshness: every rubric G9 polices must be embedded in the artefact.
  // The digit boundary matters — a bare `includes('"session": 1')` is also true of
  // `"session": 15`, so dropping session 01 from the build would pass unnoticed.
  for (const key of Object.keys(NEVER_AUTO)) {
    if (!new RegExp(`"session":\\s*${Number(key)}\\D`).test(page)) {
      fail("G10", `cham-bai.html không chứa rubric buổi ${key} — build đã cũ, chạy lại build-grader.mjs`);
    }
  }
}

/* --- G11: no answer-key leakage ---------------------------------------------
   Checks for verbatim overlap of PROSE with exams/ and project/rubric.md, rather
   than for suspicious keywords. A keyword blocklist fires on legitimate rubric
   text — session 08 genuinely asks the student for the correct answer to each
   mistake — and a gate that cries wolf gets switched off.

   Markup is stripped before comparing, and only lines with 40+ characters of
   visible text count. Boilerplate like `<link rel="stylesheet" href="css/style.css">`
   is identical in every fixture and every sample solution for the obvious reason;
   flagging it would bury a real leak under 130 false alarms.
   -------------------------------------------------------------------------- */
const REPO = dirname(HERE);

/** Visible prose of one line, or "" if the line is pure markup/markdown scaffolding. */
const proseOf = (line) =>
  line
    .replace(/<[^>]*>/g, " ")                       // HTML tags
    .replace(/^\s*"[A-Za-z0-9_-]+"\s*:\s*/, " ")    // JSON key prefix: `"note": "…`
    .replace(/^[\s>#*\-|+]+/, " ")                  // markdown bullets, headings, quotes, table pipes
    .replace(/[`*_|"\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Lines of a file as prose, with JSON \n escapes expanded into real lines. */
const proseLines = (text) =>
  text
    // A leak pasted into a rubric is a JSON string value, where the line breaks are
    // the two characters \ and n rather than real newlines. Without expanding them
    // the whole paste stays on one physical line and matches nothing.
    .replace(/\\r/g, "")
    .replace(/\\n/g, "\n")
    .split(/\r?\n/)
    .map(proseOf)
    .filter((p) => p.length >= 40);

const secretSources = [];
for (const rel of ["exams", join("project", "rubric.md")]) {
  const p = join(REPO, rel);
  if (!existsSync(p)) continue;
  if (statSync(p).isDirectory()) secretSources.push(...walk(p).map((f) => ({ path: `${rel}/${f.path}`, text: f.text })));
  else secretSources.push({ path: rel.replace(/\\/g, "/"), text: readFileSync(p, "utf8") });
}

const secretLines = new Map();
for (const src of secretSources) {
  for (const prose of proseLines(src.text)) secretLines.set(prose, src.path);
}

for (const dir of ["rubrics", "src", "fixtures"]) {
  const root = join(GRADER, dir);
  if (!existsSync(root)) continue;
  for (const f of walk(root)) {
    for (const prose of proseLines(f.text)) {
      const from = secretLines.get(prose);
      if (from) {
        fail("G11", `${dir}/${f.path} chép nguyên một dòng từ ${from} — không đưa nội dung đề thi vào grader`);
      }
    }
  }
}

/* --- report --------------------------------------------------------------- */
if (problems.length) {
  console.error(`GRADER QA FAIL — ${problems.length} vấn đề\n`);
  for (const p of problems) console.error("  " + p);
  console.error("");
  process.exit(1);
}
console.log(`GRADER QA PASS — ${graded}/${SESSIONS.length} session, ${CHECK_TYPES.length} loại check`);
