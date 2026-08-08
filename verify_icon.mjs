import fs from 'fs';
import path from 'path';

// Check .next/static/media directory for icon files
const staticMediaDir = '.next/static/media';
if (fs.existsSync(staticMediaDir)) {
  const files = fs.readdirSync(staticMediaDir);
  const iconFiles = files.filter(f => f.startsWith('icon-'));
  console.log('Icon files in .next/static/media:', iconFiles);
  
  // Check if icon-144x144.png or its hashed version exists
  const has144 = iconFiles.some(f => f.includes('144'));
  console.log('Has 144x144 icon:', has144);
} else {
  console.log('Directory .next/static/media does not exist');
}

// Also verify the public/icon-144x144.png is valid
const buffer = Buffer.alloc(8);
const fd = fs.openSync('public/icon-144x144.png', 'r');
fs.readSync(fd, buffer, 0, 8, 0);
fs.closeSync(fd);
console.log('public/icon-144x144.png is valid PNG:', buffer.toString('hex') === '89504e470d0a1a0a');