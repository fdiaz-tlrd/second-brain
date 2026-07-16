# Estudio — `idTransaccionAutopista` / `fechaHora` en el flujo R2P (prod)

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Motivo | Verificar si plan **3.2 / G2** es “copiar VCN” o paridad real con prod |
| Fuentes | Solo lectura `produccion_real/` + Dig proxy / Dig R2P (comparación) |
| Veredicto | Ver § Veredicto |

## Pregunta

¿Reenviar esos dos campos al proxy “como VCN” es copiar una regla de negocio de VCN, o R2P debe preservar el mismo envelope que prod hacia el Canal Validador Externo?

## Flujo prod estudiado

```
Canal consumidor
  → tld-matriz / tld-validador-validar
  → tld-validador-api / validar
  → tld-api-r2p / r2p
  → Canal Validador Externo (HTTP)
```

### 1) Matriz — `produccion_real/tld-matriz/lambdas/tld-validador-validar/index.js`

- **No** vienen del canal consumidor como contrato de negocio R2P.
- Matriz **los inventa** y los **inyecta** en el body antes del POST:
  - `body.idTransaccionAutopista = Number(ipn)` (`ipn` = random 5 dígitos + `moment().unix()`)
  - `body.fechaHora = moment().utc().subtract(5,'hours').format("YYYY-MM-DD hh:mm:ss")`
- Mismos valores (variante de formato en `fechaHora` del item) alimentan **trace** Dynamo `tld-matriz-trace` (`guardarTrace`).
- Luego: `axios.post(VALIDADOR_URL+"/validar", body)` → **body completo** (incluye esos campos).

### 2) Validador-api — `produccion_real/tld-validador-api/lambdas/validar/app.js`

- **Cero** referencias por nombre a `idTransaccionAutopista` / `fechaHora` (Grep limpio).
- Reenvío interno: `const peticionValidador = body` → `validador.validar(servicioInterno, peticionValidador)`.
- Efecto: **pass-through opaco** de todo lo que llegó (si matriz los puso, salen hacia R2P).

### 3) R2P prod — `produccion_real/tld-api-r2p/lambdas/r2p/app.js` + `lib/validador.js`

- **Cero** referencias por nombre a esos campos (Grep limpio).
- Bitácora R2P usa `fecha` propia con `moment`, **no** `body.fechaHora` / `body.idTransaccionAutopista`.
- Envío al Canal Validador Externo:

```text
const peticionValidador = body
peticionValidador.peticion = peticionCifrada   // solo sustituye peticion
await validador.validar(canalValidador, peticionValidador, metodo)
```

- `validador.validar` hace `axios`/`tldlib.sendRequest` con ese `request` entero.
- Efecto: **si llegaron en el body, salen al banco** en el envelope JSON junto a `idCanal`, `validador`, `peticion` (cifrada).  
  **No** son regla de método `0011`/`0013`, Dynamo R2P, remap notify, ni agregación `getResultado`.

### 4) Prod VCN (mismo patrón envelope)

- `produccion_real/tld-api-cuenta-nombre/.../app.js`: también `peticionValidador = body` + sustituye `peticion` cifrada.
- Misma familia de pass-through; no es “negocio VCN” exclusivo.

## Dig (contraste)

| Pieza | Comportamiento |
|-------|----------------|
| Dig R2P pre-3.2 | Evento mínimo `{ idCanal, validador, peticion }` — **descartaba** los dos campos |
| Dig R2P **3.2** | Reenvía si vienen (`!= null`); no inventa |
| Dig VCN | Sí los reenvía si vienen (`validador-proxy-lambda.js` + call site) |
| Dig `tld-validador-proxy` | `requestAlValidador = { ...body, idCanal, validador, peticion: cifrado }` — **propaga** campos extra del evento al banco |

## Clasificación (qué son / qué no son)

| Afirmación | ¿Verdadero? |
|------------|-------------|
| Regla de negocio **propia** de R2P (métodos, Dynamo R2P, códigos dominio) | **No** |
| Campos que R2P “debe calcular” | **No** — los genera **matriz** (u otro caller) |
| Parte del **envelope HTTP** que prod R2P reenvía al Canal Validador si llegaron | **Sí** |
| VCN Dig los reenvía porque inventó una regla distinta | **No** — VCN Dig restaura el mismo pass-through prod bajo contrato proxy |
| Dig R2P sin reenvío = pérdida vs prod cuando el caller los manda | **Sí** (mitigado en 3.2) |

## Veredicto sobre plan 3.2 / G2

| Pregunta | Respuesta |
|----------|-----------|
| ¿Es solo “copiar VCN”? | **No**. Ancla = **prod R2P envelope** (pass-through). VCN Dig = el **cómo** bajo proxy. |
| ¿R2P “debe” la misma regla de negocio que VCN? | Mal planteado: **no es regla de negocio**; es **paridad de envelope**. |
| ¿El 3.2 es correcto? | **Sí** (intención). Ejecutado 2026-07-15 — evidencia [`11`](./11-fase2-orden-fixes.md). |

## Riesgo si se omite 3.2

Mitigado en código Dig (3.2). Histórico: sin reenvío, el banco Dig no veía esos campos cuando el caller los mandaba — distinto a prod.

## Enlaces

- Gaps: [`07-fase1-gaps-r2p-vs-espejo-vcn.md`](./07-fase1-gaps-r2p-vs-espejo-vcn.md) (G2 reformulado)
- Orden: [`11-fase2-orden-fixes.md`](./11-fase2-orden-fixes.md)
- Contrato proxy: [`06-contrato-producto-validador-proxy.md`](./06-contrato-producto-validador-proxy.md)
