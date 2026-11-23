// Serves the Jekyll build in _site/ under /chat-alerts-docs/, the same path as GitHub Pages.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const ROOT = new URL('../_site/', import.meta.url).pathname;
const BASE = '/chat-alerts-docs';
const PORT = Number(process.env.PORT ?? 4000);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

async function resolve(urlPath) {
  if (!urlPath.startsWith(BASE + '/')) return null;
  const rel = normalize(decodeURIComponent(urlPath.slice(BASE.length))).replace(/^(\.\.[/\\])+/, '');
  let file = join(ROOT, rel);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    await stat(file);
    return file;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  if (path === BASE) {
    res.writeHead(301, { location: BASE + '/' }).end();
    return;
  }
  const file = await resolve(path);
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found');
    return;
  }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
  res.end(await readFile(file));
}).listen(PORT, () => console.log(`Serving _site at http://localhost:${PORT}${BASE}/`));
