---
title: "Cómo evalúo agentes de IA: personalidad, RAG y similitud semántica"
date: 2026-01-21
excerpt: "Un vistazo práctico: cómo pruebo si un agente se comporta como debe y si el RAG realmente mejora las respuestas."
topics: ["ia"]
---

La parte que más me interesa de trabajar con agentes de IA no es “hacer que contesten”, sino asegurar que contesten *como deben*. Que no se salgan del papel, que no inventen, y que mantengan un estilo consistente incluso cuando el usuario cambia de tema o pregunta cosas ambiguas.

Por eso, además de construir el RAG, también me toca armar pipelines de evaluación: pruebas repetibles para medir si el sistema mejora o si solo “se siente mejor”.

## 1) Personalidad: ¿el agente se comporta como dice el prompt?

Cuando digo “personalidad”, no me refiero a que el agente sea chistoso o carismático. Me refiero a reglas claras: tono, límites, nivel de seguridad, nivel de paciencia, qué tanto pregunta antes de asumir, y qué tanto se mantiene dentro del objetivo.

Para evaluarlo, uso baterías de prompts (escenarios) que estresan al agente: preguntas ambiguas, cambios bruscos, contradicciones, provocaciones, etc. Lo importante es que esas pruebas sean consistentes, para comparar versiones.

Ahí es donde descubres cosas raras: un ajuste mínimo puede hacer que el agente se vuelva “más obediente” pero también más rígido, o que pierda naturalidad.

## 2) RAG: ¿de verdad mejora o solo agrega ruido?

Con RAG el riesgo no es solo alucinar, también es meter contexto que distrae. A veces el modelo “agarra” el chunk equivocado y se clava en un detalle irrelevante. O el sistema recupera texto correcto pero en el orden equivocado.

En vez de asumir que “más documentos = mejor”, lo trato como hipótesis: cambio una variable, corro el set de pruebas y comparo resultados.

## 3) Similitud semántica: comparar RAG vs no-RAG

Una métrica que me sirve mucho es medir similitud semántica entre respuestas. Por ejemplo: misma pregunta, dos configuraciones (RAG vs no-RAG), y luego comparar qué tanto se parecen al resultado esperado.

No es una bala de plata, pero ayuda a detectar patrones: cuándo RAG realmente ancla la respuesta, y cuándo solo hace que el modelo “suene” más seguro sin ser más correcto.

## 4) Lo que busco al final

Al final, lo que quiero es simple: un agente que mantenga su comportamiento bajo presión y un RAG que aporte precisión, no solo texto extra.

Lo interesante es que este trabajo nunca se siente terminado. Siempre estás decidiendo entre trade-offs: precisión vs latencia, consistencia vs flexibilidad, y “responder rápido” vs “hacer la pregunta correcta”.

Y cuando por fin crees que lo tienes, cambias de modelo… y vuelves a empezar.
