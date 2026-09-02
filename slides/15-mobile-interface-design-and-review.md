---
marp: true
theme: default
paginate: true
---

# Session 15: Mobile Interface Design / Review

**INS2053 — Web Authoring and Web Management**

*Make your site work everywhere. Finish strong.*

Read: `ebook/15-mobile-interface-design-and-review.md`  ·  Practise: `exercises/session-15/exercise.md`  ·  Diagrams: `canvases/buoi-15.canvas.tsx`

---

## Learning Objectives

- Explain why mobile-friendly design is essential (stats, SEO)
- Add the viewport meta tag to every page correctly
- Write CSS media queries using `@media (max-width: ...)` for breakpoints
- Make images flexible with `max-width: 100%` and ensure touch targets are 44px+
- Present your web project professionally to a non-technical audience (CLO5)

---

## Why Mobile Design Matters

| Fact | Source |
|------|--------|
| Over 60% of global web traffic is from mobile devices | StatCounter, 2024 |
| Google uses mobile-first indexing for search rankings | Google Search Central |
| 57% of users won't recommend a business with a bad mobile site | Google/Ipsos |

```
Desktop/Laptop     Tablet           Smartphone
+--------------+   +----------+     +--------+
|              |   |          |     |        |
|  1200px+     |   |  768px   |     | 375px  |
|              |   |  -1024px |     | -430px |
+--------------+   +----------+     +--------+
Your website must look good at ALL these widths!
```

---

## The Viewport Meta Tag

Without this tag, mobile browsers render at ~980px then shrink everything to tiny text.

```html
<!-- ALWAYS include in <head> -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

| Value | Meaning |
|-------|---------|
| `width=device-width` | Viewport width = device's actual screen width |
| `initial-scale=1.0` | Start at 100% zoom (no auto-zoom) |

Add this to **every** HTML page. Never set `user-scalable=no`.

---

## Media Queries

Media queries apply styles only when certain conditions are met:

```css
/* Base styles (desktop) */
main { width: 65%; float: left; }

/* Tablet and below */
@media (max-width: 768px) {
    main { width: 100%; float: none; }
}
```

Common breakpoints:

| Breakpoint | Target | Typical Changes |
|-----------|--------|-----------------|
| `max-width: 992px` | Tablets (landscape) | Adjust columns, reduce fonts |
| `max-width: 768px` | Tablets/phones | Stack columns, compact nav |
| `max-width: 480px` | Small phones | Smaller headings, tighter spacing |

---

## Flexible Images and Touch Targets

```css
/* Images never overflow their container */
img { max-width: 100%; height: auto; }

/* Prevent padding from expanding elements */
*, *::before, *::after { box-sizing: border-box; }
```

Touch target guidelines:
- Buttons: minimum **44 x 44 px** (Apple HIG + WCAG)
- Nav links: at least 44px tall with adequate spacing
- Form inputs: full width on mobile for easy tapping
- Use `font-size: 16px` on inputs to prevent iOS auto-zoom

---

## Presenting Your Project (CLO5)

A 5--7 minute presentation needs only 7 slides:

1. **Title** — project name + your name
2. **Goal & audience** — "The site helps [who] do [what]"
3. **Site map** — pages and connections
4. **Live demo** — walk the site like a visitor
5. **Design decisions** — "I chose X because Y" (2--3 items)
6. **Challenges & fixes** — one bug you found and solved
7. **Conclusion** — what you'd add next

---

## Demo Technique

How to show your site live during a presentation:

- **Open with the finished page**, not your code -- the audience cares about the result first
- **Follow a visitor's journey**: Home -> About -> one feature (table/form/media) -> Contact
- **Narrate while you click**: never let more than ~10 seconds pass in silence
- **Resize the window** (or use DevTools device mode) to show responsive design -- a strong finishing move
- **Have a backup**: keep screenshots ready in case the projector or internet fails

---

## Explain Decisions as Benefits

Avoid jargon. Translate technical choices into user/client value:

| Instead of (jargon) | Say (benefit) |
|---------------------|---------------|
| "I used semantic HTML" | "I structured the page so screen readers and Google understand it" |
| "I used Flexbox" | "I made the menu line up neatly on any screen size" |

Pattern: **"I chose X because it helps [the user/client goal]."**

If challenged, refer back to a requirement: *"The brief said the owner edits it herself, so I kept the structure simple."*

---

## Common Mistakes (Mobile)

- **Forgetting the viewport meta tag** -- everything renders tiny on mobile
- **Fixed-width images** (`width: 600px`) -- overflows narrow screens
- **Only testing on desktop** -- test at 375px, 768px, and 1200px minimum
- **Tiny touch targets** -- links/buttons smaller than 44px cause mis-taps
- **Disabling zoom** (`user-scalable=no`) -- violates accessibility standards

---

## In-Class Practice

Follow `exercises/session-15/exercise.md`:

1. Add viewport meta tag to ALL pages
2. Add `img { max-width: 100%; height: auto; }` globally
3. Write media queries for tablet (768px) and phone (480px)
4. Fix mobile navigation dropdowns (always visible on touch)
5. Full site audit at 375px, 768px, and 1200px using DevTools

---

## Homework

See `homework/session-15/homework.md`:

- Final Student Club Website submission
- All pages must be responsive (test at 3 widths)
- Include viewport meta tag on every page
- Complete the 20-item final project submission checklist
- Push final version to GitHub

**Due Sunday 23:59**

---

## Full Course Recap — Four Blocks

| Block | Sessions | What you can now do |
|---|---|---|
| **Structure** | 1--3 | Set up a site folder, write valid HTML5, add text, images, links |
| **Style** | 4--7 | External CSS, selectors, box model, layouts, web fonts, CSS3 effects |
| **Content** | 9--13 | Tables, HTML5 video/audio, site planning, dev tools, forms |
| **Modernise** | 14--15 | Replace legacy widgets with CSS, make the site responsive |

Session 8 was the midterm. Full per-session topic list: `schedule.md`.

---

## Final Exam Prep

**Format:** 90 minutes, practical (build/edit HTML/CSS) + theory

**Must-know topics:**
- Write a complete HTML5 page from scratch
- Create a two-column layout with header/nav/main/sidebar/footer
- Build forms with 5+ input types and labels
- Write media queries for responsive design
- Explain the box model and viewport meta tag

**Study plan:** Re-read ebook chapters, rebuild pages from memory, complete the timed mock exam (Campus Brew coffee shop) in ebook Chapter 15.

---

## Recap

- Viewport meta tag is mandatory on every page for mobile rendering
- Media queries adapt layouts at specific breakpoints (992px, 768px, 480px)
- Flexible images (`max-width: 100%`) prevent overflow on small screens
- CLO5: Present using the 7-slide structure; demo by following a visitor journey
- Explain technical decisions as benefits, not jargon
- You have built a complete, validated, responsive multi-page website

---

## Congratulations!

You have completed **INS2053 -- Web Authoring and Web Management**.

Keep building, keep experimenting, and keep validating. The web is yours to create. Good luck on your final exam!
