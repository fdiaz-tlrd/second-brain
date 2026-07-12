# Matriz: validación de `idCanal` / `validador` y los 6 escenarios fuera de plan

**Contexto:** comparación prod-a-dev con escenarios VCN (jul-2026). Runs de referencia:

| Run | Nivel | Historial | Commit logs |
|-----|-------|-----------|-------------|
| Iter 02 | **MATRIZ** | `2026-07-12T21-08-09Z_prod_MATRIZ_completo_por-escenario.json` | `c9e0171` |
| Iter 03 | **VALIDADOR** | `2026-07-12T21-46-59Z_prod_VALIDADOR_completo_por-escenario.json` | `c102333` |

**Flujo real del cliente:** `Matriz → Validador → VCN`. Solo ese camino importa para lo que ve un cliente.

---

## Conclusión principal (no re-estudiar)

**Sí:** en el flujo **Matriz → Validador → VCN**, hay **6 escenarios** cuyo resultado **no corresponde**
a lo planificado en las pruebas Newman. En la ruta MATRIZ (iter 02) todos devuelven **`codigoError: 550`**
(`Error inesperado`) en lugar del error de validación esperado. En VALIDADOR directo (iter 03) **ninguno**
devuelve 550; la capa matriz es la que enmascara o altera el comportamiento.

Los 6 escenarios (todos en carpetas `General/`, validación de entrada):

1. `General/0_jsonEntrada` → `0.1. body — JSON HTTP inválido (400)`
2. `General/1_validaciones_js/1_idCanal` → `1.1.2. idCanal — null (400)`
3. `General/1_validaciones_js/1_idCanal` → `1.1.3. idCanal — string vacío "" (400)`
4. `General/1_validaciones_js/1_idCanal` → `1.1.4. idCanal — tipo number (400)`
5. `General/1_validaciones_js/1_idCanal` → `1.1.5. idCanal — tipo boolean (400)`
6. `General/1_validaciones_js/1_idCanal` → `1.1.6. idCanal — tipo object (400)`

Tabla comparativa MATRIZ vs VALIDADOR directo:

| Escenario | MATRIZ (flujo cliente) | VALIDADOR directo |
|-----------|------------------------|-------------------|
| JSON HTTP inválido | **550** | `null` |
| idCanal null | **550** | 400 |
| idCanal vacío `""` | **550** | 400 |
| idCanal number | **550** | 401 |
| idCanal boolean | **550** | 401 |
| idCanal object | **550** | 401 |

---

## Código implicado: `isValid` en `tld-matriz-validador-validar`

Lambda: `tld-matriz/lambdas/tld-validador-validar/index.js` (misma función en `prod_adactado_a_dev`
y en el repo dev refactor; líneas ~135–143 prod HTTP, ~188–197 dev invoke).

```javascript
const isValid = (body) =>{
  if (!body.idCanal || (body.idCanal.length > 4 || body.idCanal.length < 1)) {
    return "canal";
  }

  if (!body.validador || (body.validador.length > 8 || body.validador.length < 1)) {
    return "validador";
  }
}
```

Uso en el handler (antes de llamar al validador):

```javascript
const result = isValid(body)
if (result) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      codigoError: 400,
      descripcionError: "Error de formato en campo " + result,
    }),
  };
}
// … luego POST/invoke al validador
```

**Problemas observados con esta validación en matriz:**

1. **Duplica responsabilidad:** el validador ya valida `idCanal`, `validador` y el resto del contrato.
   Matriz actúa como segundo validador con reglas distintas o incompletas.
2. **Cubre mal algunos tipos:** para `idCanal` number/boolean/object, `!body.idCanal` es falso y
   `.length` no aplica → `isValid` **no rechaza** → la llamada al validador sigue → respuesta no-2xx
   de axios → `catch` → **`550 Error inesperado`** (no el 400/401 del validador).
3. **JSON inválido:** `JSON.parse(event.body)` en el handler lanza excepción → `catch` → **550**
   (sin pasar por `isValid` ni llegar al validador).
4. **Mensaje distinto al plan de pruebas:** cuando `isValid` sí dispara, devuelve
   `"Error de formato en campo canal|validador"`, no necesariamente el mismo `codigoError`/texto
   que el validador usaría.

---

## Posición del usuario (jul-2026) — guardar para cuando veamos dev/pruebas

> Cuando veamos la versión en **desarrollo/pruebas**, está pensando que **`tld-matriz` en su lambda
> `tld-validador-validar` no debería tener validación de los campos `idCanal` y `validador`**
> (la función `isValid` anterior).

**Razonamiento alineado con los datos:**

- El único flujo que ve el cliente pasa por matriz; si matriz valida distinto al validador, las pruebas
  contra matriz no reflejan el contrato real ni el comportamiento del validador.
- Quitar `isValid` en matriz delegaría toda validación de negocio/formato al validador (como en iter 03
  para los casos de tipo, donde al menos se ve 401 en vez de 550).
- **No es decisión tomada ni implementada** en `prod_adactado_a_dev` (sigue código producción + fixes
  de config). Es **criterio a evaluar** al comparar prod vs dev en matriz.

---

## Pregunta abierta (pendiente de decisión)

> **¿Debería `tld-matriz` (`lambdas/tld-validador-validar/index.js`) validar el cuerpo JSON en absoluto?**

Desglose para cuando se discuta:

| Ámbito | Qué hace hoy matriz | Pregunta |
|--------|-------------------|----------|
| **Parseo JSON** | `JSON.parse(event.body)` — fallo → 550 | ¿Matriz debe devolver 400 estructurado ante body no-JSON, o solo reenviar al validador / dejar que API Gateway falle? |
| **Campos `idCanal` / `validador`** | `isValid()` — parcial, distinto al validador | ¿Eliminar y delegar 100 % al validador? (posición preliminar del usuario: **sí, eliminar**) |
| **Resto del contrato** | No valida otros campos en matriz | ¿Matriz debe ser **proxy transparente** (trace + forward) sin validación de negocio? |

**Criterio de arquitectura sugerido (para la discusión):** matriz como **orquestador** (auth, trace,
reenvío), validador como **única fuente de verdad** de validación de payload. Si se adopta, habría que
alinear asserts Newman en escenarios `General/` para el flujo **MATRIZ**, no solo VALIDADOR directo.

---

## Relación con iteraciones documentadas

| Documento | Qué aporta |
|-----------|------------|
| [`recopilacion/ITERACION-02-...md`](./recopilacion/ITERACION-02-prod-a-dev-MATRIZ-postfix-2026-07-12.md) | Run MATRIZ post-fix URL; 6×550 residual enumerados |
| [`recopilacion/ITERACION-03-...md`](./recopilacion/ITERACION-03-prod-VALIDADOR-2026-07-12.md) | Run VALIDADOR; 0×550; tabla cruzada de los 6 |
| Este archivo | Conclusión de negocio, código `isValid`, posición usuario, pregunta abierta |

**No investigar causa raíz aquí** sin pedido explícito; los datos y la hipótesis de diseño quedan
archivados para comparar cuando corra `--codigo-fuente dev` en MATRIZ.
