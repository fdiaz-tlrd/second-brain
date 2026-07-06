# `4_idPeticion_soloLog`

Escenarios de `idPeticion` que **ninguna capa prod rechaza** hoy (mínimo 8, alfanumérico, prefijo SWIFT ajeno). VCN dev los degrada a **log** (`validaciones.validarParametroIdPeticion: advertenciaSinRechazo`) y el flujo continúa con **éxito**.

| Archivo | Caso | Código log esperado en CloudWatch |
|---------|------|-----------------------------------|
| `4.9` | longitud 7 (mín 8) | `ID_PETICION_LONGITUD_MIN` |
| `4.11` | espacio interno | `ID_PETICION_ALFANUMERICO` |
| `4.12` | `@` | `ID_PETICION_ALFANUMERICO` |
| `4.13` | unicode `¿` | `ID_PETICION_ALFANUMERICO` |
| `4.14` | comillas | `ID_PETICION_ALFANUMERICO` |
| `4.15` | prefijo SWIFT ajeno | `ID_PETICION_PREFIJO_SWIFT` |

Newman aserta **exito** (HTTP 200, `resultado = 0`, titulares). Revisar CloudWatch en el mismo run para confirmar el `codigo` de advertencia.

**Newman:** no entra en el run completo `node run-newman.js vcn` ni en carpetas padre que lo incluyan. Ejecutar a mano:

```bash
node run-newman.js vcn --folder "General/1_validaciones_js/4_idPeticion_soloLog"
```

Paridad dura con Validador prod: carpeta hermana `4_idPeticion` (`4.1`–`4.8`, `4.10`).
