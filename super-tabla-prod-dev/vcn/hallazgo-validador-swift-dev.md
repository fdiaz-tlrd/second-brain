# Hallazgo: camino feliz dig falla con `validador` SWIFT

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-14 (detectado) · cerrado 2026-07-15 |
| Suite | VCN MATRIZ |
| Runs | prod `2026-07-14T09-09-28Z` · dig cerrado `2026-07-15T18-49-44Z` |
| Estado | **Cerrado** — fix deploy + Newman dig OK; super-tabla regenerada con ese dig |
| Culprit | `tld-api-cuenta-nombre` → `validarParametroValidador` (`length > 4`, corregido a `> 8`) |

## Hecho (pre-fix)

En **producción**, los escenarios `*.1.2. validador por SWIFT … — cuenta feliz` respondían **negocio 0**, forma **B**.

En **dig** (antes del fix), los mismos respondían **400** / `A.mensajeError` / «Error en la petición original».

## Acotación (pre-fix)

| `validador` en request | Caminos felices dig (pre-fix) |
|------------------------|-------------------------------|
| SWIFT / alfa (`CELEGATO`, `ASTRGATO`, …) | **fallaban** (400) |
| Numérico (`1008`, `1009`, …) mismo banco | **OK** (0), igual que prod |

## Cadena (rastro)

```
matriz/tld-validador-validar
  → validador-api/validar          (getCanal(SWIFT) OK)
    → cuenta-nombre                ← FALLABA (length > 4)
      → (proxy no llega; fallo previo a negocio OK)
```

| Capa | ¿Pasa SWIFT? | Evidencia |
|------|--------------|-----------|
| **matriz** `isValid` | **Sí** | Acepta `validador` longitud **1..8** |
| **validador-api** `getCanal(body.validador)` | **Sí** | Resuelve por id o SWIFT; invoke a VCN con body intacto |
| **cuenta-nombre** `validarParametroValidador` | **Antes no / ahora sí** | Tope **8** (antes 4) |
| **cuenta-nombre** `getCanal` | Tras fix sí | Ya soportaba SWIFT; el JS cortaba antes |
| **validador-proxy** | No involucrado en el fallo | |

## Fix aplicado

1. `lambdas/cuenta-nombre/lib/validaciones.js`: `validador.length > 4` → `> 8`.
2. Deploy dig + Newman dig `2026-07-15T18-49-44Z`: escenarios SWIFT feliz con `recibidoNegocio: 0` y `negocioCoincide: true`.
3. `generar-bloques.js` DEFAULTS dig apuntan a ese JSON; `bloques-diferencias-prod-vs-dev.md` regenerado — esos bloques **ya no aparecen** como prod≠dig por negocio 400.
