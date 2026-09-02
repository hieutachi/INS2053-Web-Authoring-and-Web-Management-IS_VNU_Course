# Homework 14: Making Your Site Responsive

## Due Date
Sunday, 23:59 (Week 16)

## Objective
- Learn about responsive web design
- Use the viewport meta tag for mobile devices
- Write CSS media queries to adapt layout for different screen sizes

## Requirements

### Task 1: Add the Viewport Meta Tag
Add the responsive viewport meta tag to the `<head>` section of ALL your HTML pages.

**Add this line inside `<head>` on every page:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Files to update:**
- `project/index.html`
- `project/pages/about.html`
- `project/pages/contact.html`
- `project/pages/schedule.html`
- `project/pages/media.html`

### Task 2: Write a Media Query
Add a media query to your CSS that changes the layout for mobile screens (screens smaller than 768px).

**Add this to `project/css/style.css`:**

```css
/* Responsive Design - Mobile Styles */
@media screen and (max-width: 768px) {

  /* Make navigation stack vertically on mobile */
  nav ul {
    flex-direction: column;
    text-align: center;
  }

  /* Make header smaller */
  header {
    padding: 15px;
  }

  header h1 {
    font-size: 1.5em;
  }

  /* Make main content full width */
  main {
    max-width: 100%;
    padding: 15px;
  }

  /* Make images responsive */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Make table scrollable on small screens */
  table {
    display: block;
    overflow-x: auto;
  }

  /* Adjust form inputs */
  form input,
  form select,
  form textarea {
    width: 100%;
  }

  /* Make footer smaller */
  footer {
    padding: 15px;
    font-size: 0.9em;
  }
}
```

**Your media query must include changes for at least 5 of these elements:**
- [ ] Navigation menu (stack vertically or adjust layout)
- [ ] Header (smaller font size, less padding)
- [ ] Main content area (full width, less padding)
- [ ] Images (max-width: 100%, height: auto)
- [ ] Table (horizontal scroll)
- [ ] Form inputs (full width)
- [ ] Footer (smaller text, less padding)

### Task 3: Make Images Responsive
Ensure all images on the site scale properly on small screens.

**Add to your base CSS (outside the media query):**
```css
img {
  max-width: 100%;
  height: auto;
}
```

### Task 4: Test Your Site
Test your website on different screen sizes:

1. Open your site in Chrome or Firefox
2. Press F12 to open Developer Tools
3. Click the "Toggle Device Toolbar" button (phone/tablet icon)
4. Test at these widths: 320px (mobile), 768px (tablet), 1024px (desktop)
5. Take note of any layout issues and fix them

**Optional:** Add a second media query for even smaller screens:
```css
@media screen and (max-width: 480px) {
  /* Extra small screen styles */
  h1 { font-size: 1.3em; }
  nav a { font-size: 0.9em; }
}
```

**File paths:**
- All 5 HTML files (viewport meta tag)
- `project/css/style.css` (media queries + responsive images)

## Submission Guide
- Add changes: `git add project/`
- Commit: `git commit -m "HW14: Add responsive design with media queries"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Viewport meta tag | 2 | Added to all HTML pages |
| Media query | 3 | At least one media query with 5+ element changes |
| Responsive images | 2 | Images scale properly on all screen sizes |
| Mobile layout | 2 | Site looks good on mobile screen (768px) |
| Testing | 1 | Site tested and works at multiple widths |
| **Total** | **10** | |

## Tips
- The viewport meta tag is essential — without it, mobile browsers will zoom out to show the full desktop layout
- Test early and often — resize your browser window while working to catch issues
- `max-width: 100%` and `height: auto` on images prevents them from overflowing on small screens

## Example Output
When you open your site on a mobile phone (or resize the browser window to 320px wide), the navigation should stack vertically, images should fit within the screen, the header should be compact, and text should be readable without zooming.
