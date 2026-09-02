/* Verify every "> 🖼 **Diagram(s):**" line in the ebook resolves to a real
   deck, a real diagram function, a slide id that exists, and a mount site.

     node _tools/check-diagram-links.js <root>

   Exits non-zero on the first class of failure so it can gate a batch. */
const fs = require("fs");
const path = require("path");

const root = process.argv[2] || ".";
const ebook = path.join(root, "ebook");
const canvases = path.join(root, "canvases");

const decks = new Map();
function deckSource(deck) {
  if (!decks.has(deck)) {
    const p = path.join(canvases, `${deck}.canvas.tsx`);
    decks.set(deck, fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);
  }
  return decks.get(deck);
}

const REF = /`([A-Z][\w$]*)` — slide `([^`]+)`/g;
let checked = 0;
let bad = 0;

for (const file of fs.readdirSync(ebook).filter((f) => f.endsWith(".md")).sort()) {
  const lines = fs.readFileSync(path.join(ebook, file), "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    if (!/^> .* \*\*Diagram/.test(line)) return;
    const deck = (line.match(/canvases\/(buoi-\d\d)\.canvas\.tsx/) || [])[1];
    const src = deck && deckSource(deck);
    if (!src) {
      console.log(`BAD  ${file}:${i + 1}  deck not found: ${deck}`);
      bad++;
      return;
    }
    let m;
    REF.lastIndex = 0;
    let found = 0;
    while ((m = REF.exec(line))) {
      const [, fn, id] = m;
      found++;
      checked++;
      const defined = new RegExp(`^function\\s+${fn}\\b`, "m").test(src);
      const mounted = new RegExp(`<${fn}\\b`).test(src);
      const slide = src.includes(`id="${id}"`);
      if (defined && mounted && slide) return;
      console.log(
        `BAD  ${file}:${i + 1}  ${fn}: defined=${defined} mounted=${mounted} ` +
          `slide "${id}"=${slide}`
      );
      bad++;
    }
    if (found === 0) {
      console.log(`BAD  ${file}:${i + 1}  no parsable reference on the line`);
      bad++;
    }
  });
}

console.log(`\nchecked ${checked} reference(s) across ${decks.size} deck(s)`);
console.log(bad ? `${bad} PROBLEM(S)` : "all diagram cross-links resolve");
process.exit(bad ? 1 : 0);
