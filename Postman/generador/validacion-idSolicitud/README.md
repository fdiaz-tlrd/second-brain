# Validación `idSolicitud` — registro de iteraciones

Documentación viva del trabajo en escenarios Postman y alineación de código en **P2P** (`tld-api-alias`), **P2M** (`tld-api-p2m`) y **VCN** (`tld-api-cuenta-nombre`).

**Carpeta de escenarios:** `../{P2P|P2M|VCN} Escenarios error/General/1_validaciones_js/5_solicitudes/`

---

## Iteraciones

| # | Fecha | Documento | Qué se hizo |
|---|-------|-----------|-------------|
| 01 | 2026-07-11 | [ITERACION-01-escenarios-error-regex.md](./ITERACION-01-escenarios-error-regex.md) | Escenarios 5.10–5.26 (error 431), regex con al menos un alfanumérico, alineación código tres APIs |

---

## Regla de formato acordada

`idSolicitud` debe cumplir:

- Tipo `string`
- Longitud **1–64**
- Solo caracteres **A–Z, a–z, 0–9** y **guiones `-`**
- **Al menos un carácter alfanumérico** (no solo guiones: `---`, `-` → **431**)
- Sin `.trim()`: espacios al inicio/fin cuentan y rechazan
- Duplicados case-insensitive → **431**

Regex en código: `/^(?=.*[A-Za-z0-9])[A-Za-z0-9-]{1,64}$/`

Código cliente: **431** — `"Campo idSolicitud no cumple con los criterios"`.

---

## Escenarios de éxito (pendiente)

Los **límites válidos** no van en `5_solicitudes` (error). Se documentan aquí para una carpeta futura de éxito:

| Caso | Valor ejemplo | Motivo |
|------|---------------|--------|
| Longitud mínima | `a` | 1 carácter alfanumérico |
| Longitud máxima | 64× `A` | borde superior |
| Guion interno | `abc-123` | guion permitido mezclado |
| Solo alfanumérico | `id001` | sin guiones |

Ver detalle en [ITERACION-01](./ITERACION-01-escenarios-error-regex.md#escenarios-de-éxito-pendientes).

---

## Referencia código

| API | Repo | Función |
|-----|------|---------|
| P2P | `tld-api-alias` | `lambdas/alias/lib/validaciones.js` → `validarParametroSolicitudes` |
| P2M | `tld-api-p2m` | `lambdas/p2m/lib/validaciones.js` |
| VCN | `tld-api-cuenta-nombre` | `lambdas/cuenta-nombre/lib/validaciones.js` |

Commit origen P2P: `5f1eb0461c44197a8053dd5ab96ce8d3e8301987` (regex + hasOwnProperty seguro).

---

## Regenerar colecciones

```powershell
cd second-brain\Postman\generador\ensamblador
node generar-escenarios-idSolicitud-5.10.js
node armar-coleccion.js config-p2p.json
node armar-coleccion.js config.json
node armar-coleccion.js config-vcn.json
```
