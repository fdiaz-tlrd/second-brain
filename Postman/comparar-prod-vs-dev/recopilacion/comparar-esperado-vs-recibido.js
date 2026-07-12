#!/usr/bin/env node
/**
 * Cruza *_por-escenario.json con los JSON fuente (expectedCodigoError, expectedTipo)
 * y reporta esperado vs recibido.
 *
 * Uso:
 *   node comparar-esperado-vs-recibido.js <por-escenario.json> [--salida resumen.json]
 */

const fs = require("fs");
const path = require("path");

const FUENTE_VCN = path.join(
  __dirname,
  "../../generador/VCN Escenarios error"
);

function walkScenarios(dir, prefix) {
  const out = new Map();
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      const sub = walkScenarios(full, prefix ? prefix + "/" + ent.name : ent.name);
      sub.forEach(function (v, k) {
        out.set(k, v);
      });
    } else if (ent.name.endsWith(".json") && ent.name !== "package.json") {
      try {
        const s = JSON.parse(fs.readFileSync(full, "utf8"));
        if (!s.nombre || s.expectedCodigoError == null) continue;
        const ruta = prefix || "";
        const key = ruta + "|" + s.nombre;
        out.set(key, {
          ruta: ruta,
          nombre: s.nombre,
          expectedHttpStatus: s.expectedHttpStatus,
          expectedCodigoError: s.expectedCodigoError,
          expectedTipo: s.expectedTipo || "?",
        });
      } catch (_) {
        /* skip */
      }
    }
  }
  return out;
}

function groupUnique(escenarios) {
  const m = new Map();
  escenarios.forEach(function (e) {
    const k = (e.ruta || "") + "|" + (e.nombre || "");
    if (!m.has(k)) m.set(k, e);
  });
  return m;
}

function codigoRecibidoOk(esperado, recibido, tipo) {
  if (tipo === "exito") {
    return recibido === 0 || recibido === "0";
  }
  return recibido === esperado;
}

/**
 * Código de negocio RECIBIDO efectivo. Prefiere `recibidoNegocio` (run enriquecido:
 * respuestas[0].resultado para parametro/metodo/exito, codigoError para general).
 * Cae a codigoError si el run no está enriquecido.
 */
function recibidoDe(e) {
  if (Object.prototype.hasOwnProperty.call(e, "recibidoNegocio") && e.recibidoNegocio !== undefined) {
    return e.recibidoNegocio;
  }
  return e.codigoError;
}

function analizar(porEscenarioPath, fuenteMap) {
  const data = JSON.parse(fs.readFileSync(porEscenarioPath, "utf8"));
  const escenarios = data.escenarios || [];

  let ejecCoincide = 0;
  let ejecDifiere = 0;
  let ejecSinFuente = 0;
  const diferencias = [];
  const porEsperado = {};
  const porBloque = {};
  const porEscenario = new Map();

  escenarios.forEach(function (e) {
    const key = (e.ruta || "") + "|" + (e.nombre || "");
    const src = fuenteMap.get(key);
    if (!src) {
      ejecSinFuente++;
      return;
    }
    const esp = src.expectedTipo === "exito" ? 0 : src.expectedCodigoError;
    const rec = recibidoDe(e);
    const ok = codigoRecibidoOk(esp, rec, src.expectedTipo);
    const bloque = (e.ruta || "").split("/").slice(0, 2).join("/") || e.ruta || "?";

    if (!porBloque[bloque]) {
      porBloque[bloque] = { total: 0, coincide: 0, difiere: 0 };
    }
    porBloque[bloque].total++;

    if (!porEscenario.has(key)) {
      porEscenario.set(key, {
        ruta: e.ruta,
        nombre: e.nombre,
        expectedTipo: src.expectedTipo,
        esperado: esp,
        ejecuciones: 0,
        coincide: 0,
        difiere: 0,
        recibidos: {},
      });
    }
    const agg = porEscenario.get(key);
    agg.ejecuciones++;
    const rk = rec == null ? "null" : String(rec);
    agg.recibidos[rk] = (agg.recibidos[rk] || 0) + 1;

    if (ok) {
      ejecCoincide++;
      porBloque[bloque].coincide++;
      agg.coincide++;
    } else {
      ejecDifiere++;
      porBloque[bloque].difiere++;
      agg.difiere++;
      const pair = esp + "→" + rk;
      porEsperado[pair] = (porEsperado[pair] || 0) + 1;
      diferencias.push({
        ruta: e.ruta,
        nombre: e.nombre,
        expectedTipo: src.expectedTipo,
        esperado: esp,
        recibido: rec,
        assertPaso: e.assertPaso,
        par: pair,
      });
    }
  });

  let escTodosCoinciden = 0;
  let escAlgunaDifiere = 0;
  let escTodasDifieren = 0;
  const escenariosResumen = [];
  porEscenario.forEach(function (agg) {
    if (agg.difiere === 0) escTodosCoinciden++;
    else escAlgunaDifiere++;
    if (agg.coincide === 0) escTodasDifieren++;
    if (agg.difiere > 0) {
      escenariosResumen.push({
        ruta: agg.ruta,
        nombre: agg.nombre,
        esperado: agg.esperado,
        expectedTipo: agg.expectedTipo,
        ejecuciones: agg.ejecuciones,
        coincide: agg.coincide,
        difiere: agg.difiere,
        recibidos: agg.recibidos,
      });
    }
  });
  escenariosResumen.sort(function (a, b) {
    return b.difiere - a.difiere || a.nombre.localeCompare(b.nombre);
  });

  const pares = {};
  diferencias.forEach(function (d) {
    pares[d.par] = (pares[d.par] || 0) + 1;
  });
  const topPares = Object.keys(pares)
    .map(function (k) {
      return { par: k, count: pares[k] };
    })
    .sort(function (a, b) {
      return b.count - a.count;
    })
    .slice(0, 30);

  const totalConFuente = ejecCoincide + ejecDifiere;

  return {
    meta: {
      archivo: path.basename(porEscenarioPath),
      suite: data.suite,
      fecha: data.fecha,
      codigoFuente: data.codigoFuente,
      nivelEjecucion: data.nivelEjecucion,
      fuenteEscenarios: fuenteMap.size,
    },
    resumen: {
      ejecucionesConFuente: totalConFuente,
      ejecucionesSinFuente: ejecSinFuente,
      ejecucionesCoinciden: ejecCoincide,
      ejecucionesDifieren: ejecDifiere,
      pctEjecCoincide: totalConFuente
        ? Math.round((ejecCoincide / totalConFuente) * 1000) / 10
        : 0,
      pctEjecDifiere: totalConFuente
        ? Math.round((ejecDifiere / totalConFuente) * 1000) / 10
        : 0,
      escenariosUnicosConFuente: porEscenario.size,
      escenariosTodosEjecCoinciden: escTodosCoinciden,
      escenariosConAlgunaEjecDiferente: escAlgunaDifiere,
      escenariosTodasEjecDifieren: escTodasDifieren,
    },
    porBloque: porBloque,
    topParesEsperadoRecibido: topPares,
    escenariosConDiferencias: escenariosResumen,
    diferenciasEjecucion: diferencias.length,
  };
}

function buildMd(r) {
  const L = [];
  L.push("# Esperado vs recibido — " + (r.meta.nivelEjecucion || "?"));
  L.push("");
  L.push("| Campo | Valor |");
  L.push("|-------|-------|");
  L.push("| Archivo run | `" + r.meta.archivo + "` |");
  L.push("| Código fuente | " + r.meta.codigoFuente + " |");
  L.push("| Nivel | " + r.meta.nivelEjecucion + " |");
  L.push("");
  L.push("## Resumen");
  L.push("");
  L.push(
    "- **Ejecuciones** con fuente: **" +
      r.resumen.ejecucionesConFuente +
      "** → coinciden **" +
      r.resumen.ejecucionesCoinciden +
      "** (" +
      r.resumen.pctEjecCoincide +
      "%) | difieren **" +
      r.resumen.ejecucionesDifieren +
      "** (" +
      r.resumen.pctEjecDifiere +
      "%)"
  );
  L.push(
    "- **Escenarios únicos**: **" +
      r.resumen.escenariosUnicosConFuente +
      "** → todos sus runs coinciden: **" +
      r.resumen.escenariosTodosEjecCoinciden +
      "** | con al menos un run distinto: **" +
      r.resumen.escenariosConAlgunaEjecDiferente +
      "** | todos los runs distintos: **" +
      r.resumen.escenariosTodasEjecDifieren +
      "**"
  );
  L.push("");
  L.push("### Por bloque de ruta");
  L.push("");
  L.push("| Bloque | Total | Coinciden | Difieren |");
  L.push("|--------|-------|-----------|----------|");
  Object.keys(r.porBloque).forEach(function (k) {
    const v = r.porBloque[k];
    L.push("| `" + k + "` | " + v.total + " | " + v.coincide + " | " + v.difiere + " |");
  });
  L.push("");
  L.push("### Top pares esperado → recibido (solo diferencias)");
  L.push("");
  L.push("| Esperado → Recibido | Cantidad |");
  L.push("|---------------------|----------|");
  r.topParesEsperadoRecibido.forEach(function (p) {
    L.push("| " + p.par + " | " + p.count + " |");
  });
  L.push("");
  return L.join("\n");
}

function main() {
  const args = process.argv.slice(2);
  const input = args.find(function (a) {
    return !a.startsWith("--");
  });
  const salidaIdx = args.indexOf("--salida");
  const salida = salidaIdx >= 0 ? args[salidaIdx + 1] : null;
  if (!input) {
    console.error(
      "Uso: node comparar-esperado-vs-recibido.js <por-escenario.json> [--salida out.json]"
    );
    process.exit(1);
  }
  const full = path.isAbsolute(input) ? input : path.join(process.cwd(), input);
  const fuente = walkScenarios(FUENTE_VCN, "");
  const res = analizar(full, fuente);
  const text = JSON.stringify(res, null, 2);

  console.log("=== ESPERADO vs RECIBIDO ===");
  console.log(
    "Ejecuciones coinciden: " +
      res.resumen.ejecucionesCoinciden +
      " | difieren: " +
      res.resumen.ejecucionesDifieren +
      " (" +
      res.resumen.pctEjecDifiere +
      "%)"
  );
  console.log(
    "Escenarios unicos con alguna dif: " +
      res.resumen.escenariosConAlgunaEjecDiferente +
      " / " +
      res.resumen.escenariosUnicosConFuente
  );
  console.log("Top pares (diferencias):");
  res.topParesEsperadoRecibido.slice(0, 10).forEach(function (p) {
    console.log("  " + p.par + " x" + p.count);
  });

  if (salida) {
    const out = path.isAbsolute(salida) ? salida : path.join(process.cwd(), salida);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, text, "utf8");
    const outMd = out.replace(/\.json$/i, "") + ".md";
    fs.writeFileSync(outMd, buildMd(res), "utf8");
    console.log("Escrito: " + out);
    console.log("Escrito: " + outMd);
  } else {
    console.log(text);
  }
}

main();
