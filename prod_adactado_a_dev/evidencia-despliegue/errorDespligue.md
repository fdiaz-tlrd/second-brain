Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows

PS C:\Users\pbmadesarrollo> $Env:AWS_ACCESS_KEY_ID=""
PS C:\Users\pbmadesarrollo> $Env:AWS_SECRET_ACCESS_KEY=""
PS C:\Users\pbmadesarrollo> $Env:AWS_SESSION_TOKEN=""
PS C:\Users\pbmadesarrollo> Set-Location C:\AWSdeploy\
PS C:\AWSdeploy> .\deploy.ps1 `
>>   -repositorio tld-api-cuenta-nombre `
>>   -ramaGit prod-a-dev `
>>   -ambiente dev `
>>   -modo full `
>>   -esReversa no `
>>   -hashCommit f67a00a128223b5e818beb9e1e094d6955275b0c
At C:\AWSdeploy\deploy.ps1:231 char:109
+ ...  python: ningun ejecutable 'python' en PATH (solo informativo; el scr ...
+                                                                  ~
Missing closing ')' in expression.
At C:\AWSdeploy\deploy.ps1:216 char:10
+     else {
+          ~
Missing closing '}' in statement block or type definition.
At C:\AWSdeploy\deploy.ps1:145 char:38
+ function Write-DeployRuntimeSnapshot {
+                                      ~
Missing closing '}' in statement block or type definition.
At C:\AWSdeploy\deploy.ps1:231 char:163
+ ...  informativo; el script usa el Python embebido en SAM para pip/sam)."
+                                                                       ~
Unexpected token ')' in expression or statement.
At C:\AWSdeploy\deploy.ps1:467 char:128
+ ... descarta cambios locales en archivos rastreados), clean -fdx, checkou ...
+                                                                 ~
Missing argument in parameter list.
At C:\AWSdeploy\deploy.ps1:467 char:141
+ ... ios locales en archivos rastreados), clean -fdx, checkout -B, reset - ...
+                                                                 ~
Missing argument in parameter list.
At C:\AWSdeploy\deploy.ps1:772 char:45
+ $elapsedText = $elapsed.ToString('hh\:mm\:ss')
+                                             ~~
The string is missing the terminator: '.
    + CategoryInfo          : ParserError: (:) [], ParseException
    + FullyQualifiedErrorId : MissingEndParenthesisInExpression

PS C:\AWSdeploy>