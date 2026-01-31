const posts = [
  {
  title: "El libro del accidente: por qué lo estoy escribiendo",
  href: "posts/libro-accidente.html",
  excerpt: "Un punto de partida: contar lo que pasó en 2016 y cómo lo estoy entendiendo ahora.",
  date: "14 ene 2026",
  section: "escritos",
  tags: ["escritos", "libro", "accidente"],
  tone: "ink",
  featured: "big"
  },
  {
    title: "En qué estoy trabajando",
    href: "posts/inteligencia-artificial-pensamiento.html",
    excerpt: "Qué hago, qué aprendo y qué se complica trabajando con agentes de IA y sistemas RAG.",
    date: "05 ene 2026",
    section: "trabajo",
    tags: ["trabajo", "ia", "rag"],
    tone: "work",
    featured: " "
  },
  {
  title: "Cómo evalúo agentes de IA: personalidad, RAG y similitud semántica",
  href: "posts/evaluacion-agentes-ia.html",
  excerpt: "Un vistazo práctico: cómo pruebo si un agente se comporta como debe y si el RAG realmente mejora las respuestas.",
  date: "21 ene 2026",
  section: "trabajo",
  tags: ["trabajo", "ia", "rag", "evaluacion"],
  tone: "work",
  featured: " "
  },
  {
    title: 'Fragmento: "La Fiesta"',
    href: "posts/la-fiesta-fragmento1.html",
    excerpt: "Inicio del capítulo 1. Un viernes normal, una película, una fiesta… y el primer mareo.",
    date: "20 ene 2026",
    section: "escritos",
    tags: ["escritos", "libro", "accidente"],
    tone: "ink",
    featured: "small"
  },
  {
  title: 'Fragmento: "El Barranco"',
  href: "posts/el-barranco-fragmento1.html",
  excerpt: "Inicio del capítulo 3. Despertar abajo: dolor, oscuridad y el impulso de moverse antes de desaparecer.",
  date: "21 ene 2026",
  section: "escritos",
  tags: ["escritos", "libro", "accidente"],
  tone: "ink",
  featured: " "
  },
  {
  title: "Cuando activaron mi implante coclear",
  href: "posts/activacion-implante.html",
  excerpt: "El día de la activación: el consultorio, la pregunta de la doctora y mi hermano grabando.",
  date: "22 ene 2026",
  section: "implante",
  tags: ["implante", "familia", "audio"],
  tone: "calm",
  featured: "big"
  },
  {
  title: "Ventajas y desventajas de no escuchar",
  href: "posts/ventajas-desventajas-no-escuchar.html",
  excerpt: "Lo que gano y lo que pierdo al poder apagar el sonido del mundo.",
  date: "28 ene 2026",
  section: "implante",
  tags: ["implante", "audio", "vida diaria"],
  tone: "calm",
  featured: " "
  },
  {
  title: "Escuchar música con un implante coclear",
  href: "posts/musica-implante.html",
  excerpt: "Cómo se escucha la música en mi caso: qué cambia, qué funciona mejor y qué cansa.",
  date: "14 ene 2026",
  section: "implante",
  tags: ["implante", "audio", "musica"],
  tone: "calm",
  featured: "small"
 },
 {
  title: "Disautonomía en la vida diaria (en mi caso)",
  href: "posts/salud-disautonomia-vida-diaria.html",
  excerpt: "Cómo se manifiesta en mi día a día y qué cosas la empeoran o la mejoran.",
  date: "22 ene 2026",
  section: "salud",
  tags: ["salud", "disautonomia"],
  tone: "calm",
  featured: "small"
},
{
  title: "El juego que he estado desarrollando (intermitentemente)",
  href: "posts/juego-zombies-wip.html",
  excerpt: "Un juego de zombies en desarrollo temprano. Animaciones, cambio de arma fluido y por qué avanzar lento también es avanzar.",
  date: "29 ene 2026",
  section: "trabajo",
  tags: ["unity", "gamedev", "zombies", "wip", "animaciones"],
  tone: "personal",
  featured: " "
},


];

// Make posts available to post pages that load this script.
window.posts = posts;

const sections = [
  { id: "escritos", label: "Escritos" },
  { id: "implante", label: "Implante" },
  { id: "trabajo", label: "Trabajo" },
  { id: "salud", label: "Salud" },
  { id: "ahora", label: "Ahora" }
];

const feed = document.querySelector(".feed");

if (feed) {
  feed.innerHTML = "";

  sections.forEach((section) => {
    const sectionPosts = posts.filter((post) => post.section === section.id);
    if (!sectionPosts.length) return;

    const sectionEl = document.createElement("section");
    sectionEl.className = "feed-section";
    sectionEl.id = section.id;

    const title = document.createElement("h2");
    title.className = "section-title";
    title.textContent = section.label;
    sectionEl.appendChild(title);

    sectionPosts.forEach((post) => {
      const article = document.createElement("article");
      article.className = `post-card tone-${post.tone || "calm"}`;

      const heading = document.createElement("h3");
      const link = document.createElement("a");
      link.href = post.href;
      link.textContent = post.title;
      heading.appendChild(link);

      const excerpt = document.createElement("p");
      excerpt.className = "excerpt";
      excerpt.textContent = post.excerpt;

      const meta = document.createElement("p");
      meta.className = "meta";
      meta.appendChild(document.createTextNode(post.date));

      if (post.tags && post.tags.length) {
        const tagWrap = document.createElement("span");
        tagWrap.className = "tag-wrap";
        post.tags.forEach((tag) => {
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
