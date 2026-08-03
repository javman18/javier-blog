#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

function esc(str) {
  return String(str || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function loadPosts() {
  const src = fs.readFileSync(path.join(ROOT, 'posts.js'), 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: 'posts.js' });
  return sandbox.window.posts;
}

const SECTION_LABELS = {
  escritos: { es: 'Escritos', en: 'Writing' },
  implante: { es: 'Implante', en: 'Implant' },
  cuerpo:   { es: 'Cuerpo',   en: 'Body' },
  trabajo:  { es: 'Trabajo',  en: 'Work' },
};

const NAV_ORDER = ['escritos', 'implante', 'cuerpo', 'trabajo'];

const STRINGS = {
  es: {
    subtitle: 'escritura · implante · vida diaria',
    backHome: '← Volver al inicio',
    comments: 'Comentarios',
    portfolio: 'Portafolio',
    navAria: 'Secciones',
  },
  en: {
    subtitle: 'writing · implant · daily life',
    backHome: '← Back to home',
    comments: 'Comments',
    portfolio: 'Portfolio',
    navAria: 'Sections',
  },
};

function navLinks(lang) {
  const items = NAV_ORDER.map(
    (id) => `            <a href="../index.html#${id}">${esc(SECTION_LABELS[id][lang])}</a>`
  );
  items.push(
    `            <a href="https://javman18.github.io/" target="_blank" rel="noopener" class="nav-external">${esc(
      STRINGS[lang].portfolio
    )}</a>`
  );
  return items.join('\n');
}

function tagPills(tags) {
  const arr = tags || [];
  if (!arr.length) return '';
  return `<div class="pills">${arr.map((t) => `<span class="pill">${esc(t)}</span>`).join('')}</div>`;
}

function pick(val, lang) {
  if (val && typeof val === 'object') return val[lang] || val.es || '';
  return val ?? '';
}

function slugFromHref(href) {
  return href.split('/').pop().replace(/\.html$/, '');
}

function render(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in vars)) throw new Error('Missing template var: ' + key);
    return vars[key];
  });
}

function main() {
  const posts = loadPosts();
  const template = fs.readFileSync(path.join(ROOT, 'templates', 'post.html'), 'utf8');

  let count = 0;
  for (const post of posts) {
    for (const lang of ['es', 'en']) {
      const href = pick(post.href, lang);
      if (!href) continue;

      const slug = slugFromHref(href);
      const contentPath = path.join(ROOT, 'content', lang, slug + '.html');
      if (!fs.existsSync(contentPath)) {
        console.error(`Falta fragmento de contenido: ${contentPath}`);
        continue;
      }
      const content = fs.readFileSync(contentPath, 'utf8').trim();

      const outDir = lang === 'es' ? path.join(ROOT, 'posts') : path.join(ROOT, 'en', 'posts');
      const outPath = path.join(outDir, slug + '.html');
      const stylePrefix = lang === 'es' ? '..' : '../..';

      const html = render(template, {
        LANG: lang,
        TITLE: esc(pick(post.title, lang)),
        DESCRIPTION: esc(pick(post.excerpt, lang)),
        H1: esc(pick(post.title, lang)),
        DATE_LABEL: esc(pick(post.dateLabel, lang)),
        SECTION_LABEL: esc((SECTION_LABELS[post.section] || {})[lang] || post.section || ''),
        TAGS_HTML: tagPills(pick(post.tags, lang)),
        CONTENT: content,
        HOME_HREF: '../index.html',
        STYLE_HREF: `${stylePrefix}/style.css`,
        GISCUS_SRC: `${stylePrefix}/giscus.js`,
        SUBTITLE: esc(STRINGS[lang].subtitle),
        NAV_ARIA: esc(STRINGS[lang].navAria),
        NAV_LINKS: navLinks(lang),
        BACK_HOME_TEXT: esc(STRINGS[lang].backHome),
        COMMENTS_HEADING: esc(STRINGS[lang].comments),
      });

      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outPath, html, 'utf8');
      count++;
    }
  }
  console.log(`Generados ${count} posts.`);
}

main();
