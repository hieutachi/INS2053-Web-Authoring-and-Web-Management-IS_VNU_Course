# Session 5 — In-Class Exercise: Creating Page Layouts with Semantic HTML

## Objective
- Use semantic HTML5 elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Understand the CSS box model (content, padding, border, margin)
- Build a proper page layout structure

## Time Required
Estimated time: 55 minutes

## Instructions

### Task 1: Learn About Semantic HTML
**Semantic HTML** means using tags that describe the **meaning** of the content, not just how it looks.

| Tag | Purpose |
|-----|---------|
| `<header>` | Top section of a page or section — usually has logo, title |
| `<nav>` | Navigation menu — links to other pages |
| `<main>` | The main content of the page (only one per page) |
| `<section>` | A thematic group of content |
| `<article>` | A self-contained piece of content (a blog post, a news item) |
| `<aside>` | Sidebar or content related to the main content |
| `<footer>` | Bottom section — usually has copyright, contact info |

Create a new file called `layout.html` in the `club-website` folder. Type the following skeleton:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Club Layout</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <!-- Top of the page -->
    </header>

    <nav>
        <!-- Navigation links -->
    </nav>

    <main>
        <!-- Main content goes here -->
    </main>

    <footer>
        <!-- Bottom of the page -->
    </footer>
</body>
</html>
```

### Task 2: Fill In the Layout Structure
Replace the contents of `layout.html` with this complete structure:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Club Layout</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Student Technology Club</h1>
        <p>Building the future, one line of code at a time.</p>
    </header>

    <nav>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="pages/events.html">Events</a></li>
            <li><a href="pages/contact.html">Contact</a></li>
        </ul>
    </nav>

    <main>
        <section>
            <h2>Latest News</h2>
            <article>
                <h3>Web Design Workshop</h3>
                <p>Join us this Friday for a hands-on workshop about HTML and CSS. 
                Bring your laptop! We will build a real website together.</p>
            </article>
            <article>
                <h3>New Members Welcome</h3>
                <p>We are looking for new members. No experience needed — 
                just a curiosity about technology and a willingness to learn.</p>
            </article>
        </section>

        <aside>
            <h3>Quick Links</h3>
            <ul>
                <li><a href="#">Club Calendar</a></li>
                <li><a href="#">Member Login</a></li>
                <li><a href="#">Photo Gallery</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2025 Student Technology Club. All rights reserved.</p>
        <p>Contact: club@vnu-is.edu.vn</p>
    </footer>
</body>
</html>
```

- Save and preview in the browser. Right now it will look plain — just text flowing down the page. That is normal! We will add CSS in the next step to make it look like a real layout.

### Task 3: Understand the Box Model
Every HTML element is a **box**. The box model has four parts:

```
┌──────────── margin ────────────────┐
│  ┌────────── border ────────────┐  │
│  │  ┌────── padding ─────────┐  │  │
│  │  │                        │  │  │
│  │  │      CONTENT           │  │  │
│  │  │                        │  │  │
│  │  └────────────────────────┘  │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

- **Content**: the text or image inside the element
- **Padding**: space between the content and the border
- **Border**: a visible (or invisible) line around the padding
- **Margin**: space between this element and other elements

Open `css/style.css` and **add** these rules (do not delete what is already there):

> **Note:** The `* { margin: 0; padding: 0; }` rule removes ALL default spacing. This is why we re-declare padding on nav, header, etc. below.

```css
/* Remove default spacing */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Header at the top */
header {
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    text-align: center;
}

header h1 {
    color: white;
    font-size: 32px;
}

header p {
    color: #bdc3c7;
    font-size: 14px;
}

/* Navigation bar */
nav {
    background-color: #34495e;
    padding: 10px 20px;
}

nav ul {
    list-style: none;
}

nav ul li {
    display: inline;
    margin-right: 20px;
}

nav ul li a {
    color: white;
    text-decoration: none;
    font-size: 16px;
}

nav ul li a:hover {
    color: #f1c40f;
}

/* Main content area */
main {
    padding: 20px;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    gap: 20px;
}

/* Each article gets a box look */
article {
    background-color: white;
    padding: 15px;
    margin-bottom: 15px;
    border: 1px solid #dddddd;
    border-radius: 4px;
}

article h3 {
    color: #2c3e50;
}

/* Sidebar */
aside {
    background-color: #ecf0f1;
    padding: 15px;
    border-radius: 4px;
    flex: 1;
}

/* Footer at the bottom */
footer {
    background-color: #2c3e50;
    color: white;
    text-align: center;
    padding: 15px;
    margin-top: 30px;
}

footer p {
    color: #bdc3c7;
    font-size: 14px;
}
```

Save `style.css` and refresh `layout.html` in the browser. You should see:
- A dark header at the top
- A navigation bar below it
- Content in the center with articles and sidebar side by side
- A dark footer at the bottom

### Task 4: Update index.html with the Same Structure
Now update your `index.html` to use the same semantic structure:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Student Club - Home</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Student Technology Club</h1>
        <p>Building the future, one line of code at a time.</p>
    </header>

    <nav>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="pages/events.html">Events</a></li>
            <li><a href="pages/contact.html">Contact</a></li>
        </ul>
    </nav>

    <main>
        <section>
            <h2>Welcome</h2>
            <p>Welcome to the official website of the Student Technology Club.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Student Technology Club. All rights reserved.</p>
    </footer>
</body>
</html>
```

- Save and preview. The header, nav, and footer should look the same as `layout.html` because they share the same CSS file.

## Starter Files
- `club-website` folder from previous sessions
- `css/style.css` file (will be updated with new rules)

## Expected Result

```
┌──────────────────────────────────────────────────┐
│  [dark header background]                        │
│         Student Technology Club                  │
│  Building the future, one line of code...        │
├──────────────────────────────────────────────────┤
│  [dark nav bar]                                  │
│  Home  |  About  |  Events  |  Contact           │
├──────────────────────────────────────────────────┤
│                                                  │
│  Latest News                                     │
│  ┌──────────────────────────────────────────┐    │
│  │  Web Design Workshop                     │    │
│  │  Join us this Friday for a hands-on...   │    │
│  └──────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────┐    │
│  │  New Members Welcome                     │    │
│  │  We are looking for new members...       │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │  Quick Links                [sidebar]    │    │
│  │  • Club Calendar                         │    │
│  │  • Member Login                          │    │
│  │  • Photo Gallery                         │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
├──────────────────────────────────────────────────┤
│  [dark footer background]                        │
│  (c) 2025 Student Technology Club                │
│  Contact: club@vnu-is.edu.vn                     │
└──────────────────────────────────────────────────┘
```

## Self-Check (answers included)

Answer from **your own `layout.html`** first, then open the arrow.

<details>
<summary>1. `<section>`, `<div>`, and `<article>` all render as plain blocks with no visual difference. So why choose between them?</summary>

Because they differ in **meaning**, and meaning is what everything except your
own eyes relies on.

| Tag | Use it when |
|---|---|
| `<section>` | A thematic group of content that would have a heading |
| `<article>` | Content that still makes sense if lifted out on its own — a news item, a blog post |
| `<div>` | You need a box **purely** for styling and no other tag fits |

A screen-reader user can list all landmarks (`header`, `nav`, `main`, `footer`,
`aside`) and jump straight to one. `<div>` creates no landmark, so a page built
entirely from `<div>` is a flat wall with no shortcuts.

Test to apply: could this block be a standalone item in an RSS feed? Then
`<article>`. Otherwise, does it group content under a heading? Then `<section>`.
Neither? `<div>`.

</details>

<details>
<summary>2. Your `main` has `max-width: 960px; margin: 0 auto;` but it is not centred. What is the likely cause?</summary>

Almost always one of two things:

1. **The element has no width limit in effect.** `margin: 0 auto` only centres a
   block that is narrower than its parent. If `max-width` is missing, misspelled,
   or overridden by a later rule, the block is already full width and there is
   nothing left to centre.
2. **A later rule overrides your margin.** The `*` reset at the top sets
   `margin: 0`, but a rule *after* your `main` rule can also reset it. In CSS,
   when two rules have the same specificity, the last one wins.

How to confirm: press **F12**, select the element, and read the Styles panel. An
overridden property is shown with a line through it, and you can see exactly
which rule won. Guessing is slower than looking.

</details>

<details>
<summary>3. What does `box-sizing: border-box` actually change? Give the arithmetic.</summary>

It changes what `width` measures.

Take `width: 200px; padding: 20px; border: 5px solid;`

- **Default** (`content-box`): `width` measures the content only. On screen the
  box occupies 200 + 20 + 20 + 5 + 5 = **250px**.
- **With `border-box`**: `width` measures the whole visible box. It occupies
  **200px**, and the content shrinks to 150px to make room.

Why it matters: with `content-box`, two boxes at `width: 50%` plus any padding
add up to more than 100% and the second one drops onto a new line. That is the
single most common "my layout broke" cause for beginners.

This is why the `*` reset in Task 3 sets it once for the whole document.

</details>

<details>
<summary>4. Challenge — no code given: convert the `<aside>` from below `<main>` to a right-hand sidebar, one third the width, using flexbox. Write it yourself first.</summary>

```css
main {
    display: flex;
    gap: 20px;
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
}

main section {
    flex: 2;   /* two shares of the leftover space */
}

main aside {
    flex: 1;   /* one share — so section is twice as wide */
}
```

Three points to check in your own version:

1. `display: flex` goes on the **parent** (`main`), not on the children. This is
   the mistake to expect: flex properties are set on the container, and `flex:`
   on the items.
2. `flex: 2` and `flex: 1` express a **ratio**, so they keep working at any window
   width. Hard-coded `width: 66%` / `33%` breaks as soon as `gap` is added,
   because the gap also needs space.
3. `gap: 20px` is the modern way to space flex children — do not add margins
   between them and then fight the extra edge margin.

</details>

## Checklist
- [ ] Created `layout.html` with semantic HTML5 elements
- [ ] Used `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- [ ] Added CSS for all layout elements in `style.css`
- [ ] Navigation links appear in a horizontal row using `display: inline`
- [ ] Articles appear as white boxes with padding and borders
- [ ] Footer is at the bottom with a dark background
- [ ] Updated `index.html` with the same header/nav/footer structure
- [ ] Both pages share the same CSS and look consistent

## Tips
- Always add `<link rel="stylesheet" href="css/style.css">` inside `<head>` — this connects your CSS.
- `margin: 0 auto` centers a block element horizontally (it only works if the element has a set width or `max-width`).
- `box-sizing: border-box` makes padding and border count inside the element's width — this prevents layout problems.
- Use semantic tags for **structure** and CSS for **appearance**. Don't use `<div>` when a `<header>` or `<nav>` makes more sense.
