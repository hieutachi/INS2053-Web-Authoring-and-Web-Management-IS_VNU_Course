# Session 9 — In-Class Exercise: Working with Tables

## Objective
- Create HTML tables with rows, columns, and headers
- Use `<thead>`, `<tbody>`, and `<caption>` for better table structure
- Use `colspan` and `rowspan` to merge cells

## Time Required
Estimated time: 55 minutes

## Instructions

### Task 1: Create a Basic Table
A table in HTML is made of rows (`<tr>`) and cells (`<td>`). Headers use `<th>`.

Create a new file called `tables.html` in the `club-website` folder:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Tables Practice</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Student Technology Club</h1>
    </header>

    <nav class="main-nav">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="pages/events.html">Events</a></li>
            <li><a href="pages/contact.html">Contact</a></li>
        </ul>
    </nav>

    <main>
        <h2>Club Members List</h2>

        <table>
            <caption>Active Members — Spring 2025</caption>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Major</th>
                    <th>Year</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Nguyen Van A</td>
                    <td>Computer Science</td>
                    <td>2nd</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Tran Thi B</td>
                    <td>Information Systems</td>
                    <td>3rd</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Le Van C</td>
                    <td>Digital Media</td>
                    <td>1st</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Pham Thi D</td>
                    <td>Computer Science</td>
                    <td>2nd</td>
                </tr>
            </tbody>
        </table>
    </main>

    <footer>
        <p>&copy; 2025 Student Technology Club</p>
    </footer>
</body>
</html>
```

**Understand the table structure:**
```
<table>            ← starts the table
  <caption>        ← title of the table (shown above the table)
  <thead>          ← header section
    <tr>           ← one row
      <th>...</th> ← header cell (bold, centered by default)
    </tr>
  </thead>
  <tbody>          ← body section (the actual data)
    <tr>           ← one row
      <td>...</td> ← data cell
      <td>...</td>
    </tr>
  </tbody>
</table>
```

Save and preview. The table will appear but will have no borders yet. We will add CSS in Task 3.

### Task 2: Use colspan and rowspan
Sometimes you need a cell to span multiple columns or rows.

Add this second table below the first one in `tables.html` (inside `<main>`):

```html
        <h2>Weekly Schedule</h2>

        <table>
            <caption>Club Room Schedule — Week 12</caption>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Monday</th>
                    <th>Wednesday</th>
                    <th>Friday</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>9:00 - 10:00</td>
                    <td>HTML Workshop</td>
                    <td>CSS Workshop</td>
                    <td>JS Workshop</td>
                </tr>
                <tr>
                    <td>10:00 - 11:00</td>
                    <!-- This cell spans 2 columns -->
                    <td colspan="2">Club Meeting (all members)</td>
                    <td>Free Practice</td>
                </tr>
                <tr>
                    <!-- This cell spans 2 rows -->
                    <td rowspan="2">Afternoon</td>
                    <td>Project Work</td>
                    <td>Guest Speaker</td>
                    <td>Code Review</td>
                </tr>
                <tr>
                    <td>Design Session</td>
                    <td>Team Meeting</td>
                    <td>Open Lab</td>
                </tr>
            </tbody>
        </table>
```

**How `colspan` and `rowspan` work:**

`colspan="2"` means this cell takes the space of **2 columns**:
```
|      Cell A (colspan=2)     | Cell C |
| (takes column 1 AND column 2)|       |
```

`rowspan="2"` means this cell takes the space of **2 rows**:
```
| Cell A | Cell B |
|        |        |  ← "Afternoon" appears in both rows
| (rowspan=2)     |
```

When you use `colspan="2"`, you must **remove one `<td>`** from that row (because the merged cell already takes that space).

### Task 3: Style the Table with CSS
Add these rules to `css/style.css`:

```css
/* Table styling */
table {
    width: 100%;
    border-collapse: collapse;   /* Removes double borders */
    margin-bottom: 30px;
    background-color: white;
}

caption {
    font-size: 18px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 10px;
    text-align: left;
}

th, td {
    border: 1px solid #dddddd;
    padding: 10px 12px;
    text-align: left;
}

/* Header row styling */
thead th {
    background-color: #2c3e50;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;
}

/* Alternating row colors (zebra stripes) */
tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

/* Hover effect on rows */
tbody tr:hover {
    background-color: #eaf2f8;
}
```

**New CSS properties explained:**
- `border-collapse: collapse` — merges adjacent cell borders into one clean line
- `nth-child(even)` — selects every even-numbered row (2nd, 4th, 6th...) for the zebra-stripe effect
- `text-align: left` — aligns text to the left (default for `<th>` is center)

Save all files and preview. Your tables should now have:
- Clean single-line borders
- Dark header row with white text
- Alternating light gray and white rows
- Blue highlight when you hover over a row

## Starter Files
- `club-website` folder from previous sessions
- `css/style.css` with all previous CSS rules
- Navigation header/nav/footer structure from Session 6

## Expected Result

**Table 1 — Members List:**
```
Active Members — Spring 2025
┌─────┬──────────────┬────────────────────┬──────┐
│ No. │ Name         │ Major              │ Year │
├─────┼──────────────┼────────────────────┼──────┤
│  1  │ Nguyen Van A │ Computer Science   │ 2nd  │  ← white bg
│  2  │ Tran Thi B   │ Information Systems│ 3rd  │  ← light gray bg
│  3  │ Le Van C     │ Digital Media      │ 1st  │  ← white bg
│  4  │ Pham Thi D   │ Computer Science   │ 2nd  │  ← light gray bg
└─────┴──────────────┴────────────────────┴──────┘
```

**Table 2 — Weekly Schedule (with colspan and rowspan):**
```
Club Room Schedule — Week 12
┌───────────────┬───────────────────┬────────────────┬────────────────┐
│ Time          │ Monday            │ Wednesday      │ Friday         │
├───────────────┼───────────────────┼────────────────┼────────────────┤
│ 9:00 - 10:00  │ HTML Workshop     │ CSS Workshop   │ JS Workshop    │
├───────────────┼───────────────────┴────────────────┤                │
│ 10:00 - 11:00 │ Club Meeting (all members)         │ Free Practice  │
│               ├────────────────────┬───────────────┼────────────────┤
│ Afternoon     │ Project Work       │ Guest Speaker │ Code Review    │
│ (rowspan=2)   ├────────────────────┼───────────────┼────────────────┤
│               │ Design Session     │ Team Meeting  │ Open Lab       │
└───────────────┴────────────────────┴───────────────┴────────────────┘
```

## Self-Check (answers included)

Answer from **your own `tables.html`** first, then open the arrow.

<details>
<summary>1. What is the real difference between `<th>` and `<td>`? "Bold and centred" is not the answer.</summary>

`<th>` declares that the cell is a **header for other cells**. `<td>` is ordinary
data. Bold and centred is just the browser's default styling of that meaning —
and you overrode it with `text-align: left` in Task 3 without losing the meaning.

What the meaning buys you: a screen reader reading cell "3rd" in a large table can
announce **"Year: 3rd"**, because it knows which header governs that column. With
`<td>` everywhere, the user hears a stream of disconnected values and has to
count columns to work out what each one is.

For a table with headers down the side as well as across the top, be explicit:

```html
<th scope="col">Name</th>   <!-- heads a column -->
<th scope="row">9:00</th>   <!-- heads a row -->
```

</details>

<details>
<summary>2. Your `colspan="2"` row is one cell too wide and the table looks ragged. What is the counting rule?</summary>

Every row must total the same number of columns, where a cell contributes its
`colspan` (default 1).

If the table is 4 columns wide:

- Normal row: 4 cells × 1 = 4. ✅
- Row with one `colspan="2"`: that cell counts as 2, so you need **3 cells**
  (2 + 1 + 1 = 4), not 4. ✅
- Keeping all 4 cells gives 2 + 1 + 1 + 1 = 5, and the table grows a phantom
  column. ❌

`rowspan` works the same way downward: a cell with `rowspan="2"` occupies its
column in the **next** row too, so that next row must omit one cell.

Fastest way to find the error: add `table, th, td { border: 1px solid red; }`
temporarily. The ragged row becomes obvious instantly.

</details>

<details>
<summary>3. Why must you never use a table for page layout, when it clearly can produce columns?</summary>

Three concrete reasons, not a matter of taste:

1. **It lies about the content.** A screen reader announces "table with 3 columns,
   12 rows" and offers cell-by-cell navigation — for something that is not data.
2. **It cannot reflow.** A table's columns are locked side by side. On a phone the
   whole page must shrink or scroll sideways. Flexbox (Session 5) and media
   queries (Session 15) exist precisely because tables could not do this.
3. **It is unmaintainable.** Changing a table layout means restructuring HTML.
   Changing a flex layout means editing one CSS line.

Correct rule: a table is for **data with rows and columns** — a schedule, a member
list, a price comparison. If your content has no rows and columns, it is not a
table.

</details>

<details>
<summary>4. Challenge — no code given: build a 3-column "Membership Fees" table with a caption, a header row, three data rows, and a footer row that spans the first two columns to show the total. Write it yourself first.</summary>

```html
<table>
    <caption>Membership Fees — Spring 2025</caption>
    <thead>
        <tr>
            <th scope="col">Item</th>
            <th scope="col">Notes</th>
            <th scope="col">Fee (VND)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Annual membership</td>
            <td>Covers all workshops</td>
            <td>200,000</td>
        </tr>
        <tr>
            <td>Club T-shirt</td>
            <td>Optional</td>
            <td>150,000</td>
        </tr>
        <tr>
            <td>Competition entry</td>
            <td>Per event</td>
            <td>50,000</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th colspan="2" scope="row">Total if you take everything</th>
            <td>400,000</td>
        </tr>
    </tfoot>
</table>
```

Check three things in your version:

1. The `<tfoot>` row has **two** cells, not three — `colspan="2"` already covers
   the first two columns.
2. `<tfoot>` is a real element and belongs with `<thead>`/`<tbody>`. It is for
   summary rows exactly like this one.
3. `<caption>` comes **first**, immediately after `<table>`. Put it anywhere else
   and the browser will move or drop it.

</details>

## Checklist
- [ ] Created `tables.html` in the `club-website` folder
- [ ] Built a basic table with `<table>`, `<tr>`, `<th>`, `<td>`
- [ ] Used `<thead>` and `<tbody>` to organize the table
- [ ] Added a `<caption>` to describe the table
- [ ] Used `colspan` to merge a cell across 2 columns
- [ ] Used `rowspan` to merge a cell across 2 rows
- [ ] Added CSS table styles: `border-collapse`, header colors, zebra stripes
- [ ] Hover effect works on table rows

## Tips
- Always use `<th>` for header cells — they are bold and centered by default, and screen readers know they are headers.
- When using `colspan="2"`, the row must have one fewer `<td>` than usual. Count carefully!
- `border-collapse: collapse` is almost always used for data tables. Without it, cells get double borders.
- Tables should be used for **data** (like schedules, member lists, prices). Never use tables for page layout.
