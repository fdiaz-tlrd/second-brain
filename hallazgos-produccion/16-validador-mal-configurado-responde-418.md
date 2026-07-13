# HP-017 — Canal validador mal configurado → 418 método (debe ser 500)

| Campo | Valor |
|-------|--------|
| **ID** | HP-017 |
| **Fecha** | 2026-07-13 |
| **Estado** | confirmado (código + Newman) — **se corrige en dev** |
| **Severidad** | media-alta |
| **Componente** | `tld-api-cuenta-nombre` / `cuenta-nombre` (`metodoDisponible`, `tld-validador-canal-operacion`) |
| **Ámbito** | VCN — observable en flujo Matriz → Validador → VCN |
| **Veredicto** | **PROD-MAL** (el esperado del test, 500, es el correcto) |

---

## Resumen

Cuando el **canal validador** existe en BD pero está **mal configurado** (p. ej. **1017** TEYVGATO:
sin filas en `tld-validador-canal-operacion`, config incompleta), producción no lo trata como error
interno. Llega a `metodoDisponible`, no encuentra el método **0001** y responde **418** "Método no
soportado por el validador". El cliente interpreta que el método no está permitido; en realidad el
validador está mal armado en plataforma. Lo correcto es **500** "Error interno".

---

## Comportamiento en producción (observado)

- **Recibido:** `codigoError 418` "Metodo no soportado por el validador".
- **Condición:** `validador` = canal 1017 (`CANAL_VALIDADOR_MAL_CONFIGURADO`), sin operaciones en BD.
- **Ruta:** Matriz → Validador → VCN (`cuenta-nombre`, chequeo `metodoDisponible`).

---

## Comportamiento esperado

- **500** "Error interno" (escenario 2.2.3; `nueva-tabla-codigo-respuesta.md`).
- Diferencia concreta: esperado **500** vs recibido **418**.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `Postman/generador/logs/historial/vcn/2026-07-13T03-16-37Z_prod_MATRIZ_completo*.json` (2.2.3 → 418) |
| Código prod | `prod_adactado_a_dev/tld-api-cuenta-nombre/lambdas/cuenta-nombre/app.js` líneas 107–109 (`metodoDisponible` → 418) |
| `metodoDisponible` | `prod_adactado_a_dev/.../lib/canal.js` — sin operaciones → `false` |
| Canal prueba | `Postman/canalesPruebas-dev` — 1017, `CANAL_VALIDADOR_MAL_CONFIGURADO` |
| Escenario | `VCN Escenarios error/General/2_reglaNegocio/2_validador/2.3_validador_error_interno_getCanal.json` |
| Revisión | [`../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md`](../Postman/comparar-prod-vs-dev/12-revision-codigos-respuesta-vcn.md) §Bloque 2.2 |

---

## Causa raíz

Prod no distingue:

- **418** → canal validador **bien configurado** pero el método solicitado no está en su lista de
  operaciones permitidas (rechazo de negocio legítimo).
- **500** → canal validador **mal configurado** (sin operaciones, llaves rotas, fila incompleta) —
  fallo de plataforma.

Sin filas en `tld-validador-canal-operacion`, `metodoDisponible` devuelve `false` y se responde 418
como si fuera un rechazo de negocio.

---

## Impacto

- **Diagnóstico erróneo:** el integrador cree que el método 0001 no está soportado por ese validador.
- **Operación:** el canal validador puede estar publicado sin operaciones cargadas; el 418 oculta el
  problema de configuración.

---

## Mejora propuesta (en dev — ajuste de prod, NO ajuste de prueba)

1. **Respuesta:** si el canal validador existe pero su configuración es incompleta (sin operaciones,
   llaves inválidas, etc.), devolver **500** antes del chequeo de método. Si está bien configurado y
   el método no está en su lista → **418**. Test **2.2.3** mantiene **500**.

2. **Configuración (criterio acordado jul-2026):** ver regla operativa completa en [HP-018](17-metodo-fuera-cfg-enmascara-509.md) §Regla operativa. Resumen: **siempre** registrar en `tld-validador-canal-operacion` los métodos soportados **por cada canal** (emisor y validador); nuestra versión **obliga** a cumplirlo.

---

## Referencias

- Código 418 vs 500: [`../codigosRespuesta/nueva-tabla-codigo-respuesta.md`](../codigosRespuesta/nueva-tabla-codigo-respuesta.md)
- Relacionados: [HP-016](15-vcn-canal-mal-configurado-responde-405.md) (mismo canal 1017, rol emisor → 405)
