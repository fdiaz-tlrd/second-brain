# 418 — conceptos, capas y permisos por método (prod vs Dig)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-14 (actualizado mismo día tras cierre P2P/VCN prod) |
| Complementa | [418-metodo-no-soportado-analisis-definitivo-2026-07-13.md](./418-metodo-no-soportado-analisis-definitivo-2026-07-13.md) |
| Evidencia prod | `produccion_real/` — **solo lectura** |
| Catálogo reformulado | [`../codigosRespuesta/nueva-tabla-codigo-respuesta.md`](../codigosRespuesta/nueva-tabla-codigo-respuesta.md) — **Nueva descripción** `418` = **Método no soportado por el validador** |

## Cadena de consumo

La **única** entrada pública permitida es **tld-matriz**.

Para P2P: **única cadena permitida de consumo**  
`matriz → validador-api → alias`.

Para VCN:  
`matriz → validador-api → cuenta-nombre` (→ proxy cuando aplica negocio).

No hay otra cadena “admitida” de consumo al producto.

---

## Qué es el 418 en **VCN prod**

Significa: este método **no lo puede usar el canal validador** que vino en la petición.

Después de descifrar, cuenta-nombre mira las operaciones de ese validador en Dynamo (`tld-validador-canal-operacion`). Si no hay fila con ese método y `estado = Y`, responde **418** («Metodo no soportado por el validador» en el texto de prod; catálogo reformulado: **Método no soportado por el validador**).

---

## Qué es el 418 en **P2P prod** (misma cadena única)

Significa: el método **llegó a alias** pero **no está** en `CNT_SOLICITUDES_POR_METODO`.

En la única cadena permitida, para que alias reciba el request, validador-api ya enrutó por `tld-validador-config-servicios`. Por tanto el 418 de P2P prod, en esa cadena, es **desfase de configuración**:

- el método está en `tld-validador-config-servicios` (hacia alias), **pero**
- **no** está en `CNT_SOLICITUDES_POR_METODO` de alias.

No es el mismo significado operativo que VCN (permiso del validador en `canal-operacion`).

Si el consumidor manda un método **ausente** de `tld-validador-config-servicios` (p. ej. `0099`), **no llega a alias**: validador-api responde típicamente **509**, no 418.

---

## Marketplace (arreglo 2026-07-14)

La columna **Nueva descripción** del código **418** pasa de «Método no soportado» a **«Método no soportado por el validador»** (con tilde en Método).

Motivo: alinear el rótulo canónico al sentido de negocio de VCN / texto real de producto; el Marketplace publicado estaba corto/genérico y no reflejaba eso.

Archivos: `nueva-tabla-codigo-respuesta.md` + `.html`.

---

## Dig (solo contexto; no reabre el debate)

Dig amplió cuándo se emite 418 (validador-api, emisor, mapas CFG). Inventario actual — correcto vs incorrecto vs rótulo canónico — en [418-usos-correctos-e-incorrectos-2026-07-14.md](./418-usos-correctos-e-incorrectos-2026-07-14.md).

## Refs código prod

| Qué | Dónde |
|-----|--------|
| VCN 418 validador | `produccion_real/tld-api-cuenta-nombre/.../app.js` + `metodoDisponible` |
| P2P 418 CNT | `produccion_real/tld-api-alias/.../app.js` (`CNT_SOLICITUDES_POR_METODO`) |
| Enrutado | `produccion_real/tld-validador-api/.../getUrlServicioInterno` → `tld-validador-config-servicios` |
