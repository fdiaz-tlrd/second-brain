# Logs de ejecución Newman

## Dos máquinas — flujo obligatorio

| Máquina | Rol |
|---------|-----|
| **Lenovo** (`c:\Users\Lenovo\GitHub`) | Agente: código, escenarios, `armar-coleccion.js`, docs. **Sin VPN. No Newman.** |
| **Otra máquina (VPN)** | Usuario: `node run-newman.js …`, luego **commit + push de `logs/`** |

El agente **no ejecuta Newman** en Lenovo. Cuando el usuario dice «ya corrí Newman», el agente lee **`registro-<suite>.md`** y los archivos en git tras `git pull` — **no** infiere «no se ejecutó» por fecha vieja si el usuario acaba de pushear.

**Prohibido para el agente:** `git restore logs/`, excluir logs del commit, o borrar runs del usuario para «limpiar» fallos de red locales en Lenovo.

---

## Archivos

| Archivo | Contenido |
|---------|-----------|
| `ultimo-run-<suite>.json` | Último reporte Newman (completo) |
| `resumen-fallos-<suite>.md` | Último resumen legible (solo fallos) |
| `resultados-por-escenario-<suite>.json` | Última corrida, **una fila por escenario** (todos), con cuerpo completo, etiqueta `codigoFuente` (prod/dev) y (desde 2026-07-14) `respuestaVinoCifrada` / `formatoRespuestaLambda` / `payloadCambioTrasDescifrar` + **presentación cliente** (`presentacionForma` A\|B\|C, código, descripción, `presentacionPatternKey`, …) |
| `resultados-por-escenario-<suite>.md` | Igual, en tabla legible (columnas Formato / Cifrada?) |
| `registro-<suite>.md` | Tabla de hasta **8** corridas. **Se reconstruye** desde `historial/<suite>/` tras cada run (sin filas huérfanas ni columnas incompletas) |
| `historial/<suite>/` | Copia archivada por run (`{timestamp}_{codigo}_{nivel}_{carpeta}.json/.md` + `_por-escenario.*`). Al superar 8 runs se borran los más viejos **y** el registro se regenera |
| `ultima-corrida-<suite>.md` | Ficha de la **última** corrida (fecha, código fuente, foto). El agente la lee antes de marcar pendientes en `00-estado-y-retomo.md` |
| `comparacion-<suite>-<A>-vs-<B>.md` | Salida de `comparar-runs.js` (diferencias candidatas prod vs dev) |

`<suite>` = `p2m` | `p2p` | `vcn`

---

## Comando (máquina con VPN)

Desde `Postman/generador`:

```powershell
node run-newman.js vcn --codigo-fuente prod
node run-newman.js vcn --folder "General/0_jsonEntrada" --codigo-fuente dev --nota "post-deploy c47a264"
```

`--codigo-fuente prod|dev` es **obligatorio** (también `NEWMAN_CODIGO_FUENTE`). Sin eso el proceso termina con error: no hay foto ni registro comparable.

Opcional `--nota "..."` queda en resumen y registro (deploy, commit código, etc.).

Al terminar, Newman **debe** generar `codigosRespuesta/foto-presentacion-<suite>-<prod|dev>.{md,muestras.md,patrones.json}`; si falla la foto, el run aborta (ya no se ignora con un warning).

---

## Commit después de cada run (máquina VPN)

Incluir **todo** lo que Newman acaba de tocar (logs **y** fotos fuera de `logs/`):

```powershell
git add logs/
git add ../../codigosRespuesta/foto-presentacion-*
git status
git commit -m "Newman VCN — run completo …"
git push
```

En `logs/` debe verse (si aplica a la suite): `ultimo-run-*`, `resumen-fallos-*`, `resultados-por-escenario-*`, `registro-*`, `ultima-corrida-*`, `historial/<suite>/…` y, si corriste `comparar-runs.js`, `comparacion-*`.

**Cuidado con `.gitignore`:** la carpeta usa `*` + excepciones `!`. Si Newman genera un archivo nuevo bajo `logs/` y no hay `!` para él, `git add logs/` **no** lo sube → Lenovo no lo tiene. Antes de tocar `.gitignore`, leer el comentario al inicio de ese archivo.

En Lenovo: `git pull` y avisar al agente «puse los logs».

---

## Agente: qué leer

1. `ultima-corrida-vcn.md` (o p2p/p2m) — **última** corrida real (código fuente, foto)
2. `registro-vcn.md` — últimas ejecuciones verificadas (siempre alineado con archivos en `historial/`)
3. `resumen-fallos-vcn.md` — detalle del último run
4. `historial/vcn/` — runs anteriores si hace falta comparar

Si `ultima-corrida-*.md` / `registro-*.md` tiene fila nueva con run `dev` o `prod`, el run **ocurrió**. No marcar ese ítem como pendiente en `00-estado-y-retomo.md` sin leer esos archivos.
