# Comparar código PROD vs DEV con los mismos escenarios

**Retomo global:** [`../00-estado-y-retomo.md`](../00-estado-y-retomo.md)

Diseño de una mejora al generador (`../generador/`) para **grabar el resultado de cada escenario** y **etiquetar con qué versión de código** se ejecutó, de modo que se pueda comparar cómo responde la **versión productiva** frente a una **versión en desarrollo**, corriendo ambas en el **mismo ambiente AWS de desarrollo**.

Estado: **implementado** (2026-07-10) en `../generador/run-newman.js` y `../generador/comparar-runs.js`. Falta validarlo con un run real en la máquina VPN (una corrida prod y una dev). Ver checklist en [`../00-estado-y-retomo.md`](../00-estado-y-retomo.md).

---

## Por qué (caso real)

Se detectó una diferencia real entre el código de producción y el de desarrollo de `tld-validador-api`: en errores planos del producto, dev metía `statusCode` dentro de `respuesta` y prod no. Ver [`../../tld-validador-api/diferencia-prod-vs-dev-respuesta-producto.md`](../../tld-validador-api/diferencia-prod-vs-dev-respuesta-producto.md).

Ese tipo de diferencia **no se ve** con el flujo actual (que solo reporta fallos). La idea es tener un registro por escenario, etiquetado por versión de código, para que **cualquiera** pueda:

1. Desplegar la versión **productiva** en AWS dev y correr los escenarios → guardar qué respondió cada uno.
2. Desplegar la versión **en desarrollo** en el mismo AWS dev y correr los mismos escenarios → guardar qué respondió cada uno.
3. **Comparar** ambas salidas escenario por escenario.

Muchos escenarios van a **fallar el assert** cuando corras la versión productiva (los asserts están alineados a dev). **No importa**: lo que se busca es capturar la **respuesta real**, no que todo quede verde.

---

## Dos fases (no confundir)

| Fase | Qué es | Quién / qué lo hace | Cuándo |
|------|--------|---------------------|--------|
| **Recopilación** | Correr los escenarios con código prod y con código dev, y **guardar la respuesta de cada escenario** etiquetada por versión. | Newman + `run-newman.js` (mecánico, reproducible). | **Ahora.** |
| **Informe** | Documento para **presentar y discutir**: "en prod hoy pasa esto; con el cambio pasa esto otro, y así se justifica". | **Personas.** El diff automático es solo un insumo, no el informe. | **Más adelante.** |

El informe **no lo genera Newman**. La herramienta recopila datos comparables y, como mucho, lista diferencias candidatas; la interpretación y la justificación son humanas. Ver [`04-informe-y-recopilacion.md`](04-informe-y-recopilacion.md).

**Prioridad actual:** recopilar bien la información **y** seguir verificando que el código en desarrollo cumple lo que hoy esperamos (asserts dev en verde con código dev).

---

## Concepto clave: ambiente ≠ versión de código

No confundir dos cosas distintas:

| Concepto | Valor en esta idea |
|----------|--------------------|
| **Ambiente AWS** | Siempre **desarrollo** (URLs del environment Postman `*-desarrollo`). |
| **Versión de código desplegada** | A veces **prod** (`prod/tld-validador-api-main`, etc.), a veces **dev** (rama en curso). |

No es "correr Newman contra producción". Es **mismo endpoint de dev, distinto código en las lambdas**.

---

## Documentos

| Archivo | Contenido |
|---------|-----------|
| [`01-diseno-salida-por-escenario.md`](01-diseno-salida-por-escenario.md) | Qué se graba por escenario, de dónde sale, formato de salida |
| [`02-etiqueta-version-codigo.md`](02-etiqueta-version-codigo.md) | Cómo se indica prod/dev (flag + variable de entorno) y cómo llega al informe |
| [`03-plan-implementacion.md`](03-plan-implementacion.md) | Cambios concretos en `run-newman.js`, orden y qué no romper |
| [`04-informe-y-recopilacion.md`](04-informe-y-recopilacion.md) | Las dos fases, qué es el informe (humano), y condiciones para que la comparación sea válida |

---

## Relación con lo que ya existe

- **`../generador/run-newman.js`**: script que corre Newman y arma logs. Aquí se le agregan salidas, sin cambiar su comportamiento actual.
- **`../generador/logs/`**: destino de las salidas nuevas, junto a las de hoy.
- **`../ideas-rastreo-evidencias.md`**: evidencia por escenario (RequestId, TraceId, telemetría). Complementario: aquella nota es *qué* capturar de cada respuesta; esta carpeta es *comparar dos versiones de código* con esas capturas.

---

## Regla de máquinas (recordatorio)

Newman lo corre el **usuario en la máquina con VPN**; commit + push de `logs/`. El agente (Lenovo, sin VPN) **no ejecuta Newman**. Ver [`../generador/logs/README.md`](../generador/logs/README.md).
