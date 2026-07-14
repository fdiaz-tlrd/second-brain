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
| `registro-<suite>.md` | **Historial de las últimas 8 ejecuciones** (tabla, con columna Código) |
| `historial/<suite>/` | Copia archivada por run (`{timestamp}_{codigo}_{carpeta}.json/.md` + `_por-escenario.*`) |
| `comparacion-<suite>-<A>-vs-<B>.md` | Salida de `comparar-runs.js` (diferencias candidatas prod vs dev) |

`<suite>` = `p2m` | `p2p` | `vcn`

---

## Comando (máquina con VPN)

Desde `Postman/generador`:

```powershell
node run-newman.js vcn
node run-newman.js vcn --folder "General/0_jsonEntrada" --nota "post-deploy c47a264"
```

Opcional `--nota "..."` queda en resumen y registro (deploy, commit código, etc.).

---

## Commit después de cada run (máquina VPN)

```powershell
git add logs/
git commit -m "Newman VCN — run completo 1008/1008"
git push
```

Incluir **siempre** `ultimo-run-*`, `resumen-fallos-*`, `registro-*` y `historial/`.

En Lenovo: `git pull` y avisar al agente «puse los logs».

---

## Agente: qué leer

1. `registro-vcn.md` — últimas ejecuciones verificadas
2. `resumen-fallos-vcn.md` — detalle del último run
3. `historial/vcn/` — runs anteriores si hace falta comparar

Si `registro-vcn.md` tiene fila nueva con **OK**, el run **ocurrió** aunque el agente no lo haya corrido.
