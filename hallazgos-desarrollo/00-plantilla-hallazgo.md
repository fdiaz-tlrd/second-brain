# [ID] Título corto del hallazgo (desarrollo)

| Campo | Valor |
|-------|--------|
| **ID** | HD-NNN |
| **Fecha** | YYYY-MM-DD |
| **Estado** | `identificado` \| `confirmado` \| `implementado` \| `decisión-documentada` |
| **Severidad** | `crítica` \| `alta` \| `media` \| `baja` \| `informativo` |
| **Componente** | repo / lambda / API |
| **Ámbito** | VCN \| P2P \| P2M \| transversal |
| **Repo dev** | ruta en workspace |

---

## Resumen (1 párrafo)

Qué hace el código dev, qué se mejora o qué riesgo hay.

---

## Comportamiento en desarrollo (observado o por código)

- HTTP Code devuelto al cliente.
- `codigoError` / body.
- Diferencias vs producción (si aplica).

---

## Comportamiento en producción (referencia)

- Enlace a hallazgo prod equivalente (HP-xxx) si existe.
- ¿Debe mantenerse igual el HTTP?

---

## Regla HTTP vs JSON

| ¿Toca HTTP Code? | ¿Toca codigoError/body? | Justificación |
|------------------|-------------------------|---------------|
| sí / no | sí / no | Marketplace, contrato cliente, etc. |

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Código dev | `tld-matriz/...` líneas |
| Código prod | `produccion_real/...` |
| Newman `--codigo-fuente dev` | run, escenario |
| Documentación Marketplace | enlace |

---

## Impacto si se cambia mal

- Cliente final, memo, regresión.

---

## Mejora propuesta o aplicada

- Qué se hace en dev.
- Qué **no** se hace (p. ej. no cambiar HTTP 200).

---

## Referencias

- ...
