# 🧭 APPENDIX A
# **Choosing Web Technologies — A Beginner's Decision Guide**

> This appendix supports **CLO3: CHOOSE appropriate technologies for Web application development.**
> The course teaches you to BUILD with HTML + CSS (+ Dreamweaver/VS Code). But a professional must also know
> what ELSE exists and HOW to choose. This appendix gives you that awareness and a simple, repeatable
> decision method. It is reading material — you are NOT required to learn these other tools.

---

# 📌 APPENDIX INFORMATION

```
📅 When to read:  Any time after Session 11 — best before the capstone technology
                  choice. Not tied to a timetabled session; ~45 minutes of reading.
📚 Reference:     MDN "Web technology for developers" (overview pages only)
🎯 Objectives:    1. Explain why technology selection is a skill separate from coding
                  2. Apply the 5-criterion framework to compare two technologies
                  3. Name the main layers of the web technology landscape
                  4. Justify a technology choice in writing
📖 Prepare:       1. Have your capstone project brief in front of you
                  2. Be ready to name two candidate technologies to compare
🖼 Diagrams:      none of its own. Course-wide decks: canvases/ins2053-overview.canvas.tsx
                  (syllabus tour) and canvases/ins2053-bai-giang.canvas.tsx (9 diagrams)
🔗 Outcomes:      CLO3 (choose appropriate technologies for web development)
                  CLO5 (evaluate, document, and present a web application)
```

---

# 🎯 WHAT YOU WILL LEARN

- Why "choosing a technology" is a real skill, separate from coding
- A simple **5-criterion decision framework** you can apply to any choice
- A **map of the web technology landscape** (what exists beyond HTML/CSS)
- How to justify a choice in writing (a skill employers value)

---

# 📖 THEORY

## 1. Choosing Is a Skill

### 1.1 Definition

**Technology selection** is the process of picking the tools, languages, and platforms for a project
*after comparing alternatives against the project's real needs* — not just using whatever you already know.

### 🎒 Real-life Example

Imagine you need to travel from Hanoi to a nearby town:

- **Motorbike** = cheap, flexible, good for 1–2 people, but tiring for long trips
- **Bus** = cheap and safe, but slow and on a fixed route
- **Car** = comfortable and fast, but expensive and needs a driver

There is no "best" vehicle. The best choice depends on: **how many people, how far, budget, and time.**
Choosing web technologies works exactly the same way.

### 1.2 Why It Matters

| Reason | Explanation |
|--------|-------------|
| Fit | The wrong tool makes a simple job hard (e.g., using a framework for a 3-page brochure site) |
| Cost | Some tools cost money or need expensive hosting |
| Maintainability | A tool nobody on the team knows becomes a liability |
| Employability | MIS graduates are often asked to *recommend* tools, not just use them |

---

## 2. The 5-Criterion Decision Framework

When comparing any two (or more) technologies, score them against **five criteria**:

| # | Criterion | Question to ask |
|---|-----------|-----------------|
| 1 | **Requirements fit** | Does it actually do what the project needs? |
| 2 | **Cost** | License fees? Hosting fees? Developer time? |
| 3 | **Learning curve** | Can the team learn it in the time available? |
| 4 | **Community & support** | Is there documentation, tutorials, and help when stuck? |
| 5 | **Maintenance & future** | Is it actively updated, or dying (like Flash)? |

### How to use it

1. List the candidate technologies.
2. Score each criterion 1 (poor) to 5 (excellent).
3. Add the scores; the highest total is your recommendation.
4. **Write one sentence justifying each score** — the justification is the real skill.

### 🔍 Worked example: "A 3-page club website"

| Criterion | Plain HTML/CSS | WordPress | React |
|-----------|---------------|-----------|-------|
| Requirements fit | 5 (a small static site is exactly this) | 3 (overkill) | 1 (far overkill) |
| Cost | 5 (free, cheap hosting) | 3 (hosting + plugins) | 3 (build tooling) |
| Learning curve | 5 (you just learned it) | 3 | 1 (steep) |
| Community | 5 | 5 | 5 |
| Maintenance | 5 (standards never die) | 3 (needs updates) | 3 |
| **Total** | **25** ✅ | 17 | 13 |

**Conclusion:** For a small static site, plain HTML/CSS wins. This is exactly why this course uses it.

---

## 3. The Web Technology Landscape (Awareness)

You do not need to learn these — just know they exist and what problem each solves.

### 3.1 The layer cake

```
┌────────────────────────────────────────────┐
│  Content / Structure      HTML             │  ← you know this
│  Presentation             CSS              │  ← you know this
│  Behaviour                JavaScript       │  ← awareness
├────────────────────────────────────────────┤
│  CSS helpers        Bootstrap, Tailwind,   │  ← awareness
│                     Sass (preprocessor)    │
│  CMS (no-code)      WordPress, Wix,        │  ← awareness
│                     Google Sites           │
│  Static generators  Jekyll, Hugo,          │  ← awareness
│                     Eleventy               │
│  JS frameworks      React, Vue, Angular    │  ← awareness
│  Backend            PHP, Node.js, Python   │  ← out of scope
│  Hosting            GitHub Pages, Netlify, │  ← awareness
│                     Vercel, shared hosting │
└────────────────────────────────────────────┘
```

### 3.2 Quick orientation table

| Family | Examples | Best for | Overkill for |
|--------|----------|----------|--------------|
| CSS framework | Bootstrap, Tailwind | fast, consistent UI on big sites | a tiny personal page |
| CSS preprocessor | Sass | large stylesheets with variables/mixins | a 1-file stylesheet |
| CMS | WordPress, Wix | non-technical owners who edit content often | a site that never changes |
| Static site generator | Jekyll, Hugo | blogs/docs with many similar pages | a 3-page site |
| JS framework | React, Vue, Angular | interactive apps (dashboards, SPAs) | a static brochure site |
| Static hosting | GitHub Pages, Netlify, Vercel | free/cheap hosting of static sites | sites needing a database |

### ⚠️ Important note (course scope)

This course deliberately keeps the **required** stack to HTML + CSS (+ Dreamweaver/VS Code), per the syllabus.
The tools above are for your **awareness** so you can *choose* wisely in future projects (CLO3) —
they are NOT examined and NOT required for the capstone.

---

# 📋 SUMMARY

| Idea | Takeaway |
|------|----------|
| Choosing ≠ coding | Selection is comparing alternatives against needs |
| 5 criteria | Fit, Cost, Learning curve, Community, Maintenance |
| Score + justify | Number each 1–5 and write one reason per score |
| Know the landscape | Frameworks, CMS, generators, hosting each solve a different problem |
| Right-size the tool | Small static site → plain HTML/CSS is usually correct |

---

# 🛠️ PRACTICE — DECISION EXERCISE

### TASK 1: Score a real scenario

**Situation:** A local restaurant owner (non-technical) wants a website to show the menu, opening hours,
and a phone number. She will want to change prices herself every week and has no budget for a developer.

Using the 5-criterion framework, compare **plain HTML/CSS** vs **WordPress** vs **Wix** and fill a table
like the worked example. Then write a 3-sentence recommendation to the owner in plain language.

✅ **What to check in your answer:**
- Did you weight "owner can edit without a developer" highly? (That favours a CMS/site-builder.)
- Did you note cost and learning curve for the owner, not for you?
- Is your recommendation justified, not just a guess?

💾 **File to save:** `notes/technology-choice-restaurant.md`

### TASK 2: Justify the course's own choice

Write 5 sentences explaining why this course uses plain HTML/CSS for the Student Club Website,
using the 5 criteria. (This is also good revision for the final exam.)

---

# 🔗 FURTHER READING

- [MDN — Choosing and installing tools](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Installing_basic_software)
- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://www.netlify.com/)
- [WordPress.org](https://wordpress.org/)

---

# ⏭️ WHERE THIS FITS

Read this appendix after **Session 11** (site planning) and again before the **final exam**,
when you may be asked to justify a technology or structure choice.
