# PLAN — expand teaching depth (canvases to 30–35 slides, ebook to W3Schools-grade)

Written 2026-09-01. Goal set by the course owner: students self-study up to 90% of
the material, so the **teaching content itself** must carry the load — not the
lecturer's voice. Every session deck needs enough theory, in-class practice and
an immediately-assignable exercise to stand on its own.

## 0. State at start (measured, not assumed)

- QA: **PASS** on all 9 checks, both runners (`qa-canvases.sh`, `qa-canvases.js`).
- Stripper tests: 19/19.
- Snapshot taken: `_tools/backups/snapshot-20260901-1107/` (17 canvas + 16 ebook, 1.4M).
  This is the only rollback point — the package is not a git repo and the older
  `.bak` files predate the current decks.
- Slide counts today:

| deck | slides | gap to 30 | deck | slides | gap to 30 |
|---|---|---|---|---|---|
| buoi-01 | 28 | 2 | buoi-09 | 22 | 8 |
| buoi-02 | 29 | 1 | buoi-10 | 22 | 8 |
| buoi-03 | 29 | 1 | buoi-11 | 22 | 8 |
| buoi-04 | 28 | 2 | buoi-12 | 22 | 8 |
| buoi-05 | 26 | 4 | buoi-13 | 21 | 9 |
| buoi-06 | 22 | 8 | buoi-14 | 22 | 8 |
| buoi-07 | 22 | 8 | buoi-15 | 22 | 8 |
| buoi-08 | 22 | 8 | | | |

Total new slides to reach 30 everywhere: **~91**. Ebook chapters are 4.3k–7.7k
words; the W3Schools-but-more-practical target implies roughly +40% per chapter,
concentrated in runnable examples rather than prose.

**Honest scope note.** ~91 slides plus 16 chapter expansions is not a 3-hour job
at the quality bar this package already holds (hand-written SVG diagrams, 4-colour
grammar, 11px type floor, English-only labels). What fits in one sitting is a
*vertical slice done properly* — the standard, then the thinnest decks. Volume
without the standard would just be work the next session has to undo.

## 1. The house slide spine (derived from buoi-01 / buoi-02, the strongest decks)

Every deck follows this order. Slides marked **NEW** are what the thin decks lack.

| # | slide | id pattern | purpose |
|---|---|---|---|
| 1 | Title | `sNN-title` | session number, title, one-line promise |
| 2 | Learning Objectives | `sNN-objectives` | 5–6 verifiable outcomes |
| 3 | Session Timeline | `sNN-agenda` | the 150-minute plan |
| 4 | Warm-Up Questions | `sNN-warmup` | activates prior knowledge |
| 5 | Concept 1 — why it matters | `sNN-<concept>` | motivation before syntax |
| 6 | Concept 1 — the diagram | — | inline SVG, house rules |
| 7 | Concept 1 — syntax | — | `<Code>` block, minimal |
| 8 | **NEW** Concept 1 — *Try it now* | `sNN-try-1` | 5-min task, done at the desk |
| 9 | Quick Check 1 | `sNN-quickcheck-1` | 3 questions + answer key |
| 10–14 | Concept 2 — same 5-beat shape | | |
| 15–19 | Concept 3 — same 5-beat shape | | |
| 20 | Reference table | `sNN-reference` | the lookup students keep |
| 21 | Worked Example 1 | `sNN-worked-example` | full file, step-by-step |
| 22 | **NEW** Worked Example 1 — *your turn* | `sNN-worked-variant` | same shape, new data |
| 23 | Worked Example 2 | `sNN-worked-example-2` | second context |
| 24 | Do vs Don't | `sNN-do-dont` | two columns, `tone="danger"` |
| 25 | Common Mistakes | `sNN-mistakes` | the errors seen in marking |
| 26 | **NEW** Debug This | `sNN-debug` | broken snippet, students find the bug |
| 27 | In-Class Practice | `sNN-practice` | Task 1..N, 20 min |
| 28 | **NEW** Practice — checkpoints | `sNN-practice-check` | how to know each task is right |
| 29 | **NEW** Assignment (given now) | `sNN-assignment` | deliverable + acceptance criteria |
| 30 | Homework | `sNN-homework` | due date, submission form |
| 31 | Recap & Next | `sNN-recap` | what was covered, what's next |

The five **NEW** kinds are the pedagogical gap: today's decks explain and then
assign homework, with nothing in between that a self-studying student can use to
check themselves mid-session.

## 2. Non-negotiables for anyone (human or agent) touching a deck

1. Read [HANDOVER-canvas-diagrams.md](HANDOVER-canvas-diagrams.md) §3 first — the
   diagram house rules. viewBox 560, 11px type floor, `ON_FILL="#0B1220"`,
   4-colour grammar, `role="img"` + full-sentence `aria-label` per `<svg>`.
2. **English only** inside slides and diagrams. Check 8 fails on non-ASCII.
3. Import only what you use; check 3 flags the rest. Every `function X` must be
   mounted on a slide; check 2 hard-fails otherwise.
4. One slide per edit. Use `_tools/replace-once.js` (refuses ambiguous matches) or
   `_tools/splice-lines.js` for ranges. Never batch many slide edits into one write.
5. **Run the gate after every deck**, from `canvases/`:
   `bash ../_tools/qa-canvases.sh` or `node ../_tools/qa-canvases.js`.
   A BAD line from check 1 is now real — do not reshape a label to satisfy it.
6. Content must be **runnable and real**: every code block should work if pasted.
   Prefer the Student Club Website domain already used across the package so the
   capstone accumulates instead of restarting.
7. No new dependencies, no `package.json`, no build step.

## 3. Execution order (thinnest and highest-teaching-load first)

Wave A — the standard, proven on one deck end to end:
- [x] A1. buoi-13 (21 slides, thinnest; forms = highest self-study value) → 31
- [x] A2. QA gate + read back the diff; fix anything the gate reports
- [x] A3. Record the pattern actually used, so later waves copy a real deck

Wave B — remaining thin decks, in teaching-load order:
- [x] B1. buoi-06 (layout, the chapter with weakest visual density)
- [x] B2. buoi-09 (tables)
- [x] B3. buoi-12 (code tools)
- [x] B4. buoi-14 (nav / Spry→CSS migration)
- [x] B5. buoi-15 (responsive; already has 4 diagrams, needs practice beats)
- [x] B6. buoi-07, buoi-08, buoi-10, buoi-11

Wave C — near-target decks, top up to 30:
- [x] C1. buoi-05 (+4), buoi-01 (+2), buoi-04 (+2), buoi-02 (+1), buoi-03 (+1)

Wave D — ebook, per chapter (independent of the decks, safe to run in parallel):
- [x] D1. Add a *Try it yourself* block after each concept section
- [x] D2. Add a `<details>` self-check per section (only 2 of 16 chapters have these)
- [x] D3. Add a "common errors and what the browser shows you" table per chapter
- [x] D4. Cross-link each chapter section to the matching canvas diagram

## 3a. What was actually delivered

Decks — all 15 at 30–34 slides, full spine (Do vs Don't, Try It Now, Debug This,
Accessibility, Practice Checkpoints, Assignment), open/close parity, unique
slide ids, no missing imports.

Ebook — per chapter: 4–5 `Try It Yourself` blocks with an expected result and a
`<details>` explanation; 8 self-check Q&A; a 4-column symptom/cause/confirm/fix
error table of 8–12 rows; and 3–4 diagram cross-links placed under the relevant
`## N.` section headings.

Chapter 08 is deliberately different: it keeps its 36-pair worked-exam format
and carries no self-check or error table, since the whole chapter is practice.
It does carry diagram cross-links.

Two tools were added for D4, both re-runnable and non-destructive:

    node _tools/insert-diagram-links.js ebook [--dry]   # insert, idempotent
    node _tools/check-diagram-links.js .                # verify all resolve

The inserter matches sections by their `## N.` number rather than by line, skips
sections that already carry a link, ignores `## N.` lines inside fenced code
blocks (chapter 11's requirements template), and validates every mapping before
writing anything.

## 3b. Wave E — exercise self-check (added this pass)

The gap D1–D4 did not cover: `exercises/` had **zero** self-check affordances.
Only `session-08` carried an `## Answer Key`, because it is the midterm practice
sheet. The other 14 sheets ended at `## Checklist` — a student working alone had
tasks to do and no way to find out whether the result was right, or why.

Added `## Self-Check (answers included)` to all 14, placed between
`## Expected Result` and `## Checklist` so section order stays uniform. Four
`<details>` blocks each, 56 in total, following the same reveal-after-you-try
pattern already used in ebook chapters 08 and 14:

- Q1–Q3: a symptom the student will actually hit ("styling disappeared on
  `pages/contact.html`", "the tab still says Untitled Document", "media queries
  work in DevTools but not on the phone"), answered with the cause and the way to
  confirm it in DevTools — not just the fix.
- Q4: a **challenge with no code in the question**. The student writes it first;
  the reveal gives a reference solution plus the two or three specific things to
  compare against.

`session-08` was left alone — it already has the equivalent, in its own format.

`homework/` was deliberately **not** given answer keys. Homework is graded and
has a rubric; publishing solutions would remove the assessment. The self-check
belongs on the in-class sheet, which is the one a student repeats at home.

Measured effect: `exercises/` went from 17.165 to 25.105 words (+7.940), and from
1 self-check affordance across 15 files to 15 of 15.

Verified by `node _tools/audit-selfstudy.js` (added this pass, reads only, writes
`_tools/audit-selfstudy.txt`): 78 markdown files clean — fences closed,
`<details>`/`<summary>` balanced, no BOM, no U+FFFD, no agent artefacts; 15/15
exercises carry Self-Check *and* it precedes Checklist in every one.
`qa-canvases.js` still PASS and `check-diagram-links.js` still resolves 49/49.

That script exists because grep-based counting was wrong twice. Chapter 14 teaches
*replacing Spry with `<details>`*, so it contains many `<details>` inside code
fences as teaching examples; a naive grep reported 58 self-check blocks there and
253 across the ebook. Parsing with a fence state machine (and stripping inline
code spans per line, not across the joined file) gives 12 and 206. Do not grep
markdown for markup that markdown also displays as content.

## 4. Verification, honestly bounded

The gate proves structure only: brackets, mounted functions, imports, svg a11y,
type floor, dangling ids, English labels, estimated text width. It cannot prove
TypeScript types, `qoder/canvas` prop correctness, or rendered appearance.
**Open at least one edited deck in the canvas host and look at it** before
teaching. That check nothing in `_tools/` can do.
