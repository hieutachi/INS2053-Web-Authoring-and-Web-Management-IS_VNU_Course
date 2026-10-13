import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PAGES, PROJECT_UI } from './project-data.mjs';
import { DEMOS, toSrcdoc } from './site-assets/hw-demos.mjs';

const reference = new URL('../examples/student-club/', import.meta.url);
export const escapeHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Only these five authored documents and this stylesheet are read at build time.
export function referenceDocs(assetBase) {
  const css = readFileSync(new URL('css/style.css', reference), 'utf8');
  return Object.fromEntries(PAGES.map(id => {
    let html = readFileSync(new URL(`${id}.html`, reference), 'utf8')
      .replace(/<link rel="stylesheet" href="css\/style.css">/, () => `<style>${css}</style>`)
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/\b(src|poster|href)="(images|media)\/([^"]+)"/g, (_, attr, dir, name) => `${attr}="${assetBase}${dir}/${name}"`);
    return [id, html];
  }));
}
export const REFERENCE_ROOT = fileURLToPath(reference);

export function viewer({ lang, id, assetBase, session = null }) {
  const L = PROJECT_UI[lang];
  let docs;
  if (session) {
    // The initial target remains lesson-specific, never replaced with the capstone.
    // Companion navigation pages are intentionally basic for pre-layout lessons.
    const target = session === 3 || session === 4 ? 'about' : session === 9 ? 'activities' : session === 10 ? 'media' : session === 13 ? 'contact' : 'index';
    const rewriteAsset = (_, attr, dir, name) => `${attr}="${assetBase}${dir}/${name}"`;
    const main = DEMOS[session]().replace(/\b(src|poster|href)="(images|media)\/([^"]+)"/g, rewriteAsset);
    const nav = '<nav><a href="index.html">Home</a> | <a href="about.html">About</a> | <a href="contact.html">Contact</a></nav>';
    docs = session >= 9 ? referenceDocs(assetBase) : Object.fromEntries(['index', 'about', 'contact'].map(page => [page, `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${page} — lesson ${session}</title></head><body><h1>CodeBreakers Club — ${page}</h1>${nav}<p>${page === 'about' ? 'Our mission is to learn HTML and CSS together.' : page === 'contact' ? 'Teaching example: contact@example.invalid. Meeting place: the campus learning lab.' : 'Welcome to the club. We practise, review and share our work.'}</p><p>This companion page demonstrates relative navigation. Return to the lesson target with the page selector above.</p></body></html>`]));
    docs[target] = main;
    // Put the visual target first without changing stable page IDs.
    docs = { [target]: main, ...docs };
  } else docs = referenceDocs(assetBase);
  const first = Object.keys(docs)[0];
  return `<div class="demo-viewer" data-demo-viewer>
<h3 id="${id}-title">${escapeHtml(L.viewer)}</h3><p>${escapeHtml(L.safe)}</p>
<div class="demo-controls" data-viewer-controls hidden><div role="group" aria-label="${escapeHtml(L.nav)}">${Object.keys(docs).map((page, i) => `<button type="button" data-demo-page="${page}" aria-pressed="${i === 0}">${page === 'index' ? 'Home' : page[0].toUpperCase() + page.slice(1)}</button>`).join('')}</div>
<div role="group" aria-label="${escapeHtml(L.viewport)}">${[375, 768, 1200, 'fit'].map(w => `<button type="button" data-demo-width="${w}" aria-pressed="${w === 'fit'}">${w === 'fit' ? escapeHtml(L.fit) : `${w}px`}</button>`).join('')}</div>
<button type="button" data-demo-validate>${escapeHtml(L.validate)}</button><button type="button" data-demo-clear>${escapeHtml(L.clear)}</button></div>
<p role="status" data-demo-status data-valid="${escapeHtml(L.valid)}" data-invalid="${escapeHtml(L.invalid)}">${escapeHtml(L.status)}</p>
<div class="demo-scroll" tabindex="0" aria-label="${escapeHtml(L.viewport)}"><iframe class="hw-demo-frame" title="${escapeHtml(L.viewer)} — ${id}" sandbox="allow-same-origin" srcdoc="${toSrcdoc(docs[first])}"></iframe></div>
${Object.entries(docs).map(([page, html]) => `<template data-demo-document="${page}">${escapeHtml(html)}</template>`).join('\n')}
<noscript><p>${lang === 'vi' ? 'Bật JavaScript để đổi trang, kích thước và thử validation.' : 'Enable JavaScript to change pages, viewport and simulate validation.'}</p></noscript>
</div>`;
}