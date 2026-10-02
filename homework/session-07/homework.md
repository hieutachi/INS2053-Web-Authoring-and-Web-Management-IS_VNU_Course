# Homework 7: Typography with Google Fonts

## Due Date
Sunday, 23:59 (Week 8)

## Objective
- Import and use custom web fonts from Google Fonts
- Improve the overall typography of your mini-site
- Understand the impact of font choices on design

## Requirements

### Task 1: Choose and Add Google Fonts
Visit [Google Fonts](https://fonts.google.com/) and choose fonts for your site.

**Select fonts for:**
- Headings: Pick a bold, eye-catching font (e.g., Poppins, Montserrat, Playfair Display)
- Body text: Pick a clean, readable font (e.g., Open Sans, Lato, Roboto)

**Add Google Fonts to your pages:**
- Add the Google Fonts `<link>` tag in the `<head>` section of ALL three HTML pages:
```html
<link href="https://fonts.googleapis.com/css2?family=YourHeadingFont&family=YourBodyFont&display=swap" rel="stylesheet">
```
- Replace `YourHeadingFont` and `YourBodyFont` with your actual font choices

### Task 2: Apply Fonts in CSS
Update `project/css/style.css` to use your chosen fonts.

**Your CSS must include:**
- Set the heading font family (h1, h2, h3) to your heading font
- Set the body font family to your body font
- Add `font-weight` variations for visual hierarchy
- Set appropriate `letter-spacing` for headings (optional but nice)
- Ensure `line-height` is set to at least 1.6 for body text

**Example CSS:**
```css
body {
  font-family: 'Open Sans', sans-serif;
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: 'Poppins', sans-serif;
}

h1 {
  font-weight: 700;
  font-size: 2.5em;
}
```

### Task 3: Fine-Tune Typography
Make additional typography improvements across the mini-site:

- Adjust font sizes for h1, h2, h3 to create a clear visual hierarchy
- Style paragraph text for readability (line height, max-width for text blocks)
- Style links (change color, add hover effect with `a:hover`)
- Style list items for better spacing

**File paths:**
- `project/index.html` (add Google Fonts link)
- `project/about.html` (add Google Fonts link)
- `project/contact.html` (add Google Fonts link)
- `project/css/style.css` (update with font rules)

<!-- HW-BRIEF:START -->
## Detailed Brief — Read This First

### What you are actually building

The week your site gains a voice. You pick two real typefaces, load them from Google Fonts, and tune sizes and spacing until the pages look designed rather than merely rendered.

### Why this homework exists

- Typography is most of what people call “design”. Two well-chosen fonts and honest spacing beat any colour scheme.
- Web fonts must be *loaded* before CSS can use them: the `<link>` in the head plus a `font-family` rule. Forgetting one half is the usual reason the font “does not apply”.
- Pairing discipline — one face for headings, one for body text, a clear size ratio — is the actual skill being graded, not how exotic your font is.
- A CDN font link is fine for homework but the final capstone version must also work offline, which is why the sheet warns you here.

### What “done” looks like

Against the live visual target your headings should read as a different face from your body text, with generous line height, a comfortable measure (not edge-to-edge lines), and consistent sizes per level across all pages.

### How to work through it

1. **Choose (10 min).** On Google Fonts pick one display face for headings and one text face for body. Preview them together with the site's own words.
2. **Load them (5 min).** Copy the provided `<link>` tags into the `<head>` of all three pages, before your stylesheet link.
3. **Apply (15 min).** In `css/style.css` set `font-family` for `body` and for `h1, h2, h3`, with a fallback stack (`'Font Name', Arial, sans-serif`).
4. **Tune (15 min).** Heading sizes as a ratio, `line-height` around 1.5–1.7 for paragraphs, `margin` under headings, letter-spacing on small caps if used.
5. **Consistency sweep (5 min).** Same page open in two tabs: old page and new page. Sizes per level must match exactly.

### Where students lose marks

- `font-family: 'Poppins';` without quotes or without the fallback list.
- Loading six weights you never use — the page downloads kilobytes for nothing.
- More than two typefaces on one page: it reads as noise, not design.

### Files this homework must produce

- `project/index.html`
- `project/about.html`
- `project/contact.html`
- `project/css/style.css`

### How to hand it in

This homework has two halves, handed in together and marked separately: **Part 1 code (10 points)** and **Part 2 video (4 points)**. Online submission is not enabled yet, so your own Git repository is the submission.

**Part 1 — the code**

1. Make sure every file listed above exists at exactly that path — the grader looks up files by path, and a page parked somewhere else simply does not exist for it.
2. Stage the work: `git add homework/session-07/ project/` (add only what this session touched).
3. Commit with a message that says what changed: `git commit -m "HW7: <short summary>"`.
4. Push: `git push`. A commit that stayed on your laptop is not a submission.

**Part 2 — the video**

1. Record 60–120 seconds in OBS Studio (<https://obsproject.com>): screen shared the whole time, your voice required, name and student ID stated or visible at the start.
2. Present ONE part of this homework, not all of it. For this session: show the Google Fonts `<link>` in your `<head>` and the `font-family` rules in CSS, and explain how you picked and paired the two fonts.
3. Upload the MP4 (720p or higher) to **your own Google Drive** and set sharing to **“Anyone with the link → Viewer”**.
4. Open `homework/submissions.md` in your repository and add one line: `- Session 07 — (paste your Google Drive link here)`.
5. Commit and push that file together with the rest of the homework. A missing, private or dead link means the video cannot be graded.

**Before you push**

1. Tick the requirements checklist under Requirements, item by item, against the actual file rather than from memory.
2. Open the self-check tool (`site/cham-bai.html`), pick session 7, point it at your repository folder or paste your code, and fix what it flags. It reports AUTO / MANUAL / BLOCKED — AUTO is what a machine confirmed, MANUAL is still your lecturer's call.
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
For this session, the easiest good choice is to **show the Google Fonts `<link>` in your `<head>` and the `font-family` rules in CSS, and explain how you picked and paired the two fonts**.

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
   `- Session 07 — <your Google Drive link>`
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
- Commit: `git commit -m "HW7: Add Google Fonts and improve typography"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Google Fonts integration | 3 | Fonts load on all 3 pages |
| Font application | 2 | Headings and body use different fonts |
| Typography hierarchy | 2 | Clear size/weight differences between heading levels |
| Link styling | 2 | Links have custom colors and hover effects |
| Readability | 1 | Text is easy to read with good spacing |
| **Total** | **10** | |

## Tips
- Don't use more than 2-3 different fonts — it looks messy
- Make sure your heading font is different from your body font for contrast
- Test your page with a slow internet connection — Google Fonts need to download
- **Always write a fallback** after the web font: `font-family: 'Poppins', Verdana, sans-serif`. If the font cannot load, the browser uses the next one in the list.

> ⚠️ **This CDN link is for homework only.** The final capstone submission must work with the
> network switched off (`project/spec.md` §8) and both exams are offline. Before you submit
> the project, either download the font files into `project/css/fonts/` and use `@font-face`,
> or delete the `<link>` and keep a system font stack. Rely on the fallback, not the CDN.

## Example Output
Your mini-site should look significantly more polished with custom fonts. The headings should stand out with a distinctive style, and the body text should feel clean and easy to read. Links should change color when you hover over them.
