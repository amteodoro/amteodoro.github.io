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
  // The model sometimes answers with markdown; show bullets as bullets and drop ** markers.
  function tidy(s) {
    return String(s)
      .replace(/^[ \t]*[-*][ \t]+/gm, "• ")
      .replace(/\*\*(.+?)\*\*/g, "$1");
  }

  // Lines starting with "• " become indented list rows (input is already escaped HTML).
  function bulletize(html) {
    let out = "";
    for (const line of html.split("\n")) {
      out += line.startsWith("• ") ? `<span class="li">${line.slice(2)}</span>` : line + "\n";
    }
    return out.replace(/\n+$/, "");
  }

  function linkify(s) {
    return escapeHtml(s).replace(
      new RegExp(
        `([a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,})|(https?:\\/\\/[^\\s<]+)|${KNOWN_HOSTS.source}`,
        "gi"
      ),
      (m, email) => {
        if (email) return `<a href="mailto:${email}">${email}</a>`;
        // Sentence punctuation after a URL ("...detection.") is not part of it.
        const trail = (m.match(/[.,;:!?]+$/) || [""])[0];
        const url = trail ? m.slice(0, -trail.length) : m;
        const href = url.startsWith("http") ? url : "https://" + url;
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>${trail}`;
      }
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
    if (m.role === "assistant") {
      div.setAttribute("role", "status");
      div.setAttribute("aria-live", "polite");
      div.setAttribute("aria-atomic", "true");
    }
    const prefix = document.createElement("span");
    prefix.className = "prefix";
    prefix.textContent =
      m.role === "system"
        ? "ABOUT"
        : m.role === "user"
        ? "> YOU"
        : "> AFONSO·AI";
    const body = document.createElement("span");
    body.className = "body";
    if (m.role === "user") {
      body.textContent = m.content;
    } else {
      body.innerHTML = bulletize(linkify(tidy(m.content)));
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
    lbl.textContent = "TRY ASKING";
    const row = document.createElement("div");
    row.className = "row";
    row.setAttribute("role", "list");
    row.setAttribute("aria-label", "Suggested questions");
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
      const item = document.createElement("div");
      item.setAttribute("role", "listitem");
      item.appendChild(b);
      row.appendChild(item);
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

  /* ============ STATUS ============ */
  // One real status line (from the API health check) instead of a boot sequence.
  const linkState = document.getElementById("link-state");
  function setLinkState(text) {
    if (linkState) linkState.textContent = text;
  }
  let apiOnline = Boolean(API_URL);
  const healthCheck = !API_URL
    ? Promise.resolve(false)
    : fetch(API_URL.replace(/\/$/, "") + "/health", { signal: AbortSignal.timeout(5000) })
        .then((r) => r.ok)
        .catch(() => false);

  function boot(onDone) {
    healthCheck.then((ok) => {
      apiOnline = ok;
      setLinkState(ok ? "READY" : "OFFLINE");
      printBootLine(
        ok
          ? "KNOWLEDGE BASE · WORK, PROJECTS, PAPERS .... [ READY ]"
          : "KNOWLEDGE BASE · WORK, PROJECTS, PAPERS .... [ OFFLINE ]"
      );
      onDone();
    });
  }

  function terminalIsVisible() {
    // body[data-view|data-sidebar] are restored before first paint (inline script).
    return document.body.dataset.view === "terminal" || document.body.dataset.sidebar === "open";
  }

  function printBootLine(text) {
    const d = document.createElement("div");
    d.className = "boot-line";
    const html = escapeHtml(text).replace(
      /\[ (OK|READY|OFFLINE) \]/g,
      '[ <span class="ok">$1</span> ]'
    );
    d.innerHTML = html;
    scrollEl.appendChild(d);
    scrollDown();
  }

  /* ============ WORKER CHAT ============ */
  async function askWorker(history) {
    if (!API_URL) {
      return "The assistant isn't available right now. The PROFILE has everything, or email afonso.teodoro91@gmail.com.";
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
        signal: AbortSignal.timeout(45000),
      });
      if (res.status === 429) {
        return "That's a lot of questions in a short time. Give it a minute, or email afonso.teodoro91@gmail.com.";
      }
      if (res.status === 400) {
        const data = await res.json().catch(() => ({}));
        return data.error || "I couldn't process that question. Try rephrasing it.";
      }
      if (!res.ok) throw new Error("API returned " + res.status);
      const data = await res.json();
      return data.answer || "";
    } catch (e) {
      console.error(e);
      return "I couldn't reach the assistant. Try again in a moment, or email afonso.teodoro91@gmail.com.";
    }
  }

  /* ============ FLOW ============ */
  function showTypingIndicator() {
    const div = document.createElement("div");
    div.className = "msg assist typing";
    div.id = "typing-ind";
    const prefix = document.createElement("span");
    prefix.className = "prefix";
    prefix.textContent = "> AFONSO·AI";
    const body = document.createElement("span");
    body.className = "body";
    body.innerHTML = '<span class="dot">▓</span><span class="dot">▓</span><span class="dot">▓</span> <span class="typing-lbl">THINKING…</span>';
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
          "Commands: HELP · CLEAR · PROFILE · WHOAMI · CONTACT. Otherwise ask me anything — projects, the PhD, my stack, what I'm available for.",
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
    if (["dossier", "/dossier", "profile", "/profile"].includes(cmd)) {
      addMessage({ role: "user", content: q });
      addMessage({
        role: "assistant",
        content: "Switching to the profile view…",
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
          "Afonso Teodoro — AI engineer with a PhD in Electrical and Computer Engineering (IST Lisbon). Production computer-vision, NLP and LLM systems since 2019, currently as an AI consultant at Nimble Portal. Based in Lisbon; open to senior, lead and founding AI roles.",
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
    const answerEl = addMessage({ role: "assistant", content: reply });
    messages.push({ role: "assistant", content: reply });
    addSuggestions();
    requestAnimationFrame(() => {
      // .term-scroll is position:relative, so offsetTop is already relative to it.
      scrollEl.scrollTop = Math.max(0, answerEl.offsetTop - 12);
    });

    pending = false;
    send.disabled = false;
    input.disabled = false;
    if (!coarse) input.focus();
  }

  /* ============ INIT ============ */
  function greeting() {
    const g =
      "Hi, I'm Afonso's AI assistant and I answer as him, from his own notes on his work, projects and papers. " +
      "Ask me about my experience, projects, the PhD, my stack or availability." +
      (apiOnline
        ? ""
        : "\n\nHeads-up: the knowledge base is unreachable right now. The PROFILE has everything, or email afonso.teodoro91@gmail.com.");
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

  // Touch devices: don't pop the keyboard up just because the chat opened on load.
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  form.addEventListener("click", (e) => {
    if (e.target === form && booted && !pending) input.focus();
  });

  boot(() => {
    booted = true;
    if (terminalIsVisible() && !coarse) input.focus();
    greeting();
  });

  window.AMT_terminal = {
    focus() {
      // Phones: let the visitor read the suggestions first; they tap the box to type.
      if (booted && !pending && terminalIsVisible() && !coarse) input.focus();
    },
  };
})();
