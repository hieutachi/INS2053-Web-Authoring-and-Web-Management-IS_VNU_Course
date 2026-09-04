/* qa-site.mjs — checks on the generated `site/` directory.
 *
 * Same idea as qa-html-slides.mjs: the builder is not trusted on its word.
 * Every check reads the built output from disk, not the source markdown.
 *
 *   node _tools/qa-site.mjs
 *
 * Exits non-zero if any hard check fails, so it can gate a deploy.
 * Read-only.
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

const list = (await pages()).sort();
const src = new Map();
for (const rel of list) src.set(rel, await readFile(path.join(SITE, rel), "utf8"));

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
  if (groups.root !== 1) bad(`expected 1 root page, found ${groups.root}`);
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

/* == 11. shared assets present ============================================ */
console.log("== 11. shared assets ==============================================");
for (const a of ["assets/site.css", "assets/site.js"]) {
  if (existsSync(path.join(SITE, a))) ok(a);
  else bad(`${a} missing`);
}

console.log("");
console.log(fail ? "SITE QA FAIL" : "SITE QA PASS");
process.exit(fail);
