---
marp: true
theme: default
paginate: true
---

# Session 6: Creating Page Regions / Layouts (continued) -- Multi-Page Site & Navigation

**INS2053 — Web Authoring and Web Management**

*One stylesheet, five pages, one consistent site.*

Read: `ebook/06-creating-page-layouts-continued.md`  ·  Practise: `exercises/session-06/exercise.md`  ·  Diagrams: `canvases/buoi-06.canvas.tsx`

---

## Learning Objectives

- Build a multi-page website with consistent layout across all pages
- Create a navigation menu using `<ul>`, `<li>`, `<a>` with current-page highlighting
- Use relative links to navigate between pages in the same folder
- Share one CSS stylesheet across all pages
- Style new components: event cards, gallery grid, contact form

---

## Multi-Page Website Architecture

A **multi-page website** = multiple HTML files linked together. Every page shares the same header, nav, sidebar, footer -- only `<main>` changes.

```
index.html     -->  Home content
about.html     -->  About Us content
events.html    -->  Events listing
gallery.html   -->  Photo gallery
contact.html   -->  Contact form
css/style.css  -->  ONE stylesheet for ALL pages
```

---

## Real-Life Analogy

Think of a printed brochure: every page has the same header logo, footer, and colour scheme. Only the body text differs per page.

Your website works the same way: the "template" stays constant; only `<main>` changes.

**Copy-and-Modify Workflow:**
1. Build `index.html` completely
2. Save As --> `about.html`
3. Change `<title>`, move `class="active"`, replace `<main>` content
4. Repeat for each page

---

## Relative Links Between Pages

| Link Type | Syntax | Example |
|-----------|--------|---------|
| Same folder | `filename.html` | `about.html` |
| Subfolder | `folder/filename` | `css/style.css` |
| Parent folder | `../filename` | `../index.html` |
| Absolute URL | `https://...` | External sites only |

- Never use `C:\Users\...` absolute paths
- Always use forward slashes `/`
- Keep filenames lowercase: `about.html`, not `About.html`

---

## Navigation Menu with Active Highlighting

```html
<nav>
  <ul>
    <li><a href="index.html" class="active">Home</a></li>
    <li><a href="about.html">About Us</a></li>
    <li><a href="events.html">Events</a></li>
    <li><a href="gallery.html">Gallery</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
```

On each page, move `class="active"` to that page's link.

```css
nav ul li a.active {
  background-color: #1a5276;
  font-weight: bold;
}
```

---

## Styling New Components

**Event Cards:** `.event-card { border-left: 4px solid #2874a6; padding: 20px; }`

**Gallery Grid:** `.gallery { display: flex; flex-wrap: wrap; gap: 15px; }`
- Items use `flex: 1 1 200px` to auto-wrap responsively

**Buttons:** `.btn { display: inline-block; padding: 8px 20px; border-radius: 4px; }`

**Tables:** `border-collapse: collapse;` + `tr:nth-child(even)` for zebra stripes

**Forms:** Labels above inputs (`display: block`), `:focus` highlight on inputs

---

## Live Code Example

```html
<!-- On about.html: About link is active -->
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html" class="active">About Us</a></li>
    <li><a href="events.html">Events</a></li>
  </ul>
</nav>

<main>
  <h2>About Us</h2>
  <p>The Student Club was founded in 2020...</p>
  <img src="images/team-photo.jpg" alt="Team Photo">
</main>
```

All pages link to the same CSS: `<link rel="stylesheet" href="css/style.css">`

---

## Common Mistakes

- Forgetting to move `class="active"` when copying a page
- Using absolute file paths like `C:\Users\N4G\site\about.html`
- Inconsistent page structure (missing `<aside>` on one page breaks layout)
- Wrong CSS path: `style.css` instead of `css/style.css`
- Duplicate or missing `<title>` tags across pages

---

## In-Class Practice

Complete the hands-on tasks in **exercises/session-06/exercise.md**:

1. Create `about.html` from `index.html` template
2. Create `events.html` with styled event cards
3. Create `gallery.html` with responsive photo grid
4. Create `contact.html` with styled form
5. Full site navigation test across all five pages

---

## Homework

See **homework/session-06/homework.md**

Build out your complete 5-page Student Club Website with working navigation, shared CSS, and all component styles.

**Due Sunday 23:59**

---

## Recap

- Multi-page sites share header, nav, sidebar, footer -- only `<main>` changes
- Use relative links (`about.html`, `css/style.css`) -- never absolute paths
- Move `class="active"` on each page to highlight the current nav link
- One shared CSS file styles the entire site
- New components (event cards, gallery, forms) are styled once in shared CSS

---

## Next Session

Session 7: **CSS3 and Web Fonts** -- Google Fonts, gradients, shadows, transitions, and hover effects to make your site look modern and polished.
