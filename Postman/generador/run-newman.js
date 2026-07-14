#!/usr/bin/env node
/**
 * Ejecuta colección Postman con Newman y escribe reporte compartible.
 *
 * Uso (desde Postman/generador):
 *   node run-newman.js p2m
 *   node run-newman.js p2p --folder "General/2_reglaNegocio/1_idCanal"
 *   node run-newman.js vcn
 *   node run-newman.js all
 *
 * SSL: por defecto no verifica certificados (como Postman con SSL off en dev).
 *   --strict-ssl  exige certificado válido
 *
 * Versión de código desplegada (para comparar prod vs dev en el mismo AWS dev):
 *   --codigo-fuente prod|dev   (o variable NEWMAN_CODIGO_FUENTE)
 *   Queda en resumen, registro, historial y en resultados-por-escenario-<suite>.json/.md
 *
 * Nivel de ejecución (ruta de integración: VCN, MATRIZ, etc.):
 *   Se lee de NIVEL_EJECUCION en el archivo .postman_environment.json de la suite.
 *   Queda en los mismos informes (campo nivelEjecucion). Ortogonal a --codigo-fuente.
 */

const fs = require("fs");
const path = require("path");
// newman se requiere de forma perezosa dentro de runSuite (ver más abajo) para que
// este módulo pueda importarse (helpers) en máquinas sin newman instalado (ej. Lenovo sin VPN).

const ROOT = __dirname;
const LOGS = path.join(ROOT, "logs");
const {
  clasificarPresentacionCliente,
  normalizarFormaCaptura,
} = require("./clasificar-presentacion-cliente.js");
const { extraerFotoPresentacion } = require("./extraer-foto-presentacion.js");

const SUITES = {
  p2m: {
    collection: path.join(
      ROOT,
      "ensamblador/salida/P2M Escenarios error.postman_collection.json"
    ),
    environment: path.join(
      ROOT,
      "entornos/P2M Escenarios error - desarrollo.postman_environment.json"
    ),
  },
  p2p: {
    collection: path.join(
      ROOT,
      "ensamblador/salida/P2P Escenarios error.postman_collection.json"
    ),
    environment: path.join(
      ROOT,
      "entornos/P2P Escenarios error - desarrollo.postman_environment.json"
    ),
  },
  vcn: {
    collection: path.join(
      ROOT,
      "ensamblador/salida/VCN Escenarios error.postman_collection.json"
    ),
    environment: path.join(
      ROOT,
      "entornos/VCN Escenarios error - desarrollo.postman_environment.json"
    ),
  },
};

const MAX_BODY = 4000;

/** VCN: escenarios que prod no rechaza; fuera del run completo hasta alinear lambda dev. */
const VCN_SOLO_LOG_FOLDER = "4_idPeticion_soloLog";

function readNivelEjecucion(environmentPath) {
  if (!environmentPath || !fs.existsSync(environmentPath)) {
    return "desconocido";
  }
  try {
    const env = JSON.parse(fs.readFileSync(environmentPath, "utf8"));
    const values = env.values || [];
    const entry = values.find(function (v) {
      return v && v.key === "NIVEL_EJECUCION" && v.enabled !== false;
    });
    const val = entry && entry.value != null ? String(entry.value).trim() : "";
    return val || "desconocido";
  } catch (e) {
    return "desconocido";
  }
}

function parseArgs(argv) {
  const positional = [];
  let folder = null;
  let insecure = true;
  let nota = "";
  let codigoFuente = "";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--folder" && argv[i + 1]) {
      folder = argv[++i];
    } else if (argv[i] === "--nota" && argv[i + 1]) {
      nota = argv[++i];
    } else if ((argv[i] === "--codigo-fuente" || argv[i] === "--codigo") && argv[i + 1]) {
      codigoFuente = argv[++i];
    } else if (argv[i] === "--insecure") {
      insecure = true;
    } else if (argv[i] === "--strict-ssl") {
      insecure = false;
    } else if (!argv[i].startsWith("-")) {
      positional.push(argv[i]);
    }
  }
  if (!codigoFuente) {
    codigoFuente = process.env.NEWMAN_CODIGO_FUENTE || "";
  }
  return { suite: positional[0], folder, insecure, nota, codigoFuente };
}

function truncate(text, max) {
  if (!text) {
    return "";
  }
  const s = String(text);
  if (s.length <= max) {
    return s;
  }
  return s.slice(0, max) + "\n… [truncado]";
}

function readStreamBody(stream) {
  if (!stream) {
    return "";
  }
  if (Buffer.isBuffer(stream)) {
    return stream.toString("utf8");
  }
  if (typeof stream === "string") {
    return stream;
  }
  if (stream.data && Array.isArray(stream.data)) {
    return Buffer.from(stream.data).toString("utf8");
  }
  try {
    return String(stream);
  } catch (e) {
    return "";
  }
}

function findExecutionByItemId(executions, itemId) {
  if (!executions || !itemId) {
    return null;
  }
  return executions.find(function (ex) {
    return ex.item && ex.item.id === itemId;
  });
}

function dedupeFailures(failures) {
  const byKey = new Map();
  failures.forEach(function (failure) {
    const source = failure.source || {};
    const err = failure.error || {};
    const key =
      (source.id || source.name || "unknown") + "|" + (err.test || err.name || "");
    const existing = byKey.get(key);
    const isAssert = err.test && err.test !== "Error";
    if (!existing || (isAssert && existing.error.test === "Error")) {
      byKey.set(key, failure);
    }
  });
  return Array.from(byKey.values());
}

function getItemPath(item) {
  if (!item || typeof item.parent !== "function") {
    return "";
  }
  const names = [];
  let node = item;
  let safety = 0;
  try {
    while (node && typeof node.parent === "function" && safety < 30) {
      node = node.parent();
      safety++;
      if (node && node.name) {
        names.unshift(node.name);
      }
    }
  } catch (e) {
    return names.join("/");
  }
  // El primer nombre suele ser la colección raíz; se descarta.
  if (names.length > 0) {
    names.shift();
  }
  return names.join("/");
}

function extractNegocio(bodyText) {
  const out = {
    codigoError: null,
    mensajeError: null,
    descripcionError: null,
    resultado: null,
    resultadoR0: null,
    idSolicitudR0: null,
  };
  if (!bodyText) {
    return out;
  }
  let parsed;
  try {
    parsed = JSON.parse(bodyText);
  } catch (e) {
    return out;
  }
  if (!parsed || typeof parsed !== "object") {
    return out;
  }
  const fuentes = [parsed];
  if (parsed.respuesta && typeof parsed.respuesta === "object") {
    fuentes.push(parsed.respuesta);
  }
  fuentes.forEach(function (src) {
    if (out.codigoError == null && Object.prototype.hasOwnProperty.call(src, "codigoError")) {
      out.codigoError = src.codigoError;
    }
    if (out.mensajeError == null && Object.prototype.hasOwnProperty.call(src, "mensajeError")) {
      out.mensajeError = src.mensajeError;
    }
    if (
      out.descripcionError == null &&
      Object.prototype.hasOwnProperty.call(src, "descripcionError")
    ) {
      out.descripcionError = src.descripcionError;
    }
    if (out.resultado == null && Object.prototype.hasOwnProperty.call(src, "resultado")) {
      out.resultado = src.resultado;
    }
    // Camino parametro/metodo/exito: el resultado de negocio va en respuestas[0].
    if (out.resultadoR0 == null && Array.isArray(src.respuestas) && src.respuestas[0]) {
      const r0 = src.respuestas[0];
      if (Object.prototype.hasOwnProperty.call(r0, "resultado")) {
        out.resultadoR0 = r0.resultado;
      }
      if (Object.prototype.hasOwnProperty.call(r0, "idSolicitud")) {
        out.idSolicitudR0 = r0.idSolicitud;
      }
    }
  });
  return out;
}

/**
 * Extrae de los asserts (generados por Post-response de raíz) los valores
 * ESPERADOS y REALES que no están en el cuerpo /descifrar:
 *   - httpEsperado / httpRealLambda: de "[... ] HTTP status = E (real: R)"
 *   - tiempoRealMs: de "tiempo respuesta < M ms (real: Z ms)"
 *   - codigoErrorEsperado: de "[General] codigoError = N",
 *     "[parametro|metodo] respuestas[0].resultado = N", "[exito] respuestas[0].resultado = 0"
 *   - expectedTipo: inferido del prefijo del assert ([General]/[parametro]/[metodo]/[exito])
 *   - flujoFallo: true si "[Flujo raiz] fallo antes de /descifrar"
 * Devuelve null en cada campo que no se pudo determinar (no inventa).
 */
function extractAssertData(assertions) {
  const out = {
    httpEsperado: null,
    httpRealLambda: null,
    tiempoRealMs: null,
    codigoErrorEsperado: null,
    expectedTipo: null,
    flujoFallo: false,
  };
  if (!Array.isArray(assertions)) {
    return out;
  }
  assertions.forEach(function (a) {
    const name = (a && a.assertion) || "";
    let m;

    m = name.match(/HTTP status = (\d+) \(real: (-?\d+|NaN)\)/);
    if (m) {
      out.httpEsperado = Number(m[1]);
      out.httpRealLambda = m[2] === "NaN" ? null : Number(m[2]);
    }

    m = name.match(/tiempo respuesta < \d+ ms \(real: (-?\d+) ms\)/);
    if (m) {
      out.tiempoRealMs = Number(m[1]);
    }

    m = name.match(/^\[General\] codigoError = (\d+)/);
    if (m) {
      out.codigoErrorEsperado = Number(m[1]);
      out.expectedTipo = "general";
    }

    m = name.match(/^\[(parametro|metodo)\] respuestas\[0\]\.resultado = (\d+)/);
    if (m) {
      out.codigoErrorEsperado = Number(m[2]);
      out.expectedTipo = m[1];
    }

    if (/^\[exito\] respuestas\[0\]\.resultado = 0/.test(name)) {
      out.codigoErrorEsperado = 0;
      out.expectedTipo = "exito";
    }

    if (/^\[Flujo raiz\] fallo antes de \/descifrar/.test(name)) {
      out.flujoFallo = true;
    }
  });
  return out;
}

/**
 * Lee el assert "[CAPTURA] {json}" emitido por Post-response (fuente autoritativa).
 * Devuelve el objeto parseado o null si no está presente / no parsea.
 * Este canal es determinista: no depende de parsear textos de otros asserts.
 */
function extractCaptura(assertions) {
  if (!Array.isArray(assertions)) {
    return null;
  }
  for (let i = 0; i < assertions.length; i++) {
    const name = (assertions[i] && assertions[i].assertion) || "";
    if (name.indexOf("[CAPTURA] ") === 0) {
      const json = name.slice("[CAPTURA] ".length);
      try {
        return JSON.parse(json);
      } catch (e) {
        return { _capturaParseError: e.message, _raw: json };
      }
    }
  }
  return null;
}

function toNum(v) {
  if (v == null || v === "") return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

/**
 * codigoError/resultado de negocio "efectivo" según el tipo de escenario:
 *   - general: codigoError del cuerpo
 *   - parametro/metodo: respuestas[0].resultado
 *   - exito: respuestas[0].resultado (esperado 0)
 * Cae a codigoError si no hay pista de tipo.
 */
function resolverRecibidoNegocio(negocio, expectedTipo) {
  if (expectedTipo === "parametro" || expectedTipo === "metodo" || expectedTipo === "exito") {
    return negocio.resultadoR0 != null ? negocio.resultadoR0 : negocio.codigoError;
  }
  return negocio.codigoError;
}

/**
 * Mapa id -> ruta (jerarquía de carpetas) a partir del árbol serializado
 * `summary.collection.item`. Necesario para reconstruir la ruta cuando el item
 * NO tiene `.parent()` (caso: regenerar desde un *_completo.json ya guardado).
 */
function buildPathMapFromCollection(summary) {
  const map = new Map();
  const collection = summary.collection;
  if (!collection || !Array.isArray(collection.item)) {
    return map;
  }
  (function walk(items, prefix) {
    items.forEach(function (it) {
      const isFolder = Array.isArray(it.item);
      if (isFolder) {
        const nextPrefix = prefix ? prefix + "/" + it.name : it.name;
        walk(it.item, nextPrefix);
      } else if (it.id) {
        map.set(it.id, prefix || "");
      }
    });
  })(collection.item, "");
  return map;
}

function buildResultadosPorEscenario(suiteKey, folder, summary, codigoFuente, nota, nivelEjecucion) {
  const run = summary.run || {};
  const executions = run.executions || [];
  // Si los items no traen .parent() (JSON serializado), reconstruir rutas desde la colección.
  const pathMap = buildPathMapFromCollection(summary);
  const escenarios = executions.map(function (ex) {
    const item = ex.item || {};
    const response = ex.response || {};
    const request = ex.request || {};
    const body = readStreamBody(response.stream);
    const negocio = extractNegocio(body);
    const assertions = ex.assertions || [];
    const ad = extractAssertData(assertions);
    const cap = extractCaptura(assertions); // fuente autoritativa (determinista)
    let ruta = getItemPath(item);
    if (!ruta && item.id && pathMap.has(item.id)) {
      ruta = pathMap.get(item.id);
    }
    let assertPaso = null;
    const assertsFallidos = [];
    let assertsReales = 0;
    if (assertions.length > 0) {
      assertions.forEach(function (a) {
        const nombre = (a && a.assertion) || "";
        if (nombre.indexOf("[CAPTURA] ") === 0) {
          return; // no cuenta como assert de negocio
        }
        assertsReales++;
        if (a && a.error) {
          assertsFallidos.push(nombre || "(assert sin nombre)");
        }
      });
      assertPaso = assertsFallidos.length === 0;
    }

    // --- HTTP real: captura autoritativa, fallback a parse de asserts ---
    const httpReal = cap && cap.httpRealLambda != null && cap.httpRealLambda !== ""
      ? toNum(cap.httpRealLambda)
      : ad.httpRealLambda;
    const httpEsperado = cap && cap.httpEsperado != null && cap.httpEsperado !== ""
      ? toNum(cap.httpEsperado)
      : ad.httpEsperado;
    // --- Tipo y esperado de negocio: captura primero ---
    const expectedTipo = (cap && cap.tipo) || ad.expectedTipo;
    const codigoErrorEsperado = cap && cap.codigoErrorEsperado != null && cap.codigoErrorEsperado !== ""
      ? toNum(cap.codigoErrorEsperado)
      : ad.codigoErrorEsperado;
    const recibidoNegocio = resolverRecibidoNegocio(negocio, expectedTipo);
    const tiempoMs = cap && cap.tiempoMs != null && cap.tiempoMs !== ""
      ? toNum(cap.tiempoMs)
      : ad.tiempoRealMs;

    // Presentación cliente (Forma A/B/C): CAPTURA si trae campos; si no, recalcular del body.
    let presentacion;
    if (cap && cap.presentacionForma && cap.presentacionPatternKey) {
      presentacion = normalizarFormaCaptura({
        presentacionForma: cap.presentacionForma,
        presentacionCodigo:
          cap.presentacionCodigo != null && cap.presentacionCodigo !== ""
            ? cap.presentacionCodigo
            : null,
        presentacionDescripcion:
          cap.presentacionDescripcion != null ? String(cap.presentacionDescripcion) : null,
        presentacionCampoTexto: cap.presentacionCampoTexto || null,
        presentacionCamposTexto: cap.presentacionCamposTexto || [],
        presentacionClaves: cap.presentacionClaves || "",
        presentacionCifrado:
          typeof cap.presentacionCifrado === "boolean"
            ? cap.presentacionCifrado
            : null,
        presentacionHttp:
          cap.presentacionHttp != null && cap.presentacionHttp !== ""
            ? toNum(cap.presentacionHttp)
            : null,
        presentacionPatternKey: cap.presentacionPatternKey,
      });
    } else {
      const descBody =
        (cap && cap.descifradoBody) || body || "";
      const fmtLambda =
        (cap && cap.formatoRespuestaLambda) || null;
      const vinoCifrada =
        cap && typeof cap.respuestaVinoCifrada === "boolean"
          ? cap.respuestaVinoCifrada
          : null;
      presentacion = clasificarPresentacionCliente({
        descifradoBody: descBody,
        formatoRespuestaLambda: fmtLambda,
        respuestaVinoCifrada: vinoCifrada,
        httpRealLambda: httpReal,
      });
    }

    return {
      nombre: item.name || "(sin nombre)",
      ruta: ruta,
      expectedTipo: expectedTipo,
      // --- HTTP (protocolo) ---
      httpRealLambda: httpReal, // HTTP real de la lambda (matriz/validador/VCN)
      httpEsperado: httpEsperado, // HTTP esperado por el plan de pruebas
      httpCoincide: httpEsperado != null && httpReal != null ? httpEsperado === httpReal : null,
      httpDescifrar: response.code != null ? response.code : null, // HTTP del dummy /descifrar (siempre ~200)
      // --- Negocio (payload) ---
      codigoError: negocio.codigoError, // codigoError plano del cuerpo
      resultadoR0: negocio.resultadoR0, // respuestas[0].resultado (parametro/metodo/exito)
      recibidoNegocio: recibidoNegocio, // codigo de negocio efectivo segun tipo
      codigoErrorEsperado: codigoErrorEsperado, // esperado (payload)
      negocioCoincide:
        codigoErrorEsperado != null
          ? recibidoNegocio === codigoErrorEsperado
          : null,
      mensajeError: negocio.mensajeError,
      descripcionError: negocio.descripcionError,
      resultado: negocio.resultado,
      idSolicitudR0: negocio.idSolicitudR0,
      // --- Request real al lambda (matriz/validador/VCN) ---
      urlLambda: cap ? cap.url || null : null,
      reqClaro: cap ? cap.reqClaro || null : null, // payload claro (antes de cifrar)
      reqCifrado: cap ? cap.reqCifrado || null : null, // cuerpo cifrado enviado
      idPeticion: cap ? cap.idPeticion || null : null,
      metodo: cap ? cap.metodo || null : null,
      idSolicitud: cap ? cap.idSolicitud || null : null,
      // --- Respuesta real del lambda (antes de descifrar) ---
      respLambdaRaw: cap ? cap.respLambdaRaw || null : (request.body && request.body.raw) || null,
      respLambdaHeaders: cap ? cap.respLambdaHeaders || null : null,
      // --- Respuesta del dummy /descifrar (legible) ---
      descifradoCode: cap && cap.descifradoCode != null ? cap.descifradoCode : (response.code != null ? response.code : null),
      // --- Formato / presentación ---
      respuestaVinoCifrada: cap && typeof cap.respuestaVinoCifrada === "boolean" ? cap.respuestaVinoCifrada : null,
      formatoRespuestaLambda: cap && cap.formatoRespuestaLambda ? cap.formatoRespuestaLambda : null,
      payloadCambioTrasDescifrar:
        cap && typeof cap.payloadCambioTrasDescifrar === "boolean" ? cap.payloadCambioTrasDescifrar : null,
      presentacionForma: presentacion.presentacionForma,
      presentacionCodigo: presentacion.presentacionCodigo,
      presentacionDescripcion: presentacion.presentacionDescripcion,
      presentacionCampoTexto: presentacion.presentacionCampoTexto,
      presentacionCamposTexto: presentacion.presentacionCamposTexto || [],
      presentacionClaves: presentacion.presentacionClaves,
      presentacionCifrado: presentacion.presentacionCifrado,
      presentacionHttp: presentacion.presentacionHttp,
      presentacionPatternKey: presentacion.presentacionPatternKey,
      // --- Flujo / diagnóstico ---
      flowFailed: cap ? cap.flowFailed || null : null,
      flowError: cap ? cap.flowError || null : null,
      // --- Otros ---
      tiempoRealMs: tiempoMs,
      flujoFallo: ad.flujoFallo,
      assertPaso: assertPaso,
      assertsReales: assertsReales,
      assertsFallidos: assertsFallidos,
      capturaOk: !!(cap && !cap._capturaParseError),
      body: body || "",
    };
  });
  return {
    suite: suiteKey,
    fecha: new Date().toISOString(),
    codigoFuente: codigoFuente || "desconocido",
    nivelEjecucion: nivelEjecucion || "desconocido",
    folder: folder || "(completo)",
    nota: nota || "",
    total: escenarios.length,
    escenarios: escenarios,
  };
}

function buildResultadosPorEscenarioMd(resultados) {
  const lines = [];
  lines.push("# Resultados por escenario — " + String(resultados.suite).toUpperCase());
  lines.push("");
  lines.push("| Campo | Valor |");
  lines.push("|-------|-------|");
  lines.push("| Fecha | " + resultados.fecha + " |");
  lines.push("| Código fuente | " + resultados.codigoFuente + " |");
  lines.push("| Nivel ejecución | " + resultados.nivelEjecucion + " |");
  lines.push("| Carpeta | `" + resultados.folder + "` |");
  if (resultados.nota) {
    lines.push("| Nota | " + resultados.nota.replace(/\|/g, "\\|") + " |");
  }
  lines.push("| Escenarios | " + resultados.total + " |");
  const conCaptura = resultados.escenarios.filter(function (e) {
    return e.capturaOk;
  }).length;
  lines.push("| Con captura determinista `[CAPTURA]` | " + conCaptura + " / " + resultados.total + " |");
  // Conteo por veredicto de negocio. "sin evaluar" (negocioCoincide=null) NO debe
  // esconderse: si >0, hay respuestas que el barrido no pudo comparar (p.ej. crash 500
  // o codigoErrorEsperado no capturado). Historicamente esto era un punto ciego.
  const negOk = resultados.escenarios.filter(function (e) { return e.negocioCoincide === true; }).length;
  const negFail = resultados.escenarios.filter(function (e) { return e.negocioCoincide === false; }).length;
  const negNull = resultados.escenarios.filter(function (e) { return e.negocioCoincide == null; }).length;
  lines.push("| Negocio OK / divergente / **sin evaluar** | " + negOk + " / " + negFail + " / **" + negNull + "** |");
  // Formato de respuesta de la lambda: cifrado vs en claro (campo nuevo jul-2026).
  const fmtCount = {};
  let cifradaTrue = 0;
  let cifradaFalse = 0;
  let cifradaNull = 0;
  resultados.escenarios.forEach(function (e) {
    const f = e.formatoRespuestaLambda || "sin_dato";
    fmtCount[f] = (fmtCount[f] || 0) + 1;
    if (e.respuestaVinoCifrada === true) cifradaTrue++;
    else if (e.respuestaVinoCifrada === false) cifradaFalse++;
    else cifradaNull++;
  });
  lines.push(
    "| Respuesta lambda **cifrada / en claro / sin dato** | " +
      cifradaTrue +
      " / " +
      cifradaFalse +
      " / " +
      cifradaNull +
      " |"
  );
  const fmtParts = Object.keys(fmtCount)
    .sort()
    .map(function (k) {
      return k + "=" + fmtCount[k];
    });
  lines.push("| Desglose formatoRespuestaLambda | " + fmtParts.join(", ") + " |");
  const formaCount = {};
  const patternKeys = new Set();
  resultados.escenarios.forEach(function (e) {
    const f = e.presentacionForma || "sin_dato";
    formaCount[f] = (formaCount[f] || 0) + 1;
    if (e.presentacionPatternKey) patternKeys.add(e.presentacionPatternKey);
  });
  const formaParts = Object.keys(formaCount)
    .sort()
    .map(function (k) {
      return k + "=" + formaCount[k];
    });
  lines.push("| Presentación (contratos) | " + formaParts.join(", ") + " |");
  lines.push("| Patrones de presentación únicos | " + patternKeys.size + " |");
  lines.push("");
  if (negNull > 0) {
    lines.push(
      "> **ATENCION:** " + negNull + " reps con `negocioCoincide=null` (sin veredicto). " +
        "No entran en OK ni en divergente. Revisar (posible crash 500 o esperado no capturado). " +
        "Usar `recopilacion/listar-divergencias-negocio.js` que ahora lista la seccion SIN EVALUAR."
    );
    lines.push("");
  }
  lines.push(
    "Columnas HTTP = protocolo (real de la lambda vs esperado). " +
      "Columnas negocio = `codigoError`/`resultado` del payload (recibido efectivo vs esperado). " +
      "Columna **Formato** = si la lambda devolvió el cuerpo cifrado o en claro. " +
      "Columna **Forma** = contrato de payload (`A.mensajeError`, `A.descripcionError`, `B`, `C`, …). " +
      "Foto por código fuente: `codigosRespuesta/foto-presentacion-<suite>-<prod|dev>.md` " +
      "(la genera Newman al terminar, o `node extraer-foto-presentacion.js logs/resultados-por-escenario-<suite>.json`)."
  );
  lines.push("");
  lines.push(
    "| # | Escenario | HTTP esp | HTTP real | HTTP ok | Negocio esp | Negocio recib | Negocio ok | Formato | Cifrada? | Forma | Cod.cli | Desc.cliente | assert | Cuerpo (resumen) |"
  );
  lines.push(
    "|---|-----------|----------|-----------|---------|-------------|---------------|------------|---------|----------|-------|---------|--------------|--------|------------------|"
  );
  const dash = function (v) {
    return v != null && v !== "" ? v : "—";
  };
  const okTxt = function (v) {
    return v === null ? "—" : v ? "OK" : "✗";
  };
  const cifradaTxt = function (v) {
    return v === null || v === undefined ? "—" : v ? "sí" : "no";
  };
  resultados.escenarios.forEach(function (e, i) {
    const bodyResumen = truncate(e.body, 240)
      .replace(/\r?\n/g, " ")
      .replace(/\|/g, "\\|");
    const assertTxt = e.assertPaso === null ? "—" : e.assertPaso ? "OK" : "✗";
    const descCli = String(e.presentacionDescripcion || "")
      .replace(/\r?\n/g, " ")
      .replace(/\|/g, "\\|");
    lines.push(
      "| " +
        (i + 1) +
        " | " +
        String(e.nombre).replace(/\|/g, "\\|") +
        " | " +
        dash(e.httpEsperado) +
        " | " +
        dash(e.httpRealLambda) +
        " | " +
        okTxt(e.httpCoincide) +
        " | " +
        dash(e.codigoErrorEsperado) +
        " | " +
        dash(e.recibidoNegocio) +
        " | " +
        okTxt(e.negocioCoincide) +
        " | " +
        dash(e.formatoRespuestaLambda) +
        " | " +
        cifradaTxt(e.respuestaVinoCifrada) +
        " | " +
        dash(e.presentacionForma) +
        " | " +
        dash(e.presentacionCodigo) +
        " | " +
        (descCli || "—") +
        " | " +
        assertTxt +
        " | `" +
        bodyResumen +
        "` |"
    );
  });
  lines.push("");
  return lines.join("\n");
}

function buildResumenMarkdown(suite, folder, summary, jsonPath, mdPath, nota, codigoFuente, nivelEjecucion) {
  const run = summary.run || {};
  const stats = run.stats || {};
  const failures = dedupeFailures(run.failures || []);
  const executions = run.executions || [];
  const lines = [];
  const fechaIso = new Date().toISOString();

  lines.push("# Resumen de fallos — " + suite.toUpperCase());
  lines.push("");
  lines.push("| Campo | Valor |");
  lines.push("|-------|-------|");
  lines.push("| Fecha | " + fechaIso + " |");
  lines.push("| Código fuente | " + (codigoFuente || "desconocido") + " |");
  lines.push("| Nivel ejecución | " + (nivelEjecucion || "desconocido") + " |");
  if (folder) {
    lines.push("| Carpeta | `" + folder + "` |");
  } else {
    lines.push("| Carpeta | `(completo)` |");
  }
  if (nota) {
    lines.push("| Nota | " + nota.replace(/\|/g, "\\|") + " |");
  }
  lines.push(
    "| Requests | " +
      (stats.requests ? stats.requests.total : "?") +
      " (failed: " +
      (stats.requests ? stats.requests.failed : "?") +
      ") |"
  );
  lines.push(
    "| Tests | " +
      (stats.assertions ? stats.assertions.total : stats.tests ? stats.tests.total : "?") +
      " (failed: " +
      (stats.assertions ? stats.assertions.failed : stats.tests ? stats.tests.failed : "?") +
      ") |"
  );
  if (stats.assertions && stats.assertions.total === 0 && stats.requests && stats.requests.total > 0) {
    lines.push("");
    lines.push(
      "**Atención:** 0 assertions — si usaste `--folder` con ruta, verifica que la subcolección incluya scripts de raíz (`event` de colección). Sin ellos no se ejecuta el flujo cifrar→procesar→descifrar ni las pruebas."
    );
  }
  lines.push("| JSON completo | `" + path.relative(ROOT, jsonPath) + "` |");
  lines.push("");

  if (failures.length === 0) {
    lines.push("Sin fallos.");
    lines.push("");
    return lines.join("\n");
  }

  failures.forEach(function (failure, index) {
    const err = failure.error || {};
    const source = failure.source || {};
    const parent = failure.parent || {};
    const requestName = source.name || "(sin nombre)";
    const folderName = parent.name ? parent.name + " / " : "";

    lines.push("## " + (index + 1) + ". " + folderName + requestName);
    lines.push("");
    lines.push("- **Test:** " + (err.test || err.name || "—"));
    lines.push("- **Mensaje:** " + (err.message || "—").replace(/\r?\n/g, " "));

    const exec = findExecutionByItemId(executions, source.id);
    if (exec && exec.response) {
      const code = exec.response.code != null ? exec.response.code : "—";
      lines.push("- **HTTP descifrar:** " + code);
      const body = readStreamBody(exec.response.stream);
      if (body) {
        lines.push("");
        lines.push("```json");
        lines.push(truncate(body, MAX_BODY));
        lines.push("```");
      }
    }

    lines.push("");
  });

  return lines.join("\n");
}

const HISTORIAL_MAX = 8;

function isoTimestampForFilename(d) {
  return d.toISOString().replace(/:/g, "-").replace(/\.\d{3}Z$/, "Z");
}

function folderSlug(folder) {
  if (!folder) {
    return "completo";
  }
  return folder
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function pruneHistorial(histDir, maxRuns) {
  const entries = fs
    .readdirSync(histDir)
    .filter(function (name) {
      // Solo el JSON principal del run cuenta como "run"; excluir el derivado por-escenario.
      return name.endsWith(".json") && !name.endsWith("_por-escenario.json");
    })
    .map(function (name) {
      const full = path.join(histDir, name);
      return { name: name, mtime: fs.statSync(full).mtimeMs };
    })
    .sort(function (a, b) {
      return b.mtime - a.mtime;
    });

  entries.slice(maxRuns).forEach(function (entry) {
    const base = entry.name.replace(/\.json$/, "");
    const derivados = [
      base + ".json",
      base + ".md",
      base + "_por-escenario.json",
      base + "_por-escenario.md",
    ];
    derivados.forEach(function (fileName) {
      const full = path.join(histDir, fileName);
      if (fs.existsSync(full)) {
        fs.unlinkSync(full);
      }
    });
  });
}

function updateRegistro(suiteKey, entry) {
  const regPath = path.join(LOGS, "registro-" + suiteKey + ".md");
  const header = [
    "# Registro de ejecuciones Newman — " + suiteKey.toUpperCase(),
    "",
    "Orden: **más reciente arriba**. Commitear `logs/` tras cada run en la **máquina con VPN**.",
    "",
    "| Fecha (UTC) | Código | Nivel | Carpeta | Requests | Tests | Resultado | Historial | Nota |",
    "|-------------|--------|-------|---------|----------|-------|-----------|-----------|------|",
  ];

  let existingRows = [];
  if (fs.existsSync(regPath)) {
    const text = fs.readFileSync(regPath, "utf8");
    existingRows = text
      .split("\n")
      .filter(function (line) {
        return line.startsWith("| 20");
      });
  }

  const row =
    "| " +
    entry.fecha +
    " | " +
    (entry.codigo || "desconocido") +
    " | " +
    (entry.nivel || "desconocido") +
    " | `" +
    entry.folder +
    "` | " +
    entry.requests +
    " | " +
    entry.tests +
    " | **" +
    entry.resultado +
    "** | [`" +
    path.basename(entry.json) +
    "`](./" +
    entry.json.replace(/\\/g, "/") +
    ") | " +
    (entry.nota || "—") +
    " |";

  const rows = [row].concat(existingRows).slice(0, HISTORIAL_MAX);
  fs.writeFileSync(regPath, header.concat(rows).concat(["", ""]).join("\n"), "utf8");
}

function archiveRun(suiteKey, folder, jsonPath, mdPath, summary, nota, codigoFuente, nivelEjecucion, resScenJsonPath, resScenMdPath) {
  const histDir = path.join(LOGS, "historial", suiteKey);
  fs.mkdirSync(histDir, { recursive: true });
  const ts = isoTimestampForFilename(new Date());
  const slug = folderSlug(folder);
  const codigoSlug = folderSlug(codigoFuente || "desconocido");
  const nivelSlug = folderSlug(nivelEjecucion || "desconocido");
  const base = ts + "_" + codigoSlug + "_" + nivelSlug + "_" + slug;
  const histJson = path.join(histDir, base + ".json");
  const histMd = path.join(histDir, base + ".md");
  fs.copyFileSync(jsonPath, histJson);
  fs.copyFileSync(mdPath, histMd);
  if (resScenJsonPath && fs.existsSync(resScenJsonPath)) {
    fs.copyFileSync(resScenJsonPath, path.join(histDir, base + "_por-escenario.json"));
  }
  if (resScenMdPath && fs.existsSync(resScenMdPath)) {
    fs.copyFileSync(resScenMdPath, path.join(histDir, base + "_por-escenario.md"));
  }

  const stats = summary.run && summary.run.stats ? summary.run.stats : {};
  const reqTotal = stats.requests ? stats.requests.total : "?";
  const reqFailed = stats.requests ? stats.requests.failed : 0;
  const testTotal = stats.assertions
    ? stats.assertions.total
    : stats.tests
      ? stats.tests.total
      : "?";
  const testFailed = stats.assertions
    ? stats.assertions.failed
    : stats.tests
      ? stats.tests.failed
      : 0;

  updateRegistro(suiteKey, {
    fecha: new Date().toISOString(),
    codigo: codigoFuente || "desconocido",
    nivel: nivelEjecucion || "desconocido",
    folder: folder || "(completo)",
    requests: reqTotal + " (fail " + reqFailed + ")",
    tests: testTotal + " (fail " + testFailed + ")",
    resultado: testFailed === 0 && reqFailed === 0 ? "OK" : "FALLÓ",
    json: path.relative(LOGS, histJson),
    md: path.relative(LOGS, histMd),
    nota: nota,
  });

  pruneHistorial(histDir, HISTORIAL_MAX);
}

function shouldExcludeVcnSoloLogFolders(suiteKey, folder) {
  if (suiteKey !== "vcn") {
    return false;
  }
  if (folder && folder.indexOf(VCN_SOLO_LOG_FOLDER) !== -1) {
    return false;
  }
  return true;
}

function filterItemsExcludingFolderNames(items, namesToExclude) {
  return items
    .filter(function (entry) {
      if (Array.isArray(entry.item) && namesToExclude.indexOf(entry.name) !== -1) {
        return false;
      }
      return true;
    })
    .map(function (entry) {
      if (Array.isArray(entry.item)) {
        return Object.assign({}, entry, {
          item: filterItemsExcludingFolderNames(entry.item, namesToExclude),
        });
      }
      return entry;
    });
}

function applyVcnSoloLogExclusion(collection, suiteKey, folder) {
  if (!shouldExcludeVcnSoloLogFolders(suiteKey, folder)) {
    return collection;
  }
  if (typeof collection === "string") {
    const raw = JSON.parse(fs.readFileSync(collection, "utf8"));
    return Object.assign({}, raw, {
      item: filterItemsExcludingFolderNames(raw.item, [VCN_SOLO_LOG_FOLDER]),
    });
  }
  if (Array.isArray(collection.item)) {
    return Object.assign({}, collection, {
      item: filterItemsExcludingFolderNames(collection.item, [VCN_SOLO_LOG_FOLDER]),
    });
  }
  return collection;
}

function resolveCollectionForRun(suiteKey, collectionPath, folder) {
  let collection;
  if (folder && folder.includes("/")) {
    collection = buildCollectionForFolderPath(collectionPath, folder);
  } else if (folder) {
    return collectionPath;
  } else {
    collection = collectionPath;
  }
  return applyVcnSoloLogExclusion(collection, suiteKey, folder);
}

function walkFolderPath(rawItems, segments, collectionPath, folderPath) {
  let items = rawItems;
  /** @type {object|null} */
  let node = null;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const matches = items.filter(function (entry) {
      return entry.name === seg && Array.isArray(entry.item);
    });
    if (matches.length === 0) {
      throw new Error(
        'Carpeta "' +
          seg +
          '" no encontrada en ruta `' +
          folderPath +
          "` (colección " +
          path.basename(collectionPath) +
          ")"
      );
    }
    if (matches.length > 1) {
      throw new Error(
        'Nombre de carpeta ambiguo "' +
          seg +
          '" en `' +
          folderPath +
          "`. Usa ruta completa desde la raíz."
      );
    }
    node = matches[0];
    items = node.item;
  }
  return node;
}

function countRequestsInItems(items) {
  let total = 0;
  items.forEach(function (entry) {
    if (Array.isArray(entry.item)) {
      total += countRequestsInItems(entry.item);
    } else if (entry.request) {
      total += 1;
    }
  });
  return total;
}

/**
 * Colecciones ensambladas no traen ids estables; Newman regenera UUID al cargar.
 * Para rutas anidadas, extraemos la subcolección JSON en lugar de pasar folder id.
 */
function buildCollectionForFolderPath(collectionPath, folderPath) {
  const raw = JSON.parse(fs.readFileSync(collectionPath, "utf8"));
  const segments = folderPath
    .split("/")
    .map(function (s) {
      return s.trim();
    })
    .filter(Boolean);
  const folderNode = walkFolderPath(raw.item, segments, collectionPath, folderPath);
  const baseName =
    raw.info && raw.info.name ? raw.info.name : path.basename(collectionPath, ".json");
  const sub = {
    info: Object.assign({}, raw.info, {
      name: baseName + " — " + folderPath,
    }),
    item: [folderNode],
  };
  if (Array.isArray(raw.event) && raw.event.length > 0) {
    sub.event = raw.event;
  }
  if (Array.isArray(raw.variable) && raw.variable.length > 0) {
    sub.variable = raw.variable;
  }
  return sub;
}

function resolveFolderTarget(collectionPath, folderPath) {
  if (!folderPath || !folderPath.includes("/")) {
    return null;
  }
  const segments = folderPath
    .split("/")
    .map(function (s) {
      return s.trim();
    })
    .filter(Boolean);
  const raw = JSON.parse(fs.readFileSync(collectionPath, "utf8"));
  const folderNode = walkFolderPath(raw.item, segments, collectionPath, folderPath);
  return {
    name: folderNode.name,
    path: folderPath,
    requestCount: countRequestsInItems(folderNode.item),
  };
}

function runSuite(suiteKey, folder, insecure, nota, codigoFuente) {
  const cfg = SUITES[suiteKey];
  if (!cfg) {
    return Promise.reject(new Error("Suite desconocida: " + suiteKey));
  }
  if (!fs.existsSync(cfg.collection)) {
    return Promise.reject(
      new Error(
        "Falta coleccion: " +
          cfg.collection +
          " — ejecutar ensamblador primero"
      )
    );
  }
  if (!fs.existsSync(cfg.environment)) {
    return Promise.reject(new Error("Falta entorno: " + cfg.environment));
  }

  const nivelEjecucion = readNivelEjecucion(cfg.environment);
  console.log("Nivel ejecución (NIVEL_EJECUCION): " + nivelEjecucion);

  const jsonPath = path.join(LOGS, "ultimo-run-" + suiteKey + ".json");
  const mdPath = path.join(LOGS, "resumen-fallos-" + suiteKey + ".md");
  const resScenJsonPath = path.join(LOGS, "resultados-por-escenario-" + suiteKey + ".json");
  const resScenMdPath = path.join(LOGS, "resultados-por-escenario-" + suiteKey + ".md");

  const folderTarget =
    folder && folder.includes("/")
      ? resolveFolderTarget(cfg.collection, folder)
      : null;
  if (folderTarget) {
    console.log(
      "Carpeta: `" +
        folderTarget.path +
        "` (" +
        folderTarget.name +
        ", " +
        folderTarget.requestCount +
        " requests)"
    );
  }

  if (shouldExcludeVcnSoloLogFolders(suiteKey, folder)) {
    console.log(
      "VCN: omitiendo `" +
        VCN_SOLO_LOG_FOLDER +
        "` (run manual: --folder \"General/1_validaciones_js/" +
        VCN_SOLO_LOG_FOLDER +
        '").'
    );
  }

  // timeout = tope global del run (Newman), no por request. VCN completo ~400+ HTTP ~5–15 min.
  const options = {
    collection: resolveCollectionForRun(suiteKey, cfg.collection, folder),
    environment: cfg.environment,
    reporters: ["cli", "json"],
    reporter: {
      json: { export: jsonPath },
    },
    timeout: 1800000,
    timeoutRequest: 120000,
    timeoutScript: 60000,
    insecure: insecure,
  };
  if (folder && !folder.includes("/")) {
    options.folder = folder;
  }

  const newman = require("newman");
  return new Promise(function (resolve, reject) {
    newman.run(options, function (err, summary) {
      if (err) {
        reject(err);
        return;
      }
      const md = buildResumenMarkdown(
        suiteKey,
        folder,
        summary,
        jsonPath,
        mdPath,
        nota,
        codigoFuente,
        nivelEjecucion
      );
      fs.writeFileSync(mdPath, md, "utf8");

      const resultados = buildResultadosPorEscenario(
        suiteKey,
        folder,
        summary,
        codigoFuente,
        nota,
        nivelEjecucion
      );
      fs.writeFileSync(resScenJsonPath, JSON.stringify(resultados, null, 2), "utf8");
      fs.writeFileSync(resScenMdPath, buildResultadosPorEscenarioMd(resultados), "utf8");

      let fotoPathRel = null;
      try {
        const foto = extraerFotoPresentacion(resScenJsonPath);
        fotoPathRel = path.relative(ROOT, foto.outMd);
        console.log(
          "Foto:          " +
            fotoPathRel +
            " (" +
            foto.codigoFuenteSlug +
            "; solo sobrescribe esa variante prod|dev)"
        );
        if (foto.outMuestras) {
          console.log("Muestras:      " + path.relative(ROOT, foto.outMuestras));
        }
      } catch (e) {
        console.warn(
          "Foto presentación: no generada (" + (e && e.message ? e.message : e) + ")"
        );
      }

      archiveRun(
        suiteKey,
        folder,
        jsonPath,
        mdPath,
        summary,
        nota,
        codigoFuente,
        nivelEjecucion,
        resScenJsonPath,
        resScenMdPath
      );
      const regPath = path.join(LOGS, "registro-" + suiteKey + ".md");
      console.log("\nResumen:       " + path.relative(ROOT, mdPath));
      console.log("Por escenario: " + path.relative(ROOT, resScenMdPath));
      console.log("JSON:          " + path.relative(ROOT, jsonPath));
      console.log("Registro:      " + path.relative(ROOT, regPath));
      if (fotoPathRel) {
        console.log("Foto:          " + fotoPathRel);
      }
      resolve(summary);
    });
  });
}

function main() {
  const { suite, folder, insecure, nota, codigoFuente } = parseArgs(process.argv.slice(2));
  if (!suite || !SUITES[suite] && suite !== "all") {
    console.error(
      'Uso: node run-newman.js <p2m|p2p|vcn|all> [--folder "..."] [--codigo-fuente prod|dev] [--nota "..."] [--strict-ssl]'
    );
    process.exit(1);
  }

  const codigo = codigoFuente || "desconocido";
  if (!codigoFuente) {
    console.warn(
      'ADVERTENCIA: sin --codigo-fuente ni NEWMAN_CODIGO_FUENTE. Se registra "desconocido"; el informe no podrá distinguir prod de dev.'
    );
  } else {
    console.log("Código fuente desplegado: " + codigo);
  }

  if (insecure) {
    console.log("SSL: verificación desactivada (entorno dev). Usa --strict-ssl para exigir certificado.");
  }

  if (!fs.existsSync(LOGS)) {
    fs.mkdirSync(LOGS, { recursive: true });
  }

  const suites = suite === "all" ? Object.keys(SUITES) : [suite];

  (async function () {
    let exitCode = 0;
    for (const key of suites) {
      console.log("\n=== " + key.toUpperCase() + " ===");
      try {
        const summary = await runSuite(key, folder, insecure, nota, codigo);
        const failed =
          summary.run &&
          summary.run.stats &&
          summary.run.stats.assertions &&
          summary.run.stats.assertions.failed;
        if (failed > 0) {
          exitCode = 1;
        }
      } catch (e) {
        console.error(e.message || e);
        exitCode = 1;
      }
    }
    process.exit(exitCode);
  })();
}

if (require.main === module) {
  main();
}

// Helpers reutilizables por los scripts de estudio (comparar-prod-vs-dev/recopilacion/*).
// No duplicar esta lógica: importar desde aquí.
module.exports = {
  extractNegocio: extractNegocio,
  extractAssertData: extractAssertData,
  resolverRecibidoNegocio: resolverRecibidoNegocio,
  buildResultadosPorEscenario: buildResultadosPorEscenario,
  getItemPath: getItemPath,
  readStreamBody: readStreamBody,
};
