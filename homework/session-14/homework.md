# Homework 14: CSS Dropdown Navigation

## Due Date
Sunday, 23:59 (Week 15)

## Objective
- Build an interactive dropdown menu with pure HTML and CSS
- Understand how modern sites replaced the legacy Spry widgets with `:hover` CSS
- Add an interactive element to your club website

## Requirements

### Task 1: Add a Dropdown Menu to Your Navigation
Create a dropdown navigation menu using HTML and CSS only — no JavaScript needed.

**Add a dropdown to your nav** (paths shown for `project/index.html` in the site root):

```html
<nav>
  <ul class="menu">
    <li><a href="index.html">Home</a></li>
    <li class="dropdown">
      <a href="about.html">About</a>
      <ul class="dropdown-content">
        <li><a href="about.html#mission">Our Mission</a></li>
        <li><a href="about.html#activities">Activities</a></li>
        <li><a href="about.html#gallery">Gallery</a></li>
      </ul>
    </li>
    <li><a href="activities.html">Activities</a></li>
    <li><a href="media.html">Media</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
```

**CSS for the dropdown:**
```css
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
}

.dropdown:hover .dropdown-content {
  display: block;
}
```

> This is exactly the menu pattern Session 14 teaches as the modern replacement
> for the retired Spry Menu Bar — `:hover` on the parent `<li>` shows the child `<ul>`.

### Task 2: Style and Integrate the Menu
Add the dropdown CSS to your stylesheet and update the navigation on all pages.

**Your CSS must include:**
- Dropdown container styling (`position: relative` on the parent `<li>`)
- Dropdown content hidden by default
- Show dropdown on hover
- Style dropdown links (padding, hover color change)
- Smooth transition effect

**Your HTML updates must include:**
- Updated nav on at least 2 pages with the dropdown structure
- Correct links inside the dropdown (use your own pages and anchors)

### Task 3: Add a "Back to Top" Button (Bonus)
Add a simple "Back to Top" button to your pages.

**Minimum implementation (HTML + CSS):**
```html
<a href="#top" class="back-to-top">Back to Top</a>
```

```css
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #2c3e50;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 5px;
}
```

Add `id="top"` to your `<header>` element so the link scrolls back up.

**File paths:**
- `project/css/style.css` (dropdown + button styles)
- At least 2 HTML files (updated navigation)

<!-- HW-BRIEF:START -->
## Detailed Brief — Read This First

### What you are actually building

Navigation upgrades itself: a dropdown menu built in pure CSS — a sub-menu that appears on hover, positioned precisely, and styled to sit above the page content.

### Why this homework exists

- This is the week CSS positioning stops being abstract. `position: relative` on the parent plus `position: absolute` on the child is the pattern behind tooltips, modals and menus in every real interface.
- Showing and hiding with `display`/`visibility` on `:hover` teaches you state-based styling — the same mechanism behind `:focus` and `:active`.
- `z-index` and stacking contexts explain why your dropdown sometimes hides *behind* content. Learn it here, not in the final.
- Bonus Task 3 (“back to top”) is deliberately optional: attempt it only once the dropdown is solid.

### What “done” looks like

Live visual target: hovering a parent item reveals a boxed sub-menu directly beneath it, flush-left with the parent, with a small transition, and it never disappears behind the main column.

### How to work through it

1. **Structure the markup (15 min).** Nested list: `<nav>` → `<ul>` → `<li>` → (`<a>` + a nested `<ul>` for children). The nested list is the sub-menu.
2. **Hide it (5 min).** Child `<ul>` gets `position: absolute`, `top: 100%`, `left: 0`, `display: none`.
3. **Anchor it (10 min).** Parent `<li>` gets `position: relative` so the absolute child positions against it, not the page.
4. **Reveal on hover (10 min).** `nav li:hover > ul { display: block; }`. Hover and confirm the box appears exactly under its parent.
5. **Style the box (15 min).** Background, border, padding, item spacing, hover colour on links, `z-index` above the main content.
6. **Test the gaps (10 min).** Move the mouse diagonally from parent to child: no flicker, no disappearing menu. Adjust padding to close dead zones.

### Where students lose marks

- Absolute child with no relatively positioned ancestor — the menu flies to the page corner.
- `display: none` toggled by `opacity` alone: invisible but still clickable, so it steals hover from content below.
- Applying the dropdown to only one page and losing nav consistency.

### Files this homework must produce

- `project/css/style.css`
- At least 2 HTML files (updated navigation)

### How to hand it in

This homework has two halves, handed in together and marked separately: **Part 1 code (10 points)** and **Part 2 video (4 points)**. Online submission is not enabled yet, so your own Git repository is the submission.

**Part 1 — the code**

1. Make sure every file listed above exists at exactly that path — the grader looks up files by path, and a page parked somewhere else simply does not exist for it.
2. Stage the work: `git add homework/session-14/ project/` (add only what this session touched).
3. Commit with a message that says what changed: `git commit -m "HW14: <short summary>"`.
4. Push: `git push`. A commit that stayed on your laptop is not a submission.

**Part 2 — the video**

1. Record 60–120 seconds in OBS Studio (<https://obsproject.com>): screen shared the whole time, your voice required, name and student ID stated or visible at the start.
2. Present ONE part of this homework, not all of it. For this session: show the dropdown menu and explain how `:hover` on the list item reveals the hidden sub-menu, and what `position: absolute` does there.
3. Upload the MP4 (720p or higher) to **your own Google Drive** and set sharing to **“Anyone with the link → Viewer”**.
4. Open `homework/submissions.md` in your repository and add one line: `- Session 14 — (paste your Google Drive link here)`.
5. Commit and push that file together with the rest of the homework. A missing, private or dead link means the video cannot be graded.

**Before you push**

1. Tick the requirements checklist under Requirements, item by item, against the actual file rather than from memory.
2. Open the self-check tool (`site/cham-bai.html`), pick session 14, point it at your repository folder or paste your code, and fix what it flags. It reports AUTO / MANUAL / BLOCKED — AUTO is what a machine confirmed, MANUAL is still your lecturer's call.
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
For this session, the easiest good choice is to **show the dropdown menu and explain how `:hover` on the list item reveals the hidden sub-menu, and what `position: absolute` does there**.

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
   `- Session 14 — <your Google Drive link>`
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
- Commit: `git commit -m "HW14: Add interactive dropdown menu"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Menu structure | 3 | Dropdown HTML is properly structured |
| CSS styling | 3 | Dropdown shows on hover, links styled |
| Integration | 2 | Dropdown works within existing navigation |
| Back to top | 1 | Button exists and links to top |
| Code quality | 1 | Clean, well-commented code |
| **Total** | **10** | |

## Tips
- The key to CSS dropdowns is `display: none` by default and `display: block` on `:hover`
- Use `position: relative` on the parent `<li>` and `position: absolute` on the dropdown `<ul>`
- If the dropdown goes off-screen, adjust `left` or `right` values

## Example Output
When you hover over the "About" menu item, a dropdown should appear showing sub-links like "Our Mission," "Activities," and "Gallery." The dropdown should disappear when you move your mouse away.
