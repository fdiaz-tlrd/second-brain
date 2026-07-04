const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../P2P Escenarios error/Metodo/0009/1_validaciones_js");

const baseIdent = {
  identificador: "{{IDENTIFICADOR_CELULAR}}",
  tipoIdentificador: "CELULAR",
};

function escenario(carpeta, seq, file, label, code, parametros) {
  const n = file.split("_")[0].replace(/^\d+\./, "");
  return {
    dir: path.join(root, carpeta),
    file: `${file}.json`,
    doc: {
      nombre: `0009.1.${seq}.${n}. ${carpeta.replace(/^\d+_/, "").replace(/_/g, " ")} — ${label} (${code})`,
      expectedHttpStatus: 200,
      expectedCodigoError: code,
      expectedTipo: "parametro",
      algoritmoCifrado: "aes-256-cbc",
      body: {
        idCanal: "{{CANAL_EMISOR}}",
        validador: "{{CANAL_VALIDADOR}}",
        peticion: {
          idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
          metodo: "0009",
          solicitudes: [{ idSolicitud: "1", parametros }],
        },
      },
    },
  };
}

const grupos = [
  {
    carpeta: "1_identificador",
    seq: "1",
    items: [
      ["1.1_identificador_propiedad_ausente", "propiedad ausente", 419, { tipoIdentificador: "CELULAR" }],
      ["1.2_identificador_null", "null", 419, { ...baseIdent, identificador: null }],
      ["1.3_identificador_string_vacio", "string vacío", 419, { ...baseIdent, identificador: "" }],
      ["1.4_identificador_tipo_number", "tipo number", 409, { ...baseIdent, identificador: 69852374 }],
      ["1.5_identificador_tipo_boolean", "tipo boolean", 409, { ...baseIdent, identificador: true }],
      ["1.6_identificador_tipo_object", "tipo object", 409, { ...baseIdent, identificador: {} }],
      ["1.7_identificador_no_inicia_6", "no inicia con 6", 409, { ...baseIdent, identificador: "71234567" }],
      ["1.8_identificador_longitud_7", "longitud 7", 409, { ...baseIdent, identificador: "6123456" }],
      ["1.9_identificador_longitud_9", "longitud 9", 409, { ...baseIdent, identificador: "612345678" }],
      ["1.10_identificador_con_letras", "con letras", 409, { ...baseIdent, identificador: "6123456a" }],
      ["1.11_identificador_solo_espacios", "solo espacios", 409, { ...baseIdent, identificador: "        " }],
      ["1.12_identificador_espacio_interno", "espacio interno", 409, { ...baseIdent, identificador: "61 23456" }],
    ],
  },
  {
    carpeta: "2_tipoIdentificador",
    seq: "2",
    items: [
      ["2.1_tipoIdentificador_propiedad_ausente", "propiedad ausente", 419, { identificador: "{{IDENTIFICADOR_CELULAR}}" }],
      ["2.2_tipoIdentificador_null", "null", 419, { ...baseIdent, tipoIdentificador: null }],
      ["2.3_tipoIdentificador_string_vacio", "string vacío", 419, { ...baseIdent, tipoIdentificador: "" }],
      ["2.4_tipoIdentificador_tipo_number", "tipo number", 410, { ...baseIdent, tipoIdentificador: 1 }],
      ["2.5_tipoIdentificador_tipo_boolean", "tipo boolean", 410, { ...baseIdent, tipoIdentificador: true }],
      ["2.6_tipoIdentificador_tipo_object", "tipo object", 410, { ...baseIdent, tipoIdentificador: {} }],
      ["2.7_tipoIdentificador_valor_incorrecto_comercio", "valor incorrecto COMERCIO", 410, { ...baseIdent, tipoIdentificador: "COMERCIO" }],
      ["2.8_tipoIdentificador_valor_minusculas", "valor minúsculas", 410, { ...baseIdent, tipoIdentificador: "celular" }],
      ["2.9_tipoIdentificador_solo_espacios", "solo espacios", 410, { ...baseIdent, tipoIdentificador: "   " }],
    ],
  },
];

let total = 0;
for (const g of grupos) {
  fs.mkdirSync(path.join(root, g.carpeta), { recursive: true });
  for (const [file, label, code, parametros] of g.items) {
    const e = escenario(g.carpeta, g.seq, file, label, code, parametros);
    fs.writeFileSync(path.join(e.dir, e.file), JSON.stringify(e.doc, null, 2) + "\n");
    total++;
  }
}

console.log("Wrote", total, "scenarios under", root);
