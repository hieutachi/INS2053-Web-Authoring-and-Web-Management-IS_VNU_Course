# Session 7 — In-Class Exercise: CSS3 and Web Fonts

## Objective
- Use Google Fonts to add custom fonts to your website
- Apply CSS3 text styling properties
- Add smooth transitions and visual effects using CSS3

## Time Required
Estimated time: 55 minutes

## Instructions

### Task 1: Add Google Fonts to Your Website
Google Fonts provides free fonts that you can use on any website. You load them through a `<link>` tag in your HTML `<head>`.

Go to [https://fonts.google.com](https://fonts.google.com) in your browser. For this exercise, we will use two fonts:
- **Open Sans** — for body text
- **Roboto Slab** — for headings

Find these fonts on Google Fonts, click on each one, and click the **"+ Select"** or **"Embed"** button. Copy the `<link>` code Google gives you.

Open every HTML file in your `club-website` and add the following line inside `<head>`, **above** the `<link>` to `style.css`:

```html
<head>
    <title>Student Club - Home</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet">
    <!-- Our stylesheet -->
    <link rel="stylesheet" href="css/style.css">
</head>
```

**Explanation**:
- `family=Open+Sans` loads the Open Sans font
- `family=Roboto+Slab:wght@400;700` loads Roboto Slab in regular (400) and bold (700) weights
- `display=swap` shows a fallback font first, then swaps to the Google Font when it loads (prevents invisible text)

Now open `css/style.css` and update the `body` and heading rules to use the new fonts:

```css
body {
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333333;
    background-color: #f5f5f5;
}

h1, h2, h3 {
    font-family: 'Roboto Slab', Georgia, serif;
}
```

**Why list multiple fonts?** The browser tries the first font. If it cannot load it, it tries the next one. `sans-serif` and `serif` are generic fallbacks that always work.

Save all files and preview. You should notice the headings now look different (Roboto Slab is a serif font) from the body text (Open Sans is a sans-serif font).

### Task 2: CSS3 Text Styling
CSS3 adds many new properties for styling text. Add these rules to `css/style.css`:

```css
/* Fancy heading style */
.section-title {
    font-family: 'Roboto Slab', Georgia, serif;
    font-size: 26px;
    color: #2c3e50;
    text-transform: uppercase;       /* MAKES ALL TEXT UPPERCASE */
    letter-spacing: 2px;             /* Extra space between letters */
    border-bottom: 3px solid #2980b9;
    padding-bottom: 8px;
    margin-bottom: 20px;
}

/* Quote / callout style */
.quote {
    font-size: 20px;
    font-style: italic;
    color: #555555;
    text-align: center;
    padding: 20px;
    border-left: none;
    border-top: 2px solid #2980b9;
    border-bottom: 2px solid #2980b9;
    margin: 20px 0;
}

/* Drop cap — first letter of a paragraph is large */
.drop-cap::first-letter {
    font-size: 48px;
    font-weight: bold;
    color: #2980b9;
    float: left;
    margin-right: 8px;
    line-height: 1;
}
```

Now update `index.html` to use these new classes. Inside `<main>`, change the content to:

```html
    <main>
        <section>
            <h2 class="section-title">Welcome to Our Club</h2>
            <p class="drop-cap">The Student Technology Club is a community of learners who 
            believe in building, sharing, and growing together. Whether you are a complete 
            beginner or an experienced programmer, you will find a home here.</p>
        </section>

        <section>
            <p class="quote">"The best way to learn is by building real things."</p>
        </section>

        <section>
            <h2 class="section-title">Why Join</h2>
            <ul>
                <li>Learn new technical skills</li>
                <li>Work on real projects</li>
                <li>Meet other students who share your interests</li>
            </ul>
        </section>
    </main>
```

Save and preview. You should see:
- Section headings in uppercase with a blue underline
- A centered italic quote with blue borders above and below
- The first letter of the welcome paragraph is large and blue (drop cap)

### Task 3: Add Transitions and Visual Effects
CSS3 **transitions** make property changes happen smoothly over time instead of instantly.

Add these rules to `css/style.css`:

```css
/* Smooth transition for all links */
a {
    color: #2980b9;
    text-decoration: none;
    transition: color 0.3s ease;
}

a:hover {
    color: #1a5276;
}

/* Article cards with hover effect */
article {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #dddddd;
    border-radius: 6px;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

article:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

/* Button-style link */
.btn {
    display: inline-block;
    background-color: #2980b9;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    font-size: 15px;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #1a5276;
    color: white;
}

/* Box shadow for main content sections */
section {
    margin-bottom: 25px;
}

/* Gradient background for header */
header {
    background: linear-gradient(135deg, #2c3e50, #3498db);
    color: white;
    padding: 30px 20px;
    text-align: center;
}
```

Update `pages/events.html` to add a button. Inside `<main>`, after the article for the HTML & CSS Workshop, add:

```html
            <article>
                <h3>HTML &amp; CSS Workshop</h3>
                <p><strong>Date:</strong> March 15, 2025</p>
                <p><strong>Location:</strong> Room 204, IT Building</p>
                <p>Learn the basics of HTML and CSS by building a real website.</p>
                <a href="contact.html" class="btn">Register Now</a>
            </article>
```

**Explanation of new CSS properties:**
- `transition: color 0.3s ease` — when color changes, it takes 0.3 seconds with a smooth easing effect
- `box-shadow` — adds a shadow around the element
- `transform: translateY(-2px)` — moves the element 2 pixels upward on hover
- `linear-gradient(135deg, #2c3e50, #3498db)` — creates a diagonal gradient background from dark blue to light blue
- `border-radius: 6px` — rounds the corners of the article boxes

Save all files and preview. Hover your mouse over:
- Links — they change color smoothly
- Article boxes — they gain a shadow and move up slightly
- The "Register Now" button — the background darkens smoothly

## Starter Files
- `club-website` folder from Sessions 2-6
- `css/style.css` with all previous CSS rules
- All 4 HTML pages with content and navigation

## Expected Result

```
┌──────────────────────────────────────────────────────┐
│  [gradient header: dark blue → light blue]           │
│                                                      │
│         Student Technology Club                      │
│  Building the future, one line of code at a time.    │
│                                                      │
├──────────────────────────────────────────────────────┤
│  [nav bar]  Home | About | Events | Contact          │
├──────────────────────────────────────────────────────┤
│                                                      │
│  WELCOME TO OUR CLUB                                 │
│  ───────────────────────── (blue underline)          │
│  T│he Student Technology Club is a community...      │
│   ↑ big blue first letter (drop cap)                 │
│                                                      │
│  ── blue line ──────────────────────────────────     │
│  "The best way to learn is by building real things." │
│  ── blue line ──────────────────────────────────     │
│  (centered, italic quote)                            │
│                                                      │
│  WHY JOIN                                            │
│  ───────── (blue underline)                          │
│  • Learn new technical skills                        │
│  • Work on real projects                             │
│  • Meet other students                               │
│                                                      │
├──────────────────────────────────────────────────────┤
│  [dark footer]  (c) 2025 Student Technology Club     │
└──────────────────────────────────────────────────────┘
```

On the Events page, the "Register Now" button appears as a blue rectangular button that darkens on hover.

## Self-Check (answers included)

Answer from **your own `style.css`** first, then open the arrow.

<details>
<summary>1. Why write `font-family: 'Open Sans', Arial, sans-serif` instead of just `'Open Sans'`?</summary>

That list is a **fallback chain**. The browser tries each entry left to right and
uses the first one it can actually render:

1. `'Open Sans'` — the Google Font, if it downloaded successfully.
2. `Arial` — a font installed on nearly every machine.
3. `sans-serif` — not a font at all, but a *generic family*: "whatever this
   device uses for sans-serif". This can never fail.

Google Fonts load over the internet. On the exam machines, with no internet, the
first entry silently fails — and your page still looks deliberate rather than
falling back to Times New Roman.

Always end the chain with a generic family (`sans-serif`, `serif`, `monospace`).

</details>

<details>
<summary>2. You added `transition: 0.3s` to `.btn:hover` but nothing animates smoothly. Where does `transition` belong?</summary>

On the **normal** state, not the `:hover` state.

```css
.btn {
    background-color: #2980b9;
    transition: background-color 0.3s ease;   /* here */
}

.btn:hover {
    background-color: #1f6391;                /* just the new value */
}
```

Read it as an instruction attached to the element: "whenever your
`background-color` changes, take 0.3s to get there." The element must be
carrying that instruction *before* the change happens.

Putting `transition` only in `:hover` gives you a smooth fade **in** and an
instant snap **out**, because once the mouse leaves, the rule holding the
transition no longer applies. That asymmetry is the tell-tale sign.

</details>

<details>
<summary>3. Which properties can `transition` animate, and which will do nothing?</summary>

`transition` needs a property with values it can compute a midpoint for:

**Works** — anything numeric or colour-like: `color`, `background-color`,
`opacity`, `width`, `padding`, `transform`, `box-shadow`, `border-color`.

**Does nothing** — properties that switch discretely: `display`,
`font-family`, `position`, `background-image` (swapping one image for another).

The classic trap is `display: none` → `display: block`. There is no halfway
between them, so the change is instant no matter what `transition` says. To fade
something in you animate `opacity` instead.

</details>

<details>
<summary>4. Challenge — no code given: make the club logo grow slightly and gain a shadow on hover, smoothly, without pushing neighbouring content around. Write it yourself first.</summary>

```css
.logo {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.logo:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}
```

Why `transform: scale()` and not `width`:

1. `transform` is applied **after** layout is computed, so the element grows
   visually without moving its neighbours. Changing `width` re-runs layout and
   everything nearby shifts — visibly jumpy.
2. Both properties being animated are named explicitly in `transition`. Writing
   `transition: all 0.25s` also works but animates anything that ever changes,
   which becomes a surprise later.
3. `1.05` is a 5% growth. Enough to feel responsive; small enough not to look
   like a mistake.

</details>

## Checklist
- [ ] Added the Google Fonts `<link>` to every HTML file's `<head>`
- [ ] Updated `body` CSS to use `'Open Sans'` as the body font
- [ ] Updated heading CSS to use `'Roboto Slab'`
- [ ] Used `text-transform: uppercase` on section headings
- [ ] Used `letter-spacing` on at least one element
- [ ] Created a quote/callout style with top and bottom borders
- [ ] Created a drop cap effect using `::first-letter`
- [ ] Added `transition` to links for smooth color change on hover
- [ ] Added `box-shadow` and `transform` hover effect to articles
- [ ] Created a `.btn` class for button-style links
- [ ] Changed header background to a gradient using `linear-gradient`

## Tips
- Always put the Google Fonts `<link>` **before** your `style.css` link in the `<head>`.
- `transition` only works on properties that change — you need a `:hover` rule (or some other trigger) that actually changes the property.
- `transform: translateY(-2px)` moves the element without affecting the layout around it. This is different from `margin-top: -2px`.
- Google Fonts load from the internet — if you have no internet connection, the fallback fonts (Arial, Georgia) will be used instead.
