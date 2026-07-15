| Código | Nueva descripción | Etiquetas | Descripción en Marketplace para Cuenta Nombre | Observación en Marketplace para Cuenta Nombre | Descripción en Marketplace para Xpress | Observación en Marketplace para Xpress | Descripción en Marketplace para R2P | Observación en Marketplace para R2P |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | Operación exitosa |  | Operación exitosa | Validación sin inconvenientes. | Operación exitosa | Validación sin inconvenientes. | Operación exitosa | Validación sin inconvenientes. |
| 400 | Error en la petición original |  | - Error de formato en campo validador - Error de formato en campo canal - Error de formato en campo petición | - Error de formato en campo validador - Error de formato en campo canal - Error de formato en campo petición | Error en la petición original | - Error de formato en campo validador - Error de formato en campo canal - Error de formato en campo petición | Error en la petición original | -Error de formato en campo validador  -Error de formato en campo canal -Error de formato en campo petición |
| 401 | Canal emisor no existe |  | Canal emisor no existe | Canal emisor no existe | Canal emisor no existe | Canal emisor no existe | Canal emisor no existe | Canal emisor no existe |
| 402 | Canal validador no disponible |  | Canal validador no disponible | Canal validador no disponible |  |  |  |  |
| 403 | Canal emisor no tiene un plan de suscripción |  |  |  |  |  |  |  |
| 404 | Validador no existe |  | Validador no existe | Validador no existe | Validador no existe | Validador no existe | Validador no existe | Validador no existe |
| 405 | Error en descifrado canal emisor |  | - Error en cifrado canal emisor - Error en descifrado canal emisor | - Error en cifrado canal emisor - Error en descifrado canal emisor | Error en cifrado canal emisor Error en descifrado canal emisor Usuario no posee respuestas asignadas | - Error en cifrado canal emisor - Error en descifrado canal emisor - Usuario no posee respuestas asignadas | Error en cifrado canal emisor Error en descifrado canal emisor Usuario no posee respuestas asignadas | - Error en cifrado canal emisor - Error en descifrado canal emisor - Usuario no posee respuestas asignadas |
| 406 | Error en descifrado canal validador |  | - Error en cifrado canal validador - Error en descifrado canal validador | - Error en cifrado canal validador - Error en descifrado canal validador |  |  |  |  |
| 407 | Identificador del alias no se encuentra registrado |  |  |  | Alias no existe | Identificador o Alias no existe en el directorio. | Alias no existe | Identificador o Alias no existe en el directorio. |
| 408 | Identificador del alias ya está registrado en el directorio |  |  |  | Alias ya se encuentra registrado | Identificador o Alias ya está registrado en el directorio. | Alias ya se encuentra registrado | Identificador o Alias ya está registrado en el directorio. |
| 409 | Error al validar el parámetro identificador |  |  |  | Error en formato del campo “identificador” | El identificador o alias no cumple con lo esperado. -Largo de 8 dígitos | Error en formato del campo “identificador” | El identificador o alias no cumple con lo esperado. -Largo de 8 dígitos |
| 410 | Error al validar el parámetro tipoIdentificador |  |  |  | Campo “tipoIdentificador” incorrecto | El identificador o alias no cumple con lo esperado. | Campo “tipoIdentificador” incorrecto | El identificador o alias no cumple con lo esperado. |
| 411 | Identificador del alias dado de baja |  |  |  | Alias dado de baja | Cuando el identificador o alias se le dio de baja | Alias dado de baja | Cuando el identificador o alias se le dio de baja |
| 412 | El valor del parámetro banco no corresponde al canal |  | - El Banco no corresponde al canal | - Cuando el código Swift no corresponde con el canal registrado. | El Banco no corresponde al canal |  | El Banco no corresponde al canal |  |
| 413 | Error al validar el parámetro cuenta |  | - Error número de cuenta no cumple con los criterios | - Cuando la cuenta es inferior o superior al largo del ecosistema: Largo de 1 a 34, numérico | Error número de cuenta no cumple con los criterios | Cuando la cuenta es inferior o superior al largo del ecosistema: -Largo de 1 a 34, numérico | Error número de cuenta no cumple con los criterios | Cuando la cuenta es inferior o superior al largo del ecosistema: Longitud mínima  5 y máxima 34, numérico |
| 414 | Error al validar el parámetro banco |  |  |  | Código de banco no cumple con los criterios | Cuando banco no cumple con: -largo 8 y literal, | Código de banco no cumple con los criterios | Cuando banco no cumple con: -largo 8 y literal, |
| 415 | El parámetros id es requerido |  |  |  | ID alias es requerido | Cuando no se incluye el identificador o alias y es requerido. | ID alias es requerido | Cuando no se incluye el identificador o alias y es requerido. |
| 416 | Identificador del alias no se encuentra registrado |  |  |  | ID alias no registrado | Cuando un alias no está registrado. | ID alias no registrado | Cuando un alias no está registrado. |
| 417 | Error al actualizar alias |  |  |  | Error al actualizar alias | Cuando fallar la actualización del número de cuenta vinculado al identificador o alias. | Error al actualizar alias | Cuando fallar la actualización del número de cuenta vinculado al identificador o alias. |
| 418 | Método no soportado por el validador |  | - Método no soportado | - Si envía un método distinto al esperado. (0001) | Método no soportado | Cuando se hace petición a un método inexistente. | Método no soportado | Cuando se hace petición a un método inexistente. |
| 419 | Los parámetros identificador y tipoIdentificador son requeridos |  |  |  | Los campos identificador y tipoIdentificador son requeridos | Se esperan los campos identificador y tipoIdentificador | Los campos identificador y tipoIdentificador son requeridos | Se esperan los campos identificador y tipoIdentificador |
| 420 | El parámetro respuesta no corresponde a una respuesta válida para la pregunta de seguridad indicada en idPregunta |  |  |  | Respuestas invalidas | La combinación del idPregunta y respuesta no coincide con la que tenemos guardada, y no se ha alcanzado el límite de intentos fallidos consecutivos | Respuestas invalidas | La combinación del idPregunta y respuesta no coincide con la que tenemos guardada, y no se ha alcanzado el límite de intentos fallidos consecutivos |
| 421 | Error al validar el parámetro producto |  |  |  | Error en el formato del producto | Cuando producto no cumple con: -largo 4 y literal | Error en el formato del producto | Cuando producto no cumple con: -largo 4 y literal |
| 422 | Error al dar de baja alias |  |  |  | Error al dar de baja Alias | Cuando falla el dar de baja un identificador o alias. | Error al dar de baja Alias | Cuando falla el dar de baja un identificador o alias. |
| 423 | Identificador del alias ya se encuentra registrado para el banco |  |  |  | Alias existente en banco | Identificador o alias ya está registrado para ese banco | Alias existente en banco | Identificador o alias ya está registrado para ese banco |
| 424 | Identificador de alias ya alcanzo la cantidad máxima de bancos asociados |  |  |  | Cantidad de bancos al máximo | Se registro el máximo de bancos permitido. | Cantidad de bancos al máximo | Se registro el máximo de bancos permitido. |
| 425 | Cantidad de solicitudes no permitidas |  |  |  | Cantidad de solicitudes no permitidas | Cuando se solicita más de un identificador. Método Verificar identificador | Cantidad de solicitudes no permitidas | Cuando se solicita más de un identificador. Método Verificar identificador |
| 426 | Tipo de baja no soportada |  |  |  | Tipo de Baja no soportada | Cuando el tipo de baja no corresponde a la especificación | Tipo de Baja no soportada | Cuando el tipo de baja no corresponde a la especificación |
| 427 | Arreglo de respuestas ausente o su contenido es inválido |  |  |  | Arreglo de respuestas ausente o su contenido es invalido. | Cuando - No recibió el parámetro - Error de formato - Los id que envió no corresponda a los que se entregaron en el método 0005 | Arreglo de respuestas ausente o su contenido es invalido. | Cuando - No recibió el parámetro - Error de formato - Los id que envió no corresponda a los que se entregaron en el método 0005 |
| 428 | Error al validar el parámetro idPregunta |  |  |  | campo idPregunta no cumple con los criterios | Cuando - No se recibió el parámetro - El valor del parámetro no era un alfanumérico | campo idPregunta no cumple con los criterios | Cuando - No se recibió el parámetro - El valor del parámetro no era un alfanumérico |
| 429 | Error al validar el parámetro respuesta |  |  |  | campo respuesta no cumple con los criterios | Cuando  - No se recibió el parámetro - El valor del parámetro no era un alfanumérico | campo respuesta no cumple con los criterios | Cuando  - No se recibió el parámetro - El valor del parámetro no era un alfanumérico |
| 430 | Se superó el límite de intentos fallidos en las preguntas de seguridad |  |  |  | Alias bloqueado por lìmite de intentos fallidos en las preguntas de seguridad | - La combinación del idPregunta y respuesta no coincide con la que tenemos guardada, y se ha alcanzado el límite de intentos fallidos consecutivos - El usuario está bloqueado en el sistema de preguntas de seguridad | Alias bloqueado por lìmite de intentos fallidos en las preguntas de seguridad | - La combinación del idPregunta y respuesta no coincide con la que tenemos guardada, y se ha alcanzado el límite de intentos fallidos consecutivos - El usuario está bloqueado en el sistema de preguntas de seguridad |
| 431 | Campo idSolicitud no cumple con los criterios |  |  |  |  |  |  |  |
| 432 | Error al validar el parámetro ciudadComercio |  |  |  |  |  |  |  |
| 433 | El canal validador asociado al identificador del alias ya no se encuentra disponible |  |  |  |  |  |  |  |
| 434 | Campo identificador no corresponde a los datos registrados |  |  |  |  |  |  |  |
| 435 | Error al validar el parámetro bancoAcreedor |  |  |  |  |  |  |  |
| 436 | Error al validar el parámetro nombreAcreedor |  |  |  |  |  |  |  |
| 437 | Error al validar el parámetro descripcion |  |  |  |  |  |  |  |
| 438 | Identificador del comercio ya se encuentra registrado para el banco |  |  |  |  |  |  |  |
| 439 | Identificador del comercio ya se encuentra registrado |  |  |  |  |  |  |  |
| 440 | Identificador del comercio registrado anteriormente para el banco |  |  |  |  |  |  |  |
| 441 | Identificador del comercio no registrado |  |  |  |  |  |  |  |
| 442 | El identificador del comercio debe corresponder a un comercio activo o suspendido, para poder ser actualizado |  |  |  |  |  |  |  |
| 443 | Error al validar el parámetro estado |  |  |  |  |  |  |  |
| 444 | Error al validar el parámetro id |  |  |  |  |  |  |  |
| 445 | El prefijo Código SWIFT del idPeticion no coincide con el canal emisor |  |  |  |  |  |  |  |
| 446 | Error al validar el parámetro nombreComercio |  |  |  |  |  |  |  |
| 447 | Error al validar el parámetro mcc |  |  |  |  |  |  |  |
| 448 | El mcc no se encuentra registrado |  |  |  |  |  |  |  |
| 449 | Error al validar el parámetro logo |  |  |  |  |  |  |  |
| 450 | Error al validar el parámetro correo |  |  |  |  |  |  |  |
| 451 | Error al validar el parámetro busquedaCantidad |  |  |  |  |  |  |  |
| 452 | Error al validar el parámetro busquedaIdentificadorComercio |  |  |  |  |  |  |  |
| 453 | Error al validar el parámetro busquedaPaginaToken |  |  |  |  |  |  |  |
| 454 | El identificador del comercio debe corresponder a un comercio activo |  |  |  |  |  |  |  |
| 455 | Error al validar el parámetro respuestas |  |  |  |  |  |  |  |
| 456 | Error al validar el parámetro montoBase |  |  |  |  |  |  |  |
| 457 | Error al calcular mdr para el mcc del Comercio |  |  |  |  |  |  |  |
| 458 | Error al validar el parámetro p2mPagoId |  |  |  |  |  |  |  |
| 459 | Error al validar el parámetro estadoCargo |  |  |  |  |  |  |  |
| 460 | El parámetro monto debe ser la suma de los parámetros montoBase, impuesto y propina |  |  |  |  |  |  |  |
| 461 | El p2mPagoId no se encuentra registrado |  |  |  |  |  |  |  |
| 462 | Error al validar el parámetro fechaVencimiento |  |  |  |  |  |  |  |
| 463 | Error al validar el parámetro cantidadLecturas |  |  |  |  |  |  |  |
| 464 | Error al validar el parámetro qrTipo |  |  |  |  |  |  |  |
| 465 | Error al validar el parámetro monto |  |  |  |  |  |  |  |
| 466 | Error al validar el parámetro impuesto |  |  |  |  |  |  |  |
| 467 | Error al validar el parámetro propina |  |  |  |  |  |  |  |
| 468 | Error al validar el parámetro tipo |  |  |  |  |  |  |  |
| 469 | El valor del parámetro qrCode no corresponde a un código QR válido |  |  |  |  |  |  |  |
| 470 | QR no existe |  |  |  |  |  |  |  |
| 471 | QR vencido |  |  |  |  |  |  |  |
| 472 | Error al validar el parámetro canalPago |  |  |  |  |  |  |  |
| 473 | Error al validar el parámetro qrCode |  |  |  |  |  |  |  |
| 474 | Error al validar el parámetro moneda |  |  |  |  |  |  |  |
| 475 | El p2mPagoId no puede corresponder a una Solicitud de Pago procesada |  |  |  |  |  |  |  |
| 476 | QR superó cantidad de lecturas |  |  |  |  |  |  |  |
| 477 | No se encuentra disponible el identificador del acreedor del QR |  |  |  | No se encuentra disponible el identificador del acreedor del QR. | Método 0023 (Leer QR). Tras interpretar el QR con éxito: el acreedor (identificador y banco del QR) no está disponible en el directorio P2P. |  |  |
| 478 | Error al validar el parámetro busquedaNombreComercio |  |  |  |  |  |  |  |
| 479 | Error al validar el parámetro identificadorComercio |  |  |  |  |  |  |  |
| 480 | No se admite el tipo de identificador con el que se generó el QR |  |  |  | No se admite el tipo de identificador con el que se generó el QR. | Método 0023 (Leer QR). Tras leer el QR con éxito: tipoIdentificadorAcreedor distinto de CELULAR. |  |  |
| 481 | Método inválido |  |  |  |  |  |  |  |
| 482 | Método no disponible para el Canal Emisor |  |  |  |  |  |  |  |
| 500 | Error interno |  | Petición de validación no es válida | Inconvenientes en la validación del mensaje. | Error interno Error consultando alias Error actualizando alias Error al consultar alias por banco Error buscando identificador Error validando alias Error validando cuenta nombre Error consultando operaciones Error creando alias Error al consumir api-validador Consultando id alias | Errores que pueden ser recibidos para todos los métodos. | Error interno Error consultando alias Error actualizando alias Error al consultar alias por banco Error buscando identificador Error validando alias Error validando cuenta nombre Error consultando operaciones Error creando alias Error al consumir api-validador Consultando id alias | Errores que pueden ser recibidos para todos los métodos. |
| 501 | Error en cifrado para el canal emisor |  |  |  |  |  |  |  |
| 502 | Error en cifrado para el canal validador |  |  |  |  |  |  |  |
| 503 |  |  |  |  |  |  |  |  |
| 504 |  |  | Petición de validación no existe | Cuenta no existe. | Petición de validación no existe | Cuando idPeticion no coincide con lo registrado en la autopista. | Petición de validación no existe | Cuando idPeticion no coincide con lo registrado en la autopista. |
| 505 |  |  |  |  |  |  |  |  |
| 506 | Código HTTP de OAuth 2.0 (`/auth/token`); no se usa en el catálogo `resultado` para evitar confusiones | Reservado — no usar |  |  |  |  |  |  |
| 507 |  |  |  |  |  |  |  |  |
| 508 |  |  |  |  |  |  |  |  |
| 509 | Error inesperado en el Canal Validador |  | Error inesperado en validador | Error recibido es los escenarios de time-out o tiempo de espera agotado | Error inesperado en validador | Error recibido es los escenarios de time-out o tiempo de espera agotado | Error inesperado en validador | Error recibido es los escenarios de time-out o tiempo de espera agotado |
| 510 | Número de cuenta incorrecta | Reservado para Canal Validador | Número de cuenta incorrecta | Contiene un formato de cuenta inválido o la cantidad de números de la cuenta es incorrecta. |  |  |  |  |
| 511 | Número de cuenta cerrado | Reservado para Canal Validador | Número de cuenta cerrado | La cuenta del Recibidor ha sido cerrada. |  |  |  |  |
| 512 | Número de cuenta bloqueado | Reservado para Canal Validador | Número de cuenta bloqueado | La cuenta del Recibidor se encuentra restringida en la Institución Financiera Recibidora, por ello la consulta es rechazada. |  |  |  |  |
| 513 | Transacción no permitida | Reservado para Canal Validador | Transacción no permitida | Restricción que mantienen algunos participantes de la red, para originar o recibir consultas. |  |  |  |  |
| 514 | Falta información obligatoria de consulta | Reservado para Canal Validador | Falta información obligatoria de consulta | No se proporcionó información obligatoria para consultar. |  |  |  |  |
| 515 | Razón regulatoria | Reservado para Canal Validador | Razón regulatoria | Por motivos legales o de cumplimiento. |  |  |  |  |
| 550 |  |  | Error inesperado | Error inesperado |  |  |  |  |
| 599 | Tiempo de espera agotado al llamar al Canal Validador |  | Error inesperado en validador | Canal Validador no pudo enviar respuesta. | Error inesperado en validador | Error inesperado | Error inesperado en validador | Error inesperado |
| 999 |  |  | Error inesperado validación | Error inesperado validación | Error inesperado validación | Error inesperado | Error inesperado validación | Error inesperado |
