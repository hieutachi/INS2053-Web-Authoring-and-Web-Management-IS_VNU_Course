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
