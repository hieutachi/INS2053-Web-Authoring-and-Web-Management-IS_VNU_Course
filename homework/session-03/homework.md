# Homework 3: Building the About Page

## Due Date
Sunday, 23:59 (Week 4)

## Objective
- Practice using heading levels, paragraphs, and lists
- Learn how to add images with meaningful alt text
- Build rich content using semantic HTML elements

## Requirements

### Task 1: Enhance the About Page
Update your `project/about.html` file to make it a complete, rich content page about your Student Club.

**Your About page must include:**

1. **Headings:** Use at least 3 different heading levels:
   - `<h1>` for the club name
   - `<h2>` for section titles (e.g., "Our Mission", "Our Activities")
   - `<h3>` for sub-sections (e.g., "Weekly Events")

2. **Paragraphs:** At least 3 paragraphs covering:
   - What your club is about (purpose)
   - Who can join (membership)
   - Why someone should join (benefits)

3. **Lists:** At least 2 different lists:
   - An unordered list (`<ul>`) of at least 5 club activities or events
   - An ordered list (`<ol>`) of at least 3 steps (e.g., "How to Join")

4. **Images:** At least 2 images with descriptive alt text:
   - One image representing your club
   - One image showing an activity or event (can be any relevant photo)
   - Each `<img>` must have a meaningful `alt` attribute (not empty, not "image")

### Task 2: Add an Image Gallery Section
Create a section with the heading `<h2>Photo Gallery</h2>` that contains at least 3 images arranged in a simple layout.

- Each image must have a different `alt` text describing what it shows
- Add a short `<p>` caption below each image

**File path:** `project/about.html`

**Requirements checklist:**
- [ ] Uses h1, h2, and h3 headings
- [ ] Has 3+ paragraphs
- [ ] Has 1 unordered list with 5+ items
- [ ] Has 1 ordered list with 3+ items
- [ ] Has 2+ images with descriptive alt text
- [ ] Has a photo gallery section with 3+ images and captions

## Submission Guide
- Add changes: `git add project/about.html`
- Commit: `git commit -m "HW3: Enhance About page with rich content"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Heading hierarchy | 2 | Uses h1, h2, h3 correctly |
| Paragraphs | 2 | Has 3+ well-written paragraphs |
| Lists | 2 | Has both ordered and unordered lists |
| Images + alt text | 3 | Images load, alt text is descriptive |
| Photo gallery | 1 | Has gallery section with captions |
| **Total** | **10** | |

## Tips
- Headings should follow a logical order: don't skip from h1 to h3
- Alt text should describe what the image shows (e.g., "Students working together on a coding project")
- Use your own images or free images from sites like Unsplash or Pixabay
- Because `about.html` sits at the project root next to `index.html`, image paths are plain:
  `images/logo.png` — no `../`

## Example Output
Your About page should look like a detailed club profile with sections, lists of activities, and photos. A visitor should be able to learn everything about your club from this page alone.
