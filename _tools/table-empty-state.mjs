/* =============================================================================
   table-empty-state.mjs — the course site's shared "no rows" table state.

   Exported so build-site.mjs can apply it to every markdown-rendered table
   and _tools/test-table-empty.js can test it in isolation, the same way
   strip-literals.js is tested. Two twins render the same design elsewhere:
   site-assets/site.js repeats this markup for tables that appear after the
   build, and the <Table> component (canvas-runtime/canvas.jsx, class
   c-table-empty) covers the slide decks. Keep the strings in sync — they are
   the one piece of copy all three surfaces share.

   Every scan below is nesting-aware on purpose: chapter 09 teaches HTML
   tables and ships real <table> elements as examples, some of them nested.
   A naive match up to the first </table> would slice those examples in half,
   so each tag kind is matched with a depth counter instead.
   ============================================================================= */

export const EMPTY_TITLE = "No rows to display";
export const EMPTY_TEXT = "This table is empty.";

/* Same grid icon the deck and grader empty states use. */
const ICON =
  '<svg class="table-empty-icon" viewBox="0 0 24 24" width="28" height="28" fill="none" ' +
  'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ' +
  'aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"></rect>' +
  '<path d="M3 9h18"></path><path d="M3 14h18"></path><path d="M9 9v11"></path></svg>';

/** One full-width row carrying the dashed panel. `cols` becomes the colspan. */
export function emptyRowHtml(cols, title = EMPTY_TITLE, text = EMPTY_TEXT) {
  const span = Math.max(1, Number(cols) || 1);
  return (
    '<tr class="table-empty-row"><td class="table-empty-cell" colspan="' + span + '">' +
    '<div class="table-empty">' + ICON +
    '<span class="table-empty-title">' + title + "</span> " +
    '<span class="table-empty-text">' + text + "</span>" +
    "</div></td></tr>"
  );
}

/**
 * How wide the panel must span: the summed colspan of the first header row's
 * cells, falling back to the first data row's cell count, then 1. Rowspan is
 * ignored — prose tables never use it, and if one ever does, spanning wide
 * reads better than a collapsed panel. Only called for tables that turned out
 * hollow, and a hollow table never contains another table, so the first
 * thead/row found always belongs to the table being measured.
 */
export function columnCount(tableInner) {
  const headRow = tableInner.match(/<thead\b[^>]*>[\s\S]*?<tr\b[^>]*>([\s\S]*?)<\/tr>/i);
  if (headRow) {
    let n = 0;
    for (const cell of headRow[1].matchAll(/<th\b[^>]*>/gi)) {
      const cs = cell[0].match(/colspan\s*=\s*"?(\d+)/i);
      n += cs ? Math.max(1, parseInt(cs[1], 10)) : 1;
    }
    if (n) return n;
  }
  const anyRow = tableInner.match(/<tr\b[^>]*>([\s\S]*?)<\/tr>/i);
  if (anyRow) {
    const cells = (anyRow[1].match(/<(?:td|th)\b/gi) || []).length;
    if (cells) return cells;
  }
  return 1;
}

/**
 * Walk every top-level occurrence of `<tag>` in `html`, depth-counting past
 * same-tag nesting, and rebuild the string with each segment's inner HTML
 * passed through `map`. A segment whose closing tag never comes is copied
 * through untouched: a broken example in a chapter is not the place to
 * start guessing.
 */
function mapTagSegments(html, tag, map) {
  const open = new RegExp(`<${tag}\\b(?=[\\s>])`, "gi");
  const close = new RegExp(`</${tag}\\s*>`, "gi");
  let out = "";
  let pos = 0;
  for (;;) {
    open.lastIndex = pos;
    const start = open.exec(html);
    if (!start) {
      out += html.slice(pos);
      return out;
    }
    let depth = 1;
    let i = start.index + start[0].length;
    let endTag = null;
    while (i < html.length) {
      open.lastIndex = i;
      close.lastIndex = i;
      const nextOpen = open.exec(html);
      const nextClose = close.exec(html);
      if (!nextClose) break;
      if (nextOpen && nextOpen.index < nextClose.index) {
        depth += 1;
        i = nextOpen.index + nextOpen[0].length;
      } else {
        depth -= 1;
        if (depth === 0) {
          endTag = nextClose;
          break;
        }
        i = nextClose.index + nextClose[0].length;
      }
    }
    if (!endTag) {
      out += html.slice(pos);
      return out;
    }
    const inner = html.slice(start.index + start[0].length, endTag.index);
    out += html.slice(pos, start.index) + start[0] + map(inner) + endTag[0];
    pos = endTag.index + endTag[0].length;
  }
}

/** Fill the hollow halves of one table's inner HTML. Nested tables are
    decorated first, bottom-up; a table that already carries a data row comes
    back byte-identical, which is also what makes the whole transform
    idempotent and lets site.js run after the build without double-injecting.
    (A hollow table can never contain another table — reaching a nested table
    requires a row and a cell — so decorating nested tables first can never
    mask a hollow outer one.) */
function decorateTableInner(inner) {
  const recursed = mapTagSegments(inner, "table", decorateTableInner);
  if (/<tbody\b/i.test(recursed)) {
    return mapTagSegments(recursed, "tbody", (body) =>
      /<tr\b/i.test(body) ? body : emptyRowHtml(columnCount(inner))
    );
  }
  // No tbody element at all: count the rows that sit outside the header.
  const outsideHead = recursed.replace(/<thead\b[\s\S]*?<\/thead>/gi, "");
  if (/<tr\b/i.test(outsideHead)) return recursed;
  return recursed + `<tbody>${emptyRowHtml(columnCount(inner))}</tbody>`;
}

/** Give every hollow <table> in a fragment of generated HTML the shared
    empty state, leaving everything else untouched. */
export function injectTableEmptyStates(html) {
  return mapTagSegments(html, "table", decorateTableInner);
}
