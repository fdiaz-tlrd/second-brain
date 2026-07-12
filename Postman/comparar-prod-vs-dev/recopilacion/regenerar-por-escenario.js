#!/usr/bin/env node
/**
 * Reconstruye un `*_por-escenario.json` ENRIQUECIDO (con HTTP real/esperado y
 * negocio esperado/recibido) a partir de un `*_completo.json` de Newman ya existente.
 *
 * Reutiliza los helpers de run-newman.js (no duplica lógica). Sirve para runs viejos
 * que se guardaron antes de que run-newman capturara el HTTP real.
 *
 * Uso:
 *   node regenerar-por-escenario.js <completo.json> <codigoFuente> <nivelEjecucion> <salida.json>
 */

const fs = require("fs");
const path = require("path");
const rn = require("../../generador/run-newman.js");

function main() {
  const [input, codigoFuente, nivel, salida] = process.argv.slice(2);
  if (!input || !salida) {
    console.error(
      "Uso: node regenerar-por-escenario.js <completo.json> <codigoFuente> <nivelEjecucion> <salida.json>"
    );
    process.exit(1);
  }
  const abs = function (p) {
    return path.isAbsolute(p) ? p : path.join(process.cwd(), p);
  };
  const summary = JSON.parse(fs.readFileSync(abs(input), "utf8"));
  const res = rn.buildResultadosPorEscenario(
    "vcn",
    "(regenerado)",
    summary,
    codigoFuente || "prod",
    "regenerado desde completo.json",
    nivel || "desconocido"
  );
  const out = abs(salida);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(res, null, 2), "utf8");
  console.log(
    "Escrito: " + out + " (" + res.escenarios.length + " ejecuciones, con HTTP real)"
  );
}

main();
