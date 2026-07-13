# produccion_real — estudio del código real de producción

Carpeta de estudio del **código de producción tal cual** (rama `main` de cada repo), clonado en el workspace bajo `produccion_real/`. Sirve para entender **qué hace producción hoy** sin acceder al ambiente real de producción.

**Regla:** `produccion_real/` es fotografía de solo lectura. No se modifica; solo se estudia y se documenta aquí.

## Docs

| Doc | Contenido |
|-----|-----------|
| [`01-tld-matriz-validador-validar.md`](01-tld-matriz-validador-validar.md) | Revisión de `tld-matriz/lambdas/tld-validador-validar`. Confirma HTTP siempre 200; mapa de codigoError; bugs (`error()`/`validatePlan()` indefinidas, crash X-Forwarded-For, `isValid` sin chequeo de tipo); anomalía abierta idCanal null/"" → 550. |

## Relación con otras carpetas

- `prod_adactado_a_dev/` = **misma** base de código de producción, adaptada mínimamente para desplegar en dev (es lo que generó los datos Newman). Verificado: `tld-validador-validar` es idéntico entre `produccion_real` y `prod_adactado_a_dev`.
- Estudio de datos Newman: [`../Postman/comparar-prod-vs-dev/`](../Postman/comparar-prod-vs-dev/).
