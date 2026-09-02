---
marp: true
theme: default
paginate: true
---

# Session 7: CSS3 and Web Fonts

**INS2053 — Web Authoring and Web Management**

*The difference between "works" and "looks professional".*

Read: `ebook/07-css3-and-web-fonts.md`  ·  Practise: `exercises/session-07/exercise.md`  ·  Diagrams: `canvases/buoi-07.canvas.tsx`

---

## Learning Objectives

- Import and use Google Fonts via `<link>` tags with proper fallback stacks
- Style text with `text-align`, `line-height`, `letter-spacing`, `text-shadow`
- Create rounded corners (`border-radius`) and shadows (`box-shadow`)
- Build linear/radial gradients as backgrounds
- Animate property changes with CSS3 `transition` and `:hover` effects

---

## Google Fonts

A **web font** is downloaded by the browser on demand. Google Fonts is a free library of 1,500+ font families.

Think of it like Spotify for typefaces -- fonts stream from Google's servers instead of being installed locally.

```html
<!-- Inside <head>, BEFORE your stylesheet -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans:wght@400;600&display=swap"
      rel="stylesheet">
```

Always include `display=swap` so text shows immediately.

---

## Font-Family Stacks & Text Styling

```css
h1 { font-family: 'Montserrat', Arial, sans-serif; }
body { font-family: 'Open Sans', Arial, sans-serif; }
```

The browser tries each font left-to-right, ending with a generic fallback.

| Property | Purpose | Example |
|----------|---------|---------|
| `text-align` | Horizontal alignment | `center`, `left`, `justify` |
| `line-height` | Vertical line spacing | `1.6` (unitless, recommended) |
| `letter-spacing` | Space between characters | `2px` for headings |
| `text-shadow` | Shadow behind text | `2px 2px 4px rgba(0,0,0,0.3)` |

---

## Rounded Corners & Shadows

```css
.card { border-radius: 10px; }
.avatar { width: 80px; height: 80px; border-radius: 50%; }
.btn { border-radius: 25px; }  /* pill shape */
```

```
border-radius shorthand (clockwise):
  TL ───────────── TR
  │                 │
  BL ───────────── BR
```

**Box shadow:** `box-shadow: h-offset v-offset blur color;`
```css
.card { box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
```

Use low-opacity `rgba` colours -- avoid pure black `#000`.

---

## Gradients

**Linear gradient:**
```css
header {
  background: linear-gradient(135deg, #1a5276 0%, #2874a6 50%, #3498db 100%);
}
```

```
to bottom v    to right -->    135deg (diagonal)
┌──────────┐   ┌──────────┐   ┌──────────┐
│ ████████ │   │ ██-->███ │   │ ██\      │
│ ░░░░░░░░ │   │ ░░░░░░░░ │   │   \░░░░░ │
└──────────┘   └──────────┘   └──────────┘
```

**Radial gradient:**
```css
.spotlight { background: radial-gradient(circle, #ffcc00, #ff6600); }
```

Stick to 2-3 colours per gradient for a clean look.

---

## CSS3 Transitions

A **transition** animates property changes smoothly over a duration.

```css
/* Put transition on the BASE selector, NOT :hover */
.event-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}
```

| Timing Function | Feel |
|----------------|------|
| `ease` | Natural (default) |
| `ease-in` | Accelerates |
| `ease-out` | Decelerates |
| `linear` | Constant speed |

Keep durations 0.2s - 0.5s for UI interactions.

---

## Live Code Example

```css
/* Styled event card with hover lift */
.event-card {
  background-color: #f8f9fa;
  border-left: 5px solid #3498db;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}
```

Result: card lifts 3px on hover with deepening shadow -- smooth animation both in and out.

---

## Common Mistakes

- Forgetting fallback font: `font-family: 'Montserrat';` (missing `sans-serif`)
- Putting `@import` after other CSS rules (browser ignores it silently)
- Defining `transition` only on `:hover` (animates IN but snaps OUT)
- Using `top`/`left` for hover movement instead of `transform` (causes jank)
- Adding Google Fonts link to only one page instead of all pages

---

## In-Class Practice

Complete the hands-on tasks in **exercises/session-07/exercise.md**:

1. Add Google Fonts (Montserrat + Open Sans) to all pages
2. Apply text styling to header (gradient, shadow, letter-spacing)
3. Create interactive event cards with hover-lift animation
4. Style navigation links with hover transitions
5. Add a gradient welcome banner with CTA button

---

## Homework

See **homework/session-07/homework.md**

Enhance your Student Club Website with Google Fonts, CSS3 shadows, gradients, and hover animations across all pages.

**Due Sunday 23:59**

---

## Recap

- Load Google Fonts via `<link>` in `<head>` -- always include fallback fonts
- Use unitless `line-height` (1.5-1.8) for readable body text
- `border-radius` rounds corners; `50%` makes circles on square elements
- `box-shadow` adds depth; use low-opacity rgba for modern look
- `transition` goes on the base selector, not `:hover`
- Use `transform` (not margin/top) for smooth hover animations

---

## Next Session

Session 8: **Review & Midterm Exam** -- recap Sessions 1-7, practice exam questions, and prepare for the midterm.
