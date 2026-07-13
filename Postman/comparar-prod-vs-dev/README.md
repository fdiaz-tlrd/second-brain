# Comparar código PROD vs DEV con los mismos escenarios

**Retomo global:** [`../00-estado-y-retomo.md`](../00-estado-y-retomo.md)

Diseño de una mejora al generador (`../generador/`) para **grabar el resultado de cada escenario** y **etiquetar con qué versión de código** se ejecutó, de modo que se pueda comparar cómo responde la **versión productiva** frente a una **versión en desarrollo**, corriendo ambas en el **mismo ambiente AWS de desarrollo**.

Estado: **tres recopilaciones** (jul-2026): iter 01 URL mala, iter 02 MATRIZ post-fix, iter 03 VALIDADOR directo.
Hallazgo matriz: [`07-matriz-validacion-cuerpo-json.md`](07-matriz-validacion-cuerpo-json.md).
Estudio negocio: [`08-esperado-vs-recibido-prod.md`](08-esperado-vs-recibido-prod.md) (~22 % diverge).
HTTP vs negocio: [`10-http-vs-codigoerror.md`](10-http-vs-codigoerror.md) (MATRIZ aplana HTTP a 200).
Tabla escenario a escenario: [`09-tabla-comparacion-escenarios.md`](09-tabla-comparacion-escenarios.md).
**Captura fortalecida (jul-2026):** [`11-captura-fortalecida.md`](11-captura-fortalecida.md) — canal determinista `[CAPTURA]`; captura req claro/cifrado, resp cruda, headers, tiempo. Re-ejecutar MATRIZ/VALIDADOR/VCN desde cero.
**Revisión código de respuesta (payload) escenario a escenario:** [`12-revision-codigos-respuesta-vcn.md`](12-revision-codigos-respuesta-vcn.md) — 70 divergencias, veredicto TEST-MAL / PROD-MAL por escenario. Helper: `recopilacion/listar-divergencias-negocio.js`.
Estudio código real de producción: [`../../produccion_real/01-tld-matriz-validador-validar.md`](../../produccion_real/01-tld-matriz-validador-validar.md).
Pendiente: 3 corridas nuevas con captura fortalecida; luego comparar y revisar uno a uno; Marketplace.

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
| [`07-matriz-validacion-cuerpo-json.md`](07-matriz-validacion-cuerpo-json.md) | 6 escenarios fuera de plan en flujo Matriz→Validador→VCN; `isValid`; pregunta abierta |
| [`08-esperado-vs-recibido-prod.md`](08-esperado-vs-recibido-prod.md) | **~43 % ejecuciones difieren** del plan (prod vs expected dev); patrones y por bloque |
| [`09-tabla-comparacion-escenarios.md`](09-tabla-comparacion-escenarios.md) | **Tabla 3 columnas** esperado/MATRIZ/VALIDADOR por escenario (solo diferencias); 8 casos donde la ruta importa |
| [`recopilacion/`](recopilacion/) | **Runs reales** analizados (iter 01–03, jul-2026) |

---

## Relación con lo que ya existe

- **`../generador/run-newman.js`**: script que corre Newman y arma logs. Aquí se le agregan salidas, sin cambiar su comportamiento actual.
- **`../generador/logs/`**: destino de las salidas nuevas, junto a las de hoy.
- **`../ideas-rastreo-evidencias.md`**: evidencia por escenario (RequestId, TraceId, telemetría). Complementario: aquella nota es *qué* capturar de cada respuesta; esta carpeta es *comparar dos versiones de código* con esas capturas.

---

## Regla de máquinas (recordatorio)

Newman lo corre el **usuario en la máquina con VPN**; commit + push de `logs/`. El agente (Lenovo, sin VPN) **no ejecuta Newman**. Ver [`../generador/logs/README.md`](../generador/logs/README.md).
