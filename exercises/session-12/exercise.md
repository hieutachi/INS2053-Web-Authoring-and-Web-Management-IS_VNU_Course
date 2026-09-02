# Session 12 — In-Class Exercise: Using Code-Editing Tools

## Objective
- Use VS Code features to write and edit HTML/CSS more efficiently
- Validate HTML code to find and fix errors
- Use code formatting and debugging tools

## Time Required
Estimated time: 50 minutes

## Instructions

### Task 1: Set Up VS Code for Web Development
Visual Studio Code (VS Code) is a free, professional code editor. It is more powerful than Dreamweaver's code view.

**Step 1**: Open VS Code. If you do not have it installed, download it from [https://code.visualstudio.com](https://code.visualstudio.com).

**Step 2**: Open your `club-website` folder in VS Code:
- Go to **File > Open Folder**
- Select the `club-website` folder
- Click **Select Folder**

You should see all your files in the Explorer panel on the left side.

**Step 3**: Install these helpful extensions (optional but recommended):
- Click the **Extensions** icon in the left sidebar (or press Ctrl+Shift+X)
- Search for and install:
  - **"Live Server"** by Ritwick Dey — lets you preview pages with auto-refresh
  - **"HTML CSS Support"** by ecmel — provides autocomplete for HTML and CSS
  - **"Prettier - Code formatter"** — automatically formats your code

### Task 2: Learn Key VS Code Features
Practice these essential features:

**Feature 1: Auto-complete (IntelliSense)**
- Open `index.html` in VS Code
- Type `<h` and wait a moment
- VS Code shows a list of tags starting with "h" (`<h1>`, `<h2>`, `<head>`, `<header>`, etc.)
- Use arrow keys to select one and press **Tab** or **Enter**
- VS Code auto-completes the tag AND the closing tag!

**Feature 2: Emmet abbreviations**
Emmet lets you type short abbreviations that expand into full HTML.

Try typing these in a blank area of an HTML file, then press **Tab**:

| Type this | Press Tab | Result |
|-----------|-----------|--------|
| `!` | Tab | Full HTML5 boilerplate |
| `div.container` | Tab | `<div class="container"></div>` |
| `ul>li*3` | Tab | `<ul>` with 3 `<li>` items inside |
| `a[href="page.html"]` | Tab | `<a href="page.html"></a>` |
| `img` | Tab | `<img src="" alt="">` |

Practice: Create a new file called `emmet-test.html` and type each abbreviation above, then press Tab.

**Feature 3: Multi-cursor editing**
- Place your cursor on a word (e.g., a class name like `main-nav`)
- Press **Ctrl+D** to select the next occurrence of that word
- Keep pressing **Ctrl+D** to select more occurrences
- Now type — all selected instances change at the same time!

This is useful when you need to rename a class across many lines.

**Feature 4: Keyboard shortcuts**

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Save file |
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` | Redo |
| `Ctrl+/` | Toggle comment on selected lines |
| `Ctrl+D` | Select next occurrence |
| `Alt+Up/Down` | Move line up/down |
| `Ctrl+Shift+K` | Delete entire line |
| `Ctrl+P` | Quick-open file by name |

### Task 3: Validate Your HTML Code
HTML validation checks your code for errors.

**Method 1: Using the W3C Validator online**
- Go to [https://validator.w3.org](https://validator.w3.org)
- Click **"Validate by Direct Input"**
- Copy the entire contents of `index.html` and paste it in
- Click **Check**
- The validator shows errors and warnings (if any)

**Method 2: Using VS Code built-in errors**
- Open any HTML file in VS Code
- Look at the **Problems panel** (View > Problems, or Ctrl+Shift+M)
- VS Code underlines errors in your code with red or yellow squiggly lines
- Hover over the underlined text to see what the error is

**Common errors to check for:**

| Error | Example | Fix |
|-------|---------|-----|
| Missing closing tag | `<p>text` | Add `</p>` |
| Unclosed quote | `<a href="page>` | Add closing `"` |
| Missing `alt` on image | `<img src="photo.jpg">` | Add `alt="description"` |
| Invalid attribute | `<p color="red">` | Use CSS instead |
| Missing DOCTYPE | No `<!DOCTYPE html>` at top | Add it as first line |

**Practice**: Open `index.html` and intentionally introduce 3 errors:
1. Remove a closing tag (e.g., delete `</p>`)
2. Remove a closing quote (e.g., change `href="about.html"` to `href="about.html`)
3. Misspell a tag (e.g., change `<header>` to `<hader>`)

Then use VS Code's error detection to find and fix each error.

### Task 4: Format Your Code
Clean, well-formatted code is easier to read and debug.

**Step 1**: Open a file that looks messy. Or copy this badly-formatted code into a test file:

```html
<!DOCTYPE html><html><head><title>Test</title></head><body><header><h1>Title</h1></header><nav><ul><li><a href="#">Link 1</a></li><li><a href="#">Link 2</a></li></ul></nav><main><p>Content here.</p></main><footer><p>Footer</p></footer></body></html>
```

**Step 2**: Format the code:
- Right-click in the editor and choose **"Format Document"**
- Or press **Shift+Alt+F**
- VS Code will automatically add proper indentation

If Prettier is installed, it will format the code according to standard conventions.

**Step 3**: Compare the formatted result. It should look like this:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test</title>
</head>
<body>
    <header>
        <h1>Title</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
        </ul>
    </nav>
    <main>
        <p>Content here.</p>
    </main>
    <footer>
        <p>Footer</p>
    </footer>
</body>
</html>
```

**Code formatting rules to follow manually:**
- Indent child elements by 4 spaces (or 1 Tab)
- Put each major element on its own line
- Close tags on the same indentation level as the opening tag
- Add comments `<!-- comment -->` to mark sections

### Task 5: Debug a Broken Page
Open a file called `debug-practice.html` (the instructor will provide this, or create one using the broken code below).

**Broken code — find and fix all errors:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Debug Practice</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Debug Exercise</h1>
    <header>

    <nav class="main-nav">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a>
            <li><a href="pages/events.html">Events</a></li>
        </ul>
    </nav>

    <main>
        <h2>Find the Errors</h2>
        <p>This page has several HTML errors. Your job is to find them all and fix them.</p>

        <img src="images/logo.png" alt"Club Logo">

        <ul>
            <li>Item One</li>
            <li>Item Two
            <li>Item Three</li>
        </ul>

        <p>A final paragraph with a <a href="about.html>broken link</a>.</p>
    </main>

    <footer>
        <p>&copy; 2025 Student Club</p>
    </footer>
</body>
</html>
```

**Errors to find:**
1. `<header>` is closed with `<header>` instead of `</header>` — missing the `/`
2. The second `<li>` for "About" is missing `</li>`
3. `<img>` tag: `alt"Club Logo"` is missing the `=` sign
4. The second `<li>` for "Item Two" is missing `</li>`
5. The `<a>` tag: `href="about.html>` is missing the closing quote before `>`

Fix each error. Save the file. Open it in the browser to confirm it works.

## Starter Files
- `club-website` folder from previous sessions
- VS Code installed on your computer

## Expected Result
- VS Code is set up with your project folder open
- You know how to use auto-complete, Emmet, and multi-cursor editing
- All HTML files pass validation with no errors
- All files are properly formatted with consistent indentation
- You can identify and fix common HTML errors

## Self-Check (answers included)

Answer from **your own project** first, then open the arrow.

<details>
<summary>1. Which VS Code feature finds the mistakes that the browser will silently swallow?</summary>

The **Problems panel** (Ctrl+Shift+M) plus the squiggly underlines as you type.

The important word is *silently*. HTML has no compiler — an unclosed `<li>` or a
missing `=` does not stop the page from loading. The browser guesses, renders
something, and you may not notice until the layout drifts on another machine.

The debug exercise in Task 5 is exactly this: every one of the five errors still
"works" in the sense that a page appears.

Two habits worth keeping:

- Watch the error/warning count in the status bar. `0 Errors, 0 Warnings` before
  you submit.
- For a serious check, paste the file into [validator.w3.org](https://validator.w3.org).
  It applies the full HTML specification, not just the editor's quick parse.

</details>

<details>
<summary>2. Emmet: what do `!`, `ul>li*3`, and `nav>ul>li*4>a` expand to — and what do `>` and `*` mean?</summary>

`>` means **child of**. `*` means **repeat**.

- `!` → the whole HTML5 boilerplate: doctype, `<html>`, `<head>`, charset meta,
  viewport meta, `<title>`, `<body>`.
- `ul>li*3` → a `<ul>` containing three `<li>` elements.
- `nav>ul>li*4>a` → a `<nav>`, containing a `<ul>`, containing four `<li>`, each
  with an `<a>` inside. Your whole navigation skeleton in one line.

Also worth knowing: `+` for a sibling and `.name` / `#name` for class and id. So
`div.card+div.card` gives two sibling cards.

`!` is the one to memorise first. It writes the boilerplate correctly every time,
including the two `<meta>` tags that students most often forget — charset
(Chapter 1) and viewport (Session 15).

</details>

<details>
<summary>3. `Ctrl+D` vs `Ctrl+Shift+F` — when do you use which, and what is the risk of each?</summary>

- **Ctrl+D** — select the next occurrence **in the current file**, repeatedly, then
  type once to change them all. Good for renaming a class inside one file.
- **Ctrl+Shift+F** — search **across every file** in the folder. This is the one you
  need for a class used in five HTML pages plus the stylesheet.

The risk in both cases is matching too much. Renaming `nav` with Ctrl+D also hits
`.main-nav`, `navigation`, and the word "nav" in a comment. Guard against it:

- Turn on **whole word** matching (the `ab|` button) so `nav` does not match
  `main-nav`.
- Read each highlight before you type. Ctrl+D adds cursors one at a time
  precisely so you can watch what you are selecting.
- Save first. Then Ctrl+Z undoes a bad rename in one step.

</details>

<details>
<summary>4. Challenge — no code given: fix all five errors in the Task 5 broken page from memory, then say why each one is dangerous rather than merely wrong.</summary>

```html
<header>
    <h1>Debug Exercise</h1>
</header>                                  <!-- 1. was <header> again -->

<nav class="main-nav">
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>   <!-- 2. added </li> -->
        <li><a href="pages/events.html">Events</a></li>
    </ul>
</nav>

<main>
    <h2>Find the Errors</h2>
    <p>This page has several HTML errors.</p>

    <img src="images/logo.png" alt="Club Logo">   <!-- 3. added = -->

    <ul>
        <li>Item One</li>
        <li>Item Two</li>                          <!-- 4. added </li> -->
        <li>Item Three</li>
    </ul>

    <p>A paragraph with a <a href="about.html">working link</a>.</p>
    <!-- 5. added the closing quote -->
</main>
```

Why each one is dangerous, not just wrong:

1. **`<header>` instead of `</header>`** — opens a *second* header nested in the
   first. Everything after it inherits the header's CSS, so the whole page takes
   on header styling and you go hunting in the stylesheet for a bug that is in
   the HTML.
2. **and 4. missing `</li>`** — the browser auto-closes it, so the list looks
   almost right. But `nav ul li` spacing quietly changes, and the next
   `:nth-child` rule you write targets the wrong item.
3. **`alt"Club Logo"`** — without `=` this is not an attribute at all; the words
   become stray junk and the image has **no** alt text. Silent accessibility
   failure: nothing looks broken.
4. **`href="about.html>`** — the unterminated quote swallows the following markup
   into the attribute value until the next `"`. This is the one that visibly
   breaks the page, and therefore the easiest of the five.

The pattern: the errors that look harmless are the expensive ones. That is what
the Problems panel is for.

</details>

## Checklist
- [ ] Opened `club-website` in VS Code using File > Open Folder
- [ ] Used auto-complete to write at least 3 HTML tags
- [ ] Used Emmet abbreviations (e.g., `!`, `ul>li*3`)
- [ ] Used multi-cursor editing (Ctrl+D) at least once
- [ ] Validated `index.html` using W3C Validator or VS Code Problems panel
- [ ] Formatted code using Shift+Alt+F
- [ ] Found and fixed all 5 errors in the debug practice exercise

## Tips
- Always use **Shift+Alt+F** to format code before submitting your work. Clean code is easier to grade.
- VS Code shows errors in real time — look at the bottom-left corner for the error count. If it says "0 Errors, 0 Warnings" you are in good shape.
- Emmet works in HTML and CSS files. In CSS, try typing `m10` and pressing Tab — it expands to `margin: 10px;`.
- Use **Ctrl+P** to quickly jump to any file without navigating the folder tree.
