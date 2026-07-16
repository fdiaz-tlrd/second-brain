# Estudio — `api_7.json` (marketplace R2P) vs producción real

| Campo | Valor |
|-------|-------|
| Fecha | 2026-07-15 |
| Doc marketplace | `produccion_real/telered_content_mktpl/tech_doc/api_7.json` (OpenAPI 3.0.0) |
| Título doc | MARKETPLACE TELERED - API PARA REQUEST TO PAY (R2P) |
| Ancla verdad | Código en `produccion_real/` (matriz, validador-api, `tld-api-r2p`) |
| Advertencia | La doc **no es del todo cierta**. Usarla solo como **contexto**. **No** arreglar `api_7` / Marketplace en este hilo (sería mejora nueva; usuario 2026-07-16). Verdad de pruebas = prod código + paridad Dig ([`17`](./17-estrategia-newman-r2p-paridad-dig.md)). |

## Principio de uso

| Fuente | Rol |
|--------|-----|
| `api_7.json` | Vocabulario métodos 0011–0014, envelope cifrado, catálogo orientativo |
| Prod R2P / matriz / validador-api | **Verdad** de validaciones, códigos, remap, campos reales, límites |
| Dig R2P (ya asegurado) | Mismo negocio; transporte Invoke/proxy — escenarios Newman deben afirmar **negocio**, no el transporte HTTP prod |

---

## A. Qué documenta `api_7`

### Tags / secciones

Estructura general P2P/P2M · Glosario · Proceso de validación · Requisitos · Autorización · Cifrado · R2P · Diagramas servicio · Métodos · Canal · Canal validador · Razones de respuestas · Escenarios de error.

### Paths documentados (OJO: no son 4 APIs HTTP de R2P)

| Path en OpenAPI | Tag | Significado real |
|-----------------|-----|------------------|
| `/validador/validar` | (general) | **Única** entrada pública típica del cliente vía Autopista/matriz |
| `/0011` | CANAL | Método **dentro** de `peticion` cifrada (emisor → Autopista) |
| `/0013` | CANAL | Método en `peticion` (actualizar estado) |
| `/0012` | CANAL VALIDADOR | Payload que Autopista **envía al banco** tras `0011` (remap) |
| `/0014` | CANAL VALIDADOR | Payload al banco tras `0013` (remap) |

Schemas: `RequestValidador`, `ResponseDefault_Validador`, y pares Request/Response200/400 para 0011–0014.

### Envelope documentado (`RequestValidador`)

**Required:** `idCanal`, `validador`, `peticion` (string cifrado `iv.secreto.cifrado`).

**Omitidos en la doc (y sí existen en el flujo prod):** `idTransaccionAutopista`, `fechaHora` — los **genera matriz** y viajan por pass-through. Estudio: [`12`](./12-estudio-idTransaccionAutopista-fechaHora-flujo-prod.md).

### Cifrado (doc)

AES-256-CBC + RSA 4096/SHA256; `peticion`/`respuesta` en tres partes hex separadas por `.`.

### Métodos — campos `parametros` (según doc)

#### `0011` Solicitar acreedor R2P (CANAL)

| Campo doc | Notas doc |
|-----------|-----------|
| `identificador` | celular/alias |
| `monto` | string |
| `bancoAcreedor` | SWIFT acreedor |
| `cuentaDeudor` / `cuentaAcreedor` | cuentas |
| `nombreDeudor` | doc lo nombra así |
| `notaAcreedor` | comentario |

Respuesta 200: `datos.codigoR2P` (prefijo `R2P`, ≤32), más eco de campos.

#### `0013` Estado A/R/C (CANAL)

| Campo doc | Notas |
|-----------|-------|
| `identificador` | documentado |
| `codigoR2P` | hash Autopista |
| `estado` | `A` / `R` / `C` |

#### `0012` (CANAL VALIDADOR)

Misma familia de campos que `0011` **más** `codigoR2P` (el de la respuesta 0011).

#### `0014` (CANAL VALIDADOR)

`identificador`, `codigoR2P`, `estado` — espejo de notify de `0013`.

### Catálogo / escenarios (doc, orientativo)

Códigos citados en tags: 0, 400, 401, 404, 405, 409, 413, 418, 419, 425, 500, 504, 509, 599, 999 y tablas de escenarios 0011/0013 (418, 419, 409, 434, 432, 433, 413, 437, 439, 442, 441, 425, 435, 440, …).

**No tratar el catálogo HTML como lista cerrada ni 1:1 con prod** — ver § D.

---

## B. Qué hace producción (verdad)

### Flujo

```text
Canal consumidor
  → tld-matriz / tld-validador-validar   (+ idTransaccionAutopista, fechaHora)
  → tld-validador-api / validar          (body entero; descifra; rutea por metodo)
  → tld-api-r2p / r2p                    (negocio; remap; Dynamo)
  → Canal Validador Externo              (método 0012 o 0014)
```

### Quién habla qué método

| Método | Quién lo “dispara” | Quién lo recibe |
|--------|--------------------|-----------------|
| `0011` | Canal emisor → Autopista | R2P procesa; luego **remapea** a `0012` hacia banco |
| `0013` | Canal emisor → Autopista | R2P procesa; luego **remapea** a `0014` hacia banco |
| `0012` / `0014` | **R2P** (no el cliente vía path OpenAPI) | Banco / canal validador |

Evidencia remap: `produccion_real/tld-api-r2p/lambdas/r2p/app.js` (`bodyPeticion.metodo = '0012'|'0014'`).

### Límites

`metodosLimites`: `"0011": 1`, `"0013": 1` en R2P prod `app.js`.

### Validaciones prod relevantes (vs doc)

Fuente: `produccion_real/tld-api-r2p/lambdas/r2p/lib/util.js` + `app.js` + `lib/r2p.js`.

| Tema | Prod |
|------|------|
| `idSolicitud` | `^[A-Za-z0-9]{1,64}$` — **sin guiones** (doc sugiere guiones) |
| `identificador` (0011) | obligatorio; formato `^6\d{7}$` → 419 / 409 |
| `monto` | rango env `ACH_MONTON_MIN`/`MAX` (default **10.00–500.00**) → 432 |
| `bancoAcreedor` | debe = `canal.alias` emisor → 433 |
| cuentas | regex `^[0-9]{1,34}$` → 413 |
| Nombre | **`nombreAcreedor`** obligatorio → **437** (doc dice `nombreDeudor`) |
| Ops notify | sin `0012` en validador → **435**; sin `0014` en emisor → **438** |
| `0013` estado | `A`/`R`/`C`; Dynamo por `codigoR2P`; ya no `S` → **441**; no existe → **442** |
| `idPeticion` | prefijo alias emisor + dígitos (`util.validarParametroIdPeticion`) |

### Dynamo

Create `0011`: `id = "R2P" + …` (32), estado inicial `"S"`. Update `0013`: cambia `estado`.

---

## C. Gaps doc ↔ prod (impacto pruebas)

| Doc dice | Prod hace | Impacto Newman |
|----------|-----------|----------------|
| Envelope solo 3 campos | Matriz añade `idTransaccionAutopista` / `fechaHora` | Incluir en escenarios de envelope; no exigirlos en schema OpenAPI |
| Paths `/0011`…`/0014` | Métodos en `peticion`; 0012/0014 son remap | **Un** endpoint público (`/validador/validar` o Dig equivalente); variar `metodo` |
| `nombreDeudor` | `nombreAcreedor` | Payload de prueba con **nombreAcreedor** |
| `idSolicitud` con guiones | Sin guiones | No usar guiones en happy path |
| Cuentas mín. 5 (catálogo) | 1–34 dígitos | Expectativas de longitud según prod |
| `monto` libre | 10–500 default | Evitar ejemplos fuera de rango |
| `0013` exige `identificador` en schema | R2P no lo valida en update | No asertar rechazo solo por falta de identificador en 0013 |
| Catálogo sin destacar `438` | Emisor sin op `0014` → 438 | Escenario de config si hay datos |
| Fallos estado → a veces `443` en util | `app.js` empuja **439** en rama validación estado | Aserciones según respuesta R2P real |

---

## D. Escenarios — ver estrategia Newman (reencuadre 2026-07-16)

La lista larga de “sencillos” del borrador inicial **ya no es el backlog**.

- Meta real: paridad Dig **prod-source** vs **cambios** con set **mínimo** — [`17-estrategia-newman-r2p-paridad-dig.md`](./17-estrategia-newman-r2p-paridad-dig.md).
- Diseño corto: [`16`](./16-escenarios-simples-newman-diseno.md).
- Gaps de esta doc marketplace: **conocidos**; **no** se corrigen aquí.

---

## E. Enlaces

- Envelope autopista: [`12`](./12-estudio-idTransaccionAutopista-fechaHora-flujo-prod.md)
- Flujo prod + tld-util: [`08-prod-real-flujo-r2p-y-tld-util.md`](./08-prod-real-flujo-r2p-y-tld-util.md)
- Lista viva escenarios: [`16`](./16-escenarios-simples-newman-diseno.md) · estrategia: [`17`](./17-estrategia-newman-r2p-paridad-dig.md)
- Retomo: [`00-estado-y-retomo.md`](./00-estado-y-retomo.md)
