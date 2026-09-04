# Homework 6: Build Your 3-Page Mini-Site

## Due Date
Sunday, 23:59 (Week 7)

## Objective
- Connect all pages with a shared navigation menu
- Maintain consistent layout across multiple pages
- Create a working multi-page website

## Requirements

### Task 1: Add Navigation to All 3 Pages
Update all three pages (index.html, about.html, contact.html) so they share the same navigation structure and layout.

**Every page must have:**
- The same `<header>` with the club name
- The same `<nav>` with links to: Home, About, Contact
- The same `<footer>` with copyright info
- The same `<main>` wrapper for content
- The same CSS stylesheet linked

**Navigation links are identical on every page** — all three files sit at the project root,
so every link is a plain file name:

```html
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
```

Copy this same block into all three pages, changing only which link gets `class="active"`.
No `../` anywhere.

### Task 2: Complete the Contact Page
Build out the `project/contact.html` page with full content:

- A heading "Contact Us"
- A paragraph inviting visitors to reach out
- A list of contact methods (email, phone, social media — use fake info)
- A paragraph with the club's meeting location/address
- At least 1 image

### Task 3: Improve the Home Page
Update `project/index.html` with richer content:

- A welcome section with an intro paragraph
- A "What We Do" section with a list of activities
- A "Why Join Us?" section with 3 benefits
- At least 2 images
- A "Latest News" or "Upcoming Events" section

**File paths:**
- `project/index.html`
- `project/about.html`
- `project/contact.html`
- `project/css/style.css`

**Requirements checklist:**
- [ ] All 3 pages have the same header, nav, and footer
- [ ] Navigation links work correctly from every page
- [ ] Contact page has full content
- [ ] Home page has multiple sections
- [ ] CSS is linked on all pages
- [ ] Layout is consistent across all pages

## Submission Guide
- Add changes: `git add project/`
- Commit: `git commit -m "HW6: Complete 3-page mini-site with navigation"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Navigation links | 3 | All links work correctly on all 3 pages |
| Consistent layout | 2 | Same header, nav, footer on every page |
| Contact page content | 2 | Has all required content elements |
| Home page content | 2 | Has multiple sections and images |
| Overall consistency | 1 | Site feels unified and professional |
| **Total** | **10** | |

## Tips
- Every page sits at the project root, so links are plain file names — if you find yourself typing `../`, something is in the wrong folder
- Test every link by clicking on it in the browser
- If a link breaks, check the relative path carefully

## Example Output
You should have a 3-page website where you can click between Home, About, and Contact pages. Every page should feel like part of the same site with matching design.
