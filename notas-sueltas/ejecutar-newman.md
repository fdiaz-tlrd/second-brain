# Ejecutar Newman — run actual

**Fecha:** 2026-07-13  
**Objetivo:** revisión **P2P en producción** (`codigoError` en payload JSON), mismo método que VCN doc 12.

## Antes del run

1. Desplegar **`tld-api-alias`** rama **`prod-a-dev`** (`4bc331d`) en dev. Ver [`../prod_adactado_a_dev/06-tld-api-alias.md`](../prod_adactado_a_dev/06-tld-api-alias.md).
2. Confirmar en CloudFormation la marca **`PROD-ADAPTADO-A-DEV`** en la pila `tld-alias-api`.
3. En la máquina VPN, `git pull` en `second-brain` (este archivo + entorno con `NIVEL_EJECUCION=MATRIZ`).
4. Colección P2P ensamblada al día (`Postman/generador/ensamblador/salida/`).

## Entorno Postman

| Variable | Valor | Notas |
|----------|-------|-------|
| `NIVEL_EJECUCION` | **`MATRIZ`** | Requests van a `END_POINT_TLD_MATRIZ` (matriz → alias prod en dev) |
| `END_POINT_TLD_MATRIZ` | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` | Sin cambio |
| `END_POINT_TLD_P2P` | `https://tld-api-alias.dev.telered.internal/procesar` | No se usa con `MATRIZ` |

Archivo: `Postman/generador/entornos/P2P Escenarios error - desarrollo.postman_environment.json`

## Comando (copiar en PowerShell, desde `Postman/generador`)

```powershell
node run-newman.js p2p --codigo-fuente prod --nota "MATRIZ P2P prod-a-dev alias revision codigoError"
```

| Flag | Valor | Significado |
|------|-------|-------------|
| Suite | `p2p` | Colección P2P Escenarios error |
| `--codigo-fuente` | `prod` | Código de producción desplegado en dev (`prod-a-dev`) |
| `--nota` | ver comando | Aparece en `ultimo-run-*`, `registro-p2p.md`, historial |

**Qué comparar después:** `codigoError` / `resultado` dentro del JSON descifrado — **no** HTTP Code (matriz siempre 200; HD-005).

## Después del run

Commit + push **`Postman/generador/logs/`** completo. Revisión escenario a escenario: [`Postman/comparar-prod-vs-dev/13-revision-codigos-respuesta-p2p.md`](../Postman/comparar-prod-vs-dev/13-revision-codigos-respuesta-p2p.md) (**cerrada** jul-2026).
