// Renders the dossier sections from window.AMT data.
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const k in attrs) {
      if (k === "class") n.className = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k.startsWith("on") && typeof attrs[k] === "function")
        n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] === true) n.setAttribute(k, "");
      else if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    }
    for (const kid of kids) {
      if (kid == null) continue;
      if (typeof kid === "string") n.appendChild(document.createTextNode(kid));
      else n.appendChild(kid);
    }
    return n;
  };

  /* ============ EXPERIENCE ============ */
  function renderExperience() {
    const root = $("#exp-axis");
    if (!root) return;
    root.innerHTML = "";
    window.AMT.experience.forEach((e, i) => {
      const yearBlock = el(
        "div",
        { class: "exp-year" },
        document.createTextNode(e.start),
        el(
          "span",
          { class: "end" },
          e.end === "PRESENT" ? "→ PRESENT" : `→ ${e.end}`
        ),
        el("span", { class: "tag" }, e.tag)
      );

      const row = el(
        "div",
        { class: "exp-row" },
        yearBlock,
        el(
          "div",
          {},
          el("h3", { class: "exp-role" }, e.role),
          el("div", { class: "exp-org" }, e.org),
          el("p", { class: "exp-desc" }, e.desc),
          e.points
            ? el("ul", { class: "exp-points" },
                ...e.points.map(([lead, rest]) => el("li", {}, el("b", {}, lead), rest)))
            : null
        )
      );
      root.appendChild(row);
    });
  }

  /* ============ PROJECT SCHEMATICS ============ */
  // Lightweight, on-brand SVG diagrams per project.
  // No literal product art — strictly schematic / technical.

  function schematicScan() {
    // Barcode scan + 3-state gluten verdict (FREE / CAUTION / CONTAINS).
    // The verdict cycles every ~6s, mirroring the live app's decision flow.
    return `
<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <defs>
    <pattern id="g-scan" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--dim)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="400" height="300" fill="url(#g-scan)"/>

  <!-- BARCODE -->
  <g transform="translate(36,52)" stroke="var(--ink)" stroke-width="2">
    <line x1="0"   y1="0" x2="0"   y2="88"/>
    <line x1="6"   y1="0" x2="6"   y2="88"/>
    <line x1="14"  y1="0" x2="14"  y2="88" stroke-width="3"/>
    <line x1="22"  y1="0" x2="22"  y2="88"/>
    <line x1="28"  y1="0" x2="28"  y2="88" stroke-width="3"/>
    <line x1="36"  y1="0" x2="36"  y2="88"/>
    <line x1="42"  y1="0" x2="42"  y2="88" stroke-width="3"/>
    <line x1="50"  y1="0" x2="50"  y2="88"/>
    <line x1="56"  y1="0" x2="56"  y2="88" stroke-width="3"/>
    <line x1="64"  y1="0" x2="64"  y2="88"/>
    <line x1="70"  y1="0" x2="70"  y2="88"/>
    <line x1="78"  y1="0" x2="78"  y2="88" stroke-width="3"/>
    <line x1="86"  y1="0" x2="86"  y2="88"/>
    <line x1="92"  y1="0" x2="92"  y2="88" stroke-width="3"/>
    <line x1="100" y1="0" x2="100" y2="88"/>
  </g>
  <text x="36" y="160" font-family="JetBrains Mono" font-size="9" letter-spacing="2" fill="var(--ink)">5 901234 567893</text>

  <!-- SCAN BEAM -->
  <rect x="30" y="60" width="112" height="2" fill="var(--ink)">
    <animate attributeName="y" values="50;144;50" dur="2.4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite"/>
  </rect>

  <!-- ARROW -->
  <g stroke="var(--ink)" stroke-width="1.5" fill="none">
    <line x1="160" y1="100" x2="218" y2="100"/>
    <polyline points="210,94 218,100 210,106"/>
  </g>

  <!-- VERDICT PANEL -->
  <g transform="translate(232,40)">
    <rect x="0" y="0" width="140" height="120" fill="var(--bg)" stroke="var(--ink)" stroke-width="1.5"/>
    <text x="10" y="16" font-family="JetBrains Mono" font-size="8" letter-spacing="2" fill="var(--muted)">VERDICT</text>

    <!-- 3-state vertical switch -->
    <g transform="translate(14,28)">
      <!-- track -->
      <rect x="0" y="0" width="10" height="82" fill="var(--bg)" stroke="var(--ink)" stroke-width="1"/>
      <line x1="0" y1="27" x2="10" y2="27" stroke="var(--ink)" stroke-width="1"/>
      <line x1="0" y1="55" x2="10" y2="55" stroke="var(--ink)" stroke-width="1"/>
      <!-- thumb -->
      <rect x="-3" y="4" width="16" height="18" fill="var(--ink)">
        <animate attributeName="y" values="4;32;60;32;4;4" keyTimes="0;0.2;0.4;0.6;0.8;1" dur="7.2s" repeatCount="indefinite"/>
      </rect>
    </g>

    <!-- 3 labels with dot LEDs -->
    <g transform="translate(38,30)" font-family="JetBrains Mono" font-size="10" letter-spacing="1" fill="var(--ink)">
      <!-- GLUTEN FREE -->
      <g>
        <circle cx="0" cy="8" r="3.5" fill="var(--ink)" stroke="var(--ink)" stroke-width="1">
          <animate attributeName="fill-opacity" values="1;0.15;0.15;0.15;1;1" keyTimes="0;0.2;0.4;0.6;0.8;1" dur="7.2s" repeatCount="indefinite"/>
        </circle>
        <text x="10" y="12" font-weight="700">GLUTEN FREE</text>
      </g>
      <!-- CAUTION -->
      <g transform="translate(0,28)">
        <circle cx="0" cy="8" r="3.5" fill="var(--ink)" stroke="var(--ink)" stroke-width="1">
          <animate attributeName="fill-opacity" values="0.15;1;0.15;1;0.15;0.15" keyTimes="0;0.2;0.4;0.6;0.8;1" dur="7.2s" repeatCount="indefinite"/>
        </circle>
        <text x="10" y="12" font-weight="700">CAUTION</text>
      </g>
      <!-- CONTAINS GLUTEN -->
      <g transform="translate(0,56)">
        <circle cx="0" cy="8" r="3.5" fill="var(--ink)" stroke="var(--ink)" stroke-width="1">
          <animate attributeName="fill-opacity" values="0.15;0.15;1;0.15;0.15;0.15" keyTimes="0;0.2;0.4;0.6;0.8;1" dur="7.2s" repeatCount="indefinite"/>
        </circle>
        <text x="10" y="12" font-weight="700">CONTAINS</text>
      </g>
    </g>
  </g>

  <!-- AXIS -->
  <g stroke="var(--ink)" stroke-width="0.6">
    <line x1="20" y1="272" x2="380" y2="272"/>
    <line x1="20"  y1="272" x2="20"  y2="276"/>
    <line x1="140" y1="272" x2="140" y2="276"/>
    <line x1="232" y1="272" x2="232" y2="276"/>
    <line x1="380" y1="272" x2="380" y2="276"/>
  </g>
  <text x="20"  y="288" font-family="JetBrains Mono" font-size="8" letter-spacing="2" fill="var(--muted)">SCAN</text>
  <text x="154" y="288" font-family="JetBrains Mono" font-size="8" letter-spacing="2" fill="var(--muted)">LOOKUP</text>
  <text x="252" y="288" font-family="JetBrains Mono" font-size="8" letter-spacing="2" fill="var(--muted)">VERDICT</text>
</svg>`;
  }

  function schematicSatellite() {
    return `
<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <defs>
    <pattern id="g-sat" width="16" height="16" patternUnits="userSpaceOnUse">
      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="var(--dim)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="400" height="300" fill="url(#g-sat)"/>

  <!-- orbit arc -->
  <path d="M 20 60 Q 200 -40 380 60" fill="none" stroke="var(--ink)" stroke-width="1" stroke-dasharray="3,3"/>

  <!-- TWO SATELLITES: Sentinel-2 (left) + Sentinel-3 (right) -->
  <g transform="translate(140,42)">
    <rect x="-8" y="-8" width="16" height="16" fill="var(--ink)"/>
    <rect x="-22" y="-3" width="12" height="6" fill="var(--bg)" stroke="var(--ink)"/>
    <rect x="10"  y="-3" width="12" height="6" fill="var(--bg)" stroke="var(--ink)"/>
    <text x="0" y="-14" text-anchor="middle" font-family="JetBrains Mono" font-size="8" letter-spacing="1.5" fill="var(--ink)">SENTINEL-2</text>
  </g>
  <g transform="translate(260,42)">
    <rect x="-8" y="-8" width="16" height="16" fill="var(--ink)"/>
    <rect x="-22" y="-3" width="12" height="6" fill="var(--bg)" stroke="var(--ink)"/>
    <rect x="10"  y="-3" width="12" height="6" fill="var(--bg)" stroke="var(--ink)"/>
    <text x="0" y="-14" text-anchor="middle" font-family="JetBrains Mono" font-size="8" letter-spacing="1.5" fill="var(--ink)">SENTINEL-3</text>
  </g>

  <!-- downlink cones -->
  <g stroke="var(--ink)" stroke-width="0.8" fill="none" stroke-dasharray="2,2">
    <line x1="140" y1="52" x2="155" y2="200"/>
    <line x1="140" y1="52" x2="225" y2="200"/>
    <line x1="260" y1="52" x2="205" y2="200"/>
    <line x1="260" y1="52" x2="275" y2="200"/>
  </g>

  <!-- source tags: FIRMS + MODIS -->
  <g font-family="JetBrains Mono" font-size="8" letter-spacing="1.5" fill="var(--ink)">
    <rect x="30" y="95" width="54" height="16" fill="var(--bg)" stroke="var(--ink)" stroke-width="1"/>
    <text x="57" y="106" text-anchor="middle">FIRMS</text>
    <rect x="316" y="95" width="54" height="16" fill="var(--bg)" stroke="var(--ink)" stroke-width="1"/>
    <text x="343" y="106" text-anchor="middle">MODIS</text>
    <line x1="84"  y1="103" x2="150" y2="160" stroke="var(--ink)" stroke-width="0.6" stroke-dasharray="2,2"/>
    <line x1="316" y1="103" x2="250" y2="160" stroke="var(--ink)" stroke-width="0.6" stroke-dasharray="2,2"/>
  </g>

  <!-- portugal outline (very abstract polygon) -->
  <g transform="translate(120,190)">
    <polygon points="0,0 60,-10 120,5 160,15 165,40 150,80 110,90 70,80 30,70 -5,40"
             fill="var(--dim-2)" stroke="var(--ink)" stroke-width="1.25"/>
    <!-- detected fire markers -->
    <g fill="var(--ink)">
      <circle cx="40" cy="35" r="3"/>
      <circle cx="80" cy="55" r="4"/>
      <circle cx="105" cy="20" r="2.5"/>
      <circle cx="130" cy="65" r="3.5"/>
      <circle cx="55" cy="70" r="2.5"/>
    </g>
    <!-- crosshair -->
    <g stroke="var(--ink)" stroke-width="0.8" fill="none">
      <circle cx="80" cy="55" r="14">
        <animate attributeName="r" values="14;18;14" dur="2.2s" repeatCount="indefinite"/>
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite"/>
      </circle>
      <line x1="60"  y1="55" x2="100" y2="55"/>
      <line x1="80"  y1="35" x2="80"  y2="75"/>
    </g>
  </g>
  <text x="120" y="292" font-family="JetBrains Mono" font-size="8" letter-spacing="2" fill="var(--muted)">DETECT · FUSED · S2 + S3 + FIRMS + MODIS</text>
</svg>`;
  }

  function schematicReps() {
    return `
<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <defs>
    <pattern id="g-reps" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--dim)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="400" height="300" fill="url(#g-reps)"/>
  <!-- "rep" wave -->
  <g stroke="var(--ink)" stroke-width="1.25" fill="none">
    <path d="M 20 150 L 60 150 L 80 90 L 100 210 L 140 150 L 180 150 L 200 90 L 220 210 L 260 150 L 300 150 L 320 90 L 340 210 L 380 150"/>
  </g>
  <!-- bars histogram -->
  <g fill="var(--ink)">
    <rect x="40"  y="240" width="14" height="30"/>
    <rect x="60"  y="225" width="14" height="45"/>
    <rect x="80"  y="200" width="14" height="70"/>
    <rect x="100" y="215" width="14" height="55"/>
    <rect x="120" y="235" width="14" height="35"/>
    <rect x="140" y="220" width="14" height="50"/>
    <rect x="160" y="195" width="14" height="75"/>
    <rect x="180" y="210" width="14" height="60"/>
    <rect x="200" y="230" width="14" height="40"/>
    <rect x="220" y="220" width="14" height="50"/>
    <rect x="240" y="200" width="14" height="70"/>
    <rect x="260" y="215" width="14" height="55"/>
    <rect x="280" y="235" width="14" height="35"/>
    <rect x="300" y="225" width="14" height="45"/>
    <rect x="320" y="205" width="14" height="65"/>
    <rect x="340" y="230" width="14" height="40"/>
  </g>
  <line x1="20" y1="275" x2="380" y2="275" stroke="var(--ink)" stroke-width="1"/>
  <text x="20" y="40" font-family="JetBrains Mono" font-size="9" letter-spacing="2" fill="var(--ink)">DAILY · BODYWEIGHT · NO EQUIPMENT</text>
  <text x="20" y="55" font-family="JetBrains Mono" font-size="9" letter-spacing="2" fill="var(--muted)">REPS / DAY · 28-DAY ROLLING WINDOW</text>
</svg>`;
  }

  function schematicVerdict() {
    // Ticker -> per-method checks (computed) -> verdict ladder; AI narrative kept apart.
    const rows = [
      ["GRAHAM", 1, 0.72], ["BUFFETT", 1, 0.84], ["LYNCH", 0, 0.38],
      ["GREENBLATT", 1, 0.66], ["PIOTROSKI", 0, 0.44],
    ];
    const rowSvg = rows.map(([name, ok, score], i) => {
      const y = 62 + i * 30;
      const mark = ok
        ? `<polyline points="0,5 4,9 11,0" fill="none" stroke="var(--ink)" stroke-width="1.8"/>`
        : `<g stroke="var(--ink)" stroke-width="1.8"><line x1="1" y1="0" x2="10" y2="9"/><line x1="10" y1="0" x2="1" y2="9"/></g>`;
      return `
    <g transform="translate(118,${y})">
      <g transform="translate(0,-8)">${mark}</g>
      <text x="20" y="0" font-family="JetBrains Mono" font-size="8.5" letter-spacing="1.2" fill="var(--ink)">${name}</text>
      <rect x="20" y="5" width="96" height="5" fill="var(--bg)" stroke="var(--ink)" stroke-width="0.8"/>
      <rect x="20" y="5" width="${Math.round(96 * score)}" height="5" fill="var(--ink)"/>
    </g>`;
    }).join("");
    return `
<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <defs>
    <pattern id="g-verdict" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--dim)" stroke-width="1"/>
    </pattern>
    <pattern id="hatch-ai" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="5" stroke="var(--ink)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="400" height="300" fill="url(#g-verdict)"/>

  <!-- TICKER -->
  <g transform="translate(22,98)">
    <rect width="70" height="44" fill="var(--bg)" stroke="var(--ink)" stroke-width="1.5"/>
    <text x="8" y="14" font-family="JetBrains Mono" font-size="7.5" letter-spacing="1.5" fill="var(--muted)">TICKER</text>
    <text x="8" y="34" font-family="JetBrains Mono" font-size="15" font-weight="700" fill="var(--ink)">AAPL</text>
  </g>
  <g stroke="var(--ink)" stroke-width="1.25" fill="none">
    <line x1="92" y1="120" x2="110" y2="120"/>
    <polyline points="104,115 110,120 104,125"/>
  </g>

  <!-- PER-METHOD CHECKS (computed) -->
  <text x="118" y="40" font-family="JetBrains Mono" font-size="8" letter-spacing="2" fill="var(--muted)">COMPUTED CHECKS</text>
  ${rowSvg}

  <g stroke="var(--ink)" stroke-width="1.25" fill="none">
    <line x1="246" y1="120" x2="262" y2="120"/>
    <polyline points="256,115 262,120 256,125"/>
  </g>

  <!-- VERDICT LADDER -->
  <g transform="translate(270,52)">
    <rect width="110" height="128" fill="var(--bg)" stroke="var(--ink)" stroke-width="1.5"/>
    <text x="10" y="16" font-family="JetBrains Mono" font-size="8" letter-spacing="2" fill="var(--muted)">VERDICT</text>
    <rect x="6" y="27" width="98" height="20" fill="var(--dim-2)" stroke="var(--ink)" stroke-width="2">
      <animate attributeName="y" values="27;55;55;83;27" keyTimes="0;0.25;0.5;0.75;1" dur="8s" repeatCount="indefinite"/>
    </rect>
    <g font-family="JetBrains Mono" font-size="10" font-weight="700" letter-spacing="1.5">
      <text x="14" y="41" fill="var(--ink)">BUY</text>
      <text x="14" y="69" fill="var(--ink)">WATCH</text>
      <text x="14" y="97" fill="var(--ink)">AVOID</text>
    </g>
    <text x="10" y="120" font-family="JetBrains Mono" font-size="7.5" letter-spacing="1" fill="var(--muted)">14 / 21 CHECKS</text>
  </g>

  <!-- AI NARRATIVE (kept apart) -->
  <g transform="translate(118,214)">
    <rect width="262" height="30" fill="url(#hatch-ai)" stroke="var(--ink)" stroke-width="1" stroke-dasharray="3,2" opacity="0.55"/>
    <rect x="8" y="8" width="128" height="14" fill="var(--bg)"/>
    <text x="14" y="18" font-family="JetBrains Mono" font-size="8" letter-spacing="1.5" fill="var(--ink)">AI NARRATIVE · AGENT</text>
  </g>

  <!-- AXIS -->
  <g stroke="var(--ink)" stroke-width="0.6">
    <line x1="20" y1="272" x2="380" y2="272"/>
    <line x1="20" y1="272" x2="20" y2="276"/>
    <line x1="118" y1="272" x2="118" y2="276"/>
    <line x1="270" y1="272" x2="270" y2="276"/>
    <line x1="380" y1="272" x2="380" y2="276"/>
  </g>
  <text x="20"  y="288" font-family="JetBrains Mono" font-size="8" letter-spacing="2" fill="var(--muted)">TICKER</text>
  <text x="118" y="288" font-family="JetBrains Mono" font-size="8" letter-spacing="2" fill="var(--muted)">SCORE</text>
  <text x="270" y="288" font-family="JetBrains Mono" font-size="8" letter-spacing="2" fill="var(--muted)">VERDICT</text>
</svg>`;
  }

  const schematics = {
    verdict: schematicVerdict,
    scan: schematicScan,
    satellite: schematicSatellite,
    reps: schematicReps,
  };

  /* ============ PROJECTS ============ */
  function renderProjects() {
    const root = $("#proj-grid");
    if (!root) return;
    root.innerHTML = "";

    window.AMT.projects.forEach((p) => {
      const head = el(
        "div",
        { class: "proj-head" },
        el("span", { class: "id" }, p.idLabel),
        el("span", { class: "badge" }, p.badge)
      );

      const schemEl = el("div", { class: "proj-schematic" });
      const schemWrap = el("div", { class: "sch-wrap" }, schemEl, el("span", { class: "sch-hint", "aria-hidden": "true" }, "SCROLL →"));
      schemEl.insertAdjacentHTML("afterbegin", schematics[p.schematic]());

      const specs = el(
        "dl",
        { class: "proj-specs" },
        ...p.specs.flatMap(([k, v]) => [el("dt", {}, k), el("dd", {}, v)])
      );

      const stack = el(
        "div",
        { class: "stack" },
        ...p.stack.map((s) => el("span", { class: "chip" }, s))
      );

      const actions = el(
        "div",
        { class: "proj-actions" },
        ...p.links.map((l) => {
          const a = el(
            "a",
            {
              class: "btn" + (l.primary ? "" : " btn--ghost"),
              href: l.href,
              target: "_blank",
              rel: "noopener noreferrer",
            },
            l.label
          );
          return a;
        })
      );

      const textBlock = el(
        "div",
        {},
        el("h3", { class: "proj-title" }, p.title),
        el("p", { class: "proj-desc" }, p.desc),
        specs,
        stack,
        actions
      );

      const body = el("div", { class: "proj-body" });
      if (p.lead) {
        body.appendChild(textBlock);
        body.appendChild(schemWrap);
      } else {
        body.appendChild(schemWrap);
        body.appendChild(textBlock);
      }

      const card = el(
        "article",
        { class: "proj " + (p.lead ? "proj--lead" : "proj--reg") },
        head,
        body
      );

      root.appendChild(card);
    });
  }

  /* ============ PUBLICATIONS ============ */
  function renderPapers() {
    const root = $("#pubs-list");
    if (!root) return;
    root.innerHTML = "";
    window.AMT.papers.forEach((p, i) => {
      const href =
        "https://scholar.google.com/scholar?q=" +
        encodeURIComponent(p.title);

      const row = el(
        "a",
        {
          class: "pub" + (i >= 4 ? " pub--extra" : ""),
          href,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": `${p.title}, ${p.venue} ${p.year}, ${p.cites} citations — search on Google Scholar`,
        },
        el("span", { class: "pub-cites" }, String(p.cites)),
        el("span", { class: "pub-title" }, p.title),
        el("span", { class: "pub-venue" }, p.venue),
        el("span", { class: "pub-year" }, String(p.year))
      );
      root.appendChild(row);
    });

    const extra = window.AMT.papers.length - 4;
    const more = document.querySelector(".pubs-more");
    if (extra > 0 && more) {
      const btn = el("button", { class: "btn btn--ghost pubs-toggle", type: "button", "aria-expanded": "false", "aria-controls": "pubs-list" },
        `SHOW ${extra} MORE`);
      btn.addEventListener("click", () => {
        const open = root.classList.toggle("is-expanded");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.textContent = open ? "SHOW FEWER" : `SHOW ${extra} MORE`;
      });
      more.prepend(btn);
    }
  }

  /* ============ SKILLS ============ */
  function renderSkills() {
    const root = $("#patch");
    if (!root) return;
    root.innerHTML = "";

    window.AMT.skills.forEach((bay) => {
      const head = el(
        "div",
        { class: "patch-head" },
        el("span", { class: "name" }, bay.title)
      );
      const jacks = el(
        "div",
        { class: "patch-jacks" },
        ...bay.jacks.map((j) =>
          el(
            "div",
            { class: "jack" },
            el("span", { class: "jack-led", "aria-hidden": "true" }),
            el("span", { class: "jack-name" }, j.name)
          )
        )
      );
      root.appendChild(el("div", { class: "patch-bay" }, head, jacks));
    });
  }

  /* ============ INIT ============ */
  function setupScrollReveal() {
    const axis = document.querySelector("#exp-axis");
    if (!axis) return;
    const rows = axis.querySelectorAll(".exp-row");

    // Stagger the rows manually via setTimeout once the section enters view.
    // (CSS animation-delay would risk hiding rows if engine throttles —
    //  with JS we only add the trigger class, which gates the animation but
    //  never the base styles.)
    let played = false;
    const axisObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !played) {
            played = true;
            axis.classList.add("is-revealed");
            rows.forEach((r, i) => {
              setTimeout(() => r.classList.add("is-revealed"), 100 + i * 180);
            });
            axisObs.disconnect();
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );
    axisObs.observe(axis);
  }

  // On phones the diagrams scroll sideways at full size; a scrollable region must
  // be reachable by keyboard, so make it focusable only while it actually scrolls.
  function setupSchematicScroll() {
    const boxes = [...document.querySelectorAll(".proj-schematic")];
    const atEnd = (box) => box.parentElement.classList.toggle("at-end", box.scrollLeft + box.clientWidth >= box.scrollWidth - 4);
    boxes.forEach((box) => box.addEventListener("scroll", () => atEnd(box), { passive: true }));
    const sync = () => boxes.forEach((box) => {
      const title = box.closest(".proj")?.querySelector(".proj-title")?.textContent || "Project";
      const scrolls = box.scrollWidth > box.clientWidth + 1;
      box.parentElement.classList.toggle("can-scroll", scrolls);
      atEnd(box);
      if (scrolls) {
        box.setAttribute("tabindex", "0");
        box.setAttribute("role", "group");
        box.setAttribute("aria-label", `${title} diagram, scrolls sideways`);
      } else {
        box.removeAttribute("tabindex");
        box.removeAttribute("role");
        box.removeAttribute("aria-label");
      }
    });
    sync();
    window.addEventListener("resize", sync, { passive: true });
  }

  function setupSchematicMotion() {
    const svgs = document.querySelectorAll(".proj-schematic svg");
    if (!svgs.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      svgs.forEach((svg) => svg.querySelectorAll("animate").forEach((node) => node.remove()));
      return;
    }

    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (typeof target.pauseAnimations !== "function") return;
          if (isIntersecting) target.unpauseAnimations();
          else target.pauseAnimations();
        });
      },
      { threshold: 0.05 }
    );
    svgs.forEach((svg) => observer.observe(svg));
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderExperience();
    renderProjects();
    renderPapers();
    renderSkills();
    setupScrollReveal();
    setupSchematicMotion();
    setupSchematicScroll();
  });
})();
