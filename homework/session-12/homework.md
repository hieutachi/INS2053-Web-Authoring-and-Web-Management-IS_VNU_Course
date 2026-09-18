# Homework 12: HTML & CSS Validation and Code Cleanup

## Due Date
Sunday, 23:59 (Week 13)

## Objective
- Learn to validate HTML and CSS using online tools
- Find and fix errors in your code
- Practice clean code formatting habits

## Requirements

### Task 1: Validate Your HTML
Visit the [W3C HTML Validator](https://validator.w3.org/) and check each of your HTML files.

**How to validate:**
1. Go to https://validator.w3.org/
2. Choose "Validate by Direct Input"
3. Copy-paste your HTML code into the text box
4. Click "Check"
5. Review the errors and warnings

**You must validate these files:**
- `project/index.html`
- `project/about.html`
- `project/activities.html`
- `project/media.html`
- `project/contact.html`

**Fix ALL errors found.** Common issues:
- Missing `alt` attributes on images
- Unclosed tags (like `<p>` without `</p>`)
- Missing `lang` attribute on `<html>` tag
- Duplicate `id` values
- Incorrect nesting of elements

### Task 2: Validate Your CSS
Visit the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) and check your stylesheet.

**How to validate:**
1. Go to https://jigsaw.w3.org/css-validator/
2. Choose "By direct input"
3. Copy-paste your CSS code
4. Click "Check"
5. Fix all errors

**Common CSS errors:**
- Misspelled property names
- Missing semicolons
- Invalid property values
- Unknown properties

### Task 3: Clean Up Code Formatting
Reformat your HTML and CSS files to follow best practices.

**HTML formatting rules:**
- Use 2-space indentation (not tabs, not 4 spaces)
- Each element on its own line when it has children
- Self-closing tags like `<img>` and `<br>` should be on their own line
- Add comments to separate sections: `<!-- Navigation -->`, `<!-- Main Content -->`

**CSS formatting rules:**
- One property per line
- Opening brace on the same line as the selector
- Closing brace on its own line
- Add blank lines between different selectors
- Group related rules together
- Add comments for sections: `/* Header Styles */`, `/* Navigation */`

**Example of clean HTML:**
```html
<!-- Header Section -->
<header>
  <h1>Club Name</h1>
</header>

<!-- Navigation -->
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
  </ul>
</nav>
```

**Example of clean CSS:**
```css
/* Header Styles */
header {
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  text-align: center;
}

/* Navigation */
nav {
  background-color: #34495e;
}
```

**Files to clean up:**
- All HTML files in `project/`
- `project/css/style.css`

## Part 2 — Video Reflection (OBS) — required, not optional

Code is only half of this homework. The other half is a **short screen-recorded
video** that proves the work is yours and that you can *explain* it — the same
skill the midterm practical, the final practical exam, and every job interview
afterwards will ask of you. Using an AI tool or a tutorial to build the tasks
above is allowed; being able to walk through every line of what you keep is not
optional.

### What to record

With **OBS Studio** (free — <https://obsproject.com>), record **60–120 seconds**,
your **voice required** (face optional), sharing your screen while you present
ONE part of this homework. Pick a single topic — do not try to cover everything.
For this session, the easiest good choice is to **show one HTML validation error and one CSS warning from the W3C validators and explain what caused them and how you fixed them**.

Requirements for the recording:

- [ ] Length **1–2 minutes**. Over 2 minutes loses structure points; under 1 minute usually means there is no substance.
- [ ] The **screen is shared the whole time** — the lecturer must see your real editor and browser, not a slideshow of screenshots.
- [ ] You **speak** through the video (Vietnamese is fine; technical terms stay in English), and your name + student ID are visible or spoken at the start.
- [ ] You **show and explain**, not read: open the actual file, point at the actual lines, show the actual result in the browser.

### How to hand in the video

You submit a **link**, never the video file itself:

1. Upload the recording (`MP4`, 720p or higher) to **your own Google Drive**.
2. Set sharing to **"Anyone with the link → Viewer"**.
3. Open `homework/submissions.md` in your repository and add **one line**:
   `- Session 12 — <your Google Drive link>`
4. Commit and push that file together with the rest of this homework.

The system collects and grades the code part (it runs the self-check on your
repository). For the video it stores **only the link** — your lecturer watches
it and grades it afterwards. A missing, private, or dead link means the video
part cannot be graded.

### How the video part is graded (4 points, on top of the 10-point rubric)

| Criteria | Points | What the lecturer looks for |
|---|---|---|
| Structure of the talk | 1 | A beginning (what you built), a middle (how it works, pointing at real code), and an end (what you learned or would improve). |
| Screen walkthrough | 1 | The real project on screen — editor and browser together, no slideshow of screenshots. |
| Correct explanation | 2 | You explain what the code does and why. Reading a memorised script over code you cannot explain scores 0. |
| **Total** | **4** | |

> Why a video? AI tools can write homework code, so the proof of learning moves
> to the explanation. Sixty seconds of you explaining your own lines is the
> strongest evidence of real understanding — and it is exactly what a technical
> interview looks like.


## Submission Guide
- Add changes: `git add project/`
- Commit: `git commit -m "HW12: Validate HTML/CSS and clean up code"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| HTML validation | 3 | Zero errors on W3C validator |
| CSS validation | 3 | Zero errors on W3C validator |
| HTML formatting | 2 | Proper indentation, comments, structure |
| CSS formatting | 2 | Clean formatting with comments |
| **Total** | **10** | |

## Tips
- Validation errors are normal — even professionals make mistakes
- Fix errors one file at a time and re-validate after each fix
- Clean code is easier to read, debug, and maintain

## Example Output
All your HTML files should pass W3C validation with zero errors. Your CSS file should also pass validation. The code should look neat and organized with proper indentation and helpful comments.
