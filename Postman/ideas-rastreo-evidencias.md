# Ideas: rastreo y evidencias en pruebas Postman (propio)

Notas propias. No modificar `equipo-pruebas/` ni sus estudios: es material del equipo de pruebas, útil como referencia, no como plantilla.

Nuestro trabajo vive en [`generador/`](generador/).

---

## Qué hace el equipo de pruebas (referencia)

En la colección VCN observamos, entre otras cosas:

- Flujo Cifrar → API Matriz → Descifrar → (opcional) Bitácora.
- API de bitácora propia: `consultar-bitacora?idPeticion=` para obtener `datosBitacora`, `resumen[]`, `logsEjecucion`.
- En algunos escenarios de error capturan `x-amzn-RequestId` en consola.

Eso resuelve evidencia desde **idPeticion de negocio**, sin depender del código fuente. Es válido para ellos; nosotros podemos ir más lejos.

---

## Ventaja nuestra

Conocimiento del código fuente y del flujo real (API Matriz, validador, telemetría, logs, catálogo de códigos, etc.) permite:

- Diseñar **más escenarios** (no solo los que QA documentó).
- Correlacionar **varios identificadores** en la misma prueba.
- Validar **telemetría y logs internos**, no solo la respuesta HTTP visible.
- Mantener escenarios en **archivos separados** vía `generador/` en lugar de un JSON monolítico.

---

## Rastreo imparcial vía AWS (idea central)

API Gateway devuelve headers de infraestructura **independientes de la lógica de la API**:

| Header | Origen | Uso |
|--------|--------|-----|
| `x-amzn-RequestId` | API Gateway | ID único de la invocación en API GW. Aparece en execution/access logs como `$context.requestId`. |
| `x-amzn-Trace-Id` | X-Ray (si activo) | Trazabilidad distribuida API GW → Lambda → servicios downstream. |

### Por qué interesa

- No depende de que la API implemente bitácora ni de campos de negocio.
- Funciona en respuestas exitosas y de error.
- Es evidencia **infraestructura**, comparable entre servicios.

### Limitaciones

- Solo sirve si **logging de API Gateway** (execution/access) o **X-Ray** están habilitados en el stage.
- `x-amzn-RequestId` (API GW) ≠ `requestId` de Lambda en CloudWatch; hay que correlacionarlos (log estructurado, X-Ray, o propagación explícita en código).
- No reemplaza validación de negocio (`resultado`, códigos 510–515, etc.).

---

## Capas de evidencia (propuesta)

Combinar capas en lugar de depender de una sola:

| Capa | Identificador | Qué prueba | Dónde buscar |
|------|---------------|------------|--------------|
| Negocio | `idPeticion`, `idSolicitud` | Contrato funcional, bitácora de dominio | Respuesta descifrada, Dynamo/bitácora si aplica |
| Infraestructura | `x-amzn-RequestId` | Que la llamada pasó por API GW | CloudWatch execution/access logs |
| Trazabilidad | `x-amzn-Trace-Id` | Cadena completa de servicios | X-Ray |
| Aplicación | telemetría / logs propios | Fases internas, error real vs `statusCode`/`message` | Tabla telemetría, CloudWatch Logs Lambda |

QA suele quedarse en negocio + bitácora. Nosotros podemos cerrar el circuito hasta telemetría y logs internos.

---

## Ideas para el generador

Pendiente de implementar; lista de trabajo conceptual:

1. **Pre-request / test script común** en escenarios generados:
   - Capturar y guardar `x-amzn-RequestId` (y `x-amzn-Trace-Id` si existe) en variable de entorno o consola estructurada.
   - Guardar `idPeticion` generado en el mismo bloque de evidencia.

2. **Bloque de evidencia por escenario** (salida de test):
   ```
   idPeticion=...
   x-amzn-RequestId=...
   x-amzn-Trace-Id=... (si aplica)
   statusCode HTTP=...
   statusCode negocio=...
   ```

3. **Escenarios que QA no tiene** (ejemplos orientativos):
   - Errores de catálogo homologado (`406`, `500`, `502`, `509`, `599`) con verificación de que el detalle queda en telemetría/logs.
   - Timeout vs error inesperado del Canal Validador (`509` vs `599`).
   - Validación de que `message` es texto fijo del catálogo y el diagnóstico no sale en la respuesta externa.

4. **No replicar la API de bitácora de QA** como requisito único; usarla solo si aporta datos de dominio que no tenemos por otro canal.

5. **Documentar por colección** en `generador/` (README o nota local) qué capas de evidencia valida cada dominio (P2M, P2P, VCN futuro, etc.).

---

## Relación con `equipo-pruebas/`

| | Equipo de pruebas | Propio (`generador/`) |
|---|---|---|
| Archivo de estudio | `equipo-pruebas/.../estudio-*.md` — **no tocar** | Este archivo y notas en `generador/` |
| Colección | Monolito importado | Generada desde escenarios en carpetas |
| Rastreo | Bitácora + idPeticion; a veces RequestId | RequestId + TraceId + telemetría + más escenarios |
| Conocimiento | Contrato observable | Código fuente y flujo interno |

---

## Próximos pasos (cuando se decida)

- [ ] Confirmar qué stages tienen execution/access logging y X-Ray activos.
- [ ] Definir script de evidencia reutilizable en `generador/ensamblador/`.
- [ ] Probar búsqueda en CloudWatch con un `x-amzn-RequestId` capturado en sandbox.
- [ ] Listar escenarios VCN (u otro dominio) prioritarios para el generador propio.
