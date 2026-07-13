# HD-006 — Escenario `1.2.9 validador` asume máx 4; producción es máx 8 (corregir test)

| Campo | Valor |
|-------|--------|
| **ID** | HD-006 |
| **Fecha** | 2026-07-13 |
| **Estado** | **corregido** (2026-07-13) |
| **Severidad** | media |
| **Componente** | `second-brain/Postman/generador` — escenarios de prueba (nuestro código fuente) |
| **Veredicto** | **TEST-MAL** (producción está bien) — **ya ajustado** |

---

## Resumen

El escenario **`1.2.9. validador — longitud 5, máximo 4`** asume que `validador` tiene longitud
máxima **4** (copiado del patrón de `idCanal`). **Es incorrecto:** producción permite `validador`
hasta **8** caracteres (ver [HP-010](../hallazgos-produccion/09-marketplace-api4-longitud-idcanal-validador.md)),
intencional para admitir el código SWIFT.

Producción está **bien**; el que está mal es **nuestro test**.

---

## Detalle

| Aspecto | Valor |
|---------|-------|
| Valor enviado | `validador: "10000"` (5 caracteres) |
| Esperado por el test | `codigoError 400` (asume máx 4) |
| Recibido de prod | `codigoError 404` "Validador no existe" |
| Por qué | 5 ≤ 8 → pasa `isValid` → lookup en BD → no existe → 404 |

`isValid` prod: `!body.validador || (body.validador.length > 8 || body.validador.length < 1)` → máx **8**.

Contraste: `1.1.9. idCanal — longitud 5, máximo 4` **sí** es correcto (idCanal máx 4 → 5 chars → 400, pasa).

---

## Corrección aplicada (2026-07-13, opción A)

Para probar el límite **real** de `validador` (máx 8), el escenario ahora envía **9 caracteres** y
espera `400`:

- Archivo renombrado `2.9_validador_longitud_5.json` → **`2.9_validador_longitud_9.json`**.
- `nombre`: **`1.2.9. validador — longitud 9, máximo 8 (400)`**.
- Valor: `validador: "123456789"` (9 chars).
- `expectedCodigoError`: 400 (sin cambio).

**Fuente editada (una sola):** `Postman/generador/P2M Escenarios error/General/1_validaciones_js/2_validador/2.9_validador_longitud_9.json`.

**Propagación (regla transversal de matriz):** la longitud de `validador` la impone `isValid` en
`tld-matriz`, que es transversal a todos los servicios. Por eso el arreglo se hizo en la fuente P2M y
se regeneró con `bootstrap-general-vcn.js` + `bootstrap-general-p2p.js`, quedando corregido en las
**tres** suites: **P2M** (fuente directa), **VCN** y **P2P** (generadas). Colecciones re-ensambladas y
validadas (`JSON.parse OK`).

## Cobertura nueva — caminos felices por SWIFT (aplicado)

Se agregaron **8 caminos felices** (solo VCN) que envían el **SWIFT code** (8 chars) en `validador`,
uno por cada canal validador que hoy se prueba, para ejercitar el lookup por `alias`:

| Archivo (VCN `Metodo/0001/3_respuestaExitosa/<val>/`) | `validador` enviado |
|---|---|
| `1008/1.2_cuenta_feliz_swift.json` | `CELEGATO` |
| `1009/1.2_cuenta_feliz_swift.json` | `ASTRGATO` |
| `1011/1.2_cuenta_feliz_swift.json` | `MIRAGATO` |
| `1012/1.2_cuenta_feliz_swift.json` | `TERAGATO` |
| `1013/1.2_cuenta_feliz_swift.json` | `AMIYGATO` |
| `1014/1.2_cuenta_feliz_swift.json` | `CORNGATO` |
| `1015/1.2_cuenta_feliz_swift.json` | `ZONAGATO` |
| `1016/1.2_cuenta_feliz_swift.json` | `BELLGATO` |

Cada archivo es copia exacta de su `1.1_cuenta_feliz.json` (mismo `expectedCuenta`, `expectedBanco`,
`expectedProducto`, `expectedEnmascarado`, titulares) cambiando **solo** `body.validador` al SWIFT.
El resultado esperado no varía: el éxito depende de la cuenta, y el SWIFT resuelve al mismo canal.
SWIFT tomados de `Postman/canalesPruebas-dev.json` (campo `swiftCode`/`alias`), no inventados.

---

## Referencias

- [HP-010](../hallazgos-produccion/09-marketplace-api4-longitud-idcanal-validador.md)
- [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 1.2
