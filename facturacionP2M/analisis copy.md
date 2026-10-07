# Origen

Las siguientes Historias de Usuario fueron recibidas como insumo para el presente análisis.

## Historia de Usuario 1

### Datos Originales

**ID Jira:** IPEDA-3605

**Descripción:**

Reporte de facturación P2M.

**Criterio de aceptación:**

Facturación P2M:

- La consulta al Directorio tendrá costo de 0.03; sin importar si es cruzadas o propias.
- Puntos que se consideran consulta al directorio P2M:
  - Catálogo: Cuando el usuario selecciona un comercio para realizar el pago.
  - Lectura del QR: Toda lectura de un QR P2M también debe considerarse una consulta al directorio.
- Se entregan los datos de facturación en el mismo modelo de la facturación Xpress P2P en Apex (Punto a confirmar con Contabilidad).

---

## Historia de Usuario 2

### Datos Originales

**ID Jira:** IPEDA-3606

**Descripción:**

Archivo de consultas diarias.

**Criterio de aceptación:**

- Se debe crear un archivo diario generado para cada IF, con estructura similar al formato adoptado en archivo P2P-Xpress.
- Listado de las consultas realizadas en el día anterior por método (Catálogo, QR, etc.).
- Listado de las transferencias exitosas P2M realizadas en ACH Directo en el día anterior.
- El archivo debe ser generado y agregado en la carpeta EFT de cada IF cada día.

---

# Definiciones Confirmadas Durante el Análisis

Durante las sesiones de análisis y validaciones posteriores, se confirmaron las siguientes definiciones funcionales:

1. El cobro de **B/.0.03** aplica a las consultas al Directorio P2M.
2. El cobro aplica independientemente de que posteriormente exista o no una transferencia.
3. Para el flujo de catálogo, la referencia de la consulta al Directorio corresponde al método **0018**.
4. La lectura de un QR P2M también debe considerarse una consulta al Directorio P2M.
5. La información de facturación debe seguir el mismo modelo actualmente utilizado para Xpress P2P en Apex.
6. Debido a que la facturación se basa en las consultas al Directorio, no es necesario relacionar las consultas con las transferencias ACH Directo para determinar los eventos facturables.

---

# Normalización para Análisis

Con el objetivo de facilitar la trazabilidad dentro del presente documento, se asignan los siguientes identificadores internos.

## HDU-001

**Jira:** IPEDA-3605

**Título:** Reporte de facturación P2M

### Criterios de Aceptación

| ID | Descripción |
|------|------|
| CA-001 | La consulta al Directorio tendrá un costo de B/.0.03 independientemente de si la consulta corresponde a una operación propia o cruzada. |
| CA-002 | La consulta al Directorio realizada mediante el método 0018 durante el flujo de selección de un comercio deberá considerarse una consulta P2M facturable. |
| CA-003 | La lectura de un QR P2M deberá considerarse una consulta al Directorio P2M facturable. |
| CA-004 | La información de facturación deberá presentarse utilizando el mismo modelo de facturación utilizado actualmente para Xpress P2P en Apex. |

---

## HDU-002

**Jira:** IPEDA-3606

**Título:** Archivo de consultas diarias

### Criterios de Aceptación

| ID | Descripción |
|------|------|
| CA-005 | Generar un archivo diario para cada IF. |
| CA-006 | El archivo deberá mantener una estructura similar al formato actualmente utilizado para P2P-Xpress. |
| CA-007 | El archivo deberá incluir las consultas realizadas durante el día anterior, identificando el método mediante el cual fueron efectuadas. |
| CA-008 | El archivo deberá incluir las transferencias exitosas P2M realizadas en ACH Directo durante el día anterior. |
| CA-009 | El archivo deberá colocarse diariamente en la carpeta EFT correspondiente a cada IF. |

---

# Observaciones para el Análisis

1. La definición funcional confirmada establece que la facturación se origina por la consulta al Directorio y no por la ejecución posterior de una transferencia.

2. El criterio **CA-008** solicita incluir transferencias exitosas P2M en el archivo diario. Sin embargo, la necesidad de dicha información deberá validarse durante el análisis detallado, ya que no forma parte de la lógica de determinación de los eventos facturables.

3. El presente análisis considerará como eventos facturables las consultas al Directorio identificadas mediante:
   - Método 0018 (flujo de catálogo).
   - Lectura de QR P2M.

4. La solución deberá mantener alineación funcional y visual con los mecanismos actualmente implementados para Xpress P2P, tanto para reportes de facturación en Apex como para la generación de archivos diarios.