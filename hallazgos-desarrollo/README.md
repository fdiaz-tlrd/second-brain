# Hallazgos en desarrollo — informe de mejoras

Carpeta para **acumular hallazgos** del código y comportamiento de **nuestro desarrollo** (`tld-matriz`, `tld-validador-api`, `tld-api-cuenta-nombre`, etc.) — lo que se despliega y evoluciona en dev **antes** o **en paralelo** a producción.

**Propósito final:** mismo objetivo que [`../hallazgos-produccion/`](../hallazgos-produccion/): armar un informe que evidencie mejoras, pero aquí el foco es **qué hace o haría nuestro código dev** y cómo se compara con prod.

---

## Regla crítica — HTTP Code vs código en JSON

| Capa | ¿Se puede cambiar? | Notas |
|------|-------------------|--------|
| **HTTP Code** (status de la respuesta API) | **NO** — contrato con cliente final | Si prod entrega **200**, dev debe seguir entregando **200** en matriz. Cambiar a 400/404/431 rompe integraciones → riesgo operativo grave. |
| **`codigoError` / negocio en el body** | **SÍ**, con sustento | Mejorar el valor dentro del JSON (p. ej. alinear con Marketplace: 404 = "Validador no existe") es legítimo **mientras el HTTP se mantenga**. |

Esta regla aplica a toda revisión en esta carpeta. Ver ficha [`01-matriz-validador-validar-http-code.md`](01-matriz-validador-validar-http-code.md).

---

## Cómo usar esta carpeta

| Qué | Dónde |
|-----|--------|
| Índice maestro | [`indice.md`](indice.md) |
| Plantilla | [`00-plantilla-hallazgo.md`](00-plantilla-hallazgo.md) |
| Cada hallazgo | `NN-titulo-corto.md` |
| Código dev (repos producto) | `tld-matriz/`, `tld-validador-api/`, `tld-api-cuenta-nombre/` en el workspace |
| Hallazgos de prod (referencia) | [`../hallazgos-produccion/`](../hallazgos-produccion/) |
| Runs Newman dev vs prod | [`../Postman/comparar-prod-vs-dev/`](../Postman/comparar-prod-vs-dev/) |

**Regla:** hallazgo nuevo → plantilla → fila en `indice.md`. Comparar siempre con prod cuando el cambio pueda afectar al cliente.

---

## Relación con otras carpetas

| Carpeta | Rol |
|---------|-----|
| `hallazgos-produccion/` | Qué está mal o cómo se comporta **prod hoy** |
| `hallazgos-desarrollo/` (aquí) | Qué hace **nuestro dev**, qué mejoramos, qué **no** debemos romper (HTTP) |
| `prod_adactado_a_dev/` | Prod desplegado en dev para pruebas — **no** es el código dev evolucionado |
| `tld-matriz/` (repo dev) | Código de desarrollo real |
