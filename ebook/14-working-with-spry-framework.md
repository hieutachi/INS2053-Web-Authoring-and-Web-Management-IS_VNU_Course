# 🟦 SESSION 14
# **Working with Spry Framework**

Welcome to Session 14! Today we explore something a bit different: a piece of web history. The **Spry Framework** was Adobe's JavaScript widget library bundled with Dreamweaver CS6. It let you drop interactive components — dropdown menus, accordions, tabbed panels — into your pages without writing JavaScript from scratch. But here is the important thing: **Spry is legacy software**. Adobe stopped maintaining it around 2012. So why do we study it? Because some older websites still use it, and because understanding what Spry did helps you appreciate the modern CSS-only techniques that replaced it. In this session we will look at how Spry worked, then build the same features using pure HTML5 and CSS3 — no JavaScript needed. Your Student Club Website will get a proper CSS-only dropdown navigation menu by the end.

---

# 📌 SESSION INFORMATION

```
📅 Duration:     3 periods (150 minutes) — Theory ~60 min, Practice ~90 min
📚 Reference:    Chapter 14 — Working with Spry Framework (course textbook)
                 MDN Web Docs "<details>", "<summary>", ":hover" pseudo-class
🎯 Objectives:   1. Explain what Spry was and why it is obsolete
                 2. Recognise Spry widget HTML when you meet it in old code
                 3. Build a CSS-only dropdown navigation bar as the modern replacement
                 4. Create a CSS-only accordion using <details> / <summary>
                 5. Decide when legacy code should be replaced rather than patched
📖 Prepare:      1. Complete Sessions 1-13
                 2. Have your Student Club site open
                 3. Review CSS selectors and the box model (Sessions 4-5)
🖼 Diagrams:     canvases/buoi-14.canvas.tsx — SpryVsModern, DetailsAccordion, DropdownAnatomy,
                 SpryRemoval
🔗 Outcomes:     CLO3 (choose appropriate technologies for web development)
                 CLO4 (design and build a web application)
                 CLO5 (evaluate, document, and present a web application)
```

---

# 🎯 LEARNING OBJECTIVES

- Describe what the Spry Framework is and its relationship to Adobe Dreamweaver.
- List the three main Spry widgets: Accordion, Tabbed Panels, Menu Bar.
- Explain five reasons why Spry is considered legacy and should not be used in new projects.
- Read and understand the basic HTML structure of a Spry widget.
- Build a fully functional CSS-only dropdown navigation menu using `:hover` and nested `<ul>`.
- Build a CSS-only accordion using the HTML5 `<details>` and `<summary>` elements.
- Decide when to replace legacy Spry code with modern alternatives.
- Apply the CSS-only dropdown to the Student Club Website's navigation bar.

---

# 📖 THEORY

## 1. What Is the Spry Framework?

> 🖼 **Diagram:** `canvases/buoi-14.canvas.tsx` → `SpryVsModern` — slide `s14-what-is-spry` ("What Is Spry?")

### 1.1 Definition

**Spry** is a JavaScript framework created by Adobe Systems. It was included with Adobe Dreamweaver starting from version CS3 (2007) through CS6 (2012). Spry provided pre-built **widgets** — interactive UI components like menus, accordions, and tabbed panels — that designers could insert into web pages through Dreamweaver's visual interface without writing JavaScript manually.

Spry also included a data-binding system for connecting HTML to XML data sources and animation effects, but the widgets were by far the most commonly used feature.

### 🎒 Real-life example

Imagine you are building the Student Club Website in 2010 using Dreamweaver CS6. You want a horizontal navigation bar where hovering over "Events" reveals a dropdown submenu showing "Workshops," "Social Events," and "Competitions." Instead of writing JavaScript yourself, you would:

1. Click Insert → Spry → Spry Menu Bar
2. Dreamweaver inserts the HTML structure, links the CSS and JS files, and adds initialization code
3. You edit the menu text in the HTML
4. Done — a working dropdown menu in under a minute

This was revolutionary at the time because many web designers did not know JavaScript.

### 1.2 Why It Matters (Historically)

Spry represented an important era in web development:

```
┌───────────────────────────────────────────────────────┐
│          TIMELINE OF WEB UI FRAMEWORKS                 │
│                                                       │
│  2005 ─── Prototype.js, early jQuery                  │
│  2007 ─── Spry ships with Dreamweaver CS3             │
│  2008 ─── jQuery UI released                          │
│  2011 ─── Bootstrap 1.0 released                      │
│  2012 ─── Spry development STOPS                      │
│  2013 ─── Bootstrap 3.0 (mobile-first)                │
│  2014 ─── React gains popularity                      │
│  2015 ─── Vue.js 1.0                                 │
│  2018 ─── CSS-only solutions mature (:hover, details) │
│  2024 ─── Modern CSS handles most widget needs alone  │
└───────────────────────────────────────────────────────┘
```

Understanding Spry helps you:
- Maintain or migrate older websites that still use it
- Appreciate how far CSS has come (we can now do with pure CSS what once required JavaScript)
- Recognize patterns that appear in modern frameworks (the accordion pattern, the dropdown pattern)

### ⚠️ Important notes

- **Do NOT use Spry in new projects.** It is unmaintained, insecure, and incompatible with modern browsers and mobile devices.
- This session teaches Spry for **recognition and migration purposes**, then immediately shows the modern replacement.
- If you encounter Spry on an existing site, plan to replace it.

### 🧪 Try It Yourself — Recognise Spry in the Wild

**Task (4 min):** Learn the signature so you can identify it in inherited code.

1. Look for these markers in any HTML file:
   ```html
   <script src="SpryAssets/SpryMenuBar.js" type="text/javascript"></script>
   <link href="SpryAssets/SpryMenuBarHorizontal.css" rel="stylesheet">
   <ul id="MenuBar1" class="MenuBarHorizontal">
   <script type="text/javascript">
       var MenuBar1 = new Spry.Widget.MenuBar("MenuBar1", {imgDown:"SpryAssets/SpryMenuBarDownHover.gif"});
   </script>
   ```
2. Note the three-part pattern: a `SpryAssets/` folder, a CSS class starting `MenuBar` or `Accordion`, and an inline `new Spry.Widget...` constructor at the bottom of `<body>`.
3. Now ask what happens to that page if `SpryMenuBar.js` fails to load.

**Expected result:** The nav collapses to a plain unordered list with no dropdown. The site's navigation depends entirely on a JavaScript file that is no longer maintained anywhere.

<details>
<summary>Why the constructor at the bottom is the real tell</summary>

Dreamweaver generated that `new Spry.Widget.MenuBar(...)` line automatically when you inserted a widget, and it had to run after the markup existed — which is why it sits at the end of `<body>`.

That coupling is the whole problem. The HTML is inert on its own: the `<ul>` carries no semantic indication that it is a menu, and the behaviour lives in a script that must load, parse, and execute successfully. One 404 and the navigation is gone.

The modern equivalents in this chapter invert that. A CSS dropdown works because the CSS *is* the behaviour, and `<details>` works because the browser implements it. Nothing to load, nothing to fail.

When you inherit a Spry site, do not try to repair the library. Delete `SpryAssets/`, keep the `<ul>` structure, and add the CSS from the next section — the markup you need is already there.

</details>


---

## 2. The Three Spry Widgets

### 2.1 Accordion

An accordion shows stacked panels. Only one panel is open at a time; clicking another panel header closes the current one and opens the new one.

```
┌──────────────────────────────────┐
│ ▼ Web Design Workshop            │  ← Open panel (content visible)
│   Learn HTML & CSS basics.      │
│   Date: March 15, 2024.         │
├──────────────────────────────────┤
│ ▶ Photography Contest            │  ← Closed panel (click to open)
├──────────────────────────────────┤
│ ▶ Music Night                    │  ← Closed panel
└──────────────────────────────────┘
```

**Spry Accordion HTML structure:**
```html
<!-- Spry Accordion (LEGACY - do not use in new projects) -->
<div id="Accordion1" class="Accordion">
    <div class="AccordionPanel">
        <div class="AccordionPanelTab">Web Design Workshop</div>
        <div class="AccordionPanelContent">
            <p>Learn HTML & CSS basics. March 15, 2024.</p>
        </div>
    </div>
    <div class="AccordionPanel">
        <div class="AccordionPanelTab">Photography Contest</div>
        <div class="AccordionPanelContent">
            <p>Submit campus photos. Deadline: March 20.</p>
        </div>
    </div>
</div>
```

**Required Spry files:**
```html
<!-- LEGACY Spry files -->
<link href="SpryAssets/SpryAccordion.css" rel="stylesheet">
<script src="SpryAssets/SpryAccordion.js"></script>
<!-- Plus initialization script at bottom of page -->
<script>var Accordion1 = new Spry.Widget.Accordion("Accordion1");</script>
```

### 2.2 Tabbed Panels

Tabbed panels show content organized under clickable tabs, similar to browser tabs.

```
┌──────────┬──────────┬──────────────┐
│ Workshops│ Social   │ Competitions │  ← Tabs
├──────────┴──────────┴──────────────┤
│                                     │
│  • Web Design - March 15           │  ← Content of active tab
│  • JavaScript Basics - March 22    │
│  • Graphic Design - March 29       │
│                                     │
└─────────────────────────────────────┘
```

**Spry Tabbed Panels HTML structure:**
```html
<!-- Spry Tabbed Panels (LEGACY) -->
<div id="TabbedPanels1" class="TabbedPanels">
    <ul class="TabbedPanelsTabGroup">
        <li class="TabbedPanelsTab">Workshops</li>
        <li class="TabbedPanelsTab">Social Events</li>
        <li class="TabbedPanelsTab">Competitions</li>
    </ul>
    <div class="TabbedPanelsContentGroup">
        <div class="TabbedPanelsContent">
            <h3>Workshops</h3>
            <ul>
                <li>Web Design - March 15</li>
                <li>JavaScript Basics - March 22</li>
            </ul>
        </div>
        <div class="TabbedPanelsContent">
            <h3>Social Events</h3>
            <ul>
                <li>Movie Night - April 5</li>
                <li>Game Tournament - April 12</li>
            </ul>
        </div>
        <div class="TabbedPanelsContent">
            <h3>Competitions</h3>
            <ul>
                <li>Photography Contest - March 22</li>
                <li>Hackathon - April 5-6</li>
            </ul>
        </div>
    </div>
</div>
```

### 2.3 Menu Bar (Horizontal / Vertical)

The Spry Menu Bar creates a navigation bar with dropdown submenus. This is the widget most relevant to our Student Club Website.

```
┌──────┬────────────┬────────────┬─────────┬─────────┐
│ Home │ About ▾    │ Events ▾   │ Gallery │ Contact │
│      ├────────────┼────────────┤         │         │
│      │ Mission    │ Workshops  │         │         │
│      │ Team       │ Social     │         │         │
│      │ History    │ Compete    │         │         │
└──────┴────────────┴────────────┴─────────┴─────────┘
```

**Spry Menu Bar HTML structure:**
```html
<!-- Spry MenuBar (LEGACY) -->
<ul id="MenuBar1" class="MenuBarHorizontal">
    <li><a href="index.html">Home</a></li>
    <li>
        <a href="#" class="MenuBarItemSubmenu">About</a>
        <ul>
            <li><a href="about.html#mission">Our Mission</a></li>
            <li><a href="about.html#team">Our Team</a></li>
            <li><a href="about.html#history">Our History</a></li>
        </ul>
    </li>
    <li>
        <a href="#" class="MenuBarItemSubmenu">Events</a>
        <ul>
            <li><a href="events.html#workshops">Workshops</a></li>
            <li><a href="events.html#social">Social Events</a></li>
            <li><a href="events.html#competitions">Competitions</a></li>
        </ul>
    </li>
    <li><a href="gallery.html">Gallery</a></li>
    <li><a href="contact.html">Contact</a></li>
</ul>
```

### 🔍 Comparison Table: Spry Widgets vs Modern Alternatives

| Spry Widget | What It Does | Modern Replacement | Technology Needed |
|-------------|-------------|-------------------|-------------------|
| Accordion | Collapsible panels (one open at a time) | `<details>` + `<summary>` | Pure HTML5 |
| Tabbed Panels | Content tabs | CSS radio-button hack or `<details name="">` | Pure HTML5 + CSS |
| Menu Bar (horizontal) | Dropdown navigation | Nested `<ul>` + `:hover` / `:focus-within` | Pure CSS |
| Menu Bar (vertical) | Sidebar dropdown nav | Same as above | Pure CSS |
| Data binding | Connect HTML to XML | Fetch API, JSON, frameworks | JavaScript |

### ⚠️ Important notes

- Every Spry widget requires THREE things: (1) specific HTML structure, (2) linked CSS file, (3) linked JS file + initialization script. Missing any one breaks the widget.
- Spry files live in a `SpryAssets/` folder that Dreamweaver creates automatically.
- Spry does NOT handle touch events properly — dropdowns fail on smartphones and tablets.

---

## 3. Why Spry Is Legacy (and What Replaced It)

> 🖼 **Diagram:** `canvases/buoi-14.canvas.tsx` → `SpryRemoval` — slide `s14-migration` ("Migrating from Spry")

### 3.1 Five Reasons Spry Is Obsolete

| # | Reason | Explanation |
|---|--------|-------------|
| 1 | **No longer maintained** | Adobe stopped updating Spry around 2012. No bug fixes, no security patches, no new features. |
| 2 | **Not mobile-friendly** | Spry was designed before smartphones. Touch events (tap, swipe) are not handled. Dropdowns cannot be opened on touch screens. |
| 3 | **Security risks** | Unmaintained JavaScript libraries may contain vulnerabilities that are never patched. |
| 4 | **Better alternatives exist** | Modern CSS can replicate all Spry widgets without ANY JavaScript. For more complex needs, Bootstrap, jQuery UI, and other actively-maintained libraries exist. |
| 5 | **Browser compatibility issues** | Spry uses outdated JavaScript patterns that may break in modern browsers (Chrome 100+, Firefox 100+, Safari 16+). |

### 3.2 The Modern Approach: CSS-Only Widgets

Modern CSS is powerful enough to handle most interactive UI patterns that previously required JavaScript:

```
┌────────────────────────────────────────────────────┐
│        WHAT MODERN CSS CAN DO ALONE                 │
│                                                    │
│  ✅ Dropdown menus      (:hover, :focus-within)    │
│  ✅ Accordions          (<details>/<summary>)      │
│  ✅ Tooltips            (::after + :hover)         │
│  ✅ Modal dialogs       (:target or checkbox hack) │
│  ✅ Tab panels          (radio button hack)        │
│  ✅ Smooth transitions  (transition, animation)    │
│  ✅ Responsive layouts  (media queries, flexbox,   │
│                           grid)                    │
└────────────────────────────────────────────────────┘
```

The key insight: if a behavior can be triggered by user interaction (hover, focus, click on a checkbox/details), CSS can respond to it without JavaScript.

### 🧪 Try It Yourself — Translate a Spry Widget

**Task (6 min):** Map each legacy widget onto what you would write today.

For each Spry widget, name the modern replacement and the reason:

1. Spry MenuBar
2. Spry Accordion
3. Spry Tabbed Panels
4. Spry Validation Text Field
5. Spry Collapsible Panel

<details>
<summary>Answers</summary>

| Spry widget | Modern replacement | Why it wins |
|---|---|---|
| MenuBar | `<nav>` + CSS `:hover` / `:focus-within` | No JS dependency; keyboard accessible |
| Accordion | `<details>` / `<summary>` | Built into the browser, correct ARIA for free |
| Tabbed Panels | CSS + a small amount of JS, or `<details>` group | Spry's version broke without JS |
| Validation Text Field | `required`, `type="email"`, `minlength`, `pattern` | Native, works with JS disabled |
| Collapsible Panel | `<details>` | One element instead of a widget plus a library |

The pattern across every row: what needed a JavaScript framework in 2008 is now either a plain HTML element or three lines of CSS.

Spry itself was **discontinued in 2012** and removed from Dreamweaver after CS6. Its files — `SpryMenuBar.js`, `SpryAccordion.css` — are no longer maintained and are not served by any CDN. If you find them in a site you inherit, the library files are almost certainly bundled locally, and replacing them with the equivalents above will delete more code than it adds.

</details>


---

## 4. CSS-Only Dropdown Navigation (Modern Replacement for Spry MenuBar)

> 🖼 **Diagram:** `canvases/buoi-14.canvas.tsx` → `DropdownAnatomy` — slide `s14-dropdown-code` ("CSS-Only Dropdown Navigation")

This is the most important skill in this session. We will build a dropdown navigation bar for the Student Club Website using only HTML and CSS.

### 4.1 How It Works

The technique relies on three CSS concepts:

1. **Nested `<ul>`** — Submenu items are placed inside a `<ul>` that is a child of the parent `<li>`.
2. **`display: none` / `display: block`** — The submenu `<ul>` is hidden by default and shown on hover.
3. **`:hover` pseudo-class** — When the user hovers over the parent `<li>`, the child `<ul>` becomes visible.

```
NAV STRUCTURE (ASCII):

<nav>
  <ul>                         ← Main menu (horizontal)
    <li> Home </li>
    <li> About                 ← Parent item
      <ul>                     ← Submenu (hidden until hover)
        <li> Mission </li>
        <li> Team </li>
        <li> History </li>
      </ul>
    </li>
    <li> Events </li>
  </ul>
</nav>
```

### 4.2 Complete Code

```html
<!-- ✅ MODERN CSS-only dropdown navigation -->
<nav>
    <ul class="main-nav">
        <li><a href="index.html">Home</a></li>
        <li class="has-dropdown">
            <a href="about.html">About &#9662;</a>
            <ul class="dropdown">
                <li><a href="about.html#mission">Our Mission</a></li>
                <li><a href="about.html#team">Our Team</a></li>
                <li><a href="about.html#history">Our History</a></li>
            </ul>
        </li>
        <li class="has-dropdown">
            <a href="events.html">Events &#9662;</a>
            <ul class="dropdown">
                <li><a href="events.html#workshops">Workshops</a></li>
                <li><a href="events.html#social">Social Events</a></li>
                <li><a href="events.html#competitions">Competitions</a></li>
            </ul>
        </li>
        <li><a href="gallery.html">Gallery</a></li>
        <li><a href="join.html">Join Us</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

```css
/* =============================================
   CSS-ONLY DROPDOWN NAVIGATION (Session 14)
   ============================================= */

/* --- Reset nav list --- */
.main-nav {
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #1a5276;
    display: flex;          /* Horizontal layout */
    flex-wrap: wrap;
}

/* --- Main menu items --- */
.main-nav > li {
    position: relative;     /* Anchor for absolute-positioned dropdown */
}

.main-nav > li > a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 14px 20px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 14px;
    transition: background-color 0.3s;
}

.main-nav > li > a:hover,
.main-nav > li > a.active {
    background-color: #2874a6;
}

/* --- Dropdown submenu (HIDDEN by default) --- */
.dropdown {
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;     /* Positioned relative to parent <li> */
    top: 100%;              /* Directly below the parent link */
    left: 0;
    min-width: 200px;
    background-color: #2874a6;
    display: none;          /* HIDDEN */
    z-index: 1000;          /* Above other content */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 0 0 6px 6px;
}

/* --- Dropdown links --- */
.dropdown li a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    font-size: 13px;
    transition: background-color 0.3s;
    white-space: nowrap;
}

.dropdown li a:hover {
    background-color: #3498db;
}

/* --- SHOW dropdown on hover --- */
.has-dropdown:hover .dropdown {
    display: block;         /* VISIBLE on hover */
}

/* --- Keyboard accessibility: show on focus-within --- */
.has-dropdown:focus-within .dropdown {
    display: block;
}
```

### 4.3 Line-by-Line Explanation of Key CSS Rules

| CSS Rule | Explanation |
|----------|-------------|
| `.main-nav { display: flex; }` | Lays out the top-level `<li>` items horizontally in a row. |
| `.main-nav > li { position: relative; }` | Creates a positioning context so the absolutely-positioned dropdown stays attached to its parent `<li>`. |
| `.dropdown { display: none; }` | Hides the submenu by default. Users should not see it until they interact. |
| `.dropdown { position: absolute; top: 100%; left: 0; }` | Places the submenu directly below the parent link. `top: 100%` means "start right below the parent element." |
| `.has-dropdown:hover .dropdown { display: block; }` | THE KEY RULE: when the user hovers over a parent `<li>` with class `has-dropdown`, change the child `.dropdown` from `none` to `block`. |
| `.has-dropdown:focus-within .dropdown { display: block; }` | Accessibility: when a keyboard user tabs into a dropdown link, the submenu appears even without mouse hover. |
| `z-index: 1000;` | Ensures the dropdown renders on top of other page content instead of being hidden behind it. |

### ⚠️ Important notes

- The `&#9662;` HTML entity in the link text renders as a small down-pointing triangle (▾), signaling to users that a dropdown exists.
- `:focus-within` is supported in all modern browsers (Chrome 86+, Firefox 77+, Safari 10.1+). It is essential for keyboard accessibility.
- For mobile, you may want to convert the dropdown to an always-visible stacked list using a media query (covered in Session 15).

### 🧪 Try It Yourself — A Dropdown That Works on Keyboard

**Task (8 min):** Build a CSS-only dropdown, then find its one weakness.

1. Mark up a nav with a submenu:
   ```html
   <nav>
       <ul class="menu">
           <li><a href="index.html">Home</a></li>
           <li class="has-sub">
               <a href="pages/events.html">Events</a>
               <ul class="sub">
                   <li><a href="pages/workshops.html">Workshops</a></li>
                   <li><a href="pages/showcase.html">Showcase</a></li>
               </ul>
           </li>
       </ul>
   </nav>
   ```
2. Style it:
   ```css
   .menu, .sub { list-style: none; margin: 0; padding: 0; }
   .menu { display: flex; gap: 16px; }
   .has-sub { position: relative; }
   .sub {
       position: absolute;
       top: 100%;
       left: 0;
       background: #fff;
       border: 1px solid #e2e8f0;
       min-width: 180px;
       display: none;
   }
   .has-sub:hover .sub,
   .has-sub:focus-within .sub { display: block; }
   ```
3. Hover over Events. The submenu appears.
4. Now put the mouse away and press **Tab** until Events has focus.
5. Finally, open device mode (**Ctrl+Shift+M**) and tap Events on a simulated phone.

**Expected result:** Hover works, and `:focus-within` makes Tab work too. On touch, the first tap follows the Events link instead of opening the submenu — there is no hover on a touchscreen.

<details>
<summary>The one line that makes this accessible, and the limit you cannot CSS away</summary>

`:focus-within` is what separates a usable dropdown from a decorative one. It matches the parent `<li>` whenever anything inside it has focus, so tabbing to the Events link reveals the submenu exactly as hovering does. A hover-only dropdown is invisible to every keyboard user.

The touch problem is genuinely unsolvable in CSS. A tap is a click, and a parent link that is also a menu trigger has two conflicting jobs. The real options are:

1. **Make the parent non-navigable** — use `<span>` or `<button>` instead of `<a href>`, so tapping it only opens the submenu.
2. **Duplicate the parent as the first submenu item** — Events opens the menu, and "Events overview" inside it goes to the page.
3. **Accept it and use JavaScript** for the touch case only.

For this course, option 2 is the pragmatic answer: no JavaScript, and nothing is unreachable.

Also note `position: absolute` on the submenu requires `position: relative` on the parent `<li>`. Without it the submenu positions itself against the page instead of the menu item — the classic "why is my dropdown in the top-left corner" bug.

</details>


---

## 5. CSS-Only Accordion (Modern Replacement for Spry Accordion)

> 🖼 **Diagram:** `canvases/buoi-14.canvas.tsx` → `DetailsAccordion` — slide `s14-modern-css` ("Modern CSS Alternatives")

HTML5 introduced the `<details>` and `<summary>` elements, which create a native, accessible, no-JavaScript accordion.

### 5.1 How `<details>` and `<summary>` Work

```html
<!-- ✅ Native HTML5 accordion panel -->
<details>
    <summary>Click me to reveal content</summary>
    <p>This content is hidden until the user clicks the summary.</p>
</details>
```

- `<details>` is the container. It has two states: closed (default) and open.
- `<summary>` is the clickable heading. Browsers render a disclosure triangle (▶ / ▼) automatically.
- Everything after `<summary>` inside `<details>` is the collapsible content.
- Add the `open` attribute to make a panel open by default: `<details open>`.
- The browser handles all open/close logic natively — NO JavaScript required.

### 5.2 Styled Accordion for Student Club Events

```html
<!-- ✅ CSS-only accordion for events page -->
<div class="css-accordion">
    <details open>
        <summary>Web Design Workshop</summary>
        <div class="accordion-content">
            <p>Learn the basics of HTML and CSS in this hands-on workshop.</p>
            <p><strong>Date:</strong> March 15, 2024 | <strong>Time:</strong> 2:00 PM – 4:00 PM</p>
            <p><strong>Location:</strong> Computer Lab A, Building 3</p>
        </div>
    </details>

    <details>
        <summary>Photography Contest</summary>
        <div class="accordion-content">
            <p>Submit your best campus photographs and win prizes!</p>
            <p><strong>Deadline:</strong> March 20, 2024</p>
            <p><strong>Categories:</strong> Landscape, Portrait, Architecture</p>
        </div>
    </details>

    <details>
        <summary>Music Night</summary>
        <div class="accordion-content">
            <p>An evening of live music featuring student bands and solo performers.</p>
            <p><strong>Date:</strong> March 29, 2024 | <strong>Time:</strong> 7:00 PM</p>
            <p><strong>Venue:</strong> University Auditorium</p>
        </div>
    </details>

    <details>
        <summary>Hackathon 2024</summary>
        <div class="accordion-content">
            <p>48-hour coding challenge. Teams of 2–4 students compete to build the best web app.</p>
            <p><strong>Date:</strong> April 5–6, 2024</p>
            <p><strong>Prizes:</strong> Certificates, tech gadgets, and bragging rights!</p>
        </div>
    </details>
</div>
```

```css
/* =============================================
   CSS-ONLY ACCORDION (Session 14)
   ============================================= */

.css-accordion {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin: 20px 0;
}

.css-accordion details {
    border-bottom: 1px solid #ddd;
}

.css-accordion details:last-child {
    border-bottom: none;
}

.css-accordion summary {
    padding: 15px 20px;
    background-color: #f0f4f8;
    cursor: pointer;
    font-weight: 600;
    color: #1a5276;
    font-size: 16px;
    transition: background-color 0.3s;
    list-style: none;       /* Hide default triangle in some browsers */
}

/* Restore custom marker */
.css-accordion summary::before {
    content: "▶ ";
    font-size: 12px;
    display: inline-block;
    margin-right: 8px;
    transition: transform 0.3s;
}

.css-accordion details[open] summary::before {
    content: "▼ ";
}

.css-accordion summary:hover {
    background-color: #e0e8f0;
}

.css-accordion details[open] summary {
    background-color: #2874a6;
    color: white;
}

.accordion-content {
    padding: 15px 20px;
    line-height: 1.6;
}

.accordion-content p {
    margin: 5px 0;
}
```

### 🔍 Comparison: Spry Accordion vs HTML5 Details/Summary

| Feature | Spry Accordion | HTML5 `<details>`/`<summary>` |
|---------|---------------|-------------------------------|
| JavaScript required | Yes (SpryAccordion.js) | No |
| CSS file required | Yes (SpryAccordion.css) | Optional (styled with your own CSS) |
| Initialization script | Required | Not needed |
| Mobile/touch support | Poor | Excellent (native browser behavior) |
| Accessibility (screen readers) | Partial | Full (semantic HTML) |
| Browser support | Degrading | All modern browsers |
| File size overhead | ~30 KB JS + CSS | Zero |
| Maintenance | Dead since 2012 | Part of HTML standard forever |

### ✅ Best practices

1. **Never start a new project with Spry.** Use CSS-only solutions or actively maintained libraries.
2. **Always include `:focus-within`** alongside `:hover` for dropdown menus (keyboard accessibility).
3. **Use `<details>`/`<summary>`** for accordions — they are semantic, accessible, and require zero JavaScript.
4. **Add visual indicators** (▾ arrows, +/- signs) to signal that elements are expandable.
5. **Test on mobile** — hover-based dropdowns need a tap-friendly fallback for touch devices (Session 15 covers this).
6. **If migrating from Spry,** replace the widget HTML entirely rather than trying to patch the old code.

### ❌ Common mistakes

❌ **Mistake 1: Using Spry in a new project**
```html
<!-- ❌ WRONG: Spry is dead -->
<script src="SpryAssets/SpryMenuBar.js"></script>
```
```html
<!-- ✅ CORRECT: CSS-only dropdown -->
<ul class="main-nav">
    <li class="has-dropdown">
        <a href="#">Menu ▾</a>
        <ul class="dropdown">...</ul>
    </li>
</ul>
```

❌ **Mistake 2: Forgetting `position: relative` on parent `<li>`**
```css
/* ❌ WRONG: dropdown floats to wrong position */
.main-nav > li { }
.dropdown { position: absolute; top: 100%; }
```
```css
/* ✅ CORRECT: parent establishes positioning context */
.main-nav > li { position: relative; }
.dropdown { position: absolute; top: 100%; left: 0; }
```

❌ **Mistake 3: Only using `:hover` (no keyboard support)**
```css
/* ❌ WRONG: keyboard users cannot access dropdown */
.has-dropdown:hover .dropdown { display: block; }
```
```css
/* ✅ CORRECT: both mouse and keyboard */
.has-dropdown:hover .dropdown,
.has-dropdown:focus-within .dropdown { display: block; }
```

❌ **Mistake 4: Forgetting `z-index` on dropdown**
```css
/* ❌ WRONG: dropdown hides behind page content */
.dropdown { position: absolute; }
```
```css
/* ✅ CORRECT: dropdown renders on top */
.dropdown { position: absolute; z-index: 1000; }
```

❌ **Mistake 5: Using `<div>` instead of `<details>` for accordions**
```html
<!-- ❌ WRONG: not semantic, requires JavaScript for toggle -->
<div class="panel" onclick="toggle()">...</div>
```
```html
<!-- ✅ CORRECT: native HTML5 accordion -->
<details>
    <summary>Panel Title</summary>
    <p>Content</p>
</details>
```

### 🧪 Try It Yourself — An Accordion With No JavaScript

**Task (7 min):** Build a collapsible FAQ from two HTML elements.

1. Write three collapsible items:
   ```html
   <details>
       <summary>When does the club meet?</summary>
       <p>Every Friday at 5pm in Room B203.</p>
   </details>
   <details>
       <summary>Do I need experience?</summary>
       <p>No. We start from HTML basics every semester.</p>
   </details>
   <details open>
       <summary>How do I join?</summary>
       <p>Fill in the form on the Contact page.</p>
   </details>
   ```
2. Reload. Click each summary. Note that the third starts open.
3. Now style it:
   ```css
   details {
       border: 1px solid #e2e8f0;
       border-radius: 6px;
       margin-bottom: 8px;
       padding: 12px;
   }
   summary { cursor: pointer; font-weight: 600; }
   details[open] summary { margin-bottom: 8px; }
   ```
4. Close the browser, reopen the page, then navigate the accordion using **Tab** and **Enter** only.

**Expected result:** Fully working collapsible panels — keyboard accessible, announced correctly by screen readers, with zero JavaScript and zero CSS tricks.

<details>
<summary>Why this beats the checkbox hack</summary>

The old CSS-only accordion used a hidden `<input type="checkbox">` with a `<label>` and a sibling selector. It works visually, but it lies to assistive technology: a screen reader announces "checkbox" for something that is a disclosure widget, and the expanded state is not conveyed.

`<details>` and `<summary>` are the real thing. The browser supplies the expand/collapse behaviour, the correct ARIA role, keyboard support, and the `open` state — all of which you would otherwise have to build and get wrong.

Two useful details:

- `open` as an attribute sets the initial state. Adding it to the first item is a good default so the panel does not look like a dead list.
- Multiple `<details>` can be open at once. If you want only one at a time, that genuinely needs JavaScript — or a shared `name` attribute, which is supported in current browsers but not in older ones.

This is the pattern that replaces the Spry Accordion. It is shorter, accessible by default, and has no dependencies.

</details>


---

# 📋 THEORY SUMMARY

| Concept | Definition | Example |
|---------|-----------|---------|
| Spry Framework | Legacy Adobe JavaScript widget library for Dreamweaver (discontinued ~2012) | SpryAccordion.js, SpryMenuBar.js |
| Spry Accordion | Collapsible panels widget; one panel open at a time | Events FAQ section |
| Spry Tabbed Panels | Content organized under clickable tabs | Workshop / Social / Competition tabs |
| Spry Menu Bar | Horizontal/vertical dropdown navigation widget | Site navigation with submenus |
| Legacy software | Software no longer maintained or supported | Spry, Flash, jQuery 1.x |
| CSS-only dropdown | Navigation submenu shown via `:hover` on nested `<ul>` | `.has-dropdown:hover .dropdown { display: block; }` |
| `<details>` | HTML5 element creating a native collapsible section | `<details><summary>Title</summary>Content</details>` |
| `<summary>` | Clickable heading inside `<details>` | Acts as the accordion panel title |
| `:hover` | CSS pseudo-class matching when mouse is over an element | `li:hover ul { display: block; }` |
| `:focus-within` | CSS pseudo-class matching when any descendant has focus | Enables keyboard-accessible dropdowns |
| `position: relative` | Establishes a positioning context for children | Applied to parent `<li>` for dropdown placement |
| `position: absolute` | Positions element relative to nearest positioned ancestor | Used on `.dropdown` to place it below parent |
| `z-index` | Controls stacking order of overlapping elements | `z-index: 1000` keeps dropdown on top |

---

# 💡 WORKED EXAMPLES

## Example 1: Converting a Spry MenuBar to CSS-Only

**Situation:**
You inherit an old Student Club website that uses a Spry MenuBar. You need to replace it with a modern CSS-only dropdown while keeping the same menu structure.

**Original Spry code (to be replaced):**
```html
<!-- OLD SPRY CODE - REMOVE THIS -->
<ul id="MenuBar1" class="MenuBarHorizontal">
    <li><a href="index.html">Home</a></li>
    <li><a href="#" class="MenuBarItemSubmenu">About</a>
        <ul>
            <li><a href="about.html#mission">Mission</a></li>
            <li><a href="about.html#team">Team</a></li>
        </ul>
    </li>
    <li><a href="gallery.html">Gallery</a></li>
</ul>
<link href="SpryAssets/SpryMenuBarHorizontal.css" rel="stylesheet">
<script src="SpryAssets/SpryMenuBar.js"></script>
<script>var MenuBar1 = new Spry.Widget.MenuBar("MenuBar1");</script>
```

**Replacement CSS-only code:**
```html
<!-- NEW CSS-ONLY CODE -->
<nav>
    <ul class="main-nav">
        <li><a href="index.html">Home</a></li>
        <li class="has-dropdown">
            <a href="about.html">About &#9662;</a>
            <ul class="dropdown">
                <li><a href="about.html#mission">Mission</a></li>
                <li><a href="about.html#team">Team</a></li>
            </ul>
        </li>
        <li><a href="gallery.html">Gallery</a></li>
    </ul>
</nav>
```

**Line-by-line explanation:**

| Change | Why |
|--------|-----|
| Removed `<link>` to SpryMenuBarHorizontal.css | No longer needed; replaced by our own CSS |
| Removed `<script>` for SpryMenuBar.js | No JavaScript needed for CSS-only dropdown |
| Removed initialization `<script>` | No widget to initialize |
| Changed `class="MenuBarHorizontal"` to `class="main-nav"` | Our own class name for our own CSS |
| Added `class="has-dropdown"` to parent `<li>` | Identifies which items have submenus |
| Changed `class="MenuBarItemSubmenu"` to plain `<a>` | Spry-specific class no longer needed |
| Changed inner `<ul>` to `class="dropdown"` | Matches our CSS selector |
| Added `&#9662;` to About link text | Visual indicator that a dropdown exists |
| Wrapped in `<nav>` element | Semantic HTML5 landmark for navigation |

**Result:**
Identical visual appearance and behavior to the Spry menu, but with zero JavaScript, smaller file size, better accessibility, and full mobile compatibility (with media query adjustments from Session 15).

---

## Example 2: Building an Accordion for Event Details

**Situation:**
The Events page needs an expandable list of event details. Students should be able to click an event name to see the full description without scrolling past everything.

**Code:**
```html
<h2>Upcoming Events</h2>

<div class="css-accordion">
    <details open>
        <summary>Web Design Workshop — March 15</summary>
        <div class="accordion-content">
            <p>A beginner-friendly workshop covering HTML structure, CSS styling,
               and responsive design principles. Bring your laptop!</p>
            <p><strong>Time:</strong> 2:00 PM – 4:00 PM</p>
            <p><strong>Room:</strong> Lab A, Building 3</p>
            <p><strong>Capacity:</strong> 30 students</p>
        </div>
    </details>

    <details>
        <summary>Campus Photo Walk — March 22</summary>
        <div class="accordion-content">
            <p>Explore the university campus with fellow photography enthusiasts.
               All skill levels and camera types welcome (including phones).</p>
            <p><strong>Meeting Point:</strong> Main Gate</p>
            <p><strong>Time:</strong> 9:00 AM – 11:00 AM</p>
        </div>
    </details>

    <details>
        <summary>Guest Speaker: Career in Tech — April 2</summary>
        <div class="accordion-content">
            <p>Industry professional shares insights about career paths in
               technology. Q&A session included.</p>
            <p><strong>Speaker:</strong> Ms. Tran Thi Mai, Senior Developer at ABC Corp</p>
            <p><strong>Time:</strong> 3:00 PM – 5:00 PM</p>
            <p><strong>Venue:</strong> Lecture Hall B2</p>
        </div>
    </details>
</div>
```

**Line-by-line explanation:**

| Element | Purpose |
|---------|---------|
| `<div class="css-accordion">` | Outer wrapper for styling (border, rounded corners). |
| `<details open>` | First panel starts open so visitors immediately see content. |
| `<details>` (without `open`) | Remaining panels start closed. |
| `<summary>` | Clickable header text. Browser adds a disclosure triangle automatically. |
| `<div class="accordion-content">` | Inner wrapper for padding and typography styling. |
| Multiple `<details>` siblings | Each operates independently — opening one does NOT close others (unlike Spry). To enforce single-open behavior, add `name="group1"` to each `<details>` (supported in Chrome 120+, Firefox 124+). |

**Result:**
A clean, accessible accordion. Students click event names to reveal details. No JavaScript file to load, no initialization code, works perfectly on mobile.

---

## Example 3: Understanding Spry File Dependencies

**Situation:**
You open an old Dreamweaver project and see broken widgets. The accordion shows as plain unstyled divs. You need to diagnose the problem.

**Diagnostic checklist:**

```
SPRY WIDGET TROUBLESHOOTING CHECKLIST
======================================

1. Is the SpryAssets/ folder present in the site root?
   □ YES → continue
   □ NO  → Spry files are missing. Restore from backup or
           replace with CSS-only alternative.

2. Is the CSS file linked in <head>?
   <link href="SpryAssets/SpryAccordion.css" rel="stylesheet">
   □ YES → continue
   □ NO  → Add the link or replace widget.

3. Is the JS file linked (usually in <head> or before </body>)?
   <script src="SpryAssets/SpryAccordion.js"></script>
   □ YES → continue
   □ NO  → Add the script or replace widget.

4. Is the initialization script present AFTER the widget HTML?
   <script>var Accordion1 = new Spry.Widget.Accordion("Accordion1");</script>
   □ YES → continue
   □ NO  → Add initialization or replace widget.

5. Does the ID in the init script match the widget's ID?
   Widget: id="Accordion1" ↔ Init: new Spry.Widget.Accordion("Accordion1")
   □ MATCH → Should work. Check browser console for errors.
   □ MISMATCH → Fix the ID to match.

6. Does the browser console show JavaScript errors?
   □ NO ERRORS → Problem may be CSS conflict.
   □ ERRORS → Spry may be incompatible with this browser version.
              Replace with CSS-only alternative.
```

**Result:**
Systematic diagnosis identifies whether the issue is missing files, mismatched IDs, or browser incompatibility. In most cases today, the best fix is to replace the Spry widget entirely with a CSS-only equivalent.

---

# 🛠️ HANDS-ON PRACTICE

## Setup

Before starting:
1. Your Student Club site is open in Dreamweaver or VS Code.
2. All pages from Sessions 1–13 are complete.
3. Back up your site folder.

---

### TASK 1: Replace Navigation with CSS-Only Dropdown 🎯

🎯 **Goal:** Upgrade the site-wide navigation bar to include dropdown submenus for "About" and "Events" using pure CSS.

📝 **What you will build:** A horizontal navigation bar where hovering over "About" reveals Mission/Team/History links, and hovering over "Events" reveals Workshops/Social/Competitions links.

🔧 **Steps:**

1. **Open `index.html`.**

2. **Replace the existing `<nav>` content** with the dropdown navigation HTML:

```html
<nav>
    <ul class="main-nav">
        <li><a href="index.html" class="active">Home</a></li>
        <li class="has-dropdown">
            <a href="about.html">About &#9662;</a>
            <ul class="dropdown">
                <li><a href="about.html#mission">Our Mission</a></li>
                <li><a href="about.html#team">Our Team</a></li>
                <li><a href="about.html#history">Our History</a></li>
            </ul>
        </li>
        <li class="has-dropdown">
            <a href="events.html">Events &#9662;</a>
            <ul class="dropdown">
                <li><a href="events.html#workshops">Workshops</a></li>
                <li><a href="events.html#social">Social Events</a></li>
                <li><a href="events.html#competitions">Competitions</a></li>
            </ul>
        </li>
        <li><a href="gallery.html">Gallery</a></li>
        <li><a href="join.html">Join Us</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

3. **Update the `class="active"` attribute** on each page to highlight the current page's link.

4. **Repeat step 2** for ALL other HTML pages (`about.html`, `events.html`, `gallery.html`, `join.html`, `contact.html`), adjusting `class="active"` for each page.

5. **Save all files.**

✅ **Check:** Preview any page in the browser. Hover over "About" — a dropdown submenu should appear. Hover over "Events" — another dropdown appears. Move the mouse away — the dropdown disappears. Tab through links with keyboard — dropdowns appear via `:focus-within`.

💾 **Save point:** Back up after Task 1.

---

### TASK 2: Add the Dropdown CSS to style.css 🎯

🎯 **Goal:** Style the dropdown navigation to match the Student Club theme.

📝 **What you will add:** Horizontal menu layout, dropdown positioning, hover/focus states, and visual polish.

🔧 **Steps:**

1. Open `css/style.css`.

2. **Find your existing `nav` styles** (from earlier sessions). You may need to update or replace them.

3. **Add/update the following CSS** (integrate with existing nav styles):

```css
/* =============================================
   DROPDOWN NAVIGATION (Session 14)
   ============================================= */

/* --- Main nav container --- */
.main-nav {
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #1a5276;
    display: flex;
    flex-wrap: wrap;
}

/* --- Top-level items --- */
.main-nav > li {
    position: relative;
}

.main-nav > li > a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 14px 20px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 14px;
    transition: background-color 0.3s;
}

.main-nav > li > a:hover,
.main-nav > li > a.active {
    background-color: #2874a6;
}

/* --- Dropdown (hidden by default) --- */
.dropdown {
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background-color: #2874a6;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 0 0 6px 6px;
}

/* --- Dropdown links --- */
.dropdown li a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    font-size: 13px;
    transition: background-color 0.3s;
    white-space: nowrap;
}

.dropdown li a:hover {
    background-color: #3498db;
}

/* --- Show dropdown on hover AND keyboard focus --- */
.has-dropdown:hover .dropdown,
.has-dropdown:focus-within .dropdown {
    display: block;
}
```

4. **Save** `style.css`.

5. **Preview** in the browser. Test hovering, keyboard tabbing, and clicking dropdown links.

✅ **Check:**
- Main navigation is a horizontal blue bar.
- "About ▾" and "Events ▾" show dropdown arrows.
- Hovering reveals the submenu smoothly.
- Tab key navigates through all links including dropdown items.
- Active page link is highlighted.
- Dropdown appears above other content (not hidden behind images/text).

💾 **Save point:** Back up after Task 2.

---

### TASK 3: Add a CSS-Only Accordion to the Events Page 🎯

🎯 **Goal:** Create an expandable event details section on `events.html` using `<details>` and `<summary>`.

📝 **What you will build:** An accordion listing four upcoming events. Clicking an event name expands/collapses the details.

🔧 **Steps:**

1. Open `events.html`.

2. Inside `<main>`, below the existing events content, add:

```html
<h2>Event Details</h2>
<p>Click on an event to see full details.</p>

<div class="css-accordion">
    <details open>
        <summary>Web Design Workshop — March 15</summary>
        <div class="accordion-content">
            <p>Learn HTML structure, CSS styling, and responsive design
               in this hands-on workshop for beginners.</p>
            <p><strong>Time:</strong> 2:00 PM – 4:00 PM</p>
            <p><strong>Room:</strong> Computer Lab A, Building 3</p>
            <p><strong>Capacity:</strong> 30 students</p>
            <p><strong>Requirements:</strong> Bring your laptop</p>
        </div>
    </details>

    <details>
        <summary>Campus Photo Walk — March 22</summary>
        <div class="accordion-content">
            <p>Explore campus with fellow photographers. All skill levels
               and equipment welcome (including smartphones).</p>
            <p><strong>Meeting Point:</strong> Main Gate</p>
            <p><strong>Time:</strong> 9:00 AM – 11:00 AM</p>
        </div>
    </details>

    <details>
        <summary>Guest Speaker: Career in Tech — April 2</summary>
        <div class="accordion-content">
            <p>Industry professional Ms. Tran Thi Mai discusses career
               paths in web development and software engineering.</p>
            <p><strong>Time:</strong> 3:00 PM – 5:00 PM</p>
            <p><strong>Venue:</strong> Lecture Hall B2</p>
            <p><strong>Includes:</strong> Q&A session and networking</p>
        </div>
    </details>

    <details>
        <summary>Hackathon 2024 — April 5-6</summary>
        <div class="accordion-content">
            <p>48-hour coding challenge! Teams of 2–4 build a web application
               from scratch. Prizes for top three teams.</p>
            <p><strong>Start:</strong> April 5, 9:00 AM</p>
            <p><strong>End:</strong> April 6, 9:00 AM</p>
            <p><strong>Venue:</strong> Innovation Hub, Building 5</p>
            <p><strong>Registration:</strong> Sign up via the Join Us page</p>
        </div>
    </details>
</div>
```

3. **Add the accordion CSS** to `css/style.css` (if not already added from the Theory section):

```css
/* CSS-Only Accordion */
.css-accordion {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin: 20px 0;
}

.css-accordion details {
    border-bottom: 1px solid #ddd;
}

.css-accordion details:last-child {
    border-bottom: none;
}

.css-accordion summary {
    padding: 15px 20px;
    background-color: #f0f4f8;
    cursor: pointer;
    font-weight: 600;
    color: #1a5276;
    font-size: 16px;
    transition: background-color 0.3s;
    list-style: none;
}

.css-accordion summary::before {
    content: "▶ ";
    font-size: 12px;
    margin-right: 8px;
}

.css-accordion details[open] summary::before {
    content: "▼ ";
}

.css-accordion summary:hover {
    background-color: #e0e8f0;
}

.css-accordion details[open] summary {
    background-color: #2874a6;
    color: white;
}

.accordion-content {
    padding: 15px 20px;
    line-height: 1.6;
}

.accordion-content p {
    margin: 5px 0;
}
```

4. **Save** both files.

5. **Preview** `events.html` in the browser. Click each event summary to expand/collapse.

✅ **Check:**
- First panel (Web Design Workshop) is open by default.
- Clicking another panel opens it (first panel stays open — this is native `<details>` behavior).
- Summary backgrounds change color when open (blue) and on hover (light gray).
- Custom triangle markers (▶/▼) indicate state.
- Works on mobile without any JavaScript.

💾 **Save point:** Final backup of Session 14 work.

---

# 🐛 COMMON ERRORS — WHAT THE BROWSER SHOWS YOU

Interactive widgets fail in a specific way: they look right until someone uses a keyboard, or until the JavaScript does not run.

| Symptom you see | Likely cause | How to confirm | Fix |
|---|---|---|---|
| Dropdown menu opens on hover but not on tap | Only `:hover` is implemented | Test on a phone or in device mode | Add `:focus-within`, or toggle a class with JavaScript |
| Submenu vanishes as you move the mouse toward it | A gap between the parent and the submenu | Inspect the boxes and their positions | Remove the gap, or use padding instead of margin to bridge it |
| Tabs are unreachable by keyboard | `<div>` used where a `<button>` belongs | Press Tab and watch the focus ring | Use real `<button>` elements, or add `tabindex="0"` plus key handlers |
| Accordion opens all panels at once | Every panel shares one `id` or one target | Validator reports duplicate IDs | Unique `id` per panel; point each control at its own |
| Widget does nothing at all | The script is missing, or loads before the markup | Console shows a 404 or a null reference | Load the script at the end of `<body>`, or use `defer` |
| Console: `Cannot read properties of null` | The element was not in the DOM when the script ran | The error names the line | Move the script after the markup, or wrap in `DOMContentLoaded` |
| Screen reader does not announce an opened panel | No `aria-expanded` on the control | Check the accessibility tree | Toggle `aria-expanded="true"/"false"` in the click handler |
| Focus is lost after closing a dialog | Focus was never returned | Tab after closing and see where you land | Store the previously focused element and restore it on close |
| Old Spry code produces `SpryTabbedPanels is not defined` | Spry was discontinued in 2012 | Console reports the undefined constructor | Rebuild with CSS and modern JavaScript, or `<details>` for disclosure |
| Animation is smooth on a laptop, janky on a phone | Animating layout properties like `height` or `top` | Performance panel shows layout thrashing | Animate `transform` and `opacity` only |

**Do not use Spry in new work.** Adobe stopped developing it in 2012, and it depends on scripts that are no longer maintained. Everything Spry offered has a native replacement: `<details>`/`<summary>` for disclosure, CSS transitions for animation, and a small amount of plain JavaScript with correct ARIA attributes for tabs and accordions.

---


# ✅ SELF-CHECK QUESTIONS

Answer these from memory first, then expand the answer to check yourself.

**Q1. What was the Spry Framework, and why is it legacy?**

<details>
<summary>Answer</summary>

Spry was Adobe's Ajax/JavaScript library bundled with Dreamweaver (2006–2012), providing drop-in Accordion, Tabbed Panels, and Menu Bar widgets. It is legacy because Adobe discontinued it in 2012 — no updates, no security patches — and because modern CSS and HTML do the same jobs natively, with less code, better accessibility, and no dependency.

</details>

---

**Q2. Name the three Spry widgets and their modern replacements.**

<details>
<summary>Answer</summary>

- **Spry Accordion** → `<details>` / `<summary>` (pure HTML, no CSS or JS needed)
- **Spry Tabbed Panels** → CSS radio-button technique, or a small amount of JavaScript
- **Spry Menu Bar** → nested `<ul>` with `position: absolute` and `:hover` / `:focus-within`

</details>

---

**Q3. In a CSS dropdown, which element gets `position: relative` and which gets `position: absolute`?**

<details>
<summary>Answer</summary>

The parent `<li>` gets `position: relative`; the nested `<ul>` submenu gets `position: absolute` plus `top: 100%; left: 0`. The relative parent creates the positioning context, so `top: 100%` means "just below the bottom of my parent" rather than "below the viewport top". Omit the relative parent and the submenu flies to the corner of the page.

</details>

---

**Q4. Why is `display: none` → `display: block` the standard show/hide pair for submenus?**

<details>
<summary>Answer</summary>

`display: none` removes the submenu from rendering **and** from the accessibility tree, so it is genuinely hidden rather than merely invisible. Switching to `block` on `:hover` reveals it. Alternatives like `visibility: hidden` or `opacity: 0` leave the element occupying space and still focusable, which produces invisible clickable areas.

</details>

---

**Q5. Why is a `:hover`-only dropdown inaccessible, and what is the one-line fix?**

<details>
<summary>Answer</summary>

`:hover` requires a pointing device, so keyboard users tabbing through the nav never open the submenu, and touch-screen users have no hover state at all. The fix is to pair it with `:focus-within`:

```css
.dropdown:hover .submenu,
.dropdown:focus-within .submenu { display: block; }
```

`:focus-within` matches while any descendant has keyboard focus.

</details>

---

**Q6. How do `<details>` and `<summary>` work, and what does `open` do?**

<details>
<summary>Answer</summary>

`<details>` is a collapsible container; `<summary>` is its always-visible clickable heading. Everything after `<summary>` shows or hides when clicked. Adding the `open` attribute makes the panel expanded on page load. The toggle behaviour, the keyboard support, and the correct screen reader announcements are all built in — zero CSS, zero JavaScript.

</details>

---

**Q7. How does the checkbox hack create a toggle menu without JavaScript?**

<details>
<summary>Answer</summary>

A hidden `<input type="checkbox" id="menu-toggle">` holds the state, and a `<label for="menu-toggle">` acts as the visible button — clicking a label toggles its associated checkbox. Then `#menu-toggle:checked ~ nav { display: block; }` reveals the menu, using the general sibling selector `~`, which requires the nav to appear **after** the checkbox in the markup.

</details>

---

**Q8. You inherit a site using Spry widgets. What is your migration plan?**

<details>
<summary>Answer</summary>

Identify each widget by its `Spry*.js` / `Spry*.css` includes and `SpryAssets/` folder. Replace them one at a time: accordions become `<details>`/`<summary>`, menu bars become nested `<ul>` with CSS, tabbed panels become the radio-button technique. Test each replacement with the keyboard before moving on, then delete the Spry files and their `<script>`/`<link>` tags. Expect the result to be dramatically less code.

</details>

---


# 📝 SELF-ASSESSMENT WORKSHEET

| # | I can... | Yes | No |
|---|----------|-----|----|
| 1 | Explain what the Spry Framework is and why it is considered legacy | ☐ | ☐ |
| 2 | Name the three main Spry widgets (Accordion, Tabbed Panels, Menu Bar) | ☐ | ☐ |
| 3 | Identify the three files/components needed for a Spry widget to work | ☐ | ☐ |
| 4 | Build a CSS-only dropdown navigation using nested `<ul>` and `:hover` | ☐ | ☐ |
| 5 | Add `:focus-within` for keyboard-accessible dropdowns | ☐ | ☐ |
| 6 | Create an accordion using HTML5 `<details>` and `<summary>` | ☐ | ☐ |
| 7 | Explain why CSS-only solutions are preferred over Spry for new projects | ☐ | ☐ |
| 8 | Apply the dropdown navigation consistently across all site pages | ☐ | ☐ |

If you answered **No** to any row, re-read the relevant Theory section and redo the corresponding Hands-On task.

---

# 🔗 FURTHER READING

- [MDN: `<details>` Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)
- [MDN: `<summary>` Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary)
- [MDN: `:hover` Pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:hover)
- [MDN: `:focus-within` Pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within)
- [MDN: CSS Positioning](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning)
- [MDN: Styling Lists](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists)
- [Bootstrap Accordion Component](https://getbootstrap.com/docs/5.3/components/accordion/)
- [Adobe Spry Framework (archived)](https://web.archive.org/web/2012/https://labs.adobe.com/technologies/spry/)
- [W3C: HTML5 Interactive Elements](https://www.w3.org/TR/html52/interactive-elements.html)

---

# ⏭️ NEXT SESSION

In Session 15 (our final session!) we learn mobile-responsive design with viewport meta tags and media queries, then review ALL 15 sessions and prepare for the final exam.
