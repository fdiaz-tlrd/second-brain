# Diccionario de Datos del Directorio — HUB de Interoperabilidad de Pagos (Panamá)

> Este documento describe los esquemas de datos del dominio del **Directorio** del HUB de
> Interoperabilidad de Pagos de Panamá. El directorio gobierna dos registros: el de
> **llaves/alias de persona** (enrutamiento P2P) y el de **comercios interoperables**
> (resolución del pago P2M iniciado por QR). Las entidades transaccionales (PaymentOrder,
> PaymentStatus, RequestToPay) se documentan en los contratos OpenAPI de las APIs de pagos
> y cobros.
>
> Principio fundamental: el HUB resuelve, no expone cuentas en claro. La cuenta vigente se
> obtiene siempre por resolución en el momento de la operación; nunca viaja en el QR ni se
> almacena en caché más allá de los límites definidos para el perfil QR estático.

---

## 1. Principios del dominio

1. **Resolución, no exposición.** La respuesta de resolución devuelve participante destino y un *handle* opaco; los datos de cuenta en claro solo se entregan al participante autorizado en el contexto de una operación.
2. **El QR transporta identificación; el directorio la resuelve.** El subcampo 26.04 del estándar (`Interoperable Creditor ID`) es la clave de entrada del registro de comercios; cuenta y producto quedan siempre del lado del directorio.
3. **Una sucursal, un registro.** Cada sucursal se registra de forma independiente, con su alias y su cuenta; el `creditorId` interoperable identifica al receptor efectivo del abono. La agrupación multisucursal es un atributo (`merchantGroupId`), no una jerarquía de cuentas.
4. **Ciclo de vida completo con mensajería `prxy`.** Alta, modificación, baja y portabilidad de llaves se expresan con semántica `prxy.001/prxy.002`; el registro de comercios reutiliza el mismo patrón de estados.
5. **Caché acotada.** Solo es cacheable la resolución P2M de comercio (caso QR estático), con TTL parametrizable (valor inicial 2 h) e invalidación por evento de directorio. La resolución de alias de persona no se cachéa.
6. **Moneda única.** Todos los importes y validaciones operan en USD (ISO 4217 `840`). `PAB` queda reservado como evolutivo.

---

## 2. Enumeraciones (catálogos)

| Catálogo | Valores | Notas |
|---|---|---|
| `KeyType` | `MSISDN` (Fase 1) · `EMAIL` · `NATIONAL_ID` · `RUC` · `MERCHANT_ALIAS` | `MERCHANT_ALIAS` es la llave pública del comercio dentro de su red; la clave interoperable es `creditorId` (§3.4). |
| `KeyStatus` | `ACTIVE` · `SUSPENDED` · `PORTING` · `DEREGISTERED` | `PORTING` cubre la ventana de portabilidad entre participantes (48 horas; el silencio se interpreta como consentimiento). |
| `MerchantStatus` | `ACTIVE` · `SUSPENDED` · `INACTIVE` | Estado operativo del comercio en el directorio interoperable. |
| `CollectionMethodType` | `DIRECTORY` · `STATIC_QR` · `POS` · `CHECKOUT` · `PAYMENT_BUTTON` · `INTEGRATION` | Canales de cobro soportados por el directorio interoperable. |
| `AccountProductType` | `PACA` (ahorro) · `PACC` (corriente) | Tipo de producto de cuenta; extensible. |
| `QrProfile` | `STC-C` · `DYN` · `DYN-POS` · `DYN-CHECKOUT` · `HYB-CHECKOUT` | Perfiles del estándar QR (subcampo 80.01). |
| `NetworkId` | `TLRD` · `YAPY` · *(registro abierto)* | Subcampo 26.01 del estándar QR interoperable; registro abierto gobernado por el operador del esquema. |
| `RegistrationAction` | `REGISTER` · `MODIFY` · `DEREGISTER` · `PORT` | Semántica `prxy.001`. |
| `RegistrationStatus` | `ACCEPTED` · `REJECTED` · `PENDING` | Semántica `prxy.002`. |
| `ResolutionStatus` | `RESOLVED` · `NOT_FOUND` · `SUSPENDED` · `AMBIGUOUS` | `AMBIGUOUS` reservado para llaves detectadas en más de un participante. |
| `MccCode` | ISO 18245 (4 dígitos) | Catálogo maestro ISO 18245 gestionado por el directorio; todos los participantes deben suministrarlo al registrar comercios. |

---

## 3. Entidades del directorio

### 3.1 `Participant`
| Campo | Tipo | Oblig. | Descripción |
|---|---|---|---|
| `participantId` | string | Sí | Código de miembro (cámara local). |
| `bicfi` | string(8/11) | No | BIC/SWIFT si aplica. |
| `name` | string | Sí | Nombre legal. |
| `type` | `ParticipantType` | Sí | `OPERATOR` · `AGGREGATOR` · `BANK` · `TPP` (futuro). |
| `networkId` | `NetworkId` | Sí | Red a la que pertenece a efectos del estándar QR (26.01). |
| `status` | string | Sí | `ACTIVE` / `SUSPENDED`. |

### 3.2 `Key` (alias de persona)
| Campo | Tipo | Oblig. | Descripción |
|---|---|---|---|
| `keyType` | `KeyType` | Sí | Tipo de llave. |
| `keyValue` | string | Sí | Valor normalizado (E.164 para `MSISDN`). |
| `owningParticipantId` | string | Sí | Participante propietario del registro. |
| `status` | `KeyStatus` | Sí | Estado del alias. |
| `nationalIdHash` | string | Cond. | HMAC de la cédula para la validación alias‑cédula en el alta (funcionalidad planificada, no activa en fase 1); nunca en claro. |
| `registeredAt` / `updatedAt` | date-time | Sí | Sellos de ciclo de vida. |

### 3.3 `KeyRegistration` (alta / modificación / baja / portabilidad — `prxy.001/002`)
| Campo | Tipo | Oblig. | Descripción |
|---|---|---|---|
| `registrationId` | string | Sí | Id de la instrucción (idempotente). |
| `action` | `RegistrationAction` | Sí | Operación solicitada. |
| `key` | `Key` | Sí | Llave afectada. |
| `newParticipantId` | string | Cond. | Destino en portabilidad (`PORT`). |
| `fraudIndicator` | `FraudIndicator` | No | Bloque de señal de fraude confirmado. |
| `status` | `RegistrationStatus` | Sí | Resultado (`prxy.002`). |
| `reasonCode` | string | Cond. | Motivo de rechazo (catálogo de códigos de error del HUB). |

### 3.4 `Merchant` (comercio interoperable)
| Campo | Tipo | Oblig. | Descripción |
|---|---|---|---|
| `creditorId` | string(≤32) | Sí | **Identificador interoperable del comercio** (subcampo 26.04). Asignado por el HUB en el registro; permanente, inmutable y nunca reutilizado. |
| `networkId` | `NetworkId` | Sí | Red propietaria (26.01); determina el GUID de plantilla (26.00). |
| `acquiringParticipantId` | string | Sí | Procesador/banco adquirente de destino (26.02/26.03). |
| `merchantAlias` | string | Sí | Alias público dentro de su red (alfanumérico, sin acentos ni eñe). Uno por sucursal. |
| `legalName` | string | Sí | Nombre según aviso de operación. |
| `displayName` | string(≤25) | Sí | Nombre normalizado para el payload (tag 59), con abreviación determinista. |
| `city` | string(≤15) | Sí | Ciudad del establecimiento (tag 60). |
| `countryCode` | string(2) | Sí | `PA` (tag 58). |
| `mcc` | `MccCode` | Sí | Categoría del comercio (tag 52). |
| `merchantGroupId` | string | No | Agrupador multisucursal (presentación y reporting; no afecta a la liquidación). |
| `email` | string | No | Contacto operativo. |
| `logoRef` | string | No | Referencia al logotipo (90×90); el binario no se sirve en la resolución transaccional. |
| `legacyMerchantId` | string | No | Identificador heredado del adquirente (26.05), solo durante la transición. |
| `status` | `MerchantStatus` | Sí | Estado del registro. |
| `registeredAt` / `updatedAt` | date-time | Sí | Sellos de ciclo de vida. |

### 3.5 `CollectionMethod` (método de cobro / cuenta de liquidación)
| Campo | Tipo | Oblig. | Descripción |
|---|---|---|---|
| `collectionMethodId` | string | Sí | Clave interna del método de cobro (por sucursal puede existir más de uno). |
| `creditorId` | string | Sí | Comercio al que pertenece. |
| `type` | `CollectionMethodType` | Sí | Naturaleza del método. |
| `account` | `Account` | Sí | Cuenta de liquidación (esquema `OTHR`; **nunca** viaja en el QR ni en la resolución hacia la red pagadora). |
| `accountProduct` | `AccountProductType` | Sí | PACA / PACC. |
| `storeLabel` | string(≤25) | No | Etiqueta pública de sucursal (62.03). |
| `terminalLabels` | string[] | No | Terminales/cajas públicas asociadas (62.07). |
| `status` | string | Sí | `ACTIVE` / `SUSPENDED`. |

> **Regla:** la relación `Merchant 1—N CollectionMethod` permite que un mismo `creditorId` acredite en cuentas distintas por canal (POS vs. caja) sin alterar el payload del QR: el QR identifica al comercio; el directorio elige el método de cobro vigente.

### 3.6 `MerchantResolutionRequest` / `MerchantResolutionResponse`
**Request:** `creditorId` (26.04) **o** `networkId + merchantAlias`; `initiatingParticipantId`; `qrProfile` (80.01, opcional para trazabilidad); `Idempotency-Key` en cabecera.

**Response:**
| Campo | Tipo | Oblig. | Descripción |
|---|---|---|---|
| `creditorId` | string | Sí | Eco de la clave resuelta. |
| `resolvedParticipantId` | string | Sí | Adquirente/procesador destino del pago. |
| `payeeHandle` | string | Sí | Handle opaco del método de cobro vigente; la cuenta en claro no se expone a la red pagadora. |
| `displayName` / `city` / `mcc` | — | Sí | Datos de presentación y control (verificación contra el payload del QR). |
| `status` | `ResolutionStatus` | Sí | Resultado. |
| `cacheTtlSeconds` | integer | Cond. | Solo se emite para perfil `STC-C` (QR estático); el resto de perfiles no es cacheable. |
| `fraudIndicator` | `FraudIndicator` | No | Señal de la lista de fraude confirmado, si el consumo está habilitado para el solicitante. |

### 3.7 `MerchantRegistration` (alta / modificación / baja de comercio)
Mismo patrón que `KeyRegistration` (`action`, `status`, `reasonCode`) sobre la entidad `Merchant` + su `CollectionMethod` inicial. Reglas de validación: unicidad del alias por red, alias alfanumérico sin acentos ni caracteres especiales, y validación del MCC contra el catálogo maestro del directorio.

### 3.8 `AccountNameValidation` (cuenta‑nombre)
Petición con `Key` o `Account` + nombre declarado por el solicitante; respuesta `MATCH` / `CLOSE_MATCH` / `NO_MATCH`. Se reutiliza para la verificación de titularidad en el alta de comercios.

### 3.9 `FraudIndicator` (bloque de señal de fraude)
| Campo | Tipo | Oblig. | Descripción |
|---|---|---|---|
| `flagged` | boolean | Sí | Presencia en lista de fraude confirmado del destino. |
| `source` | string | Sí | Participante origen de la señal. |
| `reasonCode` | string | No | Motivo codificado. |
| `reportedAt` | date-time | No | Fecha de incorporación a la lista. |

### 3.10 `DirectoryEvent` (webhook de directorio)
| Campo | Tipo | Oblig. | Descripción |
|---|---|---|---|
| `eventId` / `subscriptionId` | string | Sí | Identificación del envío (JWS firmado, entrega al menos una vez, idempotencia en receptor). |
| `eventType` | string | Sí | `KEY_PORTED` · `KEY_DEREGISTERED` · `MERCHANT_UPDATED` · `MERCHANT_SUSPENDED` · `COLLECTION_METHOD_CHANGED`. |
| `payload` | object | Sí | Entidad afectada (vista mínima, sin cuenta en claro). |
| `occurredAt` | date-time | Sí | Sello del evento. Los eventos de comercio **invalidan la caché** P2M del afectado. |

---

## 4. Correspondencia con el estándar QR (payload ↔ directorio)

| Payload QR (estándar v2.1) | Entidad/campo del directorio | Regla |
|---|---|---|
| 26.00 GUID (`pa.<red>.qr`) | `Participant.networkId` → GUID registrado | El directorio mantiene el registro GUID ↔ red. |
| 26.01 red propietaria | `Merchant.networkId` | Debe coincidir con la red que registró el comercio. |
| 26.02 / 26.03 procesador y banco destino | `Merchant.acquiringParticipantId` | La resolución confirma o corrige; en discrepancia prevalece el directorio. |
| 26.04 creditor ID | `Merchant.creditorId` | Clave primaria de resolución P2M. |
| 26.05 merchant ID legado | `Merchant.legacyMerchantId` | Solo transición. |
| 26.06 hybrid resolution ID | resolución delegada a la red emisora | El directorio no almacena el estado del cobro híbrido; enruta la consulta. |
| 52 / 59 / 60 | `mcc` / `displayName` / `city` | La app pagadora puede contrastar payload ↔ resolución (control antifraude de sustitución). |
| 62.03 / 62.07 | `CollectionMethod.storeLabel` / `terminalLabels` | Presentación; sin efecto en la liquidación. |

---

## 5. Integración con los participantes

El modelo canónico del directorio actua como capa de abstracción entre los sistemas nativos de cada participante y el esquema interoperable. Cada participante mapea sus entidades internas a los esquemas definidos en este documento durante la fase de onboarding:

- Los **alias de persona** se registran a partir del catálogo de clientes del participante, normalizando el tipo y valor de llave al formato del directorio.
- Los **comercios** se registran a partir del maestro de comercios del adquirente, asignando el `creditorId` interoperable como identificador único del esquema.
- El **`merchantAlias`** debe ser único dentro de cada red; los participantes con comercios ya registrados en sus sistemas propios deben garantizar esta unicidad durante la carga inicial.
- La **cuenta de liquidación** se asocia al comercio a través del `CollectionMethod`; nunca viaja en el QR ni en la resolución hacia la red pagadora.

---

## 6. Reglas transversales

- La **carga inicial** del registro de comercios se alimenta de los directorios existentes de los participantes. La asignación de `creditorId` a comercios ya registrados en cada red forma parte del plan de migración acordado con los participantes.
- Los importes no forman parte del dominio del directorio; la validación de montos, propinas e impuestos pertenece al flujo de pago.
- **Retención mínima:** el logotipo y el correo son datos de onboarding, no de resolución; no se sirven en el camino transaccional.
- Los **códigos de razón** de error siguen el catálogo de códigos del HUB; los errores de directorio pertenecen a la familia `1xxx` y los rechazos de registro a la familia `3xxx`.
- **Seguridad:** mTLS + OAuth 2.0 con scopes por dominio (`directory.*`, `merchants.*`); el scope de lectura permite consulta y el de escritura permite registro y modificación.
