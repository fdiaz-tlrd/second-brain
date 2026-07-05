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

Requiere red hacia dummy/API dev. Desde `Postman/generador`. Copia **una sola línea** (los `#` son comentarios; PowerShell los ignora).

**`--folder` con ruta (`General/.../1_idCanal`):** las colecciones ensambladas no tienen ids estables; el runner **extrae esa subcarpeta** del JSON y ejecuta solo esa subcolección. Sin ruta completa, nombres duplicados (p. ej. dos `1_idCanal` en General) ejecutarían **ambas**.

```powershell
# Primera vez
npm install

# P2M + P2P + VCN seguidas
node run-newman.js all

# P2M
node run-newman.js p2m
# General
node run-newman.js p2m --folder "General"
node run-newman.js p2m --folder "General/1_validaciones_js"
node run-newman.js p2m --folder "General/1_validaciones_js/1_idCanal"
node run-newman.js p2m --folder "General/1_validaciones_js/2_validador"
node run-newman.js p2m --folder "General/1_validaciones_js/3_peticion"
node run-newman.js p2m --folder "General/1_validaciones_js/4_idPeticion"
node run-newman.js p2m --folder "General/1_validaciones_js/5_solicitudes"
node run-newman.js p2m --folder "General/2_reglaNegocio"
node run-newman.js p2m --folder "General/2_reglaNegocio/1_idCanal"
node run-newman.js p2m --folder "General/2_reglaNegocio/3_peticion"
node run-newman.js p2m --folder "General/2_reglaNegocio/4_metodo"
node run-newman.js p2m --folder "Metodo"
# Metodo 0015
node run-newman.js p2m --folder "Metodo/0015"
node run-newman.js p2m --folder "Metodo/0015/1_validaciones_js"
node run-newman.js p2m --folder "Metodo/0015/1_validaciones_js/1_identificador"
node run-newman.js p2m --folder "Metodo/0015/1_validaciones_js/2_tipoIdentificador"
# Metodo 0016
node run-newman.js p2m --folder "Metodo/0016"
node run-newman.js p2m --folder "Metodo/0016/1_validaciones_js"
node run-newman.js p2m --folder "Metodo/0016/1_validaciones_js/1_identificador"
node run-newman.js p2m --folder "Metodo/0016/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2m --folder "Metodo/0016/1_validaciones_js/3_banco"
node run-newman.js p2m --folder "Metodo/0016/1_validaciones_js/4_cuenta"
node run-newman.js p2m --folder "Metodo/0016/1_validaciones_js/5_producto"
node run-newman.js p2m --folder "Metodo/0016/1_validaciones_js/6_nombreComercio"
node run-newman.js p2m --folder "Metodo/0016/1_validaciones_js/7_correo"
node run-newman.js p2m --folder "Metodo/0016/1_validaciones_js/8_mcc"
node run-newman.js p2m --folder "Metodo/0016/1_validaciones_js/9_logo"
# Metodo 0017
node run-newman.js p2m --folder "Metodo/0017"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js/1_identificador"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js/3_busquedaCantidad"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js/4_mcc"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js/5_busquedaIdentificadorComercio"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js/6_busquedaNombreComercio"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js/7_busquedaPaginaToken"
# Metodo 0018
node run-newman.js p2m --folder "Metodo/0018"
node run-newman.js p2m --folder "Metodo/0018/1_validaciones_js"
node run-newman.js p2m --folder "Metodo/0018/1_validaciones_js/1_identificador"
node run-newman.js p2m --folder "Metodo/0018/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2m --folder "Metodo/0018/1_validaciones_js/3_identificadorComercio"
node run-newman.js p2m --folder "Metodo/0018/1_validaciones_js/4_montoBase"
node run-newman.js p2m --folder "Metodo/0018/1_validaciones_js/5_impuesto"
node run-newman.js p2m --folder "Metodo/0018/1_validaciones_js/6_propina"
node run-newman.js p2m --folder "Metodo/0018/1_validaciones_js/7_monto"
node run-newman.js p2m --folder "Metodo/0018/1_validaciones_js/8_descripcion"
# Metodo 0019
node run-newman.js p2m --folder "Metodo/0019"
node run-newman.js p2m --folder "Metodo/0019/1_validaciones_js"
node run-newman.js p2m --folder "Metodo/0019/1_validaciones_js/1_identificador"
node run-newman.js p2m --folder "Metodo/0019/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2m --folder "Metodo/0019/1_validaciones_js/3_p2mPagoId"
node run-newman.js p2m --folder "Metodo/0019/1_validaciones_js/4_estadoCargo"
# Metodo 0021
node run-newman.js p2m --folder "Metodo/0021"
node run-newman.js p2m --folder "Metodo/0021/1_validaciones_js"
node run-newman.js p2m --folder "Metodo/0021/1_validaciones_js/1_identificador"
node run-newman.js p2m --folder "Metodo/0021/1_validaciones_js/10_estado"
node run-newman.js p2m --folder "Metodo/0021/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2m --folder "Metodo/0021/1_validaciones_js/3_banco"
node run-newman.js p2m --folder "Metodo/0021/1_validaciones_js/4_cuenta"
node run-newman.js p2m --folder "Metodo/0021/1_validaciones_js/5_producto"
node run-newman.js p2m --folder "Metodo/0021/1_validaciones_js/6_nombreComercio"
node run-newman.js p2m --folder "Metodo/0021/1_validaciones_js/7_correo"
node run-newman.js p2m --folder "Metodo/0021/1_validaciones_js/8_mcc"
node run-newman.js p2m --folder "Metodo/0021/1_validaciones_js/9_logo"
# Metodo 0024
node run-newman.js p2m --folder "Metodo/0024"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/1_identificador"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/10_ciudadComercio"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/11_montoBase"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/12_impuesto"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/13_propina"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/14_monto"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/15_descripcion"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/3_banco"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/4_moneda"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/5_qrTipo"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/6_canalPago"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/7_tipo"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/8_fechaVencimiento"
node run-newman.js p2m --folder "Metodo/0024/1_validaciones_js/9_cantidadLecturas"
# Metodo 0025
node run-newman.js p2m --folder "Metodo/0025"
node run-newman.js p2m --folder "Metodo/0025/1_validaciones_js"
node run-newman.js p2m --folder "Metodo/0025/1_validaciones_js/1_identificador"
node run-newman.js p2m --folder "Metodo/0025/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2m --folder "Metodo/0025/1_validaciones_js/3_qrCode"

# P2P
node run-newman.js p2p
# General
node run-newman.js p2p --folder "General"
node run-newman.js p2p --folder "General/1_validaciones_js"
node run-newman.js p2p --folder "General/1_validaciones_js/1_idCanal"
node run-newman.js p2p --folder "General/1_validaciones_js/2_validador"
node run-newman.js p2p --folder "General/1_validaciones_js/3_peticion"
node run-newman.js p2p --folder "General/1_validaciones_js/4_idPeticion"
node run-newman.js p2p --folder "General/1_validaciones_js/5_solicitudes"
node run-newman.js p2p --folder "General/2_reglaNegocio"
node run-newman.js p2p --folder "General/2_reglaNegocio/1_idCanal"
node run-newman.js p2p --folder "General/2_reglaNegocio/3_peticion"
node run-newman.js p2p --folder "General/2_reglaNegocio/4_metodo"
node run-newman.js p2p --folder "Metodo"
# Metodo 0002
node run-newman.js p2p --folder "Metodo/0002"
node run-newman.js p2p --folder "Metodo/0002/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0002/1_validaciones_js/1_tipoIdentificador"
node run-newman.js p2p --folder "Metodo/0002/1_validaciones_js/2_identificador"
# Metodo 0003
node run-newman.js p2p --folder "Metodo/0003"
node run-newman.js p2p --folder "Metodo/0003/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0003/1_validaciones_js/1_identificador"
node run-newman.js p2p --folder "Metodo/0003/1_validaciones_js/2_tipoIdentificador"
# Metodo 0004
node run-newman.js p2p --folder "Metodo/0004"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/1_identificador"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/3_idPregunta"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/4_respuesta"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/5_banco"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/6_cuenta"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/7_producto"
# Metodo 0005
node run-newman.js p2p --folder "Metodo/0005"
node run-newman.js p2p --folder "Metodo/0005/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0005/1_validaciones_js/1_banco"
# Metodo 0006
node run-newman.js p2p --folder "Metodo/0006"
node run-newman.js p2p --folder "Metodo/0006/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0006/1_validaciones_js/1_identificador"
node run-newman.js p2p --folder "Metodo/0006/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2p --folder "Metodo/0006/1_validaciones_js/3_respuestas"
node run-newman.js p2p --folder "Metodo/0006/1_validaciones_js/4_banco"
node run-newman.js p2p --folder "Metodo/0006/1_validaciones_js/5_cuenta"
node run-newman.js p2p --folder "Metodo/0006/1_validaciones_js/6_producto"
# Metodo 0007
node run-newman.js p2p --folder "Metodo/0007"
node run-newman.js p2p --folder "Metodo/0007/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0007/1_validaciones_js/1_identificador"
node run-newman.js p2p --folder "Metodo/0007/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2p --folder "Metodo/0007/1_validaciones_js/3_banco"
node run-newman.js p2p --folder "Metodo/0007/1_validaciones_js/4_tipoBaja"
# Metodo 0008
node run-newman.js p2p --folder "Metodo/0008"
node run-newman.js p2p --folder "Metodo/0008/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0008/1_validaciones_js/1_id"
node run-newman.js p2p --folder "Metodo/0008/1_validaciones_js/2_identificador"
node run-newman.js p2p --folder "Metodo/0008/1_validaciones_js/3_tipoIdentificador"
node run-newman.js p2p --folder "Metodo/0008/1_validaciones_js/4_banco"
node run-newman.js p2p --folder "Metodo/0008/1_validaciones_js/5_cuenta"
node run-newman.js p2p --folder "Metodo/0008/1_validaciones_js/6_producto"
# Metodo 0009
node run-newman.js p2p --folder "Metodo/0009"
node run-newman.js p2p --folder "Metodo/0009/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0009/1_validaciones_js/1_identificador"
node run-newman.js p2p --folder "Metodo/0009/1_validaciones_js/2_tipoIdentificador"
# Metodo 0022
node run-newman.js p2p --folder "Metodo/0022"
node run-newman.js p2p --folder "Metodo/0022/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0022/1_validaciones_js/1_identificador"
node run-newman.js p2p --folder "Metodo/0022/1_validaciones_js/2_nombreAcreedor"
node run-newman.js p2p --folder "Metodo/0022/1_validaciones_js/3_bancoAcreedor"
node run-newman.js p2p --folder "Metodo/0022/1_validaciones_js/4_moneda"
node run-newman.js p2p --folder "Metodo/0022/1_validaciones_js/5_qrTipo"
node run-newman.js p2p --folder "Metodo/0022/1_validaciones_js/6_canalPago"
node run-newman.js p2p --folder "Metodo/0022/1_validaciones_js/7_tipo"
node run-newman.js p2p --folder "Metodo/0022/1_validaciones_js/8_descripcion"
# Metodo 0023
node run-newman.js p2p --folder "Metodo/0023"
node run-newman.js p2p --folder "Metodo/0023/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0023/1_validaciones_js/1_identificador"
node run-newman.js p2p --folder "Metodo/0023/1_validaciones_js/2_qrCode"

# VCN
node run-newman.js vcn
# General
node run-newman.js vcn --folder "General"
node run-newman.js vcn --folder "General/1_validaciones_js"
node run-newman.js vcn --folder "General/1_validaciones_js/1_idCanal"
node run-newman.js vcn --folder "General/1_validaciones_js/2_validador"
node run-newman.js vcn --folder "General/1_validaciones_js/3_peticion"
node run-newman.js vcn --folder "General/1_validaciones_js/4_idPeticion"
node run-newman.js vcn --folder "General/1_validaciones_js/5_solicitudes"
node run-newman.js vcn --folder "General/2_reglaNegocio"
node run-newman.js vcn --folder "General/2_reglaNegocio/1_idCanal"
node run-newman.js vcn --folder "General/2_reglaNegocio/3_peticion"
node run-newman.js vcn --folder "General/2_reglaNegocio/4_metodo"
node run-newman.js vcn --folder "Metodo"
# Metodo 0001
node run-newman.js vcn --folder "Metodo/0001"
node run-newman.js vcn --folder "Metodo/0001/1_validaciones_js"
node run-newman.js vcn --folder "Metodo/0001/1_validaciones_js/1_cuenta"
```

`--folder` = misma ruta que la carpeta seleccionada en Postman (sin el nombre de la colección). Ejemplo: en Postman seleccionas `General` → `2_reglaNegocio` → `1_idCanal` → usa `General/2_reglaNegocio/1_idCanal`.

Newman filtra por **nombre** de carpeta: hay dos `1_idCanal` bajo `General` (`1_validaciones_js` y `2_reglaNegocio`); la ruta completa en `--folder` puede incluir ambas.

SSL desactivado por defecto (dev). Añade `--strict-ssl` al final de cualquier línea para exigir certificado.

Si `npm install` falla por certificado corporativo: `$env:NODE_TLS_REJECT_UNAUTHORIZED="0"; npm install`

Comparte con el agente vía git (las pruebas se ejecutan en otra máquina):

1. Tras el run: `git add logs/resumen-fallos-<suite>.md logs/ultimo-run-<suite>.json`
2. Commit + push
3. En Cursor: `@Postman/generador/logs/resumen-fallos-<suite>.md`

Genera en `logs/`:

| Archivo | Para qué |
|---------|----------|
| `resumen-fallos-<suite>.md` | Commit + push → agente en otra máquina |
| `ultimo-run-<suite>.json` | Detalle Newman (commit + push si hace falta profundizar) |

## Convención de escenarios

```
General/<grupo>/<campo>/<N.N>_<campo>_<condicion>.json
Metodo/<metodo>/<grupo>/<campo>/<N.N>_<campo>_<condicion>.json
```

Cada JSON es un escenario; el ensamblador los combina en una colección Postman v2.1.

## Estudio de referencia

[`estudio-generador.md`](estudio-generador.md) — documentación completa del generador (estructura, flujo, escenarios, scripts, validación). Consultar ahí antes de revisar todos los archivos fuente.
