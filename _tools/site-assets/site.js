/* site.js — shared behaviour for the reading pages (ebook, homework, hubs).
 *
 * Three small features: the light/dark toggle, the language switch's memory,
 * the current-section marker and a reading-progress bar.
 *
 * The theme toggle deliberately reuses the SAME storage key and the SAME
 * `data-theme` attribute as the slide decks (assets/deck.js), so a lecturer who
 * picks dark on a deck still gets dark when they click through to a chapter,
 * and the other way round.
 *
 * Language is handled the other way round from theme: the switch is a set of
 * real links, so it works with scripting off and lands the reader on the same
 * document in the other language rather than on a home page. This file only
 * REMEMBERS the choice, which the pre-paint script inlined in <head> then
 * honours on later navigations.
 *
 * No build step, no dependencies — plain ES5-era syntax so it runs anywhere.
 * Everything language-specific is read from data-* attributes the generator
 * writes, because this one file serves both the English and the Vietnamese
 * tree and must not hard-code either language's wording.
 */
(function () {
  "use strict";

  var KEY_THEME = "ins2053.theme"; // must match slides-html/assets/deck.js
  var KEY_LANG = "ins2053.lang"; // must match the pre-paint script in page()
  var root = document.documentElement;

  function text(el, attribute, value) {
    if (el && value) el.setAttribute(attribute, value);
  }

  function applyTheme(name) {
    root.setAttribute("data-theme", name);
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    var labels = document.querySelectorAll("[data-theme-label]");
    var dark = name === "dark";
    for (var i = 0; i < buttons.length; i++) {
      // The button is a toggle, so announce its state rather than relying on
      // the visual colour change alone. The wording itself comes from the page:
      // a Vietnamese page must not be relabelled back into English here.
      buttons[i].setAttribute("aria-pressed", String(dark));
      text(
        buttons[i],
        "aria-label",
        buttons[i].getAttribute(dark ? "data-word-light" : "data-word-dark")
      );
    }
    for (var j = 0; j < labels.length; j++) {
      var next =
        labels[j].parentNode &&
        labels[j].parentNode.getAttribute(dark ? "data-label-light" : "data-label-dark");
      if (next) labels[j].textContent = next;
    }
  }

  // The inline head script already set the attribute. Re-apply so the buttons
  // pick up their aria-pressed state now that the DOM exists.
  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

  /* Remember an explicit language pick. Without this the page would happily
     navigate once and forget, so a reader who chose Vietnamese would be served
     English again on their next deep link. The links themselves do the
     navigating; this only records the preference for the pre-paint script. */
  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("[data-lang-opt]");
    if (!link || !link.hasAttribute("href")) return;
    try {
      localStorage.setItem(KEY_LANG, link.getAttribute("data-lang-opt"));
    } catch (err) {
      /* Private browsing throws on write; the link still works. */
    }
  });

  // Mark the current resource section in the persistent course navigation.
  var section = window.location.pathname.match(/\/(sessions|ebook|slides|homework)\//);
  if (section) {
    var current = document.querySelector('[data-course-nav="' + section[1] + '"]');
    if (current) current.setAttribute("aria-current", "page");
  }

  // Long chapters and homework sheets get a quiet reading-progress indicator.
  var progress = document.querySelector("[data-reading-progress]");
  function updateProgress() {
    if (!progress) return;
    var doc = document.documentElement;
    var distance = doc.scrollHeight - doc.clientHeight;
    var percent = distance > 0 ? Math.min(100, Math.max(0, doc.scrollTop / distance * 100)) : 0;
    progress.style.width = percent + "%";
  }
  if (progress) {
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest("[data-theme-toggle]");
    if (!button) return;

    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);

    // Private browsing and some locked-down school machines throw on write.
    // A failed save must not break the toggle for the rest of the session.
    try {
      localStorage.setItem(KEY_THEME, next);
    } catch (err) {
      /* ignore */
    }
  });
})();

/* ---- shared empty state for tables ----------------------------------------
   The build already gives every markdown table its empty row (see
   _tools/table-empty-state.mjs); this pass covers tables that appear after
   it. Same classes, same strings, so the two can never disagree visually.
   Idempotent: a table that already carries a body row is left alone, which
   includes the row the build injected. */
(function () {
  var EMPTY_TITLE = "No rows to display";
  var EMPTY_TEXT = "This table is empty.";
  var EMPTY_ICON =
    '<svg class="table-empty-icon" viewBox="0 0 24 24" width="28" height="28" fill="none" ' +
    'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ' +
    'aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"></rect>' +
    '<path d="M3 9h18"></path><path d="M3 14h18"></path><path d="M9 9v11"></path></svg>';

  function columnCount(table) {
    var n = 0;
    var head = table.tHead && table.tHead.rows[0];
    if (head) {
      for (var i = 0; i < head.cells.length; i++) n += head.cells[i].colSpan || 1;
      if (n) return n;
    }
    for (var r = 0; r < table.rows.length; r++) {
      var row = table.rows[r];
      if (table.tHead && table.tHead.contains(row)) continue;
      return Math.max(1, row.cells.length);
    }
    return 1;
  }

  document.querySelectorAll("table").forEach(function (table) {
    var dataRows = 0;
    for (var i = 0; i < table.rows.length; i++) {
      if (!(table.tHead && table.tHead.contains(table.rows[i]))) dataRows++;
    }
    if (dataRows > 0) return;

    var body = table.tBodies[0] || table.appendChild(document.createElement("tbody"));
    var tr = document.createElement("tr");
    tr.className = "table-empty-row";
    var td = document.createElement("td");
    td.className = "table-empty-cell";
    td.colSpan = columnCount(table);
    // Static markup only — no user data ever reaches this string.
    td.innerHTML =
      '<div class="table-empty">' + EMPTY_ICON +
      '<span class="table-empty-title">' + EMPTY_TITLE + "</span> " +
      '<span class="table-empty-text">' + EMPTY_TEXT + "</span></div>";
    tr.appendChild(td);
    body.appendChild(tr);
  });
})();
