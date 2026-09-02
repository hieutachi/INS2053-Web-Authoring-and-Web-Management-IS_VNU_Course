# Session 14 — In-Class Exercise: Working with Spry Framework

## Objective
- Understand what the Spry Framework is and its role in web history
- Learn how Spry MenuBar works (a legacy Adobe navigation widget)
- Build a basic Spry-styled navigation menu for historical understanding

## Time Required
Estimated time: 50 minutes

## Instructions

### Task 1: What is the Spry Framework?
**Adobe Spry** was a JavaScript/CSS framework built into Dreamweaver CS6. It provided pre-made "widgets" for common web features:

| Widget | Purpose |
|--------|---------|
| **Spry MenuBar** | Horizontal/vertical navigation menus with dropdowns |
| **Spry Tabbed Panels** | Content tabs (like browser tabs) |
| **Spry Accordion** | Collapsible content sections |
| **Spry Tooltip** | Popup text when hovering over an element |

**Important note**: Spry is **legacy technology**. Modern websites use CSS `flexbox`, `grid`, and vanilla JavaScript instead. However, you may encounter Spry in older websites, and Dreamweaver CS6 still supports it. Understanding it helps you understand how web widgets evolved.

### Task 2: Explore the Spry MenuBar Structure
A Spry MenuBar is essentially an HTML `<ul>` list with special CSS classes and a JavaScript file that adds dropdown behavior.

The basic structure looks like this:

```html
<ul id="MenuBar1" class="MenuBarHorizontal">
    <li><a href="#">Home</a></li>
    <li>
        <a href="#">About</a>
        <ul>
            <li><a href="#">Our History</a></li>
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Mission</a></li>
        </ul>
    </li>
    <li>
        <a href="#">Services</a>
        <ul>
            <li><a href="#">Workshops</a></li>
            <li><a href="#">Tutoring</a></li>
        </ul>
    </li>
    <li><a href="#">Contact</a></li>
</ul>
```

**How it works:**
- The outer `<ul>` with class `MenuBarHorizontal` makes the menu horizontal
- Each `<li>` is a menu item
- A `<ul>` nested inside an `<li>` creates a **dropdown submenu**
- The Spry JavaScript file (`SpryMenuBar.js`) handles showing/hiding submenus when the user hovers

### Task 3: Create a Spry-Style Menu (Manual Implementation)
Since we may not have the actual Spry files available, we will recreate the Spry MenuBar look using pure CSS. This is how modern developers would build the same thing today.

Create a new file called `spry-menu.html` in the `club-website` folder:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Spry-Style Menu</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/spry-menu.css">
</head>
<body>
    <header>
        <h1>Student Technology Club</h1>
    </header>

    <!-- Spry-style MenuBar -->
    <nav>
        <ul id="MenuBar" class="MenuBarHorizontal">
            <li><a href="index.html">Home</a></li>
            <li>
                <a href="#">About</a>
                <ul>
                    <li><a href="about.html">Club Overview</a></li>
                    <li><a href="#">Our History</a></li>
                    <li><a href="#">Leadership Team</a></li>
                </ul>
            </li>
            <li>
                <a href="#">Activities</a>
                <ul>
                    <li>
                        <a href="#">Workshops</a>
                        <ul>
                            <li><a href="#">HTML &amp; CSS</a></li>
                            <li><a href="#">JavaScript</a></li>
                            <li><a href="#">Web Design</a></li>
                        </ul>
                    </li>
                    <li><a href="pages/events.html">Events</a></li>
                    <li><a href="#">Competitions</a></li>
                </ul>
            </li>
            <li><a href="pages/contact.html">Contact</a></li>
        </ul>
    </nav>

    <main>
        <h2>Welcome</h2>
        <p>This page demonstrates a Spry-style menu with dropdowns and sub-dropdowns, 
        built using pure CSS.</p>
        <p>Hover over <strong>About</strong> or <strong>Activities</strong> to see 
        the dropdown menus.</p>
    </main>

    <footer>
        <p>&copy; 2025 Student Technology Club</p>
    </footer>
</body>
</html>
```

### Task 4: Write the CSS for the Spry-Style Menu
Create a new file called `css/spry-menu.css`:

```css
/* ===== Spry MenuBar CSS ===== */

/* Remove default list styling */
.MenuBarHorizontal {
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #34495e;
    position: relative;
    z-index: 100;
}

/* Make items display horizontally */
.MenuBarHorizontal > li {
    display: inline-block;
    position: relative;
}

/* Style all links */
.MenuBarHorizontal li a {
    display: block;
    padding: 12px 20px;
    color: white;
    text-decoration: none;
    font-size: 15px;
    white-space: nowrap;
}

/* Hover effect on main items */
.MenuBarHorizontal > li > a:hover {
    background-color: #2c3e50;
    color: #f1c40f;
}

/* ===== Dropdown submenus ===== */

/* Hide submenus by default */
.MenuBarHorizontal ul {
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #2c3e50;
    min-width: 180px;
    display: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Show submenu when parent is hovered */
.MenuBarHorizontal li:hover > ul {
    display: block;
}

/* Style submenu links */
.MenuBarHorizontal ul li a {
    padding: 10px 16px;
    font-size: 14px;
    border-bottom: 1px solid #3d566e;
}

.MenuBarHorizontal ul li a:hover {
    background-color: #1a252f;
    color: #f1c40f;
}

/* Remove bottom border from last item */
.MenuBarHorizontal ul li:last-child a {
    border-bottom: none;
}

/* ===== Sub-submenus (fly-out to the right) ===== */

.MenuBarHorizontal ul ul {
    top: 0;
    left: 100%;
}
```

**How the dropdown works (without JavaScript!):**
- `display: none` hides the submenu initially
- `.MenuBarHorizontal li:hover > ul { display: block; }` shows the submenu when the user hovers over the parent `<li>`
- `position: absolute` takes the submenu out of the normal flow so it appears as an overlay
- `top: 100%` places it directly below the parent item
- For sub-submenus: `left: 100%` places them to the right of the parent submenu

Save both files and preview `spry-menu.html`. Hover over "About" and "Activities" to see the dropdown menus.

### Task 5: Compare Spry with Modern CSS Approaches
The Spry MenuBar required a JavaScript file to work. Our CSS-only version works the same way but uses `:hover` instead. Let's add a small enhancement — an arrow indicator for items with submenus.

Add this to `css/spry-menu.css`:

```css
/* Arrow indicator for items with submenus */
.MenuBarHorizontal > li > a[href="#"]::after {
    content: " ▼";
    font-size: 10px;
    color: #95a5a6;
}

.MenuBarHorizontal ul > li > a[href="#"]::after {
    content: " ►";
    font-size: 10px;
    color: #95a5a6;
}
```

The `::after` pseudo-element adds content after the link text. This is a CSS trick that avoids adding extra HTML just for a visual indicator.

## Starter Files
- `club-website` folder from previous sessions
- No additional starter files needed — you create the menu from scratch

## Expected Result

```
┌──────────────────────────────────────────────────┐
│  [dark header]  Student Technology Club          │
├──────────────────────────────────────────────────┤
│  [MenuBar — dark gray background]                │
│  [Home] [About ▼] [Activities ▼] [Contact]       │
│               │                                  │
│         ┌─────────────┐                          │
│         │ Club Overview│                          │
│         │ Our History  │   ← dropdown             │
│         │ Leadership   │                          │
│         └─────────────┘                          │
│                                                  │
│  When hovering "Activities":                     │
│         ┌────────────────────────────┐           │
│         │ Workshops  ► ┌───────────┐ │           │
│         │ Events       │ HTML/CSS  │ │           │
│         │ Competitions │ JS        │ │           │
│         └──────────────│ Design    │ │           │
│                        └───────────┘ │           │
│                        ↑ sub-submenu              │
│                                                  │
├──────────────────────────────────────────────────┤
│  main content area                               │
├──────────────────────────────────────────────────┤
│  [footer]                                        │
└──────────────────────────────────────────────────┘
```

## Self-Check (answers included)

Answer from **your own `spry-menu.css`** first, then open the arrow.

<details>
<summary>1. Spry needed `SpryMenuBar.js` to open its dropdowns. Your version uses no JavaScript at all. What replaced it?</summary>

The CSS descendant-with-`:hover` selector:

```css
.MenuBarHorizontal li:hover > ul {
    display: block;
}
```

Read it as: when the mouse is over an `<li>`, show the `<ul>` that is its direct
child. The submenu is `display: none` by default, and hovering flips it to
`block`.

Spry was written in 2006, when `:hover` was unreliable on anything other than an
`<a>` in the then-dominant IE6. Adobe shipped JavaScript to do what CSS could not
be trusted to do. Once browsers caught up, the JavaScript became dead weight.

The `>` matters. Without it, `li:hover ul` matches submenus at **every** depth, so
hovering the top item opens the sub-submenus as well.

</details>

<details>
<summary>2. Why does the submenu need `position: absolute`, and what must its parent have for that to work?</summary>

`position: absolute` takes the submenu **out of the normal flow**, so it floats over
the page instead of pushing the content below it downward. Without it, hovering a
menu item would shove your whole layout down — which is what happens when you
forget it.

For the submenu to land under its own parent item, that parent needs
`position: relative`:

```css
.MenuBarHorizontal li {
    position: relative;   /* the anchor */
}

.MenuBarHorizontal li ul {
    position: absolute;   /* positioned against that anchor */
    top: 100%;            /* directly below the parent */
    left: 0;
}
```

An absolutely positioned element is placed relative to its nearest **positioned**
ancestor. If no ancestor is positioned, it escapes all the way to the page itself
and appears in the top-left corner. That symptom — dropdown in the wrong corner —
almost always means a missing `position: relative`.

`top: 100%` means "100% of the parent's height down", so it works whatever the
menu bar's height happens to be.

</details>

<details>
<summary>3. A hover-only menu has a real accessibility problem. What is it, and why is this session still worth doing?</summary>

**A hover has no keyboard or touch equivalent.** A student navigating with Tab
never triggers `:hover`, so the submenu never opens and those links are
unreachable. On a phone there is no hovering at all — a tap on the parent either
follows its `href` or does nothing.

Partial improvement, one line:

```css
.MenuBarHorizontal li:hover > ul,
.MenuBarHorizontal li:focus-within > ul {
    display: block;
}
```

`:focus-within` matches while any descendant has keyboard focus, so tabbing into
the parent link opens the submenu.

That fixes the keyboard but not touch. A genuinely accessible dropdown needs a
real button with `aria-expanded`, toggled by JavaScript — which is beyond this
course.

So why learn it? Because Dreamweaver CS6 ships Spry, you will meet it in
maintained older sites, and rebuilding it in CSS shows you exactly what a widget
library was hiding. Knowing *why* Spry was retired is more useful than knowing how
to use it.

</details>

<details>
<summary>4. Challenge — no code given: your third-level submenu opens on top of its parent instead of flying out to the right. Fix it, and explain the positioning. Write it yourself first.</summary>

```css
/* Level 2: below the top-level item */
.MenuBarHorizontal li ul {
    position: absolute;
    top: 100%;
    left: 0;
}

/* Level 3: to the right of its level-2 parent */
.MenuBarHorizontal li ul li ul {
    top: 0;
    left: 100%;
}
```

The reasoning, which is the point of the question:

1. A second-level submenu drops **downward**: `top: 100%` (past the parent's
   height), `left: 0` (aligned with its left edge).
2. A third-level submenu flies **sideways**: `top: 0` (level with its parent) and
   `left: 100%` (past the parent's full width).
3. Both are measured against the nearest positioned ancestor, which is the `<li>`
   carrying `position: relative`. Each level anchors to its own parent, so the
   same two rules work at any depth.

If your version put the third level on top of the second, the cause is inheriting
`top: 100%; left: 0` from the level-2 rule without overriding it — the third level
is a descendant, so that rule applies to it too until you say otherwise.

</details>

## Checklist
- [ ] Created `spry-menu.html` with a nested `<ul>` menu structure
- [ ] Created `css/spry-menu.css` with MenuBar styles
- [ ] Main menu items display horizontally using `display: inline-block`
- [ ] Dropdown submenus appear on hover using `:hover > ul`
- [ ] Sub-submenus fly out to the right
- [ ] Arrow indicators (▼ and ►) appear on items with submenus
- [ ] All links in the menu work when clicked
- [ ] Menu looks consistent with the rest of the site (same colors, fonts)

## Tips
- Spry is **no longer used** in modern web development. You are learning it for historical context and because it appears in Dreamweaver CS6.
- The CSS `:hover` trick for dropdowns works in all modern browsers. But for very complex menus with animations, JavaScript is still needed.
- `position: absolute` removes an element from the normal flow. The submenu "floats" over other content. This is what makes dropdowns possible.
- In Dreamweaver CS6, you can insert a Spry MenuBar via **Insert > Spry > Spry MenuBar**. It automatically adds the JavaScript and CSS files. But understanding the underlying HTML/CSS is more valuable than using the wizard.
