#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const APP = path.join(ROOT, 'src', 'app');
const EXT = /\.(?:js|jsx|ts|tsx)$/;
const SKIP_DIRS = new Set(['node_modules', '.next', '.git']);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (EXT.test(entry.name)) out.push(full);
  }
  return out;
}

function routePattern(file) {
  let rel = path.relative(APP, file).replaceAll(path.sep, '/');
  rel = rel.replace(/(?:^|\/)page\.(?:js|jsx|ts|tsx)$/, '');
  if (!rel) return '/';
  return '/' + rel.split('/').map(seg => /^\[[^\]]+\]$/.test(seg) ? '*' : seg).join('/');
}

function matchesRoute(url, pattern) {
  const clean = url.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  const a = clean.split('/').filter(Boolean);
  const b = pattern.split('/').filter(Boolean);
  return a.length === b.length && b.every((part, i) => part === '*' || part === a[i]);
}

const files = walk(APP);
const pageFiles = files.filter(file => /\/page\.(?:js|jsx|ts|tsx)$/.test(file));
const routes = pageFiles.map(routePattern);
const links = [];

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const regexes = [
    /\bhref\s*=\s*["'](\/[^"'{}\s]*)["']/g,
    /\bhref\s*:\s*["'](\/[^"'{}\s]*)["']/g,
    /\b(?:router\.(?:push|replace)|redirect|permanentRedirect)\(\s*["'](\/[^"'{}\s]*)["']/g,
    /\bwindow\.location(?:\.href)?\s*=\s*["'](\/[^"'{}\s]*)["']/g,
  ];
  for (const re of regexes) {
    for (const match of source.matchAll(re)) links.push({ file, url: match[1] });
  }
}

const unique = new Map(links.map(item => [item.file + '|' + item.url, item]));
const broken = [...unique.values()].filter(({ url }) => !routes.some(pattern => matchesRoute(url, pattern)));

console.log(`🔗 Target95 internal-link audit
Routes discovered: ${routes.length}
Static internal links checked: ${unique.size}
Broken static internal links: ${broken.length}`);

if (broken.length) {
  console.error('\nBroken links:');
  for (const item of broken) console.error(`- ${path.relative(ROOT, item.file)} -> ${item.url}`);
  process.exit(1);
}

console.log('✅ All discovered static internal links resolve to an existing Next.js route pattern.');
