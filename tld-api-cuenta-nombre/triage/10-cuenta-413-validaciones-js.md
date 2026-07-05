# Triage #10 — Metodo/0001/1_validaciones_js/1_cuenta (413)

**Estado:** **escenarios listos** — Newman **pendiente** (usuario, VPN).

## Qué valida

Formato de `parametros.cuenta` **antes** del validador-proxy (`validaFormatCta` en `app.js`):

- Solo dígitos (`/^[0-9]+$/`)
- Longitud **1–34** (`LIM_MIN` / `LIM_MAX`)

Respuesta: HTTP **200**, `respuestas[0].resultado` = **413**, `datos: null`, `expectedTipo: "parametro"`.

## Escenarios (20)

| # | Caso |
|---|------|
| 1.1–1.10 | Base (ausente, null, vacío, tipos, letras, espacios, longitud 35) |
| 1.11 | solo tab |
| 1.12 | símbolo @ |
| 1.13 | paréntesis |
| 1.14 | unicode ¿ |
| 1.15 | comillas |
| 1.16 | guión |
| 1.17 | decimal |
| 1.18 | tipo array |
| 1.19 | espacio al inicio |
| 1.20 | espacio al final |

**Generador:** `Postman/generador/ensamblador/generar-escenarios-0001-cuenta-413.js`

```powershell
cd Postman/generador/ensamblador
node generar-escenarios-0001-cuenta-413.js
node armar-coleccion.js config-vcn.json
```

**Newman:**

```powershell
node run-newman.js vcn --folder "Metodo/0001/1_validaciones_js/1_cuenta"
```

## Acción

| ID | Acción | Estado |
|----|--------|--------|
| A10a | Ampliar 413 a 20 escenarios + generador | **Hecho** (commit pendiente) |
| A10b | Newman `1_cuenta` + regresión VCN completo | **Pendiente** — VPN |
| A10c | Checklist + baseline tests | **Pendiente** tras Newman |

## Regresión previa

Los 10 escenarios originales pasaban en VCN **1008/1008** (2026-07-05T23:19Z). Los 10 nuevos no están verificados en Newman aún.
