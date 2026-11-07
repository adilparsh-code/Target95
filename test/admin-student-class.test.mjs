import test from "node:test";
import assert from "node:assert/strict";
import { resolveStudentClass } from "../src/lib/studentClass.mjs";

test("reads the sign-up field (studentClass: 'Class 10')", () => {
  assert.equal(resolveStudentClass({ studentClass: "Class 10" }), "10");
});
test("prefers explicit class and handles bare numbers", () => {
  assert.equal(resolveStudentClass({ class: 9, studentClass: "Class 10" }), "9");
  assert.equal(resolveStudentClass({ class: "12" }), "12");
});
test("returns empty string when no class is stored", () => {
  assert.equal(resolveStudentClass({}), "");
  assert.equal(resolveStudentClass(null), "");
  assert.equal(resolveStudentClass({ studentClass: "Not set" }), "");
});
