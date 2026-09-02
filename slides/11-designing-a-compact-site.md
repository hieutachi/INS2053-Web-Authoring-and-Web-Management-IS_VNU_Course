---
marp: true
theme: default
paginate: true
---

# Session 11: Designing a Compact Site

**INS2053 — Web Authoring and Web Management**

*Plan before you code. Polish before you submit.*

Read: `ebook/11-designing-a-compact-site.md`  ·  Practise: `exercises/session-11/exercise.md`  ·  Diagrams: `canvases/buoi-11.canvas.tsx`

---

## Learning Objectives

- Define "compact site" and explain why compact design matters
- Plan a small website BEFORE writing code using site maps
- Group related content into logical pages without redundancy
- Apply visual hierarchy principles to guide the reader
- Analyze a business brief and turn it into a site specification (CLO2)

---

## What Is a Compact Site?

A **compact site** is a small website (3--10 pages) where every page serves a distinct purpose, navigation is simple, and nothing is wasted.

| Characteristic | Good Example | Bad Example |
|---------------|-------------|-------------|
| Clear purpose | Events page lists activities | Page called "Stuff" |
| Simple nav | Flat bar with 4--6 items | Deep nested menus |
| No redundancy | Email only on Contact page | Email on 4 pages |
| Visual hierarchy | Large headings, smaller body | Everything same size |

---

## Think Before You Code

Professional developers NEVER start coding immediately. They plan first:

```
STEP 1: Define Purpose    "What is this site FOR?"
         |
STEP 2: List Content      "What info do we need?"
         |
STEP 3: Group Content     "Which pieces belong together?"
         |
STEP 4: Create Site Map   "How do pages relate?"
         |
STEP 5: Sketch Wireframes "What does each page look like?"
         |
STEP 6: Code              Now open VS Code
```

---

## Site Map for Student Club Website

```
                +-----------+
                |   HOME    |
                |index.html |
                +-----+-----+
                      |
   +--------+--------+--------+--------+
   |        |        |        |        |
+--v--+ +---v---+ +--v---+ +--v---+ +--v------+
|ABOUT| |EVENTS | |GALL  | |MEDIA | |CONTACT  |
+-----+ +-------+ +------+ +------+ +---------+
```

- **Flat hierarchy:** All pages ONE level deep
- **Home is the hub:** Every page connects back to Home
- **No orphan pages:** Every page must appear in the nav

---

## Requirements Analysis (CLO2)

In real jobs you get a **vague brief**, not a finished spec. You must analyze before building.

Requirements fall into two categories:

- **Functional** -- what the site must DO
  - Show a menu with prices
  - Let customers send a message
  - Display upcoming events
- **Non-functional** -- how the site must BEHAVE
  - Mobile-friendly (most visitors use phones)
  - Fast loading (under 3 seconds)
  - Easy for a non-technical owner to update

---

## Requirements Specification Template

Turn client answers into a short document (7 lines):

```
# Requirements Specification -- [Client name]
1. Goal           : [one sentence]
2. Target audience: [who visits, what device]
3. Pages          : [list, each with one purpose]
4. Functional req.: [features: form, table, gallery...]
5. Non-functional : [mobile, fast, accessible, editable]
6. Out of scope   : [what we will NOT build]
7. Success metric : [how we measure success]
```

Writing "out of scope" prevents **scope creep**.

---

## Brief to Site Map

Each functional requirement maps to a page or feature:

| Requirement from Brief | Becomes |
|------------------------|---------|
| "Show the menu with prices" | `menu.html` with an HTML **table** |
| "Let customers message us" | `contact.html` with a **form** |
| "Show our story" | `about.html` with headings + images |
| "Owner updates prices weekly" | Non-functional: simple structure the owner can edit |

One requirement = one page or one feature. Never guess.

---

## DRY Principle: Don't Repeat Yourself

Each piece of information lives in **ONE** canonical location. Other pages LINK to it.

```html
<!-- BAD: email on Events page -->
<p>Email: club@university.edu</p>

<!-- GOOD: link to the canonical location -->
<p>For inquiries, <a href="contact.html">contact us</a>.</p>
```

If the email changes, you update **one file** instead of five.

---

## Visual Hierarchy

Control what the reader notices first through size, color, spacing, and weight:

```css
h1 { font-size: 36px; color: #1a5276; }  /* Seen FIRST */
h2 { font-size: 26px; color: #2874a6; }  /* Section titles */
h3 { font-size: 20px; color: #333; }     /* Subsections */
p  { font-size: 16px; color: #444; }     /* Body text */
.caption { font-size: 13px; color: #888; } /* Details last */
```

Flow: H1 (biggest, darkest) -> H2 -> H3 -> P -> Caption

---

## Common Mistakes

- **Coding without a plan** -- draw a site map on paper FIRST
- **Too many pages** -- consolidate into 5--6 focused pages
- **Inconsistent navigation** -- same labels, same order, every page
- **Orphan pages** -- if it is not in the nav, nobody can find it
- **Duplicate content** -- full description on About only; summaries elsewhere
- **Skipping requirements analysis** -- never assume what the client wants

---

## In-Class Practice

Follow `exercises/session-11/exercise.md`:

1. Draw your site map (ASCII or paper sketch)
2. Audit all pages for redundancy using Ctrl+Shift+F
3. Standardize navigation across ALL pages
4. Polish visual hierarchy in your CSS
5. Run the final quality audit checklist

---

## Homework

See `homework/session-11/homework.md`:

- Submit a site map diagram
- Write a README.md documenting your project
- Make at least 3 improvements based on the polishing checklist
- Validate HTML/CSS and test responsiveness

**Due Sunday 23:59**

---

## Recap

- A compact site = 3--10 pages, each with ONE clear purpose
- Plan with site maps BEFORE writing any code
- CLO2: Analyze a business brief into functional / non-functional requirements
- Use the 7-line Requirements Specification template
- DRY principle: one canonical location per fact, link elsewhere
- Visual hierarchy guides the reader through size, color, and spacing

---

## Next Session

**Session 12: Using Code-Editing Tools** -- master VS Code extensions, Emmet shortcuts, W3C validation, and browser DevTools for debugging.
