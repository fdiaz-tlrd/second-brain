# Estudio: generador de colecciones Postman

Fuente exclusiva: `second-brain\Postman\generador\`

Documento de referencia propio. Para consultas sobre el generador, usar este archivo — no re-leer todos los archivos fuente cada vez.

---

## Qué es

Sistema para **mantener escenarios de prueba en archivos JSON separados** y **generar colecciones Postman** importables (`.postman_collection.json`).

Contrario al enfoque del equipo de pruebas (`equipo-pruebas/`: un JSON monolítico de ~27k líneas), aquí cada escenario es un archivo pequeño versionable, agrupado por carpetas.

Dominios actuales: **P2M** (Person-to-Merchant) y **P2P** (Person-to-Person).

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
| P2M Escenarios error especiales | 3 |

Salida generada: `ensamblador/salida/P2M Escenarios error.postman_collection.json` y `P2P Escenarios error.postman_collection.json`.

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

| | Equipo QA (VCN) | Generador propio |
|---|---|---|
| Formato | Monolito Postman | Miles de JSON + ensamblador |
| Flujo | 3–4 requests manuales encadenados | 1 request; Pre-request raíz orquesta |
| Endpoint | `apigatesb.telered.com.pa` sandbox | Configurable: P2M/P2P/Matriz/Validador dev |
| Validación | Tests por carpeta QA | `expectedTipo` + `CATALOGO_GENERAL` |
| Mantenimiento | Export/import manual | Editar JSON + regenerar |

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
