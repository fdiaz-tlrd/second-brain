Diagrama X -> Y

sequenceDiagram
    autonumber
    actor BO as BANCO ORIGEN
    participant IR as INTERHUB / API<br/>REST
    participant AX as ACH XPRESS
    participant IC as INTERHUB /<br/>CRONTAB
    participant H as HUB
    participant Y as Y
    participant BD as BANCO DESTINO

    BO->>IR: pacs.008
    IR->>AX: pacs.008
    
    IC->>AX: get
    AX-->>IC: pacs.008
    AX-->>IC: messageAck
    AX-->>IC: ack
    
    IC->>H: pacs.008
    H->>Y: pacs.008
    Y->>BD: transferencia
    
    Note over BD: aprobado /<br/>rechazado
    BD-->>Y: respuesta
    Y-->>H: pacs.002
    H-->>IC: pacs.002
    IC-->>AX: pacs.002
    AX-->>IC: pacs.002 liq
    IC-->>IR: pacs.002 liq
    IR-->>BO: pacs.002

    rect rgb(250, 250, 250)
        Note over AX,BD: Reversa / Devolución
        AX->>IC: camt.056
        IC->>H: camt.056
        H->>Y: camt.056
        Y->>BD: camt.056
        BD-->>Y: pacs.004
        Y-->>H: pacs.004
        H-->>IC: pacs.004
        IC-->>AX: pacs.004
    end


INTERHUB

Componentes agrupados por tipo


Interfaces: API Gateway + Lambda

-	API Rest (con sus respectivos end-point) para ser consumido por el Banco Origen
-	API Rest (con sus respectivos end-point) para ser consumido por el HUB


Tareas programadas - Crontab: EventBridge + Lambda

-	Progamador para hacer Get el ACH Xpress








Procesos Batch – Los que se ejecutaran en Premisa





Interface INTERHUB – API Rest consumido por el Banco Origen

API Rest (con sus respectivos end-point) para ser consumido por el Banco Origen
El mensaje deberá de seguir el estándar de Autopista, pero en el campo parámetros debe regirse por el HUB y PACS

Estructura general del resquest
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

Donde:
-	“idCanal”: Se comporta igual como se maneja en Xpress
-	"validador”: Corresponde al id del HUB | El HUB será configurado en el PAC como un validador 


Se debe de crear los siguientes métodos:

-	Método: "0026" Consulta del directorio del interoperable
-	Método: "0027" Solicitud de crédito. PACS.008
-	Método: "0028" Consulta de estado una solicitud de crétido. PACS.028

Detalle por métodos:

Método: "0026" Consulta del directorio del interoperable


Método: "0027" Solicitud de crédito. PACS.008
-	Recibe un PACS.008 del Banco origen
-	Envía él PACS.008 a ACH Xpress
-	Recibe de ACH Xpress el PACS.002
-	Devuelve al PACS.002 al Banco origen


Método: "0028" Consulta de estado una solicitud de crétido. PACS.028








Interface INTERHUB – API Rest consumido por el HUB

API Rest (con sus respectivos end-point) para ser consumido por el HUB
Este API Rest debe seguir las especificaciones del HUB

Como mínimo debemos de exponer métodos para:
-	Recibir mensaje de consulta de alias (Mensaje estándar del HUB)
-	Recibir mensaje de crédito (Mensaje estándar del HUB basado en el PACS.008)
-	Recibir mensaje de reversa (Mensaje estándar del HUB basado en el CAMT.056
-	Recibir mensaje de estado de transacción (Mensaje estándar de HUB basado en PACS.028)
-	Responder estado del procesador Telered (EchoTest)
-	Recibir las notificaciones de Webhook (archivo de incongruencias, archivo de conciliación, estado de procesadores (disponibles, no disponibles), timeouts ***Depende de la validación de Minsait)




Tareas programadas - Crontab: EventBridge + Lambda

-	Progamador para hacer Get el ACH Xpress

Tener una tarea programada en EventBridge que dispare una Lambda
Esta lambda lo que hará es un Get a ACH Xpress
El Get me devolverá la última transacción. Esta se debe de guardar y consumir el método “messageAck” de ACH xpress, para indicar la transacción que se obtuvo con el Get

Con el Get puedo recibir:
-	PACS.008
-	PACS.028
-	CAMT.056 ***Depende de la validación de Minsait 

Crear una lambda para manejar cada posible resultado del Get

Cada mensaje (PACS, CAMT) tendrá definido el procesador origen y destino

PACS.008
-	Enviarlo a HUB (Procesador origen X)
o	Tomar el PACS.008
o	Convertir a formato esperado por el HUB
-	Enviarlo a Banco destino (Procesador origen no es X)



