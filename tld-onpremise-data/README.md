# tld-onpremise-data — réplica AWS DynamoDB → Oracle Premisa

Memoria viva del repositorio **tld-onpremise-data**: lambdas SAM que consumen streams DynamoDB y cargan datos en Oracle on‑premise (esquemas **PA_MAC** para P2P y **PA_ACH** para P2M).

**Handoff de sesión:** leer primero [`ESTADO-ACTUAL.md`](./ESTADO-ACTUAL.md).

## Rama de trabajo

`feature/ARQ-256_Bajar_a_premisa_P2M`

## Qué hace este repo

1. **Premisa (`premisa/`):** scripts Oracle versionados — tablas, packages, datos `TLRD_RTP_SQL`, grants, `install.sql`.
2. **Lambdas (`lambdas/`):** procesan eventos DynamoDB Streams, filtran por producto (P2P vs P2M), llaman al package Oracle correspondiente.
3. **Stack SAM (`template.yaml` + `samconfig.toml`):** despliega lambdas, colas de reintento, secretos.

## Dos flujos paralelos

| | P2P (PA_MAC) | P2M (PA_ACH) |
|---|---|---|
| Esquema Oracle | `PA_MAC` | `PA_ACH` |
| Package | `PCK_PA_MAC_AWS` | `PCK_PA_ACH_AWS` |
| Prefijo RTP | `P2P_` | `P2M_` |
| Secreto lambda | `alias-replica/oracle` | `ach-directo-v2/oracle` |
| Cola reintento | `tld-alias-replicacion` | `tld-ach-replicacion` |
| Usuario conexión Oracle (runtime) | `AWSDATA` | `AWSDATA` |

Canal y bitácora comparten **un solo stream** DynamoDB cada una; hay **dos lambdas** por stream (una MAC, una ACH) con filtros complementarios.

## Documentos en esta carpeta

| Archivo | Contenido |
|---------|-----------|
| [**ESTADO-ACTUAL.md**](./ESTADO-ACTUAL.md) | Estado al último trabajo: qué pasó en premisa, qué falta, riesgos |
| [01-arquitectura.md](./01-arquitectura.md) | Visión general, evolución legacy → PA_MAC/PA_ACH, por qué dos lambdas por stream |
| [02-pa-mac-p2p.md](./02-pa-mac-p2p.md) | Esquema PA_MAC, tablas, RTP, migración ARQ-256 |
| [03-pa-ach-p2m.md](./03-pa-ach-p2m.md) | Esquema PA_ACH, mapeos cuenta/mcc, decisiones IPEDA |
| [04-lambdas-y-filtros.md](./04-lambdas-y-filtros.md) | Lambdas, filtros, logo, colas, llamada Oracle |
| [05-premisa-instalacion.md](./05-premisa-instalacion.md) | Scripts install, idempotencia, ORA-01704, grants, usuario ejecutor |
| [06-despliegue-aws.md](./06-despliegue-aws.md) | Orden despliegue, streams, samconfig, secretos, comprobaciones |

## Scripts de instalación premisa (punto de entrada ARQ-256)

Ejecutar desde la carpeta `premisa/ARQ-256_Bajar_a_premisa_P2M/`:

| Script | Usuario típico | Qué aplica |
|--------|----------------|------------|
| `install.sql` | Usuario admin con privilegios DDL en PA_MAC | Package MAC, ALTER `SERVICIOSASOCIADOS`, RTP P2P, grant |
| `install_PA_ACH.sql` | Usuario admin con privilegios DDL en PA_ACH | Llama a `PA_ACH/install.sql` completo |

El usuario que ejecuta **no es** `AWSDATA` ni necesariamente el dueño del esquema; los objetos van calificados (`PA_MAC.`, `PA_ACH.`).

## Tickets relacionados

- **IPEDA-3142:** no crear tablas propias para comercios/MCC en PA_ACH; usar `TLRD_ALIAS_P2M` y `TLRD_MCC` existentes.
- **IPEDA-3139:** no replicar campo `logo` de `tld-p2m-cuenta` a premisa.
