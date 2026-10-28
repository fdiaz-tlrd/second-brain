# IPEDA-3605

## Descripción

Reporte de facturación P2M 

## Criterio de aceptación

Facturación P2M:

La consulta al Directorio tendrá costo de 0.03; sin importar si es cruzadas o propias.

Puntos que se consideran consulta al directorio P2M:
- Catalogo: Cuando el usuario selecciona un comercio para realizar el pago.

- Lectura del QR: todas la lectura de un QR P2M, también debe considerarse una consulta al directorio.  

Se entrega los datos de facturación en el mismo modelo de la facturación Xpress P2P en Apex 
(punto a confirmar con Contabilidad).

# IPEDA-3606

## Descripción

Archivo de consultas diarias

## Criterio de aceptación

Se debe crear un archivos diarios generados para cada IF, con estructura similar al formato adoptado en archivo P2P-Xpress:
 - Listado de las consultas realizadas en el día anterior por método (Catálogo, QR, etc).
 - Listado de las trasnferencias exitosas P2M realizadas en ACH Directo en el día anterior.

Archivo debe ser generado y agregado en carpeta EFT de cada IF cada día.

# IPEDA-3679

Reporte diario de comisiones P2M - Telered

## Descripción

Visualización diaria de comisiones generadas por P2M, acreditadas mediante la compensación en la cuenta bancaria de recaudo de Telered.


Como Gerente de Contabilidad, quiero contar con un reporte diario que consolide por IF las comisiones generadas por las transacciones de P2M compensadas y que dicha comisión sea acreditada a la cuenta de recaudo brindada por Telered.

Se debe poder generar en el APEX diariamente un reporte consolidado de las comisiones obtenidas por las transacciones procesadas y compensadas en la cuenta bancaria de recaudo.

El reporte deberá permitir visualizar el total de ingresos generados por cada IF para Telered durante el período consultado.

## Criterio de aceptación

Escenario 1: Generación del reporte diario
Dado que existen transacciones P2M compensadas en el sistema ACH Directo.
Cuando se solicite el reporte diario desde el APEX
Entonces el sistema deberá generar un reporte correspondiente a la fecha del proceso solicitada y deberá incluir únicamente la comisión correspondiente a Telered que ha sido acredita a su cuenta contable.

Escenario 2: Visualización de ingresos por comisiones
Dado que el reporte diario ha sido generado
Cuando el usuario consulte el reporte
Entonces deberá visualizar:
Fecha del reporte 
Banco de recaudo
Fecha de proceso 
Nombre del reporte: Distribución de cargos P2M a Telered
Número de cuenta
Cantidad de transacciones compensadas.
IF que acredita
Monto de comisión recibido
Monto total de comisiones generadas diarias.

Escenario 3: Exportación del reporte
Dado que el usuario requiere realizar análisis o conciliación
Cuando seleccione la opción de exportar
Entonces el sistema deberá permitir descargar el reporte en formato Excel y/o CSV.

Reglas de Negocio:
- Solo deben considerarse transacciones con estado "Compensada".
- Las comisiones acreditadas deben cuadrar con el calculo del sistema y lo indicado en el tarifario vigente configurado para el servicio P2M
- El reporte deberá conservar información histórica para consultas posteriores.
- Los montos deberán mostrarse en la moneda de liquidación correspondiente.

# IPEDA-3680

Reporte mensual de comisiones P2M - Telered

## Descripción

Visualización mensual de comisiones generadas por P2M, acreditadas diariamente mediante la compensación en la cuenta bancaria de recaudo de Telered.


Como Gerente de Contabilidad, quiero contar con un reporte mensual que consolide por IF las comisiones generadas por las transacciones de P2M compensadas y que dicha comisión sea acreditada a la cuenta de recaudo brindada por Telered.

Se debe poder generar en el APEX al cierre del mes un reporte consolidado de las comisiones obtenidas por las transacciones procesadas y compensadas durante el mes en la cuenta bancaria de recaudo.

El reporte deberá permitir visualizar el total de ingresos generados por cada IF para Telered una vez cerrado el mes consultado.

## Criterio de aceptación

Escenario 1: Generación del reporte mensual
Dado que existen transacciones P2M compensadas diariamente en el sistema ACH Directo.
Cuando se solicite el reporte mensual desde el APEX
Entonces el sistema deberá generar un reporte con el consolidado de todas las comisiones correspondiente a la fecha del proceso solicitada y deberá incluir únicamente la comisión correspondiente a Telered que ha sido acredita a su cuenta contable durante el mes consultado

Escenario 2: Exportación del reporte
Dado que el usuario requiere realizar análisis o conciliación
Cuando seleccione la opción de exportar
Entonces el sistema deberá permitir descargar el reporte en formato Excel y/o CSV.