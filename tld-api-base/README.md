# tld-api-base

Documentación viva del repo **`tld-api-base`** (código en [`../../tld-api-base`](../../tld-api-base)).

## Solo estudio — nunca productivo

`tld-api-base` es **ayuda de estudios**: modelo del handler transversal extraído de P2M/P2P. **No se despliega ni se usa como API en producción.** Los repos de producto (VCN, P2P, P2M, …) viven cada uno en su repo y despliegan su propia Lambda.

## Idea común — VCN, P2P y P2M

Estas APIs comparten **el mismo diseño transversal** (otras APIs TLD siguen la misma familia; fuera de alcance aquí hasta nuevo aviso):

| Fase | Qué hace |
|------|----------|
| Parseo | `event` → cuerpo JSON |
| Entrada | Validaciones JS (`idCanal`, `validador`, `peticion`, `idPeticion`, `solicitudes`) |
| Canales | Resolver emisor y validador, plan, cifrado |
| Negocio | `lib/metodos.js` — **distinto por API** |
| Salida | Respuesta con/sin cifrado, bitácora, dashboard |

| API | Repo | Lambda | Estado transversal |
|-----|------|--------|-------------------|
| **P2M** | `tld-api-p2m` | `p2m` | **Referencia** — refactor reciente |
| **P2P** | `tld-api-alias` | `alias` | **Referencia** — alineado a P2M |
| **VCN** | `tld-api-cuenta-nombre` | `cuenta-nombre` | **Atrasado** — corrección en [`../tld-api-cuenta-nombre/`](../tld-api-cuenta-nombre/) |
| **Base** | `tld-api-base` | `base` | **Solo estudio** — modelo extraído (ver abajo) |

P2M y P2P son la **especificación viva** del contrato Postman General. VCN usa la **misma idea**; el handler transversal no se actualizó al mismo nivel (la rama 0001 / cuenta / validador-proxy sí funciona).

**Trabajo actual:** VCN — ver [`../tld-api-cuenta-nombre/`](../tld-api-cuenta-nombre/).

## Origen: ingeniería inversa desde P2M y P2P

1. Se comparó `app.js` P2M vs P2P → **mismo transversal**; solo cambia el `switch` / `lib/metodos.js` (ver [02-comparacion-p2m-p2p-app-js.md](./02-comparacion-p2m-p2p-app-js.md)).
2. Se **extrajo** ese transversal al repo **`tld-api-base`** (`lambdas/base/`) como **modelo documentado**.
3. Ningún repo de producto **depende** de `tld-api-base` en runtime.

## Repos autónomos — regla fija

Cada API TLD de producto + `tld-api-base` **NUNCA se ven entre sí** en runtime:

| Sí | No |
|----|-----|
| Cada API tiene **su propio repo** y despliega **su propia** Lambda | Submodule, paquete npm compartido, layer común obligatorio, import entre repos |
| Se **copia/adapta** código de referencia **dentro** del repo destino | “Consumir” `tld-api-base` como dependencia |
| `tld-api-base` y esta carpeta son **referencia y memoria de estudio** | Unificar repos de producto en uno solo |
| `tld-api-base` **solo estudio** | Desplegar `tld-api-base` a producción |

Extensión por dominio: cada repo de producto tiene su **`lib/metodos.js`**; opcionalmente amplía `lib/validaciones.js` y env propios.

## Por qué el nombre «tld-api-base»

| Nombre descartado | Motivo |
|-------------------|--------|
| `tld-api-esqueleto` | Suena temporal |
| `tld-api-plantilla` | Implica copiar sin evolución |
| **`tld-api-base`** ✓ | Base del handler transversal TLD; nombre corto y estable |

Lambda: **`base`** → `lambdas/base/app.js` (misma convención que `p2m`, `alias`, `cuenta-nombre`).

## Objetivo del repo código (estudio)

Catálogo donde quedó volcada la orquestación transversal: parseo → canales → petición cifrada → validaciones globales → `metodos.procesarMetodo` → cierre cifrado → bitácora/dashboard.

## Estado del repo (paso 2)

```
tld-api-base/
├── template.yaml
├── samconfig.toml
├── .gitignore
└── lambdas/
    ├── layer/nodejs/
    └── base/             ← handler + lib/
```

**Incluido hoy:**

- Handler transversal completo (ver [06-paso-2-lib-completa.md](./06-paso-2-lib-completa.md))
- `lib/metodos.js` stub (418)

**SAM:** ver [07-sam-deploy.md](./07-sam-deploy.md) — referencia técnica del skeleton; **no** implica deploy productivo de este repo.

## Documentos

| Archivo | Contenido |
|---------|-----------|
| [README.md](./README.md) | Este índice |
| [01-paso-1-app-js.md](./01-paso-1-app-js.md) | Paso 1: skeleton `app.js` |
| [02-comparacion-p2m-p2p-app-js.md](./02-comparacion-p2m-p2p-app-js.md) | Ingeniería inversa: diff P2M vs P2P |
| [03-lib-bitacora.md](./03-lib-bitacora.md) | `lib/bitacora.js` idéntico P2M/P2P → base |
| [04-lib-logger.md](./04-lib-logger.md) | `lib/logger.js` idéntico P2M/P2P → base |
| [05-lib-variablesEntorno.md](./05-lib-variablesEntorno.md) | Diff P2M/P2P y conjunto transversal base |
| [06-paso-2-lib-completa.md](./06-paso-2-lib-completa.md) | Paso 2: `lib/` completa + `app.js` cableado |
| [07-sam-deploy.md](./07-sam-deploy.md) | SAM del skeleton (estudio; no productivo) |
| [08-lib-plan.md](./08-lib-plan.md) | `lib/plan.js`: validación suscripción + `CFG_VALIDAR_PLAN_POR_CANAL` |

## Convención second-brain

- **Aquí:** acuerdos sobre base transversal TLD y repo `tld-api-base`.
- **VCN:** [`../tld-api-cuenta-nombre/`](../tld-api-cuenta-nombre/) — trabajo activo.
- El agente **mantiene** estos archivos al día (ver `.cursor/rules/agente-conducta.mdc`).

## Referencias código

- Modelo de estudio: [`../../tld-api-base/lambdas/base/app.js`](../../tld-api-base/lambdas/base/app.js)
- Implementación de referencia (producto): `tld-api-p2m/lambdas/p2m/app.js`, `tld-api-alias/lambdas/alias/app.js`
