#!/usr/bin/env node
/**
 * Tabla de 3 columnas por escenario: esperado vs recibido MATRIZ vs recibido VALIDADOR.
 * Solo lista escenarios donde MATRIZ o VALIDADOR difieren del esperado.
 *
 * Uso:
 *   node comparar-3-columnas.js <matriz_por-escenario.json> <validador_por-escenario.json> [--salida out.md]
 */

const fs = require("fs");
const path = require("path");

const FUENTE_VCN = path.join(__dirname, "../../generador/VCN Escenarios error");

function walkScenarios(dir, prefix, out) {
  out = out || new Map();
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walkScenarios(full, prefix ? prefix + "/" + ent.name : ent.name, out);
    } else if (ent.name.endsWith(".json") && ent.name !== "package.json") {
      try {
        const s = JSON.parse(fs.readFileSync(full, "utf8"));
        if (!s.nombre || s.expectedCodigoError == null) continue;
        const ruta = prefix || "";
        out.set(ruta + "|" + s.nombre, {
          ruta: ruta,
          nombre: s.nombre,
          expectedCodigoError: s.expectedCodigoError,
          expectedHttpStatus: s.expectedHttpStatus,
          expectedTipo: s.expectedTipo || "?",
        });
      } catch (_) {
        /* skip */
      }
    }
  }
  return out;
}

/**
 * Devuelve Map key -> { recibidos:{code:count}, httpReal:{code:count}, ejec:n }.
 * `recibidos` = codigoError del payload; `httpReal` = HTTP de la lambda (si el run es enriquecido).
 */
function indexRun(runPath) {
  const data = JSON.parse(fs.readFileSync(runPath, "utf8"));
  const m = new Map();
  (data.escenarios || []).forEach(function (e) {
    const key = (e.ruta || "") + "|" + (e.nombre || "");
    if (!m.has(key)) m.set(key, { recibidos: {}, httpReal: {}, ejec: 0 });
    const agg = m.get(key);
    agg.ejec++;
    // codigo de negocio efectivo: usa recibidoNegocio si viene (enriquecido), si no codigoError
    const negocio = e.recibidoNegocio != null ? e.recibidoNegocio : e.codigoError;
    const rk = negocio == null ? "null" : String(negocio);
    agg.recibidos[rk] = (agg.recibidos[rk] || 0) + 1;
    if (e.httpRealLambda != null) {
      const hk = String(e.httpRealLambda);
      agg.httpReal[hk] = (agg.httpReal[hk] || 0) + 1;
    }
  });
  return { map: m, meta: { nivel: data.nivelEjecucion, archivo: path.basename(runPath), fecha: data.fecha } };
}

/** Representa un conjunto de recibidos como "code×N" ordenado por frecuencia. */
function fmtRecibidos(recibidos) {
  if (!recibidos) return "(ausente)";
  const keys = Object.keys(recibidos);
  if (keys.length === 0) return "(ausente)";
  keys.sort(function (a, b) {
    return recibidos[b] - recibidos[a];
  });
  return keys
    .map(function (k) {
      return k + "×" + recibidos[k];
    })
    .join(", ");
}

/** Conjunto de códigos (sin conteos) ordenado, para comparar M vs V sin ruido de variantes. */
function setCodigos(recibidos) {
  if (!recibidos) return "(ausente)";
  return Object.keys(recibidos).sort().join(",");
}

/** ¿El conjunto recibido coincide plenamente con lo esperado? */
function coincidePleno(esperado, tipo, recibidos) {
  if (!recibidos) return false;
  const keys = Object.keys(recibidos);
  if (keys.length !== 1) return false;
  const rec = keys[0];
  if (tipo === "exito") return rec === "null" || rec === "0";
  return rec === String(esperado);
}

function main() {
  const args = process.argv.slice(2);
  const files = args.filter(function (a) {
    return !a.startsWith("--");
  });
  const salidaIdx = args.indexOf("--salida");
  const salida = salidaIdx >= 0 ? args[salidaIdx + 1] : null;
  if (files.length < 2) {
    console.error(
      "Uso: node comparar-3-columnas.js <matriz.json> <validador.json> [--salida out.md]"
    );
    process.exit(1);
  }
  const abs = function (p) {
    return path.isAbsolute(p) ? p : path.join(process.cwd(), p);
  };
  const fuente = walkScenarios(FUENTE_VCN, "");
  const matriz = indexRun(abs(files[0]));
  const validador = indexRun(abs(files[1]));

  const rows = [];
  fuente.forEach(function (src, key) {
    const m = matriz.map.get(key);
    const v = validador.map.get(key);
    if (!m && !v) return; // no ejecutado en ninguno
    const mOk = coincidePleno(src.expectedCodigoError, src.expectedTipo, m && m.recibidos);
    const vOk = coincidePleno(src.expectedCodigoError, src.expectedTipo, v && v.recibidos);
    if (mOk && vOk) return; // ambos coinciden → no es diferencia
    rows.push({
      ruta: src.ruta,
      nombre: src.nombre,
      esperado: src.expectedTipo === "exito" ? "exito(0/null)" : String(src.expectedCodigoError),
      matriz: fmtRecibidos(m && m.recibidos),
      validador: fmtRecibidos(v && v.recibidos),
      mOk: mOk,
      vOk: vOk,
      // diferencia entre matriz y validador por CONJUNTO de códigos (ignora conteo de variantes)
      matrizVsValidador:
        setCodigos(m && m.recibidos) === setCodigos(v && v.recibidos) ? "igual" : "distinto",
    });
  });

  rows.sort(function (a, b) {
    return (a.ruta + a.nombre).localeCompare(b.ruta + b.nombre);
  });

  // --- HTTP: esperado vs real (solo diferencias) ---
  const httpRows = [];
  let httpDisponible = false;
  fuente.forEach(function (src, key) {
    if (src.expectedHttpStatus == null) return;
    const m = matriz.map.get(key);
    const v = validador.map.get(key);
    if (!m && !v) return;
    const mHttp = m && Object.keys(m.httpReal).length ? m.httpReal : null;
    const vHttp = v && Object.keys(v.httpReal).length ? v.httpReal : null;
    if (mHttp || vHttp) httpDisponible = true;
    const esp = String(src.expectedHttpStatus);
    const mSet = setCodigos(mHttp);
    const vSet = setCodigos(vHttp);
    const mOk = mSet === esp;
    const vOk = vSet === esp;
    if (mOk && vOk) return; // ambos HTTP coinciden con esperado
    httpRows.push({
      ruta: src.ruta,
      nombre: src.nombre,
      esperado: esp,
      matriz: fmtRecibidos(mHttp),
      validador: fmtRecibidos(vHttp),
      mvv: mSet === vSet ? "=" : "**≠**",
    });
  });
  httpRows.sort(function (a, b) {
    return (a.ruta + a.nombre).localeCompare(b.ruta + b.nombre);
  });

  // Resumen
  const total = rows.length;
  const soloMatriz = rows.filter(function (r) {
    return !r.mOk && r.vOk;
  }).length;
  const soloValidador = rows.filter(function (r) {
    return r.mOk && !r.vOk;
  }).length;
  const ambos = rows.filter(function (r) {
    return !r.mOk && !r.vOk;
  }).length;
  const mDistintoV = rows.filter(function (r) {
    return r.matrizVsValidador === "distinto";
  }).length;

  const L = [];
  L.push("# Comparación por escenario — esperado vs MATRIZ vs VALIDADOR (solo diferencias)");
  L.push("");
  L.push("**Runs:**");
  L.push("");
  L.push("- MATRIZ: `" + matriz.meta.archivo + "`");
  L.push("- VALIDADOR: `" + validador.meta.archivo + "`");
  L.push("");
  L.push("**Leyenda:** `codigo×N` = ese `codigoError` en N ejecuciones (variantes de cifrado). `null` = respuesta sin `codigoError` (éxito de negocio). `(ausente)` = escenario no presente en ese run.");
  L.push("");
  L.push("## Resumen de diferencias");
  L.push("");
  L.push("| Métrica | Valor |");
  L.push("|---------|-------|");
  L.push("| Escenarios con alguna diferencia | **" + total + "** |");
  L.push("| Difiere **solo en MATRIZ** (validador ok) | " + soloMatriz + " |");
  L.push("| Difiere **solo en VALIDADOR** (matriz ok) | " + soloValidador + " |");
  L.push("| Difiere en **ambos** | " + ambos + " |");
  L.push("| MATRIZ y VALIDADOR devuelven **distinto** entre sí | " + mDistintoV + " |");
  L.push("");
  L.push("## Tabla A — NEGOCIO (codigoError del payload), solo diferencias");
  L.push("");
  L.push("| Ruta | Escenario | Esperado | MATRIZ recibido | VALIDADOR recibido | M vs V |");
  L.push("|------|-----------|----------|-----------------|--------------------|--------|");
  rows.forEach(function (r) {
    L.push(
      "| `" +
        r.ruta +
        "` | " +
        r.nombre.replace(/\|/g, "\\|") +
        " | " +
        r.esperado +
        " | " +
        r.matriz +
        " | " +
        r.validador +
        " | " +
        (r.matrizVsValidador === "distinto" ? "**≠**" : "=") +
        " |"
    );
  });
  L.push("");
  L.push("## Tabla B — HTTP (status de protocolo de la lambda), solo diferencias");
  L.push("");
  if (!httpDisponible) {
    L.push("Sin dato de HTTP real (runs no enriquecidos). Regenerar con `regenerar-por-escenario.js`.");
  } else {
    L.push(
      "HTTP real de la lambda vs `expectedHttpStatus` del plan. Recuerda: por MATRIZ la lambda suele aplanar todo a 200."
    );
    L.push("");
    L.push("| Ruta | Escenario | HTTP esperado | MATRIZ HTTP real | VALIDADOR HTTP real | M vs V |");
    L.push("|------|-----------|---------------|------------------|---------------------|--------|");
    httpRows.forEach(function (r) {
      L.push(
        "| `" +
          r.ruta +
          "` | " +
          r.nombre.replace(/\|/g, "\\|") +
          " | " +
          r.esperado +
          " | " +
          r.matriz +
          " | " +
          r.validador +
          " | " +
          r.mvv +
          " |"
      );
    });
  }
  L.push("");

  const md = L.join("\n");
  console.log(
    "NEGOCIO dif: " +
      total +
      " | solo MATRIZ: " +
      soloMatriz +
      " | solo VALIDADOR: " +
      soloValidador +
      " | ambos: " +
      ambos +
      " | M≠V: " +
      mDistintoV
  );
  console.log("HTTP dif (esperado vs real): " + httpRows.length + (httpDisponible ? "" : " (sin dato real)"));

  if (salida) {
    const out = abs(salida);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, md, "utf8");
    console.log("Escrito: " + out);
  } else {
    console.log(md);
  }
}

main();
