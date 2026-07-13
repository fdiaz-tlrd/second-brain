# Índice de hallazgos — producción

Actualizar cada vez que se agregue o cierre un hallazgo en esta carpeta.

**Leyenda estado:** `confirmado` = evidencia runtime o código; `identificado` = detectado en análisis, falta evidencia; `corregido-en-dev` = fix en rama dev o `prod_adactado_a_dev` (no prod real).

| ID | Título | Severidad | Componente | Estado | Doc |
|----|--------|-----------|------------|--------|-----|
| HP-001 | `idCanal` null / `""` → 550 en vez de 400 (matriz) | alta | `tld-matriz` / `tld-validador-validar` | confirmado | [01-matriz-idCanal-null-vacio-responde-550.md](01-matriz-idCanal-null-vacio-responde-550.md) |
| HP-002 | Función `error()` no definida — convierte fallo de trace en 550 | alta | `tld-matriz` / `tld-validador-validar` | confirmado | [01-matriz-idCanal-null-vacio-responde-550.md](01-matriz-idCanal-null-vacio-responde-550.md) §Causa |
| HP-003 | Matriz siempre HTTP 200; error solo en body (`codigoError`) | informativo | `tld-matriz` / `tld-validador-validar` | confirmado | [02-matriz-http-200-siempre.md](02-matriz-http-200-siempre.md) |
| HP-004 | `550` enmascara errores distintos del validador | media | `tld-matriz` / `tld-validador-validar` | confirmado | [03-matriz-550-enmascara-errores-validador.md](03-matriz-550-enmascara-errores-validador.md) |
| HP-005 | `isValid` no valida tipo de `idCanal` (number/boolean/object pasan) | media | `tld-matriz` / `tld-validador-validar` | confirmado (código + Newman) | [04-matriz-isValid-sin-chequeo-tipo.md](04-matriz-isValid-sin-chequeo-tipo.md) |
| HP-006 | `validatePlan()` / `respEventBus` indefinidos — mina si se activa `subscriptionValue` | media | `tld-matriz` / `tld-validador-validar` | confirmado (código) | [05-matriz-validatePlan-codigo-muerto.md](05-matriz-validatePlan-codigo-muerto.md) |
| HP-007 | Riesgo crash por `X-Forwarded-For` ausente (línea 22) | media | `tld-matriz` / `tld-validador-validar` | confirmado (código) | [06-matriz-x-forwarded-for-riesgo-crash.md](06-matriz-x-forwarded-for-riesgo-crash.md) |

---

## Pendiente de registrar como ficha

Temas ya estudiados en otras carpetas; convertir en `HP-00N` cuando se prioricen para el informe:

| Tema | Dónde está hoy |
|------|----------------|
| 6 escenarios MATRIZ ≠ VALIDADOR (ruta cliente real) | [`../Postman/comparar-prod-vs-dev/07-matriz-validacion-cuerpo-json.md`](../Postman/comparar-prod-vs-dev/07-matriz-validacion-cuerpo-json.md) |
| Divergencia esperado vs recibido (~22% negocio) | [`../Postman/comparar-prod-vs-dev/08-esperado-vs-recibido-prod.md`](../Postman/comparar-prod-vs-dev/08-esperado-vs-recibido-prod.md) |
| HTTP protocolo vs `codigoError` | [`../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md`](../Postman/comparar-prod-vs-dev/10-http-vs-codigoerror.md) |
| Config `ValidadorUrl` incorrecta en despliegue prod-en-dev (550 masivo) | [`../Postman/comparar-prod-vs-dev/recopilacion/ITERACION-02-prod-a-dev-MATRIZ-postfix-2026-07-12.md`](../Postman/comparar-prod-vs-dev/recopilacion/ITERACION-02-prod-a-dev-MATRIZ-postfix-2026-07-12.md) |

---

## Para el informe final

Cuando haya suficientes fichas cerradas, generar un único documento (p. ej. `INFORME-CONSOLIDADO.md` o export HTML) que:

1. Agrupe por componente (matriz, validador, VCN).
2. Separe **bugs de prod** vs **ajustes de prueba** vs **mejoras de arquitectura en dev**.
3. Incluya tabla resumen + anexos de evidencia (runs, CloudWatch).
