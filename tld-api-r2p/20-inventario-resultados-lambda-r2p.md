# Inventario de resultados — lambda `r2p` (Dig × prod × catálogo)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-08-11 (act. cambios acordados códigos) |
| Alcance | Emisión estática `lambdas/r2p` + **cruce** con [`../codigosRespuesta/nueva-tabla-codigo-respuesta.md`](../codigosRespuesta/nueva-tabla-codigo-respuesta.md) (`Nueva descripción`) |
| Dig | `tld-api-r2p/lambdas/r2p` |
| Prod | `produccion_real/tld-api-r2p/lambdas/r2p` (solo lectura) |
| Catálogo | Fuente de verdad de **qué número debe significar qué** |
| Cambios acordados | Ver § **Cambios acordados (12)** — pendientes de aplicar en Dig |
| Fuera | Códigos arbitrarios del **banco** en hop EF; `api_7` ([`15`](./15-estudio-api7-marketplace-vs-prod.md)) |

## Cómo leer

### Tres sitios de número (no mezclar)

| Sitio | Campo | Quién lo ve |
|-------|--------|-------------|
| **A. Envelope** | `codigoError` (+ `mensajeError`) vía `util.lambdaResult` | Consumidor de la lambda |
| **B. Por solicitud** | `respuestas[].resultado` | Cliente tras descifrar |
| **C. Agregado bitácora/dashboard** | `resultadoValidador` ∈ {0, 500, 501} | Bitácora / dashboard — **no** es envelope de éxito |

### Cruce vs catálogo (`Nueva descripción`)

| Veredicto | Significado |
|-----------|-------------|
| **OK** | Dig usa el código para el significado del catálogo (o equivalente claro) |
| **incorrecto** | Dig usa el número para **otra** condición; el catálogo reserva ese número a otra cosa (y/o el significado Dig vive bajo **otro** código del catálogo) |
| **débil** | Mismo familia / parcialmente alineado; mensaje Dig ≠ `Nueva descripción` o alcance distinto |
| **fuera / vacío** | Número no tiene `Nueva descripción` útil en catálogo, o uso Dig no es `codigoError`/`resultado` de cliente |
| **n/a Dig** | Solo prod en inventario |

Columnas Dig/Prod en tablas A/B: **sí** / **—** como antes.

---

## Cruce Dig × catálogo — códigos incorrectos (prioridad)

Filas donde Dig **desvía** el número respecto a `Nueva descripción`. Esto es lo que pediste para ver códigos incorrectos en Dig.

| Código Dig | Condición Dig (resumen) | `Nueva descripción` (catálogo) | Veredicto | Código catálogo que **sí** encaja (si hay) |
|------------|-------------------------|--------------------------------|-----------|---------------------------------------------|
| **432** | `monto` fuera de rango (`0011`) | Error al validar el parámetro **ciudadComercio** | **incorrecto** → **acordado** §7 | **465** (monto) |
| **433** | `bancoAcreedor` ≠ alias emisor | El canal validador asociado al identificador del alias ya no se encuentra disponible | **incorrecto** → **acordado** §8 | **435** (bancoAcreedor) — **después** de §1–2 y §6 |
| **435** | Sin op `0012`/`0014` en validador; o default alias sin identificador | Error al validar el parámetro **bancoAcreedor** | **incorrecto** → **acordado** §1–2 / §6 | Notify validador → **418**; default alias → **419** |
| **437** | Falta `nombreAcreedor` | Error al validar el parámetro **descripcion** | **incorrecto** → **acordado** §9 | **436** (nombreAcreedor) |
| **438** | Emisor sin op `0014` | Identificador del **comercio** ya registrado para el banco | **incorrecto** → **acordado** §3 | **482** |
| **439** | Fallo validación estado (app **siempre** 439) | Identificador del **comercio** ya registrado | **incorrecto** → **acordado** §4 | Pasar `resultValidaciones.statusCode` |
| **440** | Hay fila y alguna tiene `estado == 'C'` y `parametros.bancoAcreedor !=` alias del validador | Identificador del **comercio** registrado anteriormente… | **incorrecto** → **acordado** §11 | **485** (texto = la condición del `if`) |
| **441** | Hay fila y alguna tiene `estado != 'S'` | Identificador del **comercio** no registrado | **incorrecto** → **acordado** §12 | **486** (texto = la condición del `if`) |
| **442** | No hay fila en `tld-r2p` con ese `codigoR2P` | Comercio debe ser activo/suspendido para actualizar | **incorrecto** → **acordado** §10 | **484** (texto = la condición del `if`) |
| **418** (`default` switch) | Método ≠ `0011`/`0013` | Método no soportado por el validador | **incorrecto** → **acordado** §5 | **481** Método inválido |
| **501** | Agregado bitácora “parcial” (`resultadoValidador`) | Error en **cifrado** para el canal emisor | **incorrecto** (si se confundiera con envelope) | Uso Dig es solo C (dashboard); **no** devolver 501 al cliente como cifrado |
| **500** | Agregado bitácora “todo error” | Error interno | **débil / conflicto** | Catálogo 500 = error interno envelope; Dig también usa 500 en C con otro significado |

**483** (`notaAcreedor`): Dig emite 483; catálogo ahora tiene `Nueva descripción` = «Error al validar el parámetro notaAcreedor» → **OK** (tras alta 2026-08-11). Solo Dig (prod no valida nota).

### Decisión — `idPeticion` / 400 (no 445)

R2P (`util.validarParametroIdPeticion`) solo hace validación **básica**: presente, string, no vacío, largo ≤ 64, regex `^` + alias emisor + `\\d+$`. Si falla → **400** «Error en la petición original».

El **445** («El prefijo Código SWIFT del idPeticion no coincide con el canal emisor») es de **otros servicios**. No se cambia la lógica de negocio de R2P: **no** se agrega código 445 aquí. Se deja el 400.

---

## A. Envelope — `codigoError` + cruce

| Código | Mensaje / origen Dig·prod | Dig | Prod | Catálogo `Nueva descripción` | Cruce Dig |
|--------|---------------------------|-----|------|------------------------------|-----------|
| **0** | Éxito `{ respuesta }` | sí | sí | Operación exitosa | **OK** |
| **400** | Petición original / plan / params / BAD_JSON | sí | sí | Error en la petición original | **OK** |
| **400** | Fallo `validarParametroIdPeticion` (validación básica R2P) | sí | sí | Error en la petición original | **OK — se deja** (decisión arriba) |
| **401** | Canal emisor no existe | sí | sí | Canal emisor no existe | **OK** |
| **402** | Canal validador no disponible | sí | sí | Canal validador no disponible | **OK** |
| **404** | Validador no existe | sí | sí | Validador no existe | **OK** |
| **405** | Descifrado canal emisor | sí | sí | Error en descifrado canal emisor | **OK** |
| **405** | Cifrado canal emisor (respuesta) | sí | sí | (catálogo 405 = solo descifrado) | **débil** — mensaje Dig habla de cifrado; catálogo 405 no cubre cifrado |
| **406** | Cifrado/descifrado canal validador | **—** | sí | Error en descifrado canal validador | **n/a Dig** |
| **418** | `metodoDisponible` validador falla (`0011`/`0013`) | sí | sí | Método no soportado por el validador | **OK** |
| **418** | `default` switch (método ≠ `0011`/`0013`) | sí | sí | (hoy mismo 418) | **incorrecto** → **acordado** §5 → **481** |
| **500** | Plan `validatePlan` catch | sí | sí | Error interno | **OK** (envelope) |
| **509** | Crear/actualizar R2P / EF / proxy | sí | sí | Error inesperado en el Canal Validador | **débil** — Dig también 509 en Dynamo R2P (no solo canal validador) |
| **4xx–5xx** | Remap proxy Dig | **sí** | **—** | Depende del código reenviado | Passthrough; validar caso a caso |
| **999** | Catch / adapter Dig | sí | sí | *(vacío en catálogo)* | **fuera / vacío** |

---

## B. Por solicitud — `respuestas[].resultado` + cruce

### B1. `0011`

| Código | Condición Dig | Dig | Prod | Catálogo | Cruce Dig |
|--------|---------------|-----|------|----------|-----------|
| **0** | Éxito + hop | sí | sí | Operación exitosa | **OK** |
| **419** | Falta `identificador` | sí | sí | Los parámetros identificador y tipoIdentificador son requeridos | **débil** — R2P no usa `tipoIdentificador`; familia “requerido” |
| **409** | Formato `identificador` | sí | sí | Error al validar el parámetro identificador | **OK** (mensaje Dig más específico) |
| **425** | Cantidad solicitudes | sí | sí | Cantidad de solicitudes no permitidas | **OK** |
| **431** | `idSolicitud` | sí | sí | Campo idSolicitud no cumple con los criterios | **OK** |
| **432** | `monto` | sí | sí | …**ciudadComercio** | **incorrecto** → **acordado** §7 → **465** |
| **433** | `bancoAcreedor` | sí | sí | …alias validador no disponible | **incorrecto** → **acordado** §8 → **435** |
| **413** | cuentas | sí | sí | Error al validar el parámetro cuenta | **OK** |
| **437** | `nombreAcreedor` | sí | sí | …**descripcion** | **incorrecto** → **acordado** §9 → **436** |
| **483** | `notaAcreedor` | **sí** | **—** | Error al validar el parámetro notaAcreedor | **OK** |
| **435** | Sin op `0012` | sí | sí | …**bancoAcreedor** | **incorrecto** → **acordado** §1 → **418** |
| **435** | Default `validarAliasDeudor` | sí | sí | …**bancoAcreedor** | **incorrecto** → **acordado** §6 → **419** |
| **434** | Alias no en directorio | sí | sí | Campo identificador no corresponde a los datos registrados | **OK** |

### B2. `0013`

| Código | Condición Dig | Dig | Prod | Catálogo | Cruce Dig |
|--------|---------------|-----|------|----------|-----------|
| **435** | Sin op `0014` validador | sí | sí | …bancoAcreedor | **incorrecto** → **acordado** §2 → **418** |
| **438** | Sin op `0014` emisor | sí | sí | Comercio ya registrado (banco) | **incorrecto** → **acordado** §3 → **482** |
| **439** | Fallo `validarParametroSolicitudesEstado` (tapa todo) | sí | sí | Comercio ya registrado | **incorrecto** → **acordado** §4 → `statusCode` util |
| **442** | No hay fila `codigoR2P` | sí | sí | Comercio activo/suspendido… | **incorrecto** → **acordado** §10 → **484** |
| **440** | Fila + alguna `estado=='C'` + `bancoAcreedor` ≠ alias validador | sí | sí | Comercio registrado anteriormente… | **incorrecto** → **acordado** §11 → **485** |
| **441** | Fila + alguna `estado!='S'` | sí | sí | Comercio no registrado | **incorrecto** → **acordado** §12 → **486** |
| **0** | Update + hop | sí | sí | Operación exitosa | **OK** |

Hoy util estado puede calcular **425 / 431 / 439 / 443**; app Dig/prod **siempre** escribe **439**. **Acordado §4:** emitir `resultValidaciones.statusCode`.

| Código util | Catálogo | Visible hoy | Tras §4 |
|-------------|----------|-------------|---------|
| 425 | OK | → **439** | **425** |
| 431 | OK | → **439** | **431** |
| 439 | texto util `codigoR2P` (catálogo 439 = comercio — sigue en tension) | → **439** | **439** |
| 443 | OK («Error al validar el parámetro estado») | → **439** | **443** |

---

## C. Agregado — `resultadoValidador`

| Valor Dig/prod | Significado interno | Catálogo mismo número | Cruce |
|----------------|---------------------|------------------------|-------|
| **0** | Todo éxito en `respuestas[]` | Operación exitosa | **OK** si solo bitácora |
| **500** | Todo error | Error interno | **débil** — mismo número, otro canal (C ≠ envelope) |
| **501** | Parcial | Error en cifrado canal emisor | **incorrecto** si se interpreta como catálogo 501 |

Envelope al cliente en esos caminos sigue siendo **`codigoError: 0`** + cuerpo cifrado.

---

## Resumen Dig ≠ prod (emisión)

| Tema | Dig | Prod |
|------|-----|------|
| **483** notaAcreedor | sí | no |
| **406** cifrado validador | no | sí |
| Remap proxy → envelope | sí | no |
| BAD_JSON → 400 | sí | no (→ 999) |
| Colapso estado → **439** | sí (hoy) → **acordado** pasar `statusCode` | sí (prod sin este fix) |

---

## Cambios acordados (12) — aplicar en Dig

Estado: **acordados, aún no aplicados** en `tld-api-r2p/lambdas/r2p`. El `if` de §10–§12 **no cambia**; solo el número emitido.

**Orden en §8:** aplicar §1, §2 y §6 **antes** de §8. Si no, **435** queda a la vez como notify/alias y como `bancoAcreedor`.

| # | Archivo / sitio | Hoy | Queda | Catálogo (`Nueva descripción`) |
|---|-----------------|-----|-------|--------------------------------|
| **1** | `app.js` ~136–141 — validador sin op **`0012`** (`0011`) | `resultado: 435` | **`418`** | Método no soportado por el validador |
| **2** | `app.js` ~163–168 — validador sin op **`0014`** (`0013`) | `resultado: 435` | **`418`** | Método no soportado por el validador |
| **3** | `app.js` ~170–175 — emisor sin op **`0014`** | `resultado: 438` | **`482`** | Método no disponible para el Canal Emisor |
| **4** | `app.js` ~177–182 — fallo `validarParametroSolicitudesEstado` | siempre `resultado: 439` | **`resultValidaciones.statusCode`** | El código que devolvió el util (425 / 431 / 439 / 443, …) |
| **5** | `app.js` ~214–216 — `default` del `switch` (método ≠ `0011`/`0013`) | envelope **`418`** | envelope **`481`** + mensaje catálogo «Método inválido» | Método inválido |
| **6** | `util.js` ~406–408 — default `validarAliasDeudor` | `statusCode: 435`, mensaje «Campo solicitudes no son validos» | **`419`**, mensaje **«Los parámetros identificador y tipoIdentificador son requeridos»** (texto catálogo; R2P solo exige `identificador`) | Los parámetros identificador y tipoIdentificador son requeridos |
| **7** | `util.js` ~231–236 — `monto` fuera de rango | `statusCode: 432`, «Campo monto no cumple con los criterios» | **`465`**, «Error al validar el parámetro monto» | Error al validar el parámetro monto |
| **8** | `util.js` ~237–241 — `bancoAcreedor` ≠ alias emisor | `statusCode: 433`, «Campo bancoAcreedor no cumple con los criterios» | **`435`**, «Error al validar el parámetro bancoAcreedor» | Error al validar el parámetro bancoAcreedor |
| **9** | `util.js` ~253–258 — falta `nombreAcreedor` | `statusCode: 437`, «Campo nombreAcreedor no cumple con los criterios» | **`436`**, «Error al validar el parámetro nombreAcreedor» | Error al validar el parámetro nombreAcreedor |
| **10** | `app.js` ~184–188 — `getRequest2P` vacío | `resultado: 442` | **`484`** | No hay fila en tld-r2p con ese codigoR2P. |
| **11** | `app.js` ~191–195 — `estado=='C'` y `bancoAcreedor` ≠ alias validador | `resultado: 440` | **`485`** | Hay fila y alguna tiene estado == 'C' y parametros.bancoAcreedor != alias del validador. |
| **12** | `app.js` ~197–201 — alguna fila `estado!='S'` | `resultado: 441` | **`486`** | Hay fila y alguna tiene estado != 'S'. |

---

## Lista corta — **incorrecto** Dig que **sigue** (fuera de los 12)

1. **501** como agregado parcial → no confundir con cifrado emisor
2. Util **439** (`codigoR2P` inválido) vs catálogo 439 (comercio) — §4 deja de tapar otros códigos, pero el **439 del util** sigue en tensión con el catálogo

`idPeticion` **400** no está en esta lista: **se deja** (no se implementa 445 en R2P). Ver decisión arriba.

Notify/alias/default/tapa/`monto`/`bancoAcreedor`/`nombreAcreedor`/`442`/`440`/`441` pasan a § **Cambios acordados (12)**.

---

## Fuentes

| Rol | Dig | Prod |
|-----|-----|------|
| Orquestación | `app.js` | `app.js` |
| Validaciones | `lib/util.js` | `lib/util.js` |
| Dynamo R2P | `lib/r2p.js` | `lib/r2p.js` |
| Hop EF | `lib/validador-proxy-lambda.js` | `lib/validador.js` |
| Agregado | `lib/getResultadoValidador.js` | `validador.getResultado` |
| Adapter | `lib/response.js` | — |
| Catálogo | [`../codigosRespuesta/nueva-tabla-codigo-respuesta.md`](../codigosRespuesta/nueva-tabla-codigo-respuesta.md) | |

**Regla HTML:** al editar el `.md` del catálogo, ejecutar `node codigosRespuesta/generar-html-tabla-codigos.js`.
