# Revisión escenario por escenario — CÓDIGO DE RESPUESTA (payload) — P2P

> **Alcance:** SOLO `codigoError` / `resultado` del JSON de respuesta. **NO** HTTP Code.
> **Fuente:** run `prod / MATRIZ` `2026-07-13T08-53-01Z` sobre `prod_adactado_a_dev` (commit logs `fddeeb7`).

## ESTADO: CAUSA CONFIRMADA Y CORREGIDA — pendiente re-correr

El **86 %** de los escenarios no llegó a la lambda de producto (alias). No fue divergencia de negocio
ni cifrado: fue un fallo de integración **validador → alias** por **config de datos**.

**Resuelto (2026-07-13, usuario):** en la tabla **`tld-validador-config-servicios`** (dev) **faltaban
URLs** para métodos de alias y **las que estaban eran incorrectas**. El usuario las corrigió. Esto
confirma la **causa #1** de abajo (URL vacía/incorrecta → `axios` sin respuesta → 509), y descarta la #2
(red/deploy) y la hipótesis de cifrado.

**Siguiente:** re-correr `p2p MATRIZ prod` sobre `prod_adactado_a_dev` y, con el nuevo run, abrir la
revisión `codigoError` escenario a escenario (análogo a doc 12 VCN). El run `2026-07-13T08-53-01Z`
queda **invalidado** para comparar negocio (sirve solo como evidencia del bloqueo).

## Qué se recibió (2159 escenarios)

| Recibido `codigoError` | Escenarios | Qué es |
|------------------------|-----------:|--------|
| **509** | **1864** | `"Error inesperado al llamar servicio interno"` — la validador **no pudo llamar al alias** |
| 404 | 84 | negocio real (llegó a validar) |
| 400 | 72 | formato (matriz/validador) |
| 405 | 68 | método |
| 401 | 32 | canal emisor no existe |
| 550 | 23 | `"Error inesperado"` — solo `idCanal` null/tipo (20) + JSON inválido (3) |
| 425 | 12 | negocio |
| 999 | 4 | crash catch validador |

- `negocioCoincide` OK: **112** / NO: **2047**.
- Todos los 509 traen **exactamente** el mismo texto: `Error inesperado al llamar servicio interno`.
- Los 509 caen en **rutas de método** (`Metodo/0002…0025/1_validaciones_js/*`) + algunas `General`
  que dependen de llegar al producto. Las validaciones de formato transversales (idCanal, validador,
  peticion) sí devuelven su código correcto (400/401/405) porque las resuelve la validador **antes**
  de llamar al alias.

## Causa raíz (confirmada en código)

`prod_adactado_a_dev/tld-validador-api/lambdas/validar/app.js`:

```
80  const servicio = await canal.getUrlServicioInterno(peticion.metodo);   // lee tld-validador-config-servicios (id = metodo)
...
92  const respuesta = await validador.validar(servicioInterno, peticionValidador);  // axios.post(canal.url, ...)
93  if (!respuesta){
95     return await util.lambdaResult(200, 509, "Error inesperado al llamar servicio interno")
```

`validador.validar` (`lib/validador.js`):

```
11  const resp = await axios.post(canal.url, request, { timeout: readTimeout })
16  return resp.data
17  } catch (error) {
20    return error?.response?.data   // en fallo de conexión (sin response) -> undefined -> 509
```

`respuesta` queda **falsy** (→ 509) cuando:

1. **`canal.url` es `undefined`** → no hay fila en `tld-validador-config-servicios` (id = método) para
   0002…0025 en dev, **o**
2. **el endpoint del alias no responde** (DNS/red/no desplegado): `axios` lanza sin `.response` →
   `error?.response?.data` = `undefined`.

Si el alias hubiera respondido *cualquier* cosa (aun un error con body), `error.response.data` sería
truthy y **no** daría 509. Que dé 509 significa que **no hubo respuesta HTTP del alias**: URL vacía o
conexión fallida.

## Por qué NO es el cifrado (hipótesis descartada)

- La validador **descifró** la petición del emisor: validó `idPeticion`, `solicitudes` y leyó `metodo`
  (todo post-descifrado) antes de intentar la llamada interna.
- Escenarios de formato devuelven códigos correctos (400/401/404/405/431) → cifrado/descifrado OK.
- El 509 es un JSON de negocio limpio y bien formado; `descifradoCode` de la respuesta = 200.
- Los únicos **550 "Error inesperado"** (23) son `idCanal` null/tipo + JSON inválido — **mismo
  comportamiento transversal de matriz** ya documentado en VCN (HP-001/002/005), no exclusivo de P2P.
- La misma validador, en el run VCN, **sí** llegó a `cuenta-nombre` (600 caminos felices OK). El
  problema es específico de la ruta hacia **alias**, no del transporte cifrado.

## Diagnóstico → resolución

| Paso | Resultado |
|------|-----------|
| Tabla `tld-validador-config-servicios` (dev): URLs de métodos alias | **Faltaban** unas y **otras eran incorrectas** → **corregido por el usuario (2026-07-13)** |
| Endpoint alias alcanzable / deploy | No era el problema (descartado) |
| Cifrado / variable de entorno P2P | No era el problema (descartado con evidencia) |

Ninguna corrección tocó código de `prod-a-dev`: fue **dato de config** en la tabla del ambiente dev.

## Pendiente

- **Re-correr** `p2p MATRIZ prod` sobre `prod_adactado_a_dev` (usuario, VPN) con la tabla ya corregida.
- Verificar que los 509 bajaron a residuales y que aparecen los `codigoError` de negocio por método.
- Recién entonces abrir la revisión `codigoError` escenario a escenario (análogo a doc 12 VCN).
