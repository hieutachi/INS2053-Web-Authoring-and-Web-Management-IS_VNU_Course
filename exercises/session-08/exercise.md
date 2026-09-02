# Session 8 — Midterm Practice Exam

> **Note:** This session is formatted as a practice exam, not a regular exercise. It covers topics from Sessions 1–7.

## Objective
- Practice the types of problems you will see on the midterm exam
- Test your knowledge of HTML structure, CSS selectors, and page layout
- Identify areas where you need more review before the real midterm

## Time Required
Estimated time: 60 minutes

---

## Problem 1: HTML Structure (15 minutes)

**Write a complete HTML page** that produces the following content when viewed in a browser:

```
Page title (in browser tab): "My Portfolio"

Visible on page:

        John's Portfolio
    Welcome to my personal portfolio site.

    About Me
    I am a second-year student studying Information Systems. 
    I enjoy web development and graphic design.

    My Skills
    • HTML & CSS
    • JavaScript basics
    • Dreamweaver
    • Photoshop

    Contact
    Email: john@student.edu.vn
    Phone: 0123-456-789
```

**Requirements:**
- Use proper HTML5 structure (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`)
- Use the correct heading level for each section title
- Use a list for the skills
- The page title in the browser tab should be "My Portfolio"

**Write your answer** in a new file called `portfolio.html`.

---

## Problem 2: CSS Selectors (15 minutes)

Given the following HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <title>CSS Practice</title>
    <link rel="stylesheet" href="practice.css">
</head>
<body>
    <h1 id="page-title">Welcome</h1>
    <p class="intro">This is the introduction.</p>
    <p>Normal paragraph text here.</p>
    <h2>Latest News</h2>
    <p class="highlight">Important announcement!</p>
    <p>Another normal paragraph.</p>
    <a href="about.html">About page</a>
</body>
</html>
```

**Write CSS rules** (in a file called `practice.css`) that do the following:

| Rule | Selector Type | Effect |
|------|--------------|--------|
| 1 | Tag selector | Make ALL `<p>` elements have `font-size: 16px` |
| 2 | ID selector | Make the `#page-title` have `color: darkblue` and `font-size: 32px` |
| 3 | Class selector | Make `.intro` paragraphs `font-style: italic` and `color: gray` |
| 4 | Class selector | Make `.highlight` paragraphs have `background-color: yellow` and `padding: 5px` |
| 5 | Tag selector | Make ALL `<a>` links `color: green` with `text-decoration: none` |
| 6 | Pseudo-class | Make links `text-decoration: underline` when hovered (`:hover`) |

---

## Problem 3: Page Layout with Semantic HTML (15 minutes)

**Write the HTML body content** (everything inside `<body>...</body>`) for a page that has this layout structure:

```
┌──────────────────────────────────────────┐
│  HEADER: Logo text "TechClub" + slogan   │
├──────────────────────────────────────────┤
│  NAV: Home | About | Events | Contact    │
├────────────────────────────┬─────────────┤
│                            │             │
│  MAIN:                     │  ASIDE:     │
│                            │             │
│  Section: "About Us"       │  "Follow    │
│  - one paragraph about     │   Us"       │
│     the club               │  - Facebook │
│                            │  - Twitter  │
│  Article: "Workshop"       │  - GitHub   │
│  - date + description      │             │
│                            │             │
├────────────────────────────┴─────────────┤
│  FOOTER: copyright + email               │
└──────────────────────────────────────────┘
```

**Requirements:**
- Use `<header>`, `<nav>`, `<main>`, `<aside>`, `<section>`, `<article>`, `<footer>`
- Navigation should use `<ul>` and `<li>` with `<a>` links
- Use realistic content (not "lorem ipsum")

---

## Problem 4: Relative Paths (15 minutes)

Given this folder structure:

```
my-site/
├── index.html
├── about.html
├── images/
│   ├── logo.png
│   └── banner.jpg
├── css/
│   └── style.css
└── pages/
    ├── events.html
    └── contact.html
```

**Answer the following questions.** Write the correct `href` or `src` value for each:

1. In `index.html`, how do you link to `about.html`?
   ```html
   <a href="_______">About</a>
   ```

2. In `index.html`, how do you show `images/logo.png`?
   ```html
   <img src="_______" alt="Logo">
   ```

3. In `index.html`, how do you link to `css/style.css`?
   ```html
   <link rel="stylesheet" href="_______">
   ```

4. In `pages/events.html`, how do you link back to `index.html`?
   ```html
   <a href="_______">Home</a>
   ```

5. In `pages/events.html`, how do you link to `pages/contact.html`?
   ```html
   <a href="_______">Contact</a>
   ```

6. In `pages/contact.html`, how do you show `images/banner.jpg`?
   ```html
   <img src="_______" alt="Banner">
   ```

7. In `pages/contact.html`, how do you link to `css/style.css`?
   ```html
   <link rel="stylesheet" href="_______">
   ```

---

## Bonus Challenge (if time allows)

Create a CSS rule for a navigation bar that looks like this:
- Dark background (#333)
- Links are white and side by side
- On hover, the background changes to #555 smoothly (using `transition`)
- The link for the current page has a blue bottom border (3px solid blue)

Write both the HTML (`<nav>` with `<ul>`) and the CSS.

---

## Self-Check (answers included)

Do all four problems first, then compare. Reading the answers before attempting
them turns a 60-minute diagnostic into 10 minutes of copying.

### Problem 1 — Sample Answer

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Portfolio</title>
</head>
<body>
    <h1>John's Portfolio</h1>
    <p>Welcome to my personal portfolio site.</p>

    <h2>About Me</h2>
    <p>I am a second-year student studying Information Systems. 
    I enjoy web development and graphic design.</p>

    <h2>My Skills</h2>
    <ul>
        <li>HTML &amp; CSS</li>
        <li>JavaScript basics</li>
        <li>Dreamweaver</li>
        <li>Photoshop</li>
    </ul>

    <h2>Contact</h2>
    <p>Email: john@student.edu.vn</p>
    <p>Phone: 0123-456-789</p>
</body>
</html>
```

### Problem 2 — Sample Answer

```css
/* Rule 1: Tag selector */
p {
    font-size: 16px;
}

/* Rule 2: ID selector */
#page-title {
    color: darkblue;
    font-size: 32px;
}

/* Rule 3: Class selector */
.intro {
    font-style: italic;
    color: gray;
}

/* Rule 4: Class selector */
.highlight {
    background-color: yellow;
    padding: 5px;
}

/* Rule 5: Tag selector */
a {
    color: green;
    text-decoration: none;
}

/* Rule 6: Pseudo-class */
a:hover {
    text-decoration: underline;
}
```

### Problem 4 — Answers

1. `href="about.html"`
2. `src="images/logo.png"`
3. `href="css/style.css"`
4. `href="../index.html"`
5. `href="contact.html"`
6. `src="../images/banner.jpg"`
7. `href="../css/style.css"`

---

## Checklist
- [ ] Completed Problem 1: Wrote a valid HTML5 page with headings, paragraphs, and lists
- [ ] Completed Problem 2: Wrote correct CSS for tag, class, ID, and pseudo-class selectors
- [ ] Completed Problem 3: Used semantic HTML5 elements in the correct order
- [ ] Completed Problem 4: Wrote correct relative paths for all 7 questions
- [ ] Checked your answers against the answer key
- [ ] Identified which topics you need to review more before the midterm

## Tips
- For the midterm, you will NOT be allowed to use the internet. Practice writing code from memory.
- Remember: every HTML page needs `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>`.
- ID selectors use `#` in CSS. Class selectors use `.` in CSS. Tag selectors use the tag name directly.
- When finding relative paths, ask yourself: "Do I need to go UP a folder? If yes, use `../`."
