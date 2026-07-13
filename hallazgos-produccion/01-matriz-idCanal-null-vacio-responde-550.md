# HP-001 / HP-002 — `idCanal` null o vacío responde 550; causa: trace DynamoDB + `error()` indefinida

| Campo | Valor |
|-------|--------|
| **ID** | HP-001 (síntoma), HP-002 (bug `error()`) |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado |
| **Severidad** | alta |
| **Componente** | `tld-matriz` → lambda `tld-validador-validar` |
| **Ámbito** | transversal (validador vía matriz) |

---

## Resumen

Con `idCanal: null` o `idCanal: ""`, producción responde **`codigoError 550 "Error inesperado"`** en lugar del **`400 "Error de formato en campo canal"`** que el propio `isValid` del handler produciría. La expectativa de las pruebas (400) es correcta; **producción está mal** en estos dos casos. La causa está probada por CloudWatch: fallo al guardar trace en DynamoDB (GSI `matriz-trace-canal`) seguido de `ReferenceError` por llamar a `error()` que no existe.

---

## Comportamiento en producción (observado)

| Escenario | Entrada `idCanal` | Recibido (MATRIZ, prod en dev) | HTTP |
|-----------|-------------------|--------------------------------|------|
| 1.1.1 | ausente (undefined) | 400 "Error de formato en campo canal" | 200 |
| 1.1.2 | `null` | **550** "Error inesperado" | 200 |
| 1.1.3 | `""` | **550** "Error inesperado" | 200 |
| 1.1.9 | `"10000"` (len 5) | 400 "Error de formato en campo canal" | 200 |

Run: `2026-07-13T01-03-45Z_prod_MATRIZ`, `codigo-fuente prod`, captura fortalecida 1263/1263.

---

## Comportamiento esperado

- Pruebas VCN: 400 para null y vacío (mismo criterio que formato inválido de canal).
- Código prod (`isValid`): `!body.idCanal` → retorna `"canal"` → handler responde 400 **sin** llamar al validador downstream.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Newman por escenario | `Postman/generador/logs/historial/2026-07-13T01-03-45Z_prod_MATRIZ_completo_por-escenario.json` |
| Request body a matriz (`idCanal: null`) | [`../investigacion/matriz-produccion_en_dev.md`](../investigacion/matriz-produccion_en_dev.md) — escenario 1.1.2, línea ~532 |
| CloudWatch | Mismo archivo — RequestId `db2952d2-3748-493b-9c4b-2973a24bf594` |
| Código prod | `produccion_real/tld-matriz/lambdas/tld-validador-validar/index.js` líneas 33, 36, 135-144 |
| Estudio largo | [`../produccion_real/01-tld-matriz-validador-validar.md`](../produccion_real/01-tld-matriz-validador-validar.md) §4 |

**Extracto CloudWatch (confirmado):**

1. `ValidationException`: `Type mismatch for Index Key canal Expected: S Actual: NULL IndexName: matriz-trace-canal`
2. `ReferenceError: error is not defined at exports.handler (/var/task/index.js:33:7)`

---

## Causa raíz (confirmada)

1. Handler recibe body con `idCanal: null` (o `""`).
2. `guardarTrace(..., body.idCanal, ...)` intenta `PutItem` en tabla trace.
3. GSI **`matriz-trace-canal`** exige clave `canal` tipo **String (S)**. Con `null` → `NULL`; con `""` → rechazo de clave vacía → **ValidationException**.
4. `guardarTrace` devuelve `false` → línea 33 ejecuta `error("...")` pero **`error` no está definida** (solo existe `log`).
5. `ReferenceError` → `catch` externo → respuesta **550**.

**Por qué *ausente* sí da 400:** `marshall(..., { removeUndefinedValues: true })` elimina `canal` cuando es `undefined` → el ítem no viola el GSI → trace OK → llega a `isValid` → 400.

---

## Impacto

- Integradores que envían `null` o string vacío reciben **error genérico 550** en lugar de mensaje de validación claro (400).
- Soporte y diagnóstico: el 550 oculta que el problema es formato de canal + fallo interno de trace.
- Trazabilidad: no se persiste trace para esos requests (fallo en PutItem).

---

## Mejora propuesta

| Acción | Notas |
|--------|--------|
| Reemplazar `error(...)` por `log(...)` o eliminar la llamada que lanza | Evita convertir fallo de trace en 550 |
| Validar `idCanal` **antes** de `guardarTrace` | `isValid` primero; o no pasar `canal` null al trace |
| Endurecer `isValid` con chequeo de tipo | Relacionado HP-005 |
| Revisar diseño GSI `matriz-trace-canal` | ¿Debe indexar requests con canal inválido? |

**No cambiar** la expectativa 400 de las pruebas por estos dos casos — el bug es de producción.

---

## Referencias

- Evidencia campo: [`../investigacion/matriz-produccion_en_dev.md`](../investigacion/matriz-produccion_en_dev.md)
- Estudio código: [`../produccion_real/01-tld-matriz-validador-validar.md`](../produccion_real/01-tld-matriz-validador-validar.md)
