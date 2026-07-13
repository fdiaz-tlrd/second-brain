# Estudio — `tld-validador-api`

Carpeta de trabajo para entender cómo el **orquestador validador** se comunica con el resto de la plataforma.

> **Respuesta rápida — ¿el invoke de dev devuelve bien el HTTP Code?** → **SÍ** (matriz siempre 200; validador-api solo 200/400, tras fix HD-007). Detalle y evidencia: [http-code-cadena-cumplimiento-2026-07-13.md](./http-code-cadena-cumplimiento-2026-07-13.md) (ver **VEREDICTO RÁPIDO** arriba del doc).

## Repos comparados

| Repo | Rol | Rama / nota |
|------|-----|-------------|
| [`tld-validador-api`](../../tld-validador-api) | Dev — migración a **Lambda Invoke** (repo de trabajo, aquí van los fixes) | `feature/ARQ-225_Refactory` |
| [`produccion_real/tld-validador-api`](../../produccion_real/tld-validador-api) | **Prod real** — axios + URL en Dynamo. Solo lectura. Clon 2026-07-13, HEAD `18b2ebb`. Ver [produccion_real/02-tld-validador-api-clon.md](../produccion_real/02-tld-validador-api-clon.md) | `main` |
| [`prod_adactado_a_dev/tld-validador-api`](../../prod_adactado_a_dev/tld-validador-api) | Prod adaptado a dev (generó los datos Newman) | — |

## Documentos

| Archivo | Contenido |
|---------|-----------|
| [diferencia-prod-vs-dev-respuesta-producto.md](./diferencia-prod-vs-dev-respuesta-producto.md) | **Diferencia real JSON** prod vs dev (statusCode en `respuesta`) |
| [correccion-validar-hallazgos-2026-07-13.md](./correccion-validar-hallazgos-2026-07-13.md) | **Corrección `validar`**: HP-012/013/014 (código) + HP-016/018 (ya resueltos por refactor). Verificado 24/24 |
| [http-code-cadena-cumplimiento-2026-07-13.md](./http-code-cadena-cumplimiento-2026-07-13.md) | **HTTP Code de la cadena** matriz + validador-api vs prod; HD-007 (500→200) |
| [hallazgos-pendientes.md](./hallazgos-pendientes.md) | Pendientes QA / producto / deploy |
| [../Postman/00-estado-y-retomo.md](../Postman/00-estado-y-retomo.md) | **Checkpoint** Postman + Newman (pausa, retomo, runs pendientes) |
| [arquitectura-invoke-y-contratos.md](./arquitectura-invoke-y-contratos.md) | Público = matriz; invoke interno; API GW solo prueba |
| [comunicacion-prod-vs-dev.md](./comunicacion-prod-vs-dev.md) | Comparación axios vs invoke, routing, IAM |
| [respuesta-a-matriz.md](./respuesta-a-matriz.md) | Respuesta validador-api → matriz (invoke) |
| [timeouts-y-dependencias.md](./timeouts-y-dependencias.md) | Timeouts, layer, deploy |
| [cadena-servicios.md](./cadena-servicios.md) | Cadena hasta Canal Validador |
| [hallazgos-pendientes.md](./hallazgos-pendientes.md) | Pendientes QA / producto |

## Doc en el repo dev

- [`tld-validador-api/docs/architecture/migracion-llamado-api-gateway-a-invoke.md`](../../tld-validador-api/docs/architecture/migracion-llamado-api-gateway-a-invoke.md) — decisión **opción B** (mapa en código + nombres en env).

## Verificadores (helpers reutilizables — no borrar)

| Script | Qué prueba |
|--------|------------|
| `verificar-como-axios-data.js` | invoke + strip `statusCode` ≡ `axios.data` de prod |
| `verificar-validarParametroSolicitudes.js` | `validarParametroSolicitudes` real tras HP-012/013/014 (24 casos). Carga el módulo del repo dev vía `NODE_PATH` del layer |

## Alcance de este estudio

- **Sí:** lambda `validar`, invoke desde **matriz**, invokes a productos, `template.yaml`.
- **API GW `/validar`:** solo prueba manual; no define contrato del canal.
- **Público:** solo matriz. Validador-api y productos son invoke interno.
- **No:** `tld-validador-proxy` (otro repo).

Ver [arquitectura-invoke-y-contratos.md](./arquitectura-invoke-y-contratos.md).
