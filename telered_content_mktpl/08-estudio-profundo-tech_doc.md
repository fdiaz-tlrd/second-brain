# Estudio profundo — `tech_doc` (api_4, api_6, api_7)

Estudio estructural de los tres OpenAPI para (a) entender la doble cara del contrato
(métodos que **exponemos** vs métodos que debe exponer el **Canal Validador**), (b) mejorar
presentación sin cambiar información, y (c) evaluar un **generador** de estos JSON. Fecha: 2026-07-11, rama `feature/Refactory`.

> Todos los datos de este doc salen de parsear los JSON (post-arreglo de api_4). No hay inferencias
> sin evidencia; las discrepancias se marcan como tales.

---

## 1. Comparación estructural

| Aspecto | api_4 (VCN) | api_6 (P2P) | api_7 (R2P) |
|---------|-------------|-------------|-------------|
| openapi | 3.0.0 | 3.0.0 | 3.0.0 |
| version info | 1.0.0 | 1.0.0 | **1.13.0** |
| líneas / bytes | 408 / ~101 KB | 2428 / ~268 KB | 998 / ~185 KB |
| servers | SandBox, QA | SandBox, QA | SandBox, QA, **Producción** |
| `x-tagGroups` (Redoc) | ❌ no | ✅ **sí** | ❌ no |
| # tags | 8 | 11 | 13 |
| # paths | 3 | 12 | 5 |
| # schemas | 7 | 25 | 14 |
| auth opId | `generar-token` | `obtenerToken` | (sin /auth/token propio) |
| security | bearer JWT | bearer JWT | bearer JWT |

**Lectura:** api_6 es el más pulido (tagGroups, cifrado/descifrado completo, 10 métodos bien modelados).
api_4 es el más pobre en presentación (canal validador como anexo HTML gigante). api_7 introduce el
split CANAL/CANAL VALIDADOR pero su cifrado está incompleto y su envelope difiere.

**Regla de alcance confirmada por el usuario:** estas diferencias son información productiva. Para
APIs existentes **no se cambian contratos**: no tocar envelope, tipos, campos, métodos ni semántica.
La mejora es de **presentación** y **mantenibilidad**. Nuevas APIs/métodos sí pueden nacer con el
estándar correcto.

---

## 2. Doble cara del contrato: métodos que exponemos vs Canal Validador

La doc técnica describe **dos lados**:
- **Métodos que Telered (autopista) expone** para que el canal los consuma.
- **Métodos que el Canal Validador (la IF) debe exponer** para que Telered los invoque.

Cómo lo modela cada archivo:

| API | Cómo separa los dos lados |
|-----|---------------------------|
| **api_7 (R2P)** | **Explícito y limpio:** tag **`CANAL`** = métodos que exponemos (`0011` solicitar acreedor, `0013` estado); tag **`CANAL VALIDADOR`** = métodos que expone la IF (`0012` solicitar deudor, `0014` estado). Cada uno es un path/operación con su schema Request/Response. |
| **api_6 (P2P)** | Métodos `0002`–`0009`, `0022`, `0023` como paths (lado servicio). El lado canal validador va en un **tag anexo** `Especificación para CANAL VALIDADOR` (~26 KB HTML). |
| **api_4 (VCN)** | Método `0001` como path. El lado canal validador es un **tag anexo HTML de ~69 KB** (`Especificación para CANAL VALIDADOR`) — la parte "fea" a rediseñar. |

**Objetivo de mejora (según usuario):** llevar el canal validador de api_4 a la **forma estructurada**
(paths + schemas por método, estilo api_7 CANAL VALIDADOR), en vez del anexo HTML monolítico.

---

## 3. Anatomía de un método (la plantilla)

Todos los métodos comparten la MISMA forma. Ejemplo real (api_6 `0002`, api_7 `0011`):

```
paths["/validador/validar" + N espacios].post = {
  tags: [<tag del servicio o CANAL/CANAL VALIDADOR>],
  summary: "Método XXXX - <nombre>",
  description: "<HTML>",
  operationId: "XXXX",
  requestBody.content["application/json"].schema.$ref -> RequestXXXX,
  responses["200"].content[...].schema.$ref -> ResponseXXXX (o Response200_XXXX),
  responses["400"]...schema.$ref -> ResponseHTTPCode400 (o Response400_XXXX)
}
```

### Envelope constante (solo cambia `parametros` y `datos`)

**Request** (idéntico salvo `parametros`):
```
{ idCanal, validador, peticion: { idPeticion, metodo, solicitudes: [ { idSolicitud, parametros: {…} } ] } }
```
**Response** (idéntico salvo `datos`):
```
{ idPeticion, respuestas: [ { idSolicitud, resultado, datos: {…} } ] }
```

Lo **único** que varía método a método:
- `parametros` (campos de entrada del método)
- `datos` (campos de salida en éxito)
- metadatos: código, nombre, descripción, ejemplos, códigos de error

Esto es lo que hace **muy factible un generador** (ver `09-generador-openapi.md`).

---

## 4. Diferencias entre APIs (relevantes para generar sin romper contrato)

| Tema | api_4 | api_6 | api_7 | Nota |
|------|-------|-------|-------|------|
| Nombre schema envelope req | `RequestCifrado` | `RequestCifrado` | **`RequestValidador`** | naming distinto |
| Response envelope | `{idPeticion, respuestas[]}` | `{idPeticion, respuestas[]}` | **`{respuesta:{idPeticion, respuestas[]}}`** | api_7 envuelve en `respuesta` |
| `resultado` | integer | integer | **string** | tipo distinto |
| Éxito/error split | 1 schema `ResponseXXXX` + `ResponseHTTPCode400` | igual | **`Response200_XXXX` + `Response400_XXXX`** | api_7 separa 200/400 por método |
| `validador` enum | — | `enum:["0001"]` fijo | example `1002` | api_6 lo fija |
| auth /token | `generar-token` | `obtenerToken` | no tiene | naming/ausencia |
| `x-tagGroups` | no | sí | no | Redoc grouping |

**Ninguna de estas diferencias es solo presentación:** afectan contrato (tipo de `resultado`, forma
del envelope) y el generador debe **preservarlas por API**. Antes se mencionó "normalizar"; queda
corregido: **no se normaliza una API productiva si eso cambia información contractual**.

---

## 5. Cifrado y descifrado — api_6 es la referencia futura

Cuando el usuario dice **cifrado**, se refiere a **cifrado y descifrado**.

El usuario aclaró: se equivocó al decir que api_6 y api_7 ya eran iguales. **Hoy NO son iguales.**
Lo correcto y más reciente está **solo** en api_6.

| | api_6 — "Guía Cifrado Híbrido RSA + AES-256-GCM" | api_7 — "5. Cifrado y Descifrado de datos" |
|--|--|--|
| Texto (sin HTML) | ~20.079 chars | ~6.415 chars |
| Cobertura | Proceso COMPLETO: intercambio RSA, cifrado AES-GCM, construcción mensaje híbrido, descifrado híbrido, ejemplos código | Solo **generación de llaves RSA** (requisitos, OpenSSL, crear/extraer llave, archivos a compartir) |
| Divergen desde | carácter 0 (contenido distinto) | |

**Conclusión estricta:** api_7 tiene el cifrado/descifrado **incompleto** frente a api_6. El estándar
correcto para el futuro es que api_7 y api_4 tengan lo que hoy tiene api_6:

- `Guía para Cifrado Híbrido: RSA + AES-256-GCM`
- `Guía para Cifrado Híbrido: RSA + AES-256-CBC (Obsoleto)`

**VCN (api_4):** hoy documenta AES-CBC (tag "Cifrado y Descifrado de datos", ~7.7 KB). El usuario
confirmó que **eventualmente** tendrá la guía de api_6, pero no implica cambiar ahora información
contractual sin control.

> Dirección futura: definir un bloque canónico basado en api_6 y reutilizarlo cuando toque migrar
> presentación/documentación de api_7 y api_4.

---

## 6. Catálogos de errores (campo `resultado`)

| API | Tags de errores |
|-----|-----------------|
| api_4 | "Razones… Interno de la autopista (Telered)" + "Razones… Canal Validador" |
| api_6 | "Razones de Respuestas: Xpress" (~7.7 KB) |
| api_7 | "RAZONES DE RESPUESTAS – R2P" (~8.9 KB) + "ESCENARIOS DE ERROR – R2P" (**~89 KB**, gigante) |

`api_7` tiene además un tag enorme de escenarios de error con REQUEST/RESPONSE de ejemplo por caso —
material valioso pero pesado; candidato a estructurarse.

---

## 7. Qué es "fuente de verdad" y qué es presentación

- **Contrato real:** `parametros` por método, `datos` por método, códigos `resultado`, envelope,
  cifrado/descifrado publicado, ejemplos contractuales. Esto NO se toca al "mejorar presentación".
- **Presentación:** cómo se agrupan tags (`x-tagGroups`), si el canal validador se muestra como anexo
  HTML o como secciones/paths documentales, orden y claridad visual. Esto **sí** se puede mejorar,
  siempre que no cambie el contrato.
- **Mantenimiento:** cómo se genera el JSON, cómo se reutilizan bloques y cómo se evita edición manual.
  Esto sí puede cambiar, siempre que la salida preserve el contrato.

---

## Referencias

| Doc | Contenido |
|-----|-----------|
| `01-transversal-autopista.md` | Envelope, endpoint único, cifrado (resumen) |
| `02/03/04` | Detalle funcional por API |
| `06-hallazgo-api_4-json-invalido.md` | Arreglo JSON api_4 |
| `09-generador-openapi.md` | Diseño/factibilidad del generador |
