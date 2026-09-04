# Homework 7: Typography with Google Fonts

## Due Date
Sunday, 23:59 (Week 8)

## Objective
- Import and use custom web fonts from Google Fonts
- Improve the overall typography of your mini-site
- Understand the impact of font choices on design

## Requirements

### Task 1: Choose and Add Google Fonts
Visit [Google Fonts](https://fonts.google.com/) and choose fonts for your site.

**Select fonts for:**
- Headings: Pick a bold, eye-catching font (e.g., Poppins, Montserrat, Playfair Display)
- Body text: Pick a clean, readable font (e.g., Open Sans, Lato, Roboto)

**Add Google Fonts to your pages:**
- Add the Google Fonts `<link>` tag in the `<head>` section of ALL three HTML pages:
```html
<link href="https://fonts.googleapis.com/css2?family=YourHeadingFont&family=YourBodyFont&display=swap" rel="stylesheet">
```
- Replace `YourHeadingFont` and `YourBodyFont` with your actual font choices

### Task 2: Apply Fonts in CSS
Update `project/css/style.css` to use your chosen fonts.

**Your CSS must include:**
- Set the heading font family (h1, h2, h3) to your heading font
- Set the body font family to your body font
- Add `font-weight` variations for visual hierarchy
- Set appropriate `letter-spacing` for headings (optional but nice)
- Ensure `line-height` is set to at least 1.6 for body text

**Example CSS:**
```css
body {
  font-family: 'Open Sans', sans-serif;
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: 'Poppins', sans-serif;
}

h1 {
  font-weight: 700;
  font-size: 2.5em;
}
```

### Task 3: Fine-Tune Typography
Make additional typography improvements across the mini-site:

- Adjust font sizes for h1, h2, h3 to create a clear visual hierarchy
- Style paragraph text for readability (line height, max-width for text blocks)
- Style links (change color, add hover effect with `a:hover`)
- Style list items for better spacing

**File paths:**
- `project/index.html` (add Google Fonts link)
- `project/about.html` (add Google Fonts link)
- `project/contact.html` (add Google Fonts link)
- `project/css/style.css` (update with font rules)

## Submission Guide
- Add changes: `git add project/`
- Commit: `git commit -m "HW7: Add Google Fonts and improve typography"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Google Fonts integration | 3 | Fonts load on all 3 pages |
| Font application | 2 | Headings and body use different fonts |
| Typography hierarchy | 2 | Clear size/weight differences between heading levels |
| Link styling | 2 | Links have custom colors and hover effects |
| Readability | 1 | Text is easy to read with good spacing |
| **Total** | **10** | |

## Tips
- Don't use more than 2-3 different fonts — it looks messy
- Make sure your heading font is different from your body font for contrast
- Test your page with a slow internet connection — Google Fonts need to download
- **Always write a fallback** after the web font: `font-family: 'Poppins', Verdana, sans-serif`. If the font cannot load, the browser uses the next one in the list.

> ⚠️ **This CDN link is for homework only.** The final capstone submission must work with the
> network switched off (`project/spec.md` §8) and both exams are offline. Before you submit
> the project, either download the font files into `project/css/fonts/` and use `@font-face`,
> or delete the `<link>` and keep a system font stack. Rely on the fallback, not the CDN.

## Example Output
Your mini-site should look significantly more polished with custom fonts. The headings should stand out with a distinctive style, and the body text should feel clean and easy to read. Links should change color when you hover over them.
