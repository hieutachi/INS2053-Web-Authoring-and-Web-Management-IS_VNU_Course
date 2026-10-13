/* Progressive section routing: every section is already rendered for no-JS/print. */
(function () {
  'use strict';
  var hub = document.querySelector('[data-project-hub]');
  if (!hub) return;
  var sections = Array.from(hub.querySelectorAll('.project-section'));
  function route(focus) {
    var id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { id = ''; }
    var target = document.getElementById(id), section = target && target.closest('.project-section');
    if (!section) section = sections[0];
    sections.forEach(function (s) { s.hidden = s !== section; });
    hub.querySelectorAll('[data-project-link]').forEach(function (a) {
      if (a.hash === '#' + section.id) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    document.querySelectorAll('[data-lang-opt][href]').forEach(function (a) {
      a.href = a.href.split('#')[0] + location.hash;
    });
    if (focus) {
      var heading = target && section.contains(target) ? target : section.querySelector('h2');
      if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
      heading.scrollIntoView({ block: 'start' });
    }
  }
  window.addEventListener('hashchange', function () { route(true); });
  route(false);
  var print = hub.querySelector('[data-project-print]');
  print.hidden = false;
  print.addEventListener('click', function () { window.print(); });
  var key = 'ins2053.project.progress.v1', state = {}, storage = true;
  var inputs = Array.from(hub.querySelectorAll('[data-project-check]'));
  try {
    var saved = JSON.parse(localStorage.getItem(key) || '{}');
    if (saved && saved.version === 1 && Array.isArray(saved.done)) saved.done.forEach(function (id) { state[id] = true; });
  } catch (_) { storage = false; }
  function update(save) {
    var done = [];
    inputs.forEach(function (input) { input.checked = state[input.dataset.projectCheck] === true; if (input.checked) done.push(input.dataset.projectCheck); });
    if (save) try { localStorage.setItem(key, JSON.stringify({ version: 1, done: done })); } catch (_) { storage = false; }
    var output = hub.querySelector('[data-project-progress]');
    output.textContent = done.length + ' / ' + inputs.length + ' ' + output.dataset.suffix;
    hub.querySelector('[data-project-storage]').hidden = storage;
  }
  inputs.forEach(function (input) { input.addEventListener('change', function () { state[input.dataset.projectCheck] = input.checked; update(true); }); });
  var reset = hub.querySelector('[data-project-reset]');
  reset.hidden = false;
  reset.addEventListener('click', function () { if (window.confirm(reset.dataset.confirm)) { state = {}; update(true); } });
  window.addEventListener('storage', function (event) {
    if (event.key !== key) return;
    try { var value = JSON.parse(event.newValue || '{}'); state = {}; if (value.version === 1 && Array.isArray(value.done)) value.done.forEach(function (id) { state[id] = true; }); update(false); } catch (_) { /* Ignore invalid external state. */ }
  });
  update(false);
})();