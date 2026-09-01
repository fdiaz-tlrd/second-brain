# APIs del HUB de Interoperabilidad de Pagos — Panamá

Estructura de contratos OpenAPI del HUB, organizada según la práctica **un contrato por API
publicable** más una librería de componentes comunes. Cada API se versiona, publica y gobierna
de forma independiente en el gateway; los componentes comunes garantizan que todas comparten
los mismos tipos, errores, parámetros y esquema de seguridad.

> **Idioma.** La especificación (títulos, rutas, esquemas, descripciones) está **en inglés**,
> como buena práctica de contratos API interoperables. La documentación de acompañamiento
> (este README, diccionario de datos, planes) se mantiene en español.

## Estructura

```
├── common/
│   └── common-components.yaml       Librería compartida (no publicable): esquemas, parámetros,
│                                    respuestas de error (RFC 7807) y esquema de seguridad OAuth/mTLS
├── api-key-directory/
│   └── openapi.yaml                 Resolución de llaves, ciclo prxy.001/002, portabilidad,
│                                    verificación cuenta-nombre       (scopes directory.*)
├── api-merchant-directory/
│   └── openapi.yaml                 Registro y resolución de comercios interoperables (creditor ID
│                                    26.04), métodos de cobro, registro de redes/GUID (scopes merchants.*)
├── api-payments/
│   └── openapi.yaml                 Canal único de transporte ISO 20022: pacs.008/.007/.004,
│                                    camt.056, estado pacs.002/.028   (scopes payments.*)
├── api-collections/
│   └── openapi.yaml                 Request-to-Pay / QR (pain.013/pain.014), inicio y respuesta
│                                                                     (scopes collections.*)
├── api-events/
│   └── openapi.yaml                 Suscripciones al canal de notificación saliente: eventos de
│                                    directorio y operativos, webhook JWS (scope events.manage)
├── api-operations/
│   └── openapi.yaml                 Sign On/Off, echo, SNM y ventanas, eventos entrantes
│                                    participante→HUB, acciones de operador (scopes operations.*)
├── api-reconciliation/
│   └── openapi.yaml                 Descarga del archivo de conciliación del ciclo y ACK con
│                                    discrepancias                    (scopes reconciliation.*)
├── uml/
│   ├── u1_clases.png                Modelo de datos del directorio (clases)
│   ├── u2_resolucion_alias.png      Secuencia: resolución de llave de persona
│   ├── u3_alta_portabilidad.png     Secuencia: alta y portabilidad (prxy.001/002)
│   ├── u4_registro_comercio.png     Secuencia: registro de comercio interoperable
│   ├── u5_resolucion_qr.png         Secuencia: resolución de creditor ID desde un QR
│   └── fuente/*.mmd                 Fuente Mermaid editable de cada diagrama
└── diccionario/
    └── Diccionario_Datos_Directorio_HUB_v2.md
```

## Alcance de las APIs

Las ocho APIs de este repositorio cubren la superficie que el HUB expone a los participantes:

- **APIs de directorio** (`api-key-directory`, `api-merchant-directory`) — Registro y resolución
  de alias de persona y de comercios interoperables (QR P2M).
- **APIs de pago y cobro** (`api-payments`, `api-collections`) — Canal único de transporte de
  mensajes ISO 20022: pagos push, reversiones, retornos, cancelaciones y solicitudes de cobro
  Request-to-Pay.
- **API de eventos** (`api-events`) — Suscripciones a webhooks: notificaciones de directorio y
  operativas enviadas por el HUB a los participantes (canal saliente).
- **API de operaciones** (`api-operations`) — Sesión del participante (Sign On/Off), heartbeat,
  mensajes del sistema y eventos operativos enviados por el participante al HUB (canal entrante).
- **API de conciliación** (`api-reconciliation`) — Descarga del archivo de ciclo y confirmación
  con reporte de discrepancias.

> Los contratos del lado participante (recepción del mensaje enrutado, eco hacia el participante)
> se definirán en la fase de validación técnica conjunta con las operadoras, reutilizando los
> componentes comunes de esta librería.

## Convenciones

- **Versionado por API.** Cada API arranca en `1.0.0-draft` con su versión mayor en la URL
  (`/key-directory/v1`, `/payments/v1`, …). Un cambio de ruptura sube la mayor solo de la API
  afectada; las demás no se ven arrastradas.
- **Componentes comunes.** Las APIs referencian `common/common-components.yaml` con `$ref`
  relativos. Un cambio en la librería es un cambio de contrato de todas las APIs que la usan:
  se tramita con la misma disciplina que un cambio de API.
- **Errores.** `application/problem+json` (RFC 7807) con `reasonCode` numérico del catálogo
  de códigos de error del HUB (familias 1xxx directorio, 3xxx rechazo de negocio, 4xxx timeout)
  e `isoReasonCode` (External Code Sets ISO 20022) cuando aplica.
- **Seguridad.** OAuth 2.0 client credentials + OIDC sobre mTLS con tokens sender-constrained
  (RFC 8705); scopes por dominio refinados como `domain.action`.
  Headers obligatorios: `x-fapi-interaction-id`, `x-fapi-auth-date`, `x-fapi-customer-ip-address`,
  `x-jws-signature` (obligatorio en operaciones de escritura y webhooks), `x-participant-id`,
  `Idempotency-Key`.
- **Decisiones de diseño pendientes de ratificación.** Algunos aspectos (asignación del
  `creditorId`, registro de GUIDs de red, modelo de portabilidad, política de caché,
  mecanismo de webhooks, paginación y versionado) están resueltos con el criterio técnicamente
  más sólido disponible y documentados en el campo `info.description` de cada API.

## Comandos útiles

```bash
# Lint de una API (resuelve los $ref externos)
npx @redocly/cli lint api-merchant-directory/openapi.yaml

# Empaquetar una API en un único fichero autocontenido (para gateway o portal)
npx @redocly/cli bundle api-merchant-directory/openapi.yaml -o dist/merchant-directory.yaml

# Documentación navegable
npx @redocly/cli build-docs api-merchant-directory/openapi.yaml -o docs/merchant-directory.html

# Regenerar un diagrama (requiere @mermaid-js/mermaid-cli)
mmdc -i uml/fuente/u1_clases.mmd -o uml/u1_clases.png -b white -s 2
```


