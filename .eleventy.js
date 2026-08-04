const taxonomy = require("./src/_data/taxonomy.js");
const featured = require("./src/_data/featured.js");
const markdownIt = require("markdown-it");

function slugFromUrl(url) {
  return url.split("/").filter(Boolean).pop().replace(/\.html$/, "");
}

// Sin tope fijo: se arma con lo que haya en src/_data/featured.js.
function resolveFeatured(posts) {
  return featured
    .map((f) => {
      const post = posts.find((p) => slugFromUrl(p.url) === f.slug);
      return post ? { post, size: f.size === "big" ? "big" : "small" } : null;
    })
    .filter(Boolean);
}

module.exports = function (eleventyConfig) {
  // breaks:true — cualquier salto de línea en el .md se vuelve <br>, sin
  // depender de dos espacios invisibles al final de línea (fáciles de perder).
  eleventyConfig.setLibrary("md", markdownIt({ html: true, breaks: true, linkify: true }));

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
    resolveFeatured(api.getFilteredByTag("postsEs"))
  );
  eleventyConfig.addCollection("featuredEn", (api) =>
    resolveFeatured(api.getFilteredByTag("postsEn"))
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
