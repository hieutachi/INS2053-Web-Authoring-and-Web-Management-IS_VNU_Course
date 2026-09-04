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