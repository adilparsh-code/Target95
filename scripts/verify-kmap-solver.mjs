// Temporary solver verification script (run: node scripts/verify-kmap-solver.mjs)
import { solveKMap } from "../src/lib/kmapSolver.js";

const cases = [
  [2, [1, 3], [], "SOP", "B"],
  [3, [1, 3, 5, 7], [], "SOP", "C"],
  [4, [0, 1, 2, 3], [], "SOP", "A'B'"],
  [4, [0, 2, 8, 10], [], "SOP", "B'D'"],       // corners / wrap-around
  [4, [0, 4, 8, 12], [], "SOP", "C'D'"],       // vertical wrap column
  [3, [1, 3], [2], "SOP", "A'C"],              // don't-care usage
  [4, [0, 2, 5, 7, 8, 10, 13, 15], [], "SOP", "BD + B'D'"],
  [3, [0, 2, 4, 6], [], "POS", "C"],           // POS zeros
  [4, [0, 1, 2, 3, 8, 9, 10, 11], [], "SOP", "B'D' + B C'... check"],
];

let failures = 0;
for (const [n, minterms, dontCares, mode] of cases.slice(0, 8)) {
  const r = solveKMap({ numVars: n, minterms, dontCares, mode });
  console.log(`${r.verified ? "VERIFIED" : "FAILED"} ${n}-var ${mode}: F = ${r.expression}`);
  if (!r.verified) failures += 1;
}

// Exhaustive random verification for extra confidence.
for (let trial = 0; trial < 500; trial += 1) {
  const n = 2 + Math.floor(Math.random() * 3);
  const total = 1 << n;
  const minterms = [];
  for (let i = 0; i < total; i += 1) if (Math.random() < 0.5) minterms.push(i);
  const dontCares = [];
  for (let i = 0; i < total; i += 1) {
    if (!minterms.includes(i) && Math.random() < 0.2) dontCares.push(i);
  }
  const mode = Math.random() < 0.5 ? "SOP" : "POS";
  const r = solveKMap({ numVars: n, minterms, dontCares, mode });
  if (!r.verified) {
    failures += 1;
    console.log("RANDOM FAIL", n, mode, minterms.join(","), r.expression);
  }
}
console.log(failures === 0 ? "ALL CHECKS PASSED" : `${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
