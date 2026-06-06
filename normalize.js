const fs = require('fs');
const path = require('path');

function normalizeDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      normalizeDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const normalized = content.normalize('NFC');
      if (content !== normalized) {
        fs.writeFileSync(fullPath, normalized, 'utf8');
        console.log('Normalized:', fullPath);
      }
    }
  }
}

normalizeDir(path.join(__dirname, 'app'));
console.log('Normalization complete.');
