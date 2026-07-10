# Premisa — instalación y scripts Oracle

## Scripts de entrada (ARQ-256)

Ubicación: `premisa/ARQ-256_Bajar_a_premisa_P2M/`

| Archivo | Alcance |
|---------|---------|
| `install.sql` | Cambios PA_MAC sobre base existente |
| `install_PA_ACH.sql` | Wrapper → `@@../PA_ACH/install.sql` |

**No** usar `premisa/PA_MAC/install.sql` ni `premisa/PA_ACH/install.sql` directamente para despliegue ARQ-256 en base ya poblada (el de PA_MAC es install completo esquema nuevo).

## Cómo ejecutar

- **Herramienta:** TOAD o SQL*Plus / SQLcl.
- **Modo:** script completo (F5 en TOAD), no statement suelto.
- **Working folder:** carpeta del `install.sql` que se ejecuta (para resolver `@` y `@@`).
- **Usuario:** admin con privilegios para crear/alterar en `PA_MAC` / `PA_ACH` (no AWSDATA, no necesariamente el dueño del esquema).

### SQL*Plus ejemplo

```bash
cd premisa/ARQ-256_Bajar_a_premisa_P2M
sqlplus usuario/...@servicio @install.sql
sqlplus usuario/...@servicio @install_PA_ACH.sql
```

## Usuario ejecutor vs dueño del esquema

Los `CREATE`/`ALTER`/`GRANT` van calificados (`PA_ACH.TLRD_P2M`, etc.) → funcionan con admin.

Las verificaciones de existencia usan **`ALL_TABLES` / `ALL_TAB_COLUMNS` con `OWNER` explícito** (`PA_MAC` o `PA_ACH`), no `USER_TABLES` — porque `USER_*` solo ve el esquema del usuario conectado y fallaría con admin.

Requisito: el usuario necesita ver el diccionario (rol `SELECT_CATALOG_ROLE` o equivalente).

## Idempotencia (re-ejecutable)

| Objeto | Comportamiento |
|--------|----------------|
| Tablas PA_ACH (7) | Crear solo si no existe en `ALL_TABLES` |
| ALTER SERVICIOSASOCIADOS | Solo si columna no existe |
| Package | `CREATE OR REPLACE` |
| RTP inserts | `DELETE WHERE code = ...` + `INSERT` |
| Grant/sinónimo | Verifica privilegio; aviso si no puede |

Mensajes `DBMS_OUTPUT`: "creada", "ya existe, se omite", "AVISO: ...".

`SET SERVEROUTPUT ON` en installs relevantes.

## PA_ACH/install.sql — secuencia

1. `@@TABLE/TLRD_MENSAJE_RECIBIDO.sql`
2. `@@TABLE/TLRD_RTP_SQL.sql` (+ trigger)
3. `@@TABLE/TLRD_ALIAS_P2M.sql`
4. `@@TABLE/TLRD_MCC.sql`
5. `@@TABLE/TLRD_VALIDADOR_CANAL.sql`
6. `@@TABLE/TLRD_VALIDADOR_BITACORA.sql`
7. `@@TABLE/TLRD_P2M.sql`
8. `@@DATA/TLRD_RTP_SQL/install.sql` (6 inserts P2M)
9. Package pks/pkb
10. `@@GRANT/AWSDATA.sql`

Las 4 primeras tablas se crean en Sandbox premisa vacío; en QA premisa existentes se omiten.

## ARQ-256/install.sql (PA_MAC) — secuencia

1. Package MAC pks/pkb
2. ALTER SERVICIOSASOCIADOS idempotente
3. 3 inserts RTP P2P
4. GRANT AWSDATA (ARQ-256 copy con verificación privilegios)

## Includes `@@` vs `@`

`@@` resuelve rutas **relativas al archivo que contiene el @@**, no al directorio de trabajo. Necesario para que `install_PA_ACH.sql` → `PA_ACH/install.sql` → `@@TABLE/...` funcione.

## Problema ORA-01704 (literal demasiado largo)

**Causa:** `INSERT INTO TLRD_RTP_SQL (...) VALUES (..., q'~...sql grande...~', ...)` como SQL puro tiene límite **4000 bytes** por literal. Los scripts de canal/bitácora superan ~5–6 KB.

**Solución incorrecta:** solo envolver en `BEGIN ... END` — el INSERT sigue siendo SQL con límite 4000.

**Solución correcta** (aplicada en 6 archivos con literal >4000):

```sql
DECLARE
  v_clob CLOB;
BEGIN
  DELETE FROM PA_ACH.TLRD_RTP_SQL WHERE code = 'P2M_TLD-VALIDADOR-CANAL';

  v_clob := q'~
    ... PL/SQL del sql_query ...
  ~';

  INSERT INTO PA_ACH.TLRD_RTP_SQL (..., sql_query, ...)
  VALUES (..., v_clob, NULL);

  COMMIT;
END;
/
```

En PL/SQL la asignación a `CLOB` permite hasta **32767** bytes en el literal. El INSERT usa bind → sin límite 4000.

Archivos con patrón CLOB variable:

- P2M: P2M_TLD-VALIDADOR-CANAL, P2M_TLD-VALIDADOR-BITACORA, P2M_TLD-P2M
- P2P: P2P_TLD-VALIDADOR-CANAL, P2P_TLD-VALIDADOR-BITACORA, P2P_TLD-ALIAS-CUENTA

Archivos con literal <4000: mantienen `BEGIN ... END` simple (P2M cuenta, mcc, msn_validate; P2P msn_validate).

**No requiere** cambiar tamaño de columna `SQL_QUERY` — ya es CLOB.

## GRANT y sinónimo público

### Por qué existen

AWSDATA ejecuta `PCK_PA_*_AWS` sin prefijo. Necesita EXECUTE + sinónimo público.

### Comportamiento actual del script

```sql
-- GRANT: si USER = dueño O tiene GRANT ANY OBJECT PRIVILEGE
-- SYNONYM: si tiene CREATE PUBLIC SYNONYM
-- Si no: DBMS_OUTPUT AVISO con SQL manual, NO aborta
```

### Error visto en log (antes del fix de avisos)

```
ORA-01031: privilegios insuficientes
GRANT EXECUTE ON PA_MAC.PCK_PA_MAC_AWS TO AWSDATA
CREATE OR REPLACE PUBLIC SYNONYM ...
```

Usuario ejecutor: admin **sin** ser PA_MAC/PA_ACH y **sin** privilegios de grant/sinónimo público.

**Acción pendiente típica:** DBA o dueño ejecuta los 4 statements (MAC + ACH).

## Trigger TLRD_RTP_SQL

Tabla prerrequisito `TLRD_RTP_SQL` tiene trigger `TRG_TLRD_RTP_SQL` que asigna `SQL_ID` en INSERT si viene null. Los inserts RTP no pasan `SQL_ID` → el trigger lo genera.

Constraint `UNIQUE(CODE)` → el DELETE previo por code evita conflicto en re-ejecución.

## Backup recomendado antes de install

- Export o copia de filas `TLRD_RTP_SQL` que van a reinsertarse (los scripts hacen DELETE por `code`).

## Log de instalación conocido (referencia)

**PA_MAC install:** package OK, columna omitida, RTP OK, grant/sinónimo ORA-01031.

**PA_ACH install:** prereqs OK, tablas omitidas, RTP OK (post-fix CLOB), package OK, grant ORA-01031.

Tras fix de avisos en GRANT: re-ejecutar debería terminar sin error crudo y mostrar AVISOS si faltan privilegios.
