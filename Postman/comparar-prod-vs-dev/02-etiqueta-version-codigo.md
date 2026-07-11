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
