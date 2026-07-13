# HP-021 — Timeouts desalineados: demora validador no devuelve 599 (509 / Internal server error)

| Campo | Valor |
|-------|--------|
| **ID** | HP-021 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (código + Newman + criterio operativo) — **se corrige en dev** |
| **Severidad** | **crítica** |
| **Componente** | `tld-api-cuenta-nombre` / `cuenta-nombre` + cadena Matriz → Validador → VCN |
| **Ámbito** | VCN — integración Canal Validador (escenarios dummy 1022/1023) |
| **Veredicto** | **PROD-MAL** (el esperado del test, **599**, es el correcto) |

---

## Resumen

Cuando el **Canal Validador** tarda más de lo permitido (dummy `validar-fallos`, cuenta
`5000000516`, demora **16 s**), el cliente debería recibir **599** "Tiempo de espera agotado al
llamar al Canal Validador". Producción devuelve respuestas **incorrectas e incomprensibles**:
**509** "Error inesperado en validador" o **`Internal server error`** sin `codigoError`.

La causa incluye **timeouts de lambdas muy ajustados y desalineados** en la cadena: la lambda VCN
tiene **11 s** de timeout AWS, pero el HTTP hacia el validador está en **10 s** (`HTTP_READ_TIME_OUT:
10000`), mientras el validador de prueba demora **16 s**. No hay margen ni homologación entre capas.

---

## Cadena de timeouts en producción (observado en `prod_adactado_a_dev`)

| Capa | Componente | Timeout AWS lambda | HTTP read hacia abajo |
|------|------------|-------------------|------------------------|
| 1 | `tld-validador-validar` (matriz) | **24 s** | **23 s** → servicio interno VCN |
| 2 | `tld-api-cuenta-nombre` (VCN) | **11 s** | **10 s** → Canal Validador |
| 3 | Dummy `validar-fallos` (demora) | — | **16 s** de sleep (`CFG_DELAY_MS`) |

**Problema:** VCN espera al validador **10 s**, pero el escenario de demora está diseñado para **16 s**.
La lambda VCN solo vive **11 s** — apenas 1 s por encima del HTTP. Cualquier trabajo previo (plan,
descifrado, auth token en 1023) consume margen y empeora el resultado.

---

## Comportamiento en producción (observado)

| Escenario | Esperado | Recibido |
|-----------|----------|----------|
| **0001.5.1022.1** (PROXGATO auth fijo, demora) | **599** | `{"message":"Internal server error"}` (sin `codigoError`) |
| **0001.5.1023.1** (OUTFGATO auth token, demora) | **599** | **509** "Error inesperado en validador" |

**Ruta:** Matriz → Validador → VCN → Canal Validador dummy (demora 16 s).

---

## Comportamiento esperado

- **599** "Tiempo de espera agotado al llamar al Canal Validador" (`nueva-tabla-codigo-respuesta.md`).
- El test **no** cambia: escenarios `1.599_demora_validador.json` mantienen **599**.

---

## Causa raíz

1. **Timeouts desalineados:** `HTTP_READ_TIME_OUT` (10 s) < demora del validador (16 s) < margen útil
   dentro de lambda VCN (11 s).
2. **Sin mapeo de timeout:** en `cuenta-nombre/lib/validador.js`, el `catch` de axios devuelve `null`
   → `app.js` responde **509**, no **599**.
3. **Lambda cortada:** en algunos casos (1022.1) la lambda VCN agota sus 11 s y API Gateway devuelve
   `Internal server error` sin payload de negocio.

---

## Impacto

- **Crítico en operación:** los tiempos están tan ajustados que escenarios reales de latencia del
  validador se confunden con errores internos (509) o fallos de infra (Internal server error).
- **Cliente sin diagnóstico:** no sabe que el validador no respondió a tiempo.
- **Pruebas Newman:** los escenarios de demora existen precisamente para verificar **599**; prod no
  cumple el contrato.

---

## Mejora propuesta (en dev — ajuste de prod, NO ajuste de prueba)

1. **Alinear timeouts en cadena:** HTTP read hacia validador < timeout lambda VCN, con margen para
   trabajo previo; revisar toda la cadena Matriz → Validador → VCN → Validador externo.
2. **Mapear timeout axios** (`ECONNABORTED` / `ETIMEDOUT`) → **599**, no 509 ni crash.
3. **Responder siempre con `codigoError` estructurado**, nunca `Internal server error` opaco al
   cliente por timeout de lambda.

Los escenarios Newman **0001.5.1022.1** y **0001.5.1023.1** **mantienen 599**.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `Postman/generador/logs/historial/vcn/2026-07-13T03-16-37Z_prod_MATRIZ_completo*.json` |
| Config VCN | `prod_adactado_a_dev/tld-api-cuenta-nombre/template.yaml` — `Timeout: 11`, `HTTP_READ_TIME_OUT: 10000` |
| Config validador-api | `prod_adactado_a_dev/tld-validador-api/template.yaml` — `Timeout: 24`, `HTTP_READ_TIME_OUT: 23000` |
| Código | `cuenta-nombre/lib/validador.js` líneas 64–67 (`catch` → `null` → 509) |
| Dummy demora | `tld-validador-dummy/lambdas/validar-fallos` — `CFG_DELAY_MS` default 16000 |
| Escenarios | `Metodo/0001/5_fallosIntegracionValidador/1022_fijo/1.599_demora_validador.json`, `1023_token/1.599_demora_validador.json` |
| Revisión | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §0001-C |

---

## Referencias

- Código 599: [`../codigosRespuesta/nueva-tabla-codigo-respuesta.md`](../codigosRespuesta/nueva-tabla-codigo-respuesta.md)
- Relacionados: [HP-004](03-matriz-550-enmascara-errores-validador.md) (códigos genéricos enmascaran errores)
