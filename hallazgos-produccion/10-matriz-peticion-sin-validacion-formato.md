# HP-011 — Campo `peticion` sin validación de formato → cliente recibe 405 "descifrado" en vez de 400

| Campo | Valor |
|-------|--------|
| **ID** | HP-011 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (código + Newman) |
| **Severidad** | media-alta |
| **Componente** | `tld-matriz` / `tld-validador-validar` (capa matriz) |
| **Ámbito** | transversal (matriz) — observado en VCN |
| **Veredicto** | **PROD-MAL** (el esperado del test, 400, es el correcto) |

---

## Resumen

Cuando el cliente envía el campo `peticion` **malformado en su formato** (tipo no-string, hex inválido,
segmento AES faltante/extra, IV truncado, etc.), producción **no lo valida** y lo reenvía al canal
validador, donde falla el descifrado y se devuelve **`codigoError 405` "Error en descifrado canal
emisor"**. Para el cliente esto es engañoso: el 405 sugiere un problema de **descifrado/llaves**, así que
lo mandará a revisar la llave pública que le compartimos o su proceso de cifrado, cuando el problema real
es que **el campo viene mal formado**. Lo correcto es responder **`400` "Error en la petición original"**
(error de formato del campo), reservando el 405 para el `peticion` **bien formado pero indescifrable**.

---

## Comportamiento en producción (observado)

- **Ruta:** cliente → VCN → matriz → validador (end-to-end). Se juzga por lo que recibe el cliente, no
  por el tramo interno de matriz.
- **Recibido:** `codigoError 405` "Error en descifrado canal emisor" (HTTP 200, matriz siempre 200).
- **Condición:** `peticion` malformado en formato (escenarios `1.3.4`–`1.3.13`).
- El lambda de matriz `isValid()` valida **solo** `idCanal` y `validador`; **no toca `peticion`** — lo
  reenvía cifrado tal cual (`axios.post(VALIDADOR_URL + "/validar", body)`). El descifrado (y su fallo)
  ocurre en el validador downstream con la llave del canal emisor.

---

## Comportamiento esperado

- **`400` "Error en la petición original"** para formato inválido del campo `peticion`, coherente con el
  trato de `idCanal`/`validador` (error de formato del campo). Escenarios `1.3.1`–`1.3.13` → 400.
- El **405** queda **solo** para `peticion` bien formado pero **indescifrable** (cifrado con otra llave,
  material RSA no-hex de largo válido, tag GCM corrupto, etc.) → escenarios `2.3.1`–`2.3.6`.
- Diseño de códigos (ver `second-brain/codigosRespuesta/nueva-tabla-codigo-respuesta.md`):
  - **400** — error de formato del campo `peticion` (culpa de formato del cliente).
  - **405** — "Error en descifrado canal emisor": bien formado, no se puede descifrar.
  - **501** — "Error en cifrado para el canal emisor": falla al cifrar (lado plataforma).

---

## Por qué es importante (impacto)

- **Diagnóstico erróneo del integrador:** ante un campo mal formado se le dice "error en descifrado",
  y termina revisando llaves / proceso de cifrado en lugar de corregir su petición. Alarga soporte y
  certificación (Sandbox/QA).
- **Ruido en las pruebas:** un fallo de formato y un fallo de descifrado se ven iguales (405), lo que
  impide distinguir la causa. Por eso el test bien hecho separa **1.3.x (400)** de **2.3.x (405)**.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `Postman/generador/logs/historial/vcn/2026-07-13T03-16-37Z_prod_MATRIZ_completo*.json` (1.3.4–1.3.13 → 405) |
| Código prod | `produccion_real/tld-matriz/lambdas/tld-validador-validar/index.js` — `isValid` (135-144) solo valida `idCanal`/`validador`; reenvío (51-55); único 400 (40-50) no cubre `peticion` |
| Escenarios 400 (formato) | `VCN Escenarios error/General/1_validaciones_js/3_peticion/3.1–3.13` |
| Escenarios 405 (indescifrable) | `VCN Escenarios error/General/2_reglaNegocio/3_peticion/3.1–3.6` (2.3.1–2.3.6) |
| Diseño de códigos | `second-brain/codigosRespuesta/nueva-tabla-codigo-respuesta.md` (filas 400 / 405 / 501) |
| Revisión | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 1.3 |

---

## Causa raíz

`isValid(body)` en matriz valida únicamente `idCanal` y `validador`. El campo `peticion` no tiene ninguna
validación de formato antes de reenviarse al validador. Un `peticion` malformado atraviesa matriz y solo
"falla" al intentar descifrarse aguas abajo, produciendo un 405 que describe el **síntoma** (no se pudo
descifrar) y no la **causa** (el campo venía mal formado).

---

## Mejora propuesta (en dev — ajuste de prod, NO ajuste de prueba)

Agregar validación de **formato** del campo `peticion` (presente, string, y estructura/hex de largo
mínimo esperado) que devuelva **400 "Error en la petición original"** antes de reenviar. Con eso:

- Formato inválido → **400** (1.3.x).
- Bien formado pero indescifrable → **405** (2.3.x) — sin cambios.
- Fallo de cifrado del lado plataforma → **501**.

El test **no** cambia: `1.3.x` sigue esperando **400** (correcto). La corrida contra `prod_adactado_a_dev`
seguirá dando 405 hasta que se aplique el fix en dev; contra dev corregido debe pasar.

---

## Referencias

- Diseño de códigos: `second-brain/codigosRespuesta/nueva-tabla-codigo-respuesta.md`
- Relacionados: [HP-005](04-matriz-isValid-sin-chequeo-tipo.md) (isValid sin chequeo de tipo), [HP-009](08-matriz-idCanal-formato-invalido-responde-401.md) (idCanal formato → 401), [HP-003](02-matriz-http-200-siempre.md) (matriz siempre HTTP 200).
