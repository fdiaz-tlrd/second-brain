const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../P2P Escenarios error/Metodo/0023/1_validaciones_js");

const qrCodeValido =
  "00020101021226580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000520400005303986540510.005802BR5925MERCHANT6009SAOPAULO62070503***6304ABCD";

const baseLeer = {
  identificador: "{{IDENTIFICADOR_CELULAR}}",
  qrCode: qrCodeValido,
};

function writeScenario(carpeta, seq, file, label, code, parametros) {
  const n = file.split("_")[0].replace(/^\d+\./, "");
  const destDir = path.join(root, carpeta);
  fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(
    path.join(destDir, `${file}.json`),
    JSON.stringify(
      {
        nombre: `0023.1.${seq}.${n}. ${carpeta.replace(/^\d+_/, "").replace(/_/g, " ")} — ${label} (${code})`,
        expectedHttpStatus: 200,
        expectedCodigoError: code,
        expectedTipo: "parametro",
        algoritmoCifrado: "aes-256-cbc",
        body: {
          idCanal: "{{CANAL_EMISOR}}",
          validador: "{{CANAL_VALIDADOR}}",
          peticion: {
            idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
            metodo: "0023",
            solicitudes: [{ idSolicitud: "1", parametros }],
          },
        },
      },
      null,
      2
    ) + "\n"
  );
}

function omit(obj, key) {
  const out = { ...obj };
  delete out[key];
  return out;
}

const grupos = [
  {
    carpeta: "1_identificador",
    seq: "1",
    items: [
      ["1.1_identificador_propiedad_ausente", "propiedad ausente", 419, { qrCode: qrCodeValido }],
      ["1.2_identificador_null", "null", 419, { ...baseLeer, identificador: null }],
      ["1.3_identificador_string_vacio", "string vacío", 419, { ...baseLeer, identificador: "" }],
      ["1.4_identificador_tipo_number", "tipo number", 409, { ...baseLeer, identificador: 69852374 }],
      ["1.5_identificador_tipo_boolean", "tipo boolean", 409, { ...baseLeer, identificador: true }],
      ["1.6_identificador_tipo_object", "tipo object", 409, { ...baseLeer, identificador: {} }],
      ["1.7_identificador_no_inicia_6", "no inicia con 6", 409, { ...baseLeer, identificador: "71234567" }],
      ["1.8_identificador_longitud_7", "longitud 7", 409, { ...baseLeer, identificador: "6123456" }],
      ["1.9_identificador_longitud_9", "longitud 9", 409, { ...baseLeer, identificador: "612345678" }],
      ["1.10_identificador_con_letras", "con letras", 409, { ...baseLeer, identificador: "6123456a" }],
      ["1.11_identificador_solo_espacios", "solo espacios", 409, { ...baseLeer, identificador: "        " }],
      ["1.12_identificador_espacio_interno", "espacio interno", 409, { ...baseLeer, identificador: "61 23456" }],
    ],
  },
  {
    carpeta: "2_qrCode",
    seq: "2",
    items: [
      ["2.1_qrCode_propiedad_ausente", "propiedad ausente", 473, omit(baseLeer, "qrCode")],
      ["2.2_qrCode_null", "null", 473, { ...baseLeer, qrCode: null }],
      ["2.3_qrCode_string_vacio", "string vacío", 473, { ...baseLeer, qrCode: "" }],
      ["2.4_qrCode_tipo_number", "tipo number", 473, { ...baseLeer, qrCode: 1 }],
      ["2.5_qrCode_tipo_boolean", "tipo boolean", 473, { ...baseLeer, qrCode: true }],
      ["2.6_qrCode_tipo_object", "tipo object", 473, { ...baseLeer, qrCode: {} }],
    ],
  },
];

let total = 0;
for (const g of grupos) {
  for (const [file, label, code, parametros] of g.items) {
    writeScenario(g.carpeta, g.seq, file, label, code, parametros);
    total++;
  }
}

console.log("Wrote", total, "scenarios under", root);
