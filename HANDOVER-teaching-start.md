# Handover — teaching start (INS2053)

**Date:** 2026-09-06 (teaching begins the following day)
**Repo:** `INS2053 - WEB` · branch `main` · commit made on top of `a74d4cb`
**One line:** everything a class day needs is built, tested and committed;
nothing is pushed, because the Vercel account-permission issue is unresolved.

> Note: the stated workspace folder `INS2053 - Cham tu dong` is an empty
> OneDrive placeholder. The real repository is this one, `INS2053 - WEB`.

---

## 1. What was finished in this stretch

### a. Auto-grader deployed and verified in production
- `_tools/grader/cham-bai.html` was deployed to Vercel from a prebuilt
  artefact and verified end-to-end: production alias returned 200, SHA-256
  matched the local artefact, a site-wide byte-parity sweep passed, CSP /
  caching / framing headers were checked, and a headless E2E grading run
  passed against the `session-01` fixture.
- **Verify production through `https://ins2053-web-course.vercel.app` only.**
  Deployment-specific URLs sit behind SSO and cannot be checked from here.

### b. Shared table empty state + uppercase table headers
The design brief ("thiết kế empty state khi bảng không có gì; tiêu đề bảng
luôn bật chữ in hoa; sửa ở component để dùng chung") was implemented across
all four table surfaces with one visual language — a dashed inset panel with
a grid icon, a title and a short description:

| Surface | Component / class | Where |
|---|---|---|
| Slide decks | `<Table>` → `.c-table-empty` | `_tools/canvas-runtime/canvas.jsx` + `deck.css` |
| Course site | `.table-empty` | `_tools/table-empty-state.mjs` (build-time), `_tools/site-assets/site.js` (runtime twin), `site.css` |
| Grader | `.rubric-empty` | `_tools/grader/src/ui.js` + `grader.css` (dead-code guard: rubrics are validated to carry rows) |
| Uppercase headers | generic `th` | `_tools/site-assets/site.css` (deck `.c-table thead th`, grader `.rubric thead th` and `.sched th` were already uppercase) |

- The shared strings live in `table-empty-state.mjs` (`EMPTY_TITLE`,
  `EMPTY_TEXT`); `site.js` and `canvas.jsx` repeat them; the grader uses its
  own Vietnamese copy. Keep them in sync if the wording ever changes.
- `Table` in `canvas.jsx` also no longer crashes on `rows: null` — null or
  missing rows now read as "no data".
- **Design caveat:** the referenced design image was never actually attached.
  The panel follows house tokens; if the real image arrives, restyle the
  `.c-table-empty*` / `.table-empty*` / `.rubric-empty*` classes — the markup
  is already in place everywhere.

### c. Tests and QA gates
- `_tools/test-table-empty.js` — **33/33 checks** (plain-script convention,
  bundles the JSX runtime with the same esbuild trick as
  `build-html-slides.mjs`; self-cleans its `.cache-html` scratch dir).
- `npm run qa` → PASS (canvases + slides).
- `npm run build:slides` → 17 decks, 484 slides.
- `npm run build:site` + `npm run qa:site` → PASS (new check 14: no hollow
  `<tbody>` may survive to a published page).
- `npm run qa:grader` → PASS, 15/15 sessions, 42 check types.

### d. Documentation (committed with this work)
`HUONG-DAN-cham-bai.md`, `README.md`, `_tools/grader/README.md` now describe
the auto-grader as it actually behaves.

---

## 2. Deployed vs committed — know the difference

| | Contains |
|---|---|
| **Vercel production right now** | verified build of `a74d4cb` (grader 261 KB) |
| **This commit (local, unpushed)** | everything above + table work; grader artefact grew to 262 KB (the unreachable empty-state branch) |

Behaviour of the live grader and the new artefact is identical for every
real rubric; the diff is defensive code. **Do not push or redeploy until the
Vercel permission issue is fixed** — when it is, `vercel deploy --prod` on
this tree is safe, but remember:

- `vercel build` can rewrite `package-lock.json`; revert it afterwards.
- Re-run the byte-parity + E2E verification before declaring done.

## 3. Teaching-day quick reference

- Public student site: `site/` (16 chapters, 15 homework sheets, 15 session
  hubs, 17 decks) — serves from
  `https://ins2053-web-course.vercel.app` or any static host.
- Slide decks: `slides-html/` (projector-ready static HTML).
- Grading student homework in class: `site/cham-bai.html` — one offline file,
  nothing uploaded; guidance in `HUONG-DAN-cham-bai.md`.
- Course order: `schedule.md`; session decks are `slides-html/buoi-NN.html`.

If anything regenerates wrong, rebuild from a clean tree:

```
npm run build:slides
npm run build:site      # grader artefact first, then the site
npm run qa              # canvases + slides QA
npm run qa:site         # site QA incl. hollow-table check
npm run qa:grader       # grader fixtures, 15 sessions
```

## 4. Known traps

1. **OneDrive sync** can briefly hide or duplicate files in this tree (it
   happened mid-session with `table-empty-state.mjs`). If a file seems to
   vanish, wait a beat or check git, not just Explorer.
2. **PowerShell execution policy** blocks `npm.ps1`; run npm via
   `cmd /c "npm run ..."` in this environment.
3. The `colspan` attribute in `canvas.jsx` is lowercase on purpose: React 19's
   dev renderer passes camelCase `colSpan` through verbatim, which the course
   cannot ship (it teaches W3C-valid HTML). One dev-mode console warning is
   the accepted cost; it never appears in built pages.
4. Git normalises to LF (`.gitattributes`); CRLF warnings in `git diff`
   output are noise, not corruption.
