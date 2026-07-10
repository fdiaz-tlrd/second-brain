# PA_MAC — flujo P2P

## Ubicación en repo

```
premisa/PA_MAC/
├── TABLE/           DDL tablas
├── PACKAGE/         PCK_PA_MAC_AWS.pks / .pkb
├── DATA/TLRD_RTP_SQL/
├── GRANT/AWSDATA.sql
└── install.sql      Instalación esquema completo (base nueva)
```

Migración sobre base **ya existente** (solo lo del cambio ARQ-256):

```
premisa/ARQ-256_Bajar_a_premisa_P2M/install.sql
```

## Package

- **Nombre:** `PA_MAC.PCK_PA_MAC_AWS`
- **Entrada:** `PRC_DOWNDATA_AWS_TLRD(P_MESSAGE_IN CLOB, P_MEESAGE_OUT OUT VARCHAR2)`
- **Reemplaza:** `PCK_TLRD_INTEROPERABILIDAD` (sin `PCK_TLRD_UTILS`, sin `apex_collections`)

## Tablas PA_MAC (creadas por install completo)

| Tabla | Uso |
|-------|-----|
| TLRD_MENSAJE_RECIBIDO | Auditoría mensajes recibidos |
| TLRD_RTP_SQL | Scripts y validación JSON |
| TLRD_VALIDADOR_CANAL | Réplica canal |
| TLRD_VALIDADOR_BITACORA | Réplica bitácora |
| TLRD_ALIAS_CUENTA | Réplica alias cuenta |

En instalación ARQ-256 sobre base existente **no** se recrean tablas; solo package, ALTER columna, RTP y grant.

## Campo serviciosAsociados (ARQ-256)

- DynamoDB `tld-validador-canal` tiene `serviciosAsociados` (string: P2P, P2M, ambos).
- Premisa: columna `SERVICIOSASOCIADOS CLOB` en `TLRD_VALIDADOR_CANAL`.
- Script ARQ-256: `TABLE/TLRD_VALIDADOR_CANAL_ADD_SERVICIOSASOCIADOS.sql` — ALTER idempotente (solo si columna no existe).
- RTP `P2P_TLD-VALIDADOR-CANAL` lee el campo del JSON.

## Scripts TLRD_RTP_SQL (prefijo P2P_)

| code | tablaOrigen / file_name | Tabla destino |
|------|-------------------------|---------------|
| P2P_MSN_VALIDATE | — | Validación JSON (json_script) |
| P2P_TLD-VALIDADOR-CANAL | tld-validador-canal | TLRD_VALIDADOR_CANAL |
| P2P_TLD-VALIDADOR-BITACORA | tld-validador-bitacora | TLRD_VALIDADOR_BITACORA |
| P2P_TLD-ALIAS-CUENTA | tld-alias-cuenta | TLRD_ALIAS_CUENTA |

Patrón de carga: `DELETE FROM TLRD_RTP_SQL WHERE code = '...'` + `INSERT` (re-ejecutable).

Inserts con `sql_query` grande (>4000 bytes): bloque PL/SQL con `DECLARE v_clob CLOB`, asignación `v_clob := q'~...~'`, INSERT usando `v_clob` como bind.

## Lambdas P2P (stack tld-onpremise-data)

| Lambda | DynamoDB | Filtro |
|--------|----------|--------|
| tld-replica-canal | tld-validador-canal | `serviciosAsociados !== "P2M"` |
| tld-replica-bitacora | tld-validador-bitacora | ops 0001–0011, 0013, 0022, 0023; op no identificable → sí |
| tld-replica-alias-cuenta | tld-alias-cuenta | todos |
| tld-alias-reintento | tld-alias-replicacion | mismos filtros por tabla origen |

Módulo filtros: `lambdas/replica-canal/lib/filtrosReplica.js` (copia equivalente en bitacora, alias-reintento).

## Secreto y cola

- Secreto: `alias-replica/oracle`
- Cola reintento: `tld-alias-replicacion` (GSI `idTablaIdx`)

## install.sql ARQ-256 — secuencia

1. `@../PA_MAC/PACKAGE/PCK_PA_MAC_AWS.pks`
2. `@../PA_MAC/PACKAGE/PCK_PA_MAC_AWS.pkb`
3. `@TABLE/TLRD_VALIDADOR_CANAL_ADD_SERVICIOSASOCIADOS.sql`
4. Inserts P2P canal, cuenta, bitácora
5. `@GRANT/AWSDATA.sql`

## Grant AWSDATA (PA_MAC vía ARQ-256)

Archivo: `premisa/ARQ-256_Bajar_a_premisa_P2M/GRANT/AWSDATA.sql`

- Si `USER = 'PA_MAC'` o tiene `GRANT ANY OBJECT PRIVILEGE` → ejecuta GRANT.
- Si tiene `CREATE PUBLIC SYNONYM` → crea sinónimo público.
- Si no → imprime AVISO con SQL manual (no aborta).

Acciones manuales típicas cuando el ejecutor es admin sin privilegios:

```sql
GRANT EXECUTE ON PA_MAC.PCK_PA_MAC_AWS TO AWSDATA;
CREATE OR REPLACE PUBLIC SYNONYM PCK_PA_MAC_AWS FOR PA_MAC.PCK_PA_MAC_AWS;
```
