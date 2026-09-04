# Midterm Exam — INS2053: Web Authoring and Web Management

## Week 8 | 90 minutes | No internet | Open file system only

---

### General Instructions

1. **No internet access.** You may use your notes, textbooks, and local files only.
2. Create all files inside the folder `exam-midterm/` on your desktop.
3. Follow the exact file names and folder structure shown below.
4. Your HTML must be valid and use proper indentation.
5. Your CSS must be in a separate file — no inline styles (unless specified).
6. Test that all links and image paths work before submitting.
7. Submit the entire `exam-midterm/` folder at the end of the exam.
8. **Note:** This exam uses simplified page names. Your capstone project uses the names from the project specification.

### Starter Folder Structure

```
exam-midterm/
├── index.html          (you create this)
├── about.html          (you create this)
├── activities.html     (you create this)
├── css/
│   └── style.css       (you create this)
└── images/
    └── logo.png        (provided — a simple club logo)
```

> **Note:** The `images/logo.png` file is pre-placed in your exam folder. If it is missing, use `images/logo.png` as the `src` value anyway — the path is what matters.

---

## Problem 1 — HTML Basics (2 points)

**Create the file `about.html`**

This page introduces a student club called **"CodeBreakers Club"**. Build the page with the following elements:

### Requirements

| # | Element | Details |
|---|---------|---------|
| 1 | DOCTYPE | Use the correct HTML5 doctype: `<!DOCTYPE html>` |
| 2 | `<html>`, `<head>`, `<body>` | Proper structure with `<title>` set to "About — CodeBreakers Club" |
| 3 | `<h1>` | The heading: "About CodeBreakers Club" |
| 4 | Paragraph 1 | At least 2 sentences describing the club (e.g., "CodeBreakers Club was founded in 2020. We welcome all students who love coding and problem-solving.") |
| 5 | Paragraph 2 | At least 2 sentences about what the club does (e.g., "Every week we hold coding workshops and hackathon practice sessions. Our members compete in national and international programming contests.") |
| 6 | Unordered list | A `<ul>` with exactly 3 `<li>` items listing club benefits. Example: "Weekly coding workshops", "Hackathon training", "Networking with industry professionals" |
| 7 | Image | An `<img>` tag with `src="images/logo.png"` and a descriptive `alt` attribute |

### Example (for guidance — your content must be your own)

```html
<h1>About CodeBreakers Club</h1>
<p>CodeBreakers Club was founded in 2020...</p>
<p>Every week we hold...</p>
<ul>
  <li>Weekly coding workshops</li>
  <li>Hackathon training</li>
  <li>Networking events</li>
</ul>
<img src="images/logo.png" alt="CodeBreakers Club logo">
```

---

## Problem 2 — CSS Styling (3 points)

**Create the file `css/style.css`**

Write a stylesheet that styles all pages in the site. Apply the following rules:

### Requirements

| # | Selector | Rule | Points |
|---|----------|------|--------|
| 1 | `body` | Set `font-family` to `Arial, sans-serif`. Set `margin` to `0`. Set `background-color` to `#f5f5f5`. | 0.5 |
| 2 | `h1` | Set `color` to `#003366`. Set `text-align` to `center`. | 0.5 |
| 3 | `p` | Set `font-size` to `16px`. Set `line-height` to `1.5`. Set `color` to `#333`. | 0.5 |
| 4 | `.container` | Set `max-width` to `960px`. Set `margin` to `20px auto`. Set `padding` to `10px`. Set `background-color` to `#fff`. | 0.5 |
| 5 | `nav` | Set `background-color` to `#003366`. Set `padding` to `10px`. | 0.5 |
| 6 | `nav a` | Set `color` to `#fff`. Set `text-decoration` to `none`. Set `margin-right` to `15px`. | 0.5 |

### Checklist

- All 6 selectors must be present.
- Values must match exactly (colors, sizes, etc.).
- The `.container` class must exist even if you have not used it in HTML yet — it will be tested in Problem 3.

---

## Problem 3 — Page Layout with Semantic HTML (3 points)

**Create the file `index.html`**

Build the home page of the CodeBreakers Club website using **semantic HTML5 elements**. The page must link to the external stylesheet.

### Required Structure

```
+----------------------------------------------------+
|  HEADER: Club name "CodeBreakers Club" in an h1    |
+----------------------------------------------------+
|  NAV: 3 links — Home | About | Activities          |
+----------------------------------------------------+
|  MAIN (inside div.container):                      |
|    - h2: "Welcome to CodeBreakers Club"            |
|    - p: A welcome paragraph (2+ sentences)         |
|    - img: logo image with alt text                 |
+----------------------------------------------------+
|  FOOTER: "Copyright 2025 CodeBreakers Club"        |
+----------------------------------------------------+
```

### Requirements

| # | Element | Details |
|---|---------|---------|
| 1 | DOCTYPE + structure | Proper HTML5 document with `<head>` linking to `css/style.css` |
| 2 | `<header>` | Contains `<h1>` with the club name |
| 3 | `<nav>` | Contains 3 `<a>` links: "Home" → `index.html`, "About" → `about.html`, "Activities" → `activities.html` |
| 4 | `<main>` or `<div class="container">` | Contains an `<h2>` welcome heading and a welcome paragraph |
| 5 | Image | The club logo inside the main content area |
| 6 | `<footer>` | Contains copyright text |

> **Tip:** Wrap your main content in `<div class="container">` so the CSS from Problem 2 applies.

---

## Problem 4 — Multi-page Navigation (2 points)

**Update all 3 pages** (`index.html`, `about.html`, `activities.html`)

Every page must have the **same navigation bar** so users can move between pages.

### Requirements

| # | Requirement | Details |
|---|-------------|---------|
| 1 | Consistent nav | All 3 pages have a `<nav>` element with the same 3 links |
| 2 | Correct paths | Use **relative paths**: `index.html`, `about.html`, `activities.html` |
| 3 | Active page indicator | The link for the current page should have a different style (e.g., add `class="active"` and define it in CSS with `font-weight: bold` or a different color) |
| 4 | Working links | Clicking every link must navigate to the correct page (the instructor will test this) |

### What to create for `activities.html`

You have not built this page yet. Create it now with:

- Same HTML5 structure as `index.html`
- Same navigation bar
- An `<h1>` heading: "Club Activities"
- A brief paragraph describing club activities (2+ sentences)
- Same footer

### CSS addition

Add a rule for `nav a.active` in `css/style.css` to visually highlight the current page (e.g., `font-weight: bold; color: #ffcc00;`).

---

## Grading Summary

| Problem | Topic | Points |
|---------|-------|--------|
| 1 | HTML Basics | 2 |
| 2 | CSS Styling | 3 |
| 3 | Page Layout | 3 |
| 4 | Multi-page Navigation | 2 |
| **Total** | | **10** |

### Suggested time budget (90 minutes)

| Problem | Suggested time |
|---|---|
| 1 — HTML Basics | 15 min |
| 2 — CSS Styling | 25 min |
| 3 — Page Layout | 25 min |
| 4 — Multi-page Navigation | 20 min |
| Check and save | 5 min |

Marking is per criterion with partial credit, so **never leave a problem blank** — type the
boilerplate in every file first, then fill in. Those lines alone carry marks in three of the
four problems.

---

## Reminders

- **No internet.** Close all browsers except the one previewing your own files.
- **Allowed:** your own notes, the `ebook/` chapters offline, and your project files.
- Save frequently.
- Use VS Code or your preferred local editor.
- File names are **case-sensitive** on some systems — use lowercase.
- When time is called, submit your `exam-midterm/` folder to the instructor.

**Good luck!**
