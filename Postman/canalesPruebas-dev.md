# Canales de prueba — dev

**Ambiente:** dev  
**Actualizado:** 2026-07-04

Datos maquinables: [`canalesPruebas-dev.json`](./canalesPruebas-dev.json)

---

## URLs

| Servicio | URL |
|----------|-----|
| Matriz (base) | `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev` |
| Matriz token | `.../auth/token` |
| Matriz planes | `.../auth/planes` |
| Matriz grupos | `.../auth/grupos-api-key` |
| Validador API | `https://tld-api-validador.dev.telered.internal/validar` |
| Validador VPC | `https://wy8lh27jyb-vpce-03ecbc47b37cc7965.execute-api.us-east-1.amazonaws.com/dev/validar` |
| VCN | `https://kgkis7ekbj-vpce-03ecbc47b37cc7965.execute-api.us-east-1.amazonaws.com/dev/cuenta-nombre` |
| P2P | `https://tld-api-alias.dev.telered.internal/procesar` |
| P2M | `https://tld-api-p2m.dev.telered.internal/p2m` |
| R2P | `https://pwkl4tl2lh-vpce-03ecbc47b37cc7965.execute-api.us-east-1.amazonaws.com/dev/r2p` |

---

## Admin matriz

POST `.../auth/token`

```json
{
  "apiKey": "c4481f99364a45d1843c475a728894a5",
  "secretKey": "6bc9d69a676d9f869ab438c5369ec16388b8b7da6f3ddf"
}
```

---

## Plan dev compartido

| Campo | Valor |
|-------|--------|
| `idPlan` | `d5223ccbba94805594e7aa16bdf21f82aabfa7afd` |
| `namePlan` | Plan dev GATO |
| `planType` | mensual |
| `request` | 999999 |
| `estatus` (catálogo) | activo |

Alta del plan:

```json
{
  "tipoAccion": "agregarPlan",
  "namePlan": "Plan dev GATO",
  "planType": "mensual",
  "request": 999999,
  "accion": "alta"
}
```

Alta canal ↔ plan:

```json
{
  "tipoAccion": "agregarPlanCanal",
  "idPlan": "d5223ccbba94805594e7aa16bdf21f82aabfa7afd",
  "idCanal": "<idCanal>",
  "accion": "alta"
}
```

Asignar grupo validador:

POST `.../auth/grupos-api-key` (Bearer admin)

```json
{
  "apiKey": "<apiKey del canal>",
  "GroupId": ["tld-matriz-validador"],
  "accion": "alta",
  "idCanal": "<idCanal>"
}
```

Tras el alta, repetir token del canal y comprobar `cognito:groups` en el JWT (jwt.io). Los canales GATO usan `tld-matriz-validador` + `tld-matriz-default` para enrutar vía validador hacia VCN, P2P, R2P y P2M.

`planType` al crear plan: `semanal` | `quincenal` | `mensual` | `trimestral` | `semestral` | `anual`

---

## Políticas dev

POST `.../auth/planes` (Bearer admin)

```json
{
  "tipoAccion": "consultarPoliticas"
}
```

Lista en dev (2026-07-04): ver `politicasDev` en [`canalesPruebas-dev.json`](./canalesPruebas-dev.json). Grupo relevante para canales de prueba: `tld-matriz-validador`.

---

## Resumen por canal

Grupos: token del canal → `cognito:groups` en el JWT.

| idCanal | Swift | AES | Auth validador | Plan GATO | Grupos JWT |
|---------|-------|-----|----------------|-----------|------------|
| 1008 | CELEGATO | cbc | fijo | sí (`fallido: 1`) | validador + default |
| 1009 | ASTRGATO | cbc | fijo | sí | validador + default |
| 1011 | MIRAGATO | cbc | dinámico | sí | validador + default |
| 1012 | TERAGATO | cbc | dinámico | sí | validador + default |
| 1013 | AMIYGATO | gcm | fijo | sí | validador + default |
| 1014 | CORNGATO | gcm | fijo | **no** | sin registrar |
| 1015 | ZONAGATO | gcm | dinámico | sí | validador + default |
| 1016 | BELLGATO | gcm | dinámico | sí | validador + default |
| 1017 | TEYVGATO | — | fijo | **no** | sin credenciales matriz |
| 1018 | ARCHGATO | gcm | fijo | sí | validador + default |

**1018 ARCHGATO** — canal de referencia **sin método/operación**: `urlValidador` vacío y **sin filas** en `tld-validador-canal-operacion` (a diferencia de 1009, 1012, 1013, 1015, que llevan `urlOperacion` en operaciones concretas).

En Dynamo, suscripciones plan–canal pueden figurar `estatus: inactivo`; `control-plan` valida por existencia de fila.

---

## Token por canal

POST `.../auth/token`

**1008 CELEGATO**

```json
{
  "apiKey": "6e37a4a0b884f305b1a2b59f915a707598a8f0795",
  "secretKey": "f07Rqvss1tv2cG2e3k23l8T868gae1gisE1jVLeA54rH6ea1b4q2SbtHS5e9BA9Ba8886d873ucG79iR2njKb7"
}
```

**1009 ASTRGATO**

```json
{
  "apiKey": "9bdec973bab42c65a4c628873d4f33349aad9a738",
  "secretKey": "ppsgvdf01t2a102e4b73la58vadae4M5J3i29i1iU4rQg846meD91DVfK5eb9bB8B9986dei9kE8PRkCm5AbuA"
}
```

**1011 MIRAGATO**

```json
{
  "apiKey": "fd1973be9bb4e2d59bd5b92b740b7dc0ba913a4c2",
  "secretKey": "63hcaArR1tkPep2e1pT3lBJ8tBaAe2cp8nGu1L3tF4r5kn9p2kprTqlf45e888988Aaa6dC8upS1r9o7p7hotC"
}
```

**1012 TERAGATO**

```json
{
  "apiKey": "4979e66f8b942af5a6f1089c28d1e1d7bbac472f4",
  "secretKey": "74st4gd41tvfeR2e5et3l9aB99jAe7umV3V8qlq6I4r0edGb9N65LMg2v5e8Abaa88986d5k4faipEnn5l37h9"
}
```

**1013 AMIYGATO**

```json
{
  "apiKey": "38932615b8a4f54589ce3b81db024112aab1f1213",
  "secretKey": "Mnr4bd971t31uD2e4L73l879nBuAe17A1EhIU26CB4rUfHnBhq86fk7Ff5e9b99898ba6dnjsniRou910shRt4"
}
```

**1014 CORNGATO**

```json
{
  "apiKey": "2770bdacb89453a59f4207f67113e26dbbadc3355",
  "secretKey": "1991Lcsb1t20Hr2e7gr3l8192a8aedisovIP23Lhi4r4jS79pA0Kqh41a5e98B99bba96d2L7QpibjLa27aqSU"
}
```

**1015 ZONAGATO**

```json
{
  "apiKey": "052bbfc9988439c5afd1daff99fb9fc5aab873b0a",
  "secretKey": "nj4b73Ot1tDG792ejR43lao9oAf9e1vM6V9Mf36514rjso3vlp86cu78I5ea9A8b99986d3umn31Ccm0CF66g8"
}
```

**1016 BELLGATO**

```json
{
  "apiKey": "f59f2732bab4fbd5b8d53c1b2e52f9288ba8a8f69",
  "secretKey": "V02vpr4b1t12Bl2eUDd3l8bAOaq9eCj4trslkb5sI4rh5k48i8celo7Dd5ebb999999b6d5eue74volh9clj1H"
}
```

**1018 ARCHGATO** (sin operaciones en validador)

```json
{
  "apiKey": "bd3b2952b8846875818f392fe92a0ea0ba992fe55",
  "secretKey": "mAnDudle1tMlaG2eQK73lavb1bk9edBem58dLePVb4rfi95oi9hfvhO6B5eabbbB898a6dDRc34k72qqVciJqs"
}
```

---

## Llave descifrado común (validador)

`mrk-fab483954956476787608d9e5eee2c97`

Detalle por canal: [`canalesPruebas-dev.json`](./canalesPruebas-dev.json)

---

## Síntomas frecuentes

| Síntoma | Revisar |
|---------|---------|
| Token 400/550 | `apiKey` / `secretKey` del canal |
| 403 en matriz | Grupos del JWT; política en `tld-auth-politicas` |
| 403 plan inválido en P2M/P2P | Fila en `tld-matriz-planes-canales`; cupo; `CFG_VALIDAR_PLAN_POR_CANAL` |
| Canal emisor no existe | Fila en `tld-validador-canal` |
| Error descifrado | CBC vs GCM; certificado; llaves EFS |

Onboarding completo de canal nuevo: [`tld-matriz/03-auth-canal-api-key-grupos.md`](../tld-matriz/03-auth-canal-api-key-grupos.md). Validación plan en runtime: [`tld-matriz/02-validacion-plan-runtime.md`](../tld-matriz/02-validacion-plan-runtime.md).
