#!/usr/bin/env node
/**
 * Copia General/ de P2M Escenarios error → P2P Escenarios error
 * y adapta método de negocio (0015 → 0002) y parámetros mínimos P2P.
 *
 * Uso (desde ensamblador/):
 *   node bootstrap-general-p2p.js
 */

const fs = require("fs");
const path = require("path");

const BASE = __dirname;
const SRC_GENERAL = path.join(BASE, "../P2M Escenarios error/General");
const DST_ROOT = path.join(BASE, "../P2P Escenarios error");
const DST_GENERAL = path.join(DST_ROOT, "General");

const PARAMETROS_P2P = {
  tipoIdentificador: "CELULAR",
};

function transformScenario(escenario) {
  const out = JSON.parse(JSON.stringify(escenario));
  const peticion = out.body && out.body.peticion;
  if (!peticion) {
    return out;
  }
  if (peticion.metodo === "0015") {
    peticion.metodo = "0002";
  }
  if (Array.isArray(peticion.solicitudes)) {
    for (const sol of peticion.solicitudes) {
      if (sol && sol.parametros && typeof sol.parametros === "object") {
        sol.parametros = { ...PARAMETROS_P2P };
      }
    }
  }
  return out;
}

function copyGeneralDir(srcDir, dstDir) {
  fs.mkdirSync(dstDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const dstPath = path.join(dstDir, entry.name);
    if (entry.isDirectory()) {
      copyGeneralDir(srcPath, dstPath);
      continue;
    }
    if (!entry.name.endsWith(".json")) {
      continue;
    }
    const escenario = JSON.parse(fs.readFileSync(srcPath, "utf8"));
    fs.writeFileSync(dstPath, JSON.stringify(transformScenario(escenario), null, 2) + "\n", "utf8");
  }
}

function copyFileIfExists(src, dst) {
  if (!fs.existsSync(src)) {
    return;
  }
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
}

function main() {
  if (!fs.existsSync(SRC_GENERAL)) {
    console.error("No existe fuente:", SRC_GENERAL);
    process.exit(1);
  }

  if (fs.existsSync(DST_GENERAL)) {
    fs.rmSync(DST_GENERAL, { recursive: true, force: true });
  }
  copyGeneralDir(SRC_GENERAL, DST_GENERAL);

  copyFileIfExists(
    path.join(BASE, "../P2M Escenarios error/datosCanales.json"),
    path.join(DST_ROOT, "datosCanales.json")
  );

  let count = 0;
  function countJson(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        countJson(p);
      } else if (entry.name.endsWith(".json")) {
        count += 1;
      }
    }
  }
  countJson(DST_GENERAL);
  console.log("General P2P generado:", DST_GENERAL);
  console.log("Escenarios:", count);
}

main();
