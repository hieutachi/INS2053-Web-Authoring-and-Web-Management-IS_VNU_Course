/* Replace an inclusive 1-indexed line range in a file with new text.
   Used when the text to replace contains escape-like sequences ({) that
   do not survive being retyped by hand.

     node _tools/splice-lines.js <file> <startLine> <endLine> <replacementFile>

   Prints the removed lines so the change is reviewable. */
const fs = require("fs");

const [file, startArg, endArg, replFile] = process.argv.slice(2);
if (!file || !startArg || !endArg || !replFile) {
  console.error("usage: splice-lines.js <file> <start> <end> <replacementFile>");
  process.exit(2);
}
const start = parseInt(startArg, 10);
const end = parseInt(endArg, 10);

const src = fs.readFileSync(file, "utf8");
const nl = src.includes("\r\n") ? "\r\n" : "\n";
const lines = src.split(/\r?\n/);

if (start < 1 || end > lines.length || start > end) {
  console.error(`bad range ${start}..${end} for a ${lines.length}-line file`);
  process.exit(2);
}

const repl = fs.readFileSync(replFile, "utf8").replace(/\r?\n$/, "").split(/\r?\n/);

console.log("--- removing:");
lines.slice(start - 1, end).forEach((l, i) => console.log(`${start + i}| ${l}`));

lines.splice(start - 1, end - start + 1, ...repl);
fs.writeFileSync(file, lines.join(nl), "utf8");
console.log(`--- wrote ${repl.length} line(s) in place of ${end - start + 1}`);
