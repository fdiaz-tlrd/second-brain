# 05 — `tld-matriz`: autorizador stubbeado en prod-a-dev

Repo: `prod_adactado_a_dev/tld-matriz`, rama `prod-a-dev`.
Lambda: `tld-auth-autorizador` (`lambdas/tld-auth-autorizador/app.py`), runtime `python3.8`.

## DESVIACIÓN de prod puro (decisión explícita del usuario)

El autorizador real (Lambda Authorizer de API Gateway) fue **reemplazado por un stub que siempre
devuelve `Allow`**. **Esto NO es producción pura.** Se hizo a propósito para el set de pruebas de
prod-a-dev, donde **no interesa validar apikey/secretkey ni tokens Cognito**.

- Aplica **solo** a `prod_adactado_a_dev/tld-matriz`, rama `prod-a-dev`.
- **No** tocar el `tld-matriz` real ni otros repos.

## Por qué se stubbeó (dos motivos)

1. **Crash de import (bloqueaba TODO).** El log mostraba:

   ```
   Runtime.ImportModuleError: Unable to import module 'app':
   urllib3 v2 only supports OpenSSL 1.1.1+, currently the 'ssl' module is compiled with 'OpenSSL 1.0.2k-fips'
   ```

   Causa: `requirements.txt` traía `boto3` **sin pin** → `botocore` nuevo → `urllib3>=2`, incompatible con
   el runtime `python3.8` de Lambda (OpenSSL 1.0.2). El módulo reventaba **al importar**, así que el
   autorizador denegaba/erroraba todas las peticiones a la API de matriz.

2. **No depender de tokens.** El autorizador real valida JWT de Cognito + políticas en DynamoDB
   (`tld-auth-politicas`). Para probar prod-a-dev sin generar tokens válidos, el stub deja pasar todo.

## Qué hace el stub

`app.py` quedó mínimo (solo `os`, sin `boto3`/`jose`/red):

- `lambda_handler` devuelve un `policyDocument` con `Effect: Allow` sobre `execute-api:*:*:*/*/*/*`.
- `requirements.txt` vaciado (solo comentario): el stub no usa dependencias externas → ya no se empaqueta
  `urllib3 v2` → desaparece el crash de import.

## Fix alternativo NO elegido (por si se quiere el autorizador real luego)

- Agregar `urllib3<2` a `requirements.txt` arregla el crash y **mantiene el autorizador real**, pero
  entonces las peticiones necesitan **tokens Cognito válidos** (client_id del pool de canales, firma, exp).
  El usuario decidió no lidiar con eso ahora.

## Para revertir a prod puro

Restaurar `app.py` y `requirements.txt` originales desde `main` de `tld-matriz` y, para que no crashee,
pinnear `urllib3<2` en `requirements.txt`.
