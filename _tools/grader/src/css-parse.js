/* =============================================================================
   INS2053 grader — minimal CSS parser. Zero dependencies.

     import { parseCss, normalizeColor } from "./css-parse.js";

   Same rule as html-parse.js: student CSS is DATA. It is never put into a
   <style> element, never assigned to `el.style`, never passed to
   CSSStyleSheet.replace(). It is split into rules and declarations, and that is
   all.

   Kept on purpose
   ---------------
   Brace imbalance is REPORTED, not repaired (`cssBalancedBraces`). A missing `}`
   is the single most common CSS bug of a beginner and the only thing that makes
   "why did nothing change" happen; a forgiving parser hides it.

   Colour comparison — the part that quietly mis-grades a whole class
   -----------------------------------------------------------------
   Session 04 grades "background color and text color are set". A student writes
   `white`, the rubric example says `#fff`, another writes `rgb(255 255 255)`.
   All three are the same colour. `normalizeColor` reduces every form the course
   teaches to `#rrggbb` (or `#rrggbbaa` when alpha < 1) so the comparison is on
   the colour, not on the spelling.

   What this file does NOT do
   --------------------------
   No cascade, no specificity, no inheritance, no computed values, no `calc()`
   evaluation, no custom-property substitution. `cssDeclEquals` answers "is this
   declaration written in this rule", never "is this the colour the pixel ends
   up". Two rules setting the same property both stay in the list; the grader
   reads them as evidence of authoring, not as a render result.
   ============================================================================= */

/* --- comments and lines --------------------------------------------------- */

/**
 * Replace every CSS comment with spaces of the same length.
 *
 * Same length matters: offsets stay valid, so reported line numbers still point
 * at the student's real line.
 */
export function stripCssComments(src) {
  const s = String(src ?? "");
  let out = "";
  let i = 0;
  while (i < s.length) {
    if (s[i] === "/" && s[i + 1] === "*") {
      const end = s.indexOf("*/", i + 2);
      const stop = end === -1 ? s.length : end + 2;
      for (let k = i; k < stop; k++) out += s[k] === "\n" ? "\n" : " ";
      i = stop;
      continue;
    }
    // A quoted string may contain a comment opener, e.g. content: "/*".
    if (s[i] === '"' || s[i] === "'") {
      const q = s[i];
      let j = i + 1;
      while (j < s.length && s[j] !== q) {
        if (s[j] === "\\") j++;
        j++;
      }
      out += s.slice(i, Math.min(j + 1, s.length));
      i = j + 1;
      continue;
    }
    out += s[i];
    i++;
  }
  return out;
}

/** 1-based line number of an offset. */
function lineCounter(src) {
  const starts = [0];
  for (let i = 0; i < src.length; i++) if (src[i] === "\n") starts.push(i + 1);
  return (offset) => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= offset) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };
}

/* --- colours -------------------------------------------------------------- */

/** The CSS2.1 names plus the ones these 15 sheets actually use. */
const NAMED_COLORS = {
  aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff",
  gray: "#808080", grey: "#808080", green: "#008000", lime: "#00ff00",
  maroon: "#800000", navy: "#000080", olive: "#808000", orange: "#ffa500",
  purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080",
  white: "#ffffff", yellow: "#ffff00", whitesmoke: "#f5f5f5",
  lightgray: "#d3d3d3", lightgrey: "#d3d3d3", darkgray: "#a9a9a9",
  darkgrey: "#a9a9a9", beige: "#f5f5dc", ivory: "#fffff0", pink: "#ffc0cb",
  gold: "#ffd700", indigo: "#4b0082", violet: "#ee82ee", tomato: "#ff6347",
  salmon: "#fa8072", crimson: "#dc143c", coral: "#ff7f50",
  turquoise: "#40e0d0", lavender: "#e6e6fa", khaki: "#f0e68c",
  steelblue: "#4682b4", skyblue: "#87ceeb", lightblue: "#add8e6",
  midnightblue: "#191970", forestgreen: "#228b22", seagreen: "#2e8b57",
  darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", dimgray: "#696969",
  dimgrey: "#696969", transparent: "#00000000",
};

const hex2 = (n) =>
  Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");

/**
 * Reduce a colour value to `#rrggbb`, or `#rrggbbaa` when alpha < 1.
 *
 * Accepts `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`, `rgb()`/`rgba()` with commas
 * or spaces, percentages, `hsl()`/`hsla()`, and the names above.
 *
 * Returns null for anything it does not understand — `currentColor`, `inherit`,
 * `var(--x)`, `lab()`. Null means "cannot compare", and every caller must treat
 * it as unknown rather than as a mismatch. Guessing here would mis-grade.
 */
export function normalizeColor(value) {
  if (value == null) return null;
  const v = String(value).trim().toLowerCase().replace(/\s*!important$/, "").trim();
  if (!v) return null;
  if (v in NAMED_COLORS) return NAMED_COLORS[v];

  let m = /^#([0-9a-f]{3,8})$/.exec(v);
  if (m) {
    const h = m[1];
    if (h.length === 3) return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
    if (h.length === 4) {
      const a = h[3] + h[3];
      const base = `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
      return a === "ff" ? base : base + a;
    }
    if (h.length === 6) return `#${h}`;
    if (h.length === 8) return h.slice(6) === "ff" ? `#${h.slice(0, 6)}` : `#${h}`;
    return null;
  }

  m = /^rgba?\(([^)]*)\)$/.exec(v);
  if (m) {
    const parts = m[1].split(/[,/\s]+/).map((p) => p.trim()).filter(Boolean);
    if (parts.length < 3) return null;
    const chan = parts.slice(0, 3).map((p) =>
      p.endsWith("%") ? (parseFloat(p) / 100) * 255 : parseFloat(p));
    if (chan.some((c) => Number.isNaN(c))) return null;
    const base = "#" + chan.map(hex2).join("");
    if (parts.length >= 4) {
      const raw = parts[3];
      const a = raw.endsWith("%") ? parseFloat(raw) / 100 : parseFloat(raw);
      if (!Number.isNaN(a) && a < 1) return base + hex2(a * 255);
    }
    return base;
  }

  m = /^hsla?\(([^)]*)\)$/.exec(v);
  if (m) {
    const parts = m[1].split(/[,/\s]+/).map((p) => p.trim()).filter(Boolean);
    if (parts.length < 3) return null;
    let h = parseFloat(parts[0]);
    if (/rad$/.test(parts[0])) h = (parseFloat(parts[0]) * 180) / Math.PI;
    if (/turn$/.test(parts[0])) h = parseFloat(parts[0]) * 360;
    const s = parseFloat(parts[1]) / 100;
    const l = parseFloat(parts[2]) / 100;
    if ([h, s, l].some((n) => Number.isNaN(n))) return null;
    const hh = (((h % 360) + 360) % 360) / 360;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const conv = (t) => {
      let x = t;
      if (x < 0) x += 1;
      if (x > 1) x -= 1;
      if (x < 1 / 6) return p + (q - p) * 6 * x;
      if (x < 1 / 2) return q;
      if (x < 2 / 3) return p + (q - p) * (2 / 3 - x) * 6;
      return p;
    };
    const rgb = s === 0 ? [l, l, l] : [conv(hh + 1 / 3), conv(hh), conv(hh - 1 / 3)];
    const base = "#" + rgb.map((c) => hex2(c * 255)).join("");
    if (parts.length >= 4) {
      const raw = parts[3];
      const a = raw.endsWith("%") ? parseFloat(raw) / 100 : parseFloat(raw);
      if (!Number.isNaN(a) && a < 1) return base + hex2(a * 255);
    }
    return base;
  }
  return null;
}

/** True when two colour values denote the same colour. Unknowns never match. */
export function sameColor(a, b) {
  const na = normalizeColor(a);
  const nb = normalizeColor(b);
  return na !== null && nb !== null && na === nb;
}

/* --- values --------------------------------------------------------------- */

/**
 * Normalize a declaration value for comparison.
 *
 * Collapses whitespace, drops `!important`, lower-cases, removes the space after
 * commas, and trims a trailing `;`. `1.60` and `1.6` both become `1.6`, because
 * a rubric asking for line-height 1.6 must not fail on trailing zeros.
 *
 * It does NOT resolve units: `16px` and `1rem` stay different, and they are
 * different — `cssDeclEquals` compares what was written.
 */
export function normalizeValue(value) {
  let v = String(value ?? "").trim().replace(/\s*!important\s*$/i, "").replace(/;+$/, "").trim();
  v = v.replace(/\s+/g, " ").replace(/\s*,\s*/g, ",").toLowerCase();
  v = v.replace(/(^|[\s,(])(\d*\.\d*?)0+(?=$|[\s,)])/g, "$1$2");
  v = v.replace(/(^|[\s,(])(\d+)\.(?=$|[\s,)])/g, "$1$2");
  return v;
}

/** `H1 , .Card > P` -> `h1,.Card>p`: tags lower-cased, class names kept. */
export function normalizeSelector(sel) {
  return String(sel ?? "")
    .replace(/\s+/g, " ")
    .replace(/\s*([>+~,])\s*/g, "$1")
    .trim()
    .split(",")
    .map((part) =>
      part
        .trim()
        // Lower-case only bare element names, never class/id/attribute text.
        .replace(/(^|[\s>+~(])([a-zA-Z][a-zA-Z0-9-]*)/g,
          (m, pre, name) => pre + name.toLowerCase()))
    .filter(Boolean)
    .sort()
    .join(",");
}

/** Individual comma-separated selectors of a rule, each normalized. */
export function selectorParts(sel) {
  return String(sel ?? "").split(",").map((p) => normalizeSelector(p)).filter(Boolean);
}

/* --- parser --------------------------------------------------------------- */

/**
 * Parse a stylesheet into a flat rule list plus at-rule blocks.
 *
 * Returns:
 *   {
 *     rules:   [{ selector, selectors[], decls[{prop,value,line}], line, media }],
 *     atRules: [{ name, params, line, rules[], decls? }],
 *     braces:  { open, close, balanced, extraCloseLine },
 *     source, lineOf
 *   }
 *
 * Rules nested in `@media` appear in BOTH `rules` (carrying `media`) and inside
 * the matching `atRules[].rules`. `cssRuleExists` therefore finds a selector no
 * matter where the student put it, while `mediaQueryExists` can still count what
 * is specifically inside the media block.
 */
export function parseCss(src) {
  const raw = String(src ?? "");
  const s = stripCssComments(raw);
  const lineOf = lineCounter(raw);
  const rules = [];
  const atRules = [];
  let open = 0;
  let close = 0;
  let extraCloseLine = null;

  /** Split a declaration block on `;`, ignoring `;` inside quotes or parens. */
  const splitDecls = (text, offset) => {
    const out = [];
    let buf = "";
    let depth = 0;
    let quote = null;
    let start = offset;
    const flush = (at) => {
      const t = buf.trim();
      buf = "";
      if (!t) { start = at; return; }
      const colon = t.indexOf(":");
      if (colon <= 0) {
        out.push({ prop: "", value: "", raw: t, line: lineOf(start), malformed: true });
      } else {
        out.push({
          prop: t.slice(0, colon).trim().toLowerCase(),
          value: t.slice(colon + 1).trim(),
          raw: t,
          line: lineOf(start),
          important: /!important\s*$/i.test(t),
        });
      }
      start = at;
    };
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (quote) {
        buf += ch;
        if (ch === quote) quote = null;
        else if (ch === "\\") buf += text[++i] ?? "";
        continue;
      }
      if (ch === '"' || ch === "'") { quote = ch; buf += ch; continue; }
      if (ch === "(") depth++;
      if (ch === ")") depth = Math.max(0, depth - 1);
      if (ch === ";" && depth === 0) { flush(offset + i + 1); continue; }
      if (!buf.trim() && /\s/.test(ch)) { start = offset + i + 1; continue; }
      buf += ch;
    }
    flush(offset + text.length);
    return out;
  };

  /** Walk one nesting level. `media` is the enclosing @media params, or null. */
  const walk = (from, to, media, sink) => {
    let i = from;
    let prelude = "";
    let preludeStart = i;
    while (i < to) {
      const ch = s[i];
      if (ch === "{") {
        open++;
        const head = prelude.trim();
        const headLine = lineOf(preludeStart);
        let depth = 1;
        let j = i + 1;
        let quote = null;
        while (j < to && depth > 0) {
          const c = s[j];
          if (quote) { if (c === quote) quote = null; else if (c === "\\") j++; }
          else if (c === '"' || c === "'") quote = c;
          else if (c === "{") depth++;
          else if (c === "}") depth--;
          j++;
        }
        const bodyEnd = depth === 0 ? j - 1 : to;
        if (depth === 0) close++;
        const body = s.slice(i + 1, bodyEnd);

        if (head.startsWith("@")) {
          const m = /^@([a-zA-Z-]+)\s*([\s\S]*)$/.exec(head) || [, head.slice(1), ""];
          const at = {
            name: String(m[1]).toLowerCase(), params: String(m[2]).trim(),
            line: headLine, rules: [],
          };
          atRules.push(at);
          const nestedMedia = at.name === "media" ? at.params : media;
          // @font-face and friends hold declarations, not nested rules.
          if (/\{/.test(body)) walk(i + 1, bodyEnd, nestedMedia, at.rules);
          else at.decls = splitDecls(body, i + 1);
        } else if (head) {
          const rule = {
            selector: head,
            selectors: selectorParts(head),
            decls: splitDecls(body, i + 1),
            line: headLine,
            media: media ?? null,
          };
          rules.push(rule);
          if (sink) sink.push(rule);
        }
        prelude = "";
        i = depth === 0 ? j : to;
        preludeStart = i;
        continue;
      }
      if (ch === "}") {
        // A `}` with nothing open: one block too many was closed.
        close++;
        if (extraCloseLine === null) extraCloseLine = lineOf(i);
        prelude = "";
        i++;
        preludeStart = i;
        continue;
      }
      if (ch === ";") {
        // Statement at rule level: `@import`, `@charset`, or a stray semicolon.
        prelude = "";
        i++;
        preludeStart = i;
        continue;
      }
      if (!prelude && /\s/.test(ch)) { i++; preludeStart = i; continue; }
      prelude += ch;
      i++;
    }
  };

  walk(0, s.length, null, null);

  return {
    rules,
    atRules,
    braces: {
      open, close,
      balanced: open === close && extraCloseLine === null,
      extraCloseLine,
    },
    source: raw,
    lineOf,
  };
}

/* --- queries -------------------------------------------------------------- */

/** Rules whose selector list contains `selector` (order-insensitive match). */
export function rulesFor(sheet, selector) {
  const want = normalizeSelector(selector);
  return (sheet.rules ?? []).filter((r) => r.selectors.includes(want));
}

/**
 * Rules whose selector list contains any selector *mentioning* `simple`.
 *
 * Looser than `rulesFor`: `h1` matches `header h1` and `.card > h1`. Used where
 * a rubric says "style h1" without dictating the selector — students legitimately
 * write `header h1`. Word boundaries are respected so `nav` does not match
 * `.navbar`.
 */
export function rulesMentioning(sheet, simple) {
  const token = String(simple ?? "").trim().toLowerCase();
  if (!token) return [];
  const esc = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    /^[.#]/.test(token) ? `(^|[\\s>+~,(])${esc}(?![\\w-])` : `(^|[\\s>+~,(])${esc}(?![\\w-])`,
    "i",
  );
  return (sheet.rules ?? []).filter((r) =>
    r.selectors.some((sel) => re.test("," + sel) || re.test(" " + sel)));
}

/**
 * Declarations of `prop` under `selector`, last written first.
 *
 * Last-first is a deliberate approximation of the cascade for equal specificity:
 * when a student writes `color: red` then `color: blue` in the same rule, blue
 * is what shows. It is NOT the real cascade — no specificity, no media
 * evaluation, no inheritance.
 */
export function declsFor(sheet, selector, prop) {
  const p = String(prop).toLowerCase();
  const out = [];
  for (const r of rulesFor(sheet, selector)) {
    for (const d of r.decls) {
      if (d.prop === p) out.push({ ...d, selector: r.selector, media: r.media });
    }
  }
  return out.reverse();
}

/** Declarations of `prop` in any rule mentioning `simple`. Last written first. */
export function declsMentioning(sheet, simple, prop) {
  const p = String(prop).toLowerCase();
  const out = [];
  for (const r of rulesMentioning(sheet, simple)) {
    for (const d of r.decls) {
      if (d.prop === p) out.push({ ...d, selector: r.selector, media: r.media });
    }
  }
  return out.reverse();
}

/** Every declaration in the sheet, media blocks included. */
export function allDecls(sheet) {
  const out = [];
  for (const r of sheet.rules ?? []) {
    for (const d of r.decls) out.push({ ...d, selector: r.selector, media: r.media });
  }
  for (const a of sheet.atRules ?? []) {
    for (const d of a.decls ?? []) out.push({ ...d, selector: `@${a.name}`, media: null });
  }
  return out;
}

/** `@media` at-rules only. */
export function mediaBlocks(sheet) {
  return (sheet.atRules ?? []).filter((a) => a.name === "media");
}

/** Every `max-width: NNN` breakpoint named by an `@media` prelude. */
export function mediaMaxWidths(sheet) {
  const out = [];
  for (const a of mediaBlocks(sheet)) {
    for (const m of a.params.matchAll(/max-width\s*:\s*(\d+(?:\.\d+)?)\s*(px|em|rem)?/gi)) {
      out.push({ value: parseFloat(m[1]), unit: (m[2] || "px").toLowerCase(), block: a });
    }
  }
  return out;
}

/** Declaration count inside an at-rule block, nested rules included. */
export function declCount(atRule) {
  let n = (atRule.decls ?? []).length;
  for (const r of atRule.rules ?? []) n += r.decls.length;
  return n;
}

/** Distinct selectors touched inside an at-rule block. */
export function selectorsInside(atRule) {
  return [...new Set((atRule.rules ?? []).flatMap((r) => r.selectors))];
}
