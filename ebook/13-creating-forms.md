# 🟦 SESSION 13
# **Creating Forms**

Welcome to Session 13! Today we tackle one of the most practical skills in web development: **forms**. Every time you register for a website, log into your email, search Google, or send a message — you are using a form. Forms are how users *talk back* to a website. Up until now, our Student Club Website has been mostly one-way (we show information). Now we will make it interactive by building a membership registration form and a contact form. Do not worry if this feels new — we will walk through every single line together.

---

# 📌 SESSION INFORMATION

```
📅 Duration:     3 periods (150 minutes) — Theory ~60 min, Practice ~90 min
📚 Reference:    Chapter 13 — Creating Forms (course textbook)
                 MDN Web Docs "Learn Forms"
🎯 Objectives:   1. Build complete HTML forms with multiple input types
                 2. Associate every label with its control correctly
                 3. Group related fields with fieldset and legend
                 4. Apply basic client-side validation attributes
                 5. Style forms consistently with your existing CSS
📖 Prepare:      1. Finish Sessions 1-12
                 2. Have your Student Club site open in Dreamweaver (or any code editor)
                 3. Review the box model from Session 4
🖼 Diagrams:     canvases/buoi-13.canvas.tsx — FormDataFlow, InputTypeGallery, LabelWiring
🔗 Outcomes:     CLO1 (master basic web design and build skills)
                 CLO4 (design and build a web application)
```

---

# 🎯 LEARNING OBJECTIVES

- Explain what an HTML `<form>` is and why websites need forms.
- Describe the difference between `method="get"` and `method="post"`.
- Use at least eight different `<input>` types: text, email, password, tel, radio, checkbox, number, date.
- Create dropdown menus with `<select>` and `<option>`.
- Create multi-line text areas with `<textarea>`.
- Associate every form control with a `<label>` using `for` / `id`.
- Group related controls with `<fieldset>` and `<legend>`.
- Apply the `required` and `placeholder` attributes for basic validation.
- Style form controls with CSS so they match the Student Club Website theme.
- Build a complete membership registration page (`join.html`) for the Student Club Website.

---

# 📖 THEORY

## 1. What Is a Form?

> 🖼 **Diagram:** `canvases/buoi-13.canvas.tsx` → `FormDataFlow` — slide `s13-what-is-form` ("What Is a Form?")

### 1.1 Definition

An **HTML form** is a section of a web page that collects data from the user and (usually) sends it to a server for processing. The form is created with the `<form>` element, which acts as a container for all the input fields, buttons, and labels.

Think of a form like a paper application form you fill out at a university office. Each blank space on the paper corresponds to an `<input>`, `<select>`, or `<textarea>` in HTML. When you press "Submit," it is like handing the completed paper to the clerk.

### 🎒 Real-life example

On our **Student Club Website**, we want students to be able to:
- Register as new members → needs a registration form
- Send us a message → needs a contact form
- Sign up for an event → needs an event sign-up form
- Give feedback → needs a survey form

Every one of these uses the same HTML concepts we learn today.

### 1.2 Why It Matters

Without forms, a website is just a digital poster — users can look but cannot interact. Forms turn a static page into a two-way conversation. They are essential for e-commerce, social media, education platforms, government services, and virtually every modern website.

```
┌─────────────────────────────────────────────┐
│           HOW A FORM WORKS                   │
│                                             │
│   USER fills out fields ──► clicks SUBMIT   │
│              │                              │
│              ▼                              │
│   Browser packages the data                 │
│              │                              │
│              ▼                              │
│   Data sent to URL in action="" attribute   │
│              │                              │
│              ▼                              │
│   Server-side script processes data         │
│   (PHP, Node.js, Python, etc.)             │
│              │                              │
│              ▼                              │
│   Server responds (thank-you page, error)   │
└─────────────────────────────────────────────┘
```

⚠️ **Important notes**

- In this course we focus on the **HTML/CSS front-end** of forms. Processing form data on the server requires PHP, Node.js, or another back-end language, which is beyond the scope of INS2053. We will use `action="#"` as a placeholder.
- Every form control that should send data **must** have a `name` attribute. Without `name`, the field's value is never submitted.
- The `id` attribute is used to connect a `<label>` to its control. The `name` attribute is used to identify the data when it reaches the server. They serve different purposes!

---

## 2. The `<form>` Element and Its Attributes

### 2.1 Basic Syntax

```html
<!-- ✅ CORRECT: form with action and method -->
<form action="process.php" method="post">
    <!-- form controls go here -->
</form>
```

### 2.2 Key Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| `action` | The URL where form data is sent when the user clicks Submit | `action="register.php"` |
| `method` | How data is sent: `get` (appended to URL) or `post` (in request body) | `method="post"` |
| `id` | Unique identifier for the form (used by JavaScript/CSS) | `id="regForm"` |
| `name` | Name for the form (legacy; prefer `id`) | `name="registration"` |
| `novalidate` | Disables browser built-in validation (useful during testing) | `novalidate` |

### 🔍 Comparison Table: GET vs POST

| Feature | `method="get"` | `method="post"` |
|---------|----------------|-----------------|
| Where data goes | Appended to URL as query string | Sent in HTTP request body |
| Visible in address bar | Yes (`?name=Alice&email=a@b.com`) | No |
| Bookmarkable | Yes (data is in the URL) | No |
| Size limit | ~2048 characters (browser dependent) | Virtually unlimited |
| Best for | Search forms, filters, non-sensitive data | Registration, login, file uploads, sensitive data |
| Security | Low (data visible in URL/history) | Higher (data not in URL, but still needs HTTPS) |
| Our default for this course | — | **Use `post` for registration/contact forms** |

### ⚠️ Important notes

- Always use `method="post"` when collecting personal information (names, emails, passwords).
- Use `method="get"` only for things like search boxes where seeing the query in the URL is useful.
- Since we are not building a real server script, set `action="#"` so the form does not navigate away when tested.

---

## 3. Input Types

> 🖼 **Diagram:** `canvases/buoi-13.canvas.tsx` → `InputTypeGallery` — slide `s13-input-types` ("Input Types")

The `<input>` element is the workhorse of forms. Its behavior changes completely depending on the `type` attribute.

### 3.1 Text Input

```html
<!-- ✅ Single-line text field -->
<label for="fullname">Full Name:</label>
<input type="text" id="fullname" name="fullname"
       placeholder="e.g., Nguyen Van An" required>
```

- `type="text"` — standard single-line text entry.
- `placeholder` — ghost text shown inside the field before the user types.
- `required` — the browser blocks submission if the field is empty.

### 3.2 Email Input

```html
<!-- ✅ Email field with built-in format checking -->
<label for="email">Email Address:</label>
<input type="email" id="email" name="email"
       placeholder="you@university.edu" required>
```

- `type="email"` — the browser checks for a basic `something@something.something` pattern.
- On mobile devices, the keyboard automatically shows the `@` and `.` keys.

### 3.3 Password Input

```html
<!-- ✅ Password field (characters hidden) -->
<label for="pwd">Password:</label>
<input type="password" id="pwd" name="pwd"
       placeholder="At least 8 characters" required minlength="8">
```

- Characters appear as dots or asterisks.
- `minlength="8"` enforces a minimum length.

### 3.4 Telephone Input

```html
<!-- ✅ Phone number field -->
<label for="phone">Phone Number:</label>
<input type="tel" id="phone" name="phone"
       placeholder="+84 xxx xxx xxx">
```

- `type="tel"` — on mobile, shows the numeric keypad.
- No automatic format validation (phone formats vary worldwide). You can add a `pattern` attribute for stricter checking.

### 3.5 Radio Buttons

```html
<!-- ✅ Radio group: user picks exactly ONE option -->
<p>Gender:</p>
<label><input type="radio" name="gender" value="male"> Male</label>
<label><input type="radio" name="gender" value="female"> Female</label>
<label><input type="radio" name="gender" value="other"> Other</label>
```

- All radios in the **same group** must share the **same `name`**.
- Only one radio in a group can be selected at a time.
- The `value` attribute is what gets sent to the server.

### 3.6 Checkboxes

```html
<!-- ✅ Checkboxes: user picks ZERO OR MORE options -->
<label><input type="checkbox" name="interests" value="web"> Web Design</label>
<label><input type="checkbox" name="interests" value="photo"> Photography</label>
<label><input type="checkbox" name="interests" value="music"> Music</label>
```

- Unlike radio buttons, checkboxes are independent — the user can check any combination.
- If no checkbox in a group is checked, nothing is sent for that `name`.

### 3.7 Number Input

```html
<!-- ✅ Numeric field with spinner arrows -->
<label for="age">Age:</label>
<input type="number" id="age" name="age"
       min="16" max="99" step="1">
```

- `min`, `max`, `step` constrain allowed values.
- Browser shows small up/down arrows.

### 3.8 Date Input

```html
<!-- ✅ Date picker -->
<label for="dob">Date of Birth:</label>
<input type="date" id="dob" name="dob">
```

- Shows a calendar popup in modern browsers.
- Value format is always `YYYY-MM-DD`.

### 🎒 Real-life example

In our Student Club registration form we use:
- `text` for Full Name and Student ID
- `email` for Email Address
- `tel` for Phone Number
- `date` for Date of Birth
- `radio` for Gender
- `checkbox` for Interests
- `file` for Profile Photo upload

### 🔍 Quick Reference Table

| Type | Keyboard (mobile) | Built-in validation | Typical use |
|------|-------------------|---------------------|-------------|
| `text` | Standard | None | Names, addresses |
| `email` | Email (@, .) | Format check | Email addresses |
| `password` | Standard | None (masked) | Login passwords |
| `tel` | Numeric pad | None | Phone numbers |
| `number` | Numeric | Min/max/step | Age, quantity |
| `date` | Calendar picker | Valid date | Birthdays, events |
| `radio` | N/A | One must be selected if required | Single-choice |
| `checkbox` | N/A | Required = at least one | Multi-choice |
| `file` | File browser | Accept filter | Uploads |
| `submit` | N/A | N/A | Submit button |
| `reset` | N/A | N/A | Clear form |

### ⚠️ Important notes

- Always provide a `<label>` for every input (except submit/reset buttons).
- The `name` attribute is mandatory for data submission.
- `placeholder` is a hint, NOT a label. Always use both `placeholder` AND `<label>`.

### 🧪 Try It Yourself — Let the Input Type Do the Work

**Task (6 min):** See what the right `type` gives you for free.

1. Build four fields that all accept text:
   ```html
   <input type="text"  name="a" placeholder="text">
   <input type="email" name="b" placeholder="email">
   <input type="tel"   name="c" placeholder="tel">
   <input type="date"  name="d">
   ```
2. Reload on your laptop. The date field shows a picker.
3. Now open the same page on your phone, or use F12 → **Ctrl+Shift+M** device mode and tap each field.

**Expected result:** On a phone, `email` brings up a keyboard with `@`, `tel` shows a numeric keypad, and `date` opens the native date picker. All four accept typed text; only the correct type makes it pleasant to enter.

<details>
<summary>The types worth knowing, and the two traps</summary>

| Type | What you get |
|---|---|
| `email` | `@` keyboard, format check |
| `tel` | numeric keypad, no format check |
| `url` | URL keyboard, protocol check |
| `number` | numeric input with `min`/`max`/`step` |
| `date`, `time` | native pickers |
| `search` | a clear button |
| `password` | masked characters |

**Trap 1: `type="number"` for phone numbers.** It rejects `+`, spaces, and leading zeros, and it adds spinner arrows that make no sense on a phone number. Use `type="tel"`.

**Trap 2: forgetting `name`.** A field with no `name` is never submitted — it simply does not appear in the data, with no error anywhere. `id` connects the label; `name` is what identifies the value in the submission. Most fields need both.

</details>


---

## 4. Select Dropdowns and Textareas

### 4.1 `<select>` and `<option>`

```html
<!-- ✅ Dropdown menu -->
<label for="faculty">Faculty:</label>
<select id="faculty" name="faculty" required>
    <option value="">-- Select Faculty --</option>
    <option value="it">Information Technology</option>
    <option value="ba">Business Administration</option>
    <option value="comm">Communication and Media</option>
    <option value="eco">Economics</option>
    <option value="law">Law</option>
    <option value="other">Other</option>
</select>
```

- The first `<option>` has an empty `value=""` so that if the user does not choose anything, the form sends an empty string (and `required` will block submission).
- The text between `<option>` tags is what the user sees; the `value` attribute is what gets submitted.
- Add `multiple` to allow selecting more than one option (Ctrl+click).

### 4.2 `<textarea>`

```html
<!-- ✅ Multi-line text area -->
<label for="why">Why do you want to join?</label>
<textarea id="why" name="why" rows="4" cols="50"
          placeholder="Tell us about yourself..."></textarea>
```

- `rows` sets visible height (in lines).
- `cols` sets visible width (in characters), but CSS `width` overrides this.
- Content goes between opening and closing tags (not in a `value` attribute).
- Unlike `<input>`, `<textarea>` is NOT self-closing. Always write `</textarea>`.

### ⚠️ Important notes

- ❌ WRONG: `<textarea value="default text"></textarea>` — there is no `value` attribute on textarea.
- ✅ CORRECT: `<textarea>Default text</textarea>`
- ❌ WRONG: `<textarea />` — self-closing textarea does not work.
- ✅ CORRECT: `<textarea></textarea>`

---

## 5. Labels, Fieldsets, and Legends

> 🖼 **Diagram:** `canvases/buoi-13.canvas.tsx` → `LabelWiring` — slide `s13-labels` ("Labels, Fieldsets & Legends")

### 5.1 The `<label>` Element

Labels are critical for accessibility and usability. When a user clicks a label, the associated input receives focus. Screen readers read the label aloud when the user navigates to the input.

**Method 1: Explicit association (recommended)**
```html
<!-- ✅ for/id matching -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">
```

**Method 2: Implicit association (wrapping)**
```html
<!-- ✅ Label wraps the input -->
<label>
    Email:
    <input type="email" name="email">
</label>
```

### ⚠️ Critical rule

- ❌ WRONG: `<label for="mail">Email:</label>` + `<input id="email">` — mismatched `for` and `id`!
- ✅ CORRECT: `<label for="email">Email:</label>` + `<input id="email">` — exact match.

### 5.2 `<fieldset>` and `<legend>`

These elements visually and semantically group related form controls.

```html
<!-- ✅ Grouped fields -->
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

- `<fieldset>` draws a border around the group (stylable with CSS).
- `<legend>` provides a caption that sits on the border.
- Screen readers announce the legend when entering the group, giving context to each field.

### 🎒 Real-life example

Our Student Club registration form uses four fieldsets:
1. **Personal Information** — name, student ID, email, phone, DOB, gender
2. **Academic Information** — faculty, year of study
3. **Interests** — checkboxes for activities
4. **Additional Information** — motivation text, profile photo, terms agreement

This makes a long form feel organized and less overwhelming.

### 🧪 Try It Yourself — Prove Your Labels Are Connected

**Task (5 min):** One click tells you whether a label is doing its job.

1. Write a field with an unconnected label:
   ```html
   <label>Email</label>
   <input type="email" id="email" name="email">
   ```
2. Reload and click the word "Email". Nothing happens.
3. Now connect them:
   ```html
   <label for="email">Email</label>
   <input type="email" id="email" name="email">
   ```
4. Click "Email" again. Then try a checkbox the same way.

**Expected result:** With `for` matching the input's `id`, clicking the label text focuses the field — and for a checkbox, clicking the label toggles it. That click is your test: if it does nothing, the label is not connected.

<details>
<summary>Why this is the highest-value five minutes in the chapter</summary>

A connected label does three jobs at once:

1. **Screen readers** announce the field's purpose. Without it, a user hears "edit text" with no clue what to type.
2. **Click target** grows to include the text, which matters most for checkboxes and radios on a phone.
3. **Autofill** works, because the browser can tell what the field is for.

Two rules make it reliable: the `for` value must match the input's `id` exactly (case-sensitive), and every `id` must be unique on the page. Duplicate ids are the usual reason a label focuses the wrong field.

Wrapping also works and needs no ids:

```html
<label>Email <input type="email" name="email"></label>
```

Placeholder text is **not** a label. It vanishes as soon as the user types, leaving them unable to check what the field was, and screen reader support for it is inconsistent. Use both if you like — but never a placeholder alone.

Group related radios or checkboxes in a `<fieldset>` with a `<legend>`; the legend gives the *group* a name, which is the only way "Choose your membership type" gets announced with the options.

</details>


---

## 6. Form Validation Basics

Validation ensures the user enters correct data before the form is submitted. There are two kinds:

| Type | Where it runs | When | Examples |
|------|--------------|------|----------|
| Client-side | In the browser | Before data leaves the computer | `required`, `type="email"`, `minlength`, `pattern` |
| Server-side | On the server | After data arrives | Database checks, business rules |

In this course we focus on **client-side validation** using HTML attributes.

### 6.1 Common Validation Attributes

| Attribute | Works on | Effect |
|-----------|----------|--------|
| `required` | Most inputs | Blocks submission if field is empty |
| `minlength="n"` | text, password, textarea | Minimum character count |
| `maxlength="n"` | text, password, textarea | Maximum character count |
| `min="n"` | number, date | Minimum value |
| `max="n"` | number, date | Maximum value |
| `pattern="regex"` | text, email, tel, url | Must match regular expression |
| `type="email"` | email | Built-in email format check |

### 6.2 Example: Putting Validation Together

```html
<!-- ✅ Validated email field -->
<label for="email">University Email:</label>
<input type="email"
       id="email"
       name="email"
       required
       placeholder="student@vnu.edu.vn"
       title="Please enter a valid email address">
```

- `required` — cannot be left blank.
- `type="email"` — must contain @ and domain.
- `title` — tooltip shown when validation fails (some browsers display this as the error message).

### ⚠️ Important notes

- Client-side validation can be bypassed (disable JS, use dev tools). NEVER trust it alone for security. Always validate again on the server.
- For this course, client-side validation is sufficient since we are learning front-end skills.

### 🧪 Try It Yourself — Validation the Browser Does for Free

**Task (6 min):** Add constraints and watch the browser enforce them.

1. Build a small form and add validation attributes:
   ```html
   <form>
       <div class="field">
           <label for="name">Full name</label>
           <input type="text" id="name" name="name" required minlength="2">
       </div>
       <div class="field">
           <label for="email">Email</label>
           <input type="email" id="email" name="email" required>
       </div>
       <div class="field">
           <label for="age">Age</label>
           <input type="number" id="age" name="age" min="16" max="99">
       </div>
       <button type="submit">Join</button>
   </form>
   ```
2. Submit it empty. Then with `abc` in the email field. Then with `12` as the age.
3. Now add this CSS and retry:
   ```css
   input:invalid  { border-color: #dc2626; }
   input:valid    { border-color: #16a34a; }
   ```

**Expected result:** The browser blocks submission and shows its own message next to the offending field — no JavaScript involved. The CSS colours each border as you type.

<details>
<summary>What this validation is and is not</summary>

It is a **usability** feature: it catches typos immediately, next to the field, before a round trip to the server.

It is **not security**. Every one of these attributes can be removed in DevTools in three seconds, and a request can be sent without a browser at all. Any real application must revalidate on the server. Client-side validation improves the experience for cooperative users; it stops nobody who is trying.

One refinement: `input:invalid` colours a field red the instant the page loads, because an empty required field is already invalid. That feels accusatory before the user has typed anything. Use `:user-invalid` where you can, which waits until the field has been interacted with:

```css
input:user-invalid { border-color: #dc2626; }
```

</details>


---

## 7. Styling Forms with CSS

Forms look plain by default. CSS makes them match your site's design.

### 7.1 Core Styling Principles

```css
/* ✅ Make inputs fill their container */
.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="tel"],
.form-group input[type="date"],
.form-group input[type="password"],
.form-group select,
.form-group textarea {
    width: 100%;            /* Fill the parent div */
    padding: 10px 12px;     /* Comfortable internal spacing */
    border: 2px solid #ddd; /* Subtle border */
    border-radius: 6px;     /* Rounded corners */
    font-size: 15px;        /* Readable text size */
    font-family: inherit;   /* Match the page font */
    background-color: white;
    transition: border-color 0.3s, box-shadow 0.3s; /* Smooth focus effect */
}
```

### 7.2 Focus Styles

```css
/* ✅ Visual feedback when user clicks into a field */
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #2874a6;
    outline: none;
    box-shadow: 0 0 8px rgba(40, 116, 166, 0.3);
}
```

### 7.3 Placeholder Styling

```css
/* ✅ Lighter color for placeholder text */
.form-group input::placeholder,
.form-group textarea::placeholder {
    color: #aaa;
}
```

### 7.4 Button Styling

```css
/* ✅ Attractive, touch-friendly submit button */
.btn {
    background: linear-gradient(to right, #2874a6, #3498db);
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.btn:hover {
    background: linear-gradient(to right, #1a5276, #2874a6);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
```

### ✅ Best practices

1. **Always use `<label>`** for every form control.
2. **Group related fields** with `<fieldset>` and `<legend>`.
3. **Use the correct `type`** for each input (email, tel, date, etc.).
4. **Provide `placeholder` hints** but never as a replacement for labels.
5. **Add `required`** to mandatory fields and mark them visually with a red asterisk (*).
6. **Style focus states** so keyboard users see where they are.
7. **Make buttons large enough** for touch (minimum 44×44 px).
8. **Keep form layout vertical** (label above input) — it is the easiest to read on all screen sizes.

### ❌ Common mistakes

❌ **Mistake 1: Missing `name` attribute**
```html
<!-- ❌ WRONG: data will NOT be submitted -->
<input type="text" id="fullname">
```
```html
<!-- ✅ CORRECT: name attribute added -->
<input type="text" id="fullname" name="fullname">
```

❌ **Mistake 2: Mismatched `for` and `id`**
```html
<!-- ❌ WRONG: "mail" ≠ "email" -->
<label for="mail">Email:</label>
<input type="email" id="email" name="email">
```
```html
<!-- ✅ CORRECT: exact match -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">
```

❌ **Mistake 3: Using `type="text"` for email**
```html
<!-- ❌ WRONG: no email validation, wrong mobile keyboard -->
<input type="text" name="email">
```
```html
<!-- ✅ CORRECT: proper type -->
<input type="email" name="email">
```

❌ **Mistake 4: Self-closing textarea**
```html
<!-- ❌ WRONG: content will not appear -->
<textarea name="msg" />
```
```html
<!-- ✅ CORRECT: proper closing tag -->
<textarea name="msg"></textarea>
```

❌ **Mistake 5: Placeholder as only label**
```html
<!-- ❌ WRONG: screen readers cannot identify this field -->
<input type="text" name="name" placeholder="Your Name">
```
```html
<!-- ✅ CORRECT: label + placeholder -->
<label for="name">Your Name</label>
<input type="text" id="name" name="name" placeholder="e.g., Nguyen Van An">
```

### 🧪 Try It Yourself — Style a Form Without Breaking It

**Task (7 min):** Make a form look designed while keeping it usable.

1. Style the fields consistently:
   ```css
   input, select, textarea {
       width: 100%;
       padding: 10px;
       border: 1px solid #cbd5e1;
       border-radius: 4px;
       font: inherit;
   }
   label { display: block; margin-bottom: 4px; font-weight: 600; }
   .field { margin-bottom: 16px; }
   input:focus, select:focus, textarea:focus {
       outline: 2px solid #2563eb;
       outline-offset: 2px;
       border-color: #2563eb;
   }
   ```
2. Reload, then remove `font: inherit` and reload again.
3. Put it back, then replace the `:focus` rule with `outline: none` and try navigating with **Tab** only.

**Expected result:** Without `font: inherit`, form fields revert to the browser's default font and look pasted in from another site. With `outline: none`, you cannot see where you are when tabbing — the form becomes unusable without a mouse.

<details>
<summary>The two rules to remember</summary>

**`font: inherit` on form controls.** Inputs, selects, and textareas do not inherit typography by default; they use a browser-supplied font. One declaration makes them match the rest of your page.

**Never `outline: none` without a replacement.** The focus ring is the only thing telling a keyboard user where they are. If the default outline clashes with your design, replace it — do not delete it:

```css
input:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
```

`:focus-visible` is the refinement worth knowing: it shows the ring for keyboard focus but not for mouse clicks, which is usually what designers actually wanted when they reached for `outline: none`.

`width: 100%` on inputs also relies on `box-sizing: border-box` being set globally. Without it, the padding pushes each field past the edge of its container.

</details>


---

# 📋 THEORY SUMMARY

| Concept | Definition | Example |
|---------|-----------|---------|
| `<form>` | Container for form controls; defines where/how data is sent | `<form action="register.php" method="post">` |
| `action` | URL that receives form data | `action="process.php"` |
| `method` | HTTP method: `get` (URL) or `post` (body) | `method="post"` |
| `<input type="text">` | Single-line text entry | Name, city |
| `<input type="email">` | Email field with format validation | `user@example.com` |
| `<input type="password">` | Masked text entry | Login password |
| `<input type="tel">` | Phone number field (numeric keypad on mobile) | `+84 123 456 789` |
| `<input type="radio">` | Single selection from a group | Gender, membership type |
| `<input type="checkbox">` | Toggle on/off; multiple selections possible | Interests, agree to terms |
| `<input type="number">` | Numeric entry with optional min/max/step | Age, quantity |
| `<input type="date">` | Calendar date picker | Birthday, event date |
| `<select>` + `<option>` | Dropdown menu | Faculty selection |
| `<textarea>` | Multi-line text entry | Comments, motivation |
| `<label for="x">` | Accessible text linked to control with `id="x"` | `<label for="email">Email:</label>` |
| `<fieldset>` + `<legend>` | Visual/semantic grouping of related controls | Personal Info section |
| `required` | Blocks submission if field is empty | Mandatory fields |
| `placeholder` | Ghost hint text inside an empty field | `"e.g., student@vnu.edu.vn"` |
| `name` | Identifies the field's data when submitted | `name="email"` |

---

# 💡 WORKED EXAMPLES

## Example 1: Simple Contact Form

**Situation:**
We need a quick contact form for the Student Club Website's Contact page. It should collect the visitor's name, email, subject, and message.

**Code:**
```html
<form action="#" method="post" class="contact-form">
    <fieldset>
        <legend>Contact Us</legend>

        <div class="form-group">
            <label for="contact-name">Your Name:</label>
            <input type="text" id="contact-name" name="name"
                   placeholder="Full name" required>
        </div>

        <div class="form-group">
            <label for="contact-email">Your Email:</label>
            <input type="email" id="contact-email" name="email"
                   placeholder="you@example.com" required>
        </div>

        <div class="form-group">
            <label for="subject">Subject:</label>
            <select id="subject" name="subject">
                <option value="">-- Choose --</option>
                <option value="general">General Inquiry</option>
                <option value="membership">Membership Question</option>
                <option value="event">Event Information</option>
                <option value="feedback">Feedback</option>
            </select>
        </div>

        <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="5"
                      placeholder="Type your message here..." required></textarea>
        </div>

        <button type="submit" class="btn">Send Message</button>
    </fieldset>
</form>
```

**Line-by-line explanation:**

| Line(s) | Explanation |
|---------|-------------|
| `<form action="#" method="post">` | Creates the form. `action="#"` means no real server yet. `method="post"` hides data from the URL. |
| `<fieldset>` + `<legend>` | Groups everything under a titled border: "Contact Us". |
| `<div class="form-group">` | Wrapper div for each label+input pair. Makes CSS styling easier (margin, spacing). |
| `<label for="contact-name">` | The `for` value matches the input's `id`. Clicking the label focuses the input. |
| `<input type="text" ... required>` | Standard text field. `required` prevents empty submission. |
| `<input type="email" ... required>` | Email field with automatic format validation. |
| `<select>` + `<option>` | Dropdown for choosing a subject category. Empty first option forces a choice. |
| `<textarea ... rows="5">` | Five-row text area for the message. Content goes between tags, not in `value`. |
| `<button type="submit">` | Submit button. `type="submit"` is the default but writing it explicitly is good practice. |

**Result:**
A clean, accessible contact form with four fields inside a labeled fieldset. The browser validates required fields and email format before allowing submission.

---

## Example 2: Radio and Checkbox Group

**Situation:**
We need a section in the registration form where students pick their gender (one choice) and their interests (multiple choices).

**Code:**
```html
<!-- RADIO GROUP: pick exactly one -->
<div class="form-group">
    <label>Gender:</label>
    <div class="radio-group">
        <label>
            <input type="radio" name="gender" value="male"> Male
        </label>
        <label>
            <input type="radio" name="gender" value="female"> Female
        </label>
        <label>
            <input type="radio" name="gender" value="other"> Prefer not to say
        </label>
    </div>
</div>

<!-- CHECKBOX GROUP: pick zero or more -->
<div class="form-group">
    <label>Interests (check all that apply):</label>
    <div class="checkbox-group">
        <label>
            <input type="checkbox" name="interests" value="web"> Web Design
        </label>
        <label>
            <input type="checkbox" name="interests" value="programming"> Programming
        </label>
        <label>
            <input type="checkbox" name="interests" value="photo"> Photography
        </label>
        <label>
            <input type="checkbox" name="interests" value="music"> Music
        </label>
        <label>
            <input type="checkbox" name="interests" value="sports"> Sports
        </label>
        <label>
            <input type="checkbox" name="interests" value="volunteer"> Volunteering
        </label>
    </div>
</div>
```

**Line-by-line explanation:**

| Element | Explanation |
|---------|-------------|
| All radios share `name="gender"` | This groups them so only one can be selected at a time. |
| Each radio has a unique `value` | `"male"`, `"female"`, `"other"` — this is what gets submitted. |
| Each radio is wrapped in its own `<label>` | Clicking the text ("Male") selects the radio button. This is implicit label association. |
| All checkboxes share `name="interests"` | Same name means the server receives all checked values as an array. |
| Each checkbox has a unique `value` | `"web"`, `"programming"`, etc. — only checked ones are submitted. |
| Wrapping `<label>` around each checkbox | Makes the entire text clickable, not just the tiny box. |

**Result:**
- Gender: clicking "Female" selects it and deselects any previously chosen option.
- Interests: the user can check Web Design AND Music AND Sports simultaneously. Unchecked items are not submitted.

---

## Example 3: Form Validation Demo

**Situation:**
We want to see browser validation in action. Create a mini form and test what happens when you leave required fields empty or enter invalid data.

**Code:**
```html
<form action="#" method="post">
    <div class="form-group">
        <label for="val-name">Name (required):</label>
        <input type="text" id="val-name" name="name" required>
    </div>

    <div class="form-group">
        <label for="val-email">Email (required, must be valid):</label>
        <input type="email" id="val-email" name="email" required>
    </div>

    <div class="form-group">
        <label for="val-age">Age (18–65):</label>
        <input type="number" id="val-age" name="age"
               min="18" max="65">
    </div>

    <div class="form-group">
        <label for="val-phone">Phone (Vietnamese format):</label>
        <input type="tel" id="val-phone" name="phone"
               pattern="[0-9]{10}"
               title="Enter exactly 10 digits">
    </div>

    <button type="submit" class="btn">Test Validation</button>
</form>
```

**Line-by-line explanation:**

| Attribute | What it validates |
|-----------|------------------|
| `required` on name | Cannot submit with empty name. Browser shows "Please fill out this field." |
| `type="email"` + `required` on email | Cannot submit empty AND must match email pattern. Browser shows "Please include '@'." |
| `min="18" max="65"` on age | Spinner arrows stop at boundaries. Some browsers warn if value is outside range. |
| `pattern="[0-9]{10}"` on phone | Regular expression: exactly 10 digits. Browser shows the `title` text if it fails. |

**How to test:**
1. Leave Name empty → click Submit → browser highlights the field with an error message.
2. Type "not-an-email" in Email → click Submit → browser warns about invalid format.
3. Enter age 15 → some browsers show a warning (behavior varies).
4. Enter phone "123" → click Submit → browser shows "Enter exactly 10 digits".
5. Fill everything correctly → form submits (goes nowhere because `action="#"`).

**Result:**
You experience firsthand how HTML5 validation works without any JavaScript. This is built into every modern browser.

---

# 🛠️ HANDS-ON PRACTICE

## Setup

Before starting, make sure:
1. Your Student Club site folder is open in Dreamweaver (or VS Code).
2. You have completed Sessions 1–12 and have the standard site structure:
   ```
   student-club/
   ├── index.html
   ├── about.html
   ├── events.html
   ├── gallery.html
   ├── contact.html
   ├── css/
   │   └── style.css
   └── images/
   ```
3. Back up your site folder before making changes.

---

### TASK 1: Create the Membership Registration Page 🎯

🎯 **Goal:** Create `join.html` with a complete membership registration form.

📝 **What you will build:** A full-page form with four fieldsets (Personal Info, Academic Info, Interests, Additional Info), proper labels, validation, and styled buttons.

🔧 **Steps:**

1. **Create a new HTML file.**
   - In Dreamweaver: File → New → HTML → Create.
   - Save as `join.html` in your site root.

2. **Copy the standard page structure.**
   - Open `about.html` and copy the entire HTML structure (DOCTYPE, head, header, nav, main, sidebar, footer).
   - Paste it into `join.html`.
   - Change the `<title>` to `Student Club - Join Us`.
   - Add `<li><a href="join.html" class="active">Join Us</a></li>` to the navigation on ALL pages (including join.html itself).

3. **Replace the `<main>` content with the registration form.**
   - Delete everything inside `<main>` and replace it with the complete form below:

```html
<main>
    <h2>Join the Student Club</h2>
    <p>Fill out the form below to become a member. Fields marked with
       <span class="required">*</span> are required.</p>

    <form action="#" method="post" class="registration-form">
        <!-- ===== PERSONAL INFORMATION ===== -->
        <fieldset>
            <legend>Personal Information</legend>

            <div class="form-group">
                <label for="fullname">Full Name:
                    <span class="required">*</span></label>
                <input type="text" id="fullname" name="fullname"
                       placeholder="Enter your full name" required>
            </div>

            <div class="form-group">
                <label for="studentid">Student ID:
                    <span class="required">*</span></label>
                <input type="text" id="studentid" name="studentid"
                       placeholder="e.g., 20240001" required>
            </div>

            <div class="form-group">
                <label for="email">Email:
                    <span class="required">*</span></label>
                <input type="email" id="email" name="email"
                       placeholder="your.email@university.edu" required>
            </div>

            <div class="form-group">
                <label for="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone"
                       placeholder="+84 xxx xxx xxx">
            </div>

            <div class="form-group">
                <label for="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob">
            </div>

            <div class="form-group">
                <label>Gender:</label>
                <div class="radio-group">
                    <label>
                        <input type="radio" name="gender" value="male">
                        Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="female">
                        Female
                    </label>
                    <label>
                        <input type="radio" name="gender" value="other">
                        Other
                    </label>
                </div>
            </div>
        </fieldset>

        <!-- ===== ACADEMIC INFORMATION ===== -->
        <fieldset>
            <legend>Academic Information</legend>

            <div class="form-group">
                <label for="faculty">Faculty:
                    <span class="required">*</span></label>
                <select id="faculty" name="faculty" required>
                    <option value="">-- Select Faculty --</option>
                    <option value="it">Information Technology</option>
                    <option value="ba">Business Administration</option>
                    <option value="comm">Communication and Media</option>
                    <option value="eco">Economics</option>
                    <option value="law">Law</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div class="form-group">
                <label for="year">Year of Study:</label>
                <select id="year" name="year">
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                </select>
            </div>
        </fieldset>

        <!-- ===== INTERESTS ===== -->
        <fieldset>
            <legend>Interests</legend>
            <p>What activities interest you? (Check all that apply)</p>

            <div class="checkbox-group">
                <label>
                    <input type="checkbox" name="interests" value="web">
                    Web Design
                </label>
                <label>
                    <input type="checkbox" name="interests" value="programming">
                    Programming
                </label>
                <label>
                    <input type="checkbox" name="interests" value="photo">
                    Photography
                </label>
                <label>
                    <input type="checkbox" name="interests" value="music">
                    Music
                </label>
                <label>
                    <input type="checkbox" name="interests" value="sports">
                    Sports
                </label>
                <label>
                    <input type="checkbox" name="interests" value="volunteer">
                    Volunteering
                </label>
            </div>
        </fieldset>

        <!-- ===== ADDITIONAL INFORMATION ===== -->
        <fieldset>
            <legend>Additional Information</legend>

            <div class="form-group">
                <label for="why">Why do you want to join?</label>
                <textarea id="why" name="why" rows="4"
                          placeholder="Tell us about yourself..."></textarea>
            </div>

            <div class="form-group">
                <label for="profile">Profile Photo:</label>
                <input type="file" id="profile" name="profile"
                       accept="image/*">
            </div>

            <div class="form-group">
                <label>
                    <input type="checkbox" name="terms" required>
                    I agree to the
                    <a href="#">club rules and regulations</a>.
                    <span class="required">*</span>
                </label>
            </div>
        </fieldset>

        <!-- ===== BUTTONS ===== -->
        <div class="form-actions">
            <button type="submit" class="btn">Register Now</button>
            <button type="reset" class="btn btn-secondary">Clear Form</button>
        </div>
    </form>
</main>
```

4. **Save the file.**

✅ **Check:** Open `join.html` in the browser. You should see a structured form with four grouped sections, all labels aligned, required markers visible, and working dropdowns/radios/checkboxes. Try submitting with empty required fields to see validation messages.

💾 **Save point:** Commit or back up after completing Task 1.

---

### TASK 2: Style the Form with CSS 🎯

🎯 **Goal:** Add professional styling to the registration form that matches the Student Club Website theme.

📝 **What you will add:** Fieldset styling, input formatting, focus effects, radio/checkbox layout, button gradients, and required-field indicators.

🔧 **Steps:**

1. Open `css/style.css` in your editor.

2. Scroll to the bottom and add the following CSS block:

```css
/* =============================================
   FORM STYLES (Session 13)
   ============================================= */

/* --- Fieldset & Legend --- */
fieldset {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #fafafa;
}

legend {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    color: #1a5276;
    font-weight: bold;
    padding: 0 10px;
}

/* --- Form Groups --- */
.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    color: #333;
    font-size: 14px;
}

/* --- Input Fields --- */
.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="tel"],
.form-group input[type="date"],
.form-group input[type="password"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 10px 12px;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 15px;
    font-family: inherit;
    background-color: white;
    transition: border-color 0.3s, box-shadow 0.3s;
    box-sizing: border-box; /* Prevents overflow from padding */
}

/* --- Focus State --- */
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #2874a6;
    outline: none;
    box-shadow: 0 0 8px rgba(40, 116, 166, 0.3);
}

/* --- Placeholder --- */
.form-group input::placeholder,
.form-group textarea::placeholder {
    color: #aaa;
}

/* --- Radio & Checkbox Groups --- */
.radio-group,
.checkbox-group {
    margin-top: 5px;
}

.radio-group label,
.checkbox-group label {
    display: block;
    font-weight: normal;
    margin-bottom: 5px;
    cursor: pointer;
}

.radio-group input,
.checkbox-group input {
    margin-right: 8px;
}

/* --- Required Marker --- */
.required {
    color: #e74c3c;
    font-weight: bold;
}

/* --- Form Action Buttons --- */
.form-actions {
    text-align: center;
    margin-top: 25px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
}

.btn {
    background: linear-gradient(to right, #2874a6, #3498db);
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    margin: 0 5px;
}

.btn:hover {
    background: linear-gradient(to right, #1a5276, #2874a6);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
    background: #95a5a6;
}

.btn-secondary:hover {
    background: #7f8c8d;
}
```

3. **Save** `style.css`.

4. **Preview** `join.html` in the browser (F12).

✅ **Check:**
- Fieldsets have rounded borders and light gray backgrounds.
- Legends are styled in Montserrat blue.
- Input fields have consistent padding, borders, and rounded corners.
- Clicking into a field shows a blue glow (focus state).
- Radio buttons and checkboxes are stacked vertically with clickable labels.
- Red asterisks mark required fields.
- Buttons have gradient backgrounds and lift on hover.

💾 **Save point:** Back up after completing Task 2.

---

### TASK 3: Add the Contact Form to contact.html 🎯

🎯 **Goal:** Replace or enhance the existing contact page content with a styled contact form.

📝 **What you will build:** A simpler form (name, email, subject dropdown, message textarea) on the contact page.

🔧 **Steps:**

1. Open `contact.html`.

2. Inside `<main>`, keep the heading and introductory paragraph. Below them, add:

```html
<form action="#" method="post" class="contact-form">
    <fieldset>
        <legend>Send Us a Message</legend>

        <div class="form-group">
            <label for="c-name">Your Name:
                <span class="required">*</span></label>
            <input type="text" id="c-name" name="name"
                   placeholder="Full name" required>
        </div>

        <div class="form-group">
            <label for="c-email">Your Email:
                <span class="required">*</span></label>
            <input type="email" id="c-email" name="email"
                   placeholder="you@example.com" required>
        </div>

        <div class="form-group">
            <label for="c-subject">Subject:</label>
            <select id="c-subject" name="subject">
                <option value="">-- Choose --</option>
                <option value="general">General Inquiry</option>
                <option value="membership">Membership Question</option>
                <option value="event">Event Information</option>
                <option value="feedback">Feedback</option>
            </select>
        </div>

        <div class="form-group">
            <label for="c-message">Message:
                <span class="required">*</span></label>
            <textarea id="c-message" name="message" rows="5"
                      placeholder="Type your message here..."
                      required></textarea>
        </div>

        <div class="form-actions">
            <button type="submit" class="btn">Send Message</button>
        </div>
    </fieldset>
</form>
```

3. **Save** `contact.html`.

4. **Preview** in the browser. Test validation by leaving required fields empty.

✅ **Check:** The contact form appears below the existing contact information. It uses the same CSS styles as the registration form (consistent design). Required fields trigger validation messages when left empty.

💾 **Save point:** Final backup of Session 13 work.

---

# 🐛 COMMON ERRORS — WHAT THE BROWSER SHOWS YOU

Form bugs are the most costly kind, because a form that looks fine can still be losing every submission.

| Symptom you see | Likely cause | How to confirm | Fix |
|---|---|---|---|
| Server receives nothing, though the form submits | Inputs have no `name` attribute | Network tab → the request payload is empty | Every input that should be sent needs `name` |
| Clicking the label does not focus the field | `for` does not match the input's `id` | Inspect both values | `for` must equal the input's `id`, exactly |
| Two fields both focus the same input | Duplicate `id` values | Validator reports a duplicate ID | Make every `id` unique |
| Nothing happens when the button is clicked | Button is outside the `<form>`, or is `type="button"` | Check nesting and the `type` attribute | Put it inside the form; use `type="submit"` |
| Page reloads and clears the form | Normal default submission with no handler | Watch the address bar gain `?name=...` | Expected for `method="get"`; use POST or JavaScript to change it |
| Passwords appear in the URL | The form uses `method="get"` | Read the address bar after submitting | Use `method="post"` for anything sensitive |
| `required` never blocks submission | It is on a `<div>`, or `novalidate` is set on the form | Inspect the attributes | Put `required` on the input; remove `novalidate` |
| Radio buttons can all be selected at once | They have different `name` values | Compare the `name` attributes | One shared `name` groups them; `value` differs per option |
| Checkbox sends nothing when unticked | Unchecked boxes are never submitted | Network payload omits the key | Handle the absent key server-side, or add a hidden default |
| Mobile shows a full keyboard for an email field | `type="text"` used instead of `type="email"` | Test on a device | Use the right `type` — `email`, `tel`, `number`, `url` |
| Screen reader announces "edit text, blank" | No label associated with the input | Accessibility tree shows no name | Add `<label for>`, or `aria-label` if no visible label is possible |
| Error message not announced | Text added visually only | The accessibility tree does not change | Use `aria-describedby` on the input and `role="alert"` on the message |

**Never trust the browser as your only validation.** HTML5 attributes such as `required` and `type="email"` improve the experience, but a user can bypass them with DevTools in seconds. Every field must be validated again on the server. Client-side checks are for convenience; server-side checks are for correctness and security.

---


# ✅ SELF-CHECK QUESTIONS

Answer these from memory first, then expand the answer to check yourself.

**Q1. Why does every form input need a `<label>`, and how do you connect them?**

<details>
<summary>Answer</summary>

The `<label>` names the field for screen readers, and clicking it focuses the input — a bigger, easier target, which matters most on touch screens. Connect them by matching `for` to `id`: `<label for="email">Email</label>` with `<input id="email">`. Placeholder text is **not** a substitute: it disappears as soon as the user types.

</details>

---

**Q2. What is the difference between `name` and `id` on an input?**

<details>
<summary>Answer</summary>

`name` is what gets **submitted** — it becomes the key in the `name=value` pair the server receives, so an input without `name` sends nothing. `id` is for the page: it links the `<label for>` and gives CSS and JavaScript a handle. Most inputs need both, and using the same string for each is conventional.

</details>

---

**Q3. What do `method="get"` and `method="post"` each do, and when do you use them?**

<details>
<summary>Answer</summary>

`get` appends the data to the URL as a query string — visible, bookmarkable, length-limited. Use it for searches and filters. `post` sends the data in the request body — not visible in the URL, no practical size limit. Use it for anything that changes state or contains personal data: contact forms, registrations, passwords.

</details>

---

**Q4. Why use `type="email"` instead of `type="text"` for an email field?**

<details>
<summary>Answer</summary>

The browser validates the format for free and blocks submission of obvious nonsense, and mobile keyboards switch to a layout with `@` and `.` visible. The cost is zero. The same reasoning applies to `type="tel"`, `type="url"`, `type="number"`, and `type="date"` — each gives you validation and a better on-screen keyboard.

</details>

---

**Q5. What are `<fieldset>` and `<legend>` for?**

<details>
<summary>Answer</summary>

`<fieldset>` groups related controls, and `<legend>` labels the group. They matter most for radio buttons and checkboxes: a screen reader reading "Small" in isolation is useless, but with a legend it announces "T-shirt size: Small". Visually they also draw a border that shows which fields belong together.

</details>

---

**Q6. Why must radio buttons in one group share the same `name`?**

<details>
<summary>Answer</summary>

`name` is what makes them a **group**, and a group allows only one selection. Give each radio a different `name` and they stop being mutually exclusive — the user can select all of them, which defeats the purpose. Checkboxes are the opposite: they are independent, so distinct names are normal.

</details>

---

**Q7. Why is client-side validation not enough?**

<details>
<summary>Answer</summary>

`required`, `pattern`, and `type="email"` all run in the browser, and anyone can bypass them with DevTools or by sending the request directly. They exist to give **fast, friendly feedback** to honest users. Real security and data integrity require server-side validation, which is why you never trust form input.

</details>

---

**Q8. What does `<textarea rows="5" cols="40">` control, and what is the better approach?**

<details>
<summary>Answer</summary>

`rows` sets the visible height in text lines and `cols` the width in characters. Set `rows` in HTML as a sensible default, but control width in CSS with `width: 100%` so the field fits its container responsively — a fixed `cols="40"` overflows narrow phone screens. Note `<textarea>` needs a separate closing tag and its default value goes between the tags, not in a `value` attribute.

</details>

---


# 📝 SELF-ASSESSMENT WORKSHEET

| # | I can... | Yes | No |
|---|----------|-----|----|
| 1 | Create a `<form>` element with correct `action` and `method` attributes | ☐ | ☐ |
| 2 | Use at least six different `<input>` types (text, email, password, tel, radio, checkbox, number, date) | ☐ | ☐ |
| 3 | Create a dropdown menu with `<select>` and `<option>` | ☐ | ☐ |
| 4 | Create a multi-line text area with `<textarea>` | ☐ | ☐ |
| 5 | Associate every form control with a `<label>` using matching `for`/`id` | ☐ | ☐ |
| 6 | Group related fields with `<fieldset>` and `<legend>` | ☐ | ☐ |
| 7 | Apply `required` and `placeholder` attributes correctly | ☐ | ☐ |
| 8 | Style form controls with CSS (borders, focus states, buttons) | ☐ | ☐ |

If you answered **No** to any row, re-read the relevant Theory section and redo the corresponding Hands-On task before moving on.

---

# 🔗 FURTHER READING

- [MDN: Learn Forms (complete guide)](https://developer.mozilla.org/en-US/docs/Learn/Forms)
- [MDN: Your First Form](https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form)
- [MDN: `<input>` Element Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
- [MDN: `<form>` Element Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- [MDN: `<label>` Element Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
- [MDN: `<fieldset>` Element Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset)
- [MDN: `<select>` Element Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)
- [MDN: `<textarea>` Element Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
- [MDN: Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [MDN: Styling Web Forms](https://developer.mozilla.org/en-US/docs/Learn/Forms/Styling_web_forms)
- [W3C: HTML5 Forms Specification](https://www.w3.org/TR/html52/sec-forms.html)

---

# ⏭️ NEXT SESSION

In Session 14 we explore the legacy Spry Framework (included with Dreamweaver CS6), understand why it is obsolete, and learn the modern CSS-only alternative for dropdown navigation menus.
