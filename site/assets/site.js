/* site.js — shared behaviour for the reading pages (ebook, homework, hubs).
 *
 * Only one feature: the light/dark toggle. It deliberately reuses the SAME
 * storage key and the SAME `data-theme` attribute as the slide decks
 * (assets/deck.js), so a lecturer who picks dark on a deck still gets dark
 * when they click through to a chapter, and the other way round.
 *
 * The pre-paint script inlined in <head> is what actually stops the flash of
 * light theme; this file only handles the click.
 *
 * No build step, no dependencies — plain ES5-era syntax so it runs anywhere.
 */
(function () {
  "use strict";

  var KEY_THEME = "ins2053.theme"; // must match slides-html/assets/deck.js
  var root = document.documentElement;

  function applyTheme(name) {
    root.setAttribute("data-theme", name);
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    var labels = document.querySelectorAll("[data-theme-label]");
    var nextName = name === "dark" ? "light" : "dark";
    for (var i = 0; i < buttons.length; i++) {
      // The button is a toggle, so announce its state rather than relying on
      // the visual colour change alone.
      buttons[i].setAttribute("aria-pressed", String(name === "dark"));
      buttons[i].setAttribute("aria-label", "Switch to " + nextName + " theme");
    }
    for (var j = 0; j < labels.length; j++) {
      labels[j].textContent = name === "dark" ? "Light" : "Dark";
    }
  }

  // The inline head script already set the attribute. Re-apply so the buttons
  // pick up their aria-pressed state now that the DOM exists.
  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

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
