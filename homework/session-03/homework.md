# Homework 3: Building the About Page

## Due Date
Sunday, 23:59 (Week 4)

## Objective
- Practice using heading levels, paragraphs, and lists
- Learn how to add images with meaningful alt text
- Build rich content using semantic HTML elements

## Requirements

### Task 1: Enhance the About Page
Update your `project/about.html` file to make it a complete, rich content page about your Student Club.

**Your About page must include:**

1. **Headings:** Use at least 3 different heading levels:
   - `<h1>` for the club name
   - `<h2>` for section titles (e.g., "Our Mission", "Our Activities")
   - `<h3>` for sub-sections (e.g., "Weekly Events")

2. **Paragraphs:** At least 3 paragraphs covering:
   - What your club is about (purpose)
   - Who can join (membership)
   - Why someone should join (benefits)

3. **Lists:** At least 2 different lists:
   - An unordered list (`<ul>`) of at least 5 club activities or events
   - An ordered list (`<ol>`) of at least 3 steps (e.g., "How to Join")

4. **Images:** At least 2 images with descriptive alt text:
   - One image representing your club
   - One image showing an activity or event (can be any relevant photo)
   - Each `<img>` must have a meaningful `alt` attribute (not empty, not "image")

### Task 2: Add an Image Gallery Section
Create a section with the heading `<h2>Photo Gallery</h2>` that contains at least 3 images arranged in a simple layout.

- Each image must have a different `alt` text describing what it shows
- Add a short `<p>` caption below each image

**File path:** `project/about.html`

**Requirements checklist:**
- [ ] Uses h1, h2, and h3 headings
- [ ] Has 3+ paragraphs
- [ ] Has 1 unordered list with 5+ items
- [ ] Has 1 ordered list with 3+ items
- [ ] Has 2+ images with descriptive alt text
- [ ] Has a photo gallery section with 3+ images and captions

<!-- HW-BRIEF:START -->
## Detailed Brief — Read This First

### What you are actually building

Your About page stops being a note and becomes a page: real heading hierarchy, lists that scan, and photographs that still say something when they fail to load.

### Why this homework exists

- Heading levels are structure, not size. An `<h3>` used because it looks small confuses screen readers and search engines, and costs you the structure points in the rubric.
- Lists are the cheapest way to make content readable: unordered for things with no order (club activities), ordered for steps or rankings.
- `alt` text is not decoration. It is what a blind visitor hears, what shows while an image is missing, and what Google indexes. A descriptive alt is a graded requirement, not a suggestion.
- Relative paths are the reason your site works locally and dies after upload. Getting them right here, once, saves every later session.

### What “done” looks like

Compare with the live visual target: title, intro paragraph, three heading levels, one bulleted list, one numbered list, then a gallery of at least three images each with a caption. Text flows top to bottom in one column — no CSS yet.

### How to work through it

1. **Re-open last week's page (1 min).** Edit `project/about.html` in place. Do not start a new file; this page grows every week.
2. **Build the outline (10 min).** `<h1>` club/page title → `<h2>` section → `<h3>` subsection, each followed by its paragraph.
3. **Add the two lists (10 min).** One `<ul>` with 5+ items, one `<ol>` with 3+ items. Keep list items short.
4. **Drop in images (15 min).** Put files in `project/images/`, reference them with `<img src="images/ten-file.jpg" alt="mô tả những gì trong ảnh">` plus `width`/`height`.
5. **Build the gallery (10 min).** Three or more images, each with a visible caption, inside a section headed `<h2>`.
6. **Alt-text pass (5 min).** Read your page aloud using only the alt texts. If a listener cannot picture the page, rewrite them.

### Where students lose marks

- `alt="image"` or `alt="photo"` — says nothing, scores zero on the alt criterion.
- `src="/images/x.jpg"` (leading slash = absolute from the web root) instead of `src="images/x.jpg"`.
- Skipping heading levels (`h1` → `h3`) to get a smaller font.

### Files this homework must produce

- `project/about.html`
- `project/images/` (new image files)

### How to hand it in

This homework has two halves, handed in together and marked separately: **Part 1 code (10 points)** and **Part 2 video (4 points)**. Online submission is not enabled yet, so your own Git repository is the submission.

**Part 1 — the code**

1. Make sure every file listed above exists at exactly that path — the grader looks up files by path, and a page parked somewhere else simply does not exist for it.
2. Stage the work: `git add homework/session-03/ project/` (add only what this session touched).
3. Commit with a message that says what changed: `git commit -m "HW3: <short summary>"`.
4. Push: `git push`. A commit that stayed on your laptop is not a submission.

**Part 2 — the video**

1. Record 60–120 seconds in OBS Studio (<https://obsproject.com>): screen shared the whole time, your voice required, name and student ID stated or visible at the start.
2. Present ONE part of this homework, not all of it. For this session: show one image you added to the gallery and explain what `src`, `alt` and `width`/`height` each do, and what happens if each one is missing.
3. Upload the MP4 (720p or higher) to **your own Google Drive** and set sharing to **“Anyone with the link → Viewer”**.
4. Open `homework/submissions.md` in your repository and add one line: `- Session 03 — (paste your Google Drive link here)`.
5. Commit and push that file together with the rest of the homework. A missing, private or dead link means the video cannot be graded.

**Before you push**

1. Tick the requirements checklist under Requirements, item by item, against the actual file rather than from memory.
2. Open the self-check tool (`site/cham-bai.html`), pick session 3, point it at your repository folder or paste your code, and fix what it flags. It reports AUTO / MANUAL / BLOCKED — AUTO is what a machine confirmed, MANUAL is still your lecturer's call.
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
For this session, the easiest good choice is to **show one image added to the gallery in your About page and explain what the `src`, `alt` and width/height attributes each do**.

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
   `- Session 03 — <your Google Drive link>`
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
- Add changes: `git add project/about.html`
- Commit: `git commit -m "HW3: Enhance About page with rich content"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Heading hierarchy | 2 | Uses h1, h2, h3 correctly |
| Paragraphs | 2 | Has 3+ well-written paragraphs |
| Lists | 2 | Has both ordered and unordered lists |
| Images + alt text | 3 | Images load, alt text is descriptive |
| Photo gallery | 1 | Has gallery section with captions |
| **Total** | **10** | |

## Tips
- Headings should follow a logical order: don't skip from h1 to h3
- Alt text should describe what the image shows (e.g., "Students working together on a coding project")
- Use your own images or free images from sites like Unsplash or Pixabay
- Because `about.html` sits at the project root next to `index.html`, image paths are plain:
  `images/logo.png` — no `../`

## Example Output
Your About page should look like a detailed club profile with sections, lists of activities, and photos. A visitor should be able to learn everything about your club from this page alone.
