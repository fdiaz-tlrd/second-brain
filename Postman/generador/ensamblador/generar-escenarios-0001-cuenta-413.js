const fs = require("fs");
const path = require("path");

const root = path.join(
  __dirname,
  "../VCN Escenarios error/Metodo/0001/1_validaciones_js/1_cuenta"
);

const CASOS = [
  ["1.1_cuenta_propiedad_ausente", "propiedad ausente", {}],
  ["1.2_cuenta_null", "null", null],
  ["1.3_cuenta_string_vacio", "string vacío", ""],
  ["1.4_cuenta_tipo_number", "tipo number", 1100001328],
  ["1.5_cuenta_tipo_boolean", "tipo boolean", true],
  ["1.6_cuenta_tipo_object", "tipo object", { n: 1 }],
  ["1.7_cuenta_con_letras", "con letras", "110000132a"],
  ["1.8_cuenta_solo_espacios", "solo espacios", "     "],
  ["1.9_cuenta_espacio_interno", "espacio interno", "110000 1328"],
  [
    "1.10_cuenta_longitud_35",
    "longitud 35",
    "12345678901234567890123456789012345",
  ],
  ["1.11_cuenta_solo_tab", "solo tab", "\t"],
  ["1.12_cuenta_simbolo_arroba", "símbolo @", "123@456789"],
  ["1.13_cuenta_parentesis", "paréntesis (", "123(456789"],
  [
    "1.14_cuenta_unicode_interrogacion_apertura",
    "unicode ¿",
    "123¿456789",
  ],
  ["1.15_cuenta_comillas", 'comillas "', '123"456789'],
  ["1.16_cuenta_guion", "guión", "123-456789"],
  ["1.17_cuenta_decimal", "decimal", "123.456789"],
  ["1.18_cuenta_tipo_array", "tipo array", ["1100001328"]],
  ["1.19_cuenta_espacio_inicio", "espacio al inicio", " 1100001328"],
  ["1.20_cuenta_espacio_final", "espacio al final", "1100001328 "],
];

fs.mkdirSync(root, { recursive: true });

let total = 0;
for (const [fileBase, label, cuentaValue] of CASOS) {
  const seq = fileBase.split("_")[0].split(".")[1];
  const parametros =
    cuentaValue === undefined || fileBase.includes("propiedad_ausente")
      ? {}
      : { cuenta: cuentaValue };

  const doc = {
    nombre: `0001.1.1.${seq}. cuenta — ${label} (413)`,
    expectedHttpStatus: 200,
    expectedCodigoError: 413,
    expectedTipo: "parametro",
    algoritmoCifrado: "aes-256-cbc",
    body: {
      idCanal: "{{CANAL_EMISOR}}",
      validador: "{{CANAL_VALIDADOR}}",
      peticion: {
        idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
        metodo: "0001",
        solicitudes: [
          {
            idSolicitud: "1",
            parametros,
          },
        ],
      },
    },
  };

  fs.writeFileSync(
    path.join(root, `${fileBase}.json`),
    JSON.stringify(doc, null, 2) + "\n"
  );
  total++;
}

console.log("Wrote", total, "413 cuenta scenarios under", root);
