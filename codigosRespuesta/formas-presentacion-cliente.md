# Formas de presentación al cliente

No hay un número fijo de formas. Hay **contratos de payload** distintos: el cliente debe leer propiedades concretas. Si el contrato dice `mensajeError` y la respuesta trae `descripcionError`, **no es lo mismo** — son palabras (claves) diferentes, como Cursor ≠ Grok.

## Contratos conocidos (hoy)

### `A.mensajeError`

```json
{
  "codigoError": "400",
  "mensajeError": "Error en la petición original"
}
```

### `A.descripcionError`

```json
{
  "codigoError": "400",
  "descripcionError": "Error en la petición original"
}
```

Aunque el texto coincida, el cliente que busca `mensajeError` **no** encuentra `descripcionError`. Son dos presentaciones distintas. En Newman: `presentacionForma` = `A.mensajeError` | `A.descripcionError` (y `presentacionCampoTexto` lo repite).

### `A` (sin campo de texto)

Hay `codigoError` pero ningún campo de mensaje reconocido.

### `B` — método / negocio

```json
{
  "idPeticion": "TLRDPAPA0000101",
  "respuestas": [
    {
      "idSolicitud": "1",
      "resultado": 0,
      "datos": null
    }
  ]
}
```

Código en `respuestas[0].resultado`. Sin texto de catálogo en el payload típico.

### `C` — cajón de desconocidos

No JSON, vacío, o shape que no encaja en A.* ni B. No es “la tercera forma de negocio”: es lo que aún no nombramos.

## ¿Y si hay más?

Sí. Otros nombres de campo (`A.message`, …) u otros shapes se descubren en **patrones únicos**. Cuando un patrón se estabiliza, se nombra y pasa a columna en la foto. Las columnas de la foto son **dinámicas** según lo observado en la corrida.

## Cable vs payload útil

| Campo Newman | Rol |
|--------------|-----|
| `respuestaVinoCifrada` / `formatoRespuestaLambda` | Envelope en el **cable** |
| `presentacionForma` (`A.mensajeError`, `A.descripcionError`, `B`, `C`, …) | Contrato del **JSON útil** |

## Foto por servicio

```powershell
node extraer-foto-presentacion.js logs/resultados-por-escenario-vcn.json
node extraer-foto-presentacion.js logs/resultados-por-escenario-p2p.json
```

Columnas por contrato observado, p. ej. `| A.mensajeError | A.descripcionError | B | C |` con `x`/`-`. Si el mismo código+texto aparece bajo **ambos** campos de error, la fila marca `x` en las dos columnas: ahí se ve el problema de contrato.
