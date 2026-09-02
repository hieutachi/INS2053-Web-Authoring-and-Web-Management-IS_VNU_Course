# 🟦 SESSION 12
# **Using Code-Editing Tools**

Welcome to the final session of our web authoring journey, friend! You have learned HTML structure, CSS styling, images, multimedia, and site planning. Now it is time to level up your **workflow**. Professional developers do not just write code — they use powerful tools that make coding faster, catch errors automatically, and help debug problems in seconds. In this session you will master **VS Code** (Visual Studio Code), the industry-standard code editor used by millions of developers worldwide. You will also learn how to validate your HTML/CSS using official W3C validators and how to use browser Developer Tools to inspect, test, and fix issues in real time. Think of this session as upgrading from a bicycle to a sports car — same destination, but MUCH faster and smoother. Let us go!

---

# 📌 SESSION INFORMATION

```
📅 Duration:     3 periods (150 minutes) — Theory ~60 min, Practice ~90 min
📚 Reference:    VS Code documentation; W3C HTML/CSS Validators
                 Chrome DevTools documentation (MDN)
🎯 Objectives:   1. Master VS Code features (extensions, Emmet, shortcuts, terminal)
                 2. Validate HTML and CSS with the W3C validators
                 3. Use browser DevTools to inspect and debug a page
                 4. Recognise and fix the most common markup and CSS errors
📖 Prepare:      1. Install VS Code (https://code.visualstudio.com/)
                 2. Have your StudentClubWebsite project open
                 3. Install Chrome or Edge
🖼 Diagrams:     canvases/buoi-12.canvas.tsx — VSCodeLayout, EmmetExpand, ValidatorReport,
                 DevToolsLoop
🔗 Outcomes:     CLO1 (master basic web design and build skills)
                 CLO3 (choose appropriate technologies for web development)
                 CLO5 (evaluate, document, and present a web application)
```

---

# 🎯 LEARNING OBJECTIVES

By the end of this session you will be able to:

- Navigate the VS Code interface confidently (Explorer, Editor, Terminal, Extensions)
- Install and configure essential VS Code extensions for web development
- Use **Emmet** abbreviations to generate HTML/CSS code instantly
- Apply keyboard shortcuts to edit code faster (multi-cursor, find/replace, formatting)
- Use the integrated terminal for file management and local server tasks
- Validate HTML using the W3C Markup Validator (online and via extension)
- Validate CSS using the W3C CSS Validator
- Open and use browser Developer Tools (Elements, Console, Network panels)
- Inspect and modify CSS properties live in the browser
- Identify and fix common HTML errors (unclosed tags, missing attributes, bad nesting)
- Identify and fix common CSS errors (missing semicolons, typos, wrong selectors)
- Format code consistently using auto-formatting tools
- Use comments effectively to document HTML and CSS

---

# 📖 THEORY

## 1. VS Code: Your Primary Development Tool

> 🖼 **Diagram:** `canvases/buoi-12.canvas.tsx` → `VSCodeLayout` — slide `s12-vscode` ("VS Code Interface")

### 1.1 Definition

**Visual Studio Code (VS Code)** is a free, open-source code editor created by Microsoft. It is NOT the same as "Visual Studio" (which is a much larger IDE). VS Code is lightweight, fast, extensible, and has become the most popular code editor for web development worldwide.

### 🎒 Real-life example

According to the Stack Overflow Developer Survey, VS Code has been the #1 most-used development environment since 2019. Over 70% of professional web developers use it daily. When you join a tech company, chances are very high that your team uses VS Code.

### 1.2 VS Code Interface Overview

```
┌─────────────────────────────────────────────────────────────┐
│  ACTIVITY BAR  │  SIDEBAR      │  EDITOR AREA              │
│                │               │                           │
│  [Explorer]    │  File tree    │  index.html          [x]  │
│  [Search]      │               │  ┌─────────────────────┐  │
│  [Source Ctrl] │  - index.html │  │ 1 │ <!DOCTYPE html> │  │
│  [Debug]       │  - about.html │  │ 2 │ <html lang="en">│  │
│  [Extensions]  │  - css/       │  │ 3 │ <head>          │  │
│                │    style.css  │  │ 4 │   <meta ...>    │  │
│                │  - images/    │  │ 5 │   <title>...    │  │
│                │               │  │   │                 │  │
│                │               │  └─────────────────────┘  │
│                │               │                           │
│                ├───────────────┤  PANEL (Terminal/Output)  │
│                │               │  $ cd StudentClubWebsite  │
│                │               │  $ ls                     │
└─────────────────────────────────────────────────────────────┘
```

| Area | Purpose |
|------|---------|
| **Activity Bar** (far left) | Icons to switch between Explorer, Search, Git, Debug, Extensions |
| **Sidebar** | Shows file explorer, search results, git changes, or extension marketplace |
| **Editor Area** (center) | Where you write and edit code. Supports tabs for multiple files. |
| **Panel** (bottom) | Integrated terminal, output console, problems list, debug console |
| **Status Bar** (very bottom) | Shows language mode, line/column number, encoding, Git branch |

### 1.3 Opening Your Project

1. Launch VS Code.
2. Go to **File → Open Folder...**
3. Navigate to your `StudentClubWebsite` folder.
4. Click **Select Folder**.
5. The Sidebar now shows your entire project tree.

⚠️ **Important notes**

- Always open the PROJECT FOLDER, not individual files. This enables features like search-across-files, relative paths, and workspace settings.
- If you see "No Folder Opened" in the sidebar, you opened a file instead of a folder. Close it and use **Open Folder** instead.

---

## 2. Essential VS Code Extensions

### 2.1 What Are Extensions?

Extensions are plugins that add features to VS Code. The base editor is intentionally minimal; extensions let you customize it for your specific needs.

### 2.2 Must-Have Extensions for Web Development

| Extension | What It Does | Why You Need It |
|-----------|-------------|-----------------|
| **Live Server** (ritwickdey.LiveServer) | Launches a local development server with auto-refresh | See changes instantly when you save — no manual refresh |
| **HTML CSS Support** (ecmel.vscode-html-css) | Adds IntelliSense for HTML/CSS classes and IDs | Auto-completes class names from your stylesheet |
| **Prettier** (esbenp.prettier-vscode) | Auto-formats code on save | Consistent indentation, spacing, and style |
| **Auto Rename Tag** (formulahendry.auto-rename-tag) | Renames matching HTML tag when you edit one | Change `<div>` to `<section>` and the closing tag updates automatically |
| **Auto Close Tag** (formulahendry.auto-close-tag) | Automatically adds closing tags | Type `<div>` and get `</div>` inserted instantly |
| **Path Intellisense** (christian-kohler.path-intellisense) | Auto-completes file paths | Type `src="images/"` and see available files |
| **W3C Web Validator** (umutcanbolat.vscode-w3c-web-validator) | Validates HTML/CSS inside VS Code | Catch errors without leaving the editor |
| **Emmet** *(built-in)* | Expands abbreviations into full HTML/CSS | Type `ul>li*5` and press Tab → full list generated |

### 2.3 How to Install Extensions

1. Click the **Extensions** icon in the Activity Bar (or press `Ctrl+Shift+X`).
2. Type the extension name in the search box.
3. Click **Install** on the correct result.
4. Some extensions require reloading VS Code — click **Reload** if prompted.

### 🔍 Comparison: With vs Without Extensions

| Task | Without Extensions | With Extensions |
|------|-------------------|-----------------|
| Preview changes | Save → Switch to browser → Refresh → Switch back | Save → Browser auto-refreshes (Live Server) |
| Write HTML structure | Type every tag manually | `div.container>h2+p*3` + Tab = instant structure |
| Format messy code | Manually add spaces and newlines | `Ctrl+Shift+F` or save with Prettier = instant format |
| Find validation errors | Upload to W3C website → Wait → Read results | Error squiggles appear in editor as you type |
| Rename an HTML tag | Edit opening tag → Scroll to find closing tag → Edit it too | Edit opening tag → Closing tag updates automatically |
| Reference an image path | Type path from memory, hope it is correct | Start typing → Autocomplete shows available files |

### 🧪 Try It Yourself — Set Up Live Server

**Task (5 min):** Stop pressing F5.

1. In VS Code, open the Extensions panel (**Ctrl+Shift+X**) and install **Live Server** by Ritwick Dey.
2. Open your project *folder* — **File → Open Folder** — not a single file.
3. Right-click `index.html` in the Explorer and choose **Open with Live Server**.
4. Arrange VS Code and the browser side by side. Edit a heading and press **Ctrl+S**.

**Expected result:** The browser reloads by itself the moment you save. The address bar reads `http://127.0.0.1:5500/`, not `file:///C:/...`.

<details>
<summary>Why the URL change matters more than the convenience</summary>

Live Server runs a real local web server, so your pages load over HTTP instead of directly from disk. Several things behave differently:

- Root-relative paths such as `/css/style.css` resolve properly, as they will on a real server.
- Features browsers block on `file://` — including `fetch` and some font loading — start working.
- The Network tab shows real status codes, so a 404 is unambiguous.

This is also the fastest way to test on your phone: Live Server prints a second address on your local network, and typing it into your phone's browser loads the site from your laptop. That is real-device testing with no upload.

Note the extension is scoped to the opened folder. If reloading does not happen, you almost certainly opened a file rather than a folder.

</details>


---

## 3. Emmet: Write HTML at Lightning Speed

> 🖼 **Diagram:** `canvases/buoi-12.canvas.tsx` → `EmmetExpand` — slide `s12-emmet` ("Emmet Abbreviations")

### 3.1 Definition

**Emmet** is a built-in VS Code feature that expands short abbreviations into full HTML or CSS code. You type a compact shorthand, press **Tab**, and VS Code generates the complete markup.

### 🎒 Real-life example

Instead of typing 15 lines of HTML for a navigation menu, you type ONE line and press Tab. What took 2 minutes now takes 2 seconds.

### 3.2 Common Emmet Abbreviations

#### HTML Abbreviations

| Abbreviation | Press Tab → Generates |
|-------------|----------------------|
| `!` | Full HTML5 boilerplate (`<!DOCTYPE html><html>...`) |
| `div` | `<div></div>` |
| `.container` | `<div class="container"></div>` |
| `#header` | `<div id="header"></div>` |
| `h2.title` | `<h2 class="title"></h2>` |
| `a` | `<a href=""></a>` |
| `a.link` | `<a href="" class="link"></a>` |
| `img` | `<img src="" alt="">` |
| `ul>li*5` | `<ul>` with 5 `<li>` children |
| `nav>ul>li*6>a` | Full navigation structure |
| `div.wrapper>header+main+footer` | Page layout skeleton |
| `section.media>h3+video[controls][poster="thumb.jpg"]` | Video section |
| `p{Hello world}` | `<p>Hello world</p>` |
| `a[href="about.html"]{About Us}` | `<a href="about.html">About Us</a>` |

#### CSS Abbreviations

| Abbreviation | Press Tab → Generates |
|-------------|----------------------|
| `m20` | `margin: 20px;` |
| `mt10` | `margin-top: 10px;` |
| `p15` | `padding: 15px;` |
| `w100p` | `width: 100%;` |
| `fz16` | `font-size: 16px;` |
| `bgc#1a5276` | `background-color: #1a5276;` |
| `c:white` | `color: white;` |
| `d:f` | `display: flex;` |
| `jc:c` | `justify-content: center;` |
| `ai:c` | `align-items: center;` |
| `bxsh` | `box-shadow: ;` |
| `bdrs8` | `border-radius: 8px;` |

### 3.3 Emmet Syntax Cheat Sheet

| Symbol | Meaning | Example |
|--------|---------|---------|
| `.` | Class | `.nav` → `<div class="nav">` |
| `#` | ID | `#header` → `<div id="header">` |
| `>` | Child (nest inside) | `ul>li` → `<ul><li></li></ul>` |
| `+` | Sibling (next to) | `h2+p` → `<h2></h2><p></p>` |
| `^` | Climb up (parent's sibling) | `div>p^span` → p inside div, then span outside div |
| `*` | Multiply | `li*3` → three `<li>` elements |
| `()` | Group | `(div>h2+p)*3` → three groups of div with h2 and p |
| `{}` | Text content | `p{Hello}` → `<p>Hello</p>` |
| `[]` | Attribute | `a[href="#"]` → `<a href="#">` |
| `$` | Number counter | `li.item$*3` → item1, item2, item3 |

### 3.4 Worked Emmet Examples

**Example A:** Generate the HTML5 boilerplate
```
Type: !
Press: Tab

Result:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

</body>
</html>
```

**Example B:** Generate a navigation bar
```
Type: nav>ul>li*6>a[href="#"]
Press: Tab

Result:
<nav>
    <ul>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
    </ul>
</nav>
```

Then fill in the links and text. Much faster than typing each tag!

**Example C:** Generate a media section
```
Type: section.media>h3{Promo Video}+video[controls][width="640"][poster="images/poster.jpg"]>source[src="video/promo.mp4"][type="video/mp4"]
Press: Tab

Result:
<section class="media">
    <h3>Promo Video</h3>
    <video controls width="640" poster="images/poster.jpg">
        <source src="video/promo.mp4" type="video/mp4">
    </video>
</section>
```

⚠️ **Important notes**

- Emmet works in `.html` files and inside `<style>` blocks. For `.css` files, CSS abbreviations work directly.
- If Tab does not expand the abbreviation, make sure:
  1. You are in an HTML or CSS file (check status bar bottom-right)
  2. The cursor is NOT inside a string or comment
  3. Try `Ctrl+Space` to trigger IntelliSense, then select "Emmet Abbreviation"
- Practice makes perfect. Spend 10 minutes experimenting with Emmet — it will save you HOURS over the course of the semester.

### 🧪 Try It Yourself — Five Emmet Abbreviations

**Task (6 min):** Type less HTML by hand.

In an empty `.html` file, type each of these and press **Tab**:

1. `!` — the entire HTML5 boilerplate.
2. `nav>ul>li*4>a` — a nav with four list items, each containing a link.
3. `.card*3` — three `<div class="card">` elements.
4. `table>tr*3>td*4` — a 3×4 table skeleton.
5. `section.events>h2+p+ul>li*3` — a section with a heading, a paragraph, and a three-item list.

**Expected result:** Each abbreviation expands into complete, correctly nested, correctly indented HTML with the cursor placed where you type next.

<details>
<summary>The four operators that generate everything else</summary>

| Operator | Meaning | Example |
|---|---|---|
| `>` | child | `ul>li` |
| `+` | sibling | `h2+p` |
| `*` | multiply | `li*4` |
| `.` / `#` | class / id | `div.card`, `div#main` |

Two more worth knowing: `$` inserts the item number (`li.item$*3` gives `item1`, `item2`, `item3`), and `{}` sets text content (`a{Read more}`).

If Tab does nothing, the file is not being treated as HTML. Check the language mode in the status bar at the bottom right — Emmet keys off it, not off the file extension alone.

This is worth ten minutes of practice because the boilerplate and the nav are the two things you type most often in this course. `!` plus Tab replaces twelve lines of typing where a single typo costs you a debugging session.

</details>


---

## 4. Essential Keyboard Shortcuts

### 4.1 Editing Shortcuts

| Shortcut | Action | When to Use |
|----------|--------|-------------|
| `Ctrl+Shift+K` | Delete entire line | Remove a line quickly without selecting it |
| `Alt+↑ / Alt+↓` | Move line up/down | Reorder lines without cut/paste |
| `Shift+Alt+↑ / Shift+Alt+↓` | Copy line up/down | Duplicate a line |
| `Ctrl+D` | Select next occurrence | Select the next instance of the current word for multi-edit |
| `Ctrl+Shift+L` | Select ALL occurrences | Edit every instance of a word simultaneously |
| `Ctrl+/` | Toggle comment | Comment/uncomment selected code or current line |
| `Ctrl+Enter` | Insert line below | Start a new line regardless of cursor position |
| `Ctrl+Shift+Enter` | Insert line above | Start a new line above the current one |
| `Ctrl+]` / `Ctrl+[` | Indent / Outdent | Fix indentation quickly |

### 4.2 Navigation Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+P` | Quick-open file by name (type part of filename) |
| `Ctrl+G` | Go to specific line number |
| `Ctrl+F` | Find in current file |
| `Ctrl+H` | Find and Replace in current file |
| `Ctrl+Shift+F` | Find across ALL files in project |
| `Ctrl+Shift+H` | Find and Replace across ALL files |
| `Ctrl+B` | Toggle sidebar visibility |
| `Ctrl+` `` ` `` `` | Toggle integrated terminal |

### 4.3 Formatting and Saving

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Save current file |
| `Ctrl+Shift+F` | Format entire document (with Prettier installed) |
| `Ctrl+K Ctrl+F` | Format selected code only |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` or `Ctrl+Shift+Z` | Redo |

### 🎒 Real-life example: Multi-Cursor Editing

Suppose you need to add `class="event-card"` to five `<div>` tags:

```html
<div>Workshop</div>
<div>Social Night</div>
<div>Hackathon</div>
<div>Guest Talk</div>
<div>Field Trip</div>
```

1. Click at the start of the first `<div>`.
2. Press `Ctrl+D` four times to select all five `<div>` instances.
3. Type `<div class="event-card">` — ALL five update simultaneously.

Result:
```html
<div class="event-card">Workshop</div>
<div class="event-card">Social Night</div>
<div class="event-card">Hackathon</div>
<div class="event-card">Guest Talk</div>
<div class="event-card">Field Trip</div>
```

What would have taken 5 separate edits is done in one action.

---

## 5. Integrated Terminal

### 5.1 What Is It?

VS Code has a built-in terminal at the bottom of the window. It runs your system's command shell (PowerShell on Windows, Bash on Mac/Linux) without leaving the editor.

### 5.2 Common Terminal Commands for Web Projects

| Command | What It Does |
|---------|-------------|
| `ls` (or `dir` on Windows) | List files in current directory |
| `cd folder-name` | Change into a subfolder |
| `cd ..` | Go up one directory level |
| `mkdir folder-name` | Create a new folder |
| `touch filename` (Mac/Linux) or `New-Item filename` (PowerShell) | Create a new empty file |
| `rm filename` (Mac/Linux) or `Remove-Item filename` (PowerShell) | Delete a file |
| `code .` | Open current directory in VS Code |

### 5.3 Using Live Server via Terminal

If you installed the Live Server extension:
1. Right-click any HTML file in the Explorer.
2. Select **Open with Live Server**.
3. Your browser opens at `http://127.0.0.1:5500/` with auto-refresh enabled.
4. Every time you save a file, the browser refreshes automatically.

Alternatively, from the terminal:
```bash
npx live-server
```
(Requires Node.js installed.)

⚠️ **Important notes**

- The integrated terminal uses YOUR system shell. On Windows, it defaults to PowerShell. You can change it to CMD or Git Bash via **Terminal → Select Default Profile**.
- Never run commands you do not understand. The terminal has real system access.
- For basic web development, you rarely need the terminal beyond listing files and running Live Server. Do not feel pressured to learn advanced CLI commands yet.

---

## 6. HTML Validation

> 🖼 **Diagram:** `canvases/buoi-12.canvas.tsx` → `ValidatorReport` — slide `s12-validation` ("W3C Validation")

### 6.1 What Is Validation?

**Validation** checks your HTML against the official W3C specification. It identifies:
- Missing or incorrect tags
- Missing required attributes (like `alt` on `<img>`)
- Deprecated elements or attributes
- Incorrectly nested elements
- Duplicate IDs

Valid HTML ensures your page renders correctly across ALL browsers, not just the one you tested in.

### 6.2 Online Validation (W3C Markup Validator)

1. Go to https://validator.w3.org/
2. Choose one of three methods:
   - **Validate by URI:** Enter your website URL (only works for publicly hosted sites)
   - **Validate by File Upload:** Upload your `.html` file ← BEST for local projects
   - **Validate by Direct Input:** Paste your HTML code
3. Click **Check**.
4. Review the results:
   - ✅ Green = Valid! No errors found.
   - ❌ Red = Errors found. Each error lists the line number and description.
   - ⚠️ Yellow = Warnings. Not technically errors, but worth fixing.

### 6.3 VS Code Validation (via Extension)

If you installed the **W3C Web Validator** extension:
1. Open an HTML file.
2. Press `Ctrl+Shift+P` → Type "W3C Validate" → Select the command.
3. Results appear in the Problems panel at the bottom.
4. Click any error to jump to that line in the editor.

### 6.4 Common Validation Errors and Fixes

| Error Message | Cause | Fix |
|--------------|-------|-----|
| "Element `img` is missing required attribute `alt`" | Image has no alt text | Add `alt="description"` |
| "End tag `div` seen, but there were open elements" | Unclosed tag somewhere above | Find and close the missing tag |
| "Element `font` not allowed" | Using deprecated HTML element | Replace with CSS styling |
| "Duplicate ID `header`" | Two elements share the same ID | Make each ID unique |
| "Stray end tag `p`" | Extra closing `</p>` without matching open | Remove the stray tag or add the opening tag |
| "Attribute `bgcolor` not allowed on element `table`" | Deprecated attribute | Use CSS `background-color` instead |
| "Bad value `true` for attribute `autoplay`" | Boolean attribute should not have a value | Change `autoplay="true"` to just `autoplay` |

⚠️ **Important notes**

- Fix errors from TOP to BOTTOM. Early errors can cause false positives later in the file.
- Aim for ZERO errors. Warnings are acceptable but should be reviewed.
- Validate EVERY page, not just the home page.

### 🧪 Try It Yourself — Break Your HTML, Then Let the Validator Find It

**Task (6 min):** Learn what the validator catches that the browser hides.

1. Open validator.w3.org and choose **Validate by Direct Input**. Paste a working page and confirm it passes.
2. Now introduce three errors on purpose:
   - Delete one `</div>`.
   - Give two elements the same `id="card"`.
   - Remove the `alt` from an `<img>`.
3. Reload the page in the browser first. It still looks fine.
4. Re-validate and read all three messages.

**Expected result:** The browser renders the broken page without complaint. The validator reports "End tag for div omitted", "Duplicate ID", and "An img element must have an alt attribute".

<details>
<summary>Why the browser does not tell you</summary>

HTML parsers are required to be forgiving. Faced with a missing `</div>`, the browser guesses where it should have gone and carries on — because a partly-rendered page serves the reader better than an error screen.

The catch is that its guess is often not yours. An unclosed `<div>` before a footer can silently nest the footer inside a card, and your layout breaks in a way that looks like a CSS problem. You will spend an hour on the stylesheet for a structural bug.

So run the validator when something looks wrong and the CSS seems correct. Compare **Ctrl+U** (what you wrote) against the **Elements** panel (what the browser built). Where they differ, the browser repaired something.

Do the same for CSS at jigsaw.w3.org/css-validator. A missing `}` makes every rule after it vanish, and the browser reports nothing at all — the rules simply do not apply.

</details>


---

## 7. CSS Validation

### 7.1 W3C CSS Validator

1. Go to https://jigsaw.w3.org/css-validator/
2. Choose validation method:
   - **By URI:** For publicly hosted stylesheets
   - **By file upload:** Upload your `.css` file ← BEST for local projects
   - **By direct input:** Paste your CSS code
3. Click **Check**.
4. Review errors and warnings.

### 7.2 Common CSS Validation Errors

| Error | Cause | Fix |
|-------|-------|-----|
| "Parse Error" | Syntax error (usually missing semicolon or brace) | Check for `;` after every property-value pair |
| "Unknown property `colr`" | Typo in property name | Correct to `color` |
| "Value Error: `redish` is not a valid color" | Invalid color value | Use valid color name, hex, rgb, or hsl |
| "Property `float` doesn't exist in this context" | Property used incorrectly | Check if the property applies to the selector |

---

## 8. Browser Developer Tools (DevTools)

> 🖼 **Diagram:** `canvases/buoi-12.canvas.tsx` → `DevToolsLoop` — slide `s12-devtools` ("Browser DevTools")

### 8.1 What Are DevTools?

Every modern browser includes built-in developer tools that let you:
- **Inspect** any element on the page and see its HTML and CSS
- **Edit** CSS properties live (changes are temporary — great for experimentation)
- **Debug** JavaScript errors in the Console
- **Monitor** network requests and loading performance
- **Simulate** different screen sizes for responsive testing

### 8.2 Opening DevTools

| Browser | Shortcut | Alternative |
|---------|----------|-------------|
| Chrome | `F12` or `Ctrl+Shift+I` | Right-click element → Inspect |
| Firefox | `F12` or `Ctrl+Shift+I` | Right-click element → Inspect |
| Edge | `F12` or `Ctrl+Shift+I` | Right-click element → Inspect |
| Safari | `Cmd+Option+I` | Enable via Preferences → Advanced → Show Develop menu |

### 8.3 Key Panels

```
┌─────────────────────────────────────────────────────────────┐
│ Elements │ Console │ Sources │ Network │ Performance │ ...  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ELEMENTS PANEL:                                            │
│  ┌─────────────────────┐  ┌──────────────────────────────┐  │
│  │ HTML DOM Tree       │  │ CSS Styles                   │  │
│  │                     │  │                              │  │
│  │ <body>              │  │  header {                    │  │
│  │   <header> ◄─────── │  │    background: #1a5276;     │  │
│  │     <h1>Club</h1>   │  │    color: white;            │  │
│  │   </header>         │  │    padding: 30px;           │  │
│  │   <nav>             │  │  }                          │  │
│  │     <ul>            │  │                              │  │
│  │       <li>...</li>  │  │  [Click any value to edit!] │  │
│  │     </ul>           │  │                              │  │
│  │   </nav>            │  └──────────────────────────────┘  │
│  │   <main>            │                                    │
│  │     ...             │  ┌──────────────────────────────┐  │
│  │   </main>           │  │ Computed / Box Model         │  │
│  │ </body>             │  │ margin: 0                    │  │
│  └─────────────────────┘  │ border: 0                    │  │
│                           │ padding: 30px                 │  │
│                           │ width: 1200px                 │  │
│                           └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

| Panel | Primary Use |
|-------|------------|
| **Elements** | View/edit HTML structure and CSS styles in real time |
| **Console** | See JavaScript errors/warnings; run JS commands |
| **Sources** | Browse and set breakpoints in source files |
| **Network** | Monitor HTTP requests, file sizes, loading times |
| **Performance** | Record and analyze rendering performance |
| **Application** | Inspect cookies, localStorage, service workers |

### 8.4 Using the Elements Panel Step by Step

1. Open DevTools (`F12`).
2. Click the **Elements** tab.
3. **Hover** over elements in the DOM tree — they highlight on the page.
4. **Click** an element to select it.
5. The right panel shows all CSS rules applied to that element.
6. **Click a CSS property value** to edit it.
7. Changes apply INSTANTLY — you see the result immediately.
8. Press **Enter** to confirm, **Escape** to cancel.
9. To add a new property, click the empty space at the end of a rule block and type.
10. **Refresh the page** to discard all changes (they are temporary!).

### 🎒 Real-life example: Testing a Color Change

Your heading is navy blue (`#1a5276`). You want to try dark green.

1. Right-click the heading → Inspect.
2. In the Styles panel, find `color: #1a5276`.
3. Click `#1a5276` — a color picker appears.
4. Choose green or type `#1b5e20`.
5. The heading turns green instantly on the page.
6. Like it? Go to VS Code and update your CSS file.
7. Don't like it? Click the original value or refresh to undo.

This "try before you commit" workflow saves enormous time compared to editing CSS → saving → switching to browser → refreshing → checking → switching back.

### 8.5 Using the Device Toolbar (Responsive Testing)

1. In DevTools, click the **device toggle button** (phone/tablet icon) or press `Ctrl+Shift+M`.
2. Select a preset device (iPhone SE, iPad, Pixel 5, etc.) or enter custom dimensions.
3. The page renders at that exact screen size.
4. Test your responsive layout at multiple sizes.
5. Click the X or press `Ctrl+Shift+M` again to exit.

### 8.6 Using the Console Panel

The Console shows JavaScript errors, warnings, and log messages. You can also run JavaScript commands directly:

```javascript
// Change all headings to red
document.querySelectorAll('h2').forEach(h => h.style.color = 'red');

// Check if an element exists
console.log(document.querySelector('.gallery'));

// Count all links on the page
console.log(document.querySelectorAll('a').length);
```

⚠️ **Important notes**

- Console commands are TEMPORARY. They disappear on page refresh.
- Red text = JavaScript errors (something is broken).
- Yellow text = Warnings (not critical but worth investigating).
- White/blue text = Normal log output.

### 🧪 Try It Yourself — Edit CSS Live in DevTools

**Task (7 min):** Find the right value in the browser, then write it once in your file.

1. Open your site, press **F12**, and select a card in the **Elements** panel.
2. In the **Styles** pane, click any padding value and press the **up arrow** repeatedly. The page updates on every keypress.
3. Click the colour swatch next to a `background` and drag around the picker.
4. Add a brand-new property: click the blank space inside the rule and type `border-radius: 12px`.
5. When it looks right, copy the values into `css/style.css` and reload to confirm.

**Expected result:** You tune the design by eye in seconds instead of editing, saving, and reloading for each guess. Reloading discards every DevTools change — the file is the source of truth.

<details>
<summary>The three panels worth knowing well</summary>

**Elements → Styles.** Every rule matching the selected element, winner on top, losers struck through. This is where "why is my CSS not working" gets answered. The box model diagram at the bottom shows content, padding, border, and margin as measured numbers.

**Console.** Errors with a file name and line number. Read the *first* error, not the last — later ones are often consequences of it.

**Network.** Every request with its status. `404` in red means a path is wrong, and the row shows the exact URL the browser tried. Filter by type (CSS, Img, Font) to narrow it down fast.

One thing to be careful about: a struck-through property can mean two different things — either another rule won, or the value itself is invalid. DevTools shows a small warning triangle for the second case. `colour: red` is struck through because it is not a property; `color: reddish` because it is not a value.

</details>


---

## 9. Debugging Common Errors

### 9.1 Common HTML Errors

#### Error 1: Unclosed Tags

❌ **Wrong:**
```html
<div id="wrapper">
    <p>Welcome to our club
    <p>We meet every Wednesday
</div>
```

✅ **Correct:**
```html
<div id="wrapper">
    <p>Welcome to our club</p>
    <p>We meet every Wednesday</p>
</div>
```

How to find unclosed tags:
- Run the W3C validator — it tells you exactly which tag is unclosed
- In VS Code, look for mismatched highlighting (the closing tag might be a different color)
- Use the **Auto Close Tag** extension to prevent this entirely

#### Error 2: Improperly Nested Tags

❌ **Wrong:**
```html
<p>This is <strong>bold and <em>italic</strong></em> text.</p>
<!--                          ^^^^ closes strong BEFORE em -->
```

✅ **Correct:**
```html
<p>This is <strong>bold and <em>italic</em></strong> text.</p>
<!-- Tags close in REVERSE order of opening: LIFO -->
```

Think of tags like boxes. You cannot close the outer box before closing the inner box.

```
Opening order:  <strong> → <em>
Closing order:  </em> → </strong>   (reverse!)
```

#### Error 3: Missing Required Attributes

❌ **Wrong:**
```html
<img src="images/photo.jpg">
<a>Click here</a>
```

✅ **Correct:**
```html
<img src="images/photo.jpg" alt="Club members at annual gala">
<a href="events.html">Click here</a>
```

#### Error 4: Wrong Attribute Values

❌ **Wrong:**
```html
<a href="about html">About</a>          <!-- Missing dot -->
<img src="Images/photo.jpg" alt="...">  <!-- Wrong case (on some servers) -->
<video autoplay="true" controls>        <!-- Boolean attribute should not have value -->
```

✅ **Correct:**
```html
<a href="about.html">About</a>
<img src="images/photo.jpg" alt="...">
<video autoplay controls>
```

### 9.2 Common CSS Errors

#### Error 1: Missing Semicolons

❌ **Wrong:**
```css
h1 {
    color: navy          /* ← Missing semicolon! */
    font-size: 32px;
}
```

The browser may interpret `font-size` as part of the `color` value, causing BOTH properties to fail silently.

✅ **Correct:**
```css
h1 {
    color: navy;         /* ← Semicolon present */
    font-size: 32px;
}
```

⚠️ **Pro tip:** ALWAYS put a semicolon after EVERY property-value pair, even the last one. This prevents bugs when you add new properties later.

#### Error 2: Misspelled Properties

❌ **Wrong:**
```css
h1 {
    colr: navy;           /* Should be "color" */
    bakground: blue;      /* Should be "background" */
    margn: 10px;          /* Should be "margin" */
}
```

CSS does NOT show error messages for typos. The property is simply ignored. Your styles do not apply and you wonder why.

✅ **Correct:**
```css
h1 {
    color: navy;
    background: blue;
    margin: 10px;
}
```

How to catch typos:
- VS Code IntelliSense suggests valid properties as you type — USE IT
- The W3C CSS Validator flags unknown properties
- DevTools shows struck-through properties that are invalid

#### Error 3: Wrong Selector Syntax

❌ **Wrong:**
```css
/* Missing dot for class */
myClass {
    color: red;
}

/* Missing hash for ID */
header {
    background: blue;
}

/* Space instead of dot for descendant class */
nav .active {       /* This selects .active INSIDE nav — might be correct */
    color: white;
}
```

✅ **Correct:**
```css
.myClass {          /* Dot prefix for class selectors */
    color: red;
}

#header {           /* Hash prefix for ID selectors */
    background: blue;
}

nav .active {       /* Descendant selector — intentional */
    color: white;
}
```

#### Error 4: Specificity Confusion

Your CSS rule is correct but the style does not apply because a MORE SPECIFIC rule overrides it.

❌ **Confused:**
```css
/* This rule exists but the link is still blue */
a {
    color: red;
}

/* But elsewhere in the CSS... */
nav ul li a {
    color: blue;    /* More specific! Overrides the general rule */
}
```

✅ **Fix:** Either increase specificity or reorder:
```css
/* Option 1: Be more specific */
nav ul li a {
    color: red;
}

/* Option 2: Use DevTools to diagnose */
/* Right-click element → Inspect → See which rule wins */
```

Use DevTools to see exactly which CSS rules apply to an element and which ones are overridden (shown with strikethrough).

---

## 10. Code Formatting and Comments

### 10.1 Why Format Code?

Compare these two versions of the SAME code:

❌ **Unformatted (hard to read):**
```html
<div id="wrapper"><header><h1>Student Club</h1>
<nav><ul><li><a href="index.html">Home</a></li>
<li><a href="about.html">About</a></li></ul></nav></header>
<main><h2>Welcome</h2><p>Hello world</p></main></div>
```

✅ **Formatted (easy to read):**
```html
<div id="wrapper">
    <header>
        <h1>Student Club</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h2>Welcome</h2>
        <p>Hello world</p>
    </main>
</div>
```

Both produce identical output in the browser. But the formatted version is:
- Easier to READ
- Easier to DEBUG (you can spot nesting errors visually)
- Easier to MAINTAIN (adding/removing elements is straightforward)
- Expected PROFESSIONALLY (employers and instructors expect clean code)

### 10.2 Auto-Formatting in VS Code

- **Format entire file:** `Shift+Alt+F` (or right-click → Format Document)
- **Format selection:** Select code → `Ctrl+K Ctrl+F`
- **Format on save:** Enable in Settings → Search "format on save" → Check the box

With Prettier installed, formatting follows consistent rules automatically.

### 10.3 Using Comments Effectively

#### HTML Comments

```html
<!-- ==========================================
     HEADER SECTION
     ========================================== -->
<header>
    <h1>Student Club</h1>
    <nav>
        <!-- Main navigation — keep in sync across all pages -->
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
        </ul>
    </nav>
</header>

<!-- TODO: Add search functionality in Session 13 -->
<!-- FIXME: Mobile nav menu overlaps content on iPhone SE -->
```

#### CSS Comments

```css
/* ==========================================
   MAIN NAVIGATION STYLES
   ========================================== */
nav {
    background-color: #1a5276;
}

/* Navigation links — white text, no underline */
nav a {
    color: white;
    text-decoration: none;
    padding: 12px 20px;
}

/* Active page indicator — lighter blue background */
nav a.active {
    background-color: #2874a6;
}

/* TODO: Add hamburger menu for mobile screens */
/* FIXME: Dropdown z-index conflict with video player */
```

Comment conventions:
- Use `===` banner comments for major sections
- Use inline comments for non-obvious decisions
- Use `TODO:` for future improvements
- Use `FIXME:` for known issues
- Keep comments concise — explain WHY, not WHAT (the code already shows what)

⚠️ **Important notes**

- HTML comments use `<!-- -->`. CSS comments use `/* */`. They are NOT interchangeable.
- Comments are invisible in the browser. They do not affect rendering.
- Do NOT comment out large blocks of dead code. Delete them instead. Use Git history if you need to recover old code.
- Over-commenting is as bad as under-commenting. If the code is self-explanatory, skip the comment.

---

## ✅ Best Practices

1. **Use VS Code as your primary editor.** Not Notepad, not Word, not Dreamweaver Design View. VS Code is the industry standard.

2. **Install essential extensions early.** Live Server, Prettier, Auto Close/Rename Tag, and Path Intellisense will save you hours.

3. **Learn Emmet.** Spending 30 minutes learning Emmet abbreviations will save you dozens of hours over the semester.

4. **Format code consistently.** Set up "Format on Save" and never think about indentation again.

5. **Validate before submitting.** Run every HTML file through the W3C validator and every CSS file through the CSS validator. Zero errors should be your goal.

6. **Use DevTools for experimentation.** Try CSS changes in the browser FIRST, then copy working values to your stylesheet. This is faster than the edit-save-refresh cycle.

7. **Read error messages carefully.** Both the W3C validator and DevTools tell you EXACTLY what is wrong and WHERE. Do not ignore them.

8. **Use keyboard shortcuts.** Learn 3-4 new shortcuts per week. After a month, you will code significantly faster.

9. **Comment strategically.** Section banners for organization, inline notes for tricky parts, TODO/FIXME for tracking issues.

10. **Keep your VS Code updated.** New features and bug fixes arrive monthly. Help → Check for Updates.

---

## ❌ Common Mistakes

### Mistake 1: Coding in Notepad or Word

❌ **Wrong:** Writing HTML in Notepad (no syntax highlighting, no autocomplete, no error detection).

✅ **Correct:** Using VS Code with extensions for syntax highlighting, IntelliSense, Emmet, and validation.

### Mistake 2: Ignoring validation errors

❌ **Wrong:** "It looks fine in Chrome, so I don't need to validate."

✅ **Correct:** Validating with W3C tools. Chrome forgives many errors that break other browsers. Valid HTML is insurance.

### Mistake 3: Manual formatting

❌ **Wrong:** Pressing Space/Tab manually to indent code, sometimes using 2 spaces, sometimes 4, sometimes tabs.

✅ **Correct:** Setting up Prettier with "Format on Save." Consistent formatting happens automatically.

### Mistake 4: Not using DevTools

❌ **Wrong:** Editing CSS → Saving → Switching to browser → Refreshing → Checking → Switching back to editor → Repeat 50 times.

✅ **Correct:** Opening DevTools → Editing CSS live → Seeing instant results → Copying working values to your stylesheet.

### Mistake 5: Guessing at CSS properties

❌ **Wrong:** Typing `colour: red;` (British spelling) and wondering why it does not work.

✅ **Correct:** Typing `col` and letting IntelliSense suggest `color`. Accepting the suggestion prevents typos.

### Mistake 6: Leaving debug code in production

❌ **Wrong:** Submitting a project with `console.log("test")`, commented-out blocks, and `border: 3px solid red` debugging outlines.

✅ **Correct:** Removing all debug artifacts before submission. Clean code only.

### Mistake 7: Not using version control mindset

❌ **Wrong:** Making massive changes with no way to undo if something breaks. Creating `index_backup.html`, `index_backup2.html`, `index_final_FINAL.html`.

✅ **Correct:** Using VS Code's built-in Undo history (`Ctrl+Z`) for small changes. Learning Git basics for larger projects (covered in advanced courses). At minimum, keep regular ZIP backups.

### 🧪 Try It Yourself — Let the Formatter Do the Indenting

**Task (5 min):** Stop indenting by hand.

1. Deliberately mangle a page — remove all indentation, put three tags on one line.
2. Press **Shift+Alt+F** (Format Document).
3. Now enable it permanently: **Ctrl+,** → search "format on save" → tick **Editor: Format On Save**.
4. Mangle the file again, then just press **Ctrl+S**.

**Expected result:** The file reformats itself with consistent indentation, one element per line, and nesting made visible.

<details>
<summary>Why this is a correctness tool, not a tidiness tool</summary>

Formatting reveals structure. When the formatter indents a closing tag somewhere you did not expect, it is telling you the nesting is not what you thought — an unclosed `<div>` shows up immediately as everything after it drifting one level right.

Two habits to pair with it:

**Comment the closing tag of long blocks.** When `</div>` is 200 lines from its opener, label it:
```html
</div><!-- /.card-grid -->
```

**Comment sections in CSS**, so the file stays navigable:
```css
/* ===== Navigation ===== */
```

Neither adds a byte to the rendered page — HTML and CSS comments are stripped before rendering — but both make the file findable with Ctrl+F six weeks later.

</details>


---

# 📋 THEORY SUMMARY

| Concept | Definition | Example |
|---------|-----------|---------|
| VS Code | Free, extensible code editor by Microsoft | Industry-standard tool for web development |
| Extension | Plugin that adds features to VS Code | Live Server, Prettier, Auto Close Tag |
| Emmet | Built-in abbreviation expander for HTML/CSS | `ul>li*5` + Tab = full list structure |
| Keyboard shortcut | Key combination for fast actions | `Ctrl+D` = select next occurrence |
| Integrated terminal | Built-in command line inside VS Code | Run `ls`, `cd`, Live Server without leaving editor |
| W3C HTML Validator | Official tool checking HTML against standards | https://validator.w3.org/ |
| W3C CSS Validator | Official tool checking CSS against standards | https://jigsaw.w3.org/css-validator/ |
| DevTools | Browser-built inspection and debugging suite | F12 → Elements panel → Edit CSS live |
| Elements panel | DevTools panel showing HTML DOM and CSS styles | Click element → See/modify its CSS |
| Console panel | DevTools panel for JS errors and commands | `document.querySelector('h1')` |
| Device toolbar | DevTools feature simulating mobile screens | `Ctrl+Shift+M` → Select iPhone SE |
| Code formatting | Consistent indentation and spacing | Prettier auto-formats on save |
| Comments | Invisible annotations in code | `<!-- TODO: add search -->` or `/* Section header */` |

---

# 💡 WORKED EXAMPLES

## Example 1: Using Emmet to Build a Page Skeleton

**Situation:** You are creating a new page `schedule.html` for the Student Club Website. You need the basic HTML5 structure with header, nav, main content area, sidebar, and footer.

**Code (typed as Emmet, then expanded):**

Type this single line:
```
!
```
Press Tab → Get full HTML5 boilerplate.

Then inside `<body>`, type:
```
div#wrapper>header>h1{Student Club}+p{Learn. Create. Connect.}^nav>ul>li*6>a[href="#"]^^div#main-area>main>h2{Weekly Schedule}+section*3>h3+p^aside#sidebar>h3{Quick Links}+ul>li*4>a[href="#"]^^footer>p{© 2024 Student Club}
```
Press Tab.

**Expanded result:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="wrapper">
        <header>
            <h1>Student Club</h1>
            <p>Learn. Create. Connect.</p>
        </header>
        <nav>
            <ul>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
                <li><a href="#"></a></li>
            </ul>
        </nav>
        <div id="main-area">
            <main>
                <h2>Weekly Schedule</h2>
                <section>
                    <h3></h3>
                    <p></p>
                </section>
                <section>
                    <h3></h3>
                    <p></p>
                </section>
                <section>
                    <h3></h3>
                    <p></p>
                </section>
            </main>
            <aside id="sidebar">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                </ul>
            </aside>
        </div>
        <footer>
            <p>© 2024 Student Club</p>
        </footer>
    </div>
</body>
</html>
```

**Line-by-line explanation of the Emmet abbreviation:**

| Part | Meaning |
|------|---------|
| `div#wrapper` | `<div id="wrapper">` |
| `>` | Child — nest everything inside wrapper |
| `header>h1{Student Club}+p{...}` | Header with h1 and paragraph |
| `^` | Climb up one level (back to wrapper) |
| `nav>ul>li*6>a[href="#"]` | Nav with 6 list items containing links |
| `^^` | Climb up TWO levels (back to wrapper, past nav) |
| `div#main-area>main>...` | Main content area |
| `section*3>h3+p` | Three sections, each with heading and paragraph |
| `^` | Climb up (back to main-area) |
| `aside#sidebar>h3{Quick Links}+ul>li*4>a` | Sidebar with heading and 4 links |
| `^^` | Climb up to wrapper |
| `footer>p{© 2024...}` | Footer with copyright |

**Result:** A complete page skeleton generated in under 5 seconds. Now fill in the actual content (link URLs, section headings, paragraph text).

---

## Example 2: Debugging a Layout Issue with DevTools

**Situation:** Your sidebar is appearing BELOW the main content instead of beside it. You expected a two-column layout.

**Step 1 — Inspect the problem:**
1. Right-click the sidebar → Inspect.
2. In the Elements panel, you see:
```html
<aside id="sidebar" style="width: 30%; float: left;">
```

**Step 2 — Check the CSS:**
In the Styles panel, you see:
```css
#sidebar {
    width: 30%;
    float: left;
}
```

But the Computed panel shows the sidebar is 100% wide. Why?

**Step 3 — Investigate:**
You notice the parent `#main-area` has no defined width and no `overflow: hidden`. The floated sidebar wraps because the container collapsed.

**Step 4 — Test a fix LIVE in DevTools:**
1. Click on the `#main-area` element in the DOM tree.
2. In the Styles panel, click the empty space to add a new property.
3. Type `overflow: hidden` and press Enter.
4. The sidebar snaps into place beside the main content!

**Step 5 — Apply the fix permanently:**
1. Go to VS Code.
2. Open `css/style.css`.
3. Find the `#main-area` rule.
4. Add `overflow: hidden;`.
5. Save.
6. Refresh the browser to confirm.

**Result:** Bug diagnosed and fixed in under 2 minutes using DevTools, without any guesswork.

---

## Example 3: Finding and Fixing Validation Errors

**Situation:** You validate `events.html` and the W3C validator reports 3 errors.

**Error 1:** Line 24 — "Element `img` is missing required attribute `alt`."

```html
<!-- Line 24 — WRONG -->
<img src="images/workshop.jpg" width="300">

<!-- FIXED -->
<img src="images/workshop.jpg" width="300" alt="Students collaborating at a coding workshop">
```

**Error 2:** Line 38 — "End tag `div` seen, but there were open elements."

```html
<!-- Lines 30-38 — WRONG: Missing closing </p> -->
<section>
    <h3>Social Night</h3>
    <p>Join us for a fun evening of games and networking.
    <p>Date: Friday, November 15th</p>
</section>

<!-- FIXED -->
<section>
    <h3>Social Night</h3>
    <p>Join us for a fun evening of games and networking.</p>
    <p>Date: Friday, November 15th</p>
</section>
```

**Error 3:** Line 52 — "Duplicate ID `event-details`."

```html
<!-- Lines 45 and 52 — WRONG: Same ID used twice -->
<div id="event-details">Workshop info...</div>
<div id="event-details">Social Night info...</div>

<!-- FIXED: Unique IDs -->
<div id="workshop-details">Workshop info...</div>
<div id="social-details">Social Night info...</div>
```

**Process:**
1. Fix errors from TOP to BOTTOM (line 24 first, then 38, then 52).
2. After fixing all three, re-validate.
3. Result: ✅ "Document checking completed. No errors or warnings to show."

---

## Example 4: Using Find-and-Replace Across All Files

**Situation:** You changed the club email from `club@university.edu` to `studentclub@vnuis.edu.vn`. You need to update it everywhere, but you remember removing redundancy in Session 11 — it should only appear on `contact.html`. Let us verify.

**Steps:**
1. Press `Ctrl+Shift+F` (Find in Files).
2. Search: `club@university.edu`
3. Results show matches in:
   - `contact.html` line 45 ← Only expected location
   - `footer` in `index.html` line 89 ← Oops! Forgot to remove this one
   - `footer` in `about.html` line 92 ← Another leftover

4. Since footers often include contact info, decide: either update all footers OR remove email from footers and link to Contact page.

**Decision:** Update the email in all locations since footer contact info is standard practice.

5. Press `Ctrl+Shift+H` (Replace in Files).
6. Find: `club@university.edu`
7. Replace: `studentclub@vnuis.edu.vn`
8. Click **Replace All**.
9. Review the diff preview to confirm only intended changes.
10. Click **Apply**.

**Result:** Email updated across all files in one operation. No missed instances.

---

# 🛠️ HANDS-ON PRACTICE

## Setup

1. Install VS Code from https://code.visualstudio.com/ (if not already installed).
2. Open your **StudentClubWebsite** folder in VS Code (**File → Open Folder**).
3. Install these extensions (**Ctrl+Shift+X**):
   - Live Server
   - Prettier - Code formatter
   - Auto Close Tag
   - Auto Rename Tag
   - Path Intellisense
4. Enable "Format on Save":
   - **Ctrl+,** (Settings) → Search "format on save" → Check the box.
5. Open `index.html` and start Live Server (right-click → Open with Live Server).

---

### TASK 1: Practice Emmet Abbreviations

🎯 **Goal:** Build fluency with Emmet by generating common structures.

🔧 **Steps:**

1. Create a new file `practice.html` in your project root.
2. Type `!` and press Tab → Verify the HTML5 boilerplate appears.
3. Inside `<body>`, practice these abbreviations (type each, press Tab, observe the result):

| # | Type This | Expected Output |
|---|-----------|----------------|
| 1 | `div.container>h2{Events}+p{Upcoming activities}` | Div with class, heading, paragraph |
| 2 | `ul>li*5>a[href="#"]{Link $}` | UL with 5 LIs containing numbered links |
| 3 | `section.card*3>img[src="images/event$.jpg"][alt="Event $"]+h3{Event $}+p{Description $}` | 3 card sections with images, headings, paragraphs |
| 4 | `footer>p{© 2024}+nav>ul>li*3>a[href="#"]` | Footer with copyright and mini-nav |

4. After practicing, delete the contents of `practice.html` (keep the file for Task 2).

✅ **Check:** Each abbreviation expanded correctly. You understand the `>`, `+`, `*`, `.`, `#`, `{}`, `[]`, and `$` syntax.

💾 **Save** the file.

---

### TASK 2: Use Keyboard Shortcuts to Edit Code

🎯 **Goal:** Practice essential shortcuts on real code.

🔧 **Steps:**

1. Open `index.html`.
2. Practice these operations:

| Operation | Shortcut | Try It |
|-----------|----------|--------|
| Go to line 15 | `Ctrl+G` → Type 15 → Enter | Jump to line 15 |
| Find "Student Club" | `Ctrl+F` → Type "Student Club" | Highlight all matches |
| Select next match | `Ctrl+D` | Select second occurrence |
| Move a line down | Click a line → `Alt+↓` | Reorder lines |
| Duplicate a line | Click a line → `Shift+Alt+↓` | Copy line below |
| Comment out a line | Click a line → `Ctrl+/` | Toggle HTML comment |
| Delete a line | Click a line → `Ctrl+Shift+K` | Remove entire line |
| Undo everything | `Ctrl+Z` repeatedly | Restore original state |

3. After practicing, make sure `index.html` is back to its original state (undo all practice changes).

✅ **Check:** You can perform each shortcut without looking at the keyboard reference.

💾 **Save** (should be unchanged after undoing practice edits).

---

### TASK 3: Validate All HTML Pages

🎯 **Goal:** Validate every HTML file and fix all errors.

🔧 **Steps:**

1. Go to https://validator.w3.org/#validate_by_upload
2. Upload `index.html` → Click Check.
3. Record any errors. Fix them in VS Code.
4. Re-upload and re-check until VALID.
5. Repeat for: `about.html`, `events.html`, `gallery.html`, `media.html`, `contact.html`.
6. If you installed the W3C Web Validator extension, you can also validate directly in VS Code: `Ctrl+Shift+P` → "W3C Validate".

✅ **Check:** ALL pages pass validation with zero errors.

💾 **Save** all fixed files.

---

### TASK 4: Validate Your CSS

🎯 **Goal:** Validate `css/style.css` and fix all errors.

🔧 **Steps:**

1. Go to https://jigsaw.w3.org/css-validator/#validator_by_upload
2. Upload `css/style.css` → Click Check.
3. Review errors and warnings.
4. Fix errors in VS Code.
5. Re-validate until clean.

✅ **Check:** CSS validates with zero errors (warnings are acceptable but review them).

💾 **Save** the stylesheet.

---

### TASK 5: Debug with Browser DevTools

🎯 **Goal:** Use DevTools to inspect and experiment with your site's CSS.

🔧 **Steps:**

1. Open `index.html` in Chrome/Edge (via Live Server or directly).
2. Press `F12` to open DevTools.
3. **Elements Panel:**
   - Click the `<header>` element in the DOM tree.
   - In the Styles panel, change the `background-color` to a new color.
   - Observe the instant change on the page.
   - Change it back or refresh to undo.
4. **Device Toolbar:**
   - Press `Ctrl+Shift+M`.
   - Select "iPhone SE" from the dropdown.
   - Observe how your layout adapts.
   - Try "iPad Mini" and "Pixel 5".
   - Exit device mode with `Ctrl+Shift+M`.
5. **Console Panel:**
   - Click the Console tab.
   - Type: `document.querySelectorAll('a').length`
   - Press Enter → See the total number of links on the page.
   - Type: `document.querySelector('h1').textContent`
   - Press Enter → See the heading text.
6. **Network Panel:**
   - Click the Network tab.
   - Refresh the page (`F5`).
   - Observe all files loading (HTML, CSS, images, fonts).
   - Note file sizes and loading times.
   - Identify any failed requests (red entries = broken links/missing files).

✅ **Check:** You can navigate all four DevTools panels confidently. You inspected elements, tested responsive layouts, ran console commands, and checked network requests.

💾 No files changed (DevTools edits are temporary).

---

### TASK 6: Format and Comment Your Code

🎯 **Goal:** Ensure all code is properly formatted and documented.

🔧 **Steps:**

1. Open each HTML file.
2. Press `Shift+Alt+F` to auto-format.
3. Verify indentation is consistent (2 or 4 spaces — whatever Prettier configured).
4. Add section comments to each HTML file:

```html
<!-- ========== HEADER ========== -->
<header>...</header>

<!-- ========== NAVIGATION ========== -->
<nav>...</nav>

<!-- ========== MAIN CONTENT ========== -->
<main>...</main>

<!-- ========== SIDEBAR ========== -->
<aside>...</aside>

<!-- ========== FOOTER ========== -->
<footer>...</footer>
```

5. Open `css/style.css`.
6. Press `Shift+Alt+F` to auto-format.
7. Add section banner comments:

```css
/* ==========================================
   GLOBAL STYLES
   ========================================== */

/* ==========================================
   HEADER STYLES
   ========================================== */

/* ==========================================
   NAVIGATION STYLES
   ========================================== */

/* ==========================================
   MAIN CONTENT STYLES
   ========================================== */

/* ==========================================
   SIDEBAR STYLES
   ========================================== */

/* ==========================================
   FOOTER STYLES
   ========================================== */

/* ==========================================
   RESPONSIVE / MEDIA QUERIES
   ========================================== */
```

8. Save ALL files.

✅ **Check:** All files are consistently formatted. Section comments make navigation easy. Anyone reading your code can find specific sections quickly.

💾 **Final save.** Your codebase is now professional-grade.

---

# 🐛 COMMON ERRORS — WHAT THE BROWSER SHOWS YOU

This chapter is about the tools that find errors, so the table works the other way round: here is what each tool reports, and what it means.

| What the tool tells you | What it means | Where you see it | What to do |
|---|---|---|---|
| `Failed to load resource: 404 (Not Found)` | The browser asked for a file that is not at that path | Console and Network tabs | Compare the requested URL against the real file name and location |
| `Uncaught SyntaxError: Unexpected token` | JavaScript could not be parsed — usually a missing bracket or quote | Console, with a file and line number | Go to that line; the real error is often just above it |
| `Uncaught ReferenceError: x is not defined` | A name is used before it exists, or is misspelled | Console | Check the spelling and the script load order |
| `End tag for "div" omitted` (validator) | An element was never closed | W3C HTML validator | Add the closing tag at the right nesting level |
| `Stray end tag` (validator) | A closing tag has no matching opener | W3C HTML validator | Delete it, or add the opening tag |
| `Duplicate ID` (validator) | The same `id` appears twice | W3C HTML validator | `id` must be unique per page; use a class for repeats |
| A rule struck through in the Styles pane | That declaration lost to a more specific or later rule | DevTools Elements → Styles | Read the winning rule above it and adjust specificity |
| `Parse Error` (CSS validator) | Usually a missing `}` or `;` | W3C CSS validator | Fix at the reported line; everything after it was ignored |
| Lighthouse: "Background and foreground colours do not have a sufficient contrast ratio" | Text fails WCAG AA | Lighthouse accessibility audit | Darken the text or lighten the background to 4.5:1 |
| Lighthouse: "Image elements do not have `[alt]` attributes" | Missing alt text | Lighthouse accessibility audit | Add descriptive `alt`, or `alt=""` for decoration |
| Emmet expands nothing when you press Tab | The file is not recognised as HTML, or Emmet is off | The status bar shows the language mode | Save with a `.html` extension; check the language mode |
| Live Server does not reload on save | The file is not inside the opened folder | The browser URL is `file://`, not `127.0.0.1` | Open the project folder in VS Code, then start Live Server |

**Order to debug in:** Console first (it names the file and line), then Network (it shows what failed to load), then the validator (it finds structural HTML errors the browser silently repaired), then Lighthouse (it finds what works but should not ship). Reversing that order wastes time.

---


# ✅ SELF-CHECK QUESTIONS

Answer these from memory first, then expand the answer to check yourself.

**Q1. What does Live Server give you that double-clicking an HTML file does not?**

<details>
<summary>Answer</summary>

Two things. **Auto-reload:** saving a file refreshes the browser automatically, so you never press F5. And a real **HTTP context** — the page is served from `http://127.0.0.1:5500` instead of `file:///C:/...`, so relative paths and anything else that depends on an origin behave the way they will on a real server.

</details>

---

**Q2. Explain the Emmet abbreviation `ul>li*3>a[href=#]{Link $}`.**

<details>
<summary>Answer</summary>

- `ul>li` — `>` means child, so `<li>` goes inside `<ul>`
- `*3` — repeat the `<li>` three times
- `>a[href=#]` — each `<li>` gets a child `<a>` with `href="#"`
- `{Link $}` — text content, where `$` auto-increments

Result: a `<ul>` with three `<li>` items containing links labelled Link 1, Link 2, Link 3.

</details>

---

**Q3. Why validate HTML at validator.w3.org when the page already looks fine?**

<details>
<summary>Answer</summary>

Browsers silently repair broken markup, and each one repairs it differently — so "looks fine in Chrome" is not evidence of valid HTML. The validator catches unclosed tags, duplicate IDs, missing `alt` attributes, and invalid nesting that will break in another browser, break your CSS selectors, or fail accessibility review.

</details>

---

**Q4. What is the difference between the VS Code Problems panel and the W3C validator?**

<details>
<summary>Answer</summary>

The **Problems panel** is live and local: it flags syntax errors, unclosed tags, and unknown CSS properties as you type. The **W3C validator** is authoritative and complete: it checks the full document against the HTML specification, including semantic and accessibility rules the editor does not know about. Use the panel while writing, the validator before submitting.

</details>

---

**Q5. Which DevTools panel do you open to find out why an element is the wrong colour?**

<details>
<summary>Answer</summary>

**Elements** (Inspect). Select the element and read the Styles pane on the right: every matching rule is listed in cascade order, with overridden declarations struck through and the winning rule at the top. It also shows which file and line each rule came from, so you can find out exactly which selector is beating yours.

</details>

---

**Q6. Are changes you make in DevTools permanent?**

<details>
<summary>Answer</summary>

No. DevTools edits live only in the browser's in-memory copy and vanish on reload. It is the ideal place to **experiment** — try five padding values in ten seconds — but once you find the value you want you must copy it into your real `.css` file and save.

</details>

---

**Q7. What does Shift+Alt+F do, and why does consistent formatting matter?**

<details>
<summary>Answer</summary>

It runs VS Code's document formatter, re-indenting the whole file consistently. It matters because indentation is how you see structure: with consistent nesting, an unclosed `<div>` is visually obvious, whereas in ragged code it hides. It also makes diffs readable and is a basic professional courtesy to anyone else reading your file.

</details>

---

**Q8. Why should you not mix tabs and spaces in one file?**

<details>
<summary>Answer</summary>

Tab width is a per-editor setting, so a file mixing both looks correctly aligned in your editor and jumbled in someone else's. Nesting becomes impossible to read, which hides structural bugs. Pick one — spaces are the common convention for HTML and CSS — and let the formatter enforce it.

</details>

---


# 📝 SELF-ASSESSMENT WORKSHEET

| # | I can... | Yes | No |
|---|----------|-----|----|
| 1 | Open a project folder in VS Code and navigate the interface | ☐ | ☐ |
| 2 | Install and use essential extensions (Live Server, Prettier, Auto Close Tag) | ☐ | ☐ |
| 3 | Use Emmet abbreviations to generate HTML/CSS structures quickly | ☐ | ☐ |
| 4 | Use keyboard shortcuts for editing, navigation, and formatting | ☐ | ☐ |
| 5 | Validate HTML using the W3C Markup Validator and fix errors | ☐ | ☐ |
| 6 | Validate CSS using the W3C CSS Validator and fix errors | ☐ | ☐ |
| 7 | Use browser DevTools to inspect elements, edit CSS live, and test responsiveness | ☐ | ☐ |
| 8 | Identify and fix common HTML/CSS errors (unclosed tags, typos, missing semicolons) | ☐ | ☐ |

If you answered "No" to any item, re-read the relevant Theory section and redo the corresponding Hands-On task.

---

# 🔗 FURTHER READING

- [VS Code Getting Started — Official Docs](https://code.visualstudio.com/docs/getstarted/introvideos)
- [Emmet cheat sheet — Official Docs](https://docs.emmet.io/cheat-sheet/)
- [Chrome DevTools overview — MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools)
- [Debugging HTML — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Debugging_HTML)
- [Debugging CSS — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Debugging_CSS)
- [W3C Markup Validator](https://validator.w3.org/)
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- [Keyboard shortcuts for VS Code — Official Docs](https://code.visualstudio.com/docs/getstarted/keybindings)
- [Prettier documentation](https://prettier.io/docs/en/)

---

# ⏭️ NEXT SESSION

Congratulations! You have completed the core INS2053 web authoring curriculum. Your Student Club Website is now a polished, validated, multi-page site with multimedia, responsive design, and professional code quality. Continue building, experimenting, and exploring — the web is yours to create!
