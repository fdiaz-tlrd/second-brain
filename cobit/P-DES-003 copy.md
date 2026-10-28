# P-DES-003 - Procedimiento para la Gestión de Adecuación Tecnológica

| Dato | Valor |
|--------|--------|
| Código | P-DES-003 |
| Versión | 3.0.1 |
| Área | Desarrollo |
| Fecha | 12/08/2024 |
| Revisión | 21/08/2026 |

## Propósito

El propósito de este procedimiento es establecer los pasos necesarios para realizar adecuaciones tecnológicas a nivel de las aplicaciones y/o sistemas que brindan servicios a los clientes de TELERED.

## Alcance

Este procedimiento aplica para cuando la adecuación tecnológica se realiza sobre código fuente que es propiedad de TELERED.
## Entradas, Salidas y Registros

| Entradas | Proceso | Salidas | Registros |
|-----------|----------|----------|------------|
| - FMR-DES-003 Requerimientos del Usuario, o requerimiento de usuario del proveedor.<br>- FMR-DES-002 Documento de Análisis y Diseño.<br>- Manual de Arquitectura Técnica, según aplique. | Adecuación Tecnológica | - FMR-ARQ-004 Minuta de Reunión.<br>- FMR-CCL-002 Manual de Instalación.<br>- FMR-DES-005 Informe Técnico de Adecuaciones Tecnológicas.<br>- Evidencia de revisión de código seguro y vulnerabilidades. | - FMR-ARQ-004 Minuta de Reunión.<br>- FMR-CCL-002 Manual de Instalación.<br>- FMR-DES-005 Informe Técnico de Adecuaciones Tecnológicas.<br>- Evidencia de revisión de código seguro y vulnerabilidades. |

## Diagrama de Flujo

```mermaid
flowchart TD

    A([Inicio]) --> B[Identificar repositorio y rama del código fuente]
    B --> C[Crear rama de trabajo en herramienta]
    C --> D[Descargar código fuente]
    D --> E[Comparar artefactos]

    E --> F{¿Hay diferencias?}

    F -- Sí --> G[Notificar al Administrador de Versiones]
    G --> Z([Fin])

    F -- No --> H[Validar código seguro y vulnerabilidades - Inicial]

    H --> I{¿Existen hallazgos no aceptables?}

    I -- Sí --> J[Corregir hallazgos]
    J --> H

    I -- No --> K[Adecuar código fuente]

    K --> L[Validar código seguro y vulnerabilidades - Final]

    L --> M{¿Existen hallazgos no aceptables?}

    M -- Sí --> K

    M -- No --> N[Confeccionar Informe Técnico]

    N --> O[Coordinar sesión para la entrega del desarrollo]
    O --> P[Presentar el Informe Técnico]

    P --> Q{¿Requiere ajuste?}

    Q -- Sí --> K

    Q -- No --> R[Cargar Documentos]
    R --> S[Actualizar la rama de desarrollo del repositorio]
    S --> T[Solicitar Merge al Administrador de Versiones]

    T --> Z
```

## Descripción del Procedimiento

| Paso | Responsable | Actividad |
|--------|--------|--------|
| 1 | Analista Desarrollador | Identificar el repositorio y la rama del código fuente a modificar.<br><br>**Nota:** Para identificar el repositorio del código fuente se debe utilizar el nombre de la(s) aplicaciones a modificar durante el procedimiento de Análisis y Diseño de Aplicaciones. |
| 2 | Analista Desarrollador | Crear la rama de trabajo en la herramienta de versionamiento de TELERED. |
| 3 | Analista Desarrollador | Descargar el código fuente a modificar al equipo local. |
| 4 | Analista Desarrollador | Cuando aplique, realizar compare de los artefactos descargados versus los artefactos de producción. |
| 5 | Analista Desarrollador | Determinar si existen modificaciones en esta comparación.<br><br>**Sí:** Notificar al Administrador de Versiones y finalizar el procedimiento.<br>**No:** Continuar con el siguiente paso. |
| 6 | Analista Desarrollador | Realizar una validación inicial de código seguro y vulnerabilidades sobre los artefactos descargados. |
| 7 | Analista Desarrollador | Evaluar los resultados de la validación inicial.<br><br>**Existen hallazgos no aceptables:** Corregir los hallazgos identificados y volver a ejecutar la validación.<br>**No existen hallazgos no aceptables:** Continuar con el siguiente paso.<br><br>**Nota:** Los hallazgos aceptados por riesgo deberán documentarse según el procedimiento vigente de gestión de riesgos. |
| 8 | Analista Desarrollador | Realizar las adecuaciones a nivel del código fuente. |
| 9 | Analista Desarrollador | Revisar que se han codificado cada una de las funcionalidades solicitadas. |
| 10 | Analista Desarrollador | Realizar una validación final de código seguro y vulnerabilidades sobre el código fuente modificado. |
| 11 | Analista Desarrollador | Evaluar los resultados de la validación final.<br><br>**Existen hallazgos no aceptables:** Realizar las correcciones necesarias y regresar al paso 8.<br>**No existen hallazgos no aceptables:** Continuar con el siguiente paso. |
| 12 | Analista Desarrollador | Generar y conservar la evidencia de las validaciones de código seguro y vulnerabilidades realizadas. |
| 13 | Analista Desarrollador | Confeccionar el Informe Técnico con el detalle de las adecuaciones realizadas. Como mínimo debe incluir:<br><br>- Checklist de adecuaciones realizadas.<br>- Verificaciones del funcionamiento de las adecuaciones.<br>- Resultado de las validaciones de seguridad realizadas.<br>- Referencia a las evidencias generadas.<br>- Si aplica, lista de parámetros nuevos.<br>- Si aplica, requerimientos técnicos para el equipo donde se ejecutará la aplicación. |
| 14 | Analista Desarrollador | Coordinar sesión con los interesados para formalizar la entrega del desarrollo realizado. |
| 15 | Analista Desarrollador | Presentar el Informe Técnico a los interesados.<br><br>**Nota:** Si durante la presentación se identifica alguna inconsistencia, regresar al paso 8. De lo contrario, continuar con el siguiente paso. |
| 16 | Analista Desarrollador | Subir los siguientes documentos al repositorio:<br><br>- Manual de Instalación.<br>- Informe Técnico.<br>- Evidencia de revisión de código seguro y vulnerabilidades. |
| 17 | Analista Desarrollador | Actualizar la rama de desarrollo del repositorio. |
| 18 | Analista Desarrollador | Solicitar el merge al Administrador de Versiones. |

## Documentos de Referencia

| Documento | Código |
|------------|---------|
| Manual de Instalación | FMR-CCL-002 |
| Informe Técnico de Adecuaciones Tecnológicas | FMR-DES-005 |
| Minuta de Reunión | FMR-ARQ-004 |
