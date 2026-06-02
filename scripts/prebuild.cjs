const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Remove built hash bundle tags, restore Vite dev entry
html = html.replace(
  /\s*<script[^>]+crossorigin src="\/assets\/index-[^"]+\.js"><\/script>\s*\n\s*<link rel="stylesheet" crossorigin href="\/assets\/index-[^"]+\.css">/,
  '\n  <script type="module" src="/src/main.jsx"></script>'
);

fs.writeFileSync(htmlPath, html);
console.log('prebuild: index.html dev entry restored');
