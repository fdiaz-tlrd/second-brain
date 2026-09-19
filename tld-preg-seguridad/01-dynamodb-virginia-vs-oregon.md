# DynamoDB: tablas en Oregon vs patrón Virginia + réplica

**Fecha:** 2026-09-17  
**Repo:** `tld-preg-seguridad`  
**Alcance:** solo investigación de `template.yaml` (sin cambios en el repo).  
**Problema del usuario:** al habilitar réplica Global Table Virginia → Oregon en consola AWS, falla porque la tabla **ya existe** en Oregon.

## Veredicto

Sí: el fallo es el esperado. Este template **crea** `AWS::DynamoDB::Table` en **cada** región donde se despliega el stack (Virginia y Oregon). Otros repos **solo crean** la tabla en Virginia (`us-east-1`) y dejan Oregon para la réplica de consola. Si Oregon ya tiene una tabla local con el mismo nombre, DynamoDB **no puede** añadir esa región como réplica.

## Qué hay en `template.yaml` hoy

### Conditions (líneas 61–69) — comentadas

```yaml
# Conditions:
#   CreateGlobalResources: !Equals
#     - !Ref "AWS::Region"
#     - "us-east-1"
#   CreateDRResource: !Not
#     - !Equals
#       - !Ref "AWS::Region"
#       - "us-east-1"
```

- Están **comentadas desde el commit inicial** del repo (`a591473` AAUTO-3561). Nunca se activaron.
- `CreateDRResource` / `CreateGlobalResourcesDR` en otros repos a menudo **existe** pero **no** se usa en las tablas Dynamo; el patrón real de tablas es solo `Condition: CreateGlobalResources`.
- Aquí ni siquiera hay `Condition:` en los recursos Dynamo: aunque se descomentaran las Conditions, **no cambiaría nada** hasta que las tablas lleven `Condition: CreateGlobalResources`.

### Tablas (sin condición regional)

| Recurso CFN | TableName | Región al deploy |
|---|---|---|
| `PregSeguridadSistemaDynamoDBTable` | `tld-preg-seguridad-sistema` | la del `sam deploy` |
| `PregSeguridadDynamoDBTable` | `tld-preg-seguridad` | la del `sam deploy` |

Ambas tienen `BillingMode: PAY_PER_REQUEST`, `StreamSpecification: NEW_AND_OLD_IMAGES`, PITR y tags (commit `dbaf718` *fix_permitir_replica*, 2024-09-16). Streams/PITR/on-demand son requisitos para Global Tables en consola; **no** evitan que Oregon cree una tabla propia.

### Policies de las lambdas

Usan `!Ref` a los recursos de tabla, no el nombre literal:

- `TableName: !Ref PregSeguridadSistemaDynamoDBTable`
- `TableName: !Ref PregSeguridadDynamoDBTable`

En repos del patrón correcto (ej. `tld-api-alias`, `tld-api-r2p`) las policies usan el **nombre fijo** (`'tld-alias-cuenta'`, `'tld-r2p'`), precisamente para que el stack de Oregon despliegue lambdas **sin** crear la tabla en CFN y aun así tenga IAM al nombre regional (que será la réplica).

## Cómo se despliega (samconfig)

Perfiles Oregon (`sandbox-oregon`, `qa-oregon`, `prod-oregon`) usan `region = "us-west-2"` y el **mismo** `stack_name = "tld-preg-seguridad"`. Al desplegar Oregon, CloudFormation crea (o mantiene) las dos tablas en `us-west-2`.

## Patrón en otros repos (el que el usuario describe)

Ejemplos con Conditions **activas** y tabla solo en Virginia:

| Repo | Condition en tabla Dynamo |
|---|---|
| `tld-api-alias` | `Condition: CreateGlobalResources` en `TableAliasRepository` |
| `tld-api-r2p` | `Condition: CreateGlobalResources` en `TableRequestToPay` |
| `tld-notificacion` | `Condition: CreateGlobalResources` en ambas tablas |
| `tld-validador-api`, VCN, etc. | mismo patrón en tablas “globales” |

Flujo operativo esperado:

1. Deploy Virginia → CFN crea la tabla en `us-east-1`.
2. Deploy Oregon → CFN **no** crea la tabla (Condition falsa).
3. En consola DynamoDB (Virginia) → Global tables → Add region `us-west-2` → AWS **crea** la réplica en Oregon.
4. Lambdas Oregon hablan al endpoint Dynamo de su región; el nombre de tabla es el mismo; los datos se replican.

## Por qué falla la réplica en este caso

1. Deploy Oregon ya creó tablas **standalone** `tld-preg-seguridad` y `tld-preg-seguridad-sistema` en `us-west-2`, propiedad del stack CloudFormation de Oregon.
2. Al pedir réplica desde Virginia hacia Oregon, AWS intenta crear (o adoptar) una réplica con ese nombre en Oregon.
3. El nombre **ya está ocupado** por una tabla que **no** es réplica de la de Virginia → error (tabla ya existe / no se puede añadir región).

Es el mismo conflicto que anticipaba el retomo del incidente (2026-09-09): sin réplica, Oregon lee Dynamo local (vacío o distinto) tras failover.

## Relación con el incidente prod 2026-09-08

Documentado en [`00-estado-y-retomo.md`](00-estado-y-retomo.md): tras arreglar el mapping de Oregon, **sigue pendiente** la réplica de datos. Este hallazgo del template explica **por qué** no se puede completar ese paso en consola mientras Oregon tenga tablas locales del stack.

## Qué implicaría alinear el template (solo diseño; no hecho)

No se cambió el repo. Si más adelante se alinea al patrón de Alias/R2P, habría que considerar **en el mismo diseño**:

1. Descomentar `Conditions` y poner `Condition: CreateGlobalResources` en las dos tablas.
2. Cambiar policies (y cualquier env que use `!Ref` de tabla) a **nombre literal**, como Alias/R2P; si no, el deploy Oregon **rompe** al resolver `!Ref` a un recurso no creado.
3. Operación en AWS **antes** o **como parte** del cambio:
   - Borrar o sacar del stack las tablas locales de Oregon (riesgo de datos locales; confirmar si Oregon tiene datos propios o está vacío).
   - Luego crear réplica Virginia → Oregon desde consola (o declarar réplicas en el template Virginia, si se prefiere IaC).
4. Un `sam deploy` Oregon **después** de quitar las tablas del template intentará **eliminar** esas tablas del stack (salvo Retention/DeletionPolicy). Eso es destructivo si no hay Retention.

## Estado actual (resumen experto)

| Afirmación | Evidencia |
|---|---|
| Las Conditions comentadas explican tablas en Oregon | Sí: Conditions nunca activas; tablas sin `Condition` |
| Otros repos solo crean en Virginia | Sí: Alias, R2P, Notificacion, etc. |
| Réplica consola falla si tabla ya existe en Oregon | Sí: conflicto de nombre con tabla standalone CFN |
| Streams añadidos en `fix_permitir_replica` habilitan Global Tables | Sí; no sustituyen la Condition regional |
| Arreglar solo descomentando Conditions | **No alcanza**: faltan `Condition` en recursos + `!Ref` → nombre fijo + limpieza Oregon |

## Propuesta del usuario (2026-09-17) — análisis experto

**Propuesta (aclarada 2026-09-17):** ahora, juntos — (1) consola AWS: borrar tablas Oregon + réplica Virginia→Oregon; (2) alinear repo (`Condition: CreateGlobalResources`). El **deploy** queda **a futuro**, no en este paso.

### Lo que está bien

- Objetivo correcto: Oregon no debe tener tablas standalone; debe ser réplica de Virginia.
- Borrar Oregon y luego crear réplica es el único camino viable **a nivel DynamoDB** mientras el nombre esté ocupado.
- Alinear el template con Condition es necesario para que el próximo deploy Oregon **no vuelva a crear** tablas locales.

### Errores / omisiones que rompen el plan

1. **Solo `Condition` en el template no basta.** Las policies usan `!Ref PregSeguridad*DynamoDBTable` (9 sitios). Con Condition falsa en Oregon, CloudFormation **no puede** resolver esos `!Ref` → el deploy Oregon del template “alineado” **falla**. Hay que pasar a nombres literales (`tld-preg-seguridad`, `tld-preg-seguridad-sistema`), como Alias/R2P.

2. **“Sin deploy” + borrar en consola deja el stack Oregon en drift.** El stack CFN de Oregon **sigue creyendo** que posee esas tablas. Mientras el template desplegado en Oregon sea el actual (sin Condition):
   - Cualquier `sam deploy` Oregon (aunque sea un cambio de lambda) **intentará recrear** las tablas → choque con la réplica recién creada → deploy falla (o peor, si la réplica no está aún, recrea standalone).
   - El manual **debe** prohibir deploy Oregon con el template viejo hasta que exista el deploy del template nuevo.

3. **El primer deploy Oregon del template con Condition es el paso peligroso.** Al quitar las tablas del stack (Condition falsa), el `DeletionPolicy` por defecto es **Delete**. CloudFormation intentará borrar los recursos lógicos que aún rastrea:
   - Si ya borraste standalone y creaste réplica: CFN suele apuntar al **physical ID viejo** (tabla ya borrada). `DeleteTable` de un ID inexistente a menudo se tolera y el lógico sale del stack; la réplica (otro ARN, mismo nombre) puede sobrevivir. **No es garantía absoluta** — hay que verificar en consola que la réplica Oregon sigue ACTIVE tras ese deploy.
   - Si **aún no** borraste y haces primero el deploy con Condition: CFN **borra** las tablas standalone de Oregon. Eso es aceptable **solo si** no hay datos únicos en Oregon; después se crea la réplica. Orden más limpio a nivel CFN.
   - Si por error CFN termina borrando la **réplica** (mismo nombre, mal timing): se pierde la región secundaria del Global Table hasta recrearla.

4. **Son dos tablas**, no una: `tld-preg-seguridad` y `tld-preg-seguridad-sistema`. El manual debe cubrir ambas, en el mismo orden.

5. **Datos en Oregon:** borrar = perder lo que haya solo en Oregon. Si Oregon estaba vacío o desfasado (caso probable post-incidente), la réplica desde Virginia es lo deseado. Confirmar antes de borrar (item count / que no haya escrituras recientes propias de Oregon).

6. **Alinear el repo sin desplegar Oregon no cierra el riesgo.** El código en git no cambia el stack. Hasta el deploy Oregon del template nuevo, el stack sigue “dueño” de tablas Dynamo. Ventana frágil.

### Orden menos peligroso (recomendado frente a “solo manual sin deploy”)

**Opción A — primero Dynamo manual, luego template (la del usuario, endurecida):**

1. Confirmar Oregon sin datos críticos (ambas tablas).
2. Borrar en Oregon las dos tablas standalone (consola).
3. En Virginia: Global tables → añadir `us-west-2` para **ambas**.
4. Verificar réplicas ACTIVE y datos.
5. En el **mismo** cambio de template: Conditions + `Condition` en tablas + policies a nombre literal (y opcional `DeletionPolicy: Retain` en tablas para el deploy de transición).
6. Deploy Virginia (Condition true; tablas sin cambio material).
7. Deploy Oregon **cuanto antes** con ese template (Condition false: tablas salen del stack). Prohibido deploy Oregon del template viejo entre 2–7.
8. Tras deploy Oregon: verificar que las réplicas siguen ACTIVE y que el stack ya **no** lista los dos `AWS::DynamoDB::Table`.

**Opción B — primero CFN Oregon, luego réplica (más alineada a “dueño” del recurso):**

1. Template completo (Condition + literales; ideal `DeletionPolicy: Retain` o aceptar delete de standalone).
2. Deploy Oregon → CFN deja de gestionar / borra standalone.
3. Si Retain: borrar a mano las standalone retenidas.
4. Crear réplica Virginia→Oregon.
5. Ventaja: menos drift; el borrado lo hace el stack o queda Retain explícito.

### Veredicto a la propuesta

| Pieza | ¿Sirve? |
|---|---|
| Borrar Oregon + réplica en consola | Sí, necesario a nivel Dynamo si ya hay standalone |
| Manual sin deploy “para prod” | Solo como **puente**; incompleto si no sigue deploy Oregon del template nuevo |
| Solo añadir `Condition: CreateGlobalResources` | **Insuficiente e incorrecto solo**: sin literales en policies el próximo Oregon deploy falla |
| Olvidar que CFN Oregon sigue dueño | Error grave: redeploy viejo recrea conflicto |

**No ejecutar** el manual “borrar + replicar” dejando el stack Oregon con el template actual de forma indefinida.

## Archivos de referencia

- `tld-preg-seguridad/template.yaml` (Conditions 61–69; tablas 73–126; policies con `!Ref`)
- `tld-preg-seguridad/samconfig.toml` (`prod-oregon` / `qa-oregon` / `sandbox-oregon` → `us-west-2`)
- Contraste: `tld-api-alias/template.yaml`, `tld-api-r2p/template.yaml`, `tld-notificacion/template.yaml`
