/**
 * Minimal import-graph reachability for the MCQ source registry.
 * Developer tooling only.
 *
 * Why not substring matching: a file name in a comment, a string or a longer
 * name (`10-strings` inside `10-strings-master`) must not count as an import,
 * and multi-line / dynamic / aliased imports must not be missed. The scanner
 * below masks comments and string contents first, so only real import syntax
 * is matched, then reads the specifier from the original text.
 *
 * Handled: `import x from "m"`, multi-line `import {...} from "m"`,
 * side-effect `import "m"`, `export ... from "m"`, literal `import("m")`
 * (including `dynamic(() => import("m"))`) and `require("m")`.
 * Non-literal dynamic imports cannot be resolved; they are reported in
 * `unresolvedDynamic` so the caller can say so instead of guessing.
 */
import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = [".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".json"];

/** Replace comments with spaces and string/template contents with "_" (same length, quotes kept). */
export function maskSource(source) {
  const out = source.split("");
  let i = 0;
  const n = source.length;
  while (i < n) {
    const c = source[i];
    const next = source[i + 1];
    if (c === "/" && next === "/") {
      while (i < n && source[i] !== "\n") out[i++] = " ";
    } else if (c === "/" && next === "*") {
      out[i++] = " ";
      out[i++] = " ";
      while (i < n && !(source[i] === "*" && source[i + 1] === "/")) {
        if (source[i] !== "\n") out[i] = " ";
        i += 1;
      }
      if (i < n) {
        out[i++] = " ";
        out[i++] = " ";
      }
    } else if (c === '"' || c === "'") {
      // ' and " strings never span lines; this also contains JSX apostrophes ("Don't") to one line
      i += 1;
      while (i < n && source[i] !== c && source[i] !== "\n") {
        if (source[i] === "\\") {
          out[i++] = "_";
          if (i < n && source[i] !== "\n") out[i++] = "_";
          continue;
        }
        out[i++] = "_";
      }
      if (i < n && source[i] === c) i += 1;
    } else if (c === "`") {
      i += 1;
      while (i < n && source[i] !== "`") {
        if (source[i] === "\\") {
          out[i++] = "_";
          if (i < n) out[i++] = source[i - 1] === "\n" ? "\n" : "_";
          continue;
        }
        if (source[i] !== "\n") out[i] = "_";
        i += 1;
      }
      if (i < n) i += 1;
    } else {
      i += 1;
    }
  }
  return out.join("");
}

const STATIC_IMPORT = /\bimport\s*(?:[\w$*{}\s,]+?\s*from\s*)?(["'])(_*)\1/g;
const EXPORT_FROM = /\bexport\s*(?:\*(?:\s+as\s+[\w$]+)?|\{[^}]*\})\s*from\s*(["'])(_*)\1/g;
const DYNAMIC_LITERAL = /\bimport\s*\(\s*(["'])(_*)\1\s*\)/g;
const REQUIRE_LITERAL = /\brequire\s*\(\s*(["'])(_*)\1\s*\)/g;
const DYNAMIC_ANY = /\bimport\s*\(\s*([^)\s"'])/g;

function specifiersFrom(masked, original, regex) {
  const found = [];
  for (const match of masked.matchAll(regex)) {
    const closing = match[0].lastIndexOf(match[1]);
    const length = match[2].length;
    // the specifier text sits just before the closing quote (or quote + ")")
    const quoteEnd = match.index + closing;
    found.push(original.slice(quoteEnd - length, quoteEnd));
  }
  return found;
}

/** All module specifiers imported by a source text, plus the count of non-literal dynamic imports. */
export function extractImports(source) {
  const masked = maskSource(source);
  const specs = new Set([
    ...specifiersFrom(masked, source, STATIC_IMPORT),
    ...specifiersFrom(masked, source, EXPORT_FROM),
    ...specifiersFrom(masked, source, DYNAMIC_LITERAL),
    ...specifiersFrom(masked, source, REQUIRE_LITERAL),
  ]);
  // DYNAMIC_ANY matches `import(x` / template literals; literal ones start with a quote and are excluded.
  const anyDynamic = [...masked.matchAll(DYNAMIC_ANY)].length;
  return { specifiers: [...specs], unresolvedDynamic: anyDynamic };
}

function probe(base) {
  const candidates = [base, ...EXTENSIONS.map((ext) => base + ext), ...EXTENSIONS.map((ext) => path.join(base, "index" + ext))];
  for (const candidate of candidates) {
    try {
      if (fs.statSync(candidate).isFile()) return candidate;
    } catch {
      /* not a file */
    }
  }
  return null;
}

/** Resolve a specifier relative to `fromFile`; "@/..." maps to <root>/src/. Bare packages return null. */
export function resolveSpecifier(specifier, fromFile, root) {
  if (specifier.startsWith("@/")) return probe(path.join(root, "src", specifier.slice(2)));
  if (specifier.startsWith("./") || specifier.startsWith("../")) return probe(path.resolve(path.dirname(fromFile), specifier));
  return null;
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(js|jsx|mjs|cjs|ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

/** Student-facing entry points: Next.js route files under src/app. */
export function findRouteRoots(root) {
  const appDir = path.join(root, "src/app");
  if (!fs.existsSync(appDir)) return [];
  return walk(appDir).filter((file) => /(^|\/)(page|layout|route|loading|error|not-found|template|default)\.(js|jsx|ts|tsx)$/.test(file));
}

/** Files reachable from the roots through resolvable imports. */
export function computeReachable(root, roots = findRouteRoots(root)) {
  const reachable = new Set();
  const unresolvedDynamic = [];
  const queue = [...roots];
  while (queue.length) {
    const file = queue.pop();
    if (reachable.has(file)) continue;
    reachable.add(file);
    let source;
    try {
      source = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }
    const { specifiers, unresolvedDynamic: dynamicCount } = extractImports(source);
    if (dynamicCount) unresolvedDynamic.push({ file: path.relative(root, file), count: dynamicCount });
    for (const specifier of specifiers) {
      const resolved = resolveSpecifier(specifier, file, root);
      if (resolved && !reachable.has(resolved)) queue.push(resolved);
    }
  }
  return { reachable, rootCount: roots.length, unresolvedDynamic };
}
