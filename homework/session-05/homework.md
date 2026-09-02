# Homework 5: Page Layout with Semantic HTML

## Due Date
Sunday, 23:59 (Week 6)

## Objective
- Learn semantic HTML5 elements (header, nav, main, footer)
- Build a proper page layout using CSS
- Create a reusable layout template for your project

## Requirements

### Task 1: Create a Layout Template
Build a page layout for `project/index.html` using semantic HTML elements and CSS.

**Your HTML must use these semantic elements:**
- `<header>` — Contains the club name/logo
- `<nav>` — Contains navigation links (Home, About, Contact)
- `<main>` — Contains the main page content
- `<footer>` — Contains copyright info and social links

**Structure example:**
```html
<header>
  <h1>Your Club Name</h1>
</header>
<nav>
  <ul>
    <li><a href="../index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
<main>
  <h2>Welcome to Our Club</h2>
  <p>Your content here...</p>
</main>
<footer>
  <p>&copy; 2026 Your Club Name</p>
</footer>
```

> **Note:** These paths assume the HTML file is inside `project/pages/`. Use `../` to go up one level to reach `index.html` in the project root.

### Task 2: Style the Layout with CSS
Add CSS rules to your `project/css/style.css` file to make the layout look like a proper web page.

**Your CSS must include:**

1. **Header styling:**
   - Background color
   - Text color
   - Padding for spacing
   - Text alignment (centered is fine)

2. **Navigation styling:**
   - Display the nav links horizontally (use `display: inline-block` or `flex`)
   - Add background color to the nav bar
   - Remove bullet points from the list
   - Add spacing between links

3. **Main content area:**
   - Set a maximum width (e.g., 900px)
   - Center the content
   - Add padding on the sides

4. **Footer styling:**
   - Background color (different from header)
   - Text alignment (center)
   - Padding

5. **General cleanup:**
   - Remove default margins on the body
   - Make the layout full-width

**File paths:**
- `project/index.html` (updated with semantic HTML)
- `project/css/style.css` (updated with layout styles)

## Submission Guide
- Add changes: `git add project/index.html project/css/style.css`
- Commit: `git commit -m "HW5: Add semantic layout to index page"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Semantic HTML | 3 | Uses header, nav, main, footer correctly |
| Navigation | 2 | Links work, displayed properly |
| CSS layout | 3 | Header, nav, main, footer all styled |
| Visual quality | 1 | Page looks like a real website layout |
| Code quality | 1 | Clean, well-indented HTML and CSS |
| **Total** | **10** | |

## Tips
- Use `* { margin: 0; padding: 0; }` to remove default spacing before adding your own
- The nav links should point to the correct files with correct relative paths
- Test all navigation links to make sure they work

## Example Output
Your index.html should look like a real website with a colored header bar at the top, a horizontal navigation menu, a centered content area, and a footer bar at the bottom.
