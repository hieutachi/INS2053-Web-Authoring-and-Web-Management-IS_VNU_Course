# Project Milestones — Student Club Website

## INS2053: Web Authoring and Web Management

Each milestone aligns with the course schedule. Submit your work at the beginning of the corresponding lab session.

---

## Milestone M1 — Project Setup & Home Page (Week 3)

**Topics covered:** Sessions 1–3 (HTML basics, project structure, text & images)

### Deliverables

| File | Must Exist? | Details |
|------|-------------|---------|
| `index.html` | Yes | Home page with basic structure |
| `css/` folder | Yes | Created but can be empty |
| `images/` folder | Yes | Contains at least 1 image (logo) |

### Acceptance Criteria

- [ ] `index.html` has `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`
- [ ] `<title>` tag contains the club name
- [ ] Page has an `<h1>` with the club name
- [ ] At least 2 paragraphs of text about the club
- [ ] At least 1 image with `src` and `alt` attributes
- [ ] Files are organized in the correct folder structure

### Points: **4 points**

| Criterion | Points |
|-----------|--------|
| Correct folder structure | 1 |
| Valid HTML5 document structure | 1 |
| Text content (headings, paragraphs) | 1 |
| Image with alt text | 1 |

---

## Milestone M2 — CSS Basics (Week 4)

**Topics covered:** Session 4 (CSS basics)

### Deliverables

| File | Must Exist? | Details |
|------|-------------|---------|
| `css/style.css` | Yes | Basic stylesheet |
| `index.html` | Updated | Links to CSS file |

### Acceptance Criteria

- [ ] `css/style.css` exists and is linked in `index.html`
- [ ] Body has a `font-family` set
- [ ] Background color is defined
- [ ] At least 3 different CSS selectors are used (e.g., `body`, `h1`, `p`)
- [ ] Text color and heading color are defined
- [ ] CSS file is properly formatted with comments

### Points: **4 points**

| Criterion | Points |
|-----------|--------|
| CSS file linked in HTML | 1 |
| At least 3 selectors with properties | 1 |
| Colors and fonts applied | 1 |
| CSS is organized and commented | 1 |

---

## Milestone M3 — Multi-Page Site & Navigation (Week 6)

**Topics covered:** Sessions 5–6 (Layouts, multi-page sites)

### Deliverables

| File | Must Exist? | Details |
|------|-------------|---------|
| `index.html` | Updated | With navigation |
| `about.html` | Yes | About page |
| `activities.html` | Yes | Activities page (basic) |

### Acceptance Criteria

- [ ] All 3 pages have identical navigation bar
- [ ] Navigation uses `<nav>` element
- [ ] All links work correctly (relative paths)
- [ ] Current page is visually indicated (active link style)
- [ ] Each page has `<header>`, `<nav>`, main content area, `<footer>`
- [ ] CSS includes styles for navigation

### Points: **5 points**

| Criterion | Points |
|-----------|--------|
| 3 pages with consistent structure | 1.5 |
| Working navigation links | 1.5 |
| Semantic HTML (header, nav, footer) | 1 |
| Active page indicator | 1 |

---

## Milestone M4 — Advanced CSS & Layout (Week 8)

**Topics covered:** Session 7 (CSS3, fonts, layout)

### Deliverables

| File | Must Exist? | Details |
|------|-------------|---------|
| `css/style.css` | Updated | Enhanced styles |
| `about.html` | Updated | Team section added |
| All 3 pages | Updated | Container layout applied |

### Acceptance Criteria

- [ ] Content is wrapped in a `.container` with max-width and centered
- [ ] Navigation is styled horizontally with hover effects
- [ ] At least 1 CSS3 feature used (border-radius, box-shadow, or transition)
- [ ] Footer is styled and consistent across all pages
- [ ] Team section on About page uses definition list or styled divs

### Points: **5 points**

| Criterion | Points |
|-----------|--------|
| Container layout (centered, max-width) | 1 |
| Navigation styling (horizontal, hover) | 1.5 |
| CSS3 feature (radius/shadow/transition) | 1 |
| Consistent footer | 0.5 |
| Team section on About page | 1 |

---

## Milestone M5 — Table & Media Pages (Week 10)

**Topics covered:** Sessions 8–9 (Tables, multimedia)

### Deliverables

| File | Must Exist? | Details |
|------|-------------|---------|
| `activities.html` | Updated | Schedule table |
| `media.html` | Yes | Media page |
| Navigation | Updated | 4 links now (Home, About, Activities, Media) |

### Acceptance Criteria

- [ ] Activities page has a table with `<caption>`, `<thead>`, `<tbody>`
- [ ] Table has at least 5 data rows and 4 columns
- [ ] At least one cell uses `colspan`
- [ ] Media page has a `<video>` element with `controls` and `<source>` children
- [ ] Media page has an `<audio>` element with `controls` and `<source>` children
- [ ] Video and audio have fallback text
- [ ] Navigation updated on ALL pages to include Media link

### Points: **6 points**

| Criterion | Points |
|-----------|--------|
| Table structure (caption, thead, tbody) | 1.5 |
| Table content (5+ rows, 4 cols, colspan) | 1.5 |
| Video element with sources | 1 |
| Audio element with sources | 1 |
| Navigation updated on all pages | 1 |

---

## Milestone M6 — Contact Form (Week 12)

**Topics covered:** Sessions 10–11 (Forms)

### Deliverables

| File | Must Exist? | Details |
|------|-------------|---------|
| `contact.html` | Yes | Contact/join form page |
| Navigation | Updated | 5 links now (Home, About, Activities, Media, Contact) |

### Acceptance Criteria

- [ ] Form has `action="#"` and `method="POST"`
- [ ] Text input for name with `<label>` and `required`
- [ ] Email input with `<label>` and `required`
- [ ] At least 2 radio buttons (same `name`) with labels
- [ ] Select dropdown with at least 4 options and label
- [ ] Textarea with label
- [ ] Checkbox with label and `required`
- [ ] Submit button
- [ ] At least 1 `<fieldset>` with `<legend>`
- [ ] Navigation updated on ALL pages to include Contact link

### Points: **6 points**

| Criterion | Points |
|-----------|--------|
| Form structure (action, method) | 0.5 |
| Text and email inputs with labels | 1 |
| Radio buttons (2, same name, labels) | 1 |
| Select dropdown with options | 0.5 |
| Textarea with label | 0.5 |
| Checkbox with label and required | 0.5 |
| Fieldset and legend | 0.5 |
| Submit button | 0.5 |
| Navigation updated on all pages | 0.5 |

---

## Milestone M7 — Responsive Design (Week 14)

**Topics covered:** Sessions 12–13 (Mobile/responsive)

### Deliverables

| File | Must Exist? | Details |
|------|-------------|---------|
| `css/style.css` | Updated | With media query |
| All 5 pages | Updated | Viewport meta tag |

### Acceptance Criteria

- [ ] All 5 pages have `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] CSS has at least 1 `@media` query
- [ ] Media query triggers at `max-width: 768px`
- [ ] Navigation stacks vertically on mobile (nav links become `display: block`)
- [ ] Table remains readable on smaller screens
- [ ] Form inputs are full-width on mobile
- [ ] Container padding adjusts on mobile

### Points: **5 points**

| Criterion | Points |
|-----------|--------|
| Viewport meta on all pages | 1 |
| Media query exists (768px) | 1 |
| Nav stacks vertically | 1 |
| Form responsive on mobile | 1 |
| Overall mobile readability | 1 |

---

## Milestone M8 — Final Polish & Submission (Week 15)

**Topics covered:** Sessions 14–15 (Review, code editing, validation)

### Deliverables

| File | Must Exist? | Details |
|------|-------------|---------|
| All 5 HTML pages | Final | Complete and polished |
| `css/style.css` | Final | Complete stylesheet |
| `images/` folder | Final | All images present |
| ZIP file | Submitted | Named correctly |

### Acceptance Criteria

- [ ] All 5 pages are complete with all required content
- [ ] All navigation links work between all pages
- [ ] No broken images or missing files
- [ ] HTML is valid (proper nesting, all tags closed)
- [ ] CSS has no errors
- [ ] Consistent design across all pages
- [ ] At least 2 HTML comments per page explaining sections
- [ ] Code is properly indented (2 or 4 spaces consistently)
- [ ] ZIP file named correctly: `INS2053_[Name]_[ID].zip`

### Points: **5 points**

| Criterion | Points |
|-----------|--------|
| All pages complete | 1 |
| All links working | 0.5 |
| HTML validity (no errors) | 1 |
| Code quality (indentation, comments) | 1 |
| Correct ZIP submission | 0.5 |
| Overall polish | 1 |

---

## Milestone Summary

| Milestone | Week | Topic | Points |
|-----------|------|-------|--------|
| M1 | 3 | Setup & Home Page | 4 |
| M2 | 4 | CSS Basics | 4 |
| M3 | 6 | Multi-Page & Navigation | 5 |
| M4 | 8 | Advanced CSS & Layout | 5 |
| M5 | 10 | Tables & Media | 6 |
| M6 | 12 | Contact Form | 6 |
| M7 | 14 | Responsive Design | 5 |
| M8 | 15 | Final Polish | 5 |
| **Total** | | | **40** |

### Milestone Grade Scale

| Score | Grade |
|-------|-------|
| 36–40 | A |
| 30–35 | B |
| 24–29 | C |
| 20–23 | D |
| Below 20 | F |
