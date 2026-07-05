# `lib/bitacora.js` — P2M, P2P y base

**Fecha:** 2026-07-04

## Comparación

| Archivo | Repo |
|---------|------|
| `lambdas/p2m/lib/bitacora.js` | P2M |
| `lambdas/alias/lib/bitacora.js` | P2P |

```bash
git diff --no-index tld-api-p2m/lambdas/p2m/lib/bitacora.js tld-api-alias/lambdas/alias/lib/bitacora.js
```

**Resultado:** diff vacío — **archivos idénticos** (98 líneas).

## Copia en `tld-api-base`

```
tld-api-base/lambdas/base/lib/bitacora.js
```

Contenido tomado de P2M/P2P sin cambios.

## Dependencias locales (aún no en base)

`bitacora.js` requiere en el mismo `lib/`:

| Módulo | Uso |
|--------|-----|
| `./logger` | `infoSafe`, `errorSafe` |
| `./date-utils` | `utc5_nowShiftedMinus5Hours`, formatos fecha |
| `./catalogoRespuestas` | `MSG_CATALOGO` |
| `./variablesEntorno` | `DB_BITACORA` |

Hasta que esos módulos existan en `tld-api-base/lib/`, `bitacora.js` no es ejecutable en aislamiento; es copia de referencia para extracción.

## Pendiente en repos consumidores

P2M, P2P y VCN **siguen** usando su `lib/bitacora.js` local. Para alinear VCN: **copiar/adaptar** desde base o P2M dentro de `tld-api-cuenta-nombre` (repos autónomos; ver [README.md](./README.md)).
