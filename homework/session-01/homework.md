# Homework 1: My First Web Page

## Due Date
Sunday, 23:59 (Week 2)

## Objective
- Practise the HTML5 document structure until you can type it from memory
- Understand what each line of the boilerplate does
- Create the folder layout you will use for the rest of the course

## Requirements

### Task 1: Create Your Page

Build a page that introduces yourself to the class, using **only the tags taught in
Session 1**: `<h1>`, `<h2>`, `<p>`, and HTML comments.

**Your page must include:**
- The full HTML5 boilerplate — all five lines:
  `<!DOCTYPE html>`, `<html lang="en">`, `<meta charset="UTF-8">`,
  `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, `<title>`
- A `<title>` containing your own name (check it appears in the browser tab, not on the page)
- One `<h1>` with your name
- At least two `<p>` paragraphs: who you are, and one thing you want to build this semester
- One `<h2>` subheading with at least one paragraph under it
- At least one HTML comment (`<!-- ... -->`) labelling a region of your page

**File path:** create the file at

```
homework/session-01/index.html
```

### Task 2: Create the Folder Layout

Inside `homework/session-01/`, create two empty subfolders:

```
homework/session-01/
├── index.html
├── css/          <-- empty for now, you will use it in Session 4
└── images/       <-- empty for now, you will use it in Session 3
```

Git does not track empty folders, so put a file named `.gitkeep` (empty file, no
extension issues) inside each one so they survive the push.

**Requirements checklist:**
- [ ] All five boilerplate lines present
- [ ] `<title>` is your name and shows in the browser tab
- [ ] One `<h1>`, one `<h2>`, at least three `<p>` in total
- [ ] At least one HTML comment
- [ ] `css/` and `images/` exist
- [ ] Every opening tag has a closing tag
- [ ] Consistent indentation

<!-- HW-BRIEF:START -->
## Detailed Brief — Read This First

### What you are actually building

You have just opened VS Code for the first time. Before any styling, any image, any menu, every website on earth starts with the same thing: a plain HTML file that tells the browser who you are. This week you are not building a club site yet — you are building your **name card on the web**, the one page everyone in the class will open.

### Why this homework exists

- The five-line HTML5 boilerplate is the one piece of code you will type fifteen times this semester, plus twice in the practical exams. If it comes from copy-paste, every later session costs you minutes. If it comes from memory, it costs nothing.
- The folder layout you create today (`css/`, `images/`) is the layout every homework and the capstone assume. Renaming it later breaks links that work fine on your machine and die on the server.

### What “done” looks like

Open the sheet on the website and compare your page against the live reference under **“Visual target — what you are building”**: big bold name, two paragraphs of plain black text on white, one subheading, no styling at all. Plain is correct for Week 1 — a styled page this week means you spent time on the wrong thing.

### How to work through it

1. **Set up once (2 min).** Open the folder that holds your repository in VS Code (**File → Open Folder** — never a single file). Create `homework/session-01/` inside it.
2. **Type the skeleton (10 min).** Create `index.html`, then type the five boilerplate lines by hand — do not paste. Save, double-click the file, and confirm the browser tab shows your `<title>`.
3. **Fill in the content (15 min).** One `<h1>` with your name, two `<p>` about you, one `<h2>` with a paragraph under it. Add one `<!-- comment -->` naming a region of the page.
4. **Create the empty folders (2 min).** `css/` and `images/` inside `homework/session-01/`, each holding a `.gitkeep` file, otherwise Git forgets them.
5. **Self-check (5 min).** Every opening tag has a closing tag, indentation consistent, no stray text outside `<body>`. Then run the self-check tool before you push.

### Where students lose marks

- Pasting the boilerplate instead of typing it — you will regret this in the midterm, which is closed-internet.
- `<meta charset="UTF-8">` placed after `<title>`: your Vietnamese name renders as `Ã¡` garbage.
- Forgetting `.gitkeep`: the empty `css/` and `images/` folders vanish on push and the folder-layout points are lost.

### Files this homework must produce

- `homework/session-01/index.html`
- `homework/session-01/css/.gitkeep`
- `homework/session-01/images/.gitkeep`

### How to hand it in

This homework has two halves, handed in together and marked separately: **Part 1 code (10 points)** and **Part 2 video (4 points)**. Online submission is not enabled yet, so your own Git repository is the submission.

**Part 1 — the code**

1. Make sure every file listed above exists at exactly that path — the grader looks up files by path, and a page parked somewhere else simply does not exist for it.
2. Stage the work: `git add homework/session-01/ project/` (add only what this session touched).
3. Commit with a message that says what changed: `git commit -m "HW1: <short summary>"`.
4. Push: `git push`. A commit that stayed on your laptop is not a submission.

**Part 2 — the video**

1. Record 60–120 seconds in OBS Studio (<https://obsproject.com>): screen shared the whole time, your voice required, name and student ID stated or visible at the start.
2. Present ONE part of this homework, not all of it. For this session: open `homework/session-01/index.html`, explain what each of the five boilerplate lines does, then show where your `<title>` appears in the browser tab.
3. Upload the MP4 (720p or higher) to **your own Google Drive** and set sharing to **“Anyone with the link → Viewer”**.
4. Open `homework/submissions.md` in your repository and add one line: `- Session 01 — (paste your Google Drive link here)`.
5. Commit and push that file together with the rest of the homework. A missing, private or dead link means the video cannot be graded.

**Before you push**

1. Tick the requirements checklist under Requirements, item by item, against the actual file rather than from memory.
2. Open the self-check tool (`site/cham-bai.html`), pick session 1, point it at your repository folder or paste your code, and fix what it flags. It reports AUTO / MANUAL / BLOCKED — AUTO is what a machine confirmed, MANUAL is still your lecturer's call.
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
For this session, the easiest good choice is to **show `homework/session-01/index.html` and explain the job of each line of the five-line HTML5 boilerplate, then show where your `<title>` appears in the browser tab**.

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
   `- Session 01 — <your Google Drive link>`
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
- Save your files in the correct location
- Add your work to Git: `git add homework/session-01/`
- Commit with message: `git commit -m "HW1: Add first web page"`
- Push to your GitHub repository: `git push`

> New to Git? Session 2 teaches it properly. For this week, follow the three commands
> above exactly; if they fail, bring the error message to Session 2 and we fix it together.

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| HTML structure | 3 | Correct DOCTYPE, `<html>`, `<head>`, `<body>`, all tags closed and properly nested |
| Boilerplate completeness | 2 | All five lines present, `charset` before `title`, `lang` set |
| Content | 2 | Own words: h1, h2, and three or more paragraphs |
| Folder layout | 2 | `css/` and `images/` exist alongside `index.html` |
| Code cleanliness | 1 | Consistent indentation, at least one useful comment |
| **Total** | **10** | |

## Tips
- Type the boilerplate by hand rather than copying it. You will write it in all fifteen
  sessions, so it is worth knowing from memory.
- Save (`Ctrl+S`) before you reload the browser. Unsaved changes do not appear.
- Check the browser tab: if it still says "Untitled Document", your `<title>` is missing
  or is in the wrong place.
- Not yet required this week: images, links, `<hr>`, `<br>`, and CSS. Images and links
  arrive in Session 3, CSS in Session 4. Adding them now costs no marks and earns none.

## Example Output
A page with your name as the large heading, two or three paragraphs about you, one
subheading with a paragraph under it, and your name in the browser tab. Plain black text
on white — no styling yet. That is exactly right for Week 1.
