import 'dotenv/config';
import http from 'http';
import { fileURLToPath } from 'url';
import path from 'path';

const PORT = 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function pathOnlyFromRequest(urlPath) {
  if (!urlPath) return '/';
  let p = urlPath.split('?')[0];
  try {
    if (p.startsWith('http://') || p.startsWith('https://')) {
      p = new URL(p).pathname;
    }
  } catch {
    /* keep p */
  }
  try {
    p = decodeURIComponent(p);
  } catch {
    /* keep p */
  }
  if (p.length > 1 && p.endsWith('/')) {
    p = p.replace(/\/+$/, '');
  }
  return p || '/';
}

async function resolveHandler(urlPath) {
  const pathOnly = pathOnlyFromRequest(urlPath);
  if (pathOnly === '/api/audit') {
    const { default: handler } = await import('../api/audit.js');
    return handler;
  }
  if (pathOnly === '/api/email-audit-report') {
    const { default: handler } = await import('../api/email-audit-report.js');
    return handler;
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', async () => {
    let handlerFn;
    try {
      handlerFn = await resolveHandler(req.url || '');
    } catch (impErr) {
      console.error('[api] Failed to load handler:', impErr);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Could not load API handler' }));
      return;
    }

    if (!handlerFn) {
      console.warn('[api] No handler for:', pathOnlyFromRequest(req.url || ''), '(raw url:', req.url, ')');
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }

    try {
      req.body = body ? JSON.parse(body) : {};
    } catch {
      req.body = {};
    }

    let statusCode = 200;
    const headers = {};
    const shimRes = {
      status(code) {
        statusCode = code;
        return shimRes;
      },
      setHeader(k, v) {
        headers[k] = v;
      },
      end(chunk) {
        res.writeHead(statusCode, { 'Content-Type': 'application/json', ...headers });
        res.end(chunk ?? '');
      },
      json(data) {
        res.writeHead(statusCode, { 'Content-Type': 'application/json', ...headers });
        res.end(JSON.stringify(data));
      },
    };

    try {
      await handlerFn(req, shimRes);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`  [api] Local API at http://localhost:${PORT}`);
  console.log(`        POST /api/audit`);
  console.log(`        POST /api/email-audit-report`);
});
