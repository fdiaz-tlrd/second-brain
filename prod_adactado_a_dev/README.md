# prod_adactado_a_dev — memoria del agente

Documentación **de lo que vayamos haciendo** en este tema. Se actualiza a medida que avanzamos.

## Idea (según el usuario)

- Preparar una versión entre comillas **"código versión de producción"**.
- Referencia de nombre: la carpeta `prod_adactado_a_dev`.

> Pendiente de aclarar con el usuario el alcance exacto (qué se adapta, de qué origen, hacia dónde).
> No se asume nada más allá de lo que el usuario indique.

## Hecho hasta ahora

| Fecha | Acción |
|-------|--------|
| 2026-07-11 | Creada carpeta vacía `c:\Users\Lenovo\GitHub\prod_adactado_a_dev` (raíz de GitHub). |
| 2026-07-11 | Creada esta carpeta de documentación `second-brain/prod_adactado_a_dev/`. |
| 2026-07-11 | Clonado `https://github.com/Telered-Autopista/tld-matriz` en `prod_adactado_a_dev/tld-matriz`. |
| 2026-07-11 | Creada rama **`prod-a-dev`** desde `main` (nombre corto, genérico, sin referencia a `tld-matriz`). |

| 2026-07-11 | Poda de `tld-matriz` en `prod-a-dev` (9 lambdas + events + template/samconfig/launch). Ver [`01-poda-tld-matriz.md`](./01-poda-tld-matriz.md). |

## Rama de trabajo

- **`prod-a-dev`** — nombre corto y genérico, pensado para **reutilizarse en otros repos**. No hace referencia a `tld-matriz`.

## Documentos

| Archivo | Contenido |
|---------|-----------|
| [01-poda-tld-matriz.md](./01-poda-tld-matriz.md) | Poda aplicada: qué se quitó/quedó, verificación, hallazgo `sam validate` preexistente |

## Pendiente

- [ ] **Decisión del usuario:** el `template.yaml` de producción tiene un error preexistente de
      `sam validate` (`AuthorizerResultTtlInSeconds` mal indentado en `TldMatriz`). ¿Corregirlo en
      `prod-a-dev` (desvía de «prod puro») o dejarlo tal cual?
- [ ] Commit de la poda en `prod-a-dev` (aún sin commitear).
- [ ] ¿Subir `prod-a-dev` al remoto? (pendiente de decisión).
