// Single-line exact-match replacement across many files.
// Spec format (UTF-8): repeating blocks of
//   @@ <relative-file>
//   - <exact source line, leading/trailing whitespace preserved after the "- ">
//   + <replacement line>          (repeat "+" to expand one line into several)
// A "-" line that does not appear exactly once in its file is a hard failure.
const fs = require("fs"), path = require("path");
const [spec, root] = process.argv.slice(2);
const lines = fs.readFileSync(spec, "utf8").split(/\r?\n/);
let file = null, edits = [], cur = null, fail = 0, done = 0;
const flush = () => { if (cur) { edits.push(cur); cur = null; } };
for (const L of lines) {
  if (L.startsWith("@@ ")) { flush(); file = L.slice(3).trim(); }
  else if (L.startsWith("- ")) { flush(); cur = { file, old: L.slice(2), neu: [] }; }
  else if (L.startsWith("+ ") && cur) cur.neu.push(L.slice(2));
}
flush();
// A "-" with no "+" after it would silently delete a line, which is far too easy
// to trigger by writing a multi-line block. Deletion must be spelled out.
for (const e of edits) {
  if (e.neu.length === 0) {
    console.log(`REFUSE  ${e.file}  no "+" line follows :: ${e.old.trim().slice(0, 70)}`);
    console.log('        (to delete a line on purpose, give it a single "+ @@DELETE" replacement)');
    process.exit(2);
  }
  if (e.neu.length === 1 && e.neu[0].trim() === "@@DELETE") e.neu = [];
}
const byFile = {};
for (const e of edits) (byFile[e.file] = byFile[e.file] || []).push(e);
for (const f of Object.keys(byFile)) {
  const p = path.join(root, f);
  let src = fs.readFileSync(p, "utf8").split(/\r?\n/);
  for (const e of byFile[f]) {
    const hits = src.reduce((a, l, i) => (l === e.old ? a.concat(i) : a), []);
    if (hits.length !== 1) { console.log(`FAIL ${f}  count=${hits.length}  :: ${e.old.trim().slice(0, 70)}`); fail++; continue; }
    src.splice(hits[0], 1, ...e.neu);
    done++;
  }
  fs.writeFileSync(p, src.join("\n"));
  console.log(`wrote ${f}`);
}
console.log(fail ? `\n${fail} FAILED, ${done} applied` : `\nall ${done} edits applied`);
process.exit(fail ? 1 : 0);
