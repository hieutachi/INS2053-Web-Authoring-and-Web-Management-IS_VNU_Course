---
marp: true
theme: default
paginate: true
---

# Session 1: Introduction to Dreamweaver CS6

**INS2053 — Web Authoring and Web Management**

*Your first web page, from empty folder to browser.*

Read: `ebook/01-introduction-to-dreamweaver.md`  ·  Practise: `exercises/session-01/exercise.md`  ·  Diagrams: `canvases/buoi-01.canvas.tsx`

---

## Learning Objectives

- Define website, webpage, HTML file, and web browser
- Identify the main parts of the Dreamweaver / VS Code workspace
- Create a proper project folder structure for a website
- Write, save, and preview your first HTML5 page
- Explain each part of the HTML5 boilerplate

---

## What Is a Website?

- A **website** = collection of linked web pages (HTML files)
- Each **webpage** = one `.html` file
- A **browser** downloads and displays those files

🎒 Think of a website like a **textbook**:
- Textbook = entire website
- Each chapter = one web page
- Table of contents = navigation menu

---

## How a Website Works

```
+------------------+       +----------------+       +------------------+
|  YOU (Author)    | ----> |  WEB SERVER    | ----> |  USER'S BROWSER  |
| Write HTML files |       | Stores & sends |       | Reads & displays |
+------------------+       +----------------+       +------------------+

Local testing (this course):
+------------------+       +------------------+
|  YOU (Author)    | ----> |  YOUR BROWSER    |
| Write + save     |       | Opens local file |
+------------------+       +------------------+
```

- Home page must always be named `index.html`

---

## HTML Files and Code Editors

- HTML = **HyperText Markup Language** (not a programming language)
- An HTML file is plain text with **tags** that describe content
- A **code editor** provides syntax highlighting, auto-complete, line numbers

🎒 An HTML file is like a **recipe card**: tags are the cooking instructions; the browser is the cook.

---

## Dreamweaver CS6 vs VS Code

| Feature | Dreamweaver CS6 | VS Code |
|---------|----------------|---------|
| Price | Paid | Free |
| Design View (WYSIWYG) | Yes | No (use Live Server) |
| Code editing | Good | Excellent |
| Extensions | Limited | Thousands |
| Industry usage today | Rare | Very common |

> You may use either editor. All code examples work identically.

---

## Dreamweaver Workspace Overview

```
+---------------------------------------------------------------+
|  Menu Bar                                                     |
+---------------------------------------------------------------+
|  [ Design | Split | Code ]   [ Title ]   [ Preview button ]   |
+---------------------+-----------------------------------------+
|  Files Panel        |   Document Window                       |
|  - index.html       |   (Design / Code / Split View)          |
|  - about.html       |                                         |
|  - images/          |                                         |
+---------------------+-----------------------------------------+
|  Properties Panel                                             |
+---------------------------------------------------------------+
```

---

## Project Folder Structure

```
StudentClubWebsite/
├── index.html          <-- Home page (required!)
├── about.html
├── events.html
├── contact.html
├── images/             <-- ALL images here
├── css/                <-- ALL stylesheets here
├── js/                 <-- ALL scripts here
└── documents/          <-- PDFs, downloads
```

- Create folders BEFORE writing code
- Use **lowercase**, **hyphens**, no spaces

---

## Live Code Example

Your first HTML5 page (`index.html`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Club - Home</title>
</head>
<body>
    <h1>Welcome to the Student Club</h1>
    <p>This is our official website.</p>
</body>
</html>
```

- `<!DOCTYPE html>` tells the browser "this is HTML5"
- `<head>` = metadata (invisible on page)
- `<body>` = visible content

---

## Common Mistakes

- ❌ Forgetting `<!DOCTYPE html>` → browser enters quirks mode
- ✅ Always start every page with the full HTML5 boilerplate
- ❌ Saving files as `My Page.html` (spaces break URLs)
- ✅ Use `my-page.html` or `index.html` (lowercase, hyphens)
- ❌ Putting `<h1>` inside `<head>` or `<title>` inside `<body>`
- ✅ `<head>` = info ABOUT the page; `<body>` = content ON the page
- ❌ Editing code but forgetting to save before previewing
- ✅ Press Ctrl+S before F12 every time

---

## In-Class Practice

Follow `exercises/session-01/exercise.md`:

1. Install Dreamweaver CS6 or VS Code
2. Create the `StudentClubWebsite` folder structure
3. Write `index.html` with heading + paragraph from scratch
4. Preview in browser and verify output

---

## Homework

See `homework/session-01/homework.md`:

- Set up complete project folder structure
- Create `index.html` with valid HTML5 boilerplate
- Screenshot folder structure and browser result

**Due Sunday 23:59**

---

## Recap

- A website is many HTML files linked together
- HTML is a markup language using tags to describe content
- Always include `<!DOCTYPE html>` at the top
- Organize files in a clear folder structure (`images/`, `css/`, `js/`)
- Name your home page `index.html`

---

## Next Session

**Session 2: Creating a New Site** — defining a site, multi-page navigation, relative vs absolute paths, and Git/GitHub basics.
