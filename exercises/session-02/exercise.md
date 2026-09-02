# Session 2 — In-Class Exercise: Creating a New Site & Project Organization

## Objective
- Create a properly organized project folder structure for a website
- Learn and apply file naming conventions used by web developers
- Understand how relative paths work to link files together

## Time Required
Estimated time: 50 minutes

## Instructions

### Task 1: Create Your Site Folder Structure
A well-organized website project uses a clear folder structure. Create the following folders on your Desktop:

```
club-website/
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

**Steps:**
1. Create a folder called `club-website` on your Desktop.
2. Inside `club-website`, create two subfolders: `images`, `css`, and `pages`.
3. Inside the `css` folder, create a new file called `style.css` (right-click > New > Text Document, rename to `style.css`).
4. Inside `club-website`, create a new file called `index.html`.
5. Inside `pages`, create `events.html` and `contact.html`.

**Important**: Open the `club-website` folder in Dreamweaver by going to **Site > New Site**. Name it "Club Website" and set the local site folder to your `club-website` directory.

### Task 2: Learn File Naming Conventions
Follow these rules when naming web files:

| Rule | Good Example | Bad Example |
|------|-------------|-------------|
| Use only lowercase letters | `about.html` | `About.html` |
| Use hyphens, not spaces | `contact-us.html` | `contact us.html` |
| No special characters | `style.css` | `st@yle!.css` |
| Be descriptive | `events.html` | `page1.html` |
| Use the correct extension | `index.html` | `index.txt` |

**Practice**: Rename any files you created that break these rules. Make sure all your file names are lowercase, use hyphens if needed, and have the correct extensions.

### Task 3: Understand Relative Paths
Relative paths tell the browser where to find a file **relative to the current file's location**.

**Three types of relative paths:**

1. **Same folder** — just the file name:
   ```html
   <a href="about.html">About Us</a>
   ```

2. **Into a subfolder** — folder name then file:
   ```html
   <a href="pages/events.html">Events</a>
   <img src="images/logo.png" alt="Club Logo">
   ```

3. **Up to the parent folder** — use `../` to go up one level:
   ```html
   <!-- If you are inside pages/events.html and want to go back to index.html: -->
   <a href="../index.html">Home</a>
   ```

**Practice Exercise**: Open `pages/events.html` in Dreamweaver and add the following code:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Events</title>
</head>
<body>
    <h1>Club Events</h1>
    <p>Check out our upcoming events!</p>

    <p><a href="../index.html">Back to Home</a></p>
    <p><a href="contact.html">Contact Us</a></p>
</body>
</html>
```

Notice how `../index.html` goes **up one folder** (from `pages/` to `club-website/`) and then opens `index.html`. But `contact.html` has no `../` because `contact.html` is in the **same folder** as `events.html`.

### Task 4: Build Basic Pages with Navigation Links
Create `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Student Club - Home</title>
</head>
<body>
    <h1>Welcome to the Student Club</h1>
    <p>This is our official club website.</p>

    <h2>Pages</h2>
    <ul>
        <li><a href="about.html">About Us</a></li>
        <li><a href="pages/events.html">Events</a></li>
        <li><a href="pages/contact.html">Contact</a></li>
    </ul>

    <img src="images/logo.png" alt="Club Logo">
</body>
</html>
```

Create `about.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>About Us</title>
</head>
<body>
    <h1>About the Student Club</h1>
    <p>We are a group of students who love technology.</p>

    <p><a href="index.html">Back to Home</a></p>
</body>
</html>
```

Create `pages/contact.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Contact Us</title>
</head>
<body>
    <h1>Contact Us</h1>
    <p>Email: club@vnu-is.edu.vn</p>

    <p><a href="../index.html">Back to Home</a></p>
    <p><a href="events.html">See Events</a></p>
</body>
</html>
```

- Save all files and press **F12** to preview `index.html` in your browser.
- Click each link to make sure it works correctly.

## Starter Files
- None required. You create the folder structure and all files from scratch.

## Expected Result
A folder structure like this:

```
club-website/
├── index.html        ← Home page with links to other pages
├── about.html        ← About page
├── images/           ← Empty (you will add images later)
├── css/
│   └── style.css     ← Empty for now (will add CSS in Session 4)
└── pages/
    ├── events.html   ← Events page
    └── contact.html  ← Contact page
```

All links between pages should work when you click them in the browser.

## Self-Check (answers included)

Answer each question from **your own folder** first, then open the arrow to
compare. Paths are the number one source of broken student sites, so do not skip
this section.

<details>
<summary>1. You are editing `pages/contact.html` and want a link to `about.html`, which sits in the site root. What is the correct `href`?</summary>

```html
<a href="../about.html">About Us</a>
```

Read it as an instruction to the browser: `../` means *leave the folder I am in*
(so you move from `pages/` up to `club-website/`), then `about.html` means *open
that file here*.

`href="about.html"` would look for `club-website/pages/about.html`, which does
not exist.

</details>

<details>
<summary>2. In `pages/events.html` the link to Contact is just `contact.html` — no `../`. Why does that work?</summary>

Because `events.html` and `contact.html` are **in the same folder** (`pages/`).

A relative path always starts from the folder of the file you are writing in, so
a plain file name means "my neighbour". You only need `../` when you must climb
out of the current folder.

Quick rule to memorise:

| Where the target is | What you write |
|---|---|
| Same folder | `contact.html` |
| Down into a subfolder | `pages/contact.html` |
| Up one level, then down | `../css/style.css` |

</details>

<details>
<summary>3. Your logo shows fine on your laptop, but a classmate opens your folder and the image is broken. Name the two most likely causes.</summary>

**Cause 1 — an absolute path.** If you wrote

```html
<img src="C:/Users/Linh/Desktop/club-website/images/logo.png" alt="Club logo">
```

that path only exists on your machine. Use the relative path `images/logo.png`.

**Cause 2 — letter case.** Windows treats `Logo.PNG` and `logo.png` as the same
file; real web servers (and macOS/Linux) do not. If the file is `Logo.PNG` and
your HTML says `logo.png`, it works at home and breaks everywhere else.

This is exactly why Task 2 makes lowercase names a rule rather than a
preference. Fix the file name, not the HTML.

</details>

<details>
<summary>4. Challenge — no code given: add `pages/gallery.html` that links back to Home, to About, and shows the logo. Write it yourself first.</summary>

```html
<!DOCTYPE html>
<html>
<head>
    <title>Gallery</title>
</head>
<body>
    <h1>Club Gallery</h1>
    <p>Photos from our recent workshops.</p>

    <img src="../images/logo.png" alt="Student Technology Club logo">

    <p><a href="../index.html">Back to Home</a></p>
    <p><a href="../about.html">About Us</a></p>
    <p><a href="events.html">See Events</a></p>
</body>
</html>
```

Three things to verify in your own version:

1. Home, About, **and the image** all need `../` — they all live above `pages/`.
2. `events.html` does **not** need `../` — same folder.
3. The `<img>` has an `alt` attribute. Every image, every time.

</details>

## Checklist
- [ ] Created `club-website` folder with subfolders `images`, `css`, `pages`
- [ ] All file names follow naming conventions (lowercase, hyphens, correct extensions)
- [ ] Created `index.html`, `about.html`, `events.html`, `contact.html`, and `style.css`
- [ ] Links from `index.html` to other pages work correctly
- [ ] Links from pages inside `pages/` back to `index.html` use `../`
- [ ] Links between files in the same folder (e.g., `events.html` to `contact.html`) work
- [ ] Registered the site in Dreamweaver using Site > New Site

## Tips
- When a link does not work, check: did you save the file? Is the path correct? Is the file in the right folder?
- `../` means "go up one folder level." Use `../../` to go up two levels (rarely needed).
- Always keep images inside the `images/` folder — never put image files in the root folder.
