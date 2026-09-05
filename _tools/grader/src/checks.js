/* =============================================================================
   INS2053 grader — check library. Pure functions, no DOM, no I/O.

     import { CHECKS, runCheck, CHECK_TYPES } from "./checks.js";

   Runs unchanged in Node (used by _tools/qa-grader.mjs) and in the browser
   (inlined into cham-bai.html). Nothing here touches `document`, `window`,
   `fetch` or the filesystem.

   Contract
   --------
     runCheck(ctx, spec) -> { type, pass, score01, detail, evidence, weight }

     score01 = 0..1   how much of this check the submission satisfies
     score01 = null   NOT GRADABLE — the file it needs was not submitted.
                      grade.js must exclude it from the denominator instead of
                      scoring it zero. A missing file is a missing file, not a
                      wrong answer.
     evidence = { file, line, text } | null

   The honesty rule that shapes every function here
   ------------------------------------------------
   Each check carries a comment saying what it CANNOT conclude. This is not
   documentation etiquette: it is the reason the rubric JSON has a `tier` field.
   `imgHasAlt` can count words in an `alt`; it cannot know whether those words
   describe the photo. A check that overstates its reach turns into a wrong mark
   that nobody can see, which is worse than no automated marking at all
   (_archive/ins2053_part9_autograding.md §9.1.1, §9.10).

   Student text is never executed and never interpolated into markup. Values
   reaching `detail`/`evidence` are escaped by ui.js at the point of display.
   ============================================================================= */

import {
  findAll, findFirst, allElements, wordCount, ancestors, classList, VOID_ELEMENTS,
} from "./html-parse.js";
import {
  rulesFor, rulesMentioning, declsFor, declsMentioning, allDecls,
  mediaMaxWidths, declCount, normalizeValue, sameColor, normalizeColor,
  selectorsInside,
} from "./css-parse.js";

/* --- result helpers ------------------------------------------------------- */

const res = (pass, score01, detail, evidence = null, extra = {}) =>
  ({ pass, score01, detail, evidence, ...extra });

/** Fully satisfied. */
const ok = (detail, evidence) => res(true, 1, detail, evidence);
/** Not satisfied at all. */
const no = (detail, evidence) => res(false, 0, detail, evidence);
/** Partially satisfied — `n` of `want`. */
const part = (n, want, detail, evidence) =>
  res(n >= want, want > 0 ? Math.max(0, Math.min(1, n / want)) : 0, detail, evidence);
/** Not gradable: the file this check needs is absent. */
const na = (detail, files) =>
  res(false, null, detail, null, { notGradable: true, missingFiles: files ?? [] });

const ev = (file, line, text) =>
  (file ? { file, line: line ?? null, text: text ?? "" } : null);

/** One trimmed, length-capped line of the source for the evidence row. */
function lineText(source, line, max = 90) {
  if (!source || !line) return "";
  const raw = String(source).split(/\r?\n/)[line - 1] ?? "";
  const t = raw.trim();
  return t.length > max ? t.slice(0, max - 1) + "…" : t;
}

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;


/* --- file resolution ------------------------------------------------------ */

const norm = (p) => String(p ?? "").replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
const base = (p) => norm(p).split("/").pop();

/**
 * Repository housekeeping, not student work.
 *
 * These names are uppercase because GitHub only recognises them that way, and any
 * submission handed in as a repo root rather than a subfolder carries some of them.
 * `fileNaming` skips them rather than docking a mark for a convention the host
 * imposes; the same list is why `README.md` was special-cased before.
 */
const REPO_METADATA =
  /^(?:\.github\/.*|readme(?:\.md)?|license(?:\.[\w.-]+)?|licence(?:\.[\w.-]+)?|copying|notice|authors|contributors|changelog(?:\.md)?|contributing(?:\.md)?|code_of_conduct(?:\.md)?|security(?:\.md)?|support(?:\.md)?|codeowners|funding\.yml|\.[\w.-]+)$/i;

/**
 * Find the submitted file a rubric path refers to.
 *
 * Deliberately tolerant, because the same page arrives under three different
 * paths depending on how it was handed in:
 *   paste tab      -> "index.html"
 *   GitHub repo    -> "project/index.html"
 *   GitHub subtree -> "index.html" again
 * Exact match wins, then a path suffix, then the shortest basename match. If
 * nothing matches the caller returns `na()` — never a zero.
 */
export function resolveFile(ctx, wanted) {
  const want = norm(wanted);
  const files = ctx.files ?? [];
  const exact = files.find((f) => norm(f.path) === want);
  if (exact) return exact;
  const suffix = files
    .filter((f) => norm(f.path).endsWith("/" + want))
    .sort((a, b) => norm(a.path).length - norm(b.path).length)[0];
  if (suffix) return suffix;
  const wantBase = base(want).toLowerCase();
  const byBase = files
    .filter((f) => base(f.path).toLowerCase() === wantBase)
    .sort((a, b) => norm(a.path).length - norm(b.path).length)[0];
  return byBase ?? null;
}

/** Every submitted file whose extension is one of `exts`. */
function filesByExt(ctx, exts) {
  const set = new Set(exts.map((e) => e.toLowerCase()));
  return (ctx.files ?? []).filter((f) => set.has(String(f.ext ?? "").toLowerCase()));
}

/**
 * Which HTML documents a spec applies to.
 *
 *   spec.file  -> that one page
 *   spec.files -> those pages
 *   neither    -> every submitted .html
 *
 * Returns { docs: [{ path, doc, source }], missing: [paths] }.
 */
function htmlTargets(ctx, spec) {
  const wanted = spec.files ?? (spec.file ? [spec.file] : null);
  if (!wanted) {
    const all = filesByExt(ctx, ["html", "htm"])
      .map((f) => ({ path: f.path, doc: ctx.htmlDocs.get(f.path), source: f.text }))
      .filter((d) => d.doc);
    return { docs: all, missing: [] };
  }
  const docs = [];
  const missing = [];
  for (const w of wanted) {
    const f = resolveFile(ctx, w);
    if (f && ctx.htmlDocs.has(f.path)) {
      docs.push({ path: f.path, doc: ctx.htmlDocs.get(f.path), source: f.text });
    } else missing.push(norm(w));
  }
  return { docs, missing };
}

/** Same idea for stylesheets. Returns { sheets: [{path, sheet, source}], missing }. */
function cssTargets(ctx, spec) {
  const wanted = spec.files ?? (spec.file ? [spec.file] : null);
  if (!wanted) {
    const all = filesByExt(ctx, ["css"])
      .map((f) => ({ path: f.path, sheet: ctx.cssSheets.get(f.path), source: f.text }))
      .filter((s) => s.sheet);
    return { sheets: all, missing: [] };
  }
  const sheets = [];
  const missing = [];
  for (const w of wanted) {
    const f = resolveFile(ctx, w);
    if (f && ctx.cssSheets.has(f.path)) {
      sheets.push({ path: f.path, sheet: ctx.cssSheets.get(f.path), source: f.text });
    } else missing.push(norm(w));
  }
  return { sheets, missing };
}

/** "index.html, about.html" for a detail string. */
const listPaths = (paths) => paths.map(norm).join(", ");

/**
 * Sort a document's mismatches into "left open" vs "closed in the wrong order".
 *
 * The tokenizer cannot label these directly, because both surface the same way.
 * A forgotten `</p>`:
 *
 *     <p>one            <-- still open when </body> arrives
 *     </body>           -> misnested{ tag:"p", expected:"body" }
 *
 * Crossed tags, where both end tags exist but in the wrong order:
 *
 *     <b><i>x</b></i>   -> misnested{ tag:"i", expected:"b" }
 *                          + stray-close{ tag:"i" }
 *
 * So a `misnested` record with a later `stray-close` of the same name is an
 * ORDERING error; one without is a tag that was never closed at all. The pairing
 * is by tag name and position, which is approximate when a page misuses the same
 * tag repeatedly — the mistake is still reported then, just possibly by the
 * sibling check. Both checks sit in the same rubric, so nothing escapes and
 * nothing is counted twice.
 */
function classifyMismatches(doc) {
  const stray = doc.mismatches.filter((m) => m.type === "stray-close");
  const unterminated = doc.mismatches.filter((m) => m.type === "unterminated-tag");
  const misnested = doc.mismatches.filter((m) => m.type === "misnested");
  const usedStray = new Set();
  const crossed = [];
  const neverClosed = [];
  for (const m of misnested) {
    const mate = stray.findIndex(
      (s, i) => !usedStray.has(i) && s.tag === m.tag && s.line >= m.line,
    );
    if (mate >= 0) { usedStray.add(mate); crossed.push({ ...m, strayLine: stray[mate].line }); }
    else neverClosed.push(m);
  }
  return {
    // never closed — belongs to tagsBalanced
    unclosed: [
      ...doc.mismatches.filter((m) => m.type === "unclosed"),
      ...neverClosed,
      ...unterminated,
    ].sort((a, b) => a.line - b.line),
    // closed, wrong order — belongs to tagsNested
    crossed,
    // an end tag with no open tag at all — tagsNested reports it unless it was
    // already consumed as the second half of a crossing
    orphanCloses: stray.filter((_, i) => !usedStray.has(i)),
  };
}

/* =============================================================================
   HTML structure
   ============================================================================= */

export const CHECKS = {
  /**
   * `<!DOCTYPE html>` present, and it is the first thing in the file.
   *
   * Cannot conclude: that the page is valid HTML5. A doctype only puts the
   * browser in standards mode; everything after it may still be wrong.
   */
  hasDoctype(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const bad = [];
    for (const d of docs) {
      if (!d.doc.doctype) {
        bad.push({ path: d.path, why: "không có <!DOCTYPE html>" });
        continue;
      }
      const before = d.source.slice(0, d.doc.doctype.start).trim();
      if (before) {
        bad.push({ path: d.path, why: "có nội dung trước <!DOCTYPE html>", line: d.doc.doctype.line });
      } else if (!/^<!doctype\s+html\s*>$/i.test(d.doc.doctype.value.trim())) {
        bad.push({
          path: d.path,
          why: `doctype không phải HTML5: ${d.doc.doctype.value.trim()}`,
          line: d.doc.doctype.line,
        });
      }
    }
    if (!bad.length) return ok(`<!DOCTYPE html> đúng ở ${plural(docs.length, "file", "file")}`);
    const first = bad[0];
    const src = docs.find((d) => d.path === first.path)?.source;
    return part(docs.length - bad.length, docs.length, `${first.path}: ${first.why}`,
      ev(first.path, first.line ?? 1, lineText(src, first.line ?? 1)));
  },

  /**
   * An element exists, optionally with attributes and a minimum count.
   *
   *   { type:"hasElement", tag:"html", attr:{ lang:"*" } }        attribute present
   *   { type:"hasElement", tag:"meta", attr:{ charset:"utf-8" } } value matches (ci)
   *   { type:"hasElement", tag:"p", minCount:3 }
   *
   * `"*"` means "any value", a leading `~` means "value contains this".
   *
   * Cannot conclude: that the element is in the right place, or that its content
   * makes sense. An `<h1>` inside `<footer>` still counts as an `<h1>`.
   */
  hasElement(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const want = Math.max(1, spec.minCount ?? 1);
    const attrs = spec.attr ?? null;
    const perDoc = docs.map((d) => {
      const found = findAll(d.doc, spec.tag).filter((n) => {
        if (!attrs) return true;
        return Object.entries(attrs).every(([k, v]) => {
          const got = n.attrs[String(k).toLowerCase()];
          if (got === undefined) return false;
          if (v === "*" || v === true) return true;
          if (String(v).startsWith("~")) {
            return String(got).toLowerCase().includes(String(v).slice(1).toLowerCase());
          }
          return String(got).trim().toLowerCase() === String(v).trim().toLowerCase();
        });
      });
      return { ...d, n: found.length, node: found[0] ?? null };
    });
    const label = `<${spec.tag}>` + (attrs ? ` với ${Object.keys(attrs).join(", ")}` : "");
    const good = perDoc.filter((d) => d.n >= want);
    if (good.length === perDoc.length) {
      const total = perDoc.reduce((s, d) => s + d.n, 0);
      return ok(`${label}: ${total} ở ${plural(perDoc.length, "file", "file")}`,
        ev(perDoc[0].path, perDoc[0].node?.line, lineText(perDoc[0].source, perDoc[0].node?.line)));
    }
    const worst = perDoc.filter((d) => d.n < want).sort((a, b) => a.n - b.n)[0];
    return part(good.length, perDoc.length,
      `${worst.path}: cần ${want} ${label}, tìm thấy ${worst.n}`,
      ev(worst.path, worst.node?.line ?? 1, lineText(worst.source, worst.node?.line ?? 1)));
  },

  /**
   * Every start tag has its end tag.
   *
   * Stricter than HTML5, on purpose: the spec allows omitting `</p>` and `</li>`,
   * the session 01 rubric does not ("Every opening tag has a closing tag") and
   * the course teaches closing everything. Void elements (`<img>`, `<br>`, …) are
   * exempt because they have no end tag at all.
   *
   * Cannot conclude: that the nesting is meaningful, only that it is closed.
   */
  tagsBalanced(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    let worst = null;
    let clean = 0;
    for (const d of docs) {
      const bad = classifyMismatches(d.doc).unclosed;
      if (!bad.length) { clean++; continue; }
      if (!worst || bad.length > worst.bad.length) worst = { ...d, bad };
    }
    if (clean === docs.length) return ok(`mọi thẻ đều được đóng (${plural(docs.length, "file", "file")})`);
    const m = worst.bad[0];
    const why = m.type === "unterminated-tag"
      ? `<${m.tag}> thiếu dấu ">"`
      : `<${m.tag}> mở ở dòng ${m.line} nhưng không có </${m.tag}>`;
    return part(clean, docs.length, `${worst.path}: ${why}`,
      ev(worst.path, m.line, lineText(worst.source, m.line)));
  },

  /**
   * Tags close in the order they opened, and required parents are respected.
   *
   *   { type:"tagsNested", pairs:[["li","ul|ol"],["td","tr"]] }   pairs optional
   *
   * Cannot conclude: anything about the visual result. `<p>` inside `<p>` is a
   * nesting error even when the page happens to look fine.
   */
  tagsNested(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const pairs = spec.pairs ?? [];
    let worst = null;
    let clean = 0;
    for (const d of docs) {
      const { crossed, orphanCloses } = classifyMismatches(d.doc);
      const problems = [
        ...crossed.map((m) => ({
          line: m.line,
          why: `<${m.tag}> đóng sau </${m.expected}> — sai thứ tự lồng`,
        })),
        ...orphanCloses.map((m) => ({
          line: m.line,
          why: `</${m.tag}> không có thẻ mở tương ứng`,
        })),
      ];
      for (const [child, parentSpec] of pairs) {
        const allowed = String(parentSpec).split("|");
        for (const node of findAll(d.doc, child)) {
          const parent = node.parent?.tag;
          if (!allowed.includes(parent)) {
            problems.push({
              line: node.line,
              why: `<${child}> nằm trong <${parent === "#root" || !parent ? "?" : parent}>, phải nằm trong <${allowed.join("> hoặc <")}>`,
            });
          }
        }
      }
      if (!problems.length) { clean++; continue; }
      problems.sort((a, b) => a.line - b.line);
      if (!worst || problems.length > worst.problems.length) worst = { ...d, problems };
    }
    if (clean === docs.length) return ok(`lồng thẻ đúng thứ tự (${plural(docs.length, "file", "file")})`);
    const p = worst.problems[0];
    return part(clean, docs.length, `${worst.path}: ${p.why}`,
      ev(worst.path, p.line, lineText(worst.source, p.line)));
  },

  /**
   * An attribute is present on every element of a tag.
   *
   *   { type:"attrPresent", tag:"img", attr:"alt" }
   *
   * Cannot conclude: that the value is useful. `alt=""` counts as present —
   * `attrNotEmpty` and `imgHasAlt` are the ones that look at the value.
   */
  attrPresent(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const attr = String(spec.attr).toLowerCase();
    let total = 0;
    let withAttr = 0;
    let firstBad = null;
    for (const d of docs) {
      for (const n of findAll(d.doc, spec.tag)) {
        total++;
        if (n.attrs[attr] !== undefined) withAttr++;
        else if (!firstBad) firstBad = { path: d.path, line: n.line, source: d.source };
      }
    }
    if (total === 0) {
      return no(`không có <${spec.tag}> nào để kiểm tra thuộc tính ${attr}`);
    }
    if (withAttr === total) return ok(`cả ${total} <${spec.tag}> đều có ${attr}`);
    return part(withAttr, total,
      `${total - withAttr}/${total} <${spec.tag}> thiếu ${attr}`,
      ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)));
  },

  /**
   * An attribute is present and holds non-whitespace text.
   *
   *   { type:"attrNotEmpty", tag:"a", attr:"href" }
   *   { type:"attrNotEmpty", tag:"title", attr:"#text" }   element text, not attr
   *
   * Cannot conclude: that the value is correct — `href="#"` and `alt="image"` are
   * non-empty and still useless.
   */
  attrNotEmpty(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const attr = String(spec.attr).toLowerCase();
    const wantsText = attr === "#text";
    let total = 0;
    let good = 0;
    let firstBad = null;
    for (const d of docs) {
      for (const n of findAll(d.doc, spec.tag)) {
        total++;
        const value = wantsText ? n.text : n.attrs[attr];
        if (value !== undefined && String(value).trim() !== "") good++;
        else if (!firstBad) firstBad = { path: d.path, line: n.line, source: d.source };
      }
    }
    const what = wantsText ? "nội dung" : attr;
    if (total === 0) return no(`không có <${spec.tag}> nào để kiểm tra ${what}`);
    if (good === total) return ok(`cả ${total} <${spec.tag}> đều có ${what} khác rỗng`);
    return part(good, total, `${total - good}/${total} <${spec.tag}> có ${what} rỗng`,
      ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)));
  },

  /**
   * Exactly one `<h1>` per page.
   *
   * Cannot conclude: that the `<h1>` says the right thing, or that it is the
   * visually largest text — CSS can make an `<h6>` bigger.
   */
  singleH1(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    let good = 0;
    let firstBad = null;
    for (const d of docs) {
      const h1 = findAll(d.doc, "h1");
      if (h1.length === 1) good++;
      else if (!firstBad) {
        firstBad = {
          path: d.path, source: d.source, n: h1.length,
          line: h1[1]?.line ?? h1[0]?.line ?? 1,
        };
      }
    }
    if (good === docs.length) return ok(`đúng một <h1> trên mỗi trang (${docs.length})`);
    return part(good, docs.length,
      `${firstBad.path}: có ${firstBad.n} <h1>, cần đúng 1`,
      ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)));
  },

  /**
   * Heading levels descend without skipping: h1 -> h2 -> h3, never h1 -> h3.
   *
   *   { type:"headingOrder", require:["h1","h2","h3"] }   levels that must appear
   *
   * Cannot conclude: that the headings reflect the real structure of the content.
   * A student can nest levels perfectly and still write meaningless titles — that
   * is what the "assist"/"manual" tiers are for.
   */
  headingOrder(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const required = (spec.require ?? []).map((h) => String(h).toLowerCase());
    let good = 0;
    let firstBad = null;
    for (const d of docs) {
      const heads = allElements(d.doc)
        .filter((n) => /^h[1-6]$/.test(n.tag))
        .map((n) => ({ level: Number(n.tag[1]), line: n.line, tag: n.tag }));
      const problems = [];
      let prev = 0;
      for (const h of heads) {
        if (prev && h.level > prev + 1) {
          problems.push({ line: h.line, why: `nhảy từ <h${prev}> sang <${h.tag}>, thiếu <h${prev + 1}>` });
        }
        prev = h.level;
      }
      const present = new Set(heads.map((h) => h.tag));
      for (const r of required) {
        if (!present.has(r)) problems.push({ line: heads[0]?.line ?? 1, why: `thiếu <${r}>` });
      }
      if (!problems.length) good++;
      else if (!firstBad) firstBad = { ...d, problems };
    }
    if (good === docs.length) return ok(`thứ bậc heading hợp lệ (${plural(docs.length, "file", "file")})`);
    const p = firstBad.problems[0];
    return part(good, docs.length, `${firstBad.path}: ${p.why}`,
      ev(firstBad.path, p.line, lineText(firstBad.source, p.line)));
  },

  /**
   * Every `<img>` has an `alt` of at least `minWords` words that is not a
   * placeholder ("image", "img", "photo", "picture", the file name).
   *
   *   { type:"imgHasAlt", minWords:3 }
   *
   * Cannot conclude — and this is the exact reason session 03's "alt text is
   * descriptive" is tier `assist`: whether the words describe THAT image. "Three
   * students in a classroom" scores the same as "Four dogs on a beach" on a photo
   * of a classroom. Only a human can close that gap.
   */
  imgHasAlt(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const minWords = Math.max(1, spec.minWords ?? 1);
    const PLACEHOLDER = /^(image|img|photo|picture|pic|logo|icon|banner|untitled|alt|text|hinh|anh|ảnh|hình)\d*$/i;
    let total = 0;
    let good = 0;
    let firstBad = null;
    for (const d of docs) {
      for (const n of findAll(d.doc, "img")) {
        total++;
        const alt = n.attrs.alt;
        const words = String(alt ?? "").trim().split(/\s+/).filter(Boolean);
        const fileName = String(n.attrs.src ?? "").split("/").pop() ?? "";
        const isPlaceholder =
          words.length === 0 ||
          (words.length === 1 && PLACEHOLDER.test(words[0])) ||
          (fileName && String(alt).trim().toLowerCase() === fileName.toLowerCase());
        if (alt !== undefined && words.length >= minWords && !isPlaceholder) good++;
        else if (!firstBad) {
          firstBad = {
            path: d.path, line: n.line, source: d.source,
            why: alt === undefined
              ? "thiếu alt"
              : words.length === 0
                ? 'alt="" rỗng'
                : isPlaceholder
                  ? `alt là chữ chung chung ("${words.join(" ")}")`
                  : `alt chỉ ${plural(words.length, "từ", "từ")}, cần ${minWords}`,
          };
        }
      }
    }
    if (total === 0) return no("không có <img> nào trên trang");
    if (good === total) return ok(`cả ${total} <img> đều có alt ≥ ${minWords} từ`);
    return part(good, total, `${firstBad.path}: ${firstBad.why}`,
      ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)));
  },

  /* ===========================================================================
     Content
     ======================================================================== */

  /**
   * At least `minCount` elements of a tag hold at least `minWords` words each.
   *
   *   { type:"minWords", tag:"p", minWords:20, minCount:3 }
   *
   * Cannot conclude — this is the hard ceiling of the whole tool — whether the
   * words are the student's own, on topic, or grammatical. Session 03's "3+
   * well-written paragraphs" splits in two: length is machine-checkable and lives
   * here; "well-written" stays with the marker. Do not let a rubric weight imply
   * otherwise.
   */
  minWords(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const minW = Math.max(1, spec.minWords ?? 1);
    const minC = Math.max(1, spec.minCount ?? 1);
    const hits = [];
    let firstShort = null;
    for (const d of docs) {
      for (const n of findAll(d.doc, spec.tag)) {
        const w = wordCount(n);
        if (w >= minW) hits.push({ path: d.path, line: n.line, source: d.source, w });
        else if (!firstShort) firstShort = { path: d.path, line: n.line, source: d.source, w };
      }
    }
    if (hits.length >= minC) {
      return ok(`${hits.length} <${spec.tag}> có ≥ ${minW} từ (cần ${minC})`,
        ev(hits[0].path, hits[0].line, lineText(hits[0].source, hits[0].line)));
    }
    const detail = firstShort
      ? `chỉ ${hits.length}/${minC} <${spec.tag}> đạt ${minW} từ (đoạn ngắn nhất: ${firstShort.w} từ)`
      : `chỉ ${hits.length}/${minC} <${spec.tag}> có ≥ ${minW} từ`;
    const e = firstShort ?? hits[0];
    return part(hits.length, minC, detail, e ? ev(e.path, e.line, lineText(e.source, e.line)) : null);
  },

  /**
   * The number of elements is inside a range: `{ min, max }`.
   *
   *   { type:"countInRange", tag:"#page", min:3, max:5 }   `#page` = .html files
   *
   * Cannot conclude: that the pages are distinct in content. Five copies of the
   * same page count as five.
   */
  countInRange(ctx, spec) {
    const min = spec.min ?? 0;
    const max = spec.max ?? Infinity;
    if (spec.tag === "#page") {
      const pages = filesByExt(ctx, ["html", "htm"]);
      const n = pages.length;
      if (n >= min && n <= max) return ok(`${n} trang HTML (yêu cầu ${min}–${max})`);
      if (n === 0) return na("chưa nộp file .html nào", []);
      return no(`có ${n} trang HTML, yêu cầu ${min}–${max}`,
        ev(pages[0].path, 1, ""));
    }
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    let total = 0;
    let first = null;
    for (const d of docs) {
      const found = findAll(d.doc, spec.tag);
      total += found.length;
      if (!first && found[0]) first = { path: d.path, line: found[0].line, source: d.source };
    }
    const detail = `${total} <${spec.tag}> (yêu cầu ${min}–${max === Infinity ? "∞" : max})`;
    if (total >= min && total <= max) return ok(detail, first ? ev(first.path, first.line, lineText(first.source, first.line)) : null);
    if (total < min) return part(total, min, detail, first ? ev(first.path, first.line, lineText(first.source, first.line)) : null);
    return no(detail, first ? ev(first.path, first.line, lineText(first.source, first.line)) : null);
  },

  /**
   * No template text left behind: "lorem ipsum", "your name here", "TODO",
   * "Document" as the `<title>`, "Untitled".
   *
   *   { type:"noPlaceholderText" }
   *
   * Cannot conclude: that non-placeholder text is good text, nor that a page full
   * of copied Wikipedia prose is the student's own work. This catches the pattern
   * of forgetting to fill the template in, nothing subtler.
   */
  noPlaceholderText(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const PATTERNS = [
      /lorem\s+ipsum/i, /\byour\s+name\s+here\b/i, /\bten\s+cua\s+ban\b/i,
      /\bTODO\b/, /\bFIXME\b/, /\bxxx+\b/i, /\bplaceholder\b/i,
      /\bl(ö|o)r?em\b/i, /\bsample\s+text\b/i, /\bnhap\s+noi\s+dung\b/i,
    ];
    const TITLE_DEFAULTS = /^(document|untitled( document)?|new page|title|trang moi|index)$/i;
    let clean = 0;
    let firstBad = null;
    for (const d of docs) {
      const problems = [];
      const title = findFirst(d.doc, "title");
      if (title && TITLE_DEFAULTS.test(title.text.trim())) {
        problems.push({ line: title.line, why: `<title> vẫn là mặc định: "${title.text.trim()}"` });
      }
      for (const n of allElements(d.doc)) {
        if (n.tag === "script" || n.tag === "style") continue;
        const own = n.textOwn ?? "";
        const hit = PATTERNS.find((p) => p.test(own));
        if (hit) { problems.push({ line: n.line, why: `còn chữ mẫu trong <${n.tag}>` }); break; }
      }
      if (!problems.length) { clean++; continue; }
      if (!firstBad) firstBad = { ...d, problems };
    }
    if (clean === docs.length) return ok(`không còn chữ mẫu (${plural(docs.length, "file", "file")})`);
    const p = firstBad.problems[0];
    return part(clean, docs.length, `${firstBad.path}: ${p.why}`,
      ev(firstBad.path, p.line, lineText(firstBad.source, p.line)));
  },

  /* ===========================================================================
     Code cleanliness
     ======================================================================== */

  /**
   * At least `minCount` HTML comments, each with real words in it.
   *
   *   { type:"hasComment", minCount:1, minWords:1 }
   *
   * Cannot conclude: that the comment is USEFUL, which is the actual rubric
   * wording in session 01 ("at least one useful comment"). `<!-- x -->` is
   * rejected for being empty; `<!-- stuff -->` passes and should not. That gap is
   * why the rubric entry stays tier `assist`.
   */
  hasComment(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const minC = Math.max(1, spec.minCount ?? 1);
    const minW = Math.max(1, spec.minWords ?? 1);
    const good = [];
    for (const d of docs) {
      for (const c of d.doc.comments) {
        // Token shape from tokenizeHtml: { kind:"comment", value, start, line }.
        const words = String(c.value ?? "").trim().split(/\s+/).filter(Boolean);
        if (words.length >= minW) good.push({ path: d.path, line: c.line, source: d.source });
      }
    }
    if (good.length >= minC) {
      return ok(`${plural(good.length, "comment", "comment")} (cần ${minC})`,
        ev(good[0].path, good[0].line, lineText(good[0].source, good[0].line)));
    }
    return part(good.length, minC, `chỉ có ${good.length}/${minC} comment có nội dung`,
      good[0] ? ev(good[0].path, good[0].line, lineText(good[0].source, good[0].line)) : null);
  },

  /**
   * Indentation is consistent: one character (space or tab), never mixed on a
   * line, and step sizes that are multiples of the file's dominant step.
   *
   *   { type:"indentConsistent", tolerance:0.9 }   share of lines that must comply
   *
   * Cannot conclude: that the indentation reflects the nesting. A file indented
   * two spaces everywhere regardless of depth is perfectly consistent and still
   * unreadable, so session 01's "consistent indentation" is graded here only in
   * the mechanical sense.
   */
  indentConsistent(ctx, spec) {
    const wanted = spec.files ?? (spec.file ? [spec.file] : null);
    const missing = [];
    let targets;
    if (wanted) {
      targets = [];
      for (const w of wanted) {
        const f = resolveFile(ctx, w);
        // Any submitted text file is a valid target. Unlike every other check
        // here, indentation is measured from the raw source and never from a
        // parse tree, so a stylesheet grades exactly as well as a page — which
        // is what session 12 asks for. Routing this through htmlTargets() would
        // drop `css/style.css` on the floor and report NOT GRADABLE for a file
        // that was submitted.
        if (f && typeof f.text === "string") targets.push({ path: f.path, source: f.text });
        else missing.push(norm(w));
      }
    } else {
      targets = filesByExt(ctx, ["html", "htm", "css"]).map((f) => ({ path: f.path, source: f.text }));
    }
    if (!targets.length) {
      return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html", "*.css"])}`, missing);
    }
    const tolerance = spec.tolerance ?? 0.9;
    let worst = null;
    for (const t of targets) {
      const lines = String(t.source).split(/\r?\n/);
      const indents = [];
      let mixed = null;
      lines.forEach((raw, i) => {
        if (!raw.trim()) return;
        const lead = raw.match(/^[ \t]*/)[0];
        if (!lead) { indents.push({ line: i + 1, width: 0, char: null }); return; }
        if (/ /.test(lead) && /\t/.test(lead)) {
          if (!mixed) mixed = { line: i + 1, why: "trộn tab và space trên cùng một dòng" };
          return;
        }
        indents.push({ line: i + 1, width: lead.length, char: lead[0] });
      });
      const chars = new Set(indents.filter((x) => x.char).map((x) => x.char));
      const steps = indents.map((x) => x.width).filter((w) => w > 0);
      // Dominant step = the smallest indent width actually used.
      const unit = steps.length ? Math.min(...steps) : 0;
      const offenders = unit > 0 ? indents.filter((x) => x.width % unit !== 0) : [];
      const compliant = indents.length - offenders.length;
      const ratio = indents.length ? compliant / indents.length : 1;
      const problem = mixed
        ? mixed
        : chars.size > 1
          ? { line: indents.find((x) => x.char === [...chars][1])?.line ?? 1, why: "file trộn cả tab và space" }
          : offenders.length
            ? { line: offenders[0].line, why: `thụt lề ${offenders[0].width} không phải bội số của ${unit}` }
            : null;
      const score = mixed || chars.size > 1 ? 0 : ratio;
      if (!worst || score < worst.score) worst = { ...t, score, problem };
    }
    if (worst.score >= tolerance && !worst.problem) {
      return ok(`thụt lề nhất quán (${plural(targets.length, "file", "file")})`);
    }
    if (worst.score >= tolerance) {
      return ok(`thụt lề nhất quán ở mức ${Math.round(worst.score * 100)}%`,
        ev(worst.path, worst.problem.line, lineText(worst.source, worst.problem.line)));
    }
    return res(false, Math.max(0, Math.min(1, worst.score / tolerance)),
      `${worst.path}: ${worst.problem?.why ?? "thụt lề không nhất quán"}`,
      worst.problem ? ev(worst.path, worst.problem.line, lineText(worst.source, worst.problem.line)) : null);
  },

  /* ===========================================================================
     Files, paths and folder layout
     ======================================================================== */

  /**
   * Named files or folders exist in the submission.
   *
   *   { type:"pathsExist", paths:["css/style.css","images/"] }
   *
   * A trailing `/` means "a folder", satisfied by any submitted file inside it —
   * `.gitkeep` counts, which is exactly what session 01 Task 2 asks for.
   *
   * Cannot conclude: anything about the contents. An empty `images/` with only a
   * `.gitkeep` satisfies the folder-layout rubric, and that is correct for week 1.
   */
  pathsExist(ctx, spec) {
    const wanted = spec.paths ?? [];
    const all = (ctx.files ?? []).map((f) => norm(f.path));
    // Nothing submitted at all is INCOMPLETE, not wrong. Reporting "0/3 folders"
    // for an empty upload would be a zero the student cannot learn anything from.
    if (!all.length) return na("chưa nộp file nào", wanted.map(norm));
    const found = [];
    const gone = [];
    for (const p of wanted) {
      const w = norm(p);
      const isDir = w.endsWith("/");
      const hit = isDir
        ? all.find((a) => a === w.slice(0, -1) || a.startsWith(w) || a.includes("/" + w))
        : (resolveFile(ctx, w) ? norm(resolveFile(ctx, w).path) : null);
      if (hit) found.push(w);
      else gone.push(w);
    }
    if (!gone.length) return ok(`đã có: ${listPaths(found)}`);
    return part(found.length, wanted.length, `thiếu: ${listPaths(gone)}`);
  },

  /**
   * File and folder names are lowercase, hyphen-separated, with no spaces.
   *
   *   { type:"fileNaming" }
   *
   * Repository metadata is exempt. `LICENSE`, `SECURITY.md`, `CODEOWNERS` and
   * friends are uppercase because GitHub only recognises them that way — GitHub's
   * own starter repos ship exactly these names. Marking a student down for the
   * convention their host requires teaches the wrong lesson, and it fires on any
   * submission handed in as a repo root rather than a subfolder.
   *
   * Cannot conclude: that the name describes the content. `page-1.html` obeys
   * every rule and tells the reader nothing.
   */
  fileNaming(ctx, spec) {
    const files = ctx.files ?? [];
    if (!files.length) return na("chưa nộp file nào", []);
    const bad = [];
    for (const f of files) {
      if (REPO_METADATA.test(norm(f.path))) continue;
      for (const seg of norm(f.path).split("/")) {
        if (!seg) continue;
        if (/\s/.test(seg)) { bad.push({ path: f.path, why: `"${seg}" có dấu cách` }); break; }
        if (/[A-Z]/.test(seg)) { bad.push({ path: f.path, why: `"${seg}" có chữ in hoa` }); break; }
        if (/[^\w.\-]/.test(seg)) { bad.push({ path: f.path, why: `"${seg}" có ký tự đặc biệt` }); break; }
      }
    }
    const judged = files.filter((f) => !REPO_METADATA.test(norm(f.path))).length;
    if (!judged) return na("chỉ có file cấu hình repo, chưa có file bài làm", []);
    if (!bad.length) return ok(`${plural(judged, "tên file", "tên file")} đúng quy ước`);
    return part(judged - bad.length, judged, `${bad[0].path}: ${bad[0].why}`,
      ev(bad[0].path, 1, ""));
  },

  /**
   * `href`/`src` values are relative, never absolute disk paths or `file://`.
   *
   *   { type:"relativePaths" }
   *
   * Catches the classic `src="C:/Users/Minh/Desktop/photo.jpg"` — a page that only
   * works on the author's laptop. `http(s)://` is allowed: CDN fonts and hosted
   * media are taught from session 07 on.
   *
   * Cannot conclude: that a relative path resolves. `linksResolve` does that.
   */
  relativePaths(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const ABSOLUTE = /^([a-zA-Z]:[\\/]|file:\/\/|\/\/|\/[^/])/;
    let total = 0;
    let good = 0;
    let firstBad = null;
    for (const d of docs) {
      for (const n of allElements(d.doc)) {
        for (const key of ["href", "src", "poster"]) {
          const v = n.attrs[key];
          if (v === undefined || String(v).trim() === "") continue;
          const val = String(v).trim();
          if (/^(https?:|mailto:|tel:|data:|#)/i.test(val)) continue;
          total++;
          if (!ABSOLUTE.test(val)) good++;
          else if (!firstBad) {
            firstBad = { path: d.path, line: n.line, source: d.source, why: `${key}="${val}" là đường dẫn tuyệt đối` };
          }
        }
      }
    }
    if (total === 0) return ok("không có đường dẫn cục bộ nào để kiểm tra");
    if (good === total) return ok(`cả ${total} đường dẫn đều là tương đối`);
    return part(good, total, `${firstBad.path}: ${firstBad.why}`,
      ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)));
  },

  /**
   * Internal `href`/`src` targets exist in the submission.
   *
   *   { type:"linksResolve", attrs:["href"], tags:["a"] }
   *
   * Resolves each value against the folder of the page that contains it, so
   * `../images/x.jpg` from `pages/about.html` is checked at `images/x.jpg`.
   * External URLs, `mailto:`, `tel:`, `data:` and pure `#fragment` links are
   * skipped — this runs offline and must not pretend to know whether a remote URL
   * is alive.
   *
   * Cannot conclude: that external links work (never fetched), or that an `#id`
   * fragment points at a real element. Session 06's "all links work correctly" is
   * therefore graded for internal targets only, which is why it is tier `assist`.
   */
  linksResolve(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const attrs = spec.attrs ?? ["href", "src", "poster"];
    const tags = spec.tags ? new Set(spec.tags.map((t) => t.toLowerCase())) : null;
    const known = new Set((ctx.files ?? []).map((f) => norm(f.path).toLowerCase()));
    const dirs = new Set();
    for (const p of known) {
      const parts = p.split("/");
      for (let i = 1; i < parts.length; i++) dirs.add(parts.slice(0, i).join("/"));
    }
    let total = 0;
    let good = 0;
    let firstBad = null;
    for (const d of docs) {
      const dir = norm(d.path).split("/").slice(0, -1).join("/");
      for (const n of allElements(d.doc)) {
        if (tags && !tags.has(n.tag)) continue;
        for (const key of attrs) {
          const v = n.attrs[key];
          if (v === undefined) continue;
          const val = String(v).trim();
          if (!val || /^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(val)) continue;
          const target = resolvePath(dir, val.split(/[?#]/)[0]);
          total++;
          const t = String(target ?? "").toLowerCase();
          // A bare folder link is served as its index.html.
          const hit = target !== null && (
            known.has(t)
            || known.has(t.replace(/\/$/, "") + "/index.html")
            || (t.endsWith("/") && dirs.has(t.slice(0, -1)))
          );
          if (hit) good++;
          else if (!firstBad) {
            firstBad = { path: d.path, line: n.line, source: d.source, why: `${key}="${val}" không tìm thấy` };
          }
        }
      }
    }
    if (total === 0) return ok("không có liên kết nội bộ nào để kiểm tra");
    if (good === total) return ok(`cả ${total} liên kết nội bộ đều tồn tại`);
    return part(good, total, `${firstBad.path}: ${firstBad.why}`,
      ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)));
  },

  /**
   * Every page links to every other page in `pages` — a real shared nav bar.
   *
   *   { type:"navConsistent", pages:["index.html","about.html","contact.html"] }
   *
   * Cannot conclude: that the nav LOOKS the same or sits in the same place.
   * Session 06's "same header, nav, footer on every page" is checked as "the links
   * are all present", not as a visual diff.
   */
  navConsistent(ctx, spec) {
    const pages = (spec.pages ?? []).map(norm);
    if (!pages.length) return na("rubric chưa khai báo danh sách trang", []);
    const present = pages.map((p) => ({ want: p, file: resolveFile(ctx, p) })).filter((x) => x.file);
    if (!present.length) return na(`chưa có file ${listPaths(pages)}`, pages);
    const absent = pages.filter((p) => !present.some((x) => x.want === p));
    let pairs = 0;
    let good = 0;
    let firstBad = null;
    for (const src of present) {
      const doc = ctx.htmlDocs.get(src.file.path);
      if (!doc) continue;
      const dir = norm(src.file.path).split("/").slice(0, -1).join("/");
      const targets = new Set();
      for (const a of findAll(doc, "a")) {
        const href = String(a.attrs.href ?? "").trim();
        if (!href) continue;
        const resolved = resolvePath(dir, href.split(/[?#]/)[0]);
        if (resolved) targets.add(resolved.toLowerCase());
        targets.add(base(href.split(/[?#]/)[0]).toLowerCase());
      }
      for (const dest of present) {
        if (dest.file.path === src.file.path) continue;
        pairs++;
        const destPath = norm(dest.file.path).toLowerCase();
        if (targets.has(destPath) || targets.has(base(destPath))) good++;
        else if (!firstBad) {
          firstBad = {
            path: src.file.path, source: src.file.text,
            line: findFirst(doc, "nav")?.line ?? 1,
            why: `không có liên kết tới ${dest.want}`,
          };
        }
      }
    }
    if (!pairs) return no("không tìm thấy liên kết điều hướng nào");
    if (good === pairs && !absent.length) {
      return ok(`mọi trang đều liên kết tới nhau (${present.length} trang)`);
    }
    // A page that was never submitted costs the links that would have pointed at
    // it, and is named separately so the result does not read as "nav is broken".
    const denom = pairs + absent.length * present.length;
    const detail = absent.length
      ? `thiếu trang ${listPaths(absent)}; ${good}/${denom} liên kết đúng`
      : `${firstBad.path}: ${firstBad.why}`;
    return part(good, denom, detail,
      firstBad ? ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)) : null);
  },

  /* ===========================================================================
     CSS — linkage and syntax
     ======================================================================== */

  /**
   * A `<link rel="stylesheet">` points at a stylesheet that was actually
   * submitted, on every page.
   *
   *   { type:"cssLinked", href:"css/style.css" }
   *
   * Two failures are reported differently on purpose, because the fix differs:
   * no `<link>` at all (the student styled with a `<style>` block or forgot), vs
   * a `<link>` whose `href` resolves to nothing (the 404 that produces "why is my
   * page still black and white"). The second is the most common session 04 bug.
   *
   * Cannot conclude: that the CSS has any visual effect. A linked, valid, empty
   * stylesheet passes.
   */
  cssLinked(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const known = new Set((ctx.files ?? []).map((f) => norm(f.path).toLowerCase()));
    let good = 0;
    let firstBad = null;
    for (const d of docs) {
      const dir = norm(d.path).split("/").slice(0, -1).join("/");
      const links = findAll(d.doc, "link").filter((l) =>
        String(l.attrs.rel ?? "").trim().toLowerCase().split(/\s+/).includes("stylesheet"));
      if (!links.length) {
        if (!firstBad) {
          firstBad = {
            path: d.path, source: d.source,
            line: findFirst(d.doc, "head")?.line ?? 1,
            why: 'không có <link rel="stylesheet">',
          };
        }
        continue;
      }
      const resolved = links.map((l) => ({
        node: l,
        href: String(l.attrs.href ?? "").trim(),
        target: resolvePath(dir, String(l.attrs.href ?? "").trim().split(/[?#]/)[0]),
      }));
      const wanted = spec.href ? norm(spec.href).toLowerCase() : null;
      const live = resolved.filter((r) =>
        /^https?:/i.test(r.href) || (r.target && known.has(r.target.toLowerCase())));
      const matching = wanted
        ? live.filter((r) => (r.target ?? "").toLowerCase().endsWith(wanted) || base(r.href).toLowerCase() === base(wanted))
        : live;
      if (matching.length) { good++; continue; }
      if (!firstBad) {
        const broken = resolved[0];
        firstBad = {
          path: d.path, source: d.source, line: broken.node.line,
          why: live.length && wanted
            ? `<link> trỏ tới ${broken.href}, rubric cần ${spec.href}`
            : `href="${broken.href}" không tồn tại trong bài nộp`,
        };
      }
    }
    if (good === docs.length) return ok(`CSS được liên kết đúng ở ${plural(docs.length, "trang", "trang")}`);
    return part(good, docs.length, `${firstBad.path}: ${firstBad.why}`,
      ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)));
  },

  /**
   * Braces in the stylesheet balance.
   *
   *   { type:"cssBalancedBraces" }
   *
   * The single most valuable CSS check there is: one missing `}` silently kills
   * every rule after it, and the student sees an unstyled page with no error
   * message anywhere.
   *
   * Cannot conclude: that the CSS is otherwise valid — unknown properties,
   * misspelled values and missing semicolons are not brace errors.
   */
  cssBalancedBraces(ctx, spec) {
    const { sheets, missing } = cssTargets(ctx, spec);
    if (!sheets.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.css"])}`, missing);
    let good = 0;
    let firstBad = null;
    for (const s of sheets) {
      const b = s.sheet.braces;
      if (b.balanced) { good++; continue; }
      if (!firstBad) {
        const why = b.extraCloseLine !== null
          ? `có dấu } thừa (dòng ${b.extraCloseLine})`
          : `thiếu ${b.open - b.close} dấu }`;
        firstBad = { ...s, line: b.extraCloseLine ?? s.sheet.rules[s.sheet.rules.length - 1]?.line ?? 1, why };
      }
    }
    if (good === sheets.length) return ok(`dấu ngoặc CSS cân bằng (${plural(sheets.length, "file", "file")})`);
    return part(good, sheets.length, `${firstBad.path}: ${firstBad.why}`,
      ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)));
  },

  /**
   * A rule exists for a selector.
   *
   *   { type:"cssRuleExists", selector:"body" }
   *   { type:"cssRuleExists", selector:"nav", loose:true }   `header nav` counts
   *
   * `loose` is the useful mode for most rubrics: a student who writes `header nav a`
   * has styled the nav, and demanding the literal selector `nav a` would fail
   * correct work.
   *
   * Cannot conclude: that the rule matches any element on the page. No selector
   * engine runs here — a rule for `.hero` in a page with no `.hero` still exists.
   */
  cssRuleExists(ctx, spec) {
    const { sheets, missing } = cssTargets(ctx, spec);
    if (!sheets.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.css"])}`, missing);
    const wanted = Array.isArray(spec.selector) ? spec.selector : [spec.selector];
    const found = [];
    const gone = [];
    for (const sel of wanted) {
      let hit = null;
      for (const s of sheets) {
        const rules = spec.loose === false ? rulesFor(s.sheet, sel) : rulesMentioning(s.sheet, sel);
        const direct = rules.length ? rules : rulesFor(s.sheet, sel);
        if (direct.length) { hit = { path: s.path, source: s.source, line: direct[0].line, sel }; break; }
      }
      if (hit) found.push(hit);
      else gone.push(sel);
    }
    if (!gone.length) {
      return ok(`đã tạo rule cho ${found.map((f) => f.sel).join(", ")}`,
        ev(found[0].path, found[0].line, lineText(found[0].source, found[0].line)));
    }
    return part(found.length, wanted.length, `chưa có rule cho ${gone.join(", ")}`,
      found[0] ? ev(found[0].path, found[0].line, lineText(found[0].source, found[0].line)) : null);
  },

  /**
   * A property is declared on a selector, with any value.
   *
   *   { type:"cssPropSet", selector:"body", props:["background-color","color"] }
   *
   * Shorthands count: `font: 16px/1.6 Arial` satisfies `font-family`,
   * `font-size` and `line-height`, and `background: #eee` satisfies
   * `background-color`. Without that, students who write idiomatic shorthand lose
   * marks for being more fluent than the rubric author expected.
   *
   * Cannot conclude: that the value is sensible, or that it wins the cascade.
   * `color: red` on `body` passes even when a later `* { color: black }` overrides
   * it everywhere.
   */
  cssPropSet(ctx, spec) {
    const { sheets, missing } = cssTargets(ctx, spec);
    if (!sheets.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.css"])}`, missing);
    const props = (spec.props ?? [spec.prop]).filter(Boolean).map((p) => String(p).toLowerCase());
    const sel = spec.selector;
    const found = [];
    const gone = [];
    for (const prop of props) {
      let hit = null;
      for (const s of sheets) {
        const decls = sel
          ? (spec.loose === false ? declsFor(s.sheet, sel, prop) : declsMentioning(s.sheet, sel, prop))
          : allDecls(s.sheet).filter((d) => d.prop === prop);
        const viaShorthand = hit ? [] : shorthandFor(s.sheet, sel, prop, spec.loose !== false);
        const use = decls.length ? decls : viaShorthand;
        if (use.length) { hit = { path: s.path, source: s.source, line: use[0].line, prop }; break; }
      }
      if (hit) found.push(hit);
      else gone.push(prop);
    }
    const where = sel ? ` cho ${sel}` : "";
    if (!gone.length) {
      return ok(`đã khai báo ${found.map((f) => f.prop).join(", ")}${where}`,
        ev(found[0].path, found[0].line, lineText(found[0].source, found[0].line)));
    }
    return part(found.length, props.length, `chưa khai báo ${gone.join(", ")}${where}`,
      found[0] ? ev(found[0].path, found[0].line, lineText(found[0].source, found[0].line)) : null);
  },

  /**
   * A property is declared with a specific value.
   *
   *   { type:"cssDeclEquals", selector:"table", prop:"border-collapse", value:"collapse" }
   *   { type:"cssDeclEquals", selector:"img", prop:"max-width", value:"100%" }
   *
   * Values are compared after `normalizeValue`, so `1.60` matches `1.6` and
   * `ARIAL, sans-serif` matches `arial, sans-serif`. Colours are not this check's
   * job — use `cssColorSet`, which compares colours rather than spellings.
   *
   * Cannot conclude: that the declaration takes effect. A later rule may override
   * it and this check will not notice.
   */
  cssDeclEquals(ctx, spec) {
    const { sheets, missing } = cssTargets(ctx, spec);
    if (!sheets.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.css"])}`, missing);
    const prop = String(spec.prop).toLowerCase();
    const wanted = (Array.isArray(spec.value) ? spec.value : [spec.value]).map(normalizeValue);
    let seen = null;
    for (const s of sheets) {
      const decls = spec.selector
        ? (spec.loose === false ? declsFor(s.sheet, spec.selector, prop) : declsMentioning(s.sheet, spec.selector, prop))
        : allDecls(s.sheet).filter((d) => d.prop === prop);
      for (const d of decls) {
        const got = normalizeValue(d.value);
        if (wanted.some((w) => got === w || got.startsWith(w + " ") || got.split(",")[0] === w)) {
          return ok(`${prop}: ${d.value}${spec.selector ? ` (${d.selector})` : ""}`,
            ev(s.path, d.line, lineText(s.source, d.line)));
        }
        if (!seen) seen = { path: s.path, source: s.source, line: d.line, value: d.value };
      }
    }
    const want = wanted.join(" hoặc ");
    if (seen) {
      return no(`${prop} là "${seen.value}", rubric cần "${want}"`,
        ev(seen.path, seen.line, lineText(seen.source, seen.line)));
    }
    return no(`chưa khai báo ${prop}: ${want}${spec.selector ? ` cho ${spec.selector}` : ""}`);
  },

  /**
   * A colour property is set, optionally to a specific colour.
   *
   *   { type:"cssColorSet", selector:"body", props:["background-color","color"] }
   *   { type:"cssColorSet", selector:"body", prop:"color", value:"#fff" }
   *
   * Separate from `cssDeclEquals` because colours have many spellings for one
   * colour: `white`, `#fff`, `#FFFFFF`, `rgb(255,255,255)`, `hsl(0,0%,100%)` are
   * the same and must grade the same.
   *
   * A value the parser cannot reduce — `var(--brand)`, `currentColor`, `inherit`,
   * `lab()` — counts as SET but is never called a mismatch. Treating an
   * unparseable colour as wrong would punish students using custom properties,
   * which is more advanced than the rubric asks for, not less.
   */
  cssColorSet(ctx, spec) {
    const { sheets, missing } = cssTargets(ctx, spec);
    if (!sheets.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.css"])}`, missing);
    const props = (spec.props ?? [spec.prop]).filter(Boolean).map((p) => String(p).toLowerCase());
    const found = [];
    const gone = [];
    const wrong = [];
    for (const prop of props) {
      let hit = null;
      for (const s of sheets) {
        const decls = spec.selector
          ? (spec.loose === false ? declsFor(s.sheet, spec.selector, prop) : declsMentioning(s.sheet, spec.selector, prop))
          : allDecls(s.sheet).filter((d) => d.prop === prop);
        const viaShorthand = decls.length ? [] : shorthandFor(s.sheet, spec.selector, prop, spec.loose !== false);
        for (const d of [...decls, ...viaShorthand]) {
          const entry = { path: s.path, source: s.source, line: d.line, prop, value: d.value };
          if (!spec.value) { hit = entry; break; }
          if (sameColor(d.value, spec.value)) { hit = entry; break; }
          // Unparseable is not a mismatch: record it as set, keep looking for an
          // exact match in case a later rule has one.
          if (normalizeColor(d.value) === null) { hit = { ...entry, unknown: true }; continue; }
          if (!wrong.length) wrong.push(entry);
        }
        if (hit) break;
      }
      if (hit) found.push(hit);
      else gone.push(prop);
    }
    const where = spec.selector ? ` cho ${spec.selector}` : "";
    if (!gone.length) {
      const unknown = found.filter((f) => f.unknown);
      const detail = unknown.length
        ? `${found.map((f) => f.prop).join(", ")}${where} (giá trị ${unknown[0].value} không so sánh được — cần xem bằng mắt)`
        : spec.value
          ? `${found.map((f) => `${f.prop}: ${f.value}`).join(", ")}${where} khớp màu ${spec.value}`
          : `đã đặt màu ${found.map((f) => f.prop).join(", ")}${where}`;
      return ok(detail, ev(found[0].path, found[0].line, lineText(found[0].source, found[0].line)));
    }
    const e = wrong[0] ?? found[0];
    const detail = wrong.length && spec.value
      ? `${wrong[0].prop} là ${wrong[0].value}, rubric cần ${spec.value}`
      : `chưa đặt màu ${gone.join(", ")}${where}`;
    return part(found.length, props.length, detail,
      e ? ev(e.path, e.line, lineText(e.source, e.line)) : null);
  },

  /**
   * At least `minCount` distinct properties are declared on a selector — the way
   * to grade "the header/nav/main/footer are all styled" without dictating how.
   *
   *   { type:"cssMinDecls", selector:"nav", minCount:2 }
   *   { type:"cssMinDecls", selectors:["header","nav","main","footer"], minCount:1 }
   *
   * Cannot conclude: that the styling is any good, or visible. `color: black` on a
   * white page counts as one declaration.
   */
  cssMinDecls(ctx, spec) {
    const { sheets, missing } = cssTargets(ctx, spec);
    if (!sheets.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.css"])}`, missing);
    const sels = spec.selectors ?? [spec.selector];
    const minC = Math.max(1, spec.minCount ?? 1);
    const results = [];
    for (const sel of sels) {
      const props = new Set();
      let first = null;
      for (const s of sheets) {
        const rules = spec.loose === false ? rulesFor(s.sheet, sel) : rulesMentioning(s.sheet, sel);
        for (const r of rules) {
          for (const d of r.decls) {
            if (!d.prop || d.malformed) continue;
            props.add(d.prop);
            if (!first) first = { path: s.path, source: s.source, line: d.line };
          }
        }
      }
      results.push({ sel, n: props.size, first });
    }
    const satisfied = results.filter((r) => r.n >= minC);
    if (satisfied.length === results.length) {
      const e = satisfied[0].first;
      return ok(`${sels.join(", ")}: mỗi selector có ≥ ${minC} khai báo`,
        e ? ev(e.path, e.line, lineText(e.source, e.line)) : null);
    }
    const worst = results.filter((r) => r.n < minC).sort((a, b) => a.n - b.n)[0];
    // Score by selectors satisfied, not by declarations counted: three fully
    // styled regions out of four is 0.75, which is what a marker would give.
    return part(satisfied.length, results.length,
      `${worst.sel}: chỉ ${worst.n}/${minC} khai báo`,
      worst.first ? ev(worst.first.path, worst.first.line, lineText(worst.first.source, worst.first.line)) : null);
  },

  /**
   * A `:hover` rule exists, optionally for a given selector.
   *
   *   { type:"cssHoverExists", selector:"nav a" }
   *
   * Cannot conclude: that hovering changes anything visible. `a:hover { color:
   * inherit }` is a hover rule that does nothing, and this check counts it.
   */
  cssHoverExists(ctx, spec) {
    const { sheets, missing } = cssTargets(ctx, spec);
    if (!sheets.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.css"])}`, missing);
    const want = spec.selector ? String(spec.selector).toLowerCase() : null;
    const wantHead = want ? want.split(/\s+/).pop() : null;
    let anyHover = null;
    for (const s of sheets) {
      for (const r of s.sheet.rules) {
        for (const sel of r.selectors) {
          if (!/:hover\b/.test(sel)) continue;
          const entry = { path: s.path, source: s.source, line: r.line, sel };
          if (!want) return ok(`có rule :hover (${sel})`, ev(entry.path, entry.line, lineText(entry.source, entry.line)));
          const bare = sel.replace(/:hover\b/g, "");
          if (bare.includes(wantHead) || sel.includes(want)) {
            return ok(`có ${sel}`, ev(entry.path, entry.line, lineText(entry.source, entry.line)));
          }
          if (!anyHover) anyHover = entry;
        }
      }
    }
    if (anyHover) {
      return no(`có :hover nhưng không phải cho ${spec.selector} (thấy ${anyHover.sel})`,
        ev(anyHover.path, anyHover.line, lineText(anyHover.source, anyHover.line)));
    }
    return no(`chưa có rule :hover${spec.selector ? ` cho ${spec.selector}` : ""}`);
  },

  /**
   * A selector somewhere in the stylesheet matches a pattern.
   *
   *   { type:"cssSelectorPattern", pattern:"nth-child", label:"kẻ sọc bảng" }
   *   { type:"cssSelectorPattern", pattern:":hover\\s+\\.dropdown|:hover\\s*>?\\s*ul" }
   *
   * The escape hatch for rubric lines that name a TECHNIQUE rather than a
   * selector: zebra striping is `nth-child`, a CSS dropdown is "some `:hover`
   * that reveals a `ul`". Matching the selector text is honest about what is
   * being observed — the shape of the code, not the rendered result.
   *
   * `pattern` is a rubric-authored regex, never student input, so it cannot be
   * used to attack the grader. It is matched case-insensitively against each
   * normalized selector.
   *
   * Cannot conclude: that the technique works. `tr:nth-child(even)` with no
   * declarations inside is matched here and stripes nothing, which is why
   * rubrics pair this with `cssMinDecls` when the marks are worth splitting.
   */
  cssSelectorPattern(ctx, spec) {
    const { sheets, missing } = cssTargets(ctx, spec);
    if (!sheets.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.css"])}`, missing);
    let rx;
    try { rx = new RegExp(spec.pattern, "i"); }
    catch { return na(`rubric có pattern không hợp lệ: ${spec.pattern}`, []); }
    const label = spec.label ?? spec.pattern;
    const minDecls = spec.minDecls ?? 0;
    for (const s of sheets) {
      for (const r of s.sheet.rules) {
        if (!r.selectors.some((sel) => rx.test(sel)) && !rx.test(r.selector)) continue;
        const real = r.decls.filter((d) => d.prop && !d.malformed);
        if (real.length < minDecls) continue;
        return ok(`${label}: ${r.selector}`, ev(s.path, r.line, lineText(s.source, r.line)));
      }
    }
    return no(`chưa thấy ${label}`);
  },

  /**
   * A `@media` query exists, optionally with a breakpoint and a minimum amount of
   * change inside it.
   *
   *   { type:"cssMediaQuery", maxWidth:768, minDecls:5 }
   *
   * `maxWidth` accepts the breakpoint the rubric names or anything within
   * `tolerance` px of it (default 32), because 768, 767 and 750 are the same
   * intent. `em`/`rem` breakpoints are converted at 16px.
   *
   * Session 15 asks for "at least one media query with 5+ element changes", so
   * both the declaration count and the number of distinct selectors touched are
   * reported — a query that restyles one selector five times is not what the
   * rubric means, and the detail string says so.
   *
   * Cannot conclude: that the mobile layout LOOKS right at 768px. Nothing is
   * rendered. This is "the responsive work was done", not "it works".
   */
  cssMediaQuery(ctx, spec) {
    const { sheets, missing } = cssTargets(ctx, spec);
    if (!sheets.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.css"])}`, missing);
    const minDecls = spec.minDecls ?? 1;
    const tol = spec.tolerance ?? 32;
    const want = spec.maxWidth ?? null;
    const candidates = [];
    for (const s of sheets) {
      for (const bp of mediaMaxWidths(s.sheet)) {
        const px = bp.unit === "px" ? bp.value : bp.value * 16;
        candidates.push({
          path: s.path, source: s.source, line: bp.block.line, px,
          decls: declCount(bp.block), sels: selectorsInside(bp.block).length,
          params: bp.block.params,
        });
      }
    }
    if (!candidates.length) {
      // A media query with no max-width at all still counts as a media query.
      const other = sheets.flatMap((s) =>
        (s.sheet.atRules ?? []).filter((a) => a.name === "media")
          .map((a) => ({ path: s.path, source: s.source, line: a.line, px: null, decls: declCount(a), sels: selectorsInside(a).length, params: a.params })));
      if (!other.length) return no("chưa có @media query nào");
      candidates.push(...other);
    }
    const onTarget = want === null ? candidates : candidates.filter((c) => c.px !== null && Math.abs(c.px - want) <= tol);
    const pool = onTarget.length ? onTarget : candidates;
    const best = pool.sort((a, b) => b.decls - a.decls)[0];
    const e = ev(best.path, best.line, lineText(best.source, best.line));
    if (want !== null && !onTarget.length) {
      const at = best.px === null ? best.params : `${best.px}px`;
      return part(1, 2, `có @media ở ${at}, rubric cần khoảng ${want}px`, e);
    }
    const shape = `${best.decls} khai báo trên ${best.sels || 1} selector`;
    if (best.decls >= minDecls) return ok(`@media (${best.params}): ${shape}`, e);
    return part(best.decls, minDecls, `@media (${best.params}) chỉ có ${shape}, cần ${minDecls}`, e);
  },

  /**
   * A numeric CSS value falls in a range.
   *
   *   { type:"cssNumberInRange", selector:"body", prop:"line-height", min:1.6 }
   *
   * Session 07 asks for `line-height` "at least 1.6", which `cssDeclEquals` cannot
   * express: 1.6, 1.7 and 165% all satisfy it and none of them are equal to each
   * other. Percentages and `em` are read as multipliers (`160%` -> 1.6) when the
   * property is unitless by nature; otherwise the unit must match `unit`.
   *
   * Cannot conclude: that the resulting text is comfortable to read. It is a
   * number in a range, nothing more.
   */
  cssNumberInRange(ctx, spec) {
    const { sheets, missing } = cssTargets(ctx, spec);
    if (!sheets.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.css"])}`, missing);
    const prop = String(spec.prop).toLowerCase();
    const min = spec.min ?? -Infinity;
    const max = spec.max ?? Infinity;
    const ratio = spec.unit === undefined || spec.unit === null;
    let best = null;
    for (const s of sheets) {
      const decls = spec.selector
        ? (spec.loose === false ? declsFor(s.sheet, spec.selector, prop) : declsMentioning(s.sheet, spec.selector, prop))
        : allDecls(s.sheet).filter((d) => d.prop === prop);
      for (const d of decls) {
        const m = /(-?\d+(?:\.\d+)?)\s*(px|em|rem|%|vw|vh)?/.exec(String(d.value));
        if (!m) continue;
        let n = parseFloat(m[1]);
        const unit = (m[2] ?? "").toLowerCase();
        if (ratio && unit === "%") n /= 100;
        else if (!ratio && spec.unit && unit && unit !== String(spec.unit).toLowerCase()) continue;
        const entry = { path: s.path, source: s.source, line: d.line, n, raw: d.value };
        if (n >= min && n <= max) {
          return ok(`${prop}: ${d.value}`, ev(entry.path, entry.line, lineText(entry.source, entry.line)));
        }
        if (!best) best = entry;
      }
    }
    const range = min !== -Infinity && max !== Infinity ? `${min}–${max}`
      : min !== -Infinity ? `≥ ${min}` : `≤ ${max}`;
    if (best) {
      return no(`${prop} là ${best.raw}, rubric cần ${range}`,
        ev(best.path, best.line, lineText(best.source, best.line)));
    }
    return no(`chưa khai báo ${prop}${spec.selector ? ` cho ${spec.selector}` : ""} (cần ${range})`);
  },

  /**
   * At least `minCount` CSS comments with real words in them.
   *
   *   { type:"cssHasComment", minCount:2 }
   *
   * Counted from the raw source, because `parseCss` blanks comments out before
   * parsing. Comment openers inside quoted values are skipped — `content: "/*"`
   * is a string, not a comment.
   *
   * Cannot conclude: that the comment explains anything. Same limit as
   * `hasComment`, and the same reason session 12's "clean formatting with
   * comments" stays tier `assist`.
   */
  cssHasComment(ctx, spec) {
    const { sheets, missing } = cssTargets(ctx, spec);
    if (!sheets.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.css"])}`, missing);
    const minC = Math.max(1, spec.minCount ?? 1);
    const minW = Math.max(1, spec.minWords ?? 1);
    const good = [];
    for (const s of sheets) {
      for (const c of cssComments(s.source)) {
        const words = c.value.trim().split(/\s+/).filter(Boolean);
        if (words.length >= minW) good.push({ path: s.path, line: c.line, source: s.source });
      }
    }
    if (good.length >= minC) {
      return ok(`${plural(good.length, "comment CSS", "comment CSS")} (cần ${minC})`,
        ev(good[0].path, good[0].line, lineText(good[0].source, good[0].line)));
    }
    return part(good.length, minC, `chỉ có ${good.length}/${minC} comment CSS có nội dung`,
      good[0] ? ev(good[0].path, good[0].line, lineText(good[0].source, good[0].line)) : null);
  },

  /* ===========================================================================
     HTML — element relationships
     ======================================================================== */

  /**
   * One element appears before another in the source.
   *
   *   { type:"elementOrder", first:"meta[charset]", then:"title" }
   *
   * Session 01 asks for `charset` before `title`, and it matters: the browser
   * decodes the title with whatever encoding it has guessed so far, so a late
   * `charset` is how "Nguyễn" becomes "Nguyá»…n" in the tab.
   *
   * `tag[attr]` selects only elements carrying that attribute.
   *
   * Cannot conclude: that the encoding is right, only that the declaration comes
   * early enough to apply.
   */
  elementOrder(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const pick = (doc, sel) => {
      const m = /^([a-zA-Z0-9-]+)(?:\[([a-zA-Z-]+)\])?$/.exec(String(sel).trim());
      if (!m) return null;
      const list = findAll(doc, m[1]);
      const filtered = m[2] ? list.filter((n) => n.attrs[m[2].toLowerCase()] !== undefined) : list;
      return filtered[0] ?? null;
    };
    let good = 0;
    let firstBad = null;
    for (const d of docs) {
      const a = pick(d.doc, spec.first);
      const b = pick(d.doc, spec.then);
      if (!a || !b) {
        if (!firstBad) {
          firstBad = {
            ...d, line: (a ?? b)?.line ?? 1,
            why: `thiếu ${!a ? spec.first : spec.then}`,
          };
        }
        continue;
      }
      if (a.line < b.line || (a.line === b.line && a.raw && d.source.indexOf(a.raw) < d.source.indexOf(b.raw ?? ""))) {
        good++;
        continue;
      }
      if (!firstBad) firstBad = { ...d, line: b.line, why: `${spec.then} đứng trước ${spec.first}` };
    }
    if (good === docs.length) return ok(`${spec.first} đứng trước ${spec.then} (${plural(docs.length, "file", "file")})`);
    return part(good, docs.length, `${firstBad.path}: ${firstBad.why}`,
      ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)));
  },

  /**
   * Elements of one tag sit inside an ancestor of another.
   *
   *   { type:"elementInside", tag:"nav", inside:"header" }
   *   { type:"elementInside", tag:"th", inside:"thead", all:true }
   *   { type:"elementInside", tag:"li", inside:"ul|ol", all:true }
   *
   * `all:false` (default) asks whether at least `minCount` of them are nested
   * correctly; `all:true` requires every one of them to be.
   *
   * `inside` accepts `a|b` for "either parent", the same spelling `tagsNested`
   * uses, because `<li>` is legal in both `<ul>` and `<ol>` and a rubric should
   * not have to pick one.
   *
   * Cannot conclude: that the nesting is semantically apt. `<nav>` inside
   * `<header>` and `<header>` inside `<nav>` are both "nested"; only the rubric
   * knows which one the session taught.
   */
  elementInside(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const hosts = String(spec.inside).toLowerCase().split("|").map((h) => h.trim()).filter(Boolean);
    const minC = Math.max(1, spec.minCount ?? 1);
    let total = 0;
    let inside = 0;
    let first = null;
    let firstBad = null;
    for (const d of docs) {
      for (const n of findAll(d.doc, spec.tag)) {
        total++;
        const up = ancestors(n);
        if (hosts.some((h) => up.includes(h))) {
          inside++;
          if (!first) first = { path: d.path, line: n.line, source: d.source };
        } else if (!firstBad) firstBad = { path: d.path, line: n.line, source: d.source };
      }
    }
    const shown = hosts.map((h) => `<${h}>`).join(" hoặc ");
    const label = `<${spec.tag}> trong ${shown}`;
    if (total === 0) return no(`không có <${spec.tag}> nào để kiểm tra`);
    if (spec.all) {
      if (inside === total) return ok(`cả ${total} ${label}`, first ? ev(first.path, first.line, lineText(first.source, first.line)) : null);
      return part(inside, total, `${total - inside}/${total} <${spec.tag}> nằm ngoài ${shown}`,
        ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)));
    }
    if (inside >= minC) return ok(`${inside} ${label}`, ev(first.path, first.line, lineText(first.source, first.line)));
    return part(inside, minC, `chỉ ${inside}/${minC} ${label}`,
      firstBad ? ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)) : null);
  },

  /**
   * An `<a href="#id">` points at an `id` that exists on the same page.
   *
   *   { type:"anchorToId", href:"#top" }        session 14 "back to top"
   *   { type:"anchorToId" }                     every in-page anchor on the page
   *
   * `linksResolve` skips `#fragment` links precisely because they need this
   * different question asked: not "does the file exist" but "does the target `id`
   * exist in this document". `href="#top"` with no `id="top"` anywhere is the
   * standard session 14 bug, and the browser silently does nothing.
   *
   * `href="#"` is accepted as the deliberate "jump to top of document" idiom.
   *
   * Cannot conclude: that the jump feels right, or that the target is visible.
   */
  anchorToId(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const wanted = spec.href ? String(spec.href).replace(/^#/, "").toLowerCase() : null;
    let total = 0;
    let good = 0;
    let firstBad = null;
    let firstGood = null;
    for (const d of docs) {
      const ids = new Set(
        allElements(d.doc)
          .map((n) => String(n.attrs.id ?? "").trim().toLowerCase())
          .filter(Boolean),
      );
      for (const a of findAll(d.doc, "a")) {
        const href = String(a.attrs.href ?? "").trim();
        if (!href.startsWith("#")) continue;
        const frag = href.slice(1).toLowerCase();
        if (wanted !== null && frag !== wanted) continue;
        total++;
        // `href="#"` and `#top` both mean "top of page" to every browser.
        if (frag === "" || frag === "top" || ids.has(frag)) {
          good++;
          if (!firstGood) firstGood = { path: d.path, line: a.line, source: d.source, href };
        } else if (!firstBad) {
          firstBad = { path: d.path, line: a.line, source: d.source, why: `href="${href}" nhưng không có id="${frag}"` };
        }
      }
    }
    if (total === 0) {
      return no(wanted ? `chưa có liên kết href="#${wanted}"` : "không có liên kết nội trang (#) nào");
    }
    if (good === total) {
      return ok(`${plural(total, "liên kết nội trang", "liên kết nội trang")} trỏ đúng id`,
        firstGood ? ev(firstGood.path, firstGood.line, lineText(firstGood.source, firstGood.line)) : null);
    }
    return part(good, total, `${firstBad.path}: ${firstBad.why}`,
      ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)));
  },

  /**
   * A class is used in the HTML **and** styled in the CSS.
   *
   *   { type:"classStyled", classes:["dropdown","dropdown-content"] }
   *
   * Grades "the feature is integrated" rather than "the feature exists": session
   * 14's dropdown is only working if the markup carries the class and the
   * stylesheet has a rule for it. Reporting which half is missing is the whole
   * point — a student with `.dropdown` in CSS but `class="drop-down"` in HTML sees
   * nothing happen and has no way to guess why.
   *
   * Cannot conclude: that the styling produces a working dropdown. `display:none`
   * with no `:hover` counterpart passes here and hides the menu forever, which is
   * why the rubric pairs this with `cssSelectorPattern`.
   */
  classStyled(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const { sheets } = cssTargets(ctx, {});
    const wanted = (spec.classes ?? [spec.class]).filter(Boolean).map((c) => String(c).replace(/^\./, "").toLowerCase());
    const results = [];
    for (const cls of wanted) {
      let inHtml = null;
      for (const d of docs) {
        const node = allElements(d.doc).find((n) => classList(n).some((c) => c.toLowerCase() === cls));
        if (node) { inHtml = { path: d.path, line: node.line, source: d.source }; break; }
      }
      let inCss = null;
      for (const s of sheets) {
        const rule = s.sheet.rules.find((r) => r.selectors.some((sel) => new RegExp(`\\.${escapeRx(cls)}(?![\\w-])`).test(sel)));
        if (rule) { inCss = { path: s.path, line: rule.line, source: s.source }; break; }
      }
      results.push({ cls, inHtml, inCss });
    }
    const done = results.filter((r) => r.inHtml && r.inCss);
    if (done.length === results.length) {
      const e = done[0].inCss;
      return ok(`${wanted.map((c) => "." + c).join(", ")}: có trong HTML và được style`,
        ev(e.path, e.line, lineText(e.source, e.line)));
    }
    const bad = results.find((r) => !r.inHtml || !r.inCss);
    const why = !bad.inHtml && !bad.inCss
      ? `không thấy .${bad.cls} trong cả HTML và CSS`
      : !bad.inHtml
        ? `CSS có .${bad.cls} nhưng HTML chưa dùng class này`
        : `HTML có .${bad.cls} nhưng CSS chưa style nó`;
    const e = bad.inHtml ?? bad.inCss;
    // Half credit per class when one side is present: the work is half done and
    // the detail string says which half.
    const score = results.reduce((s, r) => s + (r.inHtml ? 0.5 : 0) + (r.inCss ? 0.5 : 0), 0);
    return part(score, results.length, why, e ? ev(e.path, e.line, lineText(e.source, e.line)) : null);
  },

  /* ===========================================================================
     Forms
     ======================================================================== */

  /**
   * At least `minCount` DISTINCT form control kinds are used.
   *
   *   { type:"inputTypes", minCount:5 }
   *
   * `<select>` and `<textarea>` count as kinds alongside each `input[type]`, since
   * session 13's "5 different input types" lists them among the five. An `<input>`
   * with no `type` counts as `text`, which is what the browser does.
   *
   * Distinct kinds, not controls: ten text boxes are one kind. That is the whole
   * point of the rubric line.
   *
   * Cannot conclude: that each control is the right one for its field. A `type="text"`
   * email box is a real mistake this cannot see; `cssSelectorPattern` and the human
   * marker cover it.
   */
  inputTypes(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const minC = Math.max(1, spec.minCount ?? 1);
    const kinds = new Map();
    for (const d of docs) {
      for (const n of findAll(d.doc, "input")) {
        const t = String(n.attrs.type ?? "text").trim().toLowerCase() || "text";
        if (!kinds.has(t)) kinds.set(t, { path: d.path, line: n.line, source: d.source });
      }
      for (const tag of ["select", "textarea"]) {
        const n = findFirst(d.doc, tag);
        if (n && !kinds.has(tag)) kinds.set(tag, { path: d.path, line: n.line, source: d.source });
      }
    }
    const names = [...kinds.keys()];
    const e = kinds.values().next().value;
    const evd = e ? ev(e.path, e.line, lineText(e.source, e.line)) : null;
    if (names.length >= minC) return ok(`${names.length} loại input: ${names.join(", ")}`, evd);
    if (!names.length) return no(`chưa có input nào (cần ${minC} loại khác nhau)`);
    return part(names.length, minC, `chỉ ${names.length}/${minC} loại input (${names.join(", ")})`, evd);
  },

  /**
   * Every labelable control is connected to a `<label>`.
   *
   *   { type:"labelsMatch" }
   *
   * Two valid ways to connect, both accepted: `<label for="x">` with `<input id="x">`,
   * or the control nested inside the label. Hidden and button-like inputs are
   * exempt — nobody labels `<input type="hidden">`.
   *
   * This is the accessibility check with real consequences: an unlabelled field is
   * unusable with a screen reader and its label is not clickable, so it is graded
   * strictly, per control rather than per page.
   *
   * Cannot conclude: that the label TEXT describes the field. `<label for="email">
   * Name:</label>` is connected and wrong.
   */
  labelsMatch(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const SKIP = new Set(["hidden", "submit", "reset", "button", "image"]);
    let total = 0;
    let good = 0;
    let firstBad = null;
    let firstGood = null;
    for (const d of docs) {
      const labelFor = new Set(
        findAll(d.doc, "label")
          .map((l) => String(l.attrs.for ?? "").trim().toLowerCase())
          .filter(Boolean),
      );
      const controls = [
        ...findAll(d.doc, "input").filter((n) => !SKIP.has(String(n.attrs.type ?? "text").toLowerCase())),
        ...findAll(d.doc, "select"),
        ...findAll(d.doc, "textarea"),
      ];
      for (const n of controls) {
        total++;
        const id = String(n.attrs.id ?? "").trim().toLowerCase();
        const wrapped = ancestors(n).includes("label");
        if (wrapped || (id && labelFor.has(id))) {
          good++;
          if (!firstGood) firstGood = { path: d.path, line: n.line, source: d.source };
        } else if (!firstBad) {
          firstBad = {
            path: d.path, line: n.line, source: d.source,
            why: id ? `<${n.tag} id="${id}"> không có <label for="${id}">` : `<${n.tag}> chưa có id nên không thể gắn label`,
          };
        }
      }
    }
    if (total === 0) return no("không có input/select/textarea nào để kiểm tra label");
    if (good === total) {
      return ok(`cả ${total} ô nhập đều gắn với label`,
        firstGood ? ev(firstGood.path, firstGood.line, lineText(firstGood.source, firstGood.line)) : null);
    }
    return part(good, total, `${firstBad.path}: ${firstBad.why}`,
      ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)));
  },

  /* ===========================================================================
     Tables and media
     ======================================================================== */

  /**
   * A table uses the parts the session taught.
   *
   *   { type:"tableStructure", require:["caption","thead","tbody","th","td"],
   *     minCols:5, minRows:5, spans:true }
   *
   * Columns are counted from the widest row (`colspan` included, since a cell
   * spanning three columns fills three) and rows from `<tr>` inside `<tbody>` when
   * there is one, so the header row is not counted as data. Both are what the
   * session 09 rubric means by "5+ columns, 5+ rows".
   *
   * Scored across the required parts plus the size and span requirements, so a
   * table missing only `<caption>` loses a fraction rather than everything.
   *
   * Cannot conclude: that the table holds real information or that the header
   * cells label the right columns. `<th>` in the wrong place is still a `<th>`.
   */
  tableStructure(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    let table = null;
    let where = null;
    for (const d of docs) {
      const t = findFirst(d.doc, "table");
      if (t) { table = t; where = d; break; }
    }
    if (!table) return no("chưa có <table> nào");
    const has = (tag) => findAll(table, tag).length > 0;
    const need = spec.require ?? ["caption", "thead", "tbody", "th", "td"];
    const problems = [];
    let got = 0;
    for (const tag of need) {
      if (has(tag)) got++;
      else problems.push(`thiếu <${tag}>`);
    }
    let want = need.length;
    const rowsAll = findAll(table, "tr");
    const bodies = findAll(table, "tbody");
    const dataRows = bodies.length ? bodies.flatMap((b) => findAll(b, "tr")) : rowsAll;
    const widest = Math.max(0, ...rowsAll.map((r) =>
      [...findAll(r, "th"), ...findAll(r, "td")]
        .reduce((s, c) => s + (parseInt(c.attrs.colspan, 10) || 1), 0)));
    if (spec.minCols) {
      want++;
      if (widest >= spec.minCols) got++;
      else problems.push(`chỉ ${widest} cột, cần ${spec.minCols}`);
    }
    if (spec.minRows) {
      want++;
      if (dataRows.length >= spec.minRows) got++;
      else problems.push(`chỉ ${dataRows.length} hàng dữ liệu, cần ${spec.minRows}`);
    }
    if (spec.spans) {
      want++;
      const spanned = allElements(table).some((n) =>
        (n.tag === "td" || n.tag === "th") && (n.attrs.colspan !== undefined || n.attrs.rowspan !== undefined));
      if (spanned) got++;
      else problems.push("chưa dùng colspan/rowspan");
    }
    const e = ev(where.path, table.line, lineText(where.source, table.line));
    if (got === want) {
      return ok(`bảng đủ cấu trúc: ${widest} cột, ${dataRows.length} hàng dữ liệu`, e);
    }
    return part(got, want, `${where.path}: ${problems.join("; ")}`, e);
  },

  /**
   * A `<video>` or `<audio>` element with the attributes and fallback the session
   * asked for.
   *
   *   { type:"mediaElement", tag:"video", attrs:["controls","poster","width"], fallback:true }
   *
   * `fallback:true` requires either text inside the element or a `<source>` child,
   * because both are how a browser that cannot play the file is handled. Presence
   * of `controls` is treated as boolean: `controls`, `controls=""` and
   * `controls="controls"` are all the same thing to a browser.
   *
   * Cannot conclude: that the media FILE plays, or exists at all when it is a
   * remote URL. The homework explicitly allows sample URLs from w3schools, which
   * an offline grader can never fetch — the `src` is checked for shape, not for
   * life.
   */
  mediaElement(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const tag = String(spec.tag).toLowerCase();
    let node = null;
    let where = null;
    for (const d of docs) {
      const n = findFirst(d.doc, tag);
      if (n) { node = n; where = d; break; }
    }
    if (!node) return no(`chưa có <${tag}> nào`);
    const need = spec.attrs ?? ["controls"];
    const problems = [];
    let got = 0;
    let want = need.length;
    for (const a of need) {
      const key = String(a).toLowerCase();
      const v = node.attrs[key];
      // Boolean attributes are satisfied by presence; valued ones need content.
      const boolAttr = key === "controls" || key === "autoplay" || key === "loop" || key === "muted";
      if (v !== undefined && (boolAttr || String(v).trim() !== "")) got++;
      else problems.push(`thiếu ${key}`);
    }
    if (spec.fallback) {
      want++;
      const hasSource = findAll(node, "source").length > 0;
      const hasText = String(node.textOwn ?? "").trim().length > 0;
      if (hasText || hasSource) got++;
      else problems.push("chưa có text dự phòng cho trình duyệt không hỗ trợ");
    }
    if (spec.src !== false) {
      want++;
      const direct = String(node.attrs.src ?? "").trim();
      const viaSource = findAll(node, "source").some((s) => String(s.attrs.src ?? "").trim());
      if (direct || viaSource) got++;
      else problems.push("chưa có src (hoặc <source src>)");
    }
    const e = ev(where.path, node.line, lineText(where.source, node.line));
    if (got === want) return ok(`<${tag}> đủ ${want} yêu cầu`, e);
    return part(got, want, `${where.path}: <${tag}> ${problems.join("; ")}`, e);
  },

  /* ===========================================================================
     Validity signals and documentation
     ======================================================================== */

  /**
   * No `id` is used twice on a page.
   *
   *   { type:"uniqueIds" }
   *
   * A duplicate `id` is a genuine W3C validator error and it breaks `label[for]`
   * and `href="#id"` in ways that look like magic: the browser silently uses the
   * first match. This is the part of session 12's "zero errors on W3C validator"
   * that can be checked offline and honestly.
   *
   * Cannot conclude: that the page validates. This finds one error class out of
   * hundreds, which is why session 12's validation rows stay tier `assist` with
   * the validator link in the report.
   */
  uniqueIds(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    let good = 0;
    let firstBad = null;
    for (const d of docs) {
      const seen = new Map();
      let dup = null;
      for (const n of allElements(d.doc)) {
        const id = String(n.attrs.id ?? "").trim();
        if (!id) continue;
        const key = id.toLowerCase();
        if (seen.has(key) && !dup) dup = { id, line: n.line, firstLine: seen.get(key) };
        else if (!seen.has(key)) seen.set(key, n.line);
      }
      if (!dup) { good++; continue; }
      if (!firstBad) {
        firstBad = { ...d, line: dup.line, why: `id="${dup.id}" dùng lại (đã có ở dòng ${dup.firstLine})` };
      }
    }
    if (good === docs.length) return ok(`không có id trùng lặp (${plural(docs.length, "file", "file")})`);
    return part(good, docs.length, `${firstBad.path}: ${firstBad.why}`,
      ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)));
  },

  /**
   * Styling lives in the stylesheet, not in `style=""` attributes or `<style>`
   * blocks.
   *
   *   { type:"noInlineStyle", maxCount:0 }
   *
   * Session 04 onwards teaches separation of concerns, and inline styles are what
   * a student falls back to when the external stylesheet is not loading — so a
   * page full of them usually means a broken `<link>` too.
   *
   * Cannot conclude: that the external CSS is well organised. Moving everything
   * into one 900-line unordered stylesheet also passes.
   */
  noInlineStyle(ctx, spec) {
    const { docs, missing } = htmlTargets(ctx, spec);
    if (!docs.length) return na(`chưa có file ${listPaths(missing.length ? missing : ["*.html"])}`, missing);
    const maxC = spec.maxCount ?? 0;
    let total = 0;
    let firstBad = null;
    let blocks = 0;
    for (const d of docs) {
      for (const n of allElements(d.doc)) {
        if (n.attrs.style !== undefined && String(n.attrs.style).trim()) {
          total++;
          if (!firstBad) firstBad = { path: d.path, line: n.line, source: d.source, why: `<${n.tag}> dùng style=""` };
        }
      }
      for (const s of findAll(d.doc, "style")) {
        blocks++;
        if (!firstBad) firstBad = { path: d.path, line: s.line, source: d.source, why: "<style> nằm trong HTML" };
      }
    }
    const n = total + blocks;
    if (n <= maxC) {
      return ok(maxC === 0 ? "CSS nằm hoàn toàn trong file .css" : `${n} chỗ style nội tuyến (cho phép ${maxC})`);
    }
    // Scored on a decreasing scale rather than pass/fail: two leftovers is not the
    // same mistake as forty.
    const score = Math.max(0, 1 - (n - maxC) / 10);
    return res(false, score, `${firstBad.path}: ${firstBad.why} (tổng ${n} chỗ)`,
      ev(firstBad.path, firstBad.line, lineText(firstBad.source, firstBad.line)));
  },

  /**
   * A text file exists and contains the sections a rubric names.
   *
   *   { type:"fileSections", file:"README.md",
   *     sections:[{ label:"Danh sách trang", any:["## Pages","## Trang"] }] }
   *
   * Used for the two non-HTML deliverables: session 11's `README.md` and session
   * 08's `midterm-review.md`. Each section is a label plus alternative spellings,
   * matched case-insensitively anywhere in the file, so a student writing "## Các
   * trang" instead of "## Pages" is not penalised for translating.
   *
   * `minWords` additionally requires the file to have real prose in it.
   *
   * Cannot conclude: that the README is accurate or that the reflection is honest.
   * It finds headings, not truth — both rubric rows keep a manual tier.
   */
  fileSections(ctx, spec) {
    const file = resolveFile(ctx, spec.file);
    if (!file) return na(`chưa có file ${norm(spec.file)}`, [norm(spec.file)]);
    const text = String(file.text ?? "");
    const hay = text.toLowerCase();
    const sections = spec.sections ?? [];
    const found = [];
    const gone = [];
    for (const s of sections) {
      const alts = s.any ?? [s.label];
      const hit = alts.find((a) => hay.includes(String(a).toLowerCase()));
      if (hit) found.push(s.label ?? hit);
      else gone.push(s.label ?? alts[0]);
    }
    let want = sections.length;
    let got = found.length;
    if (spec.minWords) {
      want++;
      const words = text.replace(/[#>*`_\-|]/g, " ").split(/\s+/).filter(Boolean).length;
      if (words >= spec.minWords) got++;
      else gone.push(`nội dung chỉ ${words} từ, cần ${spec.minWords}`);
    }
    if (want === 0) return ok(`đã có ${norm(file.path)}`);
    if (got === want) return ok(`${norm(file.path)}: đủ ${want} phần yêu cầu`);
    return part(got, want, `${norm(file.path)} thiếu: ${gone.join(", ")}`,
      ev(norm(file.path), 1, lineText(text, 1)));
  },
};

/** Escape a rubric string for use inside a RegExp. */
const escapeRx = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/* =============================================================================
   Dispatcher
   ============================================================================= */

/** Every check name a rubric may use. `qa-grader.mjs` validates against this. */
export const CHECK_TYPES = Object.freeze(Object.keys(CHECKS).sort());

/**
 * Run one rubric check and return a normalized result.
 *
 * The rubric JSON is authored by a teacher, not a student, but it is still data,
 * so an unknown `type` or a check that throws must never take the whole report
 * down with it. Both come back as NOT GRADABLE with the reason in `detail`:
 * a marker seeing "check `cssColour` không tồn tại" can fix the rubric, while a
 * blank page tells them nothing.
 *
 * `score01: null` is preserved exactly — grade.js drops those from the
 * denominator instead of scoring them zero.
 */
export function runCheck(ctx, spec) {
  const type = String(spec?.type ?? "");
  const fn = CHECKS[type];
  if (typeof fn !== "function") {
    return {
      type, pass: false, score01: null, notGradable: true, missingFiles: [],
      detail: `rubric dùng check không tồn tại: "${type}"`, evidence: null,
      weight: spec?.weight ?? 1,
    };
  }
  let out;
  try {
    out = fn(ctx, spec ?? {});
  } catch (err) {
    // A crash is a grader bug, never a student mistake. Say so, and say where.
    return {
      type, pass: false, score01: null, notGradable: true, missingFiles: [],
      detail: `lỗi khi chạy check ${type}: ${err?.message ?? err}`, evidence: null,
      weight: spec?.weight ?? 1,
    };
  }
  const score01 = out?.score01 === null || out?.score01 === undefined
    ? (out?.score01 === null ? null : (out?.pass ? 1 : 0))
    : Math.max(0, Math.min(1, Number(out.score01)));
  return {
    type,
    pass: score01 === 1,
    score01,
    detail: String(out?.detail ?? ""),
    evidence: out?.evidence ?? null,
    notGradable: out?.notGradable === true || score01 === null,
    missingFiles: out?.missingFiles ?? [],
    weight: spec?.weight ?? 1,
  };
}

/**
 * Declarations that satisfy `prop` through a shorthand the course teaches.
 *
 * Only the shorthands actually taught in sessions 04–07 and 09 are mapped. A
 * shorthand match is evidence the property was authored, not proof of the
 * computed value — `background: url(x)` sets no colour but does set `background`.
 */
const SHORTHAND = {
  "background-color": ["background"],
  "background-image": ["background"],
  "font-family": ["font"],
  "font-size": ["font"],
  "font-weight": ["font"],
  "line-height": ["font"],
  "margin-top": ["margin"], "margin-right": ["margin"],
  "margin-bottom": ["margin"], "margin-left": ["margin"],
  "padding-top": ["padding"], "padding-right": ["padding"],
  "padding-bottom": ["padding"], "padding-left": ["padding"],
  "border-width": ["border"], "border-style": ["border"], "border-color": ["border"],
  "list-style-type": ["list-style"],
  "flex-direction": ["flex-flow"],
};

function shorthandFor(sheet, selector, prop, loose) {
  const alts = SHORTHAND[prop] ?? [];
  const out = [];
  for (const alt of alts) {
    const decls = selector
      ? (loose ? declsMentioning(sheet, selector, alt) : declsFor(sheet, selector, alt))
      : allDecls(sheet).filter((d) => d.prop === alt);
    out.push(...decls);
  }
  return out;
}

/**
 * CSS comments with their 1-based line numbers.
 *
 * `parseCss` blanks comments out before parsing (so offsets and line numbers stay
 * true), which means the sheet object has no comment list to read. Scanning the
 * raw source here keeps that design and stays quote-aware, so a `/*` inside a
 * string value is not mistaken for a comment.
 */
function cssComments(src) {
  const s = String(src ?? "");
  const out = [];
  let line = 1;
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (ch === "\n") { line++; i++; continue; }
    if (ch === '"' || ch === "'") {
      const q = ch;
      i++;
      while (i < s.length && s[i] !== q) {
        if (s[i] === "\\") i++;
        else if (s[i] === "\n") line++;
        i++;
      }
      i++;
      continue;
    }
    if (ch === "/" && s[i + 1] === "*") {
      const end = s.indexOf("*/", i + 2);
      const stop = end === -1 ? s.length : end;
      const value = s.slice(i + 2, stop);
      out.push({ value, line });
      for (const c of s.slice(i, end === -1 ? s.length : end + 2)) if (c === "\n") line++;
      i = end === -1 ? s.length : end + 2;
      continue;
    }
    i++;
  }
  return out;
}

/**
 * Join a document's folder with a relative reference, resolving `.` and `..`.
 * Returns null when the reference climbs above the submission root — which is
 * itself a broken link, and a common one when a student copies `../` from a
 * tutorial.
 */
function resolvePath(dir, ref) {
  const r = norm(ref);
  if (!r) return null;
  const fromRoot = String(ref).startsWith("/");
  const parts = ((fromRoot || !dir) ? "" : dir + "/").concat(r).split("/");
  const out = [];
  for (const seg of parts) {
    if (!seg || seg === ".") continue;
    if (seg === "..") {
      if (!out.length) return null;
      out.pop();
      continue;
    }
    out.push(seg);
  }
  if (!out.length) return null;
  return out.join("/") + (r.endsWith("/") ? "/" : "");
}
