# `lib/variablesEntorno.js` — base transversal (no copia P2M/P2P)

**Fecha:** 2026-07-04

## Comparación P2M vs P2P

Archivos:

| Repo | Ruta |
|------|------|
| P2M | `tld-api-p2m/lambdas/p2m/lib/variablesEntorno.js` |
| P2P | `tld-api-alias/lambdas/alias/lib/variablesEntorno.js` |

**No son idénticos.** Comparten el patrón fail-fast y helpers similares, pero exportan conjuntos distintos según dominio.

### Solo en P2M (dominio P2M / comercio / QR / MDR)

| Variable | Uso |
|----------|-----|
| `S3_BUCKET_NAME` | Logos, assets |
| `DB_P2M`, `DB_P2M_CUENTA`, `DB_P2M_MCC` | Tablas P2M |
| `CFG_MONTO_MAX`, `CFG_PLATAFORMA_DEFAULT`, `CFG_MDR_REGLA_REDONDEO` | Montos / MDR |
| `PROX_VAL_LAMBDA_NAME` | Proxy validador (método 0020) |
| `LBD_QR_GENERATE`, `LBD_QR_READ` | Opcionales en P2M |
| `CFG_CANTIDAD_DIAS_QR_VALIDO`, `CFG_CANTIDAD_MINIMO_QR_LECTURAS` | QR |
| `DEFAULT_LOGO_VARIANT` | Logo por defecto |
| `AWS_LAMBDA_FUNCTION_NAME` | Opcional (S3 local) |

### Solo en P2P (dominio alias / HTTP / bajas masivas)

| Variable | Uso |
|----------|-----|
| `CFG_KMS_TELERED_KEY_ID` | Cifrado KMS |
| `CFG_ID_SISTEMA`, `CFG_BANCOS_MAXIMO`, `CFG_MAX_RESPUESTA_USUARIOS`, `CFG_SOLICITUDES_MASIVAS_MAXIMO` | Alias / bajas |
| `API_HTTP_READ_TIMEOUT_MS`, `API_HTTP_CONNECT_TIMEOUT_MS` | Cliente HTTP |
| `API_NOTIFICACION_URL`, `API_CUENTA_NOMBRE_URL`, `API_PREGUNTAS_BASE_URL` | Integraciones HTTP |
| `LBD_QR_GENERATE`, `LBD_QR_READ` | Requeridos en P2P |
| `NODE_TLS_REJECT_UNAUTHORIZED` | Globals SAM / local |
| `INDIVIDUAL`, `COMPLETA`, `TIPOS_BAJAS` | Constantes de dominio (no env) |

### Transversal (presente en ambos — va en `tld-api-base`)

| Variable | Consumidor en base |
|----------|-------------------|
| `PRINT_LOGS` | `logger.js` |
| `AWS_REGION` | Clientes AWS (cuando se cablee `canal`, `dashboard`, …) |
| `DB_BITACORA` | `bitacora.js` |
| `DB_VALIDADOR_CANAL`, `DB_VALIDADOR_CANAL_OPERACION`, `DB_CANAL_LLAVE` | `canal.js` (pendiente) |
| `DB_DASHBOARD` | `dashboard.js` (pendiente) |
| `CFG_CONTROL_PLAN_FUNCTION_NAME`, `CFG_ALIAS_API_NAME` | `plan.js` (pendiente) |
| `CFG_CANAL_VALIDADOR` | `validaciones.js` transversal (pendiente) |
| `CFG_VALIDAR_PLAN_POR_CANAL`, `CFG_METODOS_LIMITES_JSON` | `app.js` (pendiente cableado) |

`CFG_ALIAS_API_NAME` conserva el nombre histórico de P2M/P2P (`nombreApi` en control de plan); el **valor** lo fija cada deploy (P2M, P2P, VCN).

## Criterio de diseño base

- **No** copiar el archivo de P2M ni el de P2P.
- **No** fusionar ambos (eso obligaría a definir env de dominio que la base no usa).
- **Sí** exportar solo lo que consume la orquestación transversal; cada repo de dominio mantiene su propio `variablesEntorno.js` ampliado.

## Archivo en repo

```
tld-api-base/lambdas/base/lib/variablesEntorno.js
```

Hoy satisface `logger.js` y `bitacora.js`; el resto de variables ya están validadas para cuando entren `canal`, `plan`, `dashboard`, `validaciones` y el cableado de `app.js`.

## Orden de extracción `lib/`

```
variablesEntorno.js   ← este (desbloquea logger + bitacora)
date-utils.js
catalogoRespuestas.js
response.js
…
```
