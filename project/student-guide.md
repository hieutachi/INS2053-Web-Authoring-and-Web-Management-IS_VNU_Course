## overview | Overview

Build a **five-page student club website** for beginners, experienced students and alumni. Help visitors understand the club, find activities and learn how to join. Choose your own club identity and write your own content; CodeBreakers is a fictional teaching reference, not a template to submit.

This instructional hub uses section navigation. **Your assignment is not an SPA:** submit five separate HTML files, linked using relative paths, with HTML and CSS. No framework, backend, upload service or online grading is required here.

Work incrementally through M1–M8. The milestone weeks remain **4, 5, 7, 9, 11, 14, 16, 16**. The checklist saves personal progress on this device only and is shared between the English and Vietnamese hubs. It does not report anything to your instructor.

## requirements | Requirements

### requirements-files | File and code contract

Keep `index.html`, `about.html`, `activities.html`, `media.html` and `contact.html` flat in `club-website/`. Add `README.md`, `css/style.css`, `images/` and `media/`. Use lowercase names without spaces. Link siblings as `about.html` and assets as `images/logo.svg`, not machine-specific paths.

- Every page: HTML5 doctype, `lang="en"`, UTF-8, viewport meta, unique title, one main heading and semantic header/nav/main/footer.
- Share the same header, five-link navigation, footer and external stylesheet; highlight the current page. Use reusable classes. No inline style attributes or embedded style blocks in the submitted pages.
- Use meaningful headings and original paragraphs, lists and descriptive image alt text. Include author name/student ID in a top comment and at least two explanatory HTML comments per page.
- Keep text contrast readable, label all controls, preserve visible keyboard focus, and make links and dropdowns usable without a mouse.
- Include real local images, playable local audio/video, descriptions and fallback links. Use your own or licensed materials and document their source. Do not leave broken media or require a CDN.
- Keep tables readable, form controls full-width on mobile, and navigation stacked at the required `max-width: 768px` breakpoint. Test 320/375, 768 and desktop widths.

### requirements-test | How to verify

Open every page directly, click every navigation link, then disconnect the network and repeat. Validate HTML and CSS, check case-sensitive filenames, tab through the interface and resize the browser. A page looking good at one width is not sufficient evidence.

## pages | Five page briefs

### pages-home | Home — index.html

**Purpose:** give a first-year visitor a clear first impression. Include the club name in h1, an actual logo image, navigation to all five pages, a welcome hero/tagline, one or two introduction paragraphs, a prominent **Join Us → contact.html** link, and a footer with copyright and contact email. A community illustration is welcome if clearly described as an illustration.

**Check:** a visitor can explain what the club does and find Contact in one click. The logo loads offline; the active Home link is distinct.

### pages-about | About — about.html

**Purpose:** explain why the club exists and who it serves. Include mission, founding/history, a team section with at least three names/roles, activity information, unordered and ordered lists, and images with meaningful alt text. Use h2 for sections and h3 for subsections. Include `mission`, `activities` and `gallery` anchors if your dropdown links to them. Avoid invented claims about real people; label fictional example content.

**Check:** the ordered joining steps are readable, the team is understandable without images and each linked section exists.

### pages-activities | Activities — activities.html

**Purpose:** help students plan attendance. Provide a schedule table with a descriptive caption, thead/tbody, at least four columns (date, time, activity, location) and five data rows. Demonstrate colspan or rowspan for a meaningful grouping, not decoration. Add descriptions of major activities. Use borders, cell padding, a clear header, alternating rows and hover/focus-within treatment.

**Check:** a reader can identify when and where an activity takes place. On a phone the table scrolls within its own labelled region, not the whole page.

### pages-media | Media — media.html

**Purpose:** let visitors see and hear the club's learning material. Include a local video with controls, a poster, source/type and fallback text/link; a local audio item with controls, source/type and fallback text/link; and a small gallery. No autoplay. Provide captions or an equivalent transcript for instructional speech. Explain what each recording actually contains; a short original tutorial is valid reference media, not a claimed event recording.

**Check:** play/pause and seeking work offline, captions/transcripts are discoverable and assets have clear source/license notes.

### pages-contact | Contact — contact.html

**Purpose:** demonstrate an accessible joining/contact form. Include **Full name, Email, Student/Alumni radio buttons sharing a name, Department with at least four actual options, Message, and a required consent checkbox**. Use suitable input types, matched label-for/id pairs, required fields, fieldset/legend and a submit control in your assignment's form structure. Include contact details and meeting location.

**Reference safety:** this site's viewer never submits a form. Use its parent-side “Check fields” action to simulate native validation, then clear the fields. No Contact data is persisted. The standalone reference deliberately uses a button-only validation demonstration, not an active submission endpoint. This safety choice does not remove your assignment's form-markup requirements.

**Check:** blank fields and invalid email are detected; radio labels and consent can be activated with a keyboard. Do not collect real personal information in a teaching demo.

## milestones | Milestones and acceptance

### milestones-m1 | M1 — Week 4: setup and Home

After Sessions 1–3, create index.html and css/images folders. Home has a valid document, club-name title/h1, at least two paragraphs and a local image with alt text. **Verify:** extract/open the folder and confirm the image and tab title.

### milestones-m2 | M2 — Week 5: CSS basics

Create and link css/style.css. Define body font/background, text/heading colors, at least three selectors and organised CSS comments. **Verify:** change one CSS rule and observe Home update.

### milestones-m3 | M3 — Week 7: multiple pages

Complete Home, About and basic Activities with consistent semantic layout and navigation, relative links and active-page styling. **Verify:** navigate from each of the three pages to the others without a missing file.

### milestones-m4 | M4 — Week 9: advanced styling/layout

Refine shared layout, typography, spacing, colors and interactive link states using the CSS techniques already taught. **Verify:** consistent header/footer, comfortable reading width and no clipped content.

### milestones-m5 | M5 — Week 11: tables and media

Finish the Activities schedule and Media page. Include caption/header, five rows, merged cells, local video/audio with controls and fallback. Update navigation on every existing page. **Verify:** table content and playback with the network disabled.

### milestones-m6 | M6 — Week 14: Contact form

Complete all specified Contact controls, labels, shared radio name, four departments, consent, fieldset/legend and form markup. Add Contact to all navigation bars. **Verify:** keyboard use and native required/email validation; no real personal data is needed.

### milestones-m7 | M7 — Week 16: responsive design

Add viewport to all five pages and media queries including max-width: 768px. Stack navigation, adjust padding, keep images fluid, tables readable and form controls full-width. **Verify:** narrow phone, tablet and desktop screenshots and keyboard checks.

### milestones-m8 | M8 — Week 16: final polish

Complete all content, fix every broken link/asset, validate markup/CSS, add author/explanatory comments and README, and package the complete folder. **Verify:** a fresh extraction works offline without manual path fixes.

M1–M6 are due at the beginning of the lab in their listed week. The existing policy allows one grace day at −20%, then milestone points are lost (the work still counts toward the final). M7 + M8 are included with the final submission. This guide does not change grading policy.

## demo | Explore the reference

Use the five page controls and the 375 / 768 / 1200 / Fit viewport selector below. Width changes the **actual iframe viewport**, not a scaled screenshot. A narrow screen can scroll the desktop preview horizontally. The inner page stays isolated from course styling.

Navigation is handled by the parent through an approved page registry. Preview scripts, form requests and top navigation are disabled. Text remains selectable: this is a teaching tool, **not anti-copy protection**. With JavaScript off the initial preview remains readable, but switching pages and simulated validation require JavaScript.

## checklist | Personal readiness checklist

Tick only after testing. Progress is versioned and shared between EN/VI on this browser. Reset asks for confirmation. If storage is blocked, you can still use the checklist during the current visit. It stores item IDs only, never Contact fields, grades or submission data.

## submission | Package and submit

1. Finish the five HTML pages, README, stylesheet and all local images/media. Remove unused temporary files and external dependencies; download licensed fonts locally or use a system font stack.
2. Put your name and student ID in a comment at the top of each HTML file. Explain sections with at least two comments per page and use consistent indentation.
3. ZIP the complete `club-website/` folder as **INS2053_[YourName]_[StudentID].zip**.
4. Extract that ZIP to a different location and open index.html. Test every page, image, media control and link with the network off.
5. Submit through the channel announced by your instructor, **Week 16, Sunday 23:59**. The existing final late penalty is **−10% per day**. This hub does not accept files or messages and cannot confirm submission.

Keep milestone submission instructions separate from weekly homework's repository/video procedure. Follow the instructor's channel announcements; do not infer a new upload mechanism from this checklist.

## faq | Frequently asked questions

### faq-spa | Must my club website be an SPA?

No. Only this instructional hub has section routing. Your club website must retain five separate HTML/CSS pages and work by opening the extracted files.

### faq-copy | Can I submit CodeBreakers unchanged?

No. Study its structure, then create your own club identity, content, layout and assets. Be prepared to explain your code. The sandbox is for isolation and request blocking, not hiding source code.

### faq-offline | Can I use Google Fonts or remote videos?

Homework 7 teaches web fonts, but the final project must work offline. Download appropriately licensed assets into your project or use system fonts. Do not depend on a CDN, remote image or embedded streaming site.

### faq-form | Will the demo send my message?

No. The Viewer blocks forms/scripts and only simulates validation in the parent. Nothing is submitted or stored. The standalone reference also has no sending action. Use invented test values.

### faq-progress | Is checklist progress a grade?

No. It is local to this browser and can disappear if you clear site data or change devices. It is not synchronised, uploaded or visible to your instructor.

### faq-late | What if I start late or find conflicting instructions?

Catch up in milestone order. This guide preserves the published weeks and deadlines; it does not replace instructor announcements. Ask the instructor to resolve a real discrepancy rather than inventing a new deadline.