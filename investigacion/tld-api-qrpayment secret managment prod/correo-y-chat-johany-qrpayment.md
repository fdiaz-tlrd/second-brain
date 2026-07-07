# Borrador — correo y chat (Johany / CCL-7721)

Archivo de trabajo para compartir el análisis de `tld-api-qrpayment` y Secret Management en producción. Ajustar destinatarios, asunto y firma antes de enviar.

**Principio:** solo lo crítico. El detalle completo va en el HTML adjunto.

---

## Chat con Johany (Teams / mensaje directo)

Usar antes o junto con la captura de pantalla del resumen.

### Versión corta (recomendada)

```
Hola Johany,

Ya terminé el análisis de tu consulta sobre CCL-7721. Te mando un correo en un momento con el sustento.

En resumen: la salida de QR-PAYMENT (CCL-7721) no puede ir sola — necesita coordinarse con tld-api-qrpayment (CCL-7778) y con la pre-liberación del secret en AWS que en producción aún no se hizo.

En el correo va el detalle y un informe adjunto. Cualquier duda me avisas.
```

### Versión un poco más explícita (si prefieres dar un poco más en el chat)

```
Hola Johany,

Ya revisé lo de CCL-7721. Te envío un correo con el análisis completo.

Lo importante: liberar solo QR-PAYMENT (Kotkas) no alcanza. tld-api-qrpayment depende de un secret en AWS (ARN en configuración) y esa pre-liberación no se ejecutó en producción. Además, la rama QA de tld-api-qrpayment tiene cambios de P2M que no deben salir en esta ventana.

La recomendación es coordinar CCL-7721 con CCL-7778 en la misma salida. En el correo va el paso a paso y el informe adjunto.
```

---

## Correo

### Destinatarios sugeridos

- **Para:** Johany Caballero Ríos
- **CC:** Estratégica ACH (y quienes correspondan en Control de Cambios / infra)

### Asunto (opciones)

- `CCL-7721 — análisis liberación QR-PAYMENT y dependencia con tld-api-qrpayment`
- `Respuesta consulta CCL-7721 — coordinación QR-PAYMENT / Secret Management producción`

### Cuerpo del correo

```
Hola Johany,

Comparto el análisis solicitado sobre la liberación a producción de CCL-7721 (componente QR-PAYMENT de Kotkas) y su relación con tld-api-qrpayment.

Adjunto un informe en HTML con el detalle técnico, trazabilidad de CCL y propuesta de camino. Aquí va lo esencial:

**Respuesta directa**

La salida de CCL-7721 no puede tratarse como un despliegue aislado del proveedor. Para que Telered consuma QR-PAYMENT en producción, hace falta desplegar también tld-api-qrpayment (CCL-7778) en la misma ventana.

**Por qué**

tld-api-qrpayment necesita un secret en AWS Secrets Manager (Entidad Financiera, apikey, secretkey). El ARN de ese secret va en la configuración del componente. En QA eso se hizo según el manual de pre-liberación (CCL-7822 / FMR-CCL-002 v1.2); en producción esa pre-liberación no se ejecutó.

Sin secret creado y ARN configurado, tld-api-qrpayment no puede autenticarse contra QR-PAYMENT en producción.

**Riesgo a evitar**

No usar la rama QA actual de tld-api-qrpayment para esta salida: incluye trabajo de P2M QR en certificación que no debe ir a producción. El punto de partida propuesto es feature/CCL-7778, con el ARN de producción actualizado antes del merge a main.

**Pasos recomendados (orden)**

1. Ejecutar la pre-liberación en producción (crear secret en AWS; sin crear aún la entidad financiera en el admin de Kotkas si QR-PAYMENT aún no está).
2. Compartir el ARN para actualizar la configuración de tld-api-qrpayment.
3. PR de feature/CCL-7778 hacia main (Control de Versiones).
4. Desplegar tld-api-qrpayment en la misma ventana que CCL-7721.
5. Post-liberación: crear la entidad financiera en el admin de QR-Payment y completar los valores del secret.

El informe adjunto desarrolla arquitectura, CCL involucrados (7721, 7778, 7822), trazabilidad de correos y preguntas que siguen en revisión.

Quedo atento para alinear los siguientes pasos con Control de Cambios.

Saludos,

Felix Díaz
```

---

## Adjuntos sugeridos

| Archivo | Descripción |
|---------|-------------|
| `resumen-qrpayment-secret-management-produccion.html` | Informe portable (abrir en navegador) |
| `resumen-qrpayment-secret-management-produccion.md` | Misma información en Markdown (opcional) |

---

## Regenerar el HTML

Si actualizas el `.md`, vuelve a generar el HTML:

```bash
node generar-html-resumen-qrpayment.js
```

---

## Notas de tono (uso interno)

- No culpar a nadie por la pre-liberación no ejecutada; describir el hecho y el impacto.
- Dejar claro que Felix no administra QR-PAYMENT (Kotkas); su alcance es tld-api-qrpayment y la coordinación.
- El chat avisa y orienta; el correo lleva el sustento sin repetir todo el informe en el cuerpo.
