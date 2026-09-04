/* =============================================================================
   INS2053 — QA sweep for the generated HTML lecture slides.

     node _tools/qa-html-slides.mjs

   Non-destructive: reads slides-html/ and canvases/ only. Exits 1 on any hard
   failure so it can gate publishing, like _tools/qa-canvases.js does for the
   canvas sources.

   Ten checks, in the order a lecturer would notice a problem:
     1. coverage       every canvas has a page, every page has a canvas
     2. structure      doctype, lang, charset, viewport, single <h1>, unique ids
     3. parity         slides, notes, titles and index entries match the source
     4. links          every #anchor and every *.html link resolves
     5. assets         every assets/* reference exists on disk, nothing orphaned
     6. tokens         every var(--x) used is defined in deck.css
     7. leaks          no undefined / NaN / [object Object] / raw t.* in output
     8. a11y           svg role+label, img alt, skip link, heading order
     9. encoding       valid UTF-8, no mojibake, glyphs intact
    10. fidelity       every prose string in the deck appears on the page
   ========================================================================== */

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const CANVASES = path.join(ROOT, "canvases");
const OUT = path.join(ROOT, "slides-html");
const ASSETS = path.join(OUT, "assets");

let fail = 0;
const bad = (msg) => {
  console.log(`  BAD   ${msg}`);
  fail = 1;
};
const warn = (msg) => console.log(`  warn  ${msg}`);
const ok = (msg) => console.log(`  ok    ${msg}`);
const head = (n, title) =>
  console.log(`\n== ${n}. ${title} ${"=".repeat(Math.max(0, 62 - title.length))}`);

const count = (s, re) => (s.match(re) || []).length;
const all = (s, re, g = 1) => [...s.matchAll(re)].map((m) => m[g]);

if (!existsSync(OUT)) {
  // throw, not process.exit(): exit() would truncate buffered stdout, and the
  // non-zero exit code still gates publishing.
  throw new Error("slides-html/ is missing — run: npm run build:slides");
}

/* --- load ----------------------------------------------------------------- */

const pages = (await readdir(OUT)).filter((f) => f.endsWith(".html")).sort();
const html = new Map();
for (const p of pages) html.set(p, await readFile(path.join(OUT, p), "utf8"));

const canvasFiles = (await readdir(CANVASES))
  .filter((f) => f.endsWith(".canvas.tsx"))
  .sort();
const canvasSrc = new Map();
for (const f of canvasFiles)
  canvasSrc.set(f, await readFile(path.join(CANVASES, f), "utf8"));

const assetFiles = existsSync(ASSETS) ? (await readdir(ASSETS)).sort() : [];
const css = existsSync(path.join(ASSETS, "deck.css"))
  ? await readFile(path.join(ASSETS, "deck.css"), "utf8")
  : "";

console.log(
  `\n  ${pages.length} page(s), ${canvasFiles.length} canvas(es), ${assetFiles.length} asset(s)`
);

/* --- 1. coverage ---------------------------------------------------------- */
head(1, "coverage: one page per canvas, no strays");
{
  const expected = canvasFiles.map((f) => f.replace(/\.canvas\.tsx$/, ".html"));
  for (const e of expected)
    if (!pages.includes(e)) bad(`missing page for canvas -> ${e}`);
  if (!pages.includes("index.html")) bad("missing slides-html/index.html");

  const known = new Set([...expected, "index.html"]);
  for (const p of pages)
    if (!known.has(p)) bad(`stray page with no canvas source -> ${p}`);

  if (!fail) ok(`${expected.length} deck pages + index.html, nothing extra`);
}

/* --- 2. structure --------------------------------------------------------- */
head(2, "document structure");
for (const [p, s] of html) {
  const problems = [];
  if (!/^<!DOCTYPE html>/i.test(s)) problems.push("no doctype");
  if (!/<html lang="[a-z-]+"/i.test(s)) problems.push("no lang on <html>");
  if (!/<meta charset="UTF-8">/i.test(s)) problems.push("no charset");
  if (!/name="viewport"/.test(s)) problems.push("no viewport");
  if (!/<title>[^<]+<\/title>/.test(s)) problems.push("empty title");
  if (!/<meta name="description" content="[^"]+"/.test(s))
    problems.push("empty description");

  const h1 = count(s, /<h1[\s>]/g);
  if (h1 !== 1) problems.push(`${h1} <h1> (want exactly 1)`);

  const bodyAt = s.indexOf("<body");
  if (bodyAt < 0) problems.push("no <body>");
  else if (count(s.slice(bodyAt), /<link\b/g) > 0)
    problems.push("<link> inside <body> (invalid without itemprop)");

  const ids = all(s, /\sid="([^"]+)"/g);
  const dup = [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))];
  if (dup.length) problems.push(`duplicate id: ${dup.slice(0, 4).join(", ")}`);

  if (!/<main[\s>]/.test(s)) problems.push("no <main> landmark");

  if (problems.length) problems.forEach((m) => bad(`${p} :: ${m}`));
  else ok(`${p.padEnd(26)} doctype, lang, meta, 1 h1, unique ids, <main>`);
}

/* --- 3. parity with the canvas sources ------------------------------------ */
head(3, "parity with canvases/: slides, notes, titles, index");
for (const f of canvasFiles) {
  const page = f.replace(/\.canvas\.tsx$/, ".html");
  const s = html.get(page);
  if (!s) continue;
  const src = canvasSrc.get(f);
  const want = count(src, /<PresentationSlide[\s>]/g);
  const got = count(s, /<section class="slide"/g);
  const notesWant = count(src, /\snotes=/g);
  const notesGot = count(s, /class="slide-notes"/g);
  const problems = [];

  if (want === 0) {
    // Scrolling document (no <Presentation>): rendered as a single section.
    if (got !== 1) bad(`${page} :: document deck should be 1 section, got ${got}`);
    else ok(`${page.padEnd(26)} scrolling document (1 section)`);
    continue;
  }

  if (got !== want) problems.push(`${got} sections but source has ${want} slides`);
  if (notesGot !== notesWant)
    problems.push(`${notesGot} notes blocks but source has ${notesWant}`);

  // Every slide is reachable from the index, and the index has no extras.
  const tocGot = count(s, /<li><a href="#/g);
  if (tocGot !== got) problems.push(`${tocGot} index entries for ${got} slides`);

  // Every title written in the deck survives into the page. Escape exactly the
  // way the builder's esc() does, apostrophes included.
  const E = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const escd = (t) => t.replace(/[&<>"']/g, (c) => E[c]);
  const titles = all(src, /<PresentationSlide[^>]*?\stitle="([^"]+)"/gs);
  const lost = titles.filter((t) => !s.includes(escd(t)));
  if (lost.length)
    problems.push(`${lost.length} title(s) missing, e.g. "${lost[0].slice(0, 40)}"`);

  if (problems.length) problems.forEach((m) => bad(`${page} :: ${m}`));
  else
    ok(
      `${page.padEnd(26)} ${got} slides, ${notesGot} notes, ${titles.length} titles, index — matches source`
    );
}

/* --- 4. links ------------------------------------------------------------- */
head(4, "internal links resolve");
for (const [p, s] of html) {
  const ids = new Set(all(s, /\sid="([^"]+)"/g));
  let broken = 0;
  for (const href of all(s, /href="#([^"]+)"/g))
    if (!ids.has(href)) {
      bad(`${p} :: dead anchor #${href}`);
      broken++;
    }
  for (const href of all(s, /href="([A-Za-z0-9._-]+\.html)"/g))
    if (!existsSync(path.join(OUT, href))) {
      bad(`${p} :: dead page link ${href}`);
      broken++;
    }
  if (/href="https?:/.test(s)) warn(`${p} :: has an external link (offline use)`);
  if (!broken) ok(`${p.padEnd(26)} all anchors and page links resolve`);
}

/* --- 5. assets ------------------------------------------------------------ */
head(5, "asset references");
{
  const used = new Set();
  for (const [p, s] of html) {
    for (const ref of all(s, /(?:src|href)="(assets\/[^"]+)"/g)) {
      used.add(path.basename(ref));
      if (!existsSync(path.join(OUT, ref))) bad(`${p} :: missing ${ref}`);
    }
  }
  for (const a of assetFiles)
    if (!used.has(a)) warn(`assets/${a} is never referenced`);
  ok(`${used.size} asset(s) referenced, all present on disk`);
}

/* --- 6. CSS custom properties -------------------------------------------- */
head(6, "theme tokens are defined in deck.css");
{
  const defined = new Set(all(css, /(--[A-Za-z0-9-]+)\s*:/g));
  const missing = new Map();
  for (const [p, s] of html)
    for (const name of all(s, /var\((--[A-Za-z0-9-]+)/g))
      if (!defined.has(name)) missing.set(name, p);

  if (!defined.size) bad("assets/deck.css has no custom properties — not copied?");
  for (const [name, p] of missing) bad(`${name} used in ${p} but never defined`);
  if (!missing.size && defined.size)
    ok(`${defined.size} properties defined, every var() reference resolves`);
}

/* --- 7. leaked placeholders ---------------------------------------------- */
head(7, "no leaked values in the rendered output");
{
  const before = fail;
  const patterns = [
    [/\[object Object\]/, "[object Object]"],
    [/>undefined</, ">undefined<"],
    [/="undefined"/, 'attribute value "undefined"'],
    [/var\(--undefined/, "var(--undefined)"],
    [/&amp;lt;/, "double-escaped &lt;"],
    [/\bt\.(?:chart|text|bg|fill|stroke|accent)\.[a-zA-Z]/, "raw t.* token"],
  ];
  for (const [p, s] of html) {
    const hits = patterns.filter(([re]) => re.test(s)).map(([, label]) => label);
    if (hits.length) bad(`${p} :: ${hits.join(", ")}`);
  }
  if (fail === before) ok("no placeholder, token or double-escape leaks");
}

/* --- 8. accessibility ---------------------------------------------------- */
head(8, "accessibility");
for (const [p, s] of html) {
  const problems = [];

  const svgTags = s.match(/<svg\b[^>]*>/g) || [];
  const noRole = svgTags.filter((t) => !/role="img"/.test(t)).length;
  const noLabel = svgTags.filter((t) => !/aria-label="/.test(t)).length;
  if (noRole) problems.push(`${noRole}/${svgTags.length} svg without role="img"`);
  if (noLabel) problems.push(`${noLabel}/${svgTags.length} svg without aria-label`);

  const imgTags = s.match(/<img\b[^>]*>/g) || [];
  const noAlt = imgTags.filter((t) => !/\salt="/.test(t)).length;
  if (noAlt) problems.push(`${noAlt}/${imgTags.length} img without alt`);

  if (!/href="#main"/.test(s)) problems.push("no skip link");
  else if (!/\sid="main"/.test(s)) problems.push("skip-link target #main missing");

  // Heading order: no level jumps (h1 -> h3 etc.)
  const levels = all(s, /<h([1-6])[\s>]/g).map(Number);
  for (let i = 1; i < levels.length; i++)
    if (levels[i] > levels[i - 1] + 1) {
      problems.push(`heading jump h${levels[i - 1]} -> h${levels[i]}`);
      break;
    }

  const buttons = s.match(/<button\b[^>]*>/g) || [];
  const noType = buttons.filter((t) => !/type="/.test(t)).length;
  if (noType) problems.push(`${noType} button(s) without type`);

  if (problems.length) problems.forEach((m) => bad(`${p} :: ${m}`));
  else
    ok(
      `${p.padEnd(26)} ${svgTags.length} svg labelled, ${imgTags.length} img alt, skip link, headings`
    );
}

/* --- 9. encoding --------------------------------------------------------- */
head(9, "UTF-8 round-trip");
{
  const before = fail;
  // The decks are written in English on purpose (qa-canvases.js check 8 enforces
  // English SVG labels), so there are no diacritics to verify. What can still
  // break is the typography the shell and the decks do use: — · ↩ ✎ ◐ ⌄ ↑ ≡.
  for (const [p, s] of html) {
    if (s.includes("\uFFFD")) bad(`${p} :: U+FFFD replacement character`);
    if (/Ã[\u0080-\u00bf]|â€”|â€¢|Ä‘|á»|Æ°/.test(s))
      bad(`${p} :: UTF-8 bytes decoded as Latin-1 (mojibake)`);
    // "·" is in the course name, so it is on every page. The nav glyphs only
    // exist on deck pages — index.html has no back link and no back-to-top.
    const want = p === "index.html" ? ["·"] : ["·", "↩", "↑"];
    const missing = want.filter((g) => !s.includes(g));
    if (missing.length) bad(`${p} :: lost glyph ${missing.join(" ")}`);
  }
  if (fail === before)
    ok(`${html.size} pages are clean UTF-8, typographic glyphs intact`);
}

/* --- 10. prose fidelity --------------------------------------------------- */
head(10, "deck prose reaches the page");
{
  const before = fail;
  const E = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const norm = (s) => s.replace(/\s+/g, " ").trim();
  const unesc = (s) =>
    s
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");

  for (const f of canvasFiles) {
    const page = f.replace(/\.canvas\.tsx$/, ".html");
    const raw = html.get(page);
    if (!raw) continue;

    // Two views of the page: markup kept (aria-label text lives inside tags),
    // and markup stripped (the highlighter wraps code tokens in <span>, so a
    // code literal is only contiguous once tags are gone).
    const withTags = norm(unesc(raw));
    const textOnly = norm(unesc(raw.replace(/<[^>]+>/g, "")));

    const src = canvasSrc
      .get(f)
      // Template literals are <Code> samples: the renderer adds line numbers
      // between lines, so they are not contiguous text. Verified visually and
      // by check 7 instead.
      .replace(/`[^`]*`/gs, '""')
      // <Presentation height=… aria-label=…> are host-only props with no HTML
      // counterpart; the builder supplies its own shell.
      .replace(/<Presentation\b[^>]*>/s, "<Presentation>");

    const prose = [
      ...new Set(
        [...src.matchAll(/"([^"\\]{25,}?)"/gs)]
          .map((m) => norm(m[1]))
          .filter((s) => / /.test(s)) // a sentence, not an identifier
          .filter((s) => !/[<>{}=;]|\.\.\.|https?:|\/\//.test(s)) // not code
          // A "..." match can start inside a single-quoted literal and end at
          // the next double quote, capturing the code in between. Those spans
          // always show a literal boundary (', ) or a token/prop reference.
          .filter(
            (s) =>
              !/',|\],|,\s*[a-z]+:|\bt\.(?:chart|text|bg|fill|stroke|accent)\./.test(s)
          )
      ),
    ];

    const lost = prose.filter((s) => {
      const e = s.replace(/[&<>"']/g, (c) => E[c]);
      return (
        !withTags.includes(s) &&
        !textOnly.includes(s) &&
        !withTags.includes(e) &&
        !textOnly.includes(e)
      );
    });

    if (lost.length)
      lost
        .slice(0, 3)
        .forEach((s) => bad(`${page} :: prose not in page — "${s.slice(0, 60)}"`));
    else ok(`${page.padEnd(26)} ${prose.length} prose strings all present`);
  }
  if (fail === before) ok("no slide text was dropped in translation");
}

/* --- verdict -------------------------------------------------------------- */
console.log(
  fail
    ? "\nQA FAIL — fix the BAD lines above, then re-run npm run build:slides\n"
    : "\nQA PASS — slides-html/ is ready to teach from (warn lines are advisory)\n"
);
// exitCode, not exit(): process.exit() truncates buffered stdout when the
// output is redirected to a file or a pipe.
process.exitCode = fail;
