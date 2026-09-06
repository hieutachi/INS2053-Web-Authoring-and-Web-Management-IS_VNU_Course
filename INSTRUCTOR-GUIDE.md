# INS2053 — Instructor Guide

A single reference for anyone teaching INS2053 (Web Authoring and Web Management) at VNU International School. Covers course philosophy, materials, teaching workflow, assessment, and troubleshooting.

---

## 1. Course Overview

| | |
|---|---|
| **Course** | INS2053 — Web Authoring and Web Management |
| **Credits** | 4 (3 periods × 15 weeks = 150 min/week) |
| **Level** | Beginner — prerequisite: INT1004 (Fundamentals of Computer Science 2) |
| **Language** | English (international students) |
| **Students build** | A 5-page Student Club Website across 15 weeks |
| **Tools taught** | HTML5, CSS3, Dreamweaver CS6 / VS Code, Git basics |

### Assessment

| Component | Weight | Details |
|---|---|---|
| Attendance, Participation & Homework | 10% | Homework graded out of 10 each session; combined with attendance |
| Midterm Exam (practical) | 30% | Week 8, 90 min, no internet, covers sessions 1–7 |
| Final Exam (practical) | 20% | Week 15, 120 min, no internet, covers whole course |
| Capstone Project | 40% | 5-page website, 8 milestones (M1–M8), due Week 16 |

**Allowed in both exams:** students' own notes, the `ebook/` chapters offline, and their project files. **Not allowed:** the internet, or messaging between students.

### Late Work Policy

- Homework: marked until Monday 23:59 of the following week (one grace day), −20% of earned mark. Nothing marked after that.
- Project milestones M1–M6: same rule — one grace day at −20%, then points lost.
- Final ZIP (M7 + M8): −10% per day late (see `project/spec.md` §8).
- If illness or documented reason stops submission, student must contact the lecturer **before** the deadline.

---

## 2. What's in the Package

### Materials Map

Every session `NN` (01–15) has **five matching pieces**. Replace `NN` with the session number:

| Material | Path | Who uses it | When |
|---|---|---|---|
| Textbook chapter | `ebook/NN-*.md` | Students | **Before** class |
| Lecture slides (Marp) | `slides/NN-*.md` | Lecturer | During class |
| Canvas deck (SVG diagrams) | `canvases/buoi-NN.canvas.tsx` | Lecturer (project) | During class, at key concepts |
| In-class exercise | `exercises/session-NN/exercise.md` | Students + lecturer | During class |
| Homework | `homework/session-NN/homework.md` | Students | After class, due Sunday 23:59 |

**Naming convention:** mechanical. Session 4 → `ebook/04-*.md`, `slides/04-*.md`, `canvases/buoi-04.canvas.tsx`, `exercises/session-04/`, `homework/session-04/`. The title slide of each deck prints its sibling paths, so you can find everything from the projector.

### Additional Resources

| Resource | Path | Purpose |
|---|---|---|
| Student website | `site/` | Public portal (ebook + decks + homework), deployed to Vercel |
| HTML slides | `slides-html/` | Canvas decks rendered as standalone HTML — open `slides-html/index.html`, no install needed |
| Self-check tool | `site/cham-bai.html` or `_tools/grader/cham-bai.html` | Browser-only homework grader (262 KB, offline) |
| Example website | `examples/student-club/` | 5-page reference implementation — study, don't copy |
| Course schedule | `schedule.md` | 15-week plan with all key dates |
| Grading guide | `HUONG-DAN-cham-bai.md` | Full auto-grader workflow (student + instructor + maintainer) |
| References | `references/resources.md` | Curated links: MDN, W3C, tools, tutorials |
| Capstone spec | `project/spec.md` | Full project specification with personas and mockups |
| Project milestones | `project/milestones.md` | M1–M8 checklists with point splits (authoritative) |
| Project rubric | `project/rubric.md` | 7 categories, 76 line-items, 40 + 3 bonus points |
| Course-wide diagrams | `canvases/ins2053-bai-giang.canvas.tsx` | 9 highlight diagrams — useful for revision in Weeks 8 and 15 |
| Syllabus dashboard | `canvases/ins2053-overview.canvas.tsx` | Assessment chart, CLO table, 15-week overview (not a slide deck) |

---

## 3. Teaching a Session (150 min)

### Suggested Rhythm

1. **Lecture (50–60 min)** — Work through the matching `ebook/` chapter and `slides/` deck. When you reach a concept students usually get wrong, project the matching `canvases/buoi-NN.canvas.tsx` — each chapter lists its diagrams by name under `🖼 Diagrams:` in the session-info block.

2. **Guided practice (45–60 min)** — Run the matching `exercises/session-NN/exercise.md` together. Each exercise states its time estimate under *Time Required*. Walk around, help students who are stuck. The exercise file has a `## Self-Check (answers included)` section at the end — do NOT show this during class. Use it after students have attempted the tasks.

3. **Independent work (20–30 min)** — Students start the week's homework. Remind them it's due **Sunday 23:59** and they can use the self-check tool before submitting.

### Week 1: Special Considerations

Week 1 is the students' first encounter with the course. In addition to the normal rhythm:

- Walk through the **course overview** (`canvases/ins2053-overview.canvas.tsx` or `canvases/buoi-01.canvas.tsx` → slide `s01-course-map`) so students understand the 15-week arc.
- Show students the **student website** (`site/index.html`) — this is their primary learning portal.
- Point them to the **orientation page** (`site/orientation.html`) which explains how to read the ebook, use the self-check tool, and navigate the course.
- Walk through the **Git setup** steps they'll need for homework submission (if using GitHub).
- Ensure everyone has a working code editor (Dreamweaver CS6 on lab machines, or VS Code on personal laptops).

### Week 8: Midterm Review

- The midterm covers sessions 1–7 and is a **practical exam** (90 min, no internet).
- Use `canvases/ins2053-bai-giang.canvas.tsx` (9 highlight diagrams) for visual revision.
- Chapter 08 (`ebook/08-review-and-midterm.md`) has 36 `<details>` self-check blocks — ideal for revision.
- Sample exam + solution + rubric are in `exams/midterm/`.

### Week 15: Final Review + Exam

- The final covers the whole course (focus on sessions 9–15), 120 min practical.
- Sample exam + solution + rubric are in `exams/final/`.
- Chapter 15 has a `### Desktop-First vs Mobile-First` section explaining both approaches (the course teaches `max-width` / desktop-first per the exam rubric, but students should know `min-width` exists).

---

## 4. Assessment Workflow

### 4.1 Homework (Weekly, 10%)

Each homework sheet (`homework/session-NN/homework.md`) has:
- **Task 1 + Task 2** with clear requirements
- A **Grading Rubric** (10 points total)
- No published answer keys (intentional — homework is graded)

**Student self-check flow:** Before submitting, students open the self-check tool, choose the session, and load their files. The tool grades the mechanical half (`AUTO` tier) and flags what needs human judgment (`ASSIST`/`MANUAL` tiers).

**Instructor grading flow:** See `HUONG-DAN-cham-bai.md` §7–9 for the full workflow:
1. Collect PNG/PDF + JSON from each student
2. Verify JSON integrity with `node _tools/grader/regrade.mjs`
3. Grade the `ASSIST` and `MANUAL` rows yourself
4. Record marks (no built-in gradebook yet — use a spreadsheet)

### 4.2 Capstone Project (40%)

A single project runs all 15 weeks. Students build a 5-page Student Club Website:
- `index.html`, `about.html`, `activities.html`, `media.html`, `contact.html`
- Flat structure: only `css/`, `images/`, `media/` as subfolders

**8 milestones** fall at least one week after the session that teaches the required skills:

| Milestone | Due | Content |
|---|---|---|
| M1 | Week 4 | Project structure, basic pages |
| M2 | Week 5 | Text, images, basic CSS |
| M3 | Week 7 | Multi-page layout with navigation |
| M4 | Week 9 | Typography and fonts |
| M5 | Week 11 | Tables and multimedia |
| M6 | Week 14 | Contact form |
| M7 | Week 16 | Complete responsive site |
| M8 | Week 16 | Final polish, validation, ZIP submission |

Authoritative checklists and point splits are in `project/milestones.md`. If `project/milestones.md` and `project/rubric.md` ever disagree, `milestones.md` wins.

### 4.3 Exams (Midterm 30%, Final 20%)

Both are practical, hands-on, no internet. Rubrics and sample solutions are in:
- `exams/midterm/` — rubric.md, sample-exam.md, sample-solution.md
- `exams/final/` — rubric.md, sample-exam.md, sample-solution.md

---

## 5. Using the Materials in Class

### The Ebook

- 15 chapters + Appendix A, ~118,000 words total
- Each chapter has: session-info block, learning objectives, theory, worked examples, **Try It Yourself** blocks (58 total), **Common Errors** tables (14 chapters), **Self-Check** with `<details>` answers (206 blocks), self-assessment worksheet, further reading
- **How to read the ebook:** Each `🧪 Try It Yourself` block tells the expected result — students can check themselves immediately. The `<details>` blocks hide answers until clicked.
- **Canvas diagram references:** Every chapter has a `🖼 Diagrams:` line listing which canvas diagrams to project and when.

### The Slides

Three slide formats exist:
1. **Marp markdown** (`slides/`) — source, used for editing
2. **Canvas TSX** (`canvases/`) — interactive decks with 60 hand-drawn SVG diagrams
3. **HTML slides** (`slides-html/`) — pre-rendered standalone HTML, open in any browser

**In class:** Use the HTML slides (`slides-html/buoi-NN.html`) for projection. Navigation: `j`/`k` to move, `n` for speaker notes. Toggle light/dark with the button. Use Print to PDF for handouts (expand notes first with `n` if needed).

### The Self-Check Tool

`cham-bai.html` is a single 262 KB file that works offline. It:
- Reads student HTML/CSS as text (never executes code)
- Grades against 15 JSON rubrics (76 criteria, 42 check types)
- Shows three tiers: `AUTO` (machine), `ASSIST` (needs your judgment), `MANUAL` (only you can grade)
- Exports PNG screenshot, PDF, and JSON with SHA-256 integrity hash

**How to distribute:** Either share the Vercel URL (`https://ins2053-web-course.vercel.app/cham-bai.html`) or send the `_tools/grader/cham-bai.html` file directly. SHA-256 only works over HTTPS or `file://` — NOT over `http://<LAN-IP>`.

### What's Deliberately Not Published

The site uses an **allowlist** (not a blocklist). These are excluded on purpose:

| Excluded | Why |
|---|---|
| `exercises/` | Each sheet carries a worked answer key (`## Self-Check`) |
| `exams/` | Contains full sample solutions |
| `project/rubric.md` | Marking rubric |
| `canvases/`, `_tools/`, `_archive/` | Source and tooling |

---

## 6. Rebuilding and QA

### When to Rebuild

- After editing any `canvases/*.canvas.tsx`: run `npm run build:slides` then `npm run build:site`
- After editing any `ebook/`, `slides/`, or `homework/` source: run `npm run build:site`
- After editing grader source/rubrics: run `npm run build:grader` then `npm run build:site`

### Quick Reference

```bash
# Full rebuild + QA (run before every deploy)
npm run build:slides    # canvases → slides-html/
npm run build:site      # grader artifact + site/
npm run qa              # canvases + slides QA
npm run qa:site         # 14 QA groups on site output
npm run qa:grader       # 11 gates on grader (15 sessions)
```

### QA Baseline (must pass before deploy)

| Check | Baseline |
|---|---|
| `npm run qa:grader` | 15/15 sessions, 76 rubric rows, 42 check types, G1–G11 PASS |
| `npm run build:site && npm run qa:site` | 69+ pages, 14/14 groups PASS |
| `npm run qa` | Canvases + slides QA PASS |

### Deploying to Vercel

Normal path: push `main` for Vercel Git integration auto-deploy, or `npx vercel --prod`.

If CLI returns `BLOCKED` / `TEAM_ACCESS_REQUIRED`, see `HUONG-DAN-cham-bai.md` §12 for the prebuilt deploy workaround.

**Always verify production through `https://ins2053-web-course.vercel.app` only.** Deployment-specific URLs sit behind SSO.

---

## 7. Known Traps

1. **OneDrive sync** can briefly hide or duplicate files. If a file seems to vanish, wait or check `git status`, not just Explorer.
2. **PowerShell execution policy** blocks `npm.ps1` in this environment. Run npm via `cmd /c "npm run ..."`.
3. **`colspan` casing in canvas.jsx** is lowercase on purpose — React 19 dev renderer passes camelCase `colSpan` through verbatim, which breaks W3C-valid HTML. One dev-mode console warning is the accepted cost.
4. **Git LF normalization** (`.gitattributes`) — CRLF warnings in `git diff` are noise, not corruption.
5. **Slides need `build:slides` before `build:site`** — the site copies decks from `slides-html/`. If you edit a canvas and rebuild the site without rebuilding slides first, the site gets stale decks.
6. **`vercel build` rewrites `package-lock.json`** — revert it after deploying (`git checkout -- package-lock.json`).

---

## 8. Pedagogical Notes

### Self-Study Capability

The package is designed so students can self-study ~90% of the material:

| Support layer | Coverage |
|---|---|
| Exercise with answer keys (`Self-Check`) | 15/15 |
| Chapter with `Try It Yourself` (with expected results) | 14/16 |
| Chapter with Common Errors table | 14/16 |
| Chapter with `<details>` self-check | 15/16 |
| Exam with sample solution | 2/2 |
| Example website | 5 pages + CSS |
| Homework with answer key | 0/15 *(intentional — homework is graded)* |

### Content Design Strengths

- **Short paragraphs:** Longest prose paragraph outside code fences is 8 lines; 12/16 chapters have longest paragraph at 1–2 lines. Students won't feel overwhelmed.
- **Progressive difficulty:** HW01 = basic HTML, HW15 = responsive + review. Milestones fall ≥1 week after the teaching session.
- **Honest handling of outdated content:** Chapter 10 says "ignore old Flash tutorials." Chapter 14 teaches replacing Spry with modern CSS, not using Spry as if it's still alive.
- **Missing images in example are intentional:** `examples/student-club/README.md` explains this mirrors what students will do.

### Known Content Issues (as of Sep 2026)

1. **Desktop-first bias:** All 27 breakpoints use `max-width`; the course teaches desktop-first per the exam rubric. Chapter 15 now explains both approaches. Canvas diagrams teach both directions.
2. **`min-width` not in exercises/homework/slides:** Only added to ebook (ch15) and canvases. Changing this mid-semester would require updating all 5 material layers simultaneously.
3. **Appendix A is thin** (1,333 words) — could be expanded to 2,500–3,000 words answering "why learn Dreamweaver in 2026."

---

## 9. Frequently Asked Questions

**Q: Where do I find the diagram to project for a specific concept?**
A: Each ebook chapter has a `🖼 Diagrams:` line listing the canvas file and diagram names. The HTML slide decks include all diagrams rendered.

**Q: A student says the self-check tool gives them a different score than I did.**
A: The tool only grades the mechanical half. Your manual assessment of `ASSIST` and `MANUAL` rows determines the final mark. Run `regrade.mjs` on their JSON to verify the machine portion.

**Q: Can I change a rubric mid-semester?**
A: You can, but follow the order in `HUONG-DAN-cham-bai.md` §13: edit the homework markdown first, then the JSON rubric, then fixtures, then run QA. Never change expected.json just to make gates pass.

**Q: How do I share the grading tool with students?**
A: Either the HTTPS URL or send the HTML file directly. Do NOT serve it over HTTP from a LAN IP — SHA-256 won't work.

**Q: Where are the exercise answer keys?**
A: In each `exercises/session-NN/exercise.md`, under `## Self-Check (answers included)`. These are NOT published on the student site — hand them out in class.
