# Generador de colecciones Postman

Copia de `refactoria\Postman`. Fuente de verdad para mantener escenarios en archivos separados y generar colecciones importables en Postman.

## Estructura

| Carpeta / archivo | Rol |
|-------------------|-----|
| `ensamblador/` | Scripts Node.js: `armar-coleccion.js`, generadores por método, configs y `salida/` |
| `P2M Escenarios error/` | Escenarios fuente P2M |
| `P2M Escenarios error especiales/` | Escenarios especiales P2M |
| `P2P Escenarios error/` | Escenarios fuente P2P |
| `entornos/` | Environments Postman |

## Uso

Desde `ensamblador/`:

```bash
node armar-coleccion.js
node armar-coleccion.js config-p2p.json
```

La salida queda en `ensamblador/salida/*.postman_collection.json`.

## Ejecutar y compartir fallos (Newman)

Desde `Postman/generador` (requiere red hacia dummy/API dev):

```powershell
$env:NODE_OPTIONS="--use-system-ca"   # si npm install falla por certificado corporativo
npm install
node run-newman.js p2m
node run-newman.js p2p --folder "General/2_reglaNegocio/1_idCanal"
node run-newman.js vcn
node run-newman.js all
```

Comparte con el agente: `logs/resumen-fallos-<suite>.md` (referencia `@Postman/generador/logs/resumen-fallos-p2m.md`).

Genera en `logs/`:

| Archivo | Para qué |
|---------|----------|
| `resumen-fallos-<suite>.md` | Pegar o referenciar en el chat con el agente |
| `ultimo-run-<suite>.json` | Detalle completo Newman |

`<suite>` = `p2m` | `p2p` | `vcn`

## Convención de escenarios

```
General/<grupo>/<campo>/<N.N>_<campo>_<condicion>.json
Metodo/<metodo>/<grupo>/<campo>/<N.N>_<campo>_<condicion>.json
```

Cada JSON es un escenario; el ensamblador los combina en una colección Postman v2.1.

## Estudio de referencia

[`estudio-generador.md`](estudio-generador.md) — documentación completa del generador (estructura, flujo, escenarios, scripts, validación). Consultar ahí antes de revisar todos los archivos fuente.
