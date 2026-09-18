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
