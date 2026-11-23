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
          input: "2\\n-1 -2147483648\\n",
          timeout: 10000,
        });
        assert.equal(boundaryRun.status, 0, `${item.id} failed on Integer.MIN_VALUE boundary input:\\n${boundaryRun.stderr}`);
        assert.equal(
          boundaryRun.stdout.trimEnd(),
          "Second largest = -2147483648",
          "Second Largest must preserve Integer.MIN_VALUE as a valid distinct result",
        );
      }
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
