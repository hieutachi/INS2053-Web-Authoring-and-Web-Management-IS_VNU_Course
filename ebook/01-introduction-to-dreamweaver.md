# 🟦 SESSION 1
# **Introduction to Dreamweaver & Web Fundamentals**

Welcome to your very first session in INS2053 — Web Authoring and Web Management! Today you will learn what a website actually is, how web pages work behind the scenes, and how to use a code editor (Dreamweaver CS6 or VS Code) to create your very first HTML file. By the end of this session you will have a real, working web page saved on your computer that you can open in any browser. Do not worry if everything feels new — we will walk through every single step together, and by the end of the course you will have built a complete **Student Club Website** from scratch.

---

# 📌 SESSION INFORMATION

```
📅 Duration:     3 periods (150 minutes) — Theory ~60 min, Practice ~90 min
📚 Reference:    MDN "Getting Started with the Web"
                 https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
🎯 Objectives:   1. Explain what a website, webpage, and HTML file are
                 2. Identify the main parts of a code editor workspace (Dreamweaver / VS Code)
                 3. Create a proper project folder structure for a website
                 4. Write, save, and preview your first HTML5 page
                 5. Understand the basic anatomy of an HTML document
📖 Prepare:      1. Install Adobe Dreamweaver CS6 OR Visual Studio Code (free) on your laptop
                 2. Create an empty folder called "StudentClubWebsite" inside your Documents folder
                 3. Read MDN "How the Web works" (link in Further Reading below)
🖼 Diagrams:     canvases/buoi-01.canvas.tsx — RequestResponseCycle, TagAnatomy, HeadVsBody
🔗 Outcomes:     CLO1 (master basic web design and build skills)
                 CLO4 (design and build a web application)
```

---

# 🎯 LEARNING OBJECTIVES

After this session you will be able to:

- Define the terms **website**, **webpage**, **HTML file**, and **web browser** in your own words
- Describe the difference between Design View, Code View, and Split View in Dreamweaver
- Navigate the Dreamweaver (or VS Code) workspace confidently
- Create a well-organized project folder with subfolders for images, CSS, and JavaScript
- Write a valid HTML5 document from scratch and preview it in a web browser
- Explain the purpose of each part of the basic HTML boilerplate (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`)

---

# 📖 THEORY

## 1. What Is a Website?

> 🖼 **Diagram:** `canvases/buoi-01.canvas.tsx` → `RequestResponseCycle` — slide `how-web-works` ("How the Web Works")

### 1.1 Definition

A **website** is a collection of related **web pages** that are stored on a computer (either your own computer or a server on the internet) and connected to each other through **hyperlinks**. Each web page is a separate file written in a language called **HTML** (HyperText Markup Language).

When someone types a website address (like `www.studentclub.edu.vn`) into their browser, the browser downloads the HTML files from a server and displays them as a visual page.

### 🎒 Real-life Example

Think of a website like a **textbook**:

- The **textbook** = the entire website
- Each **chapter** = one web page (one `.html` file)
- The **table of contents** = the navigation menu that links to each chapter
- The **printing press** = the web server that stores and delivers the book
- The **reader's eyes** = the web browser that reads and displays the content

Just as a textbook has many chapters bound together, a website has many HTML pages linked together.

### 1.2 Why It Matters

| Reason | Explanation |
|--------|-------------|
| Understanding structure | You cannot build a good website if you do not understand that it is made of individual files |
| Planning your project | Knowing that each page is a separate file helps you plan your folder structure before you start coding |
| Debugging | When something breaks, knowing the difference between a page, a file, and a site helps you find the problem faster |
| Communication | In a team project, everyone needs to agree on what "page," "site," and "file" mean |

```
HOW A WEBSITE WORKS (simplified):

+------------------+       +----------------+       +------------------+
|  YOU (Author)    | ----> |  WEB SERVER    | ----> |  USER'S BROWSER  |
|                  |       |                |       |                  |
| Write HTML files |       | Stores files   |       | Reads HTML       |
| Upload to server |       | Sends files    |       | Displays page    |
+------------------+       +----------------+       +------------------+

For local testing (this course):
+------------------+       +------------------+
|  YOU (Author)    | ----> |  YOUR BROWSER    |
|                  |       |                  |
| Write HTML files |       | Opens local file |
| Save to folder   |       | Displays page    |
+------------------+       +------------------+
```

⚠️ Important notes:

- A website is NOT a single file. It is many files working together.
- The main page of any website should always be named `index.html`. This is a universal convention — web servers automatically look for this file when someone visits your site.
- Even though we are working locally (on your own computer) during this course, the same principles apply when you publish to the internet later.

---

## 2. What Is an HTML File?

> 🖼 **Diagram:** `canvases/buoi-01.canvas.tsx` → `TagAnatomy` — slide `what-is-html` ("What Is an HTML File?")

### 2.1 Definition

An **HTML file** is a plain text file that contains instructions for a web browser. These instructions are written using special markers called **tags**. Tags tell the browser things like "this is a heading," "this is a paragraph," "this is an image," and so on.

The file extension `.html` tells the operating system and the browser that this file contains HTML code.

### 🎒 Real-life Example

Think of an HTML file like a **recipe card**:

- The recipe card itself = the `.html` file
- The ingredients list = the content (text, images)
- The cooking instructions = the HTML tags that tell the browser how to display each ingredient
- The person cooking = the web browser that follows the instructions

If you hand a recipe card to two different cooks, they will produce similar dishes. Similarly, if you give an HTML file to Chrome, Firefox, or Edge, they will all display roughly the same page.

### 2.2 Why It Matters

| Concept | Why You Need to Know It |
|---------|------------------------|
| Plain text format | HTML files are just text — you can open them in Notepad, but a code editor makes life much easier |
| File extension `.html` | If you save a file as `.txt` instead of `.html`, the browser will not treat it as a web page |
| Tags | Tags are the building blocks of every web page; without understanding tags, you cannot write HTML |
| Browser independence | Any modern browser can read any valid HTML file — you are not locked into one tool |

⚠️ Important notes:

- HTML is **not** a programming language. It is a **markup language** — it describes the structure of content, not logic or calculations.
- HTML files are human-readable. You can right-click any `.html` file and open it with Notepad to see the raw code.
- Always use lowercase for HTML tags: `<p>` not `<P>`. Both may work, but lowercase is the standard.

### 🧪 Try It Yourself — Read a Real Page's HTML

**Task (4 min):** Confirm that every site you use is built from the same tags you are learning.

1. Open any news site or your university's home page.
2. Press **Ctrl+U** to view the source.
3. Press **Ctrl+F** inside that view and search for `<h1`, then for `<img`, then for `<a href`.

**Expected result:** You find all three. The page is longer and messier than yours, but the vocabulary is identical.

<details>
<summary>What the mess is</summary>

Real pages carry generated class names, analytics scripts, and framework output. None of that is a different language — it is the same HTML, produced by tools instead of typed by hand. The skill you are building is reading structure through the noise: find `<body>`, then look for the landmark elements inside it.

</details>


---

## 3. Web Browsers

### 3.1 Definition

A **web browser** is a software application that reads HTML files and renders (displays) them as visual web pages. Popular browsers include Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari.

The browser does three things:

1. **Downloads** the HTML file (from a server or from your local hard drive)
2. **Parses** the HTML code (reads and interprets each tag)
3. **Renders** the page (draws the text, images, colors, and layout on screen)

### 🎒 Real-life Example

Think of a browser like a **translator at the United Nations**:

- The speaker gives a speech in one language (the HTML code)
- The translator listens carefully to every word (parses the HTML)
- The translator speaks the meaning in another language (renders the visual page)

Different translators might phrase things slightly differently, but the meaning stays the same. Similarly, Chrome and Firefox might render a page with tiny differences, but the overall result is the same.

### 3.2 Why It Matters

| Reason | Detail |
|--------|--------|
| Testing | You should test your pages in at least two browsers to catch rendering differences |
| Developer Tools | Every modern browser has built-in Developer Tools (press F12) that let you inspect your page |
| Default behavior | Each browser has default styles for headings, paragraphs, links, etc. — this is why unstyled pages still look readable |
| Updates | Browsers update frequently; new features become available over time |

⚠️ Important notes:

- For this course, we recommend **Google Chrome** or **Microsoft Edge** as your primary testing browser.
- Press **F12** in any browser to open Developer Tools — this is one of the most important debugging tools you will ever use.
- Never assume your page looks the same in every browser. Always check.

---

## 4. Code Editors: Dreamweaver vs. VS Code

### 4.1 Definition

A **code editor** is a specialized text editor designed for writing code. Unlike a regular word processor (like Microsoft Word), a code editor provides:

- **Syntax highlighting** — different colors for tags, attributes, and values
- **Auto-completion** — suggests tags and attributes as you type
- **Line numbers** — easy to find errors when the browser reports "error on line 47"
- **File management** — see all your project files in one panel
- **Live preview** — see changes instantly without switching windows

### 4.2 Dreamweaver CS6

Adobe Dreamweaver CS6 was released in 2012. It was one of the most popular web development tools of its era. Key features:

- **Design View** — a WYSIWYG (What You See Is What You Get) editor where you can visually drag and drop elements
- **Code View** — a traditional code editor with syntax highlighting
- **Split View** — shows both Design and Code side by side
- **Site Management** — built-in tools to define and manage your project files
- **Properties Panel** — lets you modify element properties visually

```
DREAMWEAVER CS6 WORKSPACE (simplified):

+---------------------------------------------------------------+
|  Menu Bar                                                     |
|  (File | Edit | View | Insert | Modify | Text | Site)         |
+---------------------------------------------------------------+
|  Document Toolbar                                             |
|  [ Design | Split | Code ]  [ Title field ]  [ Preview btn ]  |
+---------------------+-----------------------------------------+
|                     |                                         |
|  Files Panel        |   Document Window                       |
|  (Your project      |   (Shows Design View, Code View,        |
|   files listed      |    or Split View depending on           |
|   here)             |    which mode you selected)             |
|                     |                                         |
|  - index.html       |                                         |
|  - about.html       |                                         |
|  - images/          |                                         |
|  - css/             |                                         |
|                     |                                         |
+---------------------+-----------------------------------------+
|  Properties Panel                                             |
|  (Shows options for whatever element is currently selected)   |
+---------------------------------------------------------------+
```

### 4.3 VS Code (Visual Studio Code)

VS Code is a free, open-source code editor made by Microsoft. It is the industry standard today. Key features:

- **Lightweight and fast** — opens instantly, even on older computers
- **Extensions** — thousands of free extensions for HTML, CSS, live preview, Git, and more
- **Integrated Terminal** — run commands without leaving the editor
- **Git integration** — version control built right in
- **Live Server extension** — auto-refreshes the browser when you save

### 🔍 Comparison Table

| Feature | Dreamweaver CS6 | VS Code |
|---------|----------------|---------|
| Price | Paid (expensive) | Free and open-source |
| Release year | 2012 | 2015 (actively updated) |
| Design View (WYSIWYG) | Yes | No (use Live Server extension instead) |
| Code editing | Good | Excellent |
| Extensions / Plugins | Limited | Thousands available |
| Speed | Slower on modern systems | Fast and lightweight |
| Industry usage today | Rare | Very common |
| Built-in site management | Yes | Use extensions or manual setup |
| Git support | Basic | Excellent |
| Best for this course | Learning visual + code together | Professional workflow |

⚠️ Important notes:

- **For this course, you may use either Dreamweaver CS6 or VS Code.** The instructor will demonstrate Dreamweaver, but all code examples work identically in both editors.
- If you choose VS Code, install the **"Live Server"** extension by Ritwick Dey — it gives you a preview feature similar to Dreamweaver's Design View.
- Dreamweaver CS6 is old software. Some features may not work perfectly on Windows 11. VS Code is recommended for long-term use.
- Regardless of which editor you use, **you must learn to read and write HTML code directly.** Do not rely solely on visual drag-and-drop tools.

---

## 5. Project Folder Structure

### 5.1 Definition

A **project folder structure** is the way you organize all the files that make up your website. Good organization prevents confusion, broken links, and lost files.

Every professional website uses a consistent folder structure. For our Student Club Website, we will use this structure throughout the entire course:

```
StudentClubWebsite/              <-- Root folder (your "site")
│
├── index.html                   <-- Home page (MUST be named index.html)
├── about.html                   <-- About Us page
├── events.html                  <-- Events page
├── contact.html                 <-- Contact page
│
├── images/                      <-- ALL images go here
│   ├── club-logo.png
│   ├── banner.jpg
│   └── team-photo.jpg
│
├── css/                         <-- ALL stylesheets go here
│   └── style.css
│
├── js/                          <-- ALL JavaScript files go here
│   └── main.js
│
└── documents/                   <-- Downloads, PDFs, etc.
    └── club-constitution.pdf
```

### 🎒 Real-life Example

Think of your project folder like a **filing cabinet in an office**:

- The filing cabinet itself = the root folder (`StudentClubWebsite/`)
- Each drawer = a subfolder (`images/`, `css/`, `js/`, `documents/`)
- Each file inside a drawer = an actual file (`logo.png`, `style.css`, `main.js`)

If you throw all papers into one drawer without sorting, you will never find anything. The same is true for website files.

### 5.2 Why It Matters

| Benefit | Explanation |
|---------|-------------|
| Easy navigation | You always know where to find images, styles, or scripts |
| Relative paths work correctly | Links between files depend on predictable folder locations |
| Team collaboration | Everyone on the team knows where to put new files |
| Deployment | When you upload to a server, the entire folder structure is copied as-is |
| Maintenance | Six months from now, you can still find and update files quickly |

⚠️ Important notes:

- **Never** store website files on your Desktop or scattered across multiple folders.
- **Always** create the folder structure BEFORE you start writing code.
- Keep folder and file names **lowercase**, use **hyphens** instead of spaces, and avoid special characters.
- The root folder name should match your project name: `StudentClubWebsite`.

### 🧪 Try It Yourself — Build the Folder Structure Now

**Task (5 min):** Create the structure you will use for the whole capstone.

1. Inside `Documents`, create a folder named exactly `StudentClubWebsite`.
2. Inside it, create three subfolders: `css`, `img`, `pages`.
3. In VS Code use **File → Open Folder** and select `StudentClubWebsite`.
4. In the Explorer sidebar, create an empty `index.html` in the root and an empty `style.css` inside `css`.

**Expected result:** The sidebar shows `StudentClubWebsite` at the top with `css`, `img`, `pages`, and `index.html` beneath it.

<details>
<summary>Why open the folder, not the file</summary>

Opening a *folder* gives VS Code a project root. That is what makes Live Server, relative-path autocomplete, and project-wide search work. Opening a single file gives you a text editor and nothing else.

Also note: every name here is lowercase with no spaces. Web servers on Linux treat `IMG/` and `img/` as different folders, so lowercase from day one saves you a broken-image hunt after your first upload.

</details>


---

## 6. Creating Your First HTML File

> 🖼 **Diagram:** `canvases/buoi-01.canvas.tsx` → `HeadVsBody` — slide `head-vs-body` ("Where Does Each Part Show Up?")

### 6.1 The HTML5 Boilerplate

Every HTML5 page starts with the same basic structure. This is called the **boilerplate**. Memorize this — you will use it for every single page you create:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title Here</title>
</head>
<body>
    <!-- All visible content goes here -->
</body>
</html>
```

### 6.2 Line-by-Line Breakdown

| Line | Code | Purpose |
|------|------|---------|
| 1 | `<!DOCTYPE html>` | Tells the browser "this is an HTML5 document." Without it, browsers may enter "quirks mode" and render pages incorrectly. |
| 2 | `<html lang="en">` | The root element. Everything else lives inside this tag. `lang="en"` tells the browser and search engines the page is in English. |
| 3 | `<head>` | Contains metadata — information ABOUT the page that is NOT displayed on the page itself. |
| 4 | `<meta charset="UTF-8">` | Sets the character encoding to UTF-8, which supports virtually all languages and symbols. ALWAYS include this. |
| 5 | `<meta name="viewport"...>` | Makes the page responsive on mobile devices. Essential for modern web design. |
| 6 | `<title>` | Sets the text shown in the browser tab. Also used by search engines as the page title in results. |
| 7 | `</head>` | Closes the head section. |
| 8 | `<body>` | Contains EVERYTHING that is visible on the page — text, images, links, videos, etc. |
| 9 | `<!-- comment -->` | An HTML comment. Comments are invisible in the browser but help developers understand the code. |
| 10 | `</body>` | Closes the body section. |
| 11 | `</html>` | Closes the root element. End of document. |

### 🎒 Real-life Example

Think of the HTML boilerplate like a **formal letter**:

- `<!DOCTYPE html>` = the letterhead that identifies the type of document
- `<head>` = the envelope — it contains the sender, recipient, and stamp (metadata), but none of this appears in the letter body
- `<title>` = the subject line on the envelope
- `<body>` = the actual letter content that the recipient reads
- `</html>` = the signature that closes the letter

### ⚠️ Important Notes About Tags

- Most HTML tags come in **pairs**: an opening tag `<p>` and a closing tag `</p>`
- Some tags are **self-closing** (also called void elements): `<img>`, `<br>`, `<hr>`, `<meta>`, `<link>`. They do NOT have a closing tag.
- Tags can be **nested** inside each other, but they must nest properly:
  - ✅ Correct: `<p><strong>Hello</strong></p>`
  - ❌ Wrong: `<p><strong>Hello</p></strong>` (tags cross over each other)
- Indentation does not affect how the browser renders the page, but it makes your code readable for humans. Always indent nested elements.

### 🧪 Try It Yourself — Your First Page, Start to Finish

**Task (8 min):** Build and preview a complete HTML5 page without copying anything.

1. In VS Code, create `StudentClubWebsite/index.html`.
2. Type this from memory — do not paste:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <title>Student Web Club</title>
   </head>
   <body>
       <h1>Student Web Club</h1>
       <p>We meet every Friday at 5pm in Room B203.</p>
   </body>
   </html>
   ```
3. Save with **Ctrl+S**, then open the file in your browser.

**Expected result:** The tab reads "Student Web Club", the heading is large and bold, and the sentence sits below it in normal text.

<details>
<summary>Check yourself</summary>

- Tab shows `index.html` instead of the title → your `<title>` is missing or outside `<head>`.
- You see the code as text → the file was saved as `.txt`; rename it to `.html`.
- The heading is not bold or large → check for a typo in `<h1>`.

Type this boilerplate by hand several times this week. It is the one block you will write at the start of every page for the rest of the course.

</details>


---

## 7. File Extensions and Types

### 7.1 Common Web File Extensions

| Extension | Type | Purpose |
|-----------|------|---------|
| `.html` | HTML document | The structure and content of a web page |
| `.css` | CSS stylesheet | Controls colors, fonts, layout, spacing |
| `.js` | JavaScript | Adds interactivity (menus, animations, form validation) |
| `.jpg` / `.jpeg` | Image (JPEG) | Photographs and complex images |
| `.png` | Image (PNG) | Logos, icons, images with transparency |
| `.gif` | Image (GIF) | Simple animations |
| `.svg` | Scalable Vector Graphics | Icons and logos that scale without pixelation |
| `.pdf` | PDF document | Downloadable documents |

### 7.2 Why Extensions Matter

The file extension tells the browser how to handle the file. If you save an HTML file as `page.txt`, the browser will display the raw code instead of rendering the page. Always double-check your file extensions when saving.

⚠️ Important notes:

- Windows sometimes hides file extensions by default. Go to **View > Show > File name extensions** in File Explorer to make sure you can see them.
- When saving in Dreamweaver or VS Code, always select **"All Files"** or **"HTML"** as the file type to avoid accidentally adding `.txt`.

---

## 8. HTML Comments

### 8.1 Definition

An **HTML comment** is text in your code that is completely ignored by the browser. Comments are visible only when someone reads the source code. They are used to leave notes for yourself or other developers.

The syntax is:
```html
<!-- This is a comment -->
```

Comments can span multiple lines:
```html
<!--
    This section contains the main navigation.
    Last updated: March 2024
    Author: Nguyen Van A
-->
```

### 8.2 When to Use Comments

| Situation | Example Comment |
|-----------|----------------|
| Marking sections of a page | `<!-- ===== HEADER SECTION ===== -->` |
| Explaining WHY something is done | `<!-- Using UTF-8 to support Vietnamese characters -->` |
| Temporarily hiding code | `<!-- <p>This paragraph is hidden for now</p> -->` |
| Leaving TODO notes | `<!-- TODO: Add team photos here -->` |
| Documenting complex structures | `<!-- Navigation: 5 links, active class on current page -->` |

### ⚠️ Important Notes About Comments

- Comments are INVISIBLE in the browser but VISIBLE in View Source. Never put passwords or sensitive data in comments.
- Comments do NOT affect page performance in any meaningful way.
- Good comments explain WHY, not WHAT. The code already shows what it does; comments should explain the reasoning.
- Remove commented-out code before publishing. Dead code clutters the file.

### 🧪 Try It Yourself — Comments That Earn Their Place

**Task (4 min):** Use comments to label the regions of your page.

1. In `index.html`, add a comment above each major block:
   ```html
   <!-- ===== Header: club name and navigation ===== -->
   <!-- ===== Main: welcome text and events ===== -->
   <!-- ===== Footer: contact and copyright ===== -->
   ```
2. Save and reload the page in the browser.
3. Now press **Ctrl+U** to view the source.

**Expected result:** The comments are invisible on the page but plainly readable in View Source.

<details>
<summary>The point students miss</summary>

Comments are stripped from the rendered page but **not** from the file the browser downloads. Anyone can read them. So comment the *structure* ("navigation starts here"), never anything private — no passwords, no personal notes, no "TODO: fix this security hole".

</details>


---

## 9. How Browsers Render a Page

> 🖼 **Diagram:** `canvases/buoi-01.canvas.tsx` → `RequestResponseCycle` — slide `how-web-works` ("How the Web Works")

### 9.1 The Rendering Pipeline

When you open an HTML file in a browser, several steps happen behind the scenes:

```
STEP 1: LOAD        Browser reads the HTML file from disk or server
         |
STEP 2: PARSE       Browser reads each tag and builds the DOM (Document Object Model)
         |          The DOM is a tree structure representing every element
         |
STEP 3: STYLE       Browser applies CSS rules to each DOM element
         |          Default styles + your stylesheet = computed styles
         |
STEP 4: LAYOUT      Browser calculates the size and position of every element
         |          (also called "reflow")
         |
STEP 5: PAINT       Browser draws pixels on the screen
                    Text, colors, borders, images all rendered visually
```

### 9.2 Why This Matters for You

Understanding the rendering pipeline helps you debug problems:

| Problem | Likely Cause | Which Step? |
|---------|-------------|-------------|
| Page shows raw HTML code | File saved as `.txt` instead of `.html` | Step 1: Load |
| Element appears but looks wrong | CSS rule missing or overridden | Step 3: Style |
| Element is invisible | Display: none or wrong positioning | Step 4: Layout |
| Image shows broken icon | Wrong path in `src` attribute | Step 1: Load |
| Page layout jumps when images load | Missing width/height attributes | Step 4: Layout |

### 🎒 Real-life Example

Think of browser rendering like a **restaurant kitchen**:

- The waiter brings the order (HTML file) to the kitchen
- The chef reads each item on the ticket (parses HTML into DOM)
- The sous chef adds seasoning and garnish (applies CSS styles)
- The plating station arranges everything on the plate (layout calculation)
- The finished dish goes to the table (painted on screen)

If the ticket is written in a language the chef does not understand (wrong file type), nothing gets cooked. If the seasoning is wrong (bad CSS), the dish tastes off. If the plating is sloppy (layout issues), the dish looks unappealing even if it tastes fine.

⚠️ Important notes:

- The browser processes HTML from TOP TO BOTTOM. Elements at the top of your file are parsed first.
- This is why CSS `<link>` tags go in the `<head>` — the browser needs styles BEFORE it starts painting the body.
- JavaScript `<script>` tags traditionally go at the bottom of `<body>` so they do not block HTML parsing (though modern `defer` and `async` attributes change this).

---

## ✅ Best Practices

1. **Always start with the HTML5 boilerplate.** Copy-paste it for every new page. Never skip `<!DOCTYPE html>`.
2. **Create your folder structure first.** Before writing a single line of code, create `images/`, `css/`, `js/`, and `documents/` subfolders.
3. **Name your home page `index.html`.** This is non-negotiable — it is a universal web convention.
4. **Use lowercase for all file names and folder names.** `About.html` and `about.html` are different files on Linux servers.
5. **Use hyphens, not spaces, in file names.** `my-page.html` is correct; `my page.html` causes problems.
6. **Save frequently.** Press Ctrl+S after every few changes. Unsaved work is lost work.
7. **Preview in the browser often.** Press F12 (Dreamweaver) or use Live Server (VS Code) to check your work regularly.
8. **Add comments to your code.** Use `<!-- comment -->` to label sections of your HTML so you can find things later.
9. **Indent your code consistently.** Use 4 spaces (or 1 tab) per indentation level. Consistent indentation makes debugging much easier.
10. **Test in at least two browsers.** What looks perfect in Chrome might look different in Firefox.

---

## ❌ Common Mistakes

### Mistake 1: Forgetting `<!DOCTYPE html>`

❌ Wrong:
```html
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello</h1>
</body>
</html>
```

✅ Correct:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
<body>
    <h1>Hello</h1>
</body>
</html>
```

Without `<!DOCTYPE html>`, browsers enter "quirks mode" and may render your page incorrectly.

### Mistake 2: Saving files with spaces in the name

❌ Wrong: `My Home Page.html` → becomes `My%20Home%20Page.html` in URLs
✅ Correct: `index.html` or `my-home-page.html`

### Mistake 3: Not saving before previewing

If you edit your code and press F12 without saving (Ctrl+S), the browser will show the OLD version. Always save first.

### Mistake 4: Mixing up the `<head>` and `<body>`

❌ Wrong:
```html
<head>
    <h1>Welcome</h1>  <!-- Headings do NOT belong in head! -->
</head>
<body>
    <title>My Page</title>  <!-- Title does NOT belong in body! -->
</body>
```

✅ Correct:
```html
<head>
    <title>My Page</title>  <!-- Metadata goes in head -->
</head>
<body>
    <h1>Welcome</h1>  <!-- Visible content goes in body -->
</body>
```

Remember: `<head>` = information ABOUT the page. `<body>` = content ON the page.

### Mistake 5: Not creating a project folder

❌ Wrong: Saving files directly on the Desktop or in Downloads
✅ Correct: Creating `C:\Users\YourName\Documents\StudentClubWebsite\` and saving everything inside it

### 🧪 Try It Yourself — Watch the Browser Build Your Page

**Task (5 min):** See the render pipeline happen on your own file.

1. Open your `index.html` in Chrome or Edge and press **F12**.
2. Click the **Elements** tab. Hover over the `<h1>` line — the heading highlights on the page.
3. Double-click the heading text in the Elements panel, type something else, press Enter.
4. Now reload the page (F5).

**Expected result:** Your edit appears instantly, then disappears on reload. DevTools edits change the DOM in memory, not the file on disk.

<details>
<summary>Why this matters</summary>

The browser reads your file once, builds the DOM from it, and renders from the DOM. DevTools lets you edit the DOM directly, which is why changes appear with no save and vanish on reload. This is the fastest way to try a fix — but you must then make the same change in your file for it to persist.

</details>


---

# 📋 THEORY SUMMARY

| Concept | Definition | Example |
|---------|-----------|---------|
| Website | A collection of connected web pages stored on a server or local computer | studentclub.edu.vn with Home, About, Events pages |
| Webpage | A single HTML document that a browser can display | `about.html` |
| HTML | HyperText Markup Language — the standard language for creating web pages | `<h1>Welcome</h1>` |
| Web Browser | Software that reads HTML and displays it visually | Chrome, Firefox, Edge |
| Code Editor | A specialized text editor for writing code | Dreamweaver CS6, VS Code |
| Boilerplate | The standard starting template for every HTML5 page | `<!DOCTYPE html><html>...` |
| Project Folder | The root directory containing all website files organized in subfolders | `StudentClubWebsite/images/`, `css/`, `js/` |
| `index.html` | The default home page filename that servers look for automatically | The first page users see when visiting your site |
| Tag | A marker in HTML that tells the browser how to display content | `<p>`, `<h1>`, `<img>` |
| Self-closing tag | A tag that does not need a closing partner | `<img>`, `<br>`, `<meta>` |

---

# 💡 WORKED EXAMPLES

## Example 1: The Simplest Possible Web Page

**Situation:** You want to create the absolute minimum HTML page that still works correctly in a browser.

**Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Simple Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
</body>
</html>
```

**Line-by-line explanation:**

- `<!DOCTYPE html>` — Declares this as an HTML5 document so the browser renders it in standards mode
- `<html lang="en">` — Opens the root element; `lang="en"` declares English as the page language
- `<head>` — Opens the metadata section (nothing here is visible on the page)
- `<meta charset="UTF-8">` — Ensures all characters (including Vietnamese diacritics like ă, ê, ô) display correctly
- `<title>Simple Page</title>` — Sets the browser tab title to "Simple Page"
- `</head>` — Closes the metadata section
- `<body>` — Opens the visible content area
- `<h1>Hello, World!</h1>` — Creates a top-level heading. Browsers display `<h1>` text in large, bold font by default
- `<p>This is my first web page.</p>` — Creates a paragraph. Browsers add space above and below paragraphs automatically
- `</body>` — Closes the visible content area
- `</html>` — Closes the root element; end of document

**Result:** The browser shows a page with a large heading "Hello, World!" followed by a normal-sized paragraph "This is my first web page." The browser tab reads "Simple Page."

---

## Example 2: Student Club Home Page

**Situation:** You are building the home page for the Student Club Website. You want a heading, a welcome message, a list of upcoming events, and a contact email link.

**Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Club - Home</title>
</head>
<body>
    <h1>Welcome to the Student Club</h1>
    <p>We are a community of students who love technology and creativity.</p>

    <h2>Upcoming Events</h2>
    <ul>
        <li>Web Design Workshop — March 15</li>
        <li>Photography Contest — March 22</li>
        <li>Music Night — March 29</li>
    </ul>

    <p>Contact us at: <a href="mailto:club@university.edu">club@university.edu</a></p>
</body>
</html>
```

**Line-by-line explanation:**

- Lines 1-7: Standard HTML5 boilerplate with viewport meta tag for mobile responsiveness
- `<h1>Welcome to the Student Club</h1>`: Main page heading — only ONE `<h1>` per page
- `<p>We are a community...</p>`: Welcome paragraph describing the club
- `<h2>Upcoming Events</h2>`: Section heading — `<h2>` is smaller than `<h1>` but larger than normal text
- `<ul>`: Opens an unordered (bulleted) list
- `<li>Web Design Workshop — March 15</li>`: First list item — each event is wrapped in `<li>` tags
- `</ul>`: Closes the list
- `<a href="mailto:club@university.edu">`: Creates a hyperlink. The `mailto:` prefix tells the browser to open the user's email client
- `club@university.edu</a>`: The visible link text, followed by the closing anchor tag

**Result:** The browser displays a large heading, a welcome paragraph, a bulleted list of three events, and a clickable email link. Clicking the email link opens the default email application.

---

## Example 3: Understanding Nested Tags

**Situation:** You want to create a paragraph where some words are bold and some are italic, to understand how tags nest inside each other.

**Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Nesting Example</title>
</head>
<body>
    <h1>Tag Nesting Demo</h1>
    <p>The <strong>Student Club</strong> offers <em>amazing</em> workshops.</p>
    <p>Join our <strong><em>free</em> coding bootcamp</strong> today!</p>
</body>
</html>
```

**Line-by-line explanation:**

- `<p>The <strong>Student Club</strong> offers <em>amazing</em> workshops.</p>`:
  - The `<p>` tag wraps the entire paragraph
  - `<strong>` makes "Student Club" bold (semantically means "important")
  - `<em>` makes "amazing" italic (semantically means "emphasis")
  - Notice that `<strong>` opens AND closes within the `<p>` — proper nesting

- `<p>Join our <strong><em>free</em> coding bootcamp</strong> today!</p>`:
  - `<strong>` wraps around `<em>` — the `<em>` tag is fully inside `<strong>`
  - `<em>free</em>` is nested inside `<strong>`, so "free" is both bold AND italic
  - "coding bootcamp" is only bold (inside `<strong>` but outside `<em>`)
  - This is CORRECT nesting: inner tags close before outer tags

**Result:** The first paragraph shows "Student Club" in bold and "amazing" in italic. The second paragraph shows "free" in bold italic and "coding bootcamp" in bold only.

---

# 🛠️ HANDS-ON PRACTICE

## Setup (Tools and Folders)

Before starting the tasks, make sure you have:

1. **A code editor installed:** Either Dreamweaver CS6 or VS Code
2. **A web browser:** Google Chrome or Microsoft Edge (latest version)
3. **A project folder created:**

Open File Explorer and create this exact structure:

```
C:\Users\YourName\Documents\StudentClubWebsite\
    images\
    css\
    js\
    documents\
```

To create a folder: Right-click in File Explorer → New → Folder → type the name → press Enter.

If using **VS Code**: Open the `StudentClubWebsite` folder via File → Open Folder. Install the "Live Server" extension from the Extensions panel (Ctrl+Shift+X).

If using **Dreamweaver CS6**: Go to Site → New Site → set Site Name to "Student Club Website" → set Local Site Folder to your `StudentClubWebsite` folder → click Save.

---

### TASK 1: Create Your First HTML Page

🎯 **Goal:** Create a basic HTML5 page from scratch and view it in a browser.

📝 **Requirements:**
- The page must have valid HTML5 structure
- It must contain a heading and at least one paragraph
- It must be saved as `index.html` in the root of your project folder

🔧 **Steps:**

**Step 1:** Open your code editor (Dreamweaver or VS Code).

**Step 2:** Create a new file:
- Dreamweaver: File → New → HTML → Create
- VS Code: File → New File → save as `index.html`

**Step 3:** Type the following code EXACTLY (do not copy-paste — typing helps you memorize):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Club - Home</title>
</head>
<body>
    <h1>Welcome to the Student Club</h1>
    <p>This is the official website of our university student club.</p>
    <p>We are a community of creative and enthusiastic students.</p>
</body>
</html>
```

**Step 4:** Save the file:
- Press Ctrl+S
- Navigate to `C:\Users\YourName\Documents\StudentClubWebsite\`
- Make sure the filename is exactly `index.html` (not `index.html.txt`)
- Click Save

**Step 5:** Preview in browser:
- Dreamweaver: Press F12 or go to File → Preview in Browser → Chrome
- VS Code: Right-click the file → Open with Live Server (or right-click → Reveal in Explorer → double-click the file to open in Chrome)

**Step 6:** Verify the page shows a large heading and two paragraphs. Check the browser tab says "Student Club - Home."

✅ **Expected result:** A simple web page with a large heading "Welcome to the Student Club" and two paragraphs of text. The browser tab displays "Student Club - Home."

💾 **File to save:** `StudentClubWebsite/index.html`

---

### TASK 2: Explore the Editor Workspace

🎯 **Goal:** Become familiar with the key panels and views in your chosen editor.

📝 **Requirements:**
- Switch between different views (if using Dreamweaver)
- Locate the Files panel / Explorer panel
- Find the Properties panel (Dreamweaver) or Status bar (VS Code)

🔧 **Steps:**

**Step 1 (Dreamweaver):** Click the "Design" button in the toolbar. Observe how the page appears visually. Then click "Code" to see the raw HTML. Then click "Split" to see both simultaneously.

**Step 1 (VS Code):** Open the Explorer panel (Ctrl+Shift+E) on the left. You should see `index.html` listed. Click it to open. Look at the status bar at the bottom — it shows the line number, column, file encoding, and language.

**Step 2:** In the Files/Explorer panel, verify that you can see your `StudentClubWebsite` folder and the subfolders (`images/`, `css/`, `js/`, `documents/`).

**Step 3:** Add a comment to your code. Place your cursor at the top of the `<body>` and type:
```html
<!-- This is the main content area of the Student Club home page -->
```
Notice how the comment appears in a different color (syntax highlighting).

**Step 4:** Save (Ctrl+S) and preview again to confirm the comment is invisible in the browser.

✅ **Expected result:** You can navigate between views, see your project files, and understand where key panels are located. Comments in code are invisible in the browser.

💾 **File to save:** `StudentClubWebsite/index.html` (updated with comment)

---

### TASK 3: Build a Complete Home Page with Navigation

🎯 **Goal:** Expand your `index.html` to include a navigation menu, multiple sections, and a footer — matching the structure you will use throughout the course.

📝 **Requirements:**
- Include a `<header>` with site name and navigation
- Include a `<main>` section with at least two subsections
- Include a `<footer>` with copyright notice
- All navigation links should point to other pages (they will not work yet, but the links should be present)

🔧 **Steps:**

**Step 1:** Open `index.html` and replace ALL existing content with this code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Club - Home</title>
</head>
<body>
    <!-- ===== HEADER SECTION ===== -->
    <header>
        <h1>Student Club</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- ===== MAIN CONTENT ===== -->
    <main>
        <h2>Welcome to the Student Club</h2>
        <p>We are a community of creative and enthusiastic students.
           Join us for workshops, events, and fun activities!</p>

        <section>
            <h3>Latest News</h3>
            <article>
                <h4>Web Design Workshop</h4>
                <p>Learn the basics of HTML and CSS in our hands-on workshop.
                   Date: March 15, 2024. Time: 2:00 PM - 4:00 PM.</p>
            </article>
            <article>
                <h4>Photography Contest</h4>
                <p>Submit your best campus photos and win prizes!
                   Deadline: March 20, 2024.</p>
            </article>
        </section>

        <section>
            <h3>Quick Facts</h3>
            <ul>
                <li>Founded in 2020</li>
                <li>Over 200 active members</li>
                <li>50+ events organized each year</li>
                <li>Winner of Best Student Club 2023</li>
            </ul>
        </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer>
        <p>&copy; 2024 Student Club. All rights reserved.</p>
    </footer>
</body>
</html>
```

**Step 2:** Save the file (Ctrl+S).

**Step 3:** Preview in browser (F12 or Live Server).

**Step 4:** Examine the page structure:
- The header shows the club name and navigation links
- The main area has a welcome message, news articles, and quick facts
- The footer shows copyright information
- Note: Navigation links to `about.html`, `events.html`, etc. will show "file not found" errors because those pages do not exist yet. This is expected — you will create them in Session 2.

**Step 5:** Try clicking the "Home" link. It should reload the current page (because `index.html` exists).

✅ **Expected result:** A structured web page with a header, navigation bar (as an unstyled bulleted list), two content sections with headings and articles, and a footer. The page looks plain (no CSS yet) but has correct HTML structure.

💾 **File to save:** `StudentClubWebsite/index.html` (complete version)

---

# 🐛 COMMON ERRORS — WHAT THE BROWSER SHOWS YOU

Errors rarely announce themselves. The browser does something odd instead, and you have to read that behaviour backwards to the cause. Use this table when the page is wrong but you do not know why.

| Symptom you see | Likely cause | How to confirm | Fix |
|---|---|---|---|
| Tab title says `index.html` instead of your title | `<title>` missing, empty, or outside `<head>` | View Source (Ctrl+U) and look inside `<head>` | Put `<title>Your Text</title>` inside `<head>` |
| The whole page is one giant heading | A `</h1>` is missing, so the heading never ends | Ctrl+U — the `<h1>` has no closing partner | Add the closing `</h1>` |
| Page shows raw code like `<h1>Welcome</h1>` as text | File saved as `.txt`, or opened in a text editor not a browser | Check the file extension in Explorer | Rename to `.html` and open with a browser |
| Accented or Vietnamese characters show as `?` or `Ã¡` | `<meta charset="UTF-8">` missing or not first in `<head>` | Ctrl+U — is charset the first line inside `<head>`? | Add the charset meta tag as the first child of `<head>` |
| Text is tiny and the layout is shrunk on a phone | The viewport meta tag is missing | Open DevTools device mode (Ctrl+Shift+M) | Add `<meta name="viewport" content="width=device-width, initial-scale=1">` |
| Layout is subtly wrong in a way you cannot pin down | Doctype missing — the browser is in quirks mode | Type `document.compatMode` in the Console; it should return `CSS1Compat` | Make `<!DOCTYPE html>` the very first line |
| Your comment text appears on the page | Comment written as `<!-- ... >` or `< !-- ... -->` | The comment renders instead of hiding | Use exactly `<!--` and `-->` |
| Nothing at all renders — blank white page | Content sits outside `<body>`, or `<body>` is never opened | Ctrl+U and check your content is between `<body>` and `</body>` | Move content inside `<body>` |

**The habit worth building:** when something looks wrong, press F12 first. The Console tab reports what the browser objected to, and the Elements tab shows the structure the browser actually built — which is often not the structure you thought you wrote.

---


# ✅ SELF-CHECK QUESTIONS

Answer these from memory first, then expand the answer to check yourself.

**Q1. What is the difference between a website and a web page?**

<details>
<summary>Answer</summary>

A **web page** is a single HTML document (one file, e.g. `about.html`). A **website** is a collection of related web pages plus their assets (images, CSS, JavaScript) organised in one folder structure and linked together by navigation.

</details>

---

**Q2. Why is HTML called a markup language and not a programming language?**

<details>
<summary>Answer</summary>

HTML has no logic: no variables, no conditions, no loops, no calculations. It only *marks up* content to describe its structure and meaning (this is a heading, this is a paragraph, this is a list). Programming languages like JavaScript can make decisions and compute values; HTML cannot.

</details>

---

**Q3. Name the four required parts of the HTML5 boilerplate and say what each one does.**

<details>
<summary>Answer</summary>

1. `<!DOCTYPE html>` — tells the browser to use HTML5 standards mode.
2. `<html lang="en">` — the root element; `lang` declares the document language for screen readers and search engines.
3. `<head>` — metadata the user does not see: `<meta charset>`, `<meta name="viewport">`, `<title>`, CSS links.
4. `<body>` — everything the user actually sees on the page.

</details>

---

**Q4. What happens if you leave out `<!DOCTYPE html>`?**

<details>
<summary>Answer</summary>

The browser falls back to **quirks mode**, emulating 1990s bug-for-bug behaviour. Box sizing, margins, and CSS inheritance all behave inconsistently, and the same page can look different in Chrome, Firefox, and Safari. It is one line — never omit it.

</details>

---

**Q5. Why must the home page be named `index.html` and not `home.html`?**

<details>
<summary>Answer</summary>

Web servers look for `index.html` by default when someone visits a folder URL such as `https://example.com/`. If the file is called `home.html`, visitors get a directory listing or a 404 unless they type the full filename.

</details>

---

**Q6. Why should filenames avoid spaces and capital letters?**

<details>
<summary>Answer</summary>

Spaces become `%20` in URLs, which is ugly and error-prone. Most web servers run Linux, where filenames are **case-sensitive** — `About.html` and `about.html` are different files. A link that works on your Windows machine can 404 once uploaded. Use lowercase with hyphens: `about-us.html`.

</details>

---

**Q7. What is the difference between `<head>` and `<header>`?**

<details>
<summary>Answer</summary>

`<head>` is metadata for the browser and is **never displayed** — it holds `<title>`, `<meta>`, and CSS links. `<header>` lives inside `<body>` and **is displayed** — it is the visible banner area at the top of the page, usually holding the logo, site name, and navigation.

</details>

---

**Q8. Why create separate `images/`, `css/`, and `js/` subfolders instead of putting everything in one folder?**

<details>
<summary>Answer</summary>

Separation keeps the project navigable as it grows. With 40 files in one folder you cannot find anything; with subfolders you always know where to look. It also matches what every professional project and every hosting platform expects, and makes relative paths predictable (`images/logo.png`, `css/style.css`).

</details>

---


# 📝 SELF-ASSESSMENT WORKSHEET

| # | I can... | Yes ☐ | No ☐ |
|---|----------|-------|------|
| 1 | Explain what a website is and how it differs from a single web page | ☐ | ☐ |
| 2 | Define HTML and explain that it is a markup language, not a programming language | ☐ | ☐ |
| 3 | Name the four main parts of the HTML5 boilerplate and explain each one | ☐ | ☐ |
| 4 | Create a proper project folder structure with `images/`, `css/`, `js/`, and `documents/` subfolders | ☐ | ☐ |
| 5 | Write a valid HTML5 page from memory (without looking at notes) | ☐ | ☐ |
| 6 | Save a file as `index.html` in the correct location and preview it in a browser | ☐ | ☐ |
| 7 | Switch between Design View, Code View, and Split View in Dreamweaver (or navigate VS Code panels) | ☐ | ☐ |
| 8 | Explain why `<!DOCTYPE html>` is necessary and what happens without it | ☐ | ☐ |

**Self-scoring guide:**
- 7-8 Yes: Excellent! You are ready for Session 2.
- 5-6 Yes: Good. Review the sections where you answered "No" before moving on.
- 0-4 Yes: Re-read the Theory section and redo Tasks 1 and 3. Ask your instructor or a classmate for help.

---

# 🔗 FURTHER READING

- [How the Web Works — MDN](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)
- [Getting Started with the Web — MDN](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web)
- [Introduction to HTML — MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)
- [HTML Basics — MDN](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [Document and Website Structure — MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
- [What is CSS? — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS)
- [HTML Element Reference — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

---

# ⏭️ NEXT SESSION

In Session 2, you will learn how to create a complete multi-page website with proper folder organization, file naming conventions, relative and absolute paths, and an introduction to Git and GitHub for version control.
