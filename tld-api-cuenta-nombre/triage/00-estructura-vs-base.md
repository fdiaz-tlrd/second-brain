# Triage #0 — Estructura VCN vs base

Documento del agente (2026-07-05). Memoria para instancias futuras.

## Referencias de código en alcance **ahora**

| Ruta | Rol | ¿Modificar? |
|------|-----|-------------|
| `tld-api-cuenta-nombre/lambdas/cuenta-nombre/` | **VCN dev** — repo de corrección | Sí, cuando el usuario lo pida |
| `tld-api-base/lambdas/base/` | Modelo transversal (estudio) | No — copiar/adaptar |
| `tld-api-p2m`, `tld-api-alias` | Especificación viva | No — solo lectura |

**Producción congelada:** [`../referencia-produccion.md`](../referencia-produccion.md) — **fuera de alcance** en este momento; no comparar ni copiar desde ahí salvo aviso del usuario.

## Qué es cada cosa (dev vs base)

| Pieza | Base | VCN dev |
|-------|------|---------|
| Transversal | Fases + `validaciones.js` + `plan.js` | Monolito en `app.js`, sin `validaciones.js` |
| Dominio | `metodos.js` stub 418 | **0001** inline en `app.js` |
| Validador | N/A (stub) | `validador-proxy-lambda.js` |
| Métodos | Ninguno (estudio) | Solo **0001** |

VCN **solo** tiene negocio en **0001**. Base **no** implementa métodos; el gancho es `metodos.procesarMetodo`.

## Gap transversal (VCN dev)

1. `validatePlan` (~57) **antes** de comprobar `idCanal` / `validador` / `peticion` (~78).
2. Sin `validaciones.validarParametroIdCanal` (etc.).
3. Sin `responderValidacionConCifrado` / catálogo homogéneo.
4. Sin validación post-descifrado de `idPeticion` / `solicitudes` antes del proxy.
5. Dominio 0001 mezclado en `app.js` en lugar de `lib/metodos.js`.

Newman General: **63 fallos transversales**, **Metodo/0001 cuenta OK** en dev.

## Qué portar de base vs qué conservar en VCN

**Desde base (copiar/adaptar dentro de `tld-api-cuenta-nombre`):**

- Orden de fases y `lib/validaciones.js`
- `lib/plan.js` (reemplazar `util.validatePlan` en subfase A5)
- Helpers de respuesta alineados a P2M/base
- `variablesEntorno` con `CFG_METODOS_LIMITES_JSON` → `{ "0001": 1 }`

**Solo VCN (no en base; `lib/metodos.js` en Fase C):**

- `validador-proxy-lambda.js`
- `getResultadoValidador.js`
- `validaFormatCta` + respuesta 413 cifrada
- `util.validarMascara`

## Decisiones relacionadas

- Estrategia: [03-estrategia-transversal-vs-parche.md](../03-estrategia-transversal-vs-parche.md)
- Fase A dividida: [04-decision-fase-a-dividida.md](../04-decision-fase-a-dividida.md)
