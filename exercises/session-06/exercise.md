# Session 6 — In-Class Exercise: Page Layouts Continued — Multi-Page Site with Navigation

## Objective
- Build a consistent navigation menu shared across all pages
- Use CSS to style the navigation as a horizontal menu bar
- Create a complete multi-page site with proper linking between pages

## Time Required
Estimated time: 55 minutes

## Instructions

### Task 1: Build a Shared Navigation Menu
A good website has the **same navigation on every page**. Instead of copy-pasting the nav code, you will use the same HTML structure and the same CSS class on every page.

Open `css/style.css` and add these navigation styles (keep everything already there):

```css
/* Main navigation — horizontal bar */
.main-nav {
    background-color: #34495e;
    padding: 0;
    overflow: hidden;
}

.main-nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
}

.main-nav ul li {
    display: inline-block;
}

.main-nav ul li a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 14px 20px;
    font-size: 15px;
}

.main-nav ul li a:hover {
    background-color: #2c3e50;
    color: #f1c40f;
}

/* Style for the active/current page link */
.main-nav ul li a.active {
    background-color: #2980b9;
    color: white;
}
```

**Explanation of new CSS properties:**
- `overflow: hidden` — prevents floated or inline elements from spilling outside the nav
- `display: inline-block` — makes the `<li>` items sit side by side but keeps block behavior
- `padding: 14px 20px` — 14px top/bottom, 20px left/right (creates clickable area)
- `.active` — a class you add to the link for the current page

### Task 2: Add the Navigation to Every Page
Update `index.html` with the navigation menu:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Student Club - Home</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Student Technology Club</h1>
        <p>Building the future, one line of code at a time.</p>
    </header>

    <nav class="main-nav">
        <ul>
            <li><a href="index.html" class="active">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="pages/events.html">Events</a></li>
            <li><a href="pages/contact.html">Contact</a></li>
        </ul>
    </nav>

    <main>
        <section>
            <h2>Welcome to Our Club</h2>
            <p>The Student Technology Club is a community of learners. We build 
            websites, solve problems, and support each other.</p>
        </section>

        <section>
            <h2>Why Join?</h2>
            <ul>
                <li>Learn new technical skills</li>
                <li>Work on real projects</li>
                <li>Meet other students who share your interests</li>
                <li>Prepare for internships and jobs</li>
            </ul>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Student Technology Club. All rights reserved.</p>
    </footer>
</body>
</html>
```

Notice: `class="active"` is on the Home link because this IS the home page. On `about.html`, the `active` class would move to the About link instead.

Now update `about.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>About Us</title>
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
            <li><a href="about.html" class="active">About</a></li>
            <li><a href="pages/events.html">Events</a></li>
            <li><a href="pages/contact.html">Contact</a></li>
        </ul>
    </nav>

    <main>
        <section>
            <h2>About Us</h2>
            <p>The Student Technology Club was founded in 2020 by a small group of 
            friends who wanted a place to learn web development together.</p>
        </section>

        <section>
            <h2>Our Mission</h2>
            <p>We believe every student should have the chance to learn how to build 
            things with technology. No experience is required to join.</p>
        </section>

        <section>
            <h2>Our Team</h2>
            <p>We have over 30 active members from different majors. Our leaders are:</p>
            <ul>
                <li><strong>President:</strong> Nguyen Van A</li>
                <li><strong>Vice President:</strong> Tran Thi B</li>
                <li><strong>Treasurer:</strong> Le Van C</li>
            </ul>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Student Technology Club. All rights reserved.</p>
    </footer>
</body>
</html>
```

Now update `pages/events.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Events</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header>
        <h1>Student Technology Club</h1>
        <p>Building the future, one line of code at a time.</p>
    </header>

    <nav class="main-nav">
        <ul>
            <li><a href="../index.html">Home</a></li>
            <li><a href="../about.html">About</a></li>
            <li><a href="events.html" class="active">Events</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
    </nav>

    <main>
        <section>
            <h2>Upcoming Events</h2>

            <article>
                <h3>HTML &amp; CSS Workshop</h3>
                <p><strong>Date:</strong> March 15, 2025</p>
                <p><strong>Location:</strong> Room 204, IT Building</p>
                <p>Learn the basics of HTML and CSS by building a real website. 
                Bring your laptop!</p>
            </article>

            <article>
                <h3>Web Design Competition</h3>
                <p><strong>Date:</strong> March 22, 2025</p>
                <p><strong>Location:</strong> Computer Lab 3</p>
                <p>Compete with other students to design the best club poster page. 
                Prizes for the top 3 entries!</p>
            </article>
        </section>

        <section>
            <h2>Past Events</h2>
            <ul>
                <li>JavaScript Introduction (February 2025)</li>
                <li>Welcome Party for New Members (January 2025)</li>
                <li>End-of-Semester Showcase (December 2024)</li>
            </ul>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Student Technology Club. All rights reserved.</p>
    </footer>
</body>
</html>
```

Finally, update `pages/contact.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Contact Us</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header>
        <h1>Student Technology Club</h1>
        <p>Building the future, one line of code at a time.</p>
    </header>

    <nav class="main-nav">
        <ul>
            <li><a href="../index.html">Home</a></li>
            <li><a href="../about.html">About</a></li>
            <li><a href="events.html">Events</a></li>
            <li><a href="contact.html" class="active">Contact</a></li>
        </ul>
    </nav>

    <main>
        <section>
            <h2>Contact Us</h2>
            <p>We would love to hear from you! Reach out using any of the methods below.</p>

            <h3>Email</h3>
            <p><a href="mailto:club@vnu-is.edu.vn">club@vnu-is.edu.vn</a></p>

            <h3>Location</h3>
            <p>Room 204, IT Building<br>
            VNU-IS Campus</p>

            <h3>Meeting Times</h3>
            <p>Every Friday, 3:00 PM - 5:00 PM</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Student Technology Club. All rights reserved.</p>
    </footer>
</body>
</html>
```

**Note**: Files inside `pages/` use `../` paths because they need to go up one folder to reach `css/` and other pages.

### Task 3: Test All Links
Open `index.html` in the browser and test every link:

1. Click **Home** — should load `index.html`
2. Click **About** — should load `about.html`
3. Click **Events** — should load `pages/events.html`
4. Click **Contact** — should load `pages/contact.html`
5. From the Events page, click **Home** — should return to `index.html`
6. From the Contact page, click **About** — should go to `about.html`

Every link should work. If any link is broken, check:
- Is the `href` path correct?
- Does the file exist in the right folder?
- Did you save all files?

## Starter Files
- `club-website` folder from Sessions 2-5
- `css/style.css` file with previous CSS rules
- All HTML pages from previous sessions

## Expected Result

```
┌──────────────────────────────────────────────────────┐
│  [dark header]                                       │
│         Student Technology Club                      │
│  Building the future, one line of code at a time.    │
├──────────────────────────────────────────────────────┤
│  [nav bar — dark gray]                               │
│  [Home]  [About]  [Events]  [Contact]                │
│  ▲ blue background on the current page's link        │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Welcome to Our Club                                 │
│  The Student Technology Club is a community...       │
│                                                      │
│  Why Join?                                           │
│  • Learn new technical skills                        │
│  • Work on real projects                             │
│  • Meet other students                               │
│  • Prepare for internships and jobs                  │
│                                                      │
├──────────────────────────────────────────────────────┤
│  [dark footer]                                       │
│  (c) 2025 Student Technology Club                    │
└──────────────────────────────────────────────────────┘
```

## Self-Check (answers included)

Answer from **your own four pages** first, then open the arrow.

<details>
<summary>1. You copied the same nav block into four files. What breaks when the club adds a fifth page?</summary>

You must edit **four files** to add one link, and any file you forget now has a
different menu from the rest. That is the whole problem this session is about.

Plain HTML has no include mechanism, so at this stage copying is the only option
— but you can make it survivable:

- Keep the nav block **byte-identical** on every page. Copy and paste; never
  retype it.
- Keep it in one place in the file (right after `</header>`), so it is easy to
  find in all four.
- Change only the position of `class="active"`.

Session 11 gives this a name — **DRY**, Don't Repeat Yourself — and Session 12
shows how a code editor can find every copy at once. On a real project a server
or build tool inserts a single shared file.

</details>

<details>
<summary>2. What does the `.active` class accomplish, and why can CSS not work it out on its own?</summary>

It tells the visitor **where they are** — the current page's link gets a
different background, so the menu answers "which page am I on?" without reading
the address bar.

CSS cannot deduce it because a stylesheet does not know which file the browser
loaded. It styles whatever you mark. So you mark it by hand:

```html
<!-- in about.html only -->
<li><a href="about.html" class="active">About</a></li>
```

Consequence to remember: `active` must **move** from page to page. If you copy
`index.html` to make a new page and forget to move it, every page claims to be
Home. That is a common and confusing bug because nothing looks broken.

</details>

<details>
<summary>3. Why `display: inline-block` on the `<li>` instead of `display: inline`?</summary>

Both put the items side by side, but `inline` refuses to accept vertical padding
in the way you want.

- `display: inline` — the element's box hugs the text. Top and bottom `padding`
  is drawn but does **not** push the surrounding lines apart, so a tall
  clickable area overflows and the nav bar looks wrong.
- `display: inline-block` — the element sits in a line **and** behaves like a
  block internally, so `padding: 14px 20px` builds a real rectangle.

That rectangle matters for more than appearance: the padded `<a>` is the
clickable target. A bigger target is easier to hit with a finger — Session 15
puts a number on it (44×44px).

</details>

<details>
<summary>4. Challenge — no code given: add a "Gallery" page in `pages/` and wire it into the nav on all five pages. What href does each file need?</summary>

For the three files in the site root (`index.html`, `about.html`, and any other
root page):

```html
<li><a href="pages/gallery.html">Gallery</a></li>
```

For the files already inside `pages/` (`events.html`, `contact.html`,
`gallery.html`):

```html
<li><a href="gallery.html">Gallery</a></li>
```

And inside `pages/gallery.html`, that same link is the one that carries
`class="active"`.

The trap: pasting the root version into `pages/events.html` gives
`pages/pages/gallery.html`. The rule does not change — a relative path is always
read from the folder of the file you are writing in.

Fastest verification: open every page and click the new link. Five pages, five
clicks, no guessing.

</details>

## Checklist
- [ ] Added `.main-nav` CSS styles to `style.css`
- [ ] Added the navigation bar (`<nav class="main-nav">`) to all 4 HTML pages
- [ ] The `class="active"` appears on the correct link for each page
- [ ] Navigation links use the correct relative paths (`../` for pages in subfolder)
- [ ] Navigation is horizontal (side by side), not vertical
- [ ] Hover effect works — links change color when you move the mouse over them
- [ ] All links work when clicked (test from every page)
- [ ] Header and footer are identical across all pages

## Tips
- When writing navigation links for files inside `pages/`, always remember `../` to go up one folder level.
- The `active` class is a convention — you manually add it to whichever page the user is currently viewing.
- Keep the header, nav, and footer HTML identical on every page. Only the `<main>` content changes.
- If a link breaks after adding navigation, double-check the relative path. This is the most common mistake.
