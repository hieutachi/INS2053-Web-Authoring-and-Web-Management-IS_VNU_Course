---
marp: true
theme: default
paginate: true
---

# Session 13: Creating Forms on the Website

**INS2053 — Web Authoring and Web Management**

*Forms let users talk back to your website.*

Read: `ebook/13-creating-forms.md`  ·  Practise: `exercises/session-13/exercise.md`  ·  Diagrams: `canvases/buoi-13.canvas.tsx`

---

## Learning Objectives

- Explain what an HTML `<form>` is and why websites need forms
- Use at least eight different `<input>` types correctly
- Associate every form control with a `<label>` using `for`/`id`
- Group related fields with `<fieldset>` and `<legend>`
- Apply `required` and `placeholder` for basic client-side validation

---

## How a Form Works

```
USER fills out fields --> clicks SUBMIT
           |
           v
Browser packages the data
           |
           v
Data sent to URL in action="" attribute
           |
           v
Server-side script processes data (PHP, Node.js...)
           |
           v
Server responds (thank-you page, error)
```

In this course we focus on the **front-end** (HTML/CSS). We use `action="#"` as a placeholder.

---

## GET vs POST

| Feature | `method="get"` | `method="post"` |
|---------|----------------|-----------------|
| Data location | Appended to URL | Sent in request body |
| Visible in address bar | Yes | No |
| Size limit | ~2048 characters | Virtually unlimited |
| Best for | Search forms, filters | Registration, login, sensitive data |
| Security | Low | Higher (but still needs HTTPS) |

Rule: Always use `method="post"` for personal information.

---

## Input Types Quick Reference

| Type | Keyboard (mobile) | Built-in Validation | Typical Use |
|------|-------------------|---------------------|-------------|
| `text` | Standard | None | Names, addresses |
| `email` | Email (@, .) | Format check | Email addresses |
| `password` | Standard | Masked | Login passwords |
| `tel` | Numeric pad | None | Phone numbers |
| `number` | Numeric | Min/max/step | Age, quantity |
| `date` | Calendar picker | Valid date | Birthdays, events |
| `radio` | N/A | One selected if required | Single-choice |
| `checkbox` | N/A | Required = at least one | Multi-choice |

---

## Labels, Fieldsets, and Legends

```html
<fieldset>
    <legend>Personal Information</legend>

    <div class="form-group">
        <label for="fullname">Full Name:</label>
        <input type="text" id="fullname" name="fullname" required>
    </div>

    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
    </div>
</fieldset>
```

- `for="email"` on label must EXACTLY match `id="email"` on input
- `<fieldset>` groups related controls visually and semantically
- Every input MUST have a `<label>` for accessibility

---

## Live Code Example

A complete contact form with validation:

```html
<form action="#" method="post">
    <fieldset>
        <legend>Contact Us</legend>
        <label for="c-name">Your Name:</label>
        <input type="text" id="c-name" name="name"
               placeholder="Full name" required>

        <label for="c-email">Your Email:</label>
        <input type="email" id="c-email" name="email"
               placeholder="you@example.com" required>

        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="5"
                  required></textarea>

        <button type="submit">Send Message</button>
    </fieldset>
</form>
```

Try submitting with empty required fields -- the browser blocks it automatically.

---

## Common Mistakes

- **Missing `name` attribute** -- without it, data is NOT submitted
- **Mismatched `for` and `id`** -- `for="mail"` does not match `id="email"`
- **Using `type="text"` for email** -- loses validation and mobile keyboard
- **Self-closing textarea** -- `<textarea />` is WRONG; use `<textarea></textarea>`
- **Placeholder as only label** -- screen readers cannot identify the field

---

## In-Class Practice

Follow `exercises/session-13/exercise.md`:

1. Create `join.html` with a membership registration form
2. Include four fieldsets: Personal, Academic, Interests, Additional
3. Use at least 6 input types (text, email, tel, date, radio, checkbox)
4. Style the form with CSS to match your site theme
5. Test browser validation by leaving required fields empty

---

## Homework

See `homework/session-13/homework.md`:

- Complete the Contact page with a styled contact form
- Use at least 5 different input types across your forms
- All inputs must have associated labels (for/id matching)
- Add CSS styling for focus states and buttons
- Push updated site to GitHub

**Due Sunday 23:59**

---

## Recap

- Forms turn static pages into two-way conversations
- Use the correct `type` for each input (email, tel, date, etc.)
- Every input needs a `<label>` connected via matching `for`/`id`
- `<fieldset>` + `<legend>` organize long forms into sections
- Client-side validation (`required`, `type="email"`) catches errors early

---

## Next Session

**Session 14: Working with the Spry Framework** -- understand legacy JS widgets and build modern CSS-only dropdown navigation as a replacement.
