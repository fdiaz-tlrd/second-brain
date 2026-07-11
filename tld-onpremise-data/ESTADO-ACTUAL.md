# Estado actual — tld-onpremise-data (ARQ-256 / P2M a premisa)

**Última consolidación:** 2026-07-10 (fin de sesión — pausa para pruebas funcionales).

**Handoff:** leer primero la sección [Al retomar (pruebas Sandbox)](#al-retomar-pruebas-sandbox) al volver en unos días.

---

## Resumen en una frase

**Sandbox:** premisa instalada y stack AWS desplegado (Virginia + Oregon); **pendiente validación funcional** P2P/P2M end-to-end. **QA:** ARNs P2M en `samconfig.toml`, premisa PA_ACH con log anterior OK; **AWS QA sin desplegar**. **dev/prod:** streams P2M siguen `REEMPLAZAR`.

---

## Estado Sandbox (2026-07-10)

### Premisa ACHTEST

| Item | Estado |
|------|--------|
| Host | `172.28.56.40:1598` / service `ACHTEST` |
| `install.sql` (PA_MAC) | **Hecho** — package, RTP P2P, columna omitida |
| `install_PA_ACH.sql` (PA_ACH) | **Hecho** (confirmación usuario; tras permisos DBA o re-ejecución) |
| 7 tablas PA_ACH | Creadas en Sandbox vacío (o OK en re-run) |
| 6 RTP `P2M_*` | Esperados en `TLRD_RTP_SQL` |
| GRANT/sinónimo AWSDATA | **Verificar en pruebas** — históricamente ORA-01031/AVISO; sinónimo MAC ya existía |

Entorno premisa usado para pruebas oficiales P2M: **QA** (tablas infra ya existían). **Sandbox premisa** era vacío → install crea las 7 tablas.

Logs crudos premisa (intentos iniciales): [`investigacion/deploy_tld-onpremise-data/premisa.md`](../investigacion/deploy_tld-onpremise-data/premisa.md).

Permisos DBA (si vuelve a fallar DDL): [07-premisa-permisos-dba.md](./07-premisa-permisos-dba.md).

### AWS Sandbox (cuenta `807262913923`)

| Item | Estado |
|------|--------|
| Deploy `tld-onpremise-data` | **Hecho** 2026-07-10 — perfiles `sandbox` (us-east-1) y `sandbox-oregon` (us-west-2) |
| Stack | `tld-alias-replica` |
| Rama | `feature/ARQ-256_Bajar_a_premisa_P2M` |
| Hash deploy log | `1c7d760` (commit con ARNs P2M Sandbox; deploy posterior puede usar commits más nuevos) |
| 6 lambdas ACH nuevas | Creadas + EventSourceMapping a streams P2M/canal/bitácora |
| `TablaAchReplicacion` (`tld-ach-replicacion`) | Creada |
| `SecretAchReplica` | **Creado vacío por CloudFormation** — completar JSON conexión Oracle ACH |
| Lambdas MAC | Actualizadas (filtros P2P) |

Log deploy: [`investigacion/deploy_tld-onpremise-data/deploy_tld-onpremise-data.md`](../investigacion/deploy_tld-onpremise-data/deploy_tld-onpremise-data.md).

**Antes de probar P2M:** completar secreto **`ach-directo-v2/oracle`** en Secrets Manager Sandbox (host premisa, usuario `AWSDATA`, password, etc.). MAC usa **`alias-replica/oracle`** (debe existir).

---

## Estado QA (sin deploy AWS aún)

| Item | Estado |
|------|--------|
| ARNs P2M en `samconfig.toml` | **Hecho** — `[qa]` + `[qa-oregon]`, cuenta `823638603844` |
| Premisa PA_ACH | Package + RTP OK (log anterior); tablas infra omitidas (ya existían) |
| Deploy stack QA | **No hecho** |
| Secreto `ach-directo-v2/oracle` QA | **Verificar** |

Detalle ARNs: [06-despliegue-aws.md](./06-despliegue-aws.md) y tabla en sección [Streams en samconfig](#streams-en-samconfig).

---

## Al retomar (pruebas Sandbox)

Orden sugerido cuando vuelvas a probar (unos días):

1. **Secreto ACH** — Secrets Manager Sandbox: valor real en `ach-directo-v2/oracle` (o el nombre que use el stack).
2. **GRANT AWSDATA** (si lambdas fallan con `PLS-00201`):
   ```sql
   SELECT grantee, table_schema, table_name, privilege
     FROM all_tab_privs
    WHERE grantee = 'AWSDATA'
      AND table_schema IN ('PA_MAC','PA_ACH')
      AND table_name LIKE 'PCK_PA_%';
   ```
   Manual si falta: ver [05-premisa-instalacion.md](./05-premisa-instalacion.md) § GRANT.
3. **Pruebas funcionales** — tabla en [06-despliegue-aws.md](./06-despliegue-aws.md) § Comprobaciones post-despliegue:
   - Canal P2P / P2M / `ambos`
   - `tld-p2m` → `PA_ACH.TLRD_P2M`
   - `tld-p2m-cuenta` (sin logo) → `TLRD_ALIAS_P2M`
   - `tld-p2m-mcc` → `TLRD_MCC`
   - Errores → cola `tld-ach-replicacion` / CloudWatch `tld-replica-*`
4. **Premisa** — revisar `PA_ACH.TLRD_MENSAJE_RECIBIDO`, `gv_error` en package si hay fallos.
5. **Documentar resultados** — actualizar este archivo o `investigacion/deploy_tld-onpremise-data/`.

Región activa en Sandbox: confirmar si el tráfico de prueba va a **Virginia** o **Oregon** (dos stacks `tld-alias-replica`).

---

## Qué ya está en código (rama `feature/ARQ-256_Bajar_a_premisa_P2M`)

### PA_MAC (P2P)

- Package `PCK_PA_MAC_AWS`; filtros lambdas excluyen P2M en canal; bitácora solo P2P.
- ALTER `SERVICIOSASOCIADOS` idempotente; RTP P2P con patrón CLOB (ORA-01704).

### PA_ACH (P2M)

- Package `PCK_PA_ACH_AWS`; tablas réplica + 4 infra creadas si no existen.
- Cuenta/MCC → `TLRD_ALIAS_P2M` / `TLRD_MCC` (IPEDA-3142); sin `logo` (IPEDA-3139).
- 6 lambdas ACH + cola `tld-ach-replicacion`.

### Scripts premisa (mejoras julio 2026)

- Install **idempotente** con **`DBMS_OUTPUT`** paso a paso (7 pasos PA_ACH).
- `GRANT/AWSDATA.sql`: verifica existencia; usa **`TABLE_SCHEMA`** en `ALL_TAB_PRIVS` (no `OWNER` — fix ORA-00904 Oracle 19c+).
- Inserts RTP: DELETE/INSERT/COMMIT trazados; 6 scripts `P2M_*`.

Commits relevantes en `tld-onpremise-data`:

| Commit | Tema |
|--------|------|
| `3d88309` | PA_ACH crea 7 tablas si no existen |
| `23db940` | Trazas DBMS_OUTPUT install + GRANT idempotente |
| `a42ae79` | Fix `TABLE_SCHEMA` en ALL_TAB_PRIVS |
| `4a2138f` | ARNs P2M QA en samconfig |
| `1c7d760` / anteriores | ARNs P2M Sandbox |

---

## Streams en samconfig

| Ambiente | Perfiles | P2M en toml | MAC en toml |
|----------|----------|-------------|-------------|
| Sandbox | `sandbox`, `sandbox-oregon` | **Sí** | Sí |
| QA | `qa`, `qa-oregon` | **Sí** | Sí |
| dev / prod | varios | **`REEMPLAZAR`** | Sí (según perfil) |

### QA — suffix streams P2M (2026-07-10)

| Perfil | P2m | P2mCuenta | P2mMcc |
|--------|-----|-----------|--------|
| qa | 2026-06-25T03:04:01.975 | …01.994 | …01.915 |
| qa-oregon | 2026-07-10T16:08:53.816 | …37:46.291 | …51:26.200 |

### Sandbox — suffix streams P2M

| Perfil | P2m | P2mCuenta | P2mMcc |
|--------|-----|-----------|--------|
| sandbox | 2026-04-27T21:28:18.815 | …18.804 | 2026-06-20T22:28:43.215 |
| sandbox-oregon | 2026-07-10T09:43:09.626 | …01:09.027 | …03:42.343 |

Log crudo `describe-table`: sección «Anexo logs recolección streams» al final de este archivo.

---

## Pendiente (no bloquea pausa actual)

| # | Tarea | Notas |
|---|--------|-------|
| 1 | **Pruebas funcionales Sandbox** | Usuario retoma en ~días |
| 2 | Completar secreto **`ach-directo-v2/oracle`** Sandbox | Bloqueante runtime P2M si vacío |
| 3 | Verificar **GRANT EXECUTE** AWSDATA MAC/ACH | Query en § Al retomar |
| 4 | Deploy **QA** AWS | samconfig listo; premisa PA_ACH ya parcial |
| 5 | ARNs P2M **dev** y **prod** | Sigue `REEMPLAZAR` |
| 6 | Merge rama → main / PR | Tras pruebas OK |

---

## Incidentes resueltos en scripts (referencia)

| Error | Causa | Fix |
|-------|-------|-----|
| ORA-01031 premisa PA_ACH paso 1 | `FDIAZ` sin DDL en `PA_ACH` | Grants DBA o install como `PA_ACH` — [07-premisa-permisos-dba.md](./07-premisa-permisos-dba.md) |
| ORA-00904 `OWNER` en GRANT script | `ALL_TAB_PRIVS` usa `TABLE_SCHEMA` | Commit `a42ae79` |
| ORA-01704 inserts RTP | Literal >4000 en SQL | Patrón `v_clob CLOB` + bind |

---

## Decisiones cerradas (no reabrir sin pedido explícito)

| Tema | Decisión |
|------|----------|
| Dos lambdas por stream | MAC y ACH: distinto esquema, secreto, package, cola |
| `serviciosAsociados = "ambos"` | Réplica a **PA_MAC y PA_ACH** |
| Cuenta/MCC P2M | `TLRD_ALIAS_P2M` / `TLRD_MCC`; no tablas propias |
| Campo `logo` | No baja; strip en lambda |
| Validación mcc | Solo `mcc`, `descripcion` |
| Tablas infra PA_ACH | Install crea si no existen; QA omite, Sandbox creaba |

---

## Riesgos al retomar

- **Secreto ACH vacío** → lambdas ACH conectan mal o fallan al invocar Oracle.
- **Sin GRANT EXECUTE a AWSDATA** → `PLS-00201` al llamar package sin prefijo (sinónimo solo no alcanza).
- **Región equivocada** — probar en Virginia pero datos DynamoDB en Oregon (o viceversa).
- **Stream ARN desactualizado** — si reactivan stream DynamoDB, actualizar `samconfig.toml` y redeploy.
- Re-ejecutar install RTP: DELETE+INSERT por `code` (aceptable; backup opcional).

---

## Anexo — logs recolección streams (servidor despliegues)

<details>
<summary>Sandbox + QA — salida aws dynamodb describe-table (julio 2026)</summary>

Ver bloques completos en historial git de este archivo o en sesión de recolección. Resumen: todos los `describe-table` devolvieron ARN válido; P2M cargados en samconfig para Sandbox y QA; MAC ya coincidían.

Comandos repetibles:

```powershell
$env:AWS_REGION="us-east-1"   # o us-west-2
aws dynamodb describe-table --table-name tld-p2m --query "Table.LatestStreamArn"
aws dynamodb describe-table --table-name tld-p2m-cuenta --query "Table.LatestStreamArn"
aws dynamodb describe-table --table-name tld-p2m-mcc --query "Table.LatestStreamArn"
# + tld-validador-canal, tld-validador-bitacora, tld-alias-cuenta
```

</details>
