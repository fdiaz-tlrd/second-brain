# Origen

Las siguientes Historias de Usuario fueron recibidas como insumo para el presente análisis. El texto de Jira no se corrige en este análisis.

Las definiciones confirmadas de la sección siguiente aplican a IPEDA-3605 e IPEDA-3606. No fueron confirmadas para IPEDA-3679 ni para IPEDA-3680.

## Historia de Usuario 1

**ID Jira:** IPEDA-3605

**Descripción:**

Reporte de facturación P2M.

### Criterios de aceptación

Facturación P2M:

- La consulta al Directorio tendrá costo de 0.03; sin importar si es cruzadas o propias.
- Puntos que se consideran consulta al directorio P2M:
  - Catálogo: Cuando el usuario selecciona un comercio para realizar el pago.
  - Lectura del QR: Toda lectura de un QR P2M también debe considerarse una consulta al directorio.
- Se entregan los datos de facturación en el mismo modelo de la facturación Xpress P2P en Apex.

---

## Historia de Usuario 2

**ID Jira:** IPEDA-3606

**Descripción:**

Archivo de consultas diarias.

### Criterios de aceptación

- Se debe crear un archivos diarios generados para cada IF, con estructura similar al formato adoptado en archivo P2P-Xpress.
- Listado de las consultas realizadas en el día anterior por método (Catálogo, QR, etc.).
- Listado de las transferencias exitosas P2M realizadas en ACH Directo en el día anterior.
- Archivo debe ser generado y agregado en carpeta EFT de cada IF cada día.

---

## Historia de Usuario 3

**ID Jira:** IPEDA-3679

**Título en Jira:** Reporte diario de comisiones P2M - Telered

**Descripción:**

Visualización diaria de comisiones generadas por P2M, acreditadas mediante la compensación en la cuenta bancaria de recaudo de Telered.

Como Gerente de Contabilidad, quiero contar con un reporte diario que consolide por IF las comisiones generadas por las transacciones de P2M compensadas y que dicha comisión sea acreditada a la cuenta de recaudo brindada por Telered.

Se debe poder generar en el APEX diariamente un reporte consolidado de las comisiones obtenidas por las transacciones procesadas y compensadas en la cuenta bancaria de recaudo.

El reporte deberá permitir visualizar el total de ingresos generados por cada IF para Telered durante el período consultado.

### Criterios de aceptación

Escenario 1: Generación del reporte diario.

- Dado que existen transacciones P2M compensadas en el sistema ACH Directo.
- Cuando se solicite el reporte diario desde el APEX.
- Entonces el sistema deberá generar un reporte correspondiente a la fecha del proceso solicitada e incluir únicamente la comisión correspondiente a Telered que ha sido acreditada a su cuenta contable.

Escenario 2: Visualización de ingresos por comisiones.

- Dado que el reporte diario ha sido generado.
- Cuando el usuario consulte el reporte.
- Entonces deberá visualizar:
  - Fecha del reporte
  - Banco de recaudo
  - Fecha de proceso
  - Nombre del reporte: Distribución de cargos P2M a Telered
  - Número de cuenta
  - Cantidad de transacciones compensadas
  - IF que acredita
  - Monto de comisión recibido
  - Monto total de comisiones generadas diarias

Escenario 3: Exportación del reporte.

- Dado que el usuario requiere realizar análisis o conciliación.
- Cuando seleccione la opción de exportar.
- Entonces el sistema deberá permitir descargar el reporte en formato Excel y/o CSV.

Reglas de negocio:

- Solo deben considerarse transacciones con estado "Compensada".
- Las comisiones acreditadas deben cuadrar con el cálculo del sistema y lo indicado en el tarifario vigente configurado para el servicio P2M.
- El reporte deberá conservar información histórica para consultas posteriores.
- Los montos deberán mostrarse en la moneda de liquidación correspondiente.

---

## Historia de Usuario 4

**ID Jira:** IPEDA-3680

**Título en Jira:** Reporte mensual de comisiones P2M - Telered

**Descripción:**

Visualización mensual de comisiones generadas por P2M, acreditadas diariamente mediante la compensación en la cuenta bancaria de recaudo de Telered.

Como Gerente de Contabilidad, quiero contar con un reporte mensual que consolide por IF las comisiones generadas por las transacciones de P2M compensadas y que dicha comisión sea acreditada a la cuenta de recaudo brindada por Telered.

Se debe poder generar en el APEX al cierre del mes un reporte consolidado de las comisiones obtenidas por las transacciones procesadas y compensadas durante el mes en la cuenta bancaria de recaudo.

El reporte deberá permitir visualizar el total de ingresos generados por cada IF para Telered una vez cerrado el mes consultado.

### Criterios de aceptación

Escenario 1: Generación del reporte mensual.

- Dado que existen transacciones P2M compensadas diariamente en el sistema ACH Directo.
- Cuando se solicite el reporte mensual desde el APEX.
- Entonces el sistema deberá generar un reporte con el consolidado de todas las comisiones correspondiente a la fecha del proceso solicitada e incluir únicamente la comisión correspondiente a Telered que ha sido acreditada a su cuenta contable durante el mes consultado.

Escenario 2: Exportación del reporte.

- Dado que el usuario requiere realizar análisis o conciliación.
- Cuando seleccione la opción de exportar.
- Entonces el sistema deberá permitir descargar el reporte en formato Excel y/o CSV.

IPEDA-3680 no trae escenario de visualización ni reglas de negocio.

---

# Definiciones Confirmadas

Estas definiciones aplican a la facturación y a los archivos diarios de IPEDA-3605 e IPEDA-3606.

1. El cobro de B/.0.03 aplica a las consultas al Directorio P2M.
2. El cobro aplica independientemente de que posteriormente exista o no una transferencia.
3. En el flujo de catálogo P2M, la consulta al Directorio P2M que se utiliza para la facturación corresponde al método **0018**, mediante el cual se crea una solicitud de pago.
4. La lectura de un QR P2M no debe considerarse por sí sola una consulta al Directorio P2M. En el flujo QR P2M se realiza posteriormente una llamada al método **0018**, el cual es el evento considerado para facturación.
5. Para efectos de facturación, una **Consulta Directorio P2M** corresponde a una ejecución del método **0018**.
6. La generación de los reportes de facturación debe seguir el mismo modelo actualmente utilizado para Xpress P2P en Apex.
7. La generación de los archivos diarios de consultas y transferencias entregados a las Instituciones Financieras debe seguir el mismo modelo actualmente utilizado para Xpress.

### Flujo de referencia

```text
Catálogo
   └─ 0017 (Búsqueda en Directorio)
      └─ 0018 (Solicitud de Pago)
             └─ Facturable

QR
   └─ 0025 (Lectura QR)
      └─ 0018 (Solicitud de Pago)
             └─ Facturable
```

Ese flujo no se extiende a IPEDA-3679 ni a IPEDA-3680. Esas historias hablan de comisión por transacción compensada, no de consulta al Directorio.

---

# Normalización para Análisis

Con el objetivo de facilitar la trazabilidad dentro del presente documento, se asignan los siguientes identificadores internos.

## HDU-001

**Jira de origen:** IPEDA-3605

**Título:** Reporte de facturación P2M

### Criterios de Aceptación

| ID | Descripción |
|------|------|
| CA-001 | La Consulta Directorio P2M tendrá un costo de B/.0.03 independientemente de si corresponde a una operación propia o cruzada. |
| CA-002 | Toda ejecución del método 0018 deberá considerarse una Consulta Directorio P2M facturable. |
| CA-003 | La información de facturación deberá presentarse utilizando el mismo modelo actualmente utilizado para Xpress P2P en Apex. |

---

## HDU-002

**Jira de origen:** IPEDA-3606

**Título:** Archivo diario de consultas P2M

### Criterios de Aceptación

| ID | Descripción |
|------|------|
| CA-004 | Generar un archivo diario de consultas para cada IF. |
| CA-005 | El archivo deberá mantener una estructura similar al archivo de consultas de P2P-Xpress. |
| CA-006 | El archivo deberá incluir las consultas realizadas durante el día anterior. |
| CA-007 | El archivo deberá colocarse diariamente en la carpeta EFT correspondiente a cada IF. |

---

## HDU-003

**Jira de origen:** IPEDA-3606

**Título:** Archivo diario de transferencias P2M

### Criterios de Aceptación

| ID | Descripción |
|------|------|
| CA-008 | Generar un archivo diario de transferencias para cada IF. |
| CA-009 | El archivo deberá mantener una estructura similar al archivo de transferencias de P2P-Xpress. |
| CA-010 | El archivo deberá incluir las transferencias P2M realizadas en ACH Directo durante el día anterior. |
| CA-011 | El archivo deberá colocarse diariamente en la carpeta EFT correspondiente a cada IF. |

---

## HDU-004

**Jira de origen:** IPEDA-3679

**Título:** Reporte diario de comisiones P2M - Telered

Los criterios siguientes repiten lo escrito en Jira. No se completa lo que la historia no dice. Las brechas B-001 a B-008, B-011 y B-012 aplican a esta historia.

### Criterios de Aceptación

| ID | Descripción |
|------|------|
| CA-012 | Desde APEX se genera un reporte diario para la fecha de proceso solicitada cuando existen transacciones P2M compensadas en ACH Directo. |
| CA-013 | El reporte incluye únicamente la comisión de Telered que ha sido acreditada a su cuenta contable. |
| CA-014 | El reporte consolida por IF las comisiones de las transacciones P2M compensadas y muestra el total de ingresos generados por cada IF para Telered. |
| CA-015 | Al consultar el reporte se visualizan: fecha del reporte, banco de recaudo, fecha de proceso, nombre del reporte «Distribución de cargos P2M a Telered», número de cuenta, cantidad de transacciones compensadas, IF que acredita, monto de comisión recibido y monto total de comisiones generadas diarias. |
| CA-016 | El reporte se descarga en formato Excel y/o CSV. |
| CA-017 | Solo entran transacciones con estado «Compensada». |
| CA-018 | Las comisiones acreditadas cuadran con el cálculo del sistema y con el tarifario vigente configurado para el servicio P2M. |
| CA-019 | El reporte conserva información histórica para consultas posteriores. |
| CA-020 | Los montos se muestran en la moneda de liquidación correspondiente. |

---

## HDU-005

**Jira de origen:** IPEDA-3680

**Título:** Reporte mensual de comisiones P2M - Telered

Los criterios siguientes repiten lo escrito en Jira. Las reglas y los campos de IPEDA-3679 no se copian a esta historia. Las brechas B-001, B-002, B-006, B-009, B-010 y B-012 aplican a esta historia.

### Criterios de Aceptación

| ID | Descripción |
|------|------|
| CA-021 | Desde APEX, al cierre del mes, se genera un reporte mensual que consolida por IF las comisiones de las transacciones P2M compensadas. |
| CA-022 | El reporte incluye únicamente la comisión de Telered acreditada a su cuenta contable durante el mes consultado, y muestra el total de ingresos generados por cada IF para Telered una vez cerrado ese mes. |
| CA-023 | El mismo escenario de Jira también pide el consolidado correspondiente a la fecha del proceso solicitada. |
| CA-024 | El reporte se descarga en formato Excel y/o CSV. |

---

# Brechas

Estas brechas salen del texto de IPEDA-3679 e IPEDA-3680 comparado con lo ya confirmado para IPEDA-3605 e IPEDA-3606. Impiden dar por cerrado el requerimiento correspondiente. No se resuelven reinterpretando las historias.

## B-001

**Historias:** IPEDA-3679, IPEDA-3680

La facturación confirmada y estas comisiones son hechos distintos.

| | IPEDA-3605 / IPEDA-3606 | IPEDA-3679 / IPEDA-3680 |
|------|------|------|
| Hecho | Ejecución del método 0018 | Transacción P2M compensada |
| Importe | B/.0.03 por consulta, propia o cruzada | Tarifario vigente del servicio P2M; el valor no está en la historia |
| Destino del análisis | Cargo a bancos y archivos a cada IF | Comisión de Telered en su cuenta de recaudo |
| Condición de transferencia | El cobro no depende de que exista transferencia | La historia exige transacción compensada |

B/.0.03 no es la tarifa de IPEDA-3679 ni de IPEDA-3680. El método 0018 no es la fuente de esos dos reportes.

## B-002

**Historias:** IPEDA-3679, IPEDA-3680

La descripción pide que la comisión sea acreditada en la cuenta de recaudo de Telered, mediante la compensación. El escenario de generación pide que el reporte incluya solo la comisión que ya fue acreditada a la cuenta contable.

No hay escenario del movimiento de acreditación: cuenta concreta, momento, proceso que acredita, asiento, ni qué se hace si la acreditación no ocurrió.

La descripción dice «cuenta bancaria de recaudo». El escenario dice «cuenta contable». La historia no dice que sean la misma cuenta.

Con el texto actual, lo comprobable es el reporte de una comisión ya acreditada. La acreditación misma no queda especificada como función a construir.

## B-003

**Historia:** IPEDA-3679

CA-018 exige cuadrar la comisión con el cálculo del sistema y con el tarifario vigente de P2M. La historia no trae el tarifario: ni valor, ni fórmula, ni base de cálculo, ni vigencia.

Ese dato no se completa con el B/.0.03 de la consulta al Directorio.

## B-004

**Historia:** IPEDA-3679

CA-015 lista los campos y no dice cuáles son encabezado y cuáles se repiten por IF.

Queda sin definir:

- Si banco de recaudo y número de cuenta son la cuenta de Telered, una sola vez, o un dato por fila.
- Si la cantidad de transacciones compensadas es del día o de cada IF.
- Si el monto total de comisiones generadas diarias es la suma del reporte o un valor por fila.
- Si hay una fila por cada IF que acredita.

## B-005

**Historia:** IPEDA-3679

La descripción pide el total de ingresos de cada IF durante el período consultado. El escenario 1 pide el reporte de la fecha de proceso solicitada.

El criterio del escenario es un día de proceso. La historia no define un rango de fechas.

## B-006

**Historias:** IPEDA-3679, IPEDA-3680

La exportación queda escrita como Excel y/o CSV. Ese texto no fija si los dos formatos son obligatorios o si basta con uno.

El reporte de facturación de este análisis (`RPT-999-M-COBRAR-DIRECTO`) es `.xlsx` porque IPEDA-3605 pide el modelo Xpress. IPEDA-3679 e IPEDA-3680 no piden ese modelo. El formato Xpress no cierra esta exportación.

## B-007

**Historia:** IPEDA-3679

CA-019 exige conservar historia para consultas posteriores. No dice plazo, soporte ni desde qué fecha queda consultable.

## B-008

**Historia:** IPEDA-3679

CA-020 exige la moneda de liquidación correspondiente. La historia no nombra la moneda.

## B-009

**Historia:** IPEDA-3680

El escenario 1 pide, en la misma oración, el consolidado de la fecha de proceso solicitada y la comisión acreditada durante el mes consultado.

La descripción pide generarlo al cierre del mes y ver el total una vez cerrado el mes consultado. No hay criterio para un mes que todavía no cerró, ni el parámetro de entrada: mes, o una fecha de proceso.

CA-022 y CA-023 no se pueden construir como una sola regla.

## B-010

**Historia:** IPEDA-3680

IPEDA-3680 no define:

- nombre del reporte
- campos
- filtro por estado «Compensada»
- cuadre contra el tarifario
- conservación histórica
- moneda de liquidación

Esos puntos están solo en IPEDA-3679. No son criterios de aceptación de IPEDA-3680. El reporte mensual no se especifica copiando el diario.

## B-011

**Historias:** IPEDA-3606, IPEDA-3679

IPEDA-3606 pide transferencias exitosas P2M. IPEDA-3679 pide transacciones con estado «Compensada».

Las dos palabras no están definidas como el mismo conjunto. El archivo de transferencias de HDU-003 no es la fuente del reporte de comisiones.

## B-012

**Historias:** IPEDA-3679, IPEDA-3680

Jira dice que el reporte se solicita desde APEX. No nombra la aplicación, la página ni el código de reporte.

La página **Reportes ACH Directo**, dentro de **Application 1000 - Reportes de ACH Contabilidad**, fue definida para el reporte de facturación de IPEDA-3605. Poner ahí estos dos reportes es una decisión de ubicación de este análisis, no un criterio de Jira.

---

# Requerimientos Funcionales

RQF-001 a RQF-006 cubren IPEDA-3605 e IPEDA-3606.

RQF-007 y RQF-008 cubren solo lo que IPEDA-3679 e IPEDA-3680 escriben. Donde hay brecha, el requerimiento no inventa el dato.

## RQF-001

### Descripción

Implementar una nueva página denominada **Reportes ACH Directo** dentro de la aplicación **Application 1000 - Reportes de ACH Contabilidad**.

La página deberá permitir la ejecución y descarga de los reportes de facturación P2M.

### Configuración Inicial

| Procesar | Descarga | File Name | File Ext | Formats | Heading Label | Rowcount Label | Directory | Separator | Code |
|------|------|------|------|------|------|------|------|------|------|
| Botón | Botón | RPT-999-M-COBRAR-DIRECTO | .xlsx | Data | N | N | REPORTES_ACHDIRECTO | - | P2M_RPT_M_COBRAR |

### Trazabilidad

| HDU | CA |
|------|------|
| HDU-001 | CA-003 |

---

## RQF-002

### Descripción

Agregar una nueva opción **ACH Directo** en el menú lateral de la aplicación.

### Menú Actual

- Home
- Cobrar ACH
- Pagar Resumen Débito
- ACH Xpress

### Menú Propuesto

- Home
- Cobrar ACH
- Pagar Resumen Débito
- ACH Xpress
- ACH Directo

### Comportamiento

La opción **ACH Directo** deberá redirigir a la página **Reportes ACH Directo**.

### Trazabilidad

| HDU | CA |
|------|------|
| HDU-001 | CA-003 |

---

## RQF-003

### Descripción

Implementar el reporte **RPT-999-M-COBRAR-DIRECTO** tomando como referencia funcional y visual el reporte **RPT-999-M-COBRAR-XPRESS**.

### Ajustes de Encabezado

| Campo | RPT-999-M-COBRAR-XPRESS | RPT-999-M-COBRAR-DIRECTO |
|------|------|------|
| TIPO DE REPORTE | FACTURACION XPRESS | FACTURACION P2M |
| TARIFA | 0.015 | 0.03 |
| NOMBRE DEL REPORTE | CARGO XPRESS COBRAR A BANCOS | CARGO P2M COBRAR A BANCOS |

### Ajustes de Columnas

| RPT-999-M-COBRAR-XPRESS | RPT-999-M-COBRAR-DIRECTO |
|------|------|
| TRANSACCIONES CRUZADAS | CONSULTAS CRUZADAS |
| TRANSACCIONES PROPIAS | CONSULTAS PROPIAS |

### Trazabilidad

| HDU | CA |
|------|------|
| HDU-001 | CA-001, CA-003 |

---

## RQF-004

### Descripción

El reporte **RPT-999-M-COBRAR-DIRECTO** deberá calcular la facturación utilizando como fuente las ejecuciones del método **0018**.

### Estructura Esperada

| NOMBRE DE LA INSTITUCIÓN FINANCIERA | CONSULTAS CRUZADAS | CONSULTAS PROPIAS | CARGO CRUZADA | CARGO PROPIA | CARGO TOTAL |
|------|------|------|------|------|------|
| ABC | # | # | #.## | #.## | #.## |

### Reglas de Negocio

#### Consulta Cruzada

Se considerará una consulta cruzada cuando:

```text
bancoOrigen <> banco
```

#### Consulta Propia

Se considerará una consulta propia cuando:

```text
bancoOrigen = banco
```

#### Cargo Cruzada

```text
CONSULTAS_CRUZADAS x 0.03
```

#### Cargo Propia

```text
CONSULTAS_PROPIAS x 0.03
```

#### Cargo Total

```text
CARGO_CRUZADA + CARGO_PROPIA
```

### Trazabilidad

| HDU | CA |
|------|------|
| HDU-001 | CA-001, CA-002 |

---

## RQF-005

### Descripción

Generar diariamente un archivo de consultas P2M para cada IF.

El archivo deberá mantener la misma estructura actualmente utilizada para el archivo de consultas de Xpress.

### Máscara de Referencia

```text
AUTO.XPRESS.CONSULTAS.XXXXPAPA.OUT.YYYYDDDD.##
```

### Máscara Propuesta

```text
AUTO.P2M.CONSULTAS.XXXXPAPA.OUT.YYYYDDDD.##
```

### Trazabilidad

| HDU | CA |
|------|------|
| HDU-002 | CA-004, CA-005, CA-006, CA-007 |

---

## RQF-006

### Descripción

Generar diariamente un archivo de transferencias P2M para cada IF.

El archivo deberá mantener la misma estructura actualmente utilizada para el archivo de transferencias de Xpress.

### Máscara de Referencia

```text
AUTO.XPRESS.TRANSFERENCIAS.XXXXPAPA.OUT.YYYYDDDD.##
```

### Máscara Propuesta

```text
AUTO.P2M.TRANSFERENCIAS.XXXXPAPA.OUT.YYYYDDDD.##
```

### Trazabilidad

| HDU | CA |
|------|------|
| HDU-003 | CA-008, CA-009, CA-010, CA-011 |

---

## RQF-007

### Descripción

Incorporar en la página **Reportes ACH Directo** el reporte diario de comisiones P2M de Telered.

La página y la aplicación salen de RQF-001. Jira solo dice «desde el APEX» (B-012).

El nombre visible del reporte es el que fija IPEDA-3679: **Distribución de cargos P2M a Telered**.

Identificación propuesta, no escrita en Jira:

| File Name propuesto | Code propuesto |
|------|------|
| RPT-999-D-CARGOS-P2M-TELERED | P2M_RPT_D_CARGOS_TELERED |

### Parámetro

Fecha de proceso solicitada (CA-012).

La descripción habla de un período consultado. El escenario no define un rango. Hasta cerrar B-005, el parámetro de este requerimiento es una fecha de proceso.

### Fuente

Transacciones P2M con estado «Compensada» (CA-017) cuya comisión de Telered ya fue acreditada a su cuenta contable (CA-013).

Esta fuente no es el método 0018 (B-001) ni el archivo de transferencias exitosas (B-011).

Este requerimiento no construye la acreditación. La historia no especifica ese movimiento (B-002).

### Campos que el reporte debe mostrar

| Campo |
|------|
| Fecha del reporte |
| Banco de recaudo |
| Fecha de proceso |
| Nombre del reporte: Distribución de cargos P2M a Telered |
| Número de cuenta |
| Cantidad de transacciones compensadas |
| IF que acredita |
| Monto de comisión recibido |
| Monto total de comisiones generadas diarias |

Cuáles de esos campos son encabezado y cuáles se repiten por IF no está definido (B-004). Este requerimiento no asigna ese diseño.

### Importe

El monto de comisión es el calculado por el sistema según el tarifario vigente de P2M (CA-018).

El tarifario no está en la historia (B-003). Este requerimiento no fija tarifa ni fórmula. No usa B/.0.03.

### Historia, moneda y exportación

- El reporte queda consultable para fechas de proceso ya generadas (CA-019). El plazo de retención no está definido (B-007).
- Los montos usan la moneda de liquidación correspondiente (CA-020). El nombre de la moneda no está en la historia (B-008).
- La descarga queda como Excel y/o CSV (CA-016). No se cierra si los dos formatos son obligatorios (B-006). No se hereda el `.xlsx` único de RQF-001.

### Trazabilidad

| HDU | CA | Brechas abiertas |
|------|------|------|
| HDU-004 | CA-012, CA-013, CA-014, CA-015, CA-016, CA-017, CA-018, CA-019, CA-020 | B-001, B-002, B-003, B-004, B-005, B-006, B-007, B-008, B-011, B-012 |

---

## RQF-008

### Descripción

Incorporar en la página **Reportes ACH Directo** el reporte mensual de comisiones P2M de Telered.

La ubicación es la misma decisión de RQF-007 (B-012). Jira no da nombre de reporte, campos ni código (B-010).

Identificación propuesta, no escrita en Jira:

| File Name propuesto | Code propuesto |
|------|------|
| RPT-999-M-CARGOS-P2M-TELERED | P2M_RPT_M_CARGOS_TELERED |

### Qué sí exige la historia

- Se genera en APEX al cierre del mes (CA-021).
- Consolida por IF las comisiones de transacciones P2M compensadas (CA-021).
- Incluye solo la comisión de Telered acreditada a su cuenta contable durante el mes consultado (CA-022).
- Muestra el total de ingresos de cada IF para Telered una vez cerrado el mes (CA-022).
- Se descarga en Excel y/o CSV (CA-024, B-006).

### Qué no se puede cerrar

CA-023 pide además el consolidado de la fecha de proceso solicitada. Eso contradice el corte mensual de CA-021 y CA-022 (B-009). Este requerimiento no elige uno de los dos cortes.

No se copian a este reporte los campos, el estado «Compensada», el tarifario, la historia ni la moneda de IPEDA-3679 (B-010).

No se construye la acreditación (B-002). No se usa el método 0018 ni B/.0.03 (B-001).

### Trazabilidad

| HDU | CA | Brechas abiertas |
|------|------|------|
| HDU-005 | CA-021, CA-022, CA-023, CA-024 | B-001, B-002, B-006, B-009, B-010, B-012 |

---

# Consideraciones de Implementación

## CI-001

**Título:** Configuración de Control-M para distribución de archivos P2M

### Descripción

Con el fin de cumplir con la entrega diaria de archivos a las Instituciones Financieras, será requerida una configuración operativa equivalente a la utilizada actualmente para los procesos de Xpress.

### Consideraciones

- Los archivos diarios de consultas P2M y transferencias P2M serán generados por la solución propuesta.
- La distribución de los archivos hacia las carpetas EFT correspondientes a las Instituciones Financieras no forma parte del alcance de desarrollo de la presente iniciativa.
- Actualmente, para Xpress, la distribución de los archivos es realizada mediante configuraciones administradas por el Área de Plataforma en Control-M.
- Para P2M deberá considerarse una configuración equivalente.
- Las configuraciones requeridas deberán ser evaluadas y definidas por el Área de Plataforma.

### Documentación

El Manual de Instalación deberá indicar que la solución requiere configuraciones operativas complementarias para la distribución automática de los archivos generados hacia las carpetas EFT correspondientes.

### Trazabilidad

| HDU | CA |
|------|------|
| HDU-002 | CA-007 |
| HDU-003 | CA-011 |

CI-001 aplica a los archivos de IPEDA-3606. No aplica a IPEDA-3679 ni a IPEDA-3680.

---

## CI-002

**Título:** Los reportes de comisión de Telered no son archivos EFT

### Descripción

IPEDA-3679 e IPEDA-3680 piden reportes consultados y descargados desde APEX. No piden archivo diario por IF ni entrega en carpeta EFT.

### Consideraciones

- No entran en la máscara `AUTO.P2M.*` de RQF-005 y RQF-006.
- No entran en la distribución Control-M de CI-001.
- Su salida es la descarga del reporte en APEX, en el formato que deje cerrado B-006.

### Trazabilidad

| HDU | CA |
|------|------|
| HDU-004 | CA-012, CA-016 |
| HDU-005 | CA-021, CA-024 |
