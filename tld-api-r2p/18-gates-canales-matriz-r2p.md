# Gates Dig — canales, path MATRIZ y mínimo R2P

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-16 |
| Fuentes | [`../Postman/canalesPruebas-dev/`](../Postman/canalesPruebas-dev/), env VCN `generador/entornos/VCN Escenarios error - desarrollo.postman_environment.json` |
| Estrategia | [`17-estrategia-newman-r2p-paridad-dig.md`](./17-estrategia-newman-r2p-paridad-dig.md) |

## Decisiones fijadas (usuario)

| Tema | Valor |
|------|--------|
| Nivel | **Solo `MATRIZ`** — como un canal llama al API Rest Autopista |
| Path HTTP | `END_POINT_TLD_MATRIZ` = `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/validador/validar` |
| Auth token | `MATRIZ_AUTH_TOKEN_URL` + apiKey/secret del env VCN (mismos admin o credenciales de canal emisor) |
| Ambición | Mínimo; no otros niveles (VALIDADOR / VCN directo) |
| Memoria | Recuperar contexto desde `second-brain/` (docs propias del agente) |

## Path / env (reutilizar patrón VCN)

Del environment VCN ya existe:

- `NIVEL_EJECUCION=MATRIZ`
- `END_POINT_TLD_MATRIZ` → `/dev/validador/validar`
- `MATRIZ_AUTH_TOKEN_URL`, `MATRIZ_API_KEY`, `MATRIZ_SECRET_KEY` (admin; escenarios suelen tokenizar con credenciales del **canal emisor**)

Suite R2P futura: environment propio (copia mínima del VCN) con `CANAL_EMISOR` / `CANAL_VALIDADOR` apuntando a pares R2P — **no** hace falta `END_POINT_TLD_VCN` para el happy path MATRIZ.

HD-005: bajo MATRIZ, HTTP transporte **200**; negocio en payload.

## Canales — qué hay hoy (export doc)

Ops R2P `0011`–`0014` presentes (estado **Y**) en varios GATO. Lo relevante para **notify banco** (0012/0014):

| idCanal | Swift | 0012/0014 `urlOperacion` | ¿Útil como validador R2P? |
|---------|-------|--------------------------|---------------------------|
| **1009** | ASTRGATO | `…dummy…/r2p` | **Sí** (dummy banco) |
| **1012** | TERAGATO | `…dummy…/r2p` | **Sí** (dummy; auth dinámico) |
| 1013 / 1015 | AMIY/ZONA | URL del **producto** `/dev/r2p` | **No** para rol banco (apunta a API R2P, no al dummy) |
| 1008 / 1011 | CELE/MIRA | `urlValidador` VPC `/validar` (VCN-ish); 0012/0014 vacíos | Mejor como **emisor**; no como banco R2P |
| 1018 | ARCH | ops `N` | Solo errores 482/418; no feliz |

Emisor feliz candidato (igual VCN): **1008 CELEGATO** — plan GATO, ops `0011`/`0013` en **Y**, CBC fijo, grupos validador+default.

**Par mínimo propuesto:**

```text
idCanal (emisor)  = 1008 (CELEGATO)
validador         = 1009 (ASTRGATO)   // o 1012 si se prefiere
bancoAcreedor     = CELEGATO          // debe = alias emisor (prod)
metodo            = 0011
```

Dummy: existe lambda R2P en `tld-validador-dummy` (`lambdas/r2p`). URL documentada en canales: `https://tld-validador-dummy.dev.telered.internal/r2p`.

Producto Dig R2P (referencia, no es el POST del canal):  
`https://pwkl4tl2lh-vpce-03ecbc47b37cc7965.execute-api.us-east-1.amazonaws.com/dev/r2p`  
En Dig refactor el hop canal→producto es vía validador-api **Invoke** (`LAMBDA_R2P`), no el canal pegándole a esa URL.

## Condiciones que **faltan o no están confirmadas** (pedir al usuario / VPN)

Sin esto no se puede afirmar que un `0011` feliz MATRIZ pase de punta a punta:

1. **Alias deudor en Dig** (`tld-alias-cuenta` o tabla que use R2P prod): identificador `^6\d{7}$`, **activo**, banco = alias del **validador** (p. ej. ASTRGATO).  
   En `second-brain` hay seed VCN (`datos-vcn-dummy`) pero **no** hay carpeta equivalente documentada para identificadores R2P.  
   → **¿Existe ya un celular/alias de prueba en Dig para deudor ASTRGATO/TERAGATO?** Si no, hay que crearlo (mínimo 1 fila).

2. **Deploy Dig** de la lambda R2P bajo prueba (prod-source vs cambios) + `tld-validador-api` con mapa `0011`/`0013` → `LAMBDA_R2P` apuntando a esa lambda.

3. **Proxy Dig** (`PROX_VAL_LAMBDA_NAME`) alcanzable y con permiso; dummy `/r2p` alcanzable desde el proxy (VPN).

4. Suite Postman R2P: **aún no existe** en `generador` / `run-newman.js` (solo p2m|p2p|vcn). Implementar = paso aparte tras OK.

5. Montos: rango env Dig `ACH_MONTON_*` (default 10–500) — usar p. ej. `100.00` en el mínimo.

## Qué **sí** alcanza con lo documentado

- Path MATRIZ y nivel de ejecución.
- Credenciales/canales GATO con ops R2P y dummy `/r2p` en 1009/1012.
- Evitar 1013/1015 como validador banco.
- Criterio de paridad prod-source vs cambios (estrategia 17).

## Próximo paso (cuando el usuario cierre el gate alias)

1. Confirmar identificador deudor (o crearlo).
2. OK para implementar **mínimo**: 1 escenario `0011` feliz MATRIZ (+ environment R2P delgado) en `Postman/generador` — sin suite tipo VCN.
3. Runs VPN: `--codigo-fuente prod` luego `dev` → `comparar-runs.js`.
