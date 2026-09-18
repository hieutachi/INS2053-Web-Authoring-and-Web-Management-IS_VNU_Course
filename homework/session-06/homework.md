# Homework 6: Build Your 3-Page Mini-Site

## Due Date
Sunday, 23:59 (Week 7)

## Objective
- Connect all pages with a shared navigation menu
- Maintain consistent layout across multiple pages
- Create a working multi-page website

## Requirements

### Task 1: Add Navigation to All 3 Pages
Update all three pages (index.html, about.html, contact.html) so they share the same navigation structure and layout.

**Every page must have:**
- The same `<header>` with the club name
- The same `<nav>` with links to: Home, About, Contact
- The same `<footer>` with copyright info
- The same `<main>` wrapper for content
- The same CSS stylesheet linked

**Navigation links are identical on every page** — all three files sit at the project root,
so every link is a plain file name:

```html
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
```

Copy this same block into all three pages, changing only which link gets `class="active"`.
No `../` anywhere.

### Task 2: Complete the Contact Page
Build out the `project/contact.html` page with full content:

- A heading "Contact Us"
- A paragraph inviting visitors to reach out
- A list of contact methods (email, phone, social media — use fake info)
- A paragraph with the club's meeting location/address
- At least 1 image

### Task 3: Improve the Home Page
Update `project/index.html` with richer content:

- A welcome section with an intro paragraph
- A "What We Do" section with a list of activities
- A "Why Join Us?" section with 3 benefits
- At least 2 images
- A "Latest News" or "Upcoming Events" section

**File paths:**
- `project/index.html`
- `project/about.html`
- `project/contact.html`
- `project/css/style.css`

**Requirements checklist:**
- [ ] All 3 pages have the same header, nav, and footer
- [ ] Navigation links work correctly from every page
- [ ] Contact page has full content
- [ ] Home page has multiple sections
- [ ] CSS is linked on all pages
- [ ] Layout is consistent across all pages

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
For this session, the easiest good choice is to **show the navigation menu on all three pages and explain how the same `<ul>` menu works on every page and how the current page is highlighted**.

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
   `- Session 06 — <your Google Drive link>`
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
- Commit: `git commit -m "HW6: Complete 3-page mini-site with navigation"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Navigation links | 3 | All links work correctly on all 3 pages |
| Consistent layout | 2 | Same header, nav, footer on every page |
| Contact page content | 2 | Has all required content elements |
| Home page content | 2 | Has multiple sections and images |
| Overall consistency | 1 | Site feels unified and professional |
| **Total** | **10** | |

## Tips
- Every page sits at the project root, so links are plain file names — if you find yourself typing `../`, something is in the wrong folder
- Test every link by clicking on it in the browser
- If a link breaks, check the relative path carefully

## Example Output
You should have a 3-page website where you can click between Home, About, and Contact pages. Every page should feel like part of the same site with matching design.
