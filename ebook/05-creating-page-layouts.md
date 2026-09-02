# 🟦 SESSION 5
# **Creating Page Layouts**

Great job making your Student Club Website colourful in Session 4! But right now everything stacks vertically — header, then navigation, then content, then footer — like a single column of blocks. Real websites have **layouts**: a header across the top, a main content area beside a sidebar, and a footer at the bottom. Today you will learn how to arrange elements on the page using semantic HTML and modern CSS layout techniques. By the end, your Student Club Website will have a professional two-column layout.

---

# 📌 SESSION INFORMATION

```
📅 Duration:     3 periods (150 minutes) — Theory ~60 min, Practice ~90 min
📚 Reference:    MDN "CSS Layout" guide; MDN "Flexbox" guide
                 Course slides (Week 5)
🎯 Objectives:   1. Use semantic HTML5 elements (header, nav, main, section, aside, footer)
                 2. Explain the box model in the context of layout
                 3. Create layouts using Flexbox (display: flex)
                 4. Build a page skeleton with header, nav, main+sidebar, and footer
                 5. Understand the difference between block and inline display
📖 Prepare:      1. Complete Session 4 (you need a working stylesheet)
                 2. Have index.html open in your editor
                 3. Review the box model section from Session 4
🖼 Diagrams:     canvases/buoi-05.canvas.tsx — SemanticSkeleton, DisplayTypes, FlexAxesDiagram
🔗 Outcomes:     CLO1 (master basic web design and build skills)
                 CLO4 (design and build a web application)
```

---

# 🎯 LEARNING OBJECTIVES

By the end of this session you will be able to:

- Replace generic `<div>` containers with **semantic HTML5** elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`)
- Explain why semantic HTML matters for accessibility and SEO
- Describe the difference between `block`, `inline`, and `inline-block` display types
- Use **Flexbox** (`display: flex`) to create horizontal and vertical layouts
- Control alignment with `justify-content` and `align-items`
- Build a complete two-column page layout (main content + sidebar)
- Wrap a page in a centred container with `max-width`

---

# 📖 THEORY

## 1. Semantic HTML5 Elements

> 🖼 **Diagram:** `canvases/buoi-05.canvas.tsx` → `SemanticSkeleton` — slide `s05-semantic` ("Semantic HTML5")

### 1.1 Definition

**Semantic HTML** means using HTML elements that describe their **meaning**, not just their appearance. Instead of wrapping everything in meaningless `<div>` tags, HTML5 provides elements that tell the browser (and screen readers, and search engines) what role each section plays.

| Element | Meaning | Use For |
|---------|---------|---------|
| `<header>` | Introductory content or navigation aids | Site title, logo, banner |
| `<nav>` | Navigation links | Menu bar, breadcrumbs |
| `<main>` | Primary content of the page | Articles, main text |
| `<section>` | Thematic grouping of content | News section, features section |
| `<article>` | Self-contained, independently distributable content | Blog post, news item |
| `<aside>` | Content tangentially related to main content | Sidebar, pull quotes |
| `<footer>` | Footer for its nearest sectioning ancestor | Copyright, contact info |

### 🎒 Real-life Example

Compare these two approaches:

```html
<!-- ❌ NON-SEMANTIC: div soup -->
<div id="header">
    <div id="title">Student Club</div>
</div>
<div id="nav">
    <div class="link"><a href="index.html">Home</a></div>
</div>
<div id="content">
    <div class="article">Welcome!</div>
</div>
<div id="sidebar">Quick Links</div>
<div id="footer">&copy; 2024</div>
```

```html
<!-- ✅ SEMANTIC: clear meaning -->
<header>
    <h1>Student Club</h1>
</header>
<nav>
    <a href="index.html">Home</a>
</nav>
<main>
    <article>Welcome!</article>
</main>
<aside>Quick Links</aside>
<footer>&copy; 2024</footer>
```

Both render identically with CSS. But the semantic version tells screen readers "this is the navigation," "this is the main content," etc. Search engines also understand the structure better.

### 1.2 Why It Matters

- **Accessibility:** Screen readers announce "navigation region" when they reach `<nav>`, helping blind users navigate.
- **SEO:** Search engines give more weight to content inside `<main>` and `<article>`.
- **Maintainability:** When you read `<header>`, you instantly know what it is. When you read `<div class="top-box">`, you have to guess.
- **Future-proofing:** Browsers may add default behaviours for semantic elements over time.

### ⚠️ Important Notes

- You can only have **one** `<main>` per page.
- `<header>` and `<footer>` can appear inside `<article>` or `<section>` too (not just at the page level).
- `<nav>` should contain **navigation links**, not random content.
- Never use `<section>` as a generic wrapper — that is what `<div>` is for. Use `<section>` only when the content forms a thematic group with a heading.

### 🧪 Try It Yourself — Swap `<div>` for Landmarks

**Task (6 min):** Give a screen reader something to navigate.

1. Start from a page built only from generic containers:
   ```html
   <div class="header">...</div>
   <div class="nav">...</div>
   <div class="content">...</div>
   <div class="footer">...</div>
   ```
2. Open F12 → **Elements** → the **Accessibility** pane and look at the tree.
3. Replace each one with its semantic equivalent: `<header>`, `<nav>`, `<main>`, `<footer>`.
4. Re-open the accessibility tree.

**Expected result:** The `<div>` version shows a flat list of unnamed groups. The semantic version shows named landmarks — banner, navigation, main, contentinfo — which a screen reader user can jump between directly.

<details>
<summary>Why this is not just tidiness</summary>

Screen reader users navigate by landmark the way you skim by heading. With only `<div>`s there is nothing to jump to, so the whole page must be read linearly.

Two rules keep it correct:

- One `<header>`, `<main>`, and `<footer>` per page. `<main>` in particular must be unique — it marks the primary content.
- `<section>` needs a heading to be useful. A `<section>` with no `<h2>` inside it is just a `<div>` with extra letters; use `<div>` when you only need a styling hook.

`<div>` is not banned. It is the right choice for a purely visual wrapper such as `.container` — one that groups things for layout but means nothing to a reader.

</details>


---

## 2. The Display Property

> 🖼 **Diagram:** `canvases/buoi-05.canvas.tsx` → `DisplayTypes` — slide `s05-display` ("Display Types")

### 2.1 Definition

The `display` property controls how an element behaves in the document flow. Understanding display types is essential before learning any layout technique.

### 2.2 Block vs. Inline vs. Inline-Block

```
BLOCK ELEMENTS              INLINE ELEMENTS
┌─────────────────────┐     Hello [world] how are [you]?
│ Takes FULL width    │     ↑ inline elements flow
│ Starts on NEW line  │       within text, no line break
│ Height = content    │
│ Width/height SET    │     INLINE-BLOCK ELEMENTS
│ Examples: div, p,   │     ┌────────┐ ┌────────┐
│   h1-h6, header,    │     │ Like   │ │ Like   │
│   nav, main, footer │     │ inline │ │ inline │
└─────────────────────┘     │ but W/H│ │ but W/H│
                            │ works! │ │ works! │
                            └────────┘ └────────┘
```

| Display Value | Width | Line Break | Can Set Width/Height? | Common Elements |
|---------------|-------|------------|----------------------|-----------------|
| `block` | Full parent width | Yes, new line | Yes | `<div>`, `<p>`, `<h1>`, `<header>`, `<main>` |
| `inline` | Only as wide as content | No | No | `<span>`, `<a>`, `<strong>`, `<em>` |
| `inline-block` | Only as wide as content | No | Yes | (set via CSS) |
| `none` | Hidden | N/A | N/A | (removed from flow) |
| `flex` | Block-level flex container | Yes | Yes | (set via CSS) |

### 🔍 Comparison Table

| Feature | `block` | `inline` | `inline-block` | `flex` |
|---------|---------|----------|----------------|--------|
| Starts new line? | Yes | No | No | Yes |
| Accepts width/height? | Yes | No | Yes | Yes |
| Accepts margin/padding? | All sides | Horizontal only* | All sides | All sides |
| Children behaviour | Normal flow | Normal flow | Normal flow | Flex items |

*Vertical margin/padding on inline elements does NOT push other elements away.

### ⚠️ Important Notes

- Changing `display` does NOT change the element's semantic meaning. A `<nav>` with `display: inline` is still semantically a navigation element.
- `display: none` completely removes the element from the page. It takes up zero space. This is different from `visibility: hidden`, which hides the element but keeps its space.
- We will focus on `display: flex` today because it is the modern standard for page layouts.

---

## 3. Flexbox Basics

> 🖼 **Diagram:** `canvases/buoi-05.canvas.tsx` → `FlexAxesDiagram` — slide `s05-flexbox` ("Flexbox Basics")

### 3.1 Definition

**Flexbox** (Flexible Box Layout) is a CSS layout system designed for arranging items in **one dimension** — either a row or a column. You apply `display: flex` to a **container**, and its direct children become **flex items** that you can align, distribute, and resize.

```
FLEX CONTAINER (display: flex)
┌──────────────────────────────────────────┐
│  ┌────────┐  ┌────────┐  ┌────────┐     │
│  │ Item 1 │  │ Item 2 │  │ Item 3 │     │  ← flex items
│  └────────┘  └────────┘  └────────┘     │
└──────────────────────────────────────────┘
         ← main axis (horizontal by default) →
                  ↕ cross axis (vertical)
```

### 3.2 Key Concepts

**Main Axis** — The direction flex items are laid out. Default is horizontal (left to right). Controlled by `flex-direction`.

**Cross Axis** — Perpendicular to the main axis. If main axis is horizontal, cross axis is vertical.

**Flex Container** — The parent element with `display: flex`.

**Flex Items** — Direct children of the flex container. Only direct children are affected; grandchildren are not.

### 3.3 Essential Flex Container Properties

#### `display: flex`

Activates Flexbox on the container.

```css
.container {
    display: flex;
}
```

#### `flex-direction`

Sets the main axis direction.

```css
.container {
    flex-direction: row;          /* default: left to right */
    flex-direction: row-reverse;  /* right to left */
    flex-direction: column;       /* top to bottom */
    flex-direction: column-reverse; /* bottom to top */
}
```

#### `justify-content`

Aligns items along the **main axis**.

```css
.container {
    justify-content: flex-start;    /* default: pack to start */
    justify-content: flex-end;      /* pack to end */
    justify-content: center;        /* centre */
    justify-content: space-between; /* equal space BETWEEN items */
    justify-content: space-around;  /* equal space AROUND items */
    justify-content: space-evenly;  /* truly equal space everywhere */
}
```

Visual guide:

```
flex-start:     [A][B][C]__________________
flex-end:       __________________[A][B][C]
center:         _______[A][B][C]___________
space-between:  [A]__________[B]__________[C]
space-around:   ___[A]_______[B]_______[C]___
space-evenly:   __[A]________[B]________[C]__
```

#### `align-items`

Aligns items along the **cross axis**.

```css
.container {
    align-items: stretch;     /* default: fill container height */
    align-items: flex-start;  /* align to top */
    align-items: flex-end;    /* align to bottom */
    align-items: center;      /* centre vertically */
}
```

#### `flex-wrap`

Controls whether items wrap to the next line.

```css
.container {
    flex-wrap: nowrap;       /* default: all items on one line */
    flex-wrap: wrap;         /* items wrap to next line if needed */
}
```

#### `gap`

Adds space between flex items (without adding outer margins).

```css
.container {
    gap: 20px;           /* 20px between all items */
    gap: 10px 20px;      /* row-gap: 10px, column-gap: 20px */
}
```

### 3.4 Essential Flex Item Properties

#### `flex-grow`

How much an item should grow relative to siblings.

```css
.main-content {
    flex-grow: 2;   /* grows twice as much as sidebar */
}
.sidebar {
    flex-grow: 1;
}
```

#### `flex-shrink`

How much an item should shrink when there is not enough space.

```css
.sidebar {
    flex-shrink: 0;   /* never shrink below its base size */
}
```

#### `flex-basis`

The starting size of an item before growing/shrinking. Similar to `width` but flex-aware.

```css
.sidebar {
    flex-basis: 300px;   /* start at 300px, then grow/shrink */
}
```

#### Shorthand: `flex`

```css
/* flex: grow shrink basis */
.main-content {
    flex: 2 1 0;       /* grow:2, shrink:1, basis:0 */
}
.sidebar {
    flex: 1 0 300px;   /* grow:1, shrink:0, basis:300px */
}
```

### 🎒 Real-life Example: Two-Column Layout

```css
.page-body {
    display: flex;
}

main {
    flex: 3;           /* takes 3 parts of available space */
    padding: 25px;
}

aside {
    flex: 1;           /* takes 1 part */
    padding: 25px;
    background-color: #f0f4f8;
}
```

This creates a layout where main content gets 75% of the width and sidebar gets 25%, automatically adjusting when the window resizes.

### ✅ Best Practices for Flexbox

- Always set `display: flex` on the **parent**, not the children.
- Use `gap` instead of margins between flex items — it is cleaner.
- Use `flex-basis` instead of `width` for flex items (more predictable).
- Combine `flex-wrap: wrap` with percentage-based `flex-basis` for responsive grids.
- Test by resizing the browser window to see how items behave.

### ⚠️ Important Notes

- Flexbox is **one-dimensional**: it handles rows OR columns, not both simultaneously. For two-dimensional grids, use CSS Grid (covered in later sessions).
- Only **direct children** of the flex container become flex items. Nested elements are unaffected.
- `margin: auto` on a flex item absorbs extra space, pushing the item to the opposite side. Useful for separating nav items.

### 🧪 Try It Yourself — Find the Main Axis

**Task (7 min):** Make `justify-content` and `align-items` swap meaning.

1. Build a row of three cards:
   ```html
   <div class="row">
       <div class="card">One</div>
       <div class="card">Two</div>
       <div class="card">Three</div>
   </div>
   ```
   ```css
   .row {
       display: flex;
       gap: 12px;
       height: 240px;
       border: 2px dashed #999;
       justify-content: center;
       align-items: flex-start;
   }
   .card { background: #dbeafe; padding: 16px; }
   ```
2. Reload: the cards are centred left-to-right and pinned to the top.
3. Add one line — `flex-direction: column;` — and reload without changing anything else.

**Expected result:** The same two properties now do the opposite. `justify-content: center` centres vertically, and `align-items: flex-start` pins the cards to the left.

<details>
<summary>The rule to memorise</summary>

`justify-content` always works along the **main** axis. `align-items` always works along the **cross** axis. `flex-direction` decides which is which:

| `flex-direction` | main axis | cross axis |
|---|---|---|
| `row` (default) | horizontal | vertical |
| `column` | vertical | horizontal |

So "how do I centre something vertically?" has no single answer — it depends on the direction. In a row, vertical centring is `align-items: center`. In a column, it is `justify-content: center`.

Also remember `display: flex` goes on the **container**, never on the items. Putting it on the items is the most common reason a flex layout does nothing at all.

</details>


---

## 4. Building a Page Skeleton

### 4.1 Standard Layout Pattern

Most websites follow this structure:

```
+---------------------------------------------------------------+
|  HEADER                                                       |
|  (Logo, site title, tagline)                                  |
+---------------------------------------------------------------+
|  NAVIGATION BAR                                               |
|  (Home | About | Events | Gallery | Contact)                  |
+------------------------------------+--------------------------+
|                                    |                          |
|  MAIN CONTENT                      |  SIDEBAR                 |
|  (Articles, text, images)          |  (Quick links,           |
|                                    |   upcoming events,       |
|                                    |   social media)          |
|                                    |                          |
+------------------------------------+--------------------------+
|  FOOTER                                                       |
|  (Copyright, contact info)                                    |
+---------------------------------------------------------------+
```

### 4.2 HTML Structure

```html
<body>
    <div class="wrapper">
        <header>
            <h1>Student Club</h1>
            <p>Learn. Create. Connect.</p>
        </header>

        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>

        <div class="page-body">
            <main>
                <h2>Welcome to the Student Club</h2>
                <p>Main content goes here...</p>
            </main>

            <aside>
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="about.html">Join the Club</a></li>
                    <li><a href="events.html">Calendar</a></li>
                </ul>
            </aside>
        </div>

        <footer>
            <p>&copy; 2024 Student Club. All rights reserved.</p>
        </footer>
    </div>
</body>
```

Notice:
- `.wrapper` centres the entire page
- `.page-body` is the flex container holding `<main>` and `<aside>` side by side
- Everything else stacks naturally (block elements)

### 4.3 CSS for the Skeleton

```css
/* === WRAPPER === */
.wrapper {
    max-width: 1000px;
    margin: 0 auto;           /* centres horizontally */
    background-color: white;
    min-height: 100vh;        /* at least full viewport height */
}

/* === PAGE BODY (two-column flex container) === */
.page-body {
    display: flex;
}

/* === MAIN CONTENT === */
main {
    flex: 3;                  /* 75% of available space */
    padding: 25px;
}

/* === SIDEBAR === */
aside {
    flex: 1;                  /* 25% of available space */
    padding: 25px;
    background-color: #f0f4f8;
    border-left: 1px solid #ddd;
}

/* === FOOTER === */
footer {
    background-color: #1a5276;
    color: white;
    text-align: center;
    padding: 20px;
}
```

### ⚠️ Important Notes

- `min-height: 100vh` ensures the wrapper fills the full viewport even if content is short. The footer stays at the bottom.
- `margin: 0 auto` only works when the element has a defined width or max-width. Without it, `auto` margins do nothing.
- The `flex: 3` / `flex: 1` ratio means main gets 3/(3+1) = 75% and sidebar gets 25%. Change the numbers to adjust proportions.

### 🧪 Try It Yourself — A Footer That Stays Down

**Task (7 min):** Fix the footer that floats up the page when there is little content.

1. Build a page with a header, a short `<main>`, and a footer. Give the footer a background colour so you can see it.
2. Reload with only one paragraph in `<main>`. The footer sits in the middle of the window with blank space below it.
3. Now apply the sticky-footer pattern:
   ```css
   body {
       min-height: 100vh;
       display: flex;
       flex-direction: column;
       margin: 0;
   }
   main { flex: 1; }
   ```
4. Reload with one paragraph, then paste in twenty paragraphs and reload again.

**Expected result:** With little content the footer sits at the bottom of the window. With a lot of content it sits below the content and scrolls normally. No `position: fixed` involved.

<details>
<summary>How the three lines cooperate</summary>

- `min-height: 100vh` — the body is at least as tall as the viewport, so there is space to push into.
- `display: flex; flex-direction: column` — header, main, and footer become a vertical flex line.
- `main { flex: 1 }` — main absorbs all the leftover space, which pushes the footer to the bottom.

Note this is *not* `position: fixed`. A fixed footer sits on top of the content permanently and covers it on short screens. This pattern keeps the footer in normal flow, which is what "sticky footer" actually means.

</details>


---

## 5. Float-Based Layouts (Legacy Knowledge)

### 5.1 Why Learn Floats?

Before Flexbox, developers used `float` to create multi-column layouts. You may encounter float-based code in older tutorials, Dreamweaver templates, or existing websites. Understanding floats helps you maintain legacy code.

### 5.2 How Float Works

```css
main {
    width: 65%;
    float: left;
}

aside {
    width: 35%;
    float: left;
}
```

Floated elements are taken out of normal flow and pushed to the left or right. Subsequent content wraps around them.

### 5.3 The Clearfix Problem

After floating elements, the parent container collapses because floated children are "out of flow." The footer would slide up next to the columns. Solutions:

```css
/* Solution 1: overflow on parent */
.page-body {
    overflow: hidden;   /* forces parent to contain floats */
}

/* Solution 2: clear on next element */
footer {
    clear: both;        /* pushes footer below all floats */
}
```

### 🔍 Float vs. Flexbox

| Feature | Float | Flexbox |
|---------|-------|---------|
| Purpose | Originally for text wrapping around images | Designed for layout |
| Vertical alignment | Difficult | Easy (`align-items`) |
| Equal height columns | Requires hacks | Automatic |
| Source order independence | Not possible | `order` property |
| Browser support | Universal | Modern browsers (IE10+) |
| Recommended for new projects? | ❌ No | ✅ Yes |

> 💡 **For the Student Club Website, use Flexbox.** Learn floats only so you can read older code.

---

## ✅ Best Practices

1. **Use semantic elements first.** Structure your HTML with `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` before adding any CSS.
2. **Wrap your page** in a `.wrapper` with `max-width` and `margin: 0 auto` to prevent content from stretching across ultra-wide monitors.
3. **Use Flexbox for layout.** Reserve floats for their original purpose (wrapping text around images).
4. **Set `box-sizing: border-box` globally** so padding does not break your column widths.
5. **Use `gap` in flex containers** instead of margins between items.
6. **Test responsiveness early.** Resize the browser after every layout change.
7. **Comment your CSS sections** so you can find layout rules quickly:
   ```css
   /* === LAYOUT: PAGE BODY === */
   /* === LAYOUT: SIDEBAR === */
   ```

---

## ❌ Common Mistakes

### Mistake 1: Putting Flex properties on children instead of the parent

```css
/* ❌ WRONG: display:flex on the child */
main {
    display: flex;
}
```

```css
/* ✅ CORRECT: display:flex on the PARENT container */
.page-body {
    display: flex;
}
```

### Mistake 2: Forgetting that only direct children are flex items

```html
<div class="flex-container">
    <div>Item 1</div>         <!-- ✅ flex item -->
    <div>
        <p>Nested text</p>   <!-- ❌ NOT a flex item -->
    </div>                     <!-- ✅ THIS div is the flex item -->
</div>
```

### Mistake 3: Sidebar drops below main content

```css
/* ❌ WRONG: fixed widths + padding exceed container */
main { width: 70%; padding: 30px; }
aside { width: 30%; padding: 30px; }
/* Total: 100% + 120px padding = OVERFLOW! */
```

```css
/* ✅ CORRECT: use flex ratios or include box-sizing: border-box */
.page-body { display: flex; }
main { flex: 3; padding: 30px; }
aside { flex: 1; padding: 30px; }
```

### Mistake 4: Using `<div>` when a semantic element exists

```html
<!-- ❌ NON-SEMANTIC -->
<div class="header">...</div>
<div class="footer">...</div>
```

```html
<!-- ✅ SEMANTIC -->
<header>...</header>
<footer>...</footer>
```

### Mistake 5: Confusing `justify-content` and `align-items`

```css
/* justify-content = MAIN axis (horizontal by default) */
/* align-items     = CROSS axis (vertical by default)  */

/* To centre items BOTH horizontally and vertically: */
.container {
    display: flex;
    justify-content: center;  /* horizontal centre */
    align-items: center;      /* vertical centre */
}
```

### 🧪 Try It Yourself — Why Floats Were Replaced

**Task (6 min):** Reproduce the bug that made floats painful, then fix it two ways.

1. Build a floated two-column layout:
   ```html
   <div class="wrap">
       <div class="col">Left</div>
       <div class="col">Right</div>
   </div>
   ```
   ```css
   .wrap { border: 3px solid red; }
   .col  { float: left; width: 50%; background: #eee; }
   ```
2. Reload. The red border collapses to a thin line above the columns — the parent has lost its height.
3. Fix it the old way: `.wrap { overflow: auto; }`
4. Now delete the floats entirely and use `.wrap { display: flex; }` with `.col { flex: 1; }`.

**Expected result:** Floated children are removed from normal flow, so the parent measures as empty. `overflow: auto` forces it to contain them; Flexbox never had the problem.

<details>
<summary>What to take from this</summary>

`float` was designed for one job: wrapping text around an image. That still works and is still the right tool for it:

```css
img.portrait { float: left; margin: 0 1rem 1rem 0; }
```

Using float for *layout* was a workaround from before Flexbox and Grid existed, and it required clearfix hacks, fixed widths, and careful source ordering. You need to recognise it in legacy code and in older tutorials — but write new layouts with Flexbox or Grid.

</details>


---

# 📋 THEORY SUMMARY

| Concept | Definition | Example |
|---------|-----------|---------|
| Semantic HTML | Elements that describe their meaning | `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` |
| `display: block` | Full width, new line, accepts dimensions | `<div>`, `<p>`, `<header>` |
| `display: inline` | Content width, no line break, no dimensions | `<span>`, `<a>`, `<strong>` |
| `display: flex` | Activates Flexbox layout on container | `.page-body { display: flex; }` |
| Main axis | Direction flex items are laid out | Horizontal by default (`row`) |
| Cross axis | Perpendicular to main axis | Vertical when main is horizontal |
| `justify-content` | Alignment along the main axis | `center`, `space-between` |
| `align-items` | Alignment along the cross axis | `center`, `stretch` |
| `flex-grow` | How much an item grows relative to siblings | `flex: 3` vs `flex: 1` |
| Wrapper | Centred container limiting page width | `max-width: 1000px; margin: 0 auto;` |

---

# 💡 WORKED EXAMPLES

## Example 1: Converting Div Soup to Semantic HTML

**Situation:** Your current `index.html` uses `<div id="header">`, `<div id="content">`, etc. Convert to semantic HTML.

**Code (before):**

```html
<div id="header">
    <h1>Student Club</h1>
</div>
<div id="nav">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
</div>
<div id="content">
    <h2>Welcome</h2>
    <p>Hello!</p>
</div>
<div id="sidebar">
    <h3>Links</h3>
</div>
<div id="footer">
    <p>&copy; 2024</p>
</div>
```

**Code (after):**

```html
<header>
    <h1>Student Club</h1>
</header>
<nav>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
</nav>
<main>
    <h2>Welcome</h2>
    <p>Hello!</p>
</main>
<aside>
    <h3>Links</h3>
</aside>
<footer>
    <p>&copy; 2024</p>
</footer>
```

**Line-by-line explanation:**

- `<div id="header">` becomes `<header>` — the element name itself says "this is the header."
- `<div id="nav">` becomes `<nav>` — explicitly marks navigation.
- `<div id="content">` becomes `<main>` — identifies primary page content.
- `<div id="sidebar">` becomes `<aside>` — indicates supplementary content.
- `<div id="footer">` becomes `<footer>` — clearly the page footer.
- No IDs needed for styling anymore (unless you want them for JavaScript). Use the element selectors directly: `header { ... }`, `nav { ... }`, etc.

**Result:** The page looks identical (CSS targets the same visual areas), but the HTML now communicates structure to screen readers and search engines.

---

## Example 2: Creating a Horizontal Navigation Bar with Flexbox

**Situation:** Turn a vertical list of links into a horizontal navigation bar.

**Code:**

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

```css
nav ul {
    list-style: none;          /* remove bullet points */
    margin: 0;
    padding: 0;
    display: flex;             /* make the UL a flex container */
    justify-content: center;   /* centre the links horizontally */
    background-color: #2874a6;
}

nav ul li a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 12px 20px;
    transition: background-color 0.3s;
}

nav ul li a:hover {
    background-color: #1a5276;
}
```

**Line-by-line explanation:**

- `list-style: none;` — removes the default bullet points from `<ul>`.
- `display: flex;` on the `<ul>` — makes list items sit in a row instead of stacking vertically.
- `justify-content: center;` — centres the nav links within the bar.
- `display: block;` on `<a>` — makes the entire padding area clickable (not just the text).
- `transition: background-color 0.3s;` — creates a smooth 0.3-second colour animation on hover.

**Result:** Navigation links appear in a centred horizontal row with blue backgrounds and smooth hover effects.

---

## Example 3: Two-Column Layout with Flexbox

**Situation:** Place main content and sidebar side by side.

**Code:**

```html
<div class="page-body">
    <main>
        <h2>Welcome to the Student Club</h2>
        <p>We are a community of creative students who love technology.</p>
    </main>
    <aside>
        <h3>Quick Links</h3>
        <ul>
            <li><a href="about.html">Join the Club</a></li>
            <li><a href="events.html">Event Calendar</a></li>
        </ul>
    </aside>
</div>
```

```css
.page-body {
    display: flex;       /* activates flexbox */
}

main {
    flex: 3;             /* takes 3/4 of the space */
    padding: 25px;
}

aside {
    flex: 1;             /* takes 1/4 of the space */
    padding: 25px;
    background-color: #f0f4f8;
    border-left: 1px solid #ddd;
}
```

**Line-by-line explanation:**

- `.page-body { display: flex; }` — the wrapper becomes a flex container. Its direct children (`<main>` and `<aside>`) become flex items arranged in a row.
- `main { flex: 3; }` — shorthand for `flex-grow: 3; flex-shrink: 1; flex-basis: 0;`. Main gets 3 shares of available space.
- `aside { flex: 1; }` — sidebar gets 1 share. Ratio is 3:1, so main gets 75%, sidebar gets 25%.
- `border-left: 1px solid #ddd;` — adds a subtle divider between main and sidebar.

**Result:** Main content occupies the left 75% and sidebar occupies the right 25%. Both columns stretch to equal height automatically (Flexbox default `align-items: stretch`).

---

## Example 4: Centre a Wrapper on the Page

**Situation:** Prevent content from stretching edge-to-edge on wide monitors.

**Code:**

```css
.wrapper {
    max-width: 1000px;
    margin: 0 auto;
    background-color: white;
    min-height: 100vh;
    box-shadow: 0 0 20px rgba(0,0,0,0.05);
}
```

**Line-by-line explanation:**

- `max-width: 1000px;` — the wrapper never exceeds 1000px. On smaller screens, it shrinks to fit.
- `margin: 0 auto;` — `0` for top/bottom margin, `auto` for left/right. The browser distributes remaining horizontal space equally, centring the wrapper.
- `background-color: white;` — gives the content area a white background against the body's light blue-grey.
- `min-height: 100vh;` — ensures the wrapper is at least as tall as the viewport. `100vh` = 100% of viewport height.
- `box-shadow: 0 0 20px rgba(0,0,0,0.05);` — adds a very subtle shadow around the wrapper for depth.

**Result:** The page content appears as a centred white card on the light background, looking clean and professional at any screen width.

---

## Example 5: Sticky Footer with Flexbox

**Situation:** The footer should always be at the bottom of the viewport, even when content is short.

**Code:**

```css
.wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.page-body {
    flex: 1;             /* grows to fill remaining space */
    display: flex;
}
```

**Line-by-line explanation:**

- `.wrapper { display: flex; flex-direction: column; }` — the entire page is a vertical flex container. Header, nav, page-body, and footer stack vertically.
- `min-height: 100vh;` — the wrapper is at least viewport height.
- `.page-body { flex: 1; }` — the page body grows to fill all remaining vertical space, pushing the footer to the bottom.
- `.page-body { display: flex; }` — nested flexbox! The page body is ALSO a flex container (horizontal) for main + sidebar.

**Result:** Short pages still show the footer at the bottom of the viewport. Long pages push the footer down naturally. No JavaScript needed.

---

# 🛠️ HANDS-ON PRACTICE

## Setup

Open your Student Club Website project. Make sure `css/style.css` contains the reset and base styles from Session 4. Open `index.html` in your editor.

---

### TASK 1: Convert to Semantic HTML

🎯 **Goal:** Replace all generic `<div>` wrappers with semantic HTML5 elements.

📝 **Requirements:**
- Use `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` appropriately
- Wrap main + aside in a `<div class="page-body">` flex container
- Wrap everything in a `<div class="wrapper">`

**Steps:**

1. Open `index.html`.
2. Replace `<div id="header">` with `<header>`.
3. Replace `<div id="nav">` with `<nav>`.
4. Wrap your main content area and sidebar in:
   ```html
   <div class="page-body">
       <main>
           <!-- your main content -->
       </main>
       <aside>
           <!-- your sidebar content -->
       </aside>
   </div>
   ```
5. Replace `<div id="footer">` with `<footer>`.
6. Wrap everything inside `<body>` with `<div class="wrapper">`.
7. Save. Preview. The page will look unstyled until you update CSS.

✅ **Expected result:** HTML uses semantic elements. Page renders without errors (but may look unstyled until Task 2).

📁 **File to save:** `index.html`

---

### TASK 2: Build the Flexbox Layout

🎯 **Goal:** Create the two-column layout using Flexbox.

📝 **Requirements:**
- Centre the page with a wrapper (max-width 1000px)
- Main content and sidebar side by side using `display: flex`
- Main gets 75%, sidebar gets 25%

**Steps:**

1. In `css/style.css`, add/update:
   ```css
   /* === WRAPPER === */
   .wrapper {
       max-width: 1000px;
       margin: 0 auto;
       background-color: white;
       min-height: 100vh;
       display: flex;
       flex-direction: column;
   }

   /* === PAGE BODY === */
   .page-body {
       display: flex;
       flex: 1;
   }

   /* === MAIN CONTENT === */
   main {
       flex: 3;
       padding: 25px;
   }

   /* === SIDEBAR === */
   aside {
       flex: 1;
       padding: 25px;
       background-color: #f0f4f8;
       border-left: 1px solid #ddd;
   }
   ```
2. Update header, nav, and footer selectors if you changed from ID-based to element-based selectors.
3. Save. Preview in browser.

✅ **Expected result:**
- Page is centred with max width 1000px
- Main content and sidebar appear side by side
- Footer is at the bottom even with little content
- Sidebar has a light background and left border

📁 **File to save:** `css/style.css`

---

### TASK 3: Style the Navigation with Flexbox

🎯 **Goal:** Create a horizontal navigation bar using Flexbox.

📝 **Requirements:**
- Nav links displayed horizontally
- Centred within the nav bar
- Hover effect with smooth transition

**Steps:**

1. Add/update in `css/style.css`:
   ```css
   /* === NAVIGATION === */
   nav {
       background-color: #2874a6;
   }

   nav ul {
       list-style: none;
       margin: 0;
       padding: 0;
       display: flex;
       justify-content: center;
   }

   nav ul li a {
       display: block;
       color: white;
       text-decoration: none;
       padding: 12px 20px;
       font-size: 15px;
       transition: background-color 0.3s;
   }

   nav ul li a:hover {
       background-color: #1a5276;
   }
   ```
2. Save. Preview.

✅ **Expected result:** Navigation links appear in a centred horizontal row. Hovering smoothly changes the background colour.

📁 **File to save:** `css/style.css`

---

### TASK 4: Add Sidebar Content and Test

🎯 **Goal:** Populate the sidebar and verify the layout works with real content.

📝 **Requirements:**
- Add Quick Links, Upcoming Events, and Follow Us sections to the sidebar
- Verify both columns have appropriate heights
- Test in at least two browser window sizes

**Steps:**

1. In `index.html`, add sidebar content:
   ```html
   <aside>
       <h3>Quick Links</h3>
       <ul>
           <li><a href="about.html">Join the Club</a></li>
           <li><a href="events.html">Event Calendar</a></li>
           <li><a href="documents/constitution.pdf">Club Constitution</a></li>
       </ul>

       <h3>Upcoming Events</h3>
       <ul>
           <li>Mar 15 - Web Workshop</li>
           <li>Mar 22 - Photo Contest</li>
           <li>Mar 29 - Music Night</li>
       </ul>

       <h3>Follow Us</h3>
       <p>
           <a href="#">Facebook</a> |
           <a href="#">Instagram</a> |
           <a href="#">YouTube</a>
       </p>
   </aside>
   ```
2. Add sidebar-specific styles:
   ```css
   aside h3 {
       color: #1a5276;
       font-size: 18px;
       margin-bottom: 10px;
       margin-top: 15px;
       border-bottom: 1px solid #ccc;
       padding-bottom: 5px;
   }

   aside h3:first-child {
       margin-top: 0;
   }

   aside ul {
       list-style: none;
   }

   aside ul li {
       padding: 5px 0;
       border-bottom: 1px dotted #ccc;
   }

   aside ul li a {
       color: #2874a6;
       text-decoration: none;
   }

   aside ul li a:hover {
       color: #1a5276;
       text-decoration: underline;
   }
   ```
3. Save. Preview. Resize the browser window narrow and wide.

✅ **Expected result:** Sidebar shows three sections with styled headings and dotted separators. Both columns stretch to equal height. Layout adjusts when resizing.

📁 **Files to save:** `index.html`, `css/style.css`

---

# 🐛 COMMON ERRORS — WHAT THE BROWSER SHOWS YOU

Layout bugs look dramatic but come from a short list of causes. Work down this table before rewriting your CSS.

| Symptom you see | Likely cause | How to confirm | Fix |
|---|---|---|---|
| Flex items stack vertically instead of in a row | `display: flex` is on the items, not on the parent | Inspect the parent — it has no `display: flex` | Move `display: flex` to the container |
| `justify-content` appears to do nothing | The items already fill the main axis, so there is no free space to distribute | Inspect: total item width equals container width | Remove `flex: 1`, or set a narrower width on the items |
| `align-items: center` centres horizontally, not vertically | `flex-direction: column` swapped the axes | Read `flex-direction` on the container | Use `justify-content` for the main axis; remember the axes swap |
| Grid items land in the wrong cells | `grid-template-columns` count does not match the markup | Turn on the DevTools grid overlay | Fix the column list, or set explicit `grid-column` values |
| A `<section>` ignores `width` | It is `display: inline` from a reset, or it is a flex item | Inspect the computed `display` value | Set `display: block`, or use `flex-basis` |
| Sideways scrollbar on a page that should fit | An element is wider than the viewport, usually from padding plus a fixed width | Set `* { outline: 1px solid red }` temporarily and find the overflowing box | Use `box-sizing: border-box` and percentage or `fr` widths |
| Sticky footer floats in the middle of tall pages | The layout has no minimum height | Inspect the wrapper height | `body { min-height: 100vh; display: flex; flex-direction: column }` and `main { flex: 1 }` |
| Two `<header>` elements confuse a screen reader | Landmark elements duplicated at page level | Check the DevTools accessibility tree | One page-level `<header>`, `<main>`, `<footer>`; use `<section>` inside |
| `gap` does nothing | The container is not flex or grid | Inspect the computed `display` value | `gap` only applies to flex, grid, and multi-column layouts |

**Turn the overlay on.** In DevTools, the small `flex` or `grid` badge beside an element in the Elements panel draws the actual tracks and free space over the page. Most layout confusion disappears the moment you can see where the lines really are.

---


# ✅ SELF-CHECK QUESTIONS

Answer these from memory first, then expand the answer to check yourself.

**Q1. Which element do you put `display: flex` on — the parent or the children?**

<details>
<summary>Answer</summary>

The **parent** (the flex container). It turns its direct children into flex items. Putting `display: flex` on a child does nothing for its position within the parent — it only affects that child's own children. This is the single most common flexbox mistake.

</details>

---

**Q2. What is the difference between `justify-content` and `align-items`?**

<details>
<summary>Answer</summary>

`justify-content` aligns items along the **main axis**; `align-items` aligns them along the **cross axis**. With the default `flex-direction: row`, main is horizontal and cross is vertical. Set `flex-direction: column` and they swap — `justify-content` now controls vertical placement.

</details>

---

**Q3. Explain `flex: 1` in plain language.**

<details>
<summary>Answer</summary>

It is shorthand for `flex-grow: 1; flex-shrink: 1; flex-basis: 0%` — "ignore my natural width and take an equal share of the available space". Three siblings all set to `flex: 1` become equal columns. One at `flex: 2` next to one at `flex: 1` takes two-thirds of the space.

</details>

---

**Q4. When do you reach for Grid instead of Flexbox?**

<details>
<summary>Answer</summary>

**Flexbox** is one-dimensional — a row or a column: navigation bars, button groups, a sidebar beside main content. **Grid** is two-dimensional — rows *and* columns at once: photo galleries, card layouts, whole-page templates. If you find yourself nesting three levels of flex containers to line things up in both directions, switch to Grid.

</details>

---

**Q5. Why is `gap` better than putting `margin` on flex items?**

<details>
<summary>Answer</summary>

`gap` only inserts space **between** items, never before the first or after the last, so you do not need `:last-child` overrides to strip a trailing margin. It also does not interact with margin collapsing. One declaration on the container replaces margin rules plus exceptions on the children.

</details>

---

**Q6. What is the difference between `position: relative` and `position: absolute`?**

<details>
<summary>Answer</summary>

`relative` keeps the element in normal flow and nudges it visually from where it would have been; the space it occupied is preserved. `absolute` **removes** it from flow — surrounding content closes the gap — and positions it against the nearest ancestor that has a position other than `static`. The classic pairing is `position: relative` on a parent plus `position: absolute` on a child.

</details>

---

**Q7. Why does `float` cause a parent to collapse to zero height?**

<details>
<summary>Answer</summary>

Floated children are taken out of normal flow, so the parent no longer measures them and may compute a height of zero, with borders and backgrounds collapsing. The historical fixes were a clearfix pseudo-element or `overflow: hidden`. Modern layout avoids the problem entirely — use Flexbox or Grid and reserve `float` for wrapping text around an image.

</details>

---

**Q8. What does `repeat(auto-fit, minmax(250px, 1fr))` do?**

<details>
<summary>Answer</summary>

It creates as many columns as fit, where each is at least 250px wide and otherwise shares space equally. As the viewport narrows, the column count drops automatically — four columns, then three, then two, then one — with **no media queries**. It is the most useful single line in responsive CSS.

</details>

---


# 📝 SELF-ASSESSMENT WORKSHEET

| # | I can... | Yes | No |
|---|----------|-----|----|
| 1 | Name five semantic HTML5 elements and explain their purpose | ☐ | ☐ |
| 2 | Explain the difference between block and inline display | ☐ | ☐ |
| 3 | Activate Flexbox on a container element | ☐ | ☐ |
| 4 | Use `justify-content` to control horizontal alignment | ☐ | ☐ |
| 5 | Use `align-items` to control vertical alignment | ☐ | ☐ |
| 6 | Create a two-column layout using flex ratios | ☐ | ☐ |
| 7 | Centre a page wrapper using `max-width` and `margin: 0 auto` | ☐ | ☐ |
| 8 | Explain why Flexbox is preferred over floats for new layouts | ☐ | ☐ |

> 💡 If you answered "No" to any item, re-read that section and redo the corresponding practice task. Pay special attention to the worked examples.

---

# 🔗 FURTHER READING

- [CSS layout overview — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout)
- [Flexbox — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
- [A Complete Guide to Flexbox — CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [The box model — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)
- [Floats — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Floats)
- [HTML5 semantic elements — MDN](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html)
- [Document and website structure — MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)

---

# ⏭️ NEXT SESSION

In Session 6, you will extend this layout into a complete multi-page website — building the About, Events, Gallery, and Contact pages, creating a navigation menu that highlights the current page, and sharing one CSS file across all pages.
