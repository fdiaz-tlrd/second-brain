# Catálogo de preguntas de seguridad — método `0005`

Referencia del listado fijo que devuelve P2P al consultar preguntas del sistema.

Los `id` son **dos dígitos numéricos** (`01` … `15` hoy; a futuro se pueden añadir `16`, `17`, …).

## Request (ejemplo)

```json
{
  "idCanal": "1000",
  "validador": "0001",
  "peticion": {
    "idPeticion": "TLRDPAPA00000000001783748814",
    "metodo": "0005",
    "solicitudes": [
      {
        "idSolicitud": "1",
        "parametros": {
          "banco": "TLRDPAPA"
        }
      }
    ]
  }
}
```

## Response (ejemplo — extracto `preguntas`)

| id | texto (resumido) |
|----|------------------|
| 01 | Primera mascota |
| 02 | Calle donde creciste |
| 03 | Mejor amigo infancia |
| 04 | Película favorita |
| 05 | Primer maestro |
| 06 | Ciudad favorita visitar |
| 07 | Primer jefe |
| 08 | Libro favorito |
| 09 | Primer colegio |
| 10 | Comida favorita |
| 11 | Primer coche |
| 12 | Cantante/banda favorita |
| 13 | Héroe infancia |
| 14 | Deporte favorito |
| 15 | Restaurante favorito |

## Uso en otros métodos

| Método | Campo | Rol |
|--------|-------|-----|
| **0004** | `idPregunta` | Validar respuesta del usuario contra una pregunta ya guardada |
| **0006** | `respuestas[].id` | Alta: elegir preguntas del catálogo y guardar respuestas (`id` + `texto`) |

Validación JS (capa 428/455): formato `^[0-9]{2}$`.  
Validación de negocio (API preguntas, código **420**): el `id` existe en catálogo y la respuesta corresponde.
