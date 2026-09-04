/* =============================================================================
   INS2053 — canvas decks -> static HTML

     node _tools/build-html-slides.mjs            # build every deck
     node _tools/build-html-slides.mjs buoi-01    # build one (name or number)

   How it works
   ------------
   1. esbuild bundles one canvas deck per pass, with the bare import
      "qoder/canvas" aliased to _tools/canvas-runtime/canvas.jsx. react,
      react-dom/server and react/jsx-runtime stay external and are resolved
      from node_modules at import time.
   2. Importing the bundle and rendering the deck's root component makes
      <Presentation> record its slide list on the shared __deck collector.
      The root itself renders to nothing.
   3. Each recorded slide is then rendered on its own with
      renderToStaticMarkup and wrapped in a <section class="slide">.

   canvases/ is never modified. Output lands in slides-html/.
   ============================================================================= */

import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const CANVASES = path.join(ROOT, "canvases");
const RUNTIME = path.join(HERE, "canvas-runtime");
const OUT = path.join(ROOT, "slides-html");
const TMP = path.join(HERE, ".cache-html");

const COURSE = "INS2053 · Web Authoring & Web Management";

/* --- helpers -------------------------------------------------------------- */

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ESC[c]);

const posix = (p) => p.split(path.sep).join("/");

function fail(message, err) {
  console.error(`\n  FAIL  ${message}`);
  if (err) console.error(String(err.stack || err.message || err));
  process.exitCode = 1;
}

/* --- deck metadata -------------------------------------------------------- */

/** Pull the one-line italic tagline out of the matching Marp deck. */
async function tagline(sessionNumber, slideFiles) {
  const match = slideFiles.find((f) => f.startsWith(`${sessionNumber}-`));
  if (!match) return "";
  try {
    const text = await readFile(path.join(ROOT, "slides", match), "utf8");
    const line = /^\*([^*\n][^\n]*)\*\s*$/m.exec(text);
    return line ? line[1].trim() : "";
  } catch {
    return "";
  }
}

async function describeDeck(file, slideFiles, ebookFiles) {
  const base = file.replace(/\.canvas\.tsx$/, "");
  const session = /^buoi-(\d{2})$/.exec(base);
  const nn = session ? session[1] : null;

  const related = [];
  if (nn) {
    const chapter = ebookFiles.find((f) => f.startsWith(`${nn}-`));
    const deck = slideFiles.find((f) => f.startsWith(`${nn}-`));
    if (chapter) related.push(["Textbook chapter", `ebook/${chapter}`]);
    if (deck) related.push(["Marp slides", `slides/${deck}`]);
    if (existsSync(path.join(ROOT, "exercises", `session-${nn}`)))
      related.push(["In-class exercise", `exercises/session-${nn}/exercise.md`]);
    if (existsSync(path.join(ROOT, "homework", `session-${nn}`)))
      related.push(["Homework", `homework/session-${nn}/`]);
  }

  return {
    file,
    base,
    source: `canvases/${file}`,
    session: nn,
    kicker: nn ? `Session ${Number(nn)}` : "Course-wide",
    tagline: nn ? await tagline(nn, slideFiles) : "",
    related,
  };
}

/* --- bundling ------------------------------------------------------------- */

/** Bundle one deck to ESM in _tools/.cache-html, then import it.

    The entry is generated rather than the deck file itself: it re-exports the
    deck's default component *and* the runtime collector, so the builder reads
    the very same __deck object the bundled <Presentation> wrote to. */
async function loadDeck(file) {
  const outfile = path.join(TMP, file.replace(/\.canvas\.tsx$/, ".mjs"));
  const deckPath = posix(path.join(CANVASES, file));
  const runtimePath = posix(path.join(RUNTIME, "canvas.jsx"));

  await build({
    stdin: {
      contents: `export { default } from ${JSON.stringify(deckPath)};
export { __deck, __resetDeck } from ${JSON.stringify(runtimePath)};
`,
      resolveDir: ROOT,
      sourcefile: `entry-${file}.js`,
      loader: "js",
    },
    outfile,
    bundle: true,
    format: "esm",
    platform: "node",
    target: "node20",
    jsx: "automatic",
    jsxImportSource: "react",
    logLevel: "silent",
    external: ["react", "react/jsx-runtime", "react-dom", "react-dom/server"],
    alias: { "qoder/canvas": path.join(RUNTIME, "canvas.jsx") },
  });

  // cache-bust so repeated builds in one process pick up edits
  return import(`${pathToFileURL(outfile).href}?v=${Date.now()}`);
}

/* --- HTML assembly -------------------------------------------------------- */

/* React 19 emits <link rel="preload"> for <img src> right where the image sits.
   A <link> without itemprop is only valid inside <head>, so hoist them.
   The course itself teaches W3C validation, so the output has to validate. */
const LINK_RE = /<link\b[^>]*\/?>/g;

function hoistLinks(html, sink) {
  return html.replace(LINK_RE, (tag) => {
    if (!sink.includes(tag)) sink.push(tag);
    return "";
  });
}

function backgroundAttrs(bg) {
  if (!bg) return "";
  const style = [];
  if (bg.color) style.push(`--slide-bg:${bg.color}`);
  if (bg.accent)
    style.push(
      `--pattern-accent:color-mix(in srgb, ${bg.accent} 26%, transparent)`
    );
  if (bg.accentSecondary)
    style.push(
      `--pattern-accent-2:color-mix(in srgb, ${bg.accentSecondary} 22%, transparent)`
    );
  return (
    (bg.pattern ? ` data-pattern="${esc(bg.pattern)}"` : "") +
    (style.length ? ` style="${esc(style.join(";"))}"` : "")
  );
}

function slideSection(slide, total) {
  const n = slide.index + 1;
  const heading = slide.title || `Slide ${n}`;
  const notes = slide.notes
    ? `\n      <details class="slide-notes">
        <summary>Speaker notes</summary>
        <div class="slide-notes-body">${esc(slide.notes)}</div>
      </details>`
    : "";

  return `    <section class="slide" id="${esc(slide.id)}"${backgroundAttrs(
    slide.background
  )} aria-labelledby="h-${esc(slide.id)}">
      <header class="slide-head">
        <span class="slide-index" aria-hidden="true">${n}</span>
        <h2 id="h-${esc(slide.id)}">${esc(heading)}</h2>
        <span class="visually-hidden">Slide ${n} of ${total}</span>
        <a class="slide-anchor" href="#${esc(
          slide.id
        )}" aria-label="Link to this slide">#</a>
      </header>
      <div class="slide-body">
${slide.html}
      </div>${notes}
    </section>`;
}

function shell({ title, subtitle, bodyClass, head, main, footer, extraHead = [] }) {
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(subtitle)}">
<meta name="generator" content="_tools/build-html-slides.mjs">
<link rel="stylesheet" href="assets/deck.css">
${extraHead.join("\n")}${extraHead.length ? "\n" : ""}</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}>
<a class="skip-link" href="#main">Skip to content</a>
${head}
<div class="shell">
${main}
</div>
${footer}
<script src="assets/deck.js" defer></script>
</body>
</html>
`;
}


function topbar(title, extraButtons = "") {
  return `<div class="progress-track" aria-hidden="true"><div class="progress-bar" id="progress-bar"></div></div>
<header class="topbar">
  <div class="topbar-brand">
    <span class="topbar-course">${esc(COURSE)}</span>
    <span class="topbar-title">${esc(title)}</span>
  </div>
  <div class="topbar-actions">
${extraButtons}    <button class="btn" id="theme-toggle" type="button" aria-pressed="false">
      <span aria-hidden="true">◐</span><span class="btn-label">Light</span>
    </button>
  </div>
</header>`;
}

function deckPage(meta, slides) {
  const total = slides.length;
  const title = slides[0]?.title || meta.base;
  const extraHead = [];

  const toc = slides
    .map(
      (s) =>
        `      <li><a href="#${esc(s.id)}"><span class="toc-num">${
          s.index + 1
        }</span><span>${esc(s.title || `Slide ${s.index + 1}`)}</span></a></li>`
    )
    .join("\n");

  const related = meta.related
    .map(
      ([label, file]) =>
        `        <div><span class="k">${esc(label)}</span><span class="v"><code>${esc(
          file
        )}</code></span></div>`
    )
    .join("\n");

  const hero = `    <section class="hero" id="deck-top">
      <span class="hero-kicker">${esc(meta.kicker)}</span>
      <h1>${esc(title)}</h1>
      ${meta.tagline ? `<p class="hero-sub">${esc(meta.tagline)}</p>` : ""}
      <div class="hero-meta">
        <div><span class="k">Slides</span><span class="v">${total}</span></div>
        <div><span class="k">Source</span><span class="v"><code>${esc(
          meta.source
        )}</code></span></div>
${related}
      </div>
    </section>`;

  const main = `  <nav class="toc" aria-label="Slide navigation">
    <div class="toc-head">
      <h2>Slides</h2>
      <span class="toc-count" id="slide-counter">1 / ${total}</span>
    </div>
    <label class="visually-hidden" for="toc-search">Filter slides</label>
    <input class="toc-search" id="toc-search" type="search" placeholder="Filter slides…  (press /)" autocomplete="off">
    <ol class="toc-list">
${toc}
    </ol>
    <p class="toc-empty" id="toc-empty" hidden>No slide matches that filter.</p>
  </nav>
  <main class="slides" id="main">
${hero}
${slides.map((s) => hoistLinks(slideSection(s, total), extraHead)).join("\n")}
  </main>`;

  const buttons = `    <a class="btn" href="index.html"><span aria-hidden="true">↩</span><span class="btn-label">All decks</span></a>
    <button class="btn" id="expand-toggle" type="button" aria-pressed="false">
      <span aria-hidden="true">⌄</span><span class="btn-label">Expand notes</span>
    </button>
    <button class="btn" id="notes-toggle" type="button" aria-pressed="true">
      <span aria-hidden="true">✎</span><span class="btn-label">Notes</span>
    </button>
`;

  return shell({
    title: `${title} — ${COURSE}`,
    subtitle: meta.tagline || `${meta.kicker} lecture slides`,
    bodyClass: "page-deck",
    extraHead,
    head: topbar(title, buttons),
    main,
    footer: `<button class="backtotop" id="backtotop" type="button" aria-label="Back to top">↑</button>
<footer class="deck-footer">
  <p>Generated from <code>${esc(
    meta.source
  )}</code>. Keys: <kbd>j</kbd>/<kbd>k</kbd> next &amp; previous slide · <kbd>/</kbd> filter · <kbd>n</kbd> notes · <kbd>t</kbd> theme.</p>
</footer>`,
  });
}


/** A deck that is one long scrolling document rather than a Presentation. */
function documentPage(meta, html) {
  const extraHead = [];
  const body = hoistLinks(html, extraHead);
  const title = meta.base
    .replace(/^ins2053-/, "INS2053 ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const main = `  <main class="slides" id="main">
    <section class="hero">
      <span class="hero-kicker">${esc(meta.kicker)}</span>
      <h1>${esc(title)}</h1>
      <p class="hero-sub">Single-page dashboard, not a slide deck. Read while preparing, or screen-share once.</p>
      <div class="hero-meta">
        <div><span class="k">Source</span><span class="v"><code>${esc(
          meta.source
        )}</code></span></div>
      </div>
    </section>
    <section class="slide" id="content" aria-labelledby="h-content">
      <header class="slide-head">
        <span class="slide-index" aria-hidden="true">≡</span>
        <h2 id="h-content">Syllabus dashboard</h2>
      </header>
      <div class="slide-body">
${body}
      </div>
    </section>
  </main>`;

  return shell({
    title: `${title} — ${COURSE}`,
    subtitle: "Course overview dashboard",
    bodyClass: "page-index",
    extraHead,
    head: topbar(
      title,
      `    <a class="btn" href="index.html"><span aria-hidden="true">↩</span><span class="btn-label">All decks</span></a>\n`
    ),
    main,
    footer: `<button class="backtotop" id="backtotop" type="button" aria-label="Back to top">↑</button>
<footer class="deck-footer"><p>Generated from <code>${esc(
      meta.source
    )}</code>.</p></footer>`,
  });
}

function indexPage(built) {
  const sessions = built.filter((d) => d.session);
  const extras = built.filter((d) => !d.session);

  const card = (d) =>
    `    <a class="deck-card" href="${esc(d.out)}">
      <span class="deck-card-num">${esc(d.kicker)}</span>
      <h3>${esc(d.title)}</h3>
      ${d.tagline ? `<p>${esc(d.tagline)}</p>` : ""}
      <span class="deck-card-meta">${
        d.slideCount ? `${d.slideCount} slides` : "Scrolling document"
      } · <code>${esc(d.file)}</code></span>
    </a>`;

  const main = `  <main class="slides" id="main">
    <section class="hero">
      <span class="hero-kicker">Lecture slides · HTML</span>
      <h1>INS2053 — Web Authoring &amp; Web Management</h1>
      <p class="hero-sub">Every canvas deck rendered as a standalone HTML page: full slide text, all ${built.reduce(
        (n, d) => n + (d.slideCount || 0),
        0
      )} slides, every teaching diagram, and the speaker notes. Works offline, prints to PDF, no build step to view.</p>
      <div class="hero-meta">
        <div><span class="k">Decks</span><span class="v">${built.length}</span></div>
        <div><span class="k">Sessions</span><span class="v">${sessions.length}</span></div>
        <div><span class="k">Total slides</span><span class="v">${built.reduce(
          (n, d) => n + (d.slideCount || 0),
          0
        )}</span></div>
      </div>
    </section>

    <div class="section-head">
      <h2>Weekly sessions</h2>
      <p>One page per session, in teaching order. Each page carries its own slide index, speaker notes and light/dark toggle.</p>
    </div>
    <div class="deck-grid">
${sessions.map(card).join("\n")}
    </div>
${
  extras.length
    ? `
    <div class="section-head">
      <h2>Course-wide material</h2>
      <p>Revision deck and the syllabus dashboard.</p>
    </div>
    <div class="deck-grid">
${extras.map(card).join("\n")}
    </div>`
    : ""
}
  </main>`;

  return shell({
    title: `Lecture slides — ${COURSE}`,
    subtitle: "All INS2053 lecture decks as HTML",
    bodyClass: "page-index",
    head: topbar("All lecture decks"),
    main,
    footer: `<footer class="deck-footer"><p>Generated by <code>_tools/build-html-slides.mjs</code> from <code>canvases/*.canvas.tsx</code>. Rebuild with <code>npm run build:slides</code>.</p></footer>`,
  });
}


/* --- main ----------------------------------------------------------------- */

async function main() {
  const argv = process.argv.slice(2);
  const wanted = argv.filter((a) => !a.startsWith("-"));

  const all = (await readdir(CANVASES)).filter((f) => f.endsWith(".canvas.tsx")).sort();
  const files = wanted.length
    ? all.filter((f) =>
        wanted.some((w) => {
          const norm = w.replace(/\.canvas\.tsx$/, "");
          return (
            f === w ||
            f.startsWith(`${norm}.`) ||
            f === `buoi-${norm.padStart(2, "0")}.canvas.tsx`
          );
        })
      )
    : all;

  if (!files.length) {
    fail(`no deck matched ${wanted.join(", ")}. Available: ${all.join(", ")}`);
    return;
  }

  const slideFiles = existsSync(path.join(ROOT, "slides"))
    ? await readdir(path.join(ROOT, "slides"))
    : [];
  const ebookFiles = existsSync(path.join(ROOT, "ebook"))
    ? await readdir(path.join(ROOT, "ebook"))
    : [];

  await rm(TMP, { recursive: true, force: true });
  await mkdir(TMP, { recursive: true });
  await mkdir(path.join(OUT, "assets"), { recursive: true });

  const built = [];
  const usedAssets = new Set();

  for (const file of files) {
    process.stdout.write(`  ${file.padEnd(30)}`);
    try {
      const mod = await loadDeck(file);
      const Deck = mod.default;
      if (typeof Deck !== "function")
        throw new Error("deck has no default-exported component");

      // Reset the collector through the bundle's own copy of the runtime.
      mod.__resetDeck?.();
      const rootHtml = renderToStaticMarkup(createElement(Deck));
      const deck = mod.__deck;

      const meta = await describeDeck(file, slideFiles, ebookFiles);
      (deck?.assets || []).forEach((a) => usedAssets.add(a));

      let html;
      let slideCount = 0;
      let title;

      if (deck?.isPresentation && deck.slides.length) {
        const slides = deck.slides.map((s) => ({
          ...s,
          html: renderToStaticMarkup(s.node),
        }));
        slideCount = slides.length;
        title = slides[0].title || meta.base;
        html = deckPage(meta, slides);
      } else {
        title = meta.base;
        html = documentPage(meta, rootHtml);
      }

      const out = `${meta.base}.html`;
      await writeFile(path.join(OUT, out), html, "utf8");
      built.push({ ...meta, out, title, slideCount });
      console.log(
        `-> ${out.padEnd(28)} ${
          slideCount ? `${String(slideCount).padStart(2)} slides` : "document"
        }`
      );
    } catch (err) {
      console.log("");
      fail(`${file} did not build`, err);
    }
  }

  if (!built.length) {
    fail("nothing was built");
    return;
  }

  /* static assets */
  for (const name of ["deck.css", "deck.js"])
    await cp(path.join(RUNTIME, name), path.join(OUT, "assets", name));

  for (const rel of usedAssets) {
    const from = path.join(CANVASES, rel);
    if (existsSync(from))
      await cp(from, path.join(OUT, "assets", path.basename(rel)));
    else console.log(`  note  asset referenced but missing: canvases/${posix(rel)}`);
  }

  /* index: only rewrite the full listing when a full build ran */
  if (built.length === all.length) {
    await writeFile(path.join(OUT, "index.html"), indexPage(built), "utf8");
    console.log(`  ${"index.html".padEnd(30)}-> ${built.length} decks listed`);
  } else if (!existsSync(path.join(OUT, "index.html"))) {
    await writeFile(path.join(OUT, "index.html"), indexPage(built), "utf8");
  }

  await rm(TMP, { recursive: true, force: true });

  const slides = built.reduce((n, d) => n + d.slideCount, 0);
  console.log(
    `\n  OK  ${built.length} deck(s), ${slides} slides -> ${posix(
      path.relative(ROOT, OUT)
    )}/index.html`
  );
}

main().catch((err) => fail("build crashed", err));

