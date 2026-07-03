const fs = require("fs");
const path = require("path");

const mdPath = path.join(__dirname, "nueva-tabla-codigo-respuesta.md");
const outPath = path.join(__dirname, "nueva-tabla-codigo-respuesta.html");
const md = fs.readFileSync(mdPath, "utf8");
const lines = md.split(/\r?\n/);

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fmtCell(text) {
  const t = (text || "").trim();
  if (!t) return '<span class="empty">—</span>';
  return esc(t).replace(/ - /g, "<br>").replace(/; /g, ";<br>");
}

function norm(s) {
  return (s || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\.$/, "")
    .replace(/[""]/g, '"')
    .replace(/\s+/g, " ");
}

function differsFromCatalog(catalog, marketplace) {
  const mp = (marketplace || "").trim();
  if (!mp) return false;
  return norm(catalog) !== norm(mp);
}

function isMpDescColumn(header) {
  return header.startsWith("Descripción en Marketplace");
}

function isMpObsColumn(header) {
  return header.startsWith("Observación en Marketplace");
}

function thClass(header) {
  if (header === "Código") return "col-primary col-code";
  if (header === "Nueva descripción") return "col-primary col-nueva";
  if (isMpDescColumn(header)) {
    return header === "Descripción en Marketplace para Cuenta Nombre"
      ? "col-mp col-mp-desc col-mp-start"
      : "col-mp col-mp-desc";
  }
  if (isMpObsColumn(header)) return "col-mp col-mp-obs";
  return "";
}

const BADGE_RESERVADO_CV = "Reservado para Canal Validador";
const CODIGOS_RESERVADO_CV = new Set(["510", "511", "512", "513", "514", "515"]);
const BADGES_POR_CODIGO = {
  "506": { kind: "no-usar", label: "Reservado — no usar" },
};

function tieneBadgeEspecial(code) {
  return Boolean(BADGES_POR_CODIGO[code]) || CODIGOS_RESERVADO_CV.has(code);
}

function classifyNueva(catalog, cols, mpDescIdxs, code) {
  const cat = (catalog || "").trim();
  if (!cat) {
    return { badges: [], pending: true, reformulado: false, sinMp: false };
  }

  const mpDescs = mpDescIdxs.map((idx) => (cols[idx] || "").trim());
  const mpFilled = mpDescs.filter(Boolean);
  const badges = [];
  let sinMp = false;
  let reformulado = false;

  if (BADGES_POR_CODIGO[code]) {
    badges.push(BADGES_POR_CODIGO[code]);
  }

  if (CODIGOS_RESERVADO_CV.has(code)) {
    badges.push({ kind: "reservado-cv", label: BADGE_RESERVADO_CV });
  }

  if (mpFilled.length === 0 && !tieneBadgeEspecial(code)) {
    sinMp = true;
    badges.push({ kind: "sin-mp", label: "Sin ref. MP" });
  }

  if (mpFilled.some((mp) => differsFromCatalog(cat, mp))) {
    reformulado = true;
    badges.push({ kind: "reformulado", label: "Reformulado" });
  }

  return { badges, pending: false, reformulado, sinMp };
}

function fmtNuevaCell(catalog, badges) {
  const body = fmtCell(catalog);
  if (!badges.length) return `<div class="nueva-text">${body}</div>`;
  const tags = badges
    .map((b) => `<span class="badge badge-${b.kind}">${esc(b.label)}</span>`)
    .join("");
  return `<div class="nueva-text">${body}</div><div class="badges">${tags}</div>`;
}

let i = 0;
while (i < lines.length && !lines[i].trim().startsWith("| Código")) {
  i++;
}
while (i < lines.length && lines[i].trim() === "") i++;

const headerLine = lines[i++];
lines[i++]; // separator
const headers = headerLine.split("|").slice(1, -1).map((h) => h.trim());
const rows = [];
while (i < lines.length) {
  const line = lines[i].trim();
  if (!line.startsWith("|")) break;
  rows.push(line.split("|").slice(1, -1).map((c) => c.trim()));
  i++;
}

const SKIP_COL = "Escenarios Postman";
const skipIdx = headers.indexOf(SKIP_COL);
const omitCol = (cols) => (skipIdx === -1 ? cols : cols.filter((_, idx) => idx !== skipIdx));
const headersHtml = omitCol(headers);
const rowsHtml = rows.map(omitCol);

const idxNueva = headersHtml.indexOf("Nueva descripción");
const idxMarketplaceDesc = headersHtml
  .map((h, idx) => (h.startsWith("Descripción en Marketplace") ? idx : -1))
  .filter((idx) => idx !== -1);

const thead = headersHtml
  .map((h) => {
    const cls = thClass(h);
    return cls ? `<th scope="col" class="${cls}">${esc(h)}</th>` : `<th scope="col">${esc(h)}</th>`;
  })
  .join("\n          ");

let stats = { pendiente: 0, reformulado: 0, sinMp: 0, alineado: 0 };
const tbody = rowsHtml
  .map((cols) => {
    const code = cols[0];
    const catalog = idxNueva === -1 ? "" : cols[idxNueva];
    const { badges, pending, reformulado, sinMp } = classifyNueva(
      catalog,
      cols,
      idxMarketplaceDesc,
      code
    );

    if (pending) stats.pendiente++;
    else if (reformulado) stats.reformulado++;
    else if (sinMp) stats.sinMp++;
    else stats.alineado++;

    const rowClasses = [];
    if (code === "0") rowClasses.push("row-ok");
    if (pending) rowClasses.push("row-pending");

    const dataAttrs = [
      pending ? ' data-pending="1"' : "",
      reformulado ? ' data-reformulado="1"' : "",
      sinMp ? ' data-sin-mp="1"' : "",
    ].join("");

    const tds = cols
      .map((c, idx) => {
        if (idx === idxNueva) {
          return `<td class="col-primary col-nueva">${fmtNuevaCell(catalog, badges)}</td>`;
        }
        const classes = [];
        if (idx === 0) classes.push("col-primary", "col-code");
        const header = headersHtml[idx];
        if (isMpDescColumn(header)) {
          classes.push("col-mp", "col-mp-desc");
          if (header === "Descripción en Marketplace para Cuenta Nombre") {
            classes.push("col-mp-start");
          }
        } else if (isMpObsColumn(header)) {
          classes.push("col-mp", "col-mp-obs");
        }
        const cls = classes.length ? ` class="${classes.join(" ")}"` : "";
        return `<td${cls}>${fmtCell(c)}</td>`;
      })
      .join("\n          ");

    const cls = rowClasses.length ? ` class="${rowClasses.join(" ")}"` : "";
    return `        <tr${cls}${dataAttrs}>\n          ${tds}\n        </tr>`;
  })
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tabla de códigos de respuesta</title>
  <style>
    :root {
      --bg: #f6f7f9;
      --surface: #fff;
      --border: #d8dee6;
      --text: #1a1f2e;
      --muted: #5c6778;
      --accent: #2563eb;
      --sticky: #eef2f7;
      --code-w: 4.25rem;
      --nueva-w: 260px;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
      font-size: 14px;
      line-height: 1.45;
      color: var(--text);
      background: var(--bg);
    }
    .panel {
      margin: 1rem;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--surface);
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem 1rem;
      align-items: center;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--border);
    }
    .toolbar label { font-size: 0.85rem; color: var(--muted); }
    .toolbar input[type="search"] {
      padding: 0.45rem 0.65rem;
      border: 1px solid var(--border);
      border-radius: 6px;
      font: inherit;
    }
    .toolbar .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem 1rem;
      align-items: center;
    }
    .toolbar .filters label {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      cursor: pointer;
    }
    #filterCode {
      width: 5.5rem;
      font-variant-numeric: tabular-nums;
    }
    #filter {
      flex: 1;
      min-width: 200px;
      max-width: 420px;
    }
    .count { font-size: 0.85rem; color: var(--muted); }
    .legend {
      font-size: 0.82rem;
      color: var(--muted);
      flex: 1 1 100%;
    }
    .badge {
      display: inline-block;
      margin-top: 0.35rem;
      margin-right: 0.35rem;
      padding: 0.1rem 0.45rem;
      border-radius: 4px;
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.01em;
    }
    .badge-reformulado {
      color: #1e40af;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
    }
    .badge-sin-mp {
      color: #57534e;
      background: #f5f5f4;
      border: 1px solid #d6d3d1;
    }
    .badge-reservado-cv {
      color: #5b21b6;
      background: #f5f3ff;
      border: 1px solid #c4b5fd;
    }
    .badge-no-usar {
      color: #92400e;
      background: #fffbeb;
      border: 1px solid #fcd34d;
    }
    .wrap {
      overflow: auto;
      max-height: calc(100vh - 6.5rem);
    }
    table {
      border-collapse: separate;
      border-spacing: 0;
      width: max-content;
      min-width: 100%;
    }
    thead th {
      position: sticky;
      top: 0;
      z-index: 4;
      background: var(--sticky);
      border-bottom: 2px solid var(--border);
      padding: 0.55rem 0.65rem;
      text-align: left;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      color: var(--muted);
      white-space: normal;
      min-width: 100px;
    }
    thead th.col-mp {
      font-size: 0.72rem;
      color: #8b95a5;
      font-weight: 500;
    }
    tbody td {
      border-bottom: 1px solid var(--border);
      padding: 0.5rem 0.65rem;
      vertical-align: top;
      background: var(--surface);
    }
    tbody tr:hover td { background: #f8fafc; }
    tbody tr:hover td.col-primary { background: #f3f6fb; }
    td.col-code,
    th.col-code {
      position: sticky;
      left: 0;
      z-index: 3;
      min-width: var(--code-w);
      max-width: var(--code-w);
    }
    td.col-nueva,
    th.col-nueva {
      position: sticky;
      left: var(--code-w);
      z-index: 2;
      min-width: var(--nueva-w);
      max-width: 340px;
      font-weight: 500;
      box-shadow: 1px 0 0 var(--border);
    }
    thead th.col-primary { z-index: 5; }
    td.col-mp,
    th.col-mp {
      max-width: 240px;
      font-size: 0.88rem;
      color: #5c6778;
    }
    th.col-mp-start,
    td.col-mp-start {
      border-left: 2px solid var(--border);
    }
    body.hide-mp-desc .col-mp-desc { display: none; }
    body.hide-mp-obs .col-mp-obs { display: none; }
    td.col-code {
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      color: var(--accent);
    }
    tr.row-ok td.col-code { color: #15803d; }
    tr.row-pending td.col-nueva .nueva-text { color: #8b95a5; }
    .empty {
      color: #b0b8c4;
      font-style: italic;
      font-weight: 400;
    }
  </style>
</head>
<body>
  <div class="panel">
    <div class="toolbar">
      <label for="filterCode">Código</label>
      <input id="filterCode" type="search" placeholder="Ej. 5" autocomplete="off" inputmode="numeric">
      <label for="filter">Buscar</label>
      <input id="filter" type="search" placeholder="Nueva descripción, Marketplace…" autocomplete="off">
      <span class="count" id="count"></span>
      <div class="filters">
        <label><input type="checkbox" id="filterPending"> Solo pendientes</label>
        <label><input type="checkbox" id="filterReformulado"> Solo reformulados</label>
        <label><input type="checkbox" id="filterSinMp"> Sin ref. MP</label>
        <label><input type="checkbox" id="toggleMp" checked> Ver descripción MP</label>
        <label><input type="checkbox" id="toggleObs" checked> Ver observación MP</label>
      </div>
      <span class="legend">
        Catálogo nuevo en <strong>Nueva descripción</strong> · Marketplace = referencia actual ·
        badges discretos solo cuando aportan contexto
      </span>
    </div>
    <div class="wrap">
      <table>
        <thead>
          <tr>
            ${thead}
          </tr>
        </thead>
        <tbody id="tbody">
${tbody}
        </tbody>
      </table>
    </div>
  </div>
  <script>
    const inputCode = document.getElementById("filterCode");
    const input = document.getElementById("filter");
    const filterPending = document.getElementById("filterPending");
    const filterReformulado = document.getElementById("filterReformulado");
    const filterSinMp = document.getElementById("filterSinMp");
    const toggleMp = document.getElementById("toggleMp");
    const toggleObs = document.getElementById("toggleObs");
    const tbody = document.getElementById("tbody");
    const countEl = document.getElementById("count");
    const allRows = [...tbody.querySelectorAll("tr")];

    function rowTextWithoutCode(tr) {
      const cells = tr.querySelectorAll("td");
      let text = "";
      for (let i = 1; i < cells.length; i++) text += cells[i].textContent;
      return text;
    }

    function update() {
      document.body.classList.toggle("hide-mp-desc", !toggleMp.checked);
      document.body.classList.toggle("hide-mp-obs", !toggleObs.checked);
      const codeQ = inputCode.value.trim();
      const q = input.value.trim().toLowerCase();
      const onlyPending = filterPending.checked;
      const onlyReform = filterReformulado.checked;
      const onlySinMp = filterSinMp.checked;
      let visible = 0;
      allRows.forEach((tr) => {
        const code = tr.querySelector("td.col-code")?.textContent.trim() || "";
        const matchCode = !codeQ || code.startsWith(codeQ);
        const matchText = !q || rowTextWithoutCode(tr).toLowerCase().includes(q);
        const matchPending = !onlyPending || tr.dataset.pending === "1";
        const matchReform = !onlyReform || tr.dataset.reformulado === "1";
        const matchSinMp = !onlySinMp || tr.dataset.sinMp === "1";
        const show = matchCode && matchText && matchPending && matchReform && matchSinMp;
        tr.hidden = !show;
        if (show) visible++;
      });
      countEl.textContent = visible + " / " + allRows.length + " filas";
    }

    [inputCode, input, filterPending, filterReformulado, filterSinMp, toggleMp, toggleObs].forEach((el) => {
      el.addEventListener("input", update);
      el.addEventListener("change", update);
    });
    update();
  </script>
</body>
</html>
`;

fs.writeFileSync(outPath, html, "utf8");
console.log(
  "Generado:",
  outPath,
  "| filas:",
  rows.length,
  "| pendiente:",
  stats.pendiente,
  "| reformulado:",
  stats.reformulado,
  "| sin ref. MP:",
  stats.sinMp,
  "| alineado:",
  stats.alineado
);
