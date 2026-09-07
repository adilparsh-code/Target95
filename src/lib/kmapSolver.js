// Pure, SSR-safe K-Map solving engine for 2, 3 and 4 variables.
// No browser APIs — safe for static generation and server rendering.

export const GRAY_ORDER = [0, 1, 3, 2];

const ROW_VARS = { 2: 1, 3: 1, 4: 2 };
const LETTERS = ["A", "B", "C", "D"];

// Layout: row bits are the high-order bits (A first), column bits follow.
// Example: 3-var → rows = A, columns = BC; index = (grayRow << colVars) | grayCol.
export function buildLayout(numVars) {
  const rowVars = ROW_VARS[numVars];
  const colVars = numVars - rowVars;
  const rowCount = 1 << rowVars;
  const colCount = 1 << colVars;
  const rows = [];
  for (let r = 0; r < rowCount; r += 1) {
    const cols = [];
    for (let c = 0; c < colCount; c += 1) {
      cols.push((GRAY_ORDER[r] << colVars) | GRAY_ORDER[c]);
    }
    rows.push(cols);
  }
  return {
    numVars,
    rowVars,
    colVars,
    rowCount,
    colCount,
    variableNames: LETTERS.slice(0, numVars),
    grid: rows,
  };
}

// Consecutive Gray-code runs along one axis, wrap-around included.
function axisRuns(axisSize) {
  const runs = [];
  for (let start = 0; start < axisSize; start += 1) {
    for (const size of [1, 2, 4]) {
      if (size > axisSize) continue;
      const positions = [];
      for (let i = 0; i < size; i += 1) positions.push((start + i) % axisSize);
      runs.push(positions);
    }
  }
  return runs;
}

function polarityTerm(numVars, cells, isPos) {
  const literals = [];
  for (let bit = numVars - 1; bit >= 0; bit -= 1) {
    const mask = 1 << bit;
    const sawOne = cells.some((value) => value & mask);
    const sawZero = cells.some((value) => !(value & mask));
    if (sawOne && sawZero) continue; // variable changes inside the group

    if (isPos) {
      // POS: constant 0 → uncomplemented; constant 1 → complemented.
      literals.push(LETTERS[bit] + (sawOne ? "'" : ""));
    } else {
      // SOP: constant 1 → uncomplemented; constant 0 → complemented.
      literals.push(LETTERS[bit] + (sawZero ? "'" : ""));
    }
  }

  if (isPos) return literals.length ? literals.join(" + ") : "0";
  return literals.length ? literals.join("") : "1";
}

function enumerateGroups(layout, values, required) {
  const { grid } = layout;
  const rowRuns = axisRuns(layout.rowCount);
  const colRuns = axisRuns(layout.colCount);
  const groups = [];
  for (const rowRun of rowRuns) {
    for (const colRun of colRuns) {
      const cells = [];
      for (const r of rowRun) {
        for (const c of colRun) cells.push(grid[r][c]);
      }
      if (!cells.every((value) => values[value] !== 0)) continue;
      if (!cells.some((value) => required.includes(value))) continue;
      const unique = [...new Set(cells)].sort((a, b) => a - b);
      groups.push({ cells: unique, size: unique.length });
    }
  }
  return groups;
}

// A group is prime when no other valid group strictly contains it.
function filterPrime(groups) {
  return groups.filter(
    (group) =>
      !groups.some(
        (other) =>
          other !== group &&
          other.size > group.size &&
          other.cells.every((cell) => group.cells.includes(cell)),
      ),
  );
}

function cover(required, primes) {
  // Exact minimal cover (maps are small): minimizes the number of selected groups,
  // then prefers larger groups via the secondary cost.
  let best = null;

  const search = (remaining, chosen, start) => {
    if (remaining.length === 0) {
      const groupCount = chosen.length;
      const coveredCells = chosen.reduce((sum, group) => sum + group.size, 0);
      const score = [groupCount, -coveredCells];
      if (!best || score[0] < best.score[0] || (score[0] === best.score[0] && score[1] < best.score[1])) {
        best = { groups: [...chosen], score };
      }
      return;
    }

    if (best && chosen.length >= best.score[0]) return;

    // Pick a required cell with the fewest available covering primes to reduce branching.
    let pivot = remaining[0];
    let pivotOptions = primes.filter(
      (prime, index) => index >= start && prime.cells.includes(pivot),
    );
    for (const cell of remaining) {
      const options = primes.filter((prime, index) => index >= start && prime.cells.includes(cell));
      if (options.length < pivotOptions.length) {
        pivot = cell;
        pivotOptions = options;
      }
    }

    for (const prime of pivotOptions) {
      const index = primes.indexOf(prime);
      search(
        remaining.filter((cell) => !prime.cells.includes(cell)),
        [...chosen, prime],
        index + 1,
      );
    }
  };

  search([...required], [], 0);
  return best ? best.groups : [];
}

function evaluateSOP(termMasks, numVars) {
  const output = new Array(1 << numVars).fill(false);
  for (let input = 0; input < output.length; input += 1) {
    output[input] = termMasks.some((term) => (input & term.mask) === term.value);
  }
  return output;
}

function evaluatePOS(termMasks, numVars) {
  const output = new Array(1 << numVars).fill(false);
  for (let input = 0; input < output.length; input += 1) {
    // A POS expression is an AND of sum terms. A sum term is false only
    // when every literal in that sum is false.
    output[input] = termMasks.every((term) => {
      const sumIsTrue = term.literals.some((literal) => {
        const bitSet = Boolean(input & literal.bit);
        return literal.complemented ? !bitSet : bitSet;
      });
      return sumIsTrue;
    });
  }
  return output;
}

function parseSOPTerm(term, numVars) {
  let mask = 0;
  let value = 0;
  for (let i = 0; i < term.length; i += 1) {
    const letterIndex = LETTERS.indexOf(term[i]);
    if (letterIndex === -1 || letterIndex >= numVars) continue;
    mask |= 1 << letterIndex;
    if (term[i + 1] === "'") i += 1;
    else value |= 1 << letterIndex;
  }
  return { mask, value };
}

function parsePOSTerm(term, numVars) {
  return term.split("+").map((literal) => literal.trim()).filter(Boolean).map((literal) => {
    const letterIndex = LETTERS.indexOf(literal[0]);
    return {
      bit: 1 << letterIndex,
      complemented: literal[1] === "'",
    };
  }).filter((literal) => literal.bit && Number.isInteger(Math.log2(literal.bit)) && literal.bit <= (1 << (numVars - 1)));
}

export function solveKMap({ numVars, minterms = [], dontCares = [], mode = "SOP" }) {
  if (![2, 3, 4].includes(numVars)) {
    throw new Error("K-Map supports only 2, 3 and 4 variables.");
  }
  const layout = buildLayout(numVars);
  const total = 1 << numVars;
  const valid = (m) => Number.isInteger(m) && m >= 0 && m < total;
  const ones = [...new Set(minterms.filter(valid))];
  const donts = [...new Set(dontCares.filter(valid))].filter((m) => !ones.includes(m));
  const zeros = [];
  for (let i = 0; i < total; i += 1) {
    if (!ones.includes(i) && !donts.includes(i)) zeros.push(i);
  }

  const isPos = mode === "POS";
  const targets = isPos ? zeros : ones;

  if (targets.length === total) {
    const expression = isPos ? "0" : "1";
    return {
      layout,
      groups: [],
      terms: [expression],
      expression,
      steps: [
        `Every cell is ${isPos ? "0" : "1"}, so the function simplifies to constant ${expression}.`,
      ],
      verified: true,
    };
  }

  if (targets.length === 0) {
    const expression = isPos ? "1" : "0";
    return {
      layout,
      groups: [],
      terms: [expression],
      expression,
      steps: [
        `There are no ${isPos ? "zeros" : "ones"} to group, so the function is always ${expression}.`,
      ],
      verified: true,
    };
  }

  const values = new Array(total).fill(0);
  for (const cell of targets) values[cell] = 1;
  for (const cell of donts) values[cell] = 2;

  const primes = filterPrime(enumerateGroups(layout, values, targets));
  const chosen = cover(targets, primes).sort((a, b) => b.size - a.size);

  const terms = chosen.map((group) => polarityTerm(numVars, group.cells, isPos));
  const expression = isPos
    ? terms.map((term) => `(${term})`).join("")
    : terms.join(" + ");

  const steps = [
    `Step 1: Place ${isPos ? "zeros" : "ones"} at ${isPos ? "maxterms" : "minterms"} ${targets.join(", ")}${donts.length ? `, mark X at don't-cares ${donts.join(", ")}` : ""}.`,
    "Step 2: Form the largest rectangular groups of powers-of-two cells (wrap-around adjacency allowed; diagonals are never adjacent).",
    ...chosen.map(
      (group, i) =>
        `Group ${i + 1} (${group.size} cells): ${isPos ? "zero cells" : "minterms"} ${group.cells.join(", ")} → variables that change disappear → term "${terms[i]}"`,
    ),
    `Final answer (${mode}): F = ${expression}`,
  ];

  const actual = isPos
    ? evaluatePOS(terms.map((term) => ({ literals: parsePOSTerm(term, numVars) })), numVars)
    : evaluateSOP(terms.map((term) => parseSOPTerm(term, numVars)), numVars);
  const expected = new Array(total).fill(false).map((_, i) => ones.includes(i));
  const verified = actual.every((value, i) => value === expected[i]);

  return { layout, groups: chosen, terms, expression, steps, verified };
}
