# Session 11 — In-Class Exercise: Designing a Compact Site

## Objective
- Plan a small website using a site map
- Refine and polish pages for a consistent, professional look
- Review and improve navigation, layout, and visual design

## Time Required
Estimated time: 55 minutes

## Instructions

### Task 1: Plan with a Site Map
Before building, good web designers create a **site map** — a diagram showing all the pages and how they link together.

Draw a site map for your Student Club Website. Here is a template:

```
                    ┌────────────┐
                    │  index.html│
                    │   (Home)   │
                    └─────┬──────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
    ┌─────┴──────┐  ┌────┴─────┐  ┌──────┴──────┐
    │ about.html │  │ events   │  │  contact    │
    │  (About)   │  │  .html   │  │   .html     │
    └────────────┘  │ (Events) │  │ (Contact)   │
                    └──────────┘  └─────────────┘
          │               │               │
    ┌─────┴──────┐  ┌────┴─────┐  ┌──────┴──────┐
    │ media.html │  │ tables   │  │  (future    │
    │  (Media)   │  │ .html    │  │   pages)    │
    └────────────┘  │(Tables)  │  └─────────────┘
                    └──────────┘
```

**Site map rules:**
- Every page should be reachable from the Home page
- Navigation should be consistent on every page
- No "orphan" pages (pages that no other page links to)

Review your current site: open every page in the browser and click every link. Make sure nothing is broken and nothing is missing.

### Task 2: Polish the Visual Design
A professional website looks consistent. Check and fix these items across all pages:

**Step 1**: Open `css/style.css` and add/update these rules for visual polish:

```css
/* Consistent spacing for all pages */
main {
    padding: 20px 30px;
    max-width: 960px;
    margin: 0 auto;
    min-height: 400px;   /* Ensures footer stays low even on short pages */
}

/* Better list styling */
main ul, main ol {
    margin-left: 20px;
    margin-bottom: 15px;
}

main ul li, main ol li {
    margin-bottom: 6px;
}

/* Links in main content */
main a {
    color: #2980b9;
    text-decoration: none;
    border-bottom: 1px dotted #2980b9;
}

main a:hover {
    color: #1a5276;
    border-bottom: 1px solid #1a5276;
}

/* Images in content */
main img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    margin: 10px 0;
}

/* Section spacing */
main section {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eeeeee;
}

main section:last-child {
    border-bottom: none;
}

/* Footer improvements */
footer {
    background-color: #2c3e50;
    color: white;
    text-align: center;
    padding: 20px;
    margin-top: 0;
}

footer a {
    color: #3498db;
    text-decoration: none;
}

footer a:hover {
    text-decoration: underline;
}
```

**Step 2**: Check that all pages have the same:
- Header (same title and slogan)
- Navigation bar (same links, in the same order)
- Footer (same copyright and contact info)
- Font family and sizes
- Color scheme

### Task 3: Add a Favicon
A **favicon** is the small icon shown in the browser tab next to the page title.

**Step 1**: Find a small square image (16x16 or 32x32 pixels). You can use any `.ico` or `.png` file. Save it as `favicon.ico` in the root folder (`club-website/`).

**Step 2**: Add this line inside the `<head>` of every HTML file:

```html
<link rel="icon" href="favicon.ico" type="image/x-icon">
```

For files in the `pages/` folder, the path would be `../favicon.ico`.

### Task 4: Create a Simple Site Index Page
Add a page that lists all other pages with descriptions. This is helpful for users and for testing.

Create `sitemap.html` in the root folder:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Site Map</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Student Technology Club</h1>
        <p>Building the future, one line of code at a time.</p>
    </header>

    <nav class="main-nav">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="pages/events.html">Events</a></li>
            <li><a href="pages/contact.html">Contact</a></li>
            <li><a href="media.html">Media</a></li>
        </ul>
    </nav>

    <main>
        <h2 class="section-title">Site Map</h2>
        <p>A complete list of all pages on this website:</p>

        <table>
            <caption>All Pages</caption>
            <thead>
                <tr>
                    <th>Page</th>
                    <th>Description</th>
                    <th>File</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><a href="index.html">Home</a></td>
                    <td>Welcome page with club introduction</td>
                    <td>index.html</td>
                </tr>
                <tr>
                    <td><a href="about.html">About</a></td>
                    <td>Information about the club, mission, and team</td>
                    <td>about.html</td>
                </tr>
                <tr>
                    <td><a href="pages/events.html">Events</a></td>
                    <td>Upcoming and past club events</td>
                    <td>pages/events.html</td>
                </tr>
                <tr>
                    <td><a href="pages/contact.html">Contact</a></td>
                    <td>Contact information and meeting times</td>
                    <td>pages/contact.html</td>
                </tr>
                <tr>
                    <td><a href="media.html">Media</a></td>
                    <td>Video and audio content</td>
                    <td>media.html</td>
                </tr>
                <tr>
                    <td><a href="tables.html">Tables</a></td>
                    <td>Member list and schedule tables</td>
                    <td>tables.html</td>
                </tr>
            </tbody>
        </table>
    </main>

    <footer>
        <p>&copy; 2025 Student Technology Club. All rights reserved.</p>
    </footer>
</body>
</html>
```

### Task 5: Final Review Checklist
Go through every page and check the following:

- [ ] All pages load without errors
- [ ] All links work (click every link on every page)
- [ ] Navigation is consistent (same links, same order)
- [ ] Header and footer are identical across all pages
- [ ] Images display correctly (no broken image icons)
- [ ] Tables have borders and are styled properly
- [ ] Video and audio players appear and work
- [ ] Page titles in `<title>` are unique for each page
- [ ] The site looks complete and professional

## Starter Files
- Complete `club-website` folder from Sessions 2-10
- `css/style.css` with all previous CSS rules

## Expected Result
A fully polished, consistent multi-page website:

```
club-website/
├── index.html          ← Home page
├── about.html          ← About the club
├── media.html          ← Video and audio
├── tables.html         ← Member list and schedule
├── sitemap.html        ← Page index (new!)
├── favicon.ico         ← Browser tab icon (new!)
├── images/
│   ├── logo.png
│   ├── banner.jpg
│   ├── team-photo.jpg
│   ├── sample-video.mp4
│   └── sample-audio.mp3
├── css/
│   └── style.css       ← Fully polished CSS
└── pages/
    ├── events.html     ← Events page
    └── contact.html    ← Contact page
```

Every page should have the same look and feel. Navigation should work flawlessly. The site should look like a real, finished project.

## Self-Check (answers included)

Answer from **your own site** first, then open the arrow.

<details>
<summary>1. What is an "orphan page", why is it a real problem, and how do you find one?</summary>

An orphan is a page that exists in your folder but **no other page links to it**.
The only way to reach it is by typing the URL.

Why it matters: visitors cannot find it, search engines mostly cannot either
(they follow links), and at grading time an unlinked page reads as an unfinished
one.

How to find orphans without guessing:

1. List every `.html` file in your folder — that is the full set.
2. Start at `index.html` and click through every link you can reach, ticking
   pages off the list.
3. Anything left unticked is an orphan.

`sitemap.html` from Task 4 makes this cheap: if every page is in the table, every
page has at least one inbound link.

</details>

<details>
<summary>2. Your favicon does not appear even after adding the `<link>` tag. Give three reasons.</summary>

1. **Browser cache.** Favicons are cached hard. Force-reload with
   **Ctrl+Shift+R**, or close the tab and open the page in a new one.
2. **Wrong path.** The `<link>` sits in `<head>`, so the same relative-path rules
   apply as everywhere else. Files inside `pages/` need `../favicon.ico`.
3. **Not a real icon file.** Renaming `logo.png` to `favicon.ico` does not convert
   it — the extension changed, the bytes did not. Either convert it properly, or
   point at the PNG and say so:

```html
<link rel="icon" type="image/png" href="images/favicon.png">
```

Diagnose it the same way as any missing file: **F12** → Network → reload, and see
whether the request 404s.

</details>

<details>
<summary>3. Why should `<title>` be different on every page, and what makes a good one?</summary>

`<title>` is used in four places at once: the tab label, the bookmark name, the
browser history entry, and the headline in search results. Five tabs all reading
"Student Club" are unusable.

A good title goes from **specific to general**:

```html
<title>Contact Us — Student Technology Club</title>
<title>Events — Student Technology Club</title>
```

Specific part first, because a narrow tab truncates the end. The site name last
gives context without being repeated first every time.

Skip filler like "Welcome to" and "Home page of" — you are spending the visible
characters on words that identify nothing.

</details>

<details>
<summary>4. Challenge — no code given: a classmate's site has a different footer on three of six pages. Describe the repair, and how you would prevent it happening again.</summary>

**The repair:**

1. Pick one footer as the correct version — normally the most complete.
2. Copy that exact block and paste it over the footer in all six files. Paste;
   do not retype, or you will introduce a seventh variant.
3. Open all six pages and compare the bottom of each.

**Preventing a recurrence** — this is really the DRY problem from Session 6:

- Keep everything that repeats (`header`, `nav`, `footer`) **byte-identical** and
  in the same position in every file, so a difference is easy to spot.
- Put the changing parts in CSS, not in the HTML of each page. If the footer
  colour must differ per page, that is a class, not a different footer.
- Use your editor to check: VS Code's **Ctrl+Shift+F** searches all files at once,
  so searching for the copyright line shows you six hits — and any file where the
  text differs stands out immediately (Session 12).

Plain HTML has no include mechanism, so discipline is the only tool at this
level. A server-side include or a static-site generator solves it properly, and
that is a large part of why those tools exist.

</details>

## Checklist
- [ ] Drew a site map showing all pages and their connections
- [ ] Added visual polish CSS (section borders, link styles, image styles)
- [ ] Added a favicon and linked it in every page
- [ ] Created `sitemap.html` as a site index with a table
- [ ] Verified every link on every page works correctly
- [ ] Verified all images, video, and audio load correctly
- [ ] Confirmed navigation is identical across all pages
- [ ] Confirmed the overall site looks consistent and professional

## Tips
- A site does not need to be large to look professional. A small site with consistent design is better than a big site with random styling.
- Always test links by clicking them. Do not assume they work — test them.
- The `<title>` tag should be different on each page. It helps users know which page they are on when they have multiple tabs open.
- `min-height` on `<main>` prevents pages with very little content from looking broken (the footer will not jump up to the middle of the screen).
