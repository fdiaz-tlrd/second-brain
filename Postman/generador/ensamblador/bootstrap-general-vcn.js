#!/usr/bin/env node
/**
 * Copia General/ de P2M Escenarios error → VCN Escenarios error
 * y adapta método de negocio (0015 → 0001) y parámetros mínimos VCN.
 *
 * Uso (desde ensamblador/):
 *   node bootstrap-general-vcn.js
 */

const fs = require("fs");
const path = require("path");

const BASE = __dirname;
const SRC_GENERAL = path.join(BASE, "../P2M Escenarios error/General");
const SRC_ESPECIALES_VALIDADOR = path.join(
  BASE,
  "../P2M Escenarios error especiales/General/2_reglaNegocio/2_validador"
);
const DST_ROOT = path.join(BASE, "../VCN Escenarios error");
const DST_GENERAL = path.join(DST_ROOT, "General");

const PARAMETROS_VCN = {
  cuenta: "{{CUENTA_VALIDA}}",
};

function transformScenario(escenario) {
  const out = JSON.parse(JSON.stringify(escenario));
  const peticion = out.body && out.body.peticion;
  if (!peticion) {
    return out;
  }
  if (peticion.metodo === "0015") {
    peticion.metodo = "0001";
  }
  if (Array.isArray(peticion.solicitudes)) {
    for (const sol of peticion.solicitudes) {
      if (sol && sol.parametros && typeof sol.parametros === "object") {
        sol.parametros = { ...PARAMETROS_VCN };
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

  if (fs.existsSync(SRC_ESPECIALES_VALIDADOR)) {
    const dstValidador = path.join(DST_GENERAL, "2_reglaNegocio/2_validador");
    copyGeneralDir(SRC_ESPECIALES_VALIDADOR, dstValidador);
    console.log("2_reglaNegocio/2_validador desde P2M especiales → VCN General");
  }

  copyFileIfExists(
    path.join(BASE, "../P2M Escenarios error/datosCanales.json"),
    path.join(DST_ROOT, "datosCanales.json")
  );

  let count = 0;
  let corrupt = 0;
  function auditJson(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        auditJson(p);
      } else if (entry.name.endsWith(".json")) {
        count += 1;
        const txt = fs.readFileSync(p, "utf8");
        if (txt.includes("\uFFFD")) {
          corrupt += 1;
          console.warn("Advertencia: U+FFFD en", path.relative(BASE, p));
        }
      }
    }
  }
  auditJson(DST_GENERAL);
  console.log("General VCN generado:", DST_GENERAL);
  console.log("Escenarios:", count);
  if (corrupt > 0) {
    console.error("Escenarios con carácter de reemplazo UTF-8:", corrupt);
    process.exit(1);
  }
}

main();
