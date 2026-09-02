# 🟦 SESSION 9
# **Working with Tables**

Welcome to Session 9! Today we are adding a powerful new tool to your HTML toolkit: **tables**. Tables let you display structured data — schedules, price lists, rosters, statistics — in neat rows and columns that are easy to scan and understand. You will learn every table element from `<table>` to `<tfoot>`, how to merge cells with `colspan` and `rowspan`, and how to style tables so they look professional on the Student Club Website. Equally important, you will learn when to use tables (data) and when absolutely NOT to use them (layout). Let us get started!

---

# 📌 SESSION INFORMATION

```
📅 Duration:     3 periods (150 minutes) — Theory ~60 min, Practice ~90 min
📚 Reference:    Chapter 9 — Working with Tables (course ebook)
                 MDN: "HTML tables", "Table basics", "Advanced tables"
🎯 Objectives:   1. Create HTML tables with proper semantic structure
                 2. Use thead / tbody / tfoot and caption
                 3. Merge cells with colspan and rowspan
                 4. Style tables professionally with CSS
                 5. Judge when a table is appropriate and when it is not
📖 Prepare:      1. Complete the Sessions 1-8 hands-on tasks
                 2. Have your student-club-site folder open
                 3. Review the CSS box model and selectors (Session 4)
🖼 Diagrams:     canvases/buoi-09.canvas.tsx — TableAnatomy, SpanGrid, TableStylePreview
🔗 Outcomes:     CLO1 (master basic web design and build skills)
                 CLO4 (design and build a web application)
```

---

# 🎯 LEARNING OBJECTIVES

By the end of this session you will be able to:

- Create an HTML table using `<table>`, `<tr>`, `<th>`, and `<td>`.
- Structure tables semantically with `<thead>`, `<tbody>`, `<tfoot>`, and `<caption>`.
- Merge cells horizontally with **`colspan`** and vertically with **`rowspan`**.
- Style tables with CSS: borders, padding, alternating row colours, hover effects, and responsive wrappers.
- Explain **when to use tables** (tabular data) and **when NOT to use tables** (page layout).
- Add event schedule and membership fee tables to the **Student Club Website**.

---

# 📖 THEORY

## 1. What Are HTML Tables?

### 1.1 Definition

An **HTML table** is a structured grid of rows and columns used to display **tabular data** — information that naturally belongs in a spreadsheet-like format. Examples include class timetables, product comparison charts, financial reports, sports standings, and member directories.

### 🎒 Real-life example

Think of a table like an Excel spreadsheet embedded in a web page. When you look at a train schedule, a restaurant menu with prices, or a university course catalogue, you are looking at tabular data. HTML tables are the semantic way to represent this kind of information on the web.

### 1.2 Why it matters

Tables provide **semantic meaning** to data. Screen readers announce "table with 4 rows and 3 columns" and navigate cell by cell, helping visually impaired users understand the data structure. Search engines also recognise tables as structured data, which can improve SEO for data-heavy pages.

### ⚠️ Important notes — When NOT to use tables

In the early days of the web (1990s–early 2000s), developers used tables to create page layouts — positioning headers, sidebars, and content areas using table cells. **This is now considered bad practice.** Here is why:

| Reason | Explanation |
|---|---|
| Semantics | Tables imply data relationships. Using them for layout confuses screen readers and search engines. |
| Accessibility | Screen readers try to read layout tables as data tables, producing nonsensical output. |
| Flexibility | Table-based layouts are rigid and difficult to make responsive for mobile devices. |
| Maintenance | Nested tables for layout produce deeply nested, hard-to-read HTML. |
| Performance | Browsers must download the entire table before rendering any of it. |

✅ **Use tables for:** Schedules, price lists, statistics, comparisons, rosters, calendars.
❌ **Do NOT use tables for:** Page layout, positioning elements, creating columns for text, spacing.

For page layout, always use `<div>` elements with CSS floats (as learned in Session 5), or modern alternatives like Flexbox and Grid.

### 🧪 Try It Yourself — Table or Not a Table?

**Task (4 min):** Decide correctly before you write any markup.

For each of these, answer table or not:

1. The club's weekly meeting schedule — day, time, room.
2. A sidebar sitting beside the main article.
3. A comparison of three membership tiers and their benefits.
4. A photo gallery in a three-across grid.
5. Semester 1 income and expenses with a totals row.

<details>
<summary>Answers</summary>

1. **Table.** Rows are meetings, columns are attributes. Genuine row-and-column data.
2. **Not a table.** That is page layout — Flexbox or Grid.
3. **Table.** Tiers against benefits is a comparison matrix.
4. **Not a table.** A grid of images has no row-column *relationship*; a photo's position carries no meaning. Use `display: grid`.
5. **Table**, and use `<tfoot>` for the totals row.

The deciding question: **would this data still make sense as a spreadsheet?** If yes, it is tabular and `<table>` is correct. If you are only arranging boxes on a screen, it is layout, and tables are the wrong tool.

This distinction is historical as much as technical. Before CSS layout existed, everyone built pages from nested tables — you will still find it in tutorials written before about 2005. It produces unreadable markup and a terrible screen reader experience, because assistive technology announces "table with 4 rows and 3 columns" for something that is just a sidebar.

</details>


---

## 2. Basic Table Structure

> 🖼 **Diagram:** `canvases/buoi-09.canvas.tsx` → `TableAnatomy` — slide `s9-anatomy` ("Table anatomy")

### 2.1 The Four Core Elements

Every HTML table is built from four fundamental elements:

| Element | Tag | Purpose |
|---|---|---|
| Table container | `<table>` | Wraps the entire table |
| Table row | `<tr>` | Defines one horizontal row |
| Header cell | `<th>` | A cell containing column/row header text (bold and centred by default) |
| Data cell | `<td>` | A cell containing regular data |

```
VISUAL STRUCTURE OF A TABLE:

┌─────────────────────────────────────────────┐
│ <table>                                     │
│  ┌─────────────────────────────────────────┐│
│  │ <tr>                                    ││
│  │  ┌────────┐ ┌────────┐ ┌────────┐     ││
│  │  │  <th>  │ │  <th>  │ │  <th>  │     ││
│  │  │ Event  │ │  Date  │ │  Time  │     ││
│  │  └────────┘ └────────┘ └────────┘     ││
│  └─────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────┐│
│  │ <tr>                                    ││
│  │  ┌────────┐ ┌────────┐ ┌────────┐     ││
│  │  │  <td>  │ │  <td>  │ │  <td>  │     ││
│  │  │Workshop│ │ Mar 15 │ │ 2:00PM │     ││
│  │  └────────┘ └────────┘ └────────┘     ││
│  └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

### 2.2 Your First Table

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
    <tr>
        <td>Music Night</td>
        <td>March 29</td>
        <td>Auditorium</td>
    </tr>
</table>
```

#### Line-by-line explanation

| Line | Meaning |
|---|---|
| `<table>` | Opens the table container. All rows and cells go inside this. |
| `<tr>` | Opens a new table row. Each `<tr>` creates one horizontal line in the table. |
| `<th>Event</th>` | A header cell containing "Event". Browsers render `<th>` text as bold and centred by default. |
| `<td>Web Workshop</td>` | A data cell containing "Web Workshop". Regular weight, left-aligned by default. |
| `</table>` | Closes the table container. |

⚠️ **Critical rule:** `<td>` and `<th>` elements MUST be direct children of `<tr>`. You cannot put a `<td>` directly inside `<table>` without wrapping it in a `<tr>` first. This is a very common beginner mistake.

### ❌ Common mistakes

❌ **Wrong:** Cell outside a row
```html
<table>
    <td>This is invalid!</td>
</table>
```

✅ **Correct:** Cell inside a row
```html
<table>
    <tr>
        <td>This is valid.</td>
    </tr>
</table>
```

❌ **Wrong:** Mixing `<th>` and `<td>` randomly
```html
<tr>
    <td>Name</td>   <!-- Should be <th> because it is a header -->
    <th>John</th>   <!-- Should be <td> because it is data -->
</tr>
```

✅ **Correct:** Headers in `<th>`, data in `<td>`
```html
<tr>
    <th>Name</th>
    <td>John</td>
</tr>
```

### 🧪 Try It Yourself — Hear the Difference `scope` Makes

**Task (6 min):** Make a table readable to a screen reader, not just to your eyes.

1. Build a schedule table with a header row of `<th>` and three data rows.
2. Open F12 → **Elements**, select a `<td>`, and look at the **Accessibility** pane.
3. Now add `scope` to every header cell:
   ```html
   <tr>
       <th scope="col">Day</th>
       <th scope="col">Activity</th>
       <th scope="col">Room</th>
   </tr>
   ```
4. Also add a caption as the **first** child of `<table>`:
   ```html
   <caption>Weekly club schedule, Semester 1</caption>
   ```
5. Re-inspect a data cell.

**Expected result:** Visually nothing changes except the caption appearing above the table. In the accessibility tree, each data cell is now associated with its column header.

<details>
<summary>What a screen reader user actually hears</summary>

Without `scope`, moving across a row announces bare values: "Friday, Workshop, B203." The listener must remember what the columns were.

With `scope="col"`, each value arrives labelled: "Day: Friday. Activity: Workshop. Room: B203." That is the difference between data and noise.

Use `scope="row"` when the first cell of each row labels that row — a name, a date, a category. Tables often need both.

`<caption>` is the table's accessible name, which is how a user decides whether this is the table they were looking for. It must be the first element inside `<table>`; placed anywhere else the browser moves it, and the association is lost.

</details>


---

## 3. Semantic Table Sections: thead, tbody, tfoot, caption

### 3.1 Definitions

HTML provides three section elements that divide a table into logical parts:

| Element | Purpose | Required? |
|---|---|---|
| `<caption>` | Title/description displayed above the table | No, but strongly recommended |
| `<thead>` | Groups header row(s) at the top | No, but strongly recommended |
| `<tbody>` | Groups body/data rows in the middle | No, but strongly recommended |
| `<tfoot>` | Groups footer row(s) at the bottom | No, but useful for totals/summaries |

### 3.2 Why these matter

1. **Accessibility:** Screen readers use these sections to navigate tables. Users can jump between header, body, and footer.
2. **Styling:** You can apply different CSS to each section independently (e.g., dark header, striped body, bold footer).
3. **Print behaviour:** When a table spans multiple printed pages, browsers repeat `<thead>` on each page.
4. **Semantics:** They communicate the table's structure to machines (search engines, data parsers).

### 3.3 Complete semantic table

```html
<table>
    <caption>Student Club Events Schedule</caption>

    <thead>
        <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>Web Workshop</td>
            <td>March 15</td>
            <td>2:00 PM</td>
            <td>Room 301</td>
        </tr>
        <tr>
            <td>Photo Contest</td>
            <td>March 22</td>
            <td>All Day</td>
            <td>Online</td>
        </tr>
        <tr>
            <td>Music Night</td>
            <td>March 29</td>
            <td>7:00 PM</td>
            <td>Auditorium</td>
        </tr>
    </tbody>

    <tfoot>
        <tr>
            <td colspan="4">Total: 3 events scheduled</td>
        </tr>
    </tfoot>
</table>
```

#### Order matters!

The correct order inside `<table>` is:
1. `<caption>` (first, if present)
2. `<thead>` (second, if present)
3. `<tbody>` (third, if present)
4. `<tfoot>` (last, if present)

⚠️ Note: In older HTML specs, `<tfoot>` was required to come BEFORE `<tbody>`. In HTML5, it can come after `<tbody>`, which is more intuitive. Modern browsers support both orders, but placing it last is the current best practice.

### ✅ Best practices

- Always include `<caption>` — even if it is hidden visually with CSS, screen readers need it.
- Always wrap header rows in `<thead>` and data rows in `<tbody>`.
- Use `<tfoot>` for summary rows (totals, counts, notes).
- Keep only ONE `<thead>` and ONE `<tfoot>` per table. You CAN have multiple `<tbody>` sections to group related data.

### ❌ Common mistakes

❌ **Wrong:** Forgetting semantic sections entirely
```html
<table>
    <tr><th>Name</th><th>Age</th></tr>
    <tr><td>Alice</td><td>20</td></tr>
</table>
```

✅ **Correct:** Using all semantic sections
```html
<table>
    <caption>Member List</caption>
    <thead>
        <tr><th>Name</th><th>Age</th></tr>
    </thead>
    <tbody>
        <tr><td>Alice</td><td>20</td></tr>
    </tbody>
</table>
```

---

## 4. Merging Cells: colspan and rowspan

> 🖼 **Diagram:** `canvases/buoi-09.canvas.tsx` → `SpanGrid` — slide `s9-merging` ("Merging cells")

### 4.1 `colspan` — Horizontal Merging

The `colspan` attribute makes a single cell span across multiple columns.

```html
<tr>
    <td colspan="3">This cell spans 3 columns</td>
</tr>
```

```
BEFORE colspan:                AFTER colspan="3":
+--------+--------+--------+   +------------------------+
| Cell A | Cell B | Cell C |   |   Spans 3 columns      |
+--------+--------+--------+   +------------------------+
```

### 4.2 `rowspan` — Vertical Merging

The `rowspan` attribute makes a single cell span across multiple rows.

```html
<tr>
    <td rowspan="2">Spans 2 rows</td>
    <td>Cell A</td>
</tr>
<tr>
    <!-- No first <td> here — it is occupied by the rowspan above -->
    <td>Cell B</td>
</tr>
```

```
BEFORE rowspan:                AFTER rowspan="2":
+--------+--------+            +--------+--------+
| Cell X | Cell A |            |        | Cell A |
+--------+--------+            | Spans  +--------+
| Cell Y | Cell B |            | 2 rows | Cell B |
+--------+--------+            +--------+--------+
```

⚠️ **Critical rule for rowspan:** When a cell uses `rowspan="2"`, the NEXT row has one fewer `<td>` because the spanning cell already occupies that position. Forgetting to remove the extra cell is the most common rowspan bug.

### 4.3 Combining colspan and rowspan

You can use both attributes on the same cell:

```html
<td colspan="2" rowspan="3">This cell spans 2 columns AND 3 rows</td>
```

### ✅ Best practices

- Plan your table on paper FIRST. Draw the grid and mark which cells span.
- Count cells in each row carefully. Every row must have the same total number of column positions (accounting for spans).
- Test merged tables thoroughly — visual bugs are easy to miss.

### ❌ Common mistakes

❌ **Wrong:** Same number of cells in every row despite rowspan
```html
<tr>
    <td rowspan="2">Category</td>
    <td>Item A</td>
</tr>
<tr>
    <td>Category</td>  <!-- EXTRA cell! Row now has 3 column positions instead of 2 -->
    <td>Item B</td>
</tr>
```

✅ **Correct:** Fewer cells in the second row
```html
<tr>
    <td rowspan="2">Category</td>
    <td>Item A</td>
</tr>
<tr>
    <td>Item B</td>  <!-- Only 1 cell; the rowspan fills the first column -->
</tr>
```

### 🧪 Try It Yourself — Count the Columns

**Task (7 min):** Build a merged-cell table, break it, then repair it by counting.

1. Build a three-column fee table with a merged heading:
   ```html
   <table>
       <tr>
           <th colspan="3">Membership Fees 2026</th>
       </tr>
       <tr>
           <th>Type</th><th>Term</th><th>Fee</th>
       </tr>
       <tr>
           <td rowspan="2">Student</td><td>Semester 1</td><td>50,000 VND</td>
       </tr>
       <tr>
           <td>Semester 2</td><td>50,000 VND</td>
       </tr>
   </table>
   ```
2. Reload — the grid is even.
3. Now break it: add a `<td>Extra</td>` to the last row and reload.
4. Fix it by removing that cell, then break it the other way: change `colspan="3"` to `colspan="2"`.

**Expected result:** The extra cell pushes a fourth column into existence and the table goes ragged. The wrong `colspan` leaves a visible gap in the top row.

<details>
<summary>The arithmetic that prevents both bugs</summary>

Every row must total the same number of columns, counting each span by its value:

| Row | Cells | Counted width |
|---|---|---|
| 1 | one `<th colspan="3">` | 3 |
| 2 | three `<th>` | 3 |
| 3 | `<td rowspan="2">` + 2 `<td>` | 3 |
| 4 | two `<td>` **only** | 2 + 1 inherited from the rowspan above = 3 |

Row 4 is where students add a cell they should not. The `rowspan="2"` in row 3 already occupies row 4's first column, so row 4 must supply only two cells. Writing three gives you four columns.

When a merged table looks wrong, do not adjust CSS. Count the columns row by row on paper — the row that does not total correctly is the broken one.

</details>


---

## 5. Styling Tables with CSS

> 🖼 **Diagram:** `canvases/buoi-09.canvas.tsx` → `TableStylePreview` — slide `s9-styling` ("CSS table styling")

Raw HTML tables look plain — no borders, no spacing, no colour. CSS transforms them into professional, readable components.

### 5.1 Essential Table CSS Properties

| Property | Purpose | Example |
|---|---|---|
| `border-collapse` | Merges adjacent cell borders into single lines | `border-collapse: collapse;` |
| `width` | Sets table width | `width: 100%;` |
| `padding` (on td/th) | Adds space inside cells | `padding: 12px 15px;` |
| `text-align` (on th) | Aligns header text | `text-align: left;` |
| `background-color` | Colours sections differently | `thead { background: #1a5276; }` |
| `nth-child(even)` | Targets alternating rows for zebra striping | `tr:nth-child(even) { background: #f8f9fa; }` |
| `:hover` (on tr) | Highlights row on mouseover | `tr:hover { background: #eaf2f8; }` |

### 5.2 `border-collapse: collapse` — THE Most Important Table CSS

Without `border-collapse: collapse`, each cell draws its own border, resulting in ugly double borders:

```
WITHOUT collapse:              WITH collapse:
+========+========+           +--------+--------+
║ Cell A ║ Cell B ║           | Cell A | Cell B |
+========+========+           +--------+--------+
║ Cell C ║ Cell D ║           | Cell C | Cell D |
+========+========+           +--------+--------+
(double borders)               (single clean borders)
```

Always set `border-collapse: collapse` on the `<table>` element unless you specifically want separated borders.

### 5.3 Complete Styled Table CSS

```css
/* --- Base table styles --- */
.styled-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden; /* Clips border-radius on inner elements */
}

/* --- Caption --- */
.styled-table caption {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px;
    color: #1a5276;
    margin-bottom: 15px;
    font-weight: bold;
    text-align: left;
}

/* --- Header section --- */
.styled-table thead {
    background: linear-gradient(135deg, #1a5276, #2874a6);
}

.styled-table th {
    color: white;
    padding: 12px 15px;
    text-align: left;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 0.5px;
}

/* --- Body cells --- */
.styled-table td {
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
}

/* Zebra striping: alternate row colours */
.styled-table tbody tr:nth-child(even) {
    background-color: #f8f9fa;
}

/* Hover highlight */
.styled-table tbody tr {
    transition: background-color 0.2s ease;
}

.styled-table tbody tr:hover {
    background-color: #eaf2f8;
}

/* --- Footer section --- */
.styled-table tfoot {
    background-color: #f0f4f8;
    font-weight: bold;
}

.styled-table tfoot td {
    padding: 12px 15px;
    border-top: 2px solid #2874a6;
}
```

#### Line-by-line explanation of key rules

| Rule | Why it matters |
|---|---|
| `border-collapse: collapse` | Eliminates double borders for a clean look. |
| `overflow: hidden` on table | Ensures `border-radius` clips child elements properly. Without this, header/footer backgrounds bleed past rounded corners. |
| `linear-gradient` on `thead` | Uses the same gradient style as our site header for visual consistency. |
| `text-transform: uppercase` on `th` | Makes headers feel more authoritative and scannable. |
| `tr:nth-child(even)` | Creates zebra stripes that help the eye track across wide rows. |
| `transition: background-color 0.2s` | Smoothly animates the hover highlight instead of snapping. |
| `border-top: 2px solid` on `tfoot td` | Visually separates the footer from body rows. |

### 5.4 Responsive Table Wrapper

Tables do not shrink gracefully on small screens. Wrap them in a scrollable container:

```html
<div class="table-wrapper">
    <table class="styled-table">
        <!-- ... -->
    </table>
</div>
```

```css
.table-wrapper {
    overflow-x: auto; /* Horizontal scrollbar appears only when needed */
    margin: 20px 0;
}
```

This adds a horizontal scrollbar on narrow screens while keeping the table fully readable.

### ✅ Best practices

- Always use `border-collapse: collapse`.
- Give headers a distinct visual treatment (different background, bold text, or both).
- Add zebra stripes for tables with more than 3–4 rows.
- Add hover effects for interactive feedback.
- Wrap wide tables in a scrollable container.
- Keep cell padding generous (10–15 px) for readability.

### ❌ Common mistakes

❌ **Wrong:** No border-collapse (double borders everywhere)
```css
table { border: 1px solid #ccc; }
td { border: 1px solid #ccc; }
/* Result: thick double borders between cells */
```

✅ **Correct:** Single clean borders
```css
table { border-collapse: collapse; }
td { border: 1px solid #ccc; }
/* Result: single-pixel borders between cells */
```

❌ **Wrong:** Headers look identical to data cells
```css
th, td { padding: 10px; }
/* No visual distinction */
```

✅ **Correct:** Headers stand out
```css
th { background-color: #1a5276; color: white; padding: 12px; }
td { padding: 10px; }
```

### 🧪 Try It Yourself — Make a Wide Table Survive a Phone

**Task (6 min):** Fix the one table problem that only appears on a narrow screen.

1. Build a table with six columns of event data and no width constraints.
2. Open F12, press **Ctrl+Shift+M** for device mode, and choose iPhone SE (375px).
3. Note that the whole page now scrolls sideways — the table has stretched the body.
4. Wrap the table and give the wrapper one property:
   ```html
   <div class="table-wrapper">
       <table> ... </table>
   </div>
   ```
   ```css
   .table-wrapper { overflow-x: auto; }
   table { border-collapse: collapse; width: 100%; min-width: 480px; }
   ```
5. Reload at 375px and swipe the table itself.

**Expected result:** The page no longer scrolls sideways. The table scrolls within its wrapper while the header, nav, and footer stay put.

<details>
<summary>Why not just shrink the table</summary>

You can force a table into 375px, but the result is unreadable — three characters per line in every cell. Tabular data has a genuine minimum width, which is what `min-width` acknowledges.

That is the reason for the pairing: `width: 100%` lets the table use the full space when there is room, and `min-width` stops it collapsing below legibility. `overflow-x: auto` on the wrapper then contains the overflow instead of letting it push the whole page.

Two related touches worth knowing:

```css
th, td { padding: 8px 12px; text-align: left; }
tbody tr:nth-child(even) { background: #f8f9fa; }
```

Scope the zebra striping to `tbody`, otherwise `nth-child` counts the header row and stripes the wrong rows.

</details>


---

# 📋 THEORY SUMMARY

| Concept | Definition | Example |
|---|---|---|
| `<table>` | Container element for an HTML table | `<table class="events-table">` |
| `<tr>` | Table row | `<tr>` ... `</tr>` |
| `<th>` | Header cell (bold, centred by default) | `<th>Event Name</th>` |
| `<td>` | Data cell (normal weight, left-aligned) | `<td>Web Workshop</td>` |
| `<caption>` | Table title/description | `<caption>March Events</caption>` |
| `<thead>` | Groups header rows | Wraps `<tr>` containing `<th>` elements |
| `<tbody>` | Groups body/data rows | Wraps data `<tr>` elements |
| `<tfoot>` | Groups footer/summary rows | Wraps summary `<tr>` elements |
| `colspan` | Merges cell across multiple columns | `<td colspan="3">` |
| `rowspan` | Merges cell across multiple rows | `<td rowspan="2">` |
| `border-collapse` | Merges adjacent cell borders | `border-collapse: collapse;` |
| `nth-child(even)` | Selects alternating rows | `tr:nth-child(even) { bg: #f8f9fa; }` |
| `.table-wrapper` | Scrollable container for responsive tables | `overflow-x: auto;` |

---

# 💡 WORKED EXAMPLES

## Example 1: Basic Event Schedule Table

**Situation:** You need to display upcoming events on the Student Club events page.

**Code:**
```html
<table class="styled-table">
    <caption>Upcoming Events — March 2024</caption>
    <thead>
        <tr>
            <th>No.</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Venue</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Web Design Workshop</td>
            <td>March 15</td>
            <td>2:00 PM – 4:00 PM</td>
            <td>Room 301, Building A</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Photography Contest</td>
            <td>March 22</td>
            <td>All Day</td>
            <td>Online Submission</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Music Night</td>
            <td>March 29</td>
            <td>7:00 PM – 10:00 PM</td>
            <td>University Auditorium</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="4">Total Events</td>
            <td>3</td>
        </tr>
    </tfoot>
</table>
```

**Line-by-line explanation:**

| Element | Purpose |
|---|---|
| `<table class="styled-table">` | Opens the table and assigns the CSS class for styling. |
| `<caption>` | Provides a visible title above the table and an accessible label for screen readers. |
| `<thead>` / `<tbody>` / `<tfoot>` | Divides the table into semantic sections. |
| `<th>` in `<thead>` | Column headers: bold, white text on blue gradient (via CSS). |
| `<td>` in `<tbody>` | Data cells with padding, bottom borders, and hover effect (via CSS). |
| `colspan="4"` in `<tfoot>` | The "Total Events" label spans the first four columns; the count "3" sits in the fifth column. |

**Result:** A clean, professionally styled table with a gradient header, zebra-striped rows, hover highlighting, and a bold summary footer. The caption "Upcoming Events — March 2024" appears above the table.

---

## Example 2: Membership Fee Table with rowspan

**Situation:** Students have two membership tiers (semester and full year), while guests pay per event. You want "Student" to appear once and span both rows.

**Code:**
```html
<table class="styled-table">
    <caption>Membership Fee Structure</caption>
    <thead>
        <tr>
            <th>Category</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Benefits</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">Student</td>
            <td>1 Semester</td>
            <td>50,000 VND</td>
            <td>All events, workshops, online resources</td>
        </tr>
        <tr>
            <!-- No <td> for Category here — rowspan covers it -->
            <td>Full Year</td>
            <td>80,000 VND</td>
            <td>All events, workshops, resources + T-shirt</td>
        </tr>
        <tr>
            <td>Guest</td>
            <td>Per Event</td>
            <td>Free</td>
            <td>Single event attendance only</td>
        </tr>
    </tbody>
</table>
```

**Line-by-line explanation:**

| Element | Purpose |
|---|---|
| `rowspan="2"` on first `<td>` | The word "Student" occupies the Category column for BOTH the semester row and the full-year row. |
| Second `<tr>` has only 3 `<td>` | Because the first column is already filled by the rowspan from the previous row. Adding a fourth `<td>` would break the table structure. |
| Third `<tr>` ("Guest") has 4 `<td>` | Normal row with no spanning — all four columns are explicitly defined. |

**Visual result:**
```
+----------+-----------+-----------+----------------------------------+
| Category | Duration  | Price     | Benefits                         |
+----------+-----------+-----------+----------------------------------+
|          | 1 Semester| 50,000 VND| All events, workshops, resources |
| Student  +-----------+-----------+----------------------------------+
|          | Full Year | 80,000 VND| ...resources + T-shirt           |
+----------+-----------+-----------+----------------------------------+
| Guest    | Per Event | Free      | Single event attendance only     |
+----------+-----------+-----------+----------------------------------+
```

---

## Example 3: Club Leadership Table with Mailto Links

**Situation:** Display the club leadership team on the About page with clickable email links.

**Code:**
```html
<table class="styled-table">
    <caption>Club Leadership Team 2024</caption>
    <thead>
        <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Faculty</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Nguyen Van A</td>
            <td>President</td>
            <td>Information Technology</td>
            <td><a href="mailto:president@club.edu">president@club.edu</a></td>
        </tr>
        <tr>
            <td>Tran Thi B</td>
            <td>Vice President</td>
            <td>Business Administration</td>
            <td><a href="mailto:vp@club.edu">vp@club.edu</a></td>
        </tr>
        <tr>
            <td>Le Van C</td>
            <td>Events Coordinator</td>
            <td>Communication</td>
            <td><a href="mailto:events@club.edu">events@club.edu</a></td>
        </tr>
        <tr>
            <td>Pham Thi D</td>
            <td>Treasurer</td>
            <td>Finance</td>
            <td><a href="mailto:treasurer@club.edu">treasurer@club.edu</a></td>
        </tr>
    </tbody>
</table>
```

**Key detail:** The `<a href="mailto:...">` tag inside a `<td>` creates a clickable email link. When clicked, it opens the user's default email client with the address pre-filled. This is perfectly valid HTML — table cells can contain any inline element.

**Result:** A four-row table listing each leader. Email addresses are blue clickable links. Rows highlight on hover.

---

# 🛠️ HANDS-ON PRACTICE

## Setup

Open your `student-club-site` project folder. Make sure `events.html`, `about.html`, and `css/style.css` are ready for editing.

---

### TASK 1: Add an Event Schedule Table to the Events Page

🎯 **Goal:** Create a fully structured, styled event schedule table on `events.html`.

📝 **What you will do:** Add a table with `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, and `colspan` inside a responsive wrapper.

🔧 **Steps:**

1. Open `events.html`. Inside `<main>`, after your existing event cards, add:
   ```html
   <h3>Complete Schedule</h3>
   <div class="table-wrapper">
       <table class="styled-table">
           <caption>March – April 2024 Events</caption>
           <thead>
               <tr>
                   <th>No.</th>
                   <th>Event</th>
                   <th>Date</th>
                   <th>Time</th>
                   <th>Venue</th>
               </tr>
           </thead>
           <tbody>
               <tr>
                   <td>1</td>
                   <td>Web Design Workshop</td>
                   <td>Mar 15</td>
                   <td>2:00 PM</td>
                   <td>Room 301</td>
               </tr>
               <tr>
                   <td>2</td>
                   <td>Photography Contest</td>
                   <td>Mar 22</td>
                   <td>All Day</td>
                   <td>Online</td>
               </tr>
               <tr>
                   <td>3</td>
                   <td>Music Night</td>
                   <td>Mar 29</td>
                   <td>7:00 PM</td>
                   <td>Auditorium</td>
               </tr>
               <tr>
                   <td>4</td>
                   <td>Hackathon</td>
                   <td>Apr 5–6</td>
                   <td>48 Hours</td>
                   <td>Lab B</td>
               </tr>
               <tr>
                   <td>5</td>
                   <td>Career Talk</td>
                   <td>Apr 12</td>
                   <td>3:00 PM</td>
                   <td>Room 201</td>
               </tr>
               <tr>
                   <td>6</td>
                   <td>Sports Day</td>
                   <td>Apr 20</td>
                   <td>8:00 AM</td>
                   <td>University Field</td>
               </tr>
           </tbody>
           <tfoot>
               <tr>
                   <td colspan="4">Total Events</td>
                   <td>6</td>
               </tr>
           </tfoot>
       </table>
   </div>
   ```
2. Save `events.html`.

✅ **Check:** Preview in browser. Table renders with all rows visible. Footer shows "Total Events" spanning four columns.

💾 **Save** `events.html`.

---

### TASK 2: Add Table CSS Styles

🎯 **Goal:** Apply professional styling to all tables on the site.

📝 **What you will do:** Add the complete table CSS to `style.css`.

🔧 **Steps:**

1. Open `css/style.css`. At the bottom, add:
   ```css
   /* ========================================
      TABLE STYLES
      ======================================== */

   /* Responsive wrapper */
   .table-wrapper {
       overflow-x: auto;
       margin: 20px 0;
   }

   /* Base table */
   .styled-table {
       width: 100%;
       border-collapse: collapse;
       font-size: 15px;
       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
       border-radius: 8px;
       overflow: hidden;
   }

   /* Caption */
   .styled-table caption {
       font-family: 'Montserrat', sans-serif;
       font-size: 22px;
       color: #1a5276;
       margin-bottom: 15px;
       font-weight: bold;
       text-align: left;
   }

   /* Header */
   .styled-table thead {
       background: linear-gradient(135deg, #1a5276, #2874a6);
   }

   .styled-table th {
       color: white;
       padding: 12px 15px;
       text-align: left;
       font-weight: 600;
       text-transform: uppercase;
       font-size: 13px;
       letter-spacing: 0.5px;
   }

   /* Body cells */
   .styled-table td {
       padding: 10px 15px;
       border-bottom: 1px solid #ddd;
   }

   .styled-table tbody tr {
       background-color: white;
       transition: background-color 0.2s ease;
   }

   .styled-table tbody tr:nth-child(even) {
       background-color: #f8f9fa;
   }

   .styled-table tbody tr:hover {
       background-color: #eaf2f8;
   }

   /* Footer */
   .styled-table tfoot {
       background-color: #f0f4f8;
       font-weight: bold;
   }

   .styled-table tfoot td {
       padding: 12px 15px;
       border-top: 2px solid #2874a6;
   }

   /* Status indicators (optional) */
   .status-open {
       color: #27ae60;
       font-weight: bold;
   }

   .status-full {
       color: #e74c3c;
       font-weight: bold;
   }
   ```
2. Save `style.css`.

✅ **Check:** Refresh `events.html`. The table now has a gradient header, zebra stripes, hover highlighting, and clean borders. Resize the browser window narrow — a horizontal scrollbar should appear.

💾 **Save** `style.css`.

---

### TASK 3: Add a Membership Fees Table with rowspan to the About Page

🎯 **Goal:** Create a fee table that uses `rowspan` to merge the "Student" category across two rows.

📝 **What you will do:** Add the fees table to `about.html`.

🔧 **Steps:**

1. Open `about.html`. Inside `<main>`, add:
   ```html
   <h3>Membership Fees</h3>
   <div class="table-wrapper">
       <table class="styled-table">
           <caption>Membership Fee Structure</caption>
           <thead>
               <tr>
                   <th>Category</th>
                   <th>Duration</th>
                   <th>Price</th>
                   <th>Benefits</th>
               </tr>
           </thead>
           <tbody>
               <tr>
                   <td rowspan="2">Student</td>
                   <td>1 Semester</td>
                   <td>50,000 VND</td>
                   <td>All events, workshops, and online resources</td>
               </tr>
               <tr>
                   <td>Full Year</td>
                   <td>80,000 VND</td>
                   <td>All events, workshops, resources + T-shirt</td>
               </tr>
               <tr>
                   <td>Guest</td>
                   <td>Per Event</td>
                   <td>Free</td>
                   <td>One event only (no workshops)</td>
               </tr>
           </tbody>
       </table>
   </div>
   ```
2. Save `about.html` and preview.

✅ **Check:** The word "Student" appears once and spans both the semester and full-year rows. The Guest row is separate. All styling matches the events table.

💾 **Save** `about.html`.

---

### TASK 4: Add a Leadership Table with Email Links

🎯 **Goal:** Display the club leadership team on the About page with clickable mailto links.

📝 **What you will do:** Add a leadership table below the fees table.

🔧 **Steps:**

1. In `about.html`, after the fees table, add:
   ```html
   <h3>Club Leadership Team</h3>
   <div class="table-wrapper">
       <table class="styled-table">
           <caption>Leadership Team 2024</caption>
           <thead>
               <tr>
                   <th>Name</th>
                   <th>Position</th>
                   <th>Faculty</th>
                   <th>Email</th>
               </tr>
           </thead>
           <tbody>
               <tr>
                   <td>Nguyen Van A</td>
                   <td>President</td>
                   <td>Information Technology</td>
                   <td><a href="mailto:president@club.edu">president@club.edu</a></td>
               </tr>
               <tr>
                   <td>Tran Thi B</td>
                   <td>Vice President</td>
                   <td>Business Administration</td>
                   <td><a href="mailto:vp@club.edu">vp@club.edu</a></td>
               </tr>
               <tr>
                   <td>Le Van C</td>
                   <td>Events Coordinator</td>
                   <td>Communication</td>
                   <td><a href="mailto:events@club.edu">events@club.edu</a></td>
               </tr>
               <tr>
                   <td>Pham Thi D</td>
                   <td>Treasurer</td>
                   <td>Finance</td>
                   <td><a href="mailto:treasurer@club.edu">treasurer@club.edu</a></td>
               </tr>
           </tbody>
       </table>
   </div>
   ```
2. Save and preview.

✅ **Check:** All four leaders are listed. Email addresses are clickable (they open your email client). Rows highlight on hover. Table has the same consistent styling as other tables.

💾 **Save** all files.

---

# 🐛 COMMON ERRORS — WHAT THE BROWSER SHOWS YOU

Tables have strict nesting rules, and the browser silently repairs bad markup rather than reporting it — which is why a table can look broken with no error anywhere.

| Symptom you see | Likely cause | How to confirm | Fix |
|---|---|---|---|
| Every cell on its own line, no grid | `<tr>` missing, so cells have no rows to sit in | Ctrl+U — are the `<td>` inside `<tr>`? | Wrap each row's cells in `<tr>` |
| A row is shorter than the others | Missing `<td>`, or a `colspan` that does not add up | Count cells per row, counting spans | Every row must total the same number of columns |
| Text appears above the table, outside the border | Content placed directly inside `<table>` instead of a cell | Elements panel shows the browser moved it out | Only `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>` may be children of `<table>` |
| Borders look doubled or gappy | `border-collapse` left at its default `separate` | Inspect the computed value | `table { border-collapse: collapse }` |
| Header row is not bold or centred | `<td>` used where `<th>` belongs | Read the tag in the first row | Use `<th>` — it carries meaning, not just styling |
| Screen reader reads the numbers with no context | `<th>` present but `scope` missing | Check the accessibility tree | Add `scope="col"` or `scope="row"` |
| Table pushes the page sideways on a phone | Fixed widths, or simply too many columns | DevTools device mode | Wrap in a container with `overflow-x: auto` |
| `rowspan` cell overlaps the row below | The spanned rows still contain a cell for that column | Count cells in each spanned row | Remove the `<td>` from the rows the span covers |
| Zebra striping colours the wrong rows | `nth-child` counting the header row too | Inspect which rows matched | Scope it: `tbody tr:nth-child(even)` |
| Caption sits at the bottom | Default browser placement, or `caption-side` set | Read the computed `caption-side` | `caption { caption-side: top }` and keep `<caption>` first inside `<table>` |

**The browser fixes your table for you, and that is the trap.** Compare Ctrl+U (what you wrote) against the Elements panel (what the browser built). If the two differ, the browser has repaired invalid nesting, and the repair is rarely what you intended.

---


# ✅ SELF-CHECK QUESTIONS

Answer these from memory first, then expand the answer to check yourself.

**Q1. When is a `<table>` the right element, and when is it wrong?**

<details>
<summary>Answer</summary>

Right for **tabular data** — information with a genuine row-and-column relationship: a schedule, a price list, a comparison chart. Wrong for **page layout**. Using tables to position a sidebar next to content was 1990s practice; it produces unreadable markup and terrible screen reader output. Layout is Flexbox and Grid.

</details>

---

**Q2. What is the difference between `<th>` and `<td>`?**

<details>
<summary>Answer</summary>

`<th>` is a **header** cell — it labels a row or column, renders bold and centred by default, and screen readers announce it when reading the data cells it governs. `<td>` is a plain **data** cell. Using `<td>` with `font-weight: bold` looks the same but conveys nothing to assistive technology.

</details>

---

**Q3. What do `<thead>`, `<tbody>`, and `<tfoot>` add?**

<details>
<summary>Answer</summary>

They group rows semantically: headers, data, and summary rows. This lets you style groups cleanly (`thead th { background: #333; }`), lets screen readers distinguish labels from data, and allows browsers to repeat the header on each printed page of a long table.

</details>

---

**Q4. Why does every table need a `<caption>`?**

<details>
<summary>Answer</summary>

`<caption>` is the table's accessible name. A screen reader user encountering a table hears the caption first and immediately knows whether the table is worth reading. Without it they must parse cells to guess the topic. It must be the **first child** of `<table>`.

</details>

---

**Q5. What is the difference between `colspan` and `rowspan`?**

<details>
<summary>Answer</summary>

`colspan="3"` makes one cell span three **columns** horizontally. `rowspan="2"` makes one cell span two **rows** vertically. When you span cells you must remove the cells they absorb, otherwise the row gains extra columns and the table skews.

</details>

---

**Q6. Why must `border-collapse: collapse` come before your other table rules?**

<details>
<summary>Answer</summary>

By default (`border-collapse: separate`) each cell draws its own border, so adjacent cells produce doubled lines and a visible gap. `collapse` merges shared edges into one line. Set it first, because it changes how every subsequent border and spacing declaration renders.

</details>

---

**Q7. What does `scope` do, and what are its values?**

<details>
<summary>Answer</summary>

`scope` tells assistive technology which cells a header applies to. `scope="col"` on a top-row `<th>` means "I label this whole column"; `scope="row"` on a first-column `<th>` means "I label this whole row". Without it, screen readers must guess the association in anything more complex than a trivial grid.

</details>

---

**Q8. How do you keep a wide table usable on a phone?**

<details>
<summary>Answer</summary>

Wrap it in a scrollable container:

```css
.table-wrapper { overflow-x: auto; }
```

with `<div class="table-wrapper"><table>...</table></div>`. The table keeps its natural width and the user swipes horizontally, which preserves the row/column relationships. Shrinking a table to fit 375px makes the text unreadable instead.

</details>

---


# 📝 SELF-ASSESSMENT WORKSHEET

| # | I can... | Yes | No |
|---|---|---|---|
| 1 | Create a basic HTML table with `<table>`, `<tr>`, `<th>`, `<td>` | ☐ | ☐ |
| 2 | Structure a table with `<caption>`, `<thead>`, `<tbody>`, `<tfoot>` | ☐ | ☐ |
| 3 | Merge cells horizontally using `colspan` | ☐ | ☐ |
| 4 | Merge cells vertically using `rowspan` (and adjust subsequent rows) | ☐ | ☐ |
| 5 | Style tables with `border-collapse`, padding, zebra stripes, and hover effects | ☐ | ☐ |
| 6 | Wrap tables in a responsive scrollable container | ☐ | ☐ |
| 7 | Explain when to use tables (data) and when NOT to use them (layout) | ☐ | ☐ |
| 8 | Include links (`<a>`) and other inline elements inside table cells | ☐ | ☐ |

If you answered **No** to any item, revisit the corresponding Theory section and redo the relevant Hands-On task. Pay special attention to rowspan (item 4) — it is the trickiest concept in this session.

---

# 🔗 FURTHER READING

- [HTML tables overview — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables)
- [Table basics — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics)
- [Advanced table features — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced)
- [`<table>` element reference — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)
- [`colspan` attribute — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/colspan)
- [`rowspan` attribute — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rowspan)
- [Styling tables — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Styling_tables)
- [W3C HTML5 Specification: Tables](https://html.spec.whatwg.org/multipage/tables.html)

---

# ⏭️ NEXT SESSION

In Session 10 we will explore **working with forms** — input fields, labels, validation, and styling forms for the Student Club contact and registration pages.
