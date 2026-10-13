/* Trusted build-time srcdoc only. No allow-scripts, allow-forms or top navigation. */
(function () {
  'use strict';
  document.querySelectorAll('[data-demo-viewer]').forEach(function (viewer) {
    var frame = viewer.querySelector('iframe'), status = viewer.querySelector('[data-demo-status]');
    var docs = new Map();
    var bound = new WeakSet(), pendingHash = '';
    viewer.querySelectorAll('[data-demo-document]').forEach(function (template) { docs.set(template.dataset.demoDocument, template.content.textContent); });
    viewer.querySelector('[data-viewer-controls]').hidden = false;
    function select(id, hash) {
      if (!docs.has(id)) return;
      pendingHash = hash || '';
      frame.srcdoc = docs.get(id);
      viewer.querySelectorAll('[data-demo-page]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.demoPage === id)); });
      status.textContent = (id === 'index' ? 'Home' : id) + ' — ' + frame.title;
    }
    function bind() {
      var doc = frame.contentDocument;
      if (!doc) return;
      if (pendingHash) { var target = doc.getElementById(pendingHash); if (target) target.scrollIntoView(); pendingHash = ''; }
      if (bound.has(doc)) return;
      bound.add(doc);
      doc.addEventListener('click', function (event) {
        var a = event.target.closest('a');
        if (a) {
          event.preventDefault();
          var href = a.getAttribute('href') || '';
          if (href.charAt(0) === '#') { var el = doc.getElementById(href.slice(1)); if (el) el.scrollIntoView(); return; }
          var match = /^([a-z]+)\.html(?:#([a-z0-9-]+))?$/.exec(href);
          if (match && docs.has(match[1])) select(match[1], match[2]);
          return;
        }
        // In-frame buttons cannot run scripts. Delegate approved simulations only.
        if (event.target.closest('[data-reference-check]')) { event.preventDefault(); validate(); }
        if (event.target.closest('[data-reference-clear]')) { event.preventDefault(); clear(); }
      });
      doc.addEventListener('submit', function (event) { event.preventDefault(); validate(); });
      doc.querySelectorAll('input[type="file"]').forEach(function (input) { input.disabled = true; });
    }
    function validate() {
      var doc = frame.contentDocument, controls = doc ? Array.from(doc.querySelectorAll('input,select,textarea')) : [];
      var invalid = controls.find(function (input) { return !input.disabled && !input.checkValidity(); });
      status.textContent = invalid ? status.dataset.invalid : status.dataset.valid;
      if (invalid) invalid.reportValidity();
    }
    function clear() {
      var doc = frame.contentDocument;
      if (!doc) return;
      doc.querySelectorAll('input,select,textarea').forEach(function (input) {
        if (/checkbox|radio/.test(input.type)) input.checked = false;
        else if (input.tagName === 'SELECT') input.selectedIndex = 0;
        else input.value = '';
      });
      status.textContent = '';
    }
    viewer.addEventListener('click', function (event) {
      var button = event.target.closest('button');
      if (!button) return;
      if (button.dataset.demoPage) select(button.dataset.demoPage);
      if (button.dataset.demoWidth) {
        frame.style.width = button.dataset.demoWidth === 'fit' ? '100%' : button.dataset.demoWidth + 'px';
        viewer.querySelectorAll('[data-demo-width]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === button)); });
      }
      if (button.hasAttribute('data-demo-validate')) validate();
      if (button.hasAttribute('data-demo-clear')) clear();
    });
    frame.addEventListener('load', bind);
    bind();
  });
})();