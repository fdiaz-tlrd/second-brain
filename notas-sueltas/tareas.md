# **Nota**
El contenido de este archivo, como el propio archivo, es volatil. Puede que cambie su contenido, e incluso borrar el archivo, sin previo aviso.

# Arreglar configuración de tld-validador-dummy

En desarrollo tenemos
En https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions/tld-dummy-authorize?subtab=envVars&tab=configure
Sitio Web de AWS > Lambda > Funciones > tld-dummy-authorize > Variables de entorno > 
COGNITO_APP_CLIENT_ID: 7cg4g8vorirlhelebcriqnj95a
COGNITO_USER_POOL_ID: us-east-1_d0IcP4EV2

En https://us-east-1.console.aws.amazon.com/cognito/v2/idp/user-pools/us-east-1_d0IcP4EV2/applications/app-clients?region=us-east-1
| Nombre del cliente de la aplicación | ID de cliente              |
|-------------------------------------|----------------------------|
| AuthUserPoolClient-A4FMEMDRKOdc     | 7cg4g8vorirlhelebcriqnj95a |

En https://us-east-1.console.aws.amazon.com/cognito/v2/idp/user-pools?region=us-east-1
| Nombre del grupo de usuarios | ID de grupo de usuarios | Regiones     | Hora de creación | Hora de la actualización más reciente |
|------------------------------|-------------------------|--------------|------------------|---------------------------------------|
| tld-matriz-usuarios          | us-east-1_d0IcP4EV2     | Región única | Hace 4 años      | El año pasado                         |


**Sandbox tiene mal el COGNITO_USER_POOL_ID us-east-1**

En https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions/tld-dummy-authorize?subtab=envVars&tab=configure
COGNITO_APP_CLIENT_ID: 5vt3afsffb9igv79qts7jddhqc
COGNITO_USER_POOL_ID: us-east-1_RhPfC9nXM

En https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/tld-dummy-authorize?subtab=envVars&tab=configure
COGNITO_APP_CLIENT_ID: 4dv36k4icokkdles9ppprfgb1t
COGNITO_USER_POOL_ID: us-west-2_31e4dr9E0


En https://us-east-1.console.aws.amazon.com/cognito/v2/idp/user-pools/us-east-1_8kkM93LlR/applications/app-clients?region=us-east-1
| Nombre del cliente de la aplicación | ID de cliente              |
|-------------------------------------|----------------------------|
| AuthUserPoolClient-uHEQX7o8iCeK     | 5vt3afsffb9igv79qts7jddhqc |

En https://us-west-2.console.aws.amazon.com/cognito/v2/idp/user-pools/us-west-2_31e4dr9E0/applications/app-clients?region=us-west-2
| Nombre del cliente de la aplicación | ID de cliente              |
|-------------------------------------|----------------------------|
| AuthUserPoolClient-FaXy1Ld2CggP     | 4dv36k4icokkdles9ppprfgb1t |


En https://us-east-1.console.aws.amazon.com/cognito/v2/idp/user-pools?region=us-east-1
| Nombre del grupo de usuarios | ID de grupo de usuarios | Regiones     | Hora de creación | Hora de la actualización más reciente |
|------------------------------|-------------------------|--------------|------------------|---------------------------------------|
| tld-matriz-usuarios          | us-east-1_8kkM93LlR     | Región única | Hace 8 meses     | Hace 8 meses                          |

En https://us-west-2.console.aws.amazon.com/cognito/v2/idp/user-pools?region=us-west-2
| Nombre del grupo de usuarios | ID de grupo de usuarios | Regiones     | Hora de creación | Hora de la actualización más reciente |
|------------------------------|-------------------------|--------------|------------------|---------------------------------------|
| tld-matriz-usuarios          | us-west-2_31e4dr9E0     | Región única | Hace 5 años     | Hace 8 meses                          |

Hay que arreglar 


## Problema de R2P

https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Ftld-request-to-pay/log-events/2026$252F06$252F24$252F$255B$2524LATEST$255D29a3dba910c14ffeb85874fe8995f52f
CloudWatch
Administración de registros
/aws/lambda/tld-request-to-pay
2026/06/24/[$LATEST]29a3dba910c14ffeb85874fe8995f52f

|   timestamp   |                                                                                                                                                                                                                                                                                                                                                                                   message                                                                                                                                                                                                                                                                                                                                                                                   |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1782328329446 | INIT_START Runtime Version: nodejs:20.v101 Runtime Version ARN: arn:aws:lambda:us-east-1::runtime:18671876e7cc385452255180c58ca50cf8763398a4248ae92ed14410d196b942                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1782328330253 | 2026-06-24T19:12:10.253Z undefined ERROR Uncaught Exception  {"errorType":"Runtime.ImportModuleError","errorMessage":"Error: Cannot find module '@telered/tld-telered-lib/tld-util-http'\nRequire stack:\n- /var/task/lib/validador.js\n- /var/task/app.js\n- /var/runtime/index.mjs","stack":["Runtime.ImportModuleError: Error: Cannot find module '@telered/tld-telered-lib/tld-util-http'","Require stack:","- /var/task/lib/validador.js","- /var/task/app.js","- /var/runtime/index.mjs","    at _loadUserApp (file:///var/runtime/index.mjs:1192:17)","    at async UserFunction.js.module.exports.load (file:///var/runtime/index.mjs:1235:21)","    at async start (file:///var/runtime/index.mjs:1454:23)","    at async file:///var/runtime/index.mjs:1464:1"]}  |
| 1782328330270 | 2026-06-24T19:12:10.270Z undefined ERROR (node:2) Warning: NodeVersionSupportWarning: The AWS SDK for JavaScript (v3) versions published after the first week of January 2027 will require node >=22. You are running node v20.20.2.  To continue receiving updates to AWS services, bug fixes, and security updates please upgrade to node >=22.  More information can be found at: https://a.co/c895JFp (Use `node --trace-warnings ...` to show where the warning was created)                                                                                                                                                                                                                                                                                           |
| 1782328330317 | INIT_REPORT Init Duration: 871.21 ms Phase: init Status: error Error Type: Runtime.ImportModuleError                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 1782328331158 | 2026-06-24T19:12:11.158Z undefined ERROR Uncaught Exception  {"errorType":"Runtime.ImportModuleError","errorMessage":"Error: Cannot find module '@telered/tld-telered-lib/tld-util-http'\nRequire stack:\n- /var/task/lib/validador.js\n- /var/task/app.js\n- /var/runtime/index.mjs","stack":["Runtime.ImportModuleError: Error: Cannot find module '@telered/tld-telered-lib/tld-util-http'","Require stack:","- /var/task/lib/validador.js","- /var/task/app.js","- /var/runtime/index.mjs","    at _loadUserApp (file:///var/runtime/index.mjs:1192:17)","    at async UserFunction.js.module.exports.load (file:///var/runtime/index.mjs:1235:21)","    at async start (file:///var/runtime/index.mjs:1454:23)","    at async file:///var/runtime/index.mjs:1464:1"]}  |
| 1782328331164 | 2026-06-24T19:12:11.164Z undefined ERROR (node:2) Warning: NodeVersionSupportWarning: The AWS SDK for JavaScript (v3) versions published after the first week of January 2027 will require node >=22. You are running node v20.20.2.  To continue receiving updates to AWS services, bug fixes, and security updates please upgrade to node >=22.  More information can be found at: https://a.co/c895JFp (Use `node --trace-warnings ...` to show where the warning was created)                                                                                                                                                                                                                                                                                           |
| 1782328331214 | INIT_REPORT Init Duration: 724.06 ms Phase: invoke Status: error Error Type: Runtime.ImportModuleError                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1782328331214 | START RequestId: 26e10f50-7c29-4927-9a1d-bc5317e8dfd1 Version: $LATEST                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1782328331243 | END RequestId: 26e10f50-7c29-4927-9a1d-bc5317e8dfd1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1782328331243 | REPORT RequestId: 26e10f50-7c29-4927-9a1d-bc5317e8dfd1 Duration: 879.86 ms Billed Duration: 880 ms Memory Size: 256 MB Max Memory Used: 112 MB Status: error Error Type: Runtime.ImportModuleError                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1782328442690 | 2026-06-24T19:14:02.690Z undefined ERROR Uncaught Exception  {"errorType":"Runtime.ImportModuleError","errorMessage":"Error: Cannot find module '@telered/tld-telered-lib/tld-util-http'\nRequire stack:\n- /var/task/lib/validador.js\n- /var/task/app.js\n- /var/runtime/index.mjs","stack":["Runtime.ImportModuleError: Error: Cannot find module '@telered/tld-telered-lib/tld-util-http'","Require stack:","- /var/task/lib/validador.js","- /var/task/app.js","- /var/runtime/index.mjs","    at _loadUserApp (file:///var/runtime/index.mjs:1192:17)","    at async UserFunction.js.module.exports.load (file:///var/runtime/index.mjs:1235:21)","    at async start (file:///var/runtime/index.mjs:1454:23)","    at async file:///var/runtime/index.mjs:1464:1"]}  |
| 1782328442695 | 2026-06-24T19:14:02.695Z undefined ERROR (node:2) Warning: NodeVersionSupportWarning: The AWS SDK for JavaScript (v3) versions published after the first week of January 2027 will require node >=22. You are running node v20.20.2.  To continue receiving updates to AWS services, bug fixes, and security updates please upgrade to node >=22.  More information can be found at: https://a.co/c895JFp (Use `node --trace-warnings ...` to show where the warning was created)                                                                                                                                                                                                                                                                                           |
| 1782328442745 | INIT_REPORT Init Duration: 496.09 ms Phase: invoke Status: error Error Type: Runtime.ImportModuleError                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1782328442745 | START RequestId: 0e170f30-666c-450e-b4e2-20d0634b6c31 Version: $LATEST                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 1782328442768 | END RequestId: 0e170f30-666c-450e-b4e2-20d0634b6c31                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 1782328442768 | REPORT RequestId: 0e170f30-666c-450e-b4e2-20d0634b6c31 Duration: 588.45 ms Billed Duration: 589 ms Memory Size: 256 MB Max Memory Used: 112 MB Status: error Error Type: Runtime.ImportModuleError                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

¿tld-r2p-api sigue usando `@telered/tld-telered-lib/`?
Si es así, fue error en el despligue
Si no lo usa, hay que eliminar la referencia

## tld-api-alias







