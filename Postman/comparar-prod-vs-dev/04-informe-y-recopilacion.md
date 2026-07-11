# 04 — Informe (humano) y recopilación (mecánica)

Aclaración de intención, para no mezclar la herramienta con el entregable.

---

## Las dos fases

### Fase 1 — Recopilación (ahora)

- Correr los escenarios con **código prod** desplegado en AWS dev → guardar respuesta por escenario, etiqueta `prod`.
- Correr los mismos escenarios con **código dev** → guardar respuesta por escenario, etiqueta `dev`.
- Esto es **mecánico y reproducible**: lo hace Newman vía `run-newman.js` (docs 01–03).
- En paralelo, seguir verificando que el **código en desarrollo cumple lo que hoy esperamos** (asserts dev en verde con código dev).

Objetivo de esta fase: **tener toda la información necesaria** para el informe futuro. No interpretar todavía.

### Fase 2 — Informe (más adelante)

- Documento **hecho por personas** para presentar y discutir:
  > "En producción hoy pasa **esto**. Con el cambio que estamos haciendo pasa **esto otro**. Se justifica por **X**."
- Sobre ese documento se **revisan las diferencias, se discuten y se justifican**.
- **No lo genera Newman.** La herramienta puede producir una lista de **diferencias candidatas** (diff prod vs dev) como insumo, pero:
  - qué diferencia es relevante,
  - cuál es esperada por el cambio,
  - cómo se justifica,

  es **criterio humano**.

---

## Qué debe capturar la recopilación para no quedarnos cortos

Para que el informe futuro tenga evidencia fiel, la recopilación (fase 1) debe guardar por escenario, por cada versión de código:

- Nombre y ruta del escenario.
- HTTP de la respuesta final (descifrar).
- `codigoError` / `mensajeError` o `respuesta` / `resultado`.
- **Cuerpo completo** de la respuesta (ver nota de truncado abajo).
- Si pasó o no el assert (informativo).
- Etiqueta de versión de código (`prod` / `dev`).
- Fecha, carpeta, nota.

### Truncado

El truncado a 4000 caracteres (`MAX_BODY`) sirve para el `.md` legible. Para el **JSON por escenario conviene guardar el cuerpo completo**, porque es la evidencia que alimentará el informe; si se trunca ahí, se puede perder justo el fragmento que explica una diferencia.

---

## Condiciones para que la comparación sea válida (riesgos reales)

Una diferencia entre el run-prod y el run-dev solo es atribuible al **código** si el resto se mantiene igual. Si no, se puede estar comparando ruido.

1. **Mismos escenarios y misma colección** en ambas corridas.
2. **Mismo environment** Postman (`*-desarrollo`) y **mismas URLs / canales**.
3. **Mismo seed de datos** (Dynamo, cuentas VCN dev, operaciones). Si cambia el dato entre una corrida y otra, la diferencia puede ser del dato, no del código.
4. **Sin cambios de infraestructura** entre ambas (timeouts, capas, proxy, dummy) salvo el propio despliegue de código que se quiere comparar.
5. **Cercanía en el tiempo**, para reducir deriva de entorno.

### Campos volátiles — hay que ignorarlos en el diff

Varios escenarios generan valores que **cambian en cada ejecución aunque el código sea idéntico**:

- `{{$timestamp}}` en `idPeticion`.
- Tokens dinámicos.
- Fechas/horas en respuestas.
- Identificadores de infraestructura (`x-amzn-RequestId`, `x-amzn-Trace-Id`).

El diff prod vs dev **debe normalizar o excluir** estos campos. Si no, aparecerán como "diferencias" que no lo son y ensucian el informe.

---

## Resumen

- **Ahora:** recopilar (mecánico) + mantener dev cumpliendo lo esperado.
- **Después:** informe humano que compara, discute y justifica, usando los datos recopilados.
- La herramienta **da datos y diferencias candidatas**; **no** decide ni redacta el informe.
