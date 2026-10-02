# Homework 6: Build Your 3-Page Mini-Site

## Due Date
Sunday, 23:59 (Week 7)

## Objective
- Connect all pages with a shared navigation menu
- Maintain consistent layout across multiple pages
- Create a working multi-page website

## Requirements

### Task 1: Add Navigation to All 3 Pages
Update all three pages (index.html, about.html, contact.html) so they share the same navigation structure and layout.

**Every page must have:**
- The same `<header>` with the club name
- The same `<nav>` with links to: Home, About, Contact
- The same `<footer>` with copyright info
- The same `<main>` wrapper for content
- The same CSS stylesheet linked

**Navigation links are identical on every page** — all three files sit at the project root,
so every link is a plain file name:

```html
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
```

Copy this same block into all three pages, changing only which link gets `class="active"`.
No `../` anywhere.

### Task 2: Complete the Contact Page
Build out the `project/contact.html` page with full content:

- A heading "Contact Us"
- A paragraph inviting visitors to reach out
- A list of contact methods (email, phone, social media — use fake info)
- A paragraph with the club's meeting location/address
- At least 1 image

### Task 3: Improve the Home Page
Update `project/index.html` with richer content:

- A welcome section with an intro paragraph
- A "What We Do" section with a list of activities
- A "Why Join Us?" section with 3 benefits
- At least 2 images
- A "Latest News" or "Upcoming Events" section

**File paths:**
- `project/index.html`
- `project/about.html`
- `project/contact.html`
- `project/css/style.css`

**Requirements checklist:**
- [ ] All 3 pages have the same header, nav, and footer
- [ ] Navigation links work correctly from every page
- [ ] Contact page has full content
- [ ] Home page has multiple sections
- [ ] CSS is linked on all pages
- [ ] Layout is consistent across all pages

<!-- HW-BRIEF:START -->
## Detailed Brief — Read This First

### What you are actually building

Three pages finally become one site. You wire them together with the same navigation on every page, finish the Contact page, and give the home page something worth landing on.

### Why this homework exists

- Navigation is the product. A visitor who cannot leave a page leaves the site. Identical markup on every page is what makes a site feel like one place.
- Relative links are the skill this week really tests: `href="about.html"` between siblings, and why `../` would be wrong at the project root.
- Highlighting the current page (an `active` class on the matching item) is the difference between a menu and a map.

### What “done” looks like

In the live visual target, click around: the same header, nav and footer on all three pages, every link lands, the current page is visibly marked, and the home page shows several distinct sections.

### How to work through it

1. **Write the menu once (10 min).** Build the `<ul>` nav in `index.html`, then copy the exact block into `about.html` and `contact.html` — same order, same classes.
2. **Point the links (10 min).** `index.html`, `about.html`, `contact.html` as plain sibling file names. Click every link from every page before moving on.
3. **Mark the current page (5 min).** Add `class="active"` to the matching `<li>` on each page and style it in CSS.
4. **Finish the contact page (15 min).** Real content per Task 2: heading, intro, address block, email written as text (the form comes in Week 13).
5. **Build up the home page (15 min).** Several sections per Task 3 — welcome, highlights, what the club does — each with an `<h2>`.
6. **Full crawl (5 min).** Start at `index.html`, visit every page by clicking only, never the address bar. Any dead link is a failed requirement.

### Where students lose marks

- Menu written slightly differently on each page — inconsistent nav loses consistency points.
- `href="index.html"` everywhere including on index itself.
- Testing only one direction: links usually break on the page you did not think about.

### Files this homework must produce

- `project/index.html`
- `project/about.html`
- `project/contact.html`
- `project/css/style.css`

### How to hand it in

This homework has two halves, handed in together and marked separately: **Part 1 code (10 points)** and **Part 2 video (4 points)**. Online submission is not enabled yet, so your own Git repository is the submission.

**Part 1 — the code**

1. Make sure every file listed above exists at exactly that path — the grader looks up files by path, and a page parked somewhere else simply does not exist for it.
2. Stage the work: `git add homework/session-06/ project/` (add only what this session touched).
3. Commit with a message that says what changed: `git commit -m "HW6: <short summary>"`.
4. Push: `git push`. A commit that stayed on your laptop is not a submission.

**Part 2 — the video**

1. Record 60–120 seconds in OBS Studio (<https://obsproject.com>): screen shared the whole time, your voice required, name and student ID stated or visible at the start.
2. Present ONE part of this homework, not all of it. For this session: show the navigation menu on all three pages and explain how the same `<ul>` works everywhere and how the current page gets highlighted.
3. Upload the MP4 (720p or higher) to **your own Google Drive** and set sharing to **“Anyone with the link → Viewer”**.
4. Open `homework/submissions.md` in your repository and add one line: `- Session 06 — (paste your Google Drive link here)`.
5. Commit and push that file together with the rest of the homework. A missing, private or dead link means the video cannot be graded.

**Before you push**

1. Tick the requirements checklist under Requirements, item by item, against the actual file rather than from memory.
2. Open the self-check tool (`site/cham-bai.html`), pick session 6, point it at your repository folder or paste your code, and fix what it flags. It reports AUTO / MANUAL / BLOCKED — AUTO is what a machine confirmed, MANUAL is still your lecturer's call.
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
For this session, the easiest good choice is to **show the navigation menu on all three pages and explain how the same `<ul>` menu works on every page and how the current page is highlighted**.

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
   `- Session 06 — <your Google Drive link>`
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
- Commit: `git commit -m "HW6: Complete 3-page mini-site with navigation"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Navigation links | 3 | All links work correctly on all 3 pages |
| Consistent layout | 2 | Same header, nav, footer on every page |
| Contact page content | 2 | Has all required content elements |
| Home page content | 2 | Has multiple sections and images |
| Overall consistency | 1 | Site feels unified and professional |
| **Total** | **10** | |

## Tips
- Every page sits at the project root, so links are plain file names — if you find yourself typing `../`, something is in the wrong folder
- Test every link by clicking on it in the browser
- If a link breaks, check the relative path carefully

## Example Output
You should have a 3-page website where you can click between Home, About, and Contact pages. Every page should feel like part of the same site with matching design.
