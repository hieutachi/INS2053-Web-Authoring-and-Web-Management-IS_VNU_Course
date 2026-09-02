# Homework 11: HTML & CSS Validation and Code Cleanup

## Due Date
Sunday, 23:59 (Week 13)

## Objective
- Learn to validate HTML and CSS using online tools
- Find and fix errors in your code
- Practice clean code formatting habits

## Requirements

### Task 1: Validate Your HTML
Visit the [W3C HTML Validator](https://validator.w3.org/) and check each of your HTML files.

**How to validate:**
1. Go to https://validator.w3.org/
2. Choose "Validate by Direct Input"
3. Copy-paste your HTML code into the text box
4. Click "Check"
5. Review the errors and warnings

**You must validate these files:**
- `project/index.html`
- `project/pages/about.html`
- `project/pages/contact.html`
- `project/pages/schedule.html`
- `project/pages/media.html`

**Fix ALL errors found.** Common issues:
- Missing `alt` attributes on images
- Unclosed tags (like `<p>` without `</p>`)
- Missing `lang` attribute on `<html>` tag
- Duplicate `id` values
- Incorrect nesting of elements

### Task 2: Validate Your CSS
Visit the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) and check your stylesheet.

**How to validate:**
1. Go to https://jigsaw.w3.org/css-validator/
2. Choose "By direct input"
3. Copy-paste your CSS code
4. Click "Check"
5. Fix all errors

**Common CSS errors:**
- Misspelled property names
- Missing semicolons
- Invalid property values
- Unknown properties

### Task 3: Clean Up Code Formatting
Reformat your HTML and CSS files to follow best practices.

**HTML formatting rules:**
- Use 2-space indentation (not tabs, not 4 spaces)
- Each element on its own line when it has children
- Self-closing tags like `<img>` and `<br>` should be on their own line
- Add comments to separate sections: `<!-- Navigation -->`, `<!-- Main Content -->`

**CSS formatting rules:**
- One property per line
- Opening brace on the same line as the selector
- Closing brace on its own line
- Add blank lines between different selectors
- Group related rules together
- Add comments for sections: `/* Header Styles */`, `/* Navigation */`

**Example of clean HTML:**
```html
<!-- Header Section -->
<header>
  <h1>Club Name</h1>
</header>

<!-- Navigation -->
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
  </ul>
</nav>
```

**Example of clean CSS:**
```css
/* Header Styles */
header {
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  text-align: center;
}

/* Navigation */
nav {
  background-color: #34495e;
}
```

**Files to clean up:**
- All HTML files in `project/`
- `project/css/style.css`

## Submission Guide
- Add changes: `git add project/`
- Commit: `git commit -m "HW11: Validate HTML/CSS and clean up code"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| HTML validation | 3 | Zero errors on W3C validator |
| CSS validation | 3 | Zero errors on W3C validator |
| HTML formatting | 2 | Proper indentation, comments, structure |
| CSS formatting | 2 | Clean formatting with comments |
| **Total** | **10** | |

## Tips
- Validation errors are normal — even professionals make mistakes
- Fix errors one file at a time and re-validate after each fix
- Clean code is easier to read, debug, and maintain

## Example Output
All your HTML files should pass W3C validation with zero errors. Your CSS file should also pass validation. The code should look neat and organized with proper indentation and helpful comments.
