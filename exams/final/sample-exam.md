# Final Exam — INS2053: Web Authoring and Web Management

## Week 15 | 90 minutes | No internet | Open file system only

---

### General Instructions

1. **No internet access.** You may use your notes, textbooks, and local files only.
2. Create all files inside the folder `exam-final/` on your desktop.
3. Follow the exact file names and folder structure shown below.
4. Your HTML must be valid and use proper indentation.
5. CSS must be in external files — no inline styles unless specified.
6. Test that all links, forms, and media elements work before submitting.
7. Submit the entire `exam-final/` folder at the end of the exam.
8. **Note:** This exam uses simplified page names. Your capstone project uses the names from the project specification.
9. You may reuse HTML/CSS patterns from earlier problems. Common elements (header, nav, footer) should be consistent across all pages.

### Starter Folder Structure

```
exam-final/
├── index.html          (you create this)
├── schedule.html       (you create this)
├── media.html          (you create this)
├── join.html           (you create this)
├── css/
│   └── style.css       (you create this)
├── media/              (you create this folder; actual media files are not required for the exam)
└── images/
    └── logo.png        (provided)
```

---

## Problem 1 — HTML Table (2 points)

**Create the file `schedule.html`**

Build a weekly activity schedule for the CodeBreakers Club using an HTML table.

### Requirements

| # | Element | Details |
|---|---------|---------|
| 1 | DOCTYPE + structure | Proper HTML5 document linking to `css/style.css` |
| 2 | Navigation | Same nav bar as previous pages (Home, Schedule, Media, Join) with "Schedule" active |
| 3 | `<table>` | A table with `border="1"` or CSS border |
| 4 | `<thead>` | Table header row with column titles: **Day**, **Time**, **Activity**, **Location** |
| 5 | `<tbody>` | At least **4 data rows** inside `<tbody>` |
| 6 | Columns | 4 columns: Day, Time, Activity, Location |
| 7 | `colspan` | At least one cell must use `colspan` to span 2 columns. Example: A "Break" row spanning Time + Activity columns |
| 8 | `<caption>` | A table caption: "Weekly Club Schedule" |

### Example Table Content

| Day | Time | Activity | Location |
|-----|------|----------|----------|
| Monday | 18:00 – 20:00 | Web Dev Workshop | Room 301 |
| Wednesday | 18:00 – 20:00 | Algorithm Practice | Lab 202 |
| Friday | 19:00 – 21:00 | Open Coding Night | Student Hub |
| Saturday | — | **Rest Day** (colspan=2) | — |

### What to include

- Complete HTML5 document structure
- Navigation with "Schedule" as active
- `<h1>`: "Club Schedule"
- Table with all required elements
- Footer with copyright

---

## Problem 2 — Multimedia (2 points)

**Create the file `media.html`**

Build a media showcase page with HTML5 audio and video elements.

### Requirements

| # | Element | Details |
|---|---------|---------|
| 1 | DOCTYPE + structure | Proper HTML5 document linking to `css/style.css` |
| 2 | Navigation | Same nav bar with "Media" as active |
| 3 | `<h1>` | "Club Media Gallery" |
| 4 | `<video>` element | Attributes: `controls`, `poster="images/logo.png"`, `width="480"`. Include 2 `<source>` elements (one `mp4`, one `webm`). Add fallback text: "Your browser does not support the video tag." |
| 5 | `<audio>` element | Attributes: `controls`. Include 2 `<source>` elements (one `mp3`, one `ogg`). Add fallback text: "Your browser does not support the audio tag." |
| 6 | Descriptive text | A paragraph before the video and a paragraph before the audio explaining what they contain |
| 7 | Footer | Copyright notice |

### Example Structure

```html
<h1>Club Media Gallery</h1>

<h2>Workshop Recording</h2>
<p>Watch the recording from our latest web development workshop.</p>
<video controls poster="images/logo.png" width="480">
    <source src="media/workshop.mp4" type="video/mp4">
    <source src="media/workshop.webm" type="video/webm">
    Your browser does not support the video tag.
</video>

<h2>Club Podcast</h2>
<p>Listen to our monthly club podcast about coding tips.</p>
<audio controls>
    <source src="media/podcast.mp3" type="audio/mpeg">
    <source src="media/podcast.ogg" type="audio/ogg">
    Your browser does not support the audio tag.
</audio>
```

> **Note:** The actual media files do not need to exist. The HTML structure is what matters.

---

## Problem 3 — Contact/Join Form (3 points)

**Create the file `join.html`**

Build a "Join the Club" form with multiple input types.

### Requirements

| # | Element | Details | Points |
|---|---------|---------|--------|
| 1 | `<form>` | Form element with `action="#"` and `method="POST"` | 0.25 |
| 2 | Text input | `<input type="text">` for full name with `id="name"` and `name="name"`. Must have a `<label for="name">`. Attribute `required`. | 0.25 |
| 3 | Email input | `<input type="email">` for email with `id="email"` and `name="email"`. Must have a `<label for="email">`. Attribute `required`. | 0.25 |
| 4 | Radio buttons | Two radio buttons for membership type: "Student" and "Alumni". Same `name="membership"`. Each with a label. | 0.5 |
| 5 | Checkbox | One checkbox for "I agree to the club rules" with `id="terms"` and a `<label for="terms">`. Attribute `required`. | 0.25 |
| 6 | Select dropdown | A `<select>` with `id="department"` and `name="department"`. Include at least 4 `<option>` values (e.g., Computer Science, Mathematics, Physics, Business). Include a `<label for="department">`. | 0.5 |
| 7 | Textarea | A `<textarea>` with `id="message"`, `name="message"`, `rows="5"`, `cols="40"`. Include a `<label for="message">`. Placeholder text: "Tell us why you want to join..." | 0.25 |
| 8 | Submit button | `<button type="submit">Join Now</button>` or `<input type="submit" value="Join Now">` | 0.25 |
| 9 | Fieldset/Legend | Wrap related form sections in `<fieldset>` with `<legend>` (at least 1 fieldset) | 0.25 |
| 10 | Proper labels | Every input must have a matching `<label>` with correct `for` attribute | 0.25 |

### Example Form Layout

```
+------------------------------------------+
|  JOIN THE CLUB                           |
+------------------------------------------+
|  Full Name:     [________________]       |
|  Email:         [________________]       |
|                                          |
|  Membership:    ( ) Student  ( ) Alumni  |
|                                          |
|  Department:    [Computer Science ▼]     |
|                                          |
|  Message:       [________________]       |
|                 [________________]       |
|                 [________________]       |
|                                          |
|  [✓] I agree to the club rules          |
|                                          |
|           [  Join Now  ]                 |
+------------------------------------------+
```

---

## Problem 4 — Complete Small Site (3 points)

**Create `index.html` and `css/style.css`**

Build the home page and the complete stylesheet for a 4-page site.

### Requirements for `index.html`

| # | Element | Details | Points |
|---|---------|---------|--------|
| 1 | HTML5 structure | Proper DOCTYPE, html, head, body with charset and viewport meta tags | 0.25 |
| 2 | Viewport meta | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | 0.25 |
| 3 | External CSS | `<link>` to `css/style.css` | 0.15 |
| 4 | Header | `<header>` with `<h1>` club name | 0.15 |
| 5 | Navigation | `<nav>` with 4 links: Home, Schedule, Media, Join | 0.25 |
| 6 | Main content | Welcome section with heading, paragraph, and call-to-action text | 0.25 |
| 7 | Footer | `<footer>` with copyright | 0.15 |
| 8 | Semantic HTML | Uses `<header>`, `<nav>`, `<main>`, `<footer>` | 0.15 |
| 9 | Valid HTML | All tags properly closed and nested | 0.15 |

### Requirements for `css/style.css`

The stylesheet must include:

| # | Rule | Details | Points |
|---|------|---------|--------|
| 1 | Body styles | Font family, margin, background color | 0.15 |
| 2 | Header styles | Background color, text color, padding | 0.15 |
| 3 | Nav styles | Background, link styles, horizontal layout | 0.15 |
| 4 | Container | Max-width, margin auto, padding | 0.15 |
| 5 | Table styles | Border-collapse, cell padding, stripe rows or hover | 0.15 |
| 6 | Form styles | Input width, padding, label display | 0.15 |
| 7 | Footer styles | Text align, padding, color | 0.1 |
| 8 | **Media query** | `@media (max-width: 768px)` that stacks nav links vertically | 0.5 |

### Media Query Example

```css
@media (max-width: 768px) {
    nav {
        /* Stack navigation vertically on mobile */
    }
    nav a {
        display: block;
        margin-bottom: 5px;
    }
}
```

### Complete Site Checklist

All 4 pages must exist with:
- [ ] Same navigation bar on every page
- [ ] Same header and footer on every page
- [ ] Viewport meta tag on every page
- [ ] Links to external CSS
- [ ] Working relative paths between all pages

---

## Grading Summary

| Problem | Topic | Points |
|---------|-------|--------|
| 1 | HTML Table | 2 |
| 2 | Multimedia | 2 |
| 3 | Form | 3 |
| 4 | Complete Site | 3 |
| **Total** | | **10** |

---

## Reminders

- **No internet.** Close all browsers.
- Save frequently.
- File names are **case-sensitive** — use lowercase.
- Media files (video/audio) do NOT need to exist — only the HTML structure is graded.
- When time is called, submit your `exam-final/` folder.

**Good luck!**
