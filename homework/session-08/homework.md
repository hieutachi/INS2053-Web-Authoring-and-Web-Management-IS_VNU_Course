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

<!-- HW-BRIEF:START -->
## Detailed Brief — Read This First

### What you are actually building

The week after the midterm. Two jobs: turn the exam into information — write down what you got wrong and fix it — and get ahead on tables, which is what Session 9 is built on.

### Why this homework exists

- A reflection you actually write is worth more than another page you half-copy. Naming three concrete mistakes, with the correct answer and the chapter section to re-read, is how the weak areas disappear before the final.
- Tables are the first HTML structure that is genuinely *grid-shaped*: rows, cells, headers, merging. Practising in a throwaway file first means Session 9 is about styling, not survival.
- Task 4 exists because navigation quietly rots: every page you added since Week 2 must still be reachable.

### What “done” looks like

There is no polished page to chase this week. Your `midterm-review.md` should read like the template in Task 1 — mistake, my answer, correct answer, why, where to review. Your `table-practice.html` should show a bordered table with a shaded header row and merged cells where the task asks for them.

### How to work through it

1. **Recall while it is fresh (10 min).** Right after the exam, before discussing answers, list what you hesitated on.
2. **Write the reflection (20 min).** Three items in `homework/session-08/midterm-review.md`, following the exact template: what the topic was, what you answered, what is correct, one sentence why, and the ebook section to re-read.
3. **Re-read those sections (15 min).** Actually open chapters 1–7 at the sections you named.
4. **Build the practice table (25 min).** `table-practice.html` per Task 2: `border`, a header row, at least one `colspan` or `rowspan`, real content — not lorem ipsum.
5. **Style it (15 min).** Task 3: alternating row colours, padding in cells, header contrast — in `table-practice.css`.
6. **Crawl the project (10 min).** Task 4: click from `index.html` to every page and back. Fix broken links and update the nav list.

### Where students lose marks

- Writing “I was careless” instead of a specific technical mistake — nothing to fix, no points.
- Building the table directly in `project/activities.html` before tables are taught; this week's table stays a practice file.
- Leaving `border="1"` as your only styling — attribute borders are legacy, CSS is the requirement.

### Files this homework must produce

- `homework/session-08/midterm-review.md`
- `homework/session-08/table-practice.html`
- `homework/session-08/table-practice.css`
- `project/` (navigation fixes)

### How to hand it in

This homework has two halves, handed in together and marked separately: **Part 1 code (10 points)** and **Part 2 video (4 points)**. Online submission is not enabled yet, so your own Git repository is the submission.

**Part 1 — the code**

1. Make sure every file listed above exists at exactly that path — the grader looks up files by path, and a page parked somewhere else simply does not exist for it.
2. Stage the work: `git add homework/session-08/ project/` (add only what this session touched).
3. Commit with a message that says what changed: `git commit -m "HW8: <short summary>"`.
4. Push: `git push`. A commit that stayed on your laptop is not a submission.

**Part 2 — the video**

1. Record 60–120 seconds in OBS Studio (<https://obsproject.com>): screen shared the whole time, your voice required, name and student ID stated or visible at the start.
2. Present ONE part of this homework, not all of it. For this session: pick ONE thing you got wrong in the midterm (or in Task 2's table), open that file, and explain what the correct approach is and why.
3. Upload the MP4 (720p or higher) to **your own Google Drive** and set sharing to **“Anyone with the link → Viewer”**.
4. Open `homework/submissions.md` in your repository and add one line: `- Session 08 — (paste your Google Drive link here)`.
5. Commit and push that file together with the rest of the homework. A missing, private or dead link means the video cannot be graded.

**Before you push**

1. Tick the requirements checklist under Requirements, item by item, against the actual file rather than from memory.
2. Open the self-check tool (`site/cham-bai.html`), pick session 8, point it at your repository folder or paste your code, and fix what it flags. It reports AUTO / MANUAL / BLOCKED — AUTO is what a machine confirmed, MANUAL is still your lecturer's call.
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
