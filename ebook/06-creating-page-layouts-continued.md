# 🟦 SESSION 6
# **Creating Page Layouts (Continued) — Multi-Page Sites and Navigation**

You now have a beautifully laid-out home page. But a real website has many pages, and visitors need to move between them. Today you will build the complete Student Club Website: Home, About Us, Events, Gallery, and Contact. You will learn how to create a navigation menu that highlights the current page, how to reuse one CSS file across all pages, and how relative links connect everything together. By the end of this session your Student Club Website will be a fully functional multi-page site.

---

# 📌 SESSION INFORMATION

```
📅 Duration:     3 periods (150 minutes) — Theory ~60 min, Practice ~90 min
📚 Reference:    MDN "Creating hyperlinks"; MDN "Document and website structure"
                 Course slides (Week 6)
🎯 Objectives:   1. Build a multi-page website with consistent layout
                 2. Create a nav menu using <ul>/<li>/<a> with current-page highlighting
                 3. Use relative links to navigate between pages in the same folder
                 4. Share one CSS stylesheet across all pages
                 5. Create individual page content (About, Events, Gallery, Contact)
                 6. Style new components: event cards, gallery grid, contact form, tables
📖 Prepare:      1. Complete Session 5 (a working two-column layout on index.html)
                 2. Have css/style.css with all styles from Sessions 4-5
                 3. Have your images/ folder ready for gallery photos
🖼 Diagrams:     canvases/buoi-06.canvas.tsx — MultiPageNav, LinkTargets, ActiveClassWalk
🔗 Outcomes:     CLO1 (master basic web design and build skills)
                 CLO4 (design and build a web application)
```

---

# 🎯 LEARNING OBJECTIVES

By the end of this session you will be able to:

- Explain why all pages should share the same header, navigation, sidebar, and footer
- Build a navigation menu using `<ul>`, `<li>`, and `<a>` elements
- Highlight the current page in the navigation using an `active` class
- Write correct **relative links** between pages in the same site
- Create new pages by copying the page skeleton and changing only the main content
- Style specialised components: event cards, photo galleries, data tables, and contact forms
- Maintain one shared CSS file that styles the entire website

---

# 📖 THEORY

## 1. Multi-Page Website Architecture

> 🖼 **Diagram:** `canvases/buoi-06.canvas.tsx` → `MultiPageNav` — slide `s06-architecture` ("Multi-Page Architecture")

### 1.1 Definition

A **multi-page website** consists of multiple HTML files that link to each other. Each file is a separate page, but they all share the same visual structure: header, navigation, sidebar, and footer stay the same — only the `<main>` content changes.

```
index.html     →  Home page content
about.html     →  About Us content
events.html    →  Events listing
gallery.html   →  Photo gallery
contact.html   →  Contact form + info
css/style.css  →  ONE stylesheet for ALL pages
images/        →  Shared image folder
```

### 🎒 Real-life Example

Think of a printed brochure. Every page has the same header logo, footer with contact info, and colour scheme. Only the body text differs per page. Your website works the same way: the "template" stays constant; only `<main>` changes.

### 1.2 Why Consistency Matters

- **User experience:** Visitors know where the navigation is on every page. They do not have to relearn the layout.
- **Branding:** Consistent colours, fonts, and structure reinforce identity.
- **Maintainability:** Change the navigation in one pattern and apply it everywhere.
- **Trust:** Inconsistent pages look unprofessional and may confuse users into thinking they left your site.

### 1.3 The Copy-and-Modify Workflow

Since we are building with plain HTML (no server-side includes or frameworks), the workflow is:

1. Build `index.html` completely (header, nav, main, aside, footer).
2. **Save As** → `about.html`.
3. Change the `<title>` tag.
4. Move the `class="active"` to the About link in the nav.
5. Replace everything inside `<main>` with About page content.
6. Repeat for each page.

> ⚠️ When you copy a page, verify that the header, nav, aside, and footer are **identical**. Even a missing closing tag can break the layout.

### ⚠️ Important Notes

- Every page must link to the **same** CSS file: `<link rel="stylesheet" href="css/style.css">`.
- Keep your folder structure flat (all HTML files in the root) for simple relative links.
- Name files with lowercase letters and hyphens: `about.html`, `event-calendar.html`. Avoid spaces and special characters.

### 🧪 Try It Yourself — Sketch Before You Code

**Task (5 min):** Decide the page set and the folder layout on paper first.

1. Write down the pages your club site needs. Four is plenty: Home, About, Events, Contact.
2. For each, write one sentence: *what can a visitor do here that they cannot do elsewhere?*
3. Draw the folder tree you will create:
   ```
   club-website/
   ├── index.html          ← Home lives in the root
   ├── css/style.css
   ├── img/
   └── pages/
       ├── about.html
       ├── events.html
       └── contact.html
   ```
4. Create the empty files now, each with the HTML5 boilerplate and nothing else.

**Expected result:** Four files that all open in a browser and show a title, plus a written purpose for each. No styling yet.

<details>
<summary>Why the one-sentence purpose matters</summary>

If two pages have the same purpose, they should be one page. That is how sites end up with an "About" and an "About Us" that say the same thing.

The other reason to write it down: the sentence becomes the page's `<h1>` and its `<meta name="description">`. You are not doing paperwork — you are drafting content.

Note that `index.html` stays in the root. Web servers look for it automatically when someone visits the folder, so `example.com/` finds it with no file name in the URL. The other pages can sit in `pages/` because they are always reached by an explicit link.

</details>


---

## 2. Relative Links Between Pages

> 🖼 **Diagram:** `canvases/buoi-06.canvas.tsx` → `LinkTargets` — slide `s06-relative-links` ("Relative Links")

### 2.1 Definition

A **relative link** points to a file based on its position relative to the current file. This is different from an **absolute link** (full URL starting with `http://`).

### 2.2 How Relative Links Work

When all your HTML files are in the **same folder**:

```html
<!-- From index.html, link to about.html -->
<a href="about.html">About Us</a>

<!-- From about.html, link back to index.html -->
<a href="index.html">Home</a>
```

Just use the filename. No path prefix needed.

When linking to files in **subfolders**:

```html
<!-- Link to a CSS file in the css/ subfolder -->
<link rel="stylesheet" href="css/style.css">

<!-- Link to an image in the images/ subfolder -->
<img src="images/team-photo.jpg" alt="Team Photo">

<!-- Link to a PDF in the documents/ subfolder -->
<a href="documents/constitution.pdf">Club Constitution</a>
```

When linking to files in **parent folders** (rare in our project):

```html
<!-- Go up one folder level -->
<a href="../index.html">Back to Home</a>
```

### 🔍 Comparison Table

| Link Type | Syntax | Example | Use For |
|-----------|--------|---------|---------|
| Same folder | `filename.html` | `about.html` | Pages at the same level |
| Subfolder | `folder/filename` | `css/style.css` | CSS, images, documents |
| Parent folder | `../filename` | `../index.html` | Going up a level |
| Absolute URL | `https://...` | `https://example.com` | External websites |

### ⚠️ Important Notes

- **Never use absolute file paths** like `C:\Users\N4G\site\about.html`. These only work on YOUR computer.
- Always use forward slashes (`/`) in URLs, even on Windows. Browsers handle the conversion.
- Test every link after creating new pages. Click through the entire navigation.
- The `href` value is case-sensitive on web servers (Linux). `About.html` and `about.html` are different files. Be consistent with lowercase.

---

## 3. Navigation Menu with Current Page Highlighting

> 🖼 **Diagram:** `canvases/buoi-06.canvas.tsx` → `ActiveClassWalk` — slide `s06-active-class` ("Active Navigation")

### 3.1 Building the Navigation Structure

The standard approach uses an unordered list inside `<nav>`:

```html
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="events.html">Events</a></li>
        <li><a href="gallery.html">Gallery</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

Why `<ul>` and `<li>`? Because navigation IS a list of links. Using semantic list markup helps screen readers announce "list of 5 items" so users know what to expect.

### 3.2 Highlighting the Current Page

On each page, add `class="active"` to the link for **that** page:

```html
<!-- On index.html -->
<li><a href="index.html" class="active">Home</a></li>
<li><a href="about.html">About Us</a></li>

<!-- On about.html -->
<li><a href="index.html">Home</a></li>
<li><a href="about.html" class="active">About Us</a></li>
```

CSS for the active state:

```css
nav ul li a.active {
    background-color: #1a5276;
    font-weight: bold;
    border-bottom: 3px solid #fff;
}
```

This gives the current page's link a darker background, bold text, and a white bottom border — clearly showing "you are here."

### 3.3 How It Works Step by Step

1. User opens `index.html` → sees "Home" highlighted.
2. User clicks "About Us" → browser loads `about.html`.
3. On `about.html`, the `class="active"` is on the About link → "About Us" is highlighted.
4. The rest of the page (header, sidebar, footer) looks identical. Only `<main>` content changed.

### ⚠️ Important Notes

- You must manually move the `active` class when creating each page. This is easy to forget!
- The `active` class is NOT related to the CSS pseudo-class `:active` (which fires during a mouse click). They are different concepts.
- Consider adding `aria-current="page"` alongside `class="active"` for better accessibility:
  ```html
  <a href="about.html" class="active" aria-current="page">About Us</a>
  ```

### 🧪 Try It Yourself — Mark the Current Page

**Task (7 min):** Make the nav tell the visitor where they are — for mouse, keyboard, and screen reader users alike.

1. Style the active state:
   ```css
   nav a.active {
       background: #1e40af;
       color: #fff;
       border-radius: 4px;
   }
   nav a:hover,
   nav a:focus { background: #3b82f6; color: #fff; }
   ```
2. On `index.html` only, add the class to the Home link:
   ```html
   <li><a href="index.html" class="active" aria-current="page">Home</a></li>
   ```
3. On `pages/about.html`, move both the class and `aria-current` to the About link.
4. Open each page, then press **Tab** repeatedly through the nav without touching the mouse.

**Expected result:** Exactly one item is highlighted per page, and the focus outline is clearly visible as you Tab. Both the highlight and the focus ring must be visible — they answer different questions.

<details>
<summary>Two mistakes and one addition</summary>

**Mistake 1:** copying the nav with `class="active"` already on Home, so every page highlights Home. The nav markup is shared; the `active` class is per page.

**Mistake 2:** styling `:hover` but not `:focus`. A keyboard user then has no idea which link is selected. Always style them together.

**The addition:** `aria-current="page"` conveys to a screen reader what the colour conveys visually. Without it, the highlight is decoration that assistive technology cannot see. You can even drop the class and style the attribute directly:

```css
nav a[aria-current="page"] { background: #1e40af; color: #fff; }
```

That way the visual state and the announced state can never disagree.

</details>


---

## 4. Reusing One CSS File Across All Pages

### 4.1 The Principle

Every HTML page links to the same `css/style.css`:

```html
<head>
    <link rel="stylesheet" href="css/style.css">
</head>
```

This means:
- Changes to `style.css` instantly affect **every** page.
- You never write duplicate CSS rules.
- Adding a new component style (like `.event-card`) makes it available on all pages.

### 4.2 Organising Your CSS

As your stylesheet grows, organise it with clear section comments:

```css
/* =============================================
   STUDENT CLUB WEBSITE — MAIN STYLESHEET
   ============================================= */

/* === RESET & BASE === */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Segoe UI", Arial, sans-serif; ... }

/* === LAYOUT === */
.wrapper { max-width: 1000px; margin: 0 auto; ... }
.page-body { display: flex; }

/* === HEADER === */
header { background-color: #1a5276; ... }

/* === NAVIGATION === */
nav { background-color: #2874a6; ... }
nav ul li a.active { ... }

/* === MAIN CONTENT === */
main { flex: 3; padding: 25px; }
main h2 { color: #1a5276; ... }

/* === SIDEBAR === */
aside { flex: 1; background-color: #f0f4f8; ... }

/* === FOOTER === */
footer { background-color: #1a5276; ... }

/* === COMPONENTS === */
.event-card { ... }
.gallery { ... }
.contact-form { ... }
table { ... }

/* === UTILITY CLASSES === */
.highlight { ... }
.center-text { ... }
.btn { ... }
```

### ✅ Best Practices

- Keep ONE stylesheet for small-to-medium sites. Multiple files add complexity.
- Add new component styles at the bottom, in the COMPONENTS section.
- Never write page-specific CSS unless absolutely necessary. If you do, comment which page it belongs to.
- When you add a new element type (event card, gallery item), style it once in the shared CSS.

### 🧪 Try It Yourself — One Stylesheet, Every Page

**Task (6 min):** Prove that a single edit reaches the whole site.

1. Confirm every page links the same file. From the root: `href="css/style.css"`. From `pages/`: `href="../css/style.css"`.
2. In `css/style.css`, add a rule you cannot miss:
   ```css
   header { border-bottom: 4px solid #2563eb; }
   ```
3. Open each page in turn — `index.html`, `pages/about.html`, `pages/contact.html`.
4. Change the colour to `#dc2626`, save, and reload all three again.

**Expected result:** Every page gains the blue bar, then the red bar, from one edit. Any page that does not change has a broken `<link>` path — check its Network tab.

<details>
<summary>The habit this replaces</summary>

The tempting alternative is a `<style>` block in each page's `<head>`. It works for one page and fails at three: a colour change becomes three edits, and after a week the pages have quietly drifted apart.

One external stylesheet also loads faster. The browser caches `style.css` after the first page, so the second and third pages need only their HTML.

If a rule should apply to one page only, do not start a second stylesheet. Add a class to that page's `<body>`, e.g. `<body class="home">`, and scope the rule: `.home .hero { ... }`.

</details>


---

## 5. Styling New Components

### 5.1 Event Cards

Event cards are self-contained blocks showing event details:

```css
.event-card {
    background-color: #f8f9fa;
    border-left: 4px solid #2874a6;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 4px;
}

.event-card h3 {
    color: #1a5276;
    margin-top: 0;
}

.event-date {
    color: #2874a6;
    font-weight: bold;
    font-size: 14px;
}

.event-location {
    color: #666;
    font-style: italic;
    font-size: 14px;
    margin-bottom: 10px;
}
```

Usage:

```html
<div class="event-card">
    <h3>Web Design Workshop</h3>
    <p class="event-date">March 15, 2024 | 2:00 PM - 4:00 PM</p>
    <p class="event-location">Room 301, Building A</p>
    <p>Learn the basics of HTML and CSS.</p>
    <a href="contact.html" class="btn">Register Now</a>
</div>
```

### 5.2 Buttons

Reusable button style for action links:

```css
.btn {
    display: inline-block;
    background-color: #2874a6;
    color: white;
    padding: 8px 20px;
    text-decoration: none;
    border-radius: 4px;
    margin-top: 10px;
    font-size: 14px;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #1a5276;
}
```

Note: `display: inline-block` allows padding and width on an `<a>` element while keeping it inline with surrounding text.

### 5.3 Gallery Grid

Use Flexbox with wrapping to create a responsive photo grid:

```css
.gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.gallery-item {
    flex: 1 1 200px;       /* grow, shrink, minimum 200px */
    text-align: center;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    background-color: #fafafa;
}

.gallery-item img {
    max-width: 100%;
    height: auto;
    border-radius: 3px;
}

.gallery-item p {
    margin-top: 8px;
    font-size: 13px;
    color: #555;
}
```

How `flex: 1 1 200px` works:
- `flex-grow: 1` — items grow to fill extra space
- `flex-shrink: 1` — items shrink if space is tight
- `flex-basis: 200px` — start at 200px wide

Items automatically wrap to new rows and adjust their width. No media queries needed for basic responsiveness.

### 5.4 Data Tables

For structured data like member lists:

```css
table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
}

table th, table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

table th {
    background-color: #1a5276;
    color: white;
}

table tr:nth-child(even) {
    background-color: #f2f2f2;
}
```

Key properties:
- `border-collapse: collapse` — merges adjacent borders into single lines instead of double borders.
- `tr:nth-child(even)` — targets every other row for zebra striping.

### 5.5 Contact Forms

```css
.contact-form {
    background-color: #f8f9fa;
    padding: 25px;
    border-radius: 8px;
    margin-top: 15px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #1a5276;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
    border-color: #2874a6;
    outline: none;
    box-shadow: 0 0 5px rgba(40, 116, 166, 0.3);
}
```

Key techniques:
- `display: block` on labels puts them above the input field.
- `width: 100%` on inputs fills the container.
- `:focus` pseudo-class styles the input when clicked/tabbed into.
- `font-family: inherit` ensures form fields use the same font as the rest of the page.

### ⚠️ Important Notes

- Form `<label>` elements should always have a `for` attribute matching the input's `id`. This connects them for accessibility.
- The `required` attribute on inputs enables browser-native validation.
- Forms need a server-side script to actually send data. Our form uses `action="#"` as a placeholder.

---

## ✅ Best Practices

1. **Build one perfect page first**, then copy it for other pages.
2. **Always update the `active` class** in the navigation when creating a new page.
3. **Always update the `<title>` tag** — format: "Student Club - Page Name".
4. **Test every link** after creating a new page. Click through the entire navigation cycle.
5. **Keep sidebar content relevant** but mostly consistent across pages.
6. **Add new component styles to the shared CSS file**, never inline.
7. **Use relative links only.** Never hardcode absolute file paths.
8. **Name files consistently:** lowercase, no spaces, `.html` extension.

---

## ❌ Common Mistakes

### Mistake 1: Forgetting to move the `active` class

```html
<!-- ❌ WRONG: Home is still active on the About page -->
<!-- On about.html -->
<li><a href="index.html" class="active">Home</a></li>
<li><a href="about.html">About Us</a></li>
```

```html
<!-- ✅ CORRECT: About Us is active on the About page -->
<!-- On about.html -->
<li><a href="index.html">Home</a></li>
<li><a href="about.html" class="active">About Us</a></li>
```

### Mistake 2: Broken relative links

```html
<!-- ❌ WRONG: absolute file path (only works on your computer) -->
<a href="C:\Users\N4G\site\about.html">About</a>

<!-- ❌ WRONG: wrong filename casing on Linux servers -->
<a href="About.html">About</a>  <!-- file is actually about.html -->
```

```html
<!-- ✅ CORRECT: relative link, lowercase -->
<a href="about.html">About</a>
```

### Mistake 3: Inconsistent page structure

```html
<!-- ❌ WRONG: missing sidebar on one page -->
<main>Content</main>
<!-- no <aside> → main stretches to full width, layout breaks -->
```

```html
<!-- ✅ CORRECT: same structure on every page -->
<div class="page-body">
    <main>Content</main>
    <aside>Sidebar</aside>
</div>
```

### Mistake 4: Different CSS file paths on different pages

```html
<!-- ❌ WRONG: if about.html is in the root, this path is wrong -->
<link rel="stylesheet" href="style.css">
<!-- Should be css/style.css if CSS is in the css/ subfolder -->
```

```html
<!-- ✅ CORRECT: consistent path on all pages -->
<link rel="stylesheet" href="css/style.css">
```

### Mistake 5: Missing `<title>` or duplicate titles

```html
<!-- ❌ WRONG: same title on every page -->
<title>Student Club</title>
```

```html
<!-- ✅ CORRECT: unique descriptive titles -->
<title>Student Club - Home</title>
<title>Student Club - About Us</title>
<title>Student Club - Events</title>
```

### 🧪 Try It Yourself — Build a Reusable Card Component

**Task (8 min):** Write one class and use it three times on two pages.

1. In `css/style.css`:
   ```css
   .card {
       background: #fff;
       border: 1px solid #e2e8f0;
       border-radius: 8px;
       padding: 16px;
       box-shadow: 0 1px 3px rgba(0,0,0,0.08);
   }
   .card h3 { margin-top: 0; }
   ```
2. Use it three times on `index.html`:
   ```html
   <div class="card">
       <h3>Weekly Workshop</h3>
       <p>Fridays, 5pm, Room B203.</p>
   </div>
   ```
3. Now use the same class once on `pages/about.html` — writing no new CSS at all.
4. Change `border-radius` to `16px` in the stylesheet and reload both pages.

**Expected result:** All four cards change together from one edit. That is the whole point of a component class.

<details>
<summary>How to name classes so this keeps working</summary>

Name for **what the thing is**, not what it looks like:

- Good: `.card`, `.nav-link`, `.event-list`, `.btn-primary`
- Bad: `.blue-box`, `.big-text`, `.left-column`

`.blue-box` becomes a lie the moment the design changes to green, and you either live with the wrong name or rename it in every file. `.card` stays true regardless of colour.

Then use a nested selector such as `.card h3` for parts inside the component. That keeps the component's styling self-contained instead of leaking into every `<h3>` on the site.

</details>


---

# 📋 THEORY SUMMARY

| Concept | Definition | Example |
|---------|-----------|---------|
| Multi-page site | Multiple HTML files linked together | index.html, about.html, events.html |
| Relative link | Path relative to current file location | `about.html`, `css/style.css` |
| Active navigation | Visual indicator of current page | `class="active"` on current link |
| Shared stylesheet | One CSS file linked by all pages | `<link rel="stylesheet" href="css/style.css">` |
| Event card | Styled block displaying event details | `.event-card { border-left: 4px solid ... }` |
| Gallery grid | Flex-wrap layout for photo thumbnails | `.gallery { display: flex; flex-wrap: wrap; }` |
| Zebra striping | Alternating row colours in tables | `tr:nth-child(even) { background: #f2f2f2; }` |
| Form styling | Labels above inputs, focus states | `.form-group label { display: block; }` |
| Button style | Inline-block link styled as button | `.btn { display: inline-block; ... }` |

---

# 💡 WORKED EXAMPLES

## Example 1: Creating the About Page from index.html

**Situation:** Your `index.html` is complete. You need to create `about.html` with the same layout but different content.

**Steps with code:**

Step 1 — Save As:

```
File → Save As → about.html (in the same folder as index.html)
```

Step 2 — Update the title:

```html
<!-- ❌ OLD (copied from index.html) -->
<title>Student Club - Home</title>

<!-- ✅ NEW -->
<title>Student Club - About Us</title>
```

Step 3 — Move the active class:

```html
<!-- ❌ OLD (Home was active) -->
<li><a href="index.html" class="active">Home</a></li>
<li><a href="about.html">About Us</a></li>

<!-- ✅ NEW (About Us is now active) -->
<li><a href="index.html">Home</a></li>
<li><a href="about.html" class="active">About Us</a></li>
```

Step 4 — Replace main content:

```html
<main>
    <h2>About Us</h2>

    <h3>Who We Are</h3>
    <p>The Student Club was founded in 2020 by a group of passionate
       students who wanted to create a space for learning, creativity,
       and friendship. Today, we have over 200 active members from
       all faculties.</p>

    <img src="images/team-photo.jpg" alt="Student Club Team Photo" width="500">
    <p class="caption">Our team at the 2023 annual orientation event.</p>

    <h3>Our Mission</h3>
    <p>To provide a supportive environment where students can learn
       new skills, share ideas, and grow together through technology
       and creativity.</p>

    <h3>Our Values</h3>
    <ul>
        <li><strong>Learning:</strong> We believe in continuous growth</li>
        <li><strong>Community:</strong> We support each other</li>
        <li><strong>Creativity:</strong> We encourage innovative thinking</li>
        <li><strong>Inclusion:</strong> Everyone is welcome</li>
    </ul>

    <h3>Our Leaders</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Faculty</th>
        </tr>
        <tr>
            <td>Nguyen Van A</td>
            <td>President</td>
            <td>Information Technology</td>
        </tr>
        <tr>
            <td>Tran Thi B</td>
            <td>Vice President</td>
            <td>Business Administration</td>
        </tr>
        <tr>
            <td>Le Van C</td>
            <td>Events Coordinator</td>
            <td>Communication and Media</td>
        </tr>
    </table>
</main>
```

**Line-by-line explanation:**

- The `<title>` appears in the browser tab. Unique titles help users distinguish tabs.
- Moving `class="active"` tells visitors which page they are on.
- The `<main>` content is completely replaced. Everything outside `<main>` stays identical.
- `<img>` uses a relative path to the `images/` subfolder.
- `<table>` uses the styles defined in the shared CSS — no new CSS needed.
- The `<aside>` sidebar content stays the same (or can be slightly adjusted).

**Result:** `about.html` opens with the same header, nav, sidebar, and footer as `index.html`. The navigation highlights "About Us." The main area shows club information and a leaders table.

---

## Example 2: Building the Events Page with Event Cards

**Situation:** Create an events listing page with styled event cards.

**Code (events.html — main content only):**

```html
<main>
    <h2>Events &amp; Activities</h2>

    <div class="event-card">
        <h3>Web Design Workshop</h3>
        <p class="event-date">March 15, 2024 | 2:00 PM - 4:00 PM</p>
        <p class="event-location">Room 301, Building A</p>
        <p>Learn the basics of HTML and CSS in this hands-on workshop.
           Bring your laptop! No prior experience needed.</p>
        <a href="contact.html" class="btn">Register Now</a>
    </div>

    <div class="event-card">
        <h3>Photography Contest</h3>
        <p class="event-date">March 22, 2024 | All Day</p>
        <p class="event-location">Online Submission</p>
        <p>Submit your best campus photos and win prizes.
           Theme: "Student Life." Deadline: March 20.</p>
        <a href="contact.html" class="btn">Submit Entry</a>
    </div>

    <div class="event-card">
        <h3>Music Night</h3>
        <p class="event-date">March 29, 2024 | 7:00 PM</p>
        <p class="event-location">University Auditorium</p>
        <p>An evening of music, food, and fun. Student bands
           will perform. Free entry for all members!</p>
        <a href="contact.html" class="btn">Get Tickets</a>
    </div>

    <div class="event-card">
        <h3>Hackathon 2024</h3>
        <p class="event-date">April 5-6, 2024 | 48 Hours</p>
        <p class="event-location">Computer Lab, Building B</p>
        <p>Build a web application in 48 hours. Teams of 3-5 members.
           Prizes for the top 3 teams!</p>
        <a href="contact.html" class="btn">Register Team</a>
    </div>
</main>
```

**Line-by-line explanation:**

- Each event is wrapped in `<div class="event-card">` — this applies the card styling (background, left border, padding).
- `<p class="event-date">` gets bold blue text via the `.event-date` CSS rule.
- `<p class="event-location">` gets grey italic text via `.event-location`.
- `<a href="contact.html" class="btn">` renders as a styled button linking to the registration/contact page.
- All four cards stack vertically because `.event-card` is a block-level div with `margin-bottom: 20px`.
- Remember to set `class="active"` on the Events nav link!

**Result:** Four event cards displayed as neat blocks with coloured left borders, dates, locations, descriptions, and action buttons.

---

## Example 3: Building the Gallery Page with Flexbox Grid

**Situation:** Display event photos in a responsive grid.

**Code (gallery.html — main content only):**

```html
<main>
    <h2>Photo Gallery</h2>
    <p>Photos from our events and activities.</p>

    <div class="gallery">
        <div class="gallery-item">
            <img src="images/event1.jpg" alt="Web Workshop 2024">
            <p>Web Workshop 2024</p>
        </div>
        <div class="gallery-item">
            <img src="images/event2.jpg" alt="Music Night 2023">
            <p>Music Night 2023</p>
        </div>
        <div class="gallery-item">
            <img src="images/event3.jpg" alt="Sports Day 2023">
            <p>Sports Day 2023</p>
        </div>
        <div class="gallery-item">
            <img src="images/event4.jpg" alt="Hackathon 2023">
            <p>Hackathon 2023</p>
        </div>
        <div class="gallery-item">
            <img src="images/event5.jpg" alt="Orientation 2023">
            <p>Orientation 2023</p>
        </div>
        <div class="gallery-item">
            <img src="images/event6.jpg" alt="Charity Run 2023">
            <p>Charity Run 2023</p>
        </div>
    </div>
</main>
```

**Line-by-line explanation:**

- `.gallery` is a flex container with `flex-wrap: wrap` — items flow into rows and wrap when space runs out.
- Each `.gallery-item` has `flex: 1 1 200px` — starts at 200px, grows to fill space, shrinks if needed.
- Images use relative paths to `images/` folder. Each has descriptive `alt` text for accessibility.
- Captions below each image use the `.gallery-item p` style (smaller, grey text).
- The `gap: 15px` on the container adds consistent spacing between items without extra margins.

**Result:** Photos display in a responsive grid that adjusts columns based on available width. On wide screens you might see 3–4 per row; on narrow screens, 1–2.

---

## Example 4: Building the Contact Page with a Form

**Situation:** Create a contact page with information and a message form.

**Code (contact.html — main content only):**

```html
<main>
    <h2>Contact Us</h2>

    <h3>Get in Touch</h3>
    <p>We would love to hear from you! Whether you want to join
       the club, ask a question, or suggest an event, feel free
       to reach out.</p>

    <div class="contact-info">
        <p><strong>Email:</strong>
           <a href="mailto:club@university.edu">club@university.edu</a></p>
        <p><strong>Phone:</strong> +84 123 456 789</p>
        <p><strong>Office:</strong> Room 101, Student Activity Center</p>
        <p><strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM</p>
    </div>

    <h3>Send Us a Message</h3>
    <form action="#" method="post" class="contact-form">
        <div class="form-group">
            <label for="name">Your Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="email">Your Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="subject">Subject:</label>
            <select id="subject" name="subject">
                <option value="membership">Membership Inquiry</option>
                <option value="events">Event Information</option>
                <option value="suggestion">Suggestion</option>
                <option value="other">Other</option>
            </select>
        </div>
        <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn">Send Message</button>
    </form>
</main>
```

**Line-by-line explanation:**

- `.contact-info` is a styled info box with light blue background (defined in CSS).
- `mailto:` in the email link opens the user's email client.
- `<form action="#" method="post">` — `action="#"` is a placeholder. In production, this would point to a server script. `method="post"` sends data securely (not in the URL).
- Each form field is wrapped in `<div class="form-group">` for consistent spacing.
- `<label for="name">` is connected to `<input id="name">` via the matching `for`/`id` values. Clicking the label focuses the input.
- `type="email"` enables built-in email validation in modern browsers.
- `required` prevents form submission if the field is empty.
- `<select>` creates a dropdown menu with predefined options.
- `<textarea rows="5">` creates a multi-line text input, 5 rows tall.
- The submit button uses the `.btn` class for consistent styling with other action buttons.

**Result:** A professional contact page with contact information in a highlighted box and a clean, accessible form below it.

---

## Example 5: Verifying Navigation Across All Pages

**Situation:** You have created all five pages. Verify that navigation works correctly.

**Checklist:**

1. Open `index.html` in the browser.
   - ✅ "Home" link is highlighted (has `class="active"`)
   - ✅ Title shows "Student Club - Home"

2. Click "About Us".
   - ✅ `about.html` loads
   - ✅ "About Us" link is highlighted
   - ✅ Header, sidebar, and footer look identical to home page
   - ✅ Main content shows About page content

3. Click "Events".
   - ✅ `events.html` loads
   - ✅ "Events" link is highlighted
   - ✅ Event cards display correctly

4. Click "Gallery".
   - ✅ `gallery.html` loads
   - ✅ "Gallery" link is highlighted
   - ✅ Photo grid displays correctly

5. Click "Contact".
   - ✅ `contact.html` loads
   - ✅ "Contact" link is highlighted
   - ✅ Form renders with proper styling

6. From Contact, click "Home".
   - ✅ Returns to `index.html` with "Home" highlighted

7. Check the browser console (F12 → Console).
   - ✅ No 404 errors for CSS or images

**If something is wrong:**
- Wrong page highlighted → forgot to move `class="active"`
- Styles missing → check `<link>` tag path matches `css/style.css`
- Broken link → check filename spelling and case
- Layout broken → check that `<aside>` is present inside `.page-body`

---

# 🛠️ HANDS-ON PRACTICE

## Setup

Make sure your project folder contains:

```
student-club/
├── index.html          ← completed in Session 5
├── css/
│   └── style.css       ← contains all styles from Sessions 4-5
└── images/
    └── (placeholder images for gallery)
```

Open your editor and your browser side by side. Preview after every save.

---

### TASK 1: Create the About Page

🎯 **Goal:** Build `about.html` with correct navigation highlighting and unique content.

📝 **Requirements:**
- Copy `index.html` → `about.html`
- Update title, active nav link, and main content
- Include a table of club leaders

**Steps:**

1. In your editor, open `index.html`.
2. File → Save As → `about.html` (same folder).
3. Change `<title>` to "Student Club - About Us".
4. Move `class="active"` from the Home link to the About Us link.
5. Replace everything inside `<main>` with the About content from Example 1 above.
6. Make sure `<aside>` sidebar is unchanged.
7. Save. Open in browser. Verify navigation highlighting.

✅ **Expected result:** About page displays with highlighted "About Us" nav link, club description, mission statement, values list, and leaders table. Layout matches index.html.

📁 **File to save:** `about.html`

---

### TASK 2: Create the Events Page

🎯 **Goal:** Build `events.html` with styled event cards.

📝 **Requirements:**
- Copy `index.html` → `events.html`
- Update title, active nav link, and main content
- Add at least 4 event cards
- Add event card CSS to the shared stylesheet

**Steps:**

1. Save `index.html` as `events.html`.
2. Update `<title>` to "Student Club - Events".
3. Move `class="active"` to the Events link.
4. Replace `<main>` content with the events from Example 2 above.
5. Add event card CSS to `css/style.css` (see Section 5.1 in Theory).
6. Save both files. Preview.

✅ **Expected result:** Events page shows four styled event cards with dates, locations, descriptions, and Register buttons. Nav highlights "Events."

📁 **Files to save:** `events.html`, `css/style.css`

---

### TASK 3: Create the Gallery Page

🎯 **Goal:** Build `gallery.html` with a responsive photo grid.

📝 **Requirements:**
- Copy `index.html` → `gallery.html`
- Update title, active nav link, and main content
- Add at least 6 gallery items
- Add gallery CSS to the shared stylesheet

**Steps:**

1. Save `index.html` as `gallery.html`.
2. Update `<title>` to "Student Club - Gallery".
3. Move `class="active"` to the Gallery link.
4. Replace `<main>` content with the gallery from Example 3 above.
5. Add gallery CSS to `css/style.css` (see Section 5.3 in Theory).
6. Place placeholder images in `images/` folder (or use coloured rectangles).
7. Save both files. Preview. Resize browser to test responsiveness.

✅ **Expected result:** Gallery displays photos in a responsive flex grid. Items wrap and resize when the window changes size. Nav highlights "Gallery."

📁 **Files to save:** `gallery.html`, `css/style.css`

---

### TASK 4: Create the Contact Page

🎯 **Goal:** Build `contact.html` with contact information and a styled form.

📝 **Requirements:**
- Copy `index.html` → `contact.html`
- Update title, active nav link, and main content
- Include contact info box and message form
- Add form CSS to the shared stylesheet

**Steps:**

1. Save `index.html` as `contact.html`.
2. Update `<title>` to "Student Club - Contact".
3. Move `class="active"` to the Contact link.
4. Replace `<main>` content with the contact page from Example 4 above.
5. Add contact form CSS to `css/style.css` (see Section 5.5 in Theory).
6. Save both files. Preview. Test form focus states by clicking each field.

✅ **Expected result:** Contact page shows info box and a clean form. Inputs highlight with blue border when focused. Submit button matches the `.btn` style. Nav highlights "Contact."

📁 **Files to save:** `contact.html`, `css/style.css`

---

### TASK 5: Full Site Navigation Test

🎯 **Goal:** Verify that every link works and every page looks consistent.

📝 **Requirements:**
- Click through every navigation link from every page
- Verify active highlighting is correct on each page
- Check for broken links, missing images, or layout issues
- Verify the browser console shows no errors

**Steps:**

1. Open `index.html` in the browser.
2. Click each nav link in order: Home → About → Events → Gallery → Contact → Home.
3. On each page, verify:
   - Correct nav link is highlighted
   - Title tab shows correct page name
   - Header, sidebar, and footer are identical
   - Main content is unique and properly styled
4. Click sidebar links and verify they navigate correctly.
5. Open browser DevTools (F12) → Console tab. Look for red error messages.
6. Fix any issues found.

✅ **Expected result:** All five pages load correctly. Navigation cycle works in any order. No broken links. No console errors. Consistent design across all pages.

📁 **Files to fix (if needed):** Any HTML or CSS file with issues

---

# 🐛 COMMON ERRORS — WHAT THE BROWSER SHOWS YOU

Navigation bugs are the ones students most often ship without noticing, because the page they are testing from happens to work.

| Symptom you see | Likely cause | How to confirm | Fix |
|---|---|---|---|
| Nav link 404s from one page but works from another | Path is relative to the wrong file | Compare the `href` on both pages | Add `../` per folder level, or use a consistent structure |
| Every nav item looks "current" | The `.active` class is on all of them, copied with the nav | Ctrl+U on each page | One `.active` per page, on that page's own link |
| No nav item looks current | `.active` was never added, or the CSS rule is missing | Inspect the link and check the Styles pane | Add the class per page and a `.active` rule |
| Hover style works with the mouse but not with Tab | Only `:hover` is styled, `:focus` is not | Press Tab through the nav and watch | Style `:hover, :focus` together and keep a visible outline |
| The nav bullets still show | `list-style: none` missing on the `<ul>` | Inspect the `<ul>` | `nav ul { list-style: none; padding: 0; margin: 0 }` |
| Horizontal nav wraps to two lines too early | Padding plus borders exceed the container width | Inspect the total item widths | Reduce padding, or let the nav wrap deliberately with `flex-wrap` |
| Clicking a nav item reloads the same page | `href="#"` left in from the template | Read the `href` | Point it at the real file name |
| Screen reader does not announce the navigation | `<nav>` not used, or several `<nav>` with no labels | Check the accessibility tree | Wrap in `<nav aria-label="Main">`; label each `<nav>` if there is more than one |
| Link colour looks unchanged after visiting | `:visited` not styled, or overridden later | DevTools → force the `:visited` state | Order the pseudo-classes link, visited, hover, focus, active |

**Test navigation the way a marker will:** open the deepest page in the site, then click every nav item in turn without touching the address bar. Any link that breaks is a path written from the wrong starting point.

---


# ✅ SELF-CHECK QUESTIONS

Answer these from memory first, then expand the answer to check yourself.

**Q1. You are on `about.html` in the project root and want to link to `index.html`. What is the correct `href`?**

<details>
<summary>Answer</summary>

`href="index.html"`. Both files sit in the same folder, so no path prefix is needed. Do not write `/index.html` (that means the server root, which breaks locally) and never write `../index.html` from the root.

</details>

---

**Q2. How do you mark the current page in a navigation bar, and why does it matter?**

<details>
<summary>Answer</summary>

Add `class="active"` and `aria-current="page"` to that page's link, then style `.active` differently — bold, underlined, or a different colour. It matters because users need to know where they are; `aria-current` conveys the same information to screen readers, which cannot see the visual styling.

</details>

---

**Q3. Why link one shared `style.css` from all five pages instead of giving each page its own stylesheet?**

<details>
<summary>Answer</summary>

One file means one place to change the header colour for the entire site. Five copies means five edits and inevitable drift where pages slowly stop matching. The browser also caches the shared file after the first page load, so every subsequent page renders faster.

</details>

---

**Q4. What must be identical across every page of a multi-page site, and what should differ?**

<details>
<summary>Answer</summary>

**Identical:** the `<head>` boilerplate, the stylesheet link, the entire `<header>`/`<nav>` block, and the `<footer>`.
**Different:** the `<title>`, the meta description, which nav link carries `.active`, and everything inside `<main>`.

</details>

---

**Q5. Your CSS works on `index.html` but not on `about.html`, and both use the same rules. What is the most likely cause?**

<details>
<summary>Answer</summary>

The `<link>` path is wrong on `about.html` — most commonly the stylesheet link was never copied, or the page lives in a subfolder and needs `../css/style.css`. Open DevTools → Network and look for a 404 on `style.css`. The second most likely cause is a class name typo in the HTML.

</details>

---

**Q6. Why build a card component with a reusable `.card` class instead of styling each card individually?**

<details>
<summary>Answer</summary>

One rule set styles every card on every page, so all cards stay visually consistent and a design change is a single edit. Adding a sixth card becomes `<article class="card">` with no new CSS. Per-card styling multiplies your CSS by the number of cards and guarantees they drift apart.

</details>

---

**Q7. What is the difference between `<section>` and `<div>`?**

<details>
<summary>Answer</summary>

`<section>` is a **semantic** grouping of related content that belongs in the document outline and should carry its own heading. `<div>` is a meaningless box used purely as a styling or layout hook. If the content has a heading and stands as a topic, use `<section>`; if you just need a wrapper for CSS, use `<div>`.

</details>

---

**Q8. What is the fastest way to verify that every link in a 5-page site works?**

<details>
<summary>Answer</summary>

Start on the home page and click every nav link on every page, checking the browser reaches the right file — a 5-page site has 25 link paths and takes about two minutes. Watch for `file:///C:/...` 404s from absolute paths, and confirm each page's `.active` class matches the page you are actually on.

</details>

---


# 📝 SELF-ASSESSMENT WORKSHEET

| # | I can... | Yes | No |
|---|----------|-----|----|
| 1 | Create a new page by copying the page skeleton and modifying content | ☐ | ☐ |
| 2 | Set the correct `class="active"` on each page's navigation | ☐ | ☐ |
| 3 | Write correct relative links between pages in the same folder | ☐ | ☐ |
| 4 | Link all pages to the same external CSS file | ☐ | ☐ |
| 5 | Style event cards with borders, dates, and action buttons | ☐ | ☐ |
| 6 | Create a responsive photo gallery using Flexbox wrap | ☐ | ☐ |
| 7 | Build an accessible contact form with labels and focus states | ☐ | ☐ |
| 8 | Test and debug navigation across a multi-page website | ☐ | ☐ |

> 💡 If you answered "No" to any item, revisit that section and redo the corresponding task. Pay close attention to the worked examples — follow them line by line.

---

# 🔗 FURTHER READING

- [Structuring a website — MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
- [Creating hyperlinks — MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)
- [HTML forms — MDN](https://developer.mozilla.org/en-US/docs/Learn/Forms)
- [Your first form — MDN](https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form)
- [Styling HTML tables — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Styling_tables)
- [Flexbox — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
- [A Complete Guide to Flexbox — CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

# ⏭️ NEXT SESSION

In the next session, you will enhance your Student Club Website with advanced CSS techniques including responsive design with media queries, CSS transitions and animations, and refined typography — making your site look polished on every device.
