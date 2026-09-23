# ALB para quien programa (sandbox Oregon)

Analogía: el ALB es un **router HTTP delante de un “socket” compartido** (las IPs del VPC endpoint de API Gateway). No es tu código Node; no conoce lambdas ni “qué API es cuál” como lo piensa SAM.

## Tres capas distintas

```
Cliente
  │  HTTPS + Host: tld-api-cuenta-nombre.sand.telered.internal
  ▼
① ALB (alb-sandbox-oregon)
  │  Mira el Host → elige regla → reenvía al mismo Target Group
  ▼
② IPs del VPC Endpoint (execute-api)  ← las 3 IPs Unhealthy
  │  “Puerta” de red hacia API Gateway privado
  ▼
③ API Gateway: custom domain + base path mapping → API + stage → Lambda
```

| Capa | Qué decide | Dónde se configura |
|------|------------|--------------------|
| ① ALB | “Si el Host es X, mando el TCP/HTTP a estas IPs” | Listener rules del ALB |
| ② VPCe | Llevar el tráfico a API Gateway en la VPC | VPC Endpoint |
| ③ Mapping | “Host X + path → API `foo` stage `bar`” | API Gateway → Custom domain names → mappings |

**El ALB no mapea dominio → API.** Solo mapea dominio → “mete el request en el mismo tubo (TG)”. El mapeo dominio→API es **solo** capa ③.

## Qué hacen las reglas que vimos

En sandbox Oregon, **todas** las reglas HTTPS con host hacen lo mismo: `forward` al TG `vpc-endpoint-apis-oregon`.

Hosts en el dump (`04-rules-listener-0.json`):

- `tld-api-alias.sand.telered.internal`
- `tld-api-mph.sand.telered.internal`
- `tld-otp.sand.telered.internal`
- `tld-api-interna-eclave.sand.telered.internal`
- `tld-api-interna.sand.telered.internal`
- `tld-api-puente.sand.telered.internal`
- `tld-img.sand.telered.internal`
- `tld-sv.sand.telered.internal`
- `tld-api-cuenta-nombre.sand.telered.internal`
- `tld-preg-seguridad.sand.telered.internal`
- `tld-notificacion.sand.telered.internal`
- `tld-validador-dummy.sand.telered.internal`
- `tld-api-p2m.sand.telered.internal`
- `tld-achx.sand.telered.internal`

Si el Host no coincide con ninguna regla → respuesta fija **503** del ALB (ni siquiera llega al VPCe).

## Health check vs tráfico real

| | Health check del TG | Request de un cliente / otra API |
|--|---------------------|----------------------------------|
| Destino | `https://10.x.x.x:443/` | `https://tld-….sand.telered.internal/…` |
| Header Host | la IP (o genérico), **no** el custom domain | el custom domain |
| Qué mide | “¿esta IP responde algo que yo acepte como 200?” | flujo completo ①→②→③ |
| En el dump | responde **403** → Unhealthy | puede ser 200 o 403 según mapping/API |

Por eso Unhealthy **no** responde a “¿qué dominio está mal mapeado?”. El check **ni usa** esos dominios.

## Tu pregunta

> ¿Puede que uno de los dominios personalizados de una regla del ALB no esté mapeado a una API?

**Sí, puede.** Y ya pasó en prod con pregunta-seguridad en Oregon: regla/balanceador mandaba el Host a Oregon, pero en API Gateway **no había mapping** → APIGW **403**, lambda **sin logs**, Alias veía 500. (Doc: `second-brain/tld-preg-seguridad/00-estado-y-retomo.md`.)

En ese caso:

1. El ALB hace bien su trabajo (regla existe → forward al TG).
2. El fallo está en capa ③ (falta mapping, path del mapping mal, resource policy, etc.).
3. **Una** API mal mapeada **no** pone Unhealthy a las 3 IPs del TG: el health check no habla con esa API por nombre. Las IPs siguen “vivas” para el check (aquí: siempre 403 en `/`).

Resumen:

| Síntoma | ¿Apunta a “falta mapping de un dominio”? |
|---------|------------------------------------------|
| 3/3 Unhealthy con 403 en health check `/` | **No** (check sin Host de dominio) |
| Llamada a `https://tld-FOO.sand…/ruta` → 403 y **cero** logs en la lambda de FOO | **Sí, candidato fuerte** (como preg-seguridad) |
| Host desconocido → 503 | Regla ALB ausente (ni llega a APIGW) |

## Cómo lo comprobarías (idea; no corrido aquí)

Por cada Host de la lista: en **API Gateway → Custom domain names** (Oregon, cuenta sandbox), ver si existe el dominio y un **API mapping** a la API/stage correctos. Eso es independiente de que el ALB tenga la regla.

**Hecho por el usuario (2026-09-23):** al menos cuatro Hosts **no** tenían mapping y los agregó — ver [`sandbox-oregon/hallazgo-mappings-y-cert.md`](sandbox-oregon/hallazgo-mappings-y-cert.md). La hipótesis era correcta.

El Unhealthy del TG es otro tema: matcher espera 200 y el VPCe contesta 403 al probe sin Host útil.

**Además (mismas notas):** el certificado ACM del listener HTTPS del ALB (`24db24a6-…`) figura **Caducada** en la UI; el dump CLI muestra ese ARN en el listener. Capa distinta (TLS cliente→ALB), no el health check del TG.
