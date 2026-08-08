const fs = require('fs');
const files = ['icon-48x48.png', 'icon-72x72.png', 'icon-96x96.png', 'icon-128x128.png', 'icon-144x144.png', 'icon-152x152.png', 'icon-192x192.png', 'icon-256x256.png', 'icon-384x384.png', 'icon-512x512.png'];
files.forEach(f => {
  const buffer = Buffer.alloc(8);
  const fd = fs.openSync('public/' + f, 'r');
  fs.readSync(fd, buffer, 0, 8, 0);
  fs.closeSync(fd);
  const isValidPNG = buffer.toString('hex') === '89504e470d0a1a0a';
  console.log(f + ': ' + buffer.toString('hex') + ' - ' + (isValidPNG ? 'Valid PNG' : 'Invalid/Not PNG'));
});