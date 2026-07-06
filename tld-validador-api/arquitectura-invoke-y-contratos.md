# Arquitectura invoke y contratos (corregido 2026-07-06)

## Quién es público

| Componente | Exposición | Consumidor |
|------------|------------|------------|
| **tld-matriz** | **Público** (único frente al canal / exterior) | Canales emisores |
| `tld-validador-validar` | **Interno** — solo `Invoke` desde matriz | Matriz |
| `tld-cuenta-nombre`, alias, P2M, R2P | **Interno** — solo `Invoke` desde validador-api | Validador-api |
| `tld-validador-proxy` | **Interno** — `Invoke` desde lambdas producto | Productos |

Un cliente **fuera de la red** no invoca `tld-validador-api` ni las lambdas producto. No tiene IAM ni VPC para `lambda:InvokeFunction` sobre esas funciones.

## API Gateway en `tld-validador-api`

El `POST /validar` del stack validador-api quedó **solo para prueba manual** (Postman, depuración). **No** es el camino de producción ni el contrato del canal.

Producción:

```
Canal → API matriz → Invoke → tld-validador-validar → Invoke → producto → Invoke → proxy → HTTP validador
```

Prueba aislada (sin matriz):

```
Postman → API GW validador-api /validar  (opcional, no define contrato canal)
```

## Contrato con el canal — no se cambia

Lo que firma el canal es lo que **matriz** devuelve (HTTP 200 + JSON, típicamente `{ respuesta: "<cifrado>" }` o errores en la forma acordada con matriz).

**No** se puede alterar ese contrato “para simplificar invoke” ni alinear con Newman que llama **directo** al API de cuenta-nombre (otro entry point, otra prueba).

El orquestador (`tld-validador-api`) debe devolver a **matriz** la misma forma que matriz ya reenvía al canal. Eso no es negociable.

## Problema real: errores planos del producto (599, 509, …)

Hoy `validador-api` hace siempre:

```javascript
const r = respuesta?.respuesta ?? respuesta;
return await util.lambdaResult(200, 0, { respuesta: r });
```

Si el producto devuelve en invoke `{ codigoError: 599, mensajeError: "…" }` **sin** cifrar, matriz recibe `{ respuesta: { codigoError: 599, … } }` con éxito lógico en el sobre del validador.

- Newman **directo** a cuenta-nombre: `{ codigoError, mensajeError }` en raíz.
- Camino **matriz → validador → producto**: forma distinta.

Eso **no** es un “arreglo opcional de impacto mínimo”. Cuando QA pruebe el flujo real (matriz o cadena acordada), puede fallar o no coincidir con lo que validaron contra el API del producto aislado.

**No** la solución correcta es propagar `codigoError` plano desde validador-api si eso **cambia** lo que el canal ha recibido históricamente vía matriz.

Opciones coherentes con “no cambiar contrato canal”:

1. **Producto** (cuenta-nombre, etc.): cifrar también errores de integración validador (599/509) en `respuesta`, como otras ramas de error — el orquestador sigue devolviendo `{ respuesta: cifrado }`.
2. **QA / Newman**: definir suites **E2E por matriz** para lo que es producción; no usar solo API directa del producto como criterio del camino orquestado.
3. Revisar en prod qué forma llegó realmente al canal en errores de proxy (¿siempre cifrado?) antes de tocar código.

## Invoke vs API GW — misma lambda, distinto evento

- **Matriz → Invoke:** payload `{ body: JSON.stringify(body) }`; respuesta lambda `{ statusCode, body }`; matriz parsea y reenvía.
- **Postman → API GW:** mismo handler; API GW envuelve igual. Sirve para probar la lambda, **no** sustituye prueba de matriz ni contrato canal.

## Relación con Newman VCN

`5_fallosIntegracionValidador` prueba **cuenta-nombre → proxy**. No valida matriz ni validador-api. Un run Newman OK **no** cierra el camino público.

## Documentos relacionados

- [respuesta-a-matriz.md](./respuesta-a-matriz.md) — sobre matriz ↔ validador
- [timeouts-y-dependencias.md](./timeouts-y-dependencias.md) — timeouts y layer
- [hallazgos-pendientes.md](./hallazgos-pendientes.md) — pendientes QA / producto
