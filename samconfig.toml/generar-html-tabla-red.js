/**
 * Genera tabla-red-ambientes.html con colores por ID de red.
 * Lee los samconfig.toml de los 10 repos (no el MD).
 *
 * Uso (desde esta carpeta o desde GitHub/):
 *   node second-brain/samconfig.toml/generar-html-tabla-red.js
 */
const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const ROOT = path.resolve(DIR, "../..");
const OUT = path.join(DIR, "tabla-red-ambientes.html");

const REPOS = [
  "tld-matriz",
  "tld-validador-api",
  "tld-api-cuenta-nombre",
  "tld-api-alias",
  "tld-api-r2p",
  "tld-api-p2m",
  "tld-preg-seguridad",
  "tld-api-qrpayment",
  "tld-validador-proxy",
  "tld-achx",
];

const FIELDS = ["VPCe", "SG", "S1", "S2", "S3"];
const FIELD_LABEL = {
  VPCe: "VPCe",
  SG: "SecurityGroup",
  S1: "Subnet1",
  S2: "Subnet2",
  S3: "Subnet3",
};

const GROUPS = [
  { id: "dev-va", env: "dev", region: "Virginia", profile: "dev" },
  { id: "sandbox-va", env: "sandbox", region: "Virginia", profile: "sandbox" },
  { id: "qa-va", env: "qa", region: "Virginia", profile: "qa" },
  { id: "prod-va", env: "prod", region: "Virginia", profile: "prod" },
  { id: "dev-or", env: "dev", region: "Oregon", profile: "dev-oregon" },
  { id: "sandbox-or", env: "sandbox", region: "Oregon", profile: "sandbox-oregon" },
  { id: "qa-or", env: "qa", region: "Oregon", profile: "qa-oregon" },
  { id: "prod-or", env: "prod", region: "Oregon", profile: "prod-oregon" },
];

const PALETTE = [
  ["#c8efc0", "#246318"],
  ["#c5e1ff", "#1a4d8c"],
  ["#ffd8a8", "#8a4d00"],
  ["#e4d0ff", "#5a2d8c"],
  ["#bfefe8", "#0d5a52"],
  ["#ffd0dc", "#8c1f42"],
  ["#fff1a3", "#6a5800"],
  ["#d9e0ff", "#2f2d8c"],
  ["#f5d4c8", "#7a2e14"],
  ["#d8f5a3", "#3d6212"],
  ["#b8e8ff", "#075985"],
  ["#ffd0d6", "#9f1239"],
  ["#ddd6fe", "#5b21b6"],
  ["#a7f3d0", "#065f46"],
  ["#fed7aa", "#9a3412"],
  ["#fde68a", "#854d0e"],
  ["#bfdbfe", "#1e40af"],
  ["#fbcfe8", "#9d174d"],
  ["#ccfbf1", "#115e59"],
  ["#e7e5e4", "#44403c"],
  ["#fecaca", "#991b1b"],
  ["#bbf7d0", "#166534"],
  ["#a5f3fc", "#155e75"],
  ["#f5d0fe", "#86198f"],
];

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseOverrides(raw) {
  const out = {};
  if (!raw) return out;
  const re = /(\w+)\s*=\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(raw))) out[m[1]] = m[2];
  return out;
}

function parseSamconfig(text) {
  const profiles = {};
  let current = null;
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    const section = trimmed.match(/^\[([^\]\s]+)\]$/);
    if (section) {
      const name = section[1];
      if (!name.includes(".")) {
        current = name;
        if (!profiles[current]) profiles[current] = {};
      }
      continue;
    }
    if (!current) continue;
    const kv = trimmed.match(/^(\w+)\s*=\s*"(.*)"\s*$/);
    if (kv) profiles[current][kv[1]] = kv[2].replace(/\\"/g, '"');
  }
  return profiles;
}

function netFromOverrides(ov) {
  const hasApi = ov.VPCe || ov.Subnet1 || ov.SecurityGroup;
  if (hasApi) {
    return {
      VPCe: ov.VPCe || "—",
      SG: ov.SecurityGroup || "—",
      S1: ov.Subnet1 || "—",
      S2: ov.Subnet2 || "—",
      S3: ov.Subnet3 || "—",
      matriz: false,
      rawSubnets: null,
    };
  }
  const raw = (ov.LambdaSubnets || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return {
    VPCe: "—",
    SG: ov.LambdaSecurityGroup || "—",
    S1: raw[0] || "—",
    S2: raw[1] || "—",
    S3: raw[2] || "—",
    matriz: true,
    rawSubnets: raw.length ? raw : null,
  };
}

function loadRepo(repo) {
  const file = path.join(ROOT, repo, "samconfig.toml");
  const text = fs.readFileSync(file, "utf8");
  const profiles = parseSamconfig(text);
  const out = { repo, file, profiles: {} };
  for (const [name, p] of Object.entries(profiles)) {
    out.profiles[name] = {
      region: p.region || "",
      stack_name: p.stack_name || "",
      net: netFromOverrides(parseOverrides(p.parameter_overrides || "")),
    };
  }
  return out;
}

function alignMatriz(data) {
  for (const g of GROUPS) {
    const canon = {};
    for (const repo of REPOS) {
      const p = data[repo].profiles[g.profile];
      if (!p || p.net.matriz) continue;
      if (p.net.S1 !== "—") {
        canon.S1 = p.net.S1;
        canon.S2 = p.net.S2;
        canon.S3 = p.net.S3;
        break;
      }
    }
    if (!canon.S1) continue;
    for (const repo of REPOS) {
      const p = data[repo].profiles[g.profile];
      if (!p || !p.net.matriz || !p.net.rawSubnets) continue;
      const raw = p.net.rawSubnets.slice();
      const used = new Set();
      const aligned = { S1: "—", S2: "—", S3: "—" };
      for (const slot of ["S1", "S2", "S3"]) {
        if (canon[slot] && raw.includes(canon[slot])) {
          aligned[slot] = canon[slot];
          used.add(canon[slot]);
        }
      }
      const leftover = raw.filter((id) => !used.has(id));
      for (const slot of ["S1", "S2", "S3"]) {
        if (aligned[slot] === "—" && leftover.length) aligned[slot] = leftover.shift();
      }
      p.net.S1 = aligned.S1;
      p.net.S2 = aligned.S2;
      p.net.S3 = aligned.S3;
      p.net.aligned = true;
    }
  }
}

function isPresent(v) {
  return v && v !== "—";
}

function majorityOf(values) {
  const counts = new Map();
  for (const v of values) {
    if (!isPresent(v)) continue;
    counts.set(v, (counts.get(v) || 0) + 1);
  }
  if (counts.size === 0) return { majority: null, n: 0, tie: false, ranked: [] };
  const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const n = values.filter(isPresent).length;
  const top = ranked[0];
  const tie = ranked.length > 1 && ranked[1][1] === top[1];
  const majority = !tie && top[1] > n / 2 ? top[0] : null;
  return { majority, n, tie, ranked };
}

function buildIndex(data) {
  const groups = {};
  const home = new Map();
  for (const g of GROUPS) {
    const byField = {};
    for (const field of FIELDS) {
      const values = REPOS.map((repo) => {
        const p = data[repo].profiles[g.profile];
        return p ? p.net[field] : null;
      });
      const stats = majorityOf(values);
      byField[field] = { ...stats, values };
      if (stats.majority) {
        const prev = home.get(stats.majority) || [];
        prev.push({ groupId: g.id, env: g.env, region: g.region, field });
        home.set(stats.majority, prev);
      }
    }
    groups[g.id] = { ...g, byField };
  }
  return { groups, home };
}

function classifyCell(value, field, group, index, net) {
  if (!value) return { kind: "ausente", title: "Sin perfil en este samconfig" };
  if (value === "—") {
    if (field === "VPCe" && net && net.matriz) {
      return { kind: "na", title: "tld-matriz no declara VPCe (usa LambdaSubnets / LambdaSecurityGroup)" };
    }
    return { kind: "na", title: "Sin valor" };
  }
  const stats = index.groups[group.id].byField[field];
  const homes = index.home.get(value) || [];
  const homeOtherEnv = homes.find((h) => h.env !== group.env);
  const homeHere = homes.find((h) => h.groupId === group.id && h.field === field);
  if (homeOtherEnv && !homeHere) {
    return {
      kind: "prestado",
      title: `Este ID es mayoría en ${homeOtherEnv.env} ${homeOtherEnv.region} (${FIELD_LABEL[homeOtherEnv.field]}), no en ${group.env} ${group.region}`,
    };
  }
  if (stats.tie) {
    const letter = String.fromCharCode(65 + stats.ranked.findIndex((r) => r[0] === value));
    return { kind: "familia", familia: letter, title: `Familia ${letter} — no hay mayoría en esta columna` };
  }
  if (stats.majority && value !== stats.majority) {
    return { kind: "outlier", title: `No coincide con la mayoría (${stats.majority})` };
  }
  return { kind: "ok", title: "Alineado con la mayoría de este ambiente × región" };
}

function collectIds(data) {
  const ids = new Set();
  for (const repo of REPOS) {
    for (const p of Object.values(data[repo].profiles)) {
      for (const field of FIELDS) {
        if (isPresent(p.net[field])) ids.add(p.net[field]);
      }
    }
  }
  return [...ids].sort();
}

function colorMap(ids) {
  const map = new Map();
  ids.forEach((id, i) => {
    map.set(id, PALETTE[i % PALETTE.length]);
  });
  return map;
}

function cellHtml(value, cls, title, colors, extra = "") {
  if (!value) {
    return `<td class="cell ausente" title="${esc(title)}"><span class="id">sin perfil</span></td>`;
  }
  if (value === "—") {
    return `<td class="cell na" title="${esc(title)}"><span class="id">—</span></td>`;
  }
  const [bg, fg] = colors.get(value) || ["#eee", "#333"];
  const badge = extra ? `<span class="fam">${esc(extra)}</span>` : "";
  return `<td class="cell ${cls}" title="${esc(title)}" style="background:${bg};color:${fg}"><code class="id">${esc(value)}</code>${badge}</td>`;
}

function columnKind(group, field, index, data) {
  let prestado = 0;
  let familia = 0;
  let outlier = 0;
  let present = 0;
  for (const repo of REPOS) {
    const p = data[repo].profiles[group.profile];
    const v = p ? p.net[field] : null;
    const c = classifyCell(v, field, group, index, p && p.net);
    if (c.kind === "ausente" || c.kind === "na") continue;
    present++;
    if (c.kind === "prestado") prestado++;
    if (c.kind === "familia") familia++;
    if (c.kind === "outlier") outlier++;
  }
  if (prestado) return "col-prestado";
  if (outlier) return "col-outlier";
  if (familia) return "col-familia";
  if (present) return "col-ok";
  return "col-na";
}

function groupStatus(repo, group, index, data) {
  const p = data[repo].profiles[group.profile];
  if (!p) return "ausente";
  let worst = "ok";
  for (const field of FIELDS) {
    const c = classifyCell(p.net[field], field, group, index, p.net);
    if (c.kind === "prestado") return "prestado";
    if (c.kind === "outlier") worst = "outlier";
    if (c.kind === "familia" && worst === "ok") worst = "familia";
  }
  return worst;
}

function findings(data, index) {
  const prestados = [];
  for (const g of GROUPS) {
    for (const repo of REPOS) {
      const p = data[repo].profiles[g.profile];
      if (!p) continue;
      for (const field of FIELDS) {
        const c = classifyCell(p.net[field], field, g, index, p.net);
        if (c.kind === "prestado") {
          prestados.push({
            repo,
            profile: g.profile,
            field: FIELD_LABEL[field],
            value: p.net[field],
            title: c.title,
          });
        }
      }
    }
  }
  const defaultDiff = [];
  for (const repo of REPOS) {
    const dflt = data[repo].profiles.default;
    const dev = data[repo].profiles.dev;
    if (!dflt || !dev) continue;
    for (const field of FIELDS) {
      const a = dflt.net[field] || "—";
      const b = dev.net[field] || "—";
      if (a !== b) {
        defaultDiff.push({ repo, field: FIELD_LABEL[field], default: a, dev: b });
      }
    }
  }
  const missingDevOregon = REPOS.filter((r) => !data[r].profiles["dev-oregon"]);
  return { prestados, defaultDiff, missingDevOregon };
}

function renderTable(group, data, index, colors) {
  const colClass = {};
  for (const field of FIELDS) colClass[field] = columnKind(group, field, index, data);
  let thead = `<th class="sticky">Repo</th>`;
  for (const field of FIELDS) {
    thead += `<th class="${colClass[field]}">${FIELD_LABEL[field]}</th>`;
  }
  let body = "";
  for (const repo of REPOS) {
    const p = data[repo].profiles[group.profile];
    body += `<tr><th class="sticky">${esc(repo)}</th>`;
    for (const field of FIELDS) {
      const v = p ? p.net[field] : null;
      const c = classifyCell(v, field, group, index, p && p.net);
      const extra = c.familia ? c.familia : "";
      const title =
        p && p.net.matriz && p.net.rawSubnets && (field === "S1" || field === "S2" || field === "S3")
          ? `${c.title}. En archivo LambdaSubnets=${p.net.rawSubnets.join(",")}`
          : c.title;
      body += cellHtml(v, c.kind, title, colors, extra);
    }
    body += "</tr>";
  }
  const hasDiff = Object.values(colClass).some((k) => k !== "col-ok" && k !== "col-na");
  const hasPrestado = Object.values(colClass).some((k) => k === "col-prestado");
  return { html: `<thead><tr>${thead}</tr></thead><tbody>${body}</tbody>`, hasDiff, hasPrestado };
}

function renderHeatmap(data, index) {
  let head = `<th class="sticky">Repo</th>`;
  for (const g of GROUPS) {
    head += `<th>${esc(g.env)}<br><span class="sub">${esc(g.region)}</span></th>`;
  }
  let body = "";
  for (const repo of REPOS) {
    body += `<tr><th class="sticky">${esc(repo)}</th>`;
    for (const g of GROUPS) {
      const st = groupStatus(repo, g, index, data);
      const label = { ok: "alineado", familia: "2 familias", outlier: "outlier", prestado: "otro ambiente", ausente: "sin perfil" }[st];
      body += `<td class="heat ${st}" title="${esc(repo)} · ${g.env} ${g.region}: ${label}">${esc(label)}</td>`;
    }
    body += "</tr>";
  }
  return `<table class="heat-table">${head ? `<thead><tr>${head}</tr></thead>` : ""}<tbody>${body}</tbody></table>`;
}

function renderDefaultVsDev(data, colors, index) {
  const g = GROUPS.find((x) => x.id === "dev-va");
  let head = `<th class="sticky">Repo</th><th>Parámetro</th><th>[default]</th><th>[dev]</th>`;
  let body = "";
  let diffs = 0;
  for (const repo of REPOS) {
    const dflt = data[repo].profiles.default;
    const dev = data[repo].profiles.dev;
    for (const field of FIELDS) {
      const a = dflt ? dflt.net[field] : null;
      const b = dev ? dev.net[field] : null;
      const same = a === b;
      if (!same) diffs++;
      const ca = classifyCell(a, field, g, index, dflt && dflt.net);
      const cb = classifyCell(b, field, g, index, dev && dev.net);
      const rowClass = same ? "same" : "diff-row";
      const kindA = same ? (ca.kind === "na" ? "na" : "ok") : ca.kind === "prestado" ? "prestado" : "outlier";
      const titleA = same
        ? "Igual que [dev]"
        : ca.kind === "prestado"
          ? `[default] distinto de [dev]. ${ca.title}`
          : "[default] distinto de [dev]";
      body += `<tr class="${rowClass}" data-diff="${same ? "0" : "1"}"><th class="sticky">${esc(repo)}</th><td>${FIELD_LABEL[field]}</td>`;
      body += cellHtml(a, kindA, titleA, colors);
      body += cellHtml(b, cb.kind, cb.title, colors);
      body += "</tr>";
    }
  }
  return {
    html: `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`,
    diffs,
  };
}

function renderFindings(f) {
  const cards = [];
  if (f.prestados.length) {
    const rows = f.prestados
      .map(
        (x) =>
          `<li><code>${esc(x.repo)}</code> <code>[${esc(x.profile)}]</code> ${esc(x.field)} = <code>${esc(x.value)}</code><br><span class="muted">${esc(x.title)}</span></li>`
      )
      .join("");
    cards.push(
      `<article class="card danger"><h3>Valor de otro ambiente</h3><p>Un <code>sam deploy</code> con ese perfil deja el recurso amarrado a un ID que en el resto de repos es de <strong>otro ambiente</strong>.</p><ul>${rows}</ul></article>`
    );
  }
  if (f.defaultDiff.length) {
    const rows = f.defaultDiff
      .map(
        (x) =>
          `<li><code>${esc(x.repo)}</code> ${esc(x.field)}: default <code>${esc(x.default)}</code> ≠ dev <code>${esc(x.dev)}</code></li>`
      )
      .join("");
    cards.push(
      `<article class="card warn"><h3>[default] ≠ [dev]</h3><p><code>sam deploy</code> sin <code>--config-env</code> usa <code>[default]</code>.</p><ul>${rows}</ul></article>`
    );
  }
  cards.push(
    `<article class="card info"><h3>dev-oregon</h3><p>Solo <code>tld-matriz</code> y <code>tld-api-p2m</code> tienen perfil. Sin perfil: ${f.missingDevOregon.map((r) => `<code>${esc(r)}</code>`).join(", ")}.</p></article>`
  );
  cards.push(
    `<article class="card info"><h3>Prod: dos familias de SG (y Subnet3 Oregon)</h3><p>No hay mayoría. Familia A/B se asigna por orden de ID; no se afirma cuál es la correcta. Subnet1 y Subnet2 de prod coinciden.</p></article>`
  );
  return cards.join("\n");
}

const data = {};
for (const repo of REPOS) data[repo] = loadRepo(repo);
alignMatriz(data);
const index = buildIndex(data);
const colors = colorMap(collectIds(data));
const f = findings(data, index);

const sections = [];
for (const region of ["Virginia", "Oregon"]) {
  const parts = [];
  for (const g of GROUPS.filter((x) => x.region === region)) {
    const t = renderTable(g, data, index, colors);
    parts.push(`
      <section class="block" data-diff="${t.hasDiff ? "1" : "0"}" data-prestado="${t.hasPrestado ? "1" : "0"}" id="${g.id}">
        <h3><code>[${esc(g.profile)}]</code> · ${esc(g.env)} · ${esc(region)}</h3>
        <div class="wrap"><table>${t.html}</table></div>
      </section>`);
  }
  sections.push(`<h2 id="${region.toLowerCase()}">${esc(region)}</h2>${parts.join("\n")}`);
}

const def = renderDefaultVsDev(data, colors, index);

const generatedAt = new Date().toISOString().slice(0, 10);

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>samconfig.toml — red por ambiente</title>
  <style>
    :root {
      --bg: #f4f1ea;
      --panel: #fffcf7;
      --ink: #1c1915;
      --muted: #6b645a;
      --line: #ddd6c8;
      --ok: #166534;
      --ok-bg: #dcfce7;
      --warn: #92400e;
      --warn-bg: #fef3c7;
      --bad: #9f1239;
      --bad-bg: #ffe4e6;
      --info: #1e3a5f;
      --info-bg: #e0efff;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Segoe UI", system-ui, sans-serif;
      color: var(--ink);
      background: var(--bg);
      line-height: 1.45;
    }
    header {
      padding: 1.25rem 1.5rem 1rem;
      background: #1c1915;
      color: #f4f1ea;
    }
    header h1 { margin: 0 0 .35rem; font-size: 1.35rem; }
    header p { margin: .2rem 0; color: #d6d0c4; max-width: 70rem; }
    header a { color: #fde68a; }
    nav {
      display: flex;
      flex-wrap: wrap;
      gap: .4rem;
      padding: .75rem 1.5rem;
      background: #2a261f;
      position: sticky;
      top: 0;
      z-index: 8;
    }
    nav a {
      color: #f4f1ea;
      text-decoration: none;
      border: 1px solid #5c564c;
      padding: .2rem .55rem;
      border-radius: 999px;
      font-size: .85rem;
    }
    nav a:hover { background: #3d382e; }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: .75rem 1.25rem;
      align-items: center;
      padding: .75rem 1.5rem;
      background: var(--panel);
      border-bottom: 1px solid var(--line);
    }
    .toolbar label { font-size: .9rem; cursor: pointer; }
    main { padding: 1rem 1.5rem 3rem; }
    h2 { margin: 1.75rem 0 .5rem; font-size: 1.2rem; }
    h3 { margin: 0 0 .6rem; font-size: 1rem; }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
      gap: .75rem;
      margin: 1rem 0 1.5rem;
    }
    .card {
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: .85rem 1rem;
      background: var(--panel);
    }
    .card h3 { margin-top: 0; }
    .card ul { margin: .4rem 0 0; padding-left: 1.1rem; }
    .card.danger { background: var(--bad-bg); border-color: #fda4af; }
    .card.warn { background: var(--warn-bg); border-color: #fcd34d; }
    .card.info { background: var(--info-bg); border-color: #93c5fd; }
    .muted { color: var(--muted); font-size: .85rem; }
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: .5rem .9rem;
      margin: 0 0 1rem;
      font-size: .88rem;
    }
    .swatch {
      display: inline-flex;
      align-items: center;
      gap: .35rem;
    }
    .swatch i {
      width: 1rem; height: 1rem;
      border-radius: 3px;
      display: inline-block;
      border: 1px solid #0003;
    }
    .swatch i.ok { background: var(--ok-bg); }
    .swatch i.familia { background: #ddd6fe; }
    .swatch i.prestado { background: #fecaca; outline: 2px solid #be123c; outline-offset: 1px; }
    .swatch i.outlier { background: #fed7aa; }
    .swatch i.na { background: #e7e5e4; }
    .block { margin: 0 0 1.5rem; }
    .wrap { overflow: auto; max-width: 100%; border: 1px solid var(--line); border-radius: 8px; background: var(--panel); }
    table { border-collapse: collapse; width: 100%; font-size: .78rem; }
    th, td { border: 1px solid var(--line); padding: .35rem .45rem; vertical-align: top; }
    thead th {
      background: #efeae0;
      position: sticky;
      top: 0;
      z-index: 2;
    }
    th.sticky, td.sticky, thead th.sticky {
      position: sticky;
      left: 0;
      background: #efeae0;
      z-index: 3;
      text-align: left;
      white-space: nowrap;
    }
    td.sticky { background: var(--panel); }
    th.col-ok { background: var(--ok-bg); color: var(--ok); }
    th.col-familia { background: #ede9fe; color: #5b21b6; }
    th.col-outlier { background: var(--warn-bg); color: var(--warn); }
    th.col-prestado { background: var(--bad-bg); color: var(--bad); }
    td.cell { font-family: ui-monospace, Consolas, monospace; }
    td.cell code.id { font-size: .72rem; background: transparent; color: inherit; }
    td.cell.prestado { box-shadow: inset 0 0 0 2px #be123c; font-weight: 700; }
    td.cell.outlier { box-shadow: inset 0 0 0 2px #c2410c; }
    td.cell.na, td.cell.ausente { background: #f5f5f4; color: #a8a29e; font-style: italic; }
    .fam {
      display: inline-block;
      margin-left: .3rem;
      font-size: .65rem;
      font-weight: 700;
      border: 1px solid currentColor;
      border-radius: 3px;
      padding: 0 .25rem;
      opacity: .85;
    }
    .heat-table td.heat { text-align: center; font-weight: 600; text-transform: uppercase; font-size: .68rem; letter-spacing: .02em; }
    .heat-table td.ok { background: var(--ok-bg); color: var(--ok); }
    .heat-table td.familia { background: #ede9fe; color: #5b21b6; }
    .heat-table td.outlier { background: var(--warn-bg); color: var(--warn); }
    .heat-table td.prestado { background: var(--bad-bg); color: var(--bad); }
    .heat-table td.ausente { background: #e7e5e4; color: #78716c; font-weight: 400; }
    .heat-table .sub { font-weight: 400; color: var(--muted); font-size: .7rem; }
    tr.diff-row { outline: 1px solid #fca5a5; }
    body.solo-diff .block[data-diff="0"] { display: none; }
    body.solo-diff tr.same { display: none; }
    footer { margin-top: 2rem; color: var(--muted); font-size: .85rem; }
    code { font-family: ui-monospace, Consolas, monospace; font-size: .85em; }
  </style>
</head>
<body>
  <header>
    <h1>samconfig.toml — red por ambiente</h1>
    <p>Mismo color de celda = mismo ID en toda la página. Así se ve si el VPCe de prod es el de QA: es el <em>mismo</em> color que las celdas de QA.</p>
    <p>Fuente: los 10 <code>samconfig.toml</code> de trabajo. Investigación: <a href="./00-estado-y-retomo.md">00-estado-y-retomo.md</a>. Generado ${esc(generatedAt)}.</p>
  </header>
  <nav>
    <a href="#hallazgos">Hallazgos</a>
    <a href="#mapa">Mapa</a>
    <a href="#virginia">Virginia</a>
    <a href="#oregon">Oregon</a>
    <a href="#default">default vs dev</a>
  </nav>
  <div class="toolbar">
    <label><input type="checkbox" id="soloDiff"> Solo diferencias</label>
    <span class="muted">Cabecera verde = columna unánime · violeta = dos familias · ámbar = outlier · rojo = ID de otro ambiente</span>
  </div>
  <main>
    <div class="legend">
      <span class="swatch"><i class="ok"></i> alineado</span>
      <span class="swatch"><i class="familia"></i> dos familias (A/B)</span>
      <span class="swatch"><i class="outlier"></i> no es la mayoría</span>
      <span class="swatch"><i class="prestado"></i> ID de otro ambiente</span>
      <span class="swatch"><i class="na"></i> sin valor / sin perfil</span>
    </div>

    <h2 id="hallazgos">Hallazgos</h2>
    <div class="cards">
      ${renderFindings(f)}
    </div>

    <h2 id="mapa">Mapa repo × ambiente</h2>
    <p class="muted">Una celda por perfil. Rojo = hay un ID cuya mayoría está en otro ambiente.</p>
    <div class="wrap">
      ${renderHeatmap(data, index)}
    </div>

    ${sections.join("\n")}

    <h2 id="default">[default] vs [dev] (Virginia)</h2>
    <p class="muted">${def.diffs} celda(s) distintas. <code>sam deploy</code> sin <code>--config-env</code> usa default.</p>
    <div class="wrap">
      ${def.html}
    </div>

    <footer>
      Regenerar: <code>node second-brain/samconfig.toml/generar-html-tabla-red.js</code>
    </footer>
  </main>
  <script>
    const box = document.getElementById("soloDiff");
    box.addEventListener("change", () => {
      document.body.classList.toggle("solo-diff", box.checked);
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(OUT, html, "utf8");
console.log("Generado:", OUT);
console.log("prestado:", f.prestados.length, "| default≠dev:", f.defaultDiff.length);
