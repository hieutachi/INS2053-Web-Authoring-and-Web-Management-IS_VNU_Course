// crude JSX/brace balance sanity check
const fs = require('fs');
for (const f of process.argv.slice(2)) {
  const src = fs.readFileSync(f, 'utf8');
  let par = 0, brace = 0, brk = 0;
  for (const ch of src) {
    if (ch === '(') par++; else if (ch === ')') par--;
    else if (ch === '{') brace++; else if (ch === '}') brace--;
    else if (ch === '[') brk++; else if (ch === ']') brk--;
  }
  const opens = (src.match(/<([A-Za-z][A-Za-z0-9.]*)(?=[\s>/])/g) || []).length;
  const selfclose = (src.match(/\/>/g) || []).length;
  const closes = (src.match(/<\/[A-Za-z][A-Za-z0-9.]*>/g) || []).length;
  const bad = par !== 0 || brace !== 0 || brk !== 0 || (opens - selfclose) !== closes;
  console.log((bad ? 'BAD  ' : 'ok   ') + f + `  paren=${par} brace=${brace} brk=${brk} tags:${opens}-${selfclose}=${opens - selfclose} vs close=${closes}`);
}
