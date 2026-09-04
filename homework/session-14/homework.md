# Homework 14: CSS Dropdown Navigation

## Due Date
Sunday, 23:59 (Week 15)

## Objective
- Build an interactive dropdown menu with pure HTML and CSS
- Understand how modern sites replaced the legacy Spry widgets with `:hover` CSS
- Add an interactive element to your club website

## Requirements

### Task 1: Add a Dropdown Menu to Your Navigation
Create a dropdown navigation menu using HTML and CSS only — no JavaScript needed.

**Add a dropdown to your nav** (paths shown for `project/index.html` in the site root):

```html
<nav>
  <ul class="menu">
    <li><a href="index.html">Home</a></li>
    <li class="dropdown">
      <a href="about.html">About</a>
      <ul class="dropdown-content">
        <li><a href="about.html#mission">Our Mission</a></li>
        <li><a href="about.html#activities">Activities</a></li>
        <li><a href="about.html#gallery">Gallery</a></li>
      </ul>
    </li>
    <li><a href="activities.html">Activities</a></li>
    <li><a href="media.html">Media</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
```

**CSS for the dropdown:**
```css
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
}

.dropdown:hover .dropdown-content {
  display: block;
}
```

> This is exactly the menu pattern Session 14 teaches as the modern replacement
> for the retired Spry Menu Bar — `:hover` on the parent `<li>` shows the child `<ul>`.

### Task 2: Style and Integrate the Menu
Add the dropdown CSS to your stylesheet and update the navigation on all pages.

**Your CSS must include:**
- Dropdown container styling (`position: relative` on the parent `<li>`)
- Dropdown content hidden by default
- Show dropdown on hover
- Style dropdown links (padding, hover color change)
- Smooth transition effect

**Your HTML updates must include:**
- Updated nav on at least 2 pages with the dropdown structure
- Correct links inside the dropdown (use your own pages and anchors)

### Task 3: Add a "Back to Top" Button (Bonus)
Add a simple "Back to Top" button to your pages.

**Minimum implementation (HTML + CSS):**
```html
<a href="#top" class="back-to-top">Back to Top</a>
```

```css
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #2c3e50;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 5px;
}
```

Add `id="top"` to your `<header>` element so the link scrolls back up.

**File paths:**
- `project/css/style.css` (dropdown + button styles)
- At least 2 HTML files (updated navigation)

## Submission Guide
- Add changes: `git add project/`
- Commit: `git commit -m "HW14: Add interactive dropdown menu"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Menu structure | 3 | Dropdown HTML is properly structured |
| CSS styling | 3 | Dropdown shows on hover, links styled |
| Integration | 2 | Dropdown works within existing navigation |
| Back to top | 1 | Button exists and links to top |
| Code quality | 1 | Clean, well-commented code |
| **Total** | **10** | |

## Tips
- The key to CSS dropdowns is `display: none` by default and `display: block` on `:hover`
- Use `position: relative` on the parent `<li>` and `position: absolute` on the dropdown `<ul>`
- If the dropdown goes off-screen, adjust `left` or `right` values

## Example Output
When you hover over the "About" menu item, a dropdown should appear showing sub-links like "Our Mission," "Activities," and "Gallery." The dropdown should disappear when you move your mouse away.
