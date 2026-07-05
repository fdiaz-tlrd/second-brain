# Triage #11 — Metodo/0001/3_respuestaExitosa (resultado 0)

**Estado:** **planificado** — carpeta creada; JSON **pendiente**.

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
| A11b | Generador + JSON éxito (básico, PACA, PACC, jurídica, máscaras, límites) | **Siguiente** |
| A11c | Newman + checklist | Tras A11b |

## Cuentas / env

Variables y cuentas: [`notas-sueltas/vcn-datos-prueba-dev-metodo-0001-exito.md`](../../notas-sueltas/vcn-datos-prueba-dev-metodo-0001-exito.md).

Validar en dev que dummy/validador devuelve datos reales para esas cuentas antes de fijar asserts estrictos.
