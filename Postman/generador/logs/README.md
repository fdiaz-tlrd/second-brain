# Logs de ejecución Newman

Salida de `run-newman.js`. **Commitear y pushear** tras cada run en la máquina donde ejecutas las pruebas (VPN/red dev). El agente los lee en la otra máquina vía git.

**Máquina Lenovo (`c:\Users\Lenovo\GitHub`): sin VPN ni red dev.** El agente **no** ejecuta Newman ni llama al dummy desde ahí. Solo el usuario, en la máquina con acceso.

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
