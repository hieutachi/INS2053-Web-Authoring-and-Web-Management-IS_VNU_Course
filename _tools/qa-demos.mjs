import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toSrcdoc, DEMOS } from './site-assets/hw-demos.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const decode = s => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const probe = '<p title="a &quot; b">&amp; &lt; \' Việt</p>';
assert.equal(decode(toSrcdoc(probe)), probe);
let documents = 0;
async function audit(doc, host) {
  documents++;
  // Inspect markup separately: CSS selectors and explanatory comments are not controls.
  assert.doesNotMatch(doc.replace(/<!--[\s\S]*?-->/g, ''), /<script\b/i, host + ': no scripts');
  doc = doc.replace(/<!--[\s\S]*?-->/g, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  assert.match(doc, /^<!DOCTYPE html>/i);
  for (const re of [/<html lang="en"/, /charset="UTF-8"/i, /name="viewport"/, /<title>[^<]+<\/title>/]) assert.match(doc, re, host);
  assert.equal((doc.match(/<h1[ >]/g) || []).length, 1, `${host}: independent document h1`);
  assert.doesNotMatch(doc, /<script\b|\bon[a-z]+\s*=|<form\b|type="(?:submit|file)"|autoplay|<base\b/i, host + ': no scripting/submission');
  const ids = [...doc.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size, `${host}: duplicate IDs`);
  for (const m of doc.matchAll(/<img\b[^>]*>/g)) assert.match(m[0], /alt="[^"]+"/, `${host}: image alt`);
  for (const m of doc.matchAll(/<(?:input|select|textarea)\b[^>]*>/g)) {
    const id = /id="([^"]+)"/.exec(m[0]);
    assert(id && doc.includes(`for="${id[1]}"`), `${host}: control needs matching label`);
  }
  for (const m of doc.matchAll(/\b(?:src|poster|href)="([^"]+)"/g)) {
    const url = m[1];
    if (url.startsWith('#')) { assert(ids.includes(url.slice(1)), `${host}: anchor ${url}`); continue; }
    if (/^[a-z]+\.html(?:#[a-z0-9-]+)?$/.test(url)) {
      const [file, hash] = url.split('#');
      const companion = await readFile(path.join(root, 'examples/student-club', file), 'utf8');
      if (hash) assert(companion.includes(`id="${hash}"`), `${host}: companion anchor ${url}`);
      continue;
    }
    if (url.startsWith('mailto:')) continue;
    assert(!/^(?:https?:|data:|\/)/.test(url), `${host}: external/root asset ${url}`);
    assert((await stat(path.resolve(path.dirname(host), url))).size > 0, `${host}: asset ${url}`);
  }
}
for (const lang of ['en','vi']) {
  for (const file of ['project/index.html', ...Array.from({length:15}, (_, i) => `homework/session-${String(i+1).padStart(2,'0')}.html`)]) {
    const host = path.join(root, 'site', lang === 'vi' ? 'vi' : '', file);
    const html = await readFile(host, 'utf8');
    const frames = [...html.matchAll(/<iframe\b[^>]*>/g)];
    assert.equal(frames.length, 1, host);
    for (const f of frames) {
      assert.match(f[0], /sandbox="allow-same-origin"/);
      const value = /srcdoc="([^"]*)"/.exec(f[0]);
      assert(value); await audit(decode(value[1]), host);
    }
    for (const m of html.matchAll(/<template data-demo-document="[^"]+">([\s\S]*?)<\/template>/g)) await audit(decode(m[1]), host);
  }
}
assert.doesNotMatch(DEMOS[1](), /<style>|<img|<nav|<table/);
assert((DEMOS[2]().match(/<img/g) || []).length >= 2);
assert((DEMOS[3]().match(/<img/g) || []).length >= 3);
assert.match(DEMOS[3](), /<ol>/); assert.match(DEMOS[3](), /<h3>/);
for (const n of [5,6]) for (const tag of ['header','nav','main','footer']) assert.match(DEMOS[n](), new RegExp(`<${tag}[ >]`));
assert.match(DEMOS[7](), /offline preview uses system fonts/);
assert((DEMOS[9]().match(/<tr>/g) || []).length >= 6); assert.match(DEMOS[9](), /colspan/);
assert.match(DEMOS[10](), /<video controls/); assert.match(DEMOS[10](), /<audio controls/);
assert.match(DEMOS[11](), /rel="icon"/); assert.match(DEMOS[12](), /validation/);
for (const token of ['type="tel"','type="radio"','type="checkbox"','<fieldset>','<legend>']) assert(DEMOS[13]().includes(token));
assert.match(DEMOS[14](), /focus-within/); assert.match(DEMOS[15](), /repeat\(2, 1fr\)/);
console.log(`DEMO QA PASS: ${documents} independent decoded documents, escaping, assets/anchors, labels, lesson contracts and safe controls`);