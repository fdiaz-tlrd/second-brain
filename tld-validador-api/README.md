# Estudio — `tld-validador-api`

Carpeta de trabajo para entender cómo el **orquestador validador** se comunica con el resto de la plataforma.

## Repos comparados

| Repo | Rol | Rama / nota |
|------|-----|-------------|
| [`tld-validador-api`](../../tld-validador-api) | Dev — migración a **Lambda Invoke** | `feature/ARQ-225_Refactory` |
| [`prod/tld-validador-api-main`](../../prod/tld-validador-api-main) | Prod baseline — **axios + URL en Dynamo** | `main` |

## Documentos

| Archivo | Contenido |
|---------|-----------|
| [diferencia-prod-vs-dev-respuesta-producto.md](./diferencia-prod-vs-dev-respuesta-producto.md) | **Diferencia real JSON** prod vs dev (statusCode en `respuesta`) |
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

## Alcance de este estudio

- **Sí:** lambda `validar`, invoke desde **matriz**, invokes a productos, `template.yaml`.
- **API GW `/validar`:** solo prueba manual; no define contrato del canal.
- **Público:** solo matriz. Validador-api y productos son invoke interno.
- **No:** `tld-validador-proxy` (otro repo).

Ver [arquitectura-invoke-y-contratos.md](./arquitectura-invoke-y-contratos.md).
