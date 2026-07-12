#!/usr/bin/env node
/**
 * Resumen estadístico de un archivo resultados-por-escenario-*.json (o *_por-escenario.json en historial).
 *
 * Uso (desde Postman/generador o cualquier cwd):
 *   node ../../comparar-prod-vs-dev/recopilacion/analizar-por-escenario.js logs/historial/vcn/2026-07-12T17-20-06Z_prod_MATRIZ_completo_por-escenario.json
 *   node ... --salida recopilacion/resumen-2026-07-12.json
 */

const fs = require("fs");
const path = require("path");

function parseArgs(argv) {
  const positional = [];
  let salida = null;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--salida" && argv[i + 1]) {
      salida = argv[++i];
    } else if (!argv[i].startsWith("-")) {
      positional.push(argv[i]);
    }
  }
  return { input: positional[0], salida };
}

function groupUnique(escenarios) {
  const m = new Map();
  escenarios.forEach(function (e) {
    const k = (e.ruta || "?") + "|" + (e.nombre || "?");
    if (!m.has(k)) {
      m.set(k, {
        ruta: e.ruta,
        nombre: e.nombre,
        codigoError: e.codigoError,
        httpDescifrar: e.httpDescifrar,
        assertPaso: e.assertPaso,
        bodySample: (e.body || "").slice(0, 200),
        reps: 0,
      });
    }
    m.get(k).reps++;
  });
  return m;
}

function topEntries(obj, n) {
  return Object.entries(obj)
    .sort(function (a, b) {
      return b[1] - a[1];
    })
    .slice(0, n)
    .map(function (entry) {
      return { key: entry[0], count: entry[1] };
    });
}

/**
 * ¿La ejecución representa una respuesta de negocio POSITIVA (camino feliz OK)?
 * Positiva = HTTP 200, sin codigoError de error, y con payload de negocio
 * (resultado / respuesta / respuestas), o assert en verde.
 */
function esRespuestaPositiva(e) {
  if (e.assertPaso === true) {
    return true;
  }
  if (e.resultado != null && e.resultado !== "") {
    return true;
  }
  const cod = e.codigoError;
  const codOk = cod == null || cod === 0 || cod === "0" || cod === 200 || cod === "200";
  if (!codOk) {
    return false;
  }
  const body = String(e.body || "");
  // Sin codigoError de error y con estructura de negocio esperada.
  const tieneNegocio = /"resultado"|"respuestas"|"respuesta"\s*:/.test(body);
  const tieneError = /"codigoError"\s*:\s*(?!0)\d/.test(body);
  return tieneNegocio && !tieneError;
}

function esEscenarioExito(o) {
  return (o.ruta || "").includes("3_respuestaExitosa") || (o.nombre || "").includes("(exito)");
}

function analizar(data) {
  const esc = data.escenarios || [];
  const http = {}; // HTTP del dummy /descifrar (legado)
  const httpReal = {}; // HTTP real de la lambda (matriz/validador/VCN) si está disponible
  const httpEsp = {}; // HTTP esperado por el plan
  const codigoError = {};
  const porRutaTop = {};
  let assertOkTotal = 0;
  let assertFailTotal = 0;
  let assertNullTotal = 0;
  let positivasTotal = 0;
  let httpRealDisponible = 0;
  let httpCoincideOk = 0;
  let httpDifiere = 0;

  esc.forEach(function (e) {
    const h = String(e.httpDescifrar != null ? e.httpDescifrar : "null");
    http[h] = (http[h] || 0) + 1;
    // HTTP real de la lambda (solo en runs enriquecidos)
    if (e.httpRealLambda != null) {
      httpRealDisponible++;
      const hr = String(e.httpRealLambda);
      httpReal[hr] = (httpReal[hr] || 0) + 1;
      if (e.httpEsperado != null) {
        const he = String(e.httpEsperado);
        httpEsp[he] = (httpEsp[he] || 0) + 1;
        if (e.httpEsperado === e.httpRealLambda) httpCoincideOk++;
        else httpDifiere++;
      }
    }
    const c = String(e.codigoError != null ? e.codigoError : "null");
    codigoError[c] = (codigoError[c] || 0) + 1;
    if (e.assertPaso === true) assertOkTotal++;
    else if (e.assertPaso === false) assertFailTotal++;
    else assertNullTotal++;
    if (esRespuestaPositiva(e)) positivasTotal++;
    const parts = (e.ruta || "").split("/");
    const top = parts.slice(0, 2).join("/") || e.ruta || "?";
    if (!porRutaTop[top]) {
      porRutaTop[top] = { total: 0, c550: 0, c400: 0, otro: 0 };
    }
    porRutaTop[top].total++;
    if (e.codigoError === 550) {
      porRutaTop[top].c550++;
    } else if (e.codigoError === 400) {
      porRutaTop[top].c400++;
    } else {
      porRutaTop[top].otro++;
    }
  });

  const unicos = groupUnique(esc);
  const unicosArr = [...unicos.values()];
  const unicos550 = unicosArr.filter(function (u) {
    return u.codigoError === 550;
  }).length;
  const unicos400 = unicosArr.filter(function (u) {
    return u.codigoError === 400;
  }).length;
  const unicosPositivos = unicosArr.filter(esRespuestaPositiva).length;
  const exito = unicosArr.filter(esEscenarioExito);
  const exitoPositivos = exito.filter(esRespuestaPositiva).length;

  const codDominante = topEntries(codigoError, 1)[0] || { key: "?", count: 0 };
  const pctDominante = esc.length ? Math.round((codDominante.count / esc.length) * 1000) / 10 : 0;

  // --- Señales automáticas (para no re-estudiar preguntas obvias) ---
  const banderas = [];
  if (positivasTotal === 0) {
    banderas.push(
      "CRITICO: 0 respuestas positivas en TODO el run (" +
        esc.length +
        " ejecuciones). Ningun camino feliz respondio negocio."
    );
  }
  if (exito.length > 0 && exitoPositivos === 0) {
    banderas.push(
      "CRITICO: los " +
        exito.length +
        " escenarios de EXITO (camino feliz) no devolvieron respuesta positiva (todos error)."
    );
  }
  if (assertOkTotal === 0 && esc.length > 0) {
    banderas.push("CRITICO: 0 asserts en verde en todo el run.");
  }
  if (codDominante.key !== "400" && pctDominante >= 80) {
    banderas.push(
      "ANOMALIA: codigoError " +
        codDominante.key +
        " domina el " +
        pctDominante +
        "% de las ejecuciones (esperado: variedad por escenario)."
    );
  }
  if (String(codDominante.key) === "550" && pctDominante >= 80) {
    banderas.push(
      "SEÑAL DE DESPLIEGUE: 550 'Error inesperado' sistematico apunta a problema de CODIGO o CONFIGURACION en lo desplegado, no a validacion de negocio. Un servicio ya liberado en produccion no deberia errar asi de forma masiva."
    );
  }
  const soloHttp200 = Object.keys(http).length === 1 && http["200"] === esc.length;
  if (soloHttp200 && positivasTotal === 0) {
    banderas.push(
      "PISTA: HTTP siempre 200 pero negocio siempre error -> la infra responde; el fallo esta en la logica/payload de negocio tras descifrar, no en red/conectividad."
    );
  }

  // --- HTTP real de la lambda (protocolo, distinto de codigoError del payload) ---
  const httpRealSolo200 =
    httpRealDisponible > 0 &&
    Object.keys(httpReal).length === 1 &&
    httpReal["200"] === httpRealDisponible;
  const pctHttpDifiere =
    httpCoincideOk + httpDifiere
      ? Math.round((httpDifiere / (httpCoincideOk + httpDifiere)) * 1000) / 10
      : 0;
  if (httpRealSolo200 && httpDifiere > 0) {
    banderas.push(
      "HTTP: la lambda devuelve HTTP 200 en TODAS las " +
        httpRealDisponible +
        " ejecuciones, pero el plan esperaba HTTP != 200 en " +
        httpDifiere +
        " (" +
        pctHttpDifiere +
        "%). El status HTTP no refleja el error de negocio (todo va 200 + codigoError en el body)."
    );
  } else if (httpDifiere > 0) {
    banderas.push(
      "HTTP: " +
        httpDifiere +
        " ejecuciones (" +
        pctHttpDifiere +
        "%) con HTTP real != esperado. Revisar tabla de comparacion."
    );
  }

  // --- Respuestas a preguntas obvias (precomputadas) ---
  const preguntasObvias = {
    "¿algun camino feliz dio respuesta positiva?": exitoPositivos > 0 ? "SI (" + exitoPositivos + ")" : "NO",
    "¿alguna respuesta positiva en todo el run?": positivasTotal > 0 ? "SI (" + positivasTotal + ")" : "NO",
    "¿algun assert en verde?": assertOkTotal > 0 ? "SI (" + assertOkTotal + ")" : "NO",
    "codigoError dominante": codDominante.key + " (" + pctDominante + "% ejecuciones)",
    "¿HTTP (dummy descifrar) siempre 200?": soloHttp200 ? "SI" : "NO",
    "¿HTTP REAL de la lambda siempre 200?": httpRealDisponible === 0
      ? "sin dato (run no enriquecido)"
      : httpRealSolo200
      ? "SI (aplana todo a 200)"
      : "NO",
    "¿HTTP real coincide con lo esperado?": httpRealDisponible === 0
      ? "sin dato (run no enriquecido)"
      : httpDifiere === 0
      ? "SI (todos)"
      : "NO en " + httpDifiere + " (" + pctHttpDifiere + "%)",
    "veredicto": banderas.length
      ? "Comportamiento anomalo: apunta a problema en lo desplegado (codigo/config)."
      : "Sin anomalias criticas detectadas.",
  };

  return {
    meta: {
      suite: data.suite,
      fecha: data.fecha,
      codigoFuente: data.codigoFuente,
      nivelEjecucion: data.nivelEjecucion,
      folder: data.folder,
      nota: data.nota,
      archivo: data._archivo || null,
    },
    banderas: banderas,
    preguntasObvias: preguntasObvias,
    ejecuciones: {
      total: esc.length,
      positivas: positivasTotal,
      assertOk: assertOkTotal,
      assertFail: assertFailTotal,
      assertNull: assertNullTotal,
      http: http,
      codigoError: codigoError,
      topCodigoError: topEntries(codigoError, 10),
    },
    httpProtocolo: {
      disponible: httpRealDisponible,
      realLambda: httpReal,
      esperado: httpEsp,
      coincide: httpCoincideOk,
      difiere: httpDifiere,
      pctDifiere: pctHttpDifiere,
      lambdaSiempre200: httpRealSolo200,
    },
    escenariosUnicos: {
      total: unicos.size,
      positivos: unicosPositivos,
      codigo550: unicos550,
      codigo400: unicos400,
      pct550: unicos.size ? Math.round((unicos550 / unicos.size) * 1000) / 10 : 0,
    },
    bloquesRuta: porRutaTop,
    respuestaExitosa: {
      grupos: exito.length,
      positivos: exitoPositivos,
      todos550: exito.length > 0 && exito.every(function (x) {
        return x.codigoError === 550;
      }),
      codigo550: exito.filter(function (x) {
        return x.codigoError === 550;
      }).length,
    },
    escenariosUnicosCon400: [...unicos.entries()]
      .filter(function (entry) {
        return entry[1].codigoError === 400;
      })
      .map(function (entry) {
        return entry[0];
      }),
  };
}

function buildMd(r) {
  const L = [];
  L.push("# Análisis por escenario — " + String(r.meta.suite || "").toUpperCase());
  L.push("");
  L.push("| Campo | Valor |");
  L.push("|-------|-------|");
  L.push("| Archivo | `" + (r.meta.archivo || "?") + "` |");
  L.push("| Código fuente | " + r.meta.codigoFuente + " |");
  L.push("| Nivel ejecución | " + r.meta.nivelEjecucion + " |");
  L.push("| Fecha | " + r.meta.fecha + " |");
  L.push("");
  L.push("## Preguntas obvias (precomputadas)");
  L.push("");
  L.push("| Pregunta | Respuesta |");
  L.push("|----------|-----------|");
  Object.keys(r.preguntasObvias).forEach(function (k) {
    L.push("| " + k + " | **" + r.preguntasObvias[k] + "** |");
  });
  L.push("");
  L.push("## Banderas / señales automáticas");
  L.push("");
  if (r.banderas.length === 0) {
    L.push("Sin banderas.");
  } else {
    r.banderas.forEach(function (b) {
      L.push("- " + b);
    });
  }
  L.push("");
  L.push("## Números");
  L.push("");
  L.push("- Ejecuciones: **" + r.ejecuciones.total + "** | positivas: **" + r.ejecuciones.positivas + "** | assert OK: **" + r.ejecuciones.assertOk + "**");
  L.push("- Escenarios únicos: **" + r.escenariosUnicos.total + "** | positivos: **" + r.escenariosUnicos.positivos + "** | 550: **" + r.escenariosUnicos.codigo550 + "** | 400: **" + r.escenariosUnicos.codigo400 + "**");
  L.push("- Caminos felices (éxito): grupos **" + r.respuestaExitosa.grupos + "**, positivos **" + r.respuestaExitosa.positivos + "**");
  L.push("- Top codigoError: " + r.ejecuciones.topCodigoError.map(function (t) { return t.key + "×" + t.count; }).join(", "));
  L.push("");
  L.push("### HTTP (protocolo) — real de la lambda vs esperado");
  L.push("");
  if (!r.httpProtocolo || r.httpProtocolo.disponible === 0) {
    L.push("Sin dato de HTTP real (run no enriquecido; regenerar con `regenerar-por-escenario.js`).");
  } else {
    const hp = r.httpProtocolo;
    L.push("- Ejecuciones con HTTP real: **" + hp.disponible + "** | coincide con esperado: **" + hp.coincide + "** | difiere: **" + hp.difiere + "** (" + hp.pctDifiere + "%)");
    L.push("- HTTP real de la lambda: " + Object.keys(hp.realLambda).map(function (k) { return k + "×" + hp.realLambda[k]; }).join(", "));
    L.push("- HTTP esperado por el plan: " + Object.keys(hp.esperado).map(function (k) { return k + "×" + hp.esperado[k]; }).join(", "));
    L.push("- ¿La lambda aplana todo a HTTP 200?: **" + (hp.lambdaSiempre200 ? "SÍ" : "NO") + "**");
  }
  L.push("");
  L.push("### Por bloque de ruta");
  L.push("");
  L.push("| Bloque | Total | 550 | 400 | otro |");
  L.push("|--------|-------|-----|-----|------|");
  Object.keys(r.bloquesRuta).forEach(function (k) {
    const v = r.bloquesRuta[k];
    L.push("| `" + k + "` | " + v.total + " | " + v.c550 + " | " + v.c400 + " | " + v.otro + " |");
  });
  L.push("");
  return L.join("\n");
}

function main() {
  const { input, salida } = parseArgs(process.argv.slice(2));
  if (!input) {
    console.error(
      "Uso: node analizar-por-escenario.js <ruta-por-escenario.json> [--salida resumen.json]"
    );
    process.exit(1);
  }
  const full = path.isAbsolute(input) ? input : path.join(process.cwd(), input);
  if (!fs.existsSync(full)) {
    console.error("No existe: " + full);
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(full, "utf8"));
  data._archivo = path.basename(full);
  const resumen = analizar(data);
  const text = JSON.stringify(resumen, null, 2);

  // Banderas siempre a consola (lo primero que se debe ver).
  console.log("=== BANDERAS ===");
  if (resumen.banderas.length === 0) console.log("(ninguna)");
  else resumen.banderas.forEach(function (b) { console.log("- " + b); });
  console.log("=== PREGUNTAS OBVIAS ===");
  Object.keys(resumen.preguntasObvias).forEach(function (k) {
    console.log("- " + k + ": " + resumen.preguntasObvias[k]);
  });
  console.log("");

  if (salida) {
    const out = path.isAbsolute(salida) ? salida : path.join(process.cwd(), salida);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, text, "utf8");
    console.log("Resumen JSON escrito: " + out);
    const outMd = out.replace(/\.json$/i, "") + ".md";
    fs.writeFileSync(outMd, buildMd(resumen), "utf8");
    console.log("Resumen MD escrito: " + outMd);
  } else {
    console.log(text);
  }
}

main();
