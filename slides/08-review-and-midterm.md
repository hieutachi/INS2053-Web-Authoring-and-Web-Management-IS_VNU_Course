---
marp: true
theme: default
paginate: true
---

# Session 8: Review & Midterm Exam

**INS2053 — Web Authoring and Web Management**

*Consolidate what you know. Then prove it.*

Read: `ebook/08-review-and-midterm.md`  ·  Practise: `exercises/session-08/exercise.md`  ·  Diagrams: `canvases/buoi-08.canvas.tsx`

---

## Learning Objectives

- Recall and explain core concepts from Sessions 1-7
- Describe the midterm exam format, timing, and marking criteria
- Answer multiple-choice, short-answer, and coding questions under timed conditions
- Identify personal weak areas and create a targeted revision plan

---

## Session 1 Recap: Introduction to Dreamweaver

**Key skill:** Basic HTML5 document structure

- `<!DOCTYPE html>` must be line 1 of every HTML file
- Core elements: `<html>`, `<head>`, `<title>`, `<body>`
- Design / Code / Split views in Dreamweaver
- File naming: lowercase, no spaces, `.html` extension

```html
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>My Page</title></head>
<body><h1>Hello World</h1></body>
</html>
```

---

## Session 2 Recap: Creating a New Site

**Key skill:** Folder structure and relative paths

- Site definition with root folder, `images/`, `css/`, `js/` subfolders
- Relative links: `about.html` (same), `css/style.css` (sub), `../index.html` (parent)
- Semantic nav: `<nav>` > `<ul>` > `<li>` > `<a>`

| Path Type | Example | Use For |
|-----------|---------|---------|
| Same folder | `about.html` | Peer pages |
| Subfolder | `images/logo.png` | Assets |
| Parent | `../index.html` | Going up |

---

## Session 3 Recap: Working with Text & Images

**Key skill:** Semantic HTML for content

- Headings `<h1>`-`<h6>` in order (no skipping levels)
- Paragraphs `<p>`, emphasis `<strong>`, `<em>`
- Lists: `<ul>`, `<ol>`, `<li>`
- Images: `<img src="..." alt="..." width="..." height="...">`
- Always include `alt` on every `<img>` for accessibility

---

## Session 4 Recap: Applying CSS

**Key skill:** External CSS, selectors, box model

- Three ways: inline, internal (`<style>`), external (`<link>`) -- external is best
- Selectors: element `p`, class `.card`, ID `#header`
- Box model: Content --> Padding --> Border --> Margin

```css
/* External link in <head> */
<link rel="stylesheet" href="css/style.css">

.card { padding: 10px; border: 1px solid #ccc; margin: 20px; }
```

---

## Session 5 Recap: Creating Page Layouts

**Key skill:** Two-column layout with floats

- `<div>` containers for page regions: header, nav, main, aside, footer
- Float-based columns: `float: left; width: 70%;`
- Clear floats: `footer { clear: both; }`
- Centred wrapper: `max-width: 960px; margin: 0 auto;`

```
+----------------------------------+
|           HEADER                 |
+----------------------------------+
|  NAV                             |
+----------------+-----------------+
|   MAIN (70%)   |  SIDEBAR (30%)  |
+----------------+-----------------+
|           FOOTER                 |
+----------------------------------+
```

---

## Sessions 6-7 Recap: Multi-Page Sites & CSS3

**Session 6 -- Multi-page sites:** Copy template, change `<main>` only, move `class="active"`, share one CSS file across all pages.

**Session 7 -- CSS3 & Web Fonts:**
- Google Fonts via `<link>` + fallback font stacks
- `border-radius`, `box-shadow`, `text-shadow`
- `linear-gradient` / `radial-gradient` backgrounds
- `transition` on base selector + `:hover` with `transform`

```css
.card { transition: transform 0.3s ease; }
.card:hover { transform: translateY(-3px); }
```

---

## Midterm Exam Format

| Section | Type | Marks | Time Advice |
|---------|------|-------|-------------|
| A | Multiple Choice | ~20% | 1 min/question |
| B | Short Answer | ~30% | 3-5 min/question |
| C | Coding Exercises | ~50% | Remaining time |
| **Total** | | **100%** | **90 minutes** |

- Read ALL questions first, then answer easy ones first
- Answer every question -- partial credit for code
- Write legibly and indent code neatly
- Use comments: `<!-- header -->` and `/* nav styles */`

---

## Common Exam Mistakes to Avoid

- Forgetting `<!DOCTYPE html>` at the top
- Missing closing tags (`</div>`, `</ul>`, `</p>`)
- Confusing class (`.`) and ID (`#`) selectors
- Writing `text-color` instead of `color`
- Not clearing floats in layouts
- Using absolute paths (`C:\Users\...`) instead of relative
- Forgetting `alt` on `<img>` elements
- Putting `@import` after other CSS rules

---

## Revision Tips

- **Active recall:** Close notes, write what you remember, then check
- **Flashcards:** Tag names, properties, syntax -- review daily 10 min
- **Build from scratch:** Create a mini-page from memory without references
- **Practise coding by hand** -- exam requires handwritten code
- Focus on Sessions 4-5 (CSS + layouts) -- they carry the most weight

---

## Midterm Exam This Week

No homework this week -- focus on exam preparation.

- Re-read ebook chapters 1-7
- Complete practice questions in **exercises/session-08/exercise.md**
- Use self-assessment worksheet to find gaps
- Build one page from scratch as a timed drill

Good luck!

---

## Recap

- Sessions 1-3: HTML structure, site setup, text & images
- Sessions 4-5: CSS fundamentals, box model, float layouts
- Session 6: Multi-page sites, navigation, shared CSS
- Session 7: Google Fonts, CSS3 effects, transitions
- Exam: 90 min, MC + short answer + coding; read all questions first

---

## Next Session

Session 9: **Working with Tables** -- creating, structuring, merging cells, and styling HTML tables for displaying structured data.
