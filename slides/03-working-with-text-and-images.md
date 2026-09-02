---
marp: true
theme: default
paginate: true
---

# Session 3: Working with Text and Images

**INS2053 — Web Authoring and Web Management**

*Text and images are 90% of every web page.*

Read: `ebook/03-working-with-text-and-images.md`  ·  Practise: `exercises/session-03/exercise.md`  ·  Diagrams: `canvases/buoi-03.canvas.tsx`

---

## Learning Objectives

- Format text with headings (`h1`–`h6`), paragraphs, strong, em, and lists
- Insert images with `src`, `alt`, `width`, and `height` attributes
- Choose the correct image format (JPG, PNG, GIF, SVG)
- Write meaningful alt text for accessibility
- Apply basic CSS styling to text and images

---

## Headings: Page Structure

- `<h1>` = main page title (**only ONE per page**)
- `<h2>` = major sections
- `<h3>` = subsections under `<h2>`
- Never skip levels: `h1 → h2 → h3` ✅ | `h1 → h3` ❌

🎒 Like a **table of contents**:
- Book title = `<h1>`
- Chapter titles = `<h2>`
- Section headings = `<h3>`

| Tag | Size | Usage |
|-----|------|-------|
| `<h1>` | ~32px | Once per page |
| `<h2>` | ~24px | Major sections |
| `<h3>` | ~20px | Subsections |

---

## Text Formatting

| Tag | Effect | Semantic Meaning |
|-----|--------|-----------------|
| `<strong>` | Bold | Important / serious |
| `<em>` | Italic | Emphasis / stress |
| `<br>` | Line break | Addresses, poetry only |
| `<hr>` | Horizontal rule | Thematic section break |
| `<p>` | Paragraph | Block of text |

- Prefer `<strong>` over `<b>`, `<em>` over `<i>`
- Do NOT use `<br>` for spacing — use CSS margins instead
- Extra whitespace in HTML source is ignored by the browser

---

## Lists

**Unordered list** (`<ul>`) — order does NOT matter:
```html
<ul>
    <li>Web Workshop</li>
    <li>Photo Contest</li>
</ul>
```

**Ordered list** (`<ol>`) — order MATTERS:
```html
<ol>
    <li>Fill out form</li>
    <li>Attend orientation</li>
</ol>
```

- Every item MUST be inside `<li>`
- Nested lists go INSIDE the `<li>`, after the parent text

---

## The `<img>` Tag

```html
<img src="images/team-photo.jpg"
     alt="Five club members posing at orientation"
     width="400" height="300">
```

| Attribute | Required? | Purpose |
|-----------|-----------|---------|
| `src` | ✅ Yes | Relative path to image |
| `alt` | ✅ Yes | Description for accessibility |
| `width` | Recommended | Display width in pixels |
| `height` | Recommended | Display height in pixels |

🎒 Like hanging a **painting in a gallery**: `src` = storage location, `alt` = the plaque describing it, `width/height` = frame size.

---

## Image Formats

| Format | Best For | Transparency? | Animation? |
|--------|----------|--------------|------------|
| JPG | Photos, complex images | ❌ No | ❌ No |
| PNG | Logos, icons, transparency | ✅ Yes | ❌ No |
| GIF | Simple animations | ✅ 1-bit | ✅ Yes |
| SVG | Icons, logos (scalable) | ✅ Yes | ✅ CSS/JS |

Decision flowchart:
- Photo? → **JPG**
- Logo with transparency? → **PNG** or **SVG**
- Animation? → **GIF**
- Must scale perfectly? → **SVG**

---

## Live Code Example

Formatted About page with text and images:

```html
<main>
    <h2>About Our Club</h2>
    <p>The <strong>Student Club</strong> brings students
       together through <em>technology</em> and
       <em>creativity</em>.</p>

    <img src="images/team-photo.jpg"
         alt="Five club leaders in front of IT building"
         width="400" height="300">
    <p><em>Our team at the 2024 orientation event.</em></p>
</main>
```

---

## Common Mistakes

- ❌ Skipping heading levels: `<h1>` then `<h3>`
- ✅ Follow strict hierarchy: `<h1>` → `<h2>` → `<h3>`
- ❌ Missing or useless alt text: `alt="image"` or no `alt`
- ✅ Describe what the image shows: `alt="Five students at orientation"`
- ❌ Using 5 MB camera photos directly on the page
- ✅ Resize to display dimensions first; keep photos under 200 KB
- ❌ Using `<br><br><br>` for layout spacing
- ✅ Control spacing with CSS `margin` and `padding`

---

## In-Class Practice

Follow `exercises/session-03/exercise.md`:

1. Format the About page with headings, lists, bold, italic
2. Add images (logo, banner, team photo) to `index.html`
3. Build the Gallery page with images and captions
4. Update `css/style.css` with text and image styles

---

## Homework

See `homework/session-03/homework.md`:

- Complete richly formatted About and Gallery pages
- Every image must have descriptive `alt` text
- Verify correct image formats and file sizes

**Due Sunday 23:59**

---

## Recap

- One `<h1>` per page; never skip heading levels
- Use `<strong>` and `<em>` for semantic emphasis
- Every `<img>` needs `src`, `alt`, `width`, and `height`
- Choose JPG for photos, PNG for logos, SVG for scalable icons
- Resize images before adding them to your site

---

## Next Session

**Session 4: Applying CSS to the Website** — selectors, colours, fonts, the box model, and specificity.
