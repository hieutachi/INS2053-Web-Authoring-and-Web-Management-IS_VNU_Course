# Homework 11: Polish Your Compact Site

## Due Date
Sunday, 23:59 (Week 12)

## Objective
- Refine your website into a polished, professional-looking project
- Review and improve content quality across all pages
- Write a README file to document your project

## Requirements

### Task 1: Polish All Pages
Review your entire site and make improvements for a professional look.

**Go through each page and check:**
- Are there at least 3-5 pages total? (Home, About, Contact, Schedule, Media)
- Is the content well-written with no spelling/grammar errors?
- Are all images loading and properly sized?
- Do all navigation links work on every page?
- Is the layout consistent across all pages?
- Does the CSS look clean and professional?

**Improvements to make:**
- Fix any broken images or links
- Ensure consistent heading styles on every page
- Add smooth transitions or hover effects where appropriate
- Make sure the footer looks the same on every page

### Task 2: Add a Favicon
Add a small icon (favicon) to your website.

- Create or find a small square image (16x16 or 32x32 pixels)
- Save it as `favicon.ico` or `favicon.png` in the `images/` folder
- Add this link in the `<head>` of every HTML page:
  - Every page sits at the project root, so the same line works on all five:
```html
<link rel="icon" href="images/favicon.png" type="image/png">
```

### Task 3: Write a README File
Create a README file that documents your project.

**Create the file:** `project/README.md`

**Your README must include:**
- Project title (your club name)
- A brief description of what the site is about (2-3 sentences)
- A list of pages in the site (e.g., Home, About, Contact, Schedule, Media)
- A list of technologies used (HTML5, CSS3, Google Fonts)
- Instructions on how to open the site locally
- Your name and student ID

**Example README:**
```markdown
# Student Club Website

A website for the [Club Name] at VNU-IS.

## Pages
- Home (index.html)
- About (about.html)
- Activities (activities.html)
- Media (media.html)
- Contact (contact.html)

## Technologies
- HTML5
- CSS3
- Google Fonts

## How to Run
Open `index.html` in any web browser.

## Author
[Your Name] - [Student ID]
```

**File paths:**
- `project/README.md` (new file)
- `project/index.html` (polish + favicon)
- `project/about.html` (polish + favicon)
- `project/activities.html` (polish + favicon)
- `project/media.html` (polish + favicon)
- `project/contact.html` (polish + favicon)
- `project/css/style.css` (final polish)

<!-- HW-BRIEF:START -->
## Detailed Brief — Read This First

### What you are actually building

Compact-site week: you take what you have and bring it up to release quality — every page consistent, favicon in place, and a README that lets a stranger run the site.

### Why this homework exists

- Polish is a gradeable skill: consistent spacing, aligned components, no orphan pages, no placeholder text. It is the difference between coursework and a portfolio piece.
- A favicon is a one-line `<link>` that changes how professional the tab looks — and forgetting it produces the noisy 404 in the console.
- A README is how anyone (including future you, and any employer who finds the repo) understands what the project is, what it needs, and how to open it.

### What “done” looks like

Live visual target plus a console check: no red errors, favicon visible in the tab, all five pages visually consistent, and `README.md` rendering as a proper page on GitHub.

### How to work through it

1. **Audit first (15 min).** Open all pages side by side and list every inconsistency: heading sizes, spacing, colours, missing nav items. Fix the list, not the mood.
2. **Polish the pages (20 min).** Apply the fixes in `css/style.css` so all pages benefit at once.
3. **Add the favicon (10 min).** A 32×32 ICO/PNG in `project/images/`, then `<link rel="icon" href="images/favicon.ico">` in the `<head>` of every page.
4. **Write the README (20 min).** `project/README.md` with the four required sections: what the site is, the page list, the technologies used, how to run it, and author credit.
5. **Final crawl (10 min).** Visit every page, open DevTools, confirm zero 404s and zero console errors.

### Where students lose marks

- Favicon linked in only one page.
- A README that is three lines of prose — the rubric wants named sections.
- Fixing one page's spacing directly in that page instead of in shared CSS.

### Files this homework must produce

- `project/README.md`
- `project/index.html`
- `project/about.html`
- `project/activities.html`
- `project/media.html`
- `project/contact.html`
- `project/css/style.css`
- `project/images/favicon.ico`

### How to hand it in

This homework has two halves, handed in together and marked separately: **Part 1 code (10 points)** and **Part 2 video (4 points)**. Online submission is not enabled yet, so your own Git repository is the submission.

**Part 1 — the code**

1. Make sure every file listed above exists at exactly that path — the grader looks up files by path, and a page parked somewhere else simply does not exist for it.
2. Stage the work: `git add homework/session-11/ project/` (add only what this session touched).
3. Commit with a message that says what changed: `git commit -m "HW11: <short summary>"`.
4. Push: `git push`. A commit that stayed on your laptop is not a submission.

**Part 2 — the video**

1. Record 60–120 seconds in OBS Studio (<https://obsproject.com>): screen shared the whole time, your voice required, name and student ID stated or visible at the start.
2. Present ONE part of this homework, not all of it. For this session: show your `README.md` and favicon, and explain what each README section promises a visitor and how the favicon is wired into the pages.
3. Upload the MP4 (720p or higher) to **your own Google Drive** and set sharing to **“Anyone with the link → Viewer”**.
4. Open `homework/submissions.md` in your repository and add one line: `- Session 11 — (paste your Google Drive link here)`.
5. Commit and push that file together with the rest of the homework. A missing, private or dead link means the video cannot be graded.

**Before you push**

1. Tick the requirements checklist under Requirements, item by item, against the actual file rather than from memory.
2. Open the self-check tool (`site/cham-bai.html`), pick session 11, point it at your repository folder or paste your code, and fix what it flags. It reports AUTO / MANUAL / BLOCKED — AUTO is what a machine confirmed, MANUAL is still your lecturer's call.
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
For this session, the easiest good choice is to **show your `README.md` and favicon, and explain what each README section promises a visitor and how the favicon is wired into the pages**.

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
   `- Session 11 — <your Google Drive link>`
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
- Commit: `git commit -m "HW11: Polish site and add README"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Page count | 1 | Has 3-5 pages |
| Content quality | 2 | Well-written, no errors, good images |
| Navigation | 2 | All links work across all pages |
| Visual polish | 2 | Consistent, professional appearance |
| Favicon | 1 | Favicon shows in browser tab |
| README | 2 | Has all required sections |
| **Total** | **10** | |

## Tips
- Read your content aloud to catch spelling and grammar errors
- Open each page in the browser and click every link to test them
- A good README helps others understand your project

## Example Output
Your site should feel like a complete, finished product — clean, consistent, and professional. The browser tab should show your favicon. Anyone reading the README should understand what your project is about.
