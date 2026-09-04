# INS2053 — Course Schedule

**Course:** Web Authoring and Web Management (INS2053) — 4 credits  
**Prerequisite:** INT1004 (Fundamentals of Computer Science 2)  
**Language:** English  
**Session duration:** 3 periods (150 minutes) per week  

---

## Assessment Overview

| Component | Weight | When |
|---|---|---|
| Attendance, Participation & Homework | 10% | Ongoing |
| Midterm Exam (practical) | 30% | Week 8 |
| Final Exam (practical) | 20% | Week 15 |
| Capstone Project (Student Club Website) | 40% | Week 16 |

> **How the 60% "Final" component splits.** The course outline lists a single 60% final
> component; this package divides it into the **final practical exam (20%)** and the
> **capstone project (40%)**. Both are marked out of their own 10- and 40-point rubrics
> (`exams/final/rubric.md`, `project/rubric.md`) and then scaled to those weights.

**Homework:** every session has one homework, due Sunday at 23:59, graded out of 10 by
the rubric printed on each sheet. Homework marks feed the **Attendance, Participation &
Homework 10%** component together with class attendance — there is no separate homework
percentage.

**Late work.** Homework is marked until **Monday 23:59** of the following week; anything
handed in during that Monday grace day loses **20% of the earned mark**, and nothing is
marked after it (0 for that sheet). Project milestones M1–M6 follow the same rule —
one grace day at −20%, then the milestone's points are lost, though the work still
counts toward the final submission. The final ZIP (M7 + M8) is governed by
`project/spec.md` §8: **−10% per day late**. If illness or another documented reason
stops you submitting, contact the lecturer **before** the deadline, not after.

---

## Weekly Schedule

| Week | Session | Topic | In-class Exercise | Homework Due |
|---|---|---|---|---|
| 1 | 1 | Introduction to Dreamweaver CS6 — *Web basics, HTML intro, VS Code* | Create first HTML file | — |
| 2 | 2 | Creating a New Site — *Project structure, file naming, Git setup* | Set up project structure | HW 01 |
| 3 | 3 | Working with Text and Images — *Headings, paragraphs, lists, img tag* | Build about page with headings, paragraphs, images | HW 02 |
| 4 | 4 | Applying CSS to Website — *External CSS, selectors, properties* | Create external stylesheet, style project pages | HW 03 |
| 5 | 5 | Creating Page Layouts — *Semantic HTML, box model* | Build layout with header, nav, main, footer | HW 04 |
| 6 | 6 | Creating Page Layouts (continued) — *Multi-page site, navigation menu* | Multi-page site with shared navigation | HW 05 |
| 7 | 7 | CSS3 and Web Fonts — *Google Fonts, text styling, transitions* | Typography and font styling | HW 06 |
| **8** | **8** | **Review & Midterm Exam** | **Midterm practical exam** | HW 07 |
| 9 | 9 | Working with Tables — *HTML tables, thead/tbody, colspan/rowspan* | Create activity schedule table | HW 08 |
| 10 | 10 | Embedding Flash, Video and Sound — *HTML5 video, audio, multimedia* | Add multimedia to project | HW 09 |
| 11 | 11 | Designing a Compact Site — *Site planning, polish, README* | Refine project into polished small site | HW 10 |
| 12 | 12 | Using Code-Editing Tools — *VS Code features, validation, debugging* | Code cleanup and validation | HW 11 |
| 13 | 13 | Creating Forms — *Form elements, input types, labels, validation* | Build contact/join form | HW 12 |
| 14 | 14 | Working with Spry Framework — *Legacy widgets + modern CSS navigation alternatives* | Add interactive navigation to project | HW 13 |
| 15 | 15 | Mobile Interface Design / Review — *Viewport, media queries, responsive intro* | Responsive basics + final review | HW 14 |

> **HW 15** (`homework/session-15/`) is set in Week 15 and due Sunday of the week after
> the last class, alongside the final capstone submission. Every other homework is set in
> session `NN` and due Sunday of week `NN+1`, so the "Homework Due" column above is always
> one number behind the session being taught.

### Material for each session

Every session `NN` has five matching pieces of material. The naming is mechanical — replace `NN` with the session number (`01`...`15`):

| Role | Path | Audience |
|---|---|---|
| Textbook chapter | `ebook/NN-*.md` | Students, read before class |
| Lecture slides (Marp) | `slides/NN-*.md` | Lecturer, project in class |
| Lecture diagrams | `canvases/buoi-NN.canvas.tsx` | Lecturer — 3-4 hand-drawn SVG teaching diagrams per session (51 across the 15 decks) |
| In-class exercise | `exercises/session-NN/exercise.md` | Students, during class |
| Homework | `homework/session-NN/` | Students, due Sunday 23:59 |

The title slide of each deck in `slides/` prints its own three sibling paths, so you can always find the matching material from the projector.
Two course-wide files sit alongside the per-session decks. `canvases/ins2053-bai-giang.canvas.tsx` is a projectable deck of 9 highlight diagrams, useful for revision in Weeks 8 and 15. `canvases/ins2053-overview.canvas.tsx` is **not** a slide deck — it is a single scrolling syllabus dashboard (assessment chart, CLO table, 15-week table) for the lecturer to read while preparing, or to screen-share once in Week 1. The Week 1 syllabus slide students see is `s01-course-map` inside `canvases/buoi-01.canvas.tsx`.

---

## Key Dates

| Date | Event |
|---|---|
| Week 8 | Midterm Exam (90 minutes, practical, no internet) |
| Week 15 | Final Exam (120 minutes, practical, no internet) |
| Week 16, Sunday 23:59 | Capstone project ZIP (M7 + M8) due |
| Every Sunday 23:59 | Homework submission deadline (Monday grace day at −20%) |

**Allowed in both exams:** your own notes, the `ebook/` chapters offline, and your project
files. **Not allowed:** the internet, or any messaging between students.

---

## Capstone Project: Student Club Website

A single project runs through all 15 weeks. Students build a multi-page website for a student club, adding features each week as they learn new skills. Every milestone below falls at least one week **after** the session that teaches its skills. `project/milestones.md` holds the authoritative checklists and point splits.

| Milestone | Due | Content |
|---|---|---|
| M1 | Week 4 | Project structure initialized, basic pages created |
| M2 | Week 5 | Text, images, and basic CSS applied |
| M3 | Week 7 | Multi-page layout with navigation |
| M4 | Week 9 | Typography and fonts polished |
| M5 | Week 11 | Tables and multimedia added |
| M6 | Week 14 | Contact form added |
| M7 | Week 16 | Complete responsive site (viewport + media queries) |
| M8 | Week 16 | Final polish, validation, and ZIP submission |

> Every milestone falls at least one week **after** the session that teaches its skills, so
> no milestone asks for something not yet covered. M7 and M8 are both handed in with the
> final submission in Week 16. The authoritative per-milestone checklists and point splits
> are in `project/milestones.md`; if the two files ever disagree, `project/milestones.md` wins.

---

## Repository Structure

```
your-repo/
├── exercises/          # In-class practice (provided by instructor)
├── homework/           # Weekly assignments (submit here)
├── project/            # Capstone project
│   ├── index.html
│   ├── about.html
│   ├── activities.html
│   ├── media.html
│   ├── contact.html
│   ├── css/
│   │   └── style.css
│   ├── images/
│   └── media/
└── README.md
```
