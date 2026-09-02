# Session 4 — In-Class Exercise: Applying CSS to Your Website

## Objective
- Create and link an external CSS stylesheet to HTML pages
- Use tag selectors, class selectors, and ID selectors
- Apply common CSS properties: color, font-size, margin, padding, background-color

## Time Required
Estimated time: 55 minutes

## Instructions

### Task 1: Create an External CSS File and Link It
An **external CSS file** lets you style many pages from one place. This is the best way to apply CSS.

Open the `style.css` file inside the `club-website/css/` folder (created in Session 2). Add the following code:

```css
/* This is a CSS comment — the browser ignores it */

/* Style for ALL body elements */
body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #f5f5f5;
    color: #333333;
    margin: 0;
    padding: 0;
}

/* Style for ALL h1 elements */
h1 {
    color: #2c3e50;
    font-size: 28px;
}

/* Style for ALL h2 elements */
h2 {
    color: #2980b9;
    font-size: 22px;
}

/* Style for ALL paragraph elements */
p {
    font-size: 16px;
    line-height: 1.6;
}

/* Style for ALL links */
a {
    color: #2980b9;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
```

Now open `index.html` and add a `<link>` tag inside the `<head>` section to connect the CSS:

```html
<head>
    <title>Student Club - Home</title>
    <link rel="stylesheet" href="css/style.css">
</head>
```

- `rel="stylesheet"` tells the browser this file is a CSS stylesheet.
- `href="css/style.css"` is the relative path to the CSS file (from `index.html`, go into `css/` folder, then open `style.css`).

Save both files and preview `index.html` in the browser. You should see:
- A light gray background
- Dark text in Arial font
- Blue headings
- Blue links that get underlined when you hover over them

### Task 2: Tag Selectors, Class Selectors, and ID Selectors
There are three main types of CSS selectors:

**1. Tag selector** — styles ALL elements of that type:
```css
p {
    color: blue;   /* ALL paragraphs will be blue */
}
```

**2. Class selector** — styles elements with a specific class (use `.` before the name):
```css
.highlight {
    background-color: yellow;
    padding: 5px;
}
```
In HTML, use `class="highlight"`:
```html
<p class="highlight">This paragraph has a yellow background.</p>
<p>This paragraph does NOT have a yellow background.</p>
```

**3. ID selector** — styles ONE unique element (use `#` before the name):
```css
#main-title {
    color: red;
    font-size: 36px;
}
```
In HTML, use `id="main-title"`:
```html
<h1 id="main-title">This heading is red and 36px</h1>
```

**Practice**: Add the following CSS to `style.css`:

```css
/* Class: can be used on MANY elements */
.highlight {
    background-color: #ffffcc;
    padding: 8px;
    border-left: 4px solid #f1c40f;
}

.intro {
    font-size: 18px;
    color: #555555;
}

/* ID: should be used on only ONE element per page */
#main-banner {
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    text-align: center;
}
```

Now update `index.html` body to use these classes and ID:

```html
<body>
    <div id="main-banner">
        <h1>Welcome to the Student Technology Club</h1>
    </div>

    <p class="intro">We are a group of students who love technology and building things for the web.</p>

    <h2>News</h2>
    <p class="highlight">New workshop coming up! Learn JavaScript on March 20.</p>
    <p>Our regular meetings are every Friday at 3pm.</p>
</body>
```

Save and preview. The banner should be dark with white text, the intro text should be larger and gray, and the news highlight should have a yellow background with a gold left border.

### Task 3: Practice Margin and Padding
**Margin** is the space OUTSIDE the element's border.
**Padding** is the space INSIDE the element's border.

```
┌─────────── margin ──────────────┐
│  ┌──────── border ────────────┐ │
│  │  padding                   │ │
│  │  ┌──── content ─────┐     │ │
│  │  │  Hello World!    │     │ │
│  │  └──────────────────┘     │ │
│  └───────────────────────────┘ │
└────────────────────────────────┘
```

Add this CSS to `style.css`:

```css
/* A box with padding and margin */
.info-box {
    background-color: white;
    border: 1px solid #dddddd;
    padding: 15px;       /* Space inside the box */
    margin: 20px;        /* Space outside the box */
    border-radius: 5px;  /* Rounded corners */
}
```

Add this to `index.html`:

```html
    <div class="info-box">
        <h2>About Us</h2>
        <p>The Student Technology Club helps students learn web development, 
        programming, and design through hands-on workshops and projects.</p>
    </div>

    <div class="info-box">
        <h2>Join Us</h2>
        <p>Meetings are every Friday at 3pm in Room 204. Everyone is welcome!</p>
    </div>
```

Save and preview. You should see two white boxes with spacing between them and rounded corners.

### Task 4: Apply CSS to All Pages
Link `style.css` to every HTML page in your project:

- `index.html`: `<link rel="stylesheet" href="css/style.css">`
- `about.html`: `<link rel="stylesheet" href="css/style.css">`
- `pages/events.html`: `<link rel="stylesheet" href="../css/style.css">`
- `pages/contact.html`: `<link rel="stylesheet" href="../css/style.css">`

Notice the difference: for files inside the `pages/` folder, the path starts with `../css/` because you need to go **up one folder** first.

## Starter Files
- Use the `club-website` folder from Sessions 2 and 3.
- The `css/style.css` file was created (but left empty) in Session 2.

## Expected Result

```
┌──────────────────────────────────────────────────┐
│  [light gray background across entire page]      │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │  [dark blue banner]                      │    │
│  │  Welcome to the Student Technology Club  │    │
│  │  (white text, centered)                  │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  We are a group of students who love...          │
│  (larger gray text — class="intro")              │
│                                                  │
│  News                                            │
│  ┌──────────────────────────────────────────┐    │
│  │ | New workshop coming up!...             │    │
│  │ | (yellow highlight, gold left border)   │    │
│  └──────────────────────────────────────────┘    │
│  Our regular meetings are every Friday...        │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │  About Us                                │    │
│  │  The Student Technology Club helps...    │    │
│  │  (white box, padding inside, margin out) │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │  Join Us                                 │    │
│  │  Meetings are every Friday...            │    │
│  │  (another white box, spaced apart)       │    │
│  └──────────────────────────────────────────┘    │
└──────────────────────────────────────────────────┘
```

## Self-Check (answers included)

Answer from **your own `style.css`** first, then open the arrow.

<details>
<summary>1. When should you use a class and when an ID? Your page has three highlighted paragraphs and one banner.</summary>

Three highlighted paragraphs → a **class**. One banner → an **ID**.

| | Class | ID |
|---|---|---|
| Written in CSS | `.highlight` | `#main-banner` |
| Written in HTML | `class="highlight"` | `id="main-banner"` |
| How many per page | as many as you like | **one** |

An ID is a unique name for one element — it is also the target of a `#section`
link and of JavaScript later. Reusing the same ID on two elements is invalid
HTML; the page may still render, which is exactly why the mistake survives.

Rule of thumb: reach for a class by default. Use an ID only when the element is
genuinely one of a kind.

</details>

<details>
<summary>2. You added `<link rel="stylesheet" href="css/style.css">` to `pages/contact.html` and all styling disappeared. Why?</summary>

Wrong relative path. `contact.html` is inside `pages/`, so `css/style.css` means
`pages/css/style.css`, which does not exist.

```html
<link rel="stylesheet" href="../css/style.css">
```

You must climb out of `pages/` first with `../`, then go down into `css/`.

How to confirm in one move: open the page, press **F12**, look at the Console. A
missing stylesheet reports a 404 with the exact path the browser tried. That
message tells you where it looked, which is the fastest way to see your mistake.

</details>

<details>
<summary>3. Explain margin vs padding using the `.info-box` you built. Where does the background colour reach?</summary>

- **Padding** = space *inside* the border, between the border and the content.
- **Margin** = space *outside* the border, pushing other elements away.

The background colour fills the content **and the padding**, and stops at the
border. It never fills the margin — margin is always transparent.

That gives you a practical test: if you want more coloured space around your
text, increase `padding`. If you want more gap between two boxes, increase
`margin`.

Two boxes stacked with `margin: 20px` will usually sit **20px** apart, not 40px.
Vertical margins between siblings collapse into the larger of the two.

</details>

<details>
<summary>4. Challenge — no code given: make a `.warning` box with a red left border, pale red background, and comfortable inner space. Then apply it. Write it yourself first.</summary>

```css
.warning {
    background-color: #fdecea;
    border-left: 4px solid #c0392b;
    padding: 12px 15px;
    margin: 15px 0;
    border-radius: 4px;
}
```

```html
<p class="warning">Homework is due Sunday 23:59. Late work is not graded.</p>
```

Compare with your version:

1. `padding` for space **inside**, `margin` for space **outside** — both present.
2. `margin: 15px 0` = 15px top and bottom, 0 left and right, so the box still
   lines up with the text around it.
3. The class name says *what it is* (`warning`), not what it looks like
   (`red-box`). If the colour changes next semester, a name like `red-box`
   becomes a lie.

</details>

## Checklist
- [ ] Created and saved `css/style.css` with CSS rules
- [ ] Linked `style.css` in `index.html` using `<link>` tag
- [ ] Used a tag selector (e.g., `body`, `h1`, `p`)
- [ ] Used a class selector (e.g., `.highlight`) and applied it in HTML
- [ ] Used an ID selector (e.g., `#main-banner`) and applied it in HTML
- [ ] Applied `margin` and `padding` to at least one element
- [ ] Linked the same CSS file to all pages in the site
- [ ] Previewed all pages in the browser to confirm styles are applied

## Tips
- The `<link>` tag goes INSIDE `<head>`, not inside `<body>`.
- Class names and ID names are case-sensitive — `.highlight` in CSS must match `class="highlight"` in HTML exactly.
- Use **one ID per page** (an ID should be unique). You can use a class on as many elements as you want.
- CSS comments use `/* comment */` — different from HTML comments `<!-- comment -->`.
