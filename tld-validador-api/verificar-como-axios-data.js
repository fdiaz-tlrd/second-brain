#!/usr/bin/env node
/**
 * Verifica que invoke + strip statusCode reproduzca lo que prod validador-api ve con axios.data.
 * Uso: node verificar-como-axios-data.js
 */

function normalizarRespuestaInvokeAlias(parsed) {
  if (parsed == null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return parsed;
  }
  if (typeof parsed.body === "string" && Number.isFinite(Number(parsed.statusCode))) {
    const http = Number(parsed.statusCode);
    const statusCode = Number.isFinite(http) ? Math.trunc(http) : 500;
    let inner = {};
    if (parsed.body.trim() !== "") {
      inner = JSON.parse(parsed.body);
    }
    return { statusCode, ...inner };
  }
  return parsed;
}

function comoAxiosData(parsed) {
  if (parsed == null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return parsed;
  }
  if (!Object.prototype.hasOwnProperty.call(parsed, "statusCode")) {
    return parsed;
  }
  const { statusCode: _http, ...inner } = parsed;
  return inner;
}

function wrapComoValidadorApi(data) {
  const r = data?.respuesta ?? data;
  return { respuesta: r };
}

const casos = [
  {
    nombre: "éxito invoke (salidaLambda)",
    invoke: { statusCode: 200, respuesta: "cifrado-base64" },
    prodAxiosData: { respuesta: "cifrado-base64" },
  },
  {
    nombre: "error 509 invoke",
    invoke: { statusCode: 200, codigoError: 509, mensajeError: "Timeout validador" },
    prodAxiosData: { codigoError: 509, mensajeError: "Timeout validador" },
  },
  {
    nombre: "envelope API GW en invoke",
    invoke: {
      statusCode: 200,
      body: JSON.stringify({ codigoError: 406, mensajeError: "Descifrado" }),
    },
    prodAxiosData: { codigoError: 406, mensajeError: "Descifrado" },
  },
];

let ok = 0;
let fail = 0;

for (const c of casos) {
  const normalized = normalizarRespuestaInvokeAlias(c.invoke);
  const data = comoAxiosData(normalized);
  const haciaMatriz = wrapComoValidadorApi(data);
  const haciaMatrizProd = wrapComoValidadorApi(c.prodAxiosData);
  const igualData = JSON.stringify(data) === JSON.stringify(c.prodAxiosData);
  const igualMatriz = JSON.stringify(haciaMatriz) === JSON.stringify(haciaMatrizProd);

  if (igualData && igualMatriz) {
    console.log(`OK  ${c.nombre}`);
    ok++;
  } else {
    console.log(`FAIL ${c.nombre}`);
    console.log("  data dev:   ", JSON.stringify(data));
    console.log("  data prod:  ", JSON.stringify(c.prodAxiosData));
    console.log("  matriz dev: ", JSON.stringify(haciaMatriz));
    console.log("  matriz prod:", JSON.stringify(haciaMatrizProd));
    fail++;
  }
}

console.log(`\n${ok} ok, ${fail} fail`);
process.exit(fail > 0 ? 1 : 0);
