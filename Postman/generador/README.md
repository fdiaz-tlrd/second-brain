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

## Convención de escenarios

```
General/<grupo>/<campo>/<N.N>_<campo>_<condicion>.json
Metodo/<metodo>/<grupo>/<campo>/<N.N>_<campo>_<condicion>.json
```

Cada JSON es un escenario; el ensamblador los combina en una colección Postman v2.1.
