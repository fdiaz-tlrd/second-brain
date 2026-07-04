# Paso 1 — `app.js` transversal

**Fecha:** 2026-07-04  
**Repo:** [`tld-api-base`](../../tld-api-base)  
**Archivo:** `lambdas/base/app.js`

## Qué se creó

Un único handler con la **misma secuencia de fases** que P2M/P2P (`lambdaHandler` refactorizado), sin dependencias `lib/`.

## Nombre elegido

- Repo: **`tld-api-base`**
- Lambda: **`base`**
- Descartado: `esqueleto` (suena provisional; no comunica que es la base de contrato TLD)

## Fases del handler

```
inicio
  → parsear_entrada          (obtenerCuerpo, BAD_JSON)
  → resolver_canal_emisor    [stub]
  → resolver_canal_validador [stub]
  → resolver_peticion        [stub]
  → resolver_peticion_descifrada [stub]
  → procesar_metodo          [stub — dominio por API]
  → cerrar_respuesta         [stub]
```

## Qué ya funciona sin `lib/`

| Caso | Comportamiento |
|------|----------------|
| Body JSON inválido | HTTP 400, `codigoError` 400, mensaje catálogo *Error en la petición original* |
| Flujo feliz | Falla en primer resolver con `Error: Pendiente tld-api-base: …` |

## Qué sigue (no acordado aún)

1. Extraer `obtenerCuerpo` / `salidaLambda` / `lambdaResult` → `lib/response.js` (copiar de P2M)
2. Portar `resolverCanalEmisor`, … desde P2M a stubs reales
3. Definir interfaz `procesarMetodo` para que VCN/P2P/P2M inyecten su `switch`
4. Decidir cómo consumen `tld-api-base` los tres repos

## Relación con VCN

La corrección de `tld-api-cuenta-nombre` puede **converger hacia base** en lugar de copiar otra vez desde P2M. El triage VCN en [`../tld-api-cuenta-nombre/`](../tld-api-cuenta-nombre/) sigue vigente; este repo es el destino estructural a mediano plazo.
