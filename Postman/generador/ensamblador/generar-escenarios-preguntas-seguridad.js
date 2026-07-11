#!/usr/bin/env node
/**
 * Escenarios exhaustivos idPregunta (0004) y respuestas[].id (0006).
 * Ver: ../validacion-preguntas-seguridad/ITERACION-01-idPregunta-y-respuestas-id.md
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DIR_0004 = path.join(
  ROOT,
  "P2P Escenarios error",
  "Metodo",
  "0004",
  "1_validaciones_js",
  "3_idPregunta"
);
const DIR_0006 = path.join(
  ROOT,
  "P2P Escenarios error",
  "Metodo",
  "0006",
  "1_validaciones_js",
  "3_respuestas"
);

const PARAMS_0004 = {
  identificador: "{{IDENTIFICADOR_CELULAR}}",
  tipoIdentificador: "CELULAR",
  idPregunta: "01",
  respuesta: "respuesta01",
  banco: "{{SWIFT_CANAL_EMISOR}}",
  cuenta: "1234567890",
  producto: "PACA",
};

const PARAMS_0006 = {
  identificador: "{{IDENTIFICADOR_CELULAR}}",
  tipoIdentificador: "CELULAR",
  respuestas: [
    { id: "01", texto: "respuesta01" },
    { id: "02", texto: "respuesta02" },
  ],
  banco: "{{SWIFT_CANAL_EMISOR}}",
  cuenta: "1234567890",
  producto: "PACA",
};

const ESCENARIOS_ID_PREGUNTA = [
  { n: "10", slug: "guion_bajo", label: "guion bajo", idPregunta: "0_1" },
  { n: "11", slug: "punto", label: "punto", idPregunta: "01.2" },
  { n: "12", slug: "barra", label: "barra", idPregunta: "01/2" },
  { n: "13", slug: "comillas", label: "comillas", idPregunta: '01"' },
  { n: "14", slug: "unicode", label: "unicode", idPregunta: "0¿1" },
  { n: "15", slug: "espacio_inicio", label: "espacio al inicio", idPregunta: " 01" },
  { n: "16", slug: "espacio_fin", label: "espacio al final", idPregunta: "01 " },
  { n: "17", slug: "un_digito", label: "un solo dígito", idPregunta: "1" },
  { n: "18", slug: "tres_digitos", label: "tres dígitos", idPregunta: "001" },
  { n: "19", slug: "letras", label: "solo letras", idPregunta: "ab" },
  { n: "20", slug: "tipo_array", label: "tipo array", idPregunta: ["01"] },
  { n: "21", slug: "tipo_boolean_false", label: "tipo boolean false", idPregunta: false },
  { n: "22", slug: "guion_unico", label: "un solo guion", idPregunta: "-" },
];

const ESCENARIOS_RESPUESTAS = [
  { n: "17", slug: "id_guion_bajo", label: "id guion bajo", id: "0_1" },
  { n: "18", slug: "id_arroba", label: "id arroba", id: "0@1" },
  { n: "19", slug: "id_espacio_interno", label: "id espacio interno", id: "01 2" },
  { n: "20", slug: "id_espacio_inicio", label: "id espacio al inicio", id: " 01" },
  { n: "21", slug: "id_espacio_fin", label: "id espacio al final", id: "01 " },
  { n: "22", slug: "id_unicode", label: "id unicode", id: "0¿1" },
  { n: "23", slug: "id_punto", label: "id punto", id: "01.2" },
  { n: "24", slug: "id_barra", label: "id barra", id: "01/2" },
  { n: "25", slug: "id_comillas", label: "id comillas", id: '01"' },
  { n: "26", slug: "id_un_digito", label: "id un solo dígito", id: "1" },
  { n: "27", slug: "id_tres_digitos", label: "id tres dígitos", id: "001" },
  { n: "28", slug: "id_letras", label: "id solo letras", id: "ab" },
  { n: "29", slug: "id_tipo_boolean_true", label: "id tipo boolean true", id: true },
  { n: "30", slug: "id_tipo_boolean_false", label: "id tipo boolean false", id: false },
  { n: "31", slug: "id_tipo_object", label: "id tipo object", id: { x: 1 } },
  { n: "32", slug: "id_tipo_array", label: "id tipo array", id: ["01"] },
  { n: "33", slug: "elemento_null", label: "elemento null en arreglo", special: "elemento_null" },
  { n: "34", slug: "texto_solo_espacios", label: "texto solo espacios", id: "01", texto: "   " },
];

function build0004(esc) {
  const parametros = { ...PARAMS_0004, idPregunta: esc.idPregunta };
  return {
    nombre: "0004.1.3." + esc.n + ". idPregunta — " + esc.label + " (428)",
    expectedHttpStatus: 200,
    expectedCodigoError: 428,
    expectedTipo: "parametro",
    algoritmoCifrado: "aes-256-cbc",
    body: {
      idCanal: "{{CANAL_EMISOR}}",
      validador: "{{CANAL_VALIDADOR}}",
      peticion: {
        idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
        metodo: "0004",
        solicitudes: [{ idSolicitud: "1", parametros }],
      },
    },
  };
}

function build0006(esc) {
  const parametros = { ...PARAMS_0006 };
  if (esc.special === "elemento_null") {
    parametros.respuestas = [null, { id: "02", texto: "respuesta02" }];
  } else {
    parametros.respuestas = [
      { id: esc.id, texto: esc.texto != null ? esc.texto : "respuesta01" },
      { id: "02", texto: "respuesta02" },
    ];
  }
  return {
    nombre: "0006.1.3." + esc.n + ". respuestas — " + esc.label + " (455)",
    expectedHttpStatus: 200,
    expectedCodigoError: 455,
    expectedTipo: "parametro",
    algoritmoCifrado: "aes-256-cbc",
    body: {
      idCanal: "{{CANAL_EMISOR}}",
      validador: "{{CANAL_VALIDADOR}}",
      peticion: {
        idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
        metodo: "0006",
        solicitudes: [{ idSolicitud: "1", parametros }],
      },
    },
  };
}

function build0006Duplicado() {
  const parametros = {
    ...PARAMS_0006,
    respuestas: [
      { id: "01", texto: "respuesta01" },
      { id: "01", texto: "respuesta02" },
    ],
  };
  return {
    nombre: "0006.1.3.15. respuestas — id duplicado (455)",
    expectedHttpStatus: 200,
    expectedCodigoError: 455,
    expectedTipo: "parametro",
    algoritmoCifrado: "aes-256-cbc",
    body: {
      idCanal: "{{CANAL_EMISOR}}",
      validador: "{{CANAL_VALIDADOR}}",
      peticion: {
        idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
        metodo: "0006",
        solicitudes: [{ idSolicitud: "1", parametros }],
      },
    },
  };
}

function writeJson(dir, fileName, obj) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, fileName), JSON.stringify(obj, null, 2) + "\n", "utf8");
  console.log("OK " + fileName);
}

ESCENARIOS_ID_PREGUNTA.forEach(function (esc) {
  writeJson(DIR_0004, "3." + esc.n + "_idPregunta_" + esc.slug + ".json", build0004(esc));
});

ESCENARIOS_RESPUESTAS.forEach(function (esc) {
  writeJson(DIR_0006, "3." + esc.n + "_respuestas_" + esc.slug + ".json", build0006(esc));
});

writeJson(DIR_0006, "3.15_respuestas_id_duplicado.json", build0006Duplicado());

console.log("\nEscenarios idPregunta: " + ESCENARIOS_ID_PREGUNTA.length + ", respuestas: " + ESCENARIOS_RESPUESTAS.length + " + fix 3.15");
