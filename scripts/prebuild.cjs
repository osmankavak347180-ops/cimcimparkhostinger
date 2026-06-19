const fs = require('fs');
const path = require('path');

// ── Inject GAS_DEPLOYMENT_URL from .env into HTML files in public/ ──
(function injectEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  let deploymentUrl = '';
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^VITE_GAS_DEPLOYMENT_URL=(.+)$/m);
    if (match) deploymentUrl = match[1].trim();
  }
  if (!deploymentUrl) {
    console.warn('prebuild: VITE_GAS_DEPLOYMENT_URL not found in .env, using placeholder');
    deploymentUrl = 'https://script.google.com/macros/s/__MISSING__/exec';
  }
  const publicDir = path.join(__dirname, '..', 'public');
  if (fs.existsSync(publicDir)) {
    for (const f of fs.readdirSync(publicDir)) {
      if (f.endsWith('.html')) {
        const fp = path.join(publicDir, f);
        let content = fs.readFileSync(fp, 'utf8');
        if (content.includes('__GAS_DEPLOYMENT_URL__')) {
          content = content.replace(/__GAS_DEPLOYMENT_URL__/g, deploymentUrl);
          fs.writeFileSync(fp, content);
          console.log(`prebuild: injected GAS URL into public/${f}`);
        }
      }
    }
  }
})();

const htmlPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Remove built hash bundle tags, restore Vite dev entry
html = html.replace(
  /\s*<script[^>]+crossorigin src="\/assets\/index-[^"]+\.js"><\/script>\s*\n\s*<link rel="stylesheet" crossorigin href="\/assets\/index-[^"]+\.css">/,
  '\n  <script type="module" src="/src/main.jsx"></script>'
);

fs.writeFileSync(htmlPath, html);
console.log('prebuild: index.html dev entry restored');
