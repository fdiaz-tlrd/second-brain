# Comparación `app.js` — P2M vs P2P

**Fecha:** 2026-07-04  
**Archivos:**

- P2M: `tld-api-p2m/lambdas/p2m/app.js` (637 líneas)
- P2P: `tld-api-alias/lambdas/alias/app.js` (645 líneas)

## Método

```bash
git diff --no-index tld-api-p2m/lambdas/p2m/app.js tld-api-alias/lambdas/alias/app.js
```

## Resultado

**Sí: en base son el mismo archivo.** El diff reporta **32 inserciones / 24 eliminaciones** y **solo** toca dos bloques:

1. **Imports** de `./lib/metodos` (qué `procesarMetodo*` se importa)
2. **`switch (metodo)`** (qué casos se despachan)

Todo lo demás es **idéntico** línea a línea:

- `lambdaHandler` y fases (`parsear_entrada`, `resolver_canal_emisor`, …)
- `inicializarBitacora`, `parsearYValidarEntrada`
- `resolverCanalEmisor`, `resolverCanalValidador`, `resolverPeticion`, `resolverPeticionDescifrada`
- `responderErrorSinCifrado`, `responderValidacionConCifrado`, `calcularDashboardCodeFinal`
- Manejo `BAD_JSON`, cierre exitoso, dashboard

## Métodos por API

| API | Métodos en `switch` |
|-----|---------------------|
| **P2M** | 0015, 0016, 0017, 0018, 0019, 0021, 0024, 0025 |
| **P2P** | 0002, 0003, 0004, 0005, 0006, 0007, 0008, 0009, 0022, 0023 |

## Implicación para `tld-api-base`

El `app.js` plantilla debe contener **todo el transversal** copiado de P2M (o P2P) y dejar **`procesarMetodo` / `switch`** como único punto de extensión por dominio (P2M, P2P, VCN).

## Nota sobre `lib/`

Este documento solo compara **`app.js`**. No implica que todos los `lib/*.js` sean idénticos entre repos; eso se revisará aparte si hace falta.
