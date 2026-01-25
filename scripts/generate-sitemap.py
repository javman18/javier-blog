from pathlib import Path

root = Path.cwd()
base_url = "https://www.javierfuente.com"
posts_dir = root / "posts"

post_files = sorted([p.name for p in posts_dir.glob("*.html")])
urls = ["/"] + [f"/posts/{name}" for name in post_files]

lines = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    "",
]
lines += [f"  <url>\n    <loc>{base_url}{url}</loc>\n  </url>" for url in urls]
lines += ["", "</urlset>", ""]

(root / "sitemap.xml").write_text("\n".join(lines), encoding="utf-8")
print(f"sitemap.xml actualizado con {len(urls)} URLs.")
