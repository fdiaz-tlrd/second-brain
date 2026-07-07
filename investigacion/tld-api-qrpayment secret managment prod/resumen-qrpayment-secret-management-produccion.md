# tld-api-qrpayment — Secret Management en producción

Documento estructurado a partir del análisis sobre la liberación a producción del componente QR-Payment (Kotkas) y la dependencia de `tld-api-qrpayment` con AWS Secrets Manager.

**Fecha de contexto:** 07/07/2026  
**Caso inmediato:** CCL-7721 (liberación programada)  
**Consulta origen:** Johany Caballero Ríos (Control de Cambios)

---

## 1. Situación actual

Johany consultó si CCL-7721 se libera desde la rama productiva. Control de Cambios necesita una respuesta clara antes de la salida.

Felix está analizando el tema (correos, CCL, impacto técnico) para dar una respuesta sustentada. El análisis no es inmediato: involucra varios componentes, CCL cruzados y una pre-liberación que no se ejecutó en producción.

---

## 2. Arquitectura y flujo de comunicación

### 2.1 Flujos de servicio

```
[Servicio Xpress por Telered]  -->  [QR-Payment de Kotkas]

[tld-matriz -> tld-validador-api -> tld-api-alias -> tld-api-qrpayment]  -->  [QR-PAYMENT]
```

### 2.2 Componentes del lado Telered

| Componente | Rol | Notas |
|------------|-----|-------|
| **tld-api-alias** | Ya existía; se modificó para generar y leer QR | Cambios hechos por Edwin (ya no en el equipo) |
| **tld-api-qrpayment** | Componente nuevo creado por Felix | Consume QR-Payment del proveedor |
| **QR-PAYMENT** | Componente del proveedor Kotkas | Felix no tiene injerencia en su desarrollo; ambiente AWS armado con apoyo de Cibernética |

### 2.3 Dependencia crítica: Secrets Manager

`tld-api-qrpayment` depende de un **secret en AWS Secrets Manager** para obtener:

- Entidad Financiera
- `apikey`
- `secretkey`

Con esos datos se conecta a QR-Payment. El ARN del secret se configura en el archivo de configuración por ambiente del repositorio `tld-api-qrpayment`.

---

## 3. CCL involucrados

| CCL | Repositorio / alcance | Descripción |
|-----|----------------------|-------------|
| **CCL-7721** | QR-PAYMENT (Kotkas) | Despliegue estratégico ACH del componente QR-Payment del proveedor. En versionamiento aparece como ubicación de paquete: `https://github.com/Telered-Autopista/tld-api-qrpayment` (posible relación con actualización de ARN; **no confirmado**) |
| **CCL-7822** | `tld-api-alias` | Cambios en alias para QR; incluye manual de pre-liberación |
| **CCL-7778** | `tld-api-qrpayment` | Componente nuevo de integración con QR-Payment |

### 3.1 Trazabilidad de merge (correo Johany, 08/05/2026)

| JIRA | Repositorio | Hacia la rama | Desde la rama | PR | Hash ID |
|------|-------------|---------------|---------------|-----|---------|
| CCL-7822 | tld-api-alias | **main** (producción) | qa | #139 | `f2255b66a9ae8af919125e6e1b08c47d582b55d3` |
| CCL-7778 | tld-api-qrpayment | N/A | feature/CCL-7778 | N/A | `3f462456381d28b8bd07075a9ea56e2c553de627` |

**Aclaración de Emory (07/05/2026):** mantener separación estricta entre casos y repositorios para evitar confusiones.

Cadena de correos iniciada para despliegue en QA (asunto con QA), pero la tabla de Hash ID de Johany ya referencia **main** para `tld-api-alias`.

---

## 4. Manual de pre-liberación

### 4.1 Documento

- **Nombre:** `(FMR-CCL-002) Manual de Instalación - CCL-7822 - pre-liberacion.docx`
- **Versión:** 1.2
- **Subido en CCL-7822:** 20/01/2026
- **También referenciado en CCL-7721:** misma versión 1.2; historial de cambios indica cambio de número de CCL de 7822 a 7721

### 4.2 Qué cubre el manual

1. Crear nueva Entidad Financiera / Banco en el sitio web de administración de QR-PAYMENT.
2. Crear el secret en AWS Secrets Manager con la información correspondiente.
3. Entregar el **ARN** a Felix para configurarlo en la plantilla de `tld-api-qrpayment` por ambiente.

### 4.3 Qué se hizo y qué no

| Ambiente | Manual ejecutado | Secret creado | QR-PAYMENT instalado |
|----------|------------------|---------------|----------------------|
| **QA** | Sí | Sí | Sí (en su momento) |
| **Producción** | **No** | **No** | **No** (CCL-7721 pendiente / en curso) |

En reunión del **07/01/2026** Felix indicó explícitamente:

> Crear el secret y compartir el ARN **antes** de la liberación de QR-Payment, porque hay que actualizar la configuración de `tld-api-qrpayment` para instalarlo en producción en la misma salida que QR-PAYMENT. Después, con el sitio web de administración de QR-Payment en producción, crear la entidad financiera y actualizar el secret.

**Nadie ejecutó la pre-liberación en producción**, en parte porque no se instaló el componente QR-PAYMENT (CCL-7721).

---

## 5. Problema central

La liberación de CCL-7721 (QR-PAYMENT de Kotkas) no puede tratarse como un despliegue aislado del proveedor. `tld-api-qrpayment` **no funcionará en producción** sin:

1. Secret de AWS creado (aunque inicialmente pueda ir con valores parciales).
2. ARN del secret configurado en `tld-api-qrpayment`.
3. Despliegue coordinado de `tld-api-qrpayment` en la misma ventana que QR-PAYMENT.

### 5.1 Riesgo adicional: rama QA de tld-api-qrpayment

`tld-api-qrpayment` también atiende **P2M QR**, trabajo en curso y en certificación en QA. La rama de QA tiene **cambios que no deben ir a producción**.

No se puede mergear QA → main de forma directa para esta salida.

### 5.2 Punto de partida técnico seguro

Commit de referencia en feature/CCL-7778:

`3f462456381d28b8bd07075a9ea56e2c553de627`

---

## 6. Propuesta de camino (recomendación de Felix)

Orden sugerido para alinear producción sin arrastrar cambios P2M de QA:

1. **Ejecutar pre-liberación (parcial)** según `(FMR-CCL-002) Manual de Instalación - CCL-7822 - pre-liberacion.docx`, **sin** la parte de creación de Entidad Financiera en QR-PAYMENT (ese componente aún no existía cuando se redactó para prod).
2. **Crear el secret en AWS** en producción y obtener el ARN.
3. **Actualizar configuración** en `feature/CCL-7778` (`3f46245…`) con el ARN del secret de producción.
4. **Solicitar a Johany (Control de Versiones)** un PR de esa rama/feature hacia la rama de producción (`main`).
5. **Desplegar `tld-api-qrpayment`** en la **misma ventana** de salida a producción de QR-PAYMENT (CCL-7721).
6. Con el sitio web de administración de QR-Payment ya disponible en producción: **crear la entidad financiera**.
7. **Post-liberación:** completar los valores del secret de producción con los datos reales de la entidad financiera.

---

## 7. Preguntas abiertas

| Pregunta | Estado |
|----------|--------|
| ¿CCL-7721 se libera desde rama productiva? | En análisis; depende de cómo esté empaquetado QR-PAYMENT vs. repo `tld-api-qrpayment` |
| ¿Por qué CCL-7721 apunta a `github.com/Telered-Autopista/tld-api-qrpayment` en versionamiento? | Posible relación con actualización de ARN; **no confirmado** |
| ¿Qué rama/commit exacto debe salir a prod para `tld-api-qrpayment`? | Propuesta: feature/CCL-7778 con ARN actualizado, no QA |

---

## 8. Referencias

- **Correo Emory → Johany:** 07/05/2026 — separación CCL-7822 / CCL-7778 por repositorio.
- **Correo Johany:** 08/05/2026 — fusión a main de `tld-api-alias` y Hash IDs.
- **Manual:** `(FMR-CCL-002) Manual de Instalación - CCL-7822 - pre-liberacion.docx` v1.2 (CCL-7822 y CCL-7721).
- **Reunión:** 07/01/2026 — solicitud de crear secret y ARN antes de liberación QR-Payment.
- **Hilo DES-1017:** P2P QR - Autopista - Solicitud para merge y despliegue en QA (cadena de correos de trazabilidad).

---

## 9. Mensaje clave para Control de Cambios

La salida de **CCL-7721** (QR-PAYMENT Kotkas) requiere **coordinación** con **CCL-7778** (`tld-api-qrpayment`):

- Sin secret de AWS y ARN configurado, `tld-api-qrpayment` no puede autenticarse contra QR-Payment en producción.
- La pre-liberación documentada en CCL-7822 **no se ejecutó** en producción.
- No usar la rama QA actual de `tld-api-qrpayment` (contiene trabajo P2M no apto para esta salida).
- Instalar y desplegar `tld-api-qrpayment` en la **misma ventana** que QR-PAYMENT, con post-liberación para completar el secret una vez exista la entidad financiera en el admin de Kotkas.
