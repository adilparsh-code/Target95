// Minimal ESM resolver for tests: Next-style extensionless relative imports and the "@/" alias.
import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const SRC = path.join(process.cwd(), "src");

function candidates(base) {
  return [base, `${base}.js`, `${base}.mjs`, `${base}.jsx`, path.join(base, "index.js")];
}

export async function resolve(specifier, context, nextResolve) {
  let base = null;
  if (specifier.startsWith("@/")) base = path.join(SRC, specifier.slice(2));
  else if (specifier.startsWith(".") && context.parentURL?.startsWith("file:")) base = path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier);
  if (base) {
    const hit = candidates(base).find((file) => path.extname(file) && existsSync(file));
    if (hit) return nextResolve(pathToFileURL(hit).href, context);
  }
  return nextResolve(specifier, context);
}
