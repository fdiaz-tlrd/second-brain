const fs = require("fs");
const path = require("path");

const dir = __dirname;
const marketplacePath = path.join(dir, "Marketplace.md");
const tablaPath = path.join(dir, "nueva-tabla-codigo-respuesta.md");

const CATALOGS = [
  {
    id: "cuentaNombre",
    section: "# Descripción en Marketplace para Cuenta Nombre",
    descHeader: "Descripción en Marketplace para Cuenta Nombre",
    obsHeader: "Observación en Marketplace para Cuenta Nombre",
  },
  {
    id: "xpress",
    section: "# Descripción en Marketplace para Xpress",
    descHeader: "Descripción en Marketplace para Xpress",
    obsHeader: "Observación en Marketplace para Xpress",
  },
  {
    id: "r2p",
    section: "# Descripción en Marketplace para R2P",
    descHeader: "Descripción en Marketplace para R2P",
    obsHeader: "Observación en Marketplace para R2P",
  },
];

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&oacute;/gi, "ó")
    .replace(/&aacute;/gi, "á")
    .replace(/&eacute;/gi, "é")
    .replace(/&iacute;/gi, "í")
    .replace(/&uacute;/gi, "ú")
    .replace(/&ntilde;/gi, "ñ")
    .replace(/&Oacute;/g, "Ó")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function htmlToPlain(html) {
  return decodeHtmlEntities(
    html
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/p>/gi, " ")
      .replace(/<\/li>/gi, " ")
      .replace(/<li[^>]*>/gi, " - ")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function extractTableHtml(sectionText) {
  const marker = '"description": "';
  const start = sectionText.indexOf(marker);
  if (start === -1) {
    throw new Error('No se encontró campo "description" en la sección.');
  }
  const htmlStart = start + marker.length;
  const end = sectionText.indexOf("</table>", htmlStart);
  if (end === -1) {
    throw new Error("No se encontró tabla HTML en la sección.");
  }
  return sectionText.slice(htmlStart, end + "</table>".length);
}

function parseMarketplaceTable(sectionText) {
  const html = extractTableHtml(sectionText);
  const rows = [...html.matchAll(/<tr>([\s\S]*?)<\/tr>/gi)];
  const map = new Map();

  for (const row of rows) {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => m[1]);
    if (cells.length < 3) continue;

    const code = htmlToPlain(cells[0]);
    if (!/^\d+$/.test(code)) continue;

    map.set(code, {
      descripcion: htmlToPlain(cells[1]),
      observacion: htmlToPlain(cells[2]),
    });
  }

  return map;
}

function loadMarketplaceCatalogs(marketplaceText) {
  const catalogs = {};
  for (const cat of CATALOGS) {
    const start = marketplaceText.indexOf(cat.section);
    if (start < 0) {
      throw new Error(`Sección no encontrada: ${cat.section}`);
    }
    const next = CATALOGS.map((c) => marketplaceText.indexOf(c.section, start + 1))
      .filter((i) => i > start)
      .sort((a, b) => a - b)[0];
    const chunk = marketplaceText.slice(start, next === undefined ? undefined : next);
    catalogs[cat.id] = parseMarketplaceTable(chunk);
  }
  return catalogs;
}

function escapeMdCell(value) {
  return String(value || "").replace(/\|/g, "\\|");
}

function splitTableLine(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

function buildSeparator(colCount) {
  return `|${" --- |".repeat(colCount)}`;
}

function syncHeaders(headers) {
  let next = [...headers];
  for (const cat of CATALOGS) {
    const descIdx = next.indexOf(cat.descHeader);
    if (descIdx === -1) continue;
    const hasObs = next[descIdx + 1] === cat.obsHeader;
    if (!hasObs) {
      next.splice(descIdx + 1, 0, cat.obsHeader);
    }
  }
  return next;
}

function syncRow(cols, oldHeaders, newHeaders, catalogs) {
  const byHeader = {};
  oldHeaders.forEach((h, i) => {
    byHeader[h] = cols[i] ?? "";
  });

  const code = byHeader["Código"];
  const out = [];

  for (const h of newHeaders) {
    const cat = CATALOGS.find((c) => c.obsHeader === h);
    if (cat) {
      const entry = catalogs[cat.id].get(code);
      out.push(entry ? entry.observacion : "");
      continue;
    }
    out.push(byHeader[h] ?? "");
  }

  return out;
}

function formatTable(headers, rows) {
  const lines = [
    `| ${headers.join(" | ")} |`,
    buildSeparator(headers.length),
    ...rows.map((cols) => `| ${cols.map(escapeMdCell).join(" | ")} |`),
  ];
  return lines.join("\n");
}

function updateTabla(marketplaceText, tablaText) {
  const catalogs = loadMarketplaceCatalogs(marketplaceText);

  const lines = tablaText.split(/\r?\n/);
  let i = 0;
  while (i < lines.length && !lines[i].trim().startsWith("| Código")) i++;

  const preamble = lines.slice(0, i).join("\n");
  const headerLine = lines[i++];
  lines[i++]; // separator

  const oldHeaders = splitTableLine(headerLine);
  const newHeaders = syncHeaders(oldHeaders);

  const rows = [];
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line.startsWith("|")) break;
    const cols = splitTableLine(line);
    rows.push(syncRow(cols, oldHeaders, newHeaders, catalogs));
    i++;
  }

  const table = formatTable(newHeaders, rows);
  const filled = rows.reduce((n, row) => {
    const obsIdxs = newHeaders
      .map((h, idx) => (h.startsWith("Observación en Marketplace") ? idx : -1))
      .filter((idx) => idx !== -1);
    return n + obsIdxs.filter((idx) => row[idx]).length;
  }, 0);

  return {
    content: preamble ? `${preamble}\n${table}\n` : `${table}\n`,
    rowCount: rows.length,
    obsCellsFilled: filled,
    catalogSizes: Object.fromEntries(
      CATALOGS.map((c) => [c.id, catalogs[c.id].size])
    ),
  };
}

function main() {
  const marketplaceText = fs.readFileSync(marketplacePath, "utf8");
  const tablaText = fs.readFileSync(tablaPath, "utf8");
  const result = updateTabla(marketplaceText, tablaText);
  fs.writeFileSync(tablaPath, result.content, "utf8");

  console.log("Actualizado:", tablaPath);
  console.log("Filas:", result.rowCount);
  console.log("Códigos por catálogo:", result.catalogSizes);
  console.log("Celdas de observación con valor:", result.obsCellsFilled);
}

main();
