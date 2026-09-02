---
marp: true
theme: default
paginate: true
---

# Session 14: Working with the Spry Framework

**INS2053 — Web Authoring and Web Management**

*Learn from the past. Build with the present.*

Read: `ebook/14-working-with-spry-framework.md`  ·  Practise: `exercises/session-14/exercise.md`  ·  Diagrams: `canvases/buoi-14.canvas.tsx`

---

## Learning Objectives

- Describe what the Spry Framework is and why it is considered legacy
- List the three main Spry widgets (Accordion, Tabbed Panels, Menu Bar)
- Explain five reasons Spry should NOT be used in new projects
- Build a CSS-only dropdown navigation using `:hover` and nested `<ul>`
- Build a CSS-only accordion using HTML5 `<details>` and `<summary>`

---

## What Was Adobe Spry?

Spry was Adobe's JavaScript widget library bundled with Dreamweaver CS3--CS6 (2007--2012). It provided pre-built interactive components without writing JavaScript manually.

```
TIMELINE OF WEB UI FRAMEWORKS
2007 --- Spry ships with Dreamweaver CS3
2012 --- Spry development STOPS
2013 --- Bootstrap 3.0 (mobile-first)
2018 --- CSS-only solutions mature (:hover, <details>)
2024 --- Modern CSS handles most widget needs alone
```

We study Spry for **recognition and migration**, then build modern replacements.

---

## The Three Spry Widgets

| Widget | What It Does | Modern Replacement |
|--------|-------------|-------------------|
| Accordion | Collapsible panels (one open at a time) | `<details>` + `<summary>` |
| Tabbed Panels | Content under clickable tabs | CSS radio-button hack or `<details name="">` |
| Menu Bar | Dropdown navigation | Nested `<ul>` + `:hover` / `:focus-within` |

Every Spry widget required THREE files: specific HTML structure + linked CSS file + linked JS file + initialization script. Missing any one breaks the widget.

---

## Why Spry Is Legacy (5 Reasons)

| # | Reason | Explanation |
|---|--------|-------------|
| 1 | No longer maintained | Adobe stopped updating ~2012; no security patches |
| 2 | Not mobile-friendly | Touch events not handled; dropdowns fail on phones |
| 3 | Security risks | Unmaintained JS may contain unpatched vulnerabilities |
| 4 | Better alternatives exist | Modern CSS replicates all Spry widgets with zero JS |
| 5 | Browser compatibility | Outdated JS patterns break in Chrome 100+, Safari 16+ |

Rule: **Do NOT use Spry in new projects.** Plan to replace it on existing sites.

---

## Modern Alternative: CSS-Only Dropdown Nav

The technique relies on three CSS concepts:
1. **Nested `<ul>`** for submenu items
2. **`display: none`** hides submenu by default
3. **`:hover`** shows submenu when user hovers over parent

```css
/* Key rules */
.main-nav > li { position: relative; }
.dropdown { display: none; position: absolute; top: 100%; z-index: 1000; }

/* THE KEY RULE: show on hover AND keyboard focus */
.has-dropdown:hover .dropdown,
.has-dropdown:focus-within .dropdown {
    display: block;
}
```

Always include `:focus-within` for keyboard accessibility.

---

## Live Code Example

CSS-only dropdown navigation HTML:

```html
<nav>
    <ul class="main-nav">
        <li><a href="index.html">Home</a></li>
        <li class="has-dropdown">
            <a href="about.html">About &#9662;</a>
            <ul class="dropdown">
                <li><a href="about.html#mission">Our Mission</a></li>
                <li><a href="about.html#team">Our Team</a></li>
            </ul>
        </li>
        <li><a href="gallery.html">Gallery</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

Same nested `<ul>` structure as Spry -- but CSS replaces JavaScript entirely.

---

## Modern Alternative: HTML5 Accordion

Use `<details>` and `<summary>` for native, accessible accordions:

```html
<details open>
    <summary>Web Design Workshop</summary>
    <p>Learn HTML & CSS basics. March 15, 2024.</p>
</details>

<details>
    <summary>Photography Contest</summary>
    <p>Submit campus photos. Deadline: March 20.</p>
</details>
```

No JavaScript. No CSS file. No initialization script. Works on all modern browsers and mobile devices. Add `open` attribute to start a panel expanded.

---

## Common Mistakes

- **Using Spry in new projects** -- it is abandoned software since 2012
- **Forgetting `position: relative`** on parent `<li>` -- dropdown floats to wrong spot
- **Only using `:hover`** -- keyboard users cannot access dropdown without `:focus-within`
- **Forgetting `z-index`** on dropdown -- submenu hides behind page content
- **Using `<div>` instead of `<details>`** for accordions -- loses semantics and accessibility

---

## In-Class Practice

Follow `exercises/session-14/exercise.md`:

1. Replace your site navigation with a CSS-only dropdown menu
2. Add submenus under "About" and "Events"
3. Add a CSS-only accordion to the Events page using `<details>`/`<summary>`
4. Test hover behavior AND keyboard tab navigation
5. Verify dropdowns appear above other content (z-index)

---

## Homework

See `homework/session-14/homework.md`:

- Implement CSS-only dropdown navigation across all pages
- Include at least one submenu with 2+ items
- Add an accordion section using `<details>`/`<summary>`
- Write a 150-word comparison: Spry vs modern CSS approach
- Push updated navigation to GitHub

**Due Sunday 23:59**

---

## Recap

- Spry was a Dreamweaver-era JS widget framework (dead since 2012)
- Five reasons it is legacy: unmaintained, no mobile support, insecure, unnecessary, incompatible
- CSS-only dropdowns use nested `<ul>` + `:hover` + `:focus-within`
- HTML5 `<details>`/`<summary>` creates native accordions with zero JavaScript
- Always prioritize accessibility and mobile compatibility

---

## Next Session

**Session 15: Mobile Interface Design / Review** -- viewport meta tag, media queries, responsive design, full course recap, and final exam preparation.
