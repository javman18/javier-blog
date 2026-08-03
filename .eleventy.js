const taxonomy = require("./src/_data/taxonomy.js");

module.exports = function (eleventyConfig) {
  // Archivos estáticos: se copian tal cual, sin procesar.
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/giscus.js");
  eleventyConfig.addPassthroughCopy({ CNAME: "CNAME" });
  eleventyConfig.addPassthroughCopy({ ".nojekyll": ".nojekyll" });

  // --- Colecciones ---
  const byDateDesc = (a, b) => b.date - a.date;

  eleventyConfig.addCollection("postsEs", (api) =>
    api.getFilteredByTag("postsEs").sort(byDateDesc)
  );
  eleventyConfig.addCollection("postsEn", (api) =>
    api.getFilteredByTag("postsEn").sort(byDateDesc)
  );
  eleventyConfig.addCollection("featuredEs", (api) =>
    api
      .getFilteredByTag("postsEs")
      .filter((p) => p.data.featured)
      .sort(byDateDesc)
      .slice(0, 3)
  );
  eleventyConfig.addCollection("featuredEn", (api) =>
    api
      .getFilteredByTag("postsEn")
      .filter((p) => p.data.featured)
      .sort(byDateDesc)
      .slice(0, 3)
  );

  // --- Filtros ---
  eleventyConfig.addFilter("formatDate", (date, lang) =>
    new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-ES", {
      day: lang === "en" ? "numeric" : "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(date)
  );

  eleventyConfig.addFilter("categoryLabel", (id, lang) => {
    const cat = taxonomy.categories.find((c) => c.id === id);
    return cat ? cat.label[lang] || cat.label.es : id;
  });

  eleventyConfig.addFilter("topicLabel", (id, lang) => {
    const topic = taxonomy.topics.find((t) => t.id === id);
    return topic ? topic.label[lang] || topic.label.es : id;
  });

  eleventyConfig.addFilter("byCategory", (posts, categoryId) =>
    (posts || []).filter((p) => p.data.category === categoryId)
  );

  eleventyConfig.addFilter("excludeFrom", (posts, exclude) => {
    const urls = new Set((exclude || []).map((p) => p.url));
    return (posts || []).filter((p) => !urls.has(p.url));
  });

  // ES <-> EN: mismo slug, prefijo /en distinto — se calcula, no se declara por post.
  eleventyConfig.addGlobalData("eleventyComputed", {
    otherLangUrl: (data) => {
      if (!data.lang || !data.page || !data.page.url) return null;
      return data.lang === "es" ? "/en" + data.page.url : data.page.url.replace(/^\/en/, "");
    },
    // Páginas de índice traen su propio <title>/<meta description> vía htmlTitle/description.
    // Los posts arman el suyo a partir de title/excerpt — una sola vez, aquí.
    pageTitle: (data) => data.htmlTitle || (data.title ? `${data.title} — Javier` : "Javier"),
    pageDescription: (data) => data.description || data.excerpt || "",
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
