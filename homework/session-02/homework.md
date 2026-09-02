# Homework 2: Setting Up Your Project Folder

## Due Date
Sunday, 23:59 (Week 3)

## Objective
- Learn how to organize files in a proper project structure
- Understand file naming conventions for web projects
- Create your working project folder that you will use throughout the semester

## Requirements

### Task 1: Create the Project Folder Structure
Set up a clean folder structure for your Student Club Website project. This structure will be used for the rest of the course.

**Create the following folders and files:**
```
project/
  index.html
  pages/
    about.html
    contact.html
  images/
    (folder for your images)
  css/
    (folder for your stylesheets — leave empty for now)
```

**Naming rules you MUST follow:**
- All folder names: lowercase letters only, no spaces
- All file names: lowercase letters only, use hyphens (-) instead of spaces
- Example: `about-us.html` is correct, `About Us.html` is WRONG

**What each file should contain:**

1. `project/index.html` — A simple home page for your club website:
   - HTML5 structure
   - A welcome heading (`<h1>`) with your club name (make one up, e.g., "Coding Club" or "Book Lovers Club")
   - A short paragraph welcoming visitors
   - A list of 3 things your club does

2. `project/pages/about.html` — A simple about page:
   - HTML5 structure
   - A heading with "About [Club Name]"
   - A paragraph about the club (3-4 sentences)

3. `project/pages/contact.html` — A simple contact page:
   - HTML5 structure
   - A heading "Contact Us"
   - A paragraph with an email address (use a fake email)

### Task 2: Add at Least 2 Images
- Place at least 2 images in the `images/` folder
- Reference them from `index.html` using relative paths
- Every `<img>` tag must have an `alt` attribute

**File paths to verify:**
- `project/index.html`
- `project/pages/about.html`
- `project/pages/contact.html`
- `project/images/` (with at least 2 image files)

## Submission Guide
- Add all new files: `git add project/`
- Commit: `git commit -m "HW2: Set up project folder structure"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Folder structure | 3 | All folders exist with correct naming |
| index.html | 2 | Has club name, welcome text, list, images |
| about.html | 1 | Has heading and description paragraph |
| contact.html | 1 | Has heading and contact information |
| Image handling | 2 | 2+ images with alt text, correct relative paths |
| File naming | 1 | All lowercase, no spaces, correct conventions |
| **Total** | **10** | |

## Tips
- Always use relative paths like `images/photo.jpg` instead of full paths like `C:/Users/...`
- Double-check that every folder and file name uses only lowercase letters and hyphens
- Your `images/` folder must sit inside `project/` so paths work correctly

## Example Output
When you open `index.html` in a browser, you should see a club homepage with images and text. The about and contact pages should load correctly from the `pages/` folder.
