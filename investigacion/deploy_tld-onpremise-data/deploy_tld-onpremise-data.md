PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data> $repos = @(
>>     "tld-onpremise-data"
>> )
PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data>
PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data> $rama = "feature/ARQ-256_Bajar_a_premisa_P2M"
PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data> $basePath = "C:\Users\pbmadesarrollo\Documents\GitHub"
PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data> $deployScript = "C:\AWSdeploy\deployNewVersion.ps1"
PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data>
PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data> foreach ($repo in $repos) {
>>
>>     $repoPath = Join-Path $basePath $repo
>>
>>     if (-not (Test-Path $repoPath)) {
>>         Write-Warning "No existe el repositorio: $repoPath"
>>         continue
>>     }
>>
>>     Write-Host "Obteniendo hash de $repo..." -ForegroundColor Cyan
>>
>>     Set-Location $repoPath
>>
>>     git fetch origin $rama | Out-Null
>>
>>     $hash = (git rev-parse "origin/$rama").Trim()
>>
>>     Write-Host "Deployando $repo con hash $hash" -ForegroundColor Green
>>
>>     & $deployScript `
>>         -repositorio $repo `
>>         -ramaGit $rama `
>>         -ambiente sandbox `
>>         -esReversa no `
>>         -hashCommit $hash
>> }
Obteniendo hash de tld-onpremise-data...
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (1/1), done.
remote: Total 3 (delta 2), reused 3 (delta 2), pack-reused 0 (from 0)
Unpacking objects: 100% (3/3), 282 bytes | 4.00 KiB/s, done.
From https://github.com/Telered-Autopista/tld-onpremise-data
 * branch            feature/ARQ-256_Bajar_a_premisa_P2M -> FETCH_HEAD
   5bf57bc..bf50a34  feature/ARQ-256_Bajar_a_premisa_P2M -> origin/feature/ARQ-256_Bajar_a_premisa_P2M
Deployando tld-onpremise-data con hash bf50a342d0cdaf162a40a4f14ed619e7be107a10
[2026-07-08 18:12:35] [STEP] INICIO deployNewVersion.ps1
[2026-07-08 18:12:35] [STEP] RESUMEN - repo=tld-onpremise-data | rama=feature/ARQ-256_Bajar_a_premisa_P2M | ambiente=sandbox | modo=full | reversa=no
[INFO] Perfil: Desarrolladores | Usuario: pbmadesarrollo
[INFO] hashCommit: bf50a342d0cdaf162a40a4f14ed619e7be107a10
[INFO] Ruta repo: C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data
[INFO] Entornos SAM: sandbox, sandbox-oregon
[INFO] Log: C:\AWSdeploy\logs\pbmadesarrollo\deploy-tld-onpremise-data-sandbox-20260708-181235.log
[INFO] Herramientas: git OK | SAM Python 3.13.13 | npm OK | py -3.14 OK (Python 3.14.4)
[SUCCESS] Precondiciones OK.
[2026-07-08 18:12:42] [STEP] GIT - sincronizar repositorio con origin (remote-first)
HEAD is now at 5bf57bc chore: actualizar dependencias npm en layer nodejs
Reset branch 'feature/ARQ-256_Bajar_a_premisa_P2M'
branch 'feature/ARQ-256_Bajar_a_premisa_P2M' set up to track 'origin/feature/ARQ-256_Bajar_a_premisa_P2M'.
Your branch is up to date with 'origin/feature/ARQ-256_Bajar_a_premisa_P2M'.
HEAD is now at bf50a34 Update template.yaml
[INFO] Git rama: feature/ARQ-256_Bajar_a_premisa_P2M
[SUCCESS] Git sincronizado: bf50a34 - Update template.yaml (Felix Diaz)
[SUCCESS] hashCommit OK (coincide con HEAD).
[2026-07-08 18:12:58] [STEP] DEPENDENCIAS - npm (layer Node) y pip (Lambdas Python)
[SUCCESS] Registry npm local disponible en puerto 4873.
[INFO] npm: 1 carpeta(s) nodejs
[WARN] Sin package-lock.json; npm i --omit=dev --ignore-scripts: lambdas\layer\nodejs
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated debuglog@1.0.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
npm warn deprecated readdir-scoped-modules@1.1.0: This functionality has been moved to @npmcli/fs
npm warn deprecated read-package-json@2.1.2: This package is no longer supported. Please use @npmcli/package-json instead.
npm warn deprecated glob@7.2.3: Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me
npm warn deprecated read-installed@4.0.3: This package is no longer supported.

added 46 packages, and audited 47 packages in 17s

5 packages are looking for funding
  run `npm fund` for details

3 high severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
[INFO] pip: 0 requirements.txt
[2026-07-08 18:13:21] [SUCCESS] DEPENDENCIAS OK
[2026-07-08 18:13:21] [STEP] BUILD - sam build, layer ZIP y template
[INFO] Workspace temporal SAM: C:\sam-temp\tld-onpremise-data-20260708-181321-10352
[INFO] sam build: Python 3.14 listo en PATH
[INFO] Ejecutando sam build...
Building codeuri: C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data\lambdas\replica-cuenta runtime: nodejs24.x architecture: x86_64 functions: ReplicaAliasCuentaLambda
 Running NodejsNpmBuilder:NpmPack
 Running NodejsNpmBuilder:CopyNpmrcAndLockfile
 Running NodejsNpmBuilder:CopySource
 Running NodejsNpmBuilder:NpmInstall
 Running NodejsNpmBuilder:NpmTest
 Running NodejsNpmBuilder:CleanUpNpmrc
 Running NodejsNpmBuilder:LockfileCleanUp
Building codeuri: C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data\lambdas\replica-bitacora runtime: nodejs24.x architecture: x86_64 functions: ReplicaBitacoraLambda
 Running NodejsNpmBuilder:NpmPack
 Running NodejsNpmBuilder:CopyNpmrcAndLockfile
 Running NodejsNpmBuilder:CopySource
 Running NodejsNpmBuilder:NpmInstall
 Running NodejsNpmBuilder:NpmTest
 Running NodejsNpmBuilder:CleanUpNpmrc
 Running NodejsNpmBuilder:LockfileCleanUp
Building codeuri: C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data\lambdas\replica-canal runtime: nodejs24.x architecture: x86_64 functions: ReplicaCanalLambda
 Running NodejsNpmBuilder:NpmPack
 Running NodejsNpmBuilder:CopyNpmrcAndLockfile
 Running NodejsNpmBuilder:CopySource
 Running NodejsNpmBuilder:NpmInstall
 Running NodejsNpmBuilder:NpmTest
 Running NodejsNpmBuilder:CleanUpNpmrc
 Running NodejsNpmBuilder:LockfileCleanUp
Building codeuri: C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data\lambdas\alias-reintento runtime: nodejs24.x architecture: x86_64 functions: AliasReplicaReintentoLambda
 Running NodejsNpmBuilder:NpmPack
 Running NodejsNpmBuilder:CopyNpmrcAndLockfile
 Running NodejsNpmBuilder:CopySource
 Running NodejsNpmBuilder:NpmInstall
 Running NodejsNpmBuilder:NpmTest
 Running NodejsNpmBuilder:CleanUpNpmrc
 Running NodejsNpmBuilder:LockfileCleanUp
Building codeuri: C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data\lambdas\replica-canal-ach runtime: nodejs24.x architecture: x86_64 functions: ReplicaCanalAchLambda
 Running NodejsNpmBuilder:NpmPack
 Running NodejsNpmBuilder:CopyNpmrcAndLockfile
 Running NodejsNpmBuilder:CopySource
 Running NodejsNpmBuilder:NpmInstall
 Running NodejsNpmBuilder:NpmTest
 Running NodejsNpmBuilder:CleanUpNpmrc
 Running NodejsNpmBuilder:LockfileCleanUp
Building codeuri: C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data\lambdas\replica-bitacora-ach runtime: nodejs24.x architecture: x86_64 functions: ReplicaBitacoraAchLambda
 Running NodejsNpmBuilder:NpmPack
 Running NodejsNpmBuilder:CopyNpmrcAndLockfile
 Running NodejsNpmBuilder:CopySource
 Running NodejsNpmBuilder:NpmInstall
 Running NodejsNpmBuilder:NpmTest
 Running NodejsNpmBuilder:CleanUpNpmrc
 Running NodejsNpmBuilder:LockfileCleanUp
Building codeuri: C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data\lambdas\replica-p2m runtime: nodejs24.x architecture: x86_64 functions: ReplicaP2mLambda
 Running NodejsNpmBuilder:NpmPack
 Running NodejsNpmBuilder:CopyNpmrcAndLockfile
 Running NodejsNpmBuilder:CopySource
 Running NodejsNpmBuilder:NpmInstall
 Running NodejsNpmBuilder:NpmTest
 Running NodejsNpmBuilder:CleanUpNpmrc
 Running NodejsNpmBuilder:LockfileCleanUp
Building codeuri: C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data\lambdas\replica-p2m-cuenta runtime: nodejs24.x architecture: x86_64 functions: ReplicaP2mCuentaLambda
 Running NodejsNpmBuilder:NpmPack
 Running NodejsNpmBuilder:CopyNpmrcAndLockfile
 Running NodejsNpmBuilder:CopySource
 Running NodejsNpmBuilder:NpmInstall
 Running NodejsNpmBuilder:NpmTest
 Running NodejsNpmBuilder:CleanUpNpmrc
 Running NodejsNpmBuilder:LockfileCleanUp
Building codeuri: C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data\lambdas\replica-p2m-mcc runtime: nodejs24.x architecture: x86_64 functions: ReplicaP2mMccLambda
 Running NodejsNpmBuilder:NpmPack
 Running NodejsNpmBuilder:CopyNpmrcAndLockfile
 Running NodejsNpmBuilder:CopySource
 Running NodejsNpmBuilder:NpmInstall
 Running NodejsNpmBuilder:NpmTest
 Running NodejsNpmBuilder:CleanUpNpmrc
 Running NodejsNpmBuilder:LockfileCleanUp
Building codeuri: C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data\lambdas\ach-reintento runtime: nodejs24.x architecture: x86_64 functions: AchReintentoLambda
 Running NodejsNpmBuilder:NpmPack
 Running NodejsNpmBuilder:CopyNpmrcAndLockfile
 Running NodejsNpmBuilder:CopySource
 Running NodejsNpmBuilder:NpmInstall
 Running NodejsNpmBuilder:NpmTest
 Running NodejsNpmBuilder:CleanUpNpmrc
 Running NodejsNpmBuilder:LockfileCleanUp

Build Succeeded

Built Artifacts  : .aws-sam\build
Built Template   : .aws-sam\build\template.yaml

Commands you can use next
=========================
[*] Validate SAM template: sam validate
[*] Invoke Function: sam local invoke
[*] Test Function in the Cloud: sam sync --stack-name {{stack-name}} --watch
[*] Deploy: sam deploy --guided
[2026-07-08 18:15:30] [SUCCESS] BUILD OK
[INFO] Workspace temporal SAM: C:\sam-temp\tld-onpremise-data-20260708-181530-10352
[SUCCESS] Template deploy-ready generado: C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data\.aws-sam\build\template.deploy-ready.yaml
[2026-07-08 18:15:33] [STEP] DEPLOY - inicio entorno 'sandbox'
        Uploading to tld-onpremise-data/sandbox/20260708-181533/1/6e92550b5a15bdfe387a2e28b7830172  3854903 / 3854903  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-181533/1/7fa86737c90efa340db36c2fc5dd19f8  5027 / 5027  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-181533/1/727c3342b024fa4f463933802bedfc26  5654 / 5654  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-181533/1/57a6496a911fc74f6f350e19d856ed5c  5628 / 5628  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-181533/1/12105970f43cd1f751bb2c06873c07f5  6718 / 6718  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-181533/1/fd3e7c519c2b6e2bb7ebd09df5d9f00d  5705 / 5705  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-181533/1/34ea56c77c4a89060f1405d1f7b9f143  5731 / 5731  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-181533/1/3d695146f02ea9bfe24da265828a136e  4799 / 4799  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-181533/1/70958bcd7eb5feb543d66fe1ff08beae  4808 / 4808  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-181533/1/8cea6b48f3f88f102fa0735945ccee2e  4788 / 4788  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-181533/1/54bd41efb0fa1910fd56f11f547fa91b  6796 / 6796  (100.00%)

        Deploying with following values
        ===============================
        Stack name                   : tld-alias-replica
        Region                       : us-east-1
        Confirm changeset            : False
        Disable rollback             : False
        Deployment s3 bucket         : aws-sam-cli-managed-default-sandbox-virginia
        Capabilities                 : ["CAPABILITY_IAM"]
        Parameter overrides          : {"DeployEnvironment": "sandbox", "VPCe": "vpce-00ef36bfb2706e3b7", "SecurityGroup": "sg-0e9af23b6645d84df", "Subnet1": "subnet-0baba120b23a710cc", "Subnet2": "subnet-073da6f0db6885407", "Subnet3": "subnet-052421100e0a15e95", "LayerMphOrcl": "arn:aws:lambda:us-east-1:807262913923:layer:tld-orcl-lib:1", "DynamoDBStreamIDAliasCuenta": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-alias-cuenta/stream/2023-01-19T00:22:38.070", "DynamoDBStreamIDBitacora": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-validador-bitacora/stream/2022-08-23T23:38:57.929", "DynamoDBStreamIDCanal": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-validador-canal/stream/2022-08-23T23:38:57.839", "DynamoDBStreamIDP2m": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m/stream/REEMPLAZAR", "DynamoDBStreamIDP2mCuenta": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m-cuenta/stream/REEMPLAZAR", "DynamoDBStreamIDP2mMcc": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m-mcc/stream/REEMPLAZAR"}
        Signing Profiles             : {}

Initiating deployment
=====================

        Uploading to tld-onpremise-data/sandbox/20260708-181533/1/cedf10048dc10d27d5d11b4854b51e2b.template  22684 / 22684  (100.00%)


Waiting for changeset to be created..

CloudFormation stack changeset
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Operation                                                  LogicalResourceId                                          ResourceType                                               Replacement
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
+ Add                                                      AchReintentoLambdaRole                                     AWS::IAM::Role                                             N/A
+ Add                                                      AchReintentoLambda                                         AWS::Lambda::Function                                      N/A
+ Add                                                      AchReintentoLogGroup                                       AWS::Logs::LogGroup                                        N/A
+ Add                                                      BitacoraAchLogGroup                                        AWS::Logs::LogGroup                                        N/A
+ Add                                                      CanalAchLogGroup                                           AWS::Logs::LogGroup                                        N/A
+ Add                                                      OnPremiseLayer4adf593f17                                   AWS::Lambda::LayerVersion                                  N/A
+ Add                                                      P2mCuentaLogGroup                                          AWS::Logs::LogGroup                                        N/A
+ Add                                                      P2mLogGroup                                                AWS::Logs::LogGroup                                        N/A
+ Add                                                      P2mMccLogGroup                                             AWS::Logs::LogGroup                                        N/A
+ Add                                                      ReplicaBitacoraAchLambdaRole                               AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaBitacoraAchLambdaStream                             AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaBitacoraAchLambda                                   AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaCanalAchLambdaRole                                  AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaCanalAchLambdaStream                                AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaCanalAchLambda                                      AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaP2mCuentaLambdaRole                                 AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaP2mCuentaLambdaStream                               AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaP2mCuentaLambda                                     AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaP2mLambdaRole                                       AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaP2mLambdaStream                                     AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaP2mLambda                                           AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaP2mMccLambdaRole                                    AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaP2mMccLambdaStream                                  AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaP2mMccLambda                                        AWS::Lambda::Function                                      N/A
+ Add                                                      SecretAchReplica                                           AWS::SecretsManager::Secret                                N/A
+ Add                                                      TablaAchReplicacion                                        AWS::DynamoDB::Table                                       N/A
* Modify                                                   AliasReplicaReintentoLambda                                AWS::Lambda::Function                                      False
* Modify                                                   ReplicaAliasCuentaLambda                                   AWS::Lambda::Function                                      False
* Modify                                                   ReplicaBitacoraLambda                                      AWS::Lambda::Function                                      False
* Modify                                                   ReplicaCanalLambda                                         AWS::Lambda::Function                                      False
* Modify                                                   TablaAliasReplicacion                                      AWS::DynamoDB::Table                                       False
- Delete                                                   OnPremiseLayer43f48937dc                                   AWS::Lambda::LayerVersion                                  N/A
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Changeset created successfully. arn:aws:cloudformation:us-east-1:807262913923:changeSet/samcli-deploy1783552554/69667e50-7c28-4179-9123-a40f2e7a6825


2026-07-08 18:16:15 - Waiting for stack create/update to complete

CloudFormation events from stack operations (refresh every 5.0 seconds)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ResourceStatus                                             ResourceType                                               LogicalResourceId                                          ResourceStatusReason
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
UPDATE_IN_PROGRESS                                         AWS::CloudFormation::Stack                                 tld-alias-replica                                          User Initiated
CREATE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::LayerVersion                                  OnPremiseLayer4adf593f17                                   -
CREATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
UPDATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      -
CREATE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAchReplicacion                                        Resource creation Initiated
CREATE_COMPLETE                                            AWS::SecretsManager::Secret                                SecretAchReplica                                           -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
CREATE_IN_PROGRESS                                         AWS::Lambda::LayerVersion                                  OnPremiseLayer4adf593f17                                   Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::LayerVersion                                  OnPremiseLayer4adf593f17                                   -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
CREATE_COMPLETE                                            AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::Function                                      AchReintentoLambda                                         -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mMccLogGroup                                             -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mMccLogGroup                                             Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          Resource creation Initiated
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  Resource handler returned message: "Invalid request
                                                                                                                                                                                 provided: Stream not found: arn:aws:dynamodb:us-
                                                                                                                                                                                 east-1:807262913923:table/tld-p2m-mcc/stream/REEMPLAZAR
                                                                                                                                                                                 (Service: Lambda, Status Code: 400, Request ID:
                                                                                                                                                                                 76ac06d2-f2ae-4dc8-93d3-fe3c77ca1d1e) (SDK Attempt
                                                                                                                                                                                 Count: 1)" (RequestToken:
                                                                                                                                                                                 0c8ff39f-b98f-ffd3-0c06-d096214ad920, HandlerErrorCode:
                                                                                                                                                                                 InvalidRequest)
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     Resource handler returned message: "Invalid request
                                                                                                                                                                                 provided: Stream not found: arn:aws:dynamodb:us-
                                                                                                                                                                                 east-1:807262913923:table/tld-p2m/stream/REEMPLAZAR
                                                                                                                                                                                 (Service: Lambda, Status Code: 400, Request ID:
                                                                                                                                                                                 c6686edb-fed1-4b88-a518-9f6742918898) (SDK Attempt
                                                                                                                                                                                 Count: 1)" (RequestToken:
                                                                                                                                                                                 431996cb-12d8-1aca-6153-25b891704bf3, HandlerErrorCode:
                                                                                                                                                                                 InvalidRequest)
CREATE_FAILED                                              AWS::Logs::LogGroup                                        CanalAchLogGroup                                           Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        P2mMccLogGroup                                             Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        P2mLogGroup                                                Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          Resource creation cancelled
UPDATE_FAILED                                              AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      Resource update cancelled
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             Resource creation cancelled
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               Resource handler returned message: "Invalid request
                                                                                                                                                                                 provided: Stream not found: arn:aws:dynamodb:us-east-
                                                                                                                                                                                 1:807262913923:table/tld-p2m-cuenta/stream/REEMPLAZAR
                                                                                                                                                                                 (Service: Lambda, Status Code: 400, Request ID:
                                                                                                                                                                                 6cee0b6f-6d61-4d45-988e-32a591c9ba2a) (SDK Attempt
                                                                                                                                                                                 Count: 1)" (RequestToken:
                                                                                                                                                                                 427405d6-677c-1716-1b6f-92fe47b631c1, HandlerErrorCode:
                                                                                                                                                                                 InvalidRequest)
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                Resource creation cancelled
CREATE_FAILED                                              AWS::DynamoDB::Table                                       TablaAchReplicacion                                        Resource creation cancelled
UPDATE_ROLLBACK_IN_PROGRESS                                AWS::CloudFormation::Stack                                 tld-alias-replica                                          The following resource(s) failed to create:
                                                                                                                                                                                 [TablaAchReplicacion, ReplicaBitacoraAchLambdaStream,
                                                                                                                                                                                 P2mLogGroup, P2mMccLogGroup, ReplicaP2mLambdaStream,
                                                                                                                                                                                 P2mCuentaLogGroup, BitacoraAchLogGroup,
                                                                                                                                                                                 CanalAchLogGroup, AchReintentoLogGroup,
                                                                                                                                                                                 ReplicaP2mCuentaLambdaStream,
                                                                                                                                                                                 ReplicaCanalAchLambdaStream, ReplicaP2mMccLambdaStream].
                                                                                                                                                                                 The following resource(s) failed to update:
                                                                                                                                                                                 [TablaAliasReplicacion].
UPDATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
UPDATE_COMPLETE                                            AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      -
UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS               AWS::CloudFormation::Stack                                 tld-alias-replica                                          -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        -
DELETE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
DELETE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
DELETE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mMccLogGroup                                             -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mLogGroup                                                -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mMccLogGroup                                             -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      AchReintentoLambda                                         -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
DELETE_COMPLETE                                            AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
DELETE_COMPLETE                                            AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
DELETE_SKIPPED                                             AWS::Lambda::LayerVersion                                  OnPremiseLayer4adf593f17                                   -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
DELETE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           -
DELETE_COMPLETE                                            AWS::SecretsManager::Secret                                SecretAchReplica                                           -
UPDATE_ROLLBACK_COMPLETE                                   AWS::CloudFormation::Stack                                 tld-alias-replica                                          -
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Error: Failed to create/update the stack: tld-alias-replica, Waiter StackUpdateComplete failed: Waiter encountered a terminal failure state: For expression "Stacks[].StackStatus" we matched expected path: "UPDATE_ROLLBACK_COMPLETE" at least once
[WARN] Reintento deploy 2/4 para entorno sandbox. Espera 6s.
[INFO] Workspace temporal SAM: C:\sam-temp\tld-onpremise-data-20260708-182103-10352
        Uploading to tld-onpremise-data/sandbox/20260708-182103/2/6e92550b5a15bdfe387a2e28b7830172  3854903 / 3854903  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182103/2/7fa86737c90efa340db36c2fc5dd19f8  5027 / 5027  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182103/2/727c3342b024fa4f463933802bedfc26  5654 / 5654  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182103/2/57a6496a911fc74f6f350e19d856ed5c  5628 / 5628  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182103/2/12105970f43cd1f751bb2c06873c07f5  6718 / 6718  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182103/2/fd3e7c519c2b6e2bb7ebd09df5d9f00d  5705 / 5705  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182103/2/34ea56c77c4a89060f1405d1f7b9f143  5731 / 5731  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182103/2/3d695146f02ea9bfe24da265828a136e  4799 / 4799  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182103/2/70958bcd7eb5feb543d66fe1ff08beae  4808 / 4808  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182103/2/8cea6b48f3f88f102fa0735945ccee2e  4788 / 4788  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182103/2/54bd41efb0fa1910fd56f11f547fa91b  6796 / 6796  (100.00%)

        Deploying with following values
        ===============================
        Stack name                   : tld-alias-replica
        Region                       : us-east-1
        Confirm changeset            : False
        Disable rollback             : False
        Deployment s3 bucket         : aws-sam-cli-managed-default-sandbox-virginia
        Capabilities                 : ["CAPABILITY_IAM"]
        Parameter overrides          : {"DeployEnvironment": "sandbox", "VPCe": "vpce-00ef36bfb2706e3b7", "SecurityGroup": "sg-0e9af23b6645d84df", "Subnet1": "subnet-0baba120b23a710cc", "Subnet2": "subnet-073da6f0db6885407", "Subnet3": "subnet-052421100e0a15e95", "LayerMphOrcl": "arn:aws:lambda:us-east-1:807262913923:layer:tld-orcl-lib:1", "DynamoDBStreamIDAliasCuenta": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-alias-cuenta/stream/2023-01-19T00:22:38.070", "DynamoDBStreamIDBitacora": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-validador-bitacora/stream/2022-08-23T23:38:57.929", "DynamoDBStreamIDCanal": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-validador-canal/stream/2022-08-23T23:38:57.839", "DynamoDBStreamIDP2m": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m/stream/REEMPLAZAR", "DynamoDBStreamIDP2mCuenta": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m-cuenta/stream/REEMPLAZAR", "DynamoDBStreamIDP2mMcc": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m-mcc/stream/REEMPLAZAR"}
        Signing Profiles             : {}

Initiating deployment
=====================

        Uploading to tld-onpremise-data/sandbox/20260708-182103/2/5e349ad543a984cd6a66c7f0ffd76f7e.template  22684 / 22684  (100.00%)


Waiting for changeset to be created..

CloudFormation stack changeset
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Operation                                                  LogicalResourceId                                          ResourceType                                               Replacement
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
+ Add                                                      AchReintentoLambdaRole                                     AWS::IAM::Role                                             N/A
+ Add                                                      AchReintentoLambda                                         AWS::Lambda::Function                                      N/A
+ Add                                                      AchReintentoLogGroup                                       AWS::Logs::LogGroup                                        N/A
+ Add                                                      BitacoraAchLogGroup                                        AWS::Logs::LogGroup                                        N/A
+ Add                                                      CanalAchLogGroup                                           AWS::Logs::LogGroup                                        N/A
+ Add                                                      OnPremiseLayer40887c1d16                                   AWS::Lambda::LayerVersion                                  N/A
+ Add                                                      P2mCuentaLogGroup                                          AWS::Logs::LogGroup                                        N/A
+ Add                                                      P2mLogGroup                                                AWS::Logs::LogGroup                                        N/A
+ Add                                                      P2mMccLogGroup                                             AWS::Logs::LogGroup                                        N/A
+ Add                                                      ReplicaBitacoraAchLambdaRole                               AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaBitacoraAchLambdaStream                             AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaBitacoraAchLambda                                   AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaCanalAchLambdaRole                                  AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaCanalAchLambdaStream                                AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaCanalAchLambda                                      AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaP2mCuentaLambdaRole                                 AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaP2mCuentaLambdaStream                               AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaP2mCuentaLambda                                     AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaP2mLambdaRole                                       AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaP2mLambdaStream                                     AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaP2mLambda                                           AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaP2mMccLambdaRole                                    AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaP2mMccLambdaStream                                  AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaP2mMccLambda                                        AWS::Lambda::Function                                      N/A
+ Add                                                      SecretAchReplica                                           AWS::SecretsManager::Secret                                N/A
+ Add                                                      TablaAchReplicacion                                        AWS::DynamoDB::Table                                       N/A
* Modify                                                   AliasReplicaReintentoLambda                                AWS::Lambda::Function                                      False
* Modify                                                   ReplicaAliasCuentaLambda                                   AWS::Lambda::Function                                      False
* Modify                                                   ReplicaBitacoraLambda                                      AWS::Lambda::Function                                      False
* Modify                                                   ReplicaCanalLambda                                         AWS::Lambda::Function                                      False
* Modify                                                   TablaAliasReplicacion                                      AWS::DynamoDB::Table                                       False
- Delete                                                   OnPremiseLayer43f48937dc                                   AWS::Lambda::LayerVersion                                  N/A
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Changeset created successfully. arn:aws:cloudformation:us-east-1:807262913923:changeSet/samcli-deploy1783552884/83cf556a-3d1b-4d54-9209-2a9b6d6efe2b


2026-07-08 18:21:40 - Waiting for stack create/update to complete

CloudFormation events from stack operations (refresh every 5.0 seconds)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ResourceStatus                                             ResourceType                                               LogicalResourceId                                          ResourceStatusReason
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
UPDATE_IN_PROGRESS                                         AWS::CloudFormation::Stack                                 tld-alias-replica                                          User Initiated
CREATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
CREATE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::LayerVersion                                  OnPremiseLayer40887c1d16                                   -
UPDATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      -
CREATE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAchReplicacion                                        Resource creation Initiated
CREATE_COMPLETE                                            AWS::SecretsManager::Secret                                SecretAchReplica                                           -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::LayerVersion                                  OnPremiseLayer40887c1d16                                   Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::LayerVersion                                  OnPremiseLayer40887c1d16                                   -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
CREATE_COMPLETE                                            AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     Resource creation Initiated
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   Resource creation Initiated
CREATE_COMPLETE                                            AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mMccLogGroup                                             -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      AchReintentoLambda                                         -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mMccLogGroup                                             Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  Resource handler returned message: "Invalid request
                                                                                                                                                                                 provided: Stream not found: arn:aws:dynamodb:us-
                                                                                                                                                                                 east-1:807262913923:table/tld-p2m-mcc/stream/REEMPLAZAR
                                                                                                                                                                                 (Service: Lambda, Status Code: 400, Request ID:
                                                                                                                                                                                 b7650759-ab8e-4e98-8f09-61294a0f9cce) (SDK Attempt
                                                                                                                                                                                 Count: 1)" (RequestToken:
                                                                                                                                                                                 c4565960-a7aa-7ad0-004c-cf8a4f222ed5, HandlerErrorCode:
                                                                                                                                                                                 InvalidRequest)
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     Resource handler returned message: "Invalid request
                                                                                                                                                                                 provided: Stream not found: arn:aws:dynamodb:us-
                                                                                                                                                                                 east-1:807262913923:table/tld-p2m/stream/REEMPLAZAR
                                                                                                                                                                                 (Service: Lambda, Status Code: 400, Request ID:
                                                                                                                                                                                 948b1e54-1946-4e75-8c5b-ba7ee6641cc0) (SDK Attempt
                                                                                                                                                                                 Count: 1)" (RequestToken: 7bd838ac-
                                                                                                                                                                                 df5c-1909-11df-660335312d70, HandlerErrorCode:
                                                                                                                                                                                 InvalidRequest)
CREATE_FAILED                                              AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        P2mLogGroup                                                Resource creation cancelled
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               Resource creation cancelled
UPDATE_FAILED                                              AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      Resource update cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        CanalAchLogGroup                                           Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        P2mMccLogGroup                                             Resource creation cancelled
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                Resource creation cancelled
UPDATE_ROLLBACK_IN_PROGRESS                                AWS::CloudFormation::Stack                                 tld-alias-replica                                          The following resource(s) failed to create:
                                                                                                                                                                                 [P2mLogGroup, P2mMccLogGroup, ReplicaP2mLambdaStream,
                                                                                                                                                                                 P2mCuentaLogGroup, CanalAchLogGroup,
                                                                                                                                                                                 AchReintentoLogGroup, ReplicaP2mCuentaLambdaStream,
                                                                                                                                                                                 ReplicaCanalAchLambdaStream, ReplicaP2mMccLambdaStream].
                                                                                                                                                                                 The following resource(s) failed to update:
                                                                                                                                                                                 [TablaAliasReplicacion].
UPDATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
UPDATE_COMPLETE                                            AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      -
UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS               AWS::CloudFormation::Stack                                 tld-alias-replica                                          -
DELETE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mMccLogGroup                                             -
DELETE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mLogGroup                                                -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mMccLogGroup                                             -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      AchReintentoLambda                                         -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
DELETE_COMPLETE                                            AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
DELETE_COMPLETE                                            AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
DELETE_SKIPPED                                             AWS::Lambda::LayerVersion                                  OnPremiseLayer40887c1d16                                   -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
DELETE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           -
DELETE_COMPLETE                                            AWS::SecretsManager::Secret                                SecretAchReplica                                           -
UPDATE_ROLLBACK_COMPLETE                                   AWS::CloudFormation::Stack                                 tld-alias-replica                                          -
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Error: Failed to create/update the stack: tld-alias-replica, Waiter StackUpdateComplete failed: Waiter encountered a terminal failure state: For expression "Stacks[].StackStatus" we matched expected path: "UPDATE_ROLLBACK_COMPLETE" at least once
[WARN] Reintento deploy 3/4 para entorno sandbox. Espera 9s.
[INFO] Workspace temporal SAM: C:\sam-temp\tld-onpremise-data-20260708-182638-10352
        Uploading to tld-onpremise-data/sandbox/20260708-182639/3/6e92550b5a15bdfe387a2e28b7830172  3854903 / 3854903  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182639/3/7fa86737c90efa340db36c2fc5dd19f8  5027 / 5027  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182639/3/727c3342b024fa4f463933802bedfc26  5654 / 5654  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182639/3/57a6496a911fc74f6f350e19d856ed5c  5628 / 5628  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182639/3/12105970f43cd1f751bb2c06873c07f5  6718 / 6718  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182639/3/fd3e7c519c2b6e2bb7ebd09df5d9f00d  5705 / 5705  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182639/3/34ea56c77c4a89060f1405d1f7b9f143  5731 / 5731  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182639/3/3d695146f02ea9bfe24da265828a136e  4799 / 4799  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182639/3/70958bcd7eb5feb543d66fe1ff08beae  4808 / 4808  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182639/3/8cea6b48f3f88f102fa0735945ccee2e  4788 / 4788  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-182639/3/54bd41efb0fa1910fd56f11f547fa91b  6796 / 6796  (100.00%)

        Deploying with following values
        ===============================
        Stack name                   : tld-alias-replica
        Region                       : us-east-1
        Confirm changeset            : False
        Disable rollback             : False
        Deployment s3 bucket         : aws-sam-cli-managed-default-sandbox-virginia
        Capabilities                 : ["CAPABILITY_IAM"]
        Parameter overrides          : {"DeployEnvironment": "sandbox", "VPCe": "vpce-00ef36bfb2706e3b7", "SecurityGroup": "sg-0e9af23b6645d84df", "Subnet1": "subnet-0baba120b23a710cc", "Subnet2": "subnet-073da6f0db6885407", "Subnet3": "subnet-052421100e0a15e95", "LayerMphOrcl": "arn:aws:lambda:us-east-1:807262913923:layer:tld-orcl-lib:1", "DynamoDBStreamIDAliasCuenta": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-alias-cuenta/stream/2023-01-19T00:22:38.070", "DynamoDBStreamIDBitacora": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-validador-bitacora/stream/2022-08-23T23:38:57.929", "DynamoDBStreamIDCanal": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-validador-canal/stream/2022-08-23T23:38:57.839", "DynamoDBStreamIDP2m": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m/stream/REEMPLAZAR", "DynamoDBStreamIDP2mCuenta": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m-cuenta/stream/REEMPLAZAR", "DynamoDBStreamIDP2mMcc": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m-mcc/stream/REEMPLAZAR"}
        Signing Profiles             : {}

Initiating deployment
=====================

        Uploading to tld-onpremise-data/sandbox/20260708-182639/3/7c941852175104aaa43ff23da1ed92fe.template  22684 / 22684  (100.00%)


Waiting for changeset to be created..

CloudFormation stack changeset
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Operation                                                  LogicalResourceId                                          ResourceType                                               Replacement
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
+ Add                                                      AchReintentoLambdaRole                                     AWS::IAM::Role                                             N/A
+ Add                                                      AchReintentoLambda                                         AWS::Lambda::Function                                      N/A
+ Add                                                      AchReintentoLogGroup                                       AWS::Logs::LogGroup                                        N/A
+ Add                                                      BitacoraAchLogGroup                                        AWS::Logs::LogGroup                                        N/A
+ Add                                                      CanalAchLogGroup                                           AWS::Logs::LogGroup                                        N/A
+ Add                                                      OnPremiseLayer54dedb9d34                                   AWS::Lambda::LayerVersion                                  N/A
+ Add                                                      P2mCuentaLogGroup                                          AWS::Logs::LogGroup                                        N/A
+ Add                                                      P2mLogGroup                                                AWS::Logs::LogGroup                                        N/A
+ Add                                                      P2mMccLogGroup                                             AWS::Logs::LogGroup                                        N/A
+ Add                                                      ReplicaBitacoraAchLambdaRole                               AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaBitacoraAchLambdaStream                             AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaBitacoraAchLambda                                   AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaCanalAchLambdaRole                                  AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaCanalAchLambdaStream                                AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaCanalAchLambda                                      AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaP2mCuentaLambdaRole                                 AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaP2mCuentaLambdaStream                               AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaP2mCuentaLambda                                     AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaP2mLambdaRole                                       AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaP2mLambdaStream                                     AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaP2mLambda                                           AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaP2mMccLambdaRole                                    AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaP2mMccLambdaStream                                  AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaP2mMccLambda                                        AWS::Lambda::Function                                      N/A
+ Add                                                      SecretAchReplica                                           AWS::SecretsManager::Secret                                N/A
+ Add                                                      TablaAchReplicacion                                        AWS::DynamoDB::Table                                       N/A
* Modify                                                   AliasReplicaReintentoLambda                                AWS::Lambda::Function                                      False
* Modify                                                   ReplicaAliasCuentaLambda                                   AWS::Lambda::Function                                      False
* Modify                                                   ReplicaBitacoraLambda                                      AWS::Lambda::Function                                      False
* Modify                                                   ReplicaCanalLambda                                         AWS::Lambda::Function                                      False
* Modify                                                   TablaAliasReplicacion                                      AWS::DynamoDB::Table                                       False
- Delete                                                   OnPremiseLayer43f48937dc                                   AWS::Lambda::LayerVersion                                  N/A
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Changeset created successfully. arn:aws:cloudformation:us-east-1:807262913923:changeSet/samcli-deploy1783553220/038881a5-ccbf-46d0-8332-e8710a1488ac


2026-07-08 18:27:16 - Waiting for stack create/update to complete

CloudFormation events from stack operations (refresh every 5.0 seconds)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ResourceStatus                                             ResourceType                                               LogicalResourceId                                          ResourceStatusReason
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
UPDATE_IN_PROGRESS                                         AWS::CloudFormation::Stack                                 tld-alias-replica                                          User Initiated
CREATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
CREATE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::LayerVersion                                  OnPremiseLayer54dedb9d34                                   -
UPDATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      -
CREATE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAchReplicacion                                        Resource creation Initiated
CREATE_COMPLETE                                            AWS::SecretsManager::Secret                                SecretAchReplica                                           -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
CREATE_IN_PROGRESS                                         AWS::Lambda::LayerVersion                                  OnPremiseLayer54dedb9d34                                   Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::LayerVersion                                  OnPremiseLayer54dedb9d34                                   -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    Resource creation Initiated
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
CREATE_COMPLETE                                            AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   Resource creation Initiated
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        Resource creation Initiated
CREATE_COMPLETE                                            AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      AchReintentoLambda                                         -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          Resource creation Initiated
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     Resource handler returned message: "Invalid request
                                                                                                                                                                                 provided: Stream not found: arn:aws:dynamodb:us-
                                                                                                                                                                                 east-1:807262913923:table/tld-p2m/stream/REEMPLAZAR
                                                                                                                                                                                 (Service: Lambda, Status Code: 400, Request ID:
                                                                                                                                                                                 4053d711-6b6c-4465-81f1-897e8324a178) (SDK Attempt
                                                                                                                                                                                 Count: 1)" (RequestToken:
                                                                                                                                                                                 3a678fc5-5b5e-796b-e51a-e9e508327adb, HandlerErrorCode:
                                                                                                                                                                                 InvalidRequest)
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             Resource creation Initiated
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               Resource handler returned message: "Invalid request
                                                                                                                                                                                 provided: Stream not found: arn:aws:dynamodb:us-east-
                                                                                                                                                                                 1:807262913923:table/tld-p2m-cuenta/stream/REEMPLAZAR
                                                                                                                                                                                 (Service: Lambda, Status Code: 400, Request ID:
                                                                                                                                                                                 6504869e-4bee-4700-bf94-24dc569cbb0a) (SDK Attempt
                                                                                                                                                                                 Count: 1)" (RequestToken:
                                                                                                                                                                                 a842a43c-e6e2-fee9-fd98-36b9b3f0cf83, HandlerErrorCode:
                                                                                                                                                                                 InvalidRequest)
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
CREATE_FAILED                                              AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       Resource creation cancelled
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             Resource creation cancelled
UPDATE_FAILED                                              AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      Resource update cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        CanalAchLogGroup                                           Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        P2mLogGroup                                                Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        Resource creation cancelled
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                Resource creation cancelled
UPDATE_ROLLBACK_IN_PROGRESS                                AWS::CloudFormation::Stack                                 tld-alias-replica                                          The following resource(s) failed to create:
                                                                                                                                                                                 [ReplicaBitacoraAchLambdaStream, P2mLogGroup,
                                                                                                                                                                                 ReplicaP2mLambdaStream, P2mCuentaLogGroup,
                                                                                                                                                                                 BitacoraAchLogGroup, CanalAchLogGroup,
                                                                                                                                                                                 AchReintentoLogGroup, ReplicaP2mCuentaLambdaStream,
                                                                                                                                                                                 ReplicaCanalAchLambdaStream]. The following resource(s)
                                                                                                                                                                                 failed to update: [TablaAliasReplicacion].
UPDATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
UPDATE_COMPLETE                                            AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      -
UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS               AWS::CloudFormation::Stack                                 tld-alias-replica                                          -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
DELETE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             -
DELETE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
DELETE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mLogGroup                                                -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      AchReintentoLambda                                         -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
DELETE_COMPLETE                                            AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
DELETE_COMPLETE                                            AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
DELETE_SKIPPED                                             AWS::Lambda::LayerVersion                                  OnPremiseLayer54dedb9d34                                   -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
DELETE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           -
DELETE_COMPLETE                                            AWS::SecretsManager::Secret                                SecretAchReplica                                           -
UPDATE_ROLLBACK_COMPLETE                                   AWS::CloudFormation::Stack                                 tld-alias-replica                                          -
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Error: Failed to create/update the stack: tld-alias-replica, Waiter StackUpdateComplete failed: Waiter encountered a terminal failure state: For expression "Stacks[].StackStatus" we matched expected path: "UPDATE_ROLLBACK_COMPLETE" at least once
[WARN] Reintento deploy 4/4 para entorno sandbox. Espera 12s.
[INFO] Workspace temporal SAM: C:\sam-temp\tld-onpremise-data-20260708-183232-10352
        Uploading to tld-onpremise-data/sandbox/20260708-183232/4/6e92550b5a15bdfe387a2e28b7830172  3854903 / 3854903  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-183232/4/7fa86737c90efa340db36c2fc5dd19f8  5027 / 5027  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-183232/4/727c3342b024fa4f463933802bedfc26  5654 / 5654  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-183232/4/57a6496a911fc74f6f350e19d856ed5c  5628 / 5628  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-183232/4/12105970f43cd1f751bb2c06873c07f5  6718 / 6718  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-183232/4/fd3e7c519c2b6e2bb7ebd09df5d9f00d  5705 / 5705  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-183232/4/34ea56c77c4a89060f1405d1f7b9f143  5731 / 5731  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-183232/4/3d695146f02ea9bfe24da265828a136e  4799 / 4799  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-183232/4/70958bcd7eb5feb543d66fe1ff08beae  4808 / 4808  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-183232/4/8cea6b48f3f88f102fa0735945ccee2e  4788 / 4788  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260708-183232/4/54bd41efb0fa1910fd56f11f547fa91b  6796 / 6796  (100.00%)

        Deploying with following values
        ===============================
        Stack name                   : tld-alias-replica
        Region                       : us-east-1
        Confirm changeset            : False
        Disable rollback             : False
        Deployment s3 bucket         : aws-sam-cli-managed-default-sandbox-virginia
        Capabilities                 : ["CAPABILITY_IAM"]
        Parameter overrides          : {"DeployEnvironment": "sandbox", "VPCe": "vpce-00ef36bfb2706e3b7", "SecurityGroup": "sg-0e9af23b6645d84df", "Subnet1": "subnet-0baba120b23a710cc", "Subnet2": "subnet-073da6f0db6885407", "Subnet3": "subnet-052421100e0a15e95", "LayerMphOrcl": "arn:aws:lambda:us-east-1:807262913923:layer:tld-orcl-lib:1", "DynamoDBStreamIDAliasCuenta": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-alias-cuenta/stream/2023-01-19T00:22:38.070", "DynamoDBStreamIDBitacora": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-validador-bitacora/stream/2022-08-23T23:38:57.929", "DynamoDBStreamIDCanal": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-validador-canal/stream/2022-08-23T23:38:57.839", "DynamoDBStreamIDP2m": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m/stream/REEMPLAZAR", "DynamoDBStreamIDP2mCuenta": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m-cuenta/stream/REEMPLAZAR", "DynamoDBStreamIDP2mMcc": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m-mcc/stream/REEMPLAZAR"}
        Signing Profiles             : {}

Initiating deployment
=====================

        Uploading to tld-onpremise-data/sandbox/20260708-183232/4/8a42259646d9e84ba13ee9ff08c721a5.template  22684 / 22684  (100.00%)


Waiting for changeset to be created..

CloudFormation stack changeset
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Operation                                                  LogicalResourceId                                          ResourceType                                               Replacement
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
+ Add                                                      AchReintentoLambdaRole                                     AWS::IAM::Role                                             N/A
+ Add                                                      AchReintentoLambda                                         AWS::Lambda::Function                                      N/A
+ Add                                                      AchReintentoLogGroup                                       AWS::Logs::LogGroup                                        N/A
+ Add                                                      BitacoraAchLogGroup                                        AWS::Logs::LogGroup                                        N/A
+ Add                                                      CanalAchLogGroup                                           AWS::Logs::LogGroup                                        N/A
+ Add                                                      OnPremiseLayer4722db19ea                                   AWS::Lambda::LayerVersion                                  N/A
+ Add                                                      P2mCuentaLogGroup                                          AWS::Logs::LogGroup                                        N/A
+ Add                                                      P2mLogGroup                                                AWS::Logs::LogGroup                                        N/A
+ Add                                                      P2mMccLogGroup                                             AWS::Logs::LogGroup                                        N/A
+ Add                                                      ReplicaBitacoraAchLambdaRole                               AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaBitacoraAchLambdaStream                             AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaBitacoraAchLambda                                   AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaCanalAchLambdaRole                                  AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaCanalAchLambdaStream                                AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaCanalAchLambda                                      AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaP2mCuentaLambdaRole                                 AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaP2mCuentaLambdaStream                               AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaP2mCuentaLambda                                     AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaP2mLambdaRole                                       AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaP2mLambdaStream                                     AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaP2mLambda                                           AWS::Lambda::Function                                      N/A
+ Add                                                      ReplicaP2mMccLambdaRole                                    AWS::IAM::Role                                             N/A
+ Add                                                      ReplicaP2mMccLambdaStream                                  AWS::Lambda::EventSourceMapping                            N/A
+ Add                                                      ReplicaP2mMccLambda                                        AWS::Lambda::Function                                      N/A
+ Add                                                      SecretAchReplica                                           AWS::SecretsManager::Secret                                N/A
+ Add                                                      TablaAchReplicacion                                        AWS::DynamoDB::Table                                       N/A
* Modify                                                   AliasReplicaReintentoLambda                                AWS::Lambda::Function                                      False
* Modify                                                   ReplicaAliasCuentaLambda                                   AWS::Lambda::Function                                      False
* Modify                                                   ReplicaBitacoraLambda                                      AWS::Lambda::Function                                      False
* Modify                                                   ReplicaCanalLambda                                         AWS::Lambda::Function                                      False
* Modify                                                   TablaAliasReplicacion                                      AWS::DynamoDB::Table                                       False
- Delete                                                   OnPremiseLayer43f48937dc                                   AWS::Lambda::LayerVersion                                  N/A
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Changeset created successfully. arn:aws:cloudformation:us-east-1:807262913923:changeSet/samcli-deploy1783553573/fb3217eb-23b4-498b-97f0-79234c0e97c0


2026-07-08 18:33:09 - Waiting for stack create/update to complete

CloudFormation events from stack operations (refresh every 5.0 seconds)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ResourceStatus                                             ResourceType                                               LogicalResourceId                                          ResourceStatusReason
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
UPDATE_IN_PROGRESS                                         AWS::CloudFormation::Stack                                 tld-alias-replica                                          User Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::LayerVersion                                  OnPremiseLayer4722db19ea                                   -
CREATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
CREATE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           -
UPDATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      -
CREATE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAchReplicacion                                        Resource creation Initiated
CREATE_COMPLETE                                            AWS::SecretsManager::Secret                                SecretAchReplica                                           -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::LayerVersion                                  OnPremiseLayer4722db19ea                                   Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::LayerVersion                                  OnPremiseLayer4722db19ea                                   -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
CREATE_COMPLETE                                            AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     Resource creation Initiated
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      AchReintentoLambda                                         -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mMccLogGroup                                             -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mMccLogGroup                                             Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       Resource creation Initiated
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  Resource handler returned message: "Invalid request
                                                                                                                                                                                 provided: Stream not found: arn:aws:dynamodb:us-
                                                                                                                                                                                 east-1:807262913923:table/tld-p2m-mcc/stream/REEMPLAZAR
                                                                                                                                                                                 (Service: Lambda, Status Code: 400, Request ID:
                                                                                                                                                                                 f0425b03-4813-432e-b565-7ce5ae2fde9d) (SDK Attempt
                                                                                                                                                                                 Count: 1)" (RequestToken:
                                                                                                                                                                                 78327759-ac28-3734-ff64-7df423ed3258, HandlerErrorCode:
                                                                                                                                                                                 InvalidRequest)
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                Resource creation Initiated
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               Resource handler returned message: "Invalid request
                                                                                                                                                                                 provided: Stream not found: arn:aws:dynamodb:us-east-
                                                                                                                                                                                 1:807262913923:table/tld-p2m-cuenta/stream/REEMPLAZAR
                                                                                                                                                                                 (Service: Lambda, Status Code: 400, Request ID:
                                                                                                                                                                                 ad0bd364-c2c7-4d1e-8ea4-aeb1149fba6e) (SDK Attempt
                                                                                                                                                                                 Count: 1)" (RequestToken: d82637b1-03e2-c97f-d5cb-
                                                                                                                                                                                 fa40ad3309fa, HandlerErrorCode: InvalidRequest)
CREATE_FAILED                                              AWS::Logs::LogGroup                                        P2mLogGroup                                                Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        CanalAchLogGroup                                           Resource creation cancelled
UPDATE_FAILED                                              AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      Resource update cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        P2mMccLogGroup                                             Resource creation cancelled
CREATE_FAILED                                              AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          Resource creation cancelled
CREATE_FAILED                                              AWS::DynamoDB::Table                                       TablaAchReplicacion                                        Resource creation cancelled
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     Resource handler returned message: "Invalid request
                                                                                                                                                                                 provided: Stream not found: arn:aws:dynamodb:us-
                                                                                                                                                                                 east-1:807262913923:table/tld-p2m/stream/REEMPLAZAR
                                                                                                                                                                                 (Service: Lambda, Status Code: 400, Request ID:
                                                                                                                                                                                 39b4fa9f-033f-4f62-99f3-fa161e250992) (SDK Attempt
                                                                                                                                                                                 Count: 1)" (RequestToken:
                                                                                                                                                                                 c0a35c92-a0c5-bc7e-e542-6735cac75256, HandlerErrorCode:
                                                                                                                                                                                 InvalidRequest)
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                Resource creation cancelled
CREATE_FAILED                                              AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             Resource creation cancelled
UPDATE_ROLLBACK_IN_PROGRESS                                AWS::CloudFormation::Stack                                 tld-alias-replica                                          The following resource(s) failed to create:
                                                                                                                                                                                 [TablaAchReplicacion, ReplicaBitacoraAchLambdaStream,
                                                                                                                                                                                 P2mLogGroup, P2mMccLogGroup, ReplicaP2mLambdaStream,
                                                                                                                                                                                 P2mCuentaLogGroup, BitacoraAchLogGroup,
                                                                                                                                                                                 CanalAchLogGroup, AchReintentoLogGroup,
                                                                                                                                                                                 ReplicaP2mCuentaLambdaStream,
                                                                                                                                                                                 ReplicaCanalAchLambdaStream, ReplicaP2mMccLambdaStream].
                                                                                                                                                                                 The following resource(s) failed to update:
                                                                                                                                                                                 [TablaAliasReplicacion].
UPDATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
UPDATE_COMPLETE                                            AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      -
UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS               AWS::CloudFormation::Stack                                 tld-alias-replica                                          -
DELETE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
DELETE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mMccLogGroup                                             -
DELETE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             -
DELETE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mMccLogGroup                                             -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mLogGroup                                                -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       -
DELETE_COMPLETE                                            AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      AchReintentoLambda                                         -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
DELETE_COMPLETE                                            AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
DELETE_COMPLETE                                            AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
DELETE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  -
DELETE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
DELETE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
DELETE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
DELETE_SKIPPED                                             AWS::Lambda::LayerVersion                                  OnPremiseLayer4722db19ea                                   -
DELETE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
DELETE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           -
DELETE_COMPLETE                                            AWS::SecretsManager::Secret                                SecretAchReplica                                           -
UPDATE_ROLLBACK_COMPLETE                                   AWS::CloudFormation::Stack                                 tld-alias-replica                                          -
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Error: Failed to create/update the stack: tld-alias-replica, Waiter StackUpdateComplete failed: Waiter encountered a terminal failure state: For expression "Stacks[].StackStatus" we matched expected path: "UPDATE_ROLLBACK_COMPLETE" at least once
[2026-07-08 18:38:07] [ERROR] Deploy : sam deploy fallo en entorno sandbox tras 4 intentos
[WARN] Contexto del fallo | fase=Deploy
[INFO] Deploy: repo=tld-onpremise-data | rama=feature/ARQ-256_Bajar_a_premisa_P2M | modo=full | hashCommit pedido=bf50a342d0cdaf162a40a4f14ed619e7be107a10
[INFO] Git en disco: HEAD=bf50a34 | Update template.yaml
[INFO] Python Lambda: py -3.14 OK (Python 3.14.4)
[INFO] Para entorno (PATH, py): -Diagnostico. Si fallo sharp: busque SHARP VEREDICTO: NO APTO en este log.
[ERROR] Log completo: C:\AWSdeploy\logs\pbmadesarrollo\deploy-tld-onpremise-data-sandbox-20260708-181235.log
PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data>
PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data>