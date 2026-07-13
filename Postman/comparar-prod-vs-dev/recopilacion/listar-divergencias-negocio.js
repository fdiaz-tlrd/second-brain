#!/usr/bin/env node
/**
 * Lista las divergencias de CODIGO DE RESPUESTA (valor del JSON: codigoError / resultado)
 * entre lo esperado por los escenarios Newman y lo recibido de produccion.
 *
 * NO trata HTTP Code (eso es transporte, ver HD-005). Aqui solo el codigo del payload.
 *
 * Fuente: logs/resultados-por-escenario-vcn.json (enriquecido con [CAPTURA]).
 * Agrupa por escenario unico (ignora repeticiones) y por patron esperado->recibido.
 *
 * Uso (desde recopilacion/):
 *   node listar-divergencias-negocio.js
 *   node listar-divergencias-negocio.js <ruta-resultados-por-escenario.json>
 *   node listar-divergencias-negocio.js <ruta.json> --md   # salida en tabla markdown
 */

const fs = require("fs");
const path = require("path");

function main() {
  const args = process.argv.slice(2);
  const md = args.includes("--md");
  const inputArg = args.find((a) => !a.startsWith("--"));
  const input =
    inputArg ||
    path.join(
      __dirname,
      "../../generador/logs/resultados-por-escenario-vcn.json"
    );

  const j = JSON.parse(fs.readFileSync(input, "utf8"));
  const escenarios = j.escenarios || [];

  const map = new Map();
  for (const e of escenarios) {
    if (!map.has(e.nombre)) {
      map.set(e.nombre, {
        nombre: e.nombre,
        ruta: e.ruta,
        tipo: e.expectedTipo,
        esp: e.codigoErrorEsperado,
        recSet: new Set(),
        bodySet: new Set(),
        n: 0,
        fail: 0,
      });
    }
    const g = map.get(e.nombre);
    g.n++;
    g.recSet.add(e.recibidoNegocio);
    if (e.body) g.bodySet.add(e.body);
    if (e.negocioCoincide === false) g.fail++;
  }

  const unicos = [...map.values()];
  const diverg = unicos
    .filter((g) => g.fail > 0)
    .sort((a, b) => a.nombre.localeCompare(b.nombre));

  if (md) {
    console.log("| Esperado | Recibido | Ruta | Escenario | Body recibido |");
    console.log("|---|---|---|---|---|");
    for (const g of diverg) {
      const rec = [...g.recSet].join("/");
      const body = [...g.bodySet][0] || "";
      console.log(
        "| " +
          g.esp +
          " | " +
          rec +
          " | " +
          g.ruta.replace("General/", "") +
          " | " +
          g.nombre +
          " | `" +
          body.replace(/\|/g, "\\|").substring(0, 90) +
          "` |"
      );
    }
    return;
  }

  console.log("Escenarios unicos:", unicos.length);
  console.log("Con divergencia de codigo de respuesta:", diverg.length);

  const patrones = new Map();
  for (const g of diverg) {
    const pk = g.esp + " -> " + [...g.recSet].join("/");
    if (!patrones.has(pk)) patrones.set(pk, []);
    patrones.get(pk).push(g.nombre);
  }
  console.log("\n=== Patrones esperado -> recibido (# escenarios) ===");
  [...patrones.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([k, v]) => console.log(String(v.length).padStart(3) + "  |  " + k));
}

main();
