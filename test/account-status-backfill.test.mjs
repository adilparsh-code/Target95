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

test("consistent profiles are left alone", () => {
  assert.equal(decideAccountStatus({ status: "active", disabled: false }, activeAuth), null);
  assert.equal(decideAccountStatus({ status: "inactive", disabled: true }, activeAuth), null);
});
