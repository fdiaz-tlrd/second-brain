# Registro Newman: presentación al cliente — 2026-07-14

## Decisión firmada

`mensajeError` y `descripcionError` son **contratos distintos** (`A.mensajeError` ≠ `A.descripcionError`).
No se colapsan: el cliente busca una propiedad concreta (como Cursor ≠ Grok).

Cada escenario Newman registra el contrato de presentación además del cifrado en el cable:

| Campo | Significado |
|-------|-------------|
| `presentacionForma` | `A.mensajeError` \| `A.descripcionError` \| `A` \| `B` \| `C` \| … |
| `presentacionCodigo` | Código de negocio (`codigoError` o `respuestas[0].resultado`) |
| `presentacionDescripcion` | Texto real del error (vacío en B) |
| `presentacionCampoTexto` | Nombre de la propiedad de texto |
| `presentacionClaves` | Claves del JSON de negocio (ordenadas) |
| `presentacionCifrado` | Si la lambda entregó cifrado |
| `presentacionHttp` | HTTP de la lambda |
| `presentacionPatternKey` | Clave de patrón estructural (deduplicación) |

Definición: [`../../codigosRespuesta/formas-presentacion-cliente.md`](../../codigosRespuesta/formas-presentacion-cliente.md).

La **foto por servicio y código fuente** (VCN/P2P × prod/dev) **no** mezcla catálogo:

```powershell
cd second-brain\Postman\generador
node extraer-foto-presentacion.js logs/resultados-por-escenario-vcn.json
# → codigosRespuesta/foto-presentacion-vcn-prod.md  (o -dev según codigoFuente)
```

`run-newman.js` genera foto + **muestras** automáticamente al terminar. Prod y dev son archivos distintos; no se sobrescriben entre sí.

| Archivo | Contenido |
|---------|-----------|
| `foto-presentacion-<suite>-<prod\|dev>.md` | Matriz código × contratos + índice de patrones |
| `foto-presentacion-<suite>-<prod\|dev>.muestras.md` | Request (`reqClaro`) + response cliente (`body`) por patrón único |
| `…patrones.json` | Misma data (incluye `muestra` por patrón) |

## Patrones únicos

Primera `presentacionPatternKey` = patrón; misma clave se agrega; distinta = nuevo.
Filas foto = `(código + descripción)` con `x`/`-` por cada contrato.

## Dónde vive

| Pieza | Rol |
|-------|-----|
| `{VCN,P2P,P2M} Escenarios error/Post-response.js` | Emite campos en `[CAPTURA]` |
| `clasificar-presentacion-cliente.js` | Clasificador Node |
| `run-newman.js` | Persiste campos; resumen por contrato |
| `extraer-foto-presentacion.js` | Genera la foto MD |

Complementa: [`registro-respuesta-cifrada-vs-clara-2026-07-14.md`](registro-respuesta-cifrada-vs-clara-2026-07-14.md).

## Re-run (máquina VPN)

```powershell
cd second-brain\Postman\generador
node run-newman.js vcn --codigo-fuente prod --nota "foto presentacion contratos"
node run-newman.js p2p --codigo-fuente prod --nota "foto presentacion contratos"
# commit/push logs/, luego:
node extraer-foto-presentacion.js logs/resultados-por-escenario-vcn.json
node extraer-foto-presentacion.js logs/resultados-por-escenario-p2p.json
```
