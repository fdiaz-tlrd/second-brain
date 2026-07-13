# HP-019 — Método no asociado al canal emisor → 509 (debe ser 418)

| Campo | Valor |
|-------|--------|
| **ID** | HP-019 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (código + Newman) — **se corrige en dev** |
| **Severidad** | media-alta |
| **Componente** | `tld-api-cuenta-nombre` / `cuenta-nombre` (`metodoDisponible` emisor) |
| **Ámbito** | VCN — observable en flujo Matriz → Validador → VCN |
| **Veredicto** | **PROD-MAL** (el esperado del test, 418, es el correcto) |

---

## Resumen

Cuando el **canal emisor** no tiene el método solicitado en `tld-validador-canal-operacion` (canal
prueba **1018** `CANAL_EMISOR_SIN_METODO`, cero filas de operación), producción **no rechaza** con
**418** "Método no soportado". La petición avanza y termina en **509** "Error inesperado en validador".
El cliente no sabe que su canal emisor no tiene autorizado ese método.

---

## Regla operativa — métodos por canal

Ver [HP-018](17-metodo-fuera-cfg-enmascara-509.md) §Regla operativa (texto completo).

Al dar de alta un **canal emisor**, hay que cargar en `tld-validador-canal-operacion` **solo** los
métodos que ese emisor tiene permitidos. Nuestra versión **obliga** a cumplirlo. Si el canal no tiene
el método en su lista → **418** (rechazo de negocio). Si el canal no tiene **ninguna** operación
cargada → tratar como mala configuración (cf. HP-017/018 según capa).

---

## Comportamiento en producción (observado) — escenario 2.4.2

- **Recibido:** `codigoError 509` "Error inesperado en validador".
- **Condición:** `idCanal` = 1018 (sin operaciones); `metodo` = `0001`.
- **Ruta:** Matriz → Validador → VCN — prod no valida `metodoDisponible` sobre el **emisor** antes de
  llamar downstream.

---

## Comportamiento esperado

- **418** "Método no soportado" (escenario 2.4.2; `nueva-tabla-codigo-respuesta.md` §2.4.1–2.4.2).
- Diferencia concreta: esperado **418** vs recibido **509**.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `Postman/generador/logs/historial/vcn/2026-07-13T03-16-37Z_prod_MATRIZ_completo*.json` (2.4.2 → 509) |
| Código prod | `prod_adactado_a_dev/tld-api-cuenta-nombre/lambdas/cuenta-nombre/app.js` — valida método en **validador**, no en **emisor** |
| Código dev (referencia) | `tld-api-cuenta-nombre/lambdas/cuenta-nombre/app.js` ~375 (`metodoDisponible(canalEmisor, …)` → 418) |
| Canal prueba | `Postman/canalesPruebas-dev` — 1018 ARCHGATO, `CANAL_EMISOR_SIN_METODO` |
| Escenario | `VCN Escenarios error/General/2_reglaNegocio/4_metodo/4.2_metodo_no_asociado_emisor.json` |
| Revisión | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 2.4-B |

---

## Causa raíz

Prod no comprueba que el método esté en las operaciones del **canal emisor** antes de continuar. El
fallo aparece más adelante (llamada al validador interno) como **509** genérico.

---

## Impacto

- **Diagnóstico erróneo:** soporte investiga fallo interno en vez de decir al cliente que su canal no
  tiene el método autorizado.
- **Operación:** canales emisores dados de alta sin operaciones violan la regla operativa y prod no lo
  detecta a tiempo.

---

## Mejora propuesta (en dev — ajuste de prod, NO ajuste de prueba)

Tras descifrar, validar `metodoDisponible(canalEmisor, peticion.metodo)`; si false → **418** antes de
llamar downstream. Test **2.4.2** mantiene **418**. Provisionar canal emisor con sus métodos en
`tld-validador-canal-operacion` (regla operativa HP-018).

---

## Referencias

- Relacionados: [HP-018](17-metodo-fuera-cfg-enmascara-509.md) (método fuera de CFG global → 509), [HP-017](16-validador-mal-configurado-responde-418.md) (validador sin operaciones)
