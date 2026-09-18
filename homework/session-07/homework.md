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
