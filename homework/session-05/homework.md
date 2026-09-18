# Homework 5: Page Layout with Semantic HTML

## Due Date
Sunday, 23:59 (Week 6)

## Objective
- Learn semantic HTML5 elements (header, nav, main, footer)
- Build a proper page layout using CSS
- Create a reusable layout template for your project

## Requirements

### Task 1: Create a Layout Template
Build a page layout for `project/index.html` using semantic HTML elements and CSS.

**Your HTML must use these semantic elements:**
- `<header>` — Contains the club name/logo
- `<nav>` — Contains navigation links (Home, About, Contact)
- `<main>` — Contains the main page content
- `<footer>` — Contains copyright info and social links

**Structure example:**
```html
<header>
  <h1>Your Club Name</h1>
</header>
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
<main>
  <h2>Welcome to Our Club</h2>
  <p>Your content here...</p>
</main>
<footer>
  <p>&copy; 2026 Your Club Name</p>
</footer>
```

> **Note:** All project pages sit at the project root, so these three links are identical on
> every page — plain file names, never `../`. Paste the same `<nav>` block into `index.html`,
> `about.html` and `contact.html`, changing only which link carries `class="active"`. Test
> every link by clicking it, not by reading it.

### Task 2: Style the Layout with CSS
Add CSS rules to your `project/css/style.css` file to make the layout look like a proper web page.

> **Do not skip this:** for `project/index.html` to pick up the stylesheet, its
> `<head>` must contain `<link rel="stylesheet" href="css/style.css">` — added
> in Session 4. If your page stays unstyled, open DevTools (F12) → Network tab,
> reload, and check whether `style.css` loads with status 200 or 404; 404 means
> the `href` path is wrong.

**Your CSS must include:**

1. **Header styling:**
   - Background color
   - Text color
   - Padding for spacing
   - Text alignment (centered is fine)

2. **Navigation styling:**
   - Display the nav links horizontally (use `display: inline-block` or `flex`)
   - Add background color to the nav bar
   - Remove bullet points from the list
   - Add spacing between links

3. **Main content area:**
   - Set a maximum width (e.g., 900px)
   - Center the content
   - Add padding on the sides

4. **Footer styling:**
   - Background color (different from header)
   - Text alignment (center)
   - Padding

5. **General cleanup:**
   - Remove default margins on the body
   - Make the layout full-width

**File paths:**
- `project/index.html` (updated with semantic HTML)
- `project/css/style.css` (updated with layout styles)

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
For this session, the easiest good choice is to **show the layout template and explain which semantic tag (`header`, `nav`, `main`, `aside`, `footer`) does which job, and how the CSS turns it into two columns**.

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
   `- Session 05 — <your Google Drive link>`
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
- Add changes: `git add project/index.html project/css/style.css`
- Commit: `git commit -m "HW5: Add semantic layout to index page"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Semantic HTML | 3 | Uses header, nav, main, footer correctly |
| Navigation | 2 | Links work, displayed properly |
| CSS layout | 3 | Header, nav, main, footer all styled |
| Visual quality | 1 | Page looks like a real website layout |
| Code quality | 1 | Clean, well-indented HTML and CSS |
| **Total** | **10** | |

## Tips
- Use `* { margin: 0; padding: 0; }` to remove default spacing before adding your own
- The nav links should point to the correct files with correct relative paths
- Test all navigation links to make sure they work

## Example Output
Your index.html should look like a real website with a colored header bar at the top, a horizontal navigation menu, a centered content area, and a footer bar at the bottom.
