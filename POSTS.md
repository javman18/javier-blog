# Como agregar posts

Edita `posts.js` y agrega un objeto al arreglo `posts`.

Campos:
- `title`: titulo del post.
- `href`: enlace al post.
- `excerpt`: resumen corto.
- `date`: fecha libre (texto).
- `section`: una de `escritos`, `implante`, `trabajo`, `ahora`.
- `tags`: lista corta de etiquetas.
- `tone`: estilo visual: `calm`, `ink`, `work`, `now`.

Si quieres una nueva seccion:
1) Agrega el valor en `posts.js` dentro de `sections`.
2) Agrega el link en la navegacion de `index.html`.
3) Usa ese mismo `section` en tus posts.
