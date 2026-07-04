# Paso 3 — SAM deploy (sin crear tablas ni infra de datos)

**Fecha:** 2026-07-04  
**Repo:** [`tld-api-base`](../../tld-api-base)

## Alcance del template

`sam deploy` despliega **solo**:

| Recurso | Tipo |
|---------|------|
| API Gateway privado | `AWS::Serverless::Api` |
| Lambda `tld-api-base` | `AWS::Serverless::Function` |
| Layer de dependencias | `AWS::Serverless::LayerVersion` |

**No crea:** tablas DynamoDB, buckets S3, EFS, KMS ni otros stacks de datos. Esos recursos **ya existen** en la cuenta; el template los referencia por nombre vía parámetros (defaults `tld-validador-*`).

## Parámetros clave

| Parámetro | Env var / uso |
|-----------|----------------|
| `DbBitacora`, `DbDashboard`, `DbValidadorCanal`, … | `DB_*` + políticas IAM |
| `KmsKeyId`, `AccessPointId`, `EFSResourceId` | cifrado + montaje `/mnt/tld-llaves` |
| `ControlPlanFunctionName` | `CFG_CONTROL_PLAN_FUNCTION_NAME` |
| `AliasApiName` | `CFG_ALIAS_API_NAME` |
| `MetodosLimitesJson` | `CFG_METODOS_LIMITES_JSON` |
| `VPCe`, subnets, SG | VPC + API privado (igual P2M/P2P) |

## `samconfig.toml`

Misma estructura que **P2M**: perfiles `default`, `dev`, `dev-oregon`, `sandbox`, `sandbox-oregon`, `qa`, `qa-oregon`, `prod`, `prod-oregon`.

- `stack_name` / `s3_prefix`: `tld-api-base`
- VPC, subnets, KMS, EFS: copiados de P2M por ambiente
- Parámetros propios del template base: `ValidarPlanPorCanal`, `MetodosLimitesJson`, `AliasApiName` (sin QR ni tablas de dominio)

## Comandos

```bash
cd tld-api-base
cd lambdas/layer/nodejs && npm install && cd ../../..
sam build
sam deploy --config-env dev
# sam deploy --config-env sandbox
# sam deploy --config-env qa
# sam deploy --config-env prod
```

## Estructura layer (como P2M/P2P)

```
lambdas/
├── layer/nodejs/package.json   ← @aws-sdk/* (sin deps en lambdas/base)
└── base/                       ← solo código; runtime nodejs24.x + layer
```

## Endpoint

POST `{vpce}/base` — stage según `DeployEnvironment` (p. ej. `dev`).

## Pendiente

- Decidir si `tld-api-base` se despliega en prod o solo como referencia de desarrollo
