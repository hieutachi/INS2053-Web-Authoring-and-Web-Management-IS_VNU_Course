/* Bracket balance for canvas TSX files, ignoring text inside string literals and
   comments. Check 1 of the QA sweep used to count parens in prose such as
   notes="...1) False..." and report a BAD line for a file that was fine.

   Usage:
     node _tools/check-brackets.js <file.tsx> [more files...]
   Prints one ok/BAD line per file; exits 1 if any file is unbalanced. */
const fs = require("fs");
const path = require("path");
const { stripLiterals } = require(path.join(__dirname, "strip-literals.js"));

let fail = 0;
for (const f of process.argv.slice(2)) {
  const code = stripLiterals(fs.readFileSync(f, "utf8"));
  let p = 0, b = 0, k = 0;
  for (const c of code) {
    if (c === "(") p++; else if (c === ")") p--;
    else if (c === "{") b++; else if (c === "}") b--;
    else if (c === "[") k++; else if (c === "]") k--;
  }
  const name = path.basename(f);
  const bad = p || b || k;
  console.log((bad ? "BAD  " : "ok   ") + name + `  paren=${p} brace=${b} brk=${k}`);
  if (bad) fail = 1;
}
process.exit(fail);
