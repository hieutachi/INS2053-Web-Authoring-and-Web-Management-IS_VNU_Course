/* =============================================================================
   INS2053 — course materials -> public static site

     node _tools/build-site.mjs

   What gets published
   -------------------
   PUBLISH_ONLY below is an allowlist, deliberately not a denylist. The course
   repo also holds exam solutions, marking rubrics and 56 exercise answer keys;
   a denylist that forgets one entry leaks answers to students. If it is not
   named here, it does not reach site/.

     ebook/       15 chapters + Appendix A   -> site/ebook/NN-slug.html
     slides-html/ 17 prebuilt decks (copied) -> site/slides/
     homework/    15 sheets                  -> site/homework/session-NN.html

   Never published: exams/ (papers, rubrics, worked solutions), project/rubric.md,
   project/milestones.md, exercises/ (in-class, carries answer keys in <details>).
   _tools/qa-site.mjs re-checks this after every build and fails on a leak.

   Markdown is rendered with marked, not a hand-rolled regex. Three features in
   these chapters break naive renderers:
     1. 261 <details> answer blocks, which must survive as real markup;
     2. code fences containing literal HTML (the course teaches HTML), which
        must be escaped as text rather than parsed;
     3. `# ` bash comments INSIDE fences in chapters 02, 11 and 15 — a `^# `
        regex reads those as headings and builds a wrong table of contents.
   marked's lexer tracks fence state, so the contents list is taken from it.

   Heading levels are shifted down one: the page supplies the single <h1>, so a
   markdown `#` becomes <h2>. That keeps one h1 per document.
   ============================================================================= */

import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const OUT = path.join(ROOT, "site");
const ASSETS = path.join(HERE, "site-assets");

const COURSE = "INS2053 · Web Authoring & Web Management";
const SCHOOL = "International School, Vietnam National University, Hanoi";

/** Allowlist. Anything absent from this list is not published. */
const PUBLISH_ONLY = ["ebook", "slides-html", "homework"];

/** Kept out of the site even if a stray link points at them. */
const NEVER_PUBLISH = ["exams", "exercises", "project", "canvases", "_tools", "_archive"];

/* --- helpers -------------------------------------------------------------- */

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ESC[c]);

/**
 * Turn rendered inline HTML back into plain text.
 *
 * `parser.parseInline` returns HTML, so a heading like `What Is a "Site"?` comes
 * back holding the literal characters `&quot;`. Stripping tags leaves that entity
 * sitting in the string as text, and `esc()` then escapes its `&` a second time —
 * the page shows `&quot;` to the reader. Decoding here keeps every label plain, so
 * `esc()` escapes exactly once at the point of output.
 */
const UNESC = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
  "&#39;": "'", "&#x27;": "'", "&apos;": "'", "&nbsp;": " ",
};
const unesc = (s) =>
  String(s ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/&(?:amp|lt|gt|quot|#39|#x27|apos|nbsp);/g, (m) => UNESC[m] ?? m);

/** Strip markdown emphasis and inline code so a heading can go in a <title>. */
const plain = (s) =>
  String(s ?? "")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]*)\*\*/g, "$1")
    .replace(/\*([^*]*)\*/g, "$1")
    .trim();

/** GitHub-style slug, used for in-page anchors. */
function slugify(text) {
  return plain(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function fail(message, err) {
  console.error(`\n  FAIL  ${message}`);
  if (err) console.error(String(err.stack || err.message || err));
  process.exitCode = 1;
}

/* --- markdown ------------------------------------------------------------- */

/** Shift every heading down one level and give it a stable anchor id. */
function makeRenderer(headings) {
  const renderer = new marked.Renderer();
  const seen = new Map();

  renderer.heading = function heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const label = plain(unesc(this.parser.parseInline(tokens)));
    let id = slugify(label) || `section-${headings.length + 1}`;
    if (seen.has(id)) {
      const n = seen.get(id) + 1;
      seen.set(id, n);
      id = `${id}-${n}`;
    } else {
      seen.set(id, 1);
    }
    const level = Math.min(depth + 1, 6);
    // Only depth 1 and 2 reach the contents list; deeper headings would bury it.
    if (depth <= 2) headings.push({ id, label, depth });
    return `<h${level} id="${id}">${text}<a class="anchor" href="#${id}" aria-label="Link to this section">#</a></h${level}>\n`;
  };

  return renderer;
}

/** Render one markdown document. Returns { html, headings }. */
function render(markdown) {
  const headings = [];

  // `marked` treats a `<details>` block as raw HTML and does not process the
  // markdown inside the `<summary>` line. Two consequences in these chapters:
  // inline code spans stay as literal backticks (4 lines), and a real tag
  // written as prose becomes a live element — chapter 08 has `<h1>` in a
  // summary, which produced a SECOND h1 on the page and broke the one-h1 rule.
  //
  // So render each summary's inner text as inline markdown first, and escape
  // any tag that was meant to be read rather than executed.
  const prepared = markdown.replace(
    /<summary>([\s\S]*?)<\/summary>/g,
    (_all, inner) => {
      const escaped = inner
        // Protect code spans first: their contents are always literal text.
        .replace(/`([^`]+)`/g, (_m, code) => "`" + code.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "`")
        // Then any bare tag left outside a code span.
        .replace(/<(\/?[a-z][a-z0-9]*)>/gi, "&lt;$1&gt;");
      return `<summary>${marked.parseInline(escaped, { gfm: true })}</summary>`;
    }
  );

  const html = marked.parse(prepared, {
    renderer: makeRenderer(headings),
    gfm: true,
    breaks: false,
  });
  return { html, headings };
}

/* --- the course map ------------------------------------------------------- */

/**
 * One entry per teaching week. `topic` is the short label used in navigation;
 * the full title comes from the chapter's own second line at build time.
 *
 * Homework numbering is offset by design and matches schedule.md: the sheet set
 * in session N is collected at the start of week N+1, so session 1 sets HW 01
 * and it appears in the week 2 row of the schedule. Session 15 sets HW 15,
 * which is the last sheet of the course.
 */
const SESSIONS = [
  { n: 1, topic: "Introduction to Dreamweaver & Web Fundamentals" },
  { n: 2, topic: "Creating a New Site & Organizing Your Project" },
  { n: 3, topic: "Working with Text and Images" },
  { n: 4, topic: "Applying CSS to Your Website" },
  { n: 5, topic: "Creating Page Layouts" },
  { n: 6, topic: "Creating Page Layouts (Continued)" },
  { n: 7, topic: "CSS3 and Web Fonts" },
  { n: 8, topic: "Review & Midterm Exam Preparation", midterm: true },
  { n: 9, topic: "Working with Tables" },
  { n: 10, topic: "Embedding Flash, Video and Sound" },
  { n: 11, topic: "Designing a Compact Site" },
  { n: 12, topic: "Using Code-Editing Tools" },
  { n: 13, topic: "Creating Forms" },
  { n: 14, topic: "Working with Spry Framework" },
  { n: 15, topic: "Mobile Interface Design and Review" },
];

const pad = (n) => String(n).padStart(2, "0");

/* --- page shell ----------------------------------------------------------- */

/**
 * One shell for every page. `crumbs` is an array of {href,label}; the last entry
 * is rendered as plain text because it is the current page.
 */
function page({ title, heading, lead, crumbs = [], toc = [], body, depth = 0 }) {
  const base = depth === 0 ? "." : "..";
  const nav = crumbs
    .map((c, i) =>
      i === crumbs.length - 1
        ? `<span aria-current="page">${esc(c.label)}</span>`
        : `<a href="${c.href}">${esc(c.label)}</a>`
    )
    .join('<span class="sep" aria-hidden="true">/</span>');

  const contents = toc.length
    ? `<nav class="toc" aria-labelledby="toc-h">
      <h2 id="toc-h">On this page</h2>
      <ol>
${toc
  .map(
    (h) =>
      `        <li class="d${h.depth}"><a href="#${h.id}">${esc(h.label)}</a></li>`
  )
  .join("\n")}
      </ol>
    </nav>`
    : "";

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(lead || title)}">
<link rel="stylesheet" href="${base}/assets/site.css">
<script>
/* Set the theme before first paint, otherwise a dark-theme reader sees a white
   flash on every navigation. Same storage key as the slide decks. */
(function(){try{var t=localStorage.getItem("ins2053.theme");if(!t&&window.matchMedia)
t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light");}catch(e){}})();
</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="bar">
  <a class="home" href="${base}/index.html">${esc(COURSE)}</a>
  <button class="theme" type="button" data-theme-toggle aria-label="Switch between light and dark theme">Theme</button>
</header>
${nav ? `<nav class="crumbs" aria-label="Breadcrumb">${nav}</nav>` : ""}
<main id="main">
  <h1>${esc(heading)}</h1>
${lead ? `  <p class="lead">${esc(lead)}</p>\n` : ""}${contents}
${body}
</main>
<footer class="foot">
  <p>${esc(COURSE)} — ${esc(SCHOOL)}</p>
  <p>Teaching material for enrolled students. Exam papers, marking rubrics and
  in-class answer keys are not published here.</p>
</footer>
<script src="${base}/assets/site.js" defer></script>
</body>
</html>
`;
}

/* --- session hub ---------------------------------------------------------- */

/**
 * The teaching flow for one week, in the order a student meets it:
 *
 *   Before class  read the ebook chapter
 *   In class      lecture deck (the lecturer projects it; students can reread)
 *   After class   homework, due Sunday 23:59
 *
 * The in-class exercise is deliberately absent: exercises/ carries answer keys
 * in <details> blocks and stays unpublished. The card says so rather than
 * leaving a hole a student would read as a missing link.
 */
function sessionHub(s, chapterTitle) {
  const nn = pad(s.n);
  const prev = s.n > 1 ? `session-${pad(s.n - 1)}.html` : null;
  const next = s.n < 15 ? `session-${pad(s.n + 1)}.html` : null;

  const steps = [
    {
      when: "Before class",
      title: "Read the chapter",
      note: "Work the 🧪 Try It Yourself blocks as you go — each one tells you the expected result, so you can check yourself.",
      href: `../ebook/${nn}-${chapterTitle.slug}.html`,
      cta: `Chapter ${s.n}`,
    },
    {
      when: "In class",
      title: "Lecture deck",
      note: "The slides your lecturer projects, with the teaching diagrams. Press <kbd>j</kbd> and <kbd>k</kbd> to move, <kbd>n</kbd> for speaker notes.",
      href: `../slides/buoi-${nn}.html`,
      cta: `Deck ${s.n}`,
    },
    {
      when: "After class",
      title: s.n === 8 ? "Homework 07 review" : `Homework ${nn}`,
      note: "Due Sunday 23:59. A Monday grace day is marked at −20%; nothing is marked after that.",
      href: `../homework/session-${nn}.html`,
      cta: `Homework ${nn}`,
    },
  ];

  const cards = steps
    .map(
      (st) => `    <li class="step">
      <p class="when">${esc(st.when)}</p>
      <h3>${esc(st.title)}</h3>
      <p class="note">${st.note}</p>
      <a class="cta" href="${st.href}">${esc(st.cta)}</a>
    </li>`
    )
    .join("\n");

  const midterm = s.midterm
    ? `  <div class="callout warn">
    <p><strong>Week 8 is the midterm.</strong> The paper is practical, 90 minutes,
    with no internet. You may bring your own notes, the ebook chapters offline, and
    your project files. This chapter is the revision guide — the exam paper itself
    is not published here.</p>
  </div>\n`
    : "";

  const body = `${midterm}  <ol class="steps">
${cards}
  </ol>
  <div class="callout">
    <p><strong>The in-class exercise is not on this site.</strong> It carries the
    worked answer key, so your lecturer hands it out during the session.</p>
  </div>
  <nav class="pager" aria-label="Session navigation">
${prev ? `    <a class="prev" href="${prev}">← Session ${s.n - 1}</a>` : `    <span></span>`}
${next ? `    <a class="next" href="${next}">Session ${s.n + 1} →</a>` : `    <span></span>`}
  </nav>`;

  return page({
    title: `Session ${s.n}: ${s.topic} — ${COURSE}`,
    heading: `Session ${s.n}: ${s.topic}`,
    lead: `Week ${s.n} of 15. Read the chapter before class, follow the deck in class, then submit the homework by Sunday 23:59.`,
    crumbs: [
      { href: "../index.html", label: "Home" },
      { href: "../sessions/index.html", label: "Sessions" },
      { label: `Session ${s.n}` },
    ],
    body,
    depth: 1,
  });
}

/* --- index pages ---------------------------------------------------------- */

function homePage(chapters) {
  const rows = SESSIONS.map((s) => {
    const nn = pad(s.n);
    const ch = chapters.find((c) => c.session === s.n);
    return `      <tr${s.midterm ? ' class="mid"' : ""}>
        <td class="wk">${s.n}</td>
        <td><a href="sessions/session-${nn}.html">${esc(s.topic)}</a></td>
        <td>${ch ? `<a href="ebook/${ch.out}">Chapter ${s.n}</a>` : "—"}</td>
        <td><a href="slides/buoi-${nn}.html">Deck</a></td>
        <td><a href="homework/session-${nn}.html">HW ${nn}</a></td>
      </tr>`;
  }).join("\n");

  const appendix = chapters.find((c) => c.session === null);

  const body = `  <ul class="tiles">
    <li><a href="sessions/index.html"><strong>Sessions</strong><span>Week by week, in teaching order</span></a></li>
    <li><a href="ebook/index.html"><strong>Ebook</strong><span>15 chapters + Appendix A</span></a></li>
    <li><a href="slides/index.html"><strong>Lecture slides</strong><span>17 decks, 60 diagrams</span></a></li>
    <li><a href="homework/index.html"><strong>Homework</strong><span>15 sheets, due Sunday 23:59</span></a></li>
  </ul>

  <h2 id="how-it-works">How each week works</h2>
  <p>Every week follows the same three steps. Read the chapter <strong>before</strong>
  class so the lecture has something to build on, follow the deck in class, then do
  the homework by <strong>Sunday 23:59</strong>.</p>
  <ol class="flow">
    <li><strong>Before class</strong> — read the ebook chapter and do its
    <em>Try It Yourself</em> blocks.</li>
    <li><strong>In class</strong> — 150 minutes: lecture, guided practice, then you
    start the homework.</li>
    <li><strong>After class</strong> — finish the homework and push it to your repo.</li>
  </ol>

  <h2 id="schedule">The 15 weeks</h2>
  <table class="sched">
    <caption>Each row links to that week's chapter, deck and homework sheet.</caption>
    <thead>
      <tr><th scope="col">Week</th><th scope="col">Session</th><th scope="col">Read</th><th scope="col">Slides</th><th scope="col">Homework</th></tr>
    </thead>
    <tbody>
${rows}
    </tbody>
  </table>
${
  appendix
    ? `  <h2 id="extra">Also worth reading</h2>
  <p><a href="ebook/${appendix.out}">${esc(appendix.title)}</a> — how to choose
  between web technologies once the course is over.</p>\n`
    : ""
}
  <h2 id="not-here">What is not on this site</h2>
  <p>Exam papers, marking rubrics, worked solutions and the in-class exercises with
  their answer keys stay with your lecturer. Homework submission and marking are not
  handled here either — follow the instructions your lecturer gives in class.</p>`;

  return page({
    title: `${COURSE}`,
    heading: "Web Authoring and Web Management",
    lead: "Course materials for INS2053: the student ebook, the lecture slides, and the weekly homework — organised week by week.",
    body,
    depth: 0,
  });
}

function listPage({ title, heading, lead, crumbLabel, items, note }) {
  const body = `${note ? `  <div class="callout"><p>${note}</p></div>\n` : ""}  <ul class="list">
${items
  .map(
    (it) => `    <li>
      <a href="${it.href}"><strong>${esc(it.label)}</strong>${it.sub ? `<span>${esc(it.sub)}</span>` : ""}</a>
    </li>`
  )
  .join("\n")}
  </ul>`;

  return page({
    title: `${title} — ${COURSE}`,
    heading,
    lead,
    crumbs: [{ href: "../index.html", label: "Home" }, { label: crumbLabel }],
    body,
    depth: 1,
  });
}

/* --- build ---------------------------------------------------------------- */

/** Example paths de-linked by rewriteLinks, reported at the end of the build. */
const exampleLinks = [];

/**
 * Rewrite cross-document markdown links so they work as site URLs.
 *
 * The chapters link to each other and to sibling material with repo-relative
 * paths (`../exercises/session-04/exercise.md`). On the site, some of those
 * targets are published under a different name and some are not published at
 * all. Unpublished targets become plain text with a short note, because a link
 * that 404s teaches a student that the site is broken.
 */
function rewriteLinks(html, { fromDepth }) {
  const up = fromDepth === 1 ? ".." : ".";

  return html
    // ebook/NN-slug.md  ->  ../ebook/NN-slug.html
    .replace(
      /href="(?:\.\.\/)?ebook\/([0-9]{2}|appendix-a)-([a-z0-9-]+)\.md(#[^"]*)?"/g,
      (_m, num, slug, hash) => `href="${up}/ebook/${num}-${slug}.html${hash || ""}"`
    )
    // canvases/buoi-NN.canvas.tsx  ->  ../slides/buoi-NN.html
    .replace(
      /href="(?:\.\.\/)?canvases\/buoi-([0-9]{2})\.canvas\.tsx"/g,
      (_m, nn) => `href="${up}/slides/buoi-${nn}.html"`
    )
    // homework/session-NN/homework.md  ->  ../homework/session-NN.html
    .replace(
      /href="(?:\.\.\/)?homework\/session-([0-9]{2})\/homework\.md"/g,
      (_m, nn) => `href="${up}/homework/session-${nn}.html"`
    )
    // Unpublished targets: drop the link, keep the words, say why.
    .replace(
      /<a href="(?:\.\.\/)?(?:exercises|exams|project)\/[^"]*">([\s\S]*?)<\/a>/g,
      (_m, label) =>
        `<span class="unpub" title="Handed out in class, not published on this site">${label}</span>`
    )
    // Whatever relative link is LEFT is not site navigation. The chapters use
    // markdown link syntax to *illustrate* paths in the student's own project —
    // chapter 11 writes `See the [full schedule](pages/events.html).` to teach
    // the one-canonical-page habit. Rendered as a link it 404s and reads as a
    // broken site, so show it as a path instead of a destination.
    .replace(
      /<a href="([^"]+)">([\s\S]*?)<\/a>/g,
      (m, href, label) => {
        if (/^(https?:|mailto:|#|data:)/.test(href)) return m;
        exampleLinks.push(href);
        return `<code class="path">${label}</code>`;
      }
    );
}

async function build() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  /* 1. assets ------------------------------------------------------------- */
  await cp(ASSETS, path.join(OUT, "assets"), { recursive: true });

  /* 2. slide decks — copied as-is, already standalone HTML ----------------- */
  const decks = path.join(ROOT, "slides-html");
  if (!existsSync(decks)) {
    fail("slides-html/ is missing — run `npm run build:slides` first");
    return;
  }
  await cp(decks, path.join(OUT, "slides"), { recursive: true });

  /* 3. ebook chapters ----------------------------------------------------- */
  await mkdir(path.join(OUT, "ebook"), { recursive: true });
  const chapterFiles = (await readdir(path.join(ROOT, "ebook")))
    .filter((f) => f.endsWith(".md"))
    .sort();

  const chapters = [];
  for (const file of chapterFiles) {
    const md = await readFile(path.join(ROOT, "ebook", file), "utf8");
    const { html, headings } = render(md);

    // The title is the chapter's own SECOND line; the first is "# SESSION NN".
    const lines = md.split(/\r?\n/);
    const title = plain((lines[1] || lines[0] || file).replace(/^#\s*/, ""));
    const num = file.slice(0, 2);
    const session = /^[0-9]{2}$/.test(num) ? Number(num) : null;
    const out = file.replace(/\.md$/, ".html");
    const slug = file.replace(/^([0-9]{2}|appendix-a)-/, "").replace(/\.md$/, "");
    const heading = session ? `Session ${session}: ${title}` : title;

    const nav = session
      ? `  <nav class="pager" aria-label="Chapter navigation">
    <a class="up" href="../sessions/session-${pad(session)}.html">Session ${session} overview</a>
  </nav>\n`
      : "";

    await writeFile(
      path.join(OUT, "ebook", out),
      page({
        title: `${heading} — ${COURSE}`,
        heading,
        crumbs: [
          { href: "../index.html", label: "Home" },
          { href: "../ebook/index.html", label: "Ebook" },
          { label: session ? `Chapter ${session}` : "Appendix A" },
        ],
        toc: headings.filter((h) => h.depth === 2),
        body: `${nav}  <article class="doc">\n${rewriteLinks(html, { fromDepth: 1 })}\n  </article>`,
        depth: 1,
      }),
      "utf8"
    );

    chapters.push({ file, out, slug, title, session });
  }

  /* 4. homework ----------------------------------------------------------- */
  await mkdir(path.join(OUT, "homework"), { recursive: true });
  const sheets = [];
  for (const s of SESSIONS) {
    const nn = pad(s.n);
    const src = path.join(ROOT, "homework", `session-${nn}`, "homework.md");
    if (!existsSync(src)) {
      fail(`homework/session-${nn}/homework.md is missing`);
      continue;
    }
    const md = await readFile(src, "utf8");
    const { html, headings } = render(md);
    const title = plain((md.split(/\r?\n/)[0] || "").replace(/^#\s*/, ""));

    await writeFile(
      path.join(OUT, "homework", `session-${nn}.html`),
      page({
        title: `${title} — ${COURSE}`,
        heading: title,
        lead: "Due Sunday 23:59. A Monday grace day is marked at −20%.",
        crumbs: [
          { href: "../index.html", label: "Home" },
          { href: "../homework/index.html", label: "Homework" },
          { label: `Session ${s.n}` },
        ],
        toc: headings.filter((h) => h.depth === 2),
        body: `  <nav class="pager" aria-label="Session navigation">
    <a class="up" href="../sessions/session-${nn}.html">Session ${s.n} overview</a>
  </nav>\n  <article class="doc">\n${rewriteLinks(html, { fromDepth: 1 })}\n  </article>`,
        depth: 1,
      }),
      "utf8"
    );
    sheets.push({ n: s.n, title });
  }

  /* 5. session hubs — the teaching flow ----------------------------------- */
  await mkdir(path.join(OUT, "sessions"), { recursive: true });
  for (const s of SESSIONS) {
    const ch = chapters.find((c) => c.session === s.n);
    if (!ch) {
      fail(`no ebook chapter found for session ${s.n}`);
      continue;
    }
    await writeFile(
      path.join(OUT, "sessions", `session-${pad(s.n)}.html`),
      sessionHub(s, ch),
      "utf8"
    );
  }

  /* 6. index pages -------------------------------------------------------- */
  await writeFile(path.join(OUT, "index.html"), homePage(chapters), "utf8");

  await writeFile(
    path.join(OUT, "sessions", "index.html"),
    listPage({
      title: "Sessions",
      heading: "Sessions",
      lead: "Fifteen weeks, in teaching order. Each session page gathers that week's chapter, deck and homework.",
      crumbLabel: "Sessions",
      items: SESSIONS.map((s) => ({
        href: `session-${pad(s.n)}.html`,
        label: `Session ${s.n} — ${s.topic}`,
        sub: s.midterm ? "Week 8 · midterm exam" : `Week ${s.n}`,
      })),
    }),
    "utf8"
  );

  await writeFile(
    path.join(OUT, "ebook", "index.html"),
    listPage({
      title: "Ebook",
      heading: "The student ebook",
      lead: "Fifteen chapters plus an appendix. Read the week's chapter before class.",
      crumbLabel: "Ebook",
      items: chapters.map((c) => ({
        href: c.out,
        label: c.session ? `Chapter ${c.session} — ${c.title}` : c.title,
        sub: c.session ? `Session ${c.session}` : "Appendix A",
      })),
    }),
    "utf8"
  );

  await writeFile(
    path.join(OUT, "homework", "index.html"),
    listPage({
      title: "Homework",
      heading: "Homework",
      lead: "One sheet per session, each marked out of 10 by the rubric printed on it.",
      crumbLabel: "Homework",
      note: "Every sheet is due <strong>Sunday 23:59</strong>. A Monday grace day is marked at −20%; nothing is marked after that. Submission is arranged by your lecturer — this site does not collect work.",
      items: sheets.map((h) => ({
        href: `session-${pad(h.n)}.html`,
        label: h.title,
        sub: `Session ${h.n}`,
      })),
    }),
    "utf8"
  );

  /* 7. slides index — the copied deck index links to itself, so give the
        site its own entry point that matches the rest of the navigation. */
  const deckList = SESSIONS.map((s) => ({
    href: `buoi-${pad(s.n)}.html`,
    label: `Deck ${s.n} — ${s.topic}`,
    sub: `Session ${s.n}`,
  }));
  deckList.push(
    { href: "ins2053-bai-giang.html", label: "Course-wide lecture deck", sub: "All sessions" },
    { href: "ins2053-overview.html", label: "Course overview deck", sub: "Orientation" }
  );
  await writeFile(
    path.join(OUT, "slides", "index.html"),
    listPage({
      title: "Lecture slides",
      heading: "Lecture slides",
      lead: "Seventeen decks with 60 teaching diagrams. Use j and k to move between slides, n for speaker notes.",
      crumbLabel: "Lecture slides",
      items: deckList,
    }),
    "utf8"
  );

  console.log(
    `built site/ — ${chapters.length} chapters, ${sheets.length} homework sheets, ` +
      `${SESSIONS.length} session hubs, ${deckList.length} decks`
  );

  // Example paths are expected (chapters illustrate paths in the student's own
  // project). Printing them means a genuinely broken nav link cannot hide here.
  if (exampleLinks.length) {
    const uniq = [...new Set(exampleLinks)].sort();
    console.log(
      `de-linked ${exampleLinks.length} example path(s), ${uniq.length} distinct: ` +
        uniq.join(", ")
    );
  }
}

build().catch((err) => fail("build threw", err));






