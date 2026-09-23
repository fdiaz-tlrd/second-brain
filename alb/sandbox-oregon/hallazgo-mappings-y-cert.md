# Hallazgo — mappings APIGW faltantes + certificado ALB caducado

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-23 (notas del usuario) |
| **Fuente** | `second-brain/investigacion/ALB/sandbox.md` (solo lectura) |
| **Región** | `us-west-2` sandbox |

## 1. Custom domains sin mapping (capa ③) — el usuario los corrigió

Había regla en el ALB (capa ①) pero **sin** API mapping en API Gateway. El usuario agregó mapping:

| Dominio | API mapeada | Etapa |
|---------|-------------|-------|
| `tld-otp.sand.telered.internal` | `tld-otp` | `sandbox` |
| `tld-notificacion.sand.telered.internal` | `tld-notificacion` | `sandbox` |
| `tld-api-alias.sand.telered.internal` | `tld-alias-api` | `sandbox` |
| `tld-achx.sand.telered.internal` | `tld-achx` | `sandbox` |

Esto **confirma** la pregunta del estudio: sí, un Host en regla ALB puede no tener mapping. Mismo patrón que preg-seguridad Oregon en prod.

**No** se afirma aquí que el resto de Hosts del listener ya tenían mapping; solo estos cuatro constan en las notas.

## 2. Certificado del listener HTTPS — caducado

En la UI del ALB (notas del usuario), certificados asociados al agente HTTPS:443:

| Certificado | Dominio principal | Estado (UI) | Vencimiento (UI) |
|-------------|-------------------|-------------|------------------|
| `8dc32993-…` | `apigatesb.telered.com.pa` | Válido | 2026-12-02 |
| `24db24a6-…` | `tld-api-interna.sand.telered.internal` (SAN: 17) | **Caducada** | **2025-11-22** |

En el dump CLI (`03-listeners.json`), el listener HTTPS del ALB trae **solo**:

`arn:aws:acm:us-west-2:807262913923:certificate/24db24a6-bba3-4ef0-9953-5667dac8583f`

Es decir: el certificado que el listener **está usando** es el marcado **Caducada** en la UI.

Eso es independiente del Unhealthy por 403 del health check y de los mappings: afecta el **handshake TLS** al entrar al ALB con los nombres cubiertos por ese cert (p. ej. `*.sand.telered.internal` si están en los SAN).

## Relación con Unhealthy del TG

| Tema | ¿Explica 3/3 Unhealthy (403 en `/`)? |
|------|--------------------------------------|
| Mappings faltantes (corregidos) | **No** — el health check no usa esos Hosts |
| Cert caducado en listener | **No** — ver abajo |

### ¿El cert expirado causa el 403 del health check?

**No.** Son dos conexiones TLS distintas:

```
Cliente  ──TLS──►  ALB (aquí usa el cert del listener: 24db24a6, caducado)
ALB      ──TLS──►  IP del TG / VPCe   ← health check
                      │
                      └─ ya hubo respuesta HTTP 403
```

- Si fallara el TLS del probe (cert del **target** no confiable, etc.), el motivo típico **no** sería `Target.ResponseCodeMismatch` con códigos `[403]`.
- `ResponseCodeMismatch` + `[403]` significa: el ALB **completó** el HTTP del check y el destino **contestó status 403**. Eso es capa aplicación (APIGW/VPCe rechaza `GET /` sin Host útil), no “certificado del listener vencido”.
- El cert caducado del listener sí puede romper o alertar a **clientes que entran al ALB** (navegador/curl hacia `tld-*.sand…`). Eso es otro síntoma, otro tramo.

Son **tres** problemas distintos en el mismo estudio: health check/matcher, mappings APIGW, cert ACM del listener.
