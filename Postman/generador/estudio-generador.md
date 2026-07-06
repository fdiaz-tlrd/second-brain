# Estudio: generador de colecciones Postman

Fuente exclusiva: `second-brain\Postman\generador\`

Documento de referencia propio. Para consultas sobre el generador, usar este archivo — no re-leer todos los archivos fuente cada vez.

---

## Qué es

Sistema para **mantener escenarios de prueba en archivos JSON separados** y **generar colecciones Postman** importables (`.postman_collection.json`).

Contrario al enfoque del equipo de pruebas (`equipo-pruebas/`: un JSON monolítico de ~27k líneas), aquí cada escenario es un archivo pequeño versionable, agrupado por carpetas.

Dominios actuales: **P2M**, **P2P** y **VCN** (Validación Cuenta Nombre — en construcción).

---

## Estructura de carpetas

```
generador/
├── ensamblador/              ← scripts Node.js
│   ├── armar-coleccion.js    ← ensambla colección desde fuente
│   ├── config.json           ← config P2M
│   ├── config-p2p.json       ← config P2P
│   ├── catalogoGeneral.json  ← mapa código → mensaje (tests)
│   ├── variables-coleccion.json  ← variables de colección (vacío hoy)
│   ├── bootstrap-general-p2p.js  ← copia General P2M → P2P
│   ├── generar-escenarios-*.js   ← generadores masivos por método
│   └── salida/               ← colecciones generadas (artefacto)
├── P2M Escenarios error/     ← ~593 escenarios fuente P2M
├── P2M Escenarios error especiales/  ← 3 escenarios validador (aparte)
├── P2P Escenarios error/     ← ~490 escenarios fuente P2P
├── VCN Escenarios error/     ← ~77 escenarios General (sin Metodo aún)
├── entornos/                 ← environments Postman (desarrollo)
└── README.md                 ← uso rápido
```

---

## Flujo de ejecución en Postman (colección generada)

Cada escenario es **un solo request** en Postman, pero el **Pre-request de raíz** orquesta un pipeline completo antes de que Postman envíe el request visible:

```
1. Escenario define body en claro (idCanal, validador, peticion...)
2. Pre-request raíz:
   a. POST dummy /cifrar?tld=1        → petición cifrada
   b. (opcional) __mutacionPostCifrar → altera payload cifrado
   c. POST endpoint destino           → P2M / P2P / Matriz / Validador
   d. Guarda respuesta en variables de colección
   e. Reemplaza body del request con respuesta de (c)
3. Request visible: POST dummy /descifrar?tld=0  → descifra respuesta
4. Post-response raíz: valida HTTP, JSON, codigoError/resultado
```

El ensamblador configura cada escenario con URL de **descifrar** (`tld=0` por defecto) y el body en claro; el Pre-request raíz hace el trabajo intermedio.

### Nivel de ejecución (`NIVEL_EJECUCION` en environment)

| Valor | Endpoint procesado (`END_POINT_TLD_*`) |
|-------|----------------------------------------|
| `P2M` (default P2M) | `END_POINT_TLD_P2M` |
| `P2P` (default P2P) | `END_POINT_TLD_P2P` |
| `VCN` (pendiente en scripts) | `END_POINT_TLD_VCN` (aún no existe en Pre-request.js) |
| `MATRIZ` | `END_POINT_TLD_MATRIZ` (+ OAuth Bearer) |
| `VALIDADOR` | `END_POINT_TLD_VALIDADOR` |

---

## Formato de un escenario (archivo `.json`)

Ubicación define la jerarquía en la colección Postman:

```
General/<grupo>/<campo>/<N.N>_<campo>_<condicion>.json
Metodo/<metodo>/<grupo>/<campo>/<N.N>_<campo>_<condicion>.json
```

### Campos del JSON

| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| `nombre` | sí | Nombre del request en Postman (incluye ID legible, ej. `1.4.1. idPeticion — propiedad ausente (400)`) |
| `expectedHttpStatus` | sí | HTTP esperado del endpoint procesado (P2M/Matriz/etc.) |
| `expectedCodigoError` | sí | Código de error/resultado de negocio esperado |
| `expectedTipo` | sí | Tipo de validación en Post-response: `general`, `parametro` o `metodo` |
| `algoritmoCifrado` | no | Default `aes-256-cbc`. También `aes-256-gcm` |
| `tld` | no | Query `tld` en descifrar. Default `"0"` |
| `method` | no | Default `POST` |
| `header` | no | Headers extra del request |
| `body` | no | Payload en claro enviado a `/cifrar` |
| `__mutacionPostCifrar` | no | Mutación aplicada al JSON **después** de cifrar, **antes** de procesar. Se elimina del body antes de cifrar. |

### Ejemplo mínimo (General)

```json
{
  "nombre": "1.4.1. idPeticion — propiedad ausente (undefined) (400)",
  "expectedHttpStatus": 400,
  "expectedCodigoError": 400,
  "expectedTipo": "general",
  "algoritmoCifrado": "aes-256-cbc",
  "body": {
    "idCanal": "{{CANAL_EMISOR}}",
    "validador": "{{CANAL_VALIDADOR}}",
    "peticion": {
      "metodo": "0015",
      "solicitudes": [{ "idSolicitud": "1", "parametros": { ... } }]
    }
  }
}
```

### Mutación post-cifrado

Para escenarios de cifrado corrupto o llave incorrecta:

```json
"__mutacionPostCifrar": {
  "peticion": "{{PETICION_CIFRADA_CON_OTRA_LLAVE}}"
}
```

El Pre-request raíz cifra el body limpio, luego reemplaza campos en el payload cifrado antes de llamar al endpoint destino.

---

## Jerarquía de carpetas de escenarios

### Ramas principales

| Rama | Significado | Prefijo ID en `nombre` |
|------|-------------|------------------------|
| `General/` | Errores transversales (idCanal, idPeticion, peticion, solicitudes, metodo) | `P.G.E` → ej. `1.4.1`, `2.1.1` |
| `Metodo/<NNNN>/` | Errores por método de negocio | `M.P.G.E` → ej. `0022.1.1.1` |

### Grupos bajo General o Metodo

| Carpeta | Significado |
|---------|-------------|
| `1_validaciones_js` | Validaciones JavaScript del API (tipos, formatos, campos ausentes) → suele dar `400` HTTP y códigos 4xx |
| `2_reglaNegocio` | Reglas de negocio / BD / configuración canal → códigos 401, 402, 405, etc. |

### Campos (`<campo>/`)

Carpetas numeradas por campo validado: `3_peticion`, `4_idPeticion`, `5_solicitudes`, `1_identificador`, `3_bancoAcreedor`, etc.

### Archivos de escenario

Patrón: `<N.N>_<campo>_<condicion>.json`

Ordenamiento en colección: por prefijo numérico `N.N` (función `compareScenarioFiles` en `armar-coleccion.js`).

---

## Métodos de negocio cubiertos

### P2M (`Metodo/`)

| Método | Notas |
|--------|-------|
| 0015 | Base comercio |
| 0016 | Incluye validaciones logo (generador PNG) |
| 0017, 0018, 0019 | Escenarios propios |
| 0021, 0024, 0025 | Escenarios propios |

### P2P (`Metodo/`)

| Método | Origen |
|--------|--------|
| 0002 | General copiado de P2M 0015 vía `bootstrap-general-p2p.js` |
| 0003–0009 | Generados |
| 0022, 0023 | Generados (QR, identificador celular, etc.) |

### VCN (`Metodo/` — pendiente)

| Método | Notas |
|--------|-------|
| `0001` | Único método VCN (Validación Cuenta Nombre). Ya aplicado en `General/` |

**Origen de VCN Escenarios error:** copia de `P2P Escenarios error` **sin** `Metodo/`, luego `"metodo": "0002"` → `"0001"` en 76 JSON de `General/`. El escenario `4.1_metodo_fuera_cfg` conserva `"metodo": "{{METODO_FUERA_CFG}}"`.

---

## VCN Escenarios error — estado actual

### Qué hay hoy

```
VCN Escenarios error/
├── General/           ← 77 escenarios (igual estructura que P2P General)
├── datosCanales.json  ← copia P2P
├── Pre-request.js     ← copia P2P (aún dice P2P en comentarios y default endpoint)
└── Post-response.js   ← copia P2P
```

No existe aún: `Metodo/0001/`, `config-vcn.json`, environment VCN, salida ensamblada.

### Qué falta para que VCN sea ejecutable

Ver sección **«Lo que estás dejando pasar»** al final de este documento.

---

## Scripts de ensamblador

### `armar-coleccion.js`

- Lee `config.json` (P2M) o `config-p2p.json` (P2P).
- Recorre recursivamente la carpeta fuente; carpetas → folders Postman, JSON hoja → request.
- Inyecta `Pre-request.js` y `Post-response.js` de raíz de la fuente como eventos de colección.
- Inyecta `CATALOGO_GENERAL` como variable de colección desde `catalogoGeneral.json`.
- Genera `_postman_id` nuevo en cada ejecución.
- Escribe salida en `ensamblador/salida/`.

**Uso** (desde `ensamblador/`):

```bash
node armar-coleccion.js              # P2M
node armar-coleccion.js config-p2p.json   # P2P
# node armar-coleccion.js config-vcn.json   # VCN — config aún no creado
```

### Overrides por escenario (soportado, no usado hoy)

Si existen junto al JSON del escenario:

- `<nombre>.Pre-request.js` → reemplaza el pre-request default (expected vars).
- `<nombre>.Post-response.js` → añade tests propios.

Hoy **no hay** archivos `.Pre-request.js` ni `.Post-response.js` por escenario; todos usan el default + scripts de raíz.

### `bootstrap-general-p2p.js`

Copia `P2M Escenarios error/General/` → `P2P Escenarios error/General/`:

- Cambia `metodo` `0015` → `0002`.
- Reemplaza `parametros` por `{ tipoIdentificador: "CELULAR" }`.
- Copia `datosCanales.json`.

Regenerar P2P General después de cambios en P2M General.

### `generar-escenarios-*.js`

Scripts para **generar masivamente** JSON de escenarios. Patrón:

- Definen matrices de casos (propiedad ausente, null, tipo incorrecto, longitud, etc.).
- Escriben archivos en `Metodo/<NNNN>/1_validaciones_js/<campo>/`.
- Cada escenario incluye `nombre`, `expected*`, `body` con variables Postman.

Scripts presentes:

| Script | Método / dominio |
|--------|------------------|
| `generar-escenarios-0002` … `0009` | P2P métodos 0002–0009 |
| `generar-escenarios-0017` … `0019`, `0021`, `0024`, `0025` | P2M |
| `generar-escenarios-0022`, `0023` | P2P QR / identificador |
| `generar-escenarios-logo-0016` | P2M logo (genera PNG en base64) |

Algunos generadores P2P **reutilizan** escenarios P2M como plantilla (ej. banco de 0016 → 0022 con mapeo de códigos).

---

## Validación en Post-response raíz

Archivo: `P2M Escenarios error/Post-response.js` (P2P tiene copia equivalente).

### Variables requeridas por escenario

Seteadas en pre-request default del request (desde `expected*` del JSON):

- `expectedHttpStatus`
- `expectedCodigoError`
- `expectedTipo`

### Tipos de validación

| `expectedTipo` | Qué valida en respuesta descifrada |
|----------------|-------------------------------------|
| `general` | `inner.codigoError` y `inner.mensajeError` contra `CATALOGO_GENERAL` |
| `parametro` | `respuestas[0].resultado`, `idSolicitud`, `datos` null; mensaje catálogo como referencia CloudWatch |
| `metodo` | Igual que `parametro` |

### Variables de colección usadas en runtime

| Variable | Seteada por |
|----------|-------------|
| `PROCESAR_STATUS_CODE` | Pre-request raíz (HTTP del endpoint procesado) |
| `PROCESAR_RESPONSE_BODY` | Pre-request raíz |
| `PAYLOAD_ID_PETICION`, `PAYLOAD_METODO`, `PAYLOAD_ID_SOLICITUD_0` | Pre-request raíz (del body en claro) |
| `FLOW_FAILED`, `FLOW_ERROR` | Pre-request si falla cifrar/red/config |
| `END_POINT_TLD` | Pre-request según `NIVEL_EJECUCION` |
| `CATALOGO_GENERAL` | Ensamblador (JSON stringificado de `catalogoGeneral.json`) |

---

## `catalogoGeneral.json`

Mapa `código (string) → mensaje` usado en tests para validar `mensajeError` (tipo `general`) o como referencia informativa (tipo `parametro`/`metodo`).

Incluye códigos 0, 4xx de validación, 5xx, 509, 599, etc. Debe mantenerse alineado con el catálogo real del sistema cuando se validen mensajes.

---

## Environments (`entornos/`)

| Archivo | Dominio |
|---------|---------|
| `P2M Escenarios error - desarrollo.postman_environment.json` | P2M dev |
| `P2P Escenarios error - desarrollo.postman_environment.json` | P2P dev |

Variables clave:

| Variable | Uso |
|----------|-----|
| `DOMAIN_TLD_VALIDADOR_DUMMY` | Host dummy cifrar/descifrar |
| `END_POINT_TLD_P2M` / `END_POINT_TLD_P2P` | Lambda directa |
| `END_POINT_TLD_MATRIZ` | API Gateway Matriz |
| `END_POINT_TLD_VALIDADOR` | Validador directo |
| `MATRIZ_AUTH_TOKEN_URL`, `MATRIZ_API_KEY`, `MATRIZ_SECRET_KEY` | OAuth Matriz |
| `NIVEL_EJECUCION` | `P2M`, `P2P`, `MATRIZ` o `VALIDADOR` |
| `CANAL_EMISOR`, `CANAL_VALIDADOR`, variantes `_NO_EXISTE`, `_DESHABILITADO`, etc. | Canales de prueba |
| `SWIFT_CANAL_EMISOR`, `SWIFT_CANAL_AJENO` | Prefijos idPeticion |
| `PETICION_CIFRADA_CON_OTRA_LLAVE` | Escenarios mutación post-cifrado |
| Identificadores de negocio | `IDENTIFICADOR_COMERCIO_*`, `IDENTIFICADOR_CELULAR`, `P2M_PAGO_ID_*`, etc. |

---

## `datosCanales.json`

Presente en P2M y P2P. Lista de canales de prueba con `ambiente`, `idCanal`, `banco`, `algoritmoAes`. Referencia para configuración; variables concretas están en el environment.

---

## P2M Escenarios error especiales

Carpeta separada con **3 escenarios** de validador:

- `2.1_validador_no_existe_en_bd`
- `2.2_validador_deshabilitado`
- `2.3_validador_error_interno_getCanal`

**No está incluida** en `config.json` actual; hay que integrarla manualmente o crear config aparte si se quiere ensamblar.

---

## Conteos actuales

| Fuente | Escenarios JSON |
|--------|-----------------|
| P2M Escenarios error | ~593 |
| P2P Escenarios error | ~490 |
| VCN Escenarios error | 77 (solo General) |
| P2M Escenarios error especiales | 3 |

Salida generada hoy: `ensamblador/salida/P2M Escenarios error.postman_collection.json` y `P2P Escenarios error.postman_collection.json`. VCN aún no se ensambla.

---

## Workflow habitual

1. Editar o crear escenario JSON en carpeta fuente (o ejecutar `generar-escenarios-*.js`).
2. Regenerar colección: `node armar-coleccion.js` (o config P2P).
3. Importar JSON de `salida/` en Postman (o reimportar si ya existe).
4. Seleccionar environment de `entornos/`.
5. Ejecutar escenario o colección.

Para P2P General sincronizado con P2M:

```bash
node bootstrap-general-p2p.js
node armar-coleccion.js config-p2p.json
```

---

## Diferencia con `equipo-pruebas/`

| | Equipo QA (VCN) | Generador propio (VCN) |
|---|---|---|
| Formato | Monolito Postman | JSON por escenario + ensamblador |
| Flujo | 3–4 requests encadenados | 1 request; Pre-request raíz orquesta |
| Método | `0001` | `0001` en General (OK); falta `Metodo/0001/` |
| Parámetros | `cuenta` | Aún `tipoIdentificador: CELULAR` (heredado P2P) |
| Escenarios método | 510–515, máscaras, PACA/PACC, etc. | **510–515** en `Metodo/0001/2_respuestaCanalValidador` (48 esc, A9 cerrada); resto pendiente |
| Endpoint | `apigatesb.telered.com.pa` sandbox | Falta `END_POINT_TLD_VCN` + environment |

---

## Lo que estás dejando pasar (VCN)

Lista de huecos visibles hoy si solo se copió General y se cambió el método:

1. **`parametros` siguen siendo P2P.** Todos los escenarios General tienen `"tipoIdentificador": "CELULAR"`. VCN método `0001` usa `"cuenta"` (y variables tipo `{{CuentaFeliz}}`). Los escenarios General pueden fallar o validar el error equivocado hasta corregir esto.

2. **`Pre-request.js` y `Post-response.js` son copia P2P.** Default `END_POINT_TLD_P2P`; no hay rama `NIVEL_EJECUCION === 'VCN'` ni variable `END_POINT_TLD_VCN`. Aunque ensamblaras la colección, apuntaría al API P2P, no a cuenta-nombre.

3. **No hay `config-vcn.json`.** Sin config no se genera `salida/VCN Escenarios error.postman_collection.json`.

4. **No hay environment VCN** en `entornos/`. Faltan endpoint cuenta-nombre, canales/validadores VCN, cuentas de prueba (510–515, máscaras, PACA/PACC, etc.).

5. **`Metodo/0001/1_validaciones_js/1_cuenta`.** **20** escenarios → **413** (A10). Generador: `generar-escenarios-0001-cuenta-413.js`. **`Metodo/0001/2_respuestaCanalValidador`:** 510–515 × 8 validadores (A9 cerrada). **`Metodo/0001/3_respuestaExitosa`:** **112** escenarios → **exito** (8 validadores × 14 cuentas, A11).

6. **`catalogoGeneral.json`.** Incluye **413** y **510–515**; usado por generadores 0001.
7. **Generadores Metodo/0001:** `generar-escenarios-0001-cuenta-413.js`, `generar-escenarios-0001-respuesta-canal-validador.js`, `generar-escenarios-0001-respuesta-exitosa.js`.

8. **`bootstrap-general-p2p.js` no aplica a VCN.** Si alguien lo ejecuta pensando en “sincronizar General”, no toca VCN. VCN quedó como copia puntual; cambios futuros en P2P General no se propagan solos.

9. **Canales en environment/dev.** Escenarios de regla de negocio (`CANAL_EMISOR_SIN_METODO`, `CANAL_EMISOR_SIN_PLAN`, etc.) deben existir en Dynamo/config con método **0001** suscrito para VCN, no solo 0002 P2P.

10. **Referencia QA sin mezclar.** `equipo-pruebas/.../estudio-coleccion-vcn.md` lista ~35 carpetas de escenario; sirve como checklist de cobertura, pero no modificar ese archivo — es del equipo de pruebas.

---

## VCN: `idPeticion`, emisor y validador (contrato de negocio + lambda)

Documentación completa (QA, lambda prod vs dev, ejemplo `1008`/`1012`): [`../equipo-pruebas/Collecciones y Variables Cuenta Nombre y Xpress/estudio-coleccion-vcn-regresion.md`](../equipo-pruebas/Collecciones%20y%20Variables%20Cuenta%20Nombre%20y%20Xpress/estudio-coleccion-vcn-regresion.md#modelo-de-negocio-emisor-vs-canal-validador-aclaración-operativa).

Resumen para el generador:

- **`idCanal`** = emisor (ej. `1008` `CELEGATO`). Genera `idPeticion` con prefijo `SWIFT_CANAL_EMISOR` (`CELEGATO…`).
- **`validador`** = canal al que se consulta la cuenta (ej. `1012` `TERAGATO`). Define de qué banco vienen los titulares.
- **`datos.banco`** en éxito = SWIFT del **validador**, no del emisor. `expectedBanco` en A11 debe venir del seed/cuenta del validador usado.
- **Lambda dev** (`tld-api-cuenta-nombre`): valida que los 8 primeros chars de `idPeticion` = `alias` del **emisor** (código 445 si no). **Lambda prod master**: no valida `idPeticion` (solo formato de cuenta en 0001).

---

## Archivos clave para profundizar

| Tema | Archivo |
|------|---------|
| Ensamblado | `ensamblador/armar-coleccion.js` |
| Orquestación cifrar→procesar→descifrar | `P2M Escenarios error/Pre-request.js` |
| Assertions | `P2M Escenarios error/Post-response.js` |
| Catálogo mensajes | `ensamblador/catalogoGeneral.json` |
| Ejemplo validación JS | `General/1_validaciones_js/4_idPeticion/4.1_*.json` |
| Ejemplo regla negocio | `General/2_reglaNegocio/1_idCanal/1.1_*.json` |
| Ejemplo mutación cifrado | `General/2_reglaNegocio/3_peticion/3.1_*.json` |
| Generador masivo | `ensamblador/generar-escenarios-0022-validaciones.js` |
| Generador 413 cuenta VCN | `ensamblador/generar-escenarios-0001-cuenta-413.js` |
| Generador 510–515 VCN | `ensamblador/generar-escenarios-0001-respuesta-canal-validador.js` |
| Generador exito 0001 VCN | `ensamblador/generar-escenarios-0001-respuesta-exitosa.js` |
| Escenarios 413 cuenta | `VCN Escenarios error/Metodo/0001/1_validaciones_js/1_cuenta/` |
| Escenarios 510–515 | `VCN Escenarios error/Metodo/0001/2_respuestaCanalValidador/` |
| Plan escenarios éxito | `VCN Escenarios error/Metodo/0001/3_respuestaExitosa/README.md` |
| VCN General (ejemplo) | `VCN Escenarios error/General/1_validaciones_js/1_idCanal/1.1_*.json` |
| Referencia QA VCN (no tocar) | `../equipo-pruebas/Validacion Cuenta Nombre/estudio-coleccion-vcn.md` |
| idPeticion / emisor / lambda | `../equipo-pruebas/.../estudio-coleccion-vcn-regresion.md` (secciones SWIFT + modelo emisor/validador) |
| Lambda dev validaciones | `tld-api-cuenta-nombre/lambdas/cuenta-nombre/lib/validaciones.js` |
