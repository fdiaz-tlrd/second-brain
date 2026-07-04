# Revisión canal **1008** (dev)

**Ambiente:** dev  
**Fecha inicio:** _______________  
**Ejecutado por:** _______________

Completa cada paso en orden. Anota **HTTP**, **body** (o lo esencial) y marca si pasó.

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
| Matriz | `BASE_MATRIZ` = _________________________________________________ |
| P2M | `BASE_P2M` = _________________________________________________ |
| P2P (alias) | `BASE_P2P` = _________________________________________________ |

**Token admin matriz** (solo pasos que piden admin — usuario con `tld-matriz-full` o equivalente):

| Campo | Valor |
|-------|--------|
| `apiKey` admin | _________________________________________________ |
| `secretKey` admin | _________________________________________________ |
| `accessToken` admin | _________________________________________________ |

---

## Parte 1 — Token del canal 1008

### Paso 1.1 — Obtener token

| Item | Valor |
|------|--------|
| **Método** | `POST {BASE_MATRIZ}/auth/token` |
| **Headers** | `Content-Type: application/json` |
| **Auth** | Ninguna |

**Request**

```json
{
  "apiKey": "6e37a4a0b884f305b1a2b59f915a707598a8f0795",
  "secretKey": "<secretKey del canal 1008>"
}
```

**Resultado**

| Campo | Anotar |
|-------|--------|
| HTTP | |
| `accessToken` | |
| `expiresIn` | |
| `refreshToken` | *(opcional)* |
| `codigoError` / `descripcionError` | *(si falla)* |

**¿OK?** [ ] Sí [ ] No

**Notas:**

```




```

---

### Paso 1.2 — Grupos en el JWT (canal 1008)

Decodifica el `accessToken` (jwt.io o similar) y anota `cognito:groups`:

**Grupos encontrados:**

```
- 
- 
```

**¿Tiene al menos un grupo además de `tld-matriz-default`?** [ ] Sí [ ] No

**¿Qué API quieres probar?** [ ] P2M [ ] P2P [ ] Matriz admin [ ] Otro: _______

**Grupo que deberías tener** (según paso 2.1): _________________________________________________

**Notas:**

```




```

---

## Parte 2 — Grupos Cognito (`GroupId`)

> Pasos 2.1 y 2.3 suelen requerir **token admin**. El paso 2.2 usa credenciales del canal 1008.

### Paso 2.1 — Listar grupos disponibles (políticas)

| Item | Valor |
|------|--------|
| **Método** | `POST {BASE_MATRIZ}/auth/planes` |
| **Headers** | `Content-Type: application/json`, `Authorization: Bearer <accessToken admin>` |

**Request**

```json
{
  "tipoAccion": "consultarPoliticas"
}
```

**Resultado**

| Campo | Anotar |
|-------|--------|
| HTTP | |
| `data` (lista de grupos) | |

```
Grupos listados:




```

**¿OK?** [ ] Sí [ ] No

---

### Paso 2.2 — (Opcional) Asignar grupo al canal 1008

Solo si en 1.2 faltaba el grupo para la API que vas a probar.

| Item | Valor |
|------|--------|
| **Método** | `POST {BASE_MATRIZ}/auth/grupos-api-key` |
| **Headers** | `Content-Type: application/json`, `Authorization: Bearer <accessToken admin>` |

**Request** — ajusta `GroupId` según 2.1 (ej. P2M → `tld-api-p2m`)

```json
{
  "apiKey": "6e37a4a0b884f305b1a2b59f915a707598a8f0795",
  "GroupId": ["________________"],
  "accion": "alta",
  "idCanal": "1008"
}
```

**Resultado**

| Campo | Anotar |
|-------|--------|
| HTTP | |
| `result` | |

**¿OK?** [ ] Sí [ ] No [ ] Omitido (ya tenía grupo)

**Notas:**

```




```

---

### Paso 2.3 — Repetir token canal (si hiciste 2.2)

Vuelve al **Paso 1.1** y anota los grupos nuevos en **1.2**.

**Grupos tras el alta:**

```
- 
```

---

## Parte 3 — Plan de suscripción (matriz)

### Paso 3.1 — Listar planes (admin)

| Item | Valor |
|------|--------|
| **Método** | `POST {BASE_MATRIZ}/auth/planes` |
| **Headers** | Bearer admin |

**Request**

```json
{
  "tipoAccion": "consultarPlanes"
}
```

**Resultado — anota `idPlan` candidato y cupo `request`:**

| `idPlan` | `namePlan` | `request` (cupo) |
|----------|------------|------------------|
| | | |

**¿OK?** [ ] Sí [ ] No

---

### Paso 3.2 — ¿Canal 1008 tiene suscripción activa?

Revisa en **DynamoDB** tabla `tld-matriz-planes-canales` filtro `idCanal = 1008`, o infiere con el paso 4.2.

| Campo | Anotar |
|-------|--------|
| ¿Existe fila plan–canal? | [ ] Sí [ ] No |
| `idPlan` | |
| `exitoso` | |
| `fallido` | |
| `bloqueado` | |
| `fechaFin` | |
| `estatus` | |

**Si no hay suscripción** — con token admin, `agregarPlanCanal`:

```json
{
  "tipoAccion": "agregarPlanCanal",
  "idPlan": "<idPlan>",
  "idCanal": "1008",
  "accion": "alta"
}
```

**Resultado alta plan–canal:**

| HTTP | Body / error |
|------|----------------|
| | |

**¿OK?** [ ] Sí [ ] No [ ] Ya existía

**Notas:**

```




```

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
| 1. Token canal 1008 | [ ] OK [ ] Falla |
| 2. Grupos Cognito | [ ] OK [ ] Falta grupo [ ] Omitido |
| 3. Plan / suscripción | [ ] OK [ ] Sin plan [ ] Cupo agotado |
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
