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

<!-- HW-BRIEF:START -->
## Detailed Brief — Read This First

### What you are actually building

This week you lay the ground the whole semester stands on: a real project folder. From now on the course runs on **two separate trees** in your repository, and mixing them up is the most common way students lose marks.

### Why this homework exists

- `project/` is your Student Club Website — the capstone you add features to every week and submit at the end of term. `homework/session-NN/` is throwaway practice for that week only. Grading looks at specific paths, so a page parked in the wrong tree simply does not exist for the grader.
- Flat structure at the project root (all pages beside each other, only `css/` and `images/` as subfolders) means every internal link is a plain file name with no `../` to get wrong.
- Lowercase-with-hyphens naming is not pedantry: Linux servers treat `About.html` and `about.html` as different files, and your links break the moment you deploy.

### What “done” looks like

Your tree should look like the reference in Task 1: three working pages at the project root, two empty-but-present asset folders, nothing else. Compare against the live visual target on the website page.

### How to work through it

1. **Create the tree (5 min).** Make `project/` with `index.html`, `about.html`, `contact.html`, plus `project/css/` and `project/images/`.
2. **Write the three stubs (20 min).** Each page gets the full HTML5 boilerplate, one `<h1>`, and the short content Task 1 describes. Invent a club name now — you will keep it until Week 16.
3. **Apply the naming rules (5 min).** Lowercase, hyphens not spaces, no accents in file names. Rename anything that fails before you link to it.
4. **Images — after Session 3 (10 min).** Task 2 needs `<img>`, which is taught next session. Do Task 1 now, come back to Task 2 after class 3; the sheet is due after that class.
5. **Check paths, not looks (5 min).** Open each page from the file system and confirm the images load from `images/…` relative paths.

### Where students lose marks

- Putting homework pages inside `project/` — the capstone tree must stay clean.
- `About Us.html` or `Trang chủ.html`: spaces and diacritics in file names.
- Linking with `../images/x.png` from a root-level page: there is no parent to climb to.

### Files this homework must produce

- `project/index.html`
- `project/about.html`
- `project/contact.html`
- `project/css/`
- `project/images/` (2+ image files)

### How to hand it in

This homework has two halves, handed in together and marked separately: **Part 1 code (10 points)** and **Part 2 video (4 points)**. Online submission is not enabled yet, so your own Git repository is the submission.

**Part 1 — the code**

1. Make sure every file listed above exists at exactly that path — the grader looks up files by path, and a page parked somewhere else simply does not exist for it.
2. Stage the work: `git add homework/session-02/ project/` (add only what this session touched).
3. Commit with a message that says what changed: `git commit -m "HW2: <short summary>"`.
4. Push: `git push`. A commit that stayed on your laptop is not a submission.

**Part 2 — the video**

1. Record 60–120 seconds in OBS Studio (<https://obsproject.com>): screen shared the whole time, your voice required, name and student ID stated or visible at the start.
2. Present ONE part of this homework, not all of it. For this session: show your project folder tree, explain why the site lives in `project/` while practice lives in `homework/session-02/`, and what `css/` and `images/` are reserved for.
3. Upload the MP4 (720p or higher) to **your own Google Drive** and set sharing to **“Anyone with the link → Viewer”**.
4. Open `homework/submissions.md` in your repository and add one line: `- Session 02 — (paste your Google Drive link here)`.
5. Commit and push that file together with the rest of the homework. A missing, private or dead link means the video cannot be graded.

**Before you push**

1. Tick the requirements checklist under Requirements, item by item, against the actual file rather than from memory.
2. Open the self-check tool (`site/cham-bai.html`), pick session 2, point it at your repository folder or paste your code, and fix what it flags. It reports AUTO / MANUAL / BLOCKED — AUTO is what a machine confirmed, MANUAL is still your lecturer's call.
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
