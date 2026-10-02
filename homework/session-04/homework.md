# Homework 4: Styling with External CSS

## Due Date
Sunday, 23:59 (Week 5)

## Objective
- Create an external CSS stylesheet
- Learn CSS selectors, properties, and values
- Apply colors, fonts, and spacing to your pages

## Requirements

### Task 1: Create Your External CSS File
Create a CSS file and link it to your About page.

**Create the file:** `project/css/style.css`

**Link it in your HTML:** Add this line in the `<head>` of `project/about.html`:
```html
<link rel="stylesheet" href="css/style.css">
```

> Every page in this project sits at the project root, so the CSS link is the same on all
> of them: `css/style.css`, with no `../`. Add the identical line to `index.html` and
> `contact.html` too — a page without the link stays unstyled, and that is the single most
> common reason a homework "looks like nothing happened".

### Task 2: Style the About Page
Write CSS rules to make your About page look visually appealing.

**Your CSS must include:**

1. **Body styling:**
   - Set a background color (choose a light, readable color)
   - Set a text color that contrasts well with the background
   - Set a default font family (e.g., Arial, Verdana, or sans-serif)
   - Set font size for the body

2. **Heading styles:**
   - Style `h1` with a specific color and larger font size
   - Style `h2` with a different color
   - Style `h3` with yet another color or style

3. **Paragraph styling:**
   - Set line height (e.g., 1.6 or 1.8)
   - Add margin or padding for spacing

4. **Image styling:**
   - Set a maximum width so images don't overflow
   - Add a border or border-radius for visual appeal
   - Add some padding or margin around images

5. **List styling:**
   - Style at least one list type (ul or ol)
   - Maybe change the list-style or add padding

**File paths:**
- `project/css/style.css` (new CSS file)
- `project/about.html` (updated with CSS link)

**Requirements checklist:**
- [ ] External CSS file exists at `project/css/style.css`
- [ ] CSS is linked to `about.html`
- [ ] Body has background color and font settings
- [ ] All 3 heading levels have distinct styles
- [ ] Paragraphs have readable line height
- [ ] Images have max-width and some styling
- [ ] At least one list is styled

<!-- HW-BRIEF:START -->
## Detailed Brief — Read This First

### What you are actually building

From this week your site has a look, and the look lives in its own file. You move from writing pages to writing a stylesheet the whole site shares.

### Why this homework exists

- An external CSS file linked from every page is the core idea of web design: change one rule, every page updates. Inline styles and `<font>` tags are the pre-2000 way and cost you marks.
- Selectors are how CSS finds things. Understanding element vs class selectors now is what makes the layout, typography and responsive weeks possible.
- The cascade and specificity decide *which* rule wins when two disagree. Guessing here produces the classic “my CSS is not working” bug.

### What “done” looks like

Against the live visual target your page should show: a coloured body background, a readable font, three visibly different heading levels, comfortable line spacing, and styled images and lists. Nothing fancy — legible and consistent is the target.

### How to work through it

1. **Create the file (2 min).** `project/css/style.css`, empty, saved inside the project.
2. **Link it correctly (3 min).** In every HTML page, inside `<head>` and BEFORE `</head>`: `<link rel="stylesheet" href="css/style.css">`. Path is relative to the HTML file, not to the project root.
3. **Style the base (10 min).** `body` gets `background-color`, `color`, `font-family`, `line-height`. Everything inherits from here.
4. **Style the three heading levels (10 min).** Distinct size and colour for `h1`, `h2`, `h3`.
5. **Style content elements (10 min).** Paragraph spacing, `img { max-width: 100%; }`, and at least one list styled.
6. **Verify the link works (5 min).** Delete one property, save, reload: if the page does not change, the `<link>` path is wrong — fix that before writing more CSS.

### Where students lose marks

- `href="/css/style.css"` — works on some setups, breaks on others; use `css/style.css`.
- CSS saved but not reloaded: check with F12 → Network, or Ctrl+F5.
- Styling headings by wrapping them in `<b>` or changing their text instead of using CSS.

### Files this homework must produce

- `project/css/style.css`
- `project/about.html`
- `project/index.html`
- `project/contact.html`

### How to hand it in

This homework has two halves, handed in together and marked separately: **Part 1 code (10 points)** and **Part 2 video (4 points)**. Online submission is not enabled yet, so your own Git repository is the submission.

**Part 1 — the code**

1. Make sure every file listed above exists at exactly that path — the grader looks up files by path, and a page parked somewhere else simply does not exist for it.
2. Stage the work: `git add homework/session-04/ project/` (add only what this session touched).
3. Commit with a message that says what changed: `git commit -m "HW4: <short summary>"`.
4. Push: `git push`. A commit that stayed on your laptop is not a submission.

**Part 2 — the video**

1. Record 60–120 seconds in OBS Studio (<https://obsproject.com>): screen shared the whole time, your voice required, name and student ID stated or visible at the start.
2. Present ONE part of this homework, not all of it. For this session: show `css/style.css`, explain how `project/about.html` links to it with `<link>`, and walk through one rule you wrote: selector → property → visible effect.
3. Upload the MP4 (720p or higher) to **your own Google Drive** and set sharing to **“Anyone with the link → Viewer”**.
4. Open `homework/submissions.md` in your repository and add one line: `- Session 04 — (paste your Google Drive link here)`.
5. Commit and push that file together with the rest of the homework. A missing, private or dead link means the video cannot be graded.

**Before you push**

1. Tick the requirements checklist under Requirements, item by item, against the actual file rather than from memory.
2. Open the self-check tool (`site/cham-bai.html`), pick session 4, point it at your repository folder or paste your code, and fix what it flags. It reports AUTO / MANUAL / BLOCKED — AUTO is what a machine confirmed, MANUAL is still your lecturer's call.
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
For this session, the easiest good choice is to **show `css/style.css`, explain how `project/about.html` links to it with `<link>`, and walk through one rule you wrote (selector → property → effect)**.

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
   `- Session 04 — <your Google Drive link>`
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
- Add changes: `git add project/css/style.css project/about.html`
- Commit: `git commit -m "HW4: Add external CSS and style About page"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| CSS file | 2 | File exists and is linked correctly |
| Colors | 2 | Background, text, and heading colors are set |
| Typography | 2 | Font family, sizes, line height are defined |
| Spacing | 2 | Margins, padding, and line height improve readability |
| Image styling | 1 | Images are sized and styled properly |
| Overall look | 1 | Page looks clean and professional |
| **Total** | **10** | |

## Tips
- The CSS link is `href="css/style.css"` on every page, because all pages sit at the project root
- If the page still looks unstyled, press F12 → Network, reload, and check whether `style.css` returns **200** (found) or **404** (wrong path)
- Pick colors that look good together (try a color palette site like coolors.co)
- Test your page in the browser after each CSS change to see the effect

## Example Output
Your About page should transform from plain black-and-white text to a colorful, well-spaced page with styled headings, readable paragraphs, and nicely framed images.
