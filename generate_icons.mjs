import fs from 'fs';
import { execSync } from 'child_process';

// First check apple-touch-icon to see if it's valid
const appleBuffer = Buffer.alloc(8);
const appleFd = fs.openSync('public/apple-touch-icon.png', 'r');
fs.readSync(appleFd, appleBuffer, 0, 8, 0);
fs.closeSync(appleFd);
console.log('apple-touch-icon.png header:', appleBuffer.toString('hex'));

// Read the SVG content from one of the existing files
const svgContent = fs.readFileSync('public/icon-192x192.png', 'utf8');
console.log('SVG content (first 200 chars):', svgContent.substring(0, 200));

const sizes = [48, 72, 96, 128, 144, 152, 192, 256, 384, 512];

for (const size of sizes) {
  const svgFile = `public/icon-${size}x${size}.svg`;
  const pngFile = `public/icon-${size}x${size}.png`;
  
  // Write temporary SVG
  fs.writeFileSync(svgFile, svgContent);
  
  // Use rsvg-convert or inkscape if available, otherwise use sharp via node
  try {
    // Try using npx sharp
    const result = execSync(
      `node -e "const sharp = require('sharp'); sharp('${svgFile}').resize(${size}, ${size}).png().toFile('${pngFile}').then(()=>console.log('Generated ${pngFile}')).catch(e=>console.error(e))"`,
      { encoding: 'utf8', cwd: process.cwd() }
    );
    console.log(result);
  } catch (e) {
    console.log('Sharp not available, trying alternative...');
    // Alternative: use a data URL approach or create a simple PNG
    console.log('Need to install sharp or use another method');
  }
}