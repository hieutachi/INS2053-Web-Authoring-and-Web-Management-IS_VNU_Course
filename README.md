# INS2053 — Web Authoring and Web Management

**Course package** — everything needed to teach and learn this 4-credit course.

- **Repository:** <https://github.com/hieutachi/INS2053-Web-Authoring-and-Web-Management-IS_VNU_Course> (private)
- **Level:** Beginner (prerequisite: INT1004)
- **Language:** English
- **Length:** 15 weeks, 3 periods (150 min) per week
- **Assessment:** Attendance, Participation & Homework 10% · Midterm 30% · Final 60%

---

## Where everything lives

| Folder | What it is | Who uses it |
|---|---|---|
| `schedule.md` | The 15-week plan, key dates, deadlines | Everyone — **start here** |
| `ebook/` | The student textbook: 15 chapters + Appendix A (choosing technologies, CLO3) | Students (primary reference) |
| `slides/` | Lecture slide decks (Marp markdown) | Lecturer |
| `canvases/` | 17 interactive lecture decks with 60 hand-drawn SVG teaching diagrams — `buoi-01`...`buoi-15` (51 diagrams) plus two course-wide decks (9) | Lecturer (project in class) |
| `exercises/` | In-class practice, one per session | Students, in class |
| `homework/` | Weekly homework, one per session | Students, due Sunday 23:59 |
| `exams/` | Midterm & final papers + rubrics + solutions | Lecturer (solutions), students (sample papers) |
| `project/` | Capstone spec, milestones, rubric | Everyone |
| `examples/` | A **complete working example** website | Students (reference only — do not copy) |
| `references/` | Curated links (MDN, W3C, tools) | Everyone |
| `_tools/` | Re-runnable, non-destructive QA and audit scripts, plus the HTML slide builder | Maintainers |
| `slides-html/` | The `canvases/` decks rendered as standalone HTML — open `slides-html/index.html`, no build or install needed | Lecturer, students |

---

## How to teach a session (150 min)

A suggested rhythm for each 3-period week (150 min including two short breaks):

1. **Lecture (50–60 min)** — work through the matching `ebook/` chapter and `slides/` deck. Project `canvases/buoi-NN.canvas.tsx` when you reach a concept students usually get wrong; each chapter's session-info block lists its own diagrams by name under `🖼 Diagrams:`.
2. **Guided practice (45–60 min)** — run the matching `exercises/session-NN/exercise.md` together. Each exercise states its own estimate under *Time Required* (45–60 min).
3. **Independent work (20–30 min)** — students start the week's homework; it is due **Sunday 23:59**.

Every file for session `NN` shares that number: `ebook/NN-*.md`, `slides/NN-*.md`, `canvases/buoi-NN.canvas.tsx`, `exercises/session-NN/`, `homework/session-NN/`. The title slide of each deck prints its own sibling paths, so you can find the rest from the projector. See `schedule.md` → *Material for each session*.

The capstone project grows a little every week. Milestones are in `project/milestones.md`.

---

## How to study (for students)

1. Read the week's `ebook/` chapter **before** class. Each chapter has
   `🧪 Try It Yourself` blocks — do them; each one tells you the expected result,
   so you can tell straight away whether you got it right.
2. Do the in-class exercise during class.
3. Afterwards, work through `## Self-Check (answers included)` at the end of that
   exercise. Answer from your own files first, then open each arrow to compare.
   The last question gives you no code — write it yourself before revealing it.
4. Finish the homework and push it to your GitHub repo by **Sunday 23:59**.
5. Build your own Student Club Website a little each week. Compare it with
   `examples/student-club/` when stuck.
6. Before each exam, use the sample paper in `exams/` to practise.

**Studying alone?** The package is designed so you can. Every ebook chapter ends
with a common-errors table (symptom → cause → how to confirm → fix) and eight
self-check questions with answers; every exercise carries the Self-Check section
above; `exams/` includes worked solutions, and `exercises/session-08/` is a full
practice paper with an answer key. Homework is the one thing with no published
answers — it is graded, and the rubric tells you what is being looked for.

---

## Important notes

- **Deadlines:** homework is due every Sunday 23:59. Grading stops Monday.
- **Exams:** both are practical, 90 minutes, **no internet**.
- **The example is a reference, not an answer key.** Study `examples/student-club/`, then build your own.
- Maintainers can run `npm run qa` before publishing changes: it chains
  `_tools/audit-selfstudy.js`, `_tools/qa-canvases.js`, `_tools/check-diagram-links.js`
  and `_tools/qa-html-slides.mjs` (10 checks on `slides-html/`). Rebuild the HTML
  slides first if any canvas changed, so QA reads current output.

---

## Lecture slides as HTML

`canvases/*.canvas.tsx` needs a canvas host to display. `slides-html/` is the same
17 decks — all 484 slides, all 61 diagrams, all speaker notes — as plain HTML that
opens in any browser with no install:

```
slides-html/index.html          all decks, in teaching order
slides-html/buoi-NN.html        one page per session
```

Each page has a filterable slide index, `j`/`k` navigation, a light/dark toggle, a
notes toggle, and print styles — use the browser's Print to PDF for handouts.
Expand the notes first (`n`, or the Expand notes button) if you want them in the PDF.

Regenerate after editing any canvas:

```bash
npm install               # once: esbuild + react (dev-only)
npm run build:slides      # every deck
npm run build:slides 07   # just session 7
npm run qa:slides         # 10 checks on the generated HTML
npm run clean:slides      # delete slides-html/
```

The builder is `_tools/build-html-slides.mjs`; the layout primitives it substitutes
for the canvas host live in `_tools/canvas-runtime/`. Nothing under `canvases/` is
modified — edit the `.canvas.tsx` deck and rebuild.
