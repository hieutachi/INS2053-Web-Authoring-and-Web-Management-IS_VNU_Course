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

<!-- HW-BRIEF:START -->
## Detailed Brief — Read This First

### What you are actually building

Validator week. You stop guessing whether your code is correct and start proving it: W3C checks for the HTML, the Jigsaw/CSS validator for the stylesheet, then a formatting pass so the code reads cleanly.

### Why this homework exists

- Validators catch the errors browsers forgive: unclosed tags, wrong nesting, missing alt, unknown properties. Forgiveness hides bugs that surface on another device or in an exam.
- Reading a validation report is a professional skill — error line, cause, fix — and it is exactly what the video part of this homework asks you to demonstrate.
- Consistent indentation and comments are how someone else (or you in three weeks) reads your file. The rubric pays for it.

### What “done” looks like

Success looks like this: the W3C checker returns “No errors” (warnings explained in your notes), the CSS validator returns zero errors, and your files are indented two spaces with a comment above each region.

### How to work through it

1. **Validate the HTML (20 min).** Submit each page to the W3C Nu checker (by URI or by pasting the file). Record every error: line, message, cause.
2. **Fix and re-run (20 min).** Fix the earliest error first — later errors are often knock-on effects. Re-validate until clean.
3. **Validate the CSS (15 min).** Run `css/style.css` through the W3C CSS validator, fix unknown properties and typos.
4. **Format (15 min).** Two-space indent, one declaration per line, alphabetical or grouped properties, a comment marking each region.
5. **Regression check (10 min).** Reload every page: fixing markup can change rendering. Confirm nothing broke.
6. **Write the report (10 min).** Save the validator results in a file inside `homework/session-12/` so your notes travel with the homework.

### Where students lose marks

- Deleting the offending element instead of fixing it, and losing a graded feature.
- Believing a warning that is a false positive — explain it in your notes instead of mangling valid code.
- Reformatting with an auto-formatter that also rewrites your paths or strips your comments.

### Files this homework must produce

- All HTML files in `project/`
- `project/css/style.css`

### How to hand it in

This homework has two halves, handed in together and marked separately: **Part 1 code (10 points)** and **Part 2 video (4 points)**. Online submission is not enabled yet, so your own Git repository is the submission.

**Part 1 — the code**

1. Make sure every file listed above exists at exactly that path — the grader looks up files by path, and a page parked somewhere else simply does not exist for it.
2. Stage the work: `git add homework/session-12/ project/` (add only what this session touched).
3. Commit with a message that says what changed: `git commit -m "HW12: <short summary>"`.
4. Push: `git push`. A commit that stayed on your laptop is not a submission.

**Part 2 — the video**

1. Record 60–120 seconds in OBS Studio (<https://obsproject.com>): screen shared the whole time, your voice required, name and student ID stated or visible at the start.
2. Present ONE part of this homework, not all of it. For this session: show one HTML validation error and one CSS warning from the validators and explain what caused them and how you fixed them.
3. Upload the MP4 (720p or higher) to **your own Google Drive** and set sharing to **“Anyone with the link → Viewer”**.
4. Open `homework/submissions.md` in your repository and add one line: `- Session 12 — (paste your Google Drive link here)`.
5. Commit and push that file together with the rest of the homework. A missing, private or dead link means the video cannot be graded.

**Before you push**

1. Tick the requirements checklist under Requirements, item by item, against the actual file rather than from memory.
2. Open the self-check tool (`site/cham-bai.html`), pick session 12, point it at your repository folder or paste your code, and fix what it flags. It reports AUTO / MANUAL / BLOCKED — AUTO is what a machine confirmed, MANUAL is still your lecturer's call.
3. Save the result card (screenshot showing the hash, Print → PDF, Download JSON) so you can prove what you submitted.

<!-- HW-BRIEF:END -->

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
