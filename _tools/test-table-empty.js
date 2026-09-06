/* Tests for the shared table empty state and the uppercase-header guarantee.

   No test runner is installed in this package, so this is a plain script:

     node _tools/test-table-empty.js

   Three surfaces share one design: the <Table> component for slide decks
   (_tools/canvas-runtime/canvas.jsx, bundled below with the same esbuild
   trick build-html-slides.mjs uses), the build-time transform for markdown
   tables (_tools/table-empty-state.mjs, imported directly), and the grader
   card (_tools/grader/src/ui.js, asserted through its stylesheet contract).
   renderToStaticMarkup gives back plain HTML the checks below read as text. */
const fs = require("fs");
const os = require("os");
const path = require("path");
const { pathToFileURL } = require("url");

const ROOT = path.resolve(__dirname, "..");
const RUNTIME = path.join(ROOT, "_tools", "canvas-runtime", "canvas.jsx");

let pass = 0, fail = 0;

function check(label, ok, detail) {
  if (ok) { pass++; console.log("ok   " + label); }
  else { fail++; console.log("FAIL " + label + (detail ? "  -- " + detail : "")); }
}

/* Reads a repo file as text; line endings differ between checkouts, so all
   assertions below treat \r as optional. */
const readText = (rel) => fs.readFileSync(path.join(ROOT, ...rel.split("/")), "utf8");

async function main() {
  const { build } = require(path.join(ROOT, "node_modules", "esbuild"));

  const outfile = path.join(os.tmpdir(), `ins2053-test-table-${process.pid}.cjs`);
  const runtimePosix = RUNTIME.split(path.sep).join("/");
  await build({
    stdin: {
      contents:
        `export { Table } from ${JSON.stringify(runtimePosix)};\n` +
        'export { createElement } from "react";\n' +
        'export { renderToStaticMarkup } from "react-dom/server";\n',
      resolveDir: ROOT,
      sourcefile: "entry-test-table.js",
      loader: "js",
    },
    outfile,
    bundle: true,
    // CJS, not ESM: react-dom/server requires node builtins, and esbuild's ESM
    // output cannot answer a dynamic require from bundled CJS.
    format: "cjs",
    platform: "node",
    target: "node20",
    jsx: "automatic",
    jsxImportSource: "react",
    logLevel: "silent",
    // react and react-dom are bundled in: the outfile lives in the system
    // temp dir, where Node cannot resolve the repo's node_modules.
  });

  const { Table, createElement, renderToStaticMarkup } = await import(pathToFileURL(outfile).href);
  fs.unlinkSync(outfile);

  const render = (props) => renderToStaticMarkup(createElement(Table, props));

  console.log("-- rows present: the empty state must stay out ------------------");
  {
    const html = render({ headers: ["Week", "Topic"], rows: [["1", "HTML"], ["2", "CSS"]] });
    check("header row plus two data rows render", (html.match(/<tr>/g) || []).length === 3);
    check("header cells stay in thead", /<thead>[\s\S]*<th[^>]*>Week<\/th>/.test(html));
    check("no empty-state markup leaks into a populated table", !html.includes("c-table-empty"));
  }

  console.log("-- rows=[]: the shared empty state -------------------------------");
  {
    const html = render({ headers: ["Week", "Topic", "Homework"], rows: [] });
    const colspan = Number((html.match(/colspan="(\d+)"/) || [])[1]);
    check("the empty cell spans every header column", colspan === 3, `colspan=${colspan}`);
    check("dashed empty panel class is present", html.includes('class="c-table-empty"'));
    check("default title renders", html.includes("No rows to display"));
    check("default description renders", html.includes("This table is empty."));
    check("icon is decorative (aria-hidden)", /<svg[^>]*aria-hidden="true"/.test(html));
    check("header row stays visible above the empty state",
      html.includes("<thead>") && html.includes(">Week<"));
    check("exactly one body row (no hollow tbody)", (html.match(/<tbody>[\s\S]*?<\/tbody>/)[0].match(/<tr/g) || []).length === 1);
  }

  console.log("-- sad inputs: null, undefined, missing headers -------------------");
  {
    const nullRows = render({ headers: ["A", "B"], rows: null });
    check("rows: null renders the empty state instead of crashing", nullRows.includes("c-table-empty"));
    const omittedRows = render({ headers: ["A"] });
    check("rows omitted entirely renders the empty state", omittedRows.includes("c-table-empty"));
    const noHeaders = render({ rows: [] });
    const colspan = Number((noHeaders.match(/colspan="(\d+)"/) || [])[1]);
    check("colspan never drops below 1 when there are no headers", colspan === 1, `colspan=${colspan}`);
    const nothing = render({});
    check("no props at all still renders a table shell", nothing.includes("c-table-empty"));
    const custom = render({ headers: ["A"], rows: [], emptyTitle: "Chưa có dữ liệu", emptyText: "Thử lại sau." });
    check("callers can override the title and text",
      custom.includes("Chưa có dữ liệu") && custom.includes("Thử lại sau."));
  }


  console.log("-- build-time transform for markdown tables -----------------------");
  {
    const mod = await import(
      pathToFileURL(path.join(ROOT, "_tools", "table-empty-state.mjs")).href);
    const { injectTableEmptyStates, columnCount, EMPTY_TITLE } = mod;
    const { marked } = require(path.join(ROOT, "node_modules", "marked"));

    const headerOnly = marked.parse("| Week | Topic |\n| --- | --- |\n", { gfm: true });
    const injected = injectTableEmptyStates(headerOnly);
    check("a header-only GFM table gains the shared empty state",
      injected.includes("table-empty-row") && injected.includes(EMPTY_TITLE));
    const injectedColspan = Number((injected.match(/colspan="(\d+)"/) || [])[1]);
    check("the injected cell spans both header columns", injectedColspan === 2, `colspan=${injectedColspan}`);
    check("the transform is idempotent", injectTableEmptyStates(injected) === injected);

    const populated = marked.parse("| A | B |\n| --- | --- |\n| 1 | 2 |\n", { gfm: true });
    check("a table with data rows comes back byte-identical",
      injectTableEmptyStates(populated) === populated);

    const noTbody = "<table><thead><tr><th>One</th><th>Two</th><th>Three</th></tr></thead></table>";
    const grown = injectTableEmptyStates(noTbody);
    check("a table with no tbody grows one carrying the empty state",
      /<tbody><tr class="table-empty-row">[\s\S]*<\/tbody><\/table>/.test(grown));
    check("the grown tbody spans all three columns", /colspan="3"/.test(grown));

    const colspanHead = "<thead><tr><th colspan=\"2\">Merged</th><th>Solo</th></tr></thead><tbody></tbody>";
    check("colspan attributes on header cells are summed", columnCount(colspanHead) === 3);

    const nested =
      "<table><tbody><tr><td>outer" +
      "<table><thead><tr><th>Inner</th></tr></thead><tbody></tbody></table>" +
      "</td></tr></tbody></table>";
    const nestedOut = injectTableEmptyStates(nested);
    check("nested tables: only the hollow inner table changes",
      (nestedOut.match(/table-empty-row/g) || []).length === 1 &&
      nestedOut.startsWith("<table><tbody><tr><td>outer<table>"));
    check("nested tables: the outer row keeps its content", nestedOut.includes("<td>outer"));

    const unclosed = "<table><tbody></tbody>";
    check("an unclosed table is left alone, not guessed at",
      injectTableEmptyStates(unclosed) === unclosed);

    const noTables = "<p>No tables here.</p>";
    check("fragments without tables come back byte-identical",
      injectTableEmptyStates(noTables) === noTables);
  }

  console.log("-- uppercase headers are a stylesheet guarantee -------------------");
  {
    const deck = readText("_tools/canvas-runtime/deck.css");
    const deckRule = deck.match(/\.c-table thead th \{[^}]*\}/);
    check("deck.css keeps .c-table thead th uppercase",
      !!deckRule && deckRule[0].includes("text-transform: uppercase"));
    check("deck.css styles the deck empty state",
      deck.includes(".c-table tbody tr.c-table-empty-row") && deck.includes(".c-table-empty {"));

    const site = readText("_tools/site-assets/site.css");
    check("site.css forces every th uppercase",
      /(^|\r?\n)th \{[^}]*text-transform: uppercase/.test(site));
    check("site.css styles the site empty state",
      site.includes(".table-empty-cell") && site.includes(".table-empty {"));

    const grader = readText("_tools/grader/src/grader.css");
    const graderRule = grader.match(/table\.rubric thead th \{[^}]*\}/);
    check("grader.css keeps rubric headers uppercase",
      !!graderRule && graderRule[0].includes("text-transform: uppercase"));
    check("grader.css styles the rubric empty state",
      grader.includes(".rubric-empty {") && grader.includes("tr.rubric-empty-row"));

    const ui = readText("_tools/grader/src/ui.js");
    check("ui.js renders the rubric empty state when rows are empty",
      ui.includes("rubricEmptyRow()") && /report\.rows \?\? \[\]\)\.length/.test(ui));
  }

  console.log();
  console.log(`${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});

