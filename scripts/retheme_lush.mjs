import fs from 'fs';
import path from 'path';

const searchDir = './src';

const replacements = [
  { regex: /#1F3E29/gi, replacement: '#0C2229' }, // Ceylon Tea Green -> Deep Forest Teal
  { regex: /#8FA882/gi, replacement: '#74B72E' }, // Ella Mist Sage -> Vibrant Leaf Green
  { regex: /#0A7E45/gi, replacement: '#85CA2C' }, // Emerald Palm -> Electric Bud Green
  { regex: /#e2ece0/gi, replacement: '#EBF6E4' }, // Light sage -> Light Leaf Mint
  { regex: /#cfe2cc/gi, replacement: '#DDEFD0' }, // Sage Text -> Active Leaf Mint
  { regex: /#122216/gi, replacement: '#0C2229' }, // Foreground -> Deep Forest Teal
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
        console.log(`Updated to Lush Green: ${filePath}`);
      }
    }
  }
}

console.log('Migrating to Lush Green theme...');
processDirectory(searchDir);
console.log('Migration complete!');
