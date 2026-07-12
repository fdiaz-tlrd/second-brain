# HTTP (protocolo) vs codigoError (payload) — qué captura Newman y qué significa

**Problema que motivó este doc:** en los runs anteriores, `*_por-escenario.json` guardaba solo
`httpDescifrar` (HTTP del dummy `/descifrar`, siempre ~200) y **no** el HTTP real de la lambda
(`PROCESAR_STATUS_CODE`). Eso hacía imposible responder si producción devuelve el HTTP esperado.

**Corregido en:** `Postman/generador/run-newman.js` (jul-2026). Campos nuevos en cada escenario:

| Campo | Qué es |
|-------|--------|
| `httpRealLambda` | HTTP real devuelto por la lambda (matriz/validador/VCN) — parseado del assert `[Lambda VCN] HTTP status = E (real: R)` |
| `httpEsperado` | `expectedHttpStatus` del plan de pruebas |
| `httpCoincide` | `httpEsperado === httpRealLambda` |
| `httpDescifrar` | HTTP del dummy `/descifrar` (legado; **no** usar para juzgar la lambda) |
| `recibidoNegocio` | Código de negocio efectivo: `codigoError` (general) o `respuestas[0].resultado` (parametro/metodo/exito) |
| `codigoErrorEsperado` | Esperado parseado del assert |
| `negocioCoincide` | `codigoErrorEsperado === recibidoNegocio` |

---

## La diferencia conceptual (no mezclar)

```
Cliente → API Gateway → Lambda → responde:
  ┌─────────────────────────────────────────┐
  │ HTTP status: 200, 400, 502...           │  ← protocolo (capa transporte)
  │ Body JSON: { codigoError: 400, ... }    │  ← negocio (aplicación)
  │         o { respuestas: [{ resultado: 510 }] }
  └─────────────────────────────────────────┘
```

- **HTTP 400** = el servidor dice "bad request" a nivel protocolo.
- **`codigoError: 400` en el JSON** = la aplicación dice "error de formato" en el payload.
- **Son independientes.** Una lambda puede devolver HTTP 200 con `codigoError: 550` en el body.

---

## Qué hace producción (datos reales, iter 02/03, jul-2026)

### Por MATRIZ (`NIVEL_EJECUCION=MATRIZ`)

| Métrica | Valor |
|---------|-------|
| HTTP real de la lambda | **200 en las 1263 ejecuciones** (100 %) |
| HTTP esperado ≠ 200 | **367 ejecuciones** (29,1 %) — el plan esperaba 400/500 |
| HTTP coincide con esperado | **896** (70,9 %) — solo los que esperaban 200 |

**Conclusión:** la capa **matriz aplana todo a HTTP 200**. El error de negocio va embebido en el body
(`codigoError` o `respuestas[0].resultado`). Esto es comportamiento de diseño de
`prod_adactado_a_dev/tld-matriz/lambdas/tld-validador-validar/index.js` (siempre `statusCode: 200`).

### Por VALIDADOR directo (`NIVEL_EJECUCION=VALIDADOR`)

| Métrica | Valor |
|---------|-------|
| HTTP real | **200** (849), **400** (94), **502** (4) |
| HTTP esperado ≠ 200 | **98 ejecuciones** (10,3 %) |
| HTTP coincide | **849** (89,7 %) |

**Conclusión:** validador directo **sí** devuelve HTTP 400/502 en algunos casos. Más fiel al plan que matriz.

### Comparación MATRIZ vs VALIDADOR en HTTP

- **92 escenarios** tienen HTTP real ≠ esperado (en alguna ruta).
- En casi todos, MATRIZ devuelve **200** donde el plan esperaba **400**.
- VALIDADOR devuelve **400** (o 502 en el caso del JSON inválido).

Ejemplo concreto (`General/0_jsonEntrada` · body JSON HTTP inválido):

| | HTTP esperado | HTTP real MATRIZ | HTTP real VALIDADOR |
|---|---------------|------------------|---------------------|
| | 400 | **200** | **502** |

---

## Qué NO usar para juzgar HTTP

| Campo viejo | Por qué no sirve |
|-------------|------------------|
| `httpDescifrar` | Es el HTTP del dummy `/descifrar`, no de la lambda. Siempre ~200. |
| `codigoError` en el body | Es negocio, no protocolo. Un `codigoError: 400` no implica HTTP 400. |

---

## Cómo se captura (implementación)

1. **En Postman** (`Post-response.js` de raíz): el assert
   `[Lambda VCN] HTTP status = {esperado} (real: {real})` compara `PROCESAR_STATUS_CODE` (collection
   variable) contra `expectedHttpStatus`.
2. **En Newman** (`run-newman.js`): `extractAssertData()` parsea ese assert y extrae ambos valores.
3. **En análisis** (`analizar-por-escenario.js`): bandera automática si la lambda aplana todo a 200.
4. **En comparación** (`comparar-3-columnas.js`): Tabla B con HTTP esperado vs MATRIZ vs VALIDADOR.

---

## Runs viejos (antes del fix)

Los `*_por-escenario.json` guardados antes de jul-2026 **no** tienen `httpRealLambda`. Para enriquecerlos
sin re-correr Newman:

```powershell
cd Postman\comparar-prod-vs-dev\recopilacion
node regenerar-por-escenario.js ..\..\generador\logs\historial\vcn\<run>_completo.json prod MATRIZ enriquecido-<id>_por-escenario.json
```

Requiere el `*_completo.json` (tiene la colección embebida para reconstruir rutas).

---

## Implicación para ajustar escenarios de prueba

1. **No cambiar `expectedHttpStatus` todavía** copiando producción. Primero comparar prod vs dev recibido.
2. Si se decide alinear el plan a prod:
   - Por **MATRIZ**: casi todo debería esperar HTTP **200** (la capa aplana).
   - Por **VALIDADOR/VCN**: mantener HTTP 400/502 donde prod los devuelve.
3. El desvío de **negocio** (~22 %) es independiente del desvío de **HTTP** (~29 % por matriz).
   Hay que revisar ambas dimensiones por separado.

---

## Referencias

- [`08-esperado-vs-recibido-prod.md`](./08-esperado-vs-recibido-prod.md) — números de negocio
- [`09-tabla-comparacion-escenarios.md`](./09-tabla-comparacion-escenarios.md) — tabla escenario a escenario
- [`recopilacion/TABLA-diferencias-esperado-matriz-validador.md`](./recopilacion/TABLA-diferencias-esperado-matriz-validador.md) — Tabla B (HTTP)
- [`07-matriz-validacion-cuerpo-json.md`](./07-matriz-validacion-cuerpo-json.md) — por qué matriz devuelve 550
