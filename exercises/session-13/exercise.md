# Session 13 — In-Class Exercise: Creating Forms

## Objective
- Build an HTML form with different input types
- Use `<label>` elements to make forms accessible
- Understand `action` and `method` attributes

## Time Required
Estimated time: 55 minutes

## Instructions

### Task 1: Understand How Forms Work
A **form** lets users enter data and send it to a server. Examples: login forms, registration forms, contact forms, search boxes.

Key HTML elements for forms:
- `<form>` — wraps the entire form
- `<input>` — a field where the user types or selects something
- `<label>` — text that describes what the input is for
- `<select>` — a dropdown menu
- `<textarea>` — a multi-line text box
- `<button>` — a clickable button

**Form attributes:**
- `action` — the URL where form data is sent (e.g., `action="submit.php"`)
- `method` — how data is sent: `GET` (data in URL) or `POST` (data hidden)

Create a new file called `register.html` in the `club-website` folder:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Join the Club</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Student Technology Club</h1>
    </header>

    <nav class="main-nav">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="pages/events.html">Events</a></li>
            <li><a href="pages/contact.html">Contact</a></li>
        </ul>
    </nav>

    <main>
        <h2>Join the Club</h2>
        <p>Fill out the form below to register as a new member.</p>

        <form action="confirm.html" method="get">
            <!-- Form fields will go here -->
        </form>
    </main>

    <footer>
        <p>&copy; 2025 Student Technology Club</p>
    </footer>
</body>
</html>
```

### Task 2: Add Text Input Fields
The most common input type is `text`. Each input needs a `<label>` so the user knows what to type.

Add these fields inside the `<form>`:

```html
        <form action="confirm.html" method="get">

            <!-- Full Name -->
            <div class="form-group">
                <label for="fullname">Full Name:</label>
                <input type="text" id="fullname" name="fullname" 
                       placeholder="Enter your full name" required>
            </div>

            <!-- Email -->
            <div class="form-group">
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" 
                       placeholder="your.email@student.edu.vn" required>
            </div>

            <!-- Password (for account creation) -->
            <div class="form-group">
                <label for="password">Choose a Password:</label>
                <input type="password" id="password" name="password" 
                       placeholder="At least 6 characters" minlength="6" required>
            </div>

        </form>
```

**Important attributes:**

| Attribute | Purpose |
|-----------|---------|
| `type="text"` | Single-line text input |
| `type="email"` | Email input (browser checks for @ symbol) |
| `type="password"` | Text is hidden (shown as dots) |
| `id` | Unique ID — must match the `for` attribute on the `<label>` |
| `name` | The key used when data is sent to the server |
| `placeholder` | Gray hint text shown inside the field |
| `required` | User must fill this field before submitting |
| `minlength` | Minimum number of characters |

**Why `<label>` matters:**
- `for="fullname"` on the `<label>` connects it to `id="fullname"` on the `<input>`
- When the user clicks the label text, the input field gets focus
- Screen readers read the label to tell blind users what the field is for

### Task 3: Add Radio Buttons, Checkboxes, and Dropdown
Continue adding fields inside the `<form>`:

```html
            <!-- Major (dropdown) -->
            <div class="form-group">
                <label for="major">Your Major:</label>
                <select id="major" name="major" required>
                    <option value="">-- Select your major --</option>
                    <option value="cs">Computer Science</option>
                    <option value="is">Information Systems</option>
                    <option value="dm">Digital Media</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <!-- Year (radio buttons) -->
            <div class="form-group">
                <label>Current Year:</label>
                <div class="radio-group">
                    <input type="radio" id="year1" name="year" value="1" required>
                    <label for="year1">1st Year</label>

                    <input type="radio" id="year2" name="year" value="2">
                    <label for="year2">2nd Year</label>

                    <input type="radio" id="year3" name="year" value="3">
                    <label for="year3">3rd Year</label>

                    <input type="radio" id="year4" name="year" value="4">
                    <label for="year4">4th Year</label>
                </div>
            </div>

            <!-- Interests (checkboxes) -->
            <div class="form-group">
                <label>Areas of Interest (select all that apply):</label>
                <div class="checkbox-group">
                    <input type="checkbox" id="int-html" name="interests" value="html">
                    <label for="int-html">HTML &amp; CSS</label>

                    <input type="checkbox" id="int-js" name="interests" value="js">
                    <label for="int-js">JavaScript</label>

                    <input type="checkbox" id="int-design" name="interests" value="design">
                    <label for="int-design">Web Design</label>

                    <input type="checkbox" id="int-db" name="interests" value="db">
                    <label for="int-db">Databases</label>

                    <input type="checkbox" id="int-mobile" name="interests" value="mobile">
                    <label for="int-mobile">Mobile Apps</label>
                </div>
            </div>

            <!-- About you (textarea) -->
            <div class="form-group">
                <label for="about">Tell us about yourself:</label>
                <textarea id="about" name="about" rows="4" cols="50" 
                          placeholder="Why do you want to join the club?"></textarea>
            </div>

            <!-- Submit button -->
            <div class="form-group">
                <button type="submit" class="btn">Register Now</button>
                <button type="reset" class="btn btn-reset">Clear Form</button>
            </div>
```

**New element types:**
- `<select>` with `<option>` — creates a dropdown menu
- `type="radio"` — radio buttons (user can pick only ONE from the group)
  - All radio buttons in the same group must have the **same `name`**
- `type="checkbox"` — checkboxes (user can pick ZERO or MORE)
- `<textarea>` — multi-line text box (use `rows` and `cols` for size)
- `type="submit"` — sends the form data
- `type="reset"` — clears all fields

### Task 4: Style the Form with CSS
Add these rules to `css/style.css`:

```css
/* Form styling */
.form-group {
    margin-bottom: 18px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #2c3e50;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"],
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    font-size: 15px;
    font-family: 'Open Sans', Arial, sans-serif;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #2980b9;
    outline: none;
    box-shadow: 0 0 5px rgba(41, 128, 185, 0.3);
}

.radio-group,
.checkbox-group {
    margin-top: 5px;
}

.radio-group label,
.checkbox-group label {
    display: inline;
    font-weight: normal;
    margin-right: 15px;
    cursor: pointer;
}

/* Reset button styling */
.btn-reset {
    background-color: #95a5a6;
    margin-left: 10px;
}

.btn-reset:hover {
    background-color: #7f8c8d;
}
```

**New CSS concepts:**
- `input[type="text"]` — targets only text inputs (not radio buttons or checkboxes)
- `:focus` — styles the input when the user clicks on it or tabs to it
- `outline: none` — removes the default blue outline (we replace it with our own border color)
- `box-shadow: 0 0 5px rgba(...)` — adds a glow effect around the focused input

Save and preview `register.html`. You should see a clean, professional registration form.

### Task 5: Create a Confirmation Page
Create `confirm.html` in the `club-website` folder. This page is shown after the user submits the form:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Registration Complete</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Student Technology Club</h1>
    </header>

    <nav class="main-nav">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="pages/events.html">Events</a></li>
            <li><a href="pages/contact.html">Contact</a></li>
        </ul>
    </nav>

    <main>
        <h2>Thank You for Registering!</h2>
        <p>Your registration has been received. We will contact you soon with 
        more information about upcoming meetings and events.</p>
        <p><a href="index.html" class="btn">Return to Home Page</a></p>
    </main>

    <footer>
        <p>&copy; 2025 Student Technology Club</p>
    </footer>
</body>
</html>
```

Add a link to `register.html` from `index.html` and `about.html`:
```html
<p>Ready to join? <a href="register.html" class="btn">Register Now</a></p>
```

## Starter Files
- `club-website` folder from previous sessions
- `css/style.css` with all previous CSS rules

## Expected Result

```
┌──────────────────────────────────────────────────┐
│  [dark header]  Student Technology Club          │
├──────────────────────────────────────────────────┤
│  [nav bar]  Home | About | Events | Contact      │
├──────────────────────────────────────────────────┤
│                                                  │
│  Join the Club                                   │
│  Fill out the form below to register:            │
│                                                  │
│  Full Name:                                      │
│  ┌──────────────────────────────────────────┐    │
│  │  Enter your full name                    │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  Email Address:                                  │
│  ┌──────────────────────────────────────────┐    │
│  │  your.email@student.edu.vn               │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  Choose a Password:                              │
│  ┌──────────────────────────────────────────┐    │
│  │  ••••••                                  │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  Your Major:  [ -- Select your major -- ▼ ]      │
│                                                  │
│  Current Year:                                   │
│  (o) 1st Year  (o) 2nd Year  (o) 3rd Year  ...  │
│                                                  │
│  Areas of Interest:                              │
│  [✓] HTML & CSS  [ ] JavaScript  [ ] Web Design │
│  [ ] Databases   [ ] Mobile Apps                 │
│                                                  │
│  Tell us about yourself:                         │
│  ┌──────────────────────────────────────────┐    │
│  │  Why do you want to join the club?       │    │
│  │                                          │    │
│  │                                          │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  [Register Now]  [Clear Form]                    │
│                                                  │
├──────────────────────────────────────────────────┤
│  [footer]  (c) 2025 Student Technology Club      │
└──────────────────────────────────────────────────┘
```

## Self-Check (answers included)

Answer from **your own `register.html`** first, then open the arrow.

<details>
<summary>1. What does `<label for="email">` actually do, and why is a placeholder not a substitute?</summary>

`for="email"` binds the label to the input whose **`id`** is `email`. Two concrete
consequences:

1. Clicking the label focuses the field — a bigger, easier target, which matters
   on a phone.
2. A screen reader announces "Email Address, edit text" when the field is
   reached. Without the binding it announces "edit text" and the user has no idea
   what to type.

A `placeholder` cannot replace it because placeholder text **disappears the moment
you start typing**. The user who is interrupted mid-form has lost the only clue
about what the field was for, and assistive technology treats placeholders as a
hint, not a name.

Remember the pairing: `for` matches `id`, not `name`.

</details>

<details>
<summary>2. Radio buttons vs checkboxes — what makes radios mutually exclusive, and what is the most common mistake?</summary>

The shared **`name`** attribute. Radio buttons with the same `name` form one group,
and only one member of a group can be selected.

```html
<input type="radio" id="year1" name="year" value="1">
<input type="radio" id="year2" name="year" value="2">
```

Same `name` (`year`), different `id` and different `value`.

The classic mistake is giving each radio its own `name`. Every button then forms
a group of one, so all of them can be ticked at once — and the form no longer
means what you intended.

Checkboxes are the opposite: multiple selections are the point, so each one can
carry its own name, or they share a name when they represent several answers to
one question.

Also required on both: a `value`. Without it the server receives just `on`, which
tells you nothing about which option was chosen.

</details>

<details>
<summary>3. `method="get"` vs `method="post"` — and why is neither of them enough to make your password field safe?</summary>

- **GET** appends the data to the URL: `confirm.html?fullname=Linh&email=...`.
  Visible in the address bar, stored in history, logged by servers, and length is
  limited. Use it for searches and filters — things that are safe to repeat and
  to bookmark.
- **POST** sends the data in the request body. Not in the URL, not in history, no
  practical size limit. Use it for anything that changes data or is private.

Now the part the exercise deliberately sets up: this form uses
`method="get"` with a password field. That is fine here only because nothing real
is being sent and there is no server — `confirm.html` is a stand-in.

On a real site, POST alone would still not be enough. POST hides the data from the
URL but sends it in plain text over the network; only **HTTPS** encrypts it. And
neither method validates anything — `required` and `type="email"` are conveniences
the browser offers, trivially bypassed. Every field must be re-validated on the
server, which is where the next course picks up.

</details>

<details>
<summary>4. Challenge — no code given: add an accessible "preferred contact time" question with three options, and group it correctly with a caption. Write it yourself first.</summary>

```html
<fieldset>
    <legend>Preferred contact time</legend>

    <div class="form-group">
        <input type="radio" id="time-morning" name="contact-time" value="morning" checked>
        <label for="time-morning">Morning (8:00–11:00)</label>
    </div>

    <div class="form-group">
        <input type="radio" id="time-afternoon" name="contact-time" value="afternoon">
        <label for="time-afternoon">Afternoon (13:00–17:00)</label>
    </div>

    <div class="form-group">
        <input type="radio" id="time-evening" name="contact-time" value="evening">
        <label for="time-evening">Evening (after 18:00)</label>
    </div>
</fieldset>
```

Four things to check against your version:

1. `<fieldset>` + `<legend>` is how you group related inputs. A screen reader
   announces the legend before each option, so the user hears "Preferred contact
   time, Morning". A plain `<h3>` above the inputs conveys nothing to it.
2. One shared `name="contact-time"`, three distinct `id` values.
3. Every `label` has a `for` matching its input's `id`.
4. `checked` on one option gives a sensible default, so the field is never
   submitted empty.

</details>

## Checklist
- [ ] Created `register.html` with a `<form>` element
- [ ] Added text input fields with `<label>` (full name, email, password)
- [ ] Used `type="email"` for the email field
- [ ] Used `type="password"` for the password field
- [ ] Added a `<select>` dropdown for major selection
- [ ] Added radio buttons for year (all with the same `name`)
- [ ] Added checkboxes for interests (multiple selections allowed)
- [ ] Added a `<textarea>` for the "about yourself" field
- [ ] Added a submit button and a reset button
- [ ] Each `<label>` has a `for` attribute matching the input's `id`
- [ ] Form has `action="confirm.html"` and `method="get"`
- [ ] Created `confirm.html` as a confirmation page
- [ ] Form fields are styled with CSS (focus effect, spacing, border radius)

## Tips
- Every `<input>` should have a matching `<label>` with `for` pointing to the input's `id`. This is required for accessibility.
- Radio buttons in the same group must have the **same `name`** attribute. Otherwise, the user can select more than one.
- `required` is a boolean attribute — just write `required`, not `required="true"`.
- The `action` attribute determines where the form data goes. In a real website, this would be a server-side script (PHP, Node.js). For this exercise, we use `confirm.html` as a placeholder.
- `method="get"` puts form data in the URL (visible). `method="post"` hides it (better for passwords). For this exercise, `get` is fine because we are not sending real data.
