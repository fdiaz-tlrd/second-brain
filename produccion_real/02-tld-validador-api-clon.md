# produccion_real / tld-validador-api — clon del código real de producción

**Qué es:** clon del repositorio productivo de `tld-validador-api` en la rama `main`, dentro del workspace bajo `produccion_real/tld-validador-api/`. Es la **fotografía del código que corre hoy en producción**, para estudio/referencia.

**Regla (conducta):** `produccion_real/` es de **solo lectura**. NUNCA modificar, parchear ni copiar "como prod". Solo se estudia y se documenta aquí.

## Datos del clon

| Campo | Valor |
|-------|-------|
| Fecha de clon | 2026-07-13 |
| Origen | `https://github.com/Telered-Autopista/tld-validador-api.git` |
| Rama | `main` |
| HEAD | `18b2ebb` — *Merge pull request #69 from Telered-Autopista/Hotfix/CCL-8187_Actualizacion_NodeJS24* |
| Fecha del commit | 2026-05-27 09:02 -0500 |
| Ruta local | `produccion_real/tld-validador-api/` |

Comando usado:

```bash
git -C produccion_real clone --branch main https://github.com/Telered-Autopista/tld-validador-api.git tld-validador-api
```

## Estructura (lambdas)

- `lambdas/iniciar/`
- `lambdas/validar/` — `app.js`, `lib/`, `package.json`
- `lambdas/layer/`

## Para qué sirve — y qué NO es

Existen tres copias de `tld-validador-api` en el workspace, con propósitos distintos:

| Copia | Qué es | Se modifica |
|-------|--------|-------------|
| `produccion_real/tld-validador-api/` | **Este clon.** Código real de prod, rama `main`. Baseline de "qué hace prod hoy". | **No** (solo lectura) |
| `prod_adactado_a_dev/tld-validador-api/` | Mismo código de prod, adaptado mínimamente para desplegar en dev. Generó los datos Newman prod-vs-dev. | Solo adaptaciones de despliegue |
| `tld-validador-api/` (raíz workspace) | Repo de trabajo/desarrollo donde se aplican los fixes (HP-012/013/014, HD-007, etc.). | **Sí** — es el repo activo |

Sirve para **comparar** el comportamiento corregido en dev contra lo que realmente hace producción, sin acceso al ambiente prod.

## Relación con otras carpetas

- [`01-tld-matriz-validador-validar.md`](01-tld-matriz-validador-validar.md) — estudio de `tld-matriz/lambdas/tld-validador-validar` (el que invoca a este validador).
- [`../tld-validador-api/`](../tld-validador-api/) — correcciones y estudio del repo **de trabajo** (dev), incluyendo `correccion-validar-hallazgos-2026-07-13.md` y `http-code-cadena-cumplimiento-2026-07-13.md`.
- [`../hallazgos-produccion/`](../hallazgos-produccion/) — fichas HP-*, hallazgos accionables.
