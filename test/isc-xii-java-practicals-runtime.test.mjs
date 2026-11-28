import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { ISC_XII_JAVA_PRACTICALS } from "../src/app/data/iscXIIJavaPracticalAssignments.js";
import icseClass10Programs from "../src/app/data/icseClass10Programs.js";

test("all ICSE X and ISC XII Java programs compile and match their published sample runs", () => {
  const root = mkdtempSync(join(tmpdir(), "target95-java-samples-"));
  const programs = [...icseClass10Programs, ...ISC_XII_JAVA_PRACTICALS];
  try {
    for (const item of programs) {
      const workDir = join(root, item.id);
      mkdirSync(workDir);
      const sourcePath = join(workDir, "Assignment.java");
      writeFileSync(sourcePath, item.code, "utf8");

      const compile = spawnSync("javac", ["-encoding", "UTF-8", "-d", workDir, sourcePath], {
        encoding: "utf8",
        timeout: 20000,
      });
      assert.equal(compile.status, 0, `${item.id} (${item.title}) failed to compile:\n${compile.stderr}`);

      const classFiles = readdirSync(workDir).filter((name) => name.endsWith(".class"));
      const mainClass = classFiles
        .map((name) => name.slice(0, -6))
        .find((name) => {
          const inspected = spawnSync("javap", ["-classpath", workDir, "-public", name], {
            encoding: "utf8",
            timeout: 10000,
          });
          return inspected.status === 0 && /public static void main\(java\.lang\.String\[\]\);/.test(inspected.stdout);
        });
      assert.ok(mainClass, `${item.id} has no discoverable public static main method`);

      const input = item.sampleInput === "No keyboard input" ? "" : `${item.sampleInput}\n`;
      const execution = spawnSync("java", ["-cp", workDir, mainClass], {
        encoding: "utf8",
        input,
        timeout: 10000,
      });
      assert.equal(execution.status, 0, `${item.id} (${item.title}) failed at runtime:\n${execution.stderr}`);
      const actual = execution.stdout.replace(/\r\n/g, "\n").trimEnd();
      const expected = item.sampleOutput.replace(/\r\n/g, "\n").trimEnd();
      assert.equal(actual, expected, `${item.id} (${item.title}) sample output mismatch`);

      if (item.id === "ISC12-A01") {
        const boundaryRun = spawnSync("java", ["-cp", workDir, mainClass], {
          encoding: "utf8",
          input: "2\n-1 -2147483648\n",
          timeout: 10000,
        });
        assert.equal(boundaryRun.status, 0, `${item.id} failed on Integer.MIN_VALUE boundary input:\n${boundaryRun.stderr}`);
        assert.equal(
          boundaryRun.stdout.trimEnd(),
          "Second largest = -2147483648",
          "Second Largest must preserve Integer.MIN_VALUE as a valid distinct result",
        );
      }

      if (["x-prog-01", "x-prog-02", "x-prog-03", "x-prog-04", "x-prog-05", "x-prog-06", "x-prog-07", "x-prog-08", "x-prog-09"].includes(item.id)) {
        for (const invalidSize of ["0", "-2"]) {
          const invalidRun = spawnSync("java", ["-cp", workDir, mainClass], {
            encoding: "utf8",
            input: invalidSize + "\n",
            timeout: 10000,
          });
          assert.equal(invalidRun.status, 0, `${item.id} should reject n=${invalidSize} without crashing`);
          assert.match(invalidRun.stdout, /Enter a positive number of (students|elements)\./);
        }
      }

      if (["ISC12-A01", "ISC12-A02", "ISC12-A03"].includes(item.id)) {
        const invalidSizes = item.id === "ISC12-A02" ? ["0", "-1"] : ["0", "-2"];
        for (const invalidSize of invalidSizes) {
          const invalidRun = spawnSync("java", ["-cp", workDir, mainClass], {
            encoding: "utf8",
            input: invalidSize + "\n",
            timeout: 10000,
          });
          assert.equal(invalidRun.status, 0, item.id + " should reject n=" + invalidSize + " without crashing");
          assert.match(invalidRun.stdout, /Enter a positive number of elements/);
        }
      }

      if (["ISC12-D01", "ISC12-D02"].includes(item.id)) {
        const invalidLargeRun = spawnSync("java", ["-cp", workDir, mainClass], {
          encoding: "utf8",
          input: "50000 50000\n",
          timeout: 10000,
        });
        assert.equal(invalidLargeRun.status, 0, item.id + " should reject oversized matrices safely");
        assert.match(invalidLargeRun.stdout, /Matrix dimensions exceed the supported limit/);
      }

      if (item.id === "ISC12-D03") {
        const oversizedOperandsRun = spawnSync("java", ["-cp", workDir, mainClass], {
          encoding: "utf8",
          input: "50000 50000\n50000 50000\n",
          timeout: 10000,
        });
        assert.equal(oversizedOperandsRun.status, 0, "ISC12-D03 should reject oversized operand matrices safely");
        assert.match(oversizedOperandsRun.stdout, /Matrix dimensions exceed the supported limit/);

        const oversizedResultRun = spawnSync("java", ["-cp", workDir, mainClass], {
          encoding: "utf8",
          input: "1001 1\n1 1001\n",
          timeout: 10000,
        });
        assert.equal(oversizedResultRun.status, 0, "ISC12-D03 should reject an oversized result matrix safely");
        assert.match(oversizedResultRun.stdout, /Matrix dimensions exceed the supported limit/);
      }

      const invalidDimensionInputs = {
        "ISC12-A01": "0\n",
        "ISC12-A02": "-1\n",
        "ISC12-A03": "0\n",
        "ISC12-D01": "0 2\n",
        "ISC12-D02": "2 0\n",
        "ISC12-D03": "0 1 1 1\n",
        "ISC12-D04": "0\n",
      };
      if (invalidDimensionInputs[item.id]) {
        const invalidRun = spawnSync("java", ["-cp", workDir, mainClass], {
          encoding: "utf8",
          input: invalidDimensionInputs[item.id],
          timeout: 10000,
        });
        assert.equal(invalidRun.status, 0, item.id + " should reject non-positive dimensions without crashing");
        assert.match(invalidRun.stdout, /must be positive|Enter a positive/);
      }
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
