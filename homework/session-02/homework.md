# Homework 2: Setting Up Your Project Folder

## Due Date
Sunday, 23:59 (Week 3)

## Objective
- Learn how to organize files in a proper project structure
- Understand file naming conventions for web projects
- Create your working project folder that you will use throughout the semester

## Requirements

### Task 1: Create the Project Folder Structure
Set up a clean folder structure for your Student Club Website project. This structure will be used for the rest of the course.

**Create the following folders and files:**
```
project/
  index.html
  about.html
  contact.html
  images/
    (folder for your images)
  css/
    (folder for your stylesheets — leave empty for now)
```

> **This flat structure is the one that gets graded.** `project/spec.md` and every project
> milestone expect all five pages at the project root — `index.html`, `about.html`,
> `activities.html`, `media.html`, `contact.html` — with only `css/` and `images/` as
> subfolders. You will add `activities.html` and `media.html` in later homework. Keeping
> pages at the root also means every link is a plain file name with no `../`.

**Naming rules you MUST follow:**
- All folder names: lowercase letters only, no spaces
- All file names: lowercase letters only, use hyphens (-) instead of spaces
- Example: `about-us.html` is correct, `About Us.html` is WRONG

**What each file should contain:**

1. `project/index.html` — A simple home page for your club website:
   - HTML5 structure
   - A welcome heading (`<h1>`) with your club name (make one up, e.g., "Coding Club" or "Book Lovers Club")
   - A short paragraph welcoming visitors
   - A list of 3 things your club does

2. `project/about.html` — A simple about page:
   - HTML5 structure
   - A heading with "About [Club Name]"
   - A paragraph about the club (3-4 sentences)

3. `project/contact.html` — A simple contact page:
   - HTML5 structure
   - A heading "Contact Us"
   - A paragraph with an email address (use a fake email)

### Task 2: Add at Least 2 Images *(do this part after Session 3, when `<img>` is taught)*
- Place at least 2 images in the `images/` folder (any image you have the right to use; a simple placeholder from Paint is fine)
- Reference them from `index.html` using relative paths
- Every `<img>` tag must have an `alt` attribute

> `<img>` and `alt` are taught in Session 3. This homework is due after that
> class, so by the deadline you will have covered it — but if you sit down to
> work before Session 3, do Task 1 first and come back to this one.

**File paths to verify:**
- `project/index.html`
- `project/about.html`
- `project/contact.html`
- `project/images/` (with at least 2 image files)

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
For this session, the easiest good choice is to **show your project folder tree and explain why the site lives in `project/` and the homework in `homework/session-02/`, and what each subfolder (`css/`, `images/`) is reserved for**.

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
   `- Session 02 — <your Google Drive link>`
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
- Add all new files: `git add project/`
- Commit: `git commit -m "HW2: Set up project folder structure"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Folder structure | 3 | All folders exist with correct naming |
| index.html | 2 | Has club name, welcome text, list, images |
| about.html | 1 | Has heading and description paragraph |
| contact.html | 1 | Has heading and contact information |
| Image handling | 2 | 2+ images with alt text, correct relative paths |
| File naming | 1 | All lowercase, no spaces, correct conventions |
| **Total** | **10** | |

## Tips
- Always use relative paths like `images/photo.jpg` instead of full paths like `C:/Users/...`
- Double-check that every folder and file name uses only lowercase letters and hyphens
- Your `images/` folder must sit inside `project/` so paths work correctly

## Example Output
When you open `index.html` in a browser, you should see a club homepage with images and text. The about and contact pages sit beside it at the project root and load from plain file-name links.
