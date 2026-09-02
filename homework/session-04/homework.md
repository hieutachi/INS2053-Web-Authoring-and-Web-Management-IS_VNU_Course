# Homework 4: Styling with External CSS

## Due Date
Sunday, 23:59 (Week 5)

## Objective
- Create an external CSS stylesheet
- Learn CSS selectors, properties, and values
- Apply colors, fonts, and spacing to your pages

## Requirements

### Task 1: Create Your External CSS File
Create a CSS file and link it to your About page.

**Create the file:** `project/css/style.css`

**Link it in your HTML:** Add this line in the `<head>` of `project/pages/about.html`:
```html
<link rel="stylesheet" href="../css/style.css">
```

### Task 2: Style the About Page
Write CSS rules to make your About page look visually appealing.

**Your CSS must include:**

1. **Body styling:**
   - Set a background color (choose a light, readable color)
   - Set a text color that contrasts well with the background
   - Set a default font family (e.g., Arial, Verdana, or sans-serif)
   - Set font size for the body

2. **Heading styles:**
   - Style `h1` with a specific color and larger font size
   - Style `h2` with a different color
   - Style `h3` with yet another color or style

3. **Paragraph styling:**
   - Set line height (e.g., 1.6 or 1.8)
   - Add margin or padding for spacing

4. **Image styling:**
   - Set a maximum width so images don't overflow
   - Add a border or border-radius for visual appeal
   - Add some padding or margin around images

5. **List styling:**
   - Style at least one list type (ul or ol)
   - Maybe change the list-style or add padding

**File paths:**
- `project/css/style.css` (new CSS file)
- `project/pages/about.html` (updated with CSS link)

**Requirements checklist:**
- [ ] External CSS file exists at `project/css/style.css`
- [ ] CSS is linked to `about.html`
- [ ] Body has background color and font settings
- [ ] All 3 heading levels have distinct styles
- [ ] Paragraphs have readable line height
- [ ] Images have max-width and some styling
- [ ] At least one list is styled

## Submission Guide
- Add changes: `git add project/css/style.css project/pages/about.html`
- Commit: `git commit -m "HW4: Add external CSS and style About page"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| CSS file | 2 | File exists and is linked correctly |
| Colors | 2 | Background, text, and heading colors are set |
| Typography | 2 | Font family, sizes, line height are defined |
| Spacing | 2 | Margins, padding, and line height improve readability |
| Image styling | 1 | Images are sized and styled properly |
| Overall look | 1 | Page looks clean and professional |
| **Total** | **10** | |

## Tips
- Use relative path `../css/style.css` in the HTML link (because about.html is in `pages/`)
- Pick colors that look good together (try a color palette site like coolors.co)
- Test your page in the browser after each CSS change to see the effect

## Example Output
Your About page should transform from plain black-and-white text to a colorful, well-spaced page with styled headings, readable paragraphs, and nicely framed images.
