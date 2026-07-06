# Triage #11 — Metodo/0001/3_respuestaExitosa (resultado 0)

**Estado:** **JSON generado** (14 escenarios) — Newman **pendiente VPN**.

## Decisión: no renombrar `VCN Escenarios error`

| Opción | Veredicto |
|--------|-----------|
| Renombrar raíz a `VCN Escenarios` | **Rechazado** — rompe `config-vcn.json`, `run-newman.js`, logs, commits, muscle memory |
| Colección nueva separada | **Rechazado** — duplica Pre-request/Post-response, environment, Newman |
| **Misma árbol, subcarpeta `3_respuestaExitosa/`** | **Adoptado** — mismo patrón que `1_validaciones_js`, `2_respuestaCanalValidador` |

Los escenarios de éxito viven en la **misma fuente** y la **misma colección** Postman. Solo cambia `expectedTipo: "exito"` y asserts sobre `datos`.

## Post-response

`Post-response.js` raíz: tipo **`exito`** añadido — valida `resultado = 0`, `datos` con `banco`, `cuenta`, `producto`, `estadoCuenta`, `titulares`, `estadoCuenta = "0"`. Opcional: variable `expectedProducto` para PACA/PACC.

## Estructura fuente

`Postman/generador/VCN Escenarios error/Metodo/0001/3_respuestaExitosa/`

Ver README en esa carpeta para subcarpetas planificadas.

## Referencia QA

[`Postman/equipo-pruebas/Validacion Cuenta Nombre/estudio-coleccion-vcn.md`](../../Postman/equipo-pruebas/Validacion%20Cuenta%20Nombre/estudio-coleccion-vcn.md) — filas 1–7, 24–30 (no modificar ese archivo).

## Acción

| ID | Acción | Estado |
|----|--------|--------|
| A11a | Decisión estructura + `exito` en Post-response | **Hecho** |
| A11b | Generador + JSON éxito (básico, PACA, PACC, jurídica, máscaras, límites) | **Hecho** |
| A11c | Newman + checklist | **Siguiente** (VPN) |

## Cuentas / env

Variables env: [`Postman/generador/entornos/VCN Escenarios error - desarrollo.postman_environment.json`](../../Postman/generador/entornos/VCN%20Escenarios%20error%20-%20desarrollo.postman_environment.json) (`CANAL_VALIDADOR_EXITO`, `Variostitulares`, `Cuenta1`, `Cuenta34`). Dynamo: [`notas-sueltas/cargar-tld-validador-dummy-cuentas-vcn-dev.md`](../../notas-sueltas/cargar-tld-validador-dummy-cuentas-vcn-dev.md).
