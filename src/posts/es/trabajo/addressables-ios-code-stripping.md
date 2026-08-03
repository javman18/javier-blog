---
title: "Cuando Addressables funcionaba en Android… pero no en iOS"
date: 2026-02-07
excerpt: "Un bug real de producción: Addressables remotos que funcionaban en Android pero fallaban en iOS por una opción poco visible del build."
topics: ["desarrollo"]
---

En uno de los proyectos en los que trabajé usamos **Unity Addressables** para descargar contenido dinámico desde **Azure**. El flujo era el esperado: generar el build de la aplicación, generar el build de Addressables por plataforma, y descargar el contenido en tiempo de ejecución.

Durante un tiempo, todo funcionó sin problemas.

Hasta que alguien generó un nuevo build.

## El problema

Un compañero del equipo hizo:

- un build de la aplicación
- un build de Addressables

Al probar la app, notó algo raro:

- En **Android**, los Addressables se descargaban y funcionaban correctamente.
- En **iOS**, la app arrancaba, pero el contenido remoto simplemente no cargaba.

El problema se compartió con el equipo para ver si alguien encontraba la causa.

## Lo que no era

Antes de tocar configuraciones, revisamos lo obvio:

- Rutas correctas en Azure
- Bundles bien generados
- Sin errores claros en consola
- Sin problemas de red

Nada de eso explicaba el fallo.

Lo más extraño era que **el mismo contenido funcionaba en Android**, lo cual casi siempre apunta a una diferencia de plataforma o de build, no de lógica.

## Mirando el build de iOS con lupa

iOS suele ser más agresivo optimizando el código que Android. Revisando los **Player Settings**, encontré una opción que muchas veces se pasa por alto:

**Code Stripping**

En iOS estaba configurado en **High**.

## El verdadero problema

Con *Code Stripping* en **High**, Unity elimina clases y métodos que considera “no utilizados”.

El detalle era este:

- Algunos scripts no estaban referenciados directamente
- Solo se usaban cuando se descargaba y cargaba un Addressable
- En tiempo de build, Unity los marcaba como innecesarios
- En iOS, esos scripts no llegaban al build final

El resultado:

- Android seguía funcionando
- iOS fallaba silenciosamente al cargar Addressables

## La solución

Fue tan simple como peligrosa de no notar:

Cambiar **Code Stripping** de `High` a `Minimal` en iOS.

Después de eso:

- Los scripts dejaron de eliminarse
- Los Addressables volvieron a cargar
- El comportamiento se igualó entre plataformas

## Lo que me dejó este bug

- No todos los errores están en el código
- iOS y Android no optimizan igual
- Addressables y code stripping agresivo pueden chocar
- A veces el problema no es lo que falla, sino lo que nunca llegó al build

Este tipo de errores no suelen aparecer en tutoriales, pero sí en proyectos reales. Por eso vale la pena documentarlos.
