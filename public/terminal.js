// Interactive terminal — wired to the production chatbot Worker.
// API URL is provided by _config.js (generated from NEXT_PUBLIC_CHATBOT_API_URL at build time).
(function () {
  const $ = (s, r = document) => r.querySelector(s);

  const scrollEl = $("#term-scroll");
  const form = $("#term-form");
  const input = $("#term-input");
  const send = $("#term-send");

  const API_URL = (typeof window !== "undefined" && window.AMT_API_URL) || "";
  const MAX_HISTORY_TURNS = 8;

  let messages = []; // {role: 'system'|'user'|'assistant', content}
  let booted = false;
  let pending = false;
  const asked = new Set();

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
    }[c]));
  }

  // Escape first, then wrap emails / URLs / known bare domains in anchors.
  // ponytail: bare-domain matching is a whitelist, not a general URL parser —
  // extend KNOWN_HOSTS if new domains appear in KB answers.
  const KNOWN_HOSTS = /\b((?:www\.|linkedin\.com|github\.com|scholar\.google\.com|nomly\.xyz|retroreps\.fit|huggingface\.co|amteodoro\.github\.io)[^\s<,)]*)/gi;
  function linkify(s) {
    return escapeHtml(s).replace(
      new RegExp(
        `([a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,})|(https?:\\/\\/[^\\s<]+)|${KNOWN_HOSTS.source}`,
        "gi"
      ),
      (m, email) =>
        email
          ? `<a href="mailto:${email}">${email}</a>`
          : `<a href="${m.startsWith("http") ? m : "https://" + m}" target="_blank" rel="noopener noreferrer">${m}</a>`
    );
  }

  function scrollDown() {
    requestAnimationFrame(() => {
      scrollEl.scrollTop = scrollEl.scrollHeight;
    });
  }

  function addMessage(m) {
    const div = document.createElement("div");
    div.className = "msg " + (m.role === "assistant" ? "assist" : m.role);
    const prefix = document.createElement("span");
    prefix.className = "prefix";
    prefix.textContent =
      m.role === "system"
        ? "// SYSTEM"
        : m.role === "user"
        ? "> YOU"
        : "> AFONSO";
    const body = document.createElement("span");
    body.className = "body";
    if (m.role === "user") {
      body.textContent = m.content;
    } else {
      body.innerHTML = linkify(m.content);
    }
    div.appendChild(prefix);
    div.appendChild(body);
    scrollEl.appendChild(div);
    scrollDown();
    return div;
  }

  function addSuggestions() {
    const wrap = document.createElement("div");
    wrap.className = "suggestions";
    wrap.id = "sug-block";
    const lbl = document.createElement("div");
    lbl.className = "lbl";
    lbl.textContent = "SUGGESTED · QUERIES";
    const row = document.createElement("div");
    row.className = "row";
    const remaining = (window.AMT.suggestedPrompts || []).filter((p) => !asked.has(p));
    if (!remaining.length) return;
    remaining.forEach((p) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "sug";
      b.textContent = p;
      b.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (pending) return;
        input.value = p;
        submit(p);
      });
      row.appendChild(b);
    });
    wrap.appendChild(lbl);
    wrap.appendChild(row);
    scrollEl.appendChild(wrap);
    scrollDown();
  }

  function clearSuggestions() {
    const s = document.getElementById("sug-block");
    if (s) s.remove();
  }

  /* ============ BOOT ============ */
  const BOOT_LINES = [
    "BOOTING TEODORO_AI v2.0.0...",
    "LOADING KNOWLEDGE_BASE..........  [ OK ]",
    "LOADING CONTEXT_ENGINE..........  [ OK ]",
    "LOADING MEMORY_MODULES..........  [ OK ]",
    "ESTABLISHING UPLINK · RAG-WORKER .... [ READY ]",
    "────────────────────────────────────────────",
  ];

  function boot(onDone) {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      BOOT_LINES.forEach((l) => printBootLine(l));
      onDone();
      return;
    }
    let i = 0;
    const step = () => {
      if (i >= BOOT_LINES.length) {
        setTimeout(onDone, 360);
        return;
      }
      printBootLine(BOOT_LINES[i]);
      i++;
      setTimeout(step, 220 + Math.random() * 140);
    };
    step();
  }

  function printBootLine(text) {
    const d = document.createElement("div");
    d.className = "boot-line";
    const html = escapeHtml(text).replace(
      /\[ (OK|READY) \]/g,
      '[ <span class="ok">$1</span> ]'
    );
    d.innerHTML = html;
    scrollEl.appendChild(d);
    scrollDown();
  }

  /* ============ WORKER CHAT ============ */
  async function askWorker(history) {
    if (!API_URL) {
      return "// CHATBOT_OFFLINE — knowledge engine not configured. Email afonso.teodoro91@gmail.com.";
    }
    const last = history[history.length - 1];
    const question = last && last.role === "user" ? last.content : "";
    const prior = history
      .slice(0, -1)
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-MAX_HISTORY_TURNS)
      .map((m) => ({ role: m.role, content: m.content }));
    try {
      const res = await fetch(API_URL.replace(/\/$/, "") + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history: prior }),
      });
      if (!res.ok) throw new Error("API returned " + res.status);
      const data = await res.json();
      return data.answer || "";
    } catch (e) {
      console.error(e);
      return "// LINK ERROR — couldn't reach the knowledge engine. Try again or email afonso.teodoro91@gmail.com.";
    }
  }

  /* ============ FLOW ============ */
  function showTypingIndicator() {
    const div = document.createElement("div");
    div.className = "msg assist typing";
    div.id = "typing-ind";
    const prefix = document.createElement("span");
    prefix.className = "prefix";
    prefix.textContent = "> AFONSO";
    const body = document.createElement("span");
    body.className = "body";
    body.innerHTML = '<span class="dot">▓</span><span class="dot">▓</span><span class="dot">▓</span> <span style="opacity:.5; font-size:11px; letter-spacing:.18em;">PROCESSING…</span>';
    div.appendChild(prefix);
    div.appendChild(body);
    scrollEl.appendChild(div);
    scrollDown();
  }
  function clearTyping() {
    const t = document.getElementById("typing-ind");
    if (t) t.remove();
  }

  async function submit(text) {
    if (!booted || pending) return;
    const q = (text || "").trim();
    if (!q) return;

    const cmd = q.toLowerCase();
    if (cmd === "help" || cmd === "/help") {
      addMessage({ role: "user", content: q });
      addMessage({
        role: "assistant",
        content:
          "Commands: HELP · CLEAR · DOSSIER · WHOAMI · CONTACT. Otherwise ask me anything — projects, the PhD, my stack, what I'm available for.",
      });
      input.value = "";
      return;
    }
    if (cmd === "clear" || cmd === "/clear") {
      messages = [];
      scrollEl.innerHTML = "";
      asked.clear();
      greeting();
      input.value = "";
      return;
    }
    if (cmd === "dossier" || cmd === "/dossier") {
      addMessage({ role: "user", content: q });
      addMessage({
        role: "assistant",
        content: "Switching to the dossier view…",
      });
      input.value = "";
      setTimeout(() => window.AMT_switchView && window.AMT_switchView("dossier"), 600);
      return;
    }
    if (cmd === "whoami") {
      addMessage({ role: "user", content: q });
      addMessage({
        role: "assistant",
        content:
          "Afonso Teodoro — PhD in Computer Science (IST Lisbon). AI Consultant at Nimble Portal. CV, NLP, GenAI. Based in Lisbon.",
      });
      input.value = "";
      return;
    }
    if (cmd === "contact" || cmd === "/contact") {
      addMessage({ role: "user", content: q });
      addMessage({
        role: "assistant",
        content:
          "afonso.teodoro91@gmail.com · linkedin.com/in/afonso-teodoro · github.com/amteodoro",
      });
      input.value = "";
      return;
    }

    clearSuggestions();
    asked.add(q);
    addMessage({ role: "user", content: q });
    messages.push({ role: "user", content: q });
    input.value = "";
    pending = true;
    send.disabled = true;
    input.disabled = true;
    showTypingIndicator();

    const reply = await askWorker(messages);
    clearTyping();
    addMessage({ role: "assistant", content: reply });
    messages.push({ role: "assistant", content: reply });
    addSuggestions();

    pending = false;
    send.disabled = false;
    input.disabled = false;
    input.focus();
  }

  /* ============ INIT ============ */
  function greeting() {
    const g =
      "Hi — I'm a small AI agent trained on Afonso's bio, projects, and papers. " +
      "Ask me anything about his work, the PhD, the stack, or how to get in touch. " +
      "Or switch to the DOSSIER view above for the structured version.";
    messages.push({ role: "system", content: g });
    addMessage({ role: "system", content: g });
    addSuggestions();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submit(input.value);
  });

  scrollEl.addEventListener("click", () => {
    if (booted && !pending) input.focus();
  });

  boot(() => {
    booted = true;
    input.focus();
    greeting();
  });

  window.AMT_terminal = {
    focus() {
      if (booted && !pending) input.focus();
    },
  };
})();
