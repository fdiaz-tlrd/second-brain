# Origen

Las siguientes Historias de Usuario fueron recibidas como insumo para el presente análisis.

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

# Definiciones Confirmadas

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

# Requerimientos Funcionales

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