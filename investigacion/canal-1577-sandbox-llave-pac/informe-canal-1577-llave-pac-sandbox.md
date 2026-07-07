# Informe: fallo canal validador 1577 en Sandbox

**Fecha:** 2026-07-07  
**Ambiente:** Sandbox  
**Canal validador:** `1577` (alias PAC / nombre banco: `AUTOMATI`)  
**Evidencia cruda (logs):** [`canalValidacion1577.md`](./canalValidacion1577.md)

---

## Resumen ejecutivo

El escenario de regresión **TELERED VCN Resp Sin enmascarar** falla en Sandbox por una **configuración incorrecta en el PAC** del canal `1577`: la llave pública **activa** para cifrado (`1577-publicOrlando.pem`) no corresponde al validador al que apunta el canal (`tld-validador-dummy`). El procesador cifra con una pública que el dummy no puede descifrar; el validador devuelve error genérico y el proxy responde **509** (`error_validador_campo_respuesta`).

**Acción solicitada:** en el PAC de Sandbox, canal `1577`, activar la llave **`1577-dummy-public (1).pem`** en lugar de **`1577-publicOrlando.pem`**.

---

## Síntoma

| Campo | Valor |
|-------|--------|
| Carpeta Postman | `TELERED VCN Resp Sin enmascarar` |
| Colección | `VCN REGRESIÓN.postman_collection.json` |
| Environment | `SANDBOX VCN.postman_environment.json` |
| Comportamiento | La colección se detiene en el paso **API Matriz** (fallo de aserciones / bail) |
| Respuesta al cliente | HTTP **509** — «La respuesta del validador no incluye el campo cifrado `respuesta` esperado» |

---

## Reproducción

### Flujo Postman (equipo de pruebas)

1. **Cifrar** — `POST {{URLC}}` (`tld-validador-dummy.sand.telered.internal/cifrar`)
   - Body usa `"validador": "{{validadorNOMASKRA}}"` → **`1577`**
2. **API Matriz** — `POST {{URLM}}` (`apigatesb.telered.com.pa/validador/validar`)
   - Body usa `"validador": "{{validador}}"` (valor propagado en runtime; ver sección Postman)
3. **Descifrar** — no se alcanza si falla el paso 2

### Llamada directa al proxy (confirmación)

Invocación directa a `tld-validador-proxy` `/sandbox/procesar` con `idCanal: 1000`, `validador: 1577`, método `0001` reproduce el mismo patrón: validador HTTP 200 con `{ "Code": 999, "message": "Error en la solicitud" }` y proxy 509.

Detalle en [`canalValidacion1577.md`](./canalValidacion1577.md).

---

## Cadena de causa (confirmada)

```
PAC / DynamoDB (canal 1577)
  → llave activa: 1577-publicOrlando.pem
       ↓
tld-validador-proxy cifra petición con esa pública
       ↓
tld-validador-dummy recibe POST /validar
       ↓
descifra con dummy-private.pem (par de dummy-public / 1577-dummy-public)
       ↓
FALLO: error:02000079:rsa routines::oaep decoding error
       ↓
peticion = null → TypeError (metodo)
       ↓
respuesta al proxy: { Code: 999, message: "Error en la solicitud" }
       ↓
proxy: 509 error_validador_campo_respuesta (sin campo "respuesta" cifrado)
```

---

## Evidencia de llaves

Archivos comparados en esta carpeta y en `tld-validador-dummy`:

| Archivo | Rol | Coincide con dummy |
|---------|-----|-------------------|
| `1577-dummy-public (1).pem` | Pública entregada para dummy / Sandbox | **Sí** — idéntica a `tld-validador-dummy/lambdas/validar/dummy-public.pem` |
| `1577-publicOrlando.pem` | Pública activa en PAC al momento del incidente | **No** — par RSA distinto |

En logs del proxy (`canalValidacion1577.md`):

- `llaveCifrado.archivo`: **`1577-publicOrlando.pem`**
- `urlValidador`: `https://tld-validador-dummy.sand.telered.internal/validar`

En logs del dummy (`canalValidacion1577.md`):

- Descifrado con **`dummy-private.pem`**
- Error: **`oaep decoding error`**

---

## Configuración PAC / DynamoDB (canal 1577)

| Campo | Valor observado |
|-------|-----------------|
| `idCanal` | `1577` |
| `alias` | `AUTOMATI` |
| `canalNombre` | `1577-Canal para marketplace` |
| `urlValidador` | `https://tld-validador-dummy.sand.telered.internal/validar` |
| `estadoValidador` | `Y` |
| `algoritmoCifrado` | `aes-256-cbc` |
| Llaves cargadas en PAC | `1577-publicOrlando.pem`, `1577-dummy-public (1).pem` |
| Llave activa (incorrecta para dummy) | **`1577-publicOrlando.pem`** |

**Desalineación:** URL apunta al **dummy**, pero la llave activa corresponde a **otro par** (probable escenario histórico / validador real asociado al nombre «Orlando»). Para Sandbox con dummy, la activa debe ser **`1577-dummy-public (1).pem`**.

---

## Variables Postman: `validador` vs `validadorNOMASKRA`

Confusión frecuente al inspeccionar el environment en Postman **después** de ejecutar la colección.

### Valores en el archivo exportado (`SANDBOX VCN.postman_environment.json`)

| Variable | Valor inicial |
|----------|----------------|
| `validador` | **`1000`** |
| `validadorNOMASKRA` | **`1577`** |

Verificado: cerrar Postman, reimportar el environment sin ejecutar nada → `validador = 1000`, `validadorNOMASKRA = 1577`.

### Por qué a veces se ve `validador = 1577` en la UI

En **TELERED VCN Resp Sin enmascarar**:

1. El paso **Cifrar** envía `"validador": "{{validadorNOMASKRA}}"` (`1577`).
2. El script de test del Cifrar hace `pm.environment.set("validador", jsonData.validador)` — el dummy devuelve `1577` y **sobrescribe** `validador`.
3. El paso **API Matriz** usa `"validador": "{{validador}}"` → en ese momento vale **1577**.

El `1577` **no** viene del valor por defecto de `validador` en el JSON exportado; viene de **`validadorNOMASKRA`** y se propaga en runtime.

---

## Qué no es la causa (para este incidente)

| Hipótesis | Valoración |
|-----------|------------|
| Bug nuevo en lógica de negocio del dummy | No — falla en descifrado RSA antes de procesar `metodo` |
| El proxy elige la llave por código en deploy | No — lee `llaveCifrado` desde DynamoDB / PAC (`1577-publicOrlando.pem` en logs) |
| Error en la colección Postman (validador equivocado) | No — `1577` es el canal previsto para «sin enmascarar» en Sandbox |
| Variable `validador` mal definida en el environment exportado | No — el escenario usa `validadorNOMASKRA`; `validador` se actualiza en ejecución |

Los despliegues de `tld-validador-proxy` y mejoras a `tld-validador-dummy` **no explican** qué llave queda activa en el PAC; eso lo administra el sitio PAC.

---

## Acción requerida

**Responsable:** administración del PAC / configuración de canales en Sandbox (equipo que opera el PAC).

**Cambio:**

1. Canal **`1577`**
2. Activar llave pública **`1577-dummy-public (1).pem`**
3. Desactivar (o no usar para cifrado) **`1577-publicOrlando.pem`** mientras `urlValidador` apunte a `tld-validador-dummy.sand.telered.internal`

**Verificación post-cambio:**

1. Ejecutar carpeta **TELERED VCN Resp Sin enmascarar** con `SANDBOX VCN`
2. O llamada directa a `tld-validador-proxy` con `validador: 1577`, método `0001`
3. Esperado: respuesta con campo `respuesta` cifrado; sin 509 ni `Code: 999` por fallo de descifrado

---

## Artefactos de referencia

| Artefacto | Ubicación |
|-----------|-----------|
| Logs proxy + dummy + DynamoDB | [`canalValidacion1577.md`](./canalValidacion1577.md) |
| Llave dummy (PAC) | [`1577-dummy-public (1).pem`](./1577-dummy-public%20(1).pem) |
| Llave Orlando (PAC, activa al incidente) | [`1577-publicOrlando.pem`](./1577-publicOrlando.pem) |
| Llave pública dummy (repo) | `tld-validador-dummy/lambdas/validar/dummy-public.pem` |
| Colección regresión | `second-brain/Postman/equipo-pruebas/.../VCN REGRESIÓN.postman_collection.json` |
| Environment Sandbox | `second-brain/Postman/equipo-pruebas/.../SANDBOX VCN.postman_environment.json` |
| Estudio colección | `second-brain/Postman/equipo-pruebas/.../estudio-coleccion-vcn-regresion.md` |

---

## Conclusión

Con certeza técnica (logs + comparación de llaves + reproducción Postman): el error en Sandbox para el canal **1577** es producto de **configuración PAC** — llave pública activa incompatible con el validador dummy configurado. La corrección es cambiar la llave activa a **`1577-dummy-public (1).pem`**.
