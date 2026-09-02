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

Create a file called `midterm-review.md` in your project root with your three items:

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

### Task 2: Build a Simple Table
Create a new page `project/pages/schedule.html` with a table showing your club's weekly activities.

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
Add CSS for the table in `project/css/style.css`:

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

### Task 4: Update Navigation
- Add a "Schedule" link to the navigation menu on ALL existing pages
- Make sure the relative paths are correct on each page

**File paths:**
- `midterm-review.md` (new file, project root)
- `project/pages/schedule.html` (new page with table)
- `project/css/style.css` (add table styles)
- `project/index.html` (add Schedule link to nav)
- `project/pages/about.html` (add Schedule link to nav)
- `project/pages/contact.html` (add Schedule link to nav)

## Submission Guide
- Add changes: `git add .`
- Commit: `git commit -m "HW8: Midterm review and schedule table"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Midterm reflection | 3 | Three mistakes identified with correct answers and explanations |
| Table structure | 3 | Uses caption, thead, tbody, th, td correctly |
| Table styling | 2 | Borders, header colors, zebra striping applied |
| Navigation update | 2 | Schedule link added and working on all pages |
| **Total** | **10** | |

## Tips
- The midterm reflection is about learning from mistakes — there is no penalty for honest answers
- You will learn tables in detail in Session 9; this homework gives you a head start
- Use `border-collapse: collapse` to avoid double borders
- Test the Schedule link from every page — check relative paths

## Example Output
A `midterm-review.md` file with three honest reflections, plus a clean schedule table page that matches the style of your existing site.