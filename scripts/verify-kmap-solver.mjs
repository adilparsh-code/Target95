// K-Map solver verification script (run: node scripts/verify-kmap-solver.mjs)
import { solveKMap } from "../src/lib/kmapSolver.js";

const cases = [
  [2, [1, 3], [], "SOP", "B"],
  [3, [1, 3, 5, 7], [], "SOP", "C"],
  [4, [0, 1, 2, 3], [], "SOP", "A'B'"],
  [4, [0, 2, 8, 10], [], "SOP", "B'D'"],
  [4, [0, 4, 8, 12], [], "SOP", "C'D'"],
  [3, [1, 3], [2], "SOP", "A'C"],
  [4, [0, 2, 5, 7, 8, 10, 13, 15], [], "SOP", "BD + B'D'"],
  [3, [0, 2, 4, 6], [], "POS", "C'"],
  [4, [0, 1, 2, 3, 8, 9, 10, 11], [], "POS", "B"],
  [4, [], [], "SOP", "0"],
  [4, [], [], "POS", "1"],
  [4, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [], "SOP", "1"],
  [4, [0], [], "POS", "(A + B + C + D)"],
];

let failures = 0;

for (const [n, minterms, dontCares, mode, expectedHint] of cases) {
  const result = solveKMap({ numVars: n, minterms, dontCares, mode });
  console.log(`${result.verified ? "VERIFIED" : "FAILED"} ${n}-var ${mode}: F = ${result.expression} (expected form: ${expectedHint})`);
  if (!result.verified) failures += 1;
}

// Exhaustive verification: every possible 2-, 3- and 4-variable truth function,
// with representative don't-care combinations. This validates both SOP and POS.
for (let n = 2; n <= 4; n += 1) {
  const total = 1 << n;
  const functionCount = 1 << total;

  for (let mask = 0; mask < functionCount; mask += 1) {
    const minterms = [];
    for (let i = 0; i < total; i += 1) {
      if (mask & (1 << i)) minterms.push(i);
    }

    for (const mode of ["SOP", "POS"]) {
      const result = solveKMap({ numVars: n, minterms, mode });
      if (!result.verified) {
        failures += 1;
        console.log("EXHAUSTIVE FAIL", n, mode, minterms.join(","), result.expression);
      }
    }
  }
}

// Additional don't-care checks across all small 2-variable truth tables.
for (let mask = 0; mask < 16; mask += 1) {
  const minterms = [];
  const dontCares = [];
  for (let i = 0; i < 4; i += 1) {
    if (mask & (1 << i)) minterms.push(i);
    else if (mask & (1 << (i + 4))) dontCares.push(i);
  }
  for (const mode of ["SOP", "POS"]) {
    const result = solveKMap({ numVars: 2, minterms, dontCares, mode });
    if (!result.verified) {
      failures += 1;
      console.log("DONT-CARE FAIL", mode, minterms.join(","), dontCares.join(","), result.expression);
    }
  }
}

console.log(failures === 0 ? "ALL K-MAP CHECKS PASSED" : `${failures} K-MAP FAILURES`);
process.exit(failures === 0 ? 0 : 1);
