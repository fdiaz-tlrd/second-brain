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

    I -- Sí --> K[Adecuar código fuente]
    I -- No --> K

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
| 6 | Analista Desarrollador | Realizar una validación inicial de código seguro y vulnerabilidades sobre los artefactos descargados y conservar la evidencia generada. |
| 7 | Analista Desarrollador | Evaluar los resultados de la validación inicial.<br><br>**Existen hallazgos no aceptables:** Incorporar los ajustes requeridos al trabajo a realizar durante la adecuación.<br>**No existen hallazgos no aceptables:** Continuar con el siguiente paso.<br><br>**Nota:** Los hallazgos aceptados por riesgo deberán documentarse según el procedimiento vigente de gestión de riesgos. |
| 8 | Analista Desarrollador | Realizar las adecuaciones a nivel del código fuente, incluyendo la atención de los hallazgos identificados durante la validación inicial que formen parte del alcance del trabajo. |
| 9 | Analista Desarrollador | Revisar que se han codificado cada una de las funcionalidades solicitadas. |
| 10 | Analista Desarrollador | Realizar una validación final de código seguro y vulnerabilidades sobre el código fuente modificado y conservar la evidencia generada. |
| 11 | Analista Desarrollador | Evaluar los resultados de la validación final.<br><br>**Existen hallazgos no aceptables:** Realizar las correcciones necesarias y regresar al paso 8.<br>**No existen hallazgos no aceptables:** Continuar con el siguiente paso.<br><br>**Nota:** Los hallazgos aceptados por riesgo deberán documentarse según el procedimiento vigente de gestión de riesgos. |
| 12 | Analista Desarrollador | Confeccionar el Informe Técnico con el detalle de las adecuaciones realizadas. Como mínimo debe incluir:<br><br>- Checklist de adecuaciones realizadas.<br>- Verificaciones del funcionamiento de las adecuaciones.<br>- Resultado de las validaciones de seguridad realizadas.<br>- Referencia a las evidencias generadas.<br>- Si aplica, lista de parámetros nuevos.<br>- Si aplica, requerimientos técnicos para el equipo donde se ejecutará la aplicación. |
| 13 | Analista Desarrollador | Coordinar sesión con los interesados para formalizar la entrega del desarrollo realizado. |
| 14 | Analista Desarrollador | Presentar el Informe Técnico a los interesados.<br><br>**Nota:** Si durante la presentación se identifica alguna inconsistencia, regresar al paso 8. De lo contrario, continuar con el siguiente paso. |
| 15 | Analista Desarrollador | Subir los siguientes documentos al repositorio:<br><br>- Manual de Instalación.<br>- Informe Técnico.<br>- Evidencia de revisión de código seguro y vulnerabilidades. |
| 16 | Analista Desarrollador | Actualizar la rama de desarrollo del repositorio. |
| 17 | Analista Desarrollador | Solicitar el merge al Administrador de Versiones. |