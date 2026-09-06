# INS2053 — Web Authoring and Web Management

**Course package** — everything needed to teach and learn this 4-credit course.

- **Repository:** <https://github.com/hieutachi/INS2053-Web-Authoring-and-Web-Management-IS_VNU_Course> (private)
- **Level:** Beginner (prerequisite: INT1004)
- **Language:** English
- **Length:** 15 weeks, 3 periods (150 min) per week
- **Assessment:** Attendance, Participation & Homework 10% · Midterm (practical) 30% · Final practical exam 20% · Capstone project 40%

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
| `_tools/` | Re-runnable QA/build scripts and the homework self-check source; see [`HUONG-DAN-cham-bai.md`](HUONG-DAN-cham-bai.md) | Maintainers |
| `slides-html/` | The `canvases/` decks rendered as standalone HTML — open `slides-html/index.html`, no build or install needed | Lecturer, students |
| `site/` | The **public student website** (generated): ebook + decks + homework only, organised week by week. Deployed to Vercel | Students (published) |

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
4. Before submitting homework, open `site/cham-bai.html` locally or the deployed
   `/cham-bai.html`, choose the session, and load the assignment folder or its public
   GitHub link. Fix the mechanical issues it reports; `ASSIST` and `MANUAL` rows still
   need lecturer review.
5. Finish the homework and push it to your GitHub repo by **Sunday 23:59**.
6. Build your own Student Club Website a little each week. Compare it with
   `examples/student-club/` when stuck.
7. Before each exam, use the sample paper in `exams/` to practise.

**Studying alone?** The package is designed so you can. Every ebook chapter ends
with a common-errors table (symptom → cause → how to confirm → fix) and eight
self-check questions with answers; every exercise carries the Self-Check section
above; `exams/` includes worked solutions, and `exercises/session-08/` is a full
practice paper with an answer key. Homework has no published worked answers. Its
rubric and browser self-check expose what is being looked for without replacing the
lecturer's final judgement.

---

## Important notes

- **Deadlines:** homework is due every Sunday 23:59, with a Monday grace day at −20%; nothing is marked after that. Full late-work policy in `schedule.md` → *Assessment Overview*.
- **Exams:** both are practical — midterm 90 min, final 120 min — **no internet**. You may bring your own notes, the `ebook/` chapters offline, and your project files.
- **Project:** all five pages sit flat at the project root (`index.html`, `about.html`, `activities.html`, `media.html`, `contact.html`) with only `css/` and `images/` (plus `media/`) as subfolders. Homework, exercises, `project/spec.md` and `examples/student-club/` all use this same structure.
- **The example is a reference, not an answer key.** Study `examples/student-club/`, then build your own. If you fall behind, the exercises point you there to recover missing CSS rather than retyping from Session 2.
- Maintainers can run `npm run qa` before publishing changes: it chains
  `_tools/audit-selfstudy.js`, `_tools/qa-canvases.js`, `_tools/check-diagram-links.js`
  and `_tools/qa-html-slides.mjs` (10 checks on `slides-html/`). Rebuild the HTML
  slides first if any canvas changed, so QA reads current output.

---

## Lecture slides as HTML

`canvases/*.canvas.tsx` needs a canvas host to display. `slides-html/` is the same
17 decks — all 484 slides, all 60 diagrams, and every speaker note from the source decks — as plain HTML that
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

---

## The public student website

`site/` is a static website for students, generated from the course files. It carries
the ebook, lecture decks, homework sheets, and one QA-approved browser-only homework
self-check artifact. It is organised the way the course is actually taught — one hub
page per week:

```
site/index.html                 the 15 weeks, in teaching order
site/sessions/session-NN.html   one hub per week: before / in / after class
site/ebook/NN-slug.html         the chapter
site/slides/buoi-NN.html        the deck (copied from slides-html/)
site/homework/session-NN.html   the homework sheet
site/cham-bai.html              the browser-only homework self-check tool
```

Each session hub states the same three stages, so a student always knows where they
are: **before class** read the chapter and work its `🧪 Try It Yourself` blocks, **in
class** follow the deck, **after class** use the homework brief for practice and keep
the result in their own Git repository. The self-check accepts pasted files, a local
folder, or a public GitHub URL. Text files are read within documented limits; binary
assets are retained as path-only entries. Standard repository metadata is exempt from
assignment filename checks. The result shows the complete rubric with `AUTO`, `ASSIST`,
`MANUAL`, and blocked rows; formal submission, grade recording, and final grading remain
disabled. See [`HUONG-DAN-cham-bai.md`](HUONG-DAN-cham-bai.md).

**What is deliberately not published.** The builder uses an allowlist, not a blocklist:

| Excluded | Why |
|---|---|
| `exercises/` | Each sheet carries a worked answer key (`## Self-Check`) — the lecturer hands these out in class |
| `exams/` | Contains full sample solutions for both papers |
| `project/rubric.md` | Marking rubric |
| `canvases/`, `_tools/`, `_archive/` | Source and tooling, not student-facing; only the vetted `_tools/grader/cham-bai.html` artifact is copied separately |

`npm run qa:site` fails the build if any page links into an excluded folder, so this
cannot regress by accident. It also rejects forms, uploads, request code and API
endpoints while submission is disabled. The sole named exception is
`site/cham-bai.html`, which reads work locally (or read-only from GitHub), executes no
student code, uploads nothing, and records no grade. Homework rubrics remain visible as
reference criteria.

Build and check:

```bash
npm run qa:grader         # build + 11 grader gates across all 15 rubrics
npm run build:site        # generate site/, including the vetted grader artifact
npm run qa:site           # 13 QA groups on the 69-page public output
npm run clean:site        # delete site/
```

`build:site` copies `_tools/grader/cham-bai.html` to `site/cham-bai.html` byte-for-byte;
site QA group 13 rejects any mismatch or unsafe publishing behavior. Rebuild
`slides-html/` first if a canvas changed — the site copies the decks from it.
The builder is `_tools/build-site.mjs`, the shared stylesheet and script live in
`_tools/site-assets/`, and markdown is rendered with `marked` (pinned). Every path in
the output is relative, so the folder works when opened locally as well as when served.

Deploy notes, including what to do when `vercel --prod` is refused with
`BLOCKED` / `TEAM_ACCESS_REQUIRED`, are in
[`HUONG-DAN-cham-bai.md`](HUONG-DAN-cham-bai.md) §12.
