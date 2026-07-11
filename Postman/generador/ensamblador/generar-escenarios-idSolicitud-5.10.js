#!/usr/bin/env node
/**
 * Genera escenarios 5.10–5.26 en P2P, P2M y VCN (paridad).
 * Ver: ../validacion-idSolicitud/ITERACION-01-escenarios-error-regex.md
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const SUITES = {
  p2p: {
    dir: "P2P Escenarios error",
    metodo: "0002",
    parametros: { tipoIdentificador: "CELULAR" },
  },
  p2m: {
    dir: "P2M Escenarios error",
    metodo: "0015",
    parametros: {
      identificador: "{{IDENTIFICADOR_COMERCIO_NO_REGISTRADO}}",
      tipoIdentificador: "COMERCIO",
    },
  },
  vcn: {
    dir: "VCN Escenarios error",
    metodo: "0001",
    parametros: { cuenta: "{{CUENTA_VALIDA}}" },
  },
};

const ESCENARIOS = [
  { n: "10", slug: "guion_bajo", label: "guion bajo", idSolicitud: "id_001" },
  { n: "11", slug: "espacio_interno", label: "espacio interno", idSolicitud: "id 001" },
  { n: "12", slug: "espacio_inicio", label: "espacio al inicio", idSolicitud: " abc" },
  { n: "13", slug: "espacio_fin", label: "espacio al final", idSolicitud: "abc " },
  { n: "14", slug: "arroba", label: "arroba", idSolicitud: "id@001" },
  { n: "15", slug: "punto", label: "punto", idSolicitud: "id.001" },
  { n: "16", slug: "unicode", label: "unicode", idSolicitud: "id¿001" },
  { n: "17", slug: "barra", label: "barra", idSolicitud: "id/001" },
  { n: "18", slug: "comillas", label: "comillas", idSolicitud: 'id"001' },
  { n: "19", slug: "elemento_null", label: "elemento null en arreglo", special: "elemento_null" },
  { n: "20", slug: "idSolicitud_null", label: "idSolicitud null", idSolicitud: null },
  { n: "21", slug: "tipo_boolean_true", label: "idSolicitud tipo boolean true", idSolicitud: true },
  { n: "22", slug: "tipo_boolean_false", label: "idSolicitud tipo boolean false", idSolicitud: false },
  { n: "23", slug: "solo_guiones", label: "solo guiones", idSolicitud: "---" },
  { n: "24", slug: "guion_unico", label: "un solo guion", idSolicitud: "-" },
  { n: "25", slug: "tipo_object", label: "idSolicitud tipo object", idSolicitud: { x: 1 } },
  { n: "26", slug: "tipo_array", label: "idSolicitud tipo array", idSolicitud: ["1"] },
];

function buildSolicitudes(esc) {
  if (esc.special === "elemento_null") {
    return [null];
  }
  return [
    {
      idSolicitud: esc.idSolicitud,
      parametros: null,
    },
  ];
}

function buildScenario(suiteKey, esc) {
  const suite = SUITES[suiteKey];
  const solicitudes = buildSolicitudes(esc);
  solicitudes.forEach(function (s) {
    if (s && typeof s === "object") {
      s.parametros = { ...suite.parametros };
    }
  });

  return {
    nombre: "1.5." + esc.n + ". solicitudes — " + esc.label + " (431)",
    expectedHttpStatus: 400,
    expectedCodigoError: 431,
    expectedTipo: "general",
    algoritmoCifrado: "aes-256-cbc",
    body: {
      idCanal: "{{CANAL_EMISOR}}",
      validador: "{{CANAL_VALIDADOR}}",
      peticion: {
        metodo: suite.metodo,
        solicitudes: solicitudes,
        idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
      },
    },
  };
}

let written = 0;
Object.keys(SUITES).forEach(function (suiteKey) {
  const baseDir = path.join(
    ROOT,
    SUITES[suiteKey].dir,
    "General",
    "1_validaciones_js",
    "5_solicitudes"
  );
  fs.mkdirSync(baseDir, { recursive: true });
  ESCENARIOS.forEach(function (esc) {
    const fileName = "5." + esc.n + "_solicitudes_idSolicitud_" + esc.slug + ".json";
    const filePath = path.join(baseDir, fileName);
    const json = buildScenario(suiteKey, esc);
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n", "utf8");
    written++;
    console.log("OK " + suiteKey + " " + fileName);
  });
});

console.log("\n" + written + " archivos escritos (" + ESCENARIOS.length + " x " + Object.keys(SUITES).length + " suites)");
