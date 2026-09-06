# INS2053 — Student Guide

Welcome to INS2053 — Web Authoring and Web Management! This guide explains how the course materials are organized, how to use each resource, and what to expect over 15 weeks.

---

## 1. What You'll Learn

By the end of this course you will be able to:
- Write HTML5 and CSS3 from scratch
- Build a multi-page website with navigation, images, tables, forms, and responsive layout
- Use VS Code (or Dreamweaver CS6) as your code editor
- Use Git and GitHub for version control
- Validate and debug your code using browser developer tools

You'll build a **Student Club Website** (5 pages) as your capstone project, adding new features each week as you learn them.

---

## 2. Your Weekly Rhythm

Each week follows the same three-step pattern:

### Before class
Read the **ebook chapter** for that week. Each chapter has:
- **🧪 Try It Yourself** blocks — hands-on exercises with the expected result shown, so you can check yourself immediately
- **🖼 Diagrams** — references to visual teaching diagrams your lecturer will project in class
- **Common Errors** table — symptoms, causes, and fixes for mistakes students typically make
- **Self-Check** section — 8 questions with hidden answers (click to reveal)

### In class
Follow the **lecture slides** your lecturer projects. The class is 150 minutes (3 periods) with two short breaks:
1. **Lecture** (~60 min) — your lecturer walks through the chapter and projects teaching diagrams
2. **Guided practice** (~50 min) — you work on the in-class exercise with your lecturer's help
3. **Independent work** (~30 min) — you start the week's homework

### After class
Complete the **homework** for that session. Before submitting, run your work through the **self-check tool** to catch mechanical issues. Homework is due **Sunday at 23:59**.

---

## 3. How to Read the Ebook

The ebook has 15 chapters (one per session) plus Appendix A. Each chapter follows the same structure:

| Section | What it is | How to use it |
|---|---|---|
| 📌 Session Info | Duration, prerequisites, objectives, diagram references | Quick reference — read once |
| 🎯 Learning Objectives | What you'll be able to do after this session | Read before starting, check against yourself at the end |
| 📖 Theory | The actual lesson content, broken into short sections | Read through, do the Try It Yourself blocks as you go |
| 🧪 Try It Yourself | Hands-on exercises with step-by-step instructions | **Do these** — each one tells you the expected result |
| 📝 Summary | Key takeaways | Quick review after reading |
| 🔍 Common Errors | Symptom → cause → how to confirm → how to fix | Bookmark this — you'll need it when debugging |
| ✅ Self-Check | 8 questions with hidden answers | Test yourself **before** looking at answers |
| 📋 Self-Assessment | Checklist to rate your understanding | Honest self-evaluation |
| 📚 Further Reading | Links to MDN, W3C, tutorials | Deep dives when you want more detail |

### Tips for Reading

- **Don't just read — do the Try It Yourself blocks.** Each one is 2–5 minutes and tells you exactly what should happen. If your result doesn't match, re-read the preceding section.
- **Use the Common Errors table when stuck.** It lists the most common mistakes with specific debugging steps.
- **Self-Check answers are hidden for a reason.** Try to answer each question yourself first, then click to reveal. The last question in each set typically has no code provided — you write it yourself.
- **The diagram references (🖼) are for class.** Your lecturer will project those diagrams. You can also view the slide decks on the website.

---

## 4. How to Use the Session Pages

The website (`site/`) organizes everything by week. Each session page has four steps:

1. **Before class** → Read the ebook chapter
2. **In class** → Follow the lecture deck
3. **After class** → Work on the homework
4. **Check yourself** → Use the self-check tool

Start at [Session 1](site/sessions/session-01.html) and follow the flow.

---

## 5. How to Use the Self-Check Tool

The self-check tool (`cham-bai.html`) runs entirely in your browser — nothing is uploaded. It checks the mechanical parts of the homework rubric and shows you where you stand.

### Quick Steps

1. Open the tool (link on the website, or double-click the HTML file)
2. Select the correct **Session**
3. Enter your **name**, **student ID**, and **class**
4. Provide your work: paste a GitHub link, drag-drop a folder, or paste code
5. Click **Grade** and read the results
6. Fix issues, re-grade, and save the final result (screenshot + JSON)

### Reading the Results

The result card shows **four separate numbers** — do NOT add them together:

| Number | Meaning |
|---|---|
| **AUTO** | Points the machine confirmed |
| **MANUAL** | Points that need your lecturer's judgment (not yet your score) |
| **BLOCKED** | Points blocked because a file was missing (not automatically zero) |
| **TOTAL RUBRIC** | Total rubric weight (usually 10) — not your final mark |

On each line: `✓` = pass, `~` = partial, `✗` = fail, `?` = needs human review.

**The tool does NOT decide your final grade.** It checks what a machine can check. Your lecturer reviews everything else and makes the final decision.

### Saving Evidence

After your last run, save three things:
1. **Screenshot** (`Win + Shift + S`) of the result card — make sure the SHA-256 hash at the bottom is visible
2. **PDF** — click the "Print / Save PDF" button
3. **JSON** — click "Download JSON" — this contains your graded files for re-verification

---

## 6. Homework and Submission

- **One homework per session**, due **Sunday 23:59**
- **Monday grace day** available at −20% of earned mark — nothing marked after Monday 23:59
- **Grading:** each homework is graded out of 10 using the rubric on the sheet
- **No published answer keys** for homework (intentional — homework is part of your grade)
- **Use the self-check tool** before submitting to catch mechanical issues

### How to Prepare Your Homework Folder

Keep the correct file structure. Example for homework session 4:
```
homework-04/
├── index.html
├── about.html
├── css/
│   └── style.css
└── images/
    └── hero.png
```

The self-check tool expects HTML/CSS files to be in the paths the rubric specifies. Don't rename files or change folder structure unless the homework brief asks you to.

---

## 7. The Capstone Project

You'll build a **Student Club Website** with 5 pages:

| Page | Content |
|---|---|
| `index.html` | Homepage with hero section, navigation, and highlights |
| `about.html` | Club mission, team members, history |
| `activities.html` | Events schedule, past activities |
| `media.html` | Photo gallery, video embeds |
| `contact.html` | Contact form, location map |

**File structure** (flat at project root):
```
project/
├── index.html
├── about.html
├── activities.html
├── media.html
├── contact.html
├── css/
│   └── style.css
├── images/
└── media/
```

### Milestones

You add features week by week. Each milestone falls **after** the session that teaches the required skills:

| Milestone | Due | What to build |
|---|---|---|
| M1 | Week 4 | Project structure, basic pages |
| M2 | Week 5 | Text, images, basic CSS |
| M3 | Week 7 | Multi-page layout with navigation |
| M4 | Week 9 | Typography and fonts |
| M5 | Week 11 | Tables and multimedia |
| M6 | Week 14 | Contact form |
| M7 | Week 16 | Responsive layout (viewport + media queries) |
| M8 | Week 16 | Final polish and validation |

Full checklists are in `project/milestones.md`.

---

## 8. Exams

| Exam | When | Duration | Coverage |
|---|---|---|---|
| Midterm | Week 8 | 90 min | Sessions 1–7 |
| Final | Week 15 | 120 min | Whole course (focus on 9–15) |

**Both exams are practical** — you write HTML/CSS code. **No internet access** during the exam.

**What you CAN bring:** your own notes, the ebook chapters (offline), and your project files.

**Sample papers** are available on the website — use them to practice under timed conditions.

---

## 9. Resources

| Resource | Where | What it is |
|---|---|---|
| Student website | [site/](site/index.html) or Vercel URL | Your main portal — ebook, slides, homework, self-check tool |
| Ebook | `site/ebook/` | 15 chapters + Appendix A |
| Lecture slides | `site/slides/` | 17 decks with 60 teaching diagrams |
| Homework | `site/homework/` | 15 practice sheets |
| Self-check tool | `site/cham-bai.html` | Browser-only homework grader |
| Example website | `examples/student-club/` | Reference implementation — study, don't copy |
| References | `references/resources.md` | Curated links: MDN, W3C, tools, tutorials |
| Project spec | `project/spec.md` | Full capstone specification |

---

## 10. Frequently Asked Questions

**Q: I missed a class. What should I do?**
A: Read the ebook chapter for that session, do the Try It Yourself blocks, watch the slide deck on the website, and complete the homework. The ebook and slides are designed for self-study.

**Q: The self-check tool says "MANUAL" on some rows. What does that mean?**
A: Those rows need your lecturer's judgment — the machine can't evaluate things like "does your design look professional" or "is your alt text descriptive enough." Your lecturer will grade those.

**Q: Can I use the example website code in my project?**
A: Study it to understand the techniques, then build your own. Don't copy it directly — your project should be your own work.

**Q: The homework doesn't have answers. How do I know if I'm right?**
A: Use the self-check tool — it checks the mechanical parts. For the parts it can't check, compare your work with the example website and the ebook chapters.

**Q: I'm confused about `max-width` vs `min-width` in media queries.**
A: This course teaches `max-width` (desktop-first). The industry standard is `min-width` (mobile-first). Chapter 15 explains both approaches. For this course and exams, use `max-width`.

**Q: Where are the in-class exercises?**
A: Your lecturer hands them out during class. They are not published on the website because they contain the answer keys.

**Q: How do I get help if I'm stuck?**
A: 1) Check the Common Errors table in the ebook chapter. 2) Use the self-check tool to identify specific issues. 3) Compare with the example website. 4) Ask your lecturer during class or office hours.
