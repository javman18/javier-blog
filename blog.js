(function () {
  const posts = Array.isArray(window.posts) ? window.posts.slice() : [];

  // --- Helpers: parse "14 ene 2026" ---
  const monthMap = {
    ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
    jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11
  };

  function parseEsDate(s) {
    // Expected: "14 ene 2026"
    if (!s || typeof s !== "string") return new Date(0);
    const parts = s.trim().toLowerCase().split(/\s+/);
    if (parts.length < 3) return new Date(0);
    const day = parseInt(parts[0], 10);
    const mon = monthMap[parts[1]] ?? 0;
    const year = parseInt(parts[2], 10);
    if (!Number.isFinite(day) || !Number.isFinite(year)) return new Date(0);
    return new Date(year, mon, day);
  }

  function esc(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function tagPills(tags) {
    const arr = (tags || []).slice(0, 4);
    if (!arr.length) return "";
    return `<div class="pills">${arr.map(t => `<span class="pill">${esc(t)}</span>`).join("")}</div>`;
  }

  function postMeta(p) {
    const sec = p.section ? ` · ${esc(p.section)}` : "";
    return `<div class="meta"><time>${esc(p.date || "")}</time>${sec}</div>`;
  }

  function postCard(p, { big = false } = {}) {
    const excerpt = esc(p.excerpt || "");
    const title = esc(p.title || "");
    const href = esc(p.href || "#");
    const tone = esc(p.tone || "ink");

    return `
      <article class="post-card ${big ? "post-card--big" : ""} tone-${tone}">
        ${postMeta(p)}
        <h3 class="${big ? "post-title-big" : "post-title"}">
          <a href="${href}">${title}</a>
        </h3>
        ${excerpt ? `<p class="excerpt ${big ? "excerpt--big" : ""}">${excerpt}</p>` : ""}
        ${tagPills(p.tags)}
        <div class="card-actions">
          <a class="read-link" href="${href}">Leer →</a>
        </div>
      </article>
    `;
  }

  function recentRow(p) {
    const href = esc(p.href || "#");
    const title = esc(p.title || "");
    const date = esc(p.date || "");
    const section = esc(p.section || "");
    return `
      <a class="recent-row" href="${href}">
        <div class="recent-left">
          <div class="recent-title">${title}</div>
          <div class="recent-sub">${section}</div>
        </div>
        <div class="recent-date">${date}</div>
      </a>
    `;
  }

  function sectionBlock(sectionId, label, items) {
    const list = items.slice(0, 4).map(p => {
      const href = esc(p.href || "#");
      const title = esc(p.title || "");
      const date = esc(p.date || "");
      return `<li><a href="${href}">${title}</a> <span class="muted">· ${date}</span></li>`;
    }).join("");

    return `
      <section id="${esc(sectionId)}" class="section-block">
        <div class="section-block-head">
          <h3 class="section-block-title">${esc(label)}</h3>
          <a class="section-jump" href="#top">↑</a>
        </div>
        <ul class="section-block-list">${list}</ul>
      </section>
    `;
  }

  // --- Sort newest first ---
  posts.sort((a, b) => parseEsDate(b.date) - parseEsDate(a.date));

  // --- Featured selection (prioridad por títulos si existen) ---
  const priorityTitles = [
    "El libro del accidente: por qué lo estoy escribiendo",
    'Fragmento: "La Fiesta"',
    "Cuando activaron mi implante coclear",
    "Escuchar música con un implante coclear"
  ];

  const featured = [];
  const used = new Set();

  for (const t of priorityTitles) {
    const p = posts.find(x => x.title === t);
    if (p && !used.has(p.href)) {
      featured.push(p);
      used.add(p.href);
    }
    if (featured.length >= 3) break;
  }

  // fallback si no hay suficientes
  for (const p of posts) {
    if (featured.length >= 3) break;
    if (!used.has(p.href)) {
      featured.push(p);
      used.add(p.href);
    }
  }

  // --- Render Featured grid: 1 grande + 2 pequeñas ---
  const featuredEl = document.getElementById("featuredGrid");
  if (featuredEl) {
    const hero = featured[0];
    const side1 = featured[1];
    const side2 = featured[2];

    featuredEl.innerHTML = `
      <div class="featured-hero">
        ${hero ? postCard(hero, { big: true }) : ""}
      </div>
      <div class="featured-side">
        ${side1 ? postCard(side1) : ""}
        ${side2 ? postCard(side2) : ""}
      </div>
    `;
  }

  // --- Recent list (excluye featured) ---
  const recentEl = document.getElementById("recentList");
  if (recentEl) {
    const recent = posts.filter(p => !used.has(p.href)).slice(0, 10);
    recentEl.innerHTML = recent.map(recentRow).join("");
  }

  // --- Sections blocks ---
  const sectionEl = document.getElementById("sectionBlocks");
  if (sectionEl) {
    const sections = [
      { id: "escritos", label: "Escritos" },
      { id: "implante", label: "Implante" },
      { id: "trabajo", label: "Trabajo" },
      { id: "salud", label: "Salud" },
      { id: "ahora", label: "Ahora" },
    ];

    const html = sections.map(s => {
      const items = posts.filter(p => p.section === s.id);
      if (!items.length) return "";
      return sectionBlock(s.id, s.label, items);
    }).join("");

    sectionEl.innerHTML = html || `<p class="muted">Aún no hay posts.</p>`;
  }
})();
