# Final Exam — Grading Rubric

## Problem 1: HTML Table (2 points total)

Create `schedule.html` with a properly structured table.

| # | Criterion | Full Marks | Partial Marks | Zero Marks |
|---|-----------|------------|---------------|------------|
| 1 | HTML5 DOCTYPE + document structure | 0.15 | Missing DOCTYPE (-0.1); missing head/body (-0.05) | No document structure |
| 2 | CSS link in `<head>` | 0.1 | Wrong path (-0.1) | No link |
| 3 | Navigation with "Schedule" active | 0.25 | Nav exists but wrong active link (-0.1); incomplete nav (-0.1) | No nav |
| 4 | `<h1>` heading "Club Schedule" | 0.1 | Heading exists but wrong text (-0.05) | No heading |
| 5 | `<caption>` with "Weekly Club Schedule" | 0.15 | Caption exists but wrong text (-0.1) | No caption |
| 6 | `<thead>` with header row | 0.2 | `<thead>` present but missing `<th>` elements (-0.1) | No thead |
| 7 | `<tbody>` present | 0.1 | No `<tbody>` tag (-0.1) | — |
| 8 | At least 4 data rows | 0.2 | 3 rows (-0.1); 2 rows (-0.15); 1 row (-0.2) | No rows |
| 9 | 4 columns (Day, Time, Activity, Location) | 0.2 | 3 columns (-0.1); 2 columns (-0.15) | Fewer than 2 |
| 10 | `colspan` used on at least one cell | 0.25 | colspan present but wrong value (-0.1) | No colspan |
| 11 | Table has visible borders (HTML or CSS) | 0.15 | No borders (-0.15) | — |
| 12 | Footer with copyright | 0.1 | No footer (-0.1) | — |
| 13 | Tags properly closed and nested | 0.05 | 1-2 errors (-0.05); 3+ errors (-0.05) | Major errors |

**Point allocation:** Items sum to 2.0 points

**Point allocation:** Items sum to 2 points

### Common Mistakes
- Using `<td>` instead of `<th>` in the header row → -0.15
- Forgetting `<thead>` and `<tbody>` → -0.3
- `colspan` used but with wrong number → -0.1
- No `<caption>` element → -0.15

---

## Problem 2: Multimedia (2 points total)

Create `media.html` with video and audio elements.

| # | Criterion | Full Marks | Partial Marks | Zero Marks |
|---|-----------|------------|---------------|------------|
| 1 | HTML5 document structure | 0.15 | Missing elements (-0.05 each) | No structure |
| 2 | Navigation with "Media" active | 0.2 | Wrong active link (-0.1) | No nav |
| 3 | `<h1>` heading | 0.1 | Wrong text (-0.05) | No heading |
| 4 | `<video>` element exists | 0.25 | No video element (-0.25) | — |
| 5 | Video has `controls` attribute | 0.15 | Missing controls (-0.15) | — |
| 6 | Video has `poster` attribute | 0.1 | Missing poster (-0.1) | — |
| 7 | Video has `width` attribute | 0.05 | Missing width (-0.05) | — |
| 8 | Video has 2 `<source>` elements | 0.15 | Only 1 source (-0.1) | No source |
| 9 | Source types correct (mp4 + webm) | 0.1 | Wrong types (-0.1) | — |
| 10 | Video fallback text present | 0.1 | Missing fallback (-0.1) | — |
| 11 | `<audio>` element exists | 0.2 | No audio element (-0.2) | — |
| 12 | Audio has `controls` attribute | 0.1 | Missing controls (-0.1) | — |
| 13 | Audio has 2 `<source>` elements | 0.1 | Only 1 source (-0.05) | No source |
| 14 | Audio source types (mp3 + ogg) | 0.05 | Wrong types (-0.05) | — |
| 15 | Audio fallback text | 0.05 | Missing (-0.05) | — |
| 16 | Descriptive paragraphs before media | 0.1 | Missing or insufficient (-0.05) | No description |
| 17 | Footer | 0.05 | Missing (-0.05) | — |

**Point allocation:** Items sum to 2.0 points

### Common Mistakes
- Using `<embed>` or `<object>` instead of `<video>`/`<audio>` → no credit for that element
- Forgetting `type` attribute on `<source>` → -0.05 each
- Putting fallback text outside the element → -0.1

---

## Problem 3: Contact/Join Form (3 points total)

Create `join.html` with a complete form.

| # | Criterion | Full Marks | Partial Marks | Zero Marks |
|---|-----------|------------|---------------|------------|
| 1 | `<form>` with `action="#"` and `method="POST"` | 0.25 | Missing action or method (-0.1 each) | No form |
| 2 | Text input (name) with label | 0.3 | Input exists but no label (-0.1); label `for` mismatch (-0.1) | No name input |
| 3 | Name input has `required` attribute | 0.1 | Missing required (-0.1) | — |
| 4 | Email input with `type="email"` | 0.15 | Wrong type (-0.1) | No email input |
| 5 | Email input has label with correct `for` | 0.1 | Label missing or wrong (-0.1) | — |
| 6 | Email has `required` attribute | 0.1 | Missing (-0.1) | — |
| 7 | Radio buttons — 2 options (Student, Alumni) | 0.2 | Only 1 radio (-0.1); no radios (-0.2) | — |
| 8 | Radio buttons share same `name="membership"` | 0.15 | Different names (-0.15) | — |
| 9 | Radio buttons each have labels | 0.1 | Missing labels (-0.1) | — |
| 10 | Checkbox with `id="terms"` | 0.1 | Wrong id (-0.05) | No checkbox |
| 11 | Checkbox has label with `for="terms"` | 0.1 | Wrong for attribute (-0.1) | — |
| 12 | Checkbox has `required` attribute | 0.05 | Missing (-0.05) | — |
| 13 | `<select>` with `id="department"` | 0.1 | Wrong id (-0.05) | No select |
| 14 | Select has at least 4 `<option>` elements | 0.15 | 3 options (-0.1); 2 or fewer (-0.15) | No options |
| 15 | Select has label with `for="department"` | 0.1 | Wrong for (-0.1) | — |
| 16 | `<textarea>` with id, name, rows, cols | 0.15 | Missing 1-2 attributes (-0.05 each) | No textarea |
| 17 | Textarea has label | 0.1 | Missing (-0.1) | — |
| 18 | Submit button present | 0.1 | No button (-0.1) | — |
| 19 | Button has `type="submit"` or is `<input type="submit">` | 0.05 | Missing type (-0.05) | — |
| 20 | At least 1 `<fieldset>` with `<legend>` | 0.25 | No fieldset (-0.15); no legend (-0.1) | Neither |
| 21 | All inputs have matching labels (consistency) | 0.1 | 1-2 missing labels (-0.05) | 3+ missing |
| 22 | Navigation with "Join" active | 0.15 | Wrong active (-0.1) | No nav |
| 23 | Footer present | 0.05 | Missing (-0.05) | — |

**Point allocation:** Items sum to 3.0 points

### Common Mistakes
- Forgetting `<label>` elements entirely → lose 0.5+ points
- Radio buttons with different `name` values → -0.15
- `for` attribute on label does not match input `id` → -0.1 each
- Using `<input type="text">` instead of `type="email"` → -0.15
- No `<fieldset>` → -0.15

---

## Problem 4: Complete Small Site (3 points total)

Create `index.html` and `css/style.css` that tie the site together.

### Part A: `index.html` (1.5 points)

| # | Criterion | Full Marks | Partial Marks | Zero Marks |
|---|-----------|------------|---------------|------------|
| 1 | HTML5 DOCTYPE | 0.1 | Missing (-0.1) | — |
| 2 | `<meta charset="UTF-8">` | 0.1 | Missing (-0.1) | — |
| 3 | Viewport meta tag | 0.15 | Missing (-0.15) | — |
| 4 | `<link>` to CSS | 0.1 | Wrong path (-0.1) | — |
| 5 | `<header>` with `<h1>` | 0.15 | No header tag (-0.1) | Neither |
| 6 | `<nav>` with 4 links | 0.2 | 3 links (-0.1); fewer (-0.15) | No nav |
| 7 | "Home" link marked active | 0.1 | Wrong active (-0.1) | — |
| 8 | `<main>` with heading + paragraph | 0.2 | Missing elements (-0.1 each) | No main |
| 9 | Call-to-action text present | 0.05 | Missing (-0.05) | — |
| 10 | `<footer>` with copyright | 0.1 | Missing (-0.1) | — |
| 11 | Semantic elements used correctly | 0.15 | Some divs instead (-0.05) | All divs |
| 12 | Tags properly closed/nested | 0.1 | Errors (-0.05 each) | Major issues |

**Part A total:** items sum to 1.5 points

### Part B: `css/style.css` (1.5 points)

| # | Criterion | Full Marks | Partial Marks | Zero Marks |
|---|-----------|------------|---------------|------------|
| 1 | Body styles (font, margin, bg) | 0.15 | Missing properties (-0.05 each) | No body style |
| 2 | Header styles | 0.15 | Missing (-0.15) | — |
| 3 | Nav styles (bg, links, layout) | 0.15 | Incomplete (-0.05) | No nav style |
| 4 | Container styles | 0.1 | Missing (-0.1) | — |
| 5 | Table styles | 0.1 | Missing (-0.1) | — |
| 6 | Form styles | 0.1 | Missing (-0.1) | — |
| 7 | Footer styles | 0.1 | Missing (-0.1) | — |
| 8 | **Media query exists** | 0.2 | No media query (-0.2) | — |
| 9 | Media query targets 768px | 0.1 | Wrong breakpoint (-0.1) | — |
| 10 | Nav stacks vertically in media query | 0.15 | Partial implementation (-0.1) | — |
| 11 | CSS file in correct location (`css/`) | 0.1 | Wrong location (-0.1) | — |
| 12 | CSS syntax is valid (no errors) | 0.1 | 1-2 errors (-0.05); 3+ (-0.1) | Broken CSS |

**Part B total:** items sum to 1.5 points

**Problem 4 total:** 3 points

### Common Mistakes
- No viewport meta tag → -0.15
- No media query at all → -0.45
- Media query exists but wrong breakpoint → -0.1
- Nav does not actually stack vertically on mobile → -0.15
- CSS file saved in root instead of `css/` → -0.1

---

## Overall Grade Sheet

| Problem | Max Points | Student Score |
|---------|-----------|---------------|
| 1 — HTML Table | 2.0 | _____ |
| 2 — Multimedia | 2.0 | _____ |
| 3 — Form | 3.0 | _____ |
| 4 — Complete Site | 3.0 | _____ |
| **Total** | **10.0** | _____ |

**Grade Scale:**
- 9.0–10.0: A
- 7.5–8.9: B
- 6.0–7.4: C
- 5.0–5.9: D
- Below 5.0: F
