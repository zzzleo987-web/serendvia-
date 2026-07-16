import fs from 'fs';
import path from 'path';

const searchDir = './src';

const replacements = [
  { regex: /#74B72E/gi, replacement: '#007a27' }, // Lush Primary -> Neon Primary
  { regex: /#85CA2C/gi, replacement: '#00ff52' }, // Lush Accent -> Neon Glowing Accent
  { regex: /#0C2229/gi, replacement: '#02210a' }, // Lush Dark Teal -> Deepest Forest Green (for text/backgrounds)
  { regex: /rgba\(116,183,46/g, replacement: 'rgba(0,122,39' }, // Update RGB shadow
  { regex: /rgba\(116, 183, 46/g, replacement: 'rgba(0, 122, 39' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (stat.isFile() && /\.(tsx|ts|js|jsx|css|json)$/.test(file)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;
      for (const { regex, replacement } of replacements) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated to Neon Green: ${filePath}`);
      }
    }
  }
}

console.log('Migrating to Neon Friendly Green theme...');
processDirectory(searchDir);
console.log('Migration complete!');
