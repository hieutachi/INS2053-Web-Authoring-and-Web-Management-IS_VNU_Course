import { readFile } from 'node:fs/promises';
import { marked } from 'marked';
import { SECTIONS, CHECKLIST, PROJECT_UI } from './project-data.mjs';
import { viewer, escapeHtml as esc } from './demo-viewer.mjs';

export async function projectBody(lang, assetBase) {
  const L = PROJECT_UI[lang];
  const source = new URL(`../${lang === 'vi' ? 'i18n/vi/' : ''}project/student-guide.md`, import.meta.url);
  const md = await readFile(source, 'utf8');
  const parts = [...md.matchAll(/^## ([a-z-]+) \| (.+)\r?\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)];
  if (parts.map(m => m[1]).join() !== SECTIONS.join()) throw new Error(`Project section registry mismatch: ${lang}`);
  return `<div class="project-hub" data-project-hub>
<nav class="project-nav" aria-label="${esc(L.title)}">${SECTIONS.map((id, i) => `<a href="#${id}" data-project-link>${esc(L.sections[i])}</a>`).join('')}</nav>
<div class="project-toolbar"><button type="button" data-project-print hidden>${esc(L.print)}</button></div>
<div class="project-sections">${parts.map(([, id, title, content]) => {
    const body = content.replace(/^### ([a-z0-9-]+) \| (.+)$/gm, (_, anchor, heading) => `<h3 id="${anchor}" tabindex="-1">${esc(heading)}</h3>`);
    const extra = id === 'demo' ? viewer({ lang, id: 'project-reference', assetBase }) : id === 'checklist' ? `<p>${esc(L.checklist)}</p><p role="status" data-project-progress data-suffix="${esc(L.progress)}"></p><p data-project-storage hidden>${esc(L.storage)}</p><ul class="project-checklist">${CHECKLIST.map(([key, en, vi]) => `<li><label><input type="checkbox" data-project-check="${key}"> ${esc(lang === 'vi' ? vi : en)}</label></li>`).join('')}</ul><button type="button" data-project-reset data-confirm="${esc(L.confirm)}" hidden>${esc(L.reset)}</button>` : '';
    return `<section class="project-section" id="${id}" aria-labelledby="${id}-title"><h2 id="${id}-title" tabindex="-1">${esc(title)}</h2>${marked.parse(body)}${extra}</section>`;
  }).join('\n')}</div></div>`;
}