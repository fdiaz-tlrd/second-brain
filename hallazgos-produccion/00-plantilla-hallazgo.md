# [ID] Título corto del hallazgo

| Campo | Valor |
|-------|--------|
| **ID** | HP-NNN |
| **Fecha** | YYYY-MM-DD |
| **Estado** | `identificado` \| `confirmado` \| `corregido-en-dev` \| `corregido-en-prod` \| `decisión-documentada` |
| **Severidad** | `crítica` \| `alta` \| `media` \| `baja` \| `informativo` |
| **Componente** | repo / lambda / API / infra |
| **Ámbito** | VCN \| P2P \| P2M \| transversal |

---

## Resumen (1 párrafo)

Qué está mal o qué comportamiento inesperado tiene producción, en lenguaje claro para el informe.

---

## Comportamiento en producción (observado)

- Qué devuelve (HTTP, `codigoError`, mensaje).
- En qué condiciones (entrada, ruta Matriz/Validador/VCN).
- Frecuencia o escenarios afectados (si aplica).

---

## Comportamiento esperado

- Qué dicen las pruebas / el contrato / el sentido de negocio.
- Diferencia concreta: esperado vs recibido.

---

## Evidencia

| Tipo | Referencia |
|------|------------|
| Run Newman | `Postman/generador/logs/...` |
| Captura `[CAPTURA]` | escenario, `*_por-escenario.json` |
| CloudWatch | `investigacion/...` o RequestId |
| Código prod | `produccion_real/...` líneas |
| Request/response crudo | enlace o extracto |

---

## Causa raíz

- Confirmada: cadena paso a paso.
- Hipótesis: marcar explícitamente qué falta para cerrar.

---

## Impacto

- Usuario / integrador.
- Operación (logs, trace, soporte).
- Riesgo si no se corrige.

---

## Mejora propuesta o aplicada

- Qué se cambia (código, config, expectativa de prueba).
- Repo/rama/PR si existe.
- **No** confundir “ajustar expectativa de prueba” con “arreglar prod” — dejar explícito cuál es cuál.

---

## Referencias

- Estudio largo: ...
- Comparación Newman: ...
- Otros: ...
