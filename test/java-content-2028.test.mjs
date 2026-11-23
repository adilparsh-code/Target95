import test from "node:test";
import assert from "node:assert/strict";
import icseClass10Programs from "../src/app/data/icseClass10Programs.js";
import { ICSE_CLASS_X_CONTENT } from "../src/app/data/icseClassXContent.js";
import { ISC_XII_JAVA_PRACTICALS } from "../src/app/data/iscXIIJavaPracticalAssignments.js";
import { ISC_XII_JAVA_PYTHON_CONTENT } from "../src/app/data/iscXIIJavaPythonContent.js";
import { ISC_XII_PRACTICAL } from "../src/lib/iscSyllabus.js";

test("ICSE Class X has 20 unique recommended Java programs", () => {
  assert.equal(icseClass10Programs.length, 20);
  assert.equal(new Set(icseClass10Programs.map((item) => item.id)).size, 20);
  assert.ok(icseClass10Programs.some((item) => item.title === "Alphabetical Sorting of a String Array"));
  assert.ok(icseClass10Programs.some((item) => item.title === "Linear Search in a String Array"));
  assert.ok(!icseClass10Programs.some((item) => /matrix/i.test(item.title)));
  const replace = icseClass10Programs.find((item) => item.id === "x-prog-14");
  assert.match(replace.code, /replace\(oldChar,\s*newChar\)/);
  assert.match(replace.code, /char oldChar/);
});

test("ICSE Class X lesson content remains mapped to all eight official topic IDs", () => {
  assert.equal(ICSE_CLASS_X_CONTENT.length, 8);
  const arrays = ICSE_CLASS_X_CONTENT.find((item) => item.topicId === "x-arrays");
  assert.ok(arrays.keyConcepts.some((item) => /String arrays/i.test(item)));
  assert.ok(!arrays.learningObjectives.some((item) => /two-dimensional/i.test(item)));
  const strings = ICSE_CLASS_X_CONTENT.find((item) => item.topicId === "x-strings");
  assert.ok(strings.practicalTasks.some((item) => /replace\(char, char\)/i.test(item)));
});

test("ICSE Class X disruptive technologies cover the prescribed 2028 topics", () => {
  const disruptive = ICSE_CLASS_X_CONTENT.find((item) => item.topicId === "x-disruptive-technologies");
  const text = [
    ...disruptive.learningObjectives,
    ...disruptive.keyConcepts,
    ...disruptive.remember,
  ].join(" ").toLowerCase();
  for (const topic of ["cyber hygiene", "cyber laws", "artificial intelligence", "blockchain", "internet of things", "robotics", "5g", "cloud computing"]) {
    assert.ok(text.includes(topic), `Missing prescribed disruptive technology topic: ${topic}`);
  }
});

test("ISC Class XII practical distribution matches the 2028 syllabus", () => {
  assert.equal(ISC_XII_JAVA_PRACTICALS.length, 20);
  assert.equal(new Set(ISC_XII_JAVA_PRACTICALS.map((item) => item.id)).size, 20);
  const count = (category) => ISC_XII_JAVA_PRACTICALS.filter((item) => item.category === category).length;
  assert.equal(count("Methods"), 5);
  assert.equal(count("Single-dimensional arrays"), 3);
  assert.equal(count("Double-dimensional arrays"), 5);
  assert.equal(count("String handling"), 4);
  assert.equal(count("Inheritance"), 3);
  const methodAssignments = ISC_XII_JAVA_PRACTICALS.filter((item) => item.category === "Methods");
  assert.equal(methodAssignments.length, 5);
  for (const item of methodAssignments) {
    assert.match(item.code, /static\s+(Student|Book|Account|Rectangle|Employee)\s+\w+\s*\(/);
  }
  assert.equal(ISC_XII_PRACTICAL.javaAssignmentsMinimum, 20);
  assert.equal(ISC_XII_PRACTICAL.pythonAssignmentsMinimum, 5);
  assert.equal(ISC_XII_PRACTICAL.totalAssignmentsMinimum, 25);
  const secondLargest = ISC_XII_JAVA_PRACTICALS.find((item) => item.id === "ISC12-A01");
  assert.match(secondLargest.code, /second == Long\.MIN_VALUE/);
  for (const item of ISC_XII_JAVA_PRACTICALS) {
    assert.match(item.code, /class\s+[A-Za-z_$][\w$]*/);
    assert.match(item.code, /static void main\s*\(/);
    assert.ok(item.algorithm.length >= 3);
    assert.ok(item.sampleOutput.length > 0);
  }
});

test("ISC Class XII Java theory includes the missing 2028 syllabus concepts", () => {
  const methods = ISC_XII_JAVA_PYTHON_CONTENT["methods-object-parameter-return"];
  assert.ok(methods.concepts.some((item) => /return an array/i.test(item)));
  const arrays = ISC_XII_JAVA_PYTHON_CONTENT["arrays-strings"];
  assert.ok(arrays.concepts.some((item) => /row-major address/i.test(item)));
  assert.ok(arrays.concepts.some((item) => /insertion sort/i.test(item)));
  assert.ok(arrays.concepts.some((item) => /StringBuffer/i.test(item)));
  const recursion = ISC_XII_JAVA_PYTHON_CONTENT.recursion;
  assert.ok(recursion.concepts.some((item) => /Tower of Hanoi/i.test(item)));
  const inheritance = ISC_XII_JAVA_PYTHON_CONTENT["inheritance-interface"];
  assert.ok(inheritance.concepts.some((item) => /abstract class/i.test(item)));
  assert.ok(inheritance.concepts.some((item) => /java.lang.Object/i.test(item)));
  assert.ok(inheritance.concepts.some((item) => /conceptually only/i.test(item)));
  assert.ok(!inheritance.practice.some((item) => /interface Printable|Drawable\[\]/i.test(item.question)));
});
