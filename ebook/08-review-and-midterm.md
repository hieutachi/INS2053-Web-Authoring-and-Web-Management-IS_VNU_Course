# 🟦 SESSION 8
# **Review & Midterm Exam Preparation**

Congratulations on making it to the midpoint of INS2053! You have covered an enormous amount of ground in seven sessions — from your very first HTML tag to CSS3 animations and Google Fonts. This session is different: there is no new theory to learn. Instead, we will consolidate everything you already know, identify any gaps, and practise with realistic exam-style questions so that when you walk into the midterm, you feel confident and prepared. Think of this as your personal revision coach.

---

# 📌 SESSION INFORMATION

```
📅 Duration:     3 periods (150 minutes) — Review ~60 min, Practice exam ~90 min
📚 Reference:    Ebook Chapters 1-7; lecture slides Sessions 1-7
🎯 Objectives:   1. Recap all key concepts from Sessions 1-7
                 2. Understand the midterm format and marking criteria
                 3. Practise with worked exam questions
                 4. Build a study plan for your remaining gaps
📖 Prepare:      1. Re-read your own notes from Sessions 1-7
                 2. Have your Student Club Website project open for reference
                 3. Bring pen and paper for the timed practice
🖼 Diagrams:     canvases/buoi-08.canvas.tsx — CourseMap, ExamBudget, MarkLosers
🔗 Outcomes:     CLO1 (master basic web design and build skills)
                 CLO4 (design and build a web application)
```

---

# 🎯 LEARNING OBJECTIVES

By the end of this session you will be able to:

- Recall and explain the core concepts from **all seven previous sessions**.
- Describe the **midterm exam format**, timing, and what each section tests.
- Answer **multiple-choice, short-answer, and coding questions** correctly under timed conditions.
- Identify your **personal weak areas** using the self-assessment worksheet and create a targeted revision plan.
- Avoid the **most common exam mistakes** that cost students marks.

---

# 📖 THEORY

## 1. Comprehensive Recap: Sessions 1–7

> 🖼 **Diagram:** `canvases/buoi-08.canvas.tsx` → `CourseMap` — slide `s8-course-map` ("Everything So Far, On One Page")

Before diving into practice questions, let us review every major concept in one place. Read through this table carefully. If anything feels unfamiliar, go back and re-read that session's chapter *before* attempting the practice questions.

### 🔍 Master Recap Table

| Session | Topic | Key Concepts | Must-Know Code / Skill |
|---|---|---|---|
| 1 | Introduction to Dreamweaver CS6 | What Dreamweaver is; Design/Code/Split views; basic HTML structure (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`); file naming conventions | `<!DOCTYPE html>` must be line 1 of every HTML file |
| 2 | Creating a New Site | Site definition in Dreamweaver; folder structure (`images/`, `css/`, `js/`); relative vs absolute paths; basic navigation with `<nav>`, `<ul>`, `<li>`, `<a>` | `href="about.html"` (same folder), `src="images/logo.png"` (subfolder), `href="../index.html"` (parent folder) |
| 3 | Working with Text & Images | Headings `<h1>`–`<h6>`; paragraphs `<p>`; emphasis `<strong>`, `<em>`; lists `<ul>`, `<ol>`, `<li>`; images `<img>` with `src`, `alt`, `width`, `height`; links `<a>` | Always include `alt` on `<img>`; headings in order (no skipping); images < 200 KB |
| 4 | Applying CSS | Three ways to add CSS (inline, internal, external); linking external stylesheet; selectors (element, class `.`, ID `#`); box model (content → padding → border → margin); colours (named, hex, RGB) | `<link rel="stylesheet" href="css/style.css">`; `selector { property: value; }` |
| 5 | Creating Page Layouts | `<div>` containers; standard layout regions (header, nav, main, sidebar, footer); float-based two-column layout; clearing floats; centred wrapper | `float: left`; `clear: both`; `max-width: 960px; margin: 0 auto;` |
| 6 | Multi-Page Sites & Navigation | Consistent layout across pages; active link highlighting (`class="active"`); same wrapper/nav/footer, only `<main>` changes; site planning | Copy template → change `<main>` content → update `class="active"` |
| 7 | CSS3 & Web Fonts | Google Fonts via `<link>`; font-family fallback stacks; `text-align`, `line-height`, `letter-spacing`, `text-shadow`; `border-radius`; `box-shadow`; `linear-gradient`, `radial-gradient`; `transition`; `transform`; `:hover` effects | `font-family: 'Montserrat', sans-serif;`; `transition: all 0.3s ease;`; `transform: translateY(-3px);` |

### ⚠️ Important notes

- The midterm covers **all seven sessions equally**. Do not focus only on the most recent topics.
- Questions test both **knowledge** ("What does X do?") and **application** ("Write code that does Y").
- Practical coding questions carry more marks than multiple choice. Practise writing code by hand.

---

## 2. Midterm Exam Format

> 🖼 **Diagram:** `canvases/buoi-08.canvas.tsx` → `ExamBudget` — slide `s8-exam-format` ("Midterm format")

Understanding the exam format is half the battle. Here is what to expect:

### Exam Structure

| Section | Type | Approximate Marks | Time Advice |
|---|---|---|---|
| A | Multiple Choice | ~20% | 1 minute per question |
| B | Short Answer / Explanation | ~30% | 3–5 minutes per question |
| C | Coding Exercises | ~50% | Remaining time; plan before writing |
| **Total** | | **100%** | **90 minutes** |

### What Each Section Tests

**Section A — Multiple Choice:** Tests factual recall. Do you know what a tag does? Can you identify correct syntax? These are quick if you have studied; do not overthink them.

**Section B — Short Answer:** Tests understanding and explanation. You may be asked to compare two concepts, explain why something is done a certain way, or describe a process in your own words. Write in complete sentences.

**Section C — Coding Exercises:** Tests practical application. You will write HTML and/or CSS from scratch. Common tasks include creating a complete page, styling a component, building a layout, or fixing broken code. **Indent your code neatly** — markers read dozens of papers and clean formatting earns goodwill.

### ✅ Best practices for exam day

1. **Read ALL questions first** before answering any. This lets you budget time and tackle easy marks first.
2. **Answer every question.** There is usually no penalty for wrong answers in MC sections. In coding sections, partial credit is awarded for partially correct code.
3. **Write legibly.** If the marker cannot read it, they cannot mark it.
4. **Use comments** in coding answers: `<!-- header section -->` and `/* navigation styles */`. This shows understanding even if syntax has minor errors.
5. **Check file paths.** A common mistake in coding exercises is writing `href="style.css"` when the question says the CSS file is in a `css/` subfolder.
6. **Manage time.** If stuck on a hard question, move on and come back. Secure the easy marks first.

### ❌ Common mistakes on exams

❌ Forgetting `<!DOCTYPE html>` at the top of every HTML answer
❌ Missing closing tags (`</div>`, `</ul>`, `</p>`)
❌ Confusing class (`.`) and ID (`#`) selectors
❌ Writing `text-color` instead of `color`
❌ Not clearing floats, causing layout collapse
❌ Using absolute paths (`C:\Users\...`) instead of relative paths
❌ Forgetting `alt` attributes on `<img>` elements
❌ Putting `@import` after other CSS rules (it gets ignored)

---

## 3. How to Revise Effectively

> 🖼 **Diagram:** `canvases/buoi-08.canvas.tsx` → `MarkLosers` — slide `s8-mistakes` ("Common exam mistakes")

### 3.1 Active Recall Over Passive Reading

Reading your notes repeatedly gives a false sense of mastery. Instead:

1. **Close the book.** Write down everything you remember about a topic.
2. **Open the book.** Check what you missed. Highlight those gaps.
3. **Practise coding from memory.** Open a blank file and recreate a component without looking at examples.
4. **Teach someone else** (or explain aloud to yourself). If you cannot explain it simply, you do not fully understand it.

### 3.2 Create Flashcards

For factual recall (tag names, properties, syntax), flashcards work extremely well. One side has the question ("What does `border-collapse: collapse` do?"); the other has the answer. Review daily for 10 minutes.

### 3.3 Build Something From Scratch

The single best revision activity is to create a new mini-page from scratch without referencing any materials. Try building a simple "About Me" page with:
- Proper HTML5 structure
- External CSS
- Two-column layout
- Navigation with active state
- At least one CSS3 effect (gradient, shadow, or transition)

If you get stuck, note exactly where — that is your revision priority.

### 3.4 Use the Self-Assessment Worksheet Below

The worksheet at the bottom of this chapter maps directly to the learning objectives of Sessions 1–7. Be honest with yourself. Every "No" is a specific thing to revise before the exam.

---

# 📋 THEORY SUMMARY

| Concept | Definition | Example |
|---|---|---|
| HTML5 document structure | DOCTYPE + html + head + body | `<!DOCTYPE html><html><head>...</head><body>...</body></html>` |
| Relative path | File location relative to current document | `images/photo.jpg`, `../index.html` |
| Semantic element | Tag that conveys meaning about its content | `<nav>`, `<header>`, `<main>`, `<footer>` |
| External CSS | Stylesheet linked via `<link>` tag | `<link rel="stylesheet" href="css/style.css">` |
| Box model | Content → Padding → Border → Margin | `padding: 10px; border: 1px solid #ccc; margin: 20px;` |
| Float layout | Side-by-side columns using `float: left` | `main { width: 70%; float: left; }` |
| Clear floats | Forces element below floated siblings | `footer { clear: both; }` |
| Active nav link | Highlights current page in navigation | `<a href="about.html" class="active">About</a>` |
| Google Fonts | Cloud-hosted fonts loaded via `<link>` | `<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">` |
| Font stack | Comma-separated fallback list | `'Montserrat', Arial, sans-serif` |
| CSS3 transition | Smooth animation between states | `transition: all 0.3s ease;` |
| CSS3 transform | Move, scale, rotate elements | `transform: translateY(-5px);` |
| Gradient | Colour transition as background | `linear-gradient(135deg, #1a5276, #3498db)` |

---

# 💡 WORKED EXAMPLES (Practice Exam Questions with Answers)

## Example 1: Multiple Choice Set (Section A Practice)

Below are 15 representative MC questions covering Sessions 1–7. Cover the answers, try them yourself, then check.

---

**Q1. Which declaration MUST appear on the very first line of every HTML5 document?**
a) `<html>`
b) `<meta charset="UTF-8">`
c) `<!DOCTYPE html>`
d) `<head>`

<details>
<summary>Answer</summary>

**c) `<!DOCTYPE html>`** — This tells the browser to render the page in standards mode. Without it, browsers may fall back to quirks mode, causing inconsistent rendering.

</details>

---

**Q2. What is the correct HTML element for the main navigation area of a website?**
a) `<navigation>`
b) `<menu>`
c) `<nav>`
d) `<links>`

<details>
<summary>Answer</summary>

**c) `<nav>`** — This is the semantic HTML5 element for major navigation blocks. `<navigation>` does not exist in HTML.

</details>

---

**Q3. Which attribute is REQUIRED on every `<img>` element for accessibility?**
a) `title`
b) `alt`
c) `description`
d) `label`

<details>
<summary>Answer</summary>

**b) `alt`** — Provides alternative text for screen readers and displays when the image fails to load. It is required by the HTML specification.

</details>

---

**Q4. How do you correctly link an external CSS file located in a `css` subfolder?**
a) `<style src="css/style.css">`
b) `<link rel="stylesheet" href="css/style.css">`
c) `<css href="css/style.css">`
d) `<link rel="stylesheet" src="css/style.css">`

<details>
<summary>Answer</summary>

**b) `<link rel="stylesheet" href="css/style.css">`** — The `<link>` element uses `href` (not `src`) and requires `rel="stylesheet"`.

</details>

---

**Q5. Which CSS selector targets elements with `class="highlight"`?**
a) `#highlight { }`
b) `highlight { }`
c) `.highlight { }`
d) `*highlight { }`

<details>
<summary>Answer</summary>

**c) `.highlight { }`** — Class selectors use a dot prefix. `#` is for IDs. No prefix matches element names.

</details>

---

**Q6. In the CSS box model, which layer is BETWEEN the content and the border?**
a) Margin
b) Outline
c) Padding
d) Shadow

<details>
<summary>Answer</summary>

**c) Padding** — The order from inside out is: Content → Padding → Border → Margin.

</details>

---

**Q7. What does `margin: 0 auto;` do on a block element with a defined width?**
a) Removes all margins
b) Centres the element horizontally within its parent
c) Centres the element vertically
d) Sets margin to zero on all sides

<details>
<summary>Answer</summary>

**b) Centres the element horizontally** — `0` sets top/bottom margin to zero; `auto` distributes remaining horizontal space equally on left and right.

</details>

---

**Q8. Which CSS property creates rounded corners?**
a) `corner-radius`
b) `border-round`
c) `border-radius`
d) `round-corner`

<details>
<summary>Answer</summary>

**c) `border-radius`** — Standard CSS3 property. The others do not exist.

</details>

---

**Q9. Where should the `transition` property be placed for smooth hover effects?**
a) Only on the `:hover` rule
b) On the base (normal-state) rule
c) On both the base and `:hover` rules
d) In the `<head>` section

<details>
<summary>Answer</summary>

**b) On the base (normal-state) rule** — This ensures the animation plays in BOTH directions (into hover and out of hover). Placing it only on `:hover` causes a smooth-in but instant-out.

</details>

---

**Q10. Which is the correct way to include Google Fonts in an HTML page?**
a) `<script src="https://fonts.googleapis.com/...">`
b) `<font href="https://fonts.googleapis.com/...">`
c) `<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">`
d) `@import url('...')` inside the HTML `<body>`

<details>
<summary>Answer</summary>

**c)** — Google Fonts are loaded via a `<link rel="stylesheet">` tag in the `<head>`. `@import` goes in CSS, not HTML.

</details>

---

**Q11. What does `float: left` do to an element?**
a) Aligns text to the left
b) Moves the element to the left and allows other content to wrap around it
c) Adds a left margin
d) Creates a left border

<details>
<summary>Answer</summary>

**b)** — Floating removes the element from normal flow and shifts it to the specified side. Other inline content wraps around it. This is the basis of float-based column layouts.

</details>

---

**Q12. Which image format supports transparency and is best for logos?**
a) JPG
b) GIF
c) PNG
d) BMP

<details>
<summary>Answer</summary>

**c) PNG** — PNG supports alpha-channel transparency. JPG does not support transparency. GIF supports only 1-bit transparency (no semi-transparency).

</details>

---

**Q13. What is the correct CSS syntax for a linear gradient going from top to bottom?**
a) `background: gradient(linear, top, #color1, #color2);`
b) `background: linear-gradient(to bottom, #color1, #color2);`
c) `background-gradient: top-to-bottom(#color1, #color2);`
d) `background: linear(top, #color1, #color2);`

<details>
<summary>Answer</summary>

**b)** — `linear-gradient()` is a CSS function used as a value for `background` or `background-image`. The direction keyword `to bottom` means top-to-bottom.

</details>

---

**Q14. Why should you use relative paths instead of absolute paths in your website?**
a) They load faster
b) They continue working when the site folder is moved or uploaded to a server
c) They are shorter to type
d) Absolute paths are not supported in HTML

<details>
<summary>Answer</summary>

**b)** — Relative paths describe location relative to the current file, so they remain valid regardless of where the site is hosted. Absolute paths like `C:\Users\...` break immediately when files are moved.

</details>

---

**Q15. Which property would you use to make a card lift upward on hover?**
a) `margin-top: -5px;`
b) `top: -5px;`
c) `transform: translateY(-5px);`
d) `position: up 5px;`

<details>
<summary>Answer</summary>

**c) `transform: translateY(-5px);`** — Transform is GPU-accelerated and works smoothly with transitions. Changing `margin-top` or `top` triggers expensive layout recalculations and can cause janky animation.

</details>

---

## Example 2: Short Answer Questions (Section B Practice)

**Q16. Explain the difference between an ID selector and a class selector in CSS. When would you use each?**

<details>
<summary>Model Answer</summary>

An **ID selector** uses the `#` prefix (e.g., `#header`) and must be unique — only one element per page can have a given ID. A **class selector** uses the `.` prefix (e.g., `.card`) and can be applied to any number of elements on the same page.

Use an **ID** for elements that appear exactly once per page, such as the main wrapper (`#wrapper`), the primary header (`#header`), or a unique sidebar (`#sidebar`). Use a **class** for elements that share styling, such as multiple event cards (`.event-card`), buttons (`.btn`), or highlighted text (`.highlight`).

Additionally, IDs have higher specificity than classes in the CSS cascade, which can make overriding styles more difficult. For this reason, many developers prefer classes for most styling and reserve IDs for JavaScript hooks or truly unique structural elements.

</details>

---

**Q17. What is the CSS box model? Name its four components in order from inside to outside, and explain what each one does.**

<details>
<summary>Model Answer</summary>

The CSS box model describes how every HTML element is rendered as a rectangular box consisting of four concentric layers:

1. **Content** (innermost) — The actual text, image, or child elements. Its dimensions are set by `width` and `height`.
2. **Padding** — Transparent space between the content and the border. Pushes the border outward. Background colour extends through padding.
3. **Border** — A visible (or invisible) line surrounding the padding. Defined by `border-width`, `border-style`, and `border-color`.
4. **Margin** (outermost) — Transparent space outside the border that separates this element from neighbouring elements. Margins can collapse vertically between adjacent block elements.

The total width of an element = content width + left padding + right padding + left border + right border + left margin + right margin. Using `box-sizing: border-box` changes this so that `width` includes padding and border, simplifying layout calculations.

</details>

---

**Q18. Why is it important to include the `alt` attribute on every `<img>` element? Give three reasons.**

<details>
<summary>Model Answer</summary>

1. **Accessibility:** Screen readers read the `alt` text aloud to visually impaired users, allowing them to understand the image's purpose and content.
2. **Fallback display:** If the image file fails to load (broken link, slow connection, blocked resource), the browser displays the `alt` text in place of the image, preserving the user's understanding of the page.
3. **SEO (Search Engine Optimisation):** Search engines cannot "see" images. They rely on `alt` text to index image content and understand the page's context, which can improve search rankings.

Additionally, the HTML specification requires the `alt` attribute on `<img>` elements. Omitting it produces invalid HTML.

</details>

---

**Q19. Explain the purpose of the `clear` property in CSS layouts. Give a practical example.**

<details>
<summary>Model Answer</summary>

The `clear` property prevents an element from sitting alongside floated elements. When elements are floated (e.g., `float: left` for a two-column layout), subsequent non-floated elements may try to wrap around them instead of appearing below.

**Practical example:** In a page with a floated main content column and a floated sidebar, the footer would attempt to sit next to the shorter column rather than spanning the full width below both. Adding `clear: both` to the footer forces it to drop below all preceding floated elements:

```css
main    { float: left; width: 70%; }
aside   { float: left; width: 30%; }
footer  { clear: both; }
```

Alternative approaches include setting `overflow: hidden` (or `overflow: auto`) on the parent container, which creates a new block formatting context that contains the floats.

</details>

---

**Q20. Describe the step-by-step process for adding a Google Font to a web page.**

<details>
<summary>Model Answer</summary>

1. Visit [https://fonts.google.com](https://fonts.google.com) and search for the desired font.
2. Click the font card, then select only the weights/styles needed (e.g., Regular 400 and Bold 700). Selecting fewer weights improves load performance.
3. Copy the `<link>` tag provided in the "Get embed code" panel.
4. Paste the `<link>` tag inside the `<head>` section of **every** HTML page that uses the font, placing it before your own stylesheet link.
5. In your CSS, apply the font using `font-family`, always including a fallback generic family: `font-family: 'Montserrat', sans-serif;`.
6. Test by previewing the page. Disconnect from the internet and refresh to verify the fallback font renders correctly.

Optional optimisation: Add `<link rel="preconnect">` tags for `fonts.googleapis.com` and `fonts.gstatic.com` to begin DNS resolution early.

</details>

---

## Example 3: Coding Exercises (Section C Practice)

**Q21. Create a complete HTML5 page for the Student Club "About" page.**

Requirements:
- Valid HTML5 structure with DOCTYPE
- Title "Student Club - About Us"
- Link to external CSS file at `css/style.css`
- Google Fonts link for Montserrat (700) and Open Sans (400)
- Header with `<h1>` "About Us"
- Navigation with links to Home, About (active), Events, Contact
- Main content with one heading, one paragraph, and one unordered list
- Footer with copyright

<details>
<summary>Model Answer</summary>

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Student Club - About Us</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400&display=swap"
          rel="stylesheet">

    <!-- External stylesheet -->
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="wrapper">
        <header>
            <h1>About Us</h1>
        </header>

        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html" class="active">About</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>

        <main>
            <h2>Who We Are</h2>
            <p>The Student Club is a community-driven organisation dedicated to fostering creativity, collaboration, and technical skills among university students.</p>

            <h3>Our Core Values</h3>
            <ul>
                <li>Innovation and creative thinking</li>
                <li>Collaboration and teamwork</li>
                <li>Continuous learning and growth</li>
                <li>Inclusivity and respect for diversity</li>
            </ul>
        </main>

        <footer>
            <p>&copy; 2024 Student Club. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>
```

**Key points markers look for:**
- `<!DOCTYPE html>` on line 1 ✓
- Correct `<title>` ✓
- Google Fonts `<link>` present AND before stylesheet ✓
- `href="css/style.css"` (correct relative path) ✓
- Semantic elements: `<header>`, `<nav>`, `<main>`, `<footer>` ✓
- About link has `class="active"` ✓
- Unordered list with `<ul>` and `<li>` ✓
- All tags properly closed ✓
- Copyright entity `&copy;` ✓

</details>

---

**Q22. Write CSS to create a two-column layout with a header, 70/30 split, and footer.**

Requirements:
- Centred wrapper, max-width 960 px
- Full-width header with dark blue background and white text
- Main content (70%) and sidebar (30%) side by side using floats
- Footer clears both columns
- Use `box-sizing: border-box` globally

<details>
<summary>Model Answer</summary>

```css
/* Universal box-sizing reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Centred wrapper */
#wrapper {
    max-width: 960px;
    margin: 0 auto;
}

/* Header */
header {
    background-color: #1a5276;
    color: white;
    padding: 20px;
    text-align: center;
}

/* Two-column container needs overflow:hidden to contain floats */
.content-area {
    overflow: hidden;
}

/* Main content: 70% */
main {
    width: 70%;
    float: left;
    padding: 20px;
}

/* Sidebar: 30% */
#sidebar {
    width: 30%;
    float: left;
    padding: 20px;
    background-color: #f0f4f8;
}

/* Footer clears floats */
footer {
    clear: both;
    background-color: #1a5276;
    color: white;
    text-align: center;
    padding: 15px;
}
```

**Key points markers look for:**
- `box-sizing: border-box` on universal selector ✓
- `max-width` + `margin: 0 auto` for centring ✓
- Percentages add up to 100% (70 + 30) ✓
- Both columns use `float: left` ✓
- Parent container uses `overflow: hidden` OR footer uses `clear: both` ✓
- Header and footer have distinct background colours ✓

</details>

---

**Q23. Write CSS for an event card with CSS3 effects.**

Requirements:
- Light grey background
- Blue left border accent (5 px)
- Rounded corners (8 px)
- Subtle box shadow
- Smooth hover effect: lifts up 3 px, shadow deepens
- Transition duration 0.3 seconds

<details>
<summary>Model Answer</summary>

```css
.event-card {
    background-color: #f8f9fa;
    border-left: 5px solid #3498db;
    padding: 25px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease,
                box-shadow 0.3s ease;
}

.event-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}
```

**Key points markers look for:**
- `border-radius: 8px` ✓
- `box-shadow` with rgba (not pure black) ✓
- `transition` on the BASE selector, not `:hover` ✓
- Specific properties listed in transition (not just `all`) — bonus but `all` is acceptable ✓
- `translateY(-3px)` (negative = upward) ✓
- Hover shadow is larger/darker than normal state ✓

</details>

---

## Example 4: Additional Multiple Choice — Edge Cases and Tricky Questions

These questions target common areas of confusion that appear on real exams.

---

**Q24. What happens if you use `@import` after other CSS rules in a stylesheet?**
a) The imported styles override all previous rules
b) The browser ignores the `@import` rule entirely
c) The browser throws an error and stops rendering
d) The imported styles are applied only to the `<body>` element

<details>
<summary>Answer</summary>

**b)** — Per the CSS specification, `@import` rules must precede all other rules (except `@charset`). If placed after other declarations, browsers silently ignore them. This is why using `<link>` in HTML is generally safer.

</details>

---

**Q25. Which CSS property would you use to make text uppercase?**
a) `font-style: uppercase;`
b) `text-transform: uppercase;`
c) `text-decoration: uppercase;`
d) `font-variant: uppercase;`

<details>
<summary>Answer</summary>

**b) `text-transform: uppercase;`** — `text-transform` controls capitalisation. Values include `uppercase`, `lowercase`, `capitalize` (first letter of each word), and `none`.

</details>

---

**Q26. In a float-based two-column layout, what happens if you forget to clear the floats before the footer?**
a) The footer disappears
b) The footer wraps around the shorter column instead of appearing below both columns
c) The browser automatically clears the floats
d) Both columns collapse to zero height

<details>
<summary>Answer</summary>

**b)** — Floated elements are removed from normal flow. Non-floated block elements (like the footer) do not "see" them and may slide up alongside the shorter column. Adding `clear: both` or using `overflow: hidden` on a parent container prevents this.

</details>

---

**Q27. What does the `display=swap` parameter do in a Google Fonts URL?**
a) Swaps the font colour on hover
b) Displays fallback text immediately, then swaps in the custom font when loaded
c) Swaps between two different fonts randomly
d) Disables the font on slow connections

<details>
<summary>Answer</summary>

**b)** — `display=swap` sets the `font-display` descriptor to `swap`, meaning the browser shows a fallback font instantly and replaces it with the web font once it finishes downloading. This prevents invisible text during font loading (FOIT — Flash of Invisible Text).

</details>

---

**Q28. Which selector has the HIGHEST specificity?**
a) `.card .title`
b) `#header h1`
c) `nav ul li a`
d) `.event-card:hover`

<details>
<summary>Answer</summary>

**b) `#header h1`** — Specificity is calculated as (IDs, classes/pseudo-classes, elements). `#header h1` = (1, 0, 1). `.card .title` = (0, 2, 0). `nav ul li a` = (0, 0, 4). `.event-card:hover` = (0, 2, 0). One ID always beats any number of classes or elements.

</details>

---

**Q29. Which of the following is NOT a valid CSS colour value?**
a) `#3498db`
b) `rgb(52, 152, 219)`
c) `rgba(52, 152, 219, 0.5)`
d) `color(blue, 50%)`

<details>
<summary>Answer</summary>

**d) `color(blue, 50%)`** — This is not valid CSS syntax. Valid colour formats include hex (`#3498db`), `rgb()`, `rgba()`, `hsl()`, `hsla()`, named colours (`blue`), and the newer `color()` function (but with different syntax).

</details>

---

**Q30. What is the default display value of a `<div>` element?**
a) `inline`
b) `block`
c) `inline-block`
d) `flex`

<details>
<summary>Answer</summary>

**b) `block`** — `<div>` is a block-level element by default. It takes the full available width and starts on a new line. Inline elements like `<span>` and `<a>` do not start on new lines and only take the width of their content.

</details>

---

## Example 5: Additional Short Answer Questions

**Q31. Explain the difference between `padding` and `margin` in the CSS box model. When would you use each?**

<details>
<summary>Model Answer</summary>

**Padding** is the space between an element's content and its border. It is *inside* the element. Background colour and background images extend through the padding area. Padding pushes the border outward.

**Margin** is the space outside an element's border, separating it from neighbouring elements. It is *outside* the element. Margins are transparent — background colour does not extend into margins. Adjacent vertical margins can collapse (the larger of the two wins rather than adding together).

**When to use padding:** When you want space *inside* a box — for example, pushing text away from the edges of a card, button, or header.

**When to use margin:** When you want space *between* boxes — for example, separating paragraphs from each other, adding gaps between cards, or centring a block element horizontally with `margin: 0 auto`.

</details>

---

**Q32. Why is external CSS preferred over inline and internal CSS? Give three reasons.**

<details>
<summary>Model Answer</summary>

1. **Separation of concerns:** External CSS keeps styling separate from HTML structure. This makes both files easier to read, maintain, and debug. A designer can modify styles without touching HTML, and vice versa.

2. **Reusability across pages:** A single external stylesheet can be linked to every page on a site. Changing one file updates the entire site. With inline or internal CSS, you would need to edit every page individually.

3. **Browser caching:** Browsers cache external CSS files. After the first visit, subsequent page loads reuse the cached stylesheet, reducing bandwidth and improving load times. Inline and internal styles are re-downloaded with every HTML page.

Additional benefits include smaller HTML file sizes, better organisation (one place for all styles), and easier collaboration in teams.

</details>

---

**Q33. Describe how you would create consistent navigation across a five-page website. What changes from page to page, and what stays the same?**

<details>
<summary>Model Answer</summary>

**What stays the same on every page:**
- The HTML structure of the header, navigation bar, sidebar (if any), and footer.
- The link to the external CSS file.
- The Google Fonts `<link>` tags.
- The list of navigation links (Home, About, Events, Gallery, Contact).

**What changes from page to page:**
- The `<title>` element in `<head>` (e.g., "Student Club - About Us").
- The `class="active"` attribute moves to whichever nav link corresponds to the current page. On `about.html`, the About link gets `class="active"`.
- The content inside `<main>` — each page has unique headings, paragraphs, images, and other content.

**Process:** Create one complete page as a template. For each additional page, copy the template, update the `<title>`, move the `active` class, and replace the `<main>` content. This ensures visual consistency while allowing unique content per page.

</details>

---

**Q34. What is CSS specificity, and why does it matter?**

<details>
<summary>Model Answer</summary>

CSS specificity is the set of rules that determines which style declaration applies when multiple rules target the same element. The browser calculates a specificity score for each selector and the highest-scoring rule wins.

The specificity hierarchy (from highest to lowest):
1. Inline styles (`style="..."`) — highest priority
2. ID selectors (`#header`)
3. Class selectors, attribute selectors, pseudo-classes (`.card`, `[type="text"]`, `:hover`)
4. Element selectors, pseudo-elements (`p`, `div`, `::before`)

Specificity matters because it explains why some styles unexpectedly fail to apply. For example, if you write `p { color: blue; }` and later `#intro p { color: red; }`, the paragraph inside `#intro` will be red because the ID selector has higher specificity. Understanding specificity helps you write predictable CSS and avoid frustrating "why isn't my style working?" moments.

</details>

---

## Example 6: Debugging Exercise — Fix a Broken Page

**Q35.** The following HTML page contains **EIGHT errors**. Find and fix all of them. This simulates the kind of debugging question that may appear on the midterm.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Student Club Events</title>
    <link rel="stylesheet" href="style.css">
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
</head>
<body>
    <div id="wrapper">
        <header>
            <h1>Upcoming Events</h1>
        </header>

        <navigation>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="events.html" class="active">Events</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </navigation>

        <main>
            <h2>March Events</h2>
            <img src="images/workshop.jpg">
            <p>Join us for our monthly workshop series.</p>

            <div class="event-card">
                <h3>Web Design Workshop</h3>
                <p>Learn responsive design fundamentals.</p>
            </div>

            <div class="event-card">
                <h3>Music Night</h3>
                <p>An evening of live performances.</p>
            <!-- Missing closing div -->
        </main>

        <footer>
            <p>&copy; 2024 Student Club</p>
        </footer>
    </div>
</body>
</html>
```

<details>
<summary>Complete Solution with Explanations</summary>

| # | Error | Location | Fix |
|---|---|---|---|
| 1 | `@import` inside HTML `<head>` | Line 8 | Remove this line. Use a `<link>` tag instead: `<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">` |
| 2 | Wrong CSS path `href="style.css"` | Line 6 | Change to `href="css/style.css"` (assuming standard folder structure) |
| 3 | `<navigation>` is not a valid HTML element | Lines 15, 22 | Replace with `<nav>` (opening and closing tags) |
| 4 | `<img>` missing required `alt` attribute | Line 27 | Add descriptive alt text: `<img src="images/workshop.jpg" alt="Students working on web design in a classroom">` |
| 5 | Second `.event-card` div missing closing `</div>` | Line 36 | Add `</div>` after the Music Night paragraph |
| 6 | No `<link>` tag for Google Fonts in `<head>` | N/A | Add proper `<link>` tag (see fix for error #1) |
| 7 | Navigation `<ul>` should have `list-style: none` in CSS | N/A | This is a CSS issue but worth noting — without it, bullets appear before nav links |
| 8 | Footer appears inside wrapper but after unclosed div — structural nesting issue | Lines 36–39 | The unclosed div (error #5) causes the footer to potentially render inside the event card. Fixing error #5 resolves this. |

**Corrected HTML:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Student Club Events</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="wrapper">
        <header>
            <h1>Upcoming Events</h1>
        </header>

        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="events.html" class="active">Events</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>

        <main>
            <h2>March Events</h2>
            <img src="images/workshop.jpg" alt="Students working on web design in a classroom">
            <p>Join us for our monthly workshop series.</p>

            <div class="event-card">
                <h3>Web Design Workshop</h3>
                <p>Learn responsive design fundamentals.</p>
            </div>

            <div class="event-card">
                <h3>Music Night</h3>
                <p>An evening of live performances.</p>
            </div>
        </main>

        <footer>
            <p>&copy; 2024 Student Club</p>
        </footer>
    </div>
</body>
</html>
```

</details>

---

## Example 7: Quick-Fire Terminology Review

Match each term to its definition. Cover the right column and test yourself.

| Term | Definition |
|---|---|
| `<!DOCTYPE html>` | Declares the document as HTML5; must be the first line |
| Semantic element | An HTML tag that conveys meaning about its content (e.g., `<nav>`, `<article>`) |
| Selector | The part of a CSS rule that identifies which elements to style |
| Cascade | The algorithm that resolves conflicts when multiple CSS rules target the same element |
| Box model | The rectangular rendering model: content + padding + border + margin |
| Float | A CSS property that removes an element from normal flow and shifts it left or right |
| Transition | A CSS property that animates changes between two states over a duration |
| Transform | A CSS property that visually modifies an element (translate, scale, rotate) without affecting layout |
| Fallback font | The last generic font family in a font stack (e.g., `sans-serif`) used when custom fonts fail |
| Viewport | The visible area of the web page in the browser window |
| Responsive design | Design approach where layout adapts to different screen sizes |
| Accessibility | Designing websites usable by people with disabilities (screen readers, keyboard navigation) |

---

# 🛠️ HANDS-ON PRACTICE

## Setup

Open your Student Club Website project folder. Make sure all files from Sessions 1–7 are intact. Have a timer ready (phone or browser).

---

### TASK 1: Timed Mini-Build Challenge

🎯 **Goal:** Build a complete single page from scratch in 25 minutes WITHOUT referring to any notes.

📝 **What you will do:** Create a new file called `practice-exam.html` in your project root. Build it entirely from memory.

🔧 **Steps:**

1. Set a timer for 25 minutes.
2. Create `practice-exam.html` with:
   - Valid HTML5 structure
   - Google Fonts (Montserrat + Open Sans)
   - External CSS link to `css/practice.css`
   - Header with gradient background
   - Navigation bar with 4 links
   - Two-column layout (main 65%, sidebar 35%)
   - At least one event card with hover effect
   - Footer with copyright
3. Create `css/practice.css` with all necessary styles.
4. When the timer stops, STOP WRITING even if incomplete.

✅ **Self-check:** Open in browser. Does it render correctly? Compare against the requirements. Note what you forgot or got wrong.

💾 **Save** both files. Keep them as a baseline for measuring improvement.

---

### TASK 2: Spot-the-Bug Exercise

🎯 **Goal:** Identify and fix common coding errors.

📝 **What you will do:** The following code contains FIVE bugs. Find and fix all of them.

🔧 **Buggy code:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bug Hunt</title>
    <link rel="stylesheet" href="style.css">
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
</head>
<body>
    <header>
        <h1>Welcome</h1>
    </header>
    <main>
        <img src="images/banner.jpg">
        <p>This is a paragraph.</p>
        <ul>
            <li>Item one
            <li>Item two</li>
            <li>Item three</li>
        </ul>
    </main>
    <footer>
        <p>Copyright 2024</p>
    </footer>
</div>
</body>
</html>
```

<details>
<summary>Answers (try finding them yourself first!)</summary>

| # | Bug | Fix |
|---|---|---|
| 1 | `@import` placed inside HTML `<head>` | Remove it. Either use a `<link>` tag in HTML or place `@import` at the top of the CSS file. |
| 2 | CSS file path is `style.css` but convention is `css/style.css` | Change to `href="css/style.css"` (assuming standard folder structure). |
| 3 | `<img>` missing `alt` attribute | Add `alt="Banner image"` (or appropriate description). |
| 4 | First `<li>` missing closing tag: `<li>Item one` | Change to `<li>Item one</li>`. |
| 5 | Stray closing `</div>` with no matching opening `<div>` | Either remove it or add an opening `<div id="wrapper">` after `<body>`. |

</details>

✅ **Check:** After fixing all five, validate mentally that the document is well-formed.

💾 **Save** your corrected version as `bug-hunt-fixed.html`.

---

### TASK 3: Revision Priority Matrix

🎯 **Goal:** Identify your weakest areas and create a focused study plan.

📝 **What you will do:** Complete the self-assessment worksheet below honestly, then prioritise revision.

🔧 **Steps:**

1. Fill in every row of the Self-Assessment Worksheet in the next section.
2. Count your "No" answers.
3. For each "No", write down:
   - Which session/chapter to re-read
   - One specific practice task to do (e.g., "Build a nav bar from memory")
4. Schedule 30-minute revision blocks for each weak area before the exam.

✅ **Check:** You have a written revision plan with specific actions, not vague intentions like "study more."

💾 **Save** your plan (paper or digital).

---

# 📝 SELF-ASSESSMENT WORKSHEET

| # | I can... | Yes | No |
|---|---|---|---|
| 1 | Write a complete HTML5 document structure from memory | ☐ | ☐ |
| 2 | Create proper relative file paths for links, images, and CSS | ☐ | ☐ |
| 3 | Use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`) correctly | ☐ | ☐ |
| 4 | Link an external CSS file and explain why external is preferred | ☐ | ☐ |
| 5 | Write element, class, and ID selectors and explain the difference | ☐ | ☐ |
| 6 | Explain the CSS box model and calculate total element width | ☐ | ☐ |
| 7 | Build a float-based two-column layout with cleared footer | ☐ | ☐ |
| 8 | Create consistent navigation across multiple pages with active state | ☐ | ☐ |
| 9 | Add Google Fonts and write proper font-family fallback stacks | ☐ | ☐ |
| 10 | Use CSS3 transitions, transforms, gradients, shadows, and border-radius | ☐ | ☐ |

**Scoring guide:**
- **9–10 Yes:** You are well-prepared. Focus on timed practice and edge cases.
- **6–8 Yes:** Good foundation. Spend 1–2 hours revising the "No" topics.
- **Below 6:** Significant gaps remain. Dedicate at least 3–4 hours of focused revision before the exam, prioritising Sessions 4–5 (CSS and layouts) as they carry the most weight.

---

# 🔗 FURTHER READING

- [HTML introduction — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)
- [CSS first steps — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps)
- [HTML semantics — MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [Getting started with the web — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web)
- [CSS box model — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)
- [CSS selectors — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors)
- [W3C HTML Validator](https://validator.w3.org/)
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)

---

# ⏭️ NEXT SESSION

Session 9 introduces **Working with Tables** — you will learn to create, structure, merge cells, and style HTML tables for displaying structured data like schedules and price lists on the Student Club Website.
