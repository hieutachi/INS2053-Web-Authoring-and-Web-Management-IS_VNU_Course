# 🟦 SESSION 11
# **Designing a Compact Site**

Hello again, friend! So far you have built several pages for your Student Club Website — a home page, about page, events page, gallery, media page, and contact page. But now comes an important question: *how do you make sure all these pages feel like one cohesive, well-organized website instead of a random pile of files?* In this session you will learn how to plan, structure, and polish a **compact site** — a small, focused website where every page has a clear purpose, navigation is simple, content is organized logically, and nothing is wasted. This is exactly the kind of site you will submit as your course project. Grab a notebook (yes, paper!) and let us plan before we code.

---

# 📌 SESSION INFORMATION

```
📅 Duration:     3 periods (150 minutes) — Theory ~60 min, Practice ~90 min
📚 Reference:    Web design fundamentals; Information Architecture basics (MDN)
🎯 Objectives:   1. Define what a "compact site" is and when it is the right choice
                 2. Draw a site map before writing any HTML
                 3. Group and organise content; remove redundancy (DRY)
                 4. Polish a 3-5 page site to a presentable standard
                 5. Write a project README that explains your own site
📖 Prepare:      1. Review all previous sessions
                 2. Have your club-website folder open in VS Code
                 3. Bring pen and paper for the planning exercise
🖼 Diagrams:     canvases/buoi-11.canvas.tsx — SiteMap, DryPrinciple, VisualHierarchy,
                 BriefToSpec
🔗 Outcomes:     CLO2 (analyse requirements for a business website)
                 CLO4 (design and build a web application)
                 CLO5 (evaluate, document, and present a web application)
```

---

# 🎯 LEARNING OBJECTIVES

By the end of this session you will be able to:

- Define what a "compact site" is and explain why compact design matters
- Plan a small website BEFORE writing any code using paper sketches and site maps
- Draw an ASCII/text site map showing page hierarchy and relationships
- Group related content into logical pages without overlap or redundancy
- Apply visual hierarchy principles (headings, spacing, contrast) to guide the reader
- Polish a 3-5 page website so it looks professional and consistent
- Write a clear README file documenting your project structure and decisions
- Audit your Student Club Website for consistency, broken links, and quality issues

---

# 📖 THEORY

## 1. What Is a "Compact Site"?

### 1.1 Definition

A **compact site** is a small website (typically 3-10 pages) that communicates its message clearly and efficiently. Every page serves a distinct purpose. Navigation is simple and predictable. Content is concise but complete. There is no filler, no duplication, and no confusion.

Think of it like a well-organized brochure: each panel covers one topic, the flow makes sense, and the reader can find what they need quickly.

### 🎒 Real-life example

Consider a local restaurant's website. It probably has: Home (welcome + hours), Menu, About Us, Reservations, and Contact. Five pages. Each page does ONE job. You never wonder "where do I find the menu?" because there is a big "Menu" button right there. That is a compact site done well.

Your Student Club Website is the same concept: Home, About, Events, Gallery, Media, Contact. Six pages. Each has a clear role.

### 1.2 Characteristics of a Good Compact Site

| Characteristic | Description | Bad Example | Good Example |
|---------------|-------------|-------------|--------------|
| **Clear purpose** | Every page answers "why does this exist?" | A page called "Stuff" with random content | An "Events" page listing upcoming activities |
| **Simple navigation** | User can reach any page in 1-2 clicks | Deep nested menus, hidden pages | Flat nav bar with 4-6 items |
| **Consistent design** | Same header, footer, fonts, colors on every page | Different styles on different pages | Shared CSS stylesheet applied everywhere |
| **No redundancy** | Information appears in ONE place only | Address on Home, About, AND Contact | Address only on Contact page |
| **Visual hierarchy** | Important things stand out; less important things recede | Everything the same size and color | Large headings, medium subheadings, smaller body text |
| **Fast loading** | Small images, minimal CSS, no unnecessary scripts | 5 MB hero images, 10 Google Fonts | Optimized images, 1-2 fonts, lean CSS |
| **Mobile-friendly** | Works on phones and tablets | Horizontal scrollbars, tiny text | Responsive layout, readable text at all sizes |

### 1.3 Why Compact Design Matters

1. **Your audience is busy.** Visitors spend seconds deciding whether to stay. Clear structure keeps them engaged.
2. **You are a beginner.** Managing 5 pages well is better than managing 20 pages poorly.
3. **Small sites load fast.** Speed matters for user experience AND search engine ranking.
4. **It is easier to maintain.** Fewer pages = fewer places for bugs to hide.
5. **It demonstrates mastery.** A polished 5-page site impresses more than a sloppy 20-page site.

⚠️ **Important notes**

- "Compact" does NOT mean "cramped." You still need whitespace, breathing room, and readability.
- "Compact" means **efficient** — every pixel earns its place.
- The goal is clarity, not cramming.

---

## 2. Site Planning: Think Before You Code

> 🖼 **Diagram:** `canvases/buoi-11.canvas.tsx` → `BriefToSpec` — slide `s11-clo2` ("Requirements Analysis (CLO2)")

### 2.1 The Planning Process

Professional web developers NEVER start coding immediately. They plan first. Here is the process:

```
STEP 1: Define Purpose
    "What is this site FOR? Who is the AUDIENCE?"
         │
         ▼
STEP 2: List Content
    "What information do we need to communicate?"
         │
         ▼
STEP 3: Group Content
    "Which pieces belong together on the same page?"
         │
         ▼
STEP 4: Create Site Map
    "How do pages relate to each other?"
         │
         ▼
STEP 5: Sketch Wireframes
    "What does each page LOOK like?"
         │
         ▼
STEP 6: Code
    Now (and only now) open VS Code
```

### 🎒 Real-life example

Before building the Student Club Website, you should have asked:
- **Purpose:** Showcase our club to attract new members
- **Audience:** Fellow students, faculty advisors, prospective members
- **Content needed:** Club description, member info, event calendar, photos, videos, contact details
- **Grouping:** Description → About page; Calendar → Events page; Photos → Gallery; Videos/Audio → Media; Contact form → Contact page

### 2.2 Defining Your Pages

For a compact student club site, here is a recommended page structure:

| Page | Purpose | Key Content |
|------|---------|-------------|
| **Home** (index.html) | Welcome + overview | Hero section, brief intro, highlights, call-to-action |
| **About** (about.html) | Who we are | Mission, history, team members, values |
| **Events** (events.html) | What we do | Upcoming events, past events, calendar |
| **Gallery** (gallery.html) | Visual showcase | Photo grid from events and activities |
| **Media** (media.html) | Multimedia content | Videos, audio, YouTube embeds |
| **Contact** (contact.html) | How to reach us | Form, email, social links, location |

⚠️ **Important notes**

- Keep it between 3-7 pages for a compact site. More than 10 and you are losing focus.
- Every page MUST be reachable from the main navigation. No orphan pages.
- Every page MUST link back to Home. Users should never get stuck.

### 🧪 Try It Yourself — Write the Brief Before the Code

**Task (7 min):** Answer seven questions about your capstone in one sitting.

1. Open a plain text file and answer these, one line each:
   - **Goal** — what should this site achieve?
   - **Audience** — who visits, and what do they want?
   - **Pages** — the list, each with one purpose.
   - **Functional requirements** — features: contact form, events table, photo gallery.
   - **Non-functional requirements** — mobile-friendly, accessible, fast, easy to update.
   - **Out of scope** — what you will deliberately *not* build.
   - **Success metric** — how you would know it worked.
2. Now compare your **Pages** list against your **Functional requirements**. Every feature must live on a named page.

**Expected result:** A one-page brief. Any feature with no page to live on, or any page with no purpose, is a gap you found before writing code.

<details>
<summary>The section students skip and later regret</summary>

**Out of scope.** Writing down what you will not build is what stops a four-page club site from acquiring a login system, a payment gateway, and a blog in week three.

It is also the section that protects you at marking time. "Online payment is out of scope" is a design decision. Payment silently missing is an incomplete project. Same code, different reading.

The other high-value line is **Success metric**. "A new member can find the meeting time in under ten seconds" is testable — hand your laptop to a classmate and time them. "Looks professional" is not testable, so it cannot guide any decision.

Do this on paper or in a text file, not in your head. Fifteen minutes of writing routinely saves a full session of rework.

</details>


---

## 3. Site Maps: Visualizing Your Structure

> 🖼 **Diagram:** `canvases/buoi-11.canvas.tsx` → `SiteMap` — slide `s11-sitemap` ("Site Maps")

### 3.1 Definition

A **site map** is a diagram showing all the pages in your website and how they connect. It is your blueprint before construction.

### 3.2 ASCII Site Map for Student Club Website

```
                    ┌─────────────┐
                    │   HOME      │
                    │ index.html  │
                    └──────┬──────┘
                           │
          ┌────────┬───────┼───────┬────────┬──────────┐
          │        │       │       │        │          │
     ┌────▼───┐ ┌──▼───┐ ┌▼────┐ ┌▼─────┐ ┌▼──────┐ ┌▼────────┐
     │ ABOUT  │ │EVENTS│ │GALL │ │MEDIA │ │CONTCT │ │ (future │
     │about   │ │events│ │gall │ │media │ │contact│ │  pages) │
     │.html   │ │.html │ │.html│ │.html │ │.html  │ │         │
     └────────┘ └──────┘ └─────┘ └──────┘ └───────┘ └─────────┘
```

Key observations from this map:
- **Flat hierarchy:** All pages are ONE level deep (no sub-pages). This is ideal for compact sites.
- **Home is the hub:** Every page connects back to Home.
- **Maximum 6 pages:** Manageable scope for a student project.
- **Each page has a unique filename:** No ambiguity.

### 3.3 Site Map Rules

1. **Every page must appear in the site map.** If it is not in the map, it should not exist.
2. **Every page must be reachable from Home** within 1-2 clicks.
3. **No dead ends.** Every page should link back to Home at minimum.
4. **No orphan pages.** A page with no incoming links is invisible to users.
5. **Label each node** with both the page name AND the filename.

### 3.4 Deeper Hierarchy (If Needed)

If your site grows beyond ~7 pages, you might need sub-pages:

```
                    ┌─────────────┐
                    │   HOME      │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         ┌────▼───┐  ┌────▼───┐  ┌────▼────┐
         │ ABOUT  │  │ EVENTS │  │ CONTACT │
         └────┬───┘  └────┬───┘  └─────────┘
              │           │
         ┌────▼───┐  ┌───▼────┐  ┌──────────┐
         │ TEAM   │  │WORKSHPS│  │COMPETITNS│
         │team    │  │workshps│  │competitns│
         │.html   │  │.html   │  │.html     │
         └────────┘  └────────┘  └──────────┘
```

But for INS2053, stick with the flat structure unless your instructor says otherwise.

### 🧪 Try It Yourself — Draw the Site Map, Then Count the Clicks

**Task (6 min):** Check that nothing on your site is buried.

1. Draw your pages as boxes, with Home at the top and arrows for every link.
2. For each page, count the minimum clicks from Home.
3. Mark any page reachable only from one other page.
4. Now check the reverse: from your deepest page, can you get back to Home in one click?

**Expected result:** Every page is two clicks or fewer from Home, and every page links back to Home. A four-page club site should be entirely flat — one click each.

<details>
<summary>What the map tells you that the folder tree does not</summary>

The folder tree shows where files *live*. The site map shows how visitors *move*. They are different, and confusing them is how pages get orphaned.

Two things to look for on your drawing:

**Dead ends.** A page you can reach but not leave, except with the Back button. The fix is the shared nav on every page — which is exactly why it is worth duplicating.

**Orphans.** A file that exists but nothing links to it. Nobody will ever find it. Search your HTML for the file name; if the only occurrence is the file itself, it is an orphan.

The three-click rule is the usual guideline: any content within three clicks of the entry point. For a compact site it should be one. If something needs four, your grouping is wrong — the content probably belongs on an existing page rather than a new one.

</details>


---

## 4. Grouping Content and Avoiding Redundancy

> 🖼 **Diagram:** `canvases/buoi-11.canvas.tsx` → `DryPrinciple` — slide `s11-dry` ("DRY — Don't Repeat Yourself")

### 4.1 The Principle of Single Responsibility

Each page should have **ONE primary purpose**. Ask yourself: "If a visitor lands on this page, what is the ONE thing they should learn or do?"

| Page | ONE Primary Purpose | Should NOT Include |
|------|-------------------|-------------------|
| Home | Welcome + direct visitors to the right page | Full event details, full member bios |
| About | Tell the club's story and introduce the team | Event dates, photo galleries |
| Events | List upcoming and past events with details | Club history, contact forms |
| Gallery | Show photos in a visual grid | Long text descriptions, video players |
| Media | Present video and audio content | Static photos, event listings |
| Contact | Provide ways to get in touch | Club history, event calendars |

### 4.2 Identifying and Eliminating Redundancy

**Redundancy** means the same information appearing on multiple pages. This causes problems:

- **Maintenance nightmare:** If the club email changes, you have to update it in 5 places instead of 1.
- **Inconsistency risk:** You might update one copy but forget another, creating conflicting information.
- **User confusion:** "I saw different dates on two different pages — which is correct?"

❌ **Redundant (BAD):**
```
Home page: "Contact us at club@university.edu"
About page: "Email us at club@university.edu"
Events page: "Questions? Email club@university.edu"
Contact page: "club@university.edu"
```

✅ **Non-redundant (GOOD):**
```
Home page: "Get in touch → [link to Contact]"
About page: "Have questions? Visit our Contact page."
Events page: "For registration, see Contact page."
Contact page: "Email: club@university.edu" ← ONE canonical location
```

### 4.3 Cross-Linking Instead of Repeating

When Page A needs to reference content that belongs on Page B, **link to Page B** instead of copying the content:

```html
<!-- On the Events page -->
<p>Want to see photos from past events?
   Visit our <a href="gallery.html">Photo Gallery</a>.</p>

<!-- On the Home page -->
<p>We have exciting events coming up!
   Check the <a href="events.html">Events page</a> for details.</p>
```

This keeps content DRY (Don't Repeat Yourself) while still guiding users to where they need to go.

### 🧪 Try It Yourself — Find the Duplication

**Task (6 min):** Audit your own site for content that exists twice.

1. List every page and write down what appears on each: nav, footer, contact details, opening hours, the club's mission statement.
2. Mark anything that appears on more than one page.
3. For each duplicate, decide: should this be identical everywhere, or does it belong on exactly one page?
4. Fix the worst case — the one where two copies have already drifted apart.

**Expected result:** The nav and footer *should* be duplicated (identically). Substantive content should not be. Most students find the contact email in three places with two different values.

<details>
<summary>The distinction that matters</summary>

Duplication is not automatically wrong. It becomes wrong when the copies can disagree.

- **Site furniture** — nav and footer. Repeated on every page by necessity, and must be identical. Copy them deliberately and update all pages together.
- **Content** — the mission statement, the meeting time, the contact address. This should live in exactly one place, with links pointing to it.

The failure mode is always the same: you change the meeting room on the Home page, forget the About page, and now the site contradicts itself. A visitor who trusts the wrong page turns up at the wrong room.

A static site has no templating, so the practical discipline is:

1. Keep a list of what is repeated.
2. When you change a repeated item, use **Ctrl+Shift+F** in VS Code to find every occurrence before you save.
3. For anything longer than a line, prefer one canonical page plus links: "See the [full schedule](pages/events.html)."

</details>


---

## 5. Visual Hierarchy and Polishing

> 🖼 **Diagram:** `canvases/buoi-11.canvas.tsx` → `VisualHierarchy` — slide `s11-hierarchy` ("Visual Hierarchy")

### 5.1 What Is Visual Hierarchy?

**Visual hierarchy** is the arrangement of elements so that the most important things catch the eye first. You control hierarchy through:

1. **Size:** Larger = more important
2. **Color/Contrast:** Bold colors draw attention; muted colors recede
3. **Spacing:** Whitespace around an element gives it emphasis
4. **Position:** Top-left gets noticed first (in left-to-right reading cultures)
5. **Typography weight:** Bold > Regular > Light

### 🎒 Real-life example

Look at any newspaper front page. The headline is HUGE and bold. The subheadline is smaller. The body text is even smaller. Your eye naturally flows from headline → subheadline → body. That is visual hierarchy.

### 5.2 Applying Hierarchy to Your Site

```css
/* STRONG HIERARCHY */
h1 {
    font-size: 36px;       /* Largest — page title */
    font-weight: 700;
    color: #1a5276;        /* Dark, authoritative */
    margin-bottom: 10px;
}

h2 {
    font-size: 26px;       /* Medium — section titles */
    font-weight: 600;
    color: #2874a6;
    margin-top: 30px;
    margin-bottom: 15px;
}

h3 {
    font-size: 20px;       /* Smaller — subsection titles */
    font-weight: 600;
    color: #333;
    margin-top: 20px;
}

p {
    font-size: 16px;       /* Base reading size */
    line-height: 1.6;      /* Comfortable reading */
    color: #444;           /* Slightly softer than headings */
    margin-bottom: 15px;
}

.caption {
    font-size: 13px;       /* Smallest — supplementary info */
    color: #888;           /* Muted color */
    font-style: italic;
}
```

The visual flow:
```
H1 (biggest, darkest)        ← User sees this FIRST
    │
    ▼
H2 (medium, medium-dark)     ← Then scans sections
    │
    ▼
H3 (smaller)                 ← Then reads subsections
    │
    ▼
P (base size, comfortable)   ← Then reads body text
    │
    ▼
Caption (smallest, muted)    ← Notices details last
```

### 5.3 Polishing Checklist

Before submitting your compact site, run through this checklist:

| Area | Check |
|------|-------|
| **Navigation** | Same nav bar on every page? Links work? Active page highlighted? |
| **Consistency** | Same fonts, colors, spacing across all pages? Shared CSS file? |
| **Headings** | One `<h1>` per page? Logical h2→h3 nesting? No skipped levels? |
| **Images** | All have `alt` text? Optimized file sizes? Correct paths? |
| **Links** | No broken links? External links open correctly? Email links use `mailto:`? |
| **Text** | No lorem ipsum placeholder text? No spelling errors? Readable font size? |
| **Meta tags** | `<meta charset="UTF-8">` present? Viewport meta tag present? Title tags descriptive? |
| **Validation** | HTML validates at validator.w3.org? CSS validates at jigsaw.w3.org/css-validator? |
| **Responsiveness** | Tested at desktop, tablet, and mobile widths? No horizontal scrollbar? |
| **File organization** | Files in proper folders (css/, images/, video/, audio/)? No stray files? |
| **README** | Project documented with description, file list, and instructions? |

---

## 6. Writing a Project README

### 6.1 Why Write a README?

A README file tells anyone who opens your project:
- What the project IS
- How to VIEW/RUN it
- What FILES are included
- What TECHNOLOGIES were used
- Any SPECIAL NOTES or credits

Even if your instructor does not require one, writing a README is a professional habit that employers value.

### 6.2 README Template for Student Club Website

```markdown
# Student Club Website

A multi-page website for the VNU-IS Student Club, built as the course
project for INS2053 — Web Authoring and Web Management.

## How to View

1. Open `index.html` in any modern web browser (Chrome, Firefox, Edge).
2. Navigate using the top menu bar.
3. No server required — all files are static HTML/CSS.

## File Structure

club-website/
├── index.html          ← Home page
├── about.html          ← About Us page
├── events.html         ← Events page
├── gallery.html        ← Photo Gallery page
├── media.html          ← Media Center (video/audio)
├── contact.html        ← Contact page
├── css/
│   └── style.css       ← Main stylesheet (shared by all pages)
├── images/
│   ├── logo.png        ← Club logo
│   ├── hero.jpg        ← Home page hero image
│   ├── gallery-*.jpg   ← Gallery photos
│   └── video-poster.jpg← Video thumbnail
├── video/
│   └── club-promo.mp4  ← Promotional video
├── audio/
│   └── club-anthem.mp3 ← Club anthem audio
└── README.md           ← This file

## Technologies Used

- HTML5 (semantic elements, multimedia)
- CSS3 (Flexbox, responsive design, media queries)
- Google Fonts (Montserrat, Open Sans)
- No JavaScript frameworks (pure HTML/CSS)

## Design Decisions

- Color scheme: Navy blue (#1a5276) and white for professionalism
- Font pairing: Montserrat (headings) + Open Sans (body)
- Responsive: Stacks to single column below 768px
- Navigation: Flat structure, 6 pages, consistent across all pages

## Author

[Your Name] — INS2053, Semester X, 2024
```

### 6.3 README Best Practices

- Keep it concise (under 100 lines for a small project)
- Use plain language — assume the reader is not a developer
- Include the file structure tree (use `tree` command or type manually)
- Mention HOW to view the site (most common question)
- Credit any free resources used (images, fonts, sample media)

---

## ✅ Best Practices

1. **Plan before coding.** Spend at least 30 minutes sketching your site map and grouping content on paper before touching VS Code.

2. **Keep navigation flat.** For a compact site, all pages should be accessible from a single-level navigation bar. No dropdowns-within-dropdowns.

3. **One purpose per page.** If a page tries to do three things, split it into three pages or remove two of those things.

4. **DRY (Don't Repeat Yourself).** Each piece of information lives in ONE canonical location. Other pages LINK to it.

5. **Use consistent templates.** Copy your HTML skeleton (header, nav, footer) identically across all pages. Only change the `<main>` content and the `<title>`.

6. **Optimize assets.** Compress images (use https://tinypng.com/), compress videos (use HandBrake), minify CSS when ready to deploy.

7. **Test navigation thoroughly.** Click EVERY link on EVERY page. Broken links destroy credibility instantly.

8. **Validate before submitting.** Run your HTML through https://validator.w3.org/ and your CSS through https://jigsaw.w3.org/css-validator/. Fix all errors.

9. **Write a README.** Document your project structure, technologies, and how to view it.

10. **Get feedback.** Show your site to a friend who has never seen it. Ask: "Can you find the events page? Can you contact us?" Their confusion reveals your design flaws.

---

## ❌ Common Mistakes

### Mistake 1: Starting to code without a plan

❌ **Wrong:** Opening VS Code and creating `page1.html`, `page2.html`, `page3.html` with no idea what goes where.

✅ **Correct:** Drawing a site map on paper first. Deciding page names, purposes, and content groupings BEFORE writing a single line of HTML.

### Mistake 2: Too many pages

❌ **Wrong:** Creating 15 pages for a student club site (History, Mission, Vision, Team, Advisors, Alumni, Workshops, Social Events, Competitions, Newsletter, Blog, FAQ, Sponsors, Partners, Downloads).

✅ **Correct:** Consolidating into 5-6 focused pages. Put workshops/social/competitions under one Events page. Put mission/vision/history under About. Link to external platforms for newsletters and blogs.

### Mistake 3: Inconsistent navigation

❌ **Wrong:**
```
Page 1 nav: Home | About | Events | Contact
Page 2 nav: Home | About Us | Gallery | Contact Us
Page 3 nav: Main | Info | Pics | Reach Us
```

✅ **Correct:**
```
ALL pages: Home | About Us | Events | Gallery | Media | Contact
(Same labels, same order, same links, every page)
```

### Mistake 4: Orphan pages

❌ **Wrong:** Creating `awards.html` but forgetting to add it to the navigation bar. Nobody can find it.

✅ **Correct:** Every page appears in the site map AND in the navigation bar. If it is not worth linking to, it is not worth creating.

### Mistake 5: Duplicate content across pages

❌ **Wrong:** Pasting the full club description on Home, About, AND Events pages.

✅ **Correct:** Full description on About page only. Home has a 2-sentence summary with a "Learn more →" link to About.

### Mistake 6: No visual hierarchy

❌ **Wrong:** All text is 16px, same color, same weight. The page looks like a wall of text.

✅ **Correct:** H1 at 36px dark blue, H2 at 26px medium blue, body at 16px dark gray, captions at 13px light gray. Clear visual flow.

### Mistake 7: Submitting without testing

❌ **Wrong:** Zipping the folder and submitting without checking links, images, or responsiveness.

✅ **Correct:** Testing every link, viewing at multiple screen sizes, validating HTML/CSS, and having someone else test it too.

### 🧪 Try It Yourself — Write the README a Marker Will Read

**Task (7 min):** Document your project in the file that gets opened first.

1. Create `README.md` in your project root.
2. Write these six sections, one or two lines each:
   ```markdown
   # Student Web Club Website

   ## What this is
   A four-page site for the VNU Student Web Club, built for INS2053.

   ## Pages
   - `index.html` — home, upcoming events
   - `pages/about.html` — who we are
   - `pages/events.html` — full schedule table
   - `pages/contact.html` — contact form

   ## How to run it
   Open `index.html` in any browser. No build step or server required.

   ## Built with
   Hand-written HTML5 and CSS3. No frameworks.

   ## Known limitations
   The contact form has no backend; submissions are not stored.

   ## Author
   [Your name], [student ID]
   ```
3. Open it in VS Code and press **Ctrl+Shift+V** to preview the rendered Markdown.

**Expected result:** A formatted document with headings and a bulleted list. GitHub renders this automatically on the repository home page.

<details>
<summary>Why "known limitations" earns marks rather than losing them</summary>

Students routinely omit it, fearing it draws attention to what is missing. It does the opposite: it shows you know the difference between a bug you missed and a boundary you chose.

"The contact form has no backend" tells a marker you understand that HTML alone cannot store a submission — which is a *correct* observation about the technology, not an admission of failure. Silence on the point leaves them wondering whether you noticed.

Keep "How to run it" literal, too. "Open `index.html` in a browser" is the whole instruction for a static site. If a reader has to guess the entry point, the README has failed at its one job.

</details>


---

# 📋 THEORY SUMMARY

| Concept | Definition | Example |
|---------|-----------|---------|
| Compact site | Small (3-10 pages), focused, efficient website | Student Club Website with 6 pages |
| Site map | Diagram showing all pages and their connections | ASCII tree of page hierarchy |
| Flat hierarchy | All pages at the same level, no deep nesting | Home → About, Events, Gallery, Media, Contact |
| Single responsibility | Each page has ONE primary purpose | Events page = events only, not bios or history |
| DRY principle | Don't Repeat Yourself — one canonical location per fact | Email address only on Contact page |
| Cross-linking | Link to content on other pages instead of duplicating | "See our Gallery" link on Events page |
| Visual hierarchy | Arrange elements so importance is visually obvious | H1 > H2 > H3 > P > Caption in size/weight/color |
| Polishing | Final review pass for consistency, quality, and completeness | Navigation check, validation, responsiveness test |
| README | Documentation file explaining the project | Markdown file with structure, tech stack, instructions |
| Wireframe | Low-fidelity sketch of page layout | Paper drawing showing header/nav/content/sidebar/footer |
| Consistent template | Same header/nav/footer structure on every page | Copy-paste skeleton, change only `<main>` content |

---

# 💡 WORKED EXAMPLES

## Example 1: Creating a Site Map for Your Project

**Situation:** You are starting a new compact site for a university coding club. You need to decide what pages to include before writing any code.

**Step 1 — List all possible content:**
- Club description and mission
- Member profiles and leadership team
- Weekly meeting schedule
- Upcoming hackathons and workshops
- Photos from past events
- Tutorial videos and recordings
- Sponsor logos
- Contact form and social media links
- Application form for new members
- Blog posts and announcements

**Step 2 — Group into pages:**

| Group | Page Name | Filename | Content Included |
|-------|-----------|----------|-----------------|
| Welcome + overview | Home | index.html | Brief intro, highlights, links to other pages |
| Identity | About | about.html | Mission, team, sponsors |
| Activities | Events | events.html | Meetings, hackathons, workshops, schedule |
| Visuals | Gallery | gallery.html | Event photos |
| Multimedia | Media | media.html | Tutorial videos, recordings |
| Communication | Contact | contact.html | Form, email, social links, join application |

Note: "Blog posts" were excluded — too much maintenance for a compact site. Link to a Facebook page or Medium blog instead. "Application form" goes on Contact page as a link or embedded form.

**Step 3 — Draw the site map:**

```
                    ┌─────────────┐
                    │   HOME      │
                    │ index.html  │
                    └──────┬──────┘
                           │
          ┌────────┬───────┼───────┬────────┐
          │        │       │       │        │
     ┌────▼───┐ ┌──▼───┐ ┌▼────┐ ┌▼─────┐ ┌▼────────┐
     │ ABOUT  │ │EVENTS│ │GALL │ │MEDIA │ │ CONTACT │
     │about   │ │events│ │gall │ │media │ │ contact │
     │.html   │ │.html │ │.html│ │.html │ │ .html   │
     └────────┘ └──────┘ └─────┘ └──────┘ └─────────┘
```

**Result:** A clear 6-page flat structure. Every page has a defined purpose. No redundancy. Ready to code.

---

## Example 2: Eliminating Redundancy

**Situation:** Your Student Club Website currently has the club email address on four different pages. You want to fix this.

**BEFORE (redundant):**

On `index.html`:
```html
<p>Contact us at club@university.edu for more information.</p>
```

On `about.html`:
```html
<p>Email: club@university.edu</p>
```

On `events.html`:
```html
<p>For registration, email club@university.edu</p>
```

On `contact.html`:
```html
<p>Email: club@university.edu</p>
```

**AFTER (DRY):**

On `index.html`:
```html
<p>Have questions? <a href="contact.html">Get in touch</a> with us!</p>
```

On `about.html`:
```html
<p>Want to reach us? Visit our <a href="contact.html">Contact page</a>.</p>
```

On `events.html`:
```html
<p>For registration details, please <a href="contact.html">contact us</a>.</p>
```

On `contact.html`:
```html
<p>Email: <a href="mailto:club@university.edu">club@university.edu</a></p>
```

**Line-by-line explanation:**

| Change | Reason |
|--------|--------|
| Removed raw email from Home, About, Events | Email now lives ONLY on Contact page |
| Added `<a href="contact.html">` links | Directs users to the canonical location |
| Kept `mailto:` link only on Contact page | If the email changes, you update ONE file |
| Used descriptive link text ("Get in touch", "contact us") | Better for accessibility and SEO than "click here" |

**Result:** If the club email changes to `studentclub@vnuis.edu.vn`, you edit ONE file (`contact.html`) instead of four.

---

## Example 3: Polishing — Adding Visual Hierarchy

**Situation:** Your About page looks flat and boring. All text is the same size. You want to add visual hierarchy.

**BEFORE (flat, no hierarchy):**
```html
<h2>About Us</h2>
<p>The Student Club was founded in 2018. We are a community of passionate
students who love technology. Our mission is to help students learn web
development through hands-on projects. We meet every Wednesday at 5pm in
Room 301. Our team includes 5 officers and over 50 active members.</p>
```

**AFTER (clear hierarchy):**
```html
<h2>About Us</h2>

<h3>Our Mission</h3>
<p>We empower students to become confident web developers through
hands-on projects, peer learning, and real-world experience.</p>

<h3>Our Story</h3>
<p>Founded in 2018, the Student Club started with just 5 members
and a shared passion for web technology. Today, we have grown to
over 50 active members who meet every Wednesday at 5pm in Room 301.</p>

<h3>Leadership Team</h3>
<ul>
    <li><strong>President:</strong> Nguyen Van A</li>
    <li><strong>Vice President:</strong> Tran Thi B</li>
    <li><strong>Secretary:</strong> Le Van C</li>
    <li><strong>Treasurer:</strong> Pham Thi D</li>
    <li><strong>Technical Lead:</strong> Hoang Van E</li>
</ul>
```

**Why this is better:**

| Aspect | Before | After |
|--------|--------|-------|
| Scannability | Must read entire paragraph to find info | Headings let users jump to relevant section |
| Organization | Everything jumbled together | Logical sections: Mission, Story, Team |
| Visual variety | Wall of text | Mix of paragraphs and lists |
| Readability | Dense, intimidating | Bite-sized chunks, easy to digest |

**Result:** A visitor who only cares about meeting times can scan to "Our Story" in seconds. Someone interested in joining can jump straight to "Leadership Team." The page breathes.

---

## Example 4: Writing a README

**Situation:** You are preparing to submit your Student Club Website project. You need to create a README.md file.

**Code (README.md):**
```markdown
# Student Club Website

A responsive, multi-page website for the VNU-IS Student Club.
Built as the capstone project for INS2053 — Web Authoring and
Web Management (Fall 2024).

## Quick Start

Open `index.html` in Chrome, Firefox, or Edge. No server needed.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | index.html | Welcome page with hero image and highlights |
| About | about.html | Club mission, history, and leadership team |
| Events | events.html | Upcoming and past events with details |
| Gallery | gallery.html | Photo grid from club activities |
| Media | media.html | Promo video, YouTube embed, club anthem audio |
| Contact | contact.html | Contact form, email, social media links |

## Tech Stack

- HTML5 semantic markup
- CSS3 (Flexbox, Grid, media queries)
- Google Fonts: Montserrat + Open Sans
- No JavaScript frameworks

## Folder Structure

club-website/
├── index.html
├── about.html
├── events.html
├── gallery.html
├── media.html
├── contact.html
├── css/style.css
├── images/ (logo, hero, gallery photos, poster)
├── video/ (club-promo.mp4)
├── audio/ (club-anthem.mp3)
└── README.md

## Credits

- Sample video: sample-videos.com
- Sample audio: soundhelix.com
- Icons: Font Awesome (free tier)
- Fonts: Google Fonts (open source)

## Author

Nguyen Van Sinh Vien — Student ID: 2024XXXXX
INS2053, Fall 2024, VNU-IS
```

**Line-by-line explanation:**

| Section | Purpose |
|---------|---------|
| Title + description | Tells the reader WHAT this project is |
| Quick Start | Answers "how do I view this?" in one sentence |
| Pages table | Shows the complete site structure at a glance |
| Tech Stack | Lists technologies used (helpful for grading) |
| Folder Structure | Shows file organization (demonstrates good practices) |
| Credits | Acknowledges free resources (academic honesty) |
| Author | Identifies the student and course context |

**Result:** Anyone opening this project folder immediately understands what it is, how to use it, and who made it. Professional and complete.

---

# 🛠️ HANDS-ON PRACTICE

## Setup

1. Open your **club-website** folder in VS Code.
2. Make sure you have all pages from previous sessions: `index.html`, `about.html`, `events.html`, `gallery.html`, `media.html`, `contact.html`.
3. Have a pen and paper (or digital note app) ready for planning.
4. Open your browser's Developer Tools (F12) for testing.

---

### TASK 1: Draw Your Site Map

🎯 **Goal:** Create a visual site map for your current Student Club Website.

🔧 **Steps:**

1. On paper (or in a text file), list ALL pages you currently have.
2. For each page, write its PRIMARY PURPOSE in one sentence.
3. Draw the site map using ASCII art:

```
                    ┌─────────────┐
                    │   HOME      │
                    │ index.html  │
                    └──────┬──────┘
                           │
          ┌────────┬───────┼───────┬────────┐
          │        │       │       │        │
     ┌────▼───┐ ┌──▼───┐ ┌▼────┐ ┌▼─────┐ ┌▼────────┐
     │ ABOUT  │ │EVENTS│ │GALL │ │MEDIA │ │ CONTACT │
     └────────┘ └──────┘ └─────┘ └──────┘ └─────────┘
```

4. Verify:
   - Every page appears in the map
   - Every page is reachable from Home
   - No orphan pages exist
   - Maximum 7 pages

5. Below the map, write a one-sentence purpose for each page:
   ```
   Home: Welcome visitors and direct them to specific pages
   About: Tell the club's story and introduce the team
   Events: List upcoming activities with dates and details
   Gallery: Showcase photos from club activities
   Media: Present video and audio content
   Contact: Provide ways to get in touch
   ```

✅ **Check:** Your site map is complete and matches your actual files. Every page has a clear, unique purpose.

💾 **Save** your site map as `sitemap.txt` in your project folder (optional but recommended).

---

### TASK 2: Audit for Redundancy

🎯 **Goal:** Find and eliminate duplicate content across your pages.

🔧 **Steps:**

1. Open ALL your HTML files in VS Code.
2. Search for repeated content. In VS Code, use **Ctrl+Shift+F** (Find in Files) and search for:
   - Your club email address
   - Your club phone number
   - Your meeting location/address
   - The club description paragraph
   - Any other factual content that appears on multiple pages

3. For each piece of duplicated content:
   - Decide which page is the CANONICAL location (the one place it should live)
   - Replace duplicates on other pages with LINKS to the canonical page

4. Example fixes:
   ```html
   <!-- BEFORE: Email on Events page -->
   <p>Email: club@university.edu</p>

   <!-- AFTER: Link to Contact page -->
   <p>For inquiries, <a href="contact.html">contact us</a>.</p>
   ```

5. Save all modified files.

✅ **Check:** Search again for the duplicated content. It should now appear in only ONE file. All other pages link to that file.

💾 **Save** all changes.

---

### TASK 3: Standardize Navigation Across All Pages

🎯 **Goal:** Ensure identical navigation on every page.

🔧 **Steps:**

1. Choose your final navigation order. Recommended:
   ```
   Home | About Us | Events | Gallery | Media | Contact
   ```

2. Create the canonical navigation HTML block:
   ```html
   <nav>
       <ul>
           <li><a href="index.html">Home</a></li>
           <li><a href="about.html">About Us</a></li>
           <li><a href="events.html">Events</a></li>
           <li><a href="gallery.html">Gallery</a></li>
           <li><a href="media.html">Media</a></li>
           <li><a href="contact.html">Contact</a></li>
       </ul>
   </nav>
   ```

3. Open EACH page and replace its existing `<nav>` section with this block.

4. On each page, add `class="active"` to the CURRENT page's link:
   - On `index.html`: `<a href="index.html" class="active">Home</a>`
   - On `about.html`: `<a href="about.html" class="active">About Us</a>`
   - And so on for each page.

5. Save ALL files.

✅ **Check:** Open each page in the browser. Verify:
- Same links, same order, same labels on every page
- Current page is highlighted (different color/background via `.active` CSS)
- All links navigate correctly

💾 **Save** all files.

---

### TASK 4: Polish Visual Hierarchy

🎯 **Goal:** Ensure consistent, clear visual hierarchy across all pages.

🔧 **Steps:**

1. Open `css/style.css`.
2. Verify/add these heading styles:

```css
/* === VISUAL HIERARCHY === */
h1 {
    font-size: 36px;
    font-weight: 700;
    color: #1a5276;
    margin-bottom: 10px;
}

h2 {
    font-size: 26px;
    font-weight: 600;
    color: #2874a6;
    margin-top: 30px;
    margin-bottom: 15px;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 8px;
}

h3 {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-top: 20px;
    margin-bottom: 10px;
}

p {
    font-size: 16px;
    line-height: 1.6;
    color: #444;
    margin-bottom: 15px;
}
```

3. Check every page to ensure:
   - Exactly ONE `<h1>` per page (the page title)
   - `<h2>` for major sections
   - `<h3>` for subsections within `<h2>` sections
   - No skipped heading levels (don't jump from h2 to h4)
   - No `<h1>` inside `<main>` if it is already in `<header>`

4. Save the CSS file.

✅ **Check:** Open each page. The visual flow should be: large dark title → medium section headings → smaller subsection headings → readable body text.

💾 **Save** all changes.

---

### TASK 5: Final Quality Audit

🎯 **Goal:** Run through the complete polishing checklist before submission.

🔧 **Steps:**

1. **Link check:** Click EVERY link on EVERY page. Fix any broken links.
2. **Image check:** Verify all images load. Check `alt` attributes exist and are descriptive.
3. **Responsive check:** Resize browser to 375px (iPhone width). Verify no horizontal scrollbar, text is readable, layout stacks properly.
4. **HTML validation:** Go to https://validator.w3.org/#validate_by_upload and upload each HTML file. Fix errors.
5. **CSS validation:** Go to https://jigsaw.w3.org/css-validator/#validator_by_upload and upload `style.css`. Fix errors.
6. **Placeholder check:** Search for "lorem ipsum", "TODO", "placeholder", "xxx" in all files. Replace with real content.
7. **Title check:** Verify each page has a unique, descriptive `<title>` tag.
8. **Meta check:** Verify `<meta charset="UTF-8">` and viewport meta tag on every page.
9. **Folder check:** Verify clean folder structure (no stray files, proper organization).
10. **README check:** Create/update `README.md` following the template from Theory Section 6.

✅ **Check:** All 10 items pass. Your site is polished and ready for submission.

💾 **Final save.** Consider zipping the project folder as backup.

---

### TASK 6: Write Your Project README

🎯 **Goal:** Create a professional README.md for your Student Club Website.

🔧 **Steps:**

1. Create a new file `README.md` in your project root.
2. Fill in the template from Example 4 above, customizing:
   - Your name and student ID
   - Actual pages you created
   - Actual technologies and resources used
   - Your specific design decisions (colors, fonts, layout choices)

3. Include the file structure tree. You can generate it with:
   - Windows Command Prompt: `tree /F` (run inside your project folder)
   - Or type it manually

4. Proofread for spelling and clarity.

5. Save the file.

✅ **Check:** Open `README.md` in VS Code (it renders Markdown preview with Ctrl+Shift+V). Verify it looks professional and contains all required sections.

💾 **Save.** Your project is now fully documented.

---

# 🐛 COMMON ERRORS — WHAT THE BROWSER SHOWS YOU

Whole-site errors show up as inconsistency: pages that do not quite match, or links that work in one direction only.

| Symptom you see | Likely cause | How to confirm | Fix |
|---|---|---|---|
| Each page looks slightly different | Every page has its own copy of the CSS, edited separately | Compare the `<head>` blocks | One shared external stylesheet linked from every page |
| One page is unstyled while the rest are fine | That page's `<link>` path is wrong for its folder depth | Network tab shows a 404 on that page only | Fix the `href` for that page's location |
| Some pages have no nav, or an older nav | The nav was copied before the last edit | Diff the nav block across pages | Update all pages together; keep the nav identical |
| Site works locally, links break once uploaded | Absolute local paths, or case mismatches | Compare local and server file names | Relative paths, all-lowercase names |
| Typing the folder URL shows a file list | No `index.html` in that folder | Look at the folder contents | Add `index.html` as the entry point |
| Browser tab shows a generic globe icon | No favicon | Network tab shows a 404 for `favicon.ico` | Add `<link rel="icon" href="favicon.ico">` |
| Search engines and social previews show nothing useful | Missing `<meta name="description">` and Open Graph tags | View Source and read `<head>` | Add a description per page; add OG tags for sharing |
| Fine on a laptop, unusable on a phone | No viewport meta, or fixed pixel widths | DevTools device mode | Add the viewport tag; use relative units and media queries |
| Different heading sizes on visually similar pages | Heading levels chosen by size, not by structure | Compare heading levels across pages | One `<h1>` per page; nest levels without skipping |
| Files hard to find as the site grows | Everything sits in the root folder | Look at the folder listing | Structure it: `css/`, `img/`, `js/`, `pages/` |

**Pre-submission sweep, in this order:** run every page through the W3C HTML validator, click every link from the deepest page, load the site in DevTools device mode at 375px, and confirm all file names are lowercase with no spaces. Those four passes catch most of what gets marked down.

---


# ✅ SELF-CHECK QUESTIONS

Answer these from memory first, then expand the answer to check yourself.

**Q1. What makes a site "compact", and why is that a design goal?**

<details>
<summary>Answer</summary>

A compact site delivers everything the audience needs in roughly 3–5 pages, with no filler. It is a goal because visitors want to find one thing quickly: a focused 4-page site beats a sprawling 15-page site with thin content on every page. Fewer pages also means less navigation to maintain and fewer chances for links to rot.

</details>

---

**Q2. Why draw a site map before writing any HTML?**

<details>
<summary>Answer</summary>

The site map fixes your page list, filenames, and link structure while they are still cheap to change. Discovering after building five pages that Events should be part of About means renaming files, rewriting every nav block, and fixing every relative path. Ten minutes with a pencil prevents two hours of restructuring.

</details>

---

**Q3. What does DRY mean in the context of a static website?**

<details>
<summary>Answer</summary>

**Don't Repeat Yourself** — every piece of knowledge should live in exactly one place. In practice: one shared `style.css` instead of per-page `<style>` blocks, one `.card` class instead of five near-identical rule sets, one nav markup block copied verbatim rather than five hand-written variants. Duplication is where sites drift out of sync.

</details>

---

**Q4. What is visual hierarchy, and which CSS properties create it?**

<details>
<summary>Answer</summary>

Visual hierarchy is the order in which the eye takes things in, so the most important element is noticed first. It is built with **size** (`font-size`), **weight** (`font-weight`), **colour and contrast**, **whitespace** (`margin`, `padding`), and **position** (things higher and further left read as more important). A page where every element shouts equally has no hierarchy and is exhausting to scan.

</details>

---

**Q5. Why does a favicon matter for a student project?**

<details>
<summary>Answer</summary>

It appears in the browser tab, bookmarks, and history. Without one the tab shows a blank or generic icon, which reads as unfinished. It is two lines of work — `<link rel="icon" href="images/favicon.png">` plus a small square image — and it is one of the cheapest signals of care in the whole project.

</details>

---

**Q6. Which meta tags belong on every page, and what does each do?**

<details>
<summary>Answer</summary>

- `<meta charset="UTF-8">` — declares the character encoding so accented and Vietnamese characters render correctly. Must be first in `<head>`.
- `<meta name="viewport" content="width=device-width, initial-scale=1">` — makes the page respect the real device width. Without it, phones render at 980px and shrink everything.
- `<meta name="description" content="...">` — the ~155-character summary search engines show under your link.

</details>

---

**Q7. What are the seven lines of the spec template, and why write one?**

<details>
<summary>Answer</summary>

Purpose · Audience · Pages · Content per page · Visual style · Constraints · Success criteria. Writing them takes five minutes and forces the decisions you would otherwise make accidentally halfway through coding. It also gives you something concrete to check the finished site against, instead of relying on a vague sense of "looks done".

</details>

---

**Q8. What should a project README contain?**

<details>
<summary>Answer</summary>

The project name and one-line purpose; how to view it (open `index.html`, or run Live Server); the file and folder structure; a list of pages with what each contains; technologies used; credits for any images or fonts you did not create; and known limitations. Graders read it first, and it is the note your future self will need when returning to the project.

</details>

---


# 📝 SELF-ASSESSMENT WORKSHEET

| # | I can... | Yes | No |
|---|----------|-----|----|
| 1 | Define what a "compact site" is and list its key characteristics | ☐ | ☐ |
| 2 | Draw a site map showing all pages and their relationships | ☐ | ☐ |
| 3 | Assign a single primary purpose to each page in my site | ☐ | ☐ |
| 4 | Identify and eliminate redundant content across pages | ☐ | ☐ |
| 5 | Standardize navigation consistently across all pages | ☐ | ☐ |
| 6 | Apply visual hierarchy (size, color, spacing) to improve readability | ☐ | ☐ |
| 7 | Run a quality audit (links, images, validation, responsiveness) | ☐ | ☐ |
| 8 | Write a clear README documenting my project structure and decisions | ☐ | ☐ |

If you answered "No" to any item, re-read the relevant Theory section and redo the corresponding Hands-On task.

---

# 🏢 REQUIREMENTS ANALYSIS — FROM BUSINESS BRIEF TO SITE SPEC (CLO2)

> So far you have built a **pre-defined** Student Club Website. But **CLO2** asks for more:
> *ANALYZE requirements for building a Website for a business.* In real jobs you rarely get a finished
> specification — you get a vague request from a client, and YOU must turn it into a concrete plan.
> This section teaches that analytical skill.

## R1. Why Analysis Comes Before Building

### 🎒 Real-life Example

A client says: *"I want a website for my restaurant."*

If you start coding immediately, you will guess wrong: How many pages? A menu? Online ordering? A photo
gallery? Each guess you get wrong costs you rework. The professional move is to **ask questions first** and
write down the answers BEFORE writing any code.

## R2. Gathering Requirements — Questions to Ask

Use this checklist when a client gives you a brief. Group answers into **functional** (what the site must DO)
and **non-functional** (how it must BEHAVE) requirements.

| Area | Questions to ask the client |
|------|------------------------------|
| Purpose | What is the ONE main goal? (sell / inform / collect sign-ups?) |
| Audience | Who visits? Age, device (phone or desktop?), technical level? |
| Content | What pages are needed? Who writes the text? Who supplies photos? |
| Features | Contact form? Booking? Menu? News? Anything the client must update themselves? |
| Constraints | Budget? Deadline? Brand colors/logo? Languages? |
| Success | How will the client know the site "worked"? (more calls? more sign-ups?) |

## R3. Writing a Simple Requirements Specification

Turn the answers into a short document. Template:

```
# Requirements Specification — [Client name]
## 1. Goal            : [one sentence]
## 2. Target audience : [who]
## 3. Pages           : [list, each with one purpose]
## 4. Functional req. : [list of features, e.g. contact form, menu table]
## 5. Non-functional  : [mobile-friendly, fast, accessible, easy to update]
## 6. Out of scope    : [what we will NOT build, e.g. online payment]
## 7. Success metric  : [how we measure success]
```

Writing "out of scope" is a professional habit: it prevents **scope creep** (the client quietly adding work).

## R4. From Requirements to Site Map

Each **functional requirement** should map to a page or feature. Example:

| Requirement | Becomes |
|-------------|---------|
| "Show the menu with prices" | `menu.html` with an HTML **table** (Session 9) |
| "Let customers message us" | `contact.html` with a **form** (Session 13) |
| "Show the restaurant's story" | `about.html` with headings + images (Session 3) |
| "Owner updates prices weekly" | Non-functional → choose a simple structure the owner can edit |

## R5. Worked Example — A Business Brief

**Brief:** *"I run a small yoga studio. I want a site so people can see the class schedule and contact me.
I don't want to pay anyone to update it — I'll edit it myself. Most of my customers are on phones."*

**Analysis (filled spec):**
1. Goal: attract new students and make them contact the studio.
2. Audience: adults 20–45, mostly on **phones** → responsive is a hard requirement.
3. Pages: Home, Schedule, Contact (3 pages = compact, easy for owner to edit).
4. Functional: schedule table; contact form with name/phone/message.
5. Non-functional: mobile-first; simple HTML/CSS the owner can edit; fast loading.
6. Out of scope: online booking/payment (not requested).
7. Success: more phone enquiries per month.

Notice how every sentence of the vague brief became a concrete, checkable line.

## R6. Practice — Your Turn

### TASK R1: Analyze a new brief
**Brief:** *"A local bookstore wants a website. They want to show new arrivals and opening hours, and let
customers ask if a book is in stock. The owner is not technical."*
Using the template in R3, write a full Requirements Specification and a site map.
✅ Check: Did you list "owner is not technical" as a non-functional requirement and let it influence your
structure choice?  💾 File: `notes/requirements-bookstore.md`

---

# 🔗 FURTHER READING

- [Responsive web design basics — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Document and website structure — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
- [Information architecture basics — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Information_architecture)
- [Media queries — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
- [Viewport meta tag — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag)
- [Writing good README files — GitHub Docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)
- [W3C HTML Validator](https://validator.w3.org/)
- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)

---

# ⏭️ NEXT SESSION

In **Session 12: Using Code-Editing Tools**, you will master VS Code features (extensions, Emmet shortcuts, integrated terminal), learn to validate HTML/CSS professionally, and use browser DevTools to debug common errors — making you a faster, more confident coder.
