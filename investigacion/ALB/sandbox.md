# Gateway de API
## Nombres de dominio personalizados

### tld-otp.sand.telered.internal

ARN del nombre de dominio: arn:aws:apigateway:us-west-2::/domainnames/tld-otp.sand.telered.internal

No tenia mapping, le puse el mapping
API: tld-otp
Etapa: sandbox

### tld-notificacion.sand.telered.internal

ARN del nombre de dominio: arn:aws:apigateway:us-west-2::/domainnames/tld-notificacion.sand.telered.internal

No tenia mapping, le puse el mapping
API: tld-notificacion
Etapa: sandbox

### tld-api-alias.sand.telered.internal

ARN del nombre de dominio: arn:aws:apigateway:us-west-2::/domainnames/tld-api-alias.sand.telered.internal

No tenia mapping, le puse el mapping
API: tld-alias-api
Etapa: sandbox


### tld-achx.sand.telered.internal

ARN del nombre de dominio: arn:aws:apigateway:us-west-2::/domainnames/tld-achx.sand.telered.internal

No tenia mapping, le puse el mapping
API: tld-achx
Etapa: sandbox


# EC2
## Balanceadores de carga
### alb-sandbox-oregon
#### Agente de escucha HTTPS:443

| ID certificado                        | Nombre o dominio                      | Estado   | SAN | Vencimiento                                | Servicio | ARN                                                                                 | Tipo               |
|---------------------------------------|---------------------------------------|----------|-----|--------------------------------------------|----------|-------------------------------------------------------------------------------------|--------------------|
| 8dc32993-37d8-4d53-adbc-4bacccdbd957  | apigatesb.telered.com.pa              | Válido   | 3   | 2 de diciembre de 2026, 18:59 (UTC-05:00)  | ACM      | arn:aws:acm:us-west-2:807262913923:certificate/8dc32993-37d8-4d53-adbc-4bacccdbd957 | Emitido por Amazon |
| 24db24a6-bba3-4ef0-9953-5667dac8583f  | tld-api-interna.sand.telered.internal | Caducada | 17  | 22 de noviembre de 2025, 10:09 (UTC-05:00) | ACM      | arn:aws:acm:us-west-2:807262913923:certificate/24db24a6-bba3-4ef0-9953-5667dac8583f | Importado          |



