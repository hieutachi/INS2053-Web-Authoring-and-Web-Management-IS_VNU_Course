import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { SECTIONS, PAGES, MILESTONES, CHECKLIST, PROJECT_UI } from './project-data.mjs';
const site = new URL('../site/', import.meta.url);
assert.deepEqual(MILESTONES.map(m => m.week), [4,5,7,9,11,14,16,16]);
assert.equal(new Set(CHECKLIST.map(c => c[0])).size, CHECKLIST.length);
assert.deepEqual(Object.keys(PROJECT_UI.en).sort(), Object.keys(PROJECT_UI.vi).sort());
let anchors;
for (const lang of ['en', 'vi']) {
  const prefix = lang === 'vi' ? 'vi/' : '';
  assert.deepEqual(await readdir(new URL(`${prefix}project/`, site)), ['index.html'], 'Only one allowlisted hub may be public');
  const html = await readFile(new URL(`${prefix}project/index.html`, site), 'utf8');
  assert.match(html, new RegExp(`<html lang="${lang}"`));
  assert.doesNotMatch(html, /lang-fallback|Category 1: Structure|Partial Marks|Zero Marks/);
  for (const id of SECTIONS) assert.match(html, new RegExp(`class="project-section" id="${id}"`));
  for (const c of CHECKLIST) assert.match(html, new RegExp(`data-project-check="${c[0]}"`));
  for (const id of PAGES) assert.match(html, new RegExp(`data-demo-document="${id}"`));
  const ids = [...html.matchAll(/<h3 id="([^"]+)"/g)].map(m => m[1]).filter(id => !id.endsWith('-title'));
  if (anchors) assert.deepEqual(ids, anchors, 'EN/VI deep-link parity'); else anchors = ids;
  for (const m of MILESTONES) assert.match(html, new RegExp(`id="milestones-${m.id}"`));
  assert.doesNotMatch(html, /(?:href|src)="\//, 'Repository prefix safe');
}
for (const folder of ['exams','exercises','canvases','_tools']) assert(!(await readdir(site)).includes(folder), `Private folder ${folder} leaked`);
const js = await readFile(new URL('assets/project.js', site), 'utf8');
assert.match(js, /ins2053\.project\.progress\.v1/);
assert.match(js, /window\.confirm/);
assert.doesNotMatch(js, /fetch\(|XMLHttpRequest|sendBeacon|FormData/);
assert.match(await readFile(new URL('assets/project.css', site), 'utf8'), /\.project-section\[hidden\] \{ display: block !important/);
console.log('PROJECT QA PASS: sections, nested IDs, milestones, language/checklist parity, private publication and storage contract');