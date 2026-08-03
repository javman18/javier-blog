---
permalink: false
title: "Título del post"
date: 2026-01-01
excerpt: "Resumen corto de 1-2 frases. Se usa en las tarjetas y como <meta description>."
topics: ["accidente"]
featured: false
---

<!--
CÓMO USAR ESTA PLANTILLA (este archivo nunca se publica, permalink: false lo excluye del build):

1. Copia este archivo a:
     src/posts/es/<categoria>/<slug>.md   (versión en español)
     src/posts/en/<categoria>/<slug>.md   (versión en inglés, MISMO <slug>)

   <categoria> debe ser una de: escritos, implante, cuerpo, trabajo
   (están definidas en src/_data/taxonomy.js — si agregas una categoría nueva, agrégala ahí primero).

2. Llena el frontmatter:
   - title      (obligatorio) — se usa como <h1> y en las tarjetas.
   - date       (obligatorio) — formato YYYY-MM-DD, define el orden en Recientes/Archivo.
   - excerpt    (obligatorio) — resumen corto para tarjetas y meta description.
   - topics     (opcional)    — 1-2 ids del set fijo en src/_data/taxonomy.js
                                 (accidente, audio, cuerpo, ia, desarrollo, vida-diaria).
   - featured   (opcional)    — true para aparecer en Destacados (máximo 3, el más
                                 reciente se muestra grande, automático, sin tocar la home).

   No hace falta declarar `category` ni `lang` — se toman de la carpeta donde guardes el archivo.

3. Escribe el contenido abajo en Markdown normal.

4. Corre `npm run build` (o `npm run serve` para verlo en localhost mientras escribes)
   y haz commit + push. El deploy a GitHub Pages es automático (ver .github/workflows/deploy.yml).
-->

Escribe aquí el contenido del post, en **Markdown**.
