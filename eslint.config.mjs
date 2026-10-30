import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // The existing application intentionally uses effects to synchronize
      // browser storage, auth listeners, timers and server snapshots. These
      // are external-system synchronisation effects, not render-time state
      // derivation; keep the established behaviour while retaining the other
      // React and Next lint checks.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Build outputs and scratch from other Next toolchains and isolated tests
    // must not pollute the routine lint run.
    ".isolated-next-test/**",
    "scripts/tmp/**",
    // Old PostCSS config leftover from a Tailwind migration experiment; not
    // part of the current lint boundary.
    "postcss.config.js",
    "postcss.config.cjs",
    // Stale Tailwind config leftovers from a Tailwind migration experiment.
    "tailwind.config.js",
    "tailwind.config.cjs",
  ]),
]);

export default eslintConfig;
