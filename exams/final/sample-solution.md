# Final Exam — Sample Solution

Complete solution code for the INS2053 final exam.

---

## File: `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodeBreakers Club — Home</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <header>
        <h1>CodeBreakers Club</h1>
    </header>

    <nav>
        <a href="index.html" class="active">Home</a>
        <a href="schedule.html">Schedule</a>
        <a href="media.html">Media</a>
        <a href="join.html">Join</a>
    </nav>

    <div class="container">
        <main>
            <h2>Welcome to CodeBreakers Club</h2>
            <p>
                CodeBreakers Club is a student-run community dedicated to coding, 
                learning, and fun. We organize workshops, hackathons, and coding 
                competitions throughout the year.
            </p>
            <p class="cta">
                <strong>Ready to level up your coding skills?</strong> 
                <a href="join.html">Join us today!</a>
            </p>
        </main>
    </div>

    <footer>
        <p>Copyright 2025 CodeBreakers Club</p>
    </footer>

</body>
</html>
```

---

## File: `schedule.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Schedule — CodeBreakers Club</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <header>
        <h1>CodeBreakers Club</h1>
    </header>

    <nav>
        <a href="index.html">Home</a>
        <a href="schedule.html" class="active">Schedule</a>
        <a href="media.html">Media</a>
        <a href="join.html">Join</a>
    </nav>

    <div class="container">
        <main>
            <h1>Club Schedule</h1>

            <table>
                <caption>Weekly Club Schedule</caption>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Activity</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Monday</td>
                        <td>18:00 – 20:00</td>
                        <td>Web Development Workshop</td>
                        <td>Room 301</td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td>18:00 – 20:00</td>
                        <td>Algorithm Practice</td>
                        <td>Lab 202</td>
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td>19:00 – 21:00</td>
                        <td>Open Coding Night</td>
                        <td>Student Hub</td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td colspan="2">Rest Day — No Activities</td>
                        <td>—</td>
                    </tr>
                </tbody>
            </table>
        </main>
    </div>

    <footer>
        <p>Copyright 2025 CodeBreakers Club</p>
    </footer>

</body>
</html>
```

### Explanation
- `<caption>` provides the table title.
- `<thead>` wraps the header row with `<th>` elements.
- `<tbody>` wraps the 4 data rows.
- The "Rest Day" row uses `colspan="2"` to span the Time and Activity columns.

---

## File: `media.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Media — CodeBreakers Club</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <header>
        <h1>CodeBreakers Club</h1>
    </header>

    <nav>
        <a href="index.html">Home</a>
        <a href="schedule.html">Schedule</a>
        <a href="media.html" class="active">Media</a>
        <a href="join.html">Join</a>
    </nav>

    <div class="container">
        <main>
            <h1>Club Media Gallery</h1>

            <h2>Workshop Recording</h2>
            <p>
                Watch the recording from our latest web development workshop 
                where we built a complete website from scratch.
            </p>
            <video controls poster="images/logo.png" width="480">
                <source src="media/workshop.mp4" type="video/mp4">
                <source src="media/workshop.webm" type="video/webm">
                Your browser does not support the video tag.
            </video>

            <h2>Club Podcast</h2>
            <p>
                Listen to our monthly club podcast where members share coding tips, 
                career advice, and discuss the latest tech trends.
            </p>
            <audio controls>
                <source src="media/podcast.mp3" type="audio/mpeg">
                <source src="media/podcast.ogg" type="audio/ogg">
                Your browser does not support the audio tag.
            </audio>
        </main>
    </div>

    <footer>
        <p>Copyright 2025 CodeBreakers Club</p>
    </footer>

</body>
</html>
```

### Explanation
- `<video>` has `controls` for playback buttons, `poster` for the thumbnail, and `width="480"`.
- Two `<source>` elements: one MP4, one WebM for cross-browser support.
- Fallback text appears between `<video>` and `</video>` for unsupported browsers.
- `<audio>` follows the same pattern with MP3 and OGG sources.

---

## File: `join.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Join — CodeBreakers Club</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <header>
        <h1>CodeBreakers Club</h1>
    </header>

    <nav>
        <a href="index.html">Home</a>
        <a href="schedule.html">Schedule</a>
        <a href="media.html">Media</a>
        <a href="join.html" class="active">Join</a>
    </nav>

    <div class="container">
        <main>
            <h1>Join the Club</h1>
            <p>Fill out the form below to become a member of CodeBreakers Club.</p>

            <form action="#" method="POST">

                <!-- Personal Information -->
                <fieldset>
                    <legend>Personal Information</legend>

                    <div class="form-group">
                        <label for="name">Full Name:</label>
                        <input type="text" id="name" name="name" required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email Address:</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                </fieldset>

                <!-- Membership Details -->
                <fieldset>
                    <legend>Membership Details</legend>

                    <div class="form-group">
                        <label>Membership Type:</label>
                        <input type="radio" id="student" name="membership" value="student">
                        <label for="student">Student</label>

                        <input type="radio" id="alumni" name="membership" value="alumni">
                        <label for="alumni">Alumni</label>
                    </div>

                    <div class="form-group">
                        <label for="department">Department:</label>
                        <select id="department" name="department">
                            <option value="">-- Select Department --</option>
                            <option value="cs">Computer Science</option>
                            <option value="math">Mathematics</option>
                            <option value="physics">Physics</option>
                            <option value="business">Business Administration</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="message">Why do you want to join?</label>
                        <textarea id="message" name="message" rows="5" cols="40" 
                            placeholder="Tell us why you want to join..."></textarea>
                    </div>
                </fieldset>

                <!-- Agreement -->
                <div class="form-group">
                    <input type="checkbox" id="terms" name="terms" required>
                    <label for="terms">I agree to the club rules and code of conduct</label>
                </div>

                <!-- Submit -->
                <div class="form-group">
                    <button type="submit">Join Now</button>
                </div>

            </form>
        </main>
    </div>

    <footer>
        <p>Copyright 2025 CodeBreakers Club</p>
    </footer>

</body>
</html>
```

### Explanation
- Form uses `action="#"` and `method="POST"`.
- Two `<fieldset>` elements group related inputs with `<legend>` titles.
- Every input has a `<label>` with matching `for` attribute.
- Name and email fields are `required`.
- Radio buttons share `name="membership"` but have different `id` and `value`.
- Select has 4 department options plus a default empty option.
- Textarea has `rows="5"` and `cols="40"` with placeholder text.
- Checkbox is `required` with a label.
- Submit button uses `<button type="submit">`.

---

## File: `css/style.css`

```css
/* ===== BODY ===== */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    color: #333;
}

/* ===== HEADER ===== */
header {
    background-color: #003366;
    color: #fff;
    text-align: center;
    padding: 15px;
}

header h1 {
    margin: 0;
    color: #fff;
}

/* ===== NAVIGATION ===== */
nav {
    background-color: #004488;
    padding: 10px;
    text-align: center;
}

nav a {
    color: #fff;
    text-decoration: none;
    margin: 0 15px;
    padding: 5px 10px;
}

nav a:hover {
    background-color: #005599;
    border-radius: 3px;
}

nav a.active {
    font-weight: bold;
    color: #ffcc00;
    border-bottom: 2px solid #ffcc00;
}

/* ===== CONTAINER ===== */
.container {
    max-width: 960px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
}

/* ===== HEADINGS ===== */
h1 {
    color: #003366;
}

h2 {
    color: #004488;
}

/* ===== TABLE STYLES ===== */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

caption {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
    color: #003366;
}

th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
}

th {
    background-color: #003366;
    color: #fff;
}

/* Alternate row colors for readability */
tbody tr:nth-child(even) {
    background-color: #f0f0f0;
}

/* ===== FORM STYLES ===== */
fieldset {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 15px;
}

legend {
    font-weight: bold;
    color: #003366;
    padding: 0 10px;
}

.form-group {
    margin-bottom: 12px;
}

label {
    display: block;
    margin-bottom: 4px;
    font-weight: bold;
}

input[type="text"],
input[type="email"],
select,
textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
    font-size: 14px;
}

/* Radio and checkbox labels are inline */
input[type="radio"] + label,
input[type="checkbox"] + label {
    display: inline;
    font-weight: normal;
    margin-left: 5px;
}

button[type="submit"] {
    background-color: #003366;
    color: #fff;
    padding: 10px 30px;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #004488;
}

/* ===== CALL TO ACTION ===== */
.cta {
    background-color: #fff8e1;
    padding: 15px;
    border-left: 4px solid #ffcc00;
    margin: 20px 0;
}

.cta a {
    color: #003366;
    font-weight: bold;
}

/* ===== FOOTER ===== */
footer {
    text-align: center;
    padding: 15px;
    color: #666;
    font-size: 14px;
    background-color: #eee;
}

/* ===== RESPONSIVE — MOBILE ===== */
/* Stack navigation vertically on screens smaller than 768px */
@media (max-width: 768px) {
    nav a {
        display: block;
        margin: 5px 0;
        padding: 8px;
    }

    .container {
        margin: 10px;
        padding: 10px;
    }

    table, th, td {
        font-size: 14px;
    }

    input[type="text"],
    input[type="email"],
    select,
    textarea {
        width: 100%;
    }
}
```

### Explanation
- **Body**: Arial font, light gray background.
- **Header**: Dark blue with white text.
- **Nav**: Blue bar with white links; active link is bold and yellow.
- **Container**: White card with max-width 960px, centered.
- **Table**: Full-width, borders collapsed, header row dark blue with white text, alternating row colors.
- **Form**: Fieldsets with rounded borders, inputs full-width, styled submit button.
- **Media query at 768px**: Nav links become `display: block` to stack vertically on mobile.

---

## Folder Structure After Completion

```
exam-final/
├── index.html          ✓ Home page with semantic structure + viewport meta
├── schedule.html       ✓ Table with thead, tbody, caption, colspan
├── media.html          ✓ Video + audio elements with sources + fallback
├── join.html           ✓ Complete form with all required input types
├── css/
│   └── style.css       ✓ Full stylesheet + responsive media query
└── images/
    └── logo.png        ✓ Pre-placed
```

---

## Key Points for Students

1. **Viewport meta tag** is required on EVERY page for responsive design.
2. **Media query** must use `max-width: 768px` and make nav links `display: block`.
3. **Form labels** must have `for` matching the input `id` exactly.
4. **Table** must use `<thead>`, `<tbody>`, `<th>` for headers, `<td>` for data.
5. **Media elements** do not need actual files — the HTML structure is what is graded.
6. **Navigation** must be identical across all 4 pages.
