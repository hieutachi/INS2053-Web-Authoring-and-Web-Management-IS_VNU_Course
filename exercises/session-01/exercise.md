# Session 1 — In-Class Exercise: Introduction to Dreamweaver CS6 & Your First HTML Page

## Objective
- Understand what a website is and how web pages work
- Learn the basic structure of an HTML document
- Create and preview your very first HTML file in Dreamweaver CS6

## Time Required
Estimated time: 45 minutes

## Instructions

### Task 1: Understand How Websites Work
- A **website** is a collection of web pages stored on a server and accessed through the internet.
- A **web page** is a file written in HTML (HyperText Markup Language).
- Your web browser (Chrome, Firefox, Edge) reads the HTML and displays the page visually.
- Open Dreamweaver CS6 and spend a few minutes looking at the interface:
  - **Document toolbar** (top) — shows file name, view options
  - **Files panel** (right) — shows your project files
  - **Design view** (center) — visual preview of the page
  - **Code view** (center) — shows the HTML code
  - **Split view** (center) — shows code and design side by side
- Switch between Design view, Code view, and Split view. Notice how changes in one view appear in the other.

### Task 2: Create Your First HTML File
- In Dreamweaver, go to **File > New** and select **HTML** as the page type.
- Click **Create**.
- Switch to **Code view** and replace everything with the following code:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to my first web page.</p>
    <p>I am learning HTML in INS2053.</p>
</body>
</html>
```

- **Save the file**: Press **Ctrl+S**. Save it as `index.html` inside a new folder called `my-first-site` on your desktop.
- **Preview in browser**: Press **F12** or go to **File > Preview in Browser**. Choose your browser.

**Expected output**: You should see a page with a large heading "Hello, World!" and two paragraphs below it.

### Task 3: Understand the HTML Structure
Read the code you just wrote and understand each part:

```html
<!DOCTYPE html>          <!-- Tells the browser this is HTML5 -->
<html>                   <!-- The root element — everything is inside this -->
<head>                   <!-- Contains info about the page (not shown on screen) -->
    <title>...</title>   <!-- The text shown in the browser tab -->
</head>
<body>                   <!-- The visible content of the page -->
    <h1>...</h1>         <!-- A heading (big text) -->
    <p>...</p>           <!-- A paragraph -->
</body>
</html>
```

- Now try changing the text inside `<title>` to your own name. Save and refresh the browser.
- Notice: the text in `<title>` does NOT appear on the page — it appears in the browser tab at the top.

### Task 4: Experiment with Your Page
Add more content to your HTML file:

```html
<body>
    <h1>Welcome to My Page</h1>
    <p>My name is [Your Name].</p>
    <p>I am a student at VNU-IS.</p>
    <p>I am learning how to build websites!</p>

    <h2>My Favorite Subjects</h2>
    <p>Web Development</p>
    <p>Programming</p>

    <h2>My Hobbies</h2>
    <p>Reading books</p>
    <p>Playing sports</p>
</body>
```

- Save and preview again. Notice the difference between `<h1>` (biggest heading) and `<h2>` (smaller heading).

## Starter Files
- None required. You create everything from scratch.
- You only need Dreamweaver CS6 installed.

## Expected Result

```
┌─────────────────────────────────────────────┐
│  [My First Web Page - browser tab]          │
├─────────────────────────────────────────────┤
│                                             │
│  Welcome to My Page           (large text)  │
│                                             │
│  My name is [Your Name].                    │
│  I am a student at VNU-IS.                  │
│  I am learning how to build websites!       │
│                                             │
│  My Favorite Subjects         (medium text) │
│  Web Development                            │
│  Programming                                │
│                                             │
│  My Hobbies                   (medium text) │
│  Reading books                              │
│  Playing sports                             │
│                                             │
└─────────────────────────────────────────────┘
```

## Self-Check (answers included)

Answer each question from **your own file** first, then open the arrow to
compare. If your answer is different, go back and fix the file — that is the
whole point of self-checking.

<details>
<summary>1. Your page shows "Hello, World!" correctly, but the browser tab still says "Untitled Document". What did you forget?</summary>

The `<title>` element inside `<head>`.

`<h1>` writes text **into the page**. `<title>` writes text **into the browser
tab**. They are two different places, so they need two different tags — this is
why Task 3 asked you to change `<title>` and watch the tab, not the page.

```html
<head>
    <title>My First Web Page</title>
</head>
```

</details>

<details>
<summary>2. In Code view you pressed Enter twice between two sentences, but the browser shows them on the same line. Why?</summary>

HTML **collapses whitespace**. Any run of spaces, tabs, and newlines in your
source becomes a single space on screen. Pressing Enter in the editor is not a
paragraph break.

To get two paragraphs you must say so with tags:

```html
<p>First sentence.</p>
<p>Second sentence.</p>
```

This is the single most common surprise for beginners: the browser reads your
**tags**, not your **layout**.

</details>

<details>
<summary>3. What actually changes when you use `<h2>` instead of `<h1>` — and why should a page have only one `<h1>`?</summary>

Two things change, and only one of them is visible:

- **Visible:** the browser's default stylesheet renders `<h1>` larger than `<h2>`.
- **Invisible but more important:** the heading level declares the *outline* of
  the document. Screen readers let a blind user jump heading to heading, and
  search engines read the outline to understand the page.

One `<h1>` per page = one title. Think of a book: one title on the cover, many
chapter titles (`<h2>`) inside. If everything is `<h1>`, the outline says
nothing.

Never pick a heading level because of its size. Pick it by meaning, then resize
it with CSS later (Session 4).

</details>

<details>
<summary>4. Challenge — no code given: add a "My Goals" section with three levels of heading and one paragraph under each. Write it yourself first.</summary>

```html
<body>
    <h1>Welcome to My Page</h1>
    <p>My name is Linh. I am a student at VNU-IS.</p>

    <h2>My Goals</h2>
    <p>Here is what I want to achieve this semester.</p>

    <h3>Short Term</h3>
    <p>Finish every homework before Sunday 23:59.</p>

    <h3>Long Term</h3>
    <p>Build a complete website for my student club.</p>
</body>
```

Check your version against these two rules:

1. Heading levels go down one step at a time — `h1` then `h2` then `h3`. Do not
   jump from `h1` straight to `h3`.
2. Every paragraph is wrapped in its own `<p>` ... `</p>`.

</details>

## Checklist
- [ ] Dreamweaver CS6 is open and you explored the interface
- [ ] You created a new HTML file
- [ ] You typed the correct HTML structure (DOCTYPE, html, head, body)
- [ ] You saved the file as `index.html`
- [ ] You previewed the file in a browser using F12
- [ ] You changed the `<title>` and saw it update in the browser tab
- [ ] You added multiple headings (`h1`, `h2`) and paragraphs (`p`)

## Tips
- Always start an HTML file with `<!DOCTYPE html>` — this tells the browser to use modern HTML5 rules.
- Every opening tag needs a closing tag: `<h1>` needs `</h1>`, `<p>` needs `</p>`.
- Use **Ctrl+S** often to save your work. If the browser does not show changes, make sure you saved first!
- This file is a standalone practice file. In the next session, you will create your real project folder for the Student Club Website.
