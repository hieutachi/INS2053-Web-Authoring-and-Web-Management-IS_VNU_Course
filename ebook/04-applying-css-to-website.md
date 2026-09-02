# 🟦 SESSION 4
# **Applying CSS to Your Website**

Welcome back! In the previous sessions you built HTML pages for the Student Club Website — but they look plain: black text on a white background, no colours, no spacing, no personality. Today we fix that. You will learn **CSS**, the language that paints and decorates your HTML skeleton. By the end of this session every page of your Student Club Website will have colours, fonts, spacing, and a professional feel. Do not worry if you have never seen CSS before — we will walk through every single line together.

---

# 📌 SESSION INFORMATION

```
📅 Duration:     3 periods (150 minutes) — Theory ~60 min, Practice ~90 min
📚 Reference:    MDN "First Steps in CSS"; W3C CSS Specification
                 Course slides (Week 4)
🎯 Objectives:   1. Explain what CSS is and why it is separate from HTML
                 2. Link an external CSS file to any HTML page using <link>
                 3. Write CSS rules using tag, class, and ID selectors
                 4. Apply colour, background, font-size, margin, and padding
                 5. Describe the four layers of the CSS box model
                 6. Predict which rule wins when two rules conflict (specificity)
📖 Prepare:      1. Complete Sessions 1-3 (you need working HTML pages)
                 2. Have Dreamweaver or VS Code open with your site folder
                 3. Make sure your site has a css/ subfolder
🖼 Diagrams:     canvases/buoi-04.canvas.tsx — RuleAnatomy, BoxModelDiagram, SpecificityScale
🔗 Outcomes:     CLO1 (master basic web design and build skills)
                 CLO4 (design and build a web application)
```

---

# 🎯 LEARNING OBJECTIVES

By the end of this session you will be able to:

- Define CSS and explain its role alongside HTML
- Create an external stylesheet file (`style.css`) and link it to HTML
- Write CSS rules using **element selectors**, **class selectors**, and **ID selectors**
- Change colours using names, hex codes, and RGB values
- Control fonts with `font-family`, `font-size`, `font-weight`, and `line-height`
- Add spacing with `margin` and `padding`
- Describe the **box model**: content → padding → border → margin
- Understand **specificity** so you can predict which style wins when rules clash

---

# 📖 THEORY

## 1. What Is CSS?

### 1.1 Definition

**CSS** stands for **Cascading Style Sheets**. It is a language that tells the browser *how* HTML elements should **look**. HTML provides the structure and content; CSS provides the visual presentation.

Think of building a house:
- **HTML** = bricks, walls, rooms (the structure)
- **CSS** = paint, wallpaper, furniture arrangement (the appearance)

You never put paint inside a brick. Similarly, you should keep styling out of your HTML as much as possible.

### 🎒 Real-life Example

Imagine you manage 10 web pages for the Student Club. Without CSS, changing the heading colour means editing all 10 files. With one external CSS file, you change the colour **once** and all 10 pages update instantly. That is the power of separating style from structure.

### 1.2 Why It Matters

- **Separation of concerns** — HTML handles meaning; CSS handles looks. This makes both easier to maintain.
- **Consistency** — One stylesheet gives every page the same look.
- **Efficiency** — Change one file instead of dozens.
- **Accessibility** — Screen readers ignore CSS, so your content remains accessible regardless of styling.

### Three Ways to Add CSS

There are three ways to apply CSS. You must know all three, but you will use **external** almost exclusively.

#### Method 1: Inline CSS (on the element itself)

```html
<p style="color: red; font-size: 18px;">This text is red.</p>
```

- Applied directly via the `style` attribute
- Only affects that one element
- Cannot be reused
- Very hard to maintain on a multi-page site

> ⚠️ **Avoid inline styles in production.** They defeat the purpose of CSS. Use only for quick debugging.

#### Method 2: Internal CSS (inside `<head>` of one page)

```html
<head>
    <style>
        p {
            color: red;
            font-size: 18px;
        }
    </style>
</head>
```

- Affects only the current page
- Useful for single-page experiments
- If you have 10 pages, you must copy the `<style>` block into each one

#### Method 3: External CSS (separate `.css` file) ✅ BEST

```html
<head>
    <link rel="stylesheet" href="css/style.css">
</head>
```

- One file controls the entire website
- Change once → all pages update
- Browser caches the file → faster page loads
- **This is what we will use for the Student Club Website**

### 🔍 Comparison Table

| Feature | Inline | Internal | External |
|---------|--------|----------|----------|
| Where written | On the element | In `<head>` | Separate `.css` file |
| Scope | One element | One page | Entire site |
| Reusable? | No | No | Yes |
| Maintainable? | Terrible | Poor | Excellent |
| Recommended? | ❌ Only for debugging | ⚠️ Rarely | ✅ Always |

### ⚠️ Important Notes

- The `<link>` tag goes **inside** `<head>`, never in `<body>`.
- The `href` path is relative to the HTML file. If your HTML is in the root and CSS is in a `css/` folder, write `href="css/style.css"`.
- You can link **multiple** stylesheets. The last one loaded wins for conflicting rules.

### 🧪 Try It Yourself — Link a Stylesheet and Prove It Loaded

**Task (5 min):** Connect CSS to HTML and verify it, rather than hoping.

1. Create `css/style.css` containing one obvious rule:
   ```css
   body { background: #fffbe6; }
   ```
2. In `index.html`, inside `<head>`:
   ```html
   <link rel="stylesheet" href="css/style.css">
   ```
3. Reload. If the background is not pale yellow, open F12 → **Network** and reload again.
4. Find the `style.css` row and read its status code.

**Expected result:** A pale yellow page and a `200` status. A `404` means the path is wrong — and the page will look completely unstyled, not partly styled.

<details>
<summary>Why an obvious first rule is worth it</summary>

`background: #fffbe6` is a deliberate smoke test: a change so visible you cannot miss it. If it does not appear, you know the problem is the *connection*, not your CSS.

That distinction saves real time. Students often spend twenty minutes debugging a selector when the stylesheet was never loading. Confirm the link works first, then write the rules you actually want.

Keep the three ways to apply CSS straight: external (`<link>`, use this), internal (`<style>` in the head, fine for a one-off test), and inline (`style="..."`, avoid — it cannot be reused and beats almost everything in specificity).

</details>


---

## 2. CSS Syntax: Rules, Selectors, and Declarations

> 🖼 **Diagram:** `canvases/buoi-04.canvas.tsx` → `RuleAnatomy` — slide `s04-rule-anatomy` ("Anatomy of a CSS Rule")

### 2.1 Anatomy of a CSS Rule

Every CSS rule has two parts:

```
selector {
    property: value;
    property: value;
}
```

Concrete example:

```css
h1 {
    color: navy;
    font-size: 32px;
    text-align: center;
}
```

Let us break this down piece by piece:

- `h1` — the **selector**. It says "find every `<h1>` element on the page."
- `{ ... }` — the **declaration block**. Everything inside the curly braces applies to matched elements.
- `color: navy;` — a **declaration**. It has a **property** (`color`) and a **value** (`navy`), separated by a colon (`:`). Every declaration ends with a **semicolon** (`;`).
- `font-size: 32px;` — another declaration. Sets the font size to 32 pixels.
- `text-align: center;` — centres the text horizontally.

### ⚠️ Common Syntax Errors

```css
/* ❌ WRONG: missing semicolon */
h1 {
    color: navy
    font-size: 32px;
}

/* ✅ CORRECT: semicolons after every declaration */
h1 {
    color: navy;
    font-size: 32px;
}
```

```css
/* ❌ WRONG: colon replaced with equals sign */
h1 {
    color = navy;
}

/* ✅ CORRECT: colon separates property and value */
h1 {
    color: navy;
}
```

```css
/* ❌ WRONG: missing closing brace */
h1 {
    color: navy;


/* ✅ CORRECT: always close the brace */
h1 {
    color: navy;
}
```

---

## 3. CSS Selectors

Selectors tell CSS **which** elements to style. You will use three types constantly.

### 3.1 Element (Tag) Selector

Targets **every** element of that type.

```css
/* Targets ALL <p> elements on the page */
p {
    color: #333;
    line-height: 1.6;
}
```

Use when you want a global default for a tag.

### 3.2 Class Selector

Targets elements that have a specific `class` attribute. Uses a **dot** (`.`) prefix.

```css
/* Targets elements with class="highlight" */
.highlight {
    background-color: #ffffcc;
    padding: 2px 5px;
}
```

In HTML:

```html
<p>This is normal.</p>
<p class="highlight">This gets a yellow background.</p>
```

Key facts about classes:
- You can use the **same class on many elements**
- An element can have **multiple classes**: `class="highlight center-text"`
- Class names are case-sensitive

### 3.3 ID Selector

Targets the **one** element with a specific `id` attribute. Uses a **hash** (`#`) prefix.

```css
/* Targets the element with id="header" */
#header {
    background-color: #1a5276;
    color: white;
}
```

In HTML:

```html
<header id="header">
    <h1>Student Club</h1>
</header>
```

Key facts about IDs:
- Must be **unique** per page — only one element can have a given ID
- Higher specificity than classes (more on this later)
- Use sparingly; prefer classes for styling

### 3.4 Other Useful Selectors

| Selector | Syntax | Example | Meaning |
|----------|--------|---------|---------|
| Descendant | `A B` | `nav a` | Links **inside** `<nav>` |
| Group | `A, B` | `h1, h2, h3` | All three heading levels |
| Universal | `*` | `* { margin: 0; }` | Every element |
| Child | `A > B` | `ul > li` | Direct children only |
| Pseudo-class | `:state` | `a:hover` | When user hovers over a link |

### 🔍 Selector Comparison

| Type | Syntax | Reusable? | Specificity | Best For |
|------|--------|-----------|-------------|----------|
| Element | `p` | Yes (all `<p>`) | Low (0,0,1) | Global defaults |
| Class | `.name` | Yes (many elements) | Medium (0,1,0) | Component styling |
| ID | `#name` | No (unique) | High (1,0,0) | Page-level sections |

### ⚠️ Important Notes

- When you combine classes in HTML, write them space-separated: `class="btn btn-large"` — **not** `class="btn, btn-large"`.
- ID selectors are powerful but inflexible. Modern best practice favours classes for almost everything.
- The universal selector `*` matches everything. Use it carefully — it can slow rendering on huge pages.

### 🧪 Try It Yourself — Class vs. ID in Practice

**Task (6 min):** Learn which selector to reach for by using both wrongly first.

1. Mark up three event cards, all with the same `id`:
   ```html
   <div id="card">Workshop</div>
   <div id="card">Showcase</div>
   <div id="card">Guest talk</div>
   ```
   ```css
   #card { border: 1px solid #333; padding: 10px; }
   ```
2. Reload. All three appear styled, so it looks fine.
3. Now paste the page into the W3C HTML validator at validator.w3.org.
4. Change every `id="card"` to `class="card"` and the CSS to `.card`, then re-validate.

**Expected result:** The first version styles correctly but the validator reports duplicate IDs. The class version passes.

<details>
<summary>The distinction that matters</summary>

- `class` — a **group**. Reusable as many times per page as you like. This is what you want for cards, buttons, nav items, and almost everything else.
- `id` — a **single** element. Unique per page. Used for jump links (`href="#contact"`), for `<label for="...">`, and as a JavaScript handle.

CSS does not enforce uniqueness, which is why the broken version still looked right. What breaks is everything that assumes an id is unique: in-page anchors jump to the first match only, `label for` focuses the wrong field, and `document.getElementById` returns just one element.

Rule of thumb: reach for `class` by default; use `id` only when something genuinely needs to be addressed on its own.

</details>


---

## 4. Colours in CSS

### 4.1 Named Colours

CSS recognises 148 colour names:

```css
color: red;
color: navy;
color: darkgreen;
color: tomato;
color: steelblue;
```

Named colours are easy to read but limited. For precise brand colours, use hex or RGB.

### 4.2 Hexadecimal (Hex) Colours

Hex colours start with `#` followed by six hex digits (RRGGBB):

```css
color: #ff0000;   /* pure red */
color: #000080;   /* navy */
color: #333333;   /* dark gray */
color: #f0f4f8;   /* very light blue-gray */
```

Each pair represents Red, Green, Blue intensity from `00` (none) to `ff` (maximum):

```
#ff0000  →  Red=255, Green=0,   Blue=0   → pure red
#00ff00  →  Red=0,   Green=255, Blue=0   → pure green
#0000ff  →  Red=0,   Green=0,   Blue=255 → pure blue
#ffffff  →  Red=255, Green=255, Blue=255 → white
#000000  →  Red=0,   Green=0,   Blue=0   → black
```

Shorthand: When each pair has identical digits, you can abbreviate:

```css
#ff0000  →  #f00
#336699  →  #369
#aabbcc  →  #abc
```

### 4.3 RGB and RGBA

```css
color: rgb(255, 0, 0);          /* red */
color: rgb(0, 0, 128);          /* navy */
color: rgba(255, 0, 0, 0.5);   /* red at 50% opacity */
```

The fourth value in `rgba()` is **alpha** (transparency), from `0` (invisible) to `1` (fully opaque).

### 🎒 Real-life Example

The Student Club Website uses this palette:

```css
/* Primary dark blue  */ #1a5276
/* Secondary blue     */ #2874a6
/* Light background   */ #f0f4f8
/* Body text          */ #333333
/* White              */ #ffffff
```

Pick your palette early and stick with it. Consistent colours make a site look professional.

### ⚠️ Important Notes

- Always check **colour contrast** for accessibility. Light grey text on white is unreadable.
- Hex is the most common format in professional CSS. Learn it first.
- Use a colour picker tool (built into browser DevTools) to find exact values.

---

## 5. Font Properties

### 5.1 font-family

Specifies which typeface to use. Always provide a **font stack** (fallback list):

```css
body {
    font-family: "Segoe UI", Arial, Helvetica, sans-serif;
}
```

How fallbacks work:
1. Browser tries "Segoe UI"
2. If not available, tries Arial
3. Then Helvetica
4. Finally falls back to the generic `sans-serif` family

> ⚠️ Font names with spaces must be quoted: `"Segoe UI"`. Single-word names like `Arial` do not need quotes.

Generic families (always include one as the last fallback):
- `serif` — Times New Roman, Georgia
- `sans-serif` — Arial, Verdana, Segoe UI
- `monospace` — Courier New, Consolas

### 5.2 font-size

```css
h1 { font-size: 36px; }
p  { font-size: 16px; }
small { font-size: 13px; }
```

Common units:
- `px` — pixels (fixed, most common for beginners)
- `em` — relative to parent element's font size
- `rem` — relative to root (`<html>`) font size
- `%` — percentage of parent font size

For now, use `px`. We will explore relative units in later sessions.

### 5.3 font-weight and line-height

```css
h1 {
    font-weight: bold;     /* or: normal, lighter, 100-900 */
    line-height: 1.6;      /* unitless multiplier */
}
```

`line-height` without units is a multiplier: `1.6` means "1.6 times the font size." This gives comfortable reading spacing.

### ✅ Best Practices for Fonts

- Set a base `font-size` on `body` (usually `16px`)
- Use a clear font stack with at least 3 fonts + a generic family
- Use `line-height: 1.5` to `1.8` for body text
- Limit yourself to 2–3 different font sizes per page
- Avoid using more than 2 font families

---

## 6. The Box Model

> 🖼 **Diagram:** `canvases/buoi-04.canvas.tsx` → `BoxModelDiagram` — slide `s04-box-model` ("The Box Model")

### 6.1 Definition

**Every** HTML element is treated by the browser as a rectangular box. This box has four layers, from inside to outside:

```
+-------------------------------------------------------+
|  MARGIN                                               |
|  (transparent space OUTSIDE the border)               |
|  +---------------------------------------------------+|
|  |  BORDER                                           ||
|  |  (visible edge, can have colour and thickness)    ||
|  |  +-----------------------------------------------+||
|  |  |  PADDING                                      |||
|  |  |  (space BETWEEN border and content)           |||
|  |  |  +-------------------------------------------+|||
|  |  |  |  CONTENT                                  ||||
|  |  |  |  (your text, image, etc.)                 ||||
|  |  |  |  width × height                           ||||
|  |  |  +-------------------------------------------+|||
|  |  +-----------------------------------------------+||
|  +---------------------------------------------------+|
+-------------------------------------------------------+
```

### 6.2 Each Layer Explained

**Content** — The actual stuff: text, images, child elements. You set its size with `width` and `height`.

**Padding** — Space between the content and the border. Padding is *inside* the box. It pushes content away from the edges.

```css
.box {
    padding: 20px;         /* 20px on all four sides */
}
```

**Border** — A visible line around the padding. You control its width, style, and colour.

```css
.box {
    border: 2px solid #333;   /* 2px wide, solid line, dark gray */
}
```

**Margin** — Space outside the border. Margin is *outside* the box. It pushes other elements away.

```css
.box {
    margin: 10px;             /* 10px on all four sides */
}
```

### 6.3 Shorthand Values

Padding and margin accept 1, 2, 3, or 4 values:

```css
/* 1 value: all sides */
padding: 20px;                    /* top right bottom left = 20px */

/* 2 values: vertical / horizontal */
padding: 10px 20px;               /* top+bottom=10px, left+right=20px */

/* 3 values: top / horizontal / bottom */
padding: 10px 20px 30px;          /* top=10, left+right=20, bottom=30 */

/* 4 values: top / right / bottom / left (clockwise!) */
padding: 10px 20px 30px 40px;     /* T=10, R=20, B=30, L=40 */
```

Remember the clock trick: **Top → Right → Bottom → Left** (clockwise from 12 o'clock).

### 6.4 box-sizing: border-box

By default (`box-sizing: content-box`), `width` sets only the content width. Padding and border are **added on top**:

```
Total width = width + left-padding + right-padding + left-border + right-border
```

This is confusing. A `300px` wide box with `20px` padding and `2px` border is actually **344px** wide!

The fix:

```css
* {
    box-sizing: border-box;
}
```

With `border-box`, `width` includes content + padding + border. A `300px` box stays `300px` no matter what padding or border you add. Content shrinks to fit.

> ⚠️ **Always put `box-sizing: border-box` in your CSS reset.** This prevents countless layout headaches.

### 🎒 Real-life Example

```css
.card {
    width: 300px;
    padding: 20px;
    border: 2px solid #ccc;
    margin: 15px;
}
```

With `border-box`: total rendered width = 300px. Content area = 300 − 40 − 4 = 256px.
Without `border-box`: total rendered width = 300 + 40 + 4 = 344px. 😱

### ⚠️ Important Notes

- Margins can **collapse**: when two vertical margins meet, only the larger one is used. This does NOT happen with padding.
- Zero values need no unit: `margin: 0;` is correct. `margin: 0px;` works but is unnecessary.
- Negative margins are allowed (they pull elements closer). Negative padding is **not** allowed.

### 🧪 Try It Yourself — See the Box Model Bite

**Task (6 min):** Measure why a 300px box is not 300px wide.

1. Style a card:
   ```css
   .card {
       width: 300px;
       padding: 20px;
       border: 5px solid #333;
       background: #f4f4f4;
   }
   ```
2. Reload, inspect `.card` in F12, and scroll to the **box model diagram** at the bottom of the Styles pane.
3. Read the total width. Then add one line and reload:
   ```css
   .card { box-sizing: border-box; }
   ```

**Expected result:** First measurement is 350px total (300 + 20 + 20 + 5 + 5). After `border-box`, the element is exactly 300px and the padding is taken out of the inside.

<details>
<summary>Why every real stylesheet starts with this</summary>

The default `content-box` means `width` describes only the content area; padding and border are added on top. That makes percentage layouts almost impossible to reason about — a `width: 50%` column with padding is wider than half the container and wraps.

So put this at the top of `style.css` and stop thinking about it:

```css
*, *::before, *::after { box-sizing: border-box; }
```

Now `width` means the total visible width, which is what you meant in the first place. Margin still sits outside the box in both models.

</details>


---

## 7. Specificity: Which Rule Wins?

> 🖼 **Diagram:** `canvases/buoi-04.canvas.tsx` → `SpecificityScale` — slide `s04-specificity` ("Specificity")

### 7.1 Definition

When two CSS rules target the same element and set the same property, the browser uses **specificity** to decide which wins.

Specificity is calculated as a three-part score: **(IDs, Classes, Elements)**.

| Selector | Specificity | Score |
|----------|-------------|-------|
| `p` | 0 IDs, 0 classes, 1 element | (0,0,1) |
| `.highlight` | 0 IDs, 1 class, 0 elements | (0,1,0) |
| `#header` | 1 ID, 0 classes, 0 elements | (1,0,0) |
| `nav ul li a` | 0 IDs, 0 classes, 4 elements | (0,0,4) |
| `nav .active` | 0 IDs, 1 class, 1 element | (0,1,1) |
| `#nav .active` | 1 ID, 1 class, 0 elements | (1,1,0) |

Higher score wins. Compare left-to-right: IDs beat classes, classes beat elements.

### 7.2 Examples

```css
/* Specificity: (0,0,1) */
p {
    color: black;
}

/* Specificity: (0,1,0) — WINS because class > element */
.intro {
    color: navy;
}
```

If a `<p>` has `class="intro"`, it will be **navy**, not black.

```css
/* Specificity: (0,1,0) */
.title {
    color: blue;
}

/* Specificity: (1,0,0) — WINS because ID > class */
#page-title {
    color: red;
}
```

If `<h1 id="page-title" class="title">`, the colour will be **red**.

### ⚠️ Important Notes

- Inline styles (`style="..."`) beat everything except `!important`. Avoid both.
- `!important` overrides all specificity. **Never use it** unless you absolutely must override third-party CSS.
- When specificity is equal, the **last rule in the file** wins.
- Specificity is the #1 source of "why isn't my CSS working?" bugs. Learn it well.

---

## ✅ Best Practices

1. **Always use external stylesheets.** One `css/style.css` for the whole site.
2. **Start with a CSS reset:**
   ```css
   * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
   }
   ```
3. **Prefer classes over IDs** for styling. Reserve IDs for JavaScript hooks or unique landmarks.
4. **Use meaningful class names:** `.event-card`, `.nav-link`, `.sidebar-title` — not `.box1`, `.red`, `.big`.
5. **Comment your CSS** to organise sections:
   ```css
   /* === HEADER === */
   /* === NAVIGATION === */
   /* === MAIN CONTENT === */
   ```
6. **Set base styles on `body`** (font, colour, background) so everything inherits.
7. **Test in the browser after every change.** Press F12 to preview.

---

## ❌ Common Mistakes

### Mistake 1: Forgetting to link the CSS file

```html
<!-- ❌ WRONG: no <link> tag → no styles applied -->
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
```

```html
<!-- ✅ CORRECT: <link> inside <head> -->
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
    <link rel="stylesheet" href="css/style.css">
</head>
```

### Mistake 2: Wrong selector syntax

```css
/* ❌ WRONG: using # for a class */
#highlight { background: yellow; }
/* HTML: <p class="highlight"> → won't match! */
```

```css
/* ✅ CORRECT: dot for class, hash for ID */
.highlight { background: yellow; }
/* HTML: <p class="highlight"> → matches! */
```

### Mistake 3: Missing semicolons

```css
/* ❌ WRONG: missing semicolon after color */
h2 {
    color: navy
    font-size: 24px;
}
```

```css
/* ✅ CORRECT */
h2 {
    color: navy;
    font-size: 24px;
}
```

### Mistake 4: Confusing margin and padding

```css
/* ❌ THINKING: "I want space INSIDE the box" but using margin */
.box {
    margin: 20px;  /* This adds space OUTSIDE */
}
```

```css
/* ✅ CORRECT: padding for internal space */
.box {
    padding: 20px;  /* Space INSIDE, between border and content */
}
```

### Mistake 5: Not using a CSS reset

Without a reset, browsers apply their own default margins and paddings. Your `<h1>` might have `margin-top: 21px` in Chrome but `margin-top: 0.67em` in Firefox. Start every stylesheet with:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

### 🧪 Try It Yourself — Win a Specificity Fight

**Task (7 min):** Make a rule lose, then make it win — without `!important`.

1. Set up a conflict:
   ```html
   <p id="intro" class="lead">Welcome to the Student Web Club.</p>
   ```
   ```css
   p              { color: black; }
   .lead          { color: blue; }
   #intro         { color: green; }
   ```
2. Reload. The text is green.
3. Comment out the `#intro` rule and reload. Now blue.
4. Comment out `.lead` too. Now black.
5. Put all three back, then inspect the paragraph in F12 → **Styles**.

**Expected result:** The Styles pane lists all three rules with the winner on top and the losers struck through. Removing the winner promotes the next one.

<details>
<summary>How to count specificity</summary>

Score each selector as three numbers — (ids, classes, elements):

| Selector | Score | Wins against |
|---|---|---|
| `p` | 0,0,1 | nothing |
| `.lead` | 0,1,0 | any number of element selectors |
| `p.lead` | 0,1,1 | `.lead` alone |
| `#intro` | 1,0,0 | any number of classes |

Compare left to right: one id beats any number of classes, and one class beats any number of elements. Ties go to whichever rule comes **last** in the stylesheet.

`!important` overrides all of it — which is why it should be a last resort. It removes your ability to override the rule later, and the usual outcome is a stylesheet where every rule needs `!important` to compete.

</details>


---

# 📋 THEORY SUMMARY

| Concept | Definition | Example |
|---------|-----------|---------|
| CSS | Language controlling visual appearance of HTML | `h1 { color: navy; }` |
| External stylesheet | Separate `.css` file linked to HTML | `<link rel="stylesheet" href="css/style.css">` |
| Element selector | Targets all elements of a tag type | `p { ... }` |
| Class selector | Targets elements with a specific class | `.highlight { ... }` |
| ID selector | Targets one element with a specific ID | `#header { ... }` |
| Hex colour | Six-digit colour code in RRGGBB format | `#1a5276` |
| Font stack | Ordered list of fallback fonts | `"Segoe UI", Arial, sans-serif` |
| Box model | Four layers: content, padding, border, margin | Every element is a box |
| `box-sizing: border-box` | Width includes padding + border | Prevents unexpected sizing |
| Specificity | Scoring system determining which rule wins | ID (1,0,0) > class (0,1,0) > element (0,0,1) |

---

# 💡 WORKED EXAMPLES

## Example 1: Linking a Stylesheet to index.html

**Situation:** You have created `index.html` and an empty `css/style.css`. You need to connect them.

**Code (in index.html):**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Club - Home</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Student Club</h1>
        <p>Learn. Create. Connect.</p>
    </header>
</body>
</html>
```

**Line-by-line explanation:**

- Line 5: `<link rel="stylesheet" href="css/style.css">` tells the browser: "Load the file at `css/style.css` and treat it as a stylesheet."
- `rel="stylesheet"` specifies the relationship — this file is a CSS stylesheet.
- `href="css/style.css"` is the path. Since `index.html` is in the root folder, `css/style.css` means "go into the `css` subfolder and find `style.css`."
- This tag MUST be inside `<head>`. Placing it in `<body>` may cause a flash of unstyled content.

**Result:** When you open `index.html` in the browser, any CSS rules in `css/style.css` will be applied. If the file is empty, nothing changes visually. If the path is wrong, the browser console shows a 404 error.

---

## Example 2: Styling the Header

**Situation:** You want the header to have a dark blue background with white centred text.

**Code (in css/style.css):**

```css
/* === HEADER STYLES === */
header {
    background-color: #1a5276;
    color: white;
    text-align: center;
    padding: 30px 20px;
}

header h1 {
    font-size: 36px;
    margin-bottom: 10px;
    letter-spacing: 1px;
}

header p {
    font-size: 18px;
    opacity: 0.9;
}
```

**Line-by-line explanation:**

- `header { ... }` — targets the `<header>` element.
- `background-color: #1a5276;` — sets a dark blue background.
- `color: white;` — makes ALL text inside the header white. The `color` property is inherited by child elements.
- `text-align: center;` — centres all inline content horizontally.
- `padding: 30px 20px;` — 30px top/bottom, 20px left/right. This creates breathing room inside the header.
- `header h1 { ... }` — descendant selector. Targets only `<h1>` elements that are **inside** a `<header>`. Other `<h1>` elements elsewhere are unaffected.
- `letter-spacing: 1px;` — adds 1px between each character for a refined look.
- `opacity: 0.9;` — makes the subtitle slightly transparent, creating visual hierarchy.

**Result:** The header appears as a full-width dark blue bar with white centred text. The title is large; the tagline is slightly smaller and softer.

---

## Example 3: Understanding the Box Model

**Situation:** You create a card component and need to understand its actual size.

**Code:**

```css
.card {
    width: 300px;
    padding: 20px;
    border: 3px solid #2874a6;
    margin: 15px;
    background-color: #f8f9fa;
}
```

**Line-by-line explanation:**

- `width: 300px;` — sets the box width. But what does "300px" include?
- `padding: 20px;` — 20px of inner space on all four sides.
- `border: 3px solid #2874a6;` — 3px border on all sides.
- `margin: 15px;` — 15px of outer space on all sides.

**Calculating actual size WITH `box-sizing: border-box` (recommended):**
- Total width = 300px (width already includes padding + border)
- Content area = 300 − 20 − 20 − 3 − 3 = 254px
- Total space taken = 300 + 15 + 15 = 330px (box + margins)

**Calculating actual size WITHOUT `box-sizing: border-box` (default):**
- Total width = 300 + 20 + 20 + 3 + 3 = 346px 😬
- Total space taken = 346 + 15 + 15 = 376px

**Result:** With `border-box`, the card occupies exactly 300px of width (plus margins). Without it, the card is 46px wider than expected, potentially breaking your layout.

---

## Example 4: Specificity Showdown

**Situation:** Two rules target the same element. Which colour wins?

**Code:**

```css
/* Rule A — specificity (0,0,1) */
p {
    color: black;
}

/* Rule B — specificity (0,1,0) */
.intro {
    color: navy;
}

/* Rule C — specificity (0,1,1) */
p.intro {
    color: darkgreen;
}
```

HTML:

```html
<p class="intro">What colour am I?</p>
```

**Explanation:**

- Rule A matches (it is a `<p>`). Specificity: (0,0,1).
- Rule B matches (it has `class="intro"`). Specificity: (0,1,0). Beats Rule A.
- Rule C matches (it is a `<p>` AND has `class="intro"`). Specificity: (0,1,1). Beats both A and B.

**Result:** The text is **dark green** because `p.intro` has the highest specificity.

---

## Example 5: Creating Utility Classes

**Situation:** You need reusable classes for highlighting, centring, and status messages across multiple pages.

**Code (in css/style.css):**

```css
/* === UTILITY CLASSES === */
.highlight {
    background-color: #ffffcc;
    padding: 2px 5px;
}

.center-text {
    text-align: center;
}

.error {
    color: red;
    font-weight: bold;
}

.success {
    color: green;
    font-weight: bold;
}
```

HTML usage:

```html
<p>This is normal text.</p>
<p class="highlight">Important announcement!</p>
<p class="center-text">Centred paragraph.</p>
<p class="highlight center-text">Both highlighted AND centred.</p>
<p class="error">Something went wrong.</p>
<p class="success">Operation completed!</p>
```

**Line-by-line explanation:**

- `.highlight` — adds a pale yellow background with tiny padding. Use for callouts.
- `.center-text` — centres text. Combine with other classes freely.
- `.error` and `.success` — semantic status classes. The class name describes meaning, not appearance.
- Multiple classes are space-separated in HTML: `class="highlight center-text"`. Both sets of styles apply.

**Result:** You have a small library of reusable classes that work on any element, on any page, because they are defined in the shared stylesheet.

---

# 🛠️ HANDS-ON PRACTICE

## Setup

Before starting the tasks, make sure your project folder looks like this:

```
student-club/
├── index.html
├── about.html
├── events.html
├── gallery.html
├── contact.html
├── css/
│   └── style.css          ← create this if it doesn't exist
└── images/
    └── (your images)
```

1. Open your code editor (Dreamweaver or VS Code).
2. Open your site folder.
3. Inside the `css/` folder, create (or open) `style.css`.
4. Make sure every HTML file has this line inside `<head>`:
   ```html
   <link rel="stylesheet" href="css/style.css">
   ```

---

### TASK 1: CSS Reset and Base Styles

🎯 **Goal:** Normalise browser defaults and set base typography.

📝 **Requirements:**
- Write a universal reset that removes default margins and paddings and enables `border-box`.
- Set base font, size, line-height, text colour, and background colour on `body`.

**Steps:**

1. Open `css/style.css`.
2. At the very top, add:
   ```css
   /* === RESET === */
   * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
   }
   ```
3. Below the reset, add:
   ```css
   /* === BASE STYLES === */
   body {
       font-family: "Segoe UI", Arial, Helvetica, sans-serif;
       font-size: 16px;
       line-height: 1.6;
       color: #333;
       background-color: #f0f4f8;
   }
   ```
4. Save the file.
5. Open `index.html` in the browser (F12). Verify:
   - Background is light blue-grey
   - Text is dark grey, readable
   - No unexpected margins around headings

✅ **Expected result:** The page background changes from white to `#f0f4f8`. All text uses Segoe UI (or Arial fallback) at 16px with comfortable line spacing.

📁 **File to save:** `css/style.css`

---

### TASK 2: Style the Header and Navigation

🎯 **Goal:** Give the header a branded look and turn the navigation list into a horizontal menu bar.

📝 **Requirements:**
- Dark blue header with white centred text
- Horizontal navigation bar with hover effects

**Steps:**

1. In `css/style.css`, add:
   ```css
   /* === HEADER === */
   header {
       background-color: #1a5276;
       color: white;
       text-align: center;
       padding: 30px 20px;
   }

   header h1 {
       font-size: 36px;
       margin-bottom: 10px;
       letter-spacing: 1px;
   }

   header p {
       font-size: 18px;
       opacity: 0.9;
   }
   ```
2. Add navigation styles:
   ```css
   /* === NAVIGATION === */
   nav {
       background-color: #2874a6;
       text-align: center;
   }

   nav ul {
       list-style: none;
       margin: 0;
       padding: 0;
   }

   nav ul li {
       display: inline-block;
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
3. Save. Preview in browser.

✅ **Expected result:**
- Header is a dark blue banner with white title and tagline.
- Navigation links appear horizontally in a medium blue bar.
- Hovering over a link smoothly transitions to darker blue.
- Bullet points are removed from the navigation list.

📁 **File to save:** `css/style.css`

---

### TASK 3: Style Main Content and Footer

🎯 **Goal:** Create a clean, centred content area with styled headings, and a matching footer.

📝 **Requirements:**
- Centred content container with max-width, white background, rounded corners, and subtle shadow
- Styled h2/h3 headings with colour accents
- Dark footer matching the header

**Steps:**

1. Add main content styles:
   ```css
   /* === MAIN CONTENT === */
   main {
       max-width: 900px;
       margin: 30px auto;
       padding: 30px;
       background-color: white;
       border-radius: 8px;
       box-shadow: 0 2px 10px rgba(0,0,0,0.1);
   }

   main h2 {
       color: #1a5276;
       font-size: 28px;
       border-bottom: 3px solid #2874a6;
       padding-bottom: 8px;
       margin-bottom: 20px;
   }

   main h3 {
       color: #2874a6;
       font-size: 22px;
       margin-top: 25px;
       margin-bottom: 10px;
   }

   main p {
       margin-bottom: 15px;
   }

   main ul, main ol {
       margin-left: 25px;
       margin-bottom: 15px;
   }

   main li {
       margin-bottom: 8px;
   }
   ```
2. Add footer styles:
   ```css
   /* === FOOTER === */
   footer {
       background-color: #1a5276;
       color: white;
       text-align: center;
       padding: 20px;
       margin-top: 40px;
   }

   footer a {
       color: #85c1e9;
       text-decoration: none;
   }

   footer a:hover {
       text-decoration: underline;
   }
   ```
3. Save. Preview all pages.

✅ **Expected result:**
- Main content appears as a white card centred on the page with a soft shadow.
- H2 headings have a blue underline accent.
- Lists are properly indented.
- Footer matches the header colour scheme.
- All pages share the same look because they use the same stylesheet.

📁 **File to save:** `css/style.css`

---

### TASK 4: Add Utility Classes and Test Across Pages

🎯 **Goal:** Create reusable utility classes and verify they work on every page.

📝 **Requirements:**
- Add `.highlight`, `.center-text`, `.error`, `.success` classes
- Use at least two of them on each page
- Verify consistent appearance across all five pages

**Steps:**

1. Add utility classes to `css/style.css`:
   ```css
   /* === UTILITY CLASSES === */
   .highlight {
       background-color: #ffffcc;
       padding: 2px 5px;
   }

   .center-text {
       text-align: center;
   }

   .error {
       color: red;
       font-weight: bold;
   }

   .success {
       color: green;
       font-weight: bold;
   }
   ```
2. In `index.html`, add a highlighted paragraph:
   ```html
   <p class="highlight">New members are always welcome!</p>
   ```
3. In `about.html`, centre a caption:
   ```html
   <p class="center-text">Our team at the 2023 orientation.</p>
   ```
4. Open every page in the browser and verify the utility classes render correctly.

✅ **Expected result:** Highlighted text has a yellow background on every page where it appears. Centred text is centred everywhere. Styles are consistent because they come from one shared CSS file.

📁 **Files to save:** `css/style.css`, `index.html`, `about.html`

---

# 🐛 COMMON ERRORS — WHAT THE BROWSER SHOWS YOU

"My CSS is not working" is almost always one of six things. This table is ordered by how often each one is the culprit.

| Symptom you see | Likely cause | How to confirm | Fix |
|---|---|---|---|
| No styling at all — the page looks like plain HTML | The `<link>` path is wrong | F12 → Network tab shows 404 on `style.css` | Fix the `href`, usually `css/style.css` |
| One rule is ignored while the rest apply | A more specific selector is winning | Inspect the element; DevTools strikes through the losing rule | Raise specificity, or reorder — do not reach for `!important` |
| A rule after another rule does nothing | The earlier declaration is `!important` | DevTools shows `!important` on the winning rule | Remove the `!important` and fix the specificity properly |
| Nothing after a certain point in the file applies | A missing `}` swallowed the rest of the stylesheet | Run the W3C CSS validator, or watch the syntax highlighting break | Add the missing brace |
| One property in a working rule is skipped | Missing semicolon on the line before it | DevTools shows the property crossed out or absent | Add the `;` |
| `width: 300px` renders wider than 300px | Padding and border add to the width in the default box model | Inspect the element and read the box model diagram | Set `box-sizing: border-box` |
| `margin-top` on a child pushes the parent down | Margin collapsing between parent and child | Inspect: the parent's top edge has moved | Use `padding` on the parent, or set `overflow: auto` |
| Class does nothing at all | `.` missing in the CSS, or `class=` misspelled in the HTML | DevTools Styles pane shows no matching rule | Check both spellings and that `.` prefixes the class in CSS |
| Colour value ignored | Missing `#`, or an invalid name | DevTools shows the value as invalid | Use `#RRGGBB` or a valid CSS colour keyword |

**Read the Styles pane, do not guess.** Select the element in DevTools and look at the right-hand panel. Winning rules are on top; overridden declarations have a line through them. That panel answers "why is my CSS not working" faster than re-reading the stylesheet.

---


# ✅ SELF-CHECK QUESTIONS

Answer these from memory first, then expand the answer to check yourself.

**Q1. Name the three ways to apply CSS and say which one you should use.**

<details>
<summary>Answer</summary>

1. **Inline** — `style="color: red"` on the element. Highest specificity, unreusable, hardest to maintain.
2. **Internal** — a `<style>` block in `<head>`. Applies to one page only.
3. **External** — a separate `.css` file linked with `<link rel="stylesheet" href="css/style.css">`.

Use **external**. One file styles every page, the browser caches it, and one edit updates the whole site.

</details>

---

**Q2. What are the four parts of the box model, from inside out?**

<details>
<summary>Answer</summary>

**Content** (the text or image) → **padding** (space inside the border, takes the background colour) → **border** → **margin** (transparent space outside, separating this element from its neighbours). Padding grows the visible box; margin pushes other boxes away.

</details>

---

**Q3. What does `box-sizing: border-box` change, and why is it usually what you want?**

<details>
<summary>Answer</summary>

By default (`content-box`), `width: 300px` plus `padding: 20px` plus `border: 5px` renders 350px wide, because padding and border are added on top. With `border-box`, `width: 300px` is the **final** rendered width, and padding and border are absorbed inside it. That matches how people naturally think about sizing, so most projects start with `* { box-sizing: border-box; }`.

</details>

---

**Q4. Given `p { color: blue; }`, `.intro { color: green; }`, and `#lead { color: red; }` all matching one paragraph, which colour wins and why?**

<details>
<summary>Answer</summary>

**Red.** Specificity ranks ID (`#lead`) above class (`.intro`) above element (`p`), regardless of the order they appear in the stylesheet. Source order only breaks ties between selectors of equal specificity.

</details>

---

**Q5. What is the difference between a class and an ID, and when do you use each?**

<details>
<summary>Answer</summary>

A **class** (`.card`) can be reused on any number of elements — use it for anything repeated. An **ID** (`#main-nav`) must be unique on the page — use it for a single landmark or as a link anchor target. For styling, prefer classes: IDs have such high specificity that overriding them later usually forces `!important`.

</details>

---

**Q6. Why does `margin: 0 auto` centre a block element, and what else does it need?**

<details>
<summary>Answer</summary>

`auto` tells the browser to split the leftover horizontal space equally between the left and right margins, which centres the box. It only works if the element has a **constrained width** (e.g. `max-width: 1200px`) — a block element at full width has no leftover space to distribute — and it only centres the box itself, not the text inside it (that is `text-align: center`).

</details>

---

**Q7. What does "cascade" actually mean in Cascading Style Sheets?**

<details>
<summary>Answer</summary>

Multiple rules can target the same element, and the browser resolves the conflict by cascading through, in order: **importance** (`!important`), then **specificity** (ID > class > element), then **source order** (later wins). Inherited properties like `color` and `font-family` also cascade down from parent to child unless overridden.

</details>

---

**Q8. Why should you avoid `!important`?**

<details>
<summary>Answer</summary>

It overrides the entire specificity system, so the only way to beat one `!important` is another `!important`. Codebases that lean on it quickly become unmaintainable, because a rule's effect no longer follows from reading the selectors. Fix the underlying specificity instead — usually by using a class rather than an ID, or making the selector slightly more specific.

</details>

---


# 📝 SELF-ASSESSMENT WORKSHEET

| # | I can... | Yes | No |
|---|----------|-----|----|
| 1 | Explain the difference between HTML and CSS | ☐ | ☐ |
| 2 | Link an external CSS file to an HTML page using `<link>` | ☐ | ☐ |
| 3 | Write a CSS rule with a selector, property, and value | ☐ | ☐ |
| 4 | Use element, class, and ID selectors correctly | ☐ | ☐ |
| 5 | Specify colours using hex codes | ☐ | ☐ |
| 6 | Describe the four layers of the box model (content, padding, border, margin) | ☐ | ☐ |
| 7 | Explain why `box-sizing: border-box` is important | ☐ | ☐ |
| 8 | Determine which CSS rule wins based on specificity | ☐ | ☐ |

> 💡 If you answered "No" to any item, re-read that section and redo the corresponding practice task before moving on.

---

# 🔗 FURTHER READING

- [What is CSS? — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS)
- [How CSS works — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/How_CSS_works)
- [CSS selectors — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors)
- [The box model — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)
- [CSS values and units — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)
- [Specificity — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
- [CSS colour values — W3C](https://www.w3.org/TR/css-color-4/)

---

# ⏭️ NEXT SESSION

In Session 5, you will use semantic HTML elements and Flexbox to build a proper two-column page layout with header, navigation, main content, sidebar, and footer — all within the Student Club Website.
