# VCN Dig — matriz permisos 0001 (X ↔ Y) — 2026-07-15

## Pruebas VCN — lectura simple (usuario, 2026-07-15)

Un canal **sin renglón** `0001` sirve para **dos** usos distintos:

1. **Como emisor** → Dig no deniega → puede ser flujo feliz (si el validador tiene `Y`).
2. **Como validador** → Dig **418**.

Canal creado: **1024 ANOMGATO** (`estadoValidador=Y`, plan GATO, `llaveCifrado` ok, **sin** filas en `tld-validador-canal-operacion`). Doc: `Postman/canalesPruebas-dev/`.

**¿Hay escenario Postman hoy para (2)?** **Sí** — `2.2.4` (`CANAL_VALIDADOR_SIN_OPERACION` = **1024**). También `2.2.5` (validador **1018** con `N` → **418**) y `0001.3.1008.1.3` (emisor **1024** → feliz). Colección VCN re-armada 2026-07-15.

## El punto que faltaba ver

Se había montado prueba/semántica pensando que **418** cubría “emisor sin método”. En Dig VCN eso es **falso**:

| Rol en el request | Sin renglón (∅) | `estado=Y` | `estado=N` |
|-------------------|-----------------|------------|------------|
| **Emisor** (`idCanal`) | no deniega | no deniega por esta regla | **482** |
| **Validador** (`body.validador`) | **418** | permite seguir | **418** |

La **misma** fila Dynamo se interpreta distinto según el rol. Por eso hace falta el cruce **X→Y** y **Y→X**: mismos canales, roles invertidos → códigos distintos posibles.

Orden en `cuenta-nombre` `app.js`: primero emisor `N` → **482**; después validador sin `Y` → **418**.

## Leyenda

- **∅** = no hay renglón de operación `0001` para ese canal
- **Y** / **N** = hay renglón con ese `estado`
- **sigue\*** = estas dos reglas no cortan; el flujo sigue (puede fallar por otra causa)

## Compacta — Emisor \ Validador

| Emisor \ Validador | ∅ | Y | N |
|--------------------|---|---|---|
| **∅** | 418 | sigue\* | 418 |
| **Y** | 418 | sigue\* | 418 |
| **N** | 482 | 482 | 482 |

Misma tabla para ambas direcciones: en **A** fila=X columna=Y; en **B** fila=Y columna=X.

## Dirección A — Emisor X → Validador Y

| X (emisor) | Y (validador) | Resultado |
|------------|---------------|-----------|
| ∅ | ∅ | 418 |
| ∅ | Y | sigue\* |
| ∅ | N | 418 |
| Y | ∅ | 418 |
| Y | Y | sigue\* |
| Y | N | 418 |
| N | ∅ | 482 |
| N | Y | 482 |
| N | N | 482 |

## Dirección B — Emisor Y → Validador X (viceversa)

| Y (emisor) | X (validador) | Resultado |
|------------|---------------|-----------|
| ∅ | ∅ | 418 |
| ∅ | Y | sigue\* |
| ∅ | N | 418 |
| Y | ∅ | 418 |
| Y | Y | sigue\* |
| Y | N | 418 |
| N | ∅ | 482 |
| N | Y | 482 |
| N | N | 482 |

(La forma es idéntica; cambian qué canal físico tiene cada estado.)

## Qué hay que hacer HOY (explícito — no “para un futuro”)

1. **Congelar** esta matriz como esperado Dig **VCN**.
2. **Tener** dos canales de prueba (X, Y) cuyas ops `0001` se puedan poner en ∅ / Y / N sin romper **1018**/4.2.
3. **Crear** escenarios Postman VCN (mínimo):
   - (∅, Y) → sigue\*
   - (Y, ∅) → **418**
   - (Y, N) → **418**
   - (N, Y) → **482**
   - (Y, Y) → sigue\*
   - al menos un **viceversa** que demuestre el flip de roles
4. **No avanzar** el cierre del tema hasta que esos escenarios existan y se puedan correr (Newman en VPN).

Canvas vivo: `canvases/vcn-matriz-permisos-0001.canvas.tsx` (IDE).

## Pregunta que pueden hacer

> Si le niego explícitamente (`N`) la operación a un canal, ¿queda implícito el **418** cuando otro lo use como validador?

**VCN Dig: sí.** Validador exige `Y`; con `N` no hay `Y` → **418**.

> De las permutaciones ∅ / Y / N, ¿qué otra respuesta podríamos recibir?

**Solo tres desenlaces por estas dos reglas:**

| Resultado | Cuándo |
|-----------|--------|
| **482** | Emisor con `N` |
| **418** | Emisor no `N`, y validador sin `Y` (∅ o `N`) |
| **sigue\*** | Emisor no `N`, validador con `Y` |

Cualquier otro código (**401**, **402**, **403**, **404**, **481**, **500**, errores de negocio, etc.) **no sale de esta permutación de ops**: sale de otra dimensión (canal inexistente, plan, método fuera de mapa, CFG, payload…).

### P2P / P2M Dig — solo negación de operación (emisor)

Ahí el eje temprano de ops es **casi solo**:

| Ops del **emisor** | Resultado por esta regla |
|--------------------|--------------------------|
| `N` | **482** |
| ∅ o `Y` | no corta (sigue\*) |

**No** hay el mismo corte temprano «ops del `body.validador` → **418**» que en VCN. Usar un canal con `N`/`∅` como validador del request **no** reproduce la matriz VCN de 418.

Excepciones P2M **distintas** (no son la matriz 0001 X↔Y): p. ej. validador de comercio sin op `0020` en `Y` → **402**; en notificación `0020` a veces soft-skip — otro significado, no el 418 de VCN.

**Resumen para la pregunta en mesa:** en VCN la permutación da 482 / 418 / sigue\*; en P2P/P2M, para métodos normales, la ops del emisor se ve como **negación (`N`→482)**; el rol validador de esa misma fila **no** se traduce al 418 de VCN.

