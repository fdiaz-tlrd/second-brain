# Comparación por escenario — esperado vs MATRIZ vs VALIDADOR

**Objetivo:** dejar escrita, escenario por escenario, la diferencia entre lo que el plan de pruebas
**esperaba** y lo que devolvió **código prod** por las dos rutas: `NIVEL_EJECUCION=MATRIZ` (flujo real
del cliente: Matriz→Validador→VCN) y `NIVEL_EJECUCION=VALIDADOR` (validador directo). **Solo diferencias.**

- **Tabla completa (136 escenarios):** [`recopilacion/TABLA-diferencias-esperado-matriz-validador.md`](./recopilacion/TABLA-diferencias-esperado-matriz-validador.md)
- **Script:** [`recopilacion/comparar-3-columnas.js`](./recopilacion/comparar-3-columnas.js)
- **Runs:** MATRIZ `2026-07-12T21-08-09Z`, VALIDADOR `2026-07-12T21-46-59Z` (ambos prod-a-dev).

**Leyenda:** `codigo×N` = ese `codigoError` en N ejecuciones (variantes de cifrado por escenario).
`null` = respuesta sin `codigoError` (éxito de negocio). MATRIZ corre 4 variantes, VALIDADOR 3.

---

## RESPUESTAS RÁPIDAS

| Pregunta | Respuesta |
|----------|-----------|
| ¿Cuántos escenarios difieren del plan (en MATRIZ o VALIDADOR)? | **136 / 316** |
| ¿En cuántos difieren **MATRIZ y VALIDADOR entre sí**? | **8** |
| ¿Difiere solo MATRIZ (validador ok)? | 2 |
| ¿Difiere solo VALIDADOR (matriz ok)? | 1 |
| ¿Difieren en ambos (mismo código erróneo)? | 133 |

**Clave:** de 136 diferencias contra el plan, **128 se comportan igual por matriz que por validador**
(el desvío viene de VCN/validador, no de la capa matriz). Solo en **8** la ruta importa.

---

## Los 8 escenarios donde MATRIZ ≠ VALIDADOR (los que dependen de la ruta)

| Escenario | Esperado | MATRIZ | VALIDADOR | Lectura |
|-----------|----------|--------|-----------|---------|
| `General/0_jsonEntrada` · 0.1 body JSON HTTP inválido | 400 | **550** | **null** | Matriz revienta a 550; validador directo lo acepta (null) |
| `1_idCanal` · 1.1.2 idCanal null | 400 | **550** | **400** | Validador da el 400 esperado; matriz lo enmascara 550 |
| `1_idCanal` · 1.1.3 idCanal vacío `""` | 400 | **550** | **400** | Igual: validador acierta, matriz 550 |
| `1_idCanal` · 1.1.4 idCanal number | 400 | **550** | **401** | Matriz 550; validador 401 (no 400) |
| `1_idCanal` · 1.1.5 idCanal boolean | 400 | **550** | **401** | idem |
| `1_idCanal` · 1.1.6 idCanal object | 400 | **550** | **401** | idem |
| `1_idCanal` · 1.1.9 idCanal longitud 5 (>máx 4) | 400 | **400** | **401** | Único donde **matriz acierta** (400) y validador no (401) |
| `5_fallosIntegracionValidador/1023_token` · 0001.5.1023.1 demora validador (599) | 599 | **null** | **509** | Matriz no propaga timeout (null/éxito); validador da 509 |

**Relación con `isValid` de matriz** (ver [`07-matriz-validacion-cuerpo-json.md`](./07-matriz-validacion-cuerpo-json.md)):
los casos `idCanal` null/vacío/number/boolean/object caen en el `catch` de matriz → **550**, mientras el
validador sí evalúa formato. Este es el subconjunto donde quitar la validación de matriz cambiaría el
resultado hacia el del validador.

---

## Las otras 128 diferencias (MATRIZ = VALIDADOR)

En estos escenarios ambas rutas devuelven **el mismo** código, distinto del esperado. Es decir, la
diferencia **no** la introduce matriz; viene de VCN/validador (código prod ≠ contrato dev). Grupos grandes:

| Grupo | Escenarios | Esperado → recibido (ambas rutas) | Nota |
|-------|-----------|-----------------------------------|------|
| `Metodo/0001/1_validaciones_js/1_cuenta` (413) | ~20 | 413 → **null** (mayoría) o 999/509 | Prod **no** rechaza cuenta malformada como dev; muchos pasan a éxito |
| `Metodo/0001/2_respuestaCanalValidador/*` (510–515) | ~90 | 510–515 → **null** | Prod devuelve éxito donde dev esperaba error de canal validador |
| `General/1_validaciones_js/2_validador` (400) | ~12 | 400 → **404** | Validador devuelve 404, no 400 |
| `General/1_validaciones_js/3_peticion` (400) | ~10 | 400 → **405** | 405 en vez de 400 |
| `General/1_validaciones_js/5_solicitudes` (431) | ~23 | 431 → **509/404/999/425** | Varía por subcaso |
| `General/2_reglaNegocio/*` (403/500/418) | ~6 | → 509/405/418 | Reglas de negocio con códigos distintos |

> **`510–515 → null` (≈90 escenarios)** es el bloque más grande: prod, ante respuestas de error del
> canal validador (cuenta incorrecta/cerrada/bloqueada, etc.), responde **éxito** en lugar del código
> de error que el plan dev espera. Es la mayor fuente de divergencia y no depende de la ruta.

---

## Cómo reproducir / consultar

```powershell
cd Postman\comparar-prod-vs-dev\recopilacion
node comparar-3-columnas.js ^
  ..\..\generador\logs\historial\vcn\2026-07-12T21-08-09Z_prod_MATRIZ_completo_por-escenario.json ^
  ..\..\generador\logs\historial\vcn\2026-07-12T21-46-59Z_prod_VALIDADOR_completo_por-escenario.json ^
  --salida TABLA-diferencias-esperado-matriz-validador.md
```

La tabla `.md` completa (136 filas) queda en `recopilacion/`. Este documento es el **índice
interpretado**; para el detalle fila a fila, abrir la tabla.

---

## Pendiente (para cerrar la comparación real prod vs dev)

Esto compara **prod vs plan-dev (esperado)**. Falta el run **`--codigo-fuente dev`** con el **mismo**
`NIVEL_EJECUCION` para comparar **prod recibido vs dev recibido** escenario a escenario (ahí se confirma
cuáles de estas 136 diferencias son "dev cambió el contrato" y cuáles son defecto real).
