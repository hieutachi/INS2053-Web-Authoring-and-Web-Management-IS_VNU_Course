# Capstone Project Specification — Student Club Website

## INS2053: Web Authoring and Web Management

---

## 1. Project Overview

### Context

You are a web developer hired to build a website for a **student club** at VNU University of Science. The club needs an online presence to attract new members, share information about activities, and provide a way to contact the club.

Your task is to build a **complete multi-page website** using HTML and CSS. The website must be professional, easy to navigate, and accessible to all users.

### Project Goal

Build a **5-page student club website** that demonstrates everything you have learned in this course: HTML structure, CSS styling, page layouts, forms, tables, multimedia, and responsive design.

### Timeline

- **Weeks 1–14:** Build incrementally following milestones M1–M8
- **Week 15:** Final submission and presentation

---

## 2. Target Users (Personas)

### Persona 1: Nguyen Van A — First-Year Student

- **Age:** 18
- **Background:** Just entered university, interested in coding but has limited experience
- **Goal:** Find a club to join, learn new skills, make friends
- **Needs:** Clear information about what the club does, how to join, and when activities happen
- **Device:** Uses a smartphone most of the time; sometimes uses a laptop

### Persona 2: Tran Thi B — Third-Year Student

- **Age:** 20
- **Background:** Experienced programmer, looking for hackathon teammates
- **Goal:** Find advanced activities, connect with industry professionals
- **Needs:** Detailed schedule, media content (workshop recordings), contact form
- **Device:** Uses a laptop

### Persona 3: Le Van C — Alumni

- **Age:** 25
- **Background:** Graduated 2 years ago, works as a software engineer
- **Goal:** Stay connected with the club, potentially mentor students
- **Needs:** Club news, contact information, alumni membership option
- **Device:** Uses both phone and laptop

---

## 3. Page-by-Page Specification

> **Note:** Exam problems may use simplified page names (e.g., "Schedule" instead of "Activities", "Join" instead of "Contact"). For the capstone project, always use the names in this specification.

### 3.1 `index.html` — Home Page

**Purpose:** First impression. Tell visitors what the club is about and encourage them to explore.

**Required Elements:**

| Element | Details |
|---------|---------|
| Header | Club name in `<h1>`, club logo image |
| Navigation | Links to all 5 pages (Home, About, Activities, Media, Contact) |
| Hero section | Large welcome message with a short tagline |
| Brief intro | 1–2 paragraphs about the club |
| Call-to-action | A prominent link or button saying "Join Us" → links to `contact.html` |
| Footer | Copyright, club contact email |

**ASCII Mockup:**

```
+============================================================+
|  [Logo]         CODEBREAKERS CLUB                          |
+============================================================+
|  Home  |  About  |  Activities  |  Media  |  Contact      |
+============================================================+
|                                                            |
|     Welcome to CodeBreakers Club!                          |
|     Where code meets community.                            |
|                                                            |
|  +------------------------------------------------------+  |
|  |  We are a student-run club dedicated to building     |  |
|  |  amazing software and helping each other grow.       |  |
|  |  Join workshops, hackathons, and coding nights.      |  |
|  +------------------------------------------------------+  |
|                                                            |
|           [ >>> JOIN US TODAY <<< ]                        |
|                                                            |
+============================================================+
|  Copyright 2025 CodeBreakers Club | contact@cbc.edu        |
+============================================================+
```

---

### 3.2 `about.html` — About Page

**Purpose:** Tell the club's story — mission, history, and team.

**Required Elements:**

| Element | Details |
|---------|---------|
| Header + Nav | Same as all pages |
| Mission section | `<h2>` "Our Mission" + 1 paragraph |
| History section | `<h2>` "Our History" + 1 paragraph about founding |
| Team section | `<h2>` "Meet the Team" + at least 3 team members. Each member: name (bold), role, 1-sentence bio. Can use `<dl>` (definition list) or styled `<div>`s |
| Image | Club photo or logo with alt text |
| Footer | Same as all pages |

**ASCII Mockup:**

```
+============================================================+
|  HEADER + NAV                                              |
+============================================================+
|                                                            |
|  OUR MISSION                                               |
|  CodeBreakers Club aims to create a supportive community   |
|  where students can learn, build, and share technology.    |
|                                                            |
|  OUR HISTORY                                               |
|  Founded in 2020 by 5 students, the club has grown to      |
|  over 100 active members. We have won 3 national awards.   |
|                                                            |
|  MEET THE TEAM                                             |
|  +--------------+  +--------------+  +--------------+      |
|  | Nguyen Van A |  | Tran Thi B   |  | Le Van C     |      |
|  | President    |  | Vice Pres.   |  | Secretary    |      |
|  | "Love code!" |  | "Hack first" |  | "Organize!"  |      |
|  +--------------+  +--------------+  +--------------+      |
|                                                            |
+============================================================+
|  FOOTER                                                    |
+============================================================+
```

---

### 3.3 `activities.html` — Activities Page

**Purpose:** Show the weekly schedule in a clear table format.

**Required Elements:**

| Element | Details |
|---------|---------|
| Header + Nav | Same as all pages |
| Description | 1 paragraph introducing activities |
| Schedule table | `<table>` with `<caption>`, `<thead>`, `<tbody>`. At least **5 rows** and **4 columns**: Day, Time, Activity, Location |
| `colspan` usage | At least one cell with `colspan` (e.g., "No activities — Holiday" spanning multiple columns) |
| Description below table | Brief text about special events |
| Footer | Same as all pages |

**ASCII Mockup:**

```
+============================================================+
|  HEADER + NAV                                              |
+============================================================+
|                                                            |
|  CLUB ACTIVITIES                                           |
|  We offer a variety of weekly activities for all levels.   |
|                                                            |
|  +------------------------------------------------------+  |
|  |          WEEKLY CLUB SCHEDULE                         |  |
|  +----------+-----------+------------------+----------+   |
|  | Day      | Time      | Activity         | Location |   |
|  +----------+-----------+------------------+----------+   |
|  | Monday   | 18-20     | Web Dev Workshop | Room 301 |   |
|  | Tuesday  | 18-20     | Mobile Dev       | Lab 201  |   |
|  | Wednesday| 18-20     | Algorithm Club   | Lab 202  |   |
|  | Thursday | —         | COLSPAN: Study   | —        |   |
|  | Friday   | 19-21     | Open Coding Night| Hub      |   |
|  | Saturday | 09-12     | Weekend Hack     | Room 301 |   |
|  +----------+-----------+------------------+----------+   |
|                                                            |
|  Special events: Annual hackathon in October!              |
|                                                            |
+============================================================+
|  FOOTER                                                    |
+============================================================+
```

---

### 3.4 `media.html` — Media Page

**Purpose:** Showcase video and audio content from club events.

**Required Elements:**

| Element | Details |
|---------|---------|
| Header + Nav | Same as all pages |
| Video section | `<h2>` heading, description paragraph, `<video>` element with `controls`, `poster`, `width`, 2 `<source>` elements, fallback text |
| Audio section | `<h2>` heading, description paragraph, `<audio>` element with `controls`, 2 `<source>` elements, fallback text |
| Images section (optional) | 2-3 `<img>` tags with `alt` text showing club photos |
| Footer | Same as all pages |

**ASCII Mockup:**

```
+============================================================+
|  HEADER + NAV                                              |
+============================================================+
|                                                            |
|  MEDIA GALLERY                                             |
|                                                            |
|  WORKSHOP VIDEOS                                           |
|  Watch recordings from our recent workshops.               |
|  +------------------------------------------------------+  |
|  |                                                      |  |
|  |            [VIDEO PLAYER — 480px wide]               |  |
|  |            poster: images/logo.png                   |  |
|  |                                                      |  |
|  +------------------------------------------------------+  |
|                                                            |
|  CLUB PODCAST                                              |
|  Listen to coding tips and club news.                      |
|  +------------------------------------------------------+  |
|  |  [AUDIO PLAYER]  ▶ ———●——————  03:45               |  |
|  +------------------------------------------------------+  |
|                                                            |
+============================================================+
|  FOOTER                                                    |
+============================================================+
```

---

### 3.5 `contact.html` — Contact/Join Page

**Purpose:** Allow visitors to join the club or send a message.

**Required Elements:**

| Element | Details |
|---------|---------|
| Header + Nav | Same as all pages |
| Intro text | Brief paragraph inviting visitors to join |
| Form — text input | Full name (`type="text"`, `required`, with `<label>`) |
| Form — email input | Email (`type="email"`, `required`, with `<label>`) |
| Form — radio buttons | Membership type: "Student" / "Alumni" (same `name`, with labels) |
| Form — select dropdown | Department: at least 4 options (with `<label>`) |
| Form — textarea | Message / reason to join (`rows="5"`, `cols="40"`, with `<label>`) |
| Form — checkbox | "I agree to club rules" (`required`, with `<label>`) |
| Form — submit button | "Submit" or "Join Now" |
| Fieldset/Legend | At least 1 `<fieldset>` with `<legend>` wrapping related fields |
| Contact info | Club email and room address below the form |
| Footer | Same as all pages |

**ASCII Mockup:**

```
+============================================================+
|  HEADER + NAV                                              |
+============================================================+
|                                                            |
|  JOIN CODEBREAKERS CLUB                                    |
|  Fill out the form below and we will get back to you!      |
|                                                            |
|  +------------------------------------------------------+  |
|  |  PERSONAL INFORMATION                                 |  |
|  |                                                       |  |
|  |  Full Name:   [___________________________]           |  |
|  |                                                       |  |
|  |  Email:       [___________________________]           |  |
|  +------------------------------------------------------+  |
|                                                            |
|  +------------------------------------------------------+  |
|  |  MEMBERSHIP DETAILS                                   |  |
|  |                                                       |  |
|  |  Type:   (o) Student   ( ) Alumni                     |  |
|  |                                                       |  |
|  |  Dept:   [Computer Science      ▼]                    |  |
|  |                                                       |  |
|  |  Message: [_________________________________]         |  |
|  |           [_________________________________]         |  |
|  |           [_________________________________]         |  |
|  +------------------------------------------------------+  |
|                                                            |
|  [x] I agree to the club rules                            |
|                                                            |
|            [   SUBMIT / JOIN NOW   ]                      |
|                                                            |
|  Contact us: contact@cbc.edu | Room 301, Building A      |
|                                                            |
+============================================================+
|  FOOTER                                                    |
+============================================================+
```

---

## 4. Technical Requirements

### File Structure

```
student-club-website/
├── index.html
├── about.html
├── activities.html
├── media.html
├── contact.html
├── css/
│   └── style.css
└── images/
    ├── logo.png
    ├── team-photo.jpg
    └── workshop.jpg
```

### Naming Conventions

| Item | Rule | Example |
|------|------|---------|
| Files | All lowercase, no spaces | `about.html`, not `About.html` |
| Folders | All lowercase | `css/`, `images/` |
| CSS classes | Lowercase with hyphens | `.nav-bar`, `.main-content` |
| IDs | Lowercase with hyphens | `#contact-form`, `#main-nav` |
| Images | Descriptive lowercase names | `workshop-photo.jpg` |

### HTML Requirements

- HTML5 doctype on every page
- `<meta charset="UTF-8">` on every page
- Viewport meta tag on every page
- Proper `<title>` on every page (unique per page)
- Semantic elements: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`
- All tags properly closed and nested
- External CSS linked via `<link>` in `<head>`

### CSS Requirements

- Single external stylesheet: `css/style.css`
- No inline styles (no `style=""` attributes)
- No `<style>` blocks in HTML (use the external file)
- At least one media query for responsive design
- Use CSS classes for reusable styles
- Use CSS variables (custom properties) for colors — optional but encouraged

---

## 5. Design Requirements

### Layout

- Consistent header, navigation, and footer on ALL pages
- Main content centered with max-width (e.g., 960px)
- Clear visual hierarchy: headings larger than body text

### Typography

- Font family: Arial, Helvetica, sans-serif (or Google Fonts if desired)
- Body text: 16px minimum, line-height 1.5
- Headings: Clearly sized (h1 > h2 > h3)
- Text must be readable — good contrast between text and background

### Color Scheme

Choose a consistent color scheme with at least:
- **Primary color** — for header, headings, buttons
- **Secondary color** — for nav bar, accents
- **Background color** — light color for page background
- **Text color** — dark enough for readability (not pure black, use #333 or similar)

Example:
```css
/* Primary: #003366 (dark blue) */
/* Secondary: #004488 (medium blue) */
/* Accent: #ffcc00 (yellow) */
/* Background: #f5f5f5 (light gray) */
/* Text: #333333 (dark gray) */
```

### Navigation

- Horizontal nav bar below the header
- Links to all 5 pages
- Current page visually highlighted (different color, underline, or bold)
- Hover effect on links (color change or background)

---

## 6. Accessibility Requirements

| Requirement | Details |
|-------------|---------|
| Alt text | Every `<img>` must have a meaningful `alt` attribute |
| Semantic HTML | Use `<header>`, `<nav>`, `<main>`, `<footer>` — not just `<div>` |
| Form labels | Every `<input>` must have a matching `<label for="...">` |
| Color contrast | Text must be readable against its background (not light gray on white) |
| Keyboard navigation | Links and buttons must be focusable (default behavior is fine) |
| Language | `<html lang="en">` on every page |

---

## 7. Grading Criteria (Final Project — 40 points)

| Category | Weight | Points | Description |
|----------|--------|--------|-------------|
| Structure & Organization | 15% | 6 | File structure, naming, organization |
| HTML Quality | 20% | 8 | Valid HTML, semantic elements, proper structure |
| CSS Styling | 20% | 8 | Consistent styling, layout, responsive design |
| Navigation & Usability | 15% | 6 | Working links, consistent nav, user-friendly |
| Content Quality | 10% | 4 | Meaningful content, proper text, good images |
| Forms & Interactivity | 10% | 4 | Complete form, proper labels, input types |
| Code Quality | 10% | 4 | Clean code, comments, indentation, validation |
| **Total** | **100%** | **40** | |

### Grade Scale

| Score | Grade |
|-------|-------|
| 36–40 | A |
| 30–35 | B |
| 24–29 | C |
| 20–23 | D |
| Below 20 | F |

---

## 8. Submission Requirements

1. Submit a **ZIP file** named `INS2053_[YourName]_[StudentID].zip`
2. The ZIP must contain the complete `student-club-website/` folder
3. All files must open correctly in a browser when extracted
4. No external dependencies (no CDN links, no internet-required resources)
5. Include a comment at the top of each HTML file with your name and student ID

### Deadline

- **Final submission:** Week 15, before the final exam
- **Late penalty:** -10% per day late

---

## 9. Tips for Success

1. **Start early** — do not wait until the last week
2. **Follow the milestones** — each milestone builds on the previous one
3. **Test constantly** — open your files in a browser after every change
4. **Validate your HTML** — use the W3C Validator (offline or memorize rules)
5. **Keep it simple** — a clean, working site is better than a broken fancy one
6. **Ask for help** — during lab sessions, ask the instructor or TAs
7. **Back up your work** — copy your folder to a USB drive regularly
