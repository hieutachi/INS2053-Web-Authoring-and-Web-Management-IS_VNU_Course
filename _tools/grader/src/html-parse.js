/* =============================================================================
   INS2053 grader — minimal HTML tokenizer + tree builder. Zero dependencies.

     import { parseHtml } from "./html-parse.js";

   Why hand-written instead of DOMParser
   -------------------------------------
   Principle 1 of _archive/ins2053_part9_autograding.md §9.1.2: student work is
   DATA, never code. DOMParser would hand the string to the browser's real HTML
   parser; the resulting nodes are one `appendChild` away from being live, and a
   `<img onerror>` in a student file becomes a live handler the moment anybody
   inserts it. So the string is tokenized here and never becomes a node.

   A second reason: the browser parser SILENTLY REPAIRS broken markup. It closes
   `<p>` for you, moves stray `<td>` out of `<body>`, and invents `<tbody>`.
   Homework 1 grades "all tags closed and properly nested" — a repairing parser
   can never see that mistake. This one keeps the mistakes.

   Deliberately strict, and this is a grading decision, not an oversight:
   HTML5 permits omitting `</p>`, `</li>`, `</td>` and friends. The rubric of
   session 01 does not ("Every opening tag has a closing tag"), and the taught
   habit is to close everything. So an unclosed `<p>` is reported. `tagsBalanced`
   in checks.js is what turns that report into a score, and it is the place to
   soften the rule if a cohort needs it.

   What this file does NOT do
   --------------------------
   No CSS matching, no layout, no rendering, no character-reference decoding
   beyond the five named entities, no conformance checking against the HTML
   spec. It cannot tell you whether a page LOOKS right, only what tags it holds.
   ============================================================================= */

/** Elements with no end tag. An unclosed `<img>` is correct HTML, not an error. */
export const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

/** Their content is text, not markup: `if (a < b)` inside <script> is not a tag. */
const RAW_TEXT = new Set(["script", "style", "textarea", "title"]);

/** Only these five are decoded. Enough for grading text, and nothing executable. */
const ENTITIES = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
  "&#39;": "'", "&apos;": "'", "&nbsp;": " ",
};

/** Decode the handful of entities a beginner page actually contains. */
export function decodeText(s) {
  return String(s ?? "").replace(
    /&(?:amp|lt|gt|quot|apos|nbsp|#39);/g,
    (m) => ENTITIES[m] ?? m,
  );
}

/** 1-based line number of a character offset. Every finding carries one. */
function lineIndex(src) {
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

/**
 * One short, single-line excerpt for the evidence row on the result card.
 *
 * Never returned raw to the DOM — ui.js escapes it. This only trims length so a
 * 4 KB minified line cannot blow up the card.
 */
export function excerpt(src, line, max = 90) {
  const lines = String(src ?? "").split(/\r?\n/);
  const text = (lines[line - 1] ?? "").trim();
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

/* --- tokenizer ------------------------------------------------------------ */

/**
 * Split source into tokens: doctype, comment, start tag, end tag, text.
 *
 * Single left-to-right pass, no backtracking, so a pathological file cannot make
 * this run quadratically. A `<` that starts nothing recognizable is treated as
 * literal text, which is what browsers do and what a beginner usually meant.
 */
export function tokenizeHtml(src) {
  const s = String(src ?? "");
  const lineOf = lineIndex(s);
  const tokens = [];
  let i = 0;

  while (i < s.length) {
    const lt = s.indexOf("<", i);
    if (lt === -1) {
      if (i < s.length) tokens.push({ kind: "text", value: s.slice(i), start: i, line: lineOf(i) });
      break;
    }
    if (lt > i) tokens.push({ kind: "text", value: s.slice(i, lt), start: i, line: lineOf(i) });

    // <!-- comment -->
    if (s.startsWith("<!--", lt)) {
      const end = s.indexOf("-->", lt + 4);
      const stop = end === -1 ? s.length : end + 3;
      tokens.push({
        kind: "comment",
        value: s.slice(lt + 4, end === -1 ? s.length : end),
        start: lt, line: lineOf(lt), unterminated: end === -1,
      });
      i = stop;
      continue;
    }

    // <!DOCTYPE html>
    if (/^<!doctype/i.test(s.slice(lt, lt + 9))) {
      const end = s.indexOf(">", lt);
      const stop = end === -1 ? s.length : end + 1;
      tokens.push({
        kind: "doctype",
        value: s.slice(lt, stop),
        start: lt, line: lineOf(lt),
      });
      i = stop;
      continue;
    }

    // </tag>
    if (s.startsWith("</", lt)) {
      const end = s.indexOf(">", lt);
      if (end === -1) {
        tokens.push({ kind: "text", value: s.slice(lt), start: lt, line: lineOf(lt) });
        break;
      }
      const name = s.slice(lt + 2, end).trim().toLowerCase();
      tokens.push({ kind: "end", name, start: lt, line: lineOf(lt) });
      i = end + 1;
      continue;
    }

    // <tag ...>
    const nameMatch = /^<([a-zA-Z][a-zA-Z0-9:-]*)/.exec(s.slice(lt, lt + 40));
    if (!nameMatch) {
      // A literal `<` in prose, e.g. "3 < 5". Text, not a tag.
      tokens.push({ kind: "text", value: "<", start: lt, line: lineOf(lt) });
      i = lt + 1;
      continue;
    }
    const name = nameMatch[1].toLowerCase();

    // Find the closing `>`, skipping quoted attribute values so that
    // `alt="a > b"` does not end the tag early.
    let j = lt + 1 + name.length;
    let quote = null;
    while (j < s.length) {
      const ch = s[j];
      if (quote) {
        if (ch === quote) quote = null;
      } else if (ch === '"' || ch === "'") {
        quote = ch;
      } else if (ch === ">") {
        break;
      }
      j++;
    }
    const unterminated = j >= s.length;
    const inner = s.slice(lt + 1 + name.length, unterminated ? s.length : j);
    const selfClosing = /\/\s*$/.test(inner);
    const { attrs, order } = parseAttrs(selfClosing ? inner.replace(/\/\s*$/, "") : inner);
    tokens.push({
      kind: "start", name, attrs, attrOrder: order,
      selfClosing, void: VOID_ELEMENTS.has(name),
      raw: s.slice(lt, unterminated ? s.length : j + 1),
      start: lt, line: lineOf(lt), unterminated,
    });
    i = unterminated ? s.length : j + 1;

    // Raw-text elements: consume to the matching end tag as one text token, so
    // `p { content: "<b>" }` inside <style> is never read as markup.
    if (RAW_TEXT.has(name) && !selfClosing && !unterminated) {
      const closeRe = new RegExp(`</${name}\\s*>`, "i");
      const rest = s.slice(i);
      const m = closeRe.exec(rest);
      const textEnd = m ? i + m.index : s.length;
      if (textEnd > i) {
        tokens.push({ kind: "text", value: s.slice(i, textEnd), start: i, line: lineOf(i), rawText: name });
      }
      if (m) {
        tokens.push({ kind: "end", name, start: textEnd, line: lineOf(textEnd) });
        i = textEnd + m[0].length;
      } else {
        i = s.length;
      }
    }
  }
  return { tokens, lineOf };
}


/* --- attributes ----------------------------------------------------------- */

/**
 * Parse the inside of a start tag.
 *
 * Handles `a="1"`, `a='1'`, `a=1` and bare `a`. Names are lower-cased because
 * HTML attribute names are case-insensitive; values are NOT, since `href`,
 * `alt` and class names are case-sensitive to the student's intent.
 *
 * A bare attribute gets the value "" — so `attrNotEmpty` must distinguish
 * "absent" (undefined) from "present but empty" ("").
 */
function parseAttrs(text) {
  const attrs = {};
  const order = [];
  const re = /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'`=<>]+)))?/g;
  let m;
  while ((m = re.exec(text))) {
    const name = m[1].toLowerCase();
    if (name in attrs) continue; // first wins, like every browser
    const value = m[2] ?? m[3] ?? m[4] ?? "";
    attrs[name] = value;
    order.push(name);
  }
  return { attrs, order };
}

/* --- tree ----------------------------------------------------------------- */

/**
 * Build a tree of plain objects from the token stream, and record every
 * mismatch found on the way.
 *
 * Node shape (plain data, never a DOM node):
 *   { tag, attrs, children, line, parent, textOwn, text }
 *
 * Mismatch shape:
 *   { type: "unclosed" | "stray-close" | "misnested" | "unterminated-tag"
 *           | "unterminated-comment",
 *     tag, line, expected? }
 *
 * The stack is NOT auto-closed on implied end tags. `<p>a<p>b` therefore yields
 * one nested `<p>` and one "unclosed" mismatch — which is the mistake the
 * session 01 rubric asks about. A browser would silently produce two siblings.
 */
export function parseHtml(src) {
  const { tokens, lineOf } = tokenizeHtml(src);
  const root = { tag: "#root", attrs: {}, children: [], line: 1, parent: null, textOwn: "" };
  const stack = [root];
  const mismatches = [];
  const doctype = tokens.find((t) => t.kind === "doctype") || null;
  const comments = tokens.filter((t) => t.kind === "comment");

  for (const t of tokens) {
    const top = stack[stack.length - 1];
    if (t.kind === "text") {
      top.textOwn += t.value;
      continue;
    }
    if (t.kind === "comment") {
      if (t.unterminated) mismatches.push({ type: "unterminated-comment", tag: null, line: t.line });
      continue;
    }
    if (t.kind === "start") {
      if (t.unterminated) mismatches.push({ type: "unterminated-tag", tag: t.name, line: t.line });
      const node = {
        tag: t.name, attrs: t.attrs, attrOrder: t.attrOrder,
        children: [], line: t.line, parent: top, textOwn: "",
        selfClosed: t.selfClosing || t.void, raw: t.raw,
      };
      top.children.push(node);
      if (!t.void && !t.selfClosing && !t.unterminated) stack.push(node);
      continue;
    }
    if (t.kind === "end") {
      if (VOID_ELEMENTS.has(t.name)) continue; // `</br>` — harmless, ignore
      // Nearest matching open element, searched from the top.
      let found = -1;
      for (let k = stack.length - 1; k >= 1; k--) {
        if (stack[k].tag === t.name) { found = k; break; }
      }
      if (found === -1) {
        mismatches.push({ type: "stray-close", tag: t.name, line: t.line });
        continue;
      }
      // Everything above `found` was left open — that is the misnesting.
      for (let k = stack.length - 1; k > found; k--) {
        mismatches.push({
          type: "misnested", tag: stack[k].tag, line: stack[k].line, expected: t.name,
        });
      }
      stack[found].closedLine = t.line;
      stack.length = found;
    }
  }

  for (let k = stack.length - 1; k >= 1; k--) {
    mismatches.push({ type: "unclosed", tag: stack[k].tag, line: stack[k].line });
  }

  // Concatenated descendant text, computed once, bottom-up.
  const fill = (node) => {
    let text = node.textOwn;
    for (const c of node.children) {
      fill(c);
      // Skip <script>/<style> bodies: they are not page content and would
      // wreck any word count.
      if (c.tag !== "script" && c.tag !== "style") text += " " + c.text;
    }
    node.text = decodeText(text).replace(/\s+/g, " ").trim();
  };
  fill(root);

  return { root, tokens, mismatches, doctype, comments, lineOf, source: String(src ?? "") };
}

/* --- queries -------------------------------------------------------------- */

/** Every element node, document order, root excluded. */
export function allElements(doc) {
  const out = [];
  const walk = (n) => {
    for (const c of n.children) { out.push(c); walk(c); }
  };
  walk(doc.root ?? doc);
  return out;
}

/** Elements with the given tag name, document order. */
export function findAll(doc, tag) {
  const want = String(tag).toLowerCase();
  return allElements(doc).filter((n) => n.tag === want);
}

/** First element with the given tag name, or null. */
export function findFirst(doc, tag) {
  return findAll(doc, tag)[0] ?? null;
}

/** Chain of ancestor tag names, nearest first. Used by tagsNested. */
export function ancestors(node) {
  const out = [];
  let p = node.parent;
  while (p && p.tag !== "#root") { out.push(p.tag); p = p.parent; }
  return out;
}

/** Words in an element's text, entities decoded, whitespace collapsed. */
export function wordCount(node) {
  const t = (node?.text ?? "").trim();
  return t ? t.split(/\s+/).length : 0;
}

/** class="a  b" -> ["a","b"]. */
export function classList(node) {
  return String(node?.attrs?.class ?? "").trim().split(/\s+/).filter(Boolean);
}
