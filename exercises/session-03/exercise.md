# Session 3 — In-Class Exercise: Working with Text and Images

## Objective
- Use headings (h1-h6), paragraphs, and lists to structure text content
- Add images to a web page using the `<img>` tag
- Write meaningful `alt` attributes for accessibility

## Time Required
Estimated time: 50 minutes

## Instructions

### Task 1: Practice Headings (h1 through h6)
HTML has six levels of headings. `<h1>` is the largest and most important. `<h6>` is the smallest.

Open Dreamweaver and create a new file called `text-practice.html` inside the `club-website` folder (from Session 2). Add the following code:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Text Practice</title>
</head>
<body>
    <h1>Main Title of the Page</h1>
    <h2>Section Heading</h2>
    <h3>Sub-Section Heading</h3>
    <h4>Minor Heading</h4>
    <h5>Small Heading</h5>
    <h6>Smallest Heading</h6>
</body>
</html>
```

- Save and preview in browser (F12). You will see each heading gets progressively smaller.
- **Rule**: Each page should have only **one** `<h1>`. Think of it like a book: one title, many chapters (`<h2>`), many sections (`<h3>`), etc.

### Task 2: Paragraphs and Text Formatting
Add the following below the headings in the same file:

```html
<body>
    <!-- ... headings from Task 1 ... -->

    <h2>About Our Club</h2>
    <p>The Student Technology Club was founded in 2020. We organize workshops, 
    coding competitions, and social events for students who love technology.</p>
    <p>Our members come from many different majors, including Computer Science, 
    Information Systems, and Digital Media.</p>

    <h3>Text Formatting Tags</h3>
    <p><strong>This text is bold</strong> — use strong for important words.</p>
    <p><em>This text is italic</em> — use em for emphasis.</p>
    <p>You can also use <strong><em>bold and italic together</em></strong>.</p>

    <p>A line break looks like this:<br>
    Second line starts here.</p>

    <hr>
    <p>The horizontal line above separates content sections.</p>
</body>
```

- Save and preview. Notice:
  - `<strong>` makes text **bold**
  - `<em>` makes text *italic*
  - `<br>` creates a line break (no closing tag needed)
  - `<hr>` creates a horizontal line (no closing tag needed)

### Task 3: Lists (Unordered and Ordered)
Lists are very important in HTML. There are two main types:

- **Unordered list** (`<ul>`) — uses bullet points
- **Ordered list** (`<ol>`) — uses numbers (1, 2, 3...)

Add this to your file:

```html
    <h2>Our Club Activities</h2>

    <h3>Workshops (unordered list)</h3>
    <ul>
        <li>HTML &amp; CSS Basics</li>
        <li>JavaScript Introduction</li>
        <li>Web Design with Dreamweaver</li>
        <li>Database Fundamentals</li>
    </ul>

    <h3>Upcoming Events (ordered list)</h3>
    <ol>
        <li>Web Design Competition — March 15</li>
        <li>Guest Speaker: Industry Developer — March 22</li>
        <li>End-of-Semester Party — April 10</li>
    </ol>

    <h3>Nested List (list inside a list)</h3>
    <ul>
        <li>Frontend Skills
            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
            </ul>
        </li>
        <li>Backend Skills
            <ul>
                <li>PHP</li>
                <li>MySQL</li>
            </ul>
        </li>
    </ul>
```

- **Tip**: `&amp;` is how you write the `&` symbol in HTML. Special characters have codes like this.
- Save and preview. Try to understand how nested lists work — a `<ul>` or `<ol>` can be placed **inside** an `<li>`.

### Task 4: Adding Images
The `<img>` tag displays images. It does NOT have a closing tag.

```html
<img src="path-to-image" alt="description of image">
```

- `src` = the file path (relative path, just like with links)
- `alt` = text that describes the image (shown when the image cannot load; also used by screen readers)

Find any image on your computer (or download one from the internet). Copy it into the `club-website/images/` folder. Let's say you saved it as `team-photo.jpg`.

Add this to your HTML file:

```html
    <h2>Our Team</h2>
    <img src="images/team-photo.jpg" alt="Members of the Student Technology Club at a workshop">
    <p>Above: Our team at the 2024 welcome workshop.</p>
```

**Important attributes for images:**

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `src` | Path to the image file | `images/photo.jpg` |
| `alt` | Text description (required!) | `Club members at workshop` |
| `width` | Width in pixels | `400` |
| `height` | Height in pixels | `300` |
| `title` | Tooltip text on hover | `Our team photo` |

```html
<img src="images/team-photo.jpg" 
     alt="Members of the Student Technology Club" 
     width="400" 
     title="Click to see full image">
```

- Save and preview. The image should appear on the page.
- If the image does not show, check: is the file name exactly the same (case-sensitive)? Is the file inside the `images/` folder?

## Starter Files
- Use the `club-website` folder from Session 2.
- You will need at least one image file placed inside the `images/` subfolder.

## Expected Result

```
┌────────────────────────────────────────────────┐
│                                                │
│  Main Title of the Page          (very large)  │
│  Section Heading                 (large)       │
│  Sub-Section Heading             (medium)      │
│  Minor Heading                   (small)       │
│  ...                                           │
│                                                │
│  About Our Club                  (large)       │
│  The Student Technology Club was founded...    │
│  Our members come from many different...       │
│                                                │
│  Text Formatting Tags            (medium)      │
│  This text is bold                             │
│  This text is italic                           │
│  ─────────────────────────────                 │
│                                                │
│  Our Club Activities             (large)       │
│                                                │
│  Workshops (unordered list)                    │
│  • HTML & CSS Basics                           │
│  • JavaScript Introduction                     │
│  • Web Design with Dreamweaver                 │
│  • Database Fundamentals                       │
│                                                │
│  Upcoming Events (ordered list)                │
│  1. Web Design Competition — March 15          │
│  2. Guest Speaker — March 22                   │
│  3. End-of-Semester Party — April 10           │
│                                                │
│  Our Team                        (large)       │
│  ┌──────────────────────┐                      │
│  │   [TEAM PHOTO]       │                      │
│  └──────────────────────┘                      │
│  Above: Our team at the 2024 welcome workshop. │
│                                                │
└────────────────────────────────────────────────┘
```

## Self-Check (answers included)

Answer from **your own `text-practice.html`** first, then open the arrow.

<details>
<summary>1. You wrote `<h1>` for every section title because they all look important. What is wrong with that?</summary>

The page loses its **outline**. Heading levels are structure, not size:

- One `<h1>` = the page title.
- `<h2>` = a major section.
- `<h3>` = a sub-part of that section.

A screen-reader user navigates by jumping heading to heading, and search engines
read the same outline. If everything is `<h1>`, the outline says "this page has
nine titles", which is meaningless.

If `<h2>` looks too small, fix it in CSS (Session 4). Never fix it by changing
the level.

</details>

<details>
<summary>2. What is the difference between `<strong>` and just making text look bold? And between `<br>` and `<p>`?</summary>

**`<strong>` vs bold:** `<strong>` means *this content is important*. The browser
happens to render it bold, and a screen reader may change tone of voice. Bold as
pure decoration is a CSS job (`font-weight: bold`). Same pairing for `<em>`
(emphasis) vs italic.

**`<br>` vs `<p>`:** `<br>` is a line break *inside one paragraph* — use it for
an address or a line of poetry, where the lines belong together. `<p>` starts a
new paragraph — a new unit of meaning.

Do not use several `<br>` tags in a row to create space. That is a layout job for
CSS `margin`.

</details>

<details>
<summary>3. Your image tag is `<img src="images/Logo.PNG" alt="">` and the file is `logo.png`. Two separate problems — name both.</summary>

**Problem 1 — the path is wrong.** `Logo.PNG` and `logo.png` differ in case. It
may work on your Windows laptop and break on a real web server, which is
case-sensitive. The result is the classic broken-image icon.

**Problem 2 — `alt=""` is empty.** An empty `alt` tells assistive technology
"this image carries no information, skip it". That is correct *only* for pure
decoration. A logo carries information:

```html
<img src="images/logo.png" alt="Student Technology Club logo">
```

Write `alt` text that says what the image *means*, not what it looks like. Do not
start with "Image of" — the screen reader already announces that it is an image.

</details>

<details>
<summary>4. Challenge — no code given: build a "Committee Roles" nested list, two roles, each with two duties. Write it yourself first.</summary>

```html
<h2>Committee Roles</h2>
<ul>
    <li>President
        <ul>
            <li>Runs the weekly meeting</li>
            <li>Approves the event budget</li>
        </ul>
    </li>
    <li>Media Officer
        <ul>
            <li>Posts event photos</li>
            <li>Maintains the club website</li>
        </ul>
    </li>
</ul>
```

The rule that catches everyone: the inner `<ul>` goes **inside the `<li>`**, before
its `</li>`. If you close the `<li>` first and then open a `<ul>`, the nesting is
invalid and the indentation on screen will look wrong.

</details>

## Checklist
- [ ] Created `text-practice.html` in the `club-website` folder
- [ ] Used all six heading levels (h1 through h6)
- [ ] Added paragraphs with `<p>` tags
- [ ] Used `<strong>` for bold and `<em>` for italic
- [ ] Created an unordered list with `<ul>` and `<li>`
- [ ] Created an ordered list with `<ol>` and `<li>`
- [ ] Created a nested list (a list inside a list)
- [ ] Added an image using `<img>` with both `src` and `alt`
- [ ] Previewed in browser and verified everything looks correct

## Tips
- `alt` text is REQUIRED for every image. It helps blind users (who use screen readers) and appears when the image fails to load.
- Use `<ul>` for things that have no specific order (a list of items). Use `<ol>` for steps or ranked items.
- If your image does not show: check the file path carefully. Remember that file names are case-sensitive — `Logo.png` is different from `logo.png`.
