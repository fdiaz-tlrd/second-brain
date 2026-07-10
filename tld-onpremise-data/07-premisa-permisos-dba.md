# Premisa — permisos DBA para instalación PA_ACH (Sandbox)

Contexto: en **Sandbox premisa** (`ACHTEST`) las tablas P2M en `PA_ACH` **no existen**. El usuario **`FDIAZ`** ejecuta `@install_PA_ACH.sql` pero falló con **`ORA-01031`** al intentar crear `PA_ACH.TLRD_MENSAJE_RECIBIDO` — puede consultar `ALL_TABLES` pero no crear objetos en el esquema `PA_ACH`.

Script de entrada: `premisa/ARQ-256_Bajar_a_premisa_P2M/install_PA_ACH.sql` (repo `tld-onpremise-data`, rama `feature/ARQ-256_Bajar_a_premisa_P2M`).

Ver también: [05-premisa-instalacion.md](./05-premisa-instalacion.md).

---

## Opción A — Otorgar permisos a FDIAZ

Base de Datos ejecuta:

```sql
GRANT CREATE ANY TABLE     TO FDIAZ;
GRANT CREATE ANY INDEX     TO FDIAZ;
GRANT CREATE ANY TRIGGER   TO FDIAZ;
GRANT CREATE ANY PROCEDURE TO FDIAZ;   -- package PCK_PA_ACH_AWS
GRANT UNLIMITED TABLESPACE TO FDIAZ;   -- o quota en tablespace PA_ACH
-- Alternativa más acotada (si la versión lo soporta):
-- GRANT ALL PRIVILEGES ON SCHEMA PA_ACH TO FDIAZ;
```

Cuota acotada en lugar de `UNLIMITED TABLESPACE`:

```sql
ALTER USER FDIAZ QUOTA UNLIMITED ON PA_ACH;
```

Tras los grants, **FDIAZ** re-ejecuta desde `premisa/ARQ-256_Bajar_a_premisa_P2M/`:

```sql
SET SERVEROUTPUT ON SIZE UNLIMITED
@install_PA_ACH.sql
```

### Si preguntan por CREATE ANY TRIGGER

El install crea **un solo trigger** en `PA_ACH`:

| Objeto | Tabla | Función |
|--------|-------|---------|
| `PA_ACH.TRG_TLRD_RTP_SQL` | `TLRD_RTP_SQL` | `BEFORE INSERT FOR EACH ROW` — asigna `SQL_ID = MAX(sql_id)+1` |

Los inserts RTP del install **no envían `SQL_ID`**; el trigger lo genera. Es el **mismo patrón** que `PA_MAC.TRG_TLRD_RTP_SQL` en P2P (réplica AWS → Premisa). No es auditoría ni lógica de negocio: solo secuencia la PK numérica en inserts de configuración.

Sin el trigger, los 6 inserts `P2M_*` en `TLRD_RTP_SQL` fallan.

Definición (referencia en repo): `premisa/PA_ACH/TABLE/TLRD_RTP_SQL.sql`.

### GRANT / sinónimo AWSDATA (paso final del install)

Al terminar tablas, RTP y package, el script intenta:

- `GRANT EXECUTE ON PA_ACH.PCK_PA_ACH_AWS TO AWSDATA`
- `CREATE OR REPLACE PUBLIC SYNONYM PCK_PA_ACH_AWS FOR PA_ACH.PCK_PA_ACH_AWS`

Si `FDIAZ` no tiene `GRANT ANY OBJECT PRIVILEGE` ni `CREATE PUBLIC SYNONYM`, el script **no aborta** — imprime **AVISO** con el SQL manual (mismo comportamiento visto en QA). Base de Datos puede aplicarlo aparte si hace falta para runtime de las lambdas (`AWSDATA`).

---

## Opción B — Base de Datos ejecuta el install

FDIAZ entrega el script y Base de Datos lo corre con usuario que **sí** tenga DDL en `PA_ACH` (idealmente **`PA_ACH`** o DBA con privilegios equivalentes).

**Working folder:** `premisa/ARQ-256_Bajar_a_premisa_P2M/` (para resolver `@@`).

```sql
SET SERVEROUTPUT ON SIZE UNLIMITED
WHENEVER SQLERROR EXIT FAILURE
@install_PA_ACH.sql
```

Repo: `tld-onpremise-data`, rama `feature/ARQ-256_Bajar_a_premisa_P2M`.

Si el ejecutor es **`PA_ACH`**, no hace falta `CREATE ANY *` — el dueño crea tablas, trigger, package y puede otorgar EXECUTE a `AWSDATA` (sinónimo público puede seguir requiriendo DBA).

Al finalizar, pedir el **log completo** (`DBMS_OUTPUT`) hasta el banner `# FIN install PA_ACH`.

### Criterios de éxito en el log

1. Pasos **1/7 a 7/7** sin `ORA-`
2. Resumen: **7 tablas EXISTE**
3. **6 registros** `TLRD_RTP_SQL` con `code LIKE 'P2M_%'`
4. Package body **VALID** en `ALL_OBJECTS`
5. GRANT/sinónimo: OK, «ya existe, se omite» o AVISO con SQL manual

---

## Incidente Sandbox (2026-07-10)

| Campo | Valor |
|-------|-------|
| Host | `172.28.56.40:1598` |
| Service | `ACHTEST` |
| Usuario | `FDIAZ` |
| Error | `ORA-01031` en creación de `TLRD_MENSAJE_RECIBIDO` (paso 1/7) |
| Log | `second-brain/investigacion/deploy_tld-onpremise-data/premisa.md` |

Install **no completó** — pendiente Opción A u Opción B.
