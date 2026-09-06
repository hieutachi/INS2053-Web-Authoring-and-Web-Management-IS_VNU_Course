/* qa-site.mjs — checks on the generated `site/` directory.
 *
 * Same idea as qa-html-slides.mjs: the builder is not trusted on its word.
 * Every check reads the built output from disk, not the source markdown.
 *
 *   node _tools/qa-site.mjs
 *
 * Exits non-zero if any hard check fails, so it can gate a deploy.
 * Read-only.
 *
 * Checks 1–12 cover the generated course pages. Check 13 covers the one published
 * build artefact, `cham-bai.html`, which is deliberately held out of the others —
 * see the note on GRADER_PAGE below.
 */

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const SITE = path.join(ROOT, "site");

let fail = 0;
const bad = (msg) => { console.log("FAIL  " + msg); fail = 1; };
const ok = (msg) => console.log("ok    " + msg);

if (!existsSync(SITE)) {
  console.log("FAIL  site/ does not exist — run: npm run build:site");
  process.exit(1);
}

/** Every .html file under site/, as paths relative to site/. */
async function pages(dir = SITE, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await pages(p, out);
    else if (e.name.endsWith(".html")) out.push(path.relative(SITE, p).replace(/\\/g, "/"));
  }
  return out;
}

/**
 * The self-check tool, held out of the checks written for generated course pages.
 *
 * It is not a generated page — it is a build artefact copied byte for byte from
 * `_tools/grader/cham-bai.html`, and it breaks the site checks by design: it needs
 * `input[type=file]` and `fetch()` to read a folder and a GitHub repo, it carries
 * no `assets/site.css`, and its inline script mentions `<h1>` in the Vietnamese
 * strings it shows the reader.
 *
 * Excluding it here would be a hole, so check 13 below audits it on its own terms:
 * identical to the gated artefact, self-contained, and still uploading nothing.
 * Nothing else may ever be added to this list — the whole point of check 11 is that
 * the published site cannot grow a submission feature by accident.
 */
const GRADER_PAGE = "cham-bai.html";

const list = (await pages()).sort();
const src = new Map();
for (const rel of list) {
  if (rel === GRADER_PAGE) continue;
  src.set(rel, await readFile(path.join(SITE, rel), "utf8"));
}

const count = (s, re) => (s.match(re) || []).length;

/* == 1. page inventory ==================================================== */
console.log("== 1. page inventory ==============================================");
{
  const groups = {
    root: list.filter((f) => !f.includes("/")).length,
    ebook: list.filter((f) => f.startsWith("ebook/")).length,
    homework: list.filter((f) => f.startsWith("homework/")).length,
    sessions: list.filter((f) => f.startsWith("sessions/")).length,
    slides: list.filter((f) => f.startsWith("slides/")).length,
  };
  console.log(`      ${list.length} html page(s)  ` + JSON.stringify(groups));
  // index.html + orientation.html + cham-bai.html. The count is asserted rather
  // than relaxed, so an unexpected file appearing at the root is a failure.
  if (groups.root !== 3) bad(`expected 3 root pages (index + orientation + self-check tool), found ${groups.root}`);
  if (groups.ebook !== 17) bad(`expected 17 ebook pages (16 chapters + index), found ${groups.ebook}`);
  if (groups.homework !== 16) bad(`expected 16 homework pages (15 + index), found ${groups.homework}`);
  if (groups.sessions !== 16) bad(`expected 16 session pages (15 + index), found ${groups.sessions}`);
  if (groups.slides !== 18) bad(`expected 18 slide pages (17 decks + index), found ${groups.slides}`);
  if (!fail) ok("page counts as expected");
}

/* == 2. document structure ================================================ */
console.log("== 2. document structure ==========================================");
{
  let dirty = 0;
  for (const [rel, s] of src) {
    const problems = [];
    if (!/^<!DOCTYPE html>/i.test(s.trim())) problems.push("no doctype");
    if (!/<html[^>]+lang="en"/.test(s)) problems.push("no lang");
    if (!/<meta charset="utf-8">/i.test(s)) problems.push("no charset");
    if (!/name="viewport"/.test(s)) problems.push("no viewport");
    const h1 = count(s, /<h1[\s>]/g);
    if (h1 !== 1) problems.push(`h1=${h1}`);
    if (!/<title>[^<]+<\/title>/.test(s)) problems.push("empty title");
    if (problems.length) { bad(`${rel} — ${problems.join("; ")}`); dirty++; }
  }
  if (!dirty) ok("doctype, lang, charset, viewport, single h1, title on every page");
}

/* == 3. duplicate ids ===================================================== */
console.log("== 3. duplicate element ids ======================================");
{
  let dirty = 0;
  for (const [rel, s] of src) {
    const seen = new Set();
    const dup = new Set();
    for (const m of s.matchAll(/\sid="([^"]+)"/g)) {
      if (seen.has(m[1])) dup.add(m[1]); else seen.add(m[1]);
    }
    if (dup.size) { bad(`${rel} — duplicate id: ${[...dup].slice(0, 6).join(", ")}`); dirty++; }
  }
  if (!dirty) ok("no duplicate ids in any page");
}

/* == 4. internal links and assets resolve ================================= */
console.log("== 4. internal links resolve =====================================");
{
  let checked = 0;
  let broken = 0;
  for (const [rel, s] of src) {
    const dir = path.dirname(path.join(SITE, rel));
    for (const m of s.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const raw = m[1];
      if (/^(https?:|mailto:|#|data:)/.test(raw)) continue;
      checked++;
      const target = path.resolve(dir, decodeURIComponent(raw.split("#")[0]));
      if (!existsSync(target)) { bad(`${rel} — dead link: ${raw}`); broken++; }
    }
  }
  if (!broken) ok(`${checked} internal link(s)/asset(s) all resolve`);
}

/* == 5. same-page anchors resolve ========================================= */
console.log("== 5. same-page anchors resolve ==================================");
{
  let checked = 0;
  let broken = 0;
  for (const [rel, s] of src) {
    const ids = new Set([...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    for (const m of s.matchAll(/href="#([^"]+)"/g)) {
      checked++;
      if (!ids.has(decodeURIComponent(m[1]))) {
        bad(`${rel} — anchor #${m[1]} has no target`);
        broken++;
      }
    }
  }
  if (!broken) ok(`${checked} same-page anchor(s) all resolve`);
}

/* == 6. content policy =================================================== */
console.log("== 6. content policy ==============================================");
{
  // A *link* into excluded material is a real leak. A mention of the path in
  // prose is not — chapter 08 legitimately tells students where the marking
  // rubric lives without publishing it. So this checks hrefs, not plain text.
  let leaks = 0;
  for (const [rel, s] of src) {
    for (const m of s.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const raw = m[1];
      if (/^(https?:|mailto:|#|data:)/.test(raw)) continue;
      if (/(^|\/)(exams|exercises|project|canvases|_tools|_archive)\//.test(raw)) {
        bad(`${rel} — links into excluded material: ${raw}`);
        leaks++;
      }
    }
  }
  if (!leaks) ok("no page links into exams/, exercises/, project/ or canvases/");
}

/* == 7. encoding ========================================================== */
console.log("== 7. encoding ====================================================");
{
  let dirty = 0;
  for (const [rel, s] of src) {
    // Strip code spans and blocks first. Chapters 01 and 08 SHOW students what a
    // charset bug looks like — the common-errors table has a literal `Ã¡` inside
    // <code> so they can recognise it. That is correct content, not corruption.
    const prose = s
      .replace(/<pre[\s\S]*?<\/pre>/g, "")
      .replace(/<code[\s\S]*?<\/code>/g, "");
    const problems = [];
    if (prose.includes("\uFFFD")) problems.push("U+FFFD");
    if (/â€|Ä‘|Ã¡/.test(prose)) problems.push("mojibake");
    if (problems.length) { bad(`${rel} — ${problems.join("; ")}`); dirty++; }
  }
  if (!dirty) ok("no U+FFFD, no mojibake outside code samples");
}

/* == 8. no unrendered markdown or leaked placeholders ===================== */
console.log("== 8. no unrendered markdown ======================================");
{
  let dirty = 0;
  for (const [rel, s] of src) {
    // Strip <pre> and <code>: markdown syntax inside a code sample is the
    // lesson, and this course literally teaches HTML, so samples contain tags.
    // Chapter 11's pre-launch checklist tells students to grep their own site
    // for "lorem ipsum" — the phrase is the instruction, not filler.
    const prose = s
      .replace(/<pre[\s\S]*?<\/pre>/g, "")
      .replace(/<code[\s\S]*?<\/code>/g, "");
    const problems = [];
    // Match the actual filler passage, not the words "lorem ipsum". Chapter 11
    // names the phrase twice on purpose: a launch-checklist row ("No lorem ipsum
    // placeholder text?") and a step telling students to grep their own files
    // for it. Real filler would read "Lorem ipsum dolor sit amet…".
    if (/lorem ipsum dolor/i.test(prose)) problems.push("placeholder filler text");
    if (/\$\{[a-z]/i.test(prose)) problems.push("unsubstituted template literal");
    if (/^\s*\|[-\s|:]+\|\s*$/m.test(prose)) problems.push("raw markdown table rule");
    if (problems.length) { bad(`${rel} — ${problems.join("; ")}`); dirty++; }
  }
  if (!dirty) ok("no placeholders, no unsubstituted templates, no raw table rules");
}

/* == 9. no double-escaped entities in navigation chrome ==================== */
console.log("== 9. navigation text is escaped exactly once =====================");
{
  // A heading like `What Is a "Site"?` passes through marked's inline parser, which
  // returns `&quot;`. If the builder stores that HTML as the label and escapes it
  // again on output, the reader sees a literal `&quot;`. Code samples legitimately
  // contain `&amp;amp;` — the ebook teaches HTML entities — so only navigation
  // chrome is checked: table of contents links, breadcrumbs and <title>.
  let dirty = 0;
  for (const [rel, s] of src) {
    const chrome = [
      ...s.matchAll(/<a href="#[^"]*">([^<]*)<\/a>/g),
      ...s.matchAll(/<title>([^<]*)<\/title>/g),
      ...s.matchAll(/<span aria-current="page">([^<]*)<\/span>/g),
    ].map((m) => m[1]);
    const doubled = chrome.filter((t) => /&amp;(?:amp|lt|gt|quot|#39|nbsp);/.test(t));
    if (doubled.length) {
      bad(`${rel} — ${doubled.length} double-escaped label(s): ${doubled[0].slice(0, 60)}`);
      dirty++;
    }
  }
  if (!dirty) ok("no double-escaped entities in contents, breadcrumbs or titles");
}

/* == 10. every session hub wires its three stages ========================= */
console.log("== 10. session hubs are complete =================================");
{
  let dirty = 0;
  for (let n = 1; n <= 15; n++) {
    const id = String(n).padStart(2, "0");
    const rel = `sessions/session-${id}.html`;
    const s = src.get(rel);
    if (!s) { bad(`${rel} missing`); dirty++; continue; }
    const problems = [];
    if (!s.includes("../ebook/")) problems.push("no chapter link");
    if (!s.includes(`../slides/buoi-${id}.html`)) problems.push("no deck link");
    if (!s.includes(`../homework/session-${id}.html`)) problems.push("no homework link");
    if (problems.length) { bad(`${rel} — ${problems.join("; ")}`); dirty++; }
  }
  if (!dirty) ok("15 hubs each link chapter + deck + homework");
}

/* == 11. submission and grading stay disabled ============================ */
console.log("== 11. no submission or grading UI =================================");
{
  let dirty = 0;
  const forbidden = [
    [/<form\b/i, "form element"],
    [/<input\b[^>]*\btype\s*=\s*["']file["']/i, "file upload input"],
    [/<button\b[^>]*\btype\s*=\s*["']submit["']/i, "submit button"],
    [/<input\b[^>]*\btype\s*=\s*["'](?:submit|image)["']/i, "submit input"],
    [/\bFormData\s*\(/, "FormData request"],
    [/\bfetch\s*\(/, "fetch request"],
    [/\/api\/(?:submissions?|uploads?|grades?|grading|homework|assignments?)\b/i, "submission/grading API endpoint"],
  ];
  for (const [rel, s] of src) {
    for (const [pattern, label] of forbidden) {
      if (pattern.test(s)) {
        bad(`${rel} — submission/grading feature found: ${label}`);
        dirty++;
      }
    }
  }
  if (!dirty) ok("no forms, submit controls, uploads, requests or submission APIs");

  const statusPages = ["index.html", "homework/index.html"];
  for (let n = 1; n <= 15; n++) {
    const id = String(n).padStart(2, "0");
    statusPages.push(`sessions/session-${id}.html`, `homework/session-${id}.html`);
  }
  let missingStatus = 0;
  for (const rel of statusPages) {
    const s = src.get(rel) ?? "";
    if (!/online submission and grading are not enabled yet/i.test(s)) {
      bad(`${rel} — disabled submission/grading status is not visible`);
      missingStatus++;
    }
  }
  if (!missingStatus) ok("disabled status is visible on all 32 homework-related pages");

  let staleHomeworkCopy = 0;
  for (let n = 1; n <= 15; n++) {
    const id = String(n).padStart(2, "0");
    const rel = `homework/session-${id}.html`;
    const s = src.get(rel) ?? "";
    const required = ["Practice Status", "Save Your Practice Work", "Reference Rubric"];
    const missing = required.filter((label) => !s.includes(`>${label}</a>`));
    const stale = [
      [/>Due Date</, "Due Date heading"],
      [/>Submission Guide</, "Submission Guide heading"],
      [/>Grading Rubric</, "Grading Rubric heading"],
      [/Sunday,\s*23:59/i, "homework deadline"],
      [/\bgrace day\b/i, "late-work policy"],
      [/\bby the deadline\b/i, "deadline instruction"],
    ].filter(([pattern]) => pattern.test(s)).map(([, label]) => label);
    if (missing.length || stale.length) {
      bad(`${rel} — public practice copy invalid: ${[
        ...missing.map((label) => `missing ${label}`),
        ...stale,
      ].join("; ")}`);
      staleHomeworkCopy++;
    }
  }
  if (!staleHomeworkCopy) ok("15 homework sheets use practice headings and no hand-in deadline");
}

/* == 12. shared assets present ============================================ */
console.log("== 12. shared assets ==============================================");
for (const a of ["assets/site.css", "assets/site.js"]) {
  if (existsSync(path.join(SITE, a))) ok(a);
  else bad(`${a} missing`);
}

/* == 13. the published self-check tool ==================================== */
console.log("== 13. self-check tool =============================================");
{
  const pub = path.join(SITE, GRADER_PAGE);
  const gated = path.join(ROOT, "_tools", "grader", "cham-bai.html");
  if (!existsSync(pub)) {
    bad(`${GRADER_PAGE} missing — run: npm run build:grader && npm run build:site`);
  } else if (!existsSync(gated)) {
    bad("_tools/grader/cham-bai.html missing — cannot verify the published copy");
  } else {
    const a = await readFile(pub, "utf8");
    const b = await readFile(gated, "utf8");
    // Byte-identical is the whole argument for publishing it: the eleven gates in
    // qa-grader.mjs audited `b`, and this is the only thing that makes them true
    // of `a`. A "harmless" edit made directly in site/ would slip past all of them.
    if (a !== b) bad(`${GRADER_PAGE} differs from the gated artefact — publish the built file, do not edit site/`);
    else ok(`${GRADER_PAGE} is byte-identical to the artefact qa-grader.mjs checked`);

    // Self-contained. Anything it loaded from the network or from a sibling file
    // would be a page that works here and breaks when saved to a student's disk.
    let external = 0;
    for (const m of a.replace(/<script\b[\s\S]*?<\/script>/gi, "").matchAll(/\b(?:src|href)\s*=\s*"([^"]*)"/gi)) {
      const v = m[1].trim();
      if (!v || v.startsWith("#") || v.startsWith("data:") || v.startsWith("blob:")) continue;
      bad(`${GRADER_PAGE} references an external file: ${v}`);
      external++;
    }
    if (!external) ok("no external CSS, JS, image or font — one file, works offline");

    // Still uploads nothing. It reads two GitHub endpoints; anything else — a POST,
    // a form, a beacon — would mean student work leaving the browser.
    const leaks = [
      [/<form\b/i, "form element"],
      [/\bFormData\s*\(/, "FormData"],
      [/\bnavigator\s*\.\s*sendBeacon/i, "sendBeacon"],
      [/\bXMLHttpRequest\b/, "XMLHttpRequest"],
      [/method\s*:\s*["'](?:POST|PUT|PATCH|DELETE)["']/i, "writing HTTP method"],
    ].filter(([re]) => re.test(a));
    if (leaks.length) bad(`${GRADER_PAGE} can send data out: ${leaks.map(([, l]) => l).join("; ")}`);
    else ok("no form, no FormData, no beacon, no POST — nothing is uploaded");

    for (const m of a.matchAll(/fetch\w*\s*\(\s*["'`](https?:\/\/[a-z0-9.-]+)/gi)) {
      const host = m[1].replace(/^https?:\/\//i, "").toLowerCase();
      if (host !== "api.github.com" && host !== "raw.githubusercontent.com") {
        bad(`${GRADER_PAGE} fetches ${host} — only the two read-only GitHub hosts are allowed`);
      }
    }

    // Reachable. A published tool nobody can find is the same as an unpublished one.
    const linkers = [...src.entries()].filter(([, s]) => s.includes(`"../${GRADER_PAGE}"`) || s.includes(`"${GRADER_PAGE}"`));
    if (linkers.length < 32) {
      bad(`only ${linkers.length} page(s) link the self-check tool — expected home + homework index + 15 sheets + 15 hubs`);
    } else {
      ok(`${linkers.length} pages link to it`);
    }
  }
}

/* == 14. no hollow tables ==================================================== */
console.log("== 14. tables are never left hollow ================================");
{
  // build-site.mjs injects the shared empty state (table-empty-state.mjs)
  // into every table without a data row; a hollow <tbody> surviving to the
  // published page means that pass silently missed one. The grader's tables
  // are DOM-built and are audited on their own terms in check 13.
  let hollow = 0;
  for (const [rel, s] of src) {
    for (const m of s.matchAll(/<tbody\b[^>]*>([\s\S]*?)<\/tbody>/gi)) {
      if (!/<tr[\s>]/i.test(m[1])) {
        bad(`${rel} :: hollow <tbody> without the shared empty state`);
        hollow++;
      }
    }
  }
  if (!hollow) ok("every <tbody> carries a data row or the shared empty state");
}

console.log("");
console.log(fail ? "SITE QA FAIL" : "SITE QA PASS");
process.exit(fail);
