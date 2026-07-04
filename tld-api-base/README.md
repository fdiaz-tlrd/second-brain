# tld-api-base

Documentación viva del proyecto **`tld-api-base`**: plantilla transversal TLD compartida por VCN, P2P y P2M.

## Por qué no «esqueleto»

| Nombre descartado | Motivo |
|-------------------|--------|
| `tld-api-esqueleto` | Suena temporal; no describe el rol |
| `tld-api-plantilla` | Válido, pero implica «copiar y pegar» sin evolución |
| **`tld-api-base`** ✓ | Base común del handler; nombre corto y estable |

Lambda: **`base`** → `lambdas/base/app.js` (misma convención que `p2m`, `alias`, `cuenta-nombre`).

## Relación con los repos existentes

| Repo | Rol | Estado transversal |
|------|-----|-------------------|
| `tld-api-p2m` | P2M | Referencia actual (refactor reciente) |
| `tld-api-alias` | P2P | Alineado a P2M |
| `tld-api-cuenta-nombre` | VCN | Atrasado; corrección documentada en [`../tld-api-cuenta-nombre/`](../tld-api-cuenta-nombre/) |
| **`tld-api-base`** | Base común | **Nuevo** — extraer y mantener aquí lo transversal |

## Objetivo

Un solo lugar donde vive la **orquestación transversal** (parseo, canales, petición cifrada, validaciones JS, respuestas con/sin cifrado). Los repos de dominio (P2M, P2P, VCN) conservan solo **`lib/metodos.js`** y lógica propia.

## Estado del repo (paso 2)

```
tld-api-base/
├── template.yaml
├── samconfig.toml
├── .gitignore
└── lambdas/
    ├── layer/nodejs/     ← dependencias SAM
    └── base/             ← handler + lib/
```

**Incluido hoy:**

- Handler transversal completo: parseo → canales → petición cifrada → validaciones globales → `metodos.procesarMetodo` → cierre cifrado → bitácora/dashboard
- `lib/metodos.js` stub (418); cada API de dominio lo reemplaza

**Pendiente (pasos futuros):**

- Estrategia de consumo: copia, submodule, o paquete npm interno (decidir antes de migrar VCN/P2P/P2M)

**SAM (paso 3):** ver [07-sam-deploy.md](./07-sam-deploy.md) — perfiles iguales a P2M; sin crear tablas.

## Documentos

| Archivo | Contenido |
|---------|-----------|
| [README.md](./README.md) | Este índice |
| [01-paso-1-app-js.md](./01-paso-1-app-js.md) | Paso 1: skeleton `app.js` |
| [02-comparacion-p2m-p2p-app-js.md](./02-comparacion-p2m-p2p-app-js.md) | Verificación diff P2M vs P2P `app.js` |
| [03-lib-bitacora.md](./03-lib-bitacora.md) | `lib/bitacora.js` idéntico P2M/P2P → base |
| [04-lib-logger.md](./04-lib-logger.md) | `lib/logger.js` idéntico P2M/P2P → base |
| [05-lib-variablesEntorno.md](./05-lib-variablesEntorno.md) | Diff P2M/P2P y conjunto transversal base |
| [06-paso-2-lib-completa.md](./06-paso-2-lib-completa.md) | Paso 2: `lib/` completa + `app.js` cableado |
| [07-sam-deploy.md](./07-sam-deploy.md) | Paso 3: SAM sin tablas ni infra de datos |

## Convención

Todo lo acordado en chat sobre **base transversal TLD** se documenta aquí, no en `tld-api-cuenta-nombre/` (ese espacio sigue siendo solo VCN).

## Referencias código

- Plantilla de flujo: [`../../tld-api-base/lambdas/base/app.js`](../../tld-api-base/lambdas/base/app.js)
- Referencia implementada: `tld-api-p2m/lambdas/p2m/app.js`
