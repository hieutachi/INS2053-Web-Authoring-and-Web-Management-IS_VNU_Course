# 🟦 SESSION 3
# **Working with Text and Images**

Welcome to Session 3! In the previous sessions you set up your project, created multiple pages, and connected them with navigation. Today you will learn how to fill those pages with real content: formatted text (headings, paragraphs, bold, italic, lists) and images (with proper formats, sizing, and accessibility). By the end of this session your Student Club Website will look like a real website with rich, well-structured content that is accessible to all users.

---

# 📌 SESSION INFORMATION

```
📅 Duration:     3 periods (150 minutes) — Theory ~60 min, Practice ~90 min
📚 Reference:    MDN "HTML Text Fundamentals"
                 https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals
🎯 Objectives:   1. Format text using headings (h1-h6), paragraphs, strong, em, lists, br, and hr
                 2. Add images using <img> with src, alt, width, and height
                 3. Choose the correct image format (JPG, PNG, GIF, SVG) for each use case
                 4. Write meaningful alt text for accessibility
                 5. Apply basic CSS styling to text and images
📖 Prepare:      1. Complete Sessions 1 and 2 (all five pages exist with navigation)
                 2. Gather 3-5 images for your site and save them in the images/ folder
                 3. Read MDN "Images in HTML" (link in Further Reading below)
🖼 Diagrams:     canvases/buoi-03.canvas.tsx — HeadingOutline, ImgAnatomy, AltTextCompare,
                 FormatChooser
🔗 Outcomes:     CLO1 (master basic web design and build skills)
                 CLO3 (choose appropriate technologies for web development)
                 CLO4 (design and build a web application)
```

---

# 🎯 LEARNING OBJECTIVES

After this session you will be able to:

- Use heading tags (`<h1>` through `<h6>`) correctly to create a logical page outline
- Format text with `<p>`, `<strong>`, `<em>`, `<br>`, and `<hr>`
- Create both unordered (`<ul>`) and ordered (`<ol>`) lists, including nested lists
- Insert images with the `<img>` tag and explain every required attribute
- Choose between JPG, PNG, GIF, and SVG based on the type of image
- Write descriptive `alt` text that serves visually impaired users and improves SEO
- Style text and images with CSS for a professional appearance
- Use Dreamweaver's Insert menu and Properties panel (or VS Code equivalents) to work efficiently

---

# 📖 THEORY

## 1. Headings: Creating Page Structure

> 🖼 **Diagram:** `canvases/buoi-03.canvas.tsx` → `HeadingOutline` — slide `headings` ("Headings: Page Structure")

### 1.1 Definition

HTML provides six levels of headings: `<h1>` (largest/most important) through `<h6>` (smallest/least important). Headings create an **outline** of your page, similar to chapter titles and section headers in a textbook.

Headings serve THREE critical purposes:

1. **Visual hierarchy** — Browsers display headings in decreasing font sizes, making it easy for readers to scan the page
2. **Accessibility** — Screen reader users navigate by jumping from heading to heading, skipping content they are not interested in
3. **SEO (Search Engine Optimization)** — Search engines use headings to understand what your page is about

### 🎒 Real-life Example

Think of headings like the **table of contents in a textbook**:

- `<h1>` = Book title (only ONE per page)
- `<h2>` = Chapter titles (main sections)
- `<h3>` = Section headings within a chapter
- `<h4>` = Subsection headings
- `<h5>` and `<h6>` = Minor headings (rarely used)

You would never put a subsection heading before a chapter heading. Similarly, never skip heading levels in HTML.

### 1.2 Heading Hierarchy Rules

✅ Correct hierarchy:
```html
<h1>Student Club</h1>
    <h2>About Us</h2>
        <h3>Our Mission</h3>
        <h3>Our History</h3>
    <h2>Events</h2>
        <h3>Upcoming Events</h3>
        <h3>Past Events</h3>
    <h2>Contact</h2>
```

❌ Wrong — skipping levels:
```html
<h1>Student Club</h1>
<h3>About Us</h3>       <!-- WRONG: Skipped h2! -->
<h5>Our Mission</h5>    <!-- WRONG: Skipped h4! -->
```

❌ Wrong — multiple h1 tags:
```html
<h1>Student Club</h1>
<h1>Welcome Page</h1>   <!-- WRONG: Only ONE h1 per page! -->
```

### 🔍 Heading Tag Comparison

| Tag | Default Browser Size | Semantic Meaning | Usage |
|-----|---------------------|------------------|-------|
| `<h1>` | ~32px, bold | Main page title | Once per page, at the top |
| `<h2>` | ~24px, bold | Major section | Multiple per page |
| `<h3>` | ~20px, bold | Subsection | Under an `<h2>` |
| `<h4>` | ~18px, bold | Sub-subsection | Under an `<h3>` |
| `<h5>` | ~16px, bold | Minor heading | Rarely needed |
| `<h6>` | ~14px, bold | Smallest heading | Very rarely needed |

⚠️ Important notes:

- **Only ONE `<h1>` per page.** This is the most important rule. The `<h1>` should describe what the page is about.
- **Never skip heading levels.** Go from `<h1>` to `<h2>` to `<h3>`. Do not jump from `<h1>` to `<h3>`.
- **Do not use headings just to make text big.** If you want large text that is NOT a section heading, use CSS (`font-size`) instead.
- Headings are NOT for layout or decoration. They are for STRUCTURE and MEANING.

### 🧪 Try It Yourself — Read Your Page's Outline

**Task (5 min):** Check that your headings describe a real structure.

1. Add headings to your home page: one `<h1>` for the club name, then `<h2>` for each section, and an `<h3>` under one of them.
2. Install the **HeadingsMap** extension, or open F12 → Elements and read the nesting.
3. Write the outline out on paper from the headings alone.

**Expected result:** The outline reads like a table of contents. Exactly one `<h1>`, no skipped levels, and each heading names what follows it.

<details>
<summary>The mistake almost everyone makes first</summary>

Choosing a heading level because of its size. `<h4>` is not "small bold text" — it is a fourth-level section, and jumping from `<h2>` to `<h4>` tells a screen reader user that a level is missing.

Pick the level from the structure, then set the size in CSS:

```css
h3 { font-size: 1.1rem; }
```

That way the document outline stays correct and the page still looks the way you want.

</details>


---

## 2. Paragraphs and Inline Text Formatting

### 2.1 Paragraphs (`<p>`)

The `<p>` tag defines a paragraph. Browsers automatically add vertical space (margin) above and below each paragraph.

```html
<p>This is the first paragraph. Browsers add space around it automatically.</p>
<p>This is the second paragraph. Notice the gap between paragraphs.</p>
```

⚠️ Important: Pressing Enter in your HTML code does NOT create a new paragraph in the browser. HTML ignores extra whitespace. You MUST use `<p>` tags.

### 2.2 Bold and Italic: `<strong>` vs `<b>`, `<em>` vs `<i>`

There are TWO ways to make text bold and TWO ways to make text italic. They look the same visually but have DIFFERENT meanings:

| Tag | Visual Effect | Semantic Meaning | When to Use |
|-----|--------------|------------------|-------------|
| `<strong>` | Bold | Important / serious | For content that matters ("Warning:", key terms) |
| `<b>` | Bold | None (purely visual) | For stylistic bold without importance (product names, lead sentences) |
| `<em>` | Italic | Emphasis / stress | For words you would stress when speaking aloud |
| `<i>` | Italic | None (purely visual) | For technical terms, foreign words, thoughts |

For beginners, **use `<strong>` for bold and `<em>` for italic**. These are semantically correct in most situations and are better for accessibility.

```html
<!-- Good: semantic emphasis -->
<p>The <strong>deadline</strong> is <em>strictly</em> March 20.</p>

<!-- Also valid but less semantic -->
<p>The <b>product name</b> is displayed in <i>italics</i> by convention.</p>
```

### 2.3 Line Break (`<br>`) and Horizontal Rule (`<hr>`)

**`<br>`** inserts a line break WITHOUT starting a new paragraph. Use it ONLY for content where line breaks are meaningful:

```html
<!-- GOOD use of <br>: an address -->
<p>
    Student Club Office<br>
    Building A, Room 101<br>
    University Campus<br>
    Ho Chi Minh City
</p>

<!-- BAD use of <br>: creating space between sections -->
<p>First section</p>
<br><br><br>          <!-- WRONG! Use CSS margin instead -->
<p>Second section</p>
```

**`<hr>`** draws a horizontal line across the page. It represents a thematic break between sections:

```html
<section>
    <h2>Club News</h2>
    <p>Latest updates...</p>
</section>

<hr>

<section>
    <h2>Upcoming Events</h2>
    <p>Event details...</p>
</section>
```

### 🎒 Real-life Example

Think of text formatting like **voice tone when giving a presentation**:

- `<h1>`, `<h2>`, etc. = Speaking louder for section titles so everyone knows a new topic is starting
- `<strong>` = Saying a word with extra weight: "This deadline is **FINAL**"
- `<em>` = Stressing a word: "We need to meet *tomorrow*"
- `<br>` = Taking a breath mid-sentence (like reading an address line by line)
- `<hr>` = Pausing between topics (like saying "Now, let us move on to...")
- `<p>` = A complete thought, separated by natural pauses

### ⚠️ Important Notes

- Do NOT use `<br>` to create vertical spacing. Use CSS `margin` and `padding` instead.
- Do NOT use `<b>` or `<i>` as your default bold/italic tags. Prefer `<strong>` and `<em>`.
- `<br>` and `<hr>` are self-closing (void) elements. They do NOT have closing tags.
- Extra spaces and line breaks in your HTML source code are IGNORED by the browser. To control spacing, always use CSS.

### 🧪 Try It Yourself — Meaning vs. Appearance

**Task (5 min):** Compare the two ways to make text bold.

1. Add both lines to a page:
   ```html
   <p>Meetings are <strong>every Friday</strong> at 5pm.</p>
   <p>Meetings are <b>every Friday</b> at 5pm.</p>
   ```
2. Reload. They look identical.
3. Open F12 → **Elements**, then the **Accessibility** pane, and inspect each one.

**Expected result:** Both render bold. Only `<strong>` carries importance in the accessibility tree; `<b>` is styling with no meaning attached.

<details>
<summary>Which to use, and when</summary>

- `<strong>` — this text is *important*. A screen reader may emphasise it.
- `<em>` — this text is *stressed*, changing the sentence's sense.
- `<b>` and `<i>` — visual only: a product name, a keyword, a term in another language.

In practice, use `<strong>` and `<em>` for nearly everything, and do the purely visual work in CSS with `font-weight` and `font-style`. Never use `<strong>` just to make something bigger — that is a CSS job.

</details>


---

## 3. Lists

### 3.1 Unordered Lists (`<ul>`)

An unordered list displays items with **bullet points**. Use it when the ORDER of items does NOT matter.

```html
<ul>
    <li>Web Design Workshop</li>
    <li>Photography Contest</li>
    <li>Music Night</li>
</ul>
```

Browser output:
```
• Web Design Workshop
• Photography Contest
• Music Night
```

### 3.2 Ordered Lists (`<ol>`)

An ordered list displays items with **numbers**. Use it when the ORDER MATTERS (steps, rankings, timelines).

```html
<ol>
    <li>Fill out the membership form</li>
    <li>Pay the membership fee</li>
    <li>Attend the orientation session</li>
</ol>
```

Browser output:
```
1. Fill out the membership form
2. Pay the membership fee
3. Attend the orientation session
```

### 3.3 Nested Lists

You can place a list INSIDE a list item to create sub-items:

```html
<ul>
    <li>Workshops
        <ul>
            <li>HTML &amp; CSS Basics</li>
            <li>JavaScript Introduction</li>
            <li>Responsive Design</li>
        </ul>
    </li>
    <li>Social Events
        <ul>
            <li>Movie Night</li>
            <li>Campus Tour</li>
        </ul>
    </li>
    <li>Competitions
        <ol>
            <li>Photography Contest</li>
            <li>Coding Challenge</li>
            <li>Design Sprint</li>
        </ol>
    </li>
</ul>
```

### 🔍 When to Use Which List Type

| Situation | List Type | Reason |
|-----------|-----------|--------|
| Menu items | `<ul>` | No particular order matters |
| Navigation links | `<ul>` | Links are equal in importance |
| Step-by-step instructions | `<ol>` | Order is critical |
| Recipe ingredients | `<ul>` | Any order works |
| Recipe steps | `<ol>` | Must follow sequence |
| Top 10 ranking | `<ol>` | Ranking implies order |
| Features/benefits | `<ul>` | No priority order |
| Timeline of events | `<ol>` | Chronological order matters |

### ⚠️ Important Notes

- Every list item MUST be wrapped in `<li>` tags. Nothing else goes directly inside `<ul>` or `<ol>`.
- Nested lists go INSIDE the `<li>` element, AFTER the text of the parent item.
- You can nest `<ul>` inside `<ol>` and vice versa. Mixing is allowed.
- The HTML entity `&amp;` represents the ampersand character `&`. Always use HTML entities for special characters in content.

### 🧪 Try It Yourself — Nest a List Inside a List

**Task (5 min):** Build the club's activity list with sub-items.

1. Add this to your page:
   ```html
   <h2>What We Do</h2>
   <ul>
       <li>Weekly workshops
           <ul>
               <li>HTML and CSS basics</li>
               <li>Responsive design</li>
           </ul>
       </li>
       <li>Semester project showcase</li>
       <li>Guest talks from industry</li>
   </ul>
   ```
2. Reload and look at the indentation and bullet shapes.
3. Now move the nested `<ul>` so it sits *between* two `<li>` elements instead of inside one, and reload.

**Expected result:** Correctly nested, the sub-list indents under its parent with a different bullet. Nested wrongly, it still renders — but the validator will reject it, and screen readers lose the parent-child relationship.

<details>
<summary>The one nesting rule</summary>

A nested list must live **inside** an `<li>`, not between them. Only `<li>` may be a direct child of `<ul>` or `<ol>`.

Note where the parent's `</li>` goes: after the nested `</ul>`, not before it. That is what makes "Weekly workshops" the parent of the two sub-items rather than a sibling.

</details>


---

## 4. Images in HTML

> 🖼 **Diagrams:** `canvases/buoi-03.canvas.tsx` → `ImgAnatomy` — slide `images` ("The img Tag"); `AltTextCompare` — slide `alt-text` ("Alt Text & Accessibility")

### 4.1 The `<img>` Tag

The `<img>` tag embeds an image into your web page. It is a **self-closing (void) element** — it has NO closing tag.

```html
<img src="images/club-logo.png" alt="Student Club Logo" width="200" height="100">
```

### 4.2 Required Attributes

| Attribute | Required? | Purpose | Example |
|-----------|-----------|---------|---------|
| `src` | ✅ YES | Path to the image file (relative path!) | `src="images/logo.png"` |
| `alt` | ✅ YES | Alternative text describing the image | `alt="Student Club Logo"` |
| `width` | Recommended | Display width in pixels | `width="200"` |
| `height` | Recommended | Display height in pixels | `height="100"` |

### 4.3 Why `alt` Is Mandatory

The `alt` attribute is NOT optional. It serves three critical purposes:

1. **Accessibility:** Screen readers read the alt text aloud to visually impaired users. Without alt text, they hear nothing or hear the filename.
2. **Broken images:** If the image fails to load (wrong path, slow connection, blocked by ad blocker), the browser displays the alt text instead.
3. **SEO:** Search engines cannot "see" images. They rely on alt text to understand what the image shows.

**Writing good alt text:**

| Image Type | Good Alt Text ✅ | Bad Alt Text ❌ |
|-----------|-----------------|-----------------|
| Club logo | `"Student Club logo"` | `"image"` or `"logo.png"` |
| Team photo | `"Five students posing at the 2024 orientation event"` | `"photo"` or `"IMG_2341.jpg"` |
| Decorative border | `""` (empty string) | `"border decoration"` |
| Chart/graph | `"Bar chart showing membership growth from 50 in 2020 to 200 in 2024"` | `"chart"` |
| Linked image | `"Click to visit our Facebook page"` | `"facebook"` |

Rules for alt text:
- Describe WHAT THE IMAGE SHOWS, not what the file is named
- Keep it concise (under 125 characters for simple images)
- If the image is purely decorative, use `alt=""` (empty string) — screen readers will skip it
- Never start with "Image of..." or "Picture of..." — the screen reader already announces it as an image
- If the image contains text, include that text in the alt attribute

### 4.4 Width and Height

Setting `width` and `height` prevents **layout shift** — the jarring effect where content jumps around as images load. Always set BOTH attributes:

```html
<!-- GOOD: Both dimensions specified -->
<img src="images/team-photo.jpg" alt="Club team members" width="400" height="300">

<!-- OK: One dimension only (browser calculates the other proportionally) -->
<img src="images/team-photo.jpg" alt="Club team members" width="400">

<!-- BAD: No dimensions (layout shifts as image loads) -->
<img src="images/team-photo.jpg" alt="Club team members">
```

⚠️ Important: The `width` and `height` attributes set the DISPLAY size, not the actual file size. Setting `width="200"` on a 4000-pixel-wide photo makes it display small but still downloads the full file. Always resize images to the correct dimensions BEFORE adding them to your site.

### 🎒 Real-life Example

Think of the `<img>` tag like hanging a **painting in a gallery**:

- `src` = Where the painting is stored (the storage room location)
- `alt` = The plaque next to the painting that describes it for visitors who cannot see it
- `width` and `height` = The frame size that determines how much wall space it takes up
- The browser = The gallery curator who hangs the painting in the right spot

If you forget the plaque (alt text), visitors who cannot see the painting have no idea what it shows. If you use the wrong frame size (width/height), the painting looks distorted or the wall layout looks messy.

### 🧪 Try It Yourself — The Alt Text Test

**Task (6 min):** Write alt text that actually does its job.

1. Add three images to a page: the club logo, a photo of members at a workshop, and a decorative divider line.
2. Give each one alt text:
   ```html
   <img src="img/logo.png" alt="Student Web Club logo">
   <img src="img/workshop.jpg" alt="Six students building websites at a workshop">
   <img src="img/divider.png" alt="">
   ```
3. Now break one path on purpose: change `workshop.jpg` to `workshop-x.jpg` and reload.
4. Finally, in F12 → Elements, delete each `<img>` in turn and read the page without it.

**Expected result:** The broken image shows its alt text in place of the photo — proof that alt text is also your fallback. Deleting the decorative divider costs the reader nothing, which is exactly why its alt is empty.

<details>
<summary>The rule that decides every case</summary>

Ask: *if this image failed to load, what would the reader need to be told?*

- Conveys information → describe the information, not the file. "Six students building websites at a workshop", not "workshop.jpg" or "image of students".
- Purely decorative → `alt=""`. The empty value tells a screen reader to skip it. Omitting `alt` entirely is different and worse: the screen reader then reads the file name aloud.
- Contains text (a poster, a logo with a tagline) → put that text in the alt.

Do not start with "Image of" or "Picture of". Screen readers already announce that it is an image.

</details>


---

## 5. Image Formats

> 🖼 **Diagram:** `canvases/buoi-03.canvas.tsx` → `FormatChooser` — slide `image-formats` ("Choosing Image Formats")

### 5.1 Choosing the Right Format

| Format | Full Name | Best For | Transparency | Animation | File Size | Colors |
|--------|-----------|----------|-------------|-----------|-----------|--------|
| **JPG/JPEG** | Joint Photographic Experts Group | Photos, complex images with gradients | ❌ No | ❌ No | Small (compressed) | Millions |
| **PNG** | Portable Network Graphics | Logos, icons, screenshots, images with transparency | ✅ Yes | ❌ No | Medium-Large | Millions |
| **GIF** | Graphics Interchange Format | Simple animations, very simple graphics | ✅ Yes (1-bit) | ✅ Yes | Small-Medium | 256 max |
| **SVG** | Scalable Vector Graphics | Icons, logos, diagrams that must scale perfectly | ✅ Yes | ✅ Yes (CSS/JS) | Very Small | Unlimited |
| **WebP** | Web Picture Format | Modern replacement for JPG/PNG (smaller files) | ✅ Yes | ✅ Yes | Smallest | Millions |

### 5.2 Decision Flowchart

```
What kind of image do you have?
│
├── Photograph or complex image with many colors?
│   └── YES → Use JPG (or WebP if supported)
│
├── Logo, icon, or image with transparent background?
│   └── YES → Use PNG (or SVG if it is a vector graphic)
│
├── Simple animation?
│   └── YES → Use GIF (or animated WebP/APNG)
│
├── Icon or logo that must look sharp at ANY size?
│   └── YES → Use SVG
│
└── Not sure?
    └── Start with PNG (safe choice, supports everything except photographic compression)
```

### 5.3 Image File Size Guidelines

Large images make pages load slowly. Follow these guidelines:

| Image Type | Maximum File Size | Typical Dimensions |
|-----------|-------------------|--------------------|
| Banner/header image | 100-200 KB | 1200x300 px |
| Content photo | 50-150 KB | 600x400 px |
| Thumbnail | 10-30 KB | 150x150 px |
| Logo | 5-20 KB | 200x100 px |
| Icon | 1-10 KB | 32x32 to 64x64 px |

Tips for reducing file size:
- Resize images to the EXACT display dimensions before adding them
- Use online tools like TinyPNG (https://tinypng.com/) or Squoosh (https://squoosh.app/) to compress images
- Use JPG quality 70-80% for photos (barely noticeable quality loss, much smaller file)
- Never use images larger than 2 MB on a web page

### ⚠️ Important Notes

- Always save images in the `images/` subfolder of your project. Never link to images on your Desktop or external URLs (unless intentionally using a CDN).
- Use RELATIVE paths for all image sources: `src="images/photo.jpg"` not `src="C:\Users\...\photo.jpg"`.
- If an image does not display, check: (1) Is the path correct? (2) Is the filename spelled correctly (case-sensitive)? (3) Is the file actually in the `images/` folder?
- BMP and TIFF formats are NOT suitable for the web. They are too large and not universally supported.

---

## 6. Using the Editor to Insert Content

### 6.1 Dreamweaver: Insert Menu

Dreamweaver provides visual tools for inserting elements:

- **Insert → HTML → Heading:** Inserts a heading tag at the cursor position
- **Insert → Image:** Opens a file browser to select an image and generates the `<img>` tag
- **Insert → HTML → Unordered List / Ordered List:** Creates a list structure
- **Properties Panel:** When you click on any element in Design View, the Properties panel shows editable options (format, font, alignment, link, etc.)

### 6.2 VS Code: Emmet Shortcuts

VS Code supports **Emmet**, a toolkit that expands abbreviations into full HTML:

| Type This | Press Tab → Expands To |
|-----------|----------------------|
| `h1` | `<h1></h1>` |
| `p` | `<p></p>` |
| `img` | `<img src="" alt="">` |
| `ul>li*3` | `<ul><li></li><li></li><li></li></ul>` |
| `nav>ul>li*5>a` | Full navigation structure with 5 linked items |
| `!` | Complete HTML5 boilerplate |

To use Emmet: type the abbreviation in an HTML file and press **Tab**.

### ⚠️ Important Notes

- Visual tools (Dreamweaver Design View) generate HTML FOR YOU, but you should always verify the generated code in Code View.
- Learning to type HTML manually is ESSENTIAL. Visual tools are helpful shortcuts, not replacements for understanding code.
- In VS Code, install the "HTML Snippets" extension for additional shortcuts.

---

## ✅ Best Practices

1. **Use exactly ONE `<h1>` per page.** It should describe the page's main topic.
2. **Follow heading hierarchy strictly.** Never skip levels (h1 → h2 → h3, not h1 → h3).
3. **Use `<strong>` and `<em>` instead of `<b>` and `<i>`** for meaningful emphasis.
4. **Always include `alt` text on every `<img>` tag.** No exceptions.
5. **Choose the right image format.** JPG for photos, PNG for logos/transparency, SVG for scalable icons.
6. **Resize images before adding them.** Web images should match their display dimensions.
7. **Set both `width` and `height` on images** to prevent layout shift.
8. **Use relative paths for all images:** `src="images/photo.jpg"`.
9. **Keep image file sizes small.** Aim for under 200 KB for photos, under 20 KB for logos.
10. **Use lists for grouped items.** Bulleted lists for unordered collections, numbered lists for sequences.
11. **Do not use `<br>` for spacing.** Use CSS margins and padding instead.
12. **Test with images disabled** in your browser to verify that alt text provides adequate information.

---

## ❌ Common Mistakes

### Mistake 1: Skipping heading levels

❌ Wrong:
```html
<h1>Student Club</h1>
<h3>Our Events</h3>     <!-- Skipped h2! -->
<h5>Workshop</h5>      <!-- Skipped h4! -->
```

✅ Correct:
```html
<h1>Student Club</h1>
<h2>Our Events</h2>
<h3>Workshop</h3>
```

### Mistake 2: Missing or useless alt text

❌ Wrong:
```html
<img src="images/team.jpg" alt="image">
<img src="images/logo.png">
<img src="images/banner.jpg" alt="banner.jpg">
```

✅ Correct:
```html
<img src="images/team.jpg" alt="Five club members posing at the 2024 orientation event">
<img src="images/logo.png" alt="Student Club logo featuring a blue shield and open book">
<img src="images/banner.jpg" alt="Students collaborating on laptops in the campus library">
```

### Mistake 3: Using huge unoptimized images

❌ Wrong: Linking to a 5 MB, 4000x3000 pixel photo straight from a camera
✅ Correct: Resize to 800x600 pixels, compress to JPG quality 80%, resulting in ~100 KB

### Mistake 4: Using `<br>` for layout spacing

❌ Wrong:
```html
<h2>About Us</h2>
<br><br><br>
<p>We are a student club...</p>
```

✅ Correct:
```html
<h2>About Us</h2>
<p>We are a student club...</p>
<!-- Control spacing with CSS: h2 { margin-bottom: 20px; } -->
```

### Mistake 5: Putting content outside `<li>` in lists

❌ Wrong:
```html
<ul>
    Some text here          <!-- WRONG: Text directly inside <ul> -->
    <li>Item one</li>
</ul>
```

✅ Correct:
```html
<ul>
    <li>Some text here</li> <!-- All content must be inside <li> -->
    <li>Item one</li>
</ul>
```

### Mistake 6: Stretching images with mismatched dimensions

❌ Wrong:
```html
<!-- Original image is 400x300, but forced to 400x400 — distorted! -->
<img src="images/photo.jpg" alt="Team photo" width="400" height="400">
```

✅ Correct:
```html
<!-- Match the original aspect ratio: 400x300 -->
<img src="images/photo.jpg" alt="Team photo" width="400" height="300">
```

---

# 📋 THEORY SUMMARY

| Concept | Definition | Example |
|---------|-----------|---------|
| `<h1>` - `<h6>` | Heading tags creating a page outline; h1 is largest | `<h2>Our Events</h2>` |
| `<p>` | Paragraph tag for blocks of text | `<p>Welcome to our club.</p>` |
| `<strong>` | Bold text with semantic importance | `<strong>Deadline:</strong> March 20` |
| `<em>` | Italic text with semantic emphasis | `<em>Please note</em> the time change` |
| `<br>` | Self-closing line break (for addresses, poetry) | `Line 1<br>Line 2` |
| `<hr>` | Self-closing horizontal rule / thematic break | Between two sections |
| `<ul>` + `<li>` | Unordered (bulleted) list | Navigation menus, feature lists |
| `<ol>` + `<li>` | Ordered (numbered) list | Step-by-step instructions |
| `<img>` | Self-closing image tag | `<img src="..." alt="..." width="..." height="...">` |
| `src` attribute | Relative path to the image file | `src="images/logo.png"` |
| `alt` attribute | Text description for accessibility and broken images | `alt="Student Club logo"` |
| JPG | Photo format, small file size, no transparency | Team photos, banners |
| PNG | Lossless format, supports transparency | Logos, icons, screenshots |
| GIF | Limited colors, supports animation | Simple animated banners |
| SVG | Vector format, infinitely scalable | Icons, logos, diagrams |

---

# 💡 WORKED EXAMPLES

## Example 1: Formatted About Page

**Situation:** You are building the About page for the Student Club Website. You need headings, paragraphs, bold text, italic text, and both types of lists.

**Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Club - About Us</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Student Club</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html" class="active">About Us</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h2>About Our Club</h2>
        <p>The <strong>Student Club</strong> is a vibrant community of
           learners and creators. We believe in the power of
           <em>technology</em> and <em>creativity</em> to bring people together.</p>

        <h3>What We Do</h3>
        <p>Our activities include:</p>
        <ul>
            <li><strong>Workshops:</strong> Learn web design, programming, and graphic design</li>
            <li><strong>Competitions:</strong> Photography, coding, and design contests</li>
            <li><strong>Social Events:</strong> Movie nights, game tournaments, and meetups</li>
            <li><strong>Community Service:</strong> Volunteering and charity projects</li>
        </ul>

        <h3>How to Join</h3>
        <p>Follow these simple steps to become a member:</p>
        <ol>
            <li>Fill out the online membership form</li>
            <li>Attend the orientation session</li>
            <li>Pay the annual membership fee (50,000 VND)</li>
            <li>Receive your membership card and welcome kit</li>
        </ol>

        <blockquote>
            <p>"Together, we learn. Together, we grow."</p>
            <p>— Student Club Motto</p>
        </blockquote>
    </main>

    <footer>
        <p>&copy; 2024 Student Club. All rights reserved.</p>
    </footer>
</body>
</html>
```

**Line-by-line explanation:**

- `<h2>About Our Club</h2>`: Main section heading. Only one `<h1>` exists (in the header), so `<h2>` starts the content sections.
- `<strong>Student Club</strong>`: Bold emphasis on the club name — this is important information.
- `<em>technology</em>` and `<em>creativity</em>`: Italic emphasis on key values — words you would stress when speaking.
- `<ul>` with `<li>` items: Bulleted list of activities. Order does not matter, so unordered list is appropriate.
- `<strong>Workshops:</strong>`: Bold label inside each list item to create a visual label-description pattern.
- `<ol>` with `<li>` items: Numbered list of joining steps. Order IS critical (you must fill out the form BEFORE attending orientation), so ordered list is correct.
- `<blockquote>`: Indented quotation block for the club motto. Screen readers announce this as a quotation.

**Result:** A well-structured About page with clear visual hierarchy. The bulleted list shows activities, the numbered list shows joining steps, and the blockquote displays the motto with distinctive styling.

---

## Example 2: Adding Images to the Home Page

**Situation:** You want to add the club logo and a banner image to the home page header, plus a team photo in the main content area.

**Code:**
```html
<header>
    <!-- Logo: PNG format because it has a transparent background -->
    <img src="images/club-logo.png" alt="Student Club logo with blue shield emblem"
         width="120" height="60">
    <h1>Student Club</h1>
    <!-- Banner: JPG format because it is a photograph -->
    <img src="images/banner.jpg" alt="Students collaborating on projects in the campus library"
         width="800" height="200">
</header>

<main>
    <h2>Welcome to Our Club</h2>
    <p>The <strong>Student Club</strong> is the most active student organization on campus.</p>

    <h3>Meet Our Team</h3>
    <!-- Team photo: JPG format, sized to display dimensions -->
    <img src="images/team-photo.jpg" alt="Five club leaders standing in front of the IT building"
         width="400" height="300">
    <p><em>Our team at the annual orientation event, September 2024.</em></p>
</main>
```

**Line-by-line explanation:**

- `<img src="images/club-logo.png"...>`: PNG format chosen because logos typically need transparent backgrounds. The relative path `images/club-logo.png` navigates from the root (where index.html lives) into the `images/` subfolder.
- `alt="Student Club logo with blue shield emblem"`: Describes WHAT the logo looks like, not just "logo." A screen reader user gets a mental picture.
- `width="120" height="60"`: Matches the intended display size. Prevents layout shift during loading.
- `<img src="images/banner.jpg"...>`: JPG format chosen because the banner is a photograph with many colors and gradients.
- `alt="Students collaborating on projects in the campus library"`: Describes the scene in the photo. Specific and informative.
- `<p><em>Our team at the annual orientation event...</em></p>`: An image caption placed directly after the image. Uses `<em>` for subtle emphasis. Captions provide context that supplements (but does not duplicate) the alt text.

**Result:** Three images displayed at appropriate sizes with descriptive alt text. If any image fails to load, the alt text appears in its place. Screen reader users hear meaningful descriptions.

---

## Example 3: Nested Lists for Event Categories

**Situation:** You want to organize events by category with sub-items, mixing unordered and ordered lists.

**Code:**
```html
<h2>Event Schedule</h2>

<ul>
    <li><strong>Technical Workshops</strong>
        <ol>
            <li>HTML &amp; CSS Basics — March 15, 2:00 PM</li>
            <li>JavaScript Fundamentals — March 22, 2:00 PM</li>
            <li>Responsive Web Design — March 29, 2:00 PM</li>
        </ol>
    </li>
    <li><strong>Creative Events</strong>
        <ul>
            <li>Photography Contest — Submit by March 20</li>
            <li>Poster Design Challenge — April 5</li>
        </ul>
    </li>
    <li><strong>Social Activities</strong>
        <ul>
            <li>Movie Night — Every Friday, 7:00 PM</li>
            <li>Campus Tour for New Members — April 1</li>
            <li>End-of-Semester Party — June 15</li>
        </ul>
    </li>
</ul>
```

**Line-by-line explanation:**

- Outer `<ul>`: The top-level categories (Technical, Creative, Social) are not ordered, so we use an unordered list.
- `<li><strong>Technical Workshops</strong>`: Each category is a list item with a bold label.
- Inner `<ol>`: Technical workshops have a SEQUENCE (Basics → Fundamentals → Responsive), so we use an ordered list nested inside the `<li>`.
- `HTML &amp; CSS`: The `&amp;` entity renders as `&` in the browser. You cannot type a raw `&` in HTML because it starts an entity reference.
- Inner `<ul>` for Creative Events: These events have no specific order, so we nest an unordered list.
- The nesting creates a visual indentation that clearly shows the hierarchy.

**Result:** A hierarchical list showing three event categories, each containing sub-items. Technical workshops are numbered (sequential), while creative and social events are bulleted (non-sequential).

---

# 🛠️ HANDS-ON PRACTICE

## Setup (Tools and Folders)

Before starting, make sure:

1. Your `StudentClubWebsite` folder exists with all five HTML pages from Session 2
2. Your `images/` folder contains at least these placeholder images (you can create simple placeholders using any image editor, or download free images):
   - `club-logo.png` (120x60 pixels)
   - `banner.jpg` (800x200 pixels)
   - `team-photo.jpg` (400x300 pixels)
3. Your `css/style.css` file exists from Session 2

If you do not have real images yet, create colored rectangles as placeholders using Paint or any image tool. Save them with the correct names and dimensions in the `images/` folder.

---

### TASK 1: Format the About Page with Rich Text

🎯 **Goal:** Apply headings, paragraphs, bold, italic, lists, and a blockquote to the About page.

📝 **Requirements:**
- Use proper heading hierarchy (h2 → h3)
- Include at least one unordered list and one ordered list
- Use `<strong>` and `<em>` for emphasis
- Include a blockquote with the club motto

🔧 **Steps:**

**Step 1:** Open `about.html` in your editor.

**Step 2:** Replace the entire `<main>` section content with this code:

```html
    <main>
        <h2>About Our Club</h2>
        <p>The <strong>Student Club</strong> was founded in 2020 with a mission to bring
           students together through <em>technology</em>, <em>creativity</em>, and
           <em>community service</em>.</p>

        <h3>Our Mission</h3>
        <p>To provide a supportive environment where students can learn new skills,
           share ideas, and grow together.</p>

        <h3>What We Offer</h3>
        <ul>
            <li><strong>Weekly Workshops:</strong> Hands-on sessions in web design, programming, and graphic design</li>
            <li><strong>Monthly Competitions:</strong> Photography, coding, and design contests with prizes</li>
            <li><strong>Social Events:</strong> Movie nights, game tournaments, and campus outings</li>
            <li><strong>Community Service:</strong> Volunteering at local schools and charities</li>
        </ul>

        <h3>How to Become a Member</h3>
        <ol>
            <li>Visit our office or fill out the online form</li>
            <li>Attend the orientation session (held every first Monday)</li>
            <li>Pay the annual membership fee</li>
            <li>Receive your membership card and welcome kit</li>
        </ol>

        <h3>Club Leadership</h3>
        <p>Our dedicated leadership team:</p>
        <ol>
            <li><strong>Nguyen Van A</strong> — President</li>
            <li><strong>Tran Thi B</strong> — Vice President</li>
            <li><strong>Le Van C</strong> — Events Coordinator</li>
        </ol>

        <blockquote>
            <p>"Together, we learn. Together, we grow."</p>
            <p>— Student Club Motto</p>
        </blockquote>
    </main>
```

**Step 3:** Save (Ctrl+S) and preview in browser (F12).

**Step 4:** Verify:
- Headings decrease in size from h2 to h3
- Bold and italic text render correctly
- Bullet points appear for the unordered list
- Numbers appear for the ordered lists
- The blockquote is visually distinct (indented or styled differently)

✅ **Expected result:** A richly formatted About page with clear visual hierarchy, properly structured lists, and emphasized text.

💾 **File to save:** `about.html`

---

### TASK 2: Add Images to the Home Page

🎯 **Goal:** Insert images with correct attributes, formats, and alt text into the home page.

📝 **Requirements:**
- Add the club logo in the header (PNG format)
- Add a banner image in the header (JPG format)
- Add a team photo in the main content (JPG format)
- Every image must have `src`, `alt`, `width`, and `height`
- All paths must be relative

🔧 **Steps:**

**Step 1:** Make sure your images exist in the `images/` folder:
- `images/club-logo.png`
- `images/banner.jpg`
- `images/team-photo.jpg`

**Step 2:** Open `index.html` and update the `<header>` section:

```html
    <header>
        <img src="images/club-logo.png" alt="Student Club logo with blue shield emblem"
             width="120" height="60">
        <h1>Student Club</h1>
        <img src="images/banner.jpg" alt="Students working together on laptops in the campus library"
             width="800" height="200">
        <nav>
            <ul>
                <li><a href="index.html" class="active">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
```

**Step 3:** In the `<main>` section, add a team photo after the welcome paragraph:

```html
        <h3>Meet Our Team</h3>
        <img src="images/team-photo.jpg" alt="Five club leaders posing in front of the IT building"
             width="400" height="300">
        <p><em>Our leadership team at the 2024 orientation event.</em></p>
```

**Step 4:** Save and preview. Check that:
- All three images display at the correct size
- The logo appears above the heading
- The banner appears below the heading
- The team photo appears in the main content area
- If you rename an image file temporarily to test, the alt text appears in place of the missing image

**Step 5:** Test accessibility: Right-click in Chrome → Inspect → find an `<img>` tag → delete the `src` attribute → observe the alt text appearing.

✅ **Expected result:** Three images displayed correctly with proper sizing. Alt text is present and descriptive. Images use relative paths and appropriate formats.

💾 **File to save:** `index.html`

---

### TASK 3: Build the Gallery Page with Images

🎯 **Goal:** Create a photo gallery page with multiple images, captions, and proper structure.

📝 **Requirements:**
- Display at least 3 images in the gallery
- Each image must have descriptive alt text
- Each image must have a caption
- Use `<section>` elements to group related photos
- Images must use relative paths

🔧 **Steps:**

**Step 1:** Place at least 3 images in your `images/` folder. If you do not have real photos, create colored placeholder images named:
- `event-orientation.jpg` (400x300)
- `event-workshop.jpg` (400x300)
- `event-social.jpg` (400x300)

**Step 2:** Open `gallery.html` and replace the `<main>` content:

```html
    <main>
        <h2>Photo Gallery</h2>
        <p>Browse photos from our events and activities throughout the year.</p>

        <section>
            <h3>Orientation Day 2024</h3>
            <img src="images/event-orientation.jpg"
                 alt="New members receiving welcome kits at the orientation booth"
                 width="400" height="300">
            <p><em>New members receiving their welcome kits at Orientation Day.</em></p>
        </section>

        <section>
            <h3>Web Design Workshop</h3>
            <img src="images/event-workshop.jpg"
                 alt="Students following along on laptops during the HTML workshop"
                 width="400" height="300">
            <p><em>Participants practicing HTML coding during our March workshop.</em></p>
        </section>

        <section>
            <h3>Social Events</h3>
            <img src="images/event-social.jpg"
                 alt="Club members playing board games at the monthly social night"
                 width="400" height="300">
            <p><em>Members enjoying board games at our monthly social night.</em></p>
        </section>
    </main>
```

**Step 3:** Save and preview. Verify all images display and captions appear below each image.

**Step 4:** Add CSS to style the gallery. Open `css/style.css` and add:

```css
/* --- Gallery Styles --- */
main section {
    margin-bottom: 30px;
}

main img {
    border: 2px solid #ddd;
    border-radius: 5px;
    padding: 5px;
    background-color: white;
    display: block;
    margin: 10px 0;
}

/* Caption style: targets <p> immediately after <img> */
main img + p {
    text-align: center;
    font-style: italic;
    color: #666;
    font-size: 14px;
}
```

**Step 5:** Save the CSS file and refresh the browser. Images should now have borders, rounded corners, and centered italic captions.

✅ **Expected result:** A gallery page with three sections, each containing a heading, an image with border styling, and an italic caption. All images use relative paths and have descriptive alt text.

💾 **Files to save:** `gallery.html`, `css/style.css`

---

### TASK 4: Style Text and Images with CSS

🎯 **Goal:** Update your stylesheet to professionally style headings, paragraphs, lists, blockquotes, and images across all pages.

📝 **Requirements:**
- Style all heading levels with consistent colors and spacing
- Style paragraphs for readability
- Style blockquotes with a left border
- Style images with borders and responsive behavior
- Ensure styles work consistently across all five pages

🔧 **Steps:**

**Step 1:** Open `css/style.css`.

**Step 2:** Replace or update the content with this comprehensive stylesheet:

```css
/* ========================================
   Student Club Website - Main Stylesheet
   Updated for Session 3: Text & Images
   ======================================== */

/* --- Reset & Base Styles --- */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333333;
    background-color: #f5f5f5;
}

/* --- Header --- */
header {
    background-color: #1a5276;
    color: white;
    padding: 20px;
    text-align: center;
}

header h1 {
    font-size: 32px;
    margin-bottom: 10px;
}

header img {
    display: block;
    margin: 0 auto 10px auto;
}

/* --- Navigation --- */
nav ul {
    list-style: none;
    padding: 0;
    text-align: center;
}

nav ul li {
    display: inline;
    margin: 0 10px;
}

nav ul li a {
    color: white;
    text-decoration: none;
    padding: 5px 10px;
}

nav ul li a:hover {
    background-color: #2874a6;
    border-radius: 3px;
}

nav ul li a.active {
    font-weight: bold;
    border-bottom: 2px solid white;
}

/* --- Main Content --- */
main {
    max-width: 800px;
    margin: 20px auto;
    padding: 30px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* --- Headings --- */
main h2 {
    font-size: 28px;
    color: #1a5276;
    border-bottom: 2px solid #2874a6;
    padding-bottom: 5px;
    margin-bottom: 15px;
}

main h3 {
    font-size: 22px;
    color: #2874a6;
    margin-top: 25px;
    margin-bottom: 10px;
}

main h4 {
    font-size: 18px;
    color: #1a5276;
    margin-top: 15px;
    margin-bottom: 8px;
}

/* --- Paragraphs --- */
main p {
    margin-bottom: 15px;
    text-align: justify;
}

/* --- Emphasis --- */
main strong {
    color: #1a5276;
}

/* --- Lists --- */
main ul, main ol {
    margin-left: 30px;
    margin-bottom: 15px;
}

main li {
    margin-bottom: 5px;
}

/* Nested lists */
main ul ul, main ol ul, main ul ol, main ol ol {
    margin-top: 5px;
    margin-bottom: 5px;
}

/* --- Blockquotes --- */
blockquote {
    border-left: 4px solid #2874a6;
    padding-left: 20px;
    margin: 20px 0;
    font-style: italic;
    color: #555;
}

blockquote p {
    margin-bottom: 5px;
}

/* --- Images in Main Content --- */
main img {
    border: 2px solid #ddd;
    border-radius: 5px;
    padding: 5px;
    background-color: white;
    display: block;
    margin: 15px auto;
    max-width: 100%;
    height: auto;
}

/* Image captions (paragraph immediately after image) */
main img + p {
    text-align: center;
    font-style: italic;
    color: #666;
    font-size: 14px;
    margin-top: 5px;
}

/* --- Article Cards --- */
main article {
    margin-bottom: 20px;
    padding: 15px;
    padding-left: 20px;
    border-left: 3px solid #2874a6;
    background-color: #fafafa;
}

main article h4 {
    color: #1a5276;
    margin-bottom: 5px;
}

/* --- Links in Content --- */
main a {
    color: #0066cc;
    text-decoration: none;
}

main a:hover {
    text-decoration: underline;
    color: #003366;
}

/* --- Sections --- */
main section {
    margin-bottom: 30px;
}

/* --- Footer --- */
footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 15px;
    margin-top: 20px;
}
```

**Step 3:** Save the CSS file (Ctrl+S).

**Step 4:** Preview EACH of the five pages in the browser. Verify:
- Headings are styled consistently with the correct sizes and colors
- Paragraphs are justified with comfortable line spacing
- Lists have proper indentation and spacing
- Blockquotes have a blue left border and italic text
- Images are centered with borders and rounded corners
- Captions are centered and italic below images
- The navigation bar looks identical on every page

✅ **Expected result:** All five pages share a professional, consistent design. Text is readable, images are well-presented, and the overall layout feels polished.

💾 **File to save:** `css/style.css`

---

# 🐛 COMMON ERRORS — WHAT THE BROWSER SHOWS YOU

Text and image bugs are visible, which makes them good practice at reading a symptom back to its cause.

| Symptom you see | Likely cause | How to confirm | Fix |
|---|---|---|---|
| Everything after one point is bold or italic | A `</strong>` or `</em>` is missing | Ctrl+U and count opening against closing tags | Close the tag where the emphasis should end |
| Broken-image icon with your alt text beside it | The `src` path is wrong, but `alt` is doing its job | Network tab shows a 404 for the image | Fix the path; keep the alt text |
| Photo overflows the page and forces sideways scrolling | The image's natural width exceeds its container | Inspect the element and read its intrinsic size | Add `img { max-width: 100%; height: auto; }` |
| Page takes many seconds to load | A camera-resolution image is being scaled down by the browser | Network tab shows a multi-megabyte image | Resize to display size and compress before uploading |
| Bullets appear where you wanted numbers | `<ul>` used instead of `<ol>` | Read the opening tag | Change to `<ol>` |
| A list item sits outside the bullet list | `<p>` or bare text used as a child of `<ul>` | The validator reports invalid nesting | Only `<li>` may be a direct child of `<ul>`/`<ol>` |
| Paragraph spacing looks uneven down the page | `<br><br>` used in some places and `<p>` in others | Ctrl+U and look for `<br><br>` | Use `<p>` everywhere and control spacing with CSS `margin` |
| Screen reader says "image" and nothing else | `alt` is missing entirely | Validator flags a missing alt attribute | Add descriptive `alt`, or `alt=""` if the image is purely decorative |
| Heading looks right but the outline is wrong | Heading level chosen for its font size | Run Lighthouse or check the DevTools accessibility tree | Use the correct level and set the size in CSS |

**The alt-text test that takes ten seconds:** in DevTools, right-click each `<img>` and delete it. Read the page. If a sentence is now missing information, that image's alt text needs to supply it.

---


# ✅ SELF-CHECK QUESTIONS

Answer these from memory first, then expand the answer to check yourself.

**Q1. Why should there be only one `<h1>` per page?**

<details>
<summary>Answer</summary>

`<h1>` names the topic of the whole page, so a second one is a contradiction. Screen reader users navigate by heading level and expect a single top-level heading; search engines use it as the strongest on-page signal of what the page is about. Multiple `<h1>` elements dilute both.

</details>

---

**Q2. What is wrong with jumping from `<h2>` straight to `<h4>`?**

<details>
<summary>Answer</summary>

It breaks the document outline. A screen reader announcing "heading level 4" after level 2 implies a missing level 3 section, so users assume they skipped content. Heading levels describe **structure**, not size — if `<h3>` looks too big, change it with CSS, do not swap in `<h4>`.

</details>

---

**Q3. When should you use `<strong>` versus `<b>`, and `<em>` versus `<i>`?**

<details>
<summary>Answer</summary>

`<strong>` and `<em>` carry **meaning** — importance and emphasis — and screen readers can convey them through tone. `<b>` and `<i>` are purely visual with no semantics. Default to `<strong>` and `<em>`. Reserve `<i>` for conventional italics with no emphasis, like a scientific name or a foreign phrase.

</details>

---

**Q4. What exactly should `alt` text say, and when should it be empty?**

<details>
<summary>Answer</summary>

`alt` describes the image's **function** in context, not its appearance: `alt="Club members planting trees at the 2024 campus cleanup"`, not `alt="photo"` or `alt="image of people"`. Do not start with "Image of" — screen readers already announce it as an image. Use `alt=""` (empty, but present) for purely decorative images so screen readers skip them silently. Omitting `alt` entirely is always wrong.

</details>

---

**Q5. A photo of the club committee, a transparent logo, and an icon set: which format for each, and why?**

<details>
<summary>Answer</summary>

- Photo → **JPG**: lossy compression handles millions of colours in a small file; transparency is not needed.
- Transparent logo → **PNG** (or SVG): lossless with alpha transparency, and keeps text edges crisp.
- Icon set → **SVG**: vector, so it stays sharp at any size and on any screen density, with a tiny file size.

</details>

---

**Q6. Why set `width` and `height` attributes on `<img>` even when CSS controls the size?**

<details>
<summary>Answer</summary>

They let the browser reserve the correct space **before** the image downloads, preventing layout shift where text jumps around as images load. Modern browsers use the ratio of the two attributes to compute the aspect ratio, so pair them with `max-width: 100%; height: auto;` in CSS for responsive behaviour without the jump.

</details>

---

**Q7. When is `<br>` appropriate, and when is it a mistake?**

<details>
<summary>Answer</summary>

Appropriate where the line break is **part of the content**: postal addresses, poetry, song lyrics. A mistake when used for **spacing** — two or three `<br>` tags to push content down. Spacing is CSS's job: use `margin` or `padding`. Stacked `<br>` tags also create confusing pauses for screen reader users.

</details>

---

**Q8. When do you use `<ul>` versus `<ol>`?**

<details>
<summary>Answer</summary>

`<ol>` when the **order matters** — installation steps, rankings, a recipe. `<ul>` when it does not — navigation links, feature lists, club benefits. Ask yourself: if I shuffled these items, would the meaning change? Yes → `<ol>`. No → `<ul>`. Never choose based on whether you want bullets or numbers; that is `list-style` in CSS.

</details>

---


# 📝 SELF-ASSESSMENT WORKSHEET

| # | I can... | Yes ☐ | No ☐ |
|---|----------|-------|------|
| 1 | Use heading tags (h1-h6) in correct hierarchical order without skipping levels | ☐ | ☐ |
| 2 | Explain why there should be only ONE `<h1>` per page | ☐ | ☐ |
| 3 | Format text with `<strong>`, `<em>`, `<p>`, and explain the difference between semantic and visual formatting | ☐ | ☐ |
| 4 | Create both unordered and ordered lists, including nested lists | ☐ | ☐ |
| 5 | Insert an image with all four attributes: `src`, `alt`, `width`, `height` | ☐ | ☐ |
| 6 | Write meaningful alt text that describes the image content for screen reader users | ☐ | ☐ |
| 7 | Choose the correct image format (JPG, PNG, GIF, SVG) based on the type of image | ☐ | ☐ |
| 8 | Style text and images with CSS to create a professional-looking page | ☐ | ☐ |

**Self-scoring guide:**
- 7-8 Yes: Excellent! You have mastered text and image fundamentals. Continue to the next session.
- 5-6 Yes: Good. Review the sections where you answered "No" and redo the relevant practice task.
- 0-4 Yes: Re-read the Theory section carefully. Focus on the worked examples and replicate them step by step. Ask your instructor or a classmate for help.

---

# 🔗 FURTHER READING

- [HTML Text Fundamentals — MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals)
- [Advanced Text Formatting — MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting)
- [Images in HTML — MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML)
- [Responsive Images — MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [CSS Text and Font Styling — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text)
- [Styling Lists — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists)
- [Web Accessibility: Images — W3C WAI](https://www.w3.org/WAI/tutorials/images/)
- [Alt Text Decision Tree — W3C WAI](https://www.w3.org/WAI/tutorials/images/decision-tree/)

---

# ⏭️ NEXT SESSION

In Session 4, you will learn how to create hyperlinks between pages, build navigation systems, and use anchors to link to specific sections within a page — making your Student Club Website fully navigable.
