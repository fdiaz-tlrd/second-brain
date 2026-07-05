# Postman

Dos ramas con propósitos distintos:

| Carpeta | Contenido |
|---------|-----------|
| [`equipo-pruebas/`](equipo-pruebas/) | Colecciones y environments **recibidos del equipo de pruebas**. Un archivo monolítico por colección. |
| [`generador/`](generador/) | **Generador propio** de colecciones Postman: escenarios en archivos separados + scripts que arman el `.postman_collection.json`. Ver [`generador/estudio-generador.md`](generador/estudio-generador.md). |

No mezclar artefactos recibidos con fuentes generadas.

## Canales de prueba (dev)

| Archivo | Contenido |
|---------|-----------|
| [`canalesPruebas-dev.json`](./canalesPruebas-dev.json) | Datos completos por canal (matriz, credenciales, plan, validador) |
| [`canalesPruebas-dev.md`](./canalesPruebas-dev.md) | Referencia legible + payloads Postman |

## Notas propias

- [`ideas-rastreo-evidencias.md`](ideas-rastreo-evidencias.md) — estrategia de rastreo, evidencias AWS y diferencias con lo del equipo de pruebas.
