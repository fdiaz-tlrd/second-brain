# Johany Caballero Rios 12:25 p.m.

Buenas tardes Felix
mañana liberan este caso CCL-7721
esto lo liberan de la rama productiva? 

yo 2:25 p.m
Buenas tardes Jonahy,
Por favor, dame un momento, estoy procesando para dar una respuesta...

Johany Caballero Rios 12:25 p.m.
le pregunte a Emory tambien para ver que me dicen porque Control de Cambios me esta preguntando

yo 12:56 p.m.:
De igual forma ya escribe en la mesa:
> Felix Diaz Pinzon 07/07/2026 12:40 p.m.
> Hola equipo,
>  
> Quiero comentarles que actualmente estoy analizando cómo dar respuesta a una consulta realizada por Johany relacionada con la liberación a producción del componente QR del proveedor Kotkas.
>  
> Aprovecho para mencionarlo por este medio porque es un tema que he venido comentando en las reuniones dedicadas y en los dailys. Considero importante volver a exponerlo aquí, ya que percibo que aún no se tiene completa claridad sobre el impacto que he intentado transmitir respecto a esta liberación.
>  
> En este momento me encuentro revisando el tema para poder brindar una respuesta adecuada y con el debido sustento. Conforme avance en el análisis, compartiré mis hallazgos y recomendaciones con el equipo.
>  
> Gracias.

Johany Caballero Rios 12:57 p.m.
gracias Felix

yo 12:58 p.m.: 
Estoy recopilando información tanto de los correos como de los CCL para poder brindar una respuesta completa y precisa.
 
Este análisis requiere tiempo y no es algo que pueda redactar de manera inmediata. Te agradezco que me permitas terminar la revisión antes de emitir una conclusión.
 
En cuanto tenga toda la información validada, compartiré una respuesta debidamente sustentada. Gracias por tu paciencia y comprensión.


# Flujo de comunición de los servicios / API

[Servicio Xpress por Telered] --> [QR-Payment de Kotkas]
[tld-matriz -> tld-validador-api -> tld-api-alias -> tld-api-qrpayment] --> [QR-PAYMENT]

Para adicionar QR-Payment del lado de Telered se toco:
- tld-api-alias (Este componente ya existia y el desarrollador (que ya no esta con nostros) Edwin lo modifico para adicionar los métodos correspondinte para generar y leer qr
- tld-api-qrpayment (Este es el que yo cree nuevo)

Yo (yo a titulo personal como desarrallodar) no tengo injerencia en QR-PAYMENT. Eso es creado por proveedor Kotkas para Telered, y que para armado el ambiente en AWS, Telered se apoyo de su otro proveedor Cibernetica


# Como fue pensando

Para mi, que hizo el tld-api-qrpayment, solo me interesa garantizar que mi componente consuma correctacmtente el comporte QR-Payment
En mi tld-api-qrpayment dependo de un secret managment para buscar los datos de usuario (Entidad Financiera , apikey, secretkey) para conectarme a QR-Payment
Yo cree un manual de pre-liberacón para que se creara el usuario en el sitio web que adminsitra QR-Payment, crearan el secret managment y me pasaran el ARN para yo ponerlo en el archivo de configuración por ambiente de tld-api-qrpayment
En el ambiente de QA se hizo.

Los CCL-7822 y CCL-7778 se lleva
La pre-liberacionq que yo indique nadie le presto atención y no la hicieron, en parte por que en no instalaron el componente de QR-PAYMENT (CCL-7721)



# CCL-7721 [ESTRATEGICA ACH] Componente QR-PAYMENT

Esto es para el despligue de un componente del provedor Kotkas QR-Payment

Pero por aguna razón tiene en la pestaña de versionamiento
Ubicación Paquete de Liberación: https://github.com/Telered-Autopista/tld-api-qrpayment

¿podrá ser por la actualización del ARN que mencione? No lo se


# tld-api-qrpayment

## Despligue en producción

Trazabilidad de los correos enviados para la salida de producción de tld-api-alias + tld-api-qrpayment
Esta es una cadena de correos que inicie para el desplguie en QA, por eso el asunto tiene QA
Pero si vemos en la tabla de Hash ID que comparte Johany, se menciona la rama main (producción) para tld-api-alias

De: Emory Reid Boutet <ereid@telered.com.pa>
Enviado: Jueves, 07 de Mayo de 2026 14:43
Para: Johany Caballero Rios <jcaballero@telered.com.pa>
CC: Estrategica ACH <estrategicaACH@telered.com.pa>
Asunto: Re: DES-1017 P2P QR - Autopista - Solicitud para merge y despliegue en QA
Buenas tardes,
    Para los casos considerar lo siguiente:

| CASO     | REPOSITORIO       |
|----------|-------------------|
| CCL-7822 | tld-api-alias     |
| CCL-7778 | tld-api-qrpayment |

    Esto son los casos y su repositorio correspondiente. 
    Tomamos nota para mantener la separación de los casos y repositorios y así evitar confusiones a futuro.
saludos,

De: Johany Caballero Rios <jcaballero@telered.com.pa>
Enviado: Viernes, 08 de Mayo de 2026 13:27
Para: Emory Reid Boutet <ereid@telered.com.pa>
CC: Estrategica ACH <estrategicaACH@telered.com.pa>
Asunto: Re: DES-1017 P2P QR - Autopista - Solicitud para merge y despliegue en QA
Buenas tardes! Gracias @Emory Reid Boutet por la aclaración.
Saludos.
Johany



De: Johany Caballero Rios <jcaballero@telered.com.pa>
Enviado: Viernes, 08 de Mayo de 2026 16:50
Para: Emory Reid Boutet <ereid@telered.com.pa>; Estrategica ACH <estrategicaACH@telered.com.pa>
Asunto: Re: DES-1017 P2P QR - Autopista - Solicitud para merge y despliegue en QA
Buenas tardes
Se realiza la fusión de los cambios a main para el repositorio de tld-api-alias.
| JIRA     | Repositorios      | Hacia la Rama | Desde la Rama    | PR   | Hash ID                                  |
|----------|-------------------|---------------|------------------|------|------------------------------------------|
| CCL-7822 | tld-api-alias     | main          | qa               | #139 | f2255b66a9ae8af919125e6e1b08c47d582b55d3 |
| CCL-7778 | tld-api-qrpayment | N/A           | feature/CCL-7778 | N/A  | 3f462456381d28b8bd07075a9ea56e2c553de627 |
Saludos,
Johany

## Manual de Instalación - pre-liberacion

Yo en el CCL-7822 subí un al CCL la versión 1.2 del "(FMR-CCL-002) Manual de Instalación - CCL-7822 - pre-liberacion.docx", 20 ene 2026, 2:01 p. m.
Este manual se ejecuto en el ambiente de QA

Este es para que en el sitio web destinado a la administración del servicio QR-PAYMENT, se explique como crear nueva Entidad Financiera / Banco.
Además de la creación un secret managment en AWS, ya colocarla la información correspondiente. Y pasarme a mi el ARN, para poder colocarlo en la plantilla del repositorio tld-api-qrpayment 

El día, 07/01/2026, en una reunión que se hablo para la liberación del QR-PAYMENT

Yo subi el CCL-7721 la versión 1.2 del Manual de instalación - pre-liberación, y en el historial de cambios del documento coloque "Se cambia el número de CCL, de CCL-7822 por CCL-7721"
Se necesita que se cre el secret managemnet.

Lo que yo comente en la reunión de ese día fue:
Por favor, creen el secrete y compartanen el ARN, antes de la liberación de QR-Payment. Por que yo tengo que actualizar el archivo de configuración del tld-api-qrpayment y lo puedan instalar en producción en la misama salia de QA-PAYMENT. Ya después que tengan el sitio web de adminsitración de QR-Payment de producción, crean la entidad financiera y actualizan el secret managment



# Problema

Después del 

tld-api-qrpayment también esta para el servicio P2M QR, y este se estaba trabajando y actualmente esta en cerficiación en el ambiente de QA

La rama en QA tiene cambios que no deben de ir a producción
Lo que yo he comentando en reuniones previas es, que se instale antes de sacar a QR-Payment (Kotkas) el "(FMR-CCL-002) Manual de Instalación - CCL-7822 - pre-liberacion.docx" que esta en CCL-7822, sin la parte de la creación de la Entidad Financiera en QR-PAYMENT, ya que ese componente aún no existie
Podría hacer el cambio en la rama feature/CCL-7778 (3f462456381d28b8bd07075a9ea56e2c553de627) para calocar el ARN del secret mangement y solicitar a Johany (Control de Versiones) que haga un PR a la Rama de producción
Se despliguie tld-api-qrpayment en la misma ventana de salida a producción de QR-PAYMENT
Como ya esta el sitio web de adminsitración de QR-Payment (Kotkas) ya pueden crear la entidad financiera
Como tarea post-liberación, completen los valores del secret managment de producción


