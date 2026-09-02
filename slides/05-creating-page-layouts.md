---
marp: true
theme: default
paginate: true
---

# Session 5: Creating Page Regions / Layouts

**INS2053 — Web Authoring and Web Management**

*Give the page a skeleton before you decorate it.*

Read: `ebook/05-creating-page-layouts.md`  ·  Practise: `exercises/session-05/exercise.md`  ·  Diagrams: `canvases/buoi-05.canvas.tsx`

---

## Learning Objectives

- Use semantic HTML5 elements (`header`, `nav`, `main`, `aside`, `footer`)
- Explain the difference between block and inline display
- Create layouts using Flexbox (`display: flex`)
- Control alignment with `justify-content` and `align-items`
- Build a complete two-column page layout (main + sidebar)

---

## Semantic HTML5 Elements

| Element | Meaning | Use For |
|---------|---------|---------|
| `<header>` | Introductory content | Site title, logo |
| `<nav>` | Navigation links | Menu bar |
| `<main>` | Primary page content | Articles, text |
| `<section>` | Thematic grouping | News section |
| `<article>` | Self-contained content | Blog post |
| `<aside>` | Tangential content | Sidebar |
| `<footer>` | Footer information | Copyright, contacts |

🎒 Semantic vs div soup: `<header>` tells screen readers "this is the header." `<div class="top">` does not.

---

## Block vs Inline Display

```
BLOCK                         INLINE
┌─────────────────────┐       Hello [world] how are [you]?
│ Full width          │       ↑ flows within text
│ Starts on new line  │
│ Accepts width/height│       INLINE-BLOCK
└─────────────────────┘       ┌────────┐ ┌────────┐
                              │ Flows  │ │ But W/H│
div, p, h1, header, main      │ inline │ │ works! │
span, a, strong, em           └────────┘ └────────┘
```

- `display: none` removes element entirely from the page
- Changing `display` does NOT change semantic meaning

---

## Flexbox Basics

Flexbox arranges items in **one dimension** (row or column).

```
FLEX CONTAINER (display: flex)
┌──────────────────────────────────────┐
│  ┌────────┐ ┌────────┐ ┌────────┐   │
│  │ Item 1 │ │ Item 2 │ │ Item 3 │   │ ← flex items
│  └────────┘ └────────┘ └────────┘   │
└──────────────────────────────────────┘
        ← main axis (horizontal) →
                 ↕ cross axis
```

- Apply `display: flex` to the **parent container**
- Only **direct children** become flex items

---

## Key Flex Properties

**Container properties:**
- `flex-direction`: `row` (default) | `column`
- `justify-content`: main axis alignment
- `align-items`: cross axis alignment
- `gap`: space between items
- `flex-wrap`: `nowrap` (default) | `wrap`

**Item properties:**
- `flex-grow`: how much to grow relative to siblings
- `flex-shrink`: how much to shrink
- `flex-basis`: starting size before grow/shrink

```css
main  { flex: 3; }   /* 75% of space */
aside { flex: 1; }   /* 25% of space */
```

---

## justify-content Visual Guide

```
flex-start:     [A][B][C]__________________
flex-end:       __________________[A][B][C]
center:         _______[A][B][C]___________
space-between:  [A]__________[B]__________[C]
space-around:   ___[A]_______[B]_______[C]___
```

Remember:
- `justify-content` = **main axis** (horizontal by default)
- `align-items` = **cross axis** (vertical by default)

---

## Standard Page Layout Pattern

```
+--------------------------------------------------+
|  HEADER                                          |
+--------------------------------------------------+
|  NAVIGATION BAR                                  |
+-------------------------------+------------------+
|                               |                  |
|  MAIN CONTENT (flex: 3)       | SIDEBAR (flex:1) |
|                               |                  |
+-------------------------------+------------------+
|  FOOTER                                          |
+--------------------------------------------------+
```

Wrap everything in `.wrapper` with `max-width` and `margin: 0 auto`.

---

## Live Code Example

Two-column layout with Flexbox:

```html
<div class="page-body">
    <main>
        <h2>Welcome to the Student Club</h2>
        <p>Main content here...</p>
    </main>
    <aside>
        <h3>Quick Links</h3>
        <ul><li><a href="about.html">Join</a></li></ul>
    </aside>
</div>
```

```css
.page-body { display: flex; }
main  { flex: 3; padding: 25px; }
aside { flex: 1; padding: 25px; background: #f0f4f8; }
```

---

## Common Mistakes

- ❌ Putting `display: flex` on children instead of the parent
- ✅ Apply `display: flex` to the **container**, not the items
- ❌ Forgetting only direct children are flex items
- ✅ Nesting does not inherit flex — only immediate children
- ❌ Fixed widths + padding that exceed 100% → sidebar drops
- ✅ Use `flex` ratios or `box-sizing: border-box`
- ❌ Using `<div>` when a semantic element exists
- ✅ Use `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`

---

## In-Class Practice

Follow `exercises/session-05/exercise.md`:

1. Convert existing HTML to semantic elements
2. Wrap main + aside in a flex container
3. Style the two-column layout (75/25 split)
4. Build horizontal navigation with Flexbox
5. Add sidebar content and test responsiveness

---

## Homework

See `homework/session-05/homework.md`:

- Complete two-column layout on all pages
- Use semantic HTML5 elements throughout
- Navigation bar styled with Flexbox
- Sidebar with at least two content sections

**Due Sunday 23:59**

---

## Recap

- Use semantic HTML5 elements for meaning and accessibility
- Block elements stack vertically; inline elements flow in text
- Flexbox: apply `display: flex` to the parent container
- `justify-content` = main axis; `align-items` = cross axis
- Use `flex` ratios for proportional column widths
- Wrap pages in a centred `.wrapper` with `max-width`

---

## Next Session

**Session 6: Creating Page Layouts (Continued)** — extending layouts across all pages, active-page highlighting, and sharing one CSS file site-wide.
