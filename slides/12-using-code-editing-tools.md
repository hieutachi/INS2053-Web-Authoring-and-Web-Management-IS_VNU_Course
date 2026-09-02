---
marp: true
theme: default
paginate: true
---

# Session 12: Using Code-Editing Tools

**INS2053 — Web Authoring and Web Management**

*Upgrade from a bicycle to a sports car.*

Read: `ebook/12-using-code-editing-tools.md`  ·  Practise: `exercises/session-12/exercise.md`  ·  Diagrams: `canvases/buoi-12.canvas.tsx`

---

## Learning Objectives

- Navigate VS Code confidently (Explorer, Editor, Terminal, Extensions)
- Use Emmet abbreviations to generate HTML/CSS code instantly
- Validate HTML and CSS with W3C validators
- Open and use browser Developer Tools to inspect and fix CSS live
- Identify and fix common HTML/CSS errors efficiently

---

## VS Code Interface Overview

```
+-----------------------------------------------------------+
| ACTIVITY BAR | SIDEBAR      | EDITOR AREA                 |
| [Explorer]   | File tree    | index.html             [x]  |
| [Search]     |              |  1 | <!DOCTYPE html>        |
| [Source Ctrl]| - index.html |  2 | <html lang="en">       |
| [Extensions] | - css/       |  3 | <head>                 |
|              |   style.css  |  4 |   <meta ...>           |
|              +--------------+-----------------------------+
|              | PANEL (Terminal)                            |
|              | $ cd StudentClubWebsite                     |
+-----------------------------------------------------------+
```

Always open the **project folder**, not individual files.

---

## Essential Extensions

| Extension | What It Does |
|-----------|-------------|
| **Live Server** | Auto-refresh browser on save |
| **Prettier** | Auto-format code on save |
| **Auto Close Tag** | Inserts closing tags automatically |
| **Auto Rename Tag** | Updates matching tag when you edit one |
| **Path Intellisense** | Auto-completes file paths |

Install via `Ctrl+Shift+X`. Enable "Format on Save" in Settings.

---

## Emmet: Write HTML at Lightning Speed

Type a short abbreviation, press **Tab**, get full markup:

| Abbreviation | Result |
|-------------|--------|
| `!` | Full HTML5 boilerplate |
| `.container` | `<div class="container"></div>` |
| `ul>li*5>a[href="#"]` | UL with 5 LIs containing links |
| `nav>ul>li*6>a` | Full navigation structure |
| `p{Hello world}` | `<p>Hello world</p>` |

Emmet syntax: `.` = class, `#` = ID, `>` = child, `+` = sibling, `*` = multiply, `{}` = text

---

## Live Code Example

Generate a page skeleton with ONE Emmet line:

```
div#wrapper>header>h1{Student Club}^nav>ul>li*6>a[href="#"]^^main>h2{Welcome}+p{Hello}^^footer>p{2024}
```

Press Tab -> expands to a complete header/nav/main/footer structure.

Then fill in actual content. What took 2 minutes now takes 2 seconds.

---

## W3C Validation

**HTML:** Upload files at https://validator.w3.org/
**CSS:** Upload files at https://jigsaw.w3.org/css-validator/

Common errors and fixes:

| Error | Fix |
|-------|-----|
| Missing `alt` on `<img>` | Add `alt="description"` |
| Unclosed tag | Find and close the missing tag |
| Duplicate ID | Make each ID unique |
| Missing semicolon in CSS | Add `;` after every property-value pair |
| Unknown CSS property (typo) | Correct spelling (e.g., `colr` -> `color`) |

Fix errors from TOP to BOTTOM -- early errors cause false positives later.

---

## Browser DevTools (F12)

| Panel | Primary Use |
|-------|------------|
| **Elements** | View/edit HTML and CSS in real time |
| **Console** | See JS errors; run quick commands |
| **Network** | Monitor file sizes and loading times |
| **Device Toolbar** (`Ctrl+Shift+M`) | Simulate mobile screens |

Right-click any element -> Inspect -> click a CSS value to edit it LIVE. Changes are temporary -- copy working values back to your stylesheet.

---

## Common Mistakes

- **Coding in Notepad** -- use VS Code with extensions for IntelliSense and error detection
- **Ignoring validation errors** -- Chrome forgives errors that break other browsers
- **Manual formatting** -- set up Prettier with Format on Save instead
- **Guessing CSS properties** -- type `col` and let IntelliSense suggest `color`
- **Not using DevTools** -- edit CSS live instead of the edit-save-refresh cycle

---

## In-Class Practice

Follow `exercises/session-12/exercise.md`:

1. Install essential extensions (Live Server, Prettier, Auto Close Tag)
2. Practice 5 Emmet abbreviations in a practice.html file
3. Validate ALL HTML pages and fix errors
4. Validate your CSS and fix errors
5. Use DevTools to inspect elements and test responsiveness

---

## Homework

See `homework/session-12/homework.md`:

- Run W3C validation on every HTML and CSS file; fix all errors
- Format all files consistently with Prettier
- Write a short report listing bugs found and fixed
- Push clean, validated code to GitHub

**Due Sunday 23:59**

---

## Recap

- VS Code is the industry-standard editor -- learn its features
- Emmet abbreviations generate full HTML/CSS structures in seconds
- Validate HTML and CSS with W3C tools before every submission
- Browser DevTools let you inspect, edit, and debug live
- Consistent formatting makes code readable and maintainable

---

## Next Session

**Session 13: Creating Forms on the Website** -- build interactive forms with multiple input types, labels, fieldsets, and client-side validation.
