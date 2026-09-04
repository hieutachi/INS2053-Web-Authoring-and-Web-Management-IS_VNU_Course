/* =============================================================================
   INS2053 — HTML lecture deck behaviour
   Progressive enhancement only: every slide is readable with JS disabled.
     - theme toggle (persisted in localStorage)
     - speaker-notes toggle (persisted)
     - TOC filter, active-slide tracking, reading progress
     - j / k / ArrowDown / ArrowUp slide navigation, / to focus filter
   ============================================================================= */

(function () {
  "use strict";

  var KEY_THEME = "ins2053.theme";
  var KEY_NOTES = "ins2053.notes";
  var root = document.documentElement;

  /* --- theme -------------------------------------------------------------- */
  function applyTheme(name) {
    root.setAttribute("data-theme", name);
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute("aria-pressed", String(name === "dark"));
      var label = btn.querySelector(".btn-label");
      if (label) label.textContent = name === "dark" ? "Dark" : "Light";
    }
  }

  var storedTheme = null;
  try {
    storedTheme = localStorage.getItem(KEY_THEME);
  } catch (e) {
    /* private mode: fall back to the OS preference */
  }
  applyTheme(
    storedTheme ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(KEY_THEME, next);
      } catch (e) {}
    });
  }

  /* --- speaker notes ------------------------------------------------------ */
  var notesBtn = document.getElementById("notes-toggle");
  function applyNotes(hidden) {
    document.body.classList.toggle("notes-hidden", hidden);
    if (notesBtn) notesBtn.setAttribute("aria-pressed", String(!hidden));
  }
  if (notesBtn) {
    var storedNotes = null;
    try {
      storedNotes = localStorage.getItem(KEY_NOTES);
    } catch (e) {}
    applyNotes(storedNotes === "hidden");
    notesBtn.addEventListener("click", function () {
      var hidden = !document.body.classList.contains("notes-hidden");
      applyNotes(hidden);
      try {
        localStorage.setItem(KEY_NOTES, hidden ? "hidden" : "shown");
      } catch (e) {}
    });
  }

  /* --- expand / collapse all notes --------------------------------------- */
  var expandBtn = document.getElementById("expand-toggle");
  if (expandBtn) {
    expandBtn.addEventListener("click", function () {
      var items = document.querySelectorAll(".slide-notes");
      var open = expandBtn.getAttribute("aria-pressed") !== "true";
      for (var i = 0; i < items.length; i++) items[i].open = open;
      expandBtn.setAttribute("aria-pressed", String(open));
      var label = expandBtn.querySelector(".btn-label");
      if (label) label.textContent = open ? "Collapse notes" : "Expand notes";
    });
  }

  /* --- TOC filter -------------------------------------------------------- */
  var search = document.getElementById("toc-search");
  var tocItems = [].slice.call(document.querySelectorAll(".toc-list li"));
  var tocEmpty = document.getElementById("toc-empty");
  if (search && tocItems.length) {
    search.addEventListener("input", function () {
      var q = search.value.trim().toLowerCase();
      var shown = 0;
      tocItems.forEach(function (li) {
        var hit = !q || li.textContent.toLowerCase().indexOf(q) !== -1;
        li.classList.toggle("is-hidden", !hit);
        if (hit) shown++;
      });
      if (tocEmpty) tocEmpty.hidden = shown !== 0;
    });
  }

  /* --- active slide + progress ------------------------------------------- */
  var slides = [].slice.call(document.querySelectorAll(".slide"));
  var links = {};
  [].slice.call(document.querySelectorAll(".toc-list a")).forEach(function (a) {
    links[a.getAttribute("href").slice(1)] = a;
  });
  var bar = document.getElementById("progress-bar");
  var counter = document.getElementById("slide-counter");
  var current = -1;

  function setCurrent(i) {
    if (i === current || i < 0 || i >= slides.length) return;
    if (current >= 0) {
      slides[current].classList.remove("is-current");
      var prev = links[slides[current].id];
      if (prev) prev.classList.remove("is-current");
    }
    current = i;
    slides[i].classList.add("is-current");
    var link = links[slides[i].id];
    if (link) {
      link.classList.add("is-current");
      if (link.scrollIntoView)
        link.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
    if (counter) counter.textContent = i + 1 + " / " + slides.length;
    if (bar) bar.style.width = ((i + 1) / slides.length) * 100 + "%";
  }

  if (slides.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          var best = null;
          entries.forEach(function (en) {
            if (
              en.isIntersecting &&
              (!best || en.intersectionRatio > best.intersectionRatio)
            )
              best = en;
          });
          if (best) setCurrent(slides.indexOf(best.target));
        },
        { rootMargin: "-84px 0px -55% 0px", threshold: [0.01, 0.25, 0.6] }
      );
      slides.forEach(function (s) {
        io.observe(s);
      });
    }
    setCurrent(0);
  }

  /* --- keyboard navigation ---------------------------------------------- */
  function go(delta) {
    var next = Math.min(Math.max(current + delta, 0), slides.length - 1);
    if (next === current) return;
    slides[next].scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrent(next);
  }

  document.addEventListener("keydown", function (ev) {
    var tag = (ev.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") {
      if (ev.key === "Escape") ev.target.blur();
      return;
    }
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;

    switch (ev.key) {
      case "j":
      case "ArrowDown":
      case "PageDown":
        ev.preventDefault();
        go(1);
        break;
      case "k":
      case "ArrowUp":
      case "PageUp":
        ev.preventDefault();
        go(-1);
        break;
      case "g":
        ev.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setCurrent(0);
        break;
      case "G":
        ev.preventDefault();
        go(slides.length);
        break;
      case "/":
        if (search) {
          ev.preventDefault();
          search.focus();
          search.select();
        }
        break;
      case "t":
        if (themeBtn) themeBtn.click();
        break;
      case "n":
        if (notesBtn) notesBtn.click();
        break;
      default:
        break;
    }
  });

  /* --- back to top ------------------------------------------------------- */
  var top = document.getElementById("backtotop");
  if (top) {
    top.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    var onScroll = function () {
      top.classList.toggle("is-visible", window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();

