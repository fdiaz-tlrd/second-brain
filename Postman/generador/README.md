# Generador de colecciones Postman

Copia de `refactoria\Postman`. Fuente de verdad para mantener escenarios en archivos separados y generar colecciones importables en Postman.

**Estado global y retomo:** [`../00-estado-y-retomo.md`](../00-estado-y-retomo.md)

---

## Newman y VPN — OBLIGATORIO LEER (agente)

**Regla:** el agente **NO** ejecuta `node run-newman.js` en Lenovo. Newman lo corre el usuario en la **otra máquina (VPN)**, hace **commit + push de `logs/`** entero, y avisa aquí.

Sin VPN, `ENOTFOUND` no prueba nada. **No** `git restore logs/`. **No** decir «no se ejecutó Newman» si `registro-vcn.md` tiene run nuevo del usuario.

Detalle: [`../../tld-api-cuenta-nombre/05-newman-vpn-reglas-agente.md`](../../tld-api-cuenta-nombre/05-newman-vpn-reglas-agente.md) · [`logs/README.md`](logs/README.md) · [`logs/registro-vcn.md`](logs/registro-vcn.md)

**Tras cada run (máquina VPN):** `git add logs/` → commit → push. Opcional: `--nota "post-deploy …"` en el comando Newman.

---

## Estructura

| Carpeta / archivo | Rol |
|-------------------|-----|
| `ensamblador/` | Scripts Node.js: `armar-coleccion.js`, generadores por método, configs y `salida/` |
| `P2M Escenarios error/` | Escenarios fuente P2M |
| `P2M Escenarios error especiales/` | Escenarios especiales P2M |
| `P2P Escenarios error/` | Escenarios fuente P2P |
| `VCN Escenarios error/` | Escenarios fuente VCN |
| `entornos/` | Environments Postman |
| [`../canalesPruebas-dev/`](../canalesPruebas-dev/) | Canales dev, export Dynamo, operaciones validador |
| [`../../notas-sueltas/`](../../notas-sueltas/) | Seed Dynamo `tld-validador-dummy` (cuentas VCN dev) — ver [`cargar-tld-validador-dummy-cuentas-vcn-dev.md`](../../notas-sueltas/cargar-tld-validador-dummy-cuentas-vcn-dev.md) |

## Uso — ensamblar colección

Tras editar JSON en `VCN Escenarios error/` (u otras carpetas fuente):

```powershell
cd C:\Versionamiento\GitHub\second-brain\Postman\generador\ensamblador
node armar-coleccion.js config-vcn.json
```

Salida: `ensamblador\salida\*.postman_collection.json`

---

## Newman — PowerShell (VPN)

**Una vez por sesión** (PowerShell nuevo o otra carpeta):

```powershell
cd C:\Versionamiento\GitHub\second-brain\Postman\generador
```

**Cada run:** copia **una línea** o **todo un bloque** (P2M, P2P, VCN…) → pega en PowerShell → Enter. PowerShell ejecuta línea por línea.

La ruta en `--folder` es la misma carpeta que ves en Postman (sin el nombre de la colección).

```powershell
node run-newman.js vcn --folder "Metodo/0001/4_escenariosQA/idPeticion_max64"
```

**Run completo de una suite** (sin `--folder`):

```powershell
node run-newman.js p2p
node run-newman.js p2m
node run-newman.js vcn
node run-newman.js all
```

Opcional: `--nota "texto"` al final. SSL estricto: `--strict-ssl`.

### Versión de código desplegada (prod vs dev)

Para comparar cómo responde el código **productivo** frente al **en desarrollo** (mismo AWS dev, distinto código en las lambdas), etiquetar cada run:

```powershell
node run-newman.js vcn --codigo-fuente prod --nota "prod tld-validador-api-main"
node run-newman.js vcn --codigo-fuente dev  --nota "feature/ARQ-225 comoAxiosData"
```

O fijando la variable una vez en la sesión: `$env:NEWMAN_CODIGO_FUENTE = "prod"`.

La etiqueta queda en `resumen-fallos-*`, `registro-*`, `historial/` y en la salida nueva `logs/resultados-por-escenario-<suite>.json/.md` (una fila por escenario con lo que respondió, no solo los fallos).

Comparar dos corridas (insumo para el informe, **no** el informe):

```powershell
node comparar-runs.js logs/historial/vcn/<runProd>_por-escenario.json logs/historial/vcn/<runDev>_por-escenario.json
```

Diseño y alcance: [`../comparar-prod-vs-dev/`](../comparar-prod-vs-dev/).

Tras el run (máquina VPN): `git add Postman\generador\logs\` → commit → push.

---

### P2M — líneas listas para copiar

```powershell
node run-newman.js p2m
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
node run-newman.js p2m --folder "Metodo/0015"
node run-newman.js p2m --folder "Metodo/0015/1_validaciones_js"
node run-newman.js p2m --folder "Metodo/0015/1_validaciones_js/1_identificador"
node run-newman.js p2m --folder "Metodo/0015/1_validaciones_js/2_tipoIdentificador"
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
node run-newman.js p2m --folder "Metodo/0017"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js/1_identificador"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js/3_busquedaCantidad"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js/4_mcc"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js/5_busquedaIdentificadorComercio"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js/6_busquedaNombreComercio"
node run-newman.js p2m --folder "Metodo/0017/1_validaciones_js/7_busquedaPaginaToken"
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
node run-newman.js p2m --folder "Metodo/0019"
node run-newman.js p2m --folder "Metodo/0019/1_validaciones_js"
node run-newman.js p2m --folder "Metodo/0019/1_validaciones_js/1_identificador"
node run-newman.js p2m --folder "Metodo/0019/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2m --folder "Metodo/0019/1_validaciones_js/3_p2mPagoId"
node run-newman.js p2m --folder "Metodo/0019/1_validaciones_js/4_estadoCargo"
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
node run-newman.js p2m --folder "Metodo/0025"
node run-newman.js p2m --folder "Metodo/0025/1_validaciones_js"
node run-newman.js p2m --folder "Metodo/0025/1_validaciones_js/1_identificador"
node run-newman.js p2m --folder "Metodo/0025/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2m --folder "Metodo/0025/1_validaciones_js/3_qrCode"
```

### P2P — líneas listas para copiar

```powershell
node run-newman.js p2p
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
node run-newman.js p2p --folder "Metodo/0002"
node run-newman.js p2p --folder "Metodo/0002/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0002/1_validaciones_js/1_tipoIdentificador"
node run-newman.js p2p --folder "Metodo/0002/1_validaciones_js/2_identificador"
node run-newman.js p2p --folder "Metodo/0003"
node run-newman.js p2p --folder "Metodo/0003/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0003/1_validaciones_js/1_identificador"
node run-newman.js p2p --folder "Metodo/0003/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2p --folder "Metodo/0004"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/1_identificador"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/3_idPregunta"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/4_respuesta"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/5_banco"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/6_cuenta"
node run-newman.js p2p --folder "Metodo/0004/1_validaciones_js/7_producto"
node run-newman.js p2p --folder "Metodo/0005"
node run-newman.js p2p --folder "Metodo/0005/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0005/1_validaciones_js/1_banco"
node run-newman.js p2p --folder "Metodo/0006"
node run-newman.js p2p --folder "Metodo/0006/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0006/1_validaciones_js/1_identificador"
node run-newman.js p2p --folder "Metodo/0006/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2p --folder "Metodo/0006/1_validaciones_js/3_respuestas"
node run-newman.js p2p --folder "Metodo/0006/1_validaciones_js/4_banco"
node run-newman.js p2p --folder "Metodo/0006/1_validaciones_js/5_cuenta"
node run-newman.js p2p --folder "Metodo/0006/1_validaciones_js/6_producto"
node run-newman.js p2p --folder "Metodo/0007"
node run-newman.js p2p --folder "Metodo/0007/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0007/1_validaciones_js/1_identificador"
node run-newman.js p2p --folder "Metodo/0007/1_validaciones_js/2_tipoIdentificador"
node run-newman.js p2p --folder "Metodo/0007/1_validaciones_js/3_banco"
node run-newman.js p2p --folder "Metodo/0007/1_validaciones_js/4_tipoBaja"
node run-newman.js p2p --folder "Metodo/0008"
node run-newman.js p2p --folder "Metodo/0008/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0008/1_validaciones_js/1_id"
node run-newman.js p2p --folder "Metodo/0008/1_validaciones_js/2_identificador"
node run-newman.js p2p --folder "Metodo/0008/1_validaciones_js/3_tipoIdentificador"
node run-newman.js p2p --folder "Metodo/0008/1_validaciones_js/4_banco"
node run-newman.js p2p --folder "Metodo/0008/1_validaciones_js/5_cuenta"
node run-newman.js p2p --folder "Metodo/0008/1_validaciones_js/6_producto"
node run-newman.js p2p --folder "Metodo/0009"
node run-newman.js p2p --folder "Metodo/0009/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0009/1_validaciones_js/1_identificador"
node run-newman.js p2p --folder "Metodo/0009/1_validaciones_js/2_tipoIdentificador"
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
node run-newman.js p2p --folder "Metodo/0023"
node run-newman.js p2p --folder "Metodo/0023/1_validaciones_js"
node run-newman.js p2p --folder "Metodo/0023/1_validaciones_js/1_identificador"
node run-newman.js p2p --folder "Metodo/0023/1_validaciones_js/2_qrCode"
```


### VCN — líneas listas para copiar

Run completo (incluye `5_fallosIntegracionValidador`; **no** incluye `4_idPeticion_soloLog`):

```powershell
node run-newman.js vcn
```

**General**

```powershell
node run-newman.js vcn --folder "General"
node run-newman.js vcn --folder "General/0_jsonEntrada"
node run-newman.js vcn --folder "General/1_validaciones_js"
node run-newman.js vcn --folder "General/1_validaciones_js/1_idCanal"
node run-newman.js vcn --folder "General/1_validaciones_js/2_validador"
node run-newman.js vcn --folder "General/1_validaciones_js/3_peticion"
node run-newman.js vcn --folder "General/1_validaciones_js/4_idPeticion"
node run-newman.js vcn --folder "General/1_validaciones_js/4_idPeticion_soloLog"
node run-newman.js vcn --folder "General/1_validaciones_js/5_solicitudes"
node run-newman.js vcn --folder "General/2_reglaNegocio"
node run-newman.js vcn --folder "General/2_reglaNegocio/1_idCanal"
node run-newman.js vcn --folder "General/2_reglaNegocio/2_validador"
node run-newman.js vcn --folder "General/2_reglaNegocio/3_peticion"
node run-newman.js vcn --folder "General/2_reglaNegocio/4_metodo"
```

**Metodo/0001**

```powershell
node run-newman.js vcn --folder "Metodo/0001"
node run-newman.js vcn --folder "Metodo/0001/1_validaciones_js"
node run-newman.js vcn --folder "Metodo/0001/1_validaciones_js/1_cuenta"
node run-newman.js vcn --folder "Metodo/0001/2_respuestaCanalValidador"
node run-newman.js vcn --folder "Metodo/0001/2_respuestaCanalValidador/1008"
node run-newman.js vcn --folder "Metodo/0001/2_respuestaCanalValidador/1009"
node run-newman.js vcn --folder "Metodo/0001/2_respuestaCanalValidador/1011"
node run-newman.js vcn --folder "Metodo/0001/2_respuestaCanalValidador/1012"
node run-newman.js vcn --folder "Metodo/0001/2_respuestaCanalValidador/1013"
node run-newman.js vcn --folder "Metodo/0001/2_respuestaCanalValidador/1014"
node run-newman.js vcn --folder "Metodo/0001/2_respuestaCanalValidador/1015"
node run-newman.js vcn --folder "Metodo/0001/2_respuestaCanalValidador/1016"
node run-newman.js vcn --folder "Metodo/0001/3_respuestaExitosa"
node run-newman.js vcn --folder "Metodo/0001/3_respuestaExitosa/1008"
node run-newman.js vcn --folder "Metodo/0001/3_respuestaExitosa/1009"
node run-newman.js vcn --folder "Metodo/0001/3_respuestaExitosa/1011"
node run-newman.js vcn --folder "Metodo/0001/3_respuestaExitosa/1012"
node run-newman.js vcn --folder "Metodo/0001/3_respuestaExitosa/1013"
node run-newman.js vcn --folder "Metodo/0001/3_respuestaExitosa/1014"
node run-newman.js vcn --folder "Metodo/0001/3_respuestaExitosa/1015"
node run-newman.js vcn --folder "Metodo/0001/3_respuestaExitosa/1016"
node run-newman.js vcn --folder "Metodo/0001/4_escenariosQA"
node run-newman.js vcn --folder "Metodo/0001/4_escenariosQA/gcm"
node run-newman.js vcn --folder "Metodo/0001/4_escenariosQA/cbc_gcm"
node run-newman.js vcn --folder "Metodo/0001/4_escenariosQA/token_dinamico"
node run-newman.js vcn --folder "Metodo/0001/4_escenariosQA/idPeticion_min1"
node run-newman.js vcn --folder "Metodo/0001/4_escenariosQA/idPeticion_max64"
node run-newman.js vcn --folder "Metodo/0001/4_escenariosQA/idSolicitud_min1"
node run-newman.js vcn --folder "Metodo/0001/4_escenariosQA/idSolicitud_max64"
node run-newman.js vcn --folder "Metodo/0001/5_fallosIntegracionValidador"
node run-newman.js vcn --folder "Metodo/0001/5_fallosIntegracionValidador/1022_fijo"
node run-newman.js vcn --folder "Metodo/0001/5_fallosIntegracionValidador/1023_token"
```

**`--folder`:** sin ruta completa, nombres duplicados (p. ej. dos `1_idCanal` en `General`) ejecutarían **ambas**.

Registro: `logs\registro-vcn.md` · `logs\historial\vcn\` (análogo `p2m` / `p2p`).

### VCN — notas `Metodo/0001`

| Bloque | Escenarios |
|--------|------------|
| `1_cuenta` | 20 |
| `2_respuestaCanalValidador` | 48 |
| `3_respuestaExitosa` | 112 |
| `4_escenariosQA` | 38 |
| `5_fallosIntegracionValidador` | 6 |

`5_fallosIntegracionValidador`: canales `1022`/`1023`, cuentas `5000000516`–`518` → códigos **599** / **406** / **509**. Los dos runs de demora suman ~30 s si el proxy hace timeout antes de los 16 s del dummy.

**Último run (VPN):** [`VCN Escenarios error/Metodo/0001/5_fallosIntegracionValidador/RUN-2026-07-06.md`](VCN%20Escenarios%20error/Metodo/0001/5_fallosIntegracionValidador/RUN-2026-07-06.md) — 29/42 OK, 13 fallos (502 demora 1022; mensaje 509; 1023 todo 500).

`4_idPeticion_soloLog`: fuera del run `vcn` completo; Newman aserta **exito** (prod no rechaza; VCN dev solo log).

**Dynamo dev:** [`notas-sueltas/tld-validador-dummy-cuentas-vcn-dev.json`](../../notas-sueltas/tld-validador-dummy-cuentas-vcn-dev.json) · [`cargar-tld-validador-dummy-cuentas-vcn-dev.md`](../../notas-sueltas/cargar-tld-validador-dummy-cuentas-vcn-dev.md)

En Cursor tras push de logs: `@Postman/generador/logs/resumen-fallos-vcn.md`

| Archivo en `logs/` | Uso |
|--------------------|-----|
| `resumen-fallos-vcn.md` | Resumen para el agente |
| `ultimo-run-vcn.json` | Detalle Newman |

## Convención de escenarios

```
General/<grupo>/<campo>/<N.N>_<campo>_<condicion>.json
Metodo/<metodo>/<grupo>/<campo>/<N.N>_<campo>_<condicion>.json
```

Cada JSON es un escenario; el ensamblador los combina en una colección Postman v2.1.

## Estudio de referencia

[`estudio-generador.md`](estudio-generador.md) — documentación completa del generador (estructura, flujo, escenarios, scripts, validación). Consultar ahí antes de revisar todos los archivos fuente.
