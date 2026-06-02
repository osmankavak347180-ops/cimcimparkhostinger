const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const distAssets = path.join(root, 'dist', 'assets');
const rootAssets = path.join(root, 'assets');

// Copy dist/index.html → root index.html
fs.copyFileSync(path.join(root, 'dist', 'index.html'), path.join(root, 'index.html'));

// Remove old hashed JS/CSS bundles from root assets/
for (const f of fs.readdirSync(rootAssets)) {
  if (/^index-[^.]+\.(js|css)$/.test(f)) {
    fs.rmSync(path.join(rootAssets, f));
  }
}

// Copy new hashed JS/CSS bundles from dist/assets/ to root assets/
for (const f of fs.readdirSync(distAssets)) {
  if (/^index-[^.]+\.(js|css)$/.test(f)) {
    fs.copyFileSync(path.join(distAssets, f), path.join(rootAssets, f));
  }
}

console.log('postbuild: index.html + assets synced to root');
