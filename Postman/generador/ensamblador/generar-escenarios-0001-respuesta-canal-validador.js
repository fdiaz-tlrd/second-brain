const fs = require("fs");
const path = require("path");

const root = path.join(
  __dirname,
  "../VCN Escenarios error/Metodo/0001/2_respuestaCanalValidador"
);

const catalogo = JSON.parse(
  fs.readFileSync(path.join(__dirname, "catalogoGeneral.json"), "utf8")
);

const VALIDADORES = [
  ["1008", "CELEGATO"],
  ["1009", "ASTRGATO"],
  ["1011", "MIRAGATO"],
  ["1012", "TERAGATO"],
  ["1013", "AMIYGATO"],
  ["1014", "CORNGATO"],
  ["1015", "ZONAGATO"],
  ["1016", "BELLGATO"],
];

const CODIGOS = [
  [510, "5000000510", "1.510_cuenta_incorrecta"],
  [511, "5000000511", "2.511_cuenta_cerrada"],
  [512, "5000000512", "3.512_cuenta_bloqueada"],
  [513, "5000000513", "4.513_transaccion_no_permitida"],
  [514, "5000000514", "5.514_falta_info_consulta"],
  [515, "5000000515", "6.515_razon_regulatoria"],
];

let total = 0;

for (const [validador, swift] of VALIDADORES) {
  const dir = path.join(root, validador);
  fs.mkdirSync(dir, { recursive: true });

  for (const [code, cuenta, fileBase] of CODIGOS) {
    const label = catalogo[String(code)];
    const seq = fileBase.split("_")[0].split(".")[1];
    const doc = {
      nombre: `0001.2.${validador}.${seq}. validador ${swift} — ${label} (${code})`,
      expectedHttpStatus: 200,
      expectedCodigoError: code,
      expectedTipo: "metodo",
      algoritmoCifrado: "aes-256-cbc",
      body: {
        idCanal: "{{CANAL_EMISOR}}",
        validador,
        peticion: {
          idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
          metodo: "0001",
          solicitudes: [
            {
              idSolicitud: "1",
              parametros: { cuenta },
            },
          ],
        },
      },
    };
    fs.writeFileSync(
      path.join(dir, `${fileBase}.json`),
      JSON.stringify(doc, null, 2) + "\n"
    );
    total++;
  }
}

console.log("Wrote", total, "scenarios under", root);
