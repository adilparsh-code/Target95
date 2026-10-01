import fs from 'node:fs';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
const server = spawn('node',['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3001'],{stdio:['ignore','pipe','pipe']});
await new Promise((resolve,reject) => { server.stdout.on('data',chunk => { if(chunk.toString().includes('Ready')) resolve(); }); server.on('exit', code => reject(new Error('Server exited '+code))); setTimeout(()=>reject(new Error('Server startup timed out')),20000).unref(); });
try {
const base = 'http://127.0.0.1:3001';
const paths = ['/office'];
for (const app of ['word','excel','powerpoint']) {
  paths.push(`/office/${app}`);
  for (const chapter of JSON.parse(fs.readFileSync(`src/data/office/${app}.json`))) paths.push(`/office/${app}/${chapter.id}`, chapter.image.src);
}
for (const path of paths) { const response = await fetch(base+path); assert.equal(response.status,200,path); }
for (const path of ['/office/invalid','/office/word/invalid-chapter']) { const response = await fetch(base+path); assert.equal(response.status,404,path); }
console.log(`PASS: ${paths.length} valid routes/assets return 200; invalid app/chapter routes return 404.`);
} finally { server.kill(); }
