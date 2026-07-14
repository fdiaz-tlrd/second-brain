/**
 * Clasifica la presentación al cliente final (contrato de payload).
 *
 * Contratos conocidos:
 *   - A.mensajeError      → { codigoError, mensajeError }
 *   - A.descripcionError  → { codigoError, descripcionError }
 *   - A.<otroCampo>       → { codigoError, <otroCampo de texto> }
 *   - A                   → { codigoError } sin campo de texto reconocido
 *   - B                   → { idPeticion, respuestas[].resultado }
 *   - C                   → no JSON / vacío / shape no reconocido
 *
 * A.mensajeError y A.descripcionError NO son lo mismo: el cliente busca una
 * propiedad concreta. Son contratos distintos (como Cursor ≠ Grok).
 *
 * Usado por run-newman.js y extraer-foto-presentacion.js.
 * La misma lógica (versión sandbox) vive embebida en Post-response de cada suite.
 */

"use strict";

function safeParse(text) {
  if (text == null || String(text).trim() === "") return null;
  try {
    return JSON.parse(String(text));
  } catch (e) {
    return null;
  }
}

function sortedKeys(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return "";
  return Object.keys(obj).sort().join(",");
}

/**
 * Detecta el campo de texto presente. Si hay más de uno con valor, reporta
 * conflicto (contrato raro) vía `campos` múltiples; la forma usa el primero
 * por prioridad solo para no mentir silenciosamente: también se anota todos.
 */
function pickTextoError(obj) {
  if (!obj || typeof obj !== "object") {
    return { campo: null, texto: null, campos: [] };
  }
  const candidatos = ["mensajeError", "descripcionError", "descripcion", "message"];
  const presentes = [];
  for (let i = 0; i < candidatos.length; i++) {
    const k = candidatos[i];
    if (obj[k] != null && String(obj[k]).trim() !== "") {
      presentes.push({ campo: k, texto: String(obj[k]) });
    }
  }
  if (presentes.length === 0) {
    return { campo: null, texto: null, campos: [] };
  }
  return {
    campo: presentes[0].campo,
    texto: presentes[0].texto,
    campos: presentes.map(function (p) {
      return p.campo;
    }),
  };
}

function formaDesdeCampoTexto(campo) {
  if (!campo) return "A";
  return "A." + campo;
}

/**
 * Objeto que ve el cliente (tras /descifrar si aplica).
 */
function resolverObjetoCliente(descifradoParsed, formatoLambda) {
  if (!descifradoParsed || typeof descifradoParsed !== "object" || Array.isArray(descifradoParsed)) {
    return null;
  }
  if (
    (formatoLambda === "plano_en_respuesta" ||
      (descifradoParsed.respuesta != null &&
        typeof descifradoParsed.respuesta === "object" &&
        !Array.isArray(descifradoParsed.respuesta) &&
        descifradoParsed.codigoError == null &&
        !Array.isArray(descifradoParsed.respuestas))) &&
    descifradoParsed.respuesta &&
    typeof descifradoParsed.respuesta === "object"
  ) {
    return descifradoParsed.respuesta;
  }
  return descifradoParsed;
}

function esFormaB(obj) {
  return Boolean(obj && Array.isArray(obj.respuestas) && obj.respuestas.length > 0);
}

function esFormaA(obj) {
  return Boolean(obj && obj.codigoError != null && obj.codigoError !== "");
}

function normTexto(t) {
  return String(t || "")
    .trim()
    .replace(/\s+/g, " ");
}

function cifradoLabel(cifrado) {
  return cifrado === true ? "si" : cifrado === false ? "no" : "?";
}

/**
 * Normaliza formas viejas ("A") al contrato fino si hay campo de texto.
 */
function normalizarFormaCaptura(presentacion) {
  const p = Object.assign({}, presentacion);
  if (p.presentacionForma === "A" && p.presentacionCampoTexto) {
    p.presentacionForma = formaDesdeCampoTexto(p.presentacionCampoTexto);
  }
  return p;
}

/**
 * @param {object} input
 * @returns {object} campos presentacion*
 */
function clasificarPresentacionCliente(input) {
  const formato = input.formatoRespuestaLambda || null;
  const cifrado =
    typeof input.respuestaVinoCifrada === "boolean" ? input.respuestaVinoCifrada : null;
  const http =
    input.httpRealLambda != null && input.httpRealLambda !== ""
      ? Number(input.httpRealLambda)
      : null;
  const httpOk = http != null && !Number.isNaN(http) ? http : null;
  const cif = cifradoLabel(cifrado);

  const empty = {
    presentacionForma: "C",
    presentacionCodigo: null,
    presentacionDescripcion: null,
    presentacionCampoTexto: null,
    presentacionCamposTexto: [],
    presentacionClaves: "",
    presentacionCifrado: cifrado,
    presentacionHttp: httpOk,
    presentacionPatternKey: null,
  };

  if (formato === "sin_respuesta" || formato === "no_json") {
    const key =
      "C|http=" +
      (httpOk != null ? httpOk : "null") +
      "|cifrado=" +
      cif +
      "|fmt=" +
      (formato || "?") +
      "|codigo=|desc=";
    return Object.assign({}, empty, { presentacionPatternKey: key });
  }

  const parsed = safeParse(input.descifradoBody);
  if (!parsed) {
    const key =
      "C|http=" +
      (httpOk != null ? httpOk : "null") +
      "|cifrado=" +
      cif +
      "|fmt=" +
      (formato || "?") +
      "|codigo=|desc=";
    return Object.assign({}, empty, { presentacionPatternKey: key });
  }

  const obj = resolverObjetoCliente(parsed, formato);
  if (!obj) {
    const key =
      "C|http=" +
      (httpOk != null ? httpOk : "null") +
      "|cifrado=" +
      cif +
      "|fmt=" +
      (formato || "?") +
      "|codigo=|desc=";
    return Object.assign({}, empty, { presentacionPatternKey: key });
  }

  const claves = sortedKeys(obj);

  if (esFormaB(obj)) {
    const r0 = obj.respuestas[0] || {};
    const codigo = r0.resultado != null && r0.resultado !== "" ? r0.resultado : null;
    const key =
      "B|http=" +
      (httpOk != null ? httpOk : "null") +
      "|cifrado=" +
      cif +
      "|keys=" +
      claves +
      "|codigo=" +
      (codigo != null ? String(codigo) : "") +
      "|desc=";
    return {
      presentacionForma: "B",
      presentacionCodigo: codigo,
      presentacionDescripcion: "",
      presentacionCampoTexto: null,
      presentacionCamposTexto: [],
      presentacionClaves: claves,
      presentacionCifrado: cifrado,
      presentacionHttp: httpOk,
      presentacionPatternKey: key,
    };
  }

  if (esFormaA(obj)) {
    const pick = pickTextoError(obj);
    const codigo = obj.codigoError;
    const desc = normTexto(pick.texto);
    const forma = formaDesdeCampoTexto(pick.campo);
    const key =
      forma +
      "|http=" +
      (httpOk != null ? httpOk : "null") +
      "|cifrado=" +
      cif +
      "|campo=" +
      (pick.campo || "") +
      "|campos=" +
      (pick.campos || []).join("+") +
      "|keys=" +
      claves +
      "|codigo=" +
      String(codigo) +
      "|desc=" +
      desc;
    return {
      presentacionForma: forma,
      presentacionCodigo: codigo,
      presentacionDescripcion: desc,
      presentacionCampoTexto: pick.campo,
      presentacionCamposTexto: pick.campos || [],
      presentacionClaves: claves,
      presentacionCifrado: cifrado,
      presentacionHttp: httpOk,
      presentacionPatternKey: key,
    };
  }

  const key =
    "C|http=" +
    (httpOk != null ? httpOk : "null") +
    "|cifrado=" +
    cif +
    "|keys=" +
    claves +
    "|codigo=|desc=";
  return {
    presentacionForma: "C",
    presentacionCodigo: null,
    presentacionDescripcion: null,
    presentacionCampoTexto: null,
    presentacionCamposTexto: [],
    presentacionClaves: claves,
    presentacionCifrado: cifrado,
    presentacionHttp: httpOk,
    presentacionPatternKey: key,
  };
}

/**
 * Fila de foto: Código + Descripción observada.
 * Las columnas de forma son dinámicas (A.mensajeError, A.descripcionError, B, C, …).
 */
function fotoRowKey(presentacion) {
  const codigo =
    presentacion.presentacionCodigo != null ? String(presentacion.presentacionCodigo) : "";
  const desc = normTexto(presentacion.presentacionDescripcion || "");
  return codigo + "\u0000" + desc;
}

module.exports = {
  clasificarPresentacionCliente,
  fotoRowKey,
  formaDesdeCampoTexto,
  normalizarFormaCaptura,
  normTexto,
  pickTextoError,
  resolverObjetoCliente,
  sortedKeys,
};
