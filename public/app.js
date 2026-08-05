// Shell controller — view switching, cursor probes, live clock.
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ============ PALETTE SWITCHER ============ */
  const PALETTES = ["bone", "carbon", "red", "cyan"];
  function applyPalette(p) {
    if (!PALETTES.includes(p)) p = "bone";
    document.body.dataset.palette = p;
    try { localStorage.setItem("amt-palette", p); } catch (e) {}
    document.querySelectorAll(".sw").forEach((sw) => {
      sw.setAttribute("aria-pressed", sw.dataset.pal === p ? "true" : "false");
    });
  }
  const savedPalette = (() => {
    try { return localStorage.getItem("amt-palette"); } catch (e) { return null; }
  })();
  applyPalette(savedPalette || "bone");
  document.querySelectorAll(".sw").forEach((sw) => {
    sw.addEventListener("click", (e) => {
      e.preventDefault();
      applyPalette(sw.dataset.pal);
    });
  });

  /* ============ VIEW SWITCH ============ */
  const views = {
    terminal: $("#view-terminal"),
    dossier:  $("#view-dossier"),
  };
  const tabs = {
    terminal: $("#tab-terminal"),
    dossier:  $("#tab-dossier"),
  };

  function syncPanelAccessibility() {
    const dossierActive = document.body.dataset.view === "dossier";
    const sidebarOpen = document.body.dataset.sidebar === "open";
    const terminalVisible = !dossierActive || sidebarOpen;

    [
      [views.terminal, terminalVisible],
      [views.dossier, dossierActive],
    ].forEach(([panel, visible]) => {
      panel.setAttribute("aria-hidden", visible ? "false" : "true");
      panel.inert = !visible;
    });
  }

  function setView(name) {
    if (!views[name]) return;
    // The terminal is ALWAYS rendered — its layout changes via body data attrs.
    // Dossier uses opacity + visibility for the smooth crossfade.
    views.terminal.classList.remove("hidden");
    views.dossier.classList.remove("hidden");
    for (const k in tabs) {
      tabs[k].setAttribute("aria-selected", k === name ? "true" : "false");
      tabs[k].setAttribute("tabindex", k === name ? "0" : "-1");
    }
    document.body.dataset.view = name;
    syncPanelAccessibility();
    try { localStorage.setItem("amt-view", name); } catch (e) {}
    if (name === "terminal" && window.AMT_terminal) {
      setTimeout(() => window.AMT_terminal.focus(), 50);
    }
    if (name === "dossier") {
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }
  }
  window.AMT_switchView = setView;

  for (const k in tabs) {
    tabs[k].addEventListener("click", () => setView(k));
  }
  // Arrow nav within tablist
  const tabbar = tabs.terminal.parentElement;
  tabbar.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
      e.preventDefault();
      const order = ["terminal", "dossier"];
      const cur = order.findIndex((n) => tabs[n] === document.activeElement);
      if (cur < 0) return;
      let next = cur;
      if (e.key === "ArrowRight") next = (cur + 1) % order.length;
      if (e.key === "ArrowLeft") next = (cur - 1 + order.length) % order.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = order.length - 1;
      tabs[order[next]].focus();
      setView(order[next]);
    }
  });

  /* ============ CURSOR PROBES ============ */
  const tickV = $("#tick-v");
  const tickH = $("#tick-h");
  const probeTop = $("#probe-top");
  const cursorReadout = $("#cursor-readout");

  function pad(n, w) {
    n = Math.max(0, Math.floor(n));
    return String(n).padStart(w, "0");
  }
  let lastMove = 0;
  let probesShown = false;
  window.addEventListener("mousemove", (e) => {
    const now = performance.now();
    if (now - lastMove < 16) return;
    lastMove = now;
    const x = e.clientX, y = e.clientY;
    tickV.style.left = x + "px";
    tickH.style.top = y + "px";
    probeTop.style.left = x + "px";
    probeTop.textContent = pad(x, 4);
    const cursor = pad(x, 4) + "," + pad(y, 4);
    cursorReadout.textContent = cursor;
    cursorReadout.setAttribute("aria-label", "Cursor " + cursor);
    if (!probesShown) {
      tickV.classList.add("visible");
      tickH.classList.add("visible");
      probeTop.classList.add("visible");
      probesShown = true;
    }
  }, { passive: true });

  // hide probes on touch devices
  let touched = false;
  window.addEventListener("touchstart", () => {
    if (touched) return;
    touched = true;
    tickV.style.display = "none";
    tickH.style.display = "none";
    probeTop.style.display = "none";
  }, { passive: true });

  /* ============ TERMINAL SIDEBAR ============ */
  /* Two-state machine: data-sidebar ("open"|"closed") and data-side
     ("left"|"right"). Both persist in localStorage. Side swap runs a
     two-stage animation: slide out → flip anchor → slide back in. */
  function setSidebar(open, opts = {}) {
    const hadTerminalFocus = !!document.activeElement && views.terminal.contains(document.activeElement);
    document.body.dataset.sidebar = open ? "open" : "closed";
    const toggle = $("#sidebar-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
    syncPanelAccessibility();
    if (!open && hadTerminalFocus && toggle) toggle.focus();
    if (!opts.silent) {
      try { localStorage.setItem("amt-sidebar", open ? "open" : "closed"); } catch (e) {}
    }
    if (open && window.AMT_terminal) {
      setTimeout(() => window.AMT_terminal.focus(), 320);
    }
  }
  function setSide(side, opts = {}) {
    if (side !== "left" && side !== "right") side = "right";
    document.body.dataset.side = side;
    if (!opts.silent) {
      try { localStorage.setItem("amt-side", side); } catch (e) {}
    }
  }

  // Restore from storage (defaults: right, closed)
  let savedSide = "right";
  let savedSidebar = "closed";
  try {
    savedSide = localStorage.getItem("amt-side") || savedSide;
    savedSidebar = localStorage.getItem("amt-sidebar") || savedSidebar;
  } catch (e) {}
  setSide(savedSide, { silent: true });
  setSidebar(savedSidebar === "open", { silent: true });

  const sidebarToggle = $("#sidebar-toggle");
  const sidebarSwap   = $("#sidebar-swap");
  const sidebarClose  = $("#sidebar-close");
  if (sidebarToggle) sidebarToggle.addEventListener("click", () => setSidebar(true));
  if (sidebarClose)  sidebarClose.addEventListener("click", () => setSidebar(false));
  if (sidebarSwap)   sidebarSwap.addEventListener("click", swapSide);

  let swapping = false;
  function swapSide() {
    if (swapping) return;
    swapping = true;
    document.body.dataset.swapping = "true";
    const cur = document.body.dataset.side || "right";
    const wasOpen = document.body.dataset.sidebar === "open";
    if (wasOpen) {
      // Slide out on current side
      setSidebar(false, { silent: true });
      // After slide-out completes, flip anchor and slide back in
      setTimeout(() => {
        setSide(cur === "right" ? "left" : "right");
        // Force a paint between side flip and reopen so CSS picks up the
        // new anchor before transform animates back to 0.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setSidebar(true, { silent: true });
            // Persist desired state once everything settled
            try { localStorage.setItem("amt-sidebar", "open"); } catch (e) {}
            setTimeout(() => {
              document.body.removeAttribute("data-swapping");
              swapping = false;
            }, 450);
          });
        });
      }, 430);
    } else {
      // If closed, just flip the side
      setSide(cur === "right" ? "left" : "right");
      document.body.removeAttribute("data-swapping");
      swapping = false;
    }
  }

  /* ============ LIVE UTC CLOCK ============ */
  const clockEl = $("#utc-clock");
  function tick() {
    const d = new Date();
    const hh = pad(d.getUTCHours(), 2);
    const mm = pad(d.getUTCMinutes(), 2);
    const ss = pad(d.getUTCSeconds(), 2);
    const utc = hh + ":" + mm + ":" + ss + "Z";
    clockEl.textContent = utc;
    clockEl.setAttribute("aria-label", "UTC " + utc);
  }
  tick(); setInterval(tick, 1000);

  /* ============ OFFLINE DETECT ============ */
  function setLink() {
    const ok = navigator.onLine !== false;
    const state = ok ? "ONLINE" : "OFFLINE";
    const linkState = $("#link-state");
    linkState.textContent = state;
    linkState.setAttribute("aria-label", "Network status: " + state.toLowerCase());
  }
  setLink();
  window.addEventListener("online",  setLink);
  window.addEventListener("offline", setLink);

  /* ============ Keyboard: ESC focuses terminal, T/D switch ============ */
  window.addEventListener("keydown", (e) => {
    // Don't hijack when typing in inputs/textareas
    const tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (e.key === "t" || e.key === "T") setView("terminal");
    if (e.key === "d" || e.key === "D") setView("dossier");
  });

  // Default view
  let savedView = null;
  try { savedView = localStorage.getItem("amt-view"); } catch (e) {}
  setView(savedView === "dossier" ? "dossier" : "terminal");
})();
