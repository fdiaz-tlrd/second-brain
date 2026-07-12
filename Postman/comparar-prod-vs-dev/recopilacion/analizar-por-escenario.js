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

function analizar(data) {
  const esc = data.escenarios || [];
  const http = {};
  const codigoError = {};
  const porRutaTop = {};

  esc.forEach(function (e) {
    const h = String(e.httpDescifrar != null ? e.httpDescifrar : "null");
    http[h] = (http[h] || 0) + 1;
    const c = String(e.codigoError != null ? e.codigoError : "null");
    codigoError[c] = (codigoError[c] || 0) + 1;
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
  const unicos550 = [...unicos.values()].filter(function (u) {
    return u.codigoError === 550;
  }).length;
  const unicos400 = [...unicos.values()].filter(function (u) {
    return u.codigoError === 400;
  }).length;
  const exito = [...unicos.values()].filter(function (u) {
    return (u.ruta || "").includes("3_respuestaExitosa") || (u.nombre || "").includes("(exito)");
  });

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
    ejecuciones: {
      total: esc.length,
      http: http,
      codigoError: codigoError,
      topCodigoError: topEntries(codigoError, 10),
    },
    escenariosUnicos: {
      total: unicos.size,
      codigo550: unicos550,
      codigo400: unicos400,
      pct550: unicos.size ? Math.round((unicos550 / unicos.size) * 1000) / 10 : 0,
    },
    bloquesRuta: porRutaTop,
    respuestaExitosa: {
      grupos: exito.length,
      todos550: exito.every(function (x) {
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
  if (salida) {
    const out = path.isAbsolute(salida) ? salida : path.join(process.cwd(), salida);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, text, "utf8");
    console.log("Resumen escrito: " + out);
  } else {
    console.log(text);
  }
}

main();
