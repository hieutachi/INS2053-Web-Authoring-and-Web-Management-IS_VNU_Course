/* Tests for strip-literals.js. No test runner is installed in this package, so
   this is a plain script: node _tools/test-strip-literals.js

   Cases marked (real) are copied from canvases/ at the line noted. The two
   shapes that matter are a single-quoted JS string, which must be blanked, and
   an apostrophe in JSX prose, which must NOT be - blanking from an apostrophe
   to the next quote swallows real brackets and invents imbalances. */
const path = require("path");
const { stripLiterals } = require(path.join(__dirname, "strip-literals.js"));

let pass = 0, fail = 0;

/* A blanked literal keeps its original width, so expectations spell that width
   out rather than relying on a hand-counted run of spaces. */
const sp = (n) => " ".repeat(n);

/* `code` must survive stripping with its brackets intact; `gone` must not. */
function check(label, src, expect) {
  const got = stripLiterals(src);
  const ok = got === expect;
  if (ok) pass++;
  else {
    fail++;
    console.log(`FAIL  ${label}`);
    console.log(`  in     ${JSON.stringify(src)}`);
    console.log(`  expect ${JSON.stringify(expect)}`);
    console.log(`  got    ${JSON.stringify(got)}`);
  }
  return ok;
}

/* Bracket delta the QA check computes; 0 means balanced. */
function delta(src) {
  const code = stripLiterals(src);
  let p = 0, b = 0, k = 0;
  for (const c of code) {
    if (c === "(") p++; else if (c === ")") p--;
    else if (c === "{") b++; else if (c === "}") b--;
    else if (c === "[") k++; else if (c === "]") k--;
  }
  return { p, b, k };
}

function balanced(label, src) {
  const { p, b, k } = delta(src);
  const ok = p === 0 && b === 0 && k === 0;
  if (ok) pass++;
  else {
    fail++;
    console.log(`FAIL  ${label}  paren=${p} brace=${b} brk=${k}`);
    console.log(`  in   ${JSON.stringify(src)}`);
    console.log(`  code ${JSON.stringify(stripLiterals(src))}`);
  }
  return ok;
}

console.log("-- double quotes, backticks, comments ------------------------------");
check("double-quoted string blanked",
  'id="agenda"', "id=" + sp(8));
check("paren inside a double-quoted note is not counted",
  'notes="1) False"', 'notes=          ');
balanced("prose with 1) inside notes= stays balanced",
  'notes="see (1) here"');
check("line comment blanked",
  '// SVG 4: (video)\n', '                 \n');
check("block comment blanked, newline kept",
  '/* a (\n b ) */', '      \n       ');
balanced("JSX comment braces still counted, inner parens not",
  '{/* Slide 14b: Do / Don\'t (x) */}');
check("template literal blanked",
  'x = `h1 { font: (a) }`', 'x =                   ');

console.log("-- single quotes that ARE strings (must be blanked) ----------------");
check("string after open paren (real buoi-13:60)",
  "field(56, 'name=\"email\"', true)", "field(56, " + sp(14) + ", true)");
check("string as array element (real buoi-12:327)",
  "['<header class=\"hero\">', 1, false]", "[                       , 1, false]");
check("string after comma (real buoi-10:214)",
  "[x, 'title=\"...\"', 6]", "[x, " + sp(13) + ", 6]");
balanced("unbalanced paren inside a single-quoted string is ignored (real buoi-10:94)",
  "[\"3\", '<p> fallback', \"-\"]");
balanced("css font stack in a single-quoted string (real buoi-07:280)",
  "  font-family: 'Roboto Slab', Arial, sans-serif;");

console.log("-- apostrophes in prose (must NOT be blanked) ----------------------");
check("apostrophe in a JSX title attribute leaves code alone",
  "<Slide title=\"Today's Plan\">", "<Slide title=              >");
check("apostrophe in JSX text is left as an ordinary character",
  "<H3>Don't</H3>", "<H3>Don't</H3>");
balanced("two apostrophes around a JSX expression keep braces countable",
  "<Text>Don't {x} won't</Text>");
balanced("apostrophe then a call on the same line (the buoi-10 regression)",
  "<Text>someone else's video</Text>\n{render(1)}");
balanced("apostrophe in text, string arg later on the same line",
  "{row('a=\"b\"', \"it's fine\")}");

console.log("-- shapes that keep the checker honest -----------------------------");
{
  // A real imbalance must still be reported, otherwise the check is useless.
  const { p } = delta("function F() {\n  return g((1);\n}");
  if (p === 1) pass++;
  else { fail++; console.log(`FAIL  real unbalanced paren must survive stripping (paren=${p})`); }
}
{
  // Escaped quote inside a double-quoted string must not end it early.
  const { p } = delta('x = "a \\" (b" + y');
  if (p === 0) pass++;
  else { fail++; console.log(`FAIL  escaped quote handling (paren=${p})`); }
}

console.log();
console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
