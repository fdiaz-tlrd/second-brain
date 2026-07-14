#!/usr/bin/env node
/**
 * Verificador local de clasificarFormatoRespuestaLambda (misma lógica que Post-response).
 * Usa logs históricos (respLambdaRaw + body) para comprobar la clasificación sin Newman.
 *
 * Uso:
 *   node verificar-formato-respuesta-lambda.js
 *   node verificar-formato-respuesta-lambda.js ../logs/resultados-por-escenario-vcn.json
 */
"use strict";

const fs = require("fs");
const path = require("path");

function clasificarFormatoRespuestaLambda(respRaw, descBody) {
  const out = {
    respuestaVinoCifrada: null,
    formatoRespuestaLambda: "sin_respuesta",
    payloadCambioTrasDescifrar: null,
  };
  const raw = respRaw == null ? "" : String(respRaw).trim();
  const desc = descBody == null ? "" : String(descBody).trim();
  if (!raw) {
    return out;
  }
  out.payloadCambioTrasDescifrar = desc.length > 0 ? raw !== desc : null;

  let parsed = null;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    out.formatoRespuestaLambda = "no_json";
    out.respuestaVinoCifrada = false;
    return out;
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    out.formatoRespuestaLambda = "desconocido";
    out.respuestaVinoCifrada = out.payloadCambioTrasDescifrar === true;
    return out;
  }

  if (typeof parsed.respuesta === "string" && parsed.respuesta.trim().length > 0) {
    out.formatoRespuestaLambda = "cifrado";
    out.respuestaVinoCifrada = true;
    return out;
  }
  if (parsed.respuesta != null && typeof parsed.respuesta === "object") {
    out.formatoRespuestaLambda = "plano_en_respuesta";
    out.respuestaVinoCifrada = false;
    return out;
  }
  if (
    parsed.codigoError != null ||
    parsed.descripcionError != null ||
    parsed.mensajeError != null
  ) {
    out.formatoRespuestaLambda = "plano";
    out.respuestaVinoCifrada = false;
    return out;
  }

  out.formatoRespuestaLambda = "desconocido";
  if (out.payloadCambioTrasDescifrar === true) {
    out.respuestaVinoCifrada = true;
  } else if (out.payloadCambioTrasDescifrar === false) {
    out.respuestaVinoCifrada = false;
  }
  return out;
}

// Casos unitarios fijos
const casos = [
  {
    nombre: "cifrado envelope string",
    raw: '{"respuesta":"aabbcc.ddeeff112233"}',
    desc: '{"respuesta":{"codigoError":431}}',
    esperadoFmt: "cifrado",
    esperadoCifrada: true,
  },
  {
    nombre: "plano codigoError raiz",
    raw: '{"codigoError":550,"descripcionError":"Error inesperado"}',
    desc: '{"codigoError":550,"descripcionError":"Error inesperado"}',
    esperadoFmt: "plano",
    esperadoCifrada: false,
  },
  {
    nombre: "plano_en_respuesta objeto",
    raw: '{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}',
    desc: '{"respuesta":{"codigoError":509,"mensajeError":"Error inesperado en validador"}}',
    esperadoFmt: "plano_en_respuesta",
    esperadoCifrada: false,
  },
  {
    nombre: "sin_respuesta vacio",
    raw: "",
    desc: "",
    esperadoFmt: "sin_respuesta",
    esperadoCifrada: null,
  },
  {
    nombre: "no_json",
    raw: "Internal server error",
    desc: "Internal server error",
    esperadoFmt: "no_json",
    esperadoCifrada: false,
  },
];

let fail = 0;
casos.forEach(function (c) {
  const r = clasificarFormatoRespuestaLambda(c.raw, c.desc);
  const ok =
    r.formatoRespuestaLambda === c.esperadoFmt &&
    r.respuestaVinoCifrada === c.esperadoCifrada;
  if (ok) {
    console.log("OK   " + c.nombre + " → " + r.formatoRespuestaLambda);
  } else {
    fail++;
    console.log(
      "FAIL " +
        c.nombre +
        " esperado " +
        c.esperadoFmt +
        "/" +
        c.esperadoCifrada +
        " recibido " +
        r.formatoRespuestaLambda +
        "/" +
        r.respuestaVinoCifrada
    );
  }
});

// Backfill sobre log histórico si existe
const logArg =
  process.argv[2] ||
  path.join(__dirname, "..", "logs", "resultados-por-escenario-vcn.json");
if (fs.existsSync(logArg)) {
  const data = JSON.parse(fs.readFileSync(logArg, "utf8"));
  const esc = data.escenarios || [];
  const counts = {};
  let mismatchHeuristica = 0;
  esc.forEach(function (e) {
    const r = clasificarFormatoRespuestaLambda(e.respLambdaRaw, e.body);
    counts[r.formatoRespuestaLambda] = (counts[r.formatoRespuestaLambda] || 0) + 1;
    // Heurística: cifrado debe cambiar body; plano no.
    if (r.formatoRespuestaLambda === "cifrado" && r.payloadCambioTrasDescifrar === false) {
      mismatchHeuristica++;
    }
    if (
      (r.formatoRespuestaLambda === "plano" || r.formatoRespuestaLambda === "plano_en_respuesta") &&
      r.payloadCambioTrasDescifrar === true
    ) {
      mismatchHeuristica++;
    }
  });
  console.log("\nBackfill " + path.basename(logArg) + " (" + esc.length + " escenarios):");
  Object.keys(counts)
    .sort()
    .forEach(function (k) {
      console.log("  " + k + ": " + counts[k]);
    });
  console.log("  mismatches estructura vs cambio-tras-descifrar: " + mismatchHeuristica);
  if (mismatchHeuristica > 0) {
    fail++;
  }
} else {
  console.log("\n(sin log histórico en " + logArg + " — solo unitarios)");
}

console.log("\n" + (fail === 0 ? "PASS" : "FAIL") + " (" + fail + " fallos)");
process.exit(fail > 0 ? 1 : 0);

module.exports = { clasificarFormatoRespuestaLambda };
