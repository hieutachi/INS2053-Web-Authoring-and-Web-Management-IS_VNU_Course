# Midterm Exam — Grading Rubric

## Problem 1: HTML Basics (2 points total)

Create `about.html` with proper structure and content.

| # | Criterion | Full Marks (0.25 each unless noted) | Partial Marks | Zero Marks |
|---|-----------|--------------------------------------|---------------|------------|
| 1 | DOCTYPE declaration | `<!DOCTYPE html>` is present at the top | Wrong or missing doctype (-0.25) | No doctype at all |
| 2 | HTML structure | `<html>`, `<head>`, `<body>` tags are properly nested and closed | Missing one tag or not properly nested (-0.1) | Major structural issues |
| 3 | Title tag | `<title>` contains "About — CodeBreakers Club" (or similar) | Title exists but text differs slightly (-0.1) | No `<title>` tag |
| 4 | H1 heading | `<h1>` contains "About CodeBreakers Club" | Heading exists but text differs (-0.1) | No `<h1>` |
| 5 | Paragraph 1 | At least 2 sentences about the club in a `<p>` tag | Only 1 sentence (-0.1) | No paragraph |
| 6 | Paragraph 2 | At least 2 sentences about club activities in a `<p>` tag | Only 1 sentence (-0.1) | No second paragraph |
| 7 | Unordered list | `<ul>` with exactly 3 `<li>` items | 3 items but wrong tags (-0.1); 2 items only (-0.15) | No list or 1 item |
| 8 | Image tag | `<img>` with `src="images/logo.png"` AND `alt` attribute with meaningful text | `src` correct but `alt` missing (-0.15); `alt` empty (-0.1) | No `<img>` tag |

**Point allocation:** 8 criteria x 0.25 points each = 2 points

### Common Mistakes

- Using `<br>` instead of `<p>` for paragraphs → lose paragraph points
- Forgetting `alt` attribute on image → -0.15
- Using absolute paths instead of relative → -0.1
- Missing closing tags → -0.1 per tag (max -0.25)

---

## Problem 2: CSS Styling (3 points total)

Create `css/style.css` with all required rules.

| # | Selector | Full Marks | Partial Marks | Zero Marks |
|---|----------|------------|---------------|------------|
| 1 | `body` — font-family | 0.15 | Partial property (-0.05) | Missing |
| 2 | `body` — margin + background-color | 0.1 | One property missing (-0.05) | Missing |
| 3 | `h1` — color `#003366` | 0.15 | Wrong color value (-0.1) | Missing |
| 4 | `h1` — text-align center | 0.1 | Wrong alignment (-0.05) | Missing |
| 5 | `p` — font-size 16px | 0.15 | Wrong value (-0.1) | Missing |
| 6 | `p` — line-height 1.5 | 0.15 | Wrong value (-0.1) | Missing |
| 7 | `p` — color #333 | 0.1 | Wrong color (-0.05) | Missing |
| 8 | `.container` — max-width 960px | 0.15 | Wrong value (-0.1) | Missing |
| 9 | `.container` — margin 20px auto | 0.15 | Wrong value (-0.1) | Missing |
| 10 | `.container` — padding 10px | 0.1 | Wrong value (-0.05) | Missing |
| 11 | `.container` — background-color #fff | 0.1 | Wrong color (-0.05) | Missing |
| 12 | `nav` — background-color #003366 | 0.15 | Wrong color (-0.1) | Missing |
| 13 | `nav` — padding 10px | 0.1 | Wrong value (-0.05) | Missing |
| 14 | `nav a` — color #fff | 0.15 | Wrong color (-0.1) | Missing |
| 15 | `nav a` — text-decoration none | 0.1 | Missing (-0.05) | Missing |
| 16 | `nav a` — margin-right 15px | 0.1 | Wrong value (-0.05) | Missing |
| 17 | CSS file location | 0.1 | File in wrong folder (-0.1) | No CSS file |
| 18 | CSS linked in HTML | 0.1 | Wrong `<link>` path (-0.1) | No link tag |
| 19-20 | Reserved for syntax/extra | 0.2 | — | — |

**Point allocation:** Items sum to 3 points

### Common Mistakes

- CSS file saved in root instead of `css/` folder → -0.1
- Using inline styles instead of external CSS → lose all CSS points
- Writing `font: Arial` instead of `font-family: Arial` → partial credit only
- Forgetting `<link>` in HTML `<head>` → -0.1

---

## Problem 3: Page Layout (3 points total)

Create `index.html` with semantic HTML5 structure.

| # | Criterion | Full Marks | Partial Marks | Zero Marks |
|---|-----------|------------|---------------|------------|
| 1 | HTML5 DOCTYPE + html/head/body | 0.25 | Missing DOCTYPE (-0.1); missing head/body (-0.1) | No structure |
| 2 | `<link>` to CSS in `<head>` | 0.25 | Wrong path (-0.15) | No link |
| 3 | `<header>` element with `<h1>` club name | 0.5 | No `<header>` tag but has h1 (-0.25); h1 missing (-0.25) | Neither |
| 4 | `<nav>` with 3 links (Home, About, Activities) | 0.5 | `<nav>` exists but fewer than 3 links (-0.25); links missing (-0.1 each) | No nav |
| 5 | `<main>` or `<div class="container">` with h2 + paragraph | 0.5 | Container exists but no h2 or paragraph (-0.25 each) | No container |
| 6 | Image inside main content area with alt | 0.25 | No alt text (-0.15) | No image |
| 7 | `<footer>` with copyright text | 0.25 | No `<footer>` tag but text present (-0.15) | No footer |
| 8 | Semantic elements used correctly (header, nav, main, footer) | 0.25 | Using divs instead of semantic tags (-0.1) | All divs |
| 9 | Valid HTML — tags properly closed and nested | 0.25 | 1-2 errors (-0.1); 3+ errors (-0.2) | Unclosed tags throughout |

**Point allocation:** Items sum to 3 points

### Common Mistakes

- Using `<div>` instead of `<header>`, `<nav>`, `<footer>` → -0.25
- Forgetting to link the CSS file → -0.25
- Links pointing to wrong files → -0.1 each
- No `<main>` or container div → -0.25

---

## Problem 4: Multi-page Navigation (2 points total)

Ensure consistent navigation across all 3 pages.

| # | Criterion | Full Marks | Partial Marks | Zero Marks |
|---|-----------|------------|---------------|------------|
| 1 | `about.html` has navigation | 0.25 | Nav exists but incomplete (-0.1) | No nav |
| 2 | `activities.html` created with proper structure | 0.5 | File exists but missing structure elements (-0.25 each) | File not created |
| 3 | `activities.html` has navigation | 0.25 | Nav incomplete (-0.1) | No nav |
| 4 | All nav links use correct relative paths | 0.25 | 1-2 wrong paths (-0.1); all wrong (-0.25) | No correct paths |
| 5 | Active page has visual indicator (`class="active"`) | 0.25 | Class added but no CSS rule (-0.1) | No indicator |
| 6 | CSS rule for `nav a.active` exists | 0.25 | Rule exists but wrong styling (-0.1) | No rule |
| 7 | All links work when clicked (instructor test) | 0.25 | 1 link broken (-0.1); 2+ links broken (-0.25) | All broken |
| 8 | Consistent footer across all pages | 0.25 | Footer inconsistent (-0.1) | No footer on some pages |

**Point allocation:** Items sum to 2 points

### Common Mistakes

- `activities.html` not created at all → -0.5
- Using absolute paths (e.g., `C:/exam-midterm/about.html`) → -0.25
- Navigation HTML differs between pages → -0.1
- Forgetting to add `class="active"` on current page → -0.25
- Links work from one page but not from another → -0.1

---

## Overall Grade Sheet

| Problem | Max Points | Student Score |
|---------|-----------|---------------|
| 1 — HTML Basics | 2.0 | _____ |
| 2 — CSS Styling | 3.0 | _____ |
| 3 — Page Layout | 3.0 | _____ |
| 4 — Multi-page Navigation | 2.0 | _____ |
| **Total** | **10.0** | _____ |

**Grade Scale:**
- 9.0–10.0: A
- 7.5–8.9: B
- 6.0–7.4: C
- 5.0–5.9: D
- Below 5.0: F
