PS C:\Users\pbmadesarrollo> $repos = @(
>>     "tld-onpremise-data"
>> )
PS C:\Users\pbmadesarrollo>
PS C:\Users\pbmadesarrollo> $rama = "feature/ARQ-256_Bajar_a_premisa_P2M"
PS C:\Users\pbmadesarrollo> $basePath = "C:\Users\pbmadesarrollo\Documents\GitHub"
PS C:\Users\pbmadesarrollo> $deployScript = "C:\AWSdeploy\deployNewVersion.ps1"
PS C:\Users\pbmadesarrollo>
PS C:\Users\pbmadesarrollo> foreach ($repo in $repos) {
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
From https://github.com/Telered-Autopista/tld-onpremise-data
 * branch            feature/ARQ-256_Bajar_a_premisa_P2M -> FETCH_HEAD
Deployando tld-onpremise-data con hash 1c7d76092ccc0e719b2f845dcbd6d749f481648e
[2026-07-10 06:10:12] [STEP] INICIO deployNewVersion.ps1
[2026-07-10 06:10:12] [STEP] RESUMEN - repo=tld-onpremise-data | rama=feature/ARQ-256_Bajar_a_premisa_P2M | ambiente=sandbox | modo=full | reversa=no
[INFO] Perfil: Desarrolladores | Usuario: pbmadesarrollo
[INFO] hashCommit: 1c7d76092ccc0e719b2f845dcbd6d749f481648e
[INFO] Ruta repo: C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data
[INFO] Entornos SAM: sandbox, sandbox-oregon
[INFO] Log: C:\AWSdeploy\logs\pbmadesarrollo\deploy-tld-onpremise-data-sandbox-20260710-061012.log
[INFO] Herramientas: git OK | SAM Python 3.13.13 | npm OK | py -3.14 OK (Python 3.14.4)
[SUCCESS] Precondiciones OK.
[2026-07-10 06:10:19] [STEP] GIT - sincronizar repositorio con origin (remote-first)
HEAD is now at 1c7d760 chore(samconfig): cargar ARNs stream P2M para Sandbox Virginia y Oregon
Removing .aws-sam/
Removing lambdas/layer/nodejs/node_modules/
Removing lambdas/layer/nodejs/package-lock.json
Reset branch 'feature/ARQ-256_Bajar_a_premisa_P2M'
branch 'feature/ARQ-256_Bajar_a_premisa_P2M' set up to track 'origin/feature/ARQ-256_Bajar_a_premisa_P2M'.
Your branch is up to date with 'origin/feature/ARQ-256_Bajar_a_premisa_P2M'.
HEAD is now at 1c7d760 chore(samconfig): cargar ARNs stream P2M para Sandbox Virginia y Oregon
[INFO] Git rama: feature/ARQ-256_Bajar_a_premisa_P2M
[SUCCESS] Git sincronizado: 1c7d760 - chore(samconfig): cargar ARNs stream P2M para Sandbox Virginia y Oregon (Félix Díaz)
[SUCCESS] hashCommit OK (coincide con HEAD).
[2026-07-10 06:10:39] [STEP] DEPENDENCIAS - npm (layer Node) y pip (Lambdas Python)
[SUCCESS] Registry npm local disponible en puerto 4873.
[INFO] npm: 1 carpeta(s) nodejs
[WARN] Sin package-lock.json; npm i --omit=dev --ignore-scripts: lambdas\layer\nodejs
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated readdir-scoped-modules@1.1.0: This functionality has been moved to @npmcli/fs
npm warn deprecated debuglog@1.0.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
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
[2026-07-10 06:11:00] [SUCCESS] DEPENDENCIAS OK
[2026-07-10 06:11:00] [STEP] BUILD - sam build, layer ZIP y template
[INFO] Workspace temporal SAM: C:\sam-temp\tld-onpremise-data-20260710-061100-4144
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
[2026-07-10 06:13:10] [SUCCESS] BUILD OK
[INFO] Workspace temporal SAM: C:\sam-temp\tld-onpremise-data-20260710-061310-4144
[SUCCESS] Template deploy-ready generado: C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data\.aws-sam\build\template.deploy-ready.yaml
[2026-07-10 06:13:13] [STEP] DEPLOY - inicio entorno 'sandbox'
        Uploading to tld-onpremise-data/sandbox/20260710-061313/1/67ef813114dfe3d69407534f0fa8692f  3854916 / 3854916  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260710-061313/1/7fa86737c90efa340db36c2fc5dd19f8  5027 / 5027  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260710-061313/1/727c3342b024fa4f463933802bedfc26  5654 / 5654  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260710-061313/1/57a6496a911fc74f6f350e19d856ed5c  5628 / 5628  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260710-061313/1/12105970f43cd1f751bb2c06873c07f5  6718 / 6718  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260710-061313/1/fd3e7c519c2b6e2bb7ebd09df5d9f00d  5705 / 5705  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260710-061313/1/34ea56c77c4a89060f1405d1f7b9f143  5731 / 5731  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260710-061313/1/3d695146f02ea9bfe24da265828a136e  4799 / 4799  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260710-061313/1/70958bcd7eb5feb543d66fe1ff08beae  4808 / 4808  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260710-061313/1/8cea6b48f3f88f102fa0735945ccee2e  4788 / 4788  (100.00%)
        Uploading to tld-onpremise-data/sandbox/20260710-061313/1/54bd41efb0fa1910fd56f11f547fa91b  6796 / 6796  (100.00%)

        Deploying with following values
        ===============================
        Stack name                   : tld-alias-replica
        Region                       : us-east-1
        Confirm changeset            : False
        Disable rollback             : False
        Deployment s3 bucket         : aws-sam-cli-managed-default-sandbox-virginia
        Capabilities                 : ["CAPABILITY_IAM"]
        Parameter overrides          : {"DeployEnvironment": "sandbox", "VPCe": "vpce-00ef36bfb2706e3b7", "SecurityGroup": "sg-0e9af23b6645d84df", "Subnet1": "subnet-0baba120b23a710cc", "Subnet2": "subnet-073da6f0db6885407", "Subnet3": "subnet-052421100e0a15e95", "LayerMphOrcl": "arn:aws:lambda:us-east-1:807262913923:layer:tld-orcl-lib:1", "DynamoDBStreamIDAliasCuenta": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-alias-cuenta/stream/2023-01-19T00:22:38.070", "DynamoDBStreamIDBitacora": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-validador-bitacora/stream/2022-08-23T23:38:57.929", "DynamoDBStreamIDCanal": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-validador-canal/stream/2022-08-23T23:38:57.839", "DynamoDBStreamIDP2m": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m/stream/2026-04-27T21:28:18.815", "DynamoDBStreamIDP2mCuenta": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m-cuenta/stream/2026-04-27T21:28:18.804", "DynamoDBStreamIDP2mMcc": "arn:aws:dynamodb:us-east-1:807262913923:table/tld-p2m-mcc/stream/2026-06-20T22:28:43.215"}
        Signing Profiles             : {}

Initiating deployment
=====================

        Uploading to tld-onpremise-data/sandbox/20260710-061313/1/5e740e8ca10ba01096bda80af6938506.template  22684 / 22684  (100.00%)


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
+ Add                                                      OnPremiseLayer65ec384eec                                   AWS::Lambda::LayerVersion                                  N/A
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


Changeset created successfully. arn:aws:cloudformation:us-east-1:807262913923:changeSet/samcli-deploy1783682012/f11dc5b0-d22b-42ad-b7ff-48baf2f3d3a0


2026-07-10 06:13:49 - Waiting for stack create/update to complete

CloudFormation events from stack operations (refresh every 5.0 seconds)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ResourceStatus                                             ResourceType                                               LogicalResourceId                                          ResourceStatusReason
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
UPDATE_IN_PROGRESS                                         AWS::CloudFormation::Stack                                 tld-alias-replica                                          User Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::LayerVersion                                  OnPremiseLayer65ec384eec                                   -
CREATE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           -
CREATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
UPDATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      -
CREATE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::DynamoDB::Table                                       TablaAchReplicacion                                        Resource creation Initiated
CREATE_COMPLETE                                            AWS::SecretsManager::Secret                                SecretAchReplica                                           -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::LayerVersion                                  OnPremiseLayer65ec384eec                                   Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::LayerVersion                                  OnPremiseLayer65ec384eec                                   -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
CREATE_COMPLETE                                            AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      Resource creation Initiated
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           Resource creation Initiated
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
CREATE_COMPLETE                                            AWS::DynamoDB::Table                                       TablaAchReplicacion                                        -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      AchReintentoLambda                                         -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mMccLogGroup                                             -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mMccLogGroup                                             Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
CREATE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  -
CREATE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     -
CREATE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             -
CREATE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               -
CREATE_COMPLETE                                            AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       -
CREATE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mMccLogGroup                                             -
CREATE_COMPLETE                                            AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
CREATE_COMPLETE                                            AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        -
CREATE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
CREATE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mLogGroup                                                -
UPDATE_COMPLETE                                            AWS::DynamoDB::Table                                       TablaAliasReplicacion                                      -
UPDATE_COMPLETE_CLEANUP_IN_PROGRESS                        AWS::CloudFormation::Stack                                 tld-alias-replica                                          -
DELETE_SKIPPED                                             AWS::Lambda::LayerVersion                                  OnPremiseLayer43f48937dc                                   -
UPDATE_COMPLETE                                            AWS::CloudFormation::Stack                                 tld-alias-replica                                          -
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Successfully created/updated stack - tld-alias-replica in us-east-1

[2026-07-10 06:14:55] [SUCCESS] DEPLOY - fin entorno 'sandbox' (exito)
[2026-07-10 06:14:55] [STEP] DEPLOY - inicio entorno 'sandbox-oregon'
        Uploading to tld-onpremise-data/sandbox-oregon/20260710-061455/1/67ef813114dfe3d69407534f0fa8692f  3854916 / 3854916  (100.00%)
        Uploading to tld-onpremise-data/sandbox-oregon/20260710-061455/1/7fa86737c90efa340db36c2fc5dd19f8  5027 / 5027  (100.00%)
        Uploading to tld-onpremise-data/sandbox-oregon/20260710-061455/1/727c3342b024fa4f463933802bedfc26  5654 / 5654  (100.00%)
        Uploading to tld-onpremise-data/sandbox-oregon/20260710-061455/1/57a6496a911fc74f6f350e19d856ed5c  5628 / 5628  (100.00%)
        Uploading to tld-onpremise-data/sandbox-oregon/20260710-061455/1/12105970f43cd1f751bb2c06873c07f5  6718 / 6718  (100.00%)
        Uploading to tld-onpremise-data/sandbox-oregon/20260710-061455/1/fd3e7c519c2b6e2bb7ebd09df5d9f00d  5705 / 5705  (100.00%)
        Uploading to tld-onpremise-data/sandbox-oregon/20260710-061455/1/34ea56c77c4a89060f1405d1f7b9f143  5731 / 5731  (100.00%)
        Uploading to tld-onpremise-data/sandbox-oregon/20260710-061455/1/3d695146f02ea9bfe24da265828a136e  4799 / 4799  (100.00%)
        Uploading to tld-onpremise-data/sandbox-oregon/20260710-061455/1/70958bcd7eb5feb543d66fe1ff08beae  4808 / 4808  (100.00%)
        Uploading to tld-onpremise-data/sandbox-oregon/20260710-061455/1/8cea6b48f3f88f102fa0735945ccee2e  4788 / 4788  (100.00%)
        Uploading to tld-onpremise-data/sandbox-oregon/20260710-061455/1/54bd41efb0fa1910fd56f11f547fa91b  6796 / 6796  (100.00%)

        Deploying with following values
        ===============================
        Stack name                   : tld-alias-replica
        Region                       : us-west-2
        Confirm changeset            : False
        Disable rollback             : False
        Deployment s3 bucket         : aws-sam-cli-managed-default-sandbox
        Capabilities                 : ["CAPABILITY_IAM"]
        Parameter overrides          : {"DeployEnvironment": "sandbox", "VPCe": "vpce-0425c5ae5cadfb413", "SecurityGroup": "sg-0632570ee4ab8c55f", "Subnet1": "subnet-0bd757a9bcc0dcda5", "Subnet2": "subnet-0d69bfc85a349018d", "Subnet3": "subnet-0349e2932ba6bec22", "LayerMphOrcl": "arn:aws:lambda:us-west-2:807262913923:layer:tld-mph-dependencies:2", "DynamoDBStreamIDAliasCuenta": "arn:aws:dynamodb:us-west-2:807262913923:table/tld-alias-cuenta/stream/2023-02-24T18:05:29.871", "DynamoDBStreamIDBitacora": "arn:aws:dynamodb:us-west-2:807262913923:table/tld-validador-bitacora/stream/2022-10-18T20:59:44.829", "DynamoDBStreamIDCanal": "arn:aws:dynamodb:us-west-2:807262913923:table/tld-validador-canal/stream/2022-10-18T21:01:58.270", "DynamoDBStreamIDP2m": "arn:aws:dynamodb:us-west-2:807262913923:table/tld-p2m/stream/2026-07-10T09:43:09.626", "DynamoDBStreamIDP2mCuenta": "arn:aws:dynamodb:us-west-2:807262913923:table/tld-p2m-cuenta/stream/2026-07-10T10:01:09.027", "DynamoDBStreamIDP2mMcc": "arn:aws:dynamodb:us-west-2:807262913923:table/tld-p2m-mcc/stream/2026-07-10T10:03:42.343"}
        Signing Profiles             : {}

Initiating deployment
=====================

        Uploading to tld-onpremise-data/sandbox-oregon/20260710-061455/1/12074cd7d916808b6a6d4a74a6b94e5e.template  22662 / 22662  (100.00%)


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
+ Add                                                      OnPremiseLayerd9034c2863                                   AWS::Lambda::LayerVersion                                  N/A
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
* Modify                                                   AliasReplicaReintentoLambda                                AWS::Lambda::Function                                      False
* Modify                                                   ReplicaAliasCuentaLambda                                   AWS::Lambda::Function                                      False
* Modify                                                   ReplicaBitacoraLambda                                      AWS::Lambda::Function                                      False
* Modify                                                   ReplicaCanalLambda                                         AWS::Lambda::Function                                      False
- Delete                                                   OnPremiseLayer5ca0f0d575                                   AWS::Lambda::LayerVersion                                  N/A
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Changeset created successfully. arn:aws:cloudformation:us-west-2:807262913923:changeSet/samcli-deploy1783682114/c98fef88-de68-4134-a28b-8e8a38b94066


2026-07-10 06:15:31 - Waiting for stack create/update to complete

CloudFormation events from stack operations (refresh every 5.0 seconds)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ResourceStatus                                             ResourceType                                               LogicalResourceId                                          ResourceStatusReason
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
UPDATE_IN_PROGRESS                                         AWS::CloudFormation::Stack                                 tld-alias-replica                                          User Initiated
CREATE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::LayerVersion                                  OnPremiseLayerd9034c2863                                   -
CREATE_IN_PROGRESS                                         AWS::SecretsManager::Secret                                SecretAchReplica                                           Resource creation Initiated
CREATE_COMPLETE                                            AWS::SecretsManager::Secret                                SecretAchReplica                                           -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
CREATE_IN_PROGRESS                                         AWS::Lambda::LayerVersion                                  OnPremiseLayerd9034c2863                                   Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             AchReintentoLambdaRole                                     Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::LayerVersion                                  OnPremiseLayerd9034c2863                                   -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
UPDATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
CREATE_COMPLETE                                            AWS::IAM::Role                                             AchReintentoLambdaRole                                     -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mCuentaLambdaRole                                 -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaBitacoraAchLambdaRole                               -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaCanalAchLambdaRole                                  -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mMccLambdaRole                                    -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      AchReintentoLambda                                         Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   Resource creation Initiated
CREATE_COMPLETE                                            AWS::IAM::Role                                             ReplicaP2mLambdaRole                                       -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalLambda                                         -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaAliasCuentaLambda                                   -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraLambda                                      -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
UPDATE_COMPLETE                                            AWS::Lambda::Function                                      AliasReplicaReintentoLambda                                -
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::Function                                      ReplicaP2mLambda                                           Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mCuentaLambda                                     -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      AchReintentoLambda                                         -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaBitacoraAchLambda                                   -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaCanalAchLambda                                      -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        CanalAchLogGroup                                           Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mMccLambda                                        -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mMccLogGroup                                             -
CREATE_COMPLETE                                            AWS::Lambda::Function                                      ReplicaP2mLambda                                           -
CREATE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mCuentaLambdaStream                               -
CREATE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaCanalAchLambdaStream                                -
CREATE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaBitacoraAchLambdaStream                             -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     -
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mMccLogGroup                                             Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  Resource creation Initiated
CREATE_IN_PROGRESS                                         AWS::Logs::LogGroup                                        P2mLogGroup                                                Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mMccLambdaStream                                  -
CREATE_IN_PROGRESS                                         AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     Resource creation Initiated
CREATE_COMPLETE                                            AWS::Lambda::EventSourceMapping                            ReplicaP2mLambdaStream                                     -
CREATE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mCuentaLogGroup                                          -
CREATE_COMPLETE                                            AWS::Logs::LogGroup                                        CanalAchLogGroup                                           -
CREATE_COMPLETE                                            AWS::Logs::LogGroup                                        BitacoraAchLogGroup                                        -
CREATE_COMPLETE                                            AWS::Logs::LogGroup                                        AchReintentoLogGroup                                       -
CREATE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mMccLogGroup                                             -
CREATE_COMPLETE                                            AWS::Logs::LogGroup                                        P2mLogGroup                                                -
UPDATE_COMPLETE_CLEANUP_IN_PROGRESS                        AWS::CloudFormation::Stack                                 tld-alias-replica                                          -
DELETE_SKIPPED                                             AWS::Lambda::LayerVersion                                  OnPremiseLayer5ca0f0d575                                   -
UPDATE_COMPLETE                                            AWS::CloudFormation::Stack                                 tld-alias-replica                                          -
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Successfully created/updated stack - tld-alias-replica in us-west-2

[2026-07-10 06:16:25] [SUCCESS] DEPLOY - fin entorno 'sandbox-oregon' (exito)
[2026-07-10 06:16:26] [SUCCESS] FIN TOTAL - deploy completado en 00:06:13 | log=C:\AWSdeploy\logs\pbmadesarrollo\deploy-tld-onpremise-data-sandbox-20260710-061012.log
PS C:\Users\pbmadesarrollo\Documents\GitHub\tld-onpremise-data>