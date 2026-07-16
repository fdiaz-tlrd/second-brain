# Canales de prueba — dev

Información de canales GATO y escenarios Postman en **dev**. Todo el material de esta carpeta es autocontenido.

| Archivo | Contenido |
|---------|-----------|
| [`canalesPruebas-dev.json`](./canalesPruebas-dev.json) | Datos por canal: matriz, credenciales, plan, validador, **operaciones** |
| [`canalesPruebas-dev.md`](./canalesPruebas-dev.md) | Referencia legible + payloads token |
| [`datos-r2p-prueba-dev.md`](./datos-r2p-prueba-dev.md) | **R2P Dig:** par 1008→1009, alias `61009001`, payload 0011 |
| [`datos-r2p-alias-61009001.json`](./datos-r2p-alias-61009001.json) | Seed mínimo alias deudor R2P |
| [`partiql-dev.md`](./partiql-dev.md) | Consultas PartiQL para refrescar Dynamo Dig |
| [`canales-dev-dynamo-export.json`](./canales-dev-dynamo-export.json) | Export DynamoDB (fuente de verdad AWS) |
| [`cargar-tld-validador-canal-operacion-dev.md`](./cargar-tld-validador-canal-operacion-dev.md) | Carga y export AWS CLI |
| [`tld-validador-canal-operaciones-1008-1016.json`](./tld-validador-canal-operaciones-1008-1016.json) | Seed batch-write operaciones (1008–1016, estado Y) |
| [`tld-validador-canal-operaciones-1018-estado-N.json`](./tld-validador-canal-operaciones-1018-estado-N.json) | **1018** ops 0001–0025 `estado=N` — **en Dynamo** (2026-07-15) |
| [`actualizar-desde-dynamo-export.js`](./actualizar-desde-dynamo-export.js) | Fusiona export → `canalesPruebas-dev.json` |

**Actualizar desde AWS:** export en [`cargar-tld-validador-canal-operacion-dev.md`](./cargar-tld-validador-canal-operacion-dev.md) → `node actualizar-desde-dynamo-export.js` → revisar `.md`.
