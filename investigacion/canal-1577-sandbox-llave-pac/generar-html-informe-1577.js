/**
 * Genera HTML portable del informe canal 1577 (un solo archivo, sin dependencias externas).
 * Uso: node generar-html-informe-1577.js
 */
const fs = require("fs");
const path = require("path");

const dir = __dirname;
const mdPath = path.join(dir, "informe-canal-1577-llave-pac-sandbox.md");
const outPath = path.join(dir, "informe-canal-1577-llave-pac-sandbox.html");

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMd(text) {
  return esc(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function parseTable(lines, startIdx) {
  const rows = [];
  let i = startIdx;
  while (i < lines.length && lines[i].trim().startsWith("|")) {
    rows.push(
      lines[i]
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim())
    );
    i++;
  }
  if (rows.length < 2) return { html: "", next: startIdx };
  const header = rows[0];
  const body = rows.slice(2);
  let html = "<table><thead><tr>";
  header.forEach((h) => {
    html += `<th>${inlineMd(h)}</th>`;
  });
  html += "</tr></thead><tbody>";
  body.forEach((row) => {
    html += "<tr>";
    row.forEach((cell) => {
      html += `<td>${inlineMd(cell)}</td>`;
    });
    html += "</tr>";
  });
  html += "</tbody></table>";
  return { html, next: i };
}

function mdToHtml(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let i = 0;
  let inCode = false;
  let codeBuf = [];

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      if (!inCode) {
        inCode = true;
        codeBuf = [];
      } else {
        out.push(`<pre><code>${esc(codeBuf.join("\n"))}</code></pre>`);
        inCode = false;
      }
      i++;
      continue;
    }

    if (inCode) {
      codeBuf.push(line);
      i++;
      continue;
    }

    if (line.trim() === "---") {
      out.push("<hr>");
      i++;
      continue;
    }

    if (line.trim().startsWith("|")) {
      const { html, next } = parseTable(lines, i);
      out.push(html);
      i = next;
      continue;
    }

    const h3 = line.match(/^### (.+)$/);
    if (h3) {
      out.push(`<h3>${inlineMd(h3[1])}</h3>`);
      i++;
      continue;
    }

    const h2 = line.match(/^## (.+)$/);
    if (h2) {
      out.push(`<h2>${inlineMd(h2[1])}</h2>`);
      i++;
      continue;
    }

    const h1 = line.match(/^# (.+)$/);
    if (h1) {
      out.push(`<h1>${inlineMd(h1[1])}</h1>`);
      i++;
      continue;
    }

  const ol = line.match(/^(\d+)\. (.+)$/);
    if (ol) {
      if (!out.length || !out[out.length - 1].endsWith("</ol>")) {
        if (out[out.length - 1] !== "<ol>") out.push("<ol>");
      }
      out.push(`<li>${inlineMd(ol[2])}</li>`);
      i++;
      const next = lines[i];
      if (!next || !/^\d+\. /.test(next)) out.push("</ol>");
      continue;
    }

    const ul = line.match(/^- (.+)$/);
    if (ul) {
      const prev = out[out.length - 1];
      if (prev !== "<ul>") out.push("<ul>");
      out.push(`<li>${inlineMd(ul[1])}</li>`);
      i++;
      const next = lines[i];
      if (!next || !/^- /.test(next)) {
        if (out[out.length - 1] !== "</ul>") out.push("</ul>");
      }
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    out.push(`<p>${inlineMd(line)}</p>`);
    i++;
  }

  return out.join("\n");
}

const md = fs.readFileSync(mdPath, "utf8");
const body = mdToHtml(md);

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Informe canal 1577 — Sandbox</title>
  <style>
    :root {
      --bg: #f8f9fb;
      --card: #fff;
      --text: #1a1d23;
      --muted: #5c6570;
      --border: #dde2e8;
      --accent: #0b5fff;
      --code-bg: #eef1f5;
      --pre-bg: #1e2430;
      --pre-fg: #e8ecf1;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 1.5rem;
      font-family: "Segoe UI", system-ui, sans-serif;
      font-size: 15px;
      line-height: 1.55;
      color: var(--text);
      background: var(--bg);
    }
    .wrap {
      max-width: 52rem;
      margin: 0 auto;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 2rem 2.25rem;
      box-shadow: 0 1px 3px rgba(0,0,0,.06);
    }
    h1 { font-size: 1.65rem; margin-top: 0; border-bottom: 2px solid var(--border); padding-bottom: .5rem; }
    h2 { font-size: 1.2rem; margin-top: 2rem; color: #0d3d8c; }
    h3 { font-size: 1.05rem; margin-top: 1.25rem; }
    p { margin: .65rem 0; }
    hr { border: none; border-top: 1px solid var(--border); margin: 1.5rem 0; }
    code {
      font-family: Consolas, "Courier New", monospace;
      font-size: .9em;
      background: var(--code-bg);
      padding: .1em .35em;
      border-radius: 3px;
    }
    pre {
      background: var(--pre-bg);
      color: var(--pre-fg);
      padding: 1rem 1.1rem;
      border-radius: 6px;
      overflow-x: auto;
      font-size: .82rem;
      line-height: 1.45;
    }
    pre code { background: none; padding: 0; color: inherit; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
      font-size: .92rem;
    }
    th, td {
      border: 1px solid var(--border);
      padding: .5rem .65rem;
      text-align: left;
      vertical-align: top;
    }
    th { background: #f0f3f7; font-weight: 600; }
    a { color: var(--accent); }
    ul, ol { margin: .5rem 0 .75rem 1.25rem; }
    li { margin: .25rem 0; }
    .footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
      font-size: .85rem;
      color: var(--muted);
    }
    @media print {
      body { background: #fff; padding: 0; }
      .wrap { box-shadow: none; border: none; max-width: none; }
    }
  </style>
</head>
<body>
  <div class="wrap">
${body}
    <p class="footer">Generado desde informe-canal-1577-llave-pac-sandbox.md — ${new Date().toISOString().slice(0, 10)}</p>
  </div>
</body>
</html>`;

fs.writeFileSync(outPath, html, "utf8");
console.log("OK:", outPath);
