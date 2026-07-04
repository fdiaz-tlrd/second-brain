# Revisión canal **1008** (dev)

**Ambiente:** dev

---

## Estado actual (2026-07-04)

**Hecho con el 1008:**

- [x] Canal creado en matriz (`tld-auth-canal`)
- [x] `apiKey` + `secretKey` generados
- [x] Token del canal obtenido (Paso 1.1)
- [x] Grupo `tld-matriz-validador` asignado (Paso 2.2)

**Pendiente:**

- [ ] **Suscripción plan ↔ canal** — respuesta: **NO** (no hay fila en `tld-matriz-planes-canales` para `idCanal=1008`)
- [ ] Pasos **A → B (si hace falta) → C** abajo

Crear canal y credenciales **no** incluye plan. Eso es aparte en `/auth/planes`.

---
## Datos de referencia — canal 1008

| Campo | Valor |
|-------|--------|
| `idCanal` / `canal` | `1008` |
| Swift / empresa | `CELEGATO` |
| `nombreCanal` | Celestia Financial Holding |
| `correo` | fdiaz@telered.com.pa |
| `apiKey` | `6e37a4a0b884f305b1a2b59f915a707598a8f0795` |
| `secretKey` | *(en `Postman/canalesPruebas-dev.json` — no pegar aquí si compartes el archivo)* |
| Validador — algoritmo | `aes-256-cbc` |
| Validador — token | Fijo |
| Validador — certificado | CA de confianza |

---

## URLs base (rellenar una vez)

| Servicio | URL base (sin `/` final) |
|----------|---------------------------|
| Matriz | `BASE_MATRIZ` = https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/ |
| VALIDADOR-API | `BASE_VALIDADOR_API` = https://tld-api-validador.dev.telered.internal/validar |
| VCN | `BASE_VCN` = https://kgkis7ekbj-vpce-03ecbc47b37cc7965.execute-api.us-east-1.amazonaws.com/dev/cuenta-nombre |
| P2P (alias) | `BASE_P2P` = https://tld-api-alias.dev.telered.internal/procesar |
| R2P | `BASE_P2P` = https://pwkl4tl2lh-vpce-03ecbc47b37cc7965.execute-api.us-east-1.amazonaws.com/dev/r2p |
| P2M | `BASE_P2M` = https://tld-api-p2m.dev.telered.internal/p2m |


**Token admin** — obtener con:

POST `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/auth/token`

```json
{
  "apiKey": "c4481f99364a45d1843c475a728894a5",
  "secretKey": "6bc9d69a676d9f869ab438c5369ec16388b8b7da6f3ddf"
}
```

`accessToken` admin (anotar si renuevas): *(pegado abajo en historial — expira; repite el JSON de arriba)*

---
## Parte 1 — Token del canal 1008

### Paso 1.1 — Obtener token

POST `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/auth/token`

```json
{
  "apiKey": "6e37a4a0b884f305b1a2b59f915a707598a8f0795",
  "secretKey": "<secretKey del canal 1008 — ver Postman/canalesPruebas-dev.json>"
}
```
**Resultado**

```json
{
    "accessToken": "eyJraWQiOiJWTjNkOHlqVGNIcmFOOUw3Wi9pTTlOeHBtZmxIdndlRjNTMlR0N0dnaDBZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyNDg4ZjQ0OC04MDYxLTcwMjYtMTE5Ny1lYzNlYjllYjNjZTgiLCJjb2duaXRvOmdyb3VwcyI6WyJ0bGQtbWF0cml6LWRlZmF1bHQiXSwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS91cy1lYXN0LTFfZDBJY1A0RVYyIiwiY2xpZW50X2lkIjoiN2NnNGc4dm9yaXJsaGVsZWJjcmlxbmo5NWEiLCJvcmlnaW5fanRpIjoiOTJlMmRkNmMtNGMwNi00Y2MwLWFkOTUtYWMxNGVhY2IyN2VkIiwiZXZlbnRfaWQiOiI3OTE4ODdhNy02NjY2LTQ4YzItOGMwNS1jMTExYjFhYTUwNGMiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzgzMjAzNjgzLCJleHAiOjE3ODMyMDcyODMsImlhdCI6MTc4MzIwMzY4MywianRpIjoiNjZlMTAyZGQtNjA1Yy00OWM5LWIxMDQtODc2ZDY2ZjVlODhiIiwidXNlcm5hbWUiOiI2ZTM3YTRhMGI4ODRmMzA1YjFhMmI1OWY5MTVhNzA3NTk4YThmMDc5NSJ9.cqWh7Tt4tn_pTG5G2I0kTUEGoc0AfyZLjQbIi8xJS9E44Y6Q3E-aeS39wqQ0xDJ7kyFV8Ngn4VFMUi_E6LQDYgheg7ehWRzOHT9Yf5t4XfdWZNjX6G7kICZSjat-HoFT4JfqEIQPismpARgu-h8kMlseQANh37WG-LO3ZOgKg6YQYj7QB7xay5jJmlnp3N9MrtT6gOVQtADt23VMWp9NlvHCrviiFu5zkQ2dnpx-RZ4becGPULfZAuNtZFkU817mPwxURP9HZch18RNjxmGrTGe3Xk_S5oIz2QHbDkkShtamSuofNG9RvT_qKTKRQH7XDG__cD-57RQrl1Z9qb4yBQ",
    "expiresIn": 3600,
    "refreshToken": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.Z0G9V6Ft8qbeTc1U_3C0wp28ClMql2eLHM9LLNxhb9ZQ3nzdS0VnUAk0Pqh-HY7qf-TETSBsik3ICF4n8_gMx7Dd6qpVwjaEaUhIhRNFQojQgKaJf81ZpgdtDqfp69iNzr3qaA3cxTVESPDHGsXULxxl8SiPXpHIp8WvIz4A0l1Ew_lp6T1gLqHi4ZcLC7lB8iZuCrN2Sl6lnEn8zIvwGyUS3H1OacKjdJAgJjAJngI6JDqge22tCfeQ6pmp02al6XZy0Yd5IHF4NpyyquSE1FpidEiVDnVtwjdaiGcl-G8JxNfVswZF_hZh5EuIDT-omXwyTj0JSGJB_yVLGmJ79Q.t1zuFuhNEbe9aNM-.EROtIua5BHdi-frEWSLWD16HzTQEk3AYFx68CPRBi2hrWQYjyqh5htouPsuy7Fw8E8U3a5AX8S5ZvsSIn44a-aiGZgYnJuE__Wr75hsCUANH6tZiVfACJ0L4LTjhhaS1zGPUfGEICZ2CCbqv7_HM6-9PZ4gFPS_H2gDSUKSXybk3vbJ6lOVIoveLyJsL1ifW-5SUKTTWRRdquxINjWVeSxMuBIZvy-990ARQ-3wbZJsmpZ7mOMla3_hTFknJxaZQv2a-KWVlrJShHqPUEV-UtU4w3dMw4aaGn8ArbKVGLuPZh8sda7CmSkVvUPlIIcSuugtmwRiUAo8PYuuPfRTg_TW1QoDQ_pMr3RQrbPA1zCpFEuL7IBy-PoFWpEi6A5yoPxSdL79KfQoevP4_PjQdmD2joftQMOXHvO1qEwYRkdSUkvJKQF6YUYceCRLwkH5nteDufFwQxQQ6_oP_9eg-zdhR5LxrWYCzXCapDxN71pS7lBwWQ0E0yANcANXuP1iEml2xGc1ebIF8afNnDMZaqUXsRsUmMuNhZ3rztzL3OBv18CuOGKvd5GRZTWQX6EQTLweoNbOYfxL8nfH-qtENNG-wOC4UiKlR-qfw0uCuRUkzONEMvrnoR6htEDh5-CsOmfxsBQ8gU-Ve1Anpc3N2n24MZ-uPY7rfgOQD-WR9C7mNqjDFsAaGWnArefq_uOSitcqQZlHCZISEqo2FT19MsfZC3MAAR1tz0cKg-Mc6iNOQGqLHjrpgNpu00rROACOMQX9AOW_jhOLp66y8ZO9NAqinDtvLsJkYfOM2KYAmTJDsDL4-Lvq_xAo81Aoh7BvoXSLLarSxIvBeatwbCTsrZaUJ2uqW31UGdQcyQUQeB3lPTDeHXbxjmmgtbbW_XTXGuvMBc04eSys2JxNkrDioWn0U61D65i4POuh1NkLWDrKWajyP0jCiagiZMrRXMaxQQB0CDKDh8jRQcv8536aHVWtqv-2MTiXRIF6-bUuRhgg6K5SeawLnBSG_EEmxbKhiFmp59CjylTGyTEf1Kh1NYm_0YF6uYa7jY1b441F0_d2zvVSYZAxTP4wmr7ZuhBBy1hXYc9aXQHSCU0Ti3XU8OYEdXKTxFEsMQQm0wjiL_fHpnRXu44wiMjDPjfpclUudVhr3Ydua6Jw57G679HOZPMUz4viZd27-Mi51Tn7m0MsyaD_AFxDU__wtui9E_52-sV2a3VWucR-lYovjXTlv5P3Wpn_x9QRbjPVVI-9W-MF0z7RdonmL77qAIjXdBygm3bo0hh0AjP7uViRMqLbuPttWAB395y6fsZH0XLZhFe-vU8LyqW91GDK5M54bbA.vB77LKrywmEuRR7AIcnzHA"
}
```

**¿OK?** [X] Sí [ ] No

**Notas:**

```




```

---

### Paso 1.2 — Grupos en el JWT (canal 1008)

Decodifica el `accessToken` con jwt.io:

- Decoded Header
```json
{
  "kid": "VN3d8yjTcHraN9L7Z/iM9NxpmflHvweF3S2Tt7Ggh0Y=",
  "alg": "RS256"
}
```
- Decoded Payload
```json
{
  "sub": "2488f448-8061-7026-1197-ec3eb9eb3ce8",
  "cognito:groups": [
    "tld-matriz-default"
  ],
  "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_d0IcP4EV2",
  "client_id": "7cg4g8vorirlhelebcriqnj95a",
  "origin_jti": "92e2dd6c-4c06-4cc0-ad95-ac14eacb27ed",
  "event_id": "791887a7-6666-48c2-8c05-c111b1aa504c",
  "token_use": "access",
  "scope": "aws.cognito.signin.user.admin",
  "auth_time": 1783203683,
  "exp": 1783207283,
  "iat": 1783203683,
  "jti": "66e102dd-605c-49c9-b104-876d66f5e88b",
  "username": "6e37a4a0b884f305b1a2b59f915a707598a8f0795"
}
```
- JWT Signature Verification
```json
{
  "e": "AQAB",
  "kty": "RSA",
  "n": "tmuooNMh1CAizABjcEd4kmoYU4WUwH_FzGyJJS8ljophH6eCr9VKf4KZAuzwLZAob6drhMmuyeSGKqQsKLbcnuyrMvwYHj_6PyU9eCurRSLOUXIuPUn7Im8Q84oJvlNi9uNLIRgdRJjI5OuRnizpjnI5cVGdOxkMQc9BE9h8qZ5MoExaGOWnumiq9T1hi7TU8Cndduao8gDGQxdXs8DyA4g98JR1BDIdpR6WB1I-QcHzHv6vId7GYmxyczQVcNS3NN_xKujyXGt_c_6XUE44346XLEHyOfLUSHkb4XqygU-HBQs02eS14kgX7MkBi_6uy4mrxT8C3On4QCE0xo-X4Q"
}
```

**¿Tiene al menos un grupo además de `tld-matriz-default`?** [X] Sí [ ] No

**¿Qué API quieres probar?** [ ] P2M [ ] P2P [ ] Matriz admin [ ] Otro: _______ [X] No quiero probar API

**Grupo que deberías tener** (según paso 2.1): "tld-matriz-validador"

**Notas:**

```
tld-matriz llama a tld-validador-api. Y este enruta a VCN, P2P, R2P y P2M
El grupo que tiene que tener es `tld-matriz-validador`
```

---

## Parte 2 — Grupos Cognito (`GroupId`)

> Pasos 2.1 y 2.3 suelen requerir **token admin**. El paso 2.2 usa credenciales del canal 1008.

### Paso 2.1 — Listar grupos disponibles (políticas)

POST `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/auth/planes`  
Header: `Authorization: Bearer <accessToken admin>`

```json
{
  "tipoAccion": "consultarPoliticas"
}
```
**Resultado**

```json
{
    "statusCode": 200,
    "data": [
        "tld-matriz-grupos-api-key",
        "tld-matriz-consulta-facturador",
        "tld-matriz-registro-tarjeta",
        "tld-matriz-gestion-retiro",
        "tld-matriz-datos-facturadores",
        "tld-tsp-clave",
        "tld-matriz-compra",
        "tld-matriz-generar-api-key",
        "tld-matriz-planes",
        "tld-matriz-validador",
        "tld-matriz-card-block-active",
        "tld-matriz-saldo-tarjeta",
        "tld-matriz-card-block-geo",
        "tld-matriz-crear-canal",
        "tld-matriz-generacion-retiro",
        "tld-matriz-pago-facturador",
        "tld-tokenizacion"
    ]
}
```

**¿OK?** [X] Sí [ ] No

---

### Paso 2.2 — Asignar grupo al canal 1008

POST `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/auth/grupos-api-key`  
Header: `Authorization: Bearer <accessToken admin>`

```json
{
  "apiKey": "6e37a4a0b884f305b1a2b59f915a707598a8f0795",
  "GroupId": ["tld-matriz-validador"],
  "accion": "alta",
  "idCanal": "1008"
}
```
**Resultado**

```json
{
    "result": [
        {
            "statusCode": 200,
            "message": "Grupo tld-matriz-validador asignado satisfactoriamente"
        }
    ]
}
```

**¿OK?** [X] Sí [ ] No [ ] Omitido (ya tenía grupo)

**Notas:**

```




```

---

### Paso 2.3 — Repetir token canal (si hiciste 2.2)

Vuelve al **Paso 1.1** y anota los grupos nuevos en **1.2**.

**Grupos tras el alta:**

```
(vuelve a ejecutar Paso 1.1 y decodifica el JWT — debe aparecer tld-matriz-validador)
```

---

## Pendiente — plan para canal 1008

**Suscripción activa:** NO — hay que ejecutar los pasos de abajo.

POST `https://srmi7w9bwi.execute-api.us-east-1.amazonaws.com/dev/auth/planes`  
Header: `Authorization: Bearer <accessToken admin>`
---

### Paso A — ¿Hay algún plan en catálogo?

```json
{
  "tipoAccion": "consultarPlanes"
}
```

Si hay planes → copia un `idPlan` de la respuesta y ve al **Paso C**. Si la lista viene vacía → **Paso B**.

**Resultado (pega respuesta):**

```json
{
    "statusCode": 200,
    "data": [
        {
            "planType": "semanal",
            "fechaHora": "2023-01-02 01:01:24",
            "status": "activo",
            "request": "5000",
            "idPlan": "2866a90199a4ffa598361a9975046a1b98bea9cfb",
            "namePlan": "NUEVO TEST"
        },
        {
            "planType": "semanal",
            "fechaHora": "2022-09-29 03:30:11",
            "status": "inactivo",
            "request": "5000",
            "idPlan": "47df9d6b8a844cb5a5a82e0d9489be85b89ae2eb8",
            "namePlan": "test"
        },
        {
            "planType": "anual",
            "fechaHora": "2022-10-11 01:22:17",
            "status": "activo",
            "request": "5990",
            "idPlan": "224b291498a4fe0584e8ba89f3529cf2a8b349391",
            "namePlan": "nombre de plan"
        },
        {
            "planType": "semanal",
            "fechaHora": "2022-10-07 02:15:05",
            "status": "activo",
            "request": "5000",
            "idPlan": "4e5ebf5ab8b42425bd21b93d3727095a8b93342df",
            "namePlan": "test"
        },
        {
            "planType": "anual",
            "fechaHora": "2022-10-11 01:22:08",
            "status": "activo",
            "request": "3990",
            "idPlan": "21bb8c07b894050589acc7ce4894b9d599951fe7e",
            "namePlan": "nombre de plan"
        },
        {
            "planType": "anual",
            "fechaHora": "2022-10-11 01:22:54",
            "status": "inactivo",
            "request": "6990",
            "idPlan": "3bc33f5baa94fdd5b349d66c66193b36b8b216347",
            "namePlan": "nombre de plan"
        },
        {
            "planType": "semanal",
            "fechaHora": "2022-09-30 01:18:51",
            "status": "activo",
            "request": "5000",
            "idPlan": "b3dad9c1b984e7659de138bf84073f60999f95f37",
            "namePlan": "test"
        },
        {
            "planType": "semanal",
            "fechaHora": "2022-10-14 02:28:03",
            "status": "activo",
            "request": "9999",
            "idPlan": "2b9fa9ef89b4160594584df0d9ed8a8c9bb7894dd",
            "namePlan": "nombre de plan ejemplo"
        },
        {
            "planType": "semanal",
            "fechaHora": "2022-10-05 03:20:00",
            "status": "activo",
            "request": "5000",
            "idPlan": "32f67caf9884d6f5a71b03c6f7904244b9a7b81f0",
            "namePlan": "test"
        },
        {
            "planType": "semanal",
            "fechaHora": "2022-09-28 10:59:39",
            "status": "activo",
            "request": "4999",
            "idPlan": "a5310c4baab4d2c5b74a940dcfee4e42baa4a7137",
            "namePlan": "test"
        },
        {
            "planType": "mensual",
            "fechaHora": "2022-10-05 08:44:18",
            "status": "activo",
            "request": "10000",
            "idPlan": "f83ca67b899486e5803bd419044388cfa89a99699",
            "namePlan": "test"
        },
        {
            "planType": "anual",
            "fechaHora": "2022-10-11 01:13:44",
            "status": "activo",
            "request": "3990",
            "idPlan": "4dc97aeca9a48ab585f48871d635c3b0a89cc737b",
            "namePlan": "test"
        },
        {
            "planType": "semanal",
            "fechaHora": "2022-10-14 02:28:03",
            "status": "activo",
            "request": "8888",
            "idPlan": "2b9fa9ef89b4160594584df0d1ed8a1c1bb7894dd",
            "namePlan": "nombre de plan ejemplo1"
        },
        {
            "planType": "anual",
            "fechaHora": "2022-10-11 01:20:32",
            "status": "activo",
            "request": "3990",
            "idPlan": "08a5b6b8bab42a9585fab5f6861f782a89ad8047b",
            "namePlan": "test"
        },
        {
            "planType": "semanal",
            "fechaHora": "2022-09-30 01:16:24",
            "status": "activo",
            "request": "5000",
            "idPlan": "9dc927f099a46555bc01eaa4eeb47e99b9b486905",
            "namePlan": "test"
        },
        {
            "planType": "semanal",
            "fechaHora": "2023-01-03 05:53:06",
            "status": "activo",
            "request": "5000",
            "idPlan": "433aa2b28bb44c95a7ecfc564f4c18e089aa3a364",
            "namePlan": "NUEVO TEST"
        },
        {
            "planType": "semanal",
            "fechaHora": "2022-10-07 09:26:09",
            "status": "activo",
            "request": "5000",
            "idPlan": "c287707f98a4cb15b6517acd875df03d9a8e8e4b9",
            "namePlan": "test"
        }
    ]
}
```
---

### Paso B — (Solo si no hay planes) Crear uno de prueba

```json
{
  "tipoAccion": "agregarPlan",
  "namePlan": "Plan dev GATO",
  "planType": "mensual",
  "request": 999999,
  "accion": "alta"
}
```

`planType`: `semanal` | `quincenal` | `mensual` | `trimestral` | `semestral` | `anual`

**Resultado (pega respuesta — anota `idPlan`):**

```json
{
    "statusCode": 200,
    "message": "Plan creado de forma exitosa"
}
```
---

### Paso C — Suscribir el canal 1008 al plan

```json
{
  "tipoAccion": "agregarPlanCanal",
  "idPlan": "d5223ccbba94805594e7aa16bdf21f82aabfa7afd",
  "idCanal": "1008",
  "accion": "alta"
}
```

**Resultado (pega respuesta):**

```json
{
    "statusCode": 200,
    "message": "Plan-Canal creado de forma exitosa"
}
```
---

### Paso D — Comprobar (opcional, DynamoDB)

Tabla **`tld-matriz-planes-canales`**, filtro **`idCanal = 1008`**.

| Campo | Valor |
|-------|--------|
| idPlan | |
| exitoso | (debe ser 0 al inicio) |
| fallido | |
| fechaFin | |

Con fila presente y contadores en 0, **`validar` debería permitir** transacciones hasta agotar `request`.

---

## Parte 3 — Suscripción plan (referencia)

**¿Canal 1008 tiene suscripción activa?** **NO** — confirmado. Siguiente acción: sección **Pendiente — plan** (pasos A, B, C).

---

## Parte 4 — Validación de plan en transacción (P2M o P2P)

> Confirma que el deploy tenga `CFG_VALIDAR_PLAN_POR_CANAL=1` si esperas rechazo sin plan.

### Paso 4.1 — Token canal 1008 (si expiró)

`accessToken` usado: _________________________________________________

---

### Paso 4.2 — Llamada mínima a la API con `idCanal: 1008`

Elige **una** API:

**Opción A — P2M**

| Item | Valor |
|------|--------|
| **Método** | `POST {BASE_P2M}/procesar` |
| **Headers** | `Content-Type: application/json`, `Authorization: Bearer <token canal 1008>` |

**Opción B — P2P**

| Item | Valor |
|------|--------|
| **Método** | `POST {BASE_P2P}/procesar` |
| **Headers** | Igual |

**Body** — usa un escenario mínimo que ya tengas en Postman (método válido, petición cifrada para CELEGATO / 1008). No hace falta pegarlo entero; anota qué colección/request usaste:

**Request usado:** _________________________________________________

**Resultado**

| Campo | Anotar |
|-------|--------|
| HTTP API | |
| `codigoError` | |
| `mensajeError` / catálogo | |
| ¿Llegó a procesar método? | [ ] Sí [ ] No — cortó en peaje |

**Si rechazó en plan (403 / plan inválido):**

| ¿Esperado? | [ ] Sí (sin suscripción / cupo agotado) [ ] No (debería pasar) |
|------------|------------------------------------------------------------------|

**Notas:**

```




```

---

## Parte 5 — Validador (`tld-validador-canal`)

Config esperada para 1008:

| Campo | Esperado |
|-------|----------|
| Algoritmo | `aes-256-cbc` |
| Token | Fijo |
| Certificado | CA de confianza |

### Paso 5.1 — Revisión en DynamoDB

Tabla **`tld-validador-canal`** (o la que use tu stack), clave canal **`1008`** / empresa **`CELEGATO`**.

| Campo en BD | Valor encontrado | ¿Coincide? |
|-------------|------------------|------------|
| Algoritmo | | [ ] |
| Token | | [ ] |
| Certificado | | [ ] |

**Notas:**

```




```

---

## Parte 6 — Resumen final

| Bloque | Estado |
|--------|--------|
| 1. Token canal 1008 | [x] OK |
| 2. Grupos Cognito | [x] OK |
| 3. Plan / suscripción | [ ] **NO** — falta A/B/C |
| 4. API con idCanal 1008 | [ ] OK [ ] Falla plan [ ] Falla otro |
| 5. Validador | [ ] OK [ ] Desalineado [ ] No revisado |

**Problema principal (si hay):**

```




```

**Siguiente acción:**

```




```

---

## Checklist rápido — causa frecuente de fallo

| Síntoma | Revisar |
|---------|---------|
| Token 400/550 | apiKey/secretKey del 1008 |
| 403 en matriz | Grupos del JWT; política en `tld-auth-politicas` |
| 403 plan inválido en P2M/P2P | Suscripción en `tld-matriz-planes-canales`; cupo; `CFG_VALIDAR_PLAN_POR_CANAL` |
| Canal emisor no existe | Fila en `tld-validador-canal` / tablas validador P2M-P2P |
| Error descifrado | Algoritmo CBC vs GCM; certificado; llaves EFS |
