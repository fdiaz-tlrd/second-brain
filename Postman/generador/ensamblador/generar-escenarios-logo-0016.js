const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const outDir = path.join(__dirname, "../P2M Escenarios error/Metodo/0016/1_validaciones_js/9_logo");

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
    }
  }
  return ~c >>> 0;
}

function pngChunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function createPng(width, height, padBytes = 0) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const row = Buffer.alloc(1 + width * 3, 0x7a);
  row[0] = 0;
  const raw = Buffer.concat(Array.from({ length: height }, () => row));
  const idat = zlib.deflateSync(raw);

  const chunks = [pngChunk("IHDR", ihdr), pngChunk("IDAT", idat)];
  if (padBytes > 0) {
    const keyword = Buffer.from("Comment\0", "ascii");
    const text = Buffer.alloc(padBytes, 0x41);
    chunks.push(pngChunk("tEXt", Buffer.concat([keyword, text])));
  }
  chunks.push(pngChunk("IEND", Buffer.alloc(0)));
  return Buffer.concat([signature, ...chunks]);
}

function createGif(width, height) {
  const header = Buffer.alloc(13);
  header.write("GIF89a", 0, "ascii");
  header.writeUInt16LE(width, 6);
  header.writeUInt16LE(height, 8);
  header[10] = 0xf7;
  header[11] = 0;
  header[12] = 0;

  const gct = Buffer.alloc(3 * 128, 0);
  gct[0] = 0xff;
  gct[1] = 0xff;
  gct[2] = 0xff;

  const imageDesc = Buffer.alloc(10);
  imageDesc[0] = 0x2c;
  imageDesc.writeUInt16LE(0, 1);
  imageDesc.writeUInt16LE(0, 3);
  imageDesc.writeUInt16LE(width, 5);
  imageDesc.writeUInt16LE(height, 7);
  imageDesc[9] = 0;

  const minCodeSize = Buffer.from([0x02]);
  const pixels = Buffer.alloc(width * height, 0x01);
  const subBlocks = [];
  let offset = 0;
  while (offset < pixels.length) {
    const n = Math.min(255, pixels.length - offset);
    subBlocks.push(Buffer.from([n]));
    subBlocks.push(pixels.subarray(offset, offset + n));
    offset += n;
  }
  subBlocks.push(Buffer.from([0x00]));
  const trailer = Buffer.from([0x3b]);

  return Buffer.concat([header, gct, imageDesc, minCodeSize, ...subBlocks, trailer]);
}

// WEBP mínimo válido (RIFF + WEBP); formato detectado como webp
const WEBP_MINIMO = Buffer.from(
  "UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAQAcJaQAA3AA/vuUAAA=",
  "base64"
);

const fixtures = {
  png100x100: createPng(100, 100).toString("base64"),
  gif90x90: createGif(90, 90).toString("base64"),
  webp90: WEBP_MINIMO.toString("base64"),
  png90Mayor100kb: createPng(90, 90, 103000).toString("base64"),
};

const envPath = path.join(__dirname, "../entornos/P2M Escenarios error - desarrollo.postman_environment.json");
const logoValido = JSON.parse(fs.readFileSync(envPath, "utf8")).values.find((v) => v.key === "LOGO_VALIDO_BASE64").value;
const pngTruncado = logoValido.slice(0, 200);

const baseParametros = {
  identificador: "{{IDENTIFICADOR_COMERCIO_NO_REGISTRADO}}",
  tipoIdentificador: "COMERCIO",
  banco: "{{SWIFT_CANAL_EMISOR}}",
  cuenta: "0000123456",
  producto: "PACA",
  nombreComercio: "QA Test",
  correo: "qa@test.com",
  mcc: "7299",
};

const escenarios = [
  { n: "1", file: "9.1_logo_propiedad_ausente", label: "propiedad ausente", parametros: { ...baseParametros } },
  { n: "2", file: "9.2_logo_null", label: "null", parametros: { ...baseParametros, logo: null } },
  { n: "3", file: "9.3_logo_string_vacio", label: "string vacío", parametros: { ...baseParametros, logo: "" } },
  { n: "4", file: "9.4_logo_solo_espacios", label: "solo espacios", parametros: { ...baseParametros, logo: "   " } },
  { n: "5", file: "9.5_logo_tipo_number", label: "tipo number", parametros: { ...baseParametros, logo: 1 } },
  { n: "6", file: "9.6_logo_tipo_boolean", label: "tipo boolean", parametros: { ...baseParametros, logo: true } },
  { n: "7", file: "9.7_logo_tipo_object", label: "tipo object", parametros: { ...baseParametros, logo: {} } },
  { n: "8", file: "9.8_logo_base64_corrupto", label: "base64 corrupto", parametros: { ...baseParametros, logo: "NoEsBase64Valido!!!" } },
  { n: "9", file: "9.9_logo_no_es_imagen", label: "no es imagen", parametros: { ...baseParametros, logo: "dGV4dG8gcGxhbm8=" } },
  { n: "10", file: "9.10_logo_png_truncado", label: "PNG truncado", parametros: { ...baseParametros, logo: pngTruncado } },
  { n: "11", file: "9.11_logo_dimensiones_100x100", label: "dimensiones 100x100", parametros: { ...baseParametros, logo: fixtures.png100x100 } },
  { n: "12", file: "9.12_logo_formato_gif", label: "formato GIF", parametros: { ...baseParametros, logo: fixtures.gif90x90 } },
  { n: "13", file: "9.13_logo_formato_webp", label: "formato WEBP", parametros: { ...baseParametros, logo: fixtures.webp90 } },
  { n: "14", file: "9.14_logo_tamano_mayor_100kb", label: "tamaño mayor 100 KB", parametros: { ...baseParametros, logo: fixtures.png90Mayor100kb } },
];

fs.mkdirSync(outDir, { recursive: true });

for (const e of escenarios) {
  const doc = {
    nombre: `0016.1.9.${e.n}. logo — ${e.label} (449)`,
    expectedHttpStatus: 200,
    expectedCodigoError: 449,
    expectedTipo: "parametro",
    algoritmoCifrado: "aes-256-cbc",
    body: {
      idCanal: "{{CANAL_EMISOR}}",
      validador: "{{CANAL_VALIDADOR}}",
      peticion: {
        idPeticion: "{{SWIFT_CANAL_EMISOR}}{{$timestamp}}",
        metodo: "0016",
        solicitudes: [{ idSolicitud: "1", parametros: e.parametros }],
      },
    },
  };
  fs.writeFileSync(path.join(outDir, `${e.file}.json`), JSON.stringify(doc, null, 2) + "\n");
}

const verify = (label, b64) => {
  const buf = Buffer.from(b64, "base64");
  console.log(label, "bytes", buf.length);
};

verify("png100x100", fixtures.png100x100);
verify("gif90x90", fixtures.gif90x90);
verify("png90>100kb", fixtures.png90Mayor100kb);
console.log("Wrote", escenarios.length, "scenarios to", outDir);
