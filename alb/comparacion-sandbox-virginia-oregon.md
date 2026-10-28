# Comparacion sandbox — Virginia vs Oregon

| Campo | Valor |
|-------|-------|
| **Dump** | 2026-09-23 — repo [`aws-infra-dumps`](https://github.com/fdiaz-tlrd/aws-infra-dumps) `raw/sandbox/{virginia,oregon}/` |
| **Fuente canonica** | ese repo (no copiar JSON a second-brain) |

## ALBs

| | Virginia (`us-east-1`) | Oregon (`us-west-2`) |
|--|------------------------|----------------------|
| Nombre | `alb-sandbox` | `alb-sandbox-oregon` |
| TG VPCe | `vpc-endpoint-apis-virginia` | `vpc-endpoint-apis-oregon` |
| Otros TG | `pac-internal-api-tg`, `pac-internal-ui-tg` (instance, healthy) | solo el VPCe |
| Cert listener HTTPS | `5b48ab8b-…` (otra region ACM) | `24db24a6-…` (UI: **Caducada** 2025-11-22) |

## Health check del TG VPCe (el que importa para APIs)

Misma idea en ambos: HTTPS, path `/`, interval 30, threshold healthy 5 / unhealthy 2, target type `ip`.

| | Virginia | Oregon |
|--|----------|--------|
| **Matcher HttpCode** | **`200-403`** | **`200`** |
| Targets | 3 IPs | 3 IPs |
| Estado | **3/3 healthy** | **3/3 unhealthy** |
| Reason Oregon | — | `Target.ResponseCodeMismatch` codes **[403]** |

**Conclusion (evidencia del dump):** Oregon no esta “mas roto” a nivel red que Virginia. El VPCe responde **403** al probe (patron tipico sin Host de custom domain). Virginia **acepta 403 como healthy**; Oregon **exige solo 200**, por eso la consola marca Unhealthy.

Alinear Oregon al matcher `200-403` (como Virginia) haria healthy el TG **sin** cambiar el comportamiento real del VPCe ante `/`. Eso es cambio de infra; aqui solo se documenta el contraste.

## Mappings ALB Host ↔ APIGW (cruce `07-cruce-*.csv`)

### Oregon — Hosts del ALB

**14/14 OK** (tienen dominio + mapping stage `sandbox`), incluidos los que el usuario habia mapeado a mano (`otp`, `notificacion`, `alias`, `achx`, etc.).

Dominio APIGW en Oregon **sin** mapping y **no** es Host del ALB sand interno: `apigatesb.telered.com.pa` (REST y v2, MappingCount 0). Fuera del camino `tld-*.sand.telered.internal`.

### Virginia — Hosts del ALB

Casi todos los `tld-*.sand.telered.internal` del listener: **OK**.

Hosts en regla ALB **sin** entrada en `get-domain-names` (no son el mismo caso “falta mapping”):

| Host en ALB | Nota |
|-------------|------|
| `*.sand.telered.internal.pci` | Wildcard; no aparece como custom domain listado |
| `pac.sand.telered.internal` | Va a TG PAC (EC2), no al VPCe APIs |

### Hosts solo en Virginia (no en reglas Oregon del dump)

`tld-api-qrpayment`, `tld-api-r2p`, `tld-api-validador`, mas hosts de prueba (`canal-validador-dummy.sand*`, `vcnach-…`, `4vcnach-…`, `pac…`, wildcard pci).

Oregon **no** tiene reglas ALB para R2P / qrpayment / validador en este dump.

## Archivos clave en el dump

| Tema | Virginia | Oregon |
|------|----------|--------|
| Health VPCe | `…/alb-sandbox/06-tg-02-vpc-endpoint-apis-virginia-health.json` | `…/alb-sandbox-oregon/06-tg-00-vpc-endpoint-apis-oregon-health.json` |
| Matcher | `…-describe.json` → `200-403` | `…-describe.json` → `200` |
| Cruce Host/mapping | `dominios/07-cruce-alb-vs-dominios.csv` | idem |
