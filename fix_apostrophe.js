const fs = require('fs');
let c = fs.readFileSync('src/app/admin/page.jsx', 'utf8');
c = c.replace("Here's what's happening with Target95 today.", "Here's what's happening with Target95 today.");
fs.writeFileSync('src/app/admin/page.jsx', c, 'utf8');
console.log('Fixed');