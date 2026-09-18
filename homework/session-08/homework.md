# Homework 8: Midterm Review and Table Preparation

## Due Date
Sunday, 23:59 (Week 9)

## Objective
- Fix any weak areas identified during the midterm exam
- Learn the basics of HTML tables before Session 9
- Keep your Student Club Website project up to date

## Requirements

### Task 1: Midterm Reflection
Open your midterm exam (or the practice exam in `exercises/session-08/`). Identify **three mistakes** you made or three topics where you were unsure.

For each one:
- Write what the correct answer is
- Write a one-sentence explanation of why
- Find the matching section in the `ebook/` chapters (1–7) and re-read it

Create a file called `midterm-review.md` inside `homework/session-08/` with your three items:

```markdown
# Midterm Review

## Mistake 1: [topic]
- **My answer:** ...
- **Correct answer:** ...
- **Why:** ...
- **Where to review:** ebook/0X-...md, section ...

## Mistake 2: [topic]
...

## Mistake 3: [topic]
...
```

### Task 2: Build a Simple Table — practice file, not the project yet
Create a **practice** file at `homework/session-08/table-practice.html` with a table showing
your club's weekly activities. This is a warm-up: in Homework 9 you will build the real
`project/activities.html` page, with more columns and `colspan`. Keeping this one separate
means you can experiment freely without breaking your project.

**Your table must include:**
- A `<caption>` describing the table
- A `<thead>` with column headers (Day, Time, Activity, Location)
- A `<tbody>` with at least 4 rows of data
- Use `<th>` for header cells and `<td>` for data cells

**Example structure:**
```html
<table>
  <caption>Weekly Club Schedule</caption>
  <thead>
    <tr>
      <th>Day</th>
      <th>Time</th>
      <th>Activity</th>
      <th>Location</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monday</td>
      <td>3:00 PM</td>
      <td>Coding Workshop</td>
      <td>Room 301</td>
    </tr>
    <!-- add more rows -->
  </tbody>
</table>
```

### Task 3: Basic Table Styling
Add CSS for the table. Put it in `homework/session-08/table-practice.css` (linked from your
practice page) — you will move the rules that work into `project/css/style.css` in Homework 9:

```css
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #333;
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
```

### Task 4: Check Your Project Navigation
Your project pages (`index.html`, `about.html`, `contact.html`) all sit at the project root,
so each nav link is a plain file name. Open every page and click every link — fix any that
404 before Homework 9 adds two more pages.

**File paths:**
- `homework/session-08/midterm-review.md` (new file)
- `homework/session-08/table-practice.html` (new practice page with table)
- `homework/session-08/table-practice.css` (table styles)

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
For this session, the easiest good choice is to **pick ONE thing you got wrong in the practice midterm (or in Task 2's table), open that file, and explain what the correct approach is and why**.

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
   `- Session 08 — <your Google Drive link>`
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
- Add changes: `git add homework/session-08/ project/`
- Commit: `git commit -m "HW8: Midterm review and table practice"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Midterm reflection | 3 | Three mistakes identified with correct answers and explanations |
| Table structure | 3 | Uses caption, thead, tbody, th, td correctly |
| Table styling | 2 | Borders, header colors, zebra striping applied |
| Project links verified | 2 | Every nav link on every project page clicks through correctly |
| **Total** | **10** | |

## Tips
- The midterm reflection is about learning from mistakes — there is no penalty for honest answers
- You will learn tables in detail in Session 9; this homework gives you a head start
- Use `border-collapse: collapse` to avoid double borders
- Keep the practice table simple; Homework 9 is where it becomes a real project page

## Example Output
A `midterm-review.md` with three honest reflections, plus a clean practice table page — and a project whose every navigation link you have personally clicked.