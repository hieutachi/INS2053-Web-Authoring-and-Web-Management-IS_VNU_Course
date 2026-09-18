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
