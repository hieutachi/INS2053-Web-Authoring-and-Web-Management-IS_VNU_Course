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
 * Checks 1–12 cover the generated course pages, in both language trees. Check 13
 * covers the one published build artefact, `cham-bai.html`, which is deliberately
 * held out of the others — see the note on GRADER_PAGE below. Checks 15–16 are the
 * bilingual gates: tree parity, the language switch, chrome that actually changed
 * language, and the fallback notice that marks an untranslated page.
 */

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LANGS, UI } from "./i18n.mjs";

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

/**
 * The two language trees the builder publishes.
 *
 * `site/` is English, `site/vi/` is Vietnamese. They share `assets/`, `slides/`
 * and `cham-bai.html`, and every generated page exists in both. Which tree a
 * page belongs to is decided by its path, so a page can never be checked with
 * the other language's strings by accident.
 */
const VI_PREFIX = LANGS.vi.dir; // "vi/"
const langOf = (rel) => (rel.startsWith(VI_PREFIX) ? "vi" : "en");
/** A page's path relative to its own tree root, e.g. ebook/01-x.html. */
const inTree = (rel) =>
  langOf(rel) === "vi" ? rel.slice(VI_PREFIX.length) : rel;
/** The same document in the other tree. */
const twinOf = (rel) =>
  langOf(rel) === "vi" ? inTree(rel) : VI_PREFIX + rel;

/**
 * The sentence every homework-related page must carry, in its own language,
 * read straight out of i18n.mjs rather than restated here: if the copy changes
 * on one side the check follows it instead of going stale.
 */
const disabledNote = (lang) => UI[lang].practiceModeBody.split(".")[0].toLowerCase();

/** Does a Vietnamese PROSE source exist for a repo-relative markdown path? */
const viProse = (repoMdPath) => existsSync(path.join(ROOT, "i18n/vi", repoMdPath));


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
  /* Both trees must carry the same generated page list, so the expected counts
     are written once as one tree and asserted twice. `slides/` is the exception:
     the 17 decks are shared and live only at site/slides/, so English has
     decks + index there and Vietnamese only has its own index. */
  const tree = {
    root: 3, // index + orientation + ai-agents
    ebook: 17, // 16 chapters + index
    homework: 16, // 15 + index
    sessions: 16, // 15 + index
  };
  const forLang = (lang) => {
    const want = { ...tree };
    want.slides = lang === "en" ? 18 : 1;
    // The self-check tool is copied to site/ once and serves both trees, so it
    // sits at the English root: index + orientation + ai-agents + cham-bai.
    if (lang === "en") want.root = 4;
    const groups = {
      root: list.filter(
        (f) => langOf(f) === lang && !inTree(f).includes("/")
      ).length,
    };
    for (const k of ["ebook", "homework", "sessions", "slides"]) {
      groups[k] = list.filter((f) =>
        inTree(f).startsWith(k + "/") && langOf(f) === lang
      ).length;
    }
    return { want, groups };
  };

  console.log(`      ${list.length} html page(s)`);
  for (const lang of Object.keys(LANGS)) {
    const { want, groups } = forLang(lang);
    console.log(`      ${lang}: ${JSON.stringify(groups)}`);
    for (const k of Object.keys(want)) {
      if (groups[k] !== want[k])
        bad(
          `${lang}/${k}: expected ${want[k]} page(s), found ${groups[k]}`
        );
    }
    // An unexpected file anywhere is a failure, so the totals are checked too.
    const total = list.filter((f) => langOf(f) === lang).length;
    const wantTotal = Object.values(want).reduce((a, b) => a + b, 0);
    if (total !== wantTotal)
      bad(`${lang} tree holds ${total} page(s), expected ${wantTotal}`);
  }
  // The self-check tool is copied once and shared, never duplicated per tree.
  if (!list.includes(GRADER_PAGE)) bad(`${GRADER_PAGE} missing from site/`);
  if (list.some((f) => f.startsWith(VI_PREFIX) && f.endsWith(GRADER_PAGE)))
    bad(`${GRADER_PAGE} must exist once at site/, not inside site/${VI_PREFIX}`);
  if (!fail) ok("both language trees have the expected page counts");
}

/* == 2. document structure ================================================ */
console.log("== 2. document structure ==========================================");
{
  let dirty = 0;
  for (const [rel, s] of src) {
    const problems = [];
    if (!/^<!DOCTYPE html>/i.test(s.trim())) problems.push("no doctype");
    // The declared language must match the tree the page sits in. A Vietnamese
    // page that forgot its lang attribute would be read out in English by a
    // screen reader and mis-hyphenated by the browser.
    const want = LANGS[langOf(rel)].htmlLang;
    if (!new RegExp(`<html[^>]+lang="${want}"`).test(s))
      problems.push(`lang is not "${want}"`);
    if (!/<meta charset="utf-8">/i.test(s)) problems.push("no charset");
    if (!/name="viewport"/.test(s)) problems.push("no viewport");
    const h1 = count(s, /<h1[\s>]/g);
    if (h1 !== 1) problems.push(`h1=${h1}`);
    if (!/<title>[^<]+<\/title>/.test(s)) problems.push("empty title");
    if (problems.length) { bad(`${rel} — ${problems.join("; ")}`); dirty++; }
  }
  if (!dirty) ok("doctype, correct lang, charset, viewport, single h1, title on every page");
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
  // Checked in both trees. The deck lives outside the tree, so its href is the
  // only one that differs; the chapter and homework sit beside the hub.
  let dirty = 0;
  for (const lang of Object.keys(LANGS)) {
    const prefix = lang === "en" ? "" : VI_PREFIX;
    const up = lang === "en" ? ".." : "../..";
    for (let n = 1; n <= 15; n++) {
      const id = String(n).padStart(2, "0");
      const rel = `${prefix}sessions/session-${id}.html`;
      const s = src.get(rel);
      if (!s) { bad(`${rel} missing`); dirty++; continue; }
      const problems = [];
      if (!s.includes("../ebook/")) problems.push("no chapter link");
      if (!s.includes(`${up}/slides/buoi-${id}.html`)) problems.push("no deck link");
      if (!s.includes(`../homework/session-${id}.html`)) problems.push("no homework link");
      if (problems.length) { bad(`${rel} — ${problems.join("; ")}`); dirty++; }
    }
  }
  if (!dirty) ok("30 hubs (15 per language) each link chapter + deck + homework");
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

  const statusPages = [];
  for (const lang of Object.keys(LANGS)) {
    const prefix = lang === "en" ? "" : VI_PREFIX;
    statusPages.push(`${prefix}index.html`, `${prefix}homework/index.html`);
    for (let n = 1; n <= 15; n++) {
      const id = String(n).padStart(2, "0");
      statusPages.push(
        `${prefix}sessions/session-${id}.html`,
        `${prefix}homework/session-${id}.html`
      );
    }
  }
  let missingStatus = 0;
  for (const rel of statusPages) {
    const s = src.get(rel) ?? "";
    // Each tree is checked against its own copy of the sentence. English keeps
    // the wording the check was written for; Vietnamese must carry the same
    // statement translated, not quietly lose it.
    if (!s.toLowerCase().includes(disabledNote(langOf(rel)))) {
      bad(`${rel} — disabled submission/grading status is not visible`);
      missingStatus++;
    }
  }
  if (!missingStatus)
    ok(`disabled status is visible on all ${statusPages.length} homework-related pages`);

  let staleHomeworkCopy = 0;
  for (const lang of Object.keys(LANGS)) {
    const prefix = lang === "en" ? "" : VI_PREFIX;
    for (let n = 1; n <= 15; n++) {
      const id = String(n).padStart(2, "0");
      const rel = `${prefix}homework/session-${id}.html`;
      const s = src.get(rel) ?? "";
      const required = [
        "Practice Status",
        "Save Your Practice Work",
        "Reference Rubric",
      ];
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
  }
  if (!staleHomeworkCopy) ok("30 homework sheets use practice headings and no hand-in deadline");
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
    // Match the href in either tree at any depth: English pages reach it as
    // "cham-bai.html" or "../cham-bai.html", Vietnamese pages as
    // "../../cham-bai.html".
    const linkers = [...src.entries()].filter(([, s]) =>
      /href="[^"]*\/cham-bai\.html"|href="cham-bai\.html"/.test(s)
    );
    // 33 per tree: home + orientation + homework index + 15 sheets + 15 hubs.
    if (linkers.length < 66) {
      bad(`only ${linkers.length} page(s) link the self-check tool — expected 33 in each language tree`);
    } else {
      ok(`${linkers.length} pages across both trees link to it`);
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

/**
 * The English markdown source a published page renders, or null when the page is
 * chrome-only. `i18n/vi/<that path>` is what decides whether the Vietnamese
 * version is a translation or a fallback, so QA can recompute the expected
 * notice from the same rule the builder used without importing the builder.
 *
 * Session hubs and every index page render no markdown at all — their text is
 * entirely chrome, which is always translated — so they return null and never
 * carry a fallback notice.
 */
function proseSource(rel) {
  const t = inTree(rel);
  if (t.endsWith("/index.html") || t === "index.html") return null;
  const m = /^ebook\/(.+)\.html$/.exec(t);
  if (m) return `ebook/${m[1]}.md`;
  const h = /^homework\/session-(\d\d)\.html$/.exec(t);
  if (h) return `homework/session-${h[1]}/homework.md`;
  return null;
}

/* == 15. the two language trees agree ====================================== */
console.log("== 15. bilingual trees, chrome and translation state ==============");
{
  let problems = 0;
  const note = (rel, msg) => { bad(`${rel} — ${msg}`); problems++; };

  /* 15a. every English generated page has a Vietnamese twin and vice versa. The
     17 decks are the deliberate exception: there is one physical copy shared by
     both trees, so they are not expected twice. */
  const isDeck = (rel) =>
    langOf(rel) === "en" &&
    inTree(rel).startsWith("slides/") &&
    inTree(rel) !== "slides/index.html";
  const generated = list.filter((f) => f !== GRADER_PAGE && !isDeck(f));
  for (const rel of generated) {
    if (!src.has(twinOf(rel)))
      note(rel, `no ${langOf(rel) === "en" ? "Vietnamese" : "English"} twin at ${twinOf(rel)}`);
  }
  if (!problems) ok(`all ${generated.length} generated pages exist in both trees`);

  /* 15b. the switch: present on every generated page, one option per language,
     exactly one marked current, and every offered href lands on this page's
     twin rather than on the other language's home page. */
  for (const rel of generated) {
    const s = src.get(rel);
    const nav = /<nav class="lang-switch" aria-label="[^"]+">([\s\S]*?)<\/nav>/.exec(s);
    if (!nav) { note(rel, "no language switch"); continue; }
    const opts = [
      ...nav[1].matchAll(/<a class="lang-opt([^"]*)"([^>]*)>([\s\S]*?)<\/a>/g),
    ];
    if (opts.length !== Object.keys(LANGS).length)
      note(rel, `switch offers ${opts.length} option(s), expected ${Object.keys(LANGS).length}`);
    const isOn = (m) => m[1].split(/\s+/).includes("on");
    const on = opts.filter(isOn);
    if (on.length !== 1) note(rel, `${on.length} option(s) marked current, expected 1`);
    if (on.length === 1 && !/aria-current="true"/.test(on[0][2]))
      note(rel, "current option does not carry aria-current");
    for (const m of opts) {
      const href = /href="([^"]+)"/.exec(m[2]);
      const code = /data-lang-opt="(\w+)"/.exec(m[2]);
      const label = /aria-label="([^"]*)"/.exec(m[2]);
      if (!label) note(rel, `option ${code?.[1]} has no aria-label`);
      if (!href) {
        if (!isOn(m))
          note(rel, `option ${code?.[1]} has no href and is not the current one`);
        continue;
      }
      if (isOn(m))
        note(rel, `current option should not carry href ${href[1]}`);
      const want = path
        .normalize(path.join(path.dirname(rel), href[1]))
        .replace(/\\/g, "/");
      if (want !== twinOf(rel))
        note(rel, `option ${code?.[1]} -> ${want}, expected twin ${twinOf(rel)}`);
      if (!/hreflang=/.test(m[2])) note(rel, `option ${code?.[1]} has no hreflang`);
    }
  }
  if (!problems) ok("every page carries a working two-way language switch");

  /* 15c. each tree really speaks its own language. The labels come from
     i18n.mjs, so a Vietnamese page that kept English chrome is a build bug, not
     a translation gap. Labels identical in both languages are skipped: they
     cannot evidence either way.

     Only the top bar is read, never the body. The untranslated Vietnamese
     orientation page legitimately contains the English words "Sessions" and
     "Homework" as links inside its English prose, and that is the fallback
     saying so out loud, not chrome left behind. */
  for (const rel of generated) {
    const s = src.get(rel);
    const lang = langOf(rel);
    const mine = UI[lang];
    const other = UI[lang === "en" ? "vi" : "en"];
    const bar = /<nav class="primary-nav"[\s\S]*?<\/nav>/.exec(s);
    if (!bar) { note(rel, "no primary nav"); continue; }
    for (const k of ["navSessions", "navEbook", "navHomework", "navSlides"]) {
      if (!bar[0].includes(`>${mine[k]}</a>`))
        note(rel, `nav label "${mine[k]}" missing`);
      if (other[k] !== mine[k] && bar[0].includes(`>${other[k]}</a>`))
        note(rel, `nav still shows the other language: "${other[k]}"`);
    }
    if (/<nav class="toc"/.test(s) && !s.includes(`<h2 id="toc-h">${mine.onThisPage}</h2>`))
      note(rel, "contents heading is not in the page language");
  }
  if (!problems) ok("navigation and contents chrome matches each tree's language");

  /* 15d. the fallback notice: exactly those Vietnamese prose pages whose source
     has no i18n/vi twin must carry it, and a page that is translated — or is
     pure chrome — must not. Silently serving English inside Vietnamese chrome
     would read as a broken translation. */
  for (const rel of generated) {
    if (langOf(rel) !== "vi") continue;
    const s = src.get(rel);
    const has = /\blang-fallback\b/.test(s);
    const srcMd = proseSource(rel);
    // orientation and the agents guide carry long inline prose bodies that are
    // not translated yet, so they always announce the fallback.
    const inlineOnly = /^(orientation|ai-agents)\.html$/.test(inTree(rel));
    const expect = inlineOnly || (srcMd ? !viProse(srcMd) : false);
    if (has !== expect) {
      note(rel, `translation notice ${has ? "present but" : "absent and"} ${expect ? "expected" : "not expected"}`);
      continue;
    }
    if (!has) continue;
    if (!s.includes(UI.vi.fallbackTitle))
      note(rel, "notice does not use the Vietnamese wording from i18n.mjs");
    const href = /lang-fallback[\s\S]*?<a href="([^"]+)"/.exec(s);
    if (!href) note(rel, "notice offers no link to the English original");
    else {
      const want = path
        .normalize(path.join(path.dirname(rel), href[1]))
        .replace(/\\/g, "/");
      if (want !== twinOf(rel))
        note(rel, `notice link ${href[1]} -> ${want}, expected ${twinOf(rel)}`);
    }
  }
  if (!problems) ok("fallback notice appears exactly where a translation is missing");
}

/* == 16. the dictionary itself is complete ================================= */
console.log("== 16. interface strings are symmetric =============================");
{
  /* Both languages must define every key, non-empty, and use the same `{slots}`.
     A key missing from Vietnamese renders a literal `undefined` in the page; a
     slot renamed on one side renders the literal `{topic}`. Both would slip past
     the page checks if a key went unused, so the dictionary is audited directly. */
  const keys = Object.keys(UI);
  const en = Object.keys(UI.en);
  const problems = [];
  for (const lang of keys) {
    if (lang === "en") continue;
    const k = Object.keys(UI[lang]);
    const missing = en.filter((x) => !k.includes(x));
    const extra = k.filter((x) => !en.includes(x));
    if (missing.length) problems.push(`${lang} missing ${missing.length} key(s): ${missing.slice(0, 6).join(", ")}`);
    if (extra.length) problems.push(`${lang} has ${extra.length} key(s) not in en: ${extra.slice(0, 6).join(", ")}`);
    for (const key of en) {
      const a = UI.en[key], b = UI[lang][key];
      if (typeof b !== "string" || !b.trim()) problems.push(`${lang}.${key} is empty`);
      const slots = (s) => (String(s).match(/\{\w+\}/g) || []).slice().sort().join();
      if (typeof b === "string" && slots(a) !== slots(b))
        problems.push(`${lang}.${key} uses ${slots(b) || "no slots"}, en uses ${slots(a) || "none"}`);
    }
  }
  for (const key of en)
    if (!UI.en[key] || !String(UI.en[key]).trim()) problems.push(`en.${key} is empty`);
  // Every language declared in LANGS must have a dictionary and a folder.
  for (const [code, meta] of Object.entries(LANGS)) {
    if (!UI[code]) problems.push(`LANGS.${code} has no UI dictionary`);
    if (typeof meta.dir !== "string" || !meta.name || !meta.htmlLang)
      problems.push(`LANGS.${code} is missing dir/name/htmlLang`);
  }
  if (problems.length) for (const p of problems.slice(0, 20)) bad(p);
  else ok(`${en.length} key(s) x ${keys.length} language(s), complete and slot-compatible`);

  /* And no published page may still show a slot. Only the chrome is scanned —
     everything before <main> plus the footer — because `{text}` is legitimate
     lesson content inside a body: deck 12 teaches Emmet, where `{text}` IS the
     syntax. An unfilled interface string can only ever appear in the chrome. */
  let left = 0;
  const slot = /\{\w{1,12}\}/g;
  for (const [rel, s] of src) {
    // The copied decks are standalone documents written by another builder and
    // have no shell to scan, so they are skipped by presence of the switch —
    // the one thing every page() output must carry.
    if (!/<nav class="lang-switch"/.test(s)) continue;
    const head = s.split("<main id=\"main\"")[0] || "";
    const foot = (s.match(/<footer class="foot"[\s\S]*?<\/footer>/) || [""])[0];
    const hits = [...new Set((head + foot).match(slot) || [])];
    if (hits.length) {
      bad(`${rel} — unfilled interface slot in chrome: ${hits.slice(0, 4).join(", ")}`);
      left++;
    }
  }
  if (!left) ok("no generated page shows an unfilled {slot} in its chrome");
}



console.log("");
console.log(fail ? "SITE QA FAIL" : "SITE QA PASS");
process.exit(fail);
