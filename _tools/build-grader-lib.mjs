/* ============================================================================
   Shared engine for the two browser-page builders.

     _tools/build-grader.mjs   → _tools/grader/cham-bai.html  (student page)
     _tools/build-verify.mjs   → _tools/verify/kiem-tra-bai.html (instructor page)

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

   Rubrics and student payloads are inlined as `const X = {...}` because the
   pages run from file:// under a `default-src 'none'` CSP: they cannot fetch a
   sibling JSON file, and they must not need to.
   ============================================================================ */

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

export const SRC = join(HERE, "grader", "src");
export const RUBRIC_DIR = join(HERE, "grader", "rubrics");

/* Dependency order. ui.js runs last because it calls init() on load — a page
   that must NOT auto-grade (the verify page) stops before it. */
export const MODULES = ["html-parse.js", "css-parse.js", "checks.js", "grade.js", "ui.js"];
export const CORE_MODULES = ["html-parse.js", "css-parse.js", "checks.js", "grade.js"];

export const varOf = (file) => "M_" + file.replace(/\.js$/, "").replace(/[^a-z0-9]+/gi, "_");

/**
 * Split an ESM source into its imports, its exported names, and a body with both
 * the import statements and the `export ` keywords removed.
 *
 * Deliberately narrow: it understands only the two forms these files use —
 * `import { a, b } from "./x.js";` (single or multi-line) and `export` on a
 * `function`/`const`/`let`/`class` declaration. Anything else throws rather than
 * silently dropping code, because a silently dropped export would surface as a
 * blank page in a browser.
 */
export function splitModule(file, source) {
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
export function wrapModule(file, source) {
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

/** Wrapped source of one module file from grader/src, read from disk. */
export function wrapModuleFile(file) {
  return wrapModule(file, readFileSync(join(SRC, file), "utf8"));
}

/**
 * Load and validate the fifteen rubrics, keyed "01" … "15".
 * Throws with a build-fail message the caller can print as-is.
 */
export function loadRubrics() {
  const rubricFiles = readdirSync(RUBRIC_DIR)
    .filter((f) => /^session-\d\d\.json$/.test(f))
    .sort();

  if (rubricFiles.length !== 15) {
    throw new Error(`cần 15 rubric, thấy ${rubricFiles.length}`);
  }

  const rubrics = {};
  for (const f of rubricFiles) {
    const key = f.slice("session-".length, "session-".length + 2);
    try {
      rubrics[key] = JSON.parse(readFileSync(join(RUBRIC_DIR, f), "utf8"));
    } catch (err) {
      throw new Error(`${f} không parse được: ${err.message}`);
    }
  }
  return { rubrics, count: rubricFiles.length };
}

/**
 * Inline a JSON value as a classic-script `const`.
 * A literal `</script>` inside a JSON string would close the script element
 * early; escaping the slash keeps the parsed JSON identical and makes the
 * sequence inert. Same recipe build-grader has always used for rubrics.
 */
export function inlineConst(name, value, banner) {
  const head = banner ? `${banner}\n` : "";
  return `${head}const ${name} = ${JSON.stringify(value, null, 1).replace(/<\//g, "<\\/")};`;
}
