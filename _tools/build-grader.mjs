/* =============================================================================
   Build _tools/grader/cham-bai.html — one self-contained file.

     node _tools/build-grader.mjs

   Inputs   _tools/grader/src/{html-parse,css-parse,checks,grade,ui}.js
            _tools/grader/src/grader.css
            _tools/grader/src/index.template.html
            _tools/grader/rubrics/session-01.json … session-15.json
   Output   _tools/grader/cham-bai.html

   Why the modules are wrapped instead of concatenated
   ---------------------------------------------------
   The sources are real ESM so that _tools/qa-grader.mjs can import them and
   grade the fixtures in Node. A browser <script> is a classic script, and the
   modules deliberately reuse short private helper names — `norm` exists in both
   checks.js and grade.js, `extOf` in both grade.js and ui.js. Pasting the files
   end to end would be a SyntaxError on the second declaration.

   So each module becomes an IIFE that returns its exports, and the next module
   destructures what it imported from the registry. Module scope in, function
   scope out, same semantics, no renaming of the sources.

   The rubrics are inlined as `const RUBRICS = { "01": {...} }` because the page
   runs from file:// under a `default-src 'none'` CSP: it cannot fetch a sibling
   JSON file, and it must not need to.
   ============================================================================= */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "grader", "src");
const RUBRIC_DIR = join(HERE, "grader", "rubrics");
const OUT = join(HERE, "grader", "cham-bai.html");

/* Dependency order. ui.js runs last because it calls init() on load. */
const MODULES = ["html-parse.js", "css-parse.js", "checks.js", "grade.js", "ui.js"];

const varOf = (file) => "M_" + file.replace(/\.js$/, "").replace(/[^a-z0-9]+/gi, "_");


/**
 * Split an ESM source into its imports, its exported names, and a body with both
 * the import statements and the `export ` keywords removed.
 *
 * Deliberately narrow: it understands only the two forms these five files use —
 * `import { a, b } from "./x.js";` (single or multi-line) and `export` on a
 * `function`/`const`/`let`/`class` declaration. Anything else throws rather than
 * silently dropping code, because a silently dropped export would surface as a
 * blank page in a student's browser.
 */
function splitModule(file, source) {
  const imports = [];
  let body = source.replace(
    /^import\s*\{([\s\S]*?)\}\s*from\s*["']\.\/([\w.-]+)["'];?[ \t]*\r?\n/gm,
    (_all, names, from) => {
      imports.push({
        from,
        names: names.split(",").map((s) => s.trim()).filter(Boolean),
      });
      return "";
    },
  );

  const leftover = body.match(/^import\s.+$/m);
  if (leftover) {
    throw new Error(`${file}: import không hỗ trợ — ${leftover[0].trim()}`);
  }

  const exported = [];
  body = body.replace(
    /^export\s+(?=(?:async\s+)?(?:function|const|let|var|class)\s)/gm,
    "",
  );
  for (const m of source.matchAll(
    /^export\s+(?:async\s+)?(?:function|const|let|var|class)\s+([A-Za-z_$][\w$]*)/gm,
  )) {
    exported.push(m[1]);
  }
  const otherExport = body.match(/^export\s.+$/m);
  if (otherExport) {
    throw new Error(`${file}: export không hỗ trợ — ${otherExport[0].trim()}`);
  }

  return { imports, exported, body: body.trim() };
}

/** Wrap one module as `const M_x = (function(){ … return { … }; })();`. */
function wrapModule(file, source) {
  const { imports, exported, body } = splitModule(file, source);
  const lines = [];
  lines.push(`/* ---------- ${file} ---------- */`);
  lines.push(`const ${varOf(file)} = (function () {`);
  for (const imp of imports) {
    lines.push(`  const { ${imp.names.join(", ")} } = ${varOf(imp.from)};`);
  }
  lines.push(body);
  lines.push(`  return { ${exported.join(", ")} };`);
  lines.push(`})();`);
  return lines.join("\n");
}


/* --- rubrics ---------------------------------------------------------------- */

const rubricFiles = readdirSync(RUBRIC_DIR)
  .filter((f) => /^session-\d\d\.json$/.test(f))
  .sort();

if (rubricFiles.length !== 15) {
  console.error(`GRADER BUILD FAIL — cần 15 rubric, thấy ${rubricFiles.length}`);
  process.exit(1);
}

const rubrics = {};
for (const f of rubricFiles) {
  const key = f.slice("session-".length, "session-".length + 2);
  const text = readFileSync(join(RUBRIC_DIR, f), "utf8");
  try {
    rubrics[key] = JSON.parse(text);
  } catch (err) {
    console.error(`GRADER BUILD FAIL — ${f} không parse được: ${err.message}`);
    process.exit(1);
  }
}

/* --- assemble --------------------------------------------------------------- */

const parts = [];
parts.push("/* Rubric inlined at build time — the page cannot fetch JSON from file://. */");
// A literal </script> inside a JSON string would close the script element early.
// Escaping the slash keeps the parsed JSON identical and makes the sequence inert.
parts.push("const RUBRICS = " + JSON.stringify(rubrics, null, 1).replace(/<\//g, "<\\/") + ";");
parts.push("");

for (const file of MODULES) {
  parts.push(wrapModule(file, readFileSync(join(SRC, file), "utf8")));
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
console.log(`GRADER BUILD OK — _tools/grader/cham-bai.html (${kb} KB, ${rubricFiles.length} rubric)`);
