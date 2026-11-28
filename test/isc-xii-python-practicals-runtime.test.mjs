import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { ISC_XII_PYTHON_PRACTICALS } from "../src/app/data/iscXIIJavaPythonPracticalAssignments.js";

test("ISC Class XII Python practicals match the CISCE 2028 distribution", () => {
  assert.equal(ISC_XII_PYTHON_PRACTICALS.length, 5);
  assert.equal(new Set(ISC_XII_PYTHON_PRACTICALS.map((item) => item.id)).size, 5);
  const count = (category) => ISC_XII_PYTHON_PRACTICALS.filter((item) => item.category === category).length;
  assert.equal(count("Strings"), 1);
  assert.equal(count("Lists"), 2);
  assert.equal(count("Tuples"), 2);

  for (const item of ISC_XII_PYTHON_PRACTICALS) {
    assert.ok(item.objective.length > 30, `${item.id} needs a clear objective`);
    assert.ok(item.algorithm.length >= 4, `${item.id} needs an algorithm`);
    assert.match(item.code, /input\(/, `${item.id} should accept sample input`);
    assert.ok(item.sampleInput.length > 0, `${item.id} needs sample input`);
    assert.ok(item.sampleOutput.length > 0, `${item.id} needs expected output`);
    assert.ok(item.concepts.length >= 2, `${item.id} needs concept tags`);
  }
});

test("all five ISC Class XII Python practical sample runs match their expected output", () => {
  for (const item of ISC_XII_PYTHON_PRACTICALS) {
    const execution = spawnSync("python3", ["-c", item.code], {
      encoding: "utf8",
      input: `${item.sampleInput}\n`,
      timeout: 10000,
    });
    assert.equal(execution.status, 0, `${item.id} failed: ${execution.stderr}`);
    assert.equal(
      execution.stdout.replace(/\r\n/g, "\n").trimEnd(),
      item.sampleOutput.replace(/\r\n/g, "\n").trimEnd(),
      `${item.id} sample output mismatch`,
    );
  }
});
