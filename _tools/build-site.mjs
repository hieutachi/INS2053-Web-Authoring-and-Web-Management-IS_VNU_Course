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
     grader       one vetted artifact         -> site/cham-bai.html

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
import { injectTableEmptyStates } from "./table-empty-state.mjs";

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

/**
 * The one file published out of `_tools/`, by name and on purpose.
 *
 * `NEVER_PUBLISH` blocks the directory so a stray markdown link cannot leak the
 * exercise answer keys or the rubric JSONs sitting next to it. The self-check tool
 * is different in kind: it is a build artefact meant to be handed to students, it
 * contains no answer key (`_tools/qa-grader.mjs` gate G11 fails the build if any
 * exam or project-rubric prose reaches it), and it grades entirely in the reader's
 * own browser — nothing is uploaded, so publishing it does not turn the practice
 * site into a submission system.
 *
 * Copied byte for byte. `_tools/qa-site.mjs` check 13 compares the two files and
 * fails if they differ, so the eleven grader gates that audited the source
 * artefact also cover what ships.
 */
const GRADER_ARTEFACT = path.join(HERE, "grader", "cham-bai.html");
const GRADER_PUBLIC = "cham-bai.html";

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

  // The shared empty state is applied here, not in the template: every table
  // a chapter ships — GFM tables and hand-written <table> examples alike —
  // passes through one funnel, so one pass covers them all.
  const html = injectTableEmptyStates(
    marked.parse(prepared, {
      renderer: makeRenderer(headings),
      gfm: true,
      breaks: false,
    })
  );
  return { html, headings };
}

/**
 * Keep the source homework useful to lecturers while publishing it only as
 * ungraded practice. Technical uses of HTML submit controls in Session 13 stay
 * intact as escaped teaching examples; course deadlines and hand-in wording do not.
 */
function prepareHomeworkMarkdown(markdown) {
  return markdown
    .replace(
      /^## Due Date\s*\r?\n[^\r\n]*(?:\r?\n)?/m,
      "## Practice Status\nOnline submission and grading are not enabled yet. Complete this brief locally and keep the result in your own Git repository.\n"
    )
    .replace(/^## Submission Guide\s*$/m, "## Save Your Practice Work")
    .replace(/^## Grading Rubric\s*$/m, "## Reference Rubric")
    .replace(/\bby the deadline\b/gi, "before you attempt this task")
    .replace(/\bfinal capstone submission\b/gi, "final capstone version")
    .replace(/\bBefore you submit it\b/g, "Before you consider it finished");
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
function page({
  title,
  heading,
  lead,
  crumbs = [],
  toc = [],
  body,
  depth = 0,
  pageClass = "content-page",
  eyebrow = "INS2053 learning materials",
  introExtra = "",
}) {
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
<body class="${esc(pageClass)}">
<a class="skip" href="#main">Skip to content</a>
<div class="reading-progress" aria-hidden="true"><span data-reading-progress></span></div>
<header class="bar">
  <div class="bar-inner">
    <a class="home" href="${base}/index.html" aria-label="INS2053 course home">
      <span class="brand-mark" aria-hidden="true">W</span>
      <span class="brand-copy"><strong>INS2053</strong><span>Web Authoring &amp; Management</span></span>
    </a>
    <nav class="primary-nav" aria-label="Course resources">
      <a data-course-nav="sessions" href="${base}/sessions/index.html">Sessions</a>
      <a data-course-nav="ebook" href="${base}/ebook/index.html">Ebook</a>
      <a data-course-nav="slides" href="${base}/slides/index.html">Slides</a>
      <a data-course-nav="homework" href="${base}/homework/index.html">Homework</a>
    </nav>
    <button class="theme" type="button" data-theme-toggle aria-label="Switch to dark theme">
      <span class="theme-icon" aria-hidden="true"></span><span class="theme-label" data-theme-label>Theme</span>
    </button>
  </div>
</header>
${nav ? `<nav class="crumbs" aria-label="Breadcrumb">${nav}</nav>` : ""}
<main id="main">
  <header class="page-head">
    <p class="eyebrow">${esc(eyebrow)}</p>
    <h1>${esc(heading)}</h1>
${lead ? `    <p class="lead">${esc(lead)}</p>\n` : ""}${introExtra}
  </header>
${contents}
${body}
</main>
<footer class="foot">
  <div class="foot-inner">
    <div class="foot-brand"><span class="brand-mark" aria-hidden="true">W</span><p><strong>INS2053</strong><span>Web Authoring &amp; Web Management</span></p></div>
    <div class="foot-copy">
      <p>${esc(SCHOOL)}</p>
      <p>Student learning materials only. Exam papers, marking rubrics and in-class answer keys are not published here.</p>
    </div>
  </div>
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
 *   After class   homework practice; submission and grading open later
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
      phase: "prepare",
      title: "Read the chapter",
      note: "Work the 🧪 Try It Yourself blocks as you go — each one tells you the expected result, so you can check yourself.",
      href: `../ebook/${nn}-${chapterTitle.slug}.html`,
      cta: `Chapter ${s.n}`,
    },
    {
      when: "In class",
      phase: "learn",
      title: "Lecture deck",
      note: "The slides your lecturer projects, with the teaching diagrams. Press <kbd>j</kbd> and <kbd>k</kbd> to move, <kbd>n</kbd> for speaker notes.",
      href: `../slides/buoi-${nn}.html`,
      cta: `Deck ${s.n}`,
    },
    {
      when: "After class",
      phase: "practice",
      title: s.n === 8 ? "Homework 07 review" : `Homework ${nn}`,
      note: "Use the published brief for practice and keep your work in your own repository. Online submission and grading are not enabled yet.",
      href: `../homework/session-${nn}.html`,
      cta: `Homework ${nn}`,
    },
    {
      when: "Check yourself",
      phase: "practice",
      title: "Self-check tool",
      note: "Grades the mechanical half of the rubric in your own browser — nothing is uploaded. It reports where you stand, not your final mark; your lecturer decides that.",
      href: `../${GRADER_PUBLIC}`,
      cta: "Open the self-check tool",
    },
  ];

  const cards = steps
    .map(
      (st, index) => `    <li class="step step-${st.phase}">
      <span class="step-number" aria-hidden="true">0${index + 1}</span>
      <p class="when">${esc(st.when)}</p>
      <h2>${esc(st.title)}</h2>
      <p class="note">${st.note}</p>
      <a class="cta" href="${st.href}">${esc(st.cta)}<span aria-hidden="true">→</span></a>
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
    lead: `Week ${s.n} of 15. Read the chapter before class, follow the deck in class, then use the homework brief for practice.`,
    crumbs: [
      { href: "../index.html", label: "Home" },
      { href: "../sessions/index.html", label: "Sessions" },
      { label: `Session ${s.n}` },
    ],
    body,
    depth: 1,
    pageClass: "session-page",
    eyebrow: `Week ${pad(s.n)} · Learning flow`,
  });
}

/* --- index pages ---------------------------------------------------------- */

function homePage(chapters) {
  const rows = SESSIONS.map((s) => {
    const nn = pad(s.n);
    const ch = chapters.find((c) => c.session === s.n);
    return `      <tr${s.midterm ? ' class="mid"' : ""}>
        <td class="wk" data-label="Week"><span>${pad(s.n)}</span></td>
        <td class="topic" data-label="Session"><a href="sessions/session-${nn}.html">${esc(s.topic)}</a>${s.midterm ? '<small>Midterm week</small>' : ""}</td>
        <td data-label="Read">${ch ? `<a class="resource-link" href="ebook/${ch.out}">Chapter ${s.n}</a>` : "—"}</td>
        <td data-label="Slides"><a class="resource-link" href="slides/buoi-${nn}.html">Deck ${s.n}</a></td>
        <td data-label="Homework"><a class="resource-link" href="homework/session-${nn}.html">HW ${nn}</a></td>
      </tr>`;
  }).join("\n");

  const appendix = chapters.find((c) => c.session === null);

  const body = `  <section class="resource-section" aria-labelledby="resources-h">
    <div class="section-head"><div><p class="section-kicker">Everything in one place</p><h2 id="resources-h">Course resources</h2></div><p>Start with your session, or jump straight to the material you need.</p></div>
    <ul class="tiles">
      <li class="tile-sessions"><a href="sessions/index.html"><span class="tile-icon" aria-hidden="true">01</span><span class="tile-copy"><strong>Sessions</strong><span>Week by week, in teaching order</span></span><span class="tile-arrow" aria-hidden="true">↗</span></a></li>
      <li class="tile-ebook"><a href="ebook/index.html"><span class="tile-icon" aria-hidden="true">02</span><span class="tile-copy"><strong>Student ebook</strong><span>15 chapters + Appendix A</span></span><span class="tile-arrow" aria-hidden="true">↗</span></a></li>
      <li class="tile-slides"><a href="slides/index.html"><span class="tile-icon" aria-hidden="true">03</span><span class="tile-copy"><strong>Lecture slides</strong><span>17 decks · 60 diagrams</span></span><span class="tile-arrow" aria-hidden="true">↗</span></a></li>
      <li class="tile-homework"><a href="homework/index.html"><span class="tile-icon" aria-hidden="true">04</span><span class="tile-copy"><strong>Homework</strong><span>15 practice sheets · submission later</span></span><span class="tile-arrow" aria-hidden="true">↗</span></a></li>
      <li class="tile-grader"><a href="${GRADER_PUBLIC}"><span class="tile-icon" aria-hidden="true">05</span><span class="tile-copy"><strong>Self-check tool</strong><span>Score your homework against the rubric, in your own browser</span></span><span class="tile-arrow" aria-hidden="true">↗</span></a></li>
    </ul>
  </section>

  <section class="flow-section" aria-labelledby="how-it-works">
    <div class="section-head"><div><p class="section-kicker">A simple weekly rhythm</p><h2 id="how-it-works">How each week works</h2></div><p>Prepare before class, learn together, then turn that knowledge into practice.</p></div>
    <ol class="flow">
      <li><span class="flow-index" aria-hidden="true">01</span><div><strong>Before class</strong><span>Read the ebook chapter and complete its <em>Try It Yourself</em> blocks.</span></div></li>
      <li><span class="flow-index" aria-hidden="true">02</span><div><strong>In class</strong><span>150 minutes of lecture, guided practice and a homework start.</span></div></li>
      <li><span class="flow-index" aria-hidden="true">03</span><div><strong>After class</strong><span>Practise with the homework brief and keep the result in your repository. Online submission and grading are not enabled yet.</span></div></li>
    </ol>
  </section>

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
    heading: "Build for the web. Learn by doing.",
    lead: "Your complete INS2053 learning path — ebook, lecture slides and weekly homework, organised into one clear flow.",
    eyebrow: "INS2053 · Student learning portal",
    introExtra: `    <div class="hero-actions"><a class="primary-action" href="sessions/session-01.html">Start with Session 1 <span aria-hidden="true">→</span></a><a class="secondary-action" href="#schedule">Explore 15 weeks</a></div>
    <dl class="hero-stats"><div><dt>15</dt><dd>guided sessions</dd></div><div><dt>16</dt><dd>ebook chapters</dd></div><div><dt>17</dt><dd>lecture decks</dd></div></dl>`,
    body,
    depth: 0,
    pageClass: "home-page",
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
    pageClass: "list-page",
    eyebrow: `${items.length} learning resources`,
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
        pageClass: "reading-page ebook-page",
        eyebrow: session ? `Ebook · Chapter ${pad(session)}` : "Ebook · Appendix",
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
    const publicMd = prepareHomeworkMarkdown(md);
    const { html, headings } = render(publicMd);
    const title = plain((md.split(/\r?\n/)[0] || "").replace(/^#\s*/, ""));

    await writeFile(
      path.join(OUT, "homework", `session-${nn}.html`),
      page({
        title: `${title} — ${COURSE}`,
        heading: title,
        lead: "Practice brief for this session. Online submission and grading are not enabled yet.",
        crumbs: [
          { href: "../index.html", label: "Home" },
          { href: "../homework/index.html", label: "Homework" },
          { label: `Session ${s.n}` },
        ],
        toc: headings.filter((h) => h.depth === 2),
        body: `  <div class="callout status-note" role="status">
    <p><strong>Practice mode.</strong> Online submission and grading are not enabled yet. Complete the work locally and keep it in your own Git repository until your lecturer announces the submission flow.</p>
    <p>Want to know how this sheet scores before you hand it in? Open the <a href="../${GRADER_PUBLIC}">self-check tool</a>, pick session ${s.n}, and paste or point it at your files. It runs entirely in your browser, uploads nothing, and marks only the mechanical half of the rubric — the rest is your lecturer's judgement.</p>
  </div>
  <nav class="pager" aria-label="Session navigation">
    <a class="up" href="../sessions/session-${nn}.html">Session ${s.n} overview</a>
  </nav>\n  <article class="doc">\n${rewriteLinks(html, { fromDepth: 1 })}\n  </article>`,
        depth: 1,
        pageClass: "reading-page homework-page",
        eyebrow: `Session ${pad(s.n)} · Homework`,
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
      lead: "One practice sheet per session, with requirements and a reference rubric.",
      crumbLabel: "Homework",
      note: "<strong>Practice mode:</strong> online submission and grading are not enabled yet. Complete each sheet locally and keep the result in your own Git repository until your lecturer announces the submission flow. To see how a sheet scores against its rubric, open the <a href=\"../cham-bai.html\">self-check tool</a> — it runs in your browser and uploads nothing.",
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

  /* 8. the self-check tool, copied byte for byte -------------------------- */
  if (!existsSync(GRADER_ARTEFACT)) {
    fail("_tools/grader/cham-bai.html is missing — run `npm run build:grader` first");
  } else {
    await cp(GRADER_ARTEFACT, path.join(OUT, GRADER_PUBLIC));
  }

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






