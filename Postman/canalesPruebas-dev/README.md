# Canales de prueba — dev

Información de canales GATO y escenarios Postman en **dev**. Todo el material de esta carpeta es autocontenido.

| Archivo | Contenido |
|---------|-----------|
| [`canalesPruebas-dev.json`](./canalesPruebas-dev.json) | Datos por canal: matriz, credenciales, plan, validador, **operaciones** |
| [`canalesPruebas-dev.md`](./canalesPruebas-dev.md) | Referencia legible + payloads token |
| [`canales-dev-dynamo-export.json`](./canales-dev-dynamo-export.json) | Export DynamoDB (fuente de verdad AWS) |
| [`cargar-tld-validador-canal-operacion-dev.md`](./cargar-tld-validador-canal-operacion-dev.md) | Carga y export AWS CLI |
| [`tld-validador-canal-operaciones-1008-1016.json`](./tld-validador-canal-operaciones-1008-1016.json) | Seed batch-write operaciones |
| [`actualizar-desde-dynamo-export.js`](./actualizar-desde-dynamo-export.js) | Fusiona export → `canalesPruebas-dev.json` |

**Actualizar desde AWS:** export en [`cargar-tld-validador-canal-operacion-dev.md`](./cargar-tld-validador-canal-operacion-dev.md) → `node actualizar-desde-dynamo-export.js` → revisar `.md`.
