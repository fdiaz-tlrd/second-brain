# Retomar — pruebas funcionales Sandbox (ARQ-256)

Checklist corto para cuando vuelvas al tema tras la pausa (deploy y premisa ya hechos).

**Contexto completo:** [ESTADO-ACTUAL.md](./ESTADO-ACTUAL.md).

---

## Pre-requisitos antes de la primera prueba

- [ ] Secreto **`ach-directo-v2/oracle`** en Secrets Manager Sandbox (`807262913923`) con JSON válido (host premisa ACHTEST, `AWSDATA`, etc.).
- [ ] Secreto **`alias-replica/oracle`** operativo (flujo P2P).
- [ ] GRANT EXECUTE a AWSDATA sobre packages (query abajo).
- [ ] Saber qué región usar: **`sandbox`** = us-east-1, **`sandbox-oregon`** = us-west-2.

```sql
-- Premisa ACHTEST
SELECT grantee, table_schema, table_name, privilege
  FROM all_tab_privs
 WHERE grantee = 'AWSDATA'
   AND table_schema IN ('PA_MAC', 'PA_ACH')
   AND table_name IN ('PCK_PA_MAC_AWS', 'PCK_PA_ACH_AWS');
```

Si falta EXECUTE, pedir a DBA o dueño esquema:

```sql
GRANT EXECUTE ON PA_MAC.PCK_PA_MAC_AWS TO AWSDATA;
GRANT EXECUTE ON PA_ACH.PCK_PA_ACH_AWS TO AWSDATA;
-- Sinónimos públicos (si no existen):
CREATE OR REPLACE PUBLIC SYNONYM PCK_PA_MAC_AWS FOR PA_MAC.PCK_PA_MAC_AWS;
CREATE OR REPLACE PUBLIC SYNONYM PCK_PA_ACH_AWS FOR PA_ACH.PCK_PA_ACH_AWS;
```

O re-ejecutar (con fix `TABLE_SCHEMA` en repo):

```sql
-- premisa/ARQ-256_Bajar_a_premisa_P2M/
@@GRANT/AWSDATA.sql   -- solo PA_MAC en ese path
-- PA_ACH: @@../PA_ACH/GRANT/AWSDATA.sql desde PA_ACH/install o manual
```

---

## Matriz de pruebas

| # | Origen DynamoDB | Acción | Esperado premisa | Lambda / log |
|---|-----------------|--------|------------------|--------------|
| 1 | `tld-validador-canal` | Canal P2P | `PA_MAC.TLRD_VALIDADOR_CANAL` | MAC canal; no ACH |
| 2 | `tld-validador-canal` | Canal P2M | `PA_ACH.TLRD_VALIDADOR_CANAL` | ACH canal |
| 3 | `tld-validador-canal` | `serviciosAsociados=ambos` | **Ambos** esquemas | MAC + ACH |
| 4 | `tld-validador-bitacora` | Operación P2P | `PA_MAC.TLRD_VALIDADOR_BITACORA` | MAC bitácora |
| 5 | `tld-validador-bitacora` | Operación P2M | `PA_ACH.TLRD_VALIDADOR_BITACORA` | ACH bitácora |
| 6 | `tld-p2m` | Insert/update pago | `PA_ACH.TLRD_P2M` | `tld-replica-p2m` |
| 7 | `tld-p2m-cuenta` | Comercio (con logo en AWS) | `PA_ACH.TLRD_ALIAS_P2M` **sin logo** | `tld-replica-p2m-cuenta` |
| 8 | `tld-p2m-mcc` | MCC | `PA_ACH.TLRD_MCC` (`mcc`, `descripcion`) | `tld-replica-p2m-mcc` |
| 9 | Forzar error Oracle | — | Cola reintento + mensaje | `tld-ach-replicacion` / alias cola MAC |

---

## Dónde mirar si falla

| Síntoma | Revisar |
|---------|---------|
| Lambda no dispara | EventSourceMapping en consola; ARN stream en deploy |
| `PLS-00201` | GRANT/sinónimo AWSDATA |
| Timeout / red | VPC, security group, ruta a premisa |
| Error negocio Oracle | `PA_ACH.TLRD_MENSAJE_RECIBIDO`, `PCK_PA_ACH_AWS.gv_error` |
| Reintento | DynamoDB `tld-ach-replicacion` (ACH) o `tld-alias-replicacion` (MAC) |
| CloudWatch | Grupos `tld-replica-*`, `tld-*-reintento`, `*Ach*` |

---

## Después de probar

Actualizar [ESTADO-ACTUAL.md](./ESTADO-ACTUAL.md) con: qué casos pasaron, qué falló, capturas de logs si aplica.

Si Sandbox OK → siguiente paso natural: deploy QA AWS (samconfig ya tiene ARNs P2M).
