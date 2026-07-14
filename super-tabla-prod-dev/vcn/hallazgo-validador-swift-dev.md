# Hallazgo: camino feliz dig falla con `validador` SWIFT

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-14 |
| Suite | VCN MATRIZ |
| Runs | prod `2026-07-14T09-09-28Z` · dig `2026-07-14T16-03-14Z` |
| Estado | **Fix en código** — `validarParametroValidador` tope 8. Pendiente: deploy dig + Newman dig + regenerar super-tabla |
| Culprit | `tld-api-cuenta-nombre` → `validarParametroValidador` (`length > 4`, corregido a `> 8`) |

## Hecho

En **producción**, los 8 escenarios `*.1.2. validador por SWIFT … — cuenta feliz` responden **negocio 0**, forma **B**.

En **dig** (antes del fix), los mismos 8 respondían **400** / `A.mensajeError` / «Error en la petición original».

## Acotación

| `validador` en request | Caminos felices dig (pre-fix) |
|------------------------|-------------------------------|
| SWIFT / alfa (`CELEGATO`, `ASTRGATO`, …) | **8/8 fallan** (400) |
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
| **cuenta-nombre** `validarParametroValidador` | **Antes no / ahora sí** | Tope **8** (antes 4). Código dig alineado a matriz + Postman `1.2.9` |
| **cuenta-nombre** `getCanal` | Tras fix sí | Ya soportaba SWIFT; el JS cortaba antes |
| **validador-proxy** | No involucrado en el fallo | |

## Fix aplicado

1. `lambdas/cuenta-nombre/lib/validaciones.js`: `validador.length > 4` → `> 8`.
2. Docs triage/checklist: máximo 8 (Postman fuente ya tenía longitud 9 / máximo 8).

## Pendiente (máquina VPN)

Deploy VCN dig → Newman dig → regenerar `bloques-diferencias.md` → confirmar 8 felices SWIFT en 0.
