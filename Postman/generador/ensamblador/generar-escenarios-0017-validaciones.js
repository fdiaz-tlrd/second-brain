const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "../P2M Escenarios error/Metodo/0017/1_validaciones_js");

const baseIdent = {
  identificador: "{{IDENTIFICADOR_CELULAR}}",
  tipoIdentificador: "CELULAR",
};

const baseCantidad = {
  ...baseIdent,
  busquedaCantidad: 10,
};

function escenario(metodo, carpeta, seq, file, label, code, parametros) {
  return {
    dir: path.join(root, carpeta),
    file: `${file}.json`,
    doc: {
      nombre: `${metodo}.1.${seq}. ${carpeta.replace(/^\d+_/, "").replace(/_/g, " ")} — ${label} (${code})`,
      expectedHttpStatus: 200,
      expectedCodigoError: code,
      expectedTipo: "parametro",
      algoritmoCifrado: "aes-256-cbc",
      body: {
        idCanal: "{{CANAL_EMISOR}}",
        validador: "{{CANAL_VALIDADOR}}",
        peticion: {
          idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
          metodo: "0017",
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
  {
    carpeta: "3_busquedaCantidad",
    seq: "3",
    items: [
      ["3.1_busquedaCantidad_propiedad_ausente", "propiedad ausente", 451, { ...baseIdent }],
      ["3.2_busquedaCantidad_null", "null", 451, { ...baseIdent, busquedaCantidad: null }],
      ["3.3_busquedaCantidad_string_vacio", "string vacío", 451, { ...baseIdent, busquedaCantidad: "" }],
      ["3.4_busquedaCantidad_tipo_boolean", "tipo boolean", 451, { ...baseIdent, busquedaCantidad: true }],
      ["3.5_busquedaCantidad_string_no_numerico", "string no numérico", 451, { ...baseIdent, busquedaCantidad: "abc" }],
      ["3.6_busquedaCantidad_cero", "cero", 451, { ...baseIdent, busquedaCantidad: 0 }],
      ["3.7_busquedaCantidad_mayor_25", "mayor a 25", 451, { ...baseIdent, busquedaCantidad: 26 }],
      ["3.8_busquedaCantidad_decimales", "decimales", 451, { ...baseIdent, busquedaCantidad: 10.5 }],
      ["3.9_busquedaCantidad_negativo", "negativo", 451, { ...baseIdent, busquedaCantidad: -1 }],
    ],
  },
  {
    carpeta: "4_mcc",
    seq: "4",
    items: [
      ["4.1_mcc_tipo_number", "tipo number", 447, { ...baseCantidad, mcc: 5411 }],
      ["4.2_mcc_no_digitos", "no dígitos ABCD", 447, { ...baseCantidad, mcc: "ABCD" }],
      ["4.3_mcc_longitud_3", "longitud 3", 447, { ...baseCantidad, mcc: "541" }],
    ],
  },
  {
    carpeta: "5_busquedaIdentificadorComercio",
    seq: "5",
    items: [
      ["5.1_busquedaIdentificadorComercio_tipo_number", "tipo number", 452, { ...baseCantidad, busquedaIdentificadorComercio: 1 }],
      ["5.2_busquedaIdentificadorComercio_longitud_2", "longitud 2", 452, { ...baseCantidad, busquedaIdentificadorComercio: "ab" }],
      ["5.3_busquedaIdentificadorComercio_especiales", "caracteres especiales", 452, { ...baseCantidad, busquedaIdentificadorComercio: "end@" }],
    ],
  },
  {
    carpeta: "6_busquedaNombreComercio",
    seq: "6",
    items: [
      ["6.1_busquedaNombreComercio_tipo_number", "tipo number", 478, { ...baseCantidad, busquedaNombreComercio: 1 }],
      ["6.2_busquedaNombreComercio_longitud_81", "longitud 81", 478, { ...baseCantidad, busquedaNombreComercio: "A".repeat(81) }],
      ["6.3_busquedaNombreComercio_simbolo_arroba", "símbolo arroba (ISO)", 478, { ...baseCantidad, busquedaNombreComercio: "com@test" }],
      ["6.4_busquedaNombreComercio_ampersand", "ampersand (ISO)", 478, { ...baseCantidad, busquedaNombreComercio: "Comercio & Hijos" }],
      ["6.5_busquedaNombreComercio_guion_bajo", "guión bajo (ISO)", 478, { ...baseCantidad, busquedaNombreComercio: "Comercio_test" }],
      ["6.6_busquedaNombreComercio_interrogacion_apertura", "interrogación apertura (ISO)", 478, { ...baseCantidad, busquedaNombreComercio: "¿Comercio?" }],
    ],
  },
  {
    carpeta: "7_busquedaPaginaToken",
    seq: "7",
    items: [
      ["7.1_busquedaPaginaToken_no_json", "no es JSON", 453, { ...baseCantidad, busquedaPaginaToken: "no-es-json" }],
      ["7.2_busquedaPaginaToken_tipo_number", "tipo number", 453, { ...baseCantidad, busquedaPaginaToken: 1 }],
      ["7.3_busquedaPaginaToken_json_null", "JSON null", 453, { ...baseCantidad, busquedaPaginaToken: "null" }],
      ["7.4_busquedaPaginaToken_json_primitivo", "JSON primitivo", 453, { ...baseCantidad, busquedaPaginaToken: "123" }],
    ],
  },
];

let total = 0;
for (const g of grupos) {
  fs.mkdirSync(path.join(root, g.carpeta), { recursive: true });
  for (const [file, label, code, parametros] of g.items) {
    const n = file.split("_")[0].replace(/^\d+\./, "");
    const e = escenario("0017", g.carpeta, `${g.seq}.${n}`, file, label, code, parametros);
    fs.writeFileSync(path.join(e.dir, e.file), JSON.stringify(e.doc, null, 2) + "\n");
    total++;
  }
}

console.log("Wrote", total, "scenarios under", root);
