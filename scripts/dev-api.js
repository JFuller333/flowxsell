import http from 'http';
import { createRequire } from 'module';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const PORT = 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Dynamically import the audit handler
const { default: handler } = await import('../api/audit.js');

const server = http.createServer(async (req, res) => {
  // CORS for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url !== '/api/audit') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  // Buffer and parse the request body
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', async () => {
    try {
      req.body = body ? JSON.parse(body) : {};
    } catch {
      req.body = {};
    }

    // Minimal Vercel-compatible response shim
    let statusCode = 200;
    const headers = {};
    const shimRes = {
      status(code) { statusCode = code; return shimRes; },
      setHeader(k, v) { headers[k] = v; },
      end() {
        res.writeHead(statusCode, { 'Content-Type': 'application/json', ...headers });
        res.end();
      },
      json(data) {
        res.writeHead(statusCode, { 'Content-Type': 'application/json', ...headers });
        res.end(JSON.stringify(data));
      },
    };

    try {
      await handler(req, shimRes);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`  [api] Local audit API running at http://localhost:${PORT}/api/audit`);
});
