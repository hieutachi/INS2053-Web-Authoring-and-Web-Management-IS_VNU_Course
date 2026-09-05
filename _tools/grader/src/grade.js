/* =============================================================================
   INS2053 grader — context builder and scorer. Pure functions, no DOM, no I/O.

     import { buildContext, gradeSubmission } from "./grade.js";

   Runs unchanged in Node (_tools/qa-grader.mjs) and in the browser (cham-bai.html).
   The caller supplies the files; how they were read — File API, paste box, or
   fs.readFileSync — is not this module's business.

   The scoring rule that matters
   -----------------------------
   A check that could not run because its file is missing returns `score01: null`.
   Those are dropped from the denominator, never scored zero. A submission with no
   `style.css` yet is INCOMPLETE, not wrong, and a report that says "2/10" for an
   unfinished upload teaches the student nothing except to distrust the tool.

   So every report carries three separate numbers:
     autoAwarded / autoPoints   what the machine could judge
     manualPoints               what only a human can judge
     blockedPoints              what nobody can judge yet, and why

   They are never added into a single "grade". The marker adds them.
   ============================================================================= */

import { parseHtml } from "./html-parse.js";
import { parseCss } from "./css-parse.js";
import { runCheck, CHECK_TYPES } from "./checks.js";

/**
 * The exact byte string a submission's SHA-256 is taken over.
 *
 * Lives here, not in ui.js, because two different runtimes hash it and they must
 * agree forever: the browser (crypto.subtle, printed on the result card) and Node
 * (_tools/grader/regrade.mjs, verifying a handed-in JSON). Two copies of this
 * five-line recipe would drift, and the first symptom would be the grader
 * accusing an honest student of editing their file.
 *
 * Sorted by path so file order cannot change the hash, and joined with a NUL so
 * no filename or file body can forge a boundary.
 */
export function canonicalBytes(files) {
  return (files ?? [])
    .slice()
    .sort((a, b) => String(a.path).localeCompare(String(b.path)))
    .map((f) => `${f.path}\n${f.text}`)
    .join("\n\0\n");
}

/* --- context -------------------------------------------------------------- */

const norm = (p) => String(p ?? "").replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
const extOf = (p) => {
  const b = norm(p).split("/").pop();
  const i = b.lastIndexOf(".");
  return i > 0 ? b.slice(i + 1).toLowerCase() : "";
};

/**
 * Extensions the grader reads the CONTENTS of.
 *
 * Lives here, next to canonicalBytes, because three callers must agree forever:
 * the folder picker and the GitHub loader in src/ui.js, and the fixture harness
 * in _tools/qa-grader.mjs. They diverged once and the symptom was ugly — the
 * gate fed every fixture file to the checks and reported 10/10, while the shipped
 * page dropped `images/` entirely and quietly took marks off honest folders for
 * "thiếu: images/".
 *
 * Everything else is carried as a PATH with empty text: `pathsExist`,
 * `linksResolve`, `cssLinked` and `fileNaming` only ever ask whether a path was
 * submitted, so an image needs no bytes to be gradable — and reading a .png as
 * UTF-8 would be wrong anyway.
 */
export const TEXT_EXT = Object.freeze(["html", "htm", "css", "md"]);

/** True when the grader should read this file's contents, not just its path. */
export const isTextPath = (p) => TEXT_EXT.includes(extOf(p));

/** Files that are never student work and must not reach the checks. */
const IGNORED = [
  /(^|\/)\.git(\/|$)/i, /(^|\/)node_modules(\/|$)/i, /(^|\/)\.ds_store$/i,
  /(^|\/)thumbs\.db$/i, /(^|\/)\.vscode(\/|$)/i, /(^|\/)__macosx(\/|$)/i,
];

/**
 * Turn a flat file list into the object every check reads.
 *
 *   buildContext([{ path:"index.html", text:"<!DOCTYPE html>…" }])
 *
 * Returns `{ files, htmlDocs, cssSheets, parseErrors }` where `files` carries a
 * normalized `path` and derived `ext`, and the two Maps are keyed by that same
 * normalized path.
 *
 * Parsing happens ONCE here, not per check: session 09's rubric asks eleven
 * questions about one table, and re-tokenizing the page eleven times is the
 * difference between an instant report and a visible freeze on a phone.
 *
 * A file that fails to parse does not stop the run. It lands in `parseErrors` and
 * its checks come back NOT GRADABLE, which is the honest answer — the grader
 * genuinely does not know what is in that file.
 */
export function buildContext(input) {
  const raw = Array.isArray(input) ? input : (input?.files ?? []);
  const files = [];
  const seen = new Set();
  for (const f of raw) {
    const path = norm(f?.path ?? f?.name ?? "");
    if (!path || IGNORED.some((rx) => rx.test(path))) continue;
    // A duplicate path means two uploads of the same page; the first one wins so
    // the report is stable across re-runs.
    const key = path.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    files.push({
      path,
      text: typeof f?.text === "string" ? f.text : String(f?.text ?? ""),
      ext: extOf(path),
      bytes: f?.bytes ?? (typeof f?.text === "string" ? f.text.length : 0),
    });
  }

  const htmlDocs = new Map();
  const cssSheets = new Map();
  const parseErrors = [];
  for (const f of files) {
    try {
      if (f.ext === "html" || f.ext === "htm") htmlDocs.set(f.path, parseHtml(f.text));
      else if (f.ext === "css") cssSheets.set(f.path, parseCss(f.text));
    } catch (err) {
      parseErrors.push({ path: f.path, message: String(err?.message ?? err) });
    }
  }
  return { files, htmlDocs, cssSheets, parseErrors };
}

/* --- scoring -------------------------------------------------------------- */

/** Rubric tiers, in the order a report lists them. */
export const TIERS = Object.freeze(["auto", "assist", "manual"]);

const round2 = (n) => Math.round(n * 100) / 100;

/**
 * Score one rubric row.
 *
 * Every check carries an optional `weight` (default 1) so a row can say that
 * "all tags closed" matters more than "has a comment". The row's ratio is the
 * weighted mean over GRADABLE checks only.
 *
 * Three outcomes, and the distinction is the whole point:
 *   graded   — at least one check ran; `awarded` is meaningful
 *   blocked  — every check needs a file that was not submitted
 *   manual   — the row has no checks at all, by design
 */
function gradeRow(ctx, row) {
  const tier = TIERS.includes(row.tier) ? row.tier : "auto";
  const points = Number(row.points) || 0;
  const specs = Array.isArray(row.checks) ? row.checks : [];

  if (tier === "manual" || specs.length === 0) {
    return {
      id: row.id, criteria: row.criteria, description: row.description ?? "",
      tier: "manual", points, awarded: null, ratio: null,
      state: "manual", checks: [], missingFiles: [],
      note: row.note ?? "Chỉ người chấm kết luận được mục này.",
    };
  }

  const results = specs.map((spec) => runCheck(ctx, spec));
  const gradable = results.filter((r) => r.score01 !== null);
  const missingFiles = [...new Set(results.flatMap((r) => r.missingFiles ?? []))];

  if (!gradable.length) {
    return {
      id: row.id, criteria: row.criteria, description: row.description ?? "",
      tier, points, awarded: null, ratio: null,
      state: "blocked", checks: results, missingFiles,
      note: results[0]?.detail ?? "Chưa nộp file cần thiết.",
    };
  }

  const totalWeight = gradable.reduce((s, r) => s + (Number(r.weight) || 1), 0);
  const ratio = totalWeight > 0
    ? gradable.reduce((s, r) => s + r.score01 * (Number(r.weight) || 1), 0) / totalWeight
    : 0;

  return {
    id: row.id, criteria: row.criteria, description: row.description ?? "",
    tier, points,
    awarded: round2(ratio * points),
    ratio: round2(ratio),
    state: "graded",
    checks: results,
    // Reported even when the row still scored, so "3/4 pages checked" is visible.
    missingFiles,
    note: row.note ?? "",
  };
}

/**
 * Grade a submission against a rubric.
 *
 *   gradeSubmission(rubric, buildContext(files))
 *
 * Returns a report object; `ui.js` renders it and `qa-grader.mjs` asserts on it.
 * Nothing here formats for display — no HTML, no colours, no rounding beyond two
 * decimals.
 */
export function gradeSubmission(rubric, ctx) {
  const rows = (rubric?.rows ?? []).map((row) => gradeRow(ctx, row));

  const graded = rows.filter((r) => r.state === "graded");
  const blocked = rows.filter((r) => r.state === "blocked");
  const manual = rows.filter((r) => r.state === "manual");

  const autoPoints = round2(graded.reduce((s, r) => s + r.points, 0));
  const autoAwarded = round2(graded.reduce((s, r) => s + r.awarded, 0));
  const blockedPoints = round2(blocked.reduce((s, r) => s + r.points, 0));
  const manualPoints = round2(manual.reduce((s, r) => s + r.points, 0));

  const declaredTotal = Number(rubric?.total) || 0;
  const rowTotal = round2(rows.reduce((s, r) => s + r.points, 0));

  return {
    session: rubric?.session ?? null,
    title: rubric?.title ?? "",
    total: declaredTotal,
    // Surfaced rather than thrown: a rubric whose rows do not add to its total is
    // a rubric bug, and the marker must see it instead of a silently wrong score.
    rowTotal,
    totalsAgree: Math.abs(rowTotal - declaredTotal) < 0.005,
    rows,
    autoPoints,
    autoAwarded,
    autoPercent: autoPoints > 0 ? Math.round((autoAwarded / autoPoints) * 100) : null,
    blockedPoints,
    manualPoints,
    missingFiles: [...new Set(rows.flatMap((r) => r.missingFiles ?? []))].sort(),
    fileCount: ctx.files.length,
    parseErrors: ctx.parseErrors ?? [],
  };
}

/**
 * Validate a rubric before it is used.
 *
 * Called by `qa-grader.mjs` for all fifteen rubrics and by the browser build for
 * the one it loaded. Returns a list of human-readable problems; empty means the
 * rubric is usable.
 *
 * Points summing to the declared total is checked here rather than trusted,
 * because the rubric tables in `homework/*.md` are the contract with the students
 * and every one of them ends in `**Total** | **10**`.
 */
export function validateRubric(rubric) {
  const problems = [];
  const at = (i, msg) => problems.push(`rows[${i}]: ${msg}`);
  if (!rubric || typeof rubric !== "object") return ["rubric không phải object"];
  if (!Array.isArray(rubric.rows) || !rubric.rows.length) problems.push("rubric không có rows");
  if (typeof rubric.total !== "number") problems.push("rubric thiếu total (số)");

  const ids = new Set();
  (rubric.rows ?? []).forEach((row, i) => {
    if (!row.id) at(i, "thiếu id");
    else if (ids.has(row.id)) at(i, `id trùng: ${row.id}`);
    else ids.add(row.id);
    if (!row.criteria) at(i, "thiếu criteria");
    if (typeof row.points !== "number" || row.points <= 0) at(i, "points phải là số > 0");
    if (row.tier && !TIERS.includes(row.tier)) at(i, `tier không hợp lệ: ${row.tier}`);
    const specs = Array.isArray(row.checks) ? row.checks : [];
    if (row.tier !== "manual" && !specs.length) at(i, "tier auto/assist nhưng không có check nào");
    if (row.tier === "manual" && specs.length) at(i, "tier manual thì không được có check");
    specs.forEach((spec, k) => {
      if (!spec?.type) at(i, `checks[${k}] thiếu type`);
      else if (!CHECK_TYPES.includes(spec.type)) at(i, `checks[${k}] type lạ: ${spec.type}`);
      if (spec?.weight !== undefined && (typeof spec.weight !== "number" || spec.weight <= 0)) {
        at(i, `checks[${k}] weight phải là số > 0`);
      }
    });
  });

  const sum = (rubric.rows ?? []).reduce((s, r) => s + (Number(r.points) || 0), 0);
  if (typeof rubric.total === "number" && Math.abs(sum - rubric.total) > 0.005) {
    problems.push(`tổng points của rows là ${round2(sum)}, nhưng total khai báo là ${rubric.total}`);
  }
  return problems;
}
