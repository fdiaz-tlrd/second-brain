# HP-012 — Validación de `idSolicitud` responde 404 (reusado) en vez de 431

| Campo | Valor |
|-------|--------|
| **ID** | HP-012 |
| **Fecha** | 2026-07-13 |
| **Estado** | **corregido-en-dev** (2026-07-13, `validador.js`; verificado 24/24) — pendiente deploy + re-run |
| **Severidad** | media-alta |
| **Componente** | `tld-validador-api` / `lambdas/validar` (`validarParametroSolicitudes`) |
| **Ámbito** | transversal (validador) — observado en VCN |
| **Veredicto** | **PROD-MAL** (el esperado del test, 431, es el correcto) |

---

## Resumen

Cuando el campo `idSolicitud` no cumple sus criterios (ausente, vacío, null, tipo no-string,
solo espacios, longitud > 64, duplicado case-insensitive), la validación **sí ocurre** en producción,
pero devuelve **`codigoError 404`** con el mensaje "Campo idSolicitud no cumple con los criterios". El
problema: **404 ya está asignado a "Validador no existe"** en la documentación técnica del Marketplace
(`produccion_real/telered_content_mktpl/tech_doc/api_4.json`). Un mismo código (404) queda usado para
**dos temas distintos** (validador inexistente vs. idSolicitud inválido), lo que rompe la semántica del
catálogo para el integrador. Por eso se introdujo el código **431 "Campo idSolicitud no cumple con los
criterios"** (`second-brain/codigosRespuesta/nueva-tabla-codigo-respuesta.html`).

---

## Comportamiento en producción (observado)

- **Ruta:** cliente → VCN → matriz → validador (end-to-end).
- **Recibido:** `codigoError 404` "Campo idSolicitud no cumple con los criterios" (HTTP 200).
- **Doc Marketplace prod:** `404 = "Validador no existe"` — el código no corresponde al mensaje.
- **Condición:** escenarios `1.5.4`–`1.5.8`, `1.5.20`–`1.5.22`, `1.5.25`, `1.5.26`, y `1.5.9` (duplicado).

En `tld-validador-api/lambdas/validar/lib/validador.js` → `validarParametroSolicitudes` todas las ramas
de rechazo de `idSolicitud` devuelven `statusCode: 404` (líneas 60-80). También la cantidad de
solicitudes fuera de rango devuelve `425`.

---

## Comportamiento esperado

- **`431` "Campo idSolicitud no cumple con los criterios"** (código nuevo dedicado), para no colisionar
  con el 404 de "Validador no existe".
- Diseño de códigos: ver `second-brain/codigosRespuesta/nueva-tabla-codigo-respuesta.html` (fila 431,
  escenarios `1.5.4`–`1.5.9`).
- Diferencia concreta: esperado **431** vs recibido **404**.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `Postman/generador/logs/historial/vcn/2026-07-13T03-16-37Z_prod_MATRIZ_completo*.json` (1.5.4–1.5.8, 1.5.20–1.5.26 → 404) |
| Código prod | `prod_adactado_a_dev/tld-validador-api/lambdas/validar/lib/validador.js` — `validarParametroSolicitudes` (51-91): ramas `statusCode: 404` (60-80) |
| Doc Marketplace prod | `produccion_real/telered_content_mktpl/tech_doc/api_4.json` — tabla "Razones… Interno de la autopista": `404 = "Validador no existe"` |
| Diseño 431 | `second-brain/codigosRespuesta/nueva-tabla-codigo-respuesta.html` (fila 431) |
| Revisión | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 1.5 |

---

## Causa raíz

`validarParametroSolicitudes` reutiliza `statusCode: 404` para todos los rechazos de `idSolicitud`,
un código que el catálogo ya tenía asignado a "Validador no existe" (rechazo por canal validador
inexistente, `app.js` línea 44). No existía un código propio para el fallo de `idSolicitud`.

---

## Impacto

- **Semántica rota para el integrador:** recibe 404 que en la doc significa "Validador no existe",
  cuando el problema es su `idSolicitud`. Diagnóstico erróneo.
- **Colisión de catálogo:** un mismo código sirve a dos causas; imposible distinguirlas por código.

---

## Mejora propuesta (en dev — ajuste de prod, NO ajuste de prueba)

Devolver **431** en las ramas de `validarParametroSolicitudes` que hoy responden 404 por `idSolicitud`.
El test **no** cambia: `1.5.x` sigue esperando **431** (correcto). La corrida contra `prod_adactado_a_dev`
seguirá dando 404 hasta aplicar el fix en dev.

**Nota de alcance:** este bloque tiene otros sub-casos con veredicto aún **pendiente** (1.5.10–1.5.18,
1.5.23, 1.5.24 → 509; 1.5.19 → 999; 1.5.9 → 425). Se tratan por separado en el review §Bloque 1.5.

---

## Referencias

- Diseño de códigos: `second-brain/codigosRespuesta/nueva-tabla-codigo-respuesta.html` / `.md`
- Relacionados: [HP-011](10-matriz-peticion-sin-validacion-formato.md) (peticion → 405 engañoso), [HP-009](08-matriz-idCanal-formato-invalido-responde-401.md) (idCanal formato → 401).
