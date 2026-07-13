# HP-027 — `idPeticion`: doc técnica no declara el prefijo SWIFT (prod sí lo valida; dev añade 445)

| Campo | Valor |
|-------|--------|
| **ID** | HP-027 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (código fuente prod + doc Marketplace) |
| **Severidad** | media |
| **Componente** | `telered_content_mktpl` / `tech_doc` (`api_4.json` VCN, `api_6.json` P2P) + `tld-api-alias` |
| **Ámbito** | documentación pública + granularidad de código de error |
| **Tipo** | hallazgo de documentación (spec incompleta) + mejora de granularidad (400 → 445) |

---

## Resumen

El campo `idPeticion` **debe iniciar con el código SWIFT del canal emisor** seguido de dígitos. Esa regla:

- **La aplica el código de producción** (P2P `tld-api-alias`): rechaza si el prefijo no coincide.
- **NO está declarada** en la doc técnica de la mayoría de los métodos: `api_4.json` (VCN, método 0001)
  y `api_6.json` (P2P, métodos **0002–0009**) traen un texto legacy incompleto.
- **SÍ está declarada** (correctamente, con `pattern`) en `api_6.json` para los métodos **0022 y 0023**
  (QR), que son los revisados más recientemente.

Producción **ya valida y rechaza** el prefijo ajeno, solo que responde **400** "Error en la petición
original" (genérico). El cambio en dev **no agrega** una validación nueva: da un código **específico**
**445** "El prefijo Código SWIFT del idPeticion no coincide con el canal emisor".

> **No es un PROD-MAL duro** (prod no ejecuta negocio con dato inválido; lo rechaza). Es (a) gap de
> documentación y (b) mejora de granularidad del código de error.

---

## Evidencia

### La doc está incompleta (igual texto en VCN y en P2P métodos viejos)

```322:325:produccion_real\telered_content_mktpl\tech_doc\api_4.json
					"idPeticion": {
						"type": "string",
						"description": "Id de identificación de la petición, valor alfanumérico con un mínimo de un carácter y un máximo de 64 caracteres dentro de la misma petición.",
						"minLength": 1,
```

```834:837:produccion_real\telered_content_mktpl\tech_doc\api_6.json
              "idPeticion": {
                "type": "string",
                "description": "Id de identificación de la petición, valor alfanumérico con un mínimo de un carácter y un máximo de 64 caracteres dentro de la misma petición.",
                "minLength": 1,
```

### La doc correcta existe (P2P 0022/0023, con pattern)

```2007:2012:produccion_real\telered_content_mktpl\tech_doc\api_6.json
              "idPeticion": {
                "type": "string",
                "description": "<p>Identificador único de la petición.</p><p>Debe iniciar con el código SWIFT del canal solicitante y continuar con caracteres numéricos.</p><p><strong>NOTA:</strong> Es responsabilidad del canal solicitante asegurar que este valor no se repita dentro de las siguientes 24 horas calendario.</p>",
                "minLength": 1,
                "maxLength": 64,
                "pattern": "^[A-Za-z]{8}[0-9]{1,56}$"
```

### El código de producción SÍ valida el prefijo

```141:157:prod_adactado_a_dev\tld-api-alias\lambdas\alias\lib\validaciones.js
function validarParametroIdPeticion(idPeticion, banco) {
  logger.imprimirLogs(JSON.stringify({ nombreFuncion: "validaciones.js.validarParametroIdPeticion", estado: "iniciada", argumentos: { idPeticion, banco } }));
  let respuesta;

  let regex = new RegExp('^' + banco + '\\d+$');

  if (!idPeticion || typeof idPeticion !== 'string' || idPeticion.trim().length === 0 || idPeticion.length > 64 || !regex.test(idPeticion)) {
    respuesta = {
      statusCode: 400,
      mensaje: "Error en la petición original",
    };
```

`banco` = `canalEmisor.alias` = SWIFT del emisor (ver JSDoc L129 y llamada en `app.js`):

```174:174:prod_adactado_a_dev\tld-api-alias\lambdas\alias\app.js
    const resValIdPeticion = validaciones.validarParametroIdPeticion(peticion?.idPeticion, canalEmisor?.alias);
```

La regex `^<SWIFT>\d+$` obliga a que `idPeticion` empiece con el SWIFT del emisor.

| Tipo | Referencia |
|------|------------|
| Doc incompleta VCN | `produccion_real/telered_content_mktpl/tech_doc/api_4.json` (método 0001) |
| Doc incompleta P2P | `produccion_real/telered_content_mktpl/tech_doc/api_6.json` (métodos 0002–0009) |
| Doc correcta P2P | `api_6.json` métodos **0022 / 0023** (`pattern: ^[A-Za-z]{8}[0-9]{1,56}$`) |
| Código prod P2P | `prod_adactado_a_dev/tld-api-alias/lambdas/alias/lib/validaciones.js` L141–160 (regex `^banco\d+$`) |
| Llamada prod | `prod_adactado_a_dev/tld-api-alias/lambdas/alias/app.js` L174 (`canalEmisor?.alias`) |
| Código dev (445) | `tld-api-alias/lambdas/alias/lib/validaciones.js` L127–172 (statusCode 445 en mismatch) |
| Escenario | `1.4.15. idPeticion — prefijo SWIFT ajeno (445)` — método `0002`; `SWIFT_CANAL_AJENO=INVAPAPA`, emisor `CELEGATO` |
| Run Newman P2P | `Postman/generador/logs/resultados-por-escenario-p2p.json` run `09-47-19Z` (445 → 400) |
| Catálogo 445 | `second-brain/codigosRespuesta/nueva-tabla-codigo-respuesta.md` |
| Revisión | [`../Postman/comparar-prod-vs-dev/13-revision-codigos-respuesta-p2p.md`](../Postman/comparar-prod-vs-dev/13-revision-codigos-respuesta-p2p.md) §Bloque D punto 3 |

---

## Comportamiento

- **Recibido (prod):** `codigoError 400` "Error en la petición original".
- **Esperado (test/dev):** `codigoError 445` "El prefijo Código SWIFT del idPeticion no coincide con el canal emisor".
- **Condición:** `idPeticion` con prefijo SWIFT distinto al alias del canal emisor.

`idPeticion` es un campo **transversal** (se valida una vez en el flujo general, antes de despachar el
método). Por eso la regla es única para todos los métodos; la ausencia en 0002–0009 es **omisión de doc**,
no una regla distinta por método.

---

## Doble hallazgo

1. **Documentación técnica incompleta:** `api_4` (VCN) y `api_6` métodos 0002–0009 no declaran el
   prefijo SWIFT que el backend sí exige. Debe homologarse con 0022/0023 (misma descripción + `pattern`).
   Comparte naturaleza con **HP-008** y **HP-010** (gaps de doc Marketplace).
2. **Mejora de granularidad (dev):** el 445 hace explícito lo que prod rechaza como 400 opaco. Justificado
   porque prod ya valida el prefijo; no introduce una restricción nueva.

---

## Relación

| ID | Relación |
|----|----------|
| HP-008 | Hallazgo de doc Marketplace (HTTP 400 documentado vs 200 real) |
| HP-010 | Hallazgo de doc Marketplace (longitud `idCanal`/`validador` no declarada; prod sí valida) |
