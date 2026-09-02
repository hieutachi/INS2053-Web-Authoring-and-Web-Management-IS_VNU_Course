# INS2053 — Course Schedule

**Course:** Web Authoring and Web Management (INS2053) — 4 credits  
**Prerequisite:** INT1004 (Fundamentals of Computer Science 2)  
**Language:** English  
**Session duration:** 3 periods (150 minutes) per week  

---

## Assessment Overview

| Component | Weight | When |
|---|---|---|
| Attendance & Participation | 10% | Ongoing |
| Midterm Exam (practical) | 30% | Week 8 |
| Final Exam (practical) | 60% | End of semester |

> **Note:** The Final Exam (60%) includes both the practical exam and the capstone project evaluation (Student Club Website, 40 points from milestones M1–M8).

**Homework deadline:** Every Sunday at 23:59. Grading stops Monday of the following week.

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
Two course-wide decks sit alongside the per-session ones: `canvases/ins2053-overview.canvas.tsx` (syllabus tour, use in Week 1) and `canvases/ins2053-bai-giang.canvas.tsx` (9 highlight diagrams, useful for revision in Weeks 8 and 15).

---

## Key Dates

| Date | Event |
|---|---|
| Week 8 | Midterm Exam (90 minutes, practical, no internet) |
| Week 15 | Final Exam (90 minutes, practical, no internet) |
| Every Sunday 23:59 | Homework submission deadline |

---

## Capstone Project: Student Club Website

A single project runs through all 15 weeks. Students build a multi-page website for a student club, adding features each week as they learn new skills.

| Milestone | Due | Content |
|---|---|---|
| M1 | Week 3 | Project structure initialized, basic pages created |
| M2 | Week 4 | Text, images, and basic CSS applied |
| M3 | Week 6 | Multi-page layout with navigation |
| M4 | Week 8 | Typography and fonts polished |
| M5 | Week 10 | Tables and multimedia added |
| M6 | Week 12 | Site refined, code validated |
| M7 | Week 14 | Contact form added |
| M8 | Week 15 | Complete responsive site with all features |

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
