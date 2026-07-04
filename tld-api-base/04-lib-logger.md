# `lib/logger.js` — P2M, P2P y base

**Fecha:** 2026-07-04

## Comparación

| Archivo | Repo |
|---------|------|
| `lambdas/p2m/lib/logger.js` | P2M |
| `lambdas/alias/lib/logger.js` | P2P |

```bash
git diff --no-index tld-api-p2m/lambdas/p2m/lib/logger.js tld-api-alias/lambdas/alias/lib/logger.js
```

**Resultado:** diff vacío — **archivos idénticos** (304 líneas).

## Copia en `tld-api-base`

```
tld-api-base/lambdas/base/lib/logger.js
```

## API exportada

| Función | Uso |
|---------|-----|
| `infoSafe(message, metadata?, ...extras)` | Log informativo con metadata sanitizada |
| `errorSafe(message, error?, ...extras)` | Log de error con resumen de excepción |
| `metadataEntradaLookup(valor)` | Hash SHA-256 canónico para lookup sin exponer valor |

## Dependencia local

| Módulo | Uso |
|--------|-----|
| `./variablesEntorno` | `PRINT_LOGS` (`"on"` habilita emisión) |

Ver [`05-lib-variablesEntorno.md`](./05-lib-variablesEntorno.md).

## Orden de extracción `lib/`

```
variablesEntorno.js  ← transversal mínimo (ver 05)
logger.js            ← este
bitacora.js          ← depende de logger, date-utils, catalogoRespuestas, variablesEntorno
```
