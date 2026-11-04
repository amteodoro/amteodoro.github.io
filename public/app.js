// Shell controller — view switching, chat sidebar, theme.
// The initial view / sidebar / palette are applied by the inline script at the
// top of <body>, before first paint; this file reads them from body[data-*].
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const body = document.body;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  /* ============ THEME ============ */
  const PALETTES = ["bone", "carbon", "red", "cyan"];
  function applyPalette(p, { persist = true } = {}) {
    if (!PALETTES.includes(p)) p = "bone";
    body.dataset.palette = p;
    if (persist) store.set("amt-palette", p);
    document.querySelectorAll(".sw").forEach((sw) => {
      sw.setAttribute("aria-pressed", sw.dataset.pal === p ? "true" : "false");
    });
  }
  // An explicit choice is saved; a system dark-mode default is not, so it keeps
  // following the OS until the visitor picks a theme.
  applyPalette(body.dataset.palette, { persist: false });
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
    dossier:  $("#tab-dossier"),
    terminal: $("#tab-terminal"),
  };
  const phone = window.matchMedia("(max-width: 720px)");

  function syncPanelAccessibility() {
    const dossierActive = body.dataset.view === "dossier";
    const sidebarOpen = body.dataset.sidebar === "open";
    const terminalVisible = !dossierActive || sidebarOpen;
    // On phones the open chat covers the whole screen, so the page behind it
    // must leave the tab order and the accessibility tree too.
    const dossierVisible = dossierActive && !(sidebarOpen && phone.matches);

    [
      [views.terminal, terminalVisible],
      [views.dossier, dossierVisible],
    ].forEach(([panel, visible]) => {
      panel.setAttribute("aria-hidden", visible ? "false" : "true");
      panel.inert = !visible;
    });
  }
  phone.addEventListener("change", syncPanelAccessibility);

  function setView(name, { persist = true } = {}) {
    if (!views[name]) return;
    for (const k in tabs) {
      tabs[k].setAttribute("aria-selected", k === name ? "true" : "false");
      tabs[k].setAttribute("tabindex", k === name ? "0" : "-1");
    }
    body.dataset.view = name;
    syncPanelAccessibility();
    if (persist) store.set("amt-view", name);
    if (name === "terminal" && window.AMT_terminal) {
      setTimeout(() => window.AMT_terminal.focus(), 50);
    }
    if (name === "dossier" && persist) {
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }
  }
  window.AMT_switchView = setView;

  for (const k in tabs) {
    tabs[k].addEventListener("click", () => setView(k));
  }
  // Arrow keys within the tablist
  const order = ["dossier", "terminal"];
  tabs.dossier.parentElement.addEventListener("keydown", (e) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const cur = order.findIndex((n) => tabs[n] === document.activeElement);
    if (cur < 0) return;
    let next = cur;
    if (e.key === "ArrowRight") next = (cur + 1) % order.length;
    if (e.key === "ArrowLeft") next = (cur - 1 + order.length) % order.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = order.length - 1;
    tabs[order[next]].focus();
    setView(order[next]);
  });

  /* ============ CHAT SIDEBAR ============ */
  /* data-sidebar ("open"|"closed") and data-side ("left"|"right") persist in
     localStorage. Side swap: slide out → flip anchor → slide back in. */
  const sidebarToggle = $("#sidebar-toggle");
  function setSidebar(open, opts = {}) {
    const hadTerminalFocus = !!document.activeElement && views.terminal.contains(document.activeElement);
    body.dataset.sidebar = open ? "open" : "closed";
    if (sidebarToggle) sidebarToggle.setAttribute("aria-expanded", open ? "true" : "false");
    syncPanelAccessibility();
    if (!open && hadTerminalFocus && sidebarToggle) sidebarToggle.focus();
    if (!opts.silent) store.set("amt-sidebar", open ? "open" : "closed");
    if (open && window.AMT_terminal) {
      setTimeout(() => window.AMT_terminal.focus(), 320);
    }
  }
  function setSide(side, opts = {}) {
    if (side !== "left" && side !== "right") side = "right";
    body.dataset.side = side;
    if (!opts.silent) store.set("amt-side", side);
  }

  const sidebarSwap  = $("#sidebar-swap");
  const sidebarClose = $("#sidebar-close");
  if (sidebarToggle) sidebarToggle.addEventListener("click", () => setSidebar(true));
  if (sidebarClose)  sidebarClose.addEventListener("click", () => setSidebar(false));
  if (sidebarSwap)   sidebarSwap.addEventListener("click", swapSide);

  let swapping = false;
  function swapSide() {
    if (swapping) return;
    swapping = true;
    body.dataset.swapping = "true";
    const cur = body.dataset.side || "right";
    if (body.dataset.sidebar === "open") {
      setSidebar(false, { silent: true });
      setTimeout(() => {
        setSide(cur === "right" ? "left" : "right");
        // Let CSS pick up the new anchor before sliding back in.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setSidebar(true, { silent: true });
            store.set("amt-sidebar", "open");
            setTimeout(() => {
              body.removeAttribute("data-swapping");
              swapping = false;
            }, 450);
          });
        });
      }, 430);
    } else {
      setSide(cur === "right" ? "left" : "right");
      body.removeAttribute("data-swapping");
      swapping = false;
    }
  }

  /* ============ Keyboard: T = chat, D / P = profile ============ */
  window.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return; // leave Cmd+D, Ctrl+T… to the browser
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    const k = e.key.toLowerCase();
    if (k === "t") setView("terminal");
    if (k === "d" || k === "p") setView("dossier");
  });

  /* ============ Deep links: #profile, #chat, #ask ============ */
  window.addEventListener("hashchange", () => {
    const h = location.hash.slice(1).toLowerCase();
    if (h === "chat" || h === "terminal") setView("terminal");
    else if (h === "profile" || h === "dossier") setView("dossier");
    else if (h === "ask") { setView("dossier"); setSidebar(true); }
  });

  // Sync ARIA / focusability with the state the inline script restored.
  setSide(body.dataset.side, { silent: true });
  setSidebar(body.dataset.sidebar === "open", { silent: true });
  setView(body.dataset.view === "terminal" ? "terminal" : "dossier", { persist: false });
})();
