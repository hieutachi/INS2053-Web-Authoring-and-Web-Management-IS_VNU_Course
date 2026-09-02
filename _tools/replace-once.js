const fs = require('fs');
const [file, oldF, newF] = process.argv.slice(2);
const s = fs.readFileSync(file, 'utf8');
const o = fs.readFileSync(oldF, 'utf8').replace(/\r?\n$/, '');
const n = fs.readFileSync(newF, 'utf8').replace(/\r?\n$/, '');
const c = s.split(o).length - 1;
if (c !== 1) { console.error('FAIL match count=' + c + ' in ' + file); process.exit(1); }
fs.writeFileSync(file, s.replace(o, n));
console.log('ok ' + file);
