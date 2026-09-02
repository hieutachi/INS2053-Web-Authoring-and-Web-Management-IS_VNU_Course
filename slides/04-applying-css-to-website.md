---
marp: true
theme: default
paginate: true
---

# Session 4: Applying CSS to the Website

**INS2053 — Web Authoring and Web Management**

*Stop styling with HTML. Start styling with CSS.*

Read: `ebook/04-applying-css-to-website.md`  ·  Practise: `exercises/session-04/exercise.md`  ·  Diagrams: `canvases/buoi-04.canvas.tsx`

---

## Learning Objectives

- Explain what CSS is and why it is separate from HTML
- Link an external CSS file to HTML using `<link>`
- Write CSS rules with element, class, and ID selectors
- Apply colour, font, margin, and padding properties
- Describe the four layers of the CSS box model
- Predict which rule wins when two rules conflict (specificity)

---

## What Is CSS?

- **CSS** = Cascading Style Sheets
- HTML = structure and content (the bricks)
- CSS = visual presentation (the paint and furniture)

🎒 Imagine managing 10 pages. Without CSS, changing a heading colour means editing all 10 files. With one external CSS file, change it **once** and all pages update instantly.

| Method | Scope | Reusable? | Recommended? |
|--------|-------|-----------|-------------|
| Inline (`style=""`) | One element | ❌ No | ❌ Avoid |
| Internal (`<style>`) | One page | ❌ No | ⚠️ Rarely |
| External (`.css` file) | Entire site | ✅ Yes | ✅ Always |

---

## CSS Syntax

```css
selector {
    property: value;
    property: value;
}
```

Example:
```css
h1 {
    color: navy;
    font-size: 32px;
    text-align: center;
}
```

- **Selector** → which elements to style
- **Declaration block** `{ }` → what styles to apply
- Each declaration = `property: value;` (colon + semicolon!)

---

## CSS Selectors

| Type | Syntax | Reusable? | Specificity | Best For |
|------|--------|-----------|-------------|----------|
| Element | `p { }` | All `<p>` | Low (0,0,1) | Global defaults |
| Class | `.highlight { }` | Many elements | Medium (0,1,0) | Components |
| ID | `#header { }` | Unique | High (1,0,0) | Page sections |

Other useful selectors:
- Descendant: `nav a` → links inside `<nav>`
- Group: `h1, h2, h3` → multiple elements at once
- Pseudo-class: `a:hover` → on mouse hover

---

## Colours in CSS

```css
color: red;               /* Named colour */
color: #1a5276;           /* Hex (most common) */
color: rgb(26, 82, 118);  /* RGB */
color: rgba(26, 82, 118, 0.5); /* RGBA with transparency */
```

Hex breakdown: `#RRGGBB`
```
#ff0000 = pure red     #000000 = black
#00ff00 = pure green   #ffffff = white
#0000ff = pure blue    #333333 = dark gray
```

> Always check colour contrast for accessibility.

---

## The Box Model

Every element is a rectangular box with four layers:

```
+-------------------------------------------+
|  MARGIN (space outside the border)        |
|  +---------------------------------------+|
|  |  BORDER (visible edge)                ||
|  |  +-----------------------------------+||
|  |  |  PADDING (space inside border)    |||
|  |  |  +-------------------------------+|||
|  |  |  |  CONTENT (text, images)      ||||
|  |  |  +-------------------------------+|||
|  |  +-----------------------------------+||
|  +---------------------------------------+|
+-------------------------------------------+
```

Always use `box-sizing: border-box` so width includes padding + border.

---

## Live Code Example

Linking CSS and styling the header:

```html
<head>
    <link rel="stylesheet" href="css/style.css">
</head>
```

```css
/* === RESET === */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* === HEADER === */
header {
    background-color: #1a5276;
    color: white;
    text-align: center;
    padding: 30px 20px;
}
```

- `<link>` goes inside `<head>`, never `<body>`
- Start every stylesheet with a CSS reset

---

## Common Mistakes

- ❌ Forgetting `<link rel="stylesheet" href="css/style.css">`
- ✅ Always link the CSS file inside `<head>`
- ❌ Using `#` for classes or `.` for IDs
- ✅ Dot (`.`) for class, hash (`#`) for ID
- ❌ Missing semicolons: `color: navy` (no `;`)
- ✅ Every declaration ends with `;`
- ❌ Confusing margin (outside) and padding (inside)
- ✅ Padding = inner space; Margin = outer space

---

## In-Class Practice

Follow `exercises/session-04/exercise.md`:

1. Write a CSS reset and base styles
2. Style the header and navigation bar
3. Style main content area and footer
4. Add utility classes (`.highlight`, `.center-text`)
5. Test across all five pages

---

## Homework

See `homework/session-04/homework.md`:

- Complete stylesheet covering header, nav, content, footer
- Use at least 3 class selectors and proper hex colours
- Verify consistent styling across all pages

**Due Sunday 23:59**

---

## Recap

- CSS controls appearance; HTML controls structure
- Always use external stylesheets (`<link>` in `<head>`)
- Three selector types: element, class (`.`), ID (`#`)
- Box model: content → padding → border → margin
- Use `box-sizing: border-box` globally
- Specificity determines which rule wins: ID > class > element

---

## Next Session

**Session 5: Creating Page Regions / Layouts** — semantic HTML5 elements, Flexbox, and building a two-column page layout.
