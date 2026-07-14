# Registro Newman: ¿la respuesta vino cifrada o en claro? (2026-07-14)

## Decisión (firmada, no es provisional)

Cada escenario Newman registra **si la lambda devolvió el cuerpo cifrado o en claro**.

Tu intuición era correcta: el dummy `/descifrar` **solo** intenta descifrar cuando
`respuesta` (o `peticion`) es un **string**; si no, hace echo del body. Por eso, si tras
`/descifrar` el payload no cambia, la API ya lo devolvió en claro. Eso se registra
como `payloadCambioTrasDescifrar`.

Para no depender de un único truco, la clasificación es en **dos capas**:

1. **Primaria — estructura del payload de la lambda** (`PROCESAR_RESPONSE_BODY`):
   qué formato emitió la API.
2. **Secundaria — heurística de cambio** (`raw !== body` tras `/descifrar`):
   confirmación de que el dummy realmente transformó (o no) el cuerpo.

Validado contra el log histórico VCN (`resultados-por-escenario-vcn.json`, 1263
escenarios): **0 mismatches** estructura vs cambio-tras-descifrar
(916 cifrado / 251 plano / 96 plano_en_respuesta).

## Campos nuevos (en `[CAPTURA]` y en `resultados-por-escenario-*.json`)

| Campo | Tipo | Significado |
|-------|------|-------------|
| `respuestaVinoCifrada` | `true` / `false` / `null` | ¿La lambda entregó ciphertext? |
| `formatoRespuestaLambda` | enum | Clasificación fina (ver abajo) |
| `payloadCambioTrasDescifrar` | `true` / `false` / `null` | ¿`respLambdaRaw` ≠ body post-`/descifrar`? |

### Valores de `formatoRespuestaLambda`

| Valor | Qué es | Ejemplo |
|-------|--------|---------|
| `cifrado` | Envelope con `respuesta` **string** (ciphertext). El dummy sí descifra. | `{"respuesta":"iv.hex..."}` |
| `plano` | Error/negocio en claro en la **raíz** (matriz / validador). | `{"codigoError":550,"descripcionError":"..."}` |
| `plano_en_respuesta` | `respuesta` es **objeto** (NO string) → en claro anidado; dummy no descifra, hace echo. | `{"respuesta":{"codigoError":509,...}}` |
| `no_json` | Body no parsea como JSON | `Internal server error` |
| `desconocido` | JSON raro; se cae a la heurística de cambio | — |
| `sin_respuesta` | Sin body de lambda (flujo falló antes) | — |

## Dónde vive el cambio

| Pieza | Cambio |
|-------|--------|
| `Postman/generador/{VCN,P2P,P2M} Escenarios error/Post-response.js` | `clasificarFormatoRespuestaLambda` dentro de `[CAPTURA]` |
| `Postman/generador/run-newman.js` | Propaga campos al JSON; conteos + columnas **Formato** / **Cifrada?** en el MD |
| Colecciones ensambladas | Re-generadas (`armar-coleccion.js` config-vcn / config-p2p / config.json) |
| `Postman/generador/verificar-formato-respuesta-lambda.js` | Verificador local (5 unitarios + backfill de log). **No borrar.** |

## Cómo se ve en el reporte

En el header de `resultados-por-escenario-<suite>.md`:

```
| Respuesta lambda cifrada / en claro / sin dato | N / M / K |
| Desglose formatoRespuestaLambda | cifrado=…, plano=…, plano_en_respuesta=… |
```

Y por escenario, columnas `Formato` y `Cifrada?` (sí/no/—).

## Qué NO hace

- No falla el escenario por venir en claro o cifrado (solo **registra**).
- No exige cifrado para pasar asserts de negocio (eso es otra decisión, si alguna vez se quiere).
- No corre Newman desde Lenovo (regla VPN). Requiere re-run en la máquina con VPN
  para que los **nuevos** logs traigan estos campos en `[CAPTURA]`.

## Comando re-run (máquina VPN)

```powershell
cd second-brain\Postman\generador
node run-newman.js vcn --codigo-fuente prod --nota "captura formato cifrado/plano"
node run-newman.js p2p --codigo-fuente prod --nota "captura formato cifrado/plano"
node run-newman.js p2m --codigo-fuente prod --nota "captura formato cifrado/plano"
```

Verificación local (sin VPN):

```powershell
node verificar-formato-respuesta-lambda.js logs\resultados-por-escenario-vcn.json
```

## Referencias

- Dummy `/descifrar`: `tld-validador-dummy/lambdas/descifrar/app.js` (solo descifra si
  `respuesta`/`peticion` es string; si no, echo).
- Checkpoint Postman: [`../00-estado-y-retomo.md`](../00-estado-y-retomo.md).
