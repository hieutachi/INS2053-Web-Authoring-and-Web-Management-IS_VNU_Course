# Handover — INS2053 canvas diagram upgrade

**Date:** 2026-08-31
**Scope:** replacing the thin decorative SVGs in `canvases/*.canvas.tsx` with
teaching diagrams that carry real instructional load, in English, for
international students.

---

## 1. Why this work exists

The course package contains **zero image assets**. Verified:

- `find` for `png|jpg|jpeg|svg|webp|gif|pdf` across the whole package → **0 files**
- `grep '!\['` across all 16 `ebook/*.md` chapters → **0 matches in every file**
- `examples/student-club/images/` and `examples/student-club/media/` are **empty**,
  but the example HTML references 7 assets that do not exist:
  `images/club-photo.jpg`, `images/event-1.jpg`, `images/team-photo.jpg`,
  `media/podcast.mp3`, `media/podcast.ogg`, `media/workshop.mp4`, `media/workshop.webm`

So "use nicer images" was implemented as **hand-authored inline SVG** inside the
canvases. That choice is deliberate: inline SVG is theme-aware (it reads the host
theme tokens), resolution-independent for a projector, text-searchable, and needs
no asset pipeline or missing-file management.

## 2. The four defects in the original diagrams

Each original deck had exactly one SVG (session 8 had none) against 9–12 slides.
Those SVGs had:

1. **viewBox too small** — 320–460 wide, so they rendered tiny in a slide frame.
2. **Type too small** — labels at 7–12px, unreadable from the back of a lecture hall.
3. **Contrast failure in one theme** — `t.text.primary` painted on `t.chart.blue`
   is legible in one theme and nearly invisible in the other.
4. **No teaching load** — the diagram restated the slide title instead of showing
   the thing students actually get wrong.

## 3. The house rules every new diagram follows

- `viewBox="0 0 560 <h>"`, `width="100%"` — one consistent canvas width.
- **Type floor 11px, body labels 12.5–13px.** Nothing a student must read is smaller.
- `const ON_FILL = "#0B1220"` — fixed dark ink for text sitting on a saturated
  `t.chart.*` fill. Never `t.text.*` on `t.chart.*`.
- `const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"` for code.
- **Colour grammar, consistent across all 15 decks:**
  - `t.chart.blue` = structure / the markup you write
  - `t.chart.goldenYellow` = an action, a request, "look here"
  - `t.chart.green` = a result / correct / what the user finally sees
  - `t.chart.brightOrange` = a warning / wrong / deprecated
- Every `<svg>` carries `role="img"` plus a **full-sentence English `aria-label`**
  that describes what the diagram shows, not just its title.
- SVG `<marker>` / `<pattern>` / `<filter>` / gradient ids are **deck-scoped**
  (`s07-req`, `s09-grad`, …) so two diagrams on one screen cannot collide.
- **All label text is English.** The students are international; the deck prose may
  be bilingual but the diagrams are not.
- Diagrams are built around **right-vs-wrong contrast** and **real arithmetic**,
  because that is where beginners actually lose time.

---

## 4. What is DONE — the whole package

Every deck now carries house-standard diagrams, each one wired into a slide and
verified. **60 diagrams across 16 decks, 7,258 lines of canvas source.**

| Deck | Diagram | Slide it sits on |
|---|---|---|
| `buoi-01` | `RequestResponseCycle` | `how-web-works` |
| | `TagAnatomy` | `what-is-html` |
| | `HeadVsBody` | `head-vs-body` *(new slide, with speaker notes)* |
| `buoi-02` | `PathResolver` | `paths` |
| | `DotDotLadder` | `dotdot-rule` |
| | `GitFlow` | `git-basics` |
| `buoi-03` | `HeadingOutline` | `headings` |
| | `ImgAnatomy` | `images` |
| | `AltTextCompare` | `alt-text` |
| | `FormatChooser` | `image-formats` |
| `buoi-04` | `RuleAnatomy` | `s04-rule-anatomy` *(new slide, with speaker notes)* |
| | `BoxModelDiagram` | `s04-box-model` |
| | `SpecificityScale` | `s04-specificity` |
| `buoi-05` | `SemanticSkeleton` | `s05-semantic` |
| | `DisplayTypes` | `s05-display` |
| | `FlexAxesDiagram` | `s05-flexbox` |
| `buoi-06` | `MultiPageNav` | `s06-architecture` |
| | `LinkTargets` | `s06-relative-links` |
| | `ActiveClassWalk` | `s06-active-class` |
| `buoi-07` | `GoogleFontsFlow` | `s7-google-fonts` |
| | `FontStackChain` | `s7-font-stacks` |
| | `PolishLab` | `s7-corners-shadows` |
| `buoi-08` | `CourseMap` | `s8-course-map` *(new slide, with speaker notes)* |
| | `ExamBudget` | `s8-exam-format` |
| | `MarkLosers` | `s8-mistakes` |
| `buoi-09` | `TableAnatomy` | `s9-anatomy` |
| | `SpanGrid` | `s9-merging` |
| | `TableStylePreview` | `s9-styling` |
| `buoi-10` | `VideoAnatomy` | `s10-video` |
| | `CodecFallback` | `s10-video-code` |
| | `AutoplayRules` | `s10-audio` |
| | `IframeEmbed` | `s10-iframe` |
| `buoi-11` | `SiteMap` | `s11-sitemap` |
| | `DryPrinciple` | `s11-dry` |
| | `VisualHierarchy` | `s11-hierarchy` |
| | `BriefToSpec` | `s11-clo2` |
| `buoi-12` | `VSCodeLayout` | `s12-vscode` |
| | `EmmetExpand` | `s12-emmet` |
| | `ValidatorReport` | `s12-validation` |
| | `DevToolsLoop` | `s12-devtools` |
| `buoi-13` | `FormDataFlow` | `s13-what-is-form` |
| | `InputTypeGallery` | `s13-input-types` |
| | `LabelWiring` | `s13-labels` |
| `buoi-14` | `SpryVsModern` | `s14-what-is-spry` |
| | `DetailsAccordion` | `s14-modern-css` |
| | `DropdownAnatomy` | `s14-dropdown-code` |
| | `SpryRemoval` | `s14-mistakes` |
| `buoi-15` | `ViewportMeta` | `s15-responsive` |
| | `MobileFirstLadder` | `s15-media-queries` |
| | `MediaQueryAnatomy` | `s15-media-queries` |
| | `ResponsiveDevices` | `s15-media-queries` |
| `ins2053-bai-giang` | `RequestResponseCycle` | `web` |
| | `TagAnatomy` | `html` |
| | `BoxModelDiagram` | `css` |
| | `FlexAxesDiagram` | `layout` |
| | `MultiPageNav` | `multipage` |
| | `TableAnatomy` | `tables` |
| | `FormDataFlow` | `forms` |
| | `VideoAnatomy` | `media` |
| | `ResponsiveDevices` | `responsive` |

`buoi-08` went from **zero diagrams to three** — it was the only deck with none.
`ins2053-overview.canvas.tsx` has no SVG and needs none: it is a 98-line
`PieChart`/`Stat`/`Table` dashboard, not a slide deck.

Three slides were newly inserted (`head-vs-body`, `s04-rule-anatomy`,
`s8-course-map`), each with a `notes=` string written for the lecturer, not the
student. Slide-number comments in the surrounding decks were renumbered to match.

**The master deck ports finished functions verbatim** from the per-session decks
rather than carrying its own variants, so a student who saw a diagram in class
meets exactly the same picture in the overview. Its `defs` ids (`s5m`, `s5c`,
`s1sh`, `s1rs`, `s1rq`, `s13-send`) were checked unique before the port, so no
re-scoping was needed — check again if you port anything else in.

### Text that was REPLACED, not just added

Where a diagram now says the same thing better, the prose Grid it replaced was
removed rather than left underneath. This affected:
`s05-semantic`, `s05-display`, `s06-relative-links`, `s06-active-class`,
`s08-exam-format`, `s8-mistakes`, `s9-merging`, `s10-video`, `s10-video-code`,
`s15-responsive`, `s15-media-queries`. Callouts and `Code` blocks that carry
information the diagram cannot show were kept.

### One pedagogical fix worth knowing about

`MobileFirstLadder` originally labelled desktop-first "the desktop-first trap" in
warning-orange. But this package teaches `max-width` almost everywhere —
ebook `min-width`=6 / `max-width`=47, slides 0/9, exercises 2/12, homework 1/8,
exams 0/6, including ch15's learning objective and an exam checklist row. Students
would have seen the method they are **graded on** marked wrong. The canvas was
changed, not the assessments: the footer now reads "Both directions work.
min-width adds rules as the screen grows; max-width cancels them as it shrinks.
Your exercises use max-width, so read both." If you ever unify the two, change the
exercises and exams first.

---

## 5. What is NOT done — pick up here

### 5a. Cross-references — DONE, 2026-08-31

Previously: *"nothing in the 16 ebook chapters or the 15 slide decks mentions that
these 60 diagrams exist."* That is no longer true. Every chapter and every deck
now points at its own diagrams:

- **Ebook** — the normalised session-info block (see 5g) carries a `🖼 Diagrams:`
  line naming the deck **and every diagram function inside it**, verified against
  the source with a script: all 15 chapters match, 51 cited = 51 real. Appendix A
  gets an honest *"none of its own"* plus the two course-wide decks.
- **Slides** — every title slide now prints its three sibling paths
  (`Read: ebook/… · Practise: exercises/session-NN/exercise.md · Diagrams:
  canvases/buoi-NN.canvas.tsx`). All 45 paths were checked to exist on disk.
- **`README.md`** — `canvases/` was **entirely missing from the folder table**
  (`grep -i canvas README.md` returned zero hits). It now has a row, and step 1 of
  *How to teach a session* says to project the deck.
- **`schedule.md`** — new *Material for each session* table giving the mechanical
  `NN` naming rule across all five folders.

Still open: a *per-section* pointer inside the body of each chapter (the block-level
reference above tells the lecturer which diagrams exist, not which paragraph each
one illustrates). Section 4 of this document has the mapping if you want it.

### 5b. Optional: raise the slide decks' own visual density

Eleven of the fifteen Marp decks contain no diagram of any kind and lean on tables
where a picture would teach faster (`ch15` deck = 45 table rows, `ch12` = 36,
`ch03` = 24). Either import the canvas SVGs or cut the tables down.

### 5c. Two earlier claims in this handover were FALSE — do not act on them

Both appeared in an earlier revision of section 5b and were investigated and
withdrawn:

- **"Text-wall chapters."** The prose-run measure behind it was counting *across*
  code fences. Reading ch07/ch08/ch09 at the flagged lines showed `<details>` model
  answers and step-by-step checks, not walls of prose.
- **"`examples/student-club/` ships 7 broken asset references."** Intentional and
  documented in that example's own `README.md`: *"That is intentional… Leave them
  out — the pages still work… This mirrors what you will do in your own project."*

Also soften any "the ebook has no figures" framing: the ebook carries ASCII and
box-drawing diagrams (ch11=87 lines, ch14=51, ch02=43, ch12=43, ch10=37, ch15=36).
It has zero *markdown images*, which is a different and much smaller complaint.

### 5d. Lint noise: all clear

The `UNUSED-IMPORT` advisories listed here previously are gone. QA now reports
**zero advisories** — no unused imports and no sub-11px type anywhere in the
package. If a new advisory appears, it is yours.

### 5e. The written evaluation IS delivered — `NHAN-XET-hoc-lieu-INS2053.md`

Section 5b of an earlier revision said the critique was still owed. It is now
written, in Vietnamese, at the package root: **`NHAN-XET-hoc-lieu-INS2053.md`**
(352 lines, 8 sections). Structure: conclusion first, then strengths, then four
ranked problems, then a section retracting my own false claims, then a three-tier
action plan, then an explicit list of what I could NOT verify.

The four problems it raises, in priority order:

1. **The 60 diagrams are orphaned** — zero references from any ebook chapter or
   slide deck. This is 5a above, and the critique ships the full session→diagram
   lookup table ready to paste.
2. **Slides are the visually weakest artifact** — 15/15 decks have zero images;
   decks 03, 06, 10, 13, 14 have zero diagrams of any kind and those are exactly
   the five sessions that need pictures most.
3. **100% of media-query breakpoints are `max-width`** (27 of 27, package-wide).
   Not wrong, and it is what the exams grade, but it is off industry default.
4. **Density unevenness** — ch06 has 5 diagram lines despite being the layout
   chapter; `<details>` self-check blocks exist in only 2 of 16 chapters.

**Measurement lesson worth inheriting: count OUTSIDE code fences.** Three numbers
in my own first draft were inflated because naive `grep -c` counted content inside
` ``` ` blocks as if it were chapter structure:

| Claim | Naive | Fence-aware | Verdict |
|---|---|---|---|
| ch11 `##` sections | 37 | **19** | claim retracted — 18 hits were `## Tech Stack` etc. inside README/spec templates |
| ebook ASCII diagram lines | 2,104 | **445** | the loose regex was matching markdown table pipes |
| ebook code blocks | "1,147" | **496** | unreproducible; real count is fences÷2 |
| `max-width` occurrences | 116 | **27** breakpoints | the rest are `.container { max-width: 960px }`, a layout width, not a breakpoint |

Every table in the critique now counts outside fences. If you extend it, do the
same or you will re-derive the same wrong conclusions.

### 5f. One real content bug was found and FIXED

`exercises/session-15/exercise.md:280` told students:

> Use `max-width` (not `min-width`) for **mobile-first** breakpoints.

That is the terminology backwards, and it **contradicted the students' own
textbook** — `ebook/15-...md:206` and `:304` correctly define desktop-first =
`max-width`, mobile-first = `min-width`. A student reading both would learn the
label wrong from the graded artifact.

Fixed in place, and deliberately **without changing the graded technique** — the
exercise still asks for `max-width` (10 occurrences intact), it is just now called
*desktop-first* and cross-referenced to the chapter 15 comparison table. Backup at
`_tools/backups/ex15-exercise.pre-mf-fix.bak`.

Nothing else in the package conflates the two terms; I rescanned all five content
directories.

---

### 5g. Session-info blocks normalised — DONE, 2026-08-31

The 15 chapters had **3–4 incompatible session-info formats** (inline vs bulleted vs
column-aligned; `🎯 Session objectives:` vs `🎯 Objectives:`; `🔗 Linked outcomes:`
in 3 chapters, `🏁 CLO:` in ch07+, `🔗 CLO:` in ch10-13). All 15 now use one
column-aligned format with exactly six labels — verified 15/15 for each of
`📅 Duration · 📚 Reference · 🎯 Objectives · 📖 Prepare · 🖼 Diagrams · 🔗 Outcomes`.

Two content fixes went in with it:

- **The 150 vs 135 minute conflict.** `ebook/07` through `ebook/15` said *"3 periods
  (≈ 135 minutes)"*, contradicting `schedule.md:6` and `README.md:7`. A VNU period is
  50 minutes, so 3 periods = **150**; 135 was simply wrong. All nine are now 150, and
  `grep -rn '135 min'` over the package returns nothing. Of the 23 remaining "135"
  hits in the teaching folders, 20 are `linear-gradient(135deg, …)`, one is the prose
  "135 degrees" in ch07, and two are SVG `y="135"` coordinates — all correctly left alone.
- **CLO wording.** Chapters variously paraphrased the outcomes (`CLO-2: Apply CSS
  styling…`, `CLO-3: Design and implement responsive page layouts…`) — those strings
  are **not** in the syllabus. All 15 chapters now use short English renderings of the
  five verbatim CLOs recorded in `_archive/ins2053_qa_inventory.md` §9.3. Note the
  archive warns that the syllabus's own CLO-per-session mapping claims *every* session
  hits all five, which has no discriminating value; the per-chapter attributions here
  are a reasoned narrowing, not a syllabus quotation.

Appendix A also gained an `# 📌 APPENDIX INFORMATION` block in the same shape, but with
`📅 When to read:` instead of `📅 Duration:` — it is not a timetabled session and should
not pretend to be one.

Backups: `_tools/backups/sessioninfo/` (all 16 chapters), `_tools/backups/duration-fix/`
(the 9 chapters touched for 135→150), `_tools/backups/slides-title/` (all 15 decks),
`README.pre-canvases-row.bak`, `schedule.pre-canvases.bak`.

## 6. The working method — use this, it is safe without a compiler

**There is no compiler available.** No `package.json`, no `tsconfig.json`, and
`qoder/canvas` does not resolve locally, so **nothing in this package is
type-checked**. Node v24 is available. Verification is therefore structural, and
the pipeline below is what makes edits safe.

### Tools, in `_tools/`

| File | What it does |
|---|---|
| `qa-canvases.sh` | the full 9-step QA sweep — run it from `canvases/` |
| `qa-canvases.js` | the same 9 checks in Node, for when bash is unavailable |
| `check-brackets.js` | check 1: bracket balance on **code only** (uses `strip-literals.js`) |
| `strip-literals.js` | blanks comments and string literals so counters ignore prose |
| `test-strip-literals.js` | 19 pinned cases for the stripper — run after touching it |
| `check-svg-ascii.js` | fails if any label inside an `<svg>` is not English — **takes a DIRECTORY, not a file** |
| `check-text-width.js` | estimates rendered text width and fails if a label runs past the `viewBox` |
| `replace-once.js` | replaces a block **only if it matches exactly once**, else refuses |
| `replace-block.js` | multi-line block replacement |
| `batch-lines.js` | single-line exact-match replacement across many files |
| `splice-lines.js` | replaces a line range; use when the old text contains escape-like sequences that do not survive retyping |
| `check-balance.js` | **retired** — kept for history only, see the gotchas below |
| `backups/*.bak` | pre-edit state of decks 01–05 only, and **stale**: written 2026-08-31, while those decks were edited 2026-09-01. Not a usable rollback point. |

### What `qa-canvases.sh` checks, in order

1. bracket balance (hard fail)
2. every `^function X` is referenced by a slide (hard fail)
3. unused named imports (advisory)
4. `role="img"` + `aria-label` on every `<svg>` (hard fail)
5. any `fontSize` below 11 (advisory)
6. dangling `url(#id)` with no matching def (hard fail)
7. duplicate `defs` ids inside one file (hard fail)
8. non-ASCII text inside an `<svg>` (hard fail)
9. estimated text width vs `viewBox` width (hard fail)

`check-text-width.js` uses `FACTOR_SANS = 0.52`, `FACTOR_MONO = 0.60`,
`FACTOR_BOLD_BONUS = 0.03`, and skips rotated text.

**It has two blind spots you must cover by hand:** text held in a data array and
rendered through `.map()`, and text whose `x` is a computed expression. Both are
invisible to the checker. When you author either, do the arithmetic yourself —
12px sans is about 6.24px per character, 12.5px about 6.5px, 11px about 5.72px,
and mono is about `0.60 x fontSize`. A full-width 548px line holds roughly 84 to
88 characters at 12px.

### Per-deck recipe

```bash
cd "canvases"

# 0. back it up first
cp buoi-10.canvas.tsx ../_tools/backups/buoi-10.bak

# 1. find the import block end and the export line
grep -n '^function \|^export default\|} from "qoder/canvas";' buoi-10.canvas.tsx

# 2. author the new diagram module in SMALL sequential chunks.
#    Use a QUOTED heredoc so $ ` ' " are literal:
cat  > /tmp/d10.tsx <<'EOF'
...header + diagram 1...
EOF
cat >> /tmp/d10.tsx <<'EOF'
...diagram 2...
EOF

# 3. check balance BEFORE splicing (note: node needs a Windows path)
node -e 'const s=require("fs").readFileSync(process.argv[1],"utf8");let p=0,b=0;
for(const c of s){if(c==="(")p++;if(c===")")p--;if(c==="{")b++;if(c==="}")b--;}
console.log("paren",p,"brace",b)' "$(cd /tmp && pwd -W)/d10.tsx"

# 4. splice: keep the imports, drop the old diagram, keep everything from export on
{ head -n <importEndLine> buoi-10.canvas.tsx
  cat /tmp/d10.tsx
  echo
  tail -n +<exportLine> buoi-10.canvas.tsx
} > /tmp/n10.tsx && mv /tmp/n10.tsx buoi-10.canvas.tsx

# 5. wire each diagram into its slide, one edit at a time
#    write the exact old block to o.txt and the new one to n.txt, then:
node ../_tools/replace-once.js buoi-10.canvas.tsx /tmp/o.txt /tmp/n.txt

# 6. QA
bash ../_tools/qa-canvases.sh
```

### Porting a finished diagram into another deck

This is how the master deck was built. Pull the function out whole rather than
retyping it, so the picture a student saw in class is the same picture in the
overview:

```bash
node ../_tools/extract.js buoi-04.canvas.tsx BoxModelDiagram >> /tmp/master-add.tsx
```

Before splicing, check that the ported function's `defs` ids do not already exist
in the destination, and that every `url(#...)` it references resolves. Steps 6 and
7 of the QA sweep catch this, but finding it first saves a re-splice.

### The assert-before-splice rule — this one is not optional

Any script that edits by **line number** must first verify the exact expected text
of each target line and `process.exit(1)` on mismatch, and must splice **bottom-up**
so earlier indices stay valid:

```js
function at(n, expect) {
  if (L[n - 1].trim() !== expect) {
    console.error(`ABORT ${n} is >>${L[n - 1]}<< not >>${expect}<<`);
    process.exit(1);
  }
}
```

This guard has already prevented one real incident: line numbers derived from a
relatively-numbered dump instead of absolute file lines aborted cleanly at
`ABORT 625` with **no file damage**. Without it, that run would have written nine
edits into the wrong places in the master deck.

### Gotchas that cost time already

- **Heredocs break on `…` and on apostrophes** if the heredoc is unquoted. Always
  use `<<'EOF'`, and avoid fancy Unicode inside diagram source.
- **A literal `(` in a label no longer unbalances the paren counter.** Check 1 of the
  sweep now blanks comments and string literals before counting
  (`_tools/strip-literals.js`), so prose like `notes="...1) False..."` is ignored.
  Do not "fix" a label to satisfy the counter; if check 1 says BAD, it is real.
- **Node on this machine needs Windows paths.** `/tmp/x.tsx` resolves to `C:\tmp\x.tsx`
  and fails. Use `"$(cd /tmp && pwd -W)/x.tsx"`, or write to
  `C:/Users/<you>/AppData/Local/Temp/` directly.
- **`check-balance.js` is retired.** It counted brackets inside string literals and
  its JSX tag regex miscounted `<Text as="span">`, so it reported BAD on pristine
  files. Check 1 of the sweep now uses `_tools/check-brackets.js`, which strips
  comments and literals first. `check-balance.js` is kept only for history; do not
  reach for it, and do not reshape a label to satisfy a bracket counter.
- **`batch-lines.js` refuses a `-` line with no matching `+`.** To delete a line on
  purpose, write `+ @@DELETE`. The refusal is deliberate — it was added after a
  silent deletion.
- **`check-svg-ascii.js` takes a directory.** Passing it a single file looks like it
  passed when it actually scanned nothing.
- **The `▸` character fails the ASCII gate.** Draw disclosure triangles as a
  `<path d="M... l... l... z" />` instead.
- **Never batch many slide edits into one write.** `replace-once.js` refusing an
  ambiguous match is the safety net; keep edits one at a time so it can work.

---

## 7. QA status at handover

There are now two runners for the same 9 checks. Run either from `canvases/`:

```
bash ../_tools/qa-canvases.sh     # needs bash
node ../_tools/qa-canvases.js     # same checks, no bash needed
```

Both → **QA PASS, zero advisories** (verified 2026-09-01, all 17 canvas files):

- bracket balance: clean — now counted on **code only**, see below
- every declared diagram function is referenced by a slide: clean
- unused named imports: clean
- `role="img"` + `aria-label` on every `<svg>`: clean
- no dangling `url(#id)`, no duplicate `defs` ids within a file: clean
- all `<svg>` labels English: clean
- type floor: no `fontSize` below 11 anywhere in the package
- estimated text width within `viewBox`: clean

### What changed to get here, and why it matters

An earlier revision of this section also said "QA PASS, zero advisories" while the
sweep was in fact reporting FAIL. The gap was that check 1 and check 3 produced
**false positives**, and the habit of dismissing their output as noise meant real
defects sat behind it. Both checks were fixed rather than tolerated:

- **Check 1** now blanks comments and string literals before counting brackets
  (`_tools/strip-literals.js` + `_tools/check-brackets.js`). Prose such as
  `notes="...1) False..."` and a `"{"` inside a label no longer skew it.
- **Check 3** now counts a function-call use (`canvasImage(...)`) as well as a JSX
  use (`<Card ...`), so the five `canvasImage` advisories are gone.

With the noise removed, check 1 immediately surfaced **three real content bugs** that
had been invisible: `buoi-13`, `buoi-14` and `buoi-15` each ended their Quick-Check
answer line with a stray `)` — `wrong mobile keyboard.)` — visible to students on
the slide. Those are fixed. Four other real items were cleared in the same pass:
the orphaned `ResponsiveDevices` diagram in `buoi-15` is now mounted on the
breakpoints slide, three 10.5px CSS labels were raised to the 11px floor, and two
dead imports (`H3` in `buoi-07`, `Divider` in `buoi-10`) were removed.

`_tools/strip-literals.js` carries a heuristic: single quotes are used in this
package **both** as string delimiters (`row(24, 'alt="image"', ...)`) and as
apostrophes in prose (`Don't`), and no parser is available to tell them apart. It
resolves the ambiguity by position, and errs toward a false BAD a human will read
rather than a silently missed imbalance. `_tools/test-strip-literals.js` pins the
behaviour — **19 cases, all passing**; run it after touching the stripper.

**The lesson worth keeping:** a check that cries wolf is worse than no check,
because it trains you to ignore it. If a QA line looks like noise, fix the check.
Do not reshape a label to satisfy a counter.

**Not verified, and cannot be here:** TypeScript types, prop correctness against
the real `qoder/canvas` API, and actual rendered appearance. Open one deck in the
canvas host and look at it before teaching from it. That is the one remaining
check nothing in `_tools/` can do for you.
