# Oregon sandbox — health Unhealthy

## Que podes decir sin quedar mal

**Hecho (dump):** el health check pega a la IP del VPCe, recibe **403**, el matcher solo acepta **200** → Unhealthy.

**Hecho:** Virginia, mismo tipo de TG, acepta **200-403** → Healthy.

**Hecho:** Unhealthy en el TG de Oregon **no** es el mecanismo que “manda el trafico a Virginia”. Virginia y Oregon son ALBs/regiones distintas; el primario lo define el diseno de arriba (DNS/failover), no ese health.

**Hecho:** Unhealthy **tampoco** prueba que Oregon “no enruta” si alguien llega alla (con todos unhealthy el ALB puede seguir mandando).

## Que NO digas (te deja mal)

- “Esta Unhealthy a proposito para forzar failover a Virginia.”
- “Hay que cambiar el matcher a 200-403” (sin orden del proveedor / arquitectura).

## Que si digas si preguntan “¿lo tocamos?”

“No toco el matcher sin OK del proveedor. Asi esta. El Unhealthy es el check (403 vs matcher 200), no un diagnostico de que las APIs sand en Oregon esten caidas.”

## Certificado

Tema aparte del health. Cert del listener caducado: si aplica renovar, eso si es TLS real, no “poner verde la consola”.
