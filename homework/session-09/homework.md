# Homework 9: Creating HTML Tables

## Due Date
Sunday, 23:59 (Week 10)

## Objective
- Learn how to build HTML tables
- Practice using table elements: table, tr, th, td
- Style a table with CSS to make it readable

## Requirements

### Task 1: Create a Schedule Table
Create a new page for your project that displays a weekly schedule or activity timetable.

**Create the file:** `project/activities.html`

> This is the page `project/spec.md` and milestone M5 grade — the file name must be exactly
> `activities.html`, at the project root beside `index.html`.

**Your table must include:**
- A `<caption>` element describing the table (e.g., "Weekly Club Activities")
- A `<thead>` section with column headers
- A `<tbody>` section with data rows
- At least 5 columns (e.g., Day, Time, Activity, Location, Leader)
- At least 5 rows of data
- Use `<th>` for header cells and `<td>` for data cells
- Use `colspan` or `rowspan` at least once

**Example structure:**
```html
<table>
  <caption>Weekly Club Activities</caption>
  <thead>
    <tr>
      <th>Day</th>
      <th>Time</th>
      <th>Activity</th>
      <th>Location</th>
      <th>Leader</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monday</td>
      <td>3:00 PM</td>
      <td>Coding Workshop</td>
      <td>Room 301</td>
      <td>Nguyen Van A</td>
    </tr>
    <!-- more rows -->
  </tbody>
</table>
```

### Task 2: Style the Table
Add CSS to make the table look professional.

**Your CSS must include:**
- Set `width: 100%` and `border-collapse: collapse` on the table
- Add borders to all cells
- Style header cells with a background color and white text
- Add alternating row colors (zebra striping) using `tr:nth-child(even)`
- Add padding inside cells for readability
- Add a hover effect on rows

### Task 3: Update Navigation
- Add an "Activities" link to the navigation menu on ALL pages
- All pages sit at the project root, so the link is simply `href="activities.html"` everywhere
- Click it from every page to confirm

**File paths:**
- `project/activities.html` (new page with table)
- `project/css/style.css` (add table styles)
- `project/index.html` (add Activities link to nav)
- `project/about.html` (add Activities link to nav)
- `project/contact.html` (add Activities link to nav)

<!-- HW-BRIEF:START -->
## Detailed Brief — Read This First

### What you are actually building

Tables move from practice file into the real site: an Activities page whose schedule is an honest HTML table, styled, and reachable from every other page.

### Why this homework exists

- A schedule is tabular data. Using a table for it is the correct semantics; using divs or a grid of paragraphs is what the rubric calls misuse.
- `thead`/`tbody`/`tfoot`, `<th scope="col">` and captioned tables are what let a screen reader announce “row 3, column Wednesday” instead of a wall of text.
- `colspan` and `rowspan` are the merge primitives you will need again in the final exam.
- Adding a fifth page forces the nav-consistency habit: four existing pages must all learn about the new one.

### What “done” looks like

The live visual target: a titled Activities page, a table with a shaded header row, at least one merged cell, zebra-striped body rows, padding so cells breathe, and the new page present in the nav of all four older pages.

### How to work through it

1. **Create the page (5 min).** `project/activities.html`, copied from an existing page so the boilerplate, nav and footer come along.
2. **Draft the data (10 min).** Write the schedule as a plain list first: which events, which days, which rooms. Decide the grid before the markup.
3. **Mark up the table (20 min).** `<table>` → `<caption>` → `<thead>` with `<th scope="col">` → `<tbody>` with real rows → at least one `colspan` or `rowspan`.
4. **Style it (20 min).** In `css/style.css`: `border-collapse: collapse`, cell padding, header background, `tbody tr:nth-child(even)` stripes, hover highlight.
5. **Wire the navigation (10 min).** Add Activities to the nav on `index`, `about`, `contact` and `media` (if it exists yet); mark it active on the new page.
6. **Accessibility pass (5 min).** Tab through, and read the table aloud imagining you cannot see it. Does every row identify its column?

### Where students lose marks

- Nested tables or spacer tricks for layout — layout tables are exactly what the course teaches you to avoid.
- `<td>` in the header row instead of `<th>`.
- Updating the nav on only one page and losing consistency points on the other three.

### Files this homework must produce

- `project/activities.html`
- `project/css/style.css`
- `project/index.html`
- `project/about.html`
- `project/contact.html`

### How to hand it in

This homework has two halves, handed in together and marked separately: **Part 1 code (10 points)** and **Part 2 video (4 points)**. Online submission is not enabled yet, so your own Git repository is the submission.

**Part 1 — the code**

1. Make sure every file listed above exists at exactly that path — the grader looks up files by path, and a page parked somewhere else simply does not exist for it.
2. Stage the work: `git add homework/session-09/ project/` (add only what this session touched).
3. Commit with a message that says what changed: `git commit -m "HW9: <short summary>"`.
4. Push: `git push`. A commit that stayed on your laptop is not a submission.

**Part 2 — the video**

1. Record 60–120 seconds in OBS Studio (<https://obsproject.com>): screen shared the whole time, your voice required, name and student ID stated or visible at the start.
2. Present ONE part of this homework, not all of it. For this session: show your schedule table and explain what `<thead>`, `<tbody>` and `colspan`/`rowspan` do in it, plus one styling choice you made.
3. Upload the MP4 (720p or higher) to **your own Google Drive** and set sharing to **“Anyone with the link → Viewer”**.
4. Open `homework/submissions.md` in your repository and add one line: `- Session 09 — (paste your Google Drive link here)`.
5. Commit and push that file together with the rest of the homework. A missing, private or dead link means the video cannot be graded.

**Before you push**

1. Tick the requirements checklist under Requirements, item by item, against the actual file rather than from memory.
2. Open the self-check tool (`site/cham-bai.html`), pick session 9, point it at your repository folder or paste your code, and fix what it flags. It reports AUTO / MANUAL / BLOCKED — AUTO is what a machine confirmed, MANUAL is still your lecturer's call.
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
For this session, the easiest good choice is to **show your schedule table and explain what `<thead>`, `<tbody>` and `colspan`/`rowspan` do in it, plus one styling choice you made**.

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
   `- Session 09 — <your Google Drive link>`
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
- Commit: `git commit -m "HW9: Add schedule page with styled table"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Table structure | 3 | Uses thead, tbody, caption, th, td correctly |
| Content | 2 | Has 5+ columns, 5+ rows, colspan/rowspan used |
| Table styling | 3 | Borders, header colors, zebra striping, hover |
| Navigation | 1 | Activities link added to all pages |
| Link accuracy | 1 | All navigation links work correctly |
| **Total** | **10** | |

## Tips
- Use `border-collapse: collapse` to avoid double borders
- Zebra striping makes tables much easier to read: `tr:nth-child(even) { background: #f2f2f2; }`
- Make sure the Activities nav link is `href="activities.html"` on every page — no `../`

## Example Output
A clean, professional-looking table on its own page. The header row should stand out with color, rows should alternate colors, and the navigation should include an Activities link on every page.
