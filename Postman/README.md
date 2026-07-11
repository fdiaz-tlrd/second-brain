# Postman

Dos ramas con propósitos distintos:

| Carpeta | Contenido |
|---------|-----------|
| [`equipo-pruebas/`](equipo-pruebas/) | Colecciones y environments **recibidos del equipo de pruebas**. Un archivo monolítico por colección. |
| [`generador/`](generador/) | **Generador propio** de colecciones Postman: escenarios en archivos separados + scripts que arman el `.postman_collection.json`. Ver [`generador/estudio-generador.md`](generador/estudio-generador.md). |

No mezclar artefactos recibidos con fuentes generadas.

## Canales de prueba (dev)

Carpeta [`canalesPruebas-dev/`](./canalesPruebas-dev/) — datos Dynamo, export AWS, seed operaciones y referencia Postman.

## Notas propias

- [`ideas-rastreo-evidencias.md`](ideas-rastreo-evidencias.md) — estrategia de rastreo, evidencias AWS y diferencias con lo del equipo de pruebas.
- [`comparar-prod-vs-dev/`](comparar-prod-vs-dev/) — diseño para grabar el resultado de cada escenario y etiquetar la versión de código (prod/dev), y así comparar la versión productiva contra una en desarrollo en el mismo AWS de desarrollo.
- [`generador/validacion-idSolicitud/`](generador/validacion-idSolicitud/) — registro vivo de iteraciones sobre validación `idSolicitud` (escenarios Postman + alineación P2P/P2M/VCN).
- [`generador/validacion-preguntas-seguridad/`](generador/validacion-preguntas-seguridad/) — catálogo método 0005, validación `idPregunta` y `respuestas[].id` (P2P).
