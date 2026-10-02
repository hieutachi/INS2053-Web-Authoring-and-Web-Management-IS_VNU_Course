# Homework 10: Embedding Video and Audio

## Due Date
Sunday, 23:59 (Week 11)

## Objective
- Learn to embed video and audio using HTML5 elements
- Understand media formats and browser compatibility
- Add rich media content to your club website

## Requirements

### Task 1: Create a Media Page
Create a new page called "Media" to showcase video and audio content for your club.

**Create the file:** `project/media.html`

**Your Media page must include:**

1. **Video Section:**
   - Use the `<video>` element to embed a video
   - Include `controls` attribute so users can play/pause
   - Set a `width` attribute (e.g., `width="560"`)
   - Add a `poster` attribute with a thumbnail image
   - Add fallback text for browsers that don't support video
   - You can use a sample video from the internet or a local file

2. **Audio Section:**
   - Use the `<audio>` element to embed audio
   - Include `controls` attribute
   - Add fallback text
   - You can use a sample audio file or a royalty-free audio URL

3. **Page Content:**
   - A heading "Club Media"
   - A paragraph describing the video (what it shows)
   - A paragraph describing the audio content
   - At least one image related to media/content creation

**Example code:**
```html
<video width="560" controls poster="images/video-thumbnail.jpg">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  Your browser does not support the video element.
</video>

<audio controls>
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
```

### Task 2: Style the Media Page
Add CSS to make the media page look good.

**Your CSS must include:**
- Center the video element
- Style the audio player (add margin, maybe a background)
- Style the section headings
- Add spacing between sections
- Make the video responsive with `max-width: 100%`

### Task 3: Update Navigation
- Add a "Media" link to the navigation on ALL pages
- Every page sits at the project root, so the link is `href="media.html"` everywhere

**File paths:**
- `project/media.html` (new page)
- `project/css/style.css` (add media styles)
- All 4 existing HTML pages (update navigation)

<!-- HW-BRIEF:START -->
## Detailed Brief — Read This First

### What you are actually building

The site gains motion and sound: a Media page with an embedded video and an audio clip, each with controls, a poster and a fallback for the browser that cannot play it.

### Why this homework exists

- `<video>` and `<audio>` are native HTML — no plugin, no Flash. Knowing the attributes (`controls`, `poster`, `preload`, `loop`, `muted`) is the whole skill.
- Fallback content inside the element is not optional decoration: it is what a user without the codec sees, and it is graded.
- Local files versus embeds matter for the exam: the practical is closed-internet, so your own `<video>` with a local `source` is what you can rely on.
- Media is heavy. Sizing, lazy loading and keeping files in `project/media/` is good practice, not busywork.

### What “done” looks like

Live visual target: a Media page whose video shows a poster frame before play, plays with visible controls, sits at a sane width, and whose audio row lines up with the rest of the layout.

### How to work through it

1. **Get assets (10 min).** One short MP4 and one MP3 you have the right to use. Put them in `project/media/`.
2. **Create the page (5 min).** `project/media.html` copied from an existing page.
3. **Embed the video (15 min).** `<video>` with `controls`, `poster`, explicit `width`/`height`, a `<source>` for MP4, and fallback text plus a link for browsers that fail.
4. **Embed the audio (10 min).** `<audio controls>` with a `<source>` and the same fallback pattern.
5. **Style the page (15 min).** Media width capped at the content column, captions under each clip, spacing consistent with other pages.
6. **Cross-browser sanity (5 min).** Play both, pause both, drag the progress bar, then view source and confirm the fallback text is real sentences.

### Where students lose marks

- `autoplay` — annoying, and often blocked by the browser anyway.
- Committing a 200 MB video to Git; keep the file short or link out and note it.
- Missing fallback text: a blank rectangle scores zero on the media requirement.

### Files this homework must produce

- `project/media.html`
- `project/media/` (video + audio files)
- `project/css/style.css`
- All existing HTML pages (nav updated)

### How to hand it in

This homework has two halves, handed in together and marked separately: **Part 1 code (10 points)** and **Part 2 video (4 points)**. Online submission is not enabled yet, so your own Git repository is the submission.

**Part 1 — the code**

1. Make sure every file listed above exists at exactly that path — the grader looks up files by path, and a page parked somewhere else simply does not exist for it.
2. Stage the work: `git add homework/session-10/ project/` (add only what this session touched).
3. Commit with a message that says what changed: `git commit -m "HW10: <short summary>"`.
4. Push: `git push`. A commit that stayed on your laptop is not a submission.

**Part 2 — the video**

1. Record 60–120 seconds in OBS Studio (<https://obsproject.com>): screen shared the whole time, your voice required, name and student ID stated or visible at the start.
2. Present ONE part of this homework, not all of it. For this session: show the media page and explain how `<video>` (or `<audio>`) with `controls` works, including the fallback text and the `poster`/`source` attributes you used.
3. Upload the MP4 (720p or higher) to **your own Google Drive** and set sharing to **“Anyone with the link → Viewer”**.
4. Open `homework/submissions.md` in your repository and add one line: `- Session 10 — (paste your Google Drive link here)`.
5. Commit and push that file together with the rest of the homework. A missing, private or dead link means the video cannot be graded.

**Before you push**

1. Tick the requirements checklist under Requirements, item by item, against the actual file rather than from memory.
2. Open the self-check tool (`site/cham-bai.html`), pick session 10, point it at your repository folder or paste your code, and fix what it flags. It reports AUTO / MANUAL / BLOCKED — AUTO is what a machine confirmed, MANUAL is still your lecturer's call.
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
For this session, the easiest good choice is to **show the media page and explain how the `<video>` (or `<audio>`) element with `controls` works, including the fallback text and the `poster`/`source` attributes you used**.

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
   `- Session 10 — <your Google Drive link>`
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
- Commit: `git commit -m "HW10: Add media page with video and audio"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Video element | 3 | Uses video tag with controls, poster, fallback |
| Audio element | 3 | Uses audio tag with controls and fallback |
| Page content | 2 | Has headings, descriptions, images |
| Media styling | 1 | Video centered, audio styled |
| Navigation | 1 | Media link added to all pages, links work |
| **Total** | **10** | |

## Tips
- If you don't have video/audio files, use sample URLs from w3schools.com or similar
- The `poster` attribute on video shows an image before the video plays
- Test both video and audio in multiple browsers if possible

## Example Output
Your Media page should have a video player that users can play and pause, an audio player, and descriptions of the content. The navigation bar should include a "Media" link that works from every page.
