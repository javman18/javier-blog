# Blog de Javier

Sitio estático generado con [Eleventy](https://www.11ty.dev/). El contenido vive en archivos
Markdown; el build genera el HTML final en `_site/`, y GitHub Actions lo publica solo en
cada push a `main` (ver `.github/workflows/deploy.yml`).

## Agregar un post nuevo

1. Copia `src/posts/_template.md` a:
   ```
   src/posts/es/<categoria>/<slug>.md
   src/posts/en/<categoria>/<slug>.md
   ```
   Usa el **mismo `<slug>`** (nombre de archivo) en ambos idiomas — así el toggle ES/EN
   sabe a qué URL saltar. `<categoria>` debe ser una de las definidas en
   `src/_data/taxonomy.js`: `escritos`, `implante`, `cuerpo`, `trabajo`.

2. Llena el frontmatter:

   | Campo      | Obligatorio | Descripción |
   |------------|:-----------:|--------------|
   | `title`    | sí | Título del post (se usa como `<h1>` y en las tarjetas). |
   | `date`     | sí | `YYYY-MM-DD`. Define el orden en Recientes y Archivo. |
   | `excerpt`  | sí | Resumen corto para tarjetas y `<meta description>`. |
   | `topics`   | no | 1-2 ids del set fijo en `src/_data/taxonomy.js` (`accidente`, `audio`, `cuerpo`, `ia`, `desarrollo`, `vida-diaria`). |

   No declares `category` ni `lang` en el frontmatter — se toman solos de la carpeta
   donde guardas el archivo. Tampoco hay campo `featured` — ver más abajo.

3. Escribe el contenido en Markdown normal debajo del frontmatter. Cada salto de
   línea que escribas se respeta como salto visual — no hace falta dejar espacios
   al final de la línea ni nada especial, solo Enter donde quieras el corte.

4. Corre `npm run serve` para verlo en `http://localhost:8080` mientras escribes.

5. Haz commit y push a `main`. El deploy a GitHub Pages es automático — no hay que
   correr ningún build a mano ni tocar HTML de otras páginas.

### Destacados de la home

Se controlan desde un solo archivo, `src/_data/featured.js`:

```js
module.exports = [
  { slug: "sindrome-mesa-cena", size: "big" },
  { slug: "activacion-implante", size: "small" },
  { slug: "libro-accidente", size: "small" },
];
```

Cada entrada es un `<slug>` (el nombre del archivo, sin `.md`, igual en ES y EN) con
su propio `size`: `"big"` se pinta arriba y grande, `"small"` abajo en fila. No hay
un tope fijo en el código — pon cuantas entradas de cada tipo quieras, el layout se
arma solo. Para cambiar los destacados, edita este arreglo. No hay que tocar los
posts ni ninguna plantilla, y no depende de la fecha del post.

### ¿Nueva categoría?

Agrégala en `src/_data/taxonomy.js` (arreglo `categories`) y crea las carpetas
`src/posts/es/<id>/` y `src/posts/en/<id>/` con su `.11tydata.json`:

```json
{ "category": "<id>" }
```

El nav, el Archivo y las tarjetas la recogen solos — no hay que tocar ningún template.

### ¿Nuevo topic?

Agrégalo en `src/_data/taxonomy.js` (arreglo `topics`), con su label en `es` y `en`.

## Correr el sitio localmente

```bash
npm install
npm run serve     # http://localhost:8080, recarga en caliente
npm run build     # genera _site/ (lo mismo que corre GitHub Actions)
```

## Estructura

```
src/
├── _data/
│   ├── taxonomy.js      # categorías + topics — única fuente de verdad
│   └── site.js           # textos del sitio (ES/EN), ids de giscus/goatcounter
├── _includes/
│   ├── layouts/
│   │   ├── base.njk       # shell compartido (header/nav/footer) de todo el sitio
│   │   └── post.njk        # chrome de la página de post individual
│   └── components/
│       ├── postcard.njk    # tarjeta reutilizable (destacados/recientes)
│       └── home-main.njk   # destacados + recientes + archivo de la home
├── posts/
│   ├── es/<categoria>/<slug>.md
│   ├── en/<categoria>/<slug>.md
│   └── _template.md         # plantilla de ejemplo (no se publica)
├── index.njk                # home ES
├── en/index.njk              # home EN
├── sitemap.njk               # genera /sitemap.xml en cada build
├── style.css
└── assets/
```

## Deploy

El repo despliega a GitHub Pages vía GitHub Actions (`.github/workflows/deploy.yml`):
cada push a `main` corre `npm run build` y publica `_site/`. Requisito de una sola vez:
en GitHub, **Settings → Pages → Build and deployment → Source**, selecciona
**"GitHub Actions"** (no "Deploy from a branch").

El dominio propio (`CNAME`) y `.nojekyll` se copian automáticamente al build.
