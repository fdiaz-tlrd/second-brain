# Iteración 01 — Escenarios error regex `idSolicitud` (5.10–5.26)

**Fecha:** 2026-07-11  
**Origen:** commit P2P `5f1eb0461c44197a8053dd5ab96ce8d3e8301987`  
**Alcance:** P2P, P2M, VCN — escenarios Postman + alineación de `validarParametroSolicitudes` en los tres repos de producto.

---

## Decisión de producto: solo guiones no es válido

La regex inicial del commit `^[A-Za-z0-9-]{1,64}$` **aceptaba** valores como `---` o `-` (solo guiones).

**Acuerdo:** eso **no es correcto**. Debe devolver **431**.

**Corrección en código:** lookahead que exige al menos un alfanumérico:

```javascript
const regexIdSolicitud = /^(?=.*[A-Za-z0-9])[A-Za-z0-9-]{1,64}$/;
```

Escenarios **5.23** (`---`) y **5.24** (`-`) documentan este rechazo.

---

## Qué ya existía (5.1–5.9)

Sin cambios. Siguen válidos post-regex:

| # | Caso | Código |
|---|------|--------|
| 5.1 | `solicitudes` no es arreglo | 425 |
| 5.2 | arreglo vacío | 425 |
| 5.3 | excede límite CFG | 425 |
| 5.4 | sin propiedad `idSolicitud` | 431 |
| 5.5 | `""` | 431 |
| 5.6 | tipo number | 431 |
| 5.7 | solo espacios | 431 |
| 5.8 | longitud 65 | 431 |
| 5.9 | duplicado case-insensitive | 431 |

---

## Escenarios nuevos (5.10–5.26) — todos esperan 431

| # | Archivo | Caso | Valor / nota | Motivo |
|---|---------|------|--------------|--------|
| 5.10 | `5.10_..._guion_bajo` | `_` no permitido | `id_001` | Antes pasaba en prod sin regex |
| 5.11 | `5.11_..._espacio_interno` | espacio en medio | `id 001` | Antes pasaba |
| 5.12 | `5.12_..._espacio_inicio` | espacio al inicio | ` abc` | Sin trim → nuevo rechazo |
| 5.13 | `5.13_..._espacio_fin` | espacio al final | `abc ` | Sin trim → nuevo rechazo |
| 5.14 | `5.14_..._arroba` | `@` | `id@001` | Antes pasaba |
| 5.15 | `5.15_..._punto` | `.` | `id.001` | Antes pasaba |
| 5.16 | `5.16_..._unicode` | unicode | `id¿001` | Antes pasaba |
| 5.17 | `5.17_..._barra` | `/` | `id/001` | Antes pasaba |
| 5.18 | `5.18_..._comillas` | comillas | `id"001` | Antes pasaba |
| 5.19 | `5.19_..._elemento_null` | elemento `null` | `[null]` | Defensivo commit + hasOwnProperty |
| 5.20 | `5.20_..._idSolicitud_null` | propiedad null | `idSolicitud: null` | tipo object → 431 |
| 5.21 | `5.21_..._tipo_boolean_true` | boolean | `true` | exhaustivo |
| 5.22 | `5.22_..._tipo_boolean_false` | boolean | `false` | exhaustivo |
| 5.23 | `5.23_..._solo_guiones` | solo guiones | `---` | **decisión producto** |
| 5.24 | `5.24_..._guion_unico` | un guion | `-` | **decisión producto** |
| 5.25 | `5.25_..._tipo_object` | objeto | `{"x":1}` | exhaustivo |
| 5.26 | `5.26_..._tipo_array` | arreglo | `["1"]` | exhaustivo |

Generados por: `ensamblador/generar-escenarios-idSolicitud-5.10.js`

### Método y parámetros por suite

| Suite | `metodo` | `parametros` mínimos |
|-------|----------|----------------------|
| P2P | `0002` | `tipoIdentificador: CELULAR` |
| P2M | `0015` | `identificador` + `tipoIdentificador: COMERCIO` |
| VCN | `0001` | `cuenta: {{CUENTA_VALIDA}}` |

---

## Cambios en código (tres APIs)

Alineación de `validarParametroSolicitudes` en:

- `tld-api-alias` — ajuste regex (al menos un alfanumérico)
- `tld-api-p2m` — port completo desde alias (regex + hasOwnProperty seguro, sin trim)
- `tld-api-cuenta-nombre` — idem

---

## Escenarios de éxito (pendientes)

**No implementados en esta iteración.** Irán en carpeta de éxito (fuera de `5_solicitudes`):

1. `idSolicitud` longitud **1** (`a`)
2. longitud **64** (alfanumérico)
3. `abc-123` (guion interno válido)
4. `ID-001` (mayúsculas/minúsculas válidas)

Newman de error: `node run-newman.js <suite> --folder "General/1_validaciones_js/5_solicitudes"` (máquina VPN).

---

## Próxima iteración (cuando toque)

- [ ] Carpeta escenarios de **éxito** con límites 5.27+
- [ ] Run Newman con `--codigo-fuente dev` tras deploy
- [ ] Comparar con prod si aún no tiene regex (informe humano)
