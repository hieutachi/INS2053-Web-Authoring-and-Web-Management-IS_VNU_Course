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
