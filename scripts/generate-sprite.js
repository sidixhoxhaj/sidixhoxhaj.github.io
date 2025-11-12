import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.join(__dirname, '../public/icons');
const outputFile = path.join(iconsDir, 'sprite.svg');

const generateSprite = () => {
  const files = fs.readdirSync(iconsDir).filter(file => 
    file.endsWith('.svg') && file !== 'sprite.svg'
  );

  let symbols = '';

  files.forEach(file => {
    const iconName = path.basename(file, '.svg');
    const svgContent = fs.readFileSync(path.join(iconsDir, file), 'utf-8');
    
    const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
    
    const contentMatch = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    const innerContent = contentMatch ? contentMatch[1].trim() : '';
    
    symbols += `<symbol id="${iconName}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n`;
    symbols += `${innerContent}\n`;
    symbols += `</symbol>\n\n`;
  });

  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">${symbols.trimEnd()}</svg>`;

  fs.writeFileSync(outputFile, sprite);
  console.log(`✓ SVG sprite generated with ${files.length} icons`);
};

generateSprite();
