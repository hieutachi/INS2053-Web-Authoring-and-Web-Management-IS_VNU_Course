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
     grader       one vetted artifact        -> site/cham-bai.html
     i18n/vi/     optional VN prose sources  -> site/vi/  (translation or fallback)

    Everything is generated twice: once as English under site/, once as
    Vietnamese under site/vi/. Interface strings come from _tools/i18n.mjs and
    are complete in both languages; prose comes from i18n/vi/<repo path> when
    such a file exists, and from the English source when it does not.

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
import { LANGS, LANG_KEY, UI, VI_SOURCE, t } from "./i18n.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const OUT = path.join(ROOT, "site");
const ASSETS = path.join(HERE, "site-assets");

const COURSE = "INS2053 · Web Authoring & Web Management";
const SCHOOL = "International School, Vietnam National University, Hanoi";

/* --- language plumbing ------------------------------------------------------
 *
 * `site/` holds two trees that share one `assets/`, one `slides/` and one
 * `cham-bai.html`:
 *
 *   site/index.html            English chrome + English prose
 *   site/vi/index.html         Vietnamese chrome + Vietnamese prose if a
 *                              translation exists under i18n/vi/, otherwise the
 *                              English prose with a notice saying so.
 *
 * Two bases per page, and keeping them apart is the whole trick:
 *
 *   w() — "within". A page inside the CURRENT language tree. The base string is
 *         identical for both languages, so every English href in this file
 *         stays byte-identical after the refactor; only the Vietnamese tree
 *         ever resolves it differently.
 *   p() — "published". A shared, language-neutral resource under site/: the
 *         slide decks, the self-check tool, the stylesheet and the script. One
 *         level further up for `vi`, because site/vi/ is one directory deeper.
 *
 * Both always emit "./" / "../" style prefixes as the original builder did, so
 * generated English output is unchanged.
 */

/** "en" | "vi" -> the directory under site/ that tree is written to. */
const treeDir = (lang) =>
  lang === "en" ? OUT : path.join(OUT, LANGS[lang].dir.replace(/\/$/, ""));

/** Where the optional Vietnamese prose source for a repo-relative path lives. */
const viPath = (repoPath) => path.join(ROOT, VI_SOURCE, repoPath);

function hrefs(depth, lang) {
  const base = depth === 0 ? "." : "..";
  const pub =
    lang === "en" ? base : depth === 0 ? ".." : "../..";
  return {
    base,
    pub,
    /** link to a page inside this language tree */
    w: (p) => `${base}/${p}`,
    /** link to a shared, language-neutral resource under site/ */
    p: (p) => `${pub}/${p}`,
  };
}

/**
 * Href from a page that lives in `lang`, `depth` directories below its tree
 * root, to the SAME document as published in `target`.
 *
 * There is only ever one physical copy of each page per language, so the
 * answer is: climb to site/ (`pub`), then step into the target tree — which for
 * English is site/ itself and for Vietnamese is site/vi/.
 */
function crossHref(rel, depth, lang, target) {
  const { pub } = hrefs(depth, lang);
  return `${pub}/${LANGS[target].dir}${rel}`;
}

/** The other language, or English if more than two are ever configured. */
function otherLang(lang) {
  return Object.keys(LANGS).find((code) => code !== lang) || "en";
}


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
  {
    n: 1,
    topic: "Introduction to Dreamweaver & Web Fundamentals",
    topicVi: "Làm quen Dreamweaver và nền tảng web",
  },
  {
    n: 2,
    topic: "Creating a New Site & Organizing Your Project",
    topicVi: "Tạo site mới và tổ chức dự án",
  },
  {
    n: 3,
    topic: "Working with Text and Images",
    topicVi: "Làm việc với văn bản và hình ảnh",
  },
  {
    n: 4,
    topic: "Applying CSS to Your Website",
    topicVi: "Áp dụng CSS vào website",
  },
  {
    n: 5,
    topic: "Creating Page Layouts",
    topicVi: "Tạo bố cục trang",
  },
  {
    n: 6,
    topic: "Creating Page Layouts (Continued)",
    topicVi: "Tạo bố cục trang (tiếp theo)",
  },
  {
    n: 7,
    topic: "CSS3 and Web Fonts",
    topicVi: "CSS3 và font web",
  },
  {
    n: 8,
    topic: "Review & Midterm Exam Preparation",
    topicVi: "Ôn tập và chuẩn bị thi giữa kỳ",
    midterm: true,
  },
  {
    n: 9,
    topic: "Working with Tables",
    topicVi: "Làm việc với bảng",
  },
  {
    n: 10,
    topic: "Embedding Flash, Video and Sound",
    topicVi: "Nhúng Flash, video và âm thanh",
  },
  {
    n: 11,
    topic: "Designing a Compact Site",
    topicVi: "Thiết kế một site gọn",
  },
  {
    n: 12,
    topic: "Using Code-Editing Tools",
    topicVi: "Dùng công cụ sửa code",
  },
  {
    n: 13,
    topic: "Creating Forms",
    topicVi: "Tạo biểu mẫu",
  },
  {
    n: 14,
    topic: "Working with Spry Framework",
    topicVi: "Làm việc với Spry Framework",
  },
  {
    n: 15,
    topic: "Mobile Interface Design and Review",
    topicVi: "Thiết kế giao diện di động và ôn tập",
  },
];

const pad = (n) => String(n).padStart(2, "0");

/* Session topics are bilingual by key, not by file: `topic` stays the English
   truth that schedule.md and the English tree use, while `topicVi` labels the
   Vietnamese pages. A session without `topicVi` falls back to the English name
   so a missing translation can never break the build. */
const topicOf = (s, lang) => (lang === "vi" && s.topicVi) || s.topic;

/* --- page shell ----------------------------------------------------------- */

/**
 * One shell for every page. `crumbs` is an array of {href,label}; the last entry
 * is rendered as plain text because it is the current page.
 */
/**
 * One shell for every page. `crumbs` is an array of {href,label}; the last entry
 * is rendered as plain text because it is the current page.
 *
 * `lang` selects the chrome strings; `rel` is this page's path inside its own
 * language tree and is what makes the language switch land on the same document
 * rather than on the other language's home page.
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
  eyebrow = null,
  introExtra = "",
  lang = "en",
  rel = "index.html",
  untranslated = false,
}) {
  const L = UI[lang];
  const meta = LANGS[lang];
  const { base, w, p } = hrefs(depth, lang);
  const twin = crossHref(rel, depth, lang, otherLang(lang));
  const nav = crumbs
    .map((c, i) =>
      i === crumbs.length - 1
        ? `<span aria-current="page">${esc(c.label)}</span>`
        : `<a href="${c.href}">${esc(c.label)}</a>`
    )
    .join('<span class="sep" aria-hidden="true">/</span>');

  const contents = toc.length
    ? `<nav class="toc" aria-labelledby="toc-h">
      <h2 id="toc-h">${esc(L.onThisPage)}</h2>
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

  // A page whose chrome is Vietnamese but whose prose fell back to English says
  // so out loud. Silent fallback reads as a broken translation.
  const fallback =
    lang === "vi" && untranslated
      ? `  <div class="callout warn lang-fallback" role="note">
    <p><strong>${esc(L.fallbackTitle)}</strong> ${esc(L.fallbackBody)}</p>
    <p><a href="${twin}" hreflang="en" lang="en">${esc(L.fallbackCta)}</a></p>
  </div>\n`
      : "";

  /* The switch is a pair of links, not a button: it goes somewhere real, it
     works with scripting off, and it keeps the reader on the same document
     rather than dumping them on the other language's home page. aria-label is
     always the language name, so the two labels stay meaningful even where CSS
     swaps the long name for the short code on narrow screens. */
  const langSwitch = `    <nav class="lang-switch" aria-label="${esc(L.langAria)}">
${Object.keys(LANGS)
  .map((code) => {
    const M = LANGS[code];
    const here = code === lang;
    const href = here ? null : crossHref(rel, depth, lang, code);
    const tip = here
      ? t(L.langCurrent, { name: M.name })
      : t(L.langSwitchNotice, { name: M.name });
    return `      <a class="lang-opt${here ? " on" : ""}"${
      href
        ? ` href="${href}" hreflang="${M.htmlLang}" lang="${M.htmlLang}"`
        : ` aria-current="true"`
    } data-lang-opt="${code}" aria-label="${esc(
      M.name
    )}" title="${esc(tip)}"><span class="lang-name">${esc(
      M.name
    )}</span><span class="lang-short" aria-hidden="true">${esc(
      M.short
    )}</span></a>`;
  })
  .join("\n")}
    </nav>`;

  return `<!DOCTYPE html>
<html lang="${meta.htmlLang}" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(lead || title)}">
<link rel="stylesheet" href="${p("assets/site.css")}">
<script>
/* Set the theme before first paint, otherwise a dark-theme reader sees a white
   flash on every navigation. Same storage key as the slide decks. */
(function(){try{var t=localStorage.getItem("ins2053.theme");if(!t&&window.matchMedia)
t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light");}catch(e){}})();
/* Honour a saved language before first paint too, so a Vietnamese reader who
   arrives on an English URL never sees English flash first. Only redirect on an
   EXPLICIT choice: with no stored preference the reader stays where they landed,
   which is what keeps a shared English link shareable. The twin always exists,
   because both trees are generated for every page, so this can never loop. */
(function(){try{var w=localStorage.getItem("${LANG_KEY}");
if(w&&w!=="${lang}")location.replace("${twin}");}catch(e){}})();
</script>
</head>
<body class="${esc(pageClass)}">
<a class="skip" href="#main">${esc(L.skipToContent)}</a>
<div class="reading-progress" aria-hidden="true"><span data-reading-progress></span></div>
<header class="bar">
  <div class="bar-inner">
    <a class="home" href="${base}/index.html" aria-label="${esc(
    COURSE
  )}">
      <span class="brand-mark" aria-hidden="true">W</span>
      <span class="brand-copy"><strong>INS2053</strong><span>${esc(L.brandSub)}</span></span>
    </a>
    <nav class="primary-nav" aria-label="${esc(L.courseResources)}">
      <a data-course-nav="sessions" href="${base}/sessions/index.html">${esc(L.navSessions)}</a>
      <a data-course-nav="ebook" href="${base}/ebook/index.html">${esc(L.navEbook)}</a>
      <a data-course-nav="slides" href="${w("slides/index.html")}">${esc(L.navSlides)}</a>
      <a data-course-nav="homework" href="${base}/homework/index.html">${esc(L.navHomework)}</a>
    </nav>
${langSwitch}
    <button class="theme" type="button" data-theme-toggle aria-label="${esc(
    t(L.switchTheme, { name: L.themeDark })
  )}" data-label-light="${esc(L.themeLabelLight)}" data-label-dark="${esc(
    L.themeLabelDark
  )}" data-word-light="${esc(t(L.switchTheme, { name: L.themeLight }))}" data-word-dark="${esc(
    t(L.switchTheme, { name: L.themeDark })
  )}">
      <span class="theme-icon" aria-hidden="true"></span><span class="theme-label" data-theme-label>${esc(
    L.themeWord
  )}</span>
    </button>
  </div>
</header>
${nav ? `<nav class="crumbs" aria-label="${esc(L.breadcrumb)}">${nav}</nav>` : ""}
<main id="main">
  <header class="page-head">
    <p class="eyebrow">${esc(eyebrow || L.defaultEyebrow)}</p>
    <h1>${esc(heading)}</h1>
${lead ? `    <p class="lead">${esc(lead)}</p>\n` : ""}${introExtra}
  </header>
${contents}
${fallback}${body}
</main>
<footer class="foot">
  <div class="foot-inner">
    <div class="foot-brand"><span class="brand-mark" aria-hidden="true">W</span><p><strong>INS2053</strong><span>${esc(
    L.footTagline
  )}</span></p></div>
    <div class="foot-copy">
      <p>${esc(SCHOOL)}</p>
      <p>${esc(L.footNote)}</p>
    </div>
  </div>
</footer>
<script src="${p("assets/site.js")}" defer></script>
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
function sessionHub(s, chapterTitle, lang) {
  const nn = pad(s.n);
  const L = UI[lang];
  const { base, w, p } = hrefs(1, lang);
  const prev = s.n > 1 ? `session-${pad(s.n - 1)}.html` : null;
  const next = s.n < 15 ? `session-${pad(s.n + 1)}.html` : null;

  const steps = [
    {
      when: L.whenBefore,
      phase: "prepare",
      title: L.stepReadTitle,
      note: L.stepReadNote,
      href: w(`ebook/${nn}-${chapterTitle.slug}.html`),
      cta: t(L.chapterCta, { n: s.n }),
    },
    {
      when: L.whenIn,
      phase: "learn",
      title: L.stepDeckTitle,
      note: L.stepDeckNote,
      href: p(`slides/buoi-${nn}.html`),
      cta: t(L.deckCta, { n: s.n }),
    },
    {
      when: L.whenAfter,
      phase: "practice",
      title:
        s.n === 8 ? L.stepHwTitle8 : t(L.stepHwTitle, { nn }),
      note: L.stepHwNote,
      href: w(`homework/session-${nn}.html`),
      cta: t(L.homeworkCta, { nn }),
    },
    {
      when: L.whenCheck,
      phase: "practice",
      title: L.stepToolTitle,
      note: L.stepToolNote,
      href: p(GRADER_PUBLIC),
      cta: L.stepToolCta,
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
    <p><strong>${esc(L.midtermTitle)}</strong>${esc(L.midtermBody)}</p>
  </div>\n`
    : "";

  const body = `${midterm}  <ol class="steps">
${cards}
  </ol>
  <div class="callout">
    <p>${L.exerciseNote}</p>
  </div>
  <nav class="pager" aria-label="${esc(L.sessionNav)}">
${prev ? `    <a class="prev" href="${prev}">${esc(t(L.pagerPrev, { n: s.n - 1 }))}</a>` : `    <span></span>`}
${next ? `    <a class="next" href="${next}">${esc(t(L.pagerNext, { n: s.n + 1 }))}</a>` : `    <span></span>`}
  </nav>`;

  const heading = t(L.hubTitle, { n: s.n, topic: topicOf(s, lang) });
  return page({
    lang,
    rel: `sessions/session-${nn}.html`,
    title: `${heading} — ${COURSE}`,
    heading,
    lead: t(L.hubLead, { n: s.n }),
    crumbs: [
      { href: `${base}/index.html`, label: L.crumbHome },
      { href: w("sessions/index.html"), label: L.navSessions },
      { label: t(L.sessionCrumbLabel, { n: s.n }) },
    ],
    body,
    depth: 1,
    pageClass: "session-page",
    eyebrow: t(L.hubEyebrow, { nn }),
  });
}

/* --- index pages ---------------------------------------------------------- */

function homePage(chapters, lang) {
  const L = UI[lang];
  const { w, p } = hrefs(0, lang);
  const rows = SESSIONS.map((s) => {
    const nn = pad(s.n);
    const ch = chapters.find((c) => c.session === s.n);
    return `      <tr${s.midterm ? ' class="mid"' : ""}>
        <td class="wk" data-label="${esc(L.thWeek)}"><span>${pad(s.n)}</span></td>
        <td class="topic" data-label="${esc(
          L.thSession
        )}"><a href="${w(`sessions/session-${nn}.html`)}">${esc(
      topicOf(s, lang)
    )}</a>${
      s.midterm ? `<small>${esc(L.smallMidterm)}</small>` : ""
    }</td>
        <td data-label="${esc(L.thRead)}">${
          ch
            ? `<a class="resource-link" href="${w(
                `ebook/${ch.out}`
              )}">${esc(t(L.chapterCta, { n: s.n }))}</a>`
            : "—"
        }</td>
        <td data-label="${esc(L.thSlides)}"><a class="resource-link" href="${p(
      `slides/buoi-${nn}.html`
    )}">${esc(t(L.deckCta, { n: s.n }))}</a></td>
        <td data-label="${esc(L.thHomework)}"><a class="resource-link" href="${w(
      `homework/session-${nn}.html`
    )}">HW ${nn}</a></td>
      </tr>`;
  }).join("\n");

  const appendix = chapters.find((c) => c.session === null);

  const tile = (cls, n, href, label, sub, shared) =>
    `      <li class="${cls}"><a href="${
      shared ? p(href) : w(href)
    }"><span class="tile-icon" aria-hidden="true">${n}</span><span class="tile-copy"><strong>${esc(
      label
    )}</strong><span>${esc(sub)}</span></span><span class="tile-arrow" aria-hidden="true">↗</span></a></li>`;

  const body = `  <section class="resource-section" aria-labelledby="resources-h">
    <div class="section-head"><div><p class="section-kicker">${esc(
      L.resKicker
    )}</p><h2 id="resources-h">${esc(L.resHeading)}</h2></div><p>${esc(
    L.resSub
  )}</p></div>
    <ul class="tiles">
${tile("tile-sessions", "01", "sessions/index.html", L.tileSessions, L.tileSessionsSub)}
${tile("tile-ebook", "02", "ebook/index.html", L.tileEbook, L.tileEbookSub)}
${tile("tile-slides", "03", "slides/index.html", L.tileSlides, L.tileSlidesSub)}
${tile("tile-homework", "04", "homework/index.html", L.tileHomework, L.tileHomeworkSub)}
${tile("tile-grader", "05", GRADER_PUBLIC, L.tileTool, L.tileToolSub, true)}
${tile("tile-guide", "06", "orientation.html", L.tileGuide, L.tileGuideSub)}
${tile("tile-agents", "07", "ai-agents.html", L.tileAgents, L.tileAgentsSub)}
    </ul>
  </section>

  <section class="flow-section" aria-labelledby="how-it-works">
    <div class="section-head"><div><p class="section-kicker">${esc(
      L.flowKicker
    )}</p><h2 id="how-it-works">${esc(
    L.flowHeading
  )}</h2></div><p>${esc(L.flowSub)}</p></div>
    <ol class="flow">
      <li><span class="flow-index" aria-hidden="true">01</span><div><strong>${esc(
    L.whenBefore
  )}</strong><span>${L.flow1Body}</span></div></li>
      <li><span class="flow-index" aria-hidden="true">02</span><div><strong>${esc(
    L.whenIn
  )}</strong><span>${esc(L.flow2Body)}</span></div></li>
      <li><span class="flow-index" aria-hidden="true">03</span><div><strong>${esc(
    L.whenAfter
  )}</strong><span>${esc(L.flow3Body)}</span></div></li>
    </ol>
  </section>

  <h2 id="schedule">${esc(L.schedHeading)}</h2>
  <table class="sched">
    <caption>${esc(L.schedCaption)}</caption>
    <thead>
      <tr><th scope="col">${esc(L.thWeek)}</th><th scope="col">${esc(
    L.thSession
  )}</th><th scope="col">${esc(L.thRead)}</th><th scope="col">${esc(
    L.thSlides
  )}</th><th scope="col">${esc(L.thHomework)}</th></tr>
    </thead>
    <tbody>
${rows}
    </tbody>
  </table>
${
  appendix
    ? `  <h2 id="extra">${esc(L.extraHeading)}</h2>
  <p><a href="${w(`ebook/${appendix.out}`)}">${esc(
    appendix.title
  )}</a> — ${esc(L.extraSub)}</p>\n`
    : ""
}
  <h2 id="not-here">${esc(L.notHereHeading)}</h2>
  <p>${esc(L.notHereBody)}</p>`;

  return page({
    lang,
    rel: "index.html",
    title: `${COURSE}`,
    heading: L.homeTitle,
    lead: L.homeLead,
    eyebrow: L.homeEyebrow,
    introExtra: `    <div class="hero-actions"><a class="primary-action" href="${w(
      "sessions/session-01.html"
    )}">${esc(L.startCta)} <span aria-hidden="true">→</span></a><a class="secondary-action" href="#schedule">${esc(
      L.exploreCta
    )}</a></div>
    <dl class="hero-stats"><div><dt>15</dt><dd>${esc(
      L.statSessions
    )}</dd></div><div><dt>16</dt><dd>${esc(
      L.statChapters
    )}</dd></div><div><dt>17</dt><dd>${esc(L.statDecks)}</dd></div></dl>`,
    body,
    depth: 0,
    pageClass: "home-page",
  });
}

function listPage({ title, heading, lead, crumbLabel, items, note, rel }, lang) {
  const L = UI[lang];
  const { base, w } = hrefs(1, lang);
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
    lang,
    rel,
    title: `${title} — ${COURSE}`,
    heading,
    lead,
    crumbs: [
      { href: `${base}/index.html`, label: L.crumbHome },
      { label: crumbLabel },
    ],
    body,
    depth: 1,
    pageClass: "list-page",
    eyebrow: t(L.eyebrowCount, { n: items.length }),
  });
}

/* --- orientation page ----------------------------------------------------- */

function orientationPage(lang = "en") {
  // Only the chrome is Vietnamese here; the guide body stays English and the
  // page says so. Links still have to resolve from site/vi/, so they are built
  // from the same helpers as everywhere else.
  const { w, p } = hrefs(0, lang);
  const body = `  <div class="doc">
<h2 id="welcome">Welcome to INS2053</h2>
<p>This course teaches you web authoring from scratch. Over 15 weeks you will learn HTML, CSS, and basic web design — and you will build a complete <strong>Student Club Website</strong> with five pages. No prior web development experience is needed; the prerequisite (INT1004) covers general computer skills.</p>
<p>This page explains how the course materials are organized and how to get the most out of them.</p>

<h2 id="materials">How the materials are organized</h2>
<p>Every week has the same five pieces. They all share the same session number (01–15):</p>
<table>
  <caption>Course materials by type</caption>
  <thead><tr><th scope="col">Material</th><th scope="col">What it is</th><th scope="col">When to use it</th></tr></thead>
  <tbody>
    <tr><td><strong>Ebook chapter</strong></td><td>The textbook — theory, examples, and self-check questions</td><td><strong>Before</strong> class</td></tr>
    <tr><td><strong>Lecture slides</strong></td><td>What your lecturer projects, with 60 teaching diagrams</td><td><strong>During</strong> class</td></tr>
    <tr><td><strong>In-class exercise</strong></td><td>Hands-on practice your lecturer hands out</td><td><strong>During</strong> class</td></tr>
    <tr><td><strong>Homework</strong></td><td>Practice brief with rubric — due Sunday 23:59</td><td><strong>After</strong> class</td></tr>
    <tr><td><strong>Self-check tool</strong></td><td>Browser-only tool that checks your homework against the rubric</td><td>Before submitting homework</td></tr>
  </tbody>
</table>

<h2 id="ebook">How to read the ebook</h2>
<p>Each ebook chapter follows the same structure. Here's what each section means and how to use it:</p>

<h3>📌 Session Information</h3>
<p>A quick reference block at the top of every chapter: duration, prerequisites, learning objectives, preparation instructions, and which teaching diagrams your lecturer will project. Read this once to orient yourself.</p>

<h3>🎯 Learning Objectives</h3>
<p>What you'll be able to do after the session. Read these before starting, then check yourself against them at the end.</p>

<h3>📖 Theory</h3>
<p>The actual lesson, broken into short sections with code examples. Most paragraphs are 1–2 lines long — you won't face "walls of text." <strong>Don't just read — type the code examples yourself.</strong></p>

<h3>🧪 Try It Yourself</h3>
<p>Hands-on exercises embedded in the theory. Each one gives you step-by-step instructions and tells you the <strong>expected result</strong>. If your output doesn't match, re-read the preceding section. These take 2–5 minutes each.</p>

<h3>🖼 Diagram References</h3>
<p>Lines like <code>🖼 Diagram: canvases/buoi-04.canvas.tsx → BoxModelDiagram</code> point to visual diagrams your lecturer will project during class. You can also view them in the <a href="${w("slides/index.html")}">lecture slide decks</a>.</p>

<h3>🔍 Common Errors Table</h3>
<p>A four-column table (Symptom → Cause → How to confirm → How to fix) listing the most common mistakes for that session. <strong>Bookmark these tables</strong> — you'll need them when debugging your homework.</p>

<h3>✅ Self-Check (hidden answers)</h3>
<p>Eight questions per chapter with answers hidden behind clickable toggles. <strong>Try to answer each question yourself first</strong>, then click to reveal. The last question typically provides no code — you write it yourself before checking.</p>

<h3>📋 Self-Assessment Worksheet</h3>
<p>A checklist to honestly rate your understanding of each learning objective.</p>

<h2 id="sessions">How to use the session pages</h2>
<p>Each <a href="${w("sessions/index.html")}">session page</a> on this website has four steps:</p>
<ol>
  <li><strong>Before class</strong> — Read the ebook chapter and work the Try It Yourself blocks</li>
  <li><strong>In class</strong> — Follow the lecture deck (press <kbd>j</kbd>/<kbd>k</kbd> to navigate, <kbd>n</kbd> for speaker notes)</li>
  <li><strong>After class</strong> — Work on the homework brief</li>
  <li><strong>Check yourself</strong> — Open the self-check tool to verify your work</li>
</ol>
<p>Start at <a href="${w("sessions/session-01.html")}">Session 1</a> and follow the flow.</p>

<h2 id="selfcheck">How to use the self-check tool</h2>
<p>The <a href="${p(GRADER_PUBLIC)}">self-check tool</a> runs entirely in your browser — <strong>nothing is uploaded</strong>. It checks the mechanical parts of the homework rubric.</p>
<ol>
  <li>Open the tool and select the correct session</li>
  <li>Enter your name, student ID, and class</li>
  <li>Provide your work: paste a GitHub link, drag-drop a folder, or paste code directly</li>
  <li>Click <strong>Grade</strong> and read the results</li>
  <li>Fix issues, re-grade, and save the final result (screenshot + JSON)</li>
</ol>

<h3>Reading the results</h3>
<table>
  <caption>Result card numbers explained</caption>
  <thead><tr><th scope="col">Label</th><th scope="col">Meaning</th></tr></thead>
  <tbody>
    <tr><td><strong>AUTO</strong></td><td>Points the machine confirmed — these are yours</td></tr>
    <tr><td><strong>MANUAL</strong></td><td>Points that need your lecturer's judgment (not your score yet)</td></tr>
    <tr><td><strong>BLOCKED</strong></td><td>Points blocked because a file was missing (not automatically zero)</td></tr>
    <tr><td><strong>TOTAL RUBRIC</strong></td><td>Total rubric weight, usually 10 — not your final mark</td></tr>
  </tbody>
</table>
<p>On each line: <code>✓</code> = pass, <code>~</code> = partial, <code>✗</code> = fail, <code>?</code> = needs human review.</p>
<p><strong>The tool does not decide your final grade.</strong> It checks what a machine can check. Your lecturer reviews everything else.</p>

<h2 id="project">The capstone project</h2>
<p>You'll build a <strong>Student Club Website</strong> with five pages (index, about, activities, media, contact). You add features each week as you learn new skills. The full specification is in <code>project/spec.md</code>.</p>
<p>Milestones M1–M8 fall at least one week <em>after</em> the session that teaches the required skills, so you're never asked to build something not yet covered.</p>

<h2 id="exams">Exams</h2>
<table>
  <caption>Exam schedule</caption>
  <thead><tr><th scope="col">Exam</th><th scope="col">When</th><th scope="col">Duration</th><th scope="col">Coverage</th></tr></thead>
  <tbody>
    <tr><td>Midterm</td><td>Week 8</td><td>90 min</td><td>Sessions 1–7</td></tr>
    <tr><td>Final</td><td>Week 15</td><td>120 min</td><td>Whole course (focus on 9–15)</td></tr>
  </tbody>
</table>
<p>Both exams are <strong>practical</strong> (you write HTML/CSS). <strong>No internet.</strong> You may bring your own notes, the ebook chapters offline, and your project files. Sample papers are on the website — practice under timed conditions.</p>

<h2 id="deadlines">Key deadlines</h2>
<ul>
  <li><strong>Homework:</strong> every Sunday 23:59. Monday grace day at −20% of earned mark.</li>
  <li><strong>Project milestones:</strong> M1–M6 follow the same rule (one grace day at −20%).</li>
  <li><strong>Final ZIP (M7 + M8):</strong> Week 16, Sunday 23:59. −10% per day late.</li>
  <li>If illness or a documented reason stops you from submitting, contact your lecturer <strong>before</strong> the deadline.</li>
</ul>

<h2 id="resources">All resources at a glance</h2>
<ul>
  <li><a href="${w("sessions/index.html")}">Sessions</a> — 15 weeks, one hub per week</li>
  <li><a href="${w("ebook/index.html")}">Ebook</a> — 15 chapters + Appendix A</li>
  <li><a href="${w("slides/index.html")}">Lecture slides</a> — 17 decks with 60 teaching diagrams</li>
  <li><a href="${w("homework/index.html")}">Homework</a> — 15 practice briefs with rubrics</li>
  <li><a href="${p(GRADER_PUBLIC)}">Self-check tool</a> — browser-only homework grader</li>
  <li><code>examples/student-club/</code> — a complete reference website (study it, don't copy it)</li>
  <li><code>references/resources.md</code> — curated links: MDN, W3C, tools, tutorials</li>
</ul>
</div>`;

  return page({
    lang,
    rel: "orientation.html",
    untranslated: lang === "vi",
    title: `How to Use This Course — ${COURSE}`,
    heading: "How to Use This Course",
    lead: "Everything you need to know about the ebook, slides, exercises, homework, and self-check tool — in one place.",
    crumbs: [
      { href: "index.html", label: UI[lang].crumbHome },
      { label: "Student Guide" },
    ],
    toc: [
      { id: "welcome", label: "Welcome to INS2053", depth: 2 },
      { id: "materials", label: "How the materials are organized", depth: 2 },
      { id: "ebook", label: "How to read the ebook", depth: 2 },
      { id: "sessions", label: "How to use the session pages", depth: 2 },
      { id: "selfcheck", label: "How to use the self-check tool", depth: 2 },
      { id: "project", label: "The capstone project", depth: 2 },
      { id: "exams", label: "Exams", depth: 2 },
      { id: "deadlines", label: "Key deadlines", depth: 2 },
      { id: "resources", label: "All resources at a glance", depth: 2 },
    ],
    body,
    depth: 0,
    pageClass: "reading-page",
    eyebrow: "INS2053 · Student guide",
  });
}

/* --- AI agent guide page -------------------------------------------------- */

function agentGuidePage(lang = "en") {
  const body = `  <div class="doc">
<h2 id="why-agents">Why use an AI agent for web development?</h2>
<p>An AI coding agent lives inside your editor and helps you write, debug, and understand code in real time. For INS2053, that means:</p>
<ul>
  <li><strong>Faster homework</strong> — the agent suggests HTML/CSS as you type, so you spend less time on syntax and more on design decisions.</li>
  <li><strong>Instant explanations</strong> — highlight any code snippet and ask <em>"what does this do?"</em> to get a plain-language answer.</li>
  <li><strong>Error diagnosis</strong> — paste a broken page and the agent traces the problem to the exact line.</li>
  <li><strong>Independence</strong> — once you know how to configure one agent, the skill transfers to any editor and any API provider. You are never locked into a single tool.</li>
</ul>
<div class="callout">
  <p><strong>You still need to understand the code.</strong> The agent is a pair-programmer, not a replacement for learning. Use it to accelerate your work — not to skip the thinking. Every line it suggests, you should be able to explain.</p>
</div>

<h2 id="two-options">Two agents, one workflow</h2>
<p>This guide covers two free or low-cost agents that run inside <strong>Visual Studio Code</strong>. Pick the one that feels right — both do the same job.</p>
<table>
  <caption>Comparison of the two agents</caption>
  <thead><tr><th scope="col">&nbsp;</th><th scope="col">GitHub Copilot (Free tier)</th><th scope="col">Cline (open-source)</th></tr></thead>
  <tbody>
    <tr><td><strong>What it is</strong></td><td>Official GitHub extension, built into VS Code</td><td>Community extension, works with any OpenAI-compatible API</td></tr>
    <tr><td><strong>Cost</strong></td><td>Free for students (GitHub Education)</td><td>Free extension · you bring your own API key</td></tr>
    <tr><td><strong>Model</strong></td><td>GPT-4o-mini (free tier)</td><td>Any model: Claude, GPT, Gemini, DeepSeek, local models</td></tr>
    <tr><td><strong>Best for</strong></td><td>Inline autocomplete as you type</td><td>Multi-file editing, autonomous refactoring, terminal commands</td></tr>
    <tr><td><strong>Setup difficulty</strong></td><td>Very easy — sign in with GitHub</td><td>Easy — install extension + paste API key</td></tr>
  </tbody>
</table>

<h2 id="copilot">Option A: VS Code + GitHub Copilot</h2>

<h3>Step 1 — Install VS Code</h3>
<p>Download from <a href="https://code.visualstudio.com" rel="noopener">code.visualstudio.com</a>. Install it and open any folder (e.g. your INS2053 project).</p>

<h3>Step 2 — Install the Copilot extension</h3>
<ol>
  <li>Open VS Code Extensions panel (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>)</li>
  <li>Search for <strong>"GitHub Copilot"</strong></li>
  <li>Click <strong>Install</strong></li>
  <li>Sign in with your GitHub account (use your student email for the free tier)</li>
</ol>

<h3>Step 3 — Verify it works</h3>
<p>Open any <code>.html</code> file and start typing a tag. You should see grey ghost text suggesting the rest. Press <kbd>Tab</kbd> to accept.</p>

<h3>Step 4 — Using Copilot Chat</h3>
<p>Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> to open Copilot Chat. You can:</p>
<ul>
  <li>Type a question in the chat panel on the right</li>
  <li>Highlight code, then press <kbd>Ctrl</kbd>+<kbd>I</kbd> for inline editing</li>
  <li>Use <code>/explain</code> to understand a code block</li>
  <li>Use <code>/fix</code> to diagnose and repair errors</li>
</ul>

<h3>Optional: bring your own API key</h3>
<p>If you have a different API key (e.g. from OpenRouter or a university server), you can point Copilot at a custom endpoint:</p>
<table>
  <caption>Copilot custom model configuration</caption>
  <thead><tr><th scope="col">Setting</th><th scope="col">Where to find it</th><th scope="col">Example value</th></tr></thead>
  <tbody>
    <tr><td><strong>Base URL</strong></td><td>Settings → search <code>copilot base</code></td><td><code>https://openrouter.ai/api/v1</code></td></tr>
    <tr><td><strong>API Key</strong></td><td>Settings → search <code>copilot api key</code></td><td>Your key (starts with <code>sk-...</code>)</td></tr>
    <tr><td><strong>Model</strong></td><td>Settings → search <code>copilot model</code></td><td><code>deepseek/deepseek-chat</code></td></tr>
  </tbody>
</table>

<h2 id="cline">Option B: Cline (open-source agent)</h2>
<p>Cline is a free, open-source extension that can read your files, run terminal commands, and edit multiple files at once. It works with any OpenAI-compatible API.</p>

<h3>Step 1 — Install VS Code</h3>
<p>Same as above — <a href="https://code.visualstudio.com" rel="noopener">code.visualstudio.com</a>.</p>

<h3>Step 2 — Install the Cline extension</h3>
<ol>
  <li>Open Extensions panel (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>)</li>
  <li>Search for <strong>"Cline"</strong> (publisher: Cline)</li>
  <li>Click <strong>Install</strong></li>
</ol>

<h3>Step 3 — Configure your API</h3>
<p>Click the Cline icon in the left sidebar (looks like a robot), then click the ⚙️ gear icon. You'll see these fields:</p>
<table>
  <caption>Cline API configuration fields</caption>
  <thead><tr><th scope="col">Field</th><th scope="col">What to enter</th><th scope="col">Example</th></tr></thead>
  <tbody>
    <tr><td><strong>API Provider</strong></td><td>Choose from the dropdown</td><td><code>OpenAI Compatible</code></td></tr>
    <tr><td><strong>Base URL</strong></td><td>The endpoint of your API server</td><td><code>https://openrouter.ai/api/v1</code></td></tr>
    <tr><td><strong>API Key</strong></td><td>Your secret key from the provider</td><td><code>sk-or-v1-abc123...</code></td></tr>
    <tr><td><strong>Model</strong></td><td>Which model to use</td><td><code>anthropic/claude-sonnet-4</code></td></tr>
  </tbody>
</table>

<h3>Step 4 — Start using Cline</h3>
<p>Click the Cline icon, type a task in the box, and press Enter. Cline will:</p>
<ol>
  <li>Read your project files to understand context</li>
  <li>Propose changes (you see a diff before anything is written)</li>
  <li>Ask for your approval before making edits</li>
  <li>Run terminal commands if needed (with your permission)</li>
</ol>
<div class="callout warn">
  <p><strong>Always review before approving.</strong> Cline shows you every change as a diff. Read it carefully. You are in control — reject anything that doesn't look right.</p>
</div>

<h2 id="api-keys">Where to get an API key</h2>
<p>If your Copilot free tier is enough, you can skip this section. Otherwise, here are popular providers that work with both Copilot custom models and Cline:</p>
<table>
  <caption>API providers for students</caption>
  <thead><tr><th scope="col">Provider</th><th scope="col">Free credits</th><th scope="col">Base URL</th><th scope="col">Popular models</th></tr></thead>
  <tbody>
    <tr><td><strong>OpenRouter</strong></td><td>Small free tier + pay-as-you-go</td><td><code>https://openrouter.ai/api/v1</code></td><td><code>deepseek/deepseek-chat</code>, <code>anthropic/claude-sonnet-4</code></td></tr>
    <tr><td><strong>GitHub Models</strong></td><td>Free with GitHub account</td><td><code>https://models.inference.ai.azure.com</code></td><td><code>gpt-4o-mini</code>, <code>Phi-3.5-mini</code></td></tr>
    <tr><td><strong>Google AI Studio</strong></td><td>Free tier with rate limits</td><td><code>https://generativelanguage.googleapis.com/v1beta</code></td><td><code>gemini-2.0-flash</code></td></tr>
  </tbody>
</table>

<h2 id="ins2053-examples">Using agents for INS2053 homework</h2>
<p>Here's how an agent helps across the 15 sessions. The examples below are from real homework tasks.</p>

<h3>Sessions 1–3: HTML basics</h3>
<table>
  <caption>Agent use cases — HTML sessions</caption>
  <thead><tr><th scope="col">You ask</th><th scope="col">What happens</th></tr></thead>
  <tbody>
    <tr><td><em>"Create a basic HTML5 page structure with a header, nav, main, and footer"</em></td><td>Agent generates the boilerplate — you learn by reading and modifying it</td></tr>
    <tr><td><em>"Add a table with 3 columns for my club events"</em></td><td>Agent writes the table markup; you adjust content and styling</td></tr>
    <tr><td><em>"Why is my image not showing? Here's my code: …"</em></td><td>Agent spots the wrong <code>src</code> path and explains relative vs. absolute paths</td></tr>
  </tbody>
</table>

<h3>Sessions 4–7: CSS and layout</h3>
<table>
  <caption>Agent use cases — CSS sessions</caption>
  <thead><tr><th scope="col">You ask</th><th scope="col">What happens</th></tr></thead>
  <tbody>
    <tr><td><em>"Center this div horizontally and vertically with flexbox"</em></td><td>Agent writes the flexbox CSS — you study <code>justify-content</code> and <code>align-items</code></td></tr>
    <tr><td><em>"Explain the difference between margin and padding"</em></td><td>Agent gives a clear explanation with a visual analogy</td></tr>
    <tr><td><em>"Make this layout responsive for mobile"</em></td><td>Agent adds media queries; you review each breakpoint</td></tr>
  </tbody>
</table>

<h3>Sessions 9–15: Advanced topics</h3>
<table>
  <caption>Agent use cases — advanced sessions</caption>
  <thead><tr><th scope="col">You ask</th><th scope="col">What happens</th></tr></thead>
  <tbody>
    <tr><td><em>"Create a contact form with name, email, message, and a submit button"</em></td><td>Agent generates the form HTML with proper <code>label</code>, <code>input</code>, and <code>required</code> attributes</td></tr>
    <tr><td><em>"Add a YouTube video embed to my media page"</em></td><td>Agent writes the <code>iframe</code> code with responsive wrapper</td></tr>
    <tr><td><em>"Check my HTML for accessibility issues"</em></td><td>Agent reviews alt text, heading order, form labels, and color contrast</td></tr>
  </tbody>
</table>

<h2 id="best-practices">Best practices</h2>
<ol>
  <li><strong>Read every suggestion.</strong> Don't blindly accept. If you can't explain what the code does, ask the agent to explain it first.</li>
  <li><strong>Start small.</strong> Ask for one thing at a time. "Add a nav bar" works better than "build my whole website."</li>
  <li><strong>Provide context.</strong> Highlight the relevant code before asking. Or say "look at my <code>index.html</code> file."</li>
  <li><strong>Learn the patterns.</strong> After the agent helps you 2–3 times with the same pattern (e.g. flexbox centering), try doing it yourself next time.</li>
  <li><strong>Use it for debugging.</strong> Paste your error message or describe what's wrong. Agents are excellent at finding typos, missing closing tags, and CSS specificity conflicts.</li>
  <li><strong>Don't use it for the self-check tool.</strong> The point of self-checking is to verify <em>your</em> understanding. The agent should help you build, not help you pass automated checks.</li>
</ol>

<h2 id="troubleshooting">Common issues</h2>
<table>
  <caption>Troubleshooting agent setup</caption>
  <thead><tr><th scope="col">Problem</th><th scope="col">Solution</th></tr></thead>
  <tbody>
    <tr><td>Copilot icon is grey / not working</td><td>Check you're signed in to GitHub. VS Code → bottom-left account icon.</td></tr>
    <tr><td>Cline says "API key invalid"</td><td>Re-copy the key from your provider's dashboard. Keys are case-sensitive and have no trailing spaces.</td></tr>
    <tr><td>Cline says "rate limit exceeded"</td><td>Wait a minute, or switch to a model with higher limits. Free tiers have low quotas.</td></tr>
    <tr><td>Agent suggestions are irrelevant</td><td>Add more context: open the relevant file, highlight code, or describe your project structure.</td></tr>
    <tr><td>Agent writes code that doesn't match the course style</td><td>Tell it: "Use HTML5 semantic tags. Don't use frameworks. Follow the INS2053 rubric."</td></tr>
  </tbody>
</table>

<h2 id="remember">Remember</h2>
<div class="callout">
  <p>The agent helps you <strong>build faster</strong>, but the course teaches you to <strong>understand what you build</strong>. Both matter. Use the agent as a tool, learn the fundamentals as a skill, and you'll be able to work with <em>any</em> editor, <em>any</em> AI, and <em>any</em> project — long after this course ends.</p>
</div>
</div>`;

  return page({
    lang,
    rel: "ai-agents.html",
    untranslated: lang === "vi",
    title: `Using AI Agents for INS2053 — ${COURSE}`,
    heading: "Using AI Agents for Web Development",
    lead: "Two simple setups — VS Code + Copilot or Cline — that help you write, debug, and understand HTML/CSS faster. Works with any API provider.",
    crumbs: [
      { href: "index.html", label: "Home" },
      { label: "AI Agents Guide" },
    ],
    toc: [
      { id: "why-agents", label: "Why use an AI agent?", depth: 2 },
      { id: "two-options", label: "Two agents, one workflow", depth: 2 },
      { id: "copilot", label: "Option A: VS Code + Copilot", depth: 2 },
      { id: "cline", label: "Option B: Cline", depth: 2 },
      { id: "api-keys", label: "Where to get an API key", depth: 2 },
      { id: "ins2053-examples", label: "Using agents for INS2053", depth: 2 },
      { id: "best-practices", label: "Best practices", depth: 2 },
      { id: "troubleshooting", label: "Common issues", depth: 2 },
      { id: "remember", label: "Remember", depth: 2 },
    ],
    body,
    depth: 0,
    pageClass: "reading-page",
    eyebrow: "INS2053 · AI-assisted learning",
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
function rewriteLinks(html, { lang, depth }) {
  const { base: up, pub } = hrefs(depth, lang);

  return html
    // ebook/NN-slug.md  ->  ../ebook/NN-slug.html  (translated pages live in
    // this tree, so this link stays inside it)
    .replace(
      /href="(?:\.\.\/)?ebook\/([0-9]{2}|appendix-a)-([a-z0-9-]+)\.md(#[^"]*)?"/g,
      (_m, num, slug, hash) => `href="${up}/ebook/${num}-${slug}.html${hash || ""}"`
    )
    // canvases/buoi-NN.canvas.tsx  ->  ../slides/buoi-NN.html  (the decks are
    // shared between languages, so this link climbs out of the tree)
    .replace(
      /href="(?:\.\.\/)?canvases\/buoi-([0-9]{2})\.canvas\.tsx"/g,
      (_m, nn) => `href="${pub}/slides/buoi-${nn}.html"`
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
        `<span class="unpub" title="${esc(UI[lang].unpubTitle)}">${label}</span>`
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

/**
 * Wipe site/ before regenerating it, waiting out a transient lock.
 *
 * The repo lives under OneDrive, so a directory inside site/ is regularly held
 * open by the sync client, by antivirus, or by an Explorer window at the moment
 * the build clears it, and rm() then throws EPERM / EBUSY / ENOTEMPTY. The
 * danger is not the failed build — it is a build that deletes part of the
 * published site and stops there, which is exactly what a plain `await rm()`
 * does on this machine. A short bounded retry keeps one lock from eating the
 * output, and QA then always reads a complete tree.
 */
async function wipe(dir) {
  const lockErrors = ["EPERM", "EBUSY", "ENOTEMPTY", "EACCES"];
  for (let attempt = 1; ; attempt++) {
    try {
      await rm(dir, { recursive: true, force: true });
      return;
    } catch (err) {
      if (!lockErrors.includes(err.code) || attempt >= 5) throw err;
      await new Promise((resolve) => setTimeout(resolve, 200 * attempt));
    }
  }
}

async function build() {
  await wipe(OUT);
  await mkdir(OUT, { recursive: true });

  /* 1. assets — one copy. The Vietnamese tree reaches it as ../assets, so a
        stylesheet change can never drift out of step between the languages. -- */
  await cp(ASSETS, path.join(OUT, "assets"), { recursive: true });

  /* 2. slide decks — copied as-is, already standalone HTML. The decks are the
        lecturer's own material and are not translated, so both trees point at
        this single copy instead of each carrying a duplicate. --------------- */
  const decks = path.join(ROOT, "slides-html");
  if (!existsSync(decks)) {
    fail("slides-html/ is missing — run `npm run build:slides` first");
    return;
  }
  await cp(decks, path.join(OUT, "slides"), { recursive: true });

  /* 3. the self-check tool, copied byte for byte, shared the same way. Its QA
        gate compares the published copy against the built artefact, so it has
        to exist exactly once. ---------------------------------------------- */
  if (!existsSync(GRADER_ARTEFACT)) {
    fail(
      "_tools/grader/cham-bai.html is missing — run `npm run build:grader` first"
    );
  } else {
    await cp(GRADER_ARTEFACT, path.join(OUT, GRADER_PUBLIC));
  }

  const built = [];
  for (const lang of Object.keys(LANGS)) built.push(await buildTree(lang));

  console.log(
    built
      .map(
        (b) =>
          `built ${b.dirLabel} — ${b.chapters} chapters, ${b.sheets} homework sheets, ` +
          `${b.hubs} session hubs, ${b.decks} decks indexed` +
          // The English tree is the source, so a translation count is only
          // meaningful for the other trees.
          (b.lang === "en"
            ? ""
            : `  [${b.translated} of ${b.chapters + b.sheets} documents translated]`)
      )
      .join("\n")
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

/**
 * Generate one language tree: English into site/, Vietnamese into site/vi/.
 *
 * Prose comes from i18n/vi/<same repo path> when that file exists and from the
 * English source when it does not. `untranslated` carries that fact into the
 * page shell so the reader is told rather than left to wonder why a Vietnamese
 * page is suddenly English.
 */
async function buildTree(lang) {
  const TREE = treeDir(lang);
  const L = UI[lang];
  const { w, p } = hrefs(1, lang);
  await mkdir(TREE, { recursive: true });

  /* 4. ebook chapters ----------------------------------------------------- */
  await mkdir(path.join(TREE, "ebook"), { recursive: true });
  const chapterFiles = (await readdir(path.join(ROOT, "ebook")))
    .filter((f) => f.endsWith(".md"))
    .sort();

  const chapters = [];
  let translated = 0;
  for (const file of chapterFiles) {
    const viSrc = path.join(ROOT, "i18n/vi/ebook", file);
    const hasVi = lang === "vi" && existsSync(viSrc);
    const md = await readFile(hasVi ? viSrc : path.join(ROOT, "ebook", file), "utf8");
    const { html, headings } = render(md);

    // The title is the chapter's own SECOND line; the first is "# SESSION NN".
    const lines = md.split(/\r?\n/);
    const title = plain((lines[1] || lines[0] || file).replace(/^#\s*/, ""));
    const num = file.slice(0, 2);
    const session = /^[0-9]{2}$/.test(num) ? Number(num) : null;
    const out = file.replace(/\.md$/, ".html");
    const slug = file.replace(/^([0-9]{2}|appendix-a)-/, "").replace(/\.md$/, "");
    const heading = session
      ? t(L.hubTitle, { n: session, topic: title })
      : title;
    if (hasVi) translated++;

    const nav = session
      ? `  <nav class="pager" aria-label="${esc(L.chapterNav)}">
    <a class="up" href="${w(
      `sessions/session-${pad(session)}.html`
    )}">${esc(t(L.sessionOverview, { n: session }))}</a>
  </nav>\n`
      : "";

    await writeFile(
      path.join(TREE, "ebook", out),
      page({
        lang,
        rel: `ebook/${out}`,
        untranslated: lang === "vi" && !hasVi,
        title: `${heading} — ${COURSE}`,
        heading,
        crumbs: [
          { href: "../index.html", label: L.crumbHome },
          { href: "../ebook/index.html", label: L.navEbook },
          { label: session ? t(L.chapterCta, { n: session }) : L.subAppendix },
        ],
        toc: headings.filter((h) => h.depth === 2),
        body: `${nav}  <article class="doc">\n${rewriteLinks(html, {
          lang,
          depth: 1,
        })}\n  </article>`,
        depth: 1,
        pageClass: "reading-page ebook-page",
        eyebrow: session
          ? t(L.eyebrowChapter, { nn: pad(session) })
          : L.eyebrowAppendix,
      }),
      "utf8"
    );

    chapters.push({ file, out, slug, title, session });
  }
  /* 5. homework ----------------------------------------------------------- */
  await mkdir(path.join(TREE, "homework"), { recursive: true });
  const sheets = [];
  for (const s of SESSIONS) {
    const nn = pad(s.n);
    const enSrc = path.join(ROOT, "homework", `session-${nn}`, "homework.md");
    const viSrc = path.join(ROOT, "i18n/vi/homework", `session-${nn}`, "homework.md");
    const hasVi = lang === "vi" && existsSync(viSrc);
    if (!existsSync(enSrc)) {
      fail(`homework/session-${nn}/homework.md is missing`);
      continue;
    }
    const md = await readFile(hasVi ? viSrc : enSrc, "utf8");
    const publicMd = prepareHomeworkMarkdown(md);
    const { html, headings } = render(publicMd);
    const title = plain((md.split(/\r?\n/)[0] || "").replace(/^#\s*/, ""));
    if (hasVi) translated++;

    await writeFile(
      path.join(TREE, "homework", `session-${nn}.html`),
      page({
        lang,
        rel: `homework/session-${nn}.html`,
        untranslated: lang === "vi" && !hasVi,
        title: `${title} — ${COURSE}`,
        heading: title,
        lead: L.sheetLead,
        crumbs: [
          { href: "../index.html", label: L.crumbHome },
          { href: "../homework/index.html", label: L.navHomework },
          { label: t(L.sessionCrumbLabel, { n: s.n }) },
        ],
        toc: headings.filter((h) => h.depth === 2),
        body: `  <div class="callout status-note" role="status">
    <p><strong>${esc(L.practiceModeTitle)}</strong> ${esc(L.practiceModeBody)}</p>
    <p>${t(L.practiceModeTool, { href: p(GRADER_PUBLIC), n: s.n })}</p>
  </div>
  <nav class="pager" aria-label="${esc(L.sessionNav)}">
    <a class="up" href="${w(
      `sessions/session-${nn}.html`
    )}">${esc(t(L.sessionOverview, { n: s.n }))}</a>
  </nav>\n  <article class="doc">\n${rewriteLinks(html, {
    lang,
    depth: 1,
  })}\n  </article>`,
        depth: 1,
        pageClass: "reading-page homework-page",
        eyebrow: t(L.eyebrowHomework, { nn }),
      }),
      "utf8"
    );
    sheets.push({ n: s.n, title });
  }

  /* 6. session hubs — the teaching flow ----------------------------------- */
  await mkdir(path.join(TREE, "sessions"), { recursive: true });
  for (const s of SESSIONS) {
    const ch = chapters.find((c) => c.session === s.n);
    if (!ch) {
      fail(`no ebook chapter found for session ${s.n}`);
      continue;
    }
    await writeFile(
      path.join(TREE, "sessions", `session-${pad(s.n)}.html`),
      sessionHub(s, ch, lang),
      "utf8"
    );
  }

  /* 7. index and guide pages ---------------------------------------------- */
  await writeFile(path.join(TREE, "index.html"), homePage(chapters, lang), "utf8");
  await writeFile(
    path.join(TREE, "orientation.html"),
    orientationPage(lang),
    "utf8"
  );
  await writeFile(
    path.join(TREE, "ai-agents.html"),
    agentGuidePage(lang),
    "utf8"
  );

  await writeFile(
    path.join(TREE, "sessions", "index.html"),
    listPage(
      {
        title: L.navSessions,
        heading: L.idxSessionsHeading,
        lead: L.idxSessionsLead,
        crumbLabel: L.navSessions,
        rel: "sessions/index.html",
        items: SESSIONS.map((s) => ({
          href: `session-${pad(s.n)}.html`,
          label: t(L.idxSessionLabel, { n: s.n, topic: topicOf(s, lang) }),
          sub: s.midterm ? L.idxWeekMidterm : t(L.idxWeekN, { n: s.n }),
        })),
      },
      lang
    ),
    "utf8"
  );

  await writeFile(
    path.join(TREE, "ebook", "index.html"),
    listPage(
      {
        title: L.navEbook,
        heading: L.idxEbookHeading,
        lead: L.idxEbookLead,
        crumbLabel: L.navEbook,
        rel: "ebook/index.html",
        items: chapters.map((c) => ({
          href: c.out,
          label: c.session
            ? t(L.idxChapterLabel, { n: c.session, title: c.title })
            : c.title,
          sub: c.session ? t(L.idxSessionN, { n: c.session }) : L.subAppendix,
        })),
      },
      lang
    ),
    "utf8"
  );

  await writeFile(
    path.join(TREE, "homework", "index.html"),
    listPage(
      {
        title: L.navHomework,
        heading: L.idxHomeworkHeading,
        lead: L.idxHomeworkLead,
        crumbLabel: L.navHomework,
        rel: "homework/index.html",
        note: t(L.idxPracticeNote, { href: p(GRADER_PUBLIC) }),
        items: sheets.map((h) => ({
          href: `session-${pad(h.n)}.html`,
          label: h.title,
          sub: t(L.idxSessionN, { n: h.n }),
        })),
      },
      lang
    ),
    "utf8"
  );

  /* 8. slides index. The decks themselves are shared from site/slides/, so the
        Vietnamese tree gets its own index page that points back up at them. -- */
  // The English index is written INTO site/slides/, beside the decks, so it
  // links to them as siblings. The Vietnamese index sits in site/vi/slides/ and
  // has to climb to the single shared copy.
  const deckHref = (file) => (lang === "en" ? file : `${p("slides")}/${file}`);
  const deckList = SESSIONS.map((s) => ({
    href: deckHref(`buoi-${pad(s.n)}.html`),
    label: t(L.idxDeckLabel, { n: s.n, topic: topicOf(s, lang) }),
    sub: t(L.idxSessionN, { n: s.n }),
  }));
  deckList.push(
    {
      href: deckHref("ins2053-bai-giang.html"),
      label: L.idxCourseWide,
      sub: L.idxAllSessions,
    },
    {
      href: deckHref("ins2053-overview.html"),
      label: L.idxOverviewDeck,
      sub: L.idxOrientation,
    }
  );
  await mkdir(path.join(TREE, "slides"), { recursive: true });
  await writeFile(
    path.join(TREE, "slides", "index.html"),
    listPage(
      {
        title: L.idxSlidesHeading,
        heading: L.idxSlidesHeading,
        lead: L.idxSlidesLead,
        crumbLabel: L.idxSlidesHeading,
        rel: "slides/index.html",
        // The decks are deliberately English, so the Vietnamese index has to say
        // so — a student who finds no notice assumes the translation is broken.
        // The English tree needs no such explanation, and adding one there would
        // mean a content change in a tree this work must not touch.
        note: lang === "vi" ? L.idxSlidesNote : undefined,
        items: deckList,
      },
      lang
    ),
    "utf8"
  );

  return {
    lang,
    dirLabel: lang === "en" ? "site/" : `site/${LANGS[lang].dir}`,
    chapters: chapters.length,
    translated,
    sheets: sheets.length,
    hubs: SESSIONS.length,
    decks: deckList.length,
  };
}

build().catch((err) => fail("build threw", err));

