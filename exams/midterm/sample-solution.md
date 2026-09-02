# Midterm Exam — Sample Solution

Complete solution code for the INS2053 midterm exam.

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

    <!-- HEADER: Club name -->
    <header>
        <h1>CodeBreakers Club</h1>
    </header>

    <!-- NAV: Navigation links — "Home" is the active page -->
    <nav>
        <a href="index.html" class="active">Home</a>
        <a href="about.html">About</a>
        <a href="activities.html">Activities</a>
    </nav>

    <!-- MAIN CONTENT: Wrapped in a container div -->
    <div class="container">
        <main>
            <h2>Welcome to CodeBreakers Club</h2>
            <p>
                Welcome to CodeBreakers Club — the place where students come together 
                to learn, code, and grow. Whether you are a beginner or an experienced 
                programmer, there is something here for everyone. Join us for weekly 
                workshops, hackathons, and fun coding challenges.
            </p>
            <img src="images/logo.png" alt="CodeBreakers Club logo">
        </main>
    </div>

    <!-- FOOTER: Copyright notice -->
    <footer>
        <p>Copyright 2025 CodeBreakers Club</p>
    </footer>

</body>
</html>
```

### Explanation
- `<!DOCTYPE html>` declares HTML5.
- `<meta charset="UTF-8">` ensures proper character encoding.
- `<link rel="stylesheet" href="css/style.css">` connects the external CSS file.
- `<header>` contains the club name as an `<h1>`.
- `<nav>` has 3 links; the current page (Home) has `class="active"`.
- `<div class="container">` wraps the `<main>` content so CSS styling applies.
- `<footer>` contains the copyright text.

---

## File: `about.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About — CodeBreakers Club</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- HEADER -->
    <header>
        <h1>CodeBreakers Club</h1>
    </header>

    <!-- NAV: "About" is the active page here -->
    <nav>
        <a href="index.html">Home</a>
        <a href="about.html" class="active">About</a>
        <a href="activities.html">Activities</a>
    </nav>

    <!-- MAIN CONTENT -->
    <div class="container">
        <main>
            <h1>About CodeBreakers Club</h1>

            <!-- Paragraph 1: About the club -->
            <p>
                CodeBreakers Club was founded in 2020 by a group of passionate 
                computer science students at VNU University of Science. Our mission 
                is to create a friendly community where students can improve their 
                programming skills and learn new technologies together.
            </p>

            <!-- Paragraph 2: What the club does -->
            <p>
                Every week we hold coding workshops and hackathon practice sessions 
                covering topics from web development to artificial intelligence. 
                Our members regularly compete in national and international 
                programming contests and have won many awards.
            </p>

            <!-- Unordered list: 3 benefits -->
            <h2>Why Join Us?</h2>
            <ul>
                <li>Weekly coding workshops on web, mobile, and AI</li>
                <li>Hackathon training and team formation support</li>
                <li>Networking with industry professionals and alumni</li>
            </ul>

            <!-- Image with src and alt -->
            <img src="images/logo.png" alt="CodeBreakers Club logo">
        </main>
    </div>

    <!-- FOOTER -->
    <footer>
        <p>Copyright 2025 CodeBreakers Club</p>
    </footer>

</body>
</html>
```

### Explanation
- Same `<head>` structure as `index.html` with CSS link.
- Navigation is identical but `about.html` link has `class="active"`.
- Two paragraphs each with at least 2 sentences.
- Unordered list has exactly 3 items.
- Image uses relative path `images/logo.png` with descriptive `alt`.

---

## File: `activities.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activities — CodeBreakers Club</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- HEADER -->
    <header>
        <h1>CodeBreakers Club</h1>
    </header>

    <!-- NAV: "Activities" is the active page here -->
    <nav>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="activities.html" class="active">Activities</a>
    </nav>

    <!-- MAIN CONTENT -->
    <div class="container">
        <main>
            <h1>Club Activities</h1>

            <p>
                CodeBreakers Club runs a variety of activities throughout the semester. 
                From beginner-friendly workshops to advanced algorithm competitions, 
                there is something for every skill level. All activities are free 
                for club members.
            </p>

            <h2>Our Regular Events</h2>
            <ul>
                <li>Monday: Web Development Workshop (6 PM — Room 301)</li>
                <li>Wednesday: Algorithm Practice Session (6 PM — Lab 202)</li>
                <li>Friday: Open Coding Night (7 PM — Student Hub)</li>
            </ul>
        </main>
    </div>

    <!-- FOOTER -->
    <footer>
        <p>Copyright 2025 CodeBreakers Club</p>
    </footer>

</body>
</html>
```

### Explanation
- Same structure as other pages.
- Navigation has `class="active"` on the Activities link.
- Contains a paragraph and a list describing activities.

---

## File: `css/style.css`

```css
/* ===== BODY STYLES ===== */
/* Set default font for the entire site */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    background-color: #f5f5f5;
}

/* ===== HEADING STYLES ===== */
/* Club name in header — dark blue, centered */
h1 {
    color: #003366;
    text-align: center;
}

/* ===== PARAGRAPH STYLES ===== */
/* Readable body text */
p {
    font-size: 16px;
    line-height: 1.5;
    color: #333;
}

/* ===== CONTAINER ===== */
/* Centers content and limits width */
.container {
    max-width: 960px;
    margin: 20px auto;
    padding: 10px;
    background-color: #fff;
}

/* ===== NAVIGATION BAR ===== */
/* Dark blue background for the nav bar */
nav {
    background-color: #003366;
    padding: 10px;
}

/* Navigation links — white text, no underline */
nav a {
    color: #fff;
    text-decoration: none;
    margin-right: 15px;
}

/* Active page link — bold and yellow */
nav a.active {
    font-weight: bold;
    color: #ffcc00;
}

/* ===== FOOTER ===== */
footer {
    text-align: center;
    padding: 10px;
    color: #666;
    font-size: 14px;
}
```

### Explanation
- **`body`**: Sets font family to Arial with a light gray background.
- **`h1`**: Dark blue (`#003366`) and centered.
- **`p`**: 16px font, 1.5 line height for readability, dark gray text.
- **`.container`**: Max 960px wide, centered with `auto` margins, white background.
- **`nav`**: Dark blue background with padding.
- **`nav a`**: White links with no underline and spacing between them.
- **`nav a.active`**: Bold text in yellow to highlight current page.

---

## Folder Structure After Completion

```
exam-midterm/
├── index.html          ✓ Created with header, nav, main, footer
├── about.html          ✓ Created with headings, paragraphs, list, image
├── activities.html     ✓ Created with matching layout
├── css/
│   └── style.css       ✓ Created with all required selectors
└── images/
    └── logo.png        ✓ Pre-placed (provided by instructor)
```

---

## Key Points for Students

1. **File paths matter**: CSS is in `css/` folder, images in `images/` folder. Use relative paths like `css/style.css` and `images/logo.png`.
2. **Navigation must be identical** on every page — only the `class="active"` changes.
3. **Semantic HTML** means using `<header>`, `<nav>`, `<main>`, `<footer>` instead of generic `<div>` tags.
4. **The `.container` class** wraps main content to apply the centered white-box styling.
5. **All tags must be closed** — `<p>...</p>`, `<li>...</li>`, etc.
