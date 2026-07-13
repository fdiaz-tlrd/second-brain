# Hallazgos en producción — informe de mejoras

Carpeta para **acumular hallazgos** detectados al estudiar el comportamiento real de producción (código, Newman contra `prod_adactado_a_dev`, CloudWatch, comparaciones esperado vs recibido).

**Propósito final:** armar un **informe completo** que evidencie qué estaba mal o incompleto en producción y qué mejoras se están aplicando (en dev, en pruebas, en código, en configuración).

---

## Cómo usar esta carpeta

| Qué | Dónde |
|-----|--------|
| Índice maestro de hallazgos (estado, severidad, enlaces) | [`indice.md`](indice.md) |
| Plantilla para documentar un hallazgo nuevo | [`00-plantilla-hallazgo.md`](00-plantilla-hallazgo.md) |
| Cada hallazgo concreto | `NN-titulo-corto.md` (numeración ascendente) |
| Evidencia cruda (consola Postman, CloudWatch pegado a mano) | [`../investigacion/`](../investigacion/) |
| Estudio profundo de código prod (solo lectura) | [`../produccion_real/`](../produccion_real/) |
| Runs Newman y comparaciones | [`../Postman/comparar-prod-vs-dev/`](../Postman/comparar-prod-vs-dev/) |
| Código prod desplegado en dev para pruebas | [`../prod_adactado_a_dev/`](../prod_adactado_a_dev/) |

**Regla:** un hallazgo nuevo → copiar plantilla → rellenar → añadir fila en `indice.md`. Si el hallazgo sale de un estudio largo en otra carpeta, **no duplicar todo**: el doc aquí es la ficha ejecutiva para el informe; el estudio largo queda enlazado.

---

## Criterios de un hallazgo (para el informe)

Cada ficha debe dejar claro:

1. **Qué hace producción hoy** (comportamiento observado).
2. **Qué se esperaba** (prueba, contrato, sentido de negocio).
3. **Evidencia** (run Newman, CloudWatch, línea de código, request/response capturado).
4. **Causa raíz** (si está confirmada; si no, marcar como hipótesis).
5. **Impacto** (cliente, trazabilidad, seguridad, mantenibilidad).
6. **Mejora** (qué se corrige o qué decisión se toma; enlace a fix si existe).

---

## Estado del informe

| Métrica | Valor |
|---------|--------|
| Hallazgos registrados | Ver [`indice.md`](indice.md) |
| Informe consolidado final | **Pendiente** — se arma cuando el índice esté maduro |

---

## Relación con otras carpetas

- **`produccion_real/`** — análisis técnico del código en `main` (fotografía, no se edita el repo clonado).
- **`prod_adactado_a_dev/`** — misma base prod, mínimos ajustes para correr en dev; fuente de los runs Newman.
- **`investigacion/`** — evidencia ad hoc (volcados Postman, CloudWatch, notas de campo).
- **`hallazgos-produccion/`** (esta carpeta) — **vista orientada al informe de mejoras**; es el lugar donde convergen los hallazgos accionables.
