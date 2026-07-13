# Corrección `tld-validador-api/lambdas/validar` — hallazgos de códigos (2026-07-13)

Repo dev: `tld-validador-api` rama `feature/ARQ-225_Refactory`.
Alcance: solo los hallazgos cuyo **componente es `tld-validador-api` / `validar`** (HP-012, 013, 014, 016, 018).
Los HP-001…011 son de `tld-matriz / tld-validador-validar` (otra lambda) y HP-015/017/019-022 de VCN/alias — **no** aplican aquí.

---

## Resumen

| HP | Problema (prod) | Esperado | En dev antes | Acción |
|----|-----------------|----------|--------------|--------|
| HP-012 | `idSolicitud` inválido/ausente/duplicado → **404** (colisiona con "Validador no existe") | **431** | 404 | **Corregido** |
| HP-013 | `idSolicitud` sin validar charset → pasa y revienta en **509** | **431** | sin charset | **Corregido** |
| HP-014 | elemento `null` en `solicitudes[]` crashea → **999** | **431** | crash | **Corregido** |
| HP-016 | canal emisor mal configurado → **405** | **500** | ya daba 500 | **Ya resuelto por el refactor** |
| HP-018 | método fuera de config → **509** | **418** | ya daba 418 | **Ya resuelto por el refactor** |

Verificación de comportamiento: `node verificar-validarParametroSolicitudes.js` → **24/24 OK** (carga el módulo real, no una copia).

---

## Cambios de código (HP-012 / HP-013 / HP-014)

Archivo: `tld-validador-api/lambdas/validar/lib/validador.js` → función `validarParametroSolicitudes`.

1. **HP-012** — las tres ramas de rechazo de `idSolicitud` devolvían `statusCode: 404`; ahora devuelven **431**
   (`CODIGO_ID_SOLICITUD`). El 404 queda libre para su único uso legítimo: "Validador no existe"
   (`app.js` línea 75). `app.js` (130-142) propaga ese `statusCode` como `codigoError` en la respuesta
   cifrada, así que el cliente recibe `codigoError 431`.

2. **HP-013** — se agregó validación de charset:
   `^(?=.*[A-Za-z0-9])[A-Za-z0-9-]{1,64}$` (alfanumérico + guion, 1..64, **al menos un alfanumérico**).
   Rechaza símbolos, espacios y valores de solo guiones (`-`, `---`) → **431**. Antes esos valores pasaban
   la validación y fallaban después en 509 genérico.

3. **HP-014** — nueva rama previa: si algún elemento de `solicitudes` no es objeto o es `null` → **431**.
   Antes `solicitud.hasOwnProperty("idSolicitud")` sobre `null` lanzaba TypeError → `catch` global → 999.
   Además se cambió `solicitud.hasOwnProperty(...)` por `Object.prototype.hasOwnProperty.call(...)`
   (robusto ante objetos sin prototipo).

**Sin cambios:** el `425` de "cantidad de solicitudes" (correcto) y la rama de éxito (`statusCode 0`).

---

## Por qué HP-016 y HP-018 NO requieren cambio en dev

El repo dev ya está migrado a **Lambda Invoke** y ese refactor resolvió ambos como efecto de su diseño.
Se verificó leyendo el código; no se toca nada para no introducir cambios innecesarios.

### HP-016 — canal emisor mal configurado → 500 (no 405)

- `canal.js` → `getCanal` → `enriquecerCanal` → `resolverReferenciaLlave`: si `llaveCifrado` o
  `llaveDescifrado` faltan o su referencia es inválida, **lanza** (`Definición de llave... incorrecta` /
  `No se encontró la llave...`). El `catch` de `getCanal` devuelve `statusCode: 500`.
- `app.js` (52-62): cualquier `statusCode` de emisor distinto de `0`/`401` → **`codigoError 500`**.
- Resultado: canal emisor sin llaves (caso 1017 `CANAL_EMISOR_MAL_CONFIGURADO`) → **500**, que es lo esperado.
- **Residual conocido (no es el escenario del hallazgo):** si la llave *existe* con formato válido pero es
  la incorrecta, `getCanal` pasa y `abrirPaquete` devuelve `null` → **405**. El hallazgo cubre config
  ausente, que sí da 500.

### HP-018 — método fuera de config → 418 (no 509)

- `servicioInterno.js` → `resolverServicioInterno(metodo)`: método no presente en `MAPA_METODO_SERVICIO`
  devuelve `{ statusCode: 418, message: "Metodo no soportado por el validador" }`.
- `app.js` (144-160): mapea `statusCode 418` → `codigoError 418` (HTTP 400); cualquier otro fallo → 509.
- Resultado: método desconocido → **418**, que es lo esperado.

---

## Verificación

| Qué | Cómo | Resultado |
|-----|------|-----------|
| Sintaxis | `node --check lib/validador.js` | OK |
| Lint | linter del editor | sin errores |
| Comportamiento | `node verificar-validarParametroSolicitudes.js` (módulo real vía NODE_PATH del layer) | **24/24 OK** |

El verificador es reutilizable (convención `verificar-*.js` de esta carpeta) — no borrar.

---

## Pendiente (fuera de esta máquina)

- **Deploy** del `tld-validador-api` dev con estos cambios.
- **Re-run Newman VCN** contra dev tras el deploy: los escenarios `1.5.4`–`1.5.9` (431), `1.5.10`–`1.5.18`,
  `1.5.23`, `1.5.24` (431 charset), `1.5.19` (431 null) deberían pasar a **431**.
