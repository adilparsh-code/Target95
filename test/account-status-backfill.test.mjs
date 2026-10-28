import { test } from "node:test";
import assert from "node:assert/strict";
import { decideAccountStatus } from "../scripts/backfill-account-status.mjs";

const activeAuth = { exists: true, disabled: false };

test("legacy profile without status becomes active when the Auth user is enabled", () => {
  assert.deepEqual(decideAccountStatus({ role: "student" }, activeAuth), { status: "active", disabled: false });
});

test("profile is inactive when the Auth user is disabled or missing", () => {
  assert.deepEqual(decideAccountStatus({}, { exists: true, disabled: true }), { status: "inactive", disabled: true });
  assert.deepEqual(decideAccountStatus({}, { exists: false, disabled: true }), { status: "inactive", disabled: true });
});

test("an existing disabled flag is never re-enabled", () => {
  assert.deepEqual(decideAccountStatus({ disabled: true }, activeAuth), { status: "inactive", disabled: true });
});

test("a deactivated profile stays deactivated", () => {
  assert.deepEqual(decideAccountStatus({ status: "inactive" }, activeAuth), { status: "inactive", disabled: true });
});

test("malformed status values are normalised from Auth", () => {
  assert.deepEqual(decideAccountStatus({ status: "ACTIVE!!" }, activeAuth), { status: "active", disabled: false });
  assert.deepEqual(decideAccountStatus({ status: 1 }, { exists: true, disabled: true }), { status: "inactive", disabled: true });
});

test("an active profile whose Auth user is disabled or missing becomes inactive", () => {
  const profile = { status: "active", disabled: false };
  assert.deepEqual(decideAccountStatus(profile, { exists: true, disabled: true }), { status: "inactive", disabled: true });
  assert.deepEqual(decideAccountStatus(profile, { exists: false, disabled: true }), { status: "inactive", disabled: true });
});

test("the entry point runs main() when invoked by path", async () => {
  const { spawnSync } = await import("node:child_process");
  const { fileURLToPath } = await import("node:url");
  const script = fileURLToPath(new URL("../scripts/backfill-account-status.mjs", import.meta.url));
  const env = { ...process.env };
  delete env.FIREBASE_SERVICE_ACCOUNT;
  const result = spawnSync(process.execPath, [script], { env, encoding: "utf8" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /FIREBASE_SERVICE_ACCOUNT is not set/);
});

test("consistent profiles are left alone", () => {
  assert.equal(decideAccountStatus({ status: "active", disabled: false }, activeAuth), null);
  assert.equal(decideAccountStatus({ status: "inactive", disabled: true }, activeAuth), null);
});
