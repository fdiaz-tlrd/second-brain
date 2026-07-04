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

## Estado del repo (paso 1)

```
tld-api-base/
└── lambdas/
    └── base/
        └── app.js    ← flujo por fases; resolvers en stub (throw Pendiente)
```

**Incluido hoy en `app.js`:**

- Fases: `parsear_entrada` → `resolver_canal_emisor` → `resolver_canal_validador` → `resolver_peticion` → `resolver_peticion_descifrada` → `procesar_metodo` → `cerrar_respuesta`
- `obtenerCuerpo` + manejo `BAD_JSON` (400 / *Error en la petición original*)
- Stubs con `throw` para resolvers y dominio (sin `lib/` aún)

**Pendiente (pasos futuros):**

- `lib/response.js`, `lib/validaciones.js`, `lib/canal.js`, …
- `template.yaml` / SAM
- Estrategia de consumo: copia, submodule, o paquete npm interno (decidir antes de extraer)

## Documentos

| Archivo | Contenido |
|---------|-----------|
| [README.md](./README.md) | Este índice |
| *(próximos)* | Mapa P2M→base, plan de extracción, decisiones de empaquetado |

## Convención

Todo lo acordado en chat sobre **base transversal TLD** se documenta aquí, no en `tld-api-cuenta-nombre/` (ese espacio sigue siendo solo VCN).

## Referencias código

- Plantilla de flujo: [`../../tld-api-base/lambdas/base/app.js`](../../tld-api-base/lambdas/base/app.js)
- Referencia implementada: `tld-api-p2m/lambdas/p2m/app.js`
