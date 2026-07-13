# produccion_real / tld-api-r2p — clon del código real de producción

**Qué es:** clon del repositorio productivo de `tld-api-r2p` (producto **R2P**) en la rama `main`, dentro del workspace bajo `produccion_real/tld-api-r2p/`. Es la **fotografía del código que corre hoy en producción**, para estudio/referencia.

**Regla (conducta):** `produccion_real/` es de **solo lectura**. NUNCA modificar, parchear ni copiar "como prod". Solo se estudia y se documenta aquí.

## Datos del clon

| Campo | Valor |
|-------|-------|
| Fecha de clon | 2026-07-13 |
| Origen | `https://github.com/Telered-Autopista/tld-api-r2p.git` |
| Rama | `main` |
| HEAD | `4a1499e` — *Merge pull request #36 from Telered-Autopista/Hotfix/CCL-8187_Actualizacion_NodeJS24* |
| Fecha del commit | 2026-05-27 08:59 -0500 |
| Ruta local | `produccion_real/tld-api-r2p/` |

Comando usado:

```bash
git -C produccion_real clone --branch main https://github.com/Telered-Autopista/tld-api-r2p.git tld-api-r2p
```

## Estructura (raíz)

- `lambdas/` — `r2p/`, `layer/`
- `package.json`
- `template.yaml`
- `samconfig.toml`
- `.gitignore`, `README.md`

## Para qué sirve

Baseline real de producción del producto **R2P**, uno de los cuatro repos de producto TLD (según el mapa de conducta: VCN=`tld-api-cuenta-nombre`, P2P=`tld-api-alias`, R2P=`tld-api-r2p`, P2M=`tld-api-p2m`). Sirve como referencia de "qué hace R2P en prod hoy" sin acceso al ambiente real.

> **Aislamiento de repos (conducta):** los repos de producto NUNCA se ven entre sí (sin submodule, npm compartido ni import entre repos). Este clon es solo estudio; no se enlaza a código de otros productos.

## Relación con otras carpetas

- [`README.md`](README.md) — índice de la carpeta `produccion_real` y regla de solo-lectura.
- [`02-tld-validador-api-clon.md`](02-tld-validador-api-clon.md) — clon del orquestador `tld-validador-api`.
