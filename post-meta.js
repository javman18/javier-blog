(() => {
  if (typeof posts === "undefined" || !Array.isArray(posts)) return;

  const dateEl = document.querySelector("[data-post-date]");
  if (!dateEl) return;

  const pathname = window.location.pathname.replace(/^\//, "");
  const match = posts.find((post) => {
    if (!post || !post.href) return false;
    return pathname.endsWith(post.href) || pathname.endsWith(post.href.replace(/^\.\//, ""));
  });

  if (match && match.date) {
    dateEl.textContent = match.date;
  }
})();
