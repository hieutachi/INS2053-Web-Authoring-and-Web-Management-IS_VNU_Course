---
marp: true
theme: default
paginate: true
---

# Session 9: Working with Tables

**INS2053 — Web Authoring and Web Management**

*Tables are for data — never for layout.*

Read: `ebook/09-working-with-tables.md`  ·  Practise: `exercises/session-09/exercise.md`  ·  Diagrams: `canvases/buoi-09.canvas.tsx`

---

## Learning Objectives

- Create HTML tables using `<table>`, `<tr>`, `<th>`, `<td>`
- Structure tables semantically with `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`
- Merge cells horizontally (`colspan`) and vertically (`rowspan`)
- Style tables professionally with CSS (borders, zebra stripes, hover)
- Explain when to use tables (data) vs. when NOT to (page layout)

---

## When to Use Tables (and When Not To)

Use tables for **tabular data**: schedules, price lists, rosters, statistics.

Do NOT use tables for page layout -- use `<div>` + CSS instead.

| Reason | Explanation |
|--------|-------------|
| Semantics | Tables imply data relationships |
| Accessibility | Screen readers navigate cell by cell |
| Flexibility | Table layouts are rigid, hard to make responsive |
| Maintenance | Nested tables produce unreadable HTML |

Think of a table like an Excel spreadsheet embedded in a web page.

---

## Basic Table Structure

Four core elements:

```html
<table>
  <tr>
    <th>Event</th>
    <th>Date</th>
    <th>Location</th>
  </tr>
  <tr>
    <td>Web Workshop</td>
    <td>March 15</td>
    <td>Room 301</td>
  </tr>
</table>
```

```
+----------------+----------+----------+
|    <th>        |  <th>    |  <th>    |
|    Event       |  Date    | Location |
+----------------+----------+----------+
|    <td>        |  <td>    |  <td>    |
| Web Workshop   | March 15 | Room 301 |
+----------------+----------+----------+
```

`<td>` and `<th>` MUST be inside `<tr>` -- never directly inside `<table>`.

---

## Semantic Sections: caption, thead, tbody, tfoot

```html
<table>
  <caption>Events Schedule</caption>
  <thead>
    <tr><th>Event</th><th>Date</th></tr>
  </thead>
  <tbody>
    <tr><td>Workshop</td><td>Mar 15</td></tr>
  </tbody>
  <tfoot>
    <tr><td colspan="2">Total: 1 event</td></tr>
  </tfoot>
</table>
```

Order inside `<table>`: caption --> thead --> tbody --> tfoot

- `<caption>` provides accessible title for screen readers
- `<thead>`/`<tbody>`/`<tfoot>` enable section-specific styling
- Browsers repeat `<thead>` on each printed page

---

## Merging Cells: colspan & rowspan

**colspan** = merge across columns (horizontal):
```html
<td colspan="3">Spans 3 columns</td>
```

**rowspan** = merge across rows (vertical):
```html
<tr>
  <td rowspan="2">Spans 2 rows</td>
  <td>Cell A</td>
</tr>
<tr>
  <!-- No first <td> here -- rowspan fills it -->
  <td>Cell B</td>
</tr>
```

Critical: when using `rowspan`, the next row has ONE FEWER `<td>`.

---

## Live Code Example

```html
<table class="styled-table">
  <caption>Membership Fees</caption>
  <thead>
    <tr><th>Category</th><th>Duration</th><th>Price</th></tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">Student</td>
      <td>Semester</td>
      <td>50,000 VND</td>
    </tr>
    <tr>
      <td>Full Year</td>
      <td>80,000 VND</td>
    </tr>
    <tr>
      <td>Guest</td>
      <td>Per Event</td>
      <td>Free</td>
    </tr>
  </tbody>
</table>
```

"Student" spans both rows -- second row has only 2 `<td>` elements.

---

## Styling Tables with CSS

The most important property: `border-collapse: collapse;`

```css
.styled-table {
  width: 100%;
  border-collapse: collapse;     /* Single borders, not double */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.styled-table th {
  background: linear-gradient(135deg, #1a5276, #2874a6);
  color: white; padding: 12px 15px;
}
.styled-table td { padding: 10px 15px; border-bottom: 1px solid #ddd; }
.styled-table tbody tr:nth-child(even) { background-color: #f8f9fa; }
.styled-table tbody tr:hover { background-color: #eaf2f8; }
```

Wrap wide tables for responsiveness:
```css
.table-wrapper { overflow-x: auto; }
```

---

## Common Mistakes

- Putting `<td>` directly inside `<table>` without a `<tr>` wrapper
- Forgetting `border-collapse: collapse` (ugly double borders)
- Same number of `<td>` in every row despite using `rowspan`
- Headers styled identically to data cells (no visual distinction)
- Using tables for page layout instead of `<div>` + CSS

---

## In-Class Practice

Complete the hands-on tasks in **exercises/session-09/exercise.md**:

1. Add event schedule table with `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`
2. Add complete table CSS styles to shared stylesheet
3. Add membership fees table with `rowspan` to About page
4. Add leadership table with `mailto:` email links

---

## Homework

See **homework/session-09/homework.md**

Add professionally styled tables to your Student Club Website: event schedule on Events page, membership fees and leadership roster on About page.

**Due Sunday 23:59**

---

## Recap

- Tables are for tabular data only -- never for page layout
- Core elements: `<table>`, `<tr>`, `<th>`, `<td>`
- Semantic sections: `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`
- `colspan` merges horizontally; `rowspan` merges vertically
- Always use `border-collapse: collapse` for clean borders
- Zebra stripes (`nth-child(even)`) and hover effects improve readability

---

## Next Session

Session 10: **Embedding Flash, Video and Sound** -- HTML5 video/audio elements, YouTube embeds, and why Flash is dead.
