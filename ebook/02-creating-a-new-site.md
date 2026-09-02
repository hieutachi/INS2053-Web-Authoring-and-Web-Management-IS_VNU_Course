# 🟦 SESSION 2
# **Creating a New Site & Organizing Your Project**

Welcome back! In Session 1 you created your first HTML page and learned what a website is. Today we go deeper: you will learn how to organize an entire multi-page website, understand the critical difference between relative and absolute file paths, follow professional file naming conventions, and get your first taste of version control with Git and GitHub. By the end of this session your Student Club Website will have multiple working pages linked together through a navigation menu — just like a real website.

---

# 📌 SESSION INFORMATION

```
📅 Duration:     3 periods (150 minutes) — Theory ~60 min, Practice ~90 min
📚 Reference:    MDN "Dealing with Files"
                 https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files
🎯 Objectives:   1. Define a site in Dreamweaver (or set up a project in VS Code)
                 2. Create a complete folder structure for a multi-page website
                 3. Explain relative vs absolute paths and use relative paths correctly
                 4. Apply professional file naming conventions
                 5. Understand the basics of Git and GitHub for version control
📖 Prepare:      1. Complete all tasks from Session 1 (your index.html should exist)
                 2. Install Git from https://git-scm.com/downloads (optional but recommended)
                 3. Create a free GitHub account at https://github.com (optional but recommended)
🖼 Diagrams:     canvases/buoi-02.canvas.tsx — PathResolver, DotDotLadder, GitFlow
🔗 Outcomes:     CLO1 (master basic web design and build skills)
                 CLO3 (choose appropriate technologies for web development)
                 CLO4 (design and build a web application)
```

---

# 🎯 LEARNING OBJECTIVES

After this session you will be able to:

- Define a "site" in Dreamweaver or configure a workspace in VS Code for a web project
- Build a complete multi-page website with consistent navigation across all pages
- Distinguish between relative and absolute file paths and explain why relative paths are essential for web development
- Apply correct file naming conventions (lowercase, hyphens, no spaces, no special characters)
- Explain what Git is, why developers use it, and perform basic Git operations (init, add, commit)
- Create a `.gitignore` file and push a project to GitHub

---

# 📖 THEORY

## 1. What Is a "Site" in Web Development?

### 1.1 Definition

A **site** is the root folder on your computer that contains ALL files belonging to one website. When you "define a site" in Dreamweaver, you are telling the software: "This folder is my project. All files inside it belong to this website."

In VS Code, the equivalent action is "opening a folder as a workspace." The result is the same: your editor knows where your project lives and can manage files, links, and settings accordingly.

The **local root folder** is the top-level folder on YOUR computer. Later in the course, you will also learn about the **remote root folder**, which is the corresponding folder on a web server where you publish your site.

### 🎒 Real-life Example

Think of defining a site like **setting up a new apartment**:

- Choosing the apartment = choosing your root folder (`StudentClubWebsite/`)
- Setting up rooms = creating subfolders (`images/`, `css/`, `js/`, `documents/`)
- Moving furniture in = adding files (`index.html`, `logo.png`, `style.css`)
- Giving the landlord your address = telling Dreamweaver/VS Code where the project lives

If you do not tell anyone your address, nobody can find your apartment. Similarly, if you do not define your site, Dreamweaver cannot resolve relative paths or manage your files properly.

### 1.2 Why It Matters

| Reason | Explanation |
|--------|-------------|
| Relative paths | Dreamweaver needs to know the root folder to calculate relative paths correctly |
| File management | The Files panel shows only files inside the defined site |
| Link checking | Dreamweaver can check for broken links only within a defined site |
| Consistency | Everyone on a team uses the same folder structure |
| Deployment | When you upload to a server, the entire site folder is transferred |

⚠️ Important notes:

- Always define your site BEFORE creating any pages.
- Never create files outside the site folder — they will not be part of your project.
- The site folder name should be descriptive and match your project: `StudentClubWebsite`.

---

## 2. Complete Folder Structure

### 2.1 Standard Web Project Structure

Every professional website follows a predictable folder structure. Here is the complete structure for our Student Club Website:

```
StudentClubWebsite/                  <-- ROOT FOLDER (site root)
│
├── index.html                       <-- Home page (required!)
├── about.html                       <-- About Us page
├── events.html                      <-- Events page
├── gallery.html                     <-- Photo gallery page
├── contact.html                     <-- Contact page
│
├── images/                          <-- All image files
│   ├── club-logo.png
│   ├── banner.jpg
│   ├── team-photo.jpg
│   ├── event-workshop.jpg
│   └── event-music.jpg
│
├── css/                             <-- All CSS stylesheets
│   ├── style.css                    <-- Main stylesheet
│   └── responsive.css               <-- Mobile-specific styles (later)
│
├── js/                              <-- All JavaScript files
│   └── main.js                      <-- Main script file
│
└── documents/                       <-- Downloadable files
    ├── club-constitution.pdf
    └── membership-form.pdf
```

### 2.2 Rules for Folder Organization

| Rule | Reason |
|------|--------|
| One root folder per project | Keeps everything contained and portable |
| Separate folders by file type | Makes finding files fast and easy |
| No files loose in the root (except .html pages) | HTML pages live in root; everything else goes in subfolders |
| No nested sub-sub-sub-folders | Keep it flat — two levels maximum (root → subfolder → files) |
| Use lowercase folder names | Avoids case-sensitivity problems on Linux servers |
| No spaces in folder names | Spaces cause URL encoding issues (`%20`) |

### 🎒 Real-life Example

Think of folder structure like organizing a **kitchen**:

- Pots and pans go in one cabinet (`images/`)
- Plates and bowls go in another (`css/`)
- Utensils go in a drawer (`js/`)
- Recipes go in a binder (`documents/`)

You would never put a frying pan in the refrigerator or store milk in the oven. Similarly, never put a CSS file in the `images/` folder or an image in the root folder.

⚠️ Important notes:

- Create ALL folders before you start coding. This takes 30 seconds and saves hours of confusion later.
- If you realize you need a new folder mid-project, create it immediately — do not dump files in the wrong place "for now."
- Every HTML page goes in the root folder (unless you have a specific reason for sub-pages, which we will cover in later sessions).

### 🧪 Try It Yourself — Climb the Folder Ladder

**Task (6 min):** Make one stylesheet reach a page in a subfolder.

1. You have `css/style.css` and `pages/about.html`.
2. In `pages/about.html`, first try the wrong path:
   ```html
   <link rel="stylesheet" href="css/style.css">
   ```
3. Reload and open F12 → **Network**. Note the 404 and the exact URL it tried.
4. Now fix it:
   ```html
   <link rel="stylesheet" href="../css/style.css">
   ```
5. Reload and confirm the request turns green.

**Expected result:** The failed request asked for `pages/css/style.css`. Adding `../` steps out of `pages/` first, so the browser finds `css/style.css`.

<details>
<summary>How to read a path without guessing</summary>

Read it left to right, starting from the folder the **current file** is in:

- `style.css` → same folder as me
- `css/style.css` → into a `css` folder inside my folder
- `../css/style.css` → out one level, then into `css`
- `/css/style.css` → from the server root, which on a local file system means your C: drive — almost always wrong in this course

The Network tab always shows the full URL the browser tried. Compare that to where the file actually is, and the fix becomes obvious.

</details>


---

## 3. File Paths: Relative vs. Absolute

> 🖼 **Diagrams:** `canvases/buoi-02.canvas.tsx` → `PathResolver` — slide `paths` ("Relative vs Absolute Paths"); `DotDotLadder` — slide `dotdot-rule` ("The ../ Rule")

### 3.1 Definition

A **file path** tells the browser where to find a file. There are two types:

**Absolute path:** The COMPLETE address starting from the drive letter or domain name.
```
C:\Users\Nguyen\Documents\StudentClubWebsite\images\logo.png
https://www.studentclub.edu.vn/images/logo.png
```

**Relative path:** The path STARTING FROM THE CURRENT FILE'S LOCATION.
```
images/logo.png          (from index.html to images/logo.png)
about.html               (from index.html to about.html, both in root)
../index.html            (from css/style.css UP one level to index.html)
```

### 3.2 How Relative Paths Work

Relative paths are calculated based on WHERE THE CURRENT FILE IS LOCATED. This is the single most important concept in this session. Let us walk through every scenario:

```
SCENARIO DIAGRAM:

StudentClubWebsite/              <-- Root folder
├── index.html                   <-- YOU ARE HERE
├── about.html
├── images/
│   └── logo.png
├── css/
│   └── style.css
└── documents/
    └── form.pdf
```

**From `index.html` (in the root):**

| Target File | Relative Path | Explanation |
|------------|---------------|-------------|
| `about.html` | `about.html` | Same folder — just use the filename |
| `images/logo.png` | `images/logo.png` | Go INTO the `images/` subfolder |
| `css/style.css` | `css/style.css` | Go INTO the `css/` subfolder |
| `documents/form.pdf` | `documents/form.pdf` | Go INTO the `documents/` subfolder |

**From `css/style.css` (inside the `css/` subfolder):**

| Target File | Relative Path | Explanation |
|------------|---------------|-------------|
| `index.html` | `../index.html` | Go UP one level (`..`) then find `index.html` |
| `about.html` | `../about.html` | Go UP one level then find `about.html` |
| `images/logo.png` | `../images/logo.png` | Go UP one level, then INTO `images/` |

**The `../` notation means "go up one folder level."** Each `../` goes up one more level:
- `../` = up one level
- `../../` = up two levels
- `../../../` = up three levels (rarely needed)

### 🎒 Real-life Example

Think of relative paths like giving **directions from your current location**:

- You are standing in the living room (= `index.html` in root)
- "Go to the kitchen" = `images/logo.png` (move into a nearby room)
- "Stay here" = `about.html` (same room, different spot)

But if you are standing INSIDE the kitchen (= `css/style.css` inside `css/`):
- "Go back to the living room first, THEN go to the bedroom" = `../about.html` (exit kitchen → enter bedroom)

You always give directions FROM WHERE YOU ARE, not from some fixed point. That is exactly how relative paths work.

### 🔍 Comparison Table: Relative vs. Absolute Paths

| Feature | Relative Path | Absolute Path |
|---------|--------------|---------------|
| Starts from | Current file's location | Drive root or domain |
| Example | `images/logo.png` | `C:\Users\Name\site\images\logo.png` |
| Works after moving the site folder? | ✅ Yes | ❌ No |
| Works after uploading to a server? | ✅ Yes | ❌ No |
| Easy to read and maintain? | ✅ Yes | ❌ No |
| Recommended for web development? | ✅ ALWAYS | ❌ NEVER |
| Used for | Links between pages, image sources, CSS references | Bookmarking, external resources |

### 3.3 Why Relative Paths Matter

| Reason | Detail |
|--------|--------|
| Portability | You can move your entire site folder to another computer and all links still work |
| Server deployment | When uploaded to a server, absolute local paths (`C:\...`) become meaningless |
| Team projects | Different team members have different user folders; relative paths work for everyone |
| Maintenance | Renaming or reorganizing folders is easier when paths are relative |

⚠️ Important notes:

- **ALWAYS use relative paths in your HTML and CSS.** This is a non-negotiable rule in web development.
- The only time absolute paths are acceptable is when linking to EXTERNAL resources (like a CDN for fonts or libraries): `<link href="https://fonts.googleapis.com/css2?family=Roboto">`.
- Test your links by opening the HTML file directly in a browser AND by using Dreamweaver's link checker.
- If an image does not display, the FIRST thing to check is whether the relative path is correct.

---

## 4. File Naming Conventions

### 4.1 The Rules

Professional web developers follow strict naming conventions. These are NOT optional suggestions — they prevent real, painful bugs.

| Rule | Correct ✅ | Wrong ❌ | Why |
|------|-----------|----------|-----|
| Use lowercase only | `about-us.html` | `About-Us.html` | Linux servers are case-sensitive; `About.html` ≠ `about.html` |
| Use hyphens for spaces | `team-photo.jpg` | `team photo.jpg` | Spaces become `%20` in URLs, causing broken links |
| No special characters | `events.html` | `events&news.html` | Characters like `#`, `%`, `&`, `@`, `!` have special meaning in URLs |
| Keep names short but descriptive | `contact.html` | `the-page-where-you-can-contact-us.html` | Long names are hard to type and prone to typos |
| Use meaningful names | `gallery.html` | `page2.html` | Meaningful names make maintenance easier |
| Always include the extension | `style.css` | `style` | Without the extension, the browser does not know the file type |
| `index.html` for home page | `index.html` | `home.html` | Web servers look for `index.html` by default |

### 4.2 Common File Names for Our Project

| Page | Filename | Purpose |
|------|----------|---------|
| Home | `index.html` | Landing page, first page visitors see |
| About Us | `about.html` | Information about the club |
| Events | `events.html` | List of upcoming and past events |
| Gallery | `gallery.html` | Photo gallery of club activities |
| Contact | `contact.html` | Contact form and information |
| Main stylesheet | `css/style.css` | Primary CSS file |
| Main script | `js/main.js` | Primary JavaScript file |
| Logo | `images/club-logo.png` | Club logo image |
| Banner | `images/banner.jpg` | Header banner image |

⚠️ Important notes:

- Rename files BEFORE linking to them. Changing a filename after other pages already link to it breaks those links.
- If you rename a file in Dreamweaver's Files panel (right-click → Rename), Dreamweaver will offer to update all links automatically. Always say YES.
- Double-check filenames when typing `href` and `src` attributes. A single typo causes a broken link.

### 🧪 Try It Yourself — Break a Name on Purpose

**Task (4 min):** See the failure mode that only appears after you upload.

1. Rename an image in `img/` to include a space and a capital: `Club Photo.jpg`.
2. Link it with `<img src="img/Club Photo.jpg" alt="Club members">` and reload.
3. Look at the address bar of the image request in F12 → Network.
4. Now rename the file to `club-photo.jpg`, update the `src`, and reload.

**Expected result:** The first version may still work locally, but the Network tab shows the space encoded as `%20`. The second version is clean.

<details>
<summary>Why this bites later, not now</summary>

Windows is case-insensitive and tolerant of spaces, so the bad name works on your laptop. Most web servers run Linux, which is case-sensitive: `Club Photo.jpg` and `club-photo.jpg` are two different files, and only one of them exists. This is the classic "it worked on my machine" bug.

The rule that avoids it entirely: lowercase letters, digits, and hyphens. Nothing else.

</details>


---

## 5. Introduction to Git and GitHub

> 🖼 **Diagram:** `canvases/buoi-02.canvas.tsx` → `GitFlow` — slide `git-basics` ("Git & GitHub Basics")

### 5.1 What Is Git?

**Git** is a **version control system**. It records every change you make to your files over time, so you can:

- **Undo mistakes** — revert to any previous version of your code
- **Track history** — see who changed what and when
- **Work in parallel** — multiple people can edit the same project without overwriting each other's work
- **Back up your work** — store copies on remote servers like GitHub

### 🎒 Real-life Example

Think of Git like the **"Save As" feature in a word processor, but much more powerful**:

- Every time you save a version in Git (called a "commit"), it takes a snapshot of ALL your files
- You can go back to ANY snapshot at any time
- Unlike "Save As," Git stores only the CHANGES between snapshots, so it uses very little disk space
- Multiple people can make their own snapshots and merge them together later

Or think of it like a **time machine for your code**: made a mistake? Travel back to yesterday's version. Want to compare what changed? Look at the diff between two points in time.

### 5.2 What Is GitHub?

**GitHub** is a website that hosts Git repositories online. It provides:

- **Cloud backup** — your code is safe even if your computer dies
- **Collaboration** — team members can clone, edit, and merge code
- **Portfolio** — employers look at your GitHub to evaluate your skills
- **Issue tracking** — track bugs and feature requests
- **Free hosting** — GitHub Pages lets you publish static websites for free

### 5.3 Basic Git Commands

Here are the fundamental Git commands you need to know:

```bash
# 1. Initialize a new Git repository in your project folder
git init

# 2. Check which files have been changed
git status

# 3. Stage files for the next commit (add them to the staging area)
git add index.html              # Stage one specific file
git add images/                 # Stage all files in a folder
git add .                       # Stage ALL changed files (use carefully)

# 4. Commit staged changes with a descriptive message
git commit -m "Create initial home page with navigation"

# 5. View the commit history
git log --oneline

# 6. Connect to a GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/student-club-website.git

# 7. Push your commits to GitHub
git push -u origin main
```

### 5.4 The Git Workflow

```
YOUR FILES          STAGING AREA         REPOSITORY           GITHUB
(working directory)  (git add)          (git commit)        (git push)

Edit files    -->    Stage changes  -->  Commit with     -->  Push to
(save)               (select what       message             cloud backup
                      to include)       (snapshot saved)
```

Each step is intentional:

1. **Edit** — Make changes to your files
2. **Stage** (`git add`) — Choose which changes to include in the next snapshot
3. **Commit** (`git commit`) — Save a permanent snapshot with a descriptive message
4. **Push** (`git push`) — Upload your commits to GitHub

### 🔍 Comparison: Git Terms

| Term | Meaning | Analogy |
|------|---------|---------|
| Repository (repo) | A project tracked by Git | A photo album |
| Commit | A saved snapshot of all files at one point in time | A photo in the album |
| Stage | The list of changes ready to be committed | Photos laid out on the table before putting them in the album |
| Push | Upload commits to a remote server (GitHub) | Sending photos to cloud storage |
| Pull | Download commits from a remote server | Downloading photos from cloud storage |
| Clone | Download an entire repository from GitHub | Copying someone's photo album |
| Branch | A parallel line of development | Making a copy of the album to experiment without changing the original |

### 5.5 The `.gitignore` File

Not every file should be tracked by Git. Create a file called `.gitignore` in your project root to tell Git which files to ignore:

```
# .gitignore for Student Club Website

# OS-generated files
Thumbs.db
.DS_Store

# Editor temporary files
*.tmp
*.bak
*~

# Dreamweaver configuration (personal settings, not shared)
_notes/
*.dwt
```

⚠️ Important notes:

- Git is OPTIONAL for this course but HIGHLY RECOMMENDED. Learning Git early gives you a huge advantage.
- Never commit sensitive files (passwords, API keys, personal data).
- Write meaningful commit messages: "Add navigation bar to all pages" is good; "update" is bad.
- Commit frequently — at minimum, commit after completing each task.
- If Git feels overwhelming right now, focus on the folder structure and paths first. You can learn Git gradually.

### 🧪 Try It Yourself — Your First Three Git Commands

**Task (6 min):** Put your site under version control locally. No GitHub account needed yet.

1. Open the integrated terminal in VS Code (**Ctrl+`**) with `StudentClubWebsite` open.
2. Run these one at a time:
   ```bash
   git init
   git add .
   git commit -m "Initial site structure"
   ```
3. Now change something in `index.html` and save.
4. Run `git status`, then `git diff`.

**Expected result:** `git status` names `index.html` as modified, and `git diff` shows your change with a `-` for the old line and a `+` for the new one.

<details>
<summary>What you just gained</summary>

A commit is a restore point. From here, `git diff` answers "what did I change since it last worked?" — the single most useful question when a page suddenly breaks.

If `git` is not recognised, Git is not installed or not on your PATH. Install it from git-scm.com and reopen the terminal. You do not need GitHub for any of this; `git init` creates a repository that lives entirely in your project folder.

</details>


---

## 6. Creating Navigation Across Multiple Pages

### 6.1 Consistent Navigation

Every page in your website should have the SAME navigation menu. This allows users to move freely between pages without getting lost.

The navigation is built with a `<nav>` element containing an unordered list of links:

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

### 6.2 Active Page Highlighting

On each page, the link to the CURRENT page should be visually distinct so users know where they are. One simple approach is to add a class:

```html
<!-- On the ABOUT page -->
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html" class="active">About Us</a></li>
        <li><a href="events.html">Events</a></li>
        <li><a href="gallery.html">Gallery</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

Then in CSS:
```css
nav a.active {
    font-weight: bold;
    color: #ff6600;
}
```

### 6.3 Semantic HTML Structure

Use semantic elements to give your page meaningful structure:

```html
<header>   <!-- Top section: logo, site title, navigation -->
<nav>      <!-- Navigation links -->
<main>     <!-- Primary content unique to this page -->
<section>  <!-- A thematic grouping within main -->
<article>  <!-- Self-contained content (blog post, news item) -->
<aside>    <!-- Sidebar or tangential content -->
<footer>   <!-- Bottom section: copyright, contact info -->
```

These elements do not change the VISUAL appearance (browsers render them like `<div>` by default), but they provide MEANING for screen readers, search engines, and other developers reading your code.

⚠️ Important notes:

- Copy-paste the navigation block into EVERY page. Later in the course, you will learn techniques to avoid repetition, but for now, manual copying is fine.
- Update the `class="active"` attribute on each page to match the current page.
- Always test every link on every page. Click every single navigation link and verify it loads the correct page.

---

## ✅ Best Practices

1. **Define your site FIRST.** Before writing any code, set up the site in Dreamweaver or open the folder in VS Code.
2. **Create all folders before coding.** Run through the folder structure checklist: `images/`, `css/`, `js/`, `documents/`.
3. **Use relative paths exclusively.** Never use `C:\...` paths in HTML or CSS.
4. **Follow naming conventions strictly.** Lowercase, hyphens, no spaces, no special characters.
5. **Test every link.** After creating a new page, click every navigation link on every existing page.
6. **Keep the same navigation on every page.** Consistency prevents users from getting lost.
7. **Commit early and often** (if using Git). Small, frequent commits are better than one giant commit.
8. **Write descriptive commit messages.** Future-you will thank present-you.
9. **Back up your work.** Use Git/GitHub, a USB drive, or cloud storage. Computers fail.
10. **Validate your HTML.** Use the W3C Validator (https://validator.w3.org/) to check for errors.

---

## ❌ Common Mistakes

### Mistake 1: Using absolute paths in HTML

❌ Wrong:
```html
<img src="C:\Users\Nguyen\Documents\StudentClubWebsite\images\logo.png" alt="Logo">
<a href="C:\Users\Nguyen\Documents\StudentClubWebsite\about.html">About</a>
```

✅ Correct:
```html
<img src="images/logo.png" alt="Logo">
<a href="about.html">About</a>
```

Absolute paths break the moment you move the folder, share the project, or upload to a server.

### Mistake 2: Forgetting `../` when linking from a subfolder

❌ Wrong (inside `css/style.css`):
```css
background-image: url("images/banner.jpg");
/* This looks for css/images/banner.jpg — which does not exist! */
```

✅ Correct (inside `css/style.css`):
```css
background-image: url("../images/banner.jpg");
/* This goes UP one level, then into images/ — correct! */
```

### Mistake 3: Inconsistent file naming

❌ Wrong:
```
About.html          (capital A)
CONTACT.HTML        (all caps)
my page.html        (space in name)
events_&_news.html  (special character &)
```

✅ Correct:
```
about.html
contact.html
my-page.html
events-news.html
```

### Mistake 4: Not including the same navigation on every page

If your home page has five navigation links but your about page has only three, users will get stuck. Copy the exact same `<nav>` block to every page.

### Mistake 5: Skipping site definition in Dreamweaver

Without defining a site, Dreamweaver cannot:
- Calculate relative paths correctly
- Show files in the Files panel
- Check for broken links
- Manage templates

Always go to **Site → New Site** before doing anything else.

### 🧪 Try It Yourself — Navigation That Works From Every Page

**Task (8 min):** Build one nav block and prove it works from two folder levels.

1. In `index.html` (site root), add:
   ```html
   <nav>
       <ul>
           <li><a href="index.html">Home</a></li>
           <li><a href="pages/about.html">About</a></li>
           <li><a href="pages/contact.html">Contact</a></li>
       </ul>
   </nav>
   ```
2. Create `pages/about.html` and `pages/contact.html`.
3. In **both** of those files, paste the same nav — then fix the paths for their location:
   ```html
   <li><a href="../index.html">Home</a></li>
   <li><a href="about.html">About</a></li>
   <li><a href="contact.html">Contact</a></li>
   ```
4. Open `pages/contact.html` first, and click all three links. Then repeat from `index.html`.

**Expected result:** All three links work from all three pages. Six successful clicks, no 404s.

<details>
<summary>Why start from the deepest page</summary>

Testing from `index.html` hides the most common path bug. A link written as `about.html` works from the root only by accident when both files sit together — but from `pages/`, the browser looks for `pages/about.html`, and from the root it looks for `about.html`. Starting your test in the subfolder forces you to get the `../` right, which is exactly what a marker will click first.

</details>


---

# 📋 THEORY SUMMARY

| Concept | Definition | Example |
|---------|-----------|---------|
| Site | The root folder containing all files for one website | `StudentClubWebsite/` |
| Local root folder | The project folder on your computer | `C:\Users\You\Documents\StudentClubWebsite\` |
| Relative path | Path from the current file to the target file | `images/logo.png`, `../index.html` |
| Absolute path | Full path from drive root or domain | `C:\Users\...\logo.png` |
| `../` | Go up one folder level in a relative path | `../images/logo.png` from inside `css/` |
| File naming convention | Lowercase, hyphens, no spaces, no special chars | `about-us.html` not `About Us.html` |
| Git | Version control system that tracks file changes | `git init`, `git add`, `git commit` |
| GitHub | Cloud platform for hosting Git repositories | github.com/your-username/project |
| Commit | A saved snapshot of your project at one point in time | `git commit -m "Add about page"` |
| `.gitignore` | File listing patterns Git should ignore | `Thumbs.db`, `*.tmp` |
| Semantic HTML | Using meaningful tags (`<nav>`, `<main>`, `<footer>`) | `<nav>` instead of `<div class="nav">` |
| Navigation consistency | Same nav menu on every page | Five identical links on all pages |

---

# 💡 WORKED EXAMPLES

## Example 1: Understanding Relative Paths with a Diagram

**Situation:** You are editing `events.html` in the root folder and want to link to `images/event-workshop.jpg`. You also want to link to `css/style.css`. What relative paths do you use?

**Folder structure:**
```
StudentClubWebsite/
├── index.html
├── events.html          <-- YOU ARE EDITING THIS FILE
├── images/
│   └── event-workshop.jpg
└── css/
    └── style.css
```

**Code (inside `events.html`):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Club - Events</title>
    <!-- events.html is in root, css/ is a subfolder of root -->
    <!-- So the path is: css/style.css -->
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>Our Events</h1>
    <!-- events.html is in root, images/ is a subfolder of root -->
    <!-- So the path is: images/event-workshop.jpg -->
    <img src="images/event-workshop.jpg" alt="Web Design Workshop" width="400" height="300">
</body>
</html>
```

**Line-by-line explanation:**

- `<link rel="stylesheet" href="css/style.css">`: Since `events.html` is in the root and `style.css` is inside `css/` (a direct subfolder of root), the relative path is simply `css/style.css` — go INTO the `css` folder and find `style.css`.
- `<img src="images/event-workshop.jpg"...>`: Same logic — `events.html` is in root, `event-workshop.jpg` is inside `images/`, so the path is `images/event-workshop.jpg`.

**Result:** The browser finds and loads both the CSS file and the image correctly because the relative paths are calculated from the location of `events.html`.

---

## Example 2: Linking FROM a Subfolder

**Situation:** You are writing CSS inside `css/style.css` and want to reference an image in `images/banner.jpg`. Since the CSS file is INSIDE the `css/` subfolder, you must go UP one level first.

**Folder structure:**
```
StudentClubWebsite/
├── index.html
├── images/
│   └── banner.jpg
└── css/
    └── style.css        <-- YOU ARE EDITING THIS FILE
```

**Code (inside `css/style.css`):**
```css
/* style.css is inside css/, so we need ../ to go UP to root first */

header {
    /* From css/ go up (..) then into images/ to find banner.jpg */
    background-image: url("../images/banner.jpg");
    background-size: cover;
    height: 200px;
}

.logo {
    /* Same pattern: up one level, then into images/ */
    background-image: url("../images/club-logo.png");
    width: 120px;
    height: 60px;
}
```

**Line-by-line explanation:**

- `url("../images/banner.jpg")`: The `..` means "go up one folder level" (from `css/` to the root). Then `/images/banner.jpg` navigates into the `images/` subfolder. Without the `../`, the browser would look for `css/images/banner.jpg`, which does not exist.
- `url("../images/club-logo.png")`: Same logic applies to every reference from a subfolder to a sibling folder.

**Result:** The CSS correctly loads the background images because the `../` prefix navigates up from `css/` to the root before descending into `images/`.

---

## Example 3: Complete Multi-Page Setup

**Situation:** You want to create three pages (Home, About, Contact) with identical navigation and correct relative paths.

**Code for `index.html`:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Club - Home</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Student Club</h1>
        <nav>
            <ul>
                <li><a href="index.html" class="active">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h2>Welcome!</h2>
        <p>This is the home page of the Student Club.</p>
    </main>
    <footer>
        <p>&copy; 2024 Student Club.</p>
    </footer>
</body>
</html>
```

**Code for `about.html`:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Club - About Us</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Student Club</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html" class="active">About Us</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h2>About Us</h2>
        <p>The Student Club was founded in 2020.</p>
    </main>
    <footer>
        <p>&copy; 2024 Student Club.</p>
    </footer>
</body>
</html>
```

**Key observations:**

- Both pages use `<link rel="stylesheet" href="css/style.css">` — same relative path because both HTML files are in the root.
- Navigation links are identical except for `class="active"` which moves to the current page.
- The `<title>` is different on each page (important for SEO and usability).
- Both pages have the same `<header>`, `<nav>`, and `<footer>` structure.

**Result:** Three interconnected pages with consistent navigation. Users can click between pages freely. The active link is highlighted on each page.

---

# 🛠️ HANDS-ON PRACTICE

## Setup (Tools and Folders)

Make sure you have completed the setup from Session 1. Your `StudentClubWebsite` folder should already exist with `images/`, `css/`, `js/`, and `documents/` subfolders.

If you have NOT done this yet, go back to Session 1, Task 1, and complete it now.

---

### TASK 1: Define the Site in Dreamweaver (or Set Up VS Code)

🎯 **Goal:** Tell your editor where your project lives so it can manage files and resolve paths.

📝 **Requirements:**
- The site must be defined/opened in your editor
- The Files panel (Dreamweaver) or Explorer (VS Code) must show your folder structure

🔧 **Steps:**

**For Dreamweaver CS6:**

**Step 1:** Open Dreamweaver CS6.

**Step 2:** Go to **Site → New Site**.

**Step 3:** In the dialog box:
- **Site Name:** Type `Student Club Website`
- **Local Site Folder:** Click the folder icon and browse to `C:\Users\YourName\Documents\StudentClubWebsite\`
- Leave all other settings as default

**Step 4:** Click **Save**.

**Step 5:** Look at the **Files panel** (usually on the right side). You should see "Student Club Website" at the top and your folder structure below it.

**For VS Code:**

**Step 1:** Open VS Code.

**Step 2:** Go to **File → Open Folder**.

**Step 3:** Browse to `C:\Users\YourName\Documents\StudentClubWebsite\` and click **Select Folder**.

**Step 4:** Look at the **Explorer panel** (Ctrl+Shift+E). You should see your folder and subfolders listed.

✅ **Expected result:** Your editor displays the complete folder structure of `StudentClubWebsite` including all subfolders.

💾 **Nothing new to save** — this is a configuration step.

---

### TASK 2: Create All Website Pages

🎯 **Goal:** Create five HTML pages for the Student Club Website, each with consistent navigation.

📝 **Requirements:**
- Create `index.html`, `about.html`, `events.html`, `gallery.html`, and `contact.html`
- Every page must have the same navigation menu
- Every page must link to `css/style.css`
- Each page must have unique content in the `<main>` section
- The `class="active"` attribute must be on the correct link for each page

🔧 **Steps:**

**Step 1:** Create `index.html` (if it does not already exist from Session 1). Use this code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Club - Home</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Student Club</h1>
        <nav>
            <ul>
                <li><a href="index.html" class="active">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h2>Welcome to the Student Club</h2>
        <p>We are a community of creative and enthusiastic students.
           Join us for workshops, events, and fun activities!</p>
        <section>
            <h3>Latest News</h3>
            <article>
                <h4>Web Design Workshop</h4>
                <p>Learn the basics of HTML and CSS. Date: March 15, 2024.</p>
            </article>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 Student Club. All rights reserved.</p>
    </footer>
</body>
</html>
```

Save as `index.html` in the root of `StudentClubWebsite/`.

**Step 2:** Create `about.html`. Copy the code above, then change:
- `<title>` to `Student Club - About Us`
- Move `class="active"` from `index.html` link to `about.html` link
- Replace `<main>` content with:

```html
    <main>
        <h2>About Us</h2>
        <p>The Student Club was founded in 2020 with a mission to bring
           students together through technology, creativity, and community service.</p>
        <h3>Our Mission</h3>
        <p>To provide a supportive environment where students can learn new skills,
           share ideas, and grow together.</p>
        <h3>Our Activities</h3>
        <ul>
            <li>Weekly coding workshops</li>
            <li>Design competitions</li>
            <li>Community service projects</li>
            <li>Social events and meetups</li>
        </ul>
    </main>
```

Save as `about.html` in the root.

**Step 3:** Create `events.html` similarly. Change:
- `<title>` to `Student Club - Events`
- Move `class="active"` to the Events link
- Replace `<main>` content with:

```html
    <main>
        <h2>Upcoming Events</h2>
        <section>
            <h3>March 2024</h3>
            <article>
                <h4>Web Design Workshop</h4>
                <p>Date: March 15 | Time: 2:00 PM - 4:00 PM | Room: IT Lab 3</p>
            </article>
            <article>
                <h4>Photography Contest</h4>
                <p>Deadline: March 20 | Submit photos to club@university.edu</p>
            </article>
            <article>
                <h4>Music Night</h4>
                <p>Date: March 29 | Time: 6:00 PM | Venue: Campus Hall</p>
            </article>
        </section>
    </main>
```

Save as `events.html` in the root.

**Step 4:** Create `gallery.html`. Change:
- `<title>` to `Student Club - Gallery`
- Move `class="active"` to the Gallery link
- Replace `<main>` content with placeholder text (you will add real images in Session 3):

```html
    <main>
        <h2>Photo Gallery</h2>
        <p>Photos from our events and activities will appear here.</p>
        <section>
            <h3>Orientation Day 2024</h3>
            <p>[Photos coming soon]</p>
        </section>
        <section>
            <h3>Workshop Highlights</h3>
            <p>[Photos coming soon]</p>
        </section>
    </main>
```

Save as `gallery.html` in the root.

**Step 5:** Create `contact.html`. Change:
- `<title>` to `Student Club - Contact`
- Move `class="active"` to the Contact link
- Replace `<main>` content with:

```html
    <main>
        <h2>Contact Us</h2>
        <p>We would love to hear from you! Reach out through any of these channels:</p>
        <ul>
            <li>Email: <a href="mailto:club@university.edu">club@university.edu</a></li>
            <li>Phone: +84 123 456 789</li>
            <li>Office: Building A, Room 101</li>
            <li>Hours: Monday - Friday, 9:00 AM - 5:00 PM</li>
        </ul>
    </main>
```

Save as `contact.html` in the root.

**Step 6:** Verify all five files appear in the Files panel / Explorer.

✅ **Expected result:** Five HTML files in the root folder, each with unique content and consistent navigation. Clicking any navigation link on any page loads the correct destination page.

💾 **Files to save:** `index.html`, `about.html`, `events.html`, `gallery.html`, `contact.html`

---

### TASK 3: Create the CSS Stylesheet

🎯 **Goal:** Create a basic stylesheet that makes your navigation look like a horizontal menu bar and adds basic styling.

📝 **Requirements:**
- Create `css/style.css`
- Style the navigation as a horizontal bar
- Add basic typography and layout styles
- Style the footer

🔧 **Steps:**

**Step 1:** Create a new file and save it as `css/style.css` inside your `css/` subfolder.

**Step 2:** Add this CSS code:

```css
/* ========================================
   Student Club Website - Main Stylesheet
   ======================================== */

/* --- Reset & Base Styles --- */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333333;
    background-color: #f5f5f5;
}

/* --- Header --- */
header {
    background-color: #1a5276;
    color: white;
    padding: 20px;
    text-align: center;
}

header h1 {
    font-size: 32px;
    margin-bottom: 10px;
}

/* --- Navigation --- */
nav ul {
    list-style: none;
    padding: 0;
    text-align: center;
}

nav ul li {
    display: inline;
    margin: 0 10px;
}

nav ul li a {
    color: white;
    text-decoration: none;
    padding: 5px 10px;
}

nav ul li a:hover {
    background-color: #2874a6;
    border-radius: 3px;
}

nav ul li a.active {
    font-weight: bold;
    border-bottom: 2px solid white;
}

/* --- Main Content --- */
main {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

main h2 {
    color: #1a5276;
    border-bottom: 2px solid #2874a6;
    padding-bottom: 5px;
    margin-bottom: 15px;
}

main h3 {
    color: #2874a6;
    margin-top: 20px;
    margin-bottom: 10px;
}

main article {
    margin-bottom: 15px;
    padding-left: 15px;
    border-left: 3px solid #ddd;
}

main article h4 {
    color: #1a5276;
    margin-bottom: 5px;
}

/* --- Footer --- */
footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 15px;
    margin-top: 20px;
}
```

**Step 3:** Save the file (Ctrl+S).

**Step 4:** Open `index.html` and preview in browser (F12). You should see:
- A dark blue header with white text
- A horizontal navigation bar
- A centered content area with white background and shadow
- A dark footer at the bottom

**Step 5:** Navigate to each page and verify the styling is consistent. Check that the active link looks different on each page.

✅ **Expected result:** All five pages share the same visual design. The navigation bar is horizontal. The active page link is bold with an underline. The layout is clean and readable.

💾 **File to save:** `css/style.css`

---

### TASK 4 (Optional): Initialize Git and Push to GitHub

🎯 **Goal:** Set up version control for your project and back it up to GitHub.

📝 **Requirements:**
- Git must be installed on your computer
- You must have a GitHub account
- Your project must be pushed to a GitHub repository

🔧 **Steps:**

**Step 1:** Open a terminal (Command Prompt, PowerShell, or VS Code integrated terminal).

**Step 2:** Navigate to your project folder:
```bash
cd C:\Users\YourName\Documents\StudentClubWebsite
```

**Step 3:** Initialize Git:
```bash
git init
```

**Step 4:** Create a `.gitignore` file:
```bash
echo Thumbs.db > .gitignore
echo *.tmp >> .gitignore
```

**Step 5:** Stage all files:
```bash
git add .
```

**Step 6:** Make your first commit:
```bash
git commit -m "Initial site setup with 5 pages and basic CSS"
```

**Step 7:** Create a new repository on GitHub:
- Go to https://github.com/new
- Name it `student-club-website`
- Do NOT initialize with README (your project already has files)
- Click Create Repository

**Step 8:** Connect and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/student-club-website.git
git branch -M main
git push -u origin main
```

**Step 9:** Refresh the GitHub page. You should see all your project files.

✅ **Expected result:** Your entire project is backed up on GitHub. You can view all files in the browser at `https://github.com/YOUR_USERNAME/student-club-website`.

💾 **Files created:** `.gitignore`, Git repository metadata in `.git/` folder

---

# 🐛 COMMON ERRORS — WHAT THE BROWSER SHOWS YOU

Almost every Session 2 bug is a path bug, and paths fail in recognisable ways. Match the symptom to the cause before you start guessing.

| Symptom you see | Likely cause | How to confirm | Fix |
|---|---|---|---|
| Broken-image icon where a photo should be | `src` path wrong, or file name case does not match | F12 → Network tab shows a red 404 for the image | Correct the path; make the file name lowercase and identical in both places |
| Page is unstyled — plain black text on white | The `<link>` to the stylesheet is not resolving | Network tab shows 404 on `style.css` | Fix the path, usually `css/style.css` or `../css/style.css` |
| Link opens your C: drive or a directory listing | `href` starts with `/`, which means the server root | Look at the address bar: it shows `file:///C:/` | Remove the leading slash and use a relative path |
| Link works from the home page but 404s from a subfolder page | Path written relative to the root, not to the current file | Compare the two pages' `href` values | Add `../` for each folder level you must climb out of |
| `pages/pages/contact.html` in the address bar | The folder name is repeated because you are already inside it | Read the URL — the doubled segment is the clue | Drop the folder prefix: just `contact.html` |
| Works on your laptop, 404s after upload | Case mismatch — Windows ignores case, Linux servers do not | Compare `About.html` in the file system to `about.html` in the `href` | Rename everything to lowercase and update the links |
| `%20` appearing in the URL | The file name contains a space | Look at the address bar | Rename with hyphens: `student-club.html` |
| Typing the folder URL gives a directory listing, not your page | The home page is not named `index.html` | Check the file name in the root folder | Rename it to exactly `index.html` |

**Fastest diagnostic in the course:** press F12, open the Network tab, and reload. Every failed request is one red row, and the row tells you the exact path the browser tried. Nine times out of ten the fix is adding or removing a `../`.

---


# ✅ SELF-CHECK QUESTIONS

Answer these from memory first, then expand the answer to check yourself.

**Q1. What is the difference between a relative path and an absolute path?**

<details>
<summary>Answer</summary>

A **relative path** is written from the location of the current file: `images/logo.png` means "the images folder next to me". An **absolute path** starts from the drive root or a full domain: `C:\Users\You\project\images\logo.png` or `https://example.com/images/logo.png`. Always use relative paths for your own files — absolute local paths break the instant the project moves to another computer or a web server.

</details>

---

**Q2. What does `../` mean in a path, and when do you need it?**

<details>
<summary>Answer</summary>

`../` means "go up one folder level". You need it when the file you are linking from sits deeper in the tree than the target. From `css/style.css`, the logo in `images/` is `../images/logo.png` — up out of `css/`, then down into `images/`. Two levels up is `../../`.

</details>

---

**Q3. Your friend's link `<a href="C:\Users\Mai\Documents\site\about.html">` works on her laptop but not yours. Why?**

<details>
<summary>Answer</summary>

It is an absolute local path pointing at a folder that only exists on her machine. On your computer there is no `C:\Users\Mai`, so the link fails. Uploaded to a server it also fails, because servers have no `C:` drive. The fix is a relative path: `<a href="about.html">`.

</details>

---

**Q4. Why does `git add` exist? Why not have `git commit` save everything automatically?**

<details>
<summary>Answer</summary>

`git add` populates the **staging area**, letting you choose exactly which changes belong in the next commit. If you fixed a navigation bug and half-finished a new page, you can stage and commit only the bug fix, keeping the history clean and each commit focused on one logical change.

</details>

---

**Q5. What belongs in `.gitignore` and why?**

<details>
<summary>Answer</summary>

Files that are generated, machine-specific, or private: OS junk (`Thumbs.db`, `.DS_Store`), editor temp files (`*.tmp`, `*.bak`), Dreamweaver's personal config, and any file with passwords or API keys. They are noise in the history, cause pointless merge conflicts, and secrets must never reach a public repository.

</details>

---

**Q6. Why must the navigation menu be identical on every page?**

<details>
<summary>Answer</summary>

Users build a mental map of the site. If the nav order changes or a link disappears between pages, they lose their bearings and the site feels broken. Identical navigation also means one CSS rule set styles all of it, so you fix bugs in one place instead of five.

</details>

---

**Q7. What is the practical difference between `<nav>` and `<div class="nav">`?**

<details>
<summary>Answer</summary>

Visually, none — both are block containers. Semantically, `<nav>` tells screen readers "this is a navigation landmark", letting users jump straight to it, and tells search engines which links define the site structure. `<div>` carries no meaning at all. Same effort to type; strictly more information.

</details>

---

**Q8. You renamed `About.html` to `about.html` locally and the site still works. After uploading, links break. Why?**

<details>
<summary>Answer</summary>

Windows filesystems are case-insensitive, so `About.html` and `about.html` are the same file locally. Most web servers run Linux, where they are **different files**. If a link still says `About.html` but the uploaded file is `about.html`, the server returns 404. Always use lowercase filenames and match them exactly in every link.

</details>

---


# 📝 SELF-ASSESSMENT WORKSHEET

| # | I can... | Yes ☐ | No ☐ |
|---|----------|-------|------|
| 1 | Define a site in Dreamweaver or open a project folder in VS Code | ☐ | ☐ |
| 2 | Create a proper folder structure with `images/`, `css/`, `js/`, and `documents/` subfolders | ☐ | ☐ |
| 3 | Explain the difference between relative and absolute paths and why relative paths are required | ☐ | ☐ |
| 4 | Write correct relative paths from both the root folder and from subfolders (using `../`) | ☐ | ☐ |
| 5 | Apply file naming conventions (lowercase, hyphens, no spaces) to all files and folders | ☐ | ☐ |
| 6 | Create multiple HTML pages with identical navigation menus and correct active-page highlighting | ☐ | ☐ |
| 7 | Explain what Git is and perform basic operations: init, add, commit | ☐ | ☐ |
| 8 | Test all navigation links across all pages and fix any broken links | ☐ | ☐ |

**Self-scoring guide:**
- 7-8 Yes: Excellent! You are ready for Session 3.
- 5-6 Yes: Good. Redo the practice tasks where you struggled before continuing.
- 0-4 Yes: Re-read the Theory section carefully. Focus especially on Section 3 (relative paths) — this is the most common stumbling block. Ask your instructor for help.

---

# 🔗 FURTHER READING

- [Dealing with Files — MDN](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files)
- [Creating Hyperlinks — MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks)
- [Document and Website Structure — MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
- [What is a Web Server — MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_web_server)
- [Git Handbook — GitHub Docs](https://docs.github.com/en/get-started/using-git/about-git)
- [Setting up Version Control — MDN](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/GitHub/Intro_to_GitHub)
- [W3C HTML Validator](https://validator.w3.org/)

---

# ⏭️ NEXT SESSION

In Session 3, you will learn how to format text with headings, paragraphs, lists, and emphasis tags, and how to add images with proper accessibility attributes — bringing your Student Club Website to life with real content.
