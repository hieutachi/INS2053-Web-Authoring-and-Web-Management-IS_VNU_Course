# Homework 10: Polish Your Compact Site

## Due Date
Sunday, 23:59 (Week 12)

## Objective
- Refine your website into a polished, professional-looking project
- Review and improve content quality across all pages
- Write a README file to document your project

## Requirements

### Task 1: Polish All Pages
Review your entire site and make improvements for a professional look.

**Go through each page and check:**
- Are there at least 3-5 pages total? (Home, About, Contact, Schedule, Media)
- Is the content well-written with no spelling/grammar errors?
- Are all images loading and properly sized?
- Do all navigation links work on every page?
- Is the layout consistent across all pages?
- Does the CSS look clean and professional?

**Improvements to make:**
- Fix any broken images or links
- Ensure consistent heading styles on every page
- Add smooth transitions or hover effects where appropriate
- Make sure the footer looks the same on every page

### Task 2: Add a Favicon
Add a small icon (favicon) to your website.

- Create or find a small square image (16x16 or 32x32 pixels)
- Save it as `favicon.ico` or `favicon.png` in the `images/` folder
- Add this link in the `<head>` of every HTML page:
  - For `index.html` (in project root):
```html
<link rel="icon" href="images/favicon.png" type="image/png">
```
  - For pages in the `pages/` folder:
```html
<link rel="icon" href="../images/favicon.png" type="image/png">
```

### Task 3: Write a README File
Create a README file that documents your project.

**Create the file:** `project/README.md`

**Your README must include:**
- Project title (your club name)
- A brief description of what the site is about (2-3 sentences)
- A list of pages in the site (e.g., Home, About, Contact, Schedule, Media)
- A list of technologies used (HTML5, CSS3, Google Fonts)
- Instructions on how to open the site locally
- Your name and student ID

**Example README:**
```markdown
# Student Club Website

A website for the [Club Name] at VNU-IS.

## Pages
- Home (index.html)
- About (pages/about.html)
- Contact (pages/contact.html)
- Schedule (pages/schedule.html)
- Media (pages/media.html)

## Technologies
- HTML5
- CSS3
- Google Fonts

## How to Run
Open `index.html` in any web browser.

## Author
[Your Name] - [Student ID]
```

**File paths:**
- `project/README.md` (new file)
- `project/index.html` (polish + favicon)
- `project/pages/about.html` (polish + favicon)
- `project/pages/contact.html` (polish + favicon)
- `project/pages/schedule.html` (polish + favicon)
- `project/pages/media.html` (polish + favicon)
- `project/css/style.css` (final polish)

## Submission Guide
- Add changes: `git add project/`
- Commit: `git commit -m "HW10: Polish site and add README"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Page count | 1 | Has 3-5 pages |
| Content quality | 2 | Well-written, no errors, good images |
| Navigation | 2 | All links work across all pages |
| Visual polish | 2 | Consistent, professional appearance |
| Favicon | 1 | Favicon shows in browser tab |
| README | 2 | Has all required sections |
| **Total** | **10** | |

## Tips
- Read your content aloud to catch spelling and grammar errors
- Open each page in the browser and click every link to test them
- A good README helps others understand your project

## Example Output
Your site should feel like a complete, finished product — clean, consistent, and professional. The browser tab should show your favicon. Anyone reading the README should understand what your project is about.
