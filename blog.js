(function () {
  const posts = Array.isArray(window.posts) ? window.posts.slice() : [];

  // --- Lang ("/en/..." => en, else es) ---
  const isEN =
  location.pathname.startsWith("/en/") ||
  location.pathname.includes("/en/") ||
  location.pathname.endsWith("/en/index.html");
  const lang = isEN ? "en" : "es";

  // --- Helpers ---
  function pick(val) {
    // Picks {es,en} objects by current lang (fallback to es)
    if (val && typeof val === "object") return val[lang] || val.es || "";
    return val ?? "";
  }

  function parseISO(s) {
    const d = new Date(s);
    return isNaN(d) ? new Date(0) : d;
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

  const sectionMap = {
    escritos: { es: "Escritos", en: "Writing" },
    implante: { es: "Implante", en: "Implant" },
    trabajo: { es: "Trabajo", en: "Work" },
    salud:   { es: "Salud",   en: "Health" },
    ahora:   { es: "Ahora",   en: "Now" },
  };

  function sectionLabel(sectionId) {
    return (sectionMap[sectionId] && sectionMap[sectionId][lang]) || sectionId || "";
  }

  // --- Sort newest first (by ISO date) ---
  posts.sort((a, b) => parseISO(b.dateISO) - parseISO(a.dateISO));

  // ============================================================================
  // HOME renderer (featured/recent/sections blocks)
  // ============================================================================
  function postMeta(p) {
    const sec = p.section ? ` · ${esc(sectionLabel(p.section))}` : "";
    return `<div class="meta"><time>${esc(pick(p.dateLabel))}</time>${sec}</div>`;
  }

  function postCard(p, { big = false } = {}) {
    const excerpt = esc(pick(p.excerpt));
    const title = esc(pick(p.title));
    const href = esc(pick(p.href) || "#");
    const tone = esc(p.tone || "ink");
    const readText = lang === "en" ? "Read →" : "Leer →";

    return `
      <article class="post-card ${big ? "post-card--big" : ""} tone-${tone}">
        ${postMeta(p)}
        <h3 class="${big ? "post-title-big" : "post-title"}">
          <a href="${href}">${title}</a>
        </h3>
        ${excerpt ? `<p class="excerpt ${big ? "excerpt--big" : ""}">${excerpt}</p>` : ""}
        ${tagPills(pick(p.tags))}
        <div class="card-actions">
          <a class="read-link" href="${href}">${readText}</a>
        </div>
      </article>
    `;
  }

  function recentRow(p) {
    const href = esc(pick(p.href) || "#");
    const title = esc(pick(p.title));
    const date = esc(pick(p.dateLabel));
    const section = esc(sectionLabel(p.section || ""));

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
      const href = esc(pick(p.href) || "#");
      const title = esc(pick(p.title));
      const date = esc(pick(p.dateLabel));
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

  // Render Featured
  const featuredEl = document.getElementById("featuredGrid");
  if (featuredEl) {
    const featuredBig = posts.filter(p => p && p.featured === "big");
    const featuredSmall = posts.filter(p => p && p.featured === "small");

    const BIG_LIMIT = 2;
    const SMALL_LIMIT = 3;

    const bigList = featuredBig.slice(0, BIG_LIMIT);
    const smallList = featuredSmall.slice(0, SMALL_LIMIT);

    featuredEl.innerHTML = `
      <div class="featured-hero">
        ${bigList.map(p => postCard(p, { big: true })).join("")}
      </div>
      <div class="featured-side">
        ${smallList.map(p => postCard(p)).join("")}
      </div>
    `;

    // Recent excludes featured
    const used = new Set([...bigList, ...smallList].map(p => pick(p.href)));
    const recentEl = document.getElementById("recentList");
    if (recentEl) {
      const recent = posts.filter(p => !used.has(pick(p.href))).slice(0, 10);
      recentEl.innerHTML = recent.map(recentRow).join("");
    }
  } else {
    // If no featured grid, still try recent list
    const recentEl = document.getElementById("recentList");
    if (recentEl) {
      recentEl.innerHTML = posts.slice(0, 10).map(recentRow).join("");
    }
  }

  // Render section blocks
  const sectionBlocksEl = document.getElementById("sectionBlocks");
  if (sectionBlocksEl) {
    const sections = ["escritos", "implante", "trabajo", "salud", "ahora"];

    const html = sections.map(id => {
      const items = posts.filter(p => p.section === id);
      if (!items.length) return "";
      return sectionBlock(id, sectionLabel(id), items);
    }).join("");

    sectionBlocksEl.innerHTML =
      html || `<p class="muted">${lang === "en" ? "No posts yet." : "Aún no hay posts."}</p>`;
  }

  // ============================================================================
  // FEED renderer (.feed)
  // ============================================================================
  const feed = document.querySelector(".feed");
  if (feed) {
    feed.innerHTML = "";

    const sections = ["escritos", "implante", "trabajo", "salud", "ahora"];

    sections.forEach((id) => {
      const sectionPosts = posts.filter((p) => p.section === id);
      if (!sectionPosts.length) return;

      const sectionEl = document.createElement("section");
      sectionEl.className = "feed-section";
      sectionEl.id = id;

      const h2 = document.createElement("h2");
      h2.className = "section-title";
      h2.textContent = sectionLabel(id);
      sectionEl.appendChild(h2);

      sectionPosts.forEach((post) => {
        const article = document.createElement("article");
        article.className = `post-card tone-${post.tone || "calm"}`;

        const heading = document.createElement("h3");
        const link = document.createElement("a");
        link.href = pick(post.href) || "#";
        link.textContent = pick(post.title);
        heading.appendChild(link);

        const excerpt = document.createElement("p");
        excerpt.className = "excerpt";
        excerpt.textContent = pick(post.excerpt);

        const meta = document.createElement("p");
        meta.className = "meta";
        meta.appendChild(document.createTextNode(pick(post.dateLabel)));

        const tags = pick(post.tags);
        if (Array.isArray(tags) && tags.length) {
          const tagWrap = document.createElement("span");
          tagWrap.className = "tag-wrap";
          tags.forEach((tag) => {
            const tagEl = document.createElement("span");
            tagEl.className = "tag";
            tagEl.textContent = tag;
            tagWrap.appendChild(tagEl);
          });
          meta.appendChild(document.createTextNode(" - "));
          meta.appendChild(tagWrap);
        }

        article.appendChild(heading);
        article.appendChild(excerpt);
        article.appendChild(meta);
        sectionEl.appendChild(article);
      });

      feed.appendChild(sectionEl);
    });
  }
})();

(function () {
  // Language switch: keeps same path when toggling ES/EN
  const isEN =
    location.pathname.startsWith("/en/") ||
    location.pathname.includes("/en/") ||
    location.pathname.endsWith("/en/index.html");

  const currentLang = isEN ? "en" : "es";

  document.querySelectorAll(".lang-switch a").forEach(link => {
    const targetLang = link.dataset.lang;
    let targetPath = location.pathname;

    if (targetLang === "en" && !isEN) targetPath = "/en" + location.pathname;
    if (targetLang === "es" && isEN) targetPath = location.pathname.replace(/^\/en/, "");

    link.href = targetPath || "/";
    if (targetLang === currentLang) link.classList.add("active");
  });
})();

