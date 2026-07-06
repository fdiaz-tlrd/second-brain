# Estudio: Colección Postman VCN (Validación Cuenta Nombre)

Fuente exclusiva: `second-brain\Postman\equipo-pruebas\Validacion Cuenta Nombre\`

**Origen:** Esta colección fue proporcionada por el equipo de pruebas. No es de autoría propia.

---

## Archivos

| Archivo | Tipo | Descripción |
|---------|------|-------------|
| `VCN.postman_collection.json` | Colección v2.1.0 | 35 carpetas de escenarios de prueba (~27 233 líneas) |
| `SBVCN-CANALBANK.postman_environment.json` | Environment | Ambiente para Canal Bank (validador `1531`) |
| `SBVCN-BANCO NACIONAL.postman_environment.json` | Environment | Ambiente para Banco Nacional (validador `1490`) |

---

## Arquitectura del flujo por escenario

Cada carpeta ejecuta un flujo de 3 o 4 requests secuenciales:

```
1. Cifrar          → POST {{URLC}}   (dummy, sin auth)
2. API Matriz      → POST {{URLM}}   (proxy real, Bearer token)
3. Descifrar       → POST {{URLD}}   (dummy, sin auth)
4. Bitácora (opc.) → GET  {{URLBIT}}{{idPeticion}}
```

### Paso 1: Cifrar

- URL: `{{URLC}}` → `https://tld-validador-dummy.sand.telered.internal/cifrar?tld=1`
- Auth: ninguna
- Body (ejemplo exitoso):
  ```json
  {
      "idCanal": "1000",
      "validador": "{{validadorC}}",
      "peticion": {
          "idPeticion": "{{idPeticion}}",
          "metodo": "0001",
          "solicitudes": [
              {
                  "idSolicitud": "{{idSolicitud}}",
                  "parametros": {
                      "cuenta": "{{CuentaFeliz}}"
                  }
              }
          ]
      }
  }
  ```
- Respuesta esperada: `{ idCanal, validador, peticion }` (strings). Se guardan en env.

### Paso 2: API Matriz

- URL: `{{URLM}}` → `https://apigatesb.telered.com.pa/validador/validar`
- Auth: `Bearer {{QAtokenAUT}}`
- Body:
  ```json
  {
      "idCanal": "{{idCanal}}",
      "validador": "{{validador}}",
      "peticion": "{{peticion}}"
  }
  ```
  (peticion es el string cifrado del paso 1)
- Respuesta esperada (exitosa): `{ respuesta: "<string cifrado>" }` → se guarda en env.
- Pre-request: lógica de refresh de token OAuth 2.0.

### Paso 3: Descifrar

- URL: `{{URLD}}` → `https://tld-validador-dummy.sand.telered.internal/descifrar?tld=0`
- Auth: ninguna
- Body: `{ "respuesta": "{{respuesta}}" }`
- Respuesta esperada (exitosa):
  ```json
  {
      "respuesta": {
          "idPeticion": "TLRDPAPA00228...",
          "respuestas": [
              {
                  "idSolicitud": "IDSOL00228...",
                  "resultado": 0,
                  "datos": {
                      "banco": "KNALPAPA",
                      "cuenta": "1100001328",
                      "producto": "PACA" | "PACC",
                      "estadoCuenta": "0",
                      "titulares": ["LO** PHIL**** MALA****"]
                  }
              }
          ]
      }
  }
  ```

### Paso 4: Bitácora (opcional, no en todos los escenarios)

- URL: `{{URLBIT}}{{idPeticion}}`
  → `https://qq08jfts47-vpce-00ef36bfb2706e3b7.execute-api.us-east-1.amazonaws.com/sandbox/consultar-bitacora?idPeticion=`
- Method: GET
- Respuesta esperada:
  ```
  datosBitacora: {
      idCanalValidador, operacion, resumen[], fechaRespuesta,
      exito, idCanal, validaciones, date_truncate_delete,
      idPeticion, idTransaccion, resultadoValidador,
      resultado, fecha, resultadoMascara, error
  }
  logsEjecucion: [{ link }]
  ```

---

## Autenticación OAuth 2.0

Se implementa en el **pre-request script** del paso "API Matriz":

1. Lee de env: `QAtokenAUT`, `AccessTokenExpiry`, `APIKEY`, `SECRETKEY`, `TOKENURL`
2. Si el token no existe o expira en menos de 60 segundos → refresh.
3. Refresh: `POST {{TOKENURL}}` con body `{ apiKey, secretKey }`.
4. Respuesta: extrae `accessToken` (o `access_token`), `expires_in` (default 900s).
5. Guarda `QAtokenAUT` y `AccessTokenExpiry` en env.

URL de token: `https://apigatesb.telered.com.pa/auth/token`

---

## Generación de idPeticion e idSolicitud

Pre-request script del paso "Cifrar" (mismos scripts que `VCN REGRESIÓN`):

- `seqCounter`: contador secuencial persistente en env, se incrementa en +1 cada ejecución.
- **Código exportado:** `idPeticion = "TLRDPAPA" + padStart(seqCounter, 5, '0') + "YYYYMMDDHHMMSS"` — **no** usa `pm.environment.get("banco")`.
- `idSolicitud = "IDSOL" + padStart(seqCounter, 5, '0') + "YYYYMMDDHHMMSS"`

Ejemplo: `TLRDPAPA0022820260520104432`

**Análisis completo** (asserts por carpeta, validadores reales, XPRESS vs VCN, implicaciones SWIFT): ver sección *«`idPeticion` y prefijo SWIFT / banco»* en [`../Collecciones y Variables Cuenta Nombre y Xpress/estudio-coleccion-vcn-regresion.md`](../Collecciones%20y%20Variables%20Cuenta%20Nombre%20y%20Xpress/estudio-coleccion-vcn-regresion.md#idpeticion-y-prefijo-swift--banco--qué-validan-realmente).

---

## Mecanismo "no_reproducible"

Script a nivel de carpeta (folder-level pre-request):

- Define una lista de variables requeridas (ej. `['CuentaFeliz']`, `['C511']`, etc.).
- Si alguna falta en el env → `pm.environment.set("no_reproducible", "true")` y guarda el mensaje.
- En los tests: si `no_reproducible === "true"`, el test falla con el mensaje de qué falta.

Esto permite ejecutar la colección completa contra un env y que los escenarios no configurados se marquen como "no reproducibles" en vez de fallar de forma confusa.

---

## Environments: variables comparadas

| Variable | CANALBANK | BANCO NACIONAL |
|----------|-----------|----------------|
| `idCanal` | 1000 | 1000 |
| `validador` | 1531 | 1490 |
| `validadorC` | 1531 | 1490 |
| `banco` | KNALPAPA | NAPAPAPA |
| `APIKEY` | 59f50e36b8b4223590b5a87e323f2e09a9aac877e | (mismo) |
| `TOKENURL` | https://apigatesb.telered.com.pa/auth/token | (mismo) |
| `URLC` | https://tld-validador-dummy.sand.telered.internal/cifrar?tld=1 | (mismo) |
| `URLM` | https://apigatesb.telered.com.pa/validador/validar | (mismo) |
| `URLD` | https://tld-validador-dummy.sand.telered.internal/descifrar?tld=0 | (mismo) |
| `URLBIT` | (mismo) | (mismo) |
| `CuentaFeliz` | 1100001328 | 40006229237 |
| `Cuentajuridica` | 1100029543 | 10000002640 |
| `PACA` | 1100001161 | 4000905646 |
| `PACC` | 1200130811 | 10000000037 |
| `C511` | 1100000239 | 10000001016 |
| `C512` | 1100000411 | 10000002265 |
| `C513` | 1100024932 | 40006218458 |
| `C514` | (vacío) | (vacío) |
| `C515` | 1100003126 | 10000013429 |
| `Variostitulares` | 1100236049 | 10000023621 |
| `mascara0` | 1100108552 | (vacío) |
| `mascara1` | 1200218707 | (vacío) |
| `mascara2` | 1100207446 | 10000045781 |
| `mascara3` | 1100023371 | (vacío) |
| `mascara4` | 1100015294 | 40000255857 |
| `mascara5` | 1100015294 | 40016095487 |
| `mascara6` | 1200135000 | 10000004457 |
| `validadorNOMASKRA` | (vacío) | (vacío) |
| `Cuenta1` | (vacío) | (vacío) |
| `Cuenta34` | (vacío) | (vacío) |

### Variables no reproducibles

- **CANALBANK**: `validadorNOMASKRA`, `514`, `Cuenta1`, `Cuenta34`
- **BANCO NACIONAL**: `validadorNOMASKRA`, `514`

Ambos envs tienen `C514` vacío, por lo que el escenario "Cuenta con información faltante" no es reproducible en ninguno.

---

## Escenarios de prueba (35 carpetas)

### Flujo completo (Cifrar → Matriz → Descifrar → Bitácora)

| # | Carpeta | Cuenta usada | Código esperado | Requests |
|---|---------|--------------|-----------------|----------|
| 1 | Resp Exitosa | `{{CuentaFeliz}}` | resultado=0 | 4 |
| 2 | Resp Cuenta Juridicas | `{{Cuentajuridica}}` | resultado=0 | 4 |
| 3 | Resp Exitosa Cta PACA | `{{PACA}}` | resultado=0, producto=PACA | 4 |
| 4 | Resp Exitosa Cta PACC | `{{PACC}}` | resultado=0, producto=PACC | 4 |
| 5 | Resp Cuenta 1 dígito | `{{Cuenta1}}` | — | 4 |
| 6 | Resp Cuenta 34 dígitos | `{{Cuenta34}}` | — | 4 |
| 7 | Resp Varios titulares | `{{Variostitulares}}` | resultado=0, >1 titular | 4 |
| 8 | Resp IdPetición MAX64 | `{{CuentaFeliz}}` | resultado=0 | 4 |
| 9 | Resp IdPetición MIN1 | `{{CuentaFeliz}}` | resultado=0 | 4 |
| 10 | idSolicitud vacío | `{{CuentaFeliz}}` | resultado=0 | 3 |
| 11 | idSolicitud Más de 64 | `{{CuentaFeliz}}` | resultado=0 | 3 |
| 12 | Resp IdSolicitud MAX64 | `{{CuentaFeliz}}` | resultado=0 | 4 |
| 13 | Resp IdSolicitud MIN1 | `{{CuentaFeliz}}` | resultado=0 | 4 |
| 14 | Cuenta no existe | `"1001000"` (hardcoded) | resultado=510 | 4 |
| 15 | Cuenta cerrada | `{{C511}}` | resultado=511 | 4 |
| 16 | Cuenta bloqueada | `{{C512}}` | resultado=512 | 4 |
| 17 | Cuenta con razón regulatoria | `{{C515}}` | resultado=515 | 4 |
| 18 | Cuenta con información faltante | `{{C514}}` | resultado=514 | 4 |
| 19 | Cuenta con transacciones no permitidas | `{{C513}}` | resultado=513 | 4 |
| 20 | Cuenta vacia | `""` (vacío) | resultado=413 | 4 |
| 21 | Cuenta con letras | letras (hardcoded) | resultado=510 | 4 |
| 22 | Sin campo cuenta | sin campo `cuenta` | resultado=999 | 2 |
| 23 | Resp Cuenta más de 34 dígitos | >34 dígitos | — | 4 |
| 24–30 | Largo de máscara 0–6 | `{{mascara0}}` a `{{mascara6}}` | resultado=0 | 4 |

### Solo Cifrar → Matriz (sin Descifrar, escenarios de error)

| # | Carpeta | Condición | Error esperado |
|---|---------|-----------|----------------|
| 31 | idPeticion vacío | idPeticion="" | — |
| 32 | método incorrecto | metodo="9999" | — |
| 33 | idPeticion Más de 64 | >64 chars | — |
| 34 | idCanal no existente | idCanal="1090" | `codigoError: 401`, `mensajeError: "Canal emisor no existe"` |
| 35 | Validador no existente | validador="9000" | `codigoError: 404`, `mensajeError: "Validador no existe"` |

---

## Tests automatizados clave

### En "Descifrar- exitosa" (escenario exitoso completo)

| Assertion | Detalle |
|-----------|---------|
| HTTP 200 | `pm.response.code === 200` |
| JSON válido | parse exitoso |
| Estructura | `respuesta.respuestas[0].{resultado, datos, idSolicitud}` |
| datos completo | `banco`, `cuenta`, `producto`, `estadoCuenta`, `titulares` |
| estadoCuenta = "0" | cuenta activa |
| producto | "PACA" o "PACC" |
| resultado = 0 | operación exitosa |
| idPeticion formato (estándar) | `/^TLRDPAPA\d{5}\d+$/` — ver matriz en estudio REGRESIÓN; **no** en todos los escenarios |
| idSolicitud formato (estándar) | `/^IDSOL\d{5}\d+$/` |
| idPeticion ≠ idSolicitud | valores distintos |
| Enmascaramiento titulares | largo máscara = floor(len(palabra) / 2) |
| `datos.banco` = env.banco | banco **de la cuenta** en respuesta; **no** prefijo de `idPeticion` |

### En "API Matriz-Resp Exitosa"

| Assertion | Detalle |
|-----------|---------|
| HTTP 200 | |
| Tiene `respuesta` | string no vacío |
| Formato cifrado | `/^([A-Za-z0-9]+)\.([A-Za-z0-9]+)\.([A-Za-z0-9]+)$/` (3 partes separadas por `.`) |
| Tiempo < 29s | |

### En "Bitácora"

| Assertion | Detalle |
|-----------|---------|
| HTTP 200 | |
| `datosBitacora` es objeto | |
| Campos tipados | `idCanalValidador(str)`, `operacion(str)`, `resumen(arr)`, `exito(num)`, `resultado(num)`, etc. |
| `resumen[].resultado` es number | |
| `resumen[].idSolicitud` es string | |
| `logsEjecucion` es array con links | |

---

## Fórmula de enmascaramiento

```
Para cada palabra en el array titulares:
  if (palabra.length === 1) → no se enmascara
  else:
    visibleLen = palabra.length - floor(palabra.length / 2)
    visible = palabra.slice(0, visibleLen)
    masked = '*'.repeat(palabra.length - visibleLen)
    resultado = visible + masked
```

Ejemplo: `"PHILLIPS"` (8 chars) → visibleLen=4, mask=4 → `"PHIL****"`

---

## Respuestas de error esperadas en API Matriz

Los tests de "idCanal no existente" y "Validador no existente" validan:

```json
{
    "codigoError": 401,
    "mensajeError": "Canal emisor no existe"
}
```

```json
{
    "codigoError": 404,
    "mensajeError": "Validador no existe"
}
```

---

## Notas de implementación

- **`idPeticion` vs SWIFT:** detalle en [`estudio-coleccion-vcn-regresion.md`](../Collecciones%20y%20Variables%20Cuenta%20Nombre%20y%20Xpress/estudio-coleccion-vcn-regresion.md#idpeticion-y-prefijo-swift--banco--qué-validan-realmente). Resumen: prefijo TLRDPAPA hardcodeado en scripts; env `banco` solo para `datos.banco`.
- Los escenarios de máscara 4 y 5 en CANALBANK usan la misma cuenta (`1100015294`).
- `validadorC` es copia de `validador` para uso en el paso Cifrar (que va al dummy).
- El dummy cifrador/descifrador es interno (`*.sand.telered.internal`), no expuesto a internet.
- La API Matriz va a `apigatesb.telered.com.pa` (endpoint público).
- El campo `peticion` en el paso 2 es un string opaco (cifrado).
- Respuestas de ejemplo (saved responses) están guardadas dentro de la colección para `Descifrar` exitosa: Ejemplo exitosa, Ejemplo error, Resp metrobank, Resp bibank.
