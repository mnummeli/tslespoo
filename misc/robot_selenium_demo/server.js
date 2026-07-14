#!/usr/bin/env node

'use strict';

const http = require('node:http');
const fs = require('node:fs');
const PORT = 3000;

function app(req, res) {
  if(req.method === 'GET') {
    if(req.url.endsWith('/favicon.ico')) {
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      const favicon = fs.readFileSync('favicon.ico');
      res.end(favicon);
    } else if(req.url.endsWith('/app.css')) {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      const css = fs.readFileSync('app.css', 'utf8');
      res.end(css);
    } else if(req.url.endsWith('/app.js')) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      const js = fs.readFileSync('app.js', 'utf8');
      res.end(js);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const indexPage = fs.readFileSync('index.html', 'utf8');
      res.end(indexPage);
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
}

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});