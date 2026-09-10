# Conectores

## Tiempos
Estos componentes son los encargados de la conexión con las API Rest externas. Para conectarse con HUB, Ach Xpress y Banco Destino

| Componente                                   | Tiempo  |
|----------------------------------------------|---------|
| INTERHUB Conector con HUB                    | 25 días |
| INTERHUB Conector con Ach Xpress             | 19 días |
| Sistema LBTR de Telered (Conversion archivo) | 10 días |
| Validador Proxy (Conector con Banco Destino) |  5 días |
| Subtotal:                                    | 59 días |


## INTERHUB Conector con HUB
```mermaid
sequenceDiagram
    autonumber

    %% Declaración de actores
    participant call as Consumidor
    participant lambda@{ type: "control", label: "tld-interhub-hub" }
    participant dynamoConfig@{ type: "database", label: "tld-interhub-hub-config" }
    participant s3@{ type: "collections", label: "tld-interhub-achx-mtls" }
    participant dynamoTrace@{ type: "database", label: "tld-interhub-hub-trace" }
    participant dynamoToken@{ type: "database", label: "tld-interhub-hub-token" }
    participant HUB@{ type: "boundary", label: "HUB" }

    %% Flujo de interacciones
    call->>lambda: Consulta (pacs.008 | pacs.002)

    lambda->>lambda: Validar estructura del mensaje
    lambda->>lambda: Determinar tipo de mensaje

    lambda->>dynamoConfig: Obtener configuración del HUB
    dynamoConfig-->>lambda: URL, timeouts y parámetros de integración

    lambda->>s3: Obtener certificados mTLS
    s3-->>lambda: Certificado, llave privada y cadena de confianza

    lambda->>dynamoTrace: Registrar solicitud

    lambda->>dynamoToken: Consultar token vigente

    alt Token vigente
        dynamoToken-->>lambda: Access token válido
    else Token expirado o inexistente
        dynamoToken-->>lambda: Token expirado o no encontrado

        lambda->>HUB: Solicitar access token
        HUB-->>lambda: Access token

        lambda->>dynamoToken: Persistir access token
    end

    lambda->>HUB: Enviar mensaje
    HUB-->>lambda: Respuesta de la operación

    lambda->>dynamoTrace: Registrar respuesta

    lambda-->>call: Respuesta
```



## INTERHUB Conector con Ach Xpress
```mermaid
sequenceDiagram
    autonumber

    %% Declaración de actores
    participant call as Consumidor
    participant lambda@{ type: "control", label: "tld-interhub-ach" }
    participant dynamoConfig@{ type: "database", label: "tld-interhub-ach-config" }
    participant dynamoTrace@{ type: "database", label: "tld-interhub-ach-trace" }
    participant dynamoToken@{ type: "database", label: "tld-interhub-ach-token" }
    participant ACH@{ type: "boundary", label: "ACH Xpress" }

    %% Flujo de interacciones
    call->>lambda: Consulta | pacs.008 | pacs.002

    lambda->>lambda: Validar estructura del mensaje
    lambda->>lambda: Determinar tipo de mensaje

    lambda->>dynamoConfig: Obtener configuración del ACH
    dynamoConfig-->>lambda: URL, timeouts y parámetros de integración

    lambda->>dynamoTrace: Registrar solicitud

    lambda->>dynamoToken: Consultar token vigente

    alt Token vigente
        dynamoToken-->>lambda: Access token válido
    else Token expirado o inexistente
        dynamoToken-->>lambda: Token expirado o no encontrado

        lambda->>ACH: Solicitar access token
        ACH-->>lambda: Access token

        lambda->>dynamoToken: Persistir access token
    end

    lambda->>ACH: Enviar mensaje
    ACH-->>lambda: Respuesta de la operación

    lambda->>dynamoTrace: Registrar respuesta

    lambda-->>call: Respuesta
```


## Sistema LBTR de Telered (Conversion archivo)

## Validador Proxy



