const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../P2M Escenarios error/Metodo/0019/1_validaciones_js");

const baseIdent = {
  identificador: "{{IDENTIFICADOR_CELULAR}}",
  tipoIdentificador: "CELULAR",
};

const baseP2m = {
  ...baseIdent,
  p2mPagoId: "{{P2M_PAGO_ID_NO_EXISTE}}",
};

const baseEstado = {
  ...baseP2m,
  estadoCargo: "Aprobado",
};

function write(carpeta, seq, file, label, code, parametros) {
  const n = file.split("_")[0].split(".")[1];
  const doc = {
    nombre: `0019.1.${seq}.${n}. ${carpeta.replace(/^\d+_/, "").replace(/_/g, " ")} — ${label} (${code})`,
    expectedHttpStatus: 200,
    expectedCodigoError: code,
    expectedTipo: "parametro",
    algoritmoCifrado: "aes-256-cbc",
    body: {
      idCanal: "{{CANAL_EMISOR}}",
      validador: "{{CANAL_VALIDADOR}}",
      peticion: {
        idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
        metodo: "0019",
        solicitudes: [{ idSolicitud: "1", parametros }],
      },
    },
  };
  const dir = path.join(root, carpeta);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${file}.json`), JSON.stringify(doc, null, 2) + "\n");
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
  {
    carpeta: "3_p2mPagoId",
    seq: "3",
    items: [
      ["3.1_p2mPagoId_propiedad_ausente", "propiedad ausente", 458, { ...baseIdent }],
      ["3.2_p2mPagoId_null", "null", 458, { ...baseIdent, p2mPagoId: null }],
      ["3.3_p2mPagoId_string_vacio", "string vacío", 458, { ...baseIdent, p2mPagoId: "" }],
      ["3.4_p2mPagoId_solo_espacios", "solo espacios", 458, { ...baseIdent, p2mPagoId: "   " }],
      ["3.5_p2mPagoId_tipo_number", "tipo number", 458, { ...baseIdent, p2mPagoId: 1 }],
      ["3.6_p2mPagoId_tipo_boolean", "tipo boolean", 458, { ...baseIdent, p2mPagoId: true }],
      ["3.7_p2mPagoId_tipo_object", "tipo object", 458, { ...baseIdent, p2mPagoId: {} }],
      ["3.8_p2mPagoId_formato_incorrecto", "formato incorrecto", 458, { ...baseIdent, p2mPagoId: "ABC123" }],
      ["3.9_p2mPagoId_sin_prefijo_p2m", "sin prefijo P2M", 458, { ...baseIdent, p2mPagoId: "00000000000000000000000000000000" }],
      ["3.10_p2mPagoId_hex_corto", "hex corto", 458, { ...baseIdent, p2mPagoId: "P2M0000000000000000000000000000000" }],
    ],
  },
  {
    carpeta: "4_estadoCargo",
    seq: "4",
    items: [
      ["4.1_estadoCargo_propiedad_ausente", "propiedad ausente", 459, { ...baseP2m }],
      ["4.2_estadoCargo_null", "null", 459, { ...baseP2m, estadoCargo: null }],
      ["4.3_estadoCargo_string_vacio", "string vacío", 459, { ...baseP2m, estadoCargo: "" }],
      ["4.4_estadoCargo_tipo_number", "tipo number", 459, { ...baseP2m, estadoCargo: 1 }],
      ["4.5_estadoCargo_tipo_boolean", "tipo boolean", 459, { ...baseP2m, estadoCargo: true }],
      ["4.6_estadoCargo_valor_invalido", "valor inválido", 459, { ...baseP2m, estadoCargo: "Pendiente" }],
      ["4.7_estadoCargo_valor_minusculas", "valor minúsculas", 459, { ...baseP2m, estadoCargo: "aprobado" }],
      ["4.8_estadoCargo_solo_espacios", "solo espacios", 459, { ...baseP2m, estadoCargo: "   " }],
    ],
  },
];

let total = 0;
for (const g of grupos) {
  for (const [file, label, code, parametros] of g.items) {
    write(g.carpeta, g.seq, file, label, code, parametros);
    total++;
  }
}

console.log("Wrote", total, "scenarios under", root);
