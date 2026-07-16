# Cierre 3.5 — candado G5 + dependencia G7

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Iter | 3.5 |
| Alcance | Barrido lectura Dig vs prod (negocio) + nota caller Dig; **sin** mejoras nuevas |

## G5 — checklist negocio prod (firmado)

Verificación en `tld-api-r2p/lambdas/r2p` tras fixes 3.1–3.4 (solo lectura):

| Ítem candado | Estado Dig | Evidencia |
|--------------|------------|-----------|
| Semántica `0011` / `0013` | OK | `app.js` switch cases presentes |
| Remap notify `0011`→`0012`, `0013`→`0014` | OK | `bodyPeticion.metodo = '0012'` / `'0014'` antes del proxy |
| Dynamo R2P create/update/get | OK | `r2p.addRequest` / `updateRequest` / `getRequest2P` |
| Validaciones dominio (límites, solicitudes, estados) | OK | Ramas 0011/0013 intactas; códigos 509 create/update |
| Cifrado emisor entrada/salida | OK | `operacionesPaquete.abrirPaquete` / `cerrarPaquete` (familia prod `llave`) |
| Agregación bitácora/`getResultado` | OK | `getResultadoValidador` (3.1); mismos 0/500/501 |
| Fixes transporte no alteraron remap/Dynamo | OK | Diff 3.1–3.3 acotado a require/proxy/fallback; 3.4 sin código |

**No verificado en runtime** (Lenovo sin VPN/Newman): comportamiento E2E contra Dig. El candado es de **código presente / no regresionado** vs el pedido de asegurar Dig.

## G7 — caller Dig validador-api (nota)

| Hecho | Dónde |
|-------|-------|
| Dig `tld-validador-api` mapa `0011`/`0013` → servicio `R2P` → env `LAMBDA_R2P` | `lambdas/validar/lib/servicioInterno.js` |
| Invoke plano del body de negocio (no HTTP axios-url a R2P) | `lib/validador.js` Dig |
| R2P Dig consume Invoke **y** AGW vía `obtenerCuerpo` + `salidaLambda` | `lambdas/r2p/lib/response.js` |
| **Prohibido** “arreglar” caller inventando HTTP otra vez en R2P Dig | Meta proyecto |

Si Dig falla por `LAMBDA_R2P` mal configurado o mapa incompleto → se corrige en **validador-api**, no en producto R2P.

## Veredicto 3.5

G5 checklist **firmado** (código). G7 **documentado**. Fase 3 ejecución de gaps de transporte/auditoría **cerrada**. Pendiente operativo: deploy Dig + Newman en máquina VPN (usuario).
