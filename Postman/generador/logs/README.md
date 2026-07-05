# Logs de ejecución Newman

Salida de `run-newman.js`. **Commitear y pushear** tras cada run en la máquina donde ejecutas las pruebas (VPN/red dev). El agente los lee en la otra máquina vía git.

| Archivo | Contenido |
|---------|-----------|
| `ultimo-run-<suite>.json` | Reporte Newman completo |
| `resumen-fallos-<suite>.md` | Solo fallos — referencia para el agente |

`<suite>` = `p2m` | `p2p` | `vcn`

Flujo:

```powershell
node run-newman.js vcn --folder "General"
git add logs/resumen-fallos-vcn.md logs/ultimo-run-vcn.json
git commit -m "VCN run General — resultados Newman"
git push
```
