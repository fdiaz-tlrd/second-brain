# Borrador de correo — informe canal 1577 Sandbox

Archivo de trabajo para compartir el informe y los logs con ambas mesas. Ajustar destinatarios, asunto y firma antes de enviar.

---

## Asunto (opciones)

- `Sandbox — análisis fallo canal 1577 (VCN Sin enmascarar) y acción pendiente en PAC`
- `Sandbox VCN — hallazgos canal validador 1577 y configuración PAC`

---

## Cuerpo del correo

Hola a todos,

Comparto el análisis del fallo que estamos viendo en Sandbox en el escenario **TELERED VCN Resp Sin enmascarar** (colección VCN REGRESIÓN, environment SANDBOX VCN), asociado al canal validador **1577** (alias **AUTOMATI**).

Revisamos el flujo de punta a punta — regresión Postman, llamada directa al proxy y logs del validador dummy — y documentamos el resultado en el informe adjunto. También adjunto el archivo con los logs de CloudWatch (proxy y dummy) y las llaves públicas que hoy están cargadas en el PAC para ese canal.

**Resumen**

- El síntoma visible es HTTP **509** en el procesador («no se recibió el campo `respuesta` cifrado del validador»).
- En los logs, el validador dummy responde error porque **no logra descifrar** la petición que le envía el procesador (`oaep decoding error`).
- La causa apunta a una **desalineación de configuración en el PAC de Sandbox**: el canal 1577 tiene como destino el dummy (`tld-validador-dummy.sand.telered.internal`), pero la llave pública **activa** para cifrado es `1577-publicOrlando.pem`, que no corresponde al par que usa el dummy. En el PAC ya está cargada la llave correcta (`1577-dummy-public (1).pem`); solo falta **dejarla como activa** en lugar de la de Orlando.

**Pendiente**

Queda por actualizar en el **PAC de Sandbox** el canal **1577**: activar la llave **`1577-dummy-public (1).pem`** mientras el `urlValidador` siga apuntando al dummy. Con eso debería volver a pasar el escenario Sin enmascarar (y cualquier otra prueba que use ese canal en Sandbox).

Cuando se aplique el cambio, podemos re-ejecutar la carpeta de regresión para confirmar.

Quedo atento si necesitan que revisemos algo más del lado del proxy o del dummy; por nuestra parte el comportamiento observado es coherente con la configuración actual del canal en DynamoDB/PAC.

Saludos,

[Tu nombre]

---

## Adjuntos sugeridos

| Archivo | Descripción |
|---------|-------------|
| `informe-canal-1577-llave-pac-sandbox.html` | Informe portable (lectura en navegador) |
| `informe-canal-1577-llave-pac-sandbox.md` | Misma información en Markdown |
| `canalValidacion1577.md` | Logs crudos (proxy, dummy, DynamoDB) |
| `1577-dummy-public (1).pem` | Llave pública correcta para dummy |
| `1577-publicOrlando.pem` | Llave activa al momento del análisis |

---

## Notas de tono (uso interno)

- Se describe el hallazgo con evidencia, sin atribuir culpa a una mesa ni a una persona.
- Se deja claro que la acción está en **configuración PAC** (compartida en Sandbox), no en un deploy reciente del proxy/dummy.
- Se ofrece colaboración post-cambio para validar, sin cerrar la conversación de forma defensiva.
