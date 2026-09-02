// Usage: node replace-block.js <target.md> <newblock.txt>
// Replaces the fenced block that starts at line 10 (1-indexed) of target.md.
// Asserts line 8 is the SESSION INFORMATION heading and line 10 is an opening fence.
const fs = require('fs');
const [target, blockFile] = process.argv.slice(2);
const lines = fs.readFileSync(target, 'utf8').split('\n');
if (!/^# .* SESSION INFORMATION$/.test(lines[7])) {
  console.error('ASSERT FAIL line8 not SESSION INFORMATION heading: ' + JSON.stringify(lines[7]));
  process.exit(1);
}
if (lines[9].trim() !== '```') {
  console.error('ASSERT FAIL line10 not opening fence: ' + JSON.stringify(lines[9]));
  process.exit(1);
}
let close = -1;
for (let i = 10; i < lines.length; i++) { if (lines[i].trim() === '```') { close = i; break; } }
if (close === -1) { console.error('ASSERT FAIL no closing fence'); process.exit(1); }
const body = fs.readFileSync(blockFile, 'utf8').replace(/\n+$/, '').split('\n');
const out = [...lines.slice(0, 10), ...body, ...lines.slice(close)];
fs.writeFileSync(target, out.join('\n'));
console.log('OK ' + target + ': replaced lines 11-' + close + ' (' + (close - 10) + ' -> ' + body.length + ' lines)');
