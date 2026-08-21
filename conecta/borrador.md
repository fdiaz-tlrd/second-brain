
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

### Interfaces: API Gateway + Lambda
-	API Rest (con sus respectivos end-point) para ser consumido por el Banco Origen
-	API Rest (con sus respectivos end-point) para ser consumido por el HUB

### Poller - Crontab: EventBridge + Lambda
-	Progamador para hacer Get el ACH Xpress

### Procesos Batch – Los que se ejecutaran en Premisa
-	Falta especificaciones

## Detalle de componente

### INTERHUB API Rest – Interface para ser consumido por el Banco Origen

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

#### Método: "0026" Consulta del directorio del interoperable

#### Método: "0027" Solicitud de crédito. PACS.008
-	Recibe un PACS.008 del Banco origen
-	Envía él PACS.008 a ACH Xpress
-	Recibe de ACH Xpress el PACS.002
-	Devuelve al PACS.002 al Banco origen

#### Método: "0028" Consulta de estado una solicitud de crétido. PACS.028




INTERHUB API Rest – Interface para ser consumido por el HUB

API Rest (con sus respectivos end-point) para ser consumido por el HUB
Este API Rest debe seguir las especificaciones del HUB

Como mínimo debemos de exponer métodos para:
-	Recibir mensaje de consulta de alias (Mensaje estándar del HUB)
-	Recibir mensaje de crédito (Mensaje estándar del HUB basado en el PACS.008)
-	Recibir mensaje de reversa (Mensaje estándar del HUB basado en el CAMT.056)
-	Recibir mensaje de estado de transacción (Mensaje estándar de HUB basado en PACS.028)
-	Responder estado del procesador Telered (EchoTest)
-	Recibir las notificaciones de Webhook (archivo de incongruencias, archivo de conciliación, estado de procesadores (disponibles, no disponibles), timeouts ***Depende de la validación de Minsait)




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

Worker CAMT.056 ***Depende de la validación de Minsait 




Nota:
-	Para una misma transacción. Si tiene un CAMT.056, al ser un rechazo, debe ser procesado después de un PACS.008



















