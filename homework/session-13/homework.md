# Homework 13: Building a Contact Form

## Due Date
Sunday, 23:59 (Week 14)

## Objective
- Learn how to create HTML forms
- Practice using different input types
- Build a functional contact form for your club website

## Requirements

### Task 1: Create the Contact Form
Update your `project/contact.html` page to include a fully functional contact form.

> This is the page milestone **M6 (Week 14)** grades — the form built here is exactly what
> that checklist asks for, so doing this homework properly finishes M6.

**Your form must include at least 5 different input types:**

1. **Text input** — Full name field:
```html
<label for="fullname">Full Name:</label>
<input type="text" id="fullname" name="fullname" required>
```

2. **Email input** — Email address field:
```html
<label for="email">Email:</label>
<input type="email" id="email" name="email" required>
```

3. **Tel input** — Phone number field:
```html
<label for="phone">Phone Number:</label>
<input type="tel" id="phone" name="phone">
```

4. **Select dropdown** — Subject/topic selection:
```html
<label for="subject">Subject:</label>
<select id="subject" name="subject">
  <option value="">-- Select a topic --</option>
  <option value="membership">Membership Inquiry</option>
  <option value="event">Event Information</option>
  <option value="feedback">Feedback</option>
  <option value="other">Other</option>
</select>
```

5. **Textarea** — Message field:
```html
<label for="message">Message:</label>
<textarea id="message" name="message" rows="5" required></textarea>
```

6. **Additional elements (choose at least 1 more):**
   - `<input type="date">` for preferred meeting date
   - `<input type="radio">` for gender or membership type
   - `<input type="checkbox">` for newsletter signup
   - `<input type="file">` for file attachment

**Your form must also include:**
- A `<form>` element with `action` and `method` attributes
- A submit button: `<button type="submit">Send Message</button>`
- A reset button: `<button type="reset">Clear Form</button>`
- Labels connected to inputs using `for` and `id` attributes
- The `required` attribute on mandatory fields

### Task 2: Style the Form
Add CSS to make the form look good and easy to use.

**Your CSS must include:**
- Style labels: display block, margin-bottom, font-weight
- Style inputs: width, padding, border, border-radius
- Style the submit button: background color, text color, padding, cursor
- Style the button hover effect
- Add spacing between form groups
- Make the form look centered and organized

**Example CSS:**
```css
form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

form input, form select, form textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button[type="submit"] {
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
```

**File paths:**
- `project/contact.html` (updated with form)
- `project/css/style.css` (add form styles)

<!-- HW-BRIEF:START -->
## Detailed Brief — Read This First

### What you are actually building

The site learns to listen: a real contact form on `contact.html` — labels, the right input types, validation attributes, a textarea, radio buttons and a checkbox — styled to match the rest of the design.

### Why this homework exists

- Input types are not cosmetic. `type="email"` gives you keyboard hints and free validation; `type="text"` gives you neither. Choosing wrong is the most common lost point in this homework.
- Every field needs a `<label for>` bound to an `id`. Unlabelled inputs are inaccessible and are marked down hard.
- `required`, `placeholder`, `maxlength` and `pattern` are client-side validation — cheap protection before anything reaches a server.
- A form with no `action` still needs to look finished: this course grades presentation and semantics, not backend processing.

### What “done” looks like

Live visual target: fields stacked with visible labels above each control, comfortable spacing, focus states, a textarea tall enough to read, radios and a checkbox aligned with their labels, and a button that looks like part of the design.

### How to work through it

1. **Map the fields (10 min).** Decide what you actually need: name, email, subject, message, enquiry type (radio), consent (checkbox).
2. **Build the skeleton (10 min).** `<form>` with a method and action, wrapped in the page's existing `main` region.
3. **Add fields one at a time (25 min).** Each: a `<label for="x">` + an `<input id="x">` with the correct type. Test after every field, not at the end.
4. **Validation attributes (10 min).** `required` on essentials, `placeholder` as example not label, `maxlength` on the textarea.
5. **Style (20 min).** Width, spacing, label weight, focus outline, button appearance — in `css/style.css`.
6. **Keyboard pass (5 min).** Tab through the whole form. Every control reachable, every label announced.

### Where students lose marks

- `<label>Name</label>` with no `for`/`id` pair.
- `placeholder` used as the only label — it disappears the moment the user types.
- A submit button with `type="button"` where the task expects a real submit control (this is teaching markup, not a live endpoint).

### Files this homework must produce

- `project/contact.html`
- `project/css/style.css`

### How to hand it in

This homework has two halves, handed in together and marked separately: **Part 1 code (10 points)** and **Part 2 video (4 points)**. Online submission is not enabled yet, so your own Git repository is the submission.

**Part 1 — the code**

1. Make sure every file listed above exists at exactly that path — the grader looks up files by path, and a page parked somewhere else simply does not exist for it.
2. Stage the work: `git add homework/session-13/ project/` (add only what this session touched).
3. Commit with a message that says what changed: `git commit -m "HW13: <short summary>"`.
4. Push: `git push`. A commit that stayed on your laptop is not a submission.

**Part 2 — the video**

1. Record 60–120 seconds in OBS Studio (<https://obsproject.com>): screen shared the whole time, your voice required, name and student ID stated or visible at the start.
2. Present ONE part of this homework, not all of it. For this session: show the contact form and walk through three different input types you used, explaining what each collects and which label belongs to which input.
3. Upload the MP4 (720p or higher) to **your own Google Drive** and set sharing to **“Anyone with the link → Viewer”**.
4. Open `homework/submissions.md` in your repository and add one line: `- Session 13 — (paste your Google Drive link here)`.
5. Commit and push that file together with the rest of the homework. A missing, private or dead link means the video cannot be graded.

**Before you push**

1. Tick the requirements checklist under Requirements, item by item, against the actual file rather than from memory.
2. Open the self-check tool (`site/cham-bai.html`), pick session 13, point it at your repository folder or paste your code, and fix what it flags. It reports AUTO / MANUAL / BLOCKED — AUTO is what a machine confirmed, MANUAL is still your lecturer's call.
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
For this session, the easiest good choice is to **show the contact form and walk through three different input types you used, explaining what each collects and which label belongs to which input**.

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
   `- Session 13 — <your Google Drive link>`
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
- Add changes: `git add project/contact.html project/css/style.css`
- Commit: `git commit -m "HW13: Add contact form with multiple input types"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Input types | 3 | Uses at least 5 different input types |
| Form structure | 2 | Proper form, label, input connections |
| Required fields | 1 | Uses `required` attribute appropriately |
| Buttons | 1 | Has both submit and reset buttons |
| Form styling | 3 | Labels, inputs, buttons all styled nicely |
| **Total** | **10** | |

## Tips
- Every input should have a matching label — it helps accessibility
- Use `type="email"` instead of `type="text"` for email fields — browsers validate it automatically
- Test your form by filling it out to make sure everything works

## Example Output
Your Contact page should have a professional-looking form where visitors can type their name, email, select a subject, write a message, and click Send. All fields should be neatly styled and easy to use.
