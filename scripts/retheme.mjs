import fs from 'fs';
import path from 'path';

const searchDir = './src';

const replacements = [
  { regex: /#A67C00/gi, replacement: '#1F3E29' }, // Primary Gold -> Ceylon Tea Green
  { regex: /#d4af37/gi, replacement: '#8FA882' }, // Secondary Gold -> Ella Mist Sage
  { regex: /#1A73E8/gi, replacement: '#0A7E45' }, // Journey Blue -> Emerald Palm
  { regex: /#f5e4af/gi, replacement: '#e2ece0' }, // Soft Gold -> Soft Sage/Green Tint
  { regex: /#e6d29d/gi, replacement: '#cfe2cc' }, // Gold Text -> Light Sage Tint
  { regex: /#1F76BB/gi, replacement: '#1F3E29' }, // Brand blue CTA -> Ceylon Tea Green
  { regex: /#1C69A8/gi, replacement: '#0A7E45' }, // Brand blue CTA Hover -> Emerald Palm
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
        console.log(`Updated theme colors in: ${filePath}`);
      }
    }
  }
}

console.log('Starting Sri Lankan Green theme migration...');
processDirectory(searchDir);
console.log('Migration complete!');
