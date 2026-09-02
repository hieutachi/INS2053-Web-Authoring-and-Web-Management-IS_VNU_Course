# Session 15 — In-Class Exercise: Mobile Interface Design & Responsive Intro

## Objective
- Understand why responsive design matters
- Use the `viewport` meta tag to control mobile display
- Write basic media queries to adapt a layout for small screens

## Time Required
Estimated time: 55 minutes

## Instructions

### Task 1: Understand Responsive Design
**Responsive design** means your website looks good on all screen sizes — phones, tablets, and desktops.

**Why it matters:**
- Over 60% of web traffic comes from mobile devices
- A site that looks broken on a phone loses visitors
- Google ranks mobile-friendly sites higher in search results

**Three principles of responsive design:**
1. **Fluid layouts** — use percentages instead of fixed pixel widths
2. **Flexible images** — images scale with their container
3. **Media queries** — CSS rules that apply only at certain screen sizes

### Task 2: Add the Viewport Meta Tag
Without a viewport meta tag, mobile browsers render the page as if it were a desktop screen and then shrink it down. The text becomes tiny and unreadable.

Add these two lines at the top of `<head>` on every HTML file:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**What this does:**
- `width=device-width` — tells the browser to set the page width to the device's screen width
- `initial-scale=1.0` — sets the initial zoom level to 100% (no zoom in or out)

Without this tag, a phone with a 375px screen might render your page at 980px wide and then shrink it. With this tag, the page is 375px wide from the start.

Add this to all your HTML files. Example for `index.html`:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Club - Home</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
```

### Task 3: Test Your Site on Different Screen Sizes
Before writing media queries, let's see what the site looks like on a phone.

**In Chrome or Edge:**
1. Open `index.html` in the browser
2. Press **F12** to open Developer Tools
3. Click the **Toggle Device Toolbar** icon (looks like a phone/tablet) or press **Ctrl+Shift+M**
4. Select a device from the dropdown at the top (e.g., "iPhone 12", "Pixel 5", "iPad")
5. Or drag the edges to resize to any custom width

You will probably see problems:
- Navigation links may overlap or go off screen
- Text may be too small or too large
- Images may overflow their containers
- The layout may be too wide

These are the problems we will fix with media queries.

### Task 4: Write Media Queries
A **media query** applies CSS rules only when certain conditions are met (usually screen width).

Open `css/style.css` and **scroll to the very bottom**. Add these media queries:

```css
/* ===== RESPONSIVE DESIGN ===== */

/* Tablet screens (768px and below) */
@media (max-width: 768px) {
    /* Header becomes smaller */
    header {
        padding: 15px;
    }

    header h1 {
        font-size: 24px;
    }

    header p {
        font-size: 12px;
    }

    /* Navigation links stack vertically */
    .main-nav ul li {
        display: block;
        text-align: center;
        border-bottom: 1px solid #3d566e;
    }

    .main-nav ul li a {
        padding: 12px;
    }

    /* Main content uses full width */
    main {
        padding: 15px;
    }

    /* Tables scroll horizontally on small screens */
    table {
        display: block;
        overflow-x: auto;
    }

    /* Images never overflow */
    img {
        max-width: 100%;
        height: auto;
    }

    /* Reduce video size */
    video {
        width: 100%;
        height: auto;
    }
}

/* Mobile phones (480px and below) */
@media (max-width: 480px) {
    /* Even smaller header */
    header h1 {
        font-size: 20px;
    }

    /* Stack article boxes */
    article {
        padding: 12px;
    }

    /* Smaller section titles */
    .section-title {
        font-size: 20px;
        letter-spacing: 1px;
    }

    /* Quote text smaller */
    .quote {
        font-size: 16px;
        padding: 15px;
    }

    /* Form fields use full width */
    .form-group input[type="text"],
    .form-group input[type="email"],
    .form-group input[type="password"],
    .form-group select,
    .form-group textarea {
        width: 100%;
        font-size: 14px;
    }

    /* Buttons stack vertically */
    .btn {
        display: block;
        width: 100%;
        text-align: center;
        margin-bottom: 8px;
    }

    .btn-reset {
        margin-left: 0;
    }
}
```

**How media queries work:**

```
@media (max-width: 768px) {
    /* These CSS rules only apply when the screen is 768px wide or less */
}
```

- `max-width: 768px` — "apply these styles when the viewport is 768 pixels wide or narrower"
- The rules inside a media query **override** the normal rules above them (because they come later in the file)
- You can have multiple media queries for different breakpoints (768px for tablets, 480px for phones)

### Task 5: Make the Navigation Mobile-Friendly
The horizontal navigation bar breaks on small screens. Let's make it stack vertically on mobile (already done above) and test it.

After adding the media queries, refresh your page in the browser with the device toolbar open.

**Expected behavior at different widths:**

| Width | Layout |
|-------|--------|
| 1200px+ | Full desktop layout — horizontal nav, centered content |
| 768px | Tablet — vertical nav, wider padding |
| 480px | Phone — vertical nav, smaller text, full-width buttons |

Test at these widths:
1. **Desktop (1200px)**: Everything should look normal (as before)
2. **Tablet (768px)**: Navigation becomes vertical, content uses more width
3. **Phone (375px)**: Navigation is vertical, text is smaller, form fields fill the screen

### Task 6: Add a Mobile-Friendly Touch Target Rule
On touch screens, links and buttons need to be large enough to tap easily. Add this rule inside the mobile media query:

```css
    /* Touch-friendly: links and buttons need minimum size */
    .main-nav a,
    .btn,
    footer a {
        min-height: 44px;
        line-height: 44px;
    }
```

**Why 44px?** Apple's Human Interface Guidelines recommend a minimum touch target of 44x44 points. Google recommends 48x48 dp. Using 44px ensures comfortable tapping on mobile devices.

## Starter Files
- Complete `club-website` from Sessions 2-14
- `css/style.css` with all previous CSS rules

## Expected Result

```
DESKTOP (1200px):
┌──────────────────────────────────────────────┐
│  [header]  Student Technology Club           │
├──────────────────────────────────────────────┤
│  [Home] [About] [Events] [Contact]  (horiz) │
├──────────────────────────────────────────────┤
│  Content centered, max-width 960px           │
└──────────────────────────────────────────────┘

TABLET (768px):
┌──────────────────────────┐
│  [header - smaller text] │
├──────────────────────────┤
│  [Home]                  │
│  [About]           (vert)│
│  [Events]                │
│  [Contact]               │
├──────────────────────────┤
│  Content full width      │
└──────────────────────────┘

PHONE (375px):
┌───────────────────┐
│  Student Tech Club│  (smaller heading)
├───────────────────┤
│  [Home]           │
│  [About]    (vert)│
│  [Events]         │
│  [Contact]        │
├───────────────────┤
│  Smaller text     │
│  Full-width buttons│
│  Tables scroll →   │
└───────────────────┘
```

## Self-Check (answers included)

Answer from **your own `style.css`** first, then open the arrow.

<details>
<summary>1. You wrote perfect media queries but the site still looks like a shrunken desktop page on a real phone. What is missing?</summary>

The viewport meta tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Without it, a mobile browser pretends the screen is about **980px wide**, renders
the desktop layout, then zooms the whole thing out to fit. Your
`@media (max-width: 768px)` block never activates, because as far as the browser
is concerned the viewport is 980px — not 375px.

Note why DevTools device mode can hide this: it reports the emulated width, so
your query may fire there and still fail on a real phone. The tag goes in the
`<head>` of **every** page, not just `index.html`.

This is the single highest-value line in the whole session. Everything else in
responsive design depends on it.

</details>

<details>
<summary>2. This exercise uses `max-width`. Chapter 15 also describes `min-width`. What is the difference, and why must you not mix them?</summary>

They are opposite directions of the same idea:

- `@media (max-width: 768px)` — **desktop-first**. The base CSS describes the
  desktop layout, and the query overrides it on screens *768px and narrower*.
- `@media (min-width: 769px)` — **mobile-first**. The base CSS describes the mobile
  layout, and the query adds complexity on screens *769px and wider*.

This course uses desktop-first, because you built the desktop layout first over
fourteen sessions. Mobile-first is generally preferred on new professional
projects: the base stylesheet stays simple, and a phone never downloads rules it
will not use.

Why not mix: two queries pointing in opposite directions at overlapping widths
means both can match at once, and which one wins depends on their order in the
file. You then have a layout that changes when you merely move a block of CSS.
Pick one direction per project and keep it.

</details>

<details>
<summary>3. Your table still breaks the phone layout even though images behave. Why do tables need special handling?</summary>

Because a table's width is driven by its **content**, not by its container. A
four-column table with real text has a minimum width it simply refuses to go
below, so it pushes the page wider than the screen and the whole layout scrolls
sideways.

`max-width: 100%` cannot fix it — the table's minimum content width wins.

The standard answer is to let the *table alone* scroll, inside a wrapper:

```html
<div class="table-scroll">
    <table> ... </table>
</div>
```

```css
.table-scroll {
    overflow-x: auto;
}
```

Now the page stays the width of the screen and only the table scrolls
horizontally, which is what your reader expects.

Compare with images: `max-width: 100%; height: auto;` *is* enough for them,
because an image can be drawn at any size. That difference is the whole reason
tables get their own rule.

</details>

<details>
<summary>4. Challenge — no code given: make the nav a single full-width column below 480px, with 44px touch targets, and verify it without a phone. Write it yourself first.</summary>

```css
@media (max-width: 480px) {
    .main-nav ul li {
        display: block;
    }

    .main-nav ul li a {
        display: block;
        min-height: 44px;
        line-height: 44px;
        padding: 0 16px;
        border-bottom: 1px solid #3d566e;
    }
}
```

How to verify without a phone: **F12** → **Ctrl+Shift+M** for device mode → set the
width to 375px. Then select a nav link and read the box model diagram in the
Styles panel; its height should be at least 44.

Three points to compare:

1. `display: block` on **both** the `<li>` and the `<a>`. The `<li>` stacks the
   items; the `<a>` makes each one fill the full row, so the tap target is the
   whole width rather than just the text.
2. `min-height` with a matching `line-height` gives the 44px height *and* keeps
   the label vertically centred. `min-height` alone leaves the text at the top.
3. 44px comes from Apple's guideline; Google's is 48dp. Either is defensible —
   what is not defensible is a 20px-tall link on a touch screen.

</details>

## Checklist
- [ ] Added `<meta name="viewport" content="width=device-width, initial-scale=1.0">` to every HTML file
- [ ] Tested the site in Chrome DevTools device mode at 1200px, 768px, and 375px
- [ ] Added a `@media (max-width: 768px)` query to `style.css`
- [ ] Added a `@media (max-width: 480px)` query to `style.css`
- [ ] Navigation switches from horizontal to vertical on tablets/phones
- [ ] Images scale with `max-width: 100%` and do not overflow
- [ ] Video element scales on small screens
- [ ] Form fields and buttons use full width on mobile
- [ ] Touch targets are at least 44px tall
- [ ] Desktop layout is NOT affected (only changes below 768px)

## Tips
- Always add the viewport meta tag first. Without it, media queries will not work correctly on mobile devices.
- This exercise uses the **desktop-first** approach: write the desktop layout as your base, then use `max-width` queries to override it on smaller screens. The rules inside `@media (max-width: 768px)` apply to screens 768px and narrower. (The opposite approach, **mobile-first**, uses `min-width` instead — see Chapter 15, "Desktop-First vs Mobile-First". Pick one direction per project; do not mix.)
- Test your site at multiple widths by resizing the browser window or using DevTools device mode.
- `overflow-x: auto` on a table lets the user scroll horizontally to see all columns, instead of the table overflowing the screen.
- Responsive design is an ongoing process — test often and fix problems as you find them.
