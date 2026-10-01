import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  calculateMockTestResult,
  evaluateMockTestAnswer,
  getMockTestDraftKey,
  getMockTestResultSessionKey,
} from "../../mocktest.js";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const read = (relativePath) => fs.readFileSync(path.join(repositoryRoot, relativePath), "utf8");

test("mock-test scoring handles correct, incorrect, and unanswered responses", () => {
  const questions = [
    { id: "q1", type: "mcq", answer: "A" },
    { id: "q2", type: "mcq", answer: "B" },
    { id: "q3", type: "mcq", answer: "C" },
  ];
  const result = calculateMockTestResult(questions, { q1: "A", q2: "D" }, {});

  assert.equal(evaluateMockTestAnswer(questions[0], "A"), true);
  assert.equal(evaluateMockTestAnswer(questions[1], "D"), false);
  assert.equal(result.score, 1);
  assert.equal(result.totalQuestions, 3);
  assert.equal(result.attemptedCount, 2);
  assert.equal(result.wrongCount, 1);
  assert.equal(result.unansweredCount, 1);
  assert.equal(result.percentage, 33);
  assert.equal(result.accuracy, 50);
});

test("mock-test draft and result handoff keys are isolated by UID", () => {
  const config = { board: "ICSE", category: "icse-class-9", chapter: "all" };
  assert.notEqual(getMockTestDraftKey(config, "student-a"), getMockTestDraftKey(config, "student-b"));
  assert.notEqual(getMockTestResultSessionKey("student-a"), getMockTestResultSessionKey("student-b"));
});

test("Firestore rules scope Practice data to the user document owner", () => {
  const rules = read("firestore.rules");
  for (const collection of ["activeSessions", "practiceSessions", "practiceAnswers", "practiceStatistics"]) {
    assert.match(rules, new RegExp(`match /${collection}/\\{[^}]+\\} \\{[\\s\\S]*?isOwner\\(userId\\)`));
  }
  assert.match(rules, /request\.resource\.data\.userId == resource\.data\.userId/);
});

test("mock-test persistence consistently uses the secured results collection", () => {
  const sourceFiles = [
    "src/app/hooks/useMockTests.js",
    "src/app/services/MockTestService.js",
    "src/app/api/admin/mock-tests/route.js",
    "src/app/api/admin/mock-tests/[id]/route.js",
    "src/app/api/admin/students/[id]/route.js",
    "src/app/api/admin/analytics/route.js",
  ];
  for (const sourceFile of sourceFiles) {
    assert.doesNotMatch(read(sourceFile), /mockTestResults/);
  }
});

test("verified auth identity wins over Firestore profile fields and private routes are protected", () => {
  const authContext = read("src/context/AuthContext.js");
  const profileSpread = authContext.indexOf("...profile");
  assert.ok(profileSpread >= 0);
  assert.ok(authContext.indexOf("uid: firebaseUser.uid", profileSpread) > profileSpread);
  assert.ok(authContext.indexOf("email: firebaseUser.email", profileSpread) > profileSpread);

  const proxy = read("src/proxy.js");
  assert.match(proxy, /["']\/student\/dashboard["']/);
  assert.match(proxy, /["']\/practice["']/);
  assert.match(proxy, /["']\/mock-test["']/);
  assert.match(proxy, /["']\/admin["']/);
});

test("Class IX exclusions remain source-level and shared definitions remain present", () => {
  const curriculum = read("src/app/data/javaCurriculum.js");
  const excluded = ["arrays-1d", "arrays-2d", "strings", "classes-objects", "encapsulation", "constructors", "inheritance"];
  for (const slug of excluded) {
    assert.match(curriculum, new RegExp(`slug: ["']${slug}["']`));
    assert.match(curriculum, new RegExp(`["']${slug}["'],`));
  }
});
