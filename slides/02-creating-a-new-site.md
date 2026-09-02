---
marp: true
theme: default
paginate: true
---

# Session 2: Creating a New Site

**INS2053 — Web Authoring and Web Management**

*A real site starts with a real folder structure.*

Read: `ebook/02-creating-a-new-site.md`  ·  Practise: `exercises/session-02/exercise.md`  ·  Diagrams: `canvases/buoi-02.canvas.tsx`

---

## Learning Objectives

- Define a "site" in Dreamweaver or set up a workspace in VS Code
- Build a multi-page website with consistent navigation
- Distinguish between relative and absolute file paths
- Apply correct file naming conventions
- Understand basic Git operations (init, add, commit)

---

## What Is a "Site"?

- A **site** = the root folder containing ALL files for one website
- Defining a site tells your editor where the project lives
- Enables relative path resolution, link checking, file management

🎒 Like **setting up a new apartment**:
- Choosing the apartment = choosing your root folder
- Setting up rooms = creating subfolders (`images/`, `css/`)
- Giving the landlord your address = telling the editor where files live

---

## Complete Folder Structure

```
StudentClubWebsite/
├── index.html           <-- Home (required!)
├── about.html
├── events.html
├── gallery.html
├── contact.html
├── images/              <-- All image files
├── css/
│   └── style.css        <-- Main stylesheet
├── js/
│   └── main.js
└── documents/           <-- PDFs, downloads
```

- One root folder per project
- Separate folders by file type
- Keep it flat — two levels maximum

---

## Relative vs Absolute Paths

| Feature | Relative Path | Absolute Path |
|---------|--------------|---------------|
| Starts from | Current file's location | Drive root or domain |
| Example | `images/logo.png` | `C:\Users\...\logo.png` |
| Works after moving folder? | ✅ Yes | ❌ No |
| Works on a server? | ✅ Yes | ❌ No |
| Recommended? | ✅ ALWAYS | ❌ NEVER |

> **Rule:** Always use relative paths in HTML and CSS.

---

## How Relative Paths Work

From `index.html` (in root):
- `about.html` → same folder
- `images/logo.png` → go INTO `images/`
- `css/style.css` → go INTO `css/`

From `css/style.css` (inside subfolder):
- `../index.html` → go UP one level, then find file
- `../images/logo.png` → go UP, then INTO `images/`

🎒 Like giving **directions from where you stand** — not from a fixed point.

---

## File Naming Conventions

| Rule | ✅ Correct | ❌ Wrong |
|------|-----------|----------|
| Lowercase only | `about-us.html` | `About-Us.html` |
| Hyphens for spaces | `team-photo.jpg` | `team photo.jpg` |
| No special chars | `events.html` | `events&news.html` |
| Meaningful names | `gallery.html` | `page2.html` |
| Home page | `index.html` | `home.html` |

- Linux servers are case-sensitive
- Spaces become `%20` in URLs

---

## Live Code Example

Consistent navigation on every page:

```html
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html" class="active">About Us</a></li>
        <li><a href="events.html">Events</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

- Same nav block on EVERY page
- Move `class="active"` to the current page's link
- Test every link on every page

---

## Common Mistakes

- ❌ Using absolute paths: `<img src="C:\Users\...\logo.png">`
- ✅ Use relative paths: `<img src="images/logo.png">`
- ❌ Forgetting `../` when linking from a subfolder
- ✅ Inside `css/style.css` use `url("../images/banner.jpg")`
- ❌ Inconsistent naming: `About.html`, `CONTACT.HTML`, `my page.html`
- ✅ Use `about.html`, `contact.html`, `my-page.html`
- ❌ Different navigation menus on different pages
- ✅ Copy the exact same `<nav>` block to every page

---

## In-Class Practice

Follow `exercises/session-02/exercise.md`:

1. Define the site in Dreamweaver / open folder in VS Code
2. Create all five HTML pages with identical navigation
3. Create `css/style.css` with basic navigation styling
4. Click every link on every page to verify

---

## Homework

See `homework/session-02/homework.md`:

- Complete all five pages with working navigation
- Ensure correct relative paths throughout
- Validate HTML at validator.w3.org

**Due Sunday 23:59**

---

## Recap

- Define your site before writing any code
- Always use relative paths — never `C:\...` paths
- Follow naming conventions: lowercase, hyphens, no spaces
- Keep identical navigation on every page
- Use `../` to navigate up from subfolders

---

## Next Session

**Session 3: Working with Text and Images** — headings, paragraphs, lists, bold/italic, image formats, alt text, and accessibility.
