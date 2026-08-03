// Fuente única de verdad para categorías y tags.
// El nav, el archivo por tema y las pills de tags leen de aquí — no se repiten en ningún template.

module.exports = {
  categories: [
    { id: "escritos", label: { es: "Escritos", en: "Writing" } },
    { id: "implante", label: { es: "Implante", en: "Implant" } },
    { id: "cuerpo", label: { es: "Cuerpo", en: "Body" } },
    { id: "trabajo", label: { es: "Trabajo", en: "Work" } },
  ],

  // Set fijo de topics (antes "tags" libres). Un post usa 1-2 de estos en su frontmatter `topics`.
  topics: [
    { id: "accidente", label: { es: "Accidente", en: "Accident" } },
    { id: "audio", label: { es: "Audio", en: "Sound" } },
    { id: "cuerpo", label: { es: "Cuerpo", en: "Body" } },
    { id: "ia", label: { es: "IA", en: "AI" } },
    { id: "desarrollo", label: { es: "Desarrollo", en: "Development" } },
    { id: "vida-diaria", label: { es: "Vida diaria", en: "Daily life" } },
  ],
};
