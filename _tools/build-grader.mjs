/* =============================================================================
   Build _tools/grader/cham-bai.html — one self-contained file.

     node _tools/build-grader.mjs

   Inputs   _tools/grader/src/{html-parse,css-parse,checks,grade,ui}.js
            _tools/grader/src/grader.css
            _tools/grader/src/index.template.html
            _tools/grader/rubrics/session-01.json … session-15.json
   Output   _tools/grader/cham-bai.html

   The module-wrapping engine lives in _tools/build-grader-lib.mjs so the
   instructor verify page (_tools/build-verify.mjs) can inline the exact same
   engine — one copy of the recipe, no chance of the two pages disagreeing.
   ============================================================================= */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SRC, MODULES, loadRubrics, wrapModuleFile, inlineConst,
} from "./build-grader-lib.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "grader", "cham-bai.html");

let rubrics;
let rubricCount;
try {
  ({ rubrics, count: rubricCount } = loadRubrics());
} catch (err) {
  console.error(`GRADER BUILD FAIL — ${err.message}`);
  process.exit(1);
}

/* --- assemble --------------------------------------------------------------- */

const parts = [];
parts.push(inlineConst("RUBRICS", rubrics,
  "/* Rubric inlined at build time — the page cannot fetch JSON from file://. */"));
parts.push("");

for (const file of MODULES) {
  parts.push(wrapModuleFile(file));
  parts.push("");
}

const css = readFileSync(join(SRC, "grader.css"), "utf8").trim();
const template = readFileSync(join(SRC, "index.template.html"), "utf8");

if (!template.includes("/*GRADER_CSS*/") || !template.includes("/*GRADER_JS*/")) {
  console.error("GRADER BUILD FAIL — template thiếu /*GRADER_CSS*/ hoặc /*GRADER_JS*/");
  process.exit(1);
}

// Replacer functions, not strings: `$&` and friends inside the CSS or JS would
// otherwise be interpreted as replacement patterns and corrupt the output.
const html = template
  .replace("/*GRADER_CSS*/", () => css)
  .replace("/*GRADER_JS*/", () => parts.join("\n"));

writeFileSync(OUT, html, "utf8");

const kb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(0);
console.log(`GRADER BUILD OK — _tools/grader/cham-bai.html (${kb} KB, ${rubricCount} rubric)`);
