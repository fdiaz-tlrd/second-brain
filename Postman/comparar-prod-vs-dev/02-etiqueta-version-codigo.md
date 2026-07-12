# 02 — Etiqueta de versión de código

Objetivo: que cada run quede marcado con **qué versión de código estaba desplegada** (prod / dev / lo que sea) y que ese dato aparezca en el informe.

---

## Decisión (recomendación como experto Newman)

Ofrecer **las dos** vías que mencionaste, con prioridad clara:

1. **Flag de línea de comando** (principal): `--codigo-fuente <etiqueta>`
2. **Variable de entorno** (respaldo): `NEWMAN_CODIGO_FUENTE=<etiqueta>`

**Precedencia:** el flag gana sobre la variable de entorno. Si no hay ninguno, se registra `desconocido` y se **imprime una advertencia** (para que nadie compare sin saber qué corrió).

### Por qué las dos

| Vía | Cuándo conviene |
|-----|-----------------|
| `--codigo-fuente prod` | Runs puntuales; queda en el historial de la shell; explícito por ejecución. |
| `NEWMAN_CODIGO_FUENTE=prod` | Muchos runs seguidos tras un mismo deploy: se fija una vez en la sesión y todos los runs quedan etiquetados igual, sin repetir el flag. |

### Valores

- Convención simple: `prod` | `dev`.
- Se permite texto libre para casos como `prod@<commit>` o `dev-ARQ-225`. El script no valida contra una lista cerrada; solo exige que no esté vacío (si lo está → `desconocido` + advertencia).

### Relación con `--nota`

`--nota` ya existe y seguirá siendo **texto libre** (ej. "post-deploy c47a264, timeout 28s"). `--codigo-fuente` es el **campo estructurado** para filtrar/comparar. No se pisan: la nota da contexto, el código fuente es la etiqueta comparable.

---

## Ejemplos de uso (máquina con VPN)

```powershell
# Tras desplegar la versión PRODUCTIVA en AWS dev
node run-newman.js vcn --codigo-fuente prod --nota "prod tld-validador-api-main"

# Tras desplegar la versión EN DESARROLLO en AWS dev
node run-newman.js vcn --codigo-fuente dev --nota "feature/ARQ-225 comoAxiosData"
```

O fijando la variable una vez en la sesión:

```powershell
$env:NEWMAN_CODIGO_FUENTE = "prod"
node run-newman.js vcn
node run-newman.js vcn --folder "Metodo/0001/5_fallosIntegracionValidador"
```

---

## Dónde aparece la etiqueta

| Salida | Cómo |
|--------|------|
| `resultados-por-escenario-<suite>.json` | Campo `codigoFuente` |
| `resultados-por-escenario-<suite>.md` | Fila en el encabezado |
| `resumen-fallos-<suite>.md` | Fila nueva "Código fuente" en la tabla de cabecera |
| `registro-<suite>.md` | Columna nueva **Código** |
| `historial/<suite>/` | Sufijo en el nombre de archivo: `{timestamp}_{codigo}_{carpeta}.json/.md` |

Con esto, al abrir cualquier informe se ve de inmediato si esa corrida fue con código **prod** o **dev**.

---

## Nivel de ejecución (`NIVEL_EJECUCION`)

**Ortogonal a `--codigo-fuente`.** Indica **desde qué capa** se invoca el flujo en Postman (p. ej. `VCN` = directo a la API cuenta-nombre; `MATRIZ` = vía API matriz).

| Concepto | Qué etiqueta | Dónde se fija |
|----------|--------------|---------------|
| Versión de código desplegada | `--codigo-fuente prod\|dev` | Línea de comando / `NEWMAN_CODIGO_FUENTE` |
| Ruta de integración | `NIVEL_EJECUCION` en el environment Postman | `generador/entornos/*-desarrollo.postman_environment.json` |

`run-newman.js` **lee `NIVEL_EJECUCION` del archivo de entorno** que usa Newman (no hace falta otro flag). Así el informe refleja exactamente lo que corrió.

### Dónde aparece `nivelEjecucion`

| Salida | Cómo |
|--------|------|
| `resultados-por-escenario-<suite>.json` | Campo `nivelEjecucion` |
| `resultados-por-escenario-<suite>.md` | Fila «Nivel ejecución» en cabecera |
| `resumen-fallos-<suite>.md` | Fila «Nivel ejecución» |
| `registro-<suite>.md` | Columna **Nivel** |
| `historial/<suite>/` | Sufijo en nombre: `{timestamp}_{codigo}_{nivel}_{carpeta}.json` |
| `comparar-runs.js` | Tabla de cabecera al comparar dos JSON |

### VCN prod-a-dev (jul-2026)

Con `prod_adactado_a_dev` desplegado en dev, el environment VCN quedó en **`NIVEL_EJECUCION=MATRIZ`** para ejercitar el camino productivo vía matriz (autorizador stubbeado en prod-a-dev).

Ejemplo de run para recopilación:

```powershell
node run-newman.js vcn --codigo-fuente prod --nota "prod-a-dev rama prod-a-dev"
```

El informe mostrará `codigoFuente: prod` y `nivelEjecucion: MATRIZ`.
