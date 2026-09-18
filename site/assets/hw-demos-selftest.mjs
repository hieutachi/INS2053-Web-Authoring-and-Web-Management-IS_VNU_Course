/* =============================================================================
   hw-demos-selftest.mjs — sanity checks for hw-demos.mjs.

     node _tools/site-assets/hw-demos-selftest.mjs

   Fails loudly if a demo is missing, is not a complete HTML document, lost the
   no-copy shield, or would survive srcdoc escaping intact with stray quotes.
   Run before `npm run build:site` when editing the demos. Exits non-zero on
   any problem. Read-only.
   ============================================================================= */

import { DEMOS, demoDoc, toSrcdoc } from "./hw-demos.mjs";

let fail = 0;
const bad = (msg) => { console.log("FAIL  " + msg); fail = 1; };
const ok = (msg) => console.log("ok    " + msg);

const keys = Object.keys(DEMOS).map(Number).sort((a, b) => a - b);
const want = Array.from({ length: 15 }, (_, i) => i + 1);
if (JSON.stringify(keys) === JSON.stringify(want)) ok("15 demos, keys 1..15");
else bad(`demo keys are ${keys.join(",")}, expected 1..15`);

for (const k of want) {
  const fn = DEMOS[k];
  if (typeof fn !== "function") { bad(`DEMOS[${k}] is not a function`); continue; }
  const doc = fn();
  if (!doc.startsWith("<!DOCTYPE html>")) bad(`demo ${k} does not start with a doctype`);
  if (!doc.trimEnd().endsWith("</html>")) bad(`demo ${k} does not end with </html>`);
  if (!doc.includes('oncopy="return false"')) bad(`demo ${k} lost the no-copy shield`);
  if (!/<title>[^<]+<\/title>/.test(doc)) bad(`demo ${k} has no <title>`);
  // The escaped form must carry no raw double quote left, or the srcdoc
  // attribute would terminate early and swallow the rest of the page.
  const sd = toSrcdoc(doc);
  const inAttr = sd.slice('srcdoc="'.length);
  if (/[^&]"/.test(sd)) bad(`demo ${k} srcdoc still contains a raw quote`);
  // Round-trip: unescaping the two entities must give the document back.
  const back = sd.replace(/&quot;/g, '"').replace(/&amp;/g, "&");
  if (back !== doc) bad(`demo ${k} srcdoc round-trip is not lossless`);
}

// The wrapper itself must keep working for future demos.
const probe = demoDoc("probe", "<p>x</p>");
if (!probe.includes("<p>x</p>")) bad("demoDoc wrapper dropped the body");
if (!toSrcdoc(probe).includes("&quot;UTF-8&quot;")) bad("toSrcdoc did not escape attribute quotes");

console.log("");
console.log(fail ? "HW-DEMOS SELFTEST FAIL" : "HW-DEMOS SELFTEST PASS");
process.exit(fail);
