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
    for (var i = 0; i < buttons.length; i++) {
      // The button is a toggle, so announce its state rather than relying on
      // the visual colour change alone.
      buttons[i].setAttribute("aria-pressed", String(name === "dark"));
    }
  }

  // The inline head script already set the attribute. Re-apply so the buttons
  // pick up their aria-pressed state now that the DOM exists.
  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

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
