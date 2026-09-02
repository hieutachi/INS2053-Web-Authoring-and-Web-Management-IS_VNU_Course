# Homework 13: Spry Menu Bar / Interactive Widget

## Due Date
Sunday, 23:59 (Week 15)

## Objective
- Learn about interactive widgets and menu systems
- Understand how JavaScript enhances web pages
- Add an interactive element to your club website

## Requirements

### Task 1: Add an Interactive Menu or Widget
Enhance your site with an interactive element. You have two options:

**Option A: Enhanced Navigation with Dropdown (Recommended)**
Create a dropdown navigation menu using HTML and CSS (no JavaScript required for this basic version).

**Create a dropdown menu in your navigation:**
```html
<nav>
  <ul class="menu">
    <li><a href="index.html">Home</a></li>
    <li class="dropdown">
      <a href="pages/about.html">About</a>
      <ul class="dropdown-content">
        <li><a href="pages/about.html#mission">Our Mission</a></li>
        <li><a href="pages/about.html#activities">Activities</a></li>
        <li><a href="pages/about.html#gallery">Gallery</a></li>
      </ul>
    </li>
    <li><a href="pages/schedule.html">Schedule</a></li>
    <li><a href="pages/media.html">Media</a></li>
    <li><a href="pages/contact.html">Contact</a></li>
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

**Option B: Spry-Style Menu Bar (Describe It)**
If you prefer, you can describe what a Spry menu bar or similar interactive widget would do in your project:

1. Write a description (1-2 paragraphs) of what an interactive menu bar would include
2. Describe the features: hover effects, dropdowns, mobile menu toggle
3. Create a mockup of the menu structure using HTML comments
4. Explain what JavaScript would be needed to make it work

**Write this in a file:** `project/pages/spry-menu.md`

### Task 2: Implement the Dropdown Menu (If Option A)
If you chose Option A, add the dropdown CSS to your stylesheet and update the navigation on all pages.

**Your CSS must include:**
- Dropdown container styling (position: relative)
- Dropdown content hidden by default
- Show dropdown on hover
- Style dropdown links (padding, hover color change)
- Smooth transition effect

**Your HTML updates must include:**
- Updated nav on at least 2 pages with the dropdown structure
- Correct links inside the dropdown

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
- `project/css/style.css` (dropdown styles)
- `project/pages/spry-menu.md` (if Option B)
- At least 2 HTML files (updated navigation)

## Submission Guide
- Add changes: `git add project/`
- Commit: `git commit -m "HW13: Add interactive dropdown menu"`
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
