
En `## 1. Flujo de punta a punta` adiciona el siguiente flujo.
Además de cambiar el nombre de la sección, por Diagramas de Flujos
El que ya tenias, es el Digrama de flujo Procesador X -> Procesador Y
Este otro, es Procesador Y -> Procesador X

sequenceDiagram
    autonumber
    actor BANCO_ORIGEN as BANCO ORIGEN
    participant Y as Y
    participant HUB as HUB
    participant INTERHUB as INTERHUB
    participant ACH_XPRESS as ACH XPRESS
    participant INTEROP as INTEROP
    actor BANCO_DESTINO as BANCO DESTINO

    %% --- FLUJO PRINCIPAL: TRANSFERENCIA ---
    BANCO_ORIGEN->>Y: transferencia origen
    Y->>HUB: pacs.008
    HUB-->>INTERHUB: pacs.008
    Note over HUB,INTERHUB: En verde en el diagrama original
    INTERHUB->>ACH_XPRESS: pacs.008
    
    %% Sub-intercambio interno ACH y Interop
    ACH_XPRESS->>INTEROP: get
    INTEROP-->>ACH_XPRESS: pacs.008
    ACH_XPRESS-->>INTEROP: messageAck / ack
    
    INTEROP->>BANCO_DESTINO: pacs.008
    BANCO_DESTINO->>BANCO_DESTINO: aprobado / rechazado
    BANCO_DESTINO-->>INTEROP: pacs.002
    INTEROP-->>ACH_XPRESS: pacs.002
    ACH_XPRESS->>INTEROP: pacs.002 liquidacion
    INTEROP-->>INTERHUB: pacs.002 liquidacion
    INTERHUB-->>HUB: pacs.002
    HUB-->>Y: pacs.002
    Y-->>BANCO_ORIGEN: respuesta transferencia

    %% --- BLOQUE ALTERNATIVO 1: REVERSA EN DESTINO ---
    rect rgb(245, 245, 245)
        Note over INTEROP, BANCO_DESTINO: Reversa / Devolución
        INTEROP->>BANCO_DESTINO: camt.056
        BANCO_DESTINO-->>INTEROP: pacs.004
    end

    %% --- BLOQUE ALTERNATIVO 2: REVERSA DESDE ORIGEN ---
    rect rgb(240, 245, 240)
        Note over BANCO_ORIGEN, BANCO_DESTINO: Reversa / Devolución
        Y->>HUB: camt.056
        HUB-->>INTERHUB: camt.056
        Note over HUB,INTERHUB: En verde en el diagrama original
        INTERHUB->>BANCO_DESTINO: camt.056
        BANCO_DESTINO-->>INTERHUB: pacs.004
        INTERHUB-->>HUB: pacs.004
        HUB-->>Y: pacs.004
    end

    %% --- BLOQUE ALTERNATIVO 3: REVERSA CON INTERMEDIARIOS ---
    rect rgb(245, 245, 245)
        INTERHUB->>ACH_XPRESS: camt.056
        ACH_XPRESS->>INTEROP: get
        INTEROP-->>ACH_XPRESS: camt.056
        ACH_XPRESS-->>INTEROP: pacs.004 / pacs.002
        INTEROP-->>INTERHUB: pacs.004
    end


---
---

# INTERHUB

## Componentes agrupados por tipo

### Interfaces
Estos componentes son las API Rest que vamos a exponer. En grandes rasgos son la combinación de una API Gateway y una Lambda
- Xpress para ser consumido por el Banco Origen participante del Servivio de Xpress
- INTERHUB API Rest para ser consumido por el Banco Origen 
-	INTERHUB API Rest para ser consumido por el HUB

### Crontab: EventBridge + Lambda
-	Programador - Poller para hacer Get el ACH Xpress
- Programador - Para envio de las disputa al HUB
- Programador - Para envio de la compensación al LBTR

## Conetores
Estos componentes son los encargados de la conexión con las API Rest externas. Para conectarse con HUB, Ach Xpress y Banco Destino
- INTERHUB Conector con HUB
- INTERHUB Conector con Ach Xpress
- INTERHUB Conector con LBTR
- Validador Proxy

### Procesos Batch – Los que se ejecutaran en Premisa  // NO SE ACLARAN CON ESTO, 02/sep/2026 dijieron otra cosa. Ahora va hacer en nube. No saben lo que quiere
-	Envio de las disputas de premisa a AWS


## Detalle de los componente interfaces

### Xpress
Este es el servicio que actualmente tenemos de Xpress
Los cambios que debemos de hacer en este servicio, es la incorporación de los campos relacionados a las datos del documento de identificación y nombre de la persona en los los datos de los Alias en nuestro directorio central.
Esquema para indicar los nuevos campos:
```json
{
  "type": "object",
  "required": [
    "tipoDocumento",
    "documento",
    "primerNombre",
    "segundoNombre",
    "primerApellido",
    "segundoApellido",
    "fraudIndicator"
  ],
  "properties": {
    "tipoDocumento": {
      "type": "string",
      "enum": [
        "CEDULA",
        "PASAPORTE"
      ]
    },
    "documento": {
      "type": "string",
      "maxLength": 27
    },
    "primerNombre": {
      "type": "string",
      "description": "Longitud pendiente de definir."
    },
    "segundoNombre": {
      "type": "string",
      "description": "Longitud pendiente de definir."
    },
    "primerApellido": {
      "type": "string",
      "description": "Longitud pendiente de definir."
    },
    "segundoApellido": {
      "type": "string",
      "description": "Longitud pendiente de definir."
    },
    "fraudIndicator": {
      "type": "object",
      "required": [
        "flagged",
        "source"
      ],
      "description": "Signal from the destination's confirmed-fraud list.",
      "properties": {
        "flagged": {
          "type": "boolean"
        },
        "source": {
          "type": "string",
          "description": "Participant that originated the signal."
        },
        "reasonCode": {
          "type": "string"
        },
        "reportedAt": {
          "type": "string",
          "format": "date-time"
        }
      }
    }
  }
}
```

Para incorporar estos nuevos campos se debe de modificar los métodos de altas (`"metodo": "0004"` y `"metodo": "0006"`), modificación (`"metodo": "0008"`) y agregar un nuevo método de consulta (`"metodo": "0026"`). Este surge de poder tener la posibilidad de tener tarifas de cobros diferentes entre los métodos de consultas .

Para determinar si los nuevos campos son obligatorios en los métodos: `["0004", "0006", "0008"]`; se va evaluar en la tabla: `tld-validador-canal` el valor del campo `camposInteroperablesAlias ["Y", "N"]` (etiqueta en el PAC: `'Campos Interoperables'`)

Queda pendiente los códigos de respuesta en caso de que no cumpla con la validación. Estos códigos deben ser revisados con la actual tabla de códigos de respuesta que se maneja para Xpress.

Mofificaciones especiales
`"metodo": "0008"` Modificar alias
Se cambiará que sea obligatorio el parámetro id, y se hará que la modificación sea dependiente solo de tipoIdenficador, identificador y banco.

`"metodo": "0026"` Nueva consulta al directorio de Alias
Vamos a devolver un campo `p2pId`

Versionamiento: GitHub
Organización: Telered-Autopista
Repositorios existentes:
-	tld-api-alias



### INTERHUB API Rest – Interface para ser consumido por el Banco Origen

Banco Origen --> INTEHUB

API Rest para ser consumido por el Banco Origen
El mensaje deberá de seguir el estándar de Autopista, pero en el campo parámetros debe regirse por el HUB y como este establesca la definición de los PACS y CAMT

Estructura general del resquest
```json
{
  "idCanal": "",
  "validador": "",
  "peticion": {
    "idPeticion": "",
    "metodo": "",
    "solicitudes": [
      {
        "idSolicitud": "",
        "parametros": {
          // Campos basados a Doc. HUB | PACS.008 (esp. HUB) | PACS.028 (esp. HUB)
        }
      }
    ]
  }
}
```

Donde:
-	"idCanal": Se comporta igual como se maneja en Xpress
-	"validador": Corresponde al id del HUB. El mismo será un valor fijo definido por Telered 


Se debe de crear los siguientes métodos:

-	Método: "0027" Consulta del directorio del interoperable
-	Método: "0028" Solicitud de crédito. PACS.008
-	Método: "0029" Consulta de estado una solicitud de crétido. PACS.028

Detalle por métodos:

#### Método: "0027" Consulta del directorio interoperable
Nota: La definición de los esquemas depende del consultor MinsaIT, ya que este nos debe de indicar lo campos que deberá los request y response que se manejaran entre los sistemas.

Flujo a grandes rasgos:
-	Recibe una consulta del Banco origen
-	Mapear la consulta recibida al formato esperado por el HUB
-	Enviar la consulta al HUB
-	Esperar la respuesta del HUB
- Mapear la respuesta recibida al formato esperado por el Banco Origen
- Si la respuesta es satifactoria crear un registro en la tabla: tld-interhub-p2p
-	Devuelve la respuesta al Banco origen


Nota tecnica
La creación del valor de `p2pId` sera con `contextoEjecucion?.awsRequestId ?? randomUUID()`


Ejemplo de request, que me envio el Banco Origen
```json
{
  "idCanal": "1000",
  "validador": "1008",
  "peticion": {
    "idPeticion": "TLRDPAPA000000000001",
    "metodo": "0027",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "identificador": "61119876",
          "tipoIdentificador": "CELULAR",
          "procesadorDestino": "yappi"
        }
      }
    ]
  }
}
```
Mappeo a realizar

"identificador" -> "keyValue" (Adicionar el prefijo +507)
"tipoIdentificador" -> "keyType" ("CELULAR" -> "MSISDN")
"procesador" -> No tenemos un campo para esto. Consulta a enviar al consultor MinsaIT
Valor fijo "Xpress" -> "initiatingParticipantId"


// Request a enviar al HUB, por medio de componente `INTERHUB Conector con HUB`
```json
{
  "tipo": "CONSULTA",
  "mensaje": {
    "keyType": "MSISDN",
    "keyValue": "+50761119876",
    "initiatingParticipantId": "Xpress"
    // Falta donde pondré el Procesador de destino
  }
}
```


// Ejemplo de response HUB

```json
{
  "status": "RESOLVED",
  "resolvedParticipantId": "TELERED",
  "payeeHandle": "PH-9c2f7a",
  "keyType": "MSISDN",
  "keyValue": "string",
  "fraudIndicator": {
    "flagged": true,
    "source": "string",
    "reasonCode": "string",
    "reportedAt": "2019-08-24T14:15:22Z"
  }
}
```

Mappeo
Necesitamos que el consultor MinsaIT nos aclare el response que nos devolverá.


Ejemplo de un response que daremos al Banco Origen

```json
{
    "respuesta": {
        "idPeticion": "TLRDPAPA000000000001",
        "respuestas": [
            {
                "idSolicitud": "1",
                "resultado": 0,
                "datos": {
                    "identificador": "61119876",
                    "tipoIdentificador": "CELULAR",
                    "cuentas": [
                        {
                            "banco": "TLRDPAPA",
                            "cuenta": "123069852372001",
                            "producto": "PACA",
                            "nombreBanco": "API Validador Dummy DEV"
                        },
                        {
                            "banco": "AMIYGATO",
                            "cuenta": "456069852372001",
                            "producto": "PACA",
                            "nombreBanco": "Amiya Trust & Clearing"
                        }
                    ],
                    "p2pId": "11faeeaa-a58f-42ce-9dad-86c54980b2af",
                }
            }
        ]
    }
}
```


```json
{
    "respuesta": {
        "idPeticion": "TLRDPAPA000000000001",
        "respuestas": [
            {
                "idSolicitud": "1",
                "resultado": 378,
                "datos": null
            }
        ]
    }
}
```

> Consideraciones:
> 
> Se evaluó un requerimiento que finalmente no será considerado dentro del alcance del desarrollo. Dicho requerimiento contemplaba los siguientes puntos:
> 
> 1. Que, dentro del flujo del Banco Origen, se realizara inicialmente una consulta al directorio de alias de Telered mediante el `"metodo": "0026"`. En caso de que la transacción no pudiera continuar utilizando la información obtenida de dicho directorio y fuera necesario recurrir al directorio interoperable, se efectuaría una llamada al `"metodo": "0027"`.
> 
> 2. Implementar un mecanismo de validación que garantizara que, antes de ejecutar una llamada al `"metodo": "0027"`, se hubiera realizado previamente una consulta al `"metodo": "0026"`.
> 
> Tras el análisis técnico realizado, se determinó que este último punto no resulta viable. La principal justificación radica en el impacto que tendría sobre los tiempos de procesamiento, así como en el esfuerzo de desarrollo y mantenimiento requerido para implementar un mecanismo adicional que permita verificar y rastrear un identificador común entre ambos llamados. Esto implicaría incorporar lógica de trazabilidad específica para garantizar que toda invocación al `"metodo": "0027"` esté precedida por una consulta al `"metodo": "0026"`, generando una complejidad técnica cuyo beneficio no justifica el costo de implementación.




#### Método: "0028" Solicitud de crédito. PACS.008
Nota: La definición de los esquemas depende del HUB, ya que este nos debe de indicar lo campos que deberá los request y response que se manejaran entre los sistemas.

Flujo a grandes rasgos:
-	Recibe un PACS.008 del Banco origen
-	Mapear los valores recibidos del PACS.008 al formato esperado por el ACH Xpress
-	Envía el PACS.008 a ACH Xpress
-	Recibe de ACH Xpress el PACS.002 de liquidación
- Mapear la respuesta del PACS.002 de liquidación recibida al formato esperado por el Banco Origen
-	Devuelve al PACS.002 al Banco origen

#### Método: "0029" Consulta de estado una solicitud de crétido. PACS.028
Nota: La definición de los esquemas depende de HUB, ya que este nos debe de indicar lo campos que deberá los request y response que se manejaran entre los sistemas.

Flujo a grandes rasgos:
-	Recibe un PACS.028 del Banco origen
-	Mapear los valores recibidos del PACS.028 al formato esperado por el ACH Xpress
-	Envía el PACS.028 a ACH Xpress
-	Recibe de ACH Xpress el PACS.002
- Mapear la respuesta del PACS.002 recibida al formato esperado por el Banco Origen
-	Devuelve al PACS.002 al Banco origen


#### Artefactos:

Versionamiento: GitHub
Organización: Telered-Autopista
Repositorios existentes:
-	tld-matriz
-	tld-validador-api
Nuevos:
-	tld-interhub-api





### INTERHUB API Rest – Interface para ser consumido por el HUB

API Rest (con sus respectivos end-point) para ser consumido por el HUB
Este API Rest debe seguir las especificaciones del HUB

Como mínimo debemos de exponer métodos para:
-	Recibir mensaje de consulta de alias (Mensaje estándar del HUB)
-	Recibir mensaje de crédito (Mensaje estándar del HUB basado en el PACS.008)
-	Recibir mensaje de reversa (Mensaje estándar del HUB basado en el CAMT.056)
-	Recibir mensaje de estado de transacción (Mensaje estándar de HUB basado en PACS.028)
-	Responder estado del procesador Telered (EchoTest)
-	Recibir las notificaciones de Webhook (archivo de incongruencias, archivo de conciliación, estado de procesadores (disponibles, no disponibles), timeouts ***Depende de la validación de MinaIT)




INTERHUB Poller – Recolector de mensajes de la cola de ACH Xpress

-	EventBridge + Lambda poller
-	SQS que tendrá los mensajes que obtenemos de la cola de ACH Xpress
-	Workers: Lambda(s) consumidoras de SQS

Lambda poller
1.	GET
2.	Escribir en SQS (esperar confirmación de SQS)
3.	messageAck a ACH Xpress
4.	Siguiente GET


Worker PACS.008
1.	Evaluar el campo que indica el origen de la solicitud de crédito, <por definir nombre del campo>, para determinar el destino (HUB | Banco destino)
2.	Si el origen es el ‘Procesador X’ el destino es HUB, de lo contrario es Banco destino
3.	Convertir el PACS.008 al formato destino
4.	Enviar el PACS.008 al destino
5.	Esperar el PACS.002
6.	Enviar el PACS.002 al ACH Xpress
7.	Esperar el PACS.002 de liquidación
8.	Evaluar si PACS.002 de liquidación esta en uno de estos tipos de rechazos: <por definir>
a.	Si es de rechazo, y a merita informarlo al destino (HUB | Banco destino) *
i.	Crear CAMT.056
ii.	Enviar el CAMT.056 al destino (HUB | Banco destino)

•	Explicación:
En el punto 5 podemos recibir como estado de la solicitud de crédito (PACS.002) que fue aprobada o rechazado por el destino (HUB | Banco destino). En caso de rechazado, se lo damos a ACH Xpress y ya termina aquí la intervención del worker. Pero en caso de aprobado, cuando ACH Xpress nos responde en el paso 7, puede que el PACS.002 de liquidación indique un rechazo. Es aquí donde debemos de determinar que rechazos a merita informarlo al destino (HUB | Banco destino)

Worker PACS.028

Worker CAMT.056 ***Depende de la validación de MinaIT 




Nota:
-	Para una misma transacción. Si tiene un CAMT.056, al ser un rechazo, debe ser procesado después de un PACS.008





















## Detalle de los componente contab

### Programador - Poller para hacer Get el ACH Xpress

### Programador - Para envio de las disputa al HUB

### Programador - Para envio de la compensación al LBTR

## Detalle de los componente Conetores

### INTERHUB Conector con HUB

### INTERHUB Conector con Ach Xpress

### Validador Proxy

## Detalle de los componente Procesos Batch

###	Envio de las disputas de premisa a AWS

