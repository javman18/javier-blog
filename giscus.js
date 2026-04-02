document.addEventListener("DOMContentLoaded", () => {
  const commentsSection = document.querySelector(".comments");
  if (!commentsSection) return;

  const host = commentsSection.querySelector(".comments-host");
  if (!host) return;

  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.setAttribute("data-repo", "javman18/javier-blog");
  script.setAttribute("data-repo-id", "R_kgDOQ6GC4A");
  script.setAttribute("data-category", "Announcements");
  script.setAttribute("data-category-id", "DIC_kwDOQ6GC4M4C505T");
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "bottom");
  script.setAttribute("data-theme", "preferred_color_scheme");
  script.setAttribute("data-lang", "es");
  script.setAttribute("crossorigin", "anonymous");
  script.async = true;

  host.appendChild(script);
});