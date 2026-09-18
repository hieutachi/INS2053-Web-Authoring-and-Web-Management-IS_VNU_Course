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
