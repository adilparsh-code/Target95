/**
 * Test-only ESM loader that resolves the app's `@/` path alias the way the
 * Next.js build does, and redirects the Firebase Admin SDK to the synthetic
 * boundary in ./fake-firebase-admin.mjs.
 *
 * Registered from a test with:
 *   register(new URL("./support/alias-loader.mjs", import.meta.url), import.meta.url)
 *
 * Registering hooks affects only the registering process, so suites that do
 * not opt in are untouched.
 */

import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const SRC_ROOT = new URL("../../src/", import.meta.url);
const FAKE_ADMIN_URL = new URL("./fake-firebase-admin.mjs", import.meta.url).href;
const EXTENSIONS = [".js", ".mjs", ".jsx", ".json"];
const INDEX_FILES = ["index.js", "index.mjs", "index.jsx"];

function isFile(url) {
  try {
    return existsSync(fileURLToPath(url));
  } catch {
    return false;
  }
}

/** `@/x/y` -> src/x/y, adding an extension or index file when needed. */
function resolveAlias(specifier) {
  const base = new URL(specifier.slice(2), SRC_ROOT);
  if (isFile(base)) return base;
  for (const extension of EXTENSIONS) {
    const candidate = new URL(`${base.href}${extension}`);
    if (isFile(candidate)) return candidate;
  }
  const directory = base.href.endsWith("/") ? base.href : `${base.href}/`;
  for (const index of INDEX_FILES) {
    const candidate = new URL(directory + index);
    if (isFile(candidate)) return candidate;
  }
  return base;
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier === "@/app/lib/firebase-admin" || specifier === "test:firebase-admin") {
    return { url: FAKE_ADMIN_URL, shortCircuit: true };
  }
  if (specifier.startsWith("@/")) {
    return nextResolve(resolveAlias(specifier).href, context);
  }
  return nextResolve(specifier, context);
}
