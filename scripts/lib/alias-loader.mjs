// Node ESM loader hooks that let `node --test` import app modules the way Next.js
// does: the "@/" alias for src/, extensionless relative imports, and .js files
// written as ES modules without "type": "module". Used by tests and content scripts only; never bundled.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SRC = path.join(process.cwd(), "src");
const SUFFIXES = ["", ".js", ".jsx", ".mjs", ".json", "/index.js", "/index.mjs"];

function resolveFile(base) {
  for (const suffix of SUFFIXES) {
    const candidate = base + suffix;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  let base = null;
  if (specifier.startsWith("@/")) base = path.join(SRC, specifier.slice(2));
  else if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL?.startsWith("file:")) {
    base = path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier);
  }
  const file = base && resolveFile(base);
  return file ? { url: pathToFileURL(file).href, shortCircuit: true } : nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.startsWith("file:") && url.endsWith(".js") && fileURLToPath(url).startsWith(SRC)) {
    return { format: "module", source: fs.readFileSync(fileURLToPath(url), "utf8"), shortCircuit: true };
  }
  return nextLoad(url, context);
}
