import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { checkAccountStatusManageable, transitionAccountStatus } from "../src/lib/accountStatus.mjs";

/**
 * Regression tests for MEDIUM-1: PATCH /api/admin/students/[id] must protect
 * admins identified by the Firestore profile role OR Firebase Auth custom
 * claims, and must fail closed when the Auth lookup fails.
 * In-memory fakes only: no credentials, no network, no emulator.
 */
function makeWorld({ profile, authRecord }) {
  const mutations = [];
  const lookups = [];
  const auth = {
    getUser: async (uid) => {
      lookups.push(uid);
      if (authRecord instanceof Error) throw authRecord;
      if (authRecord === "missing") throw Object.assign(new Error("no user"), { code: "auth/user-not-found" });
      return { uid, disabled: false, customClaims: authRecord?.customClaims };
    },
    updateUser: async (uid, props) => { mutations.push({ op: "auth.updateUser", uid, props }); },
    revokeRefreshTokens: async (uid) => { mutations.push({ op: "auth.revoke", uid }); },
  };
  const profileRef = { update: async (fields) => { mutations.push({ op: "profile.update", fields }); } };
  const logs = [];
  const logger = {
    error: (...a) => logs.push(["error", ...a]),
    warn: (...a) => logs.push(["warn", ...a]),
    info: (...a) => logs.push(["info", ...a]),
  };
  return { profile, auth, profileRef, mutations, lookups, logs, logger };
}

/** Mirrors the PATCH handler's order: guard first, transition only if allowed. */
async function patchFlow(world, target) {
  const guard = await checkAccountStatusManageable({ uid: "u1", profile: world.profile, auth: world.auth, logger: world.logger });
  if (!guard.ok) return { status: guard.httpStatus, body: { success: false, error: guard.message } };
  const result = await transitionAccountStatus({
    uid: "u1", target, auth: world.auth, profileRef: world.profileRef, actorUid: "admin-actor",
    logger: world.logger, sleep: async () => {}, retryDelaysMs: [],
  });
  return { status: result.ok ? 200 : result.httpStatus, body: { success: result.ok } };
}

describe("checkAccountStatusManageable (admin student status route guard)", () => {
  test("profile role admin stays protected", async () => {
    const w = makeWorld({ profile: { role: "admin", status: "active" }, authRecord: { customClaims: {} } });
    const res = await patchFlow(w, "inactive");
    assert.equal(res.status, 403);
    assert.deepEqual(w.mutations, []);
  });

  for (const [label, profile] of [
    ["missing profile role", { status: "active" }],
    ["stale profile role student", { role: "student", status: "active" }],
    ["null profile data", null],
  ]) {
    test(`claim admin === true with ${label} stays protected`, async () => {
      const w = makeWorld({ profile, authRecord: { customClaims: { admin: true } } });
      const res = await patchFlow(w, "inactive");
      assert.equal(res.status, 403);
      assert.equal(res.body.error, "Admin accounts cannot be managed here.");
      assert.deepEqual(w.lookups, ["u1"]);
      assert.deepEqual(w.mutations, []);
    });
  }

  test("claim role === 'admin' (existing isProtectedAdminAccount policy) stays protected", async () => {
    const w = makeWorld({ profile: { role: "student" }, authRecord: { customClaims: { role: "admin" } } });
    const res = await patchFlow(w, "inactive");
    assert.equal(res.status, 403);
    assert.deepEqual(w.mutations, []);
  });

  test("claim-admin is also protected from reactivation changes", async () => {
    const w = makeWorld({ profile: { role: "student", status: "inactive" }, authRecord: { customClaims: { admin: true } } });
    const res = await patchFlow(w, "active");
    assert.equal(res.status, 403);
    assert.deepEqual(w.mutations, []);
  });

  for (const code of ["auth/internal-error", "auth/network-request-failed", undefined]) {
    test(`Auth lookup failure (${code ?? "no code"}) fails closed with no mutation`, async () => {
      const err = Object.assign(new Error("secret internal detail"), code ? { code } : {});
      const w = makeWorld({ profile: { role: "student", status: "active" }, authRecord: err });
      const res = await patchFlow(w, "inactive");
      assert.equal(res.status, 503);
      assert.equal(res.body.success, false);
      assert.doesNotMatch(res.body.error, /secret internal detail/);
      assert.deepEqual(w.mutations, []);
      // Logged without the error message.
      assert.equal(w.logs.length, 1);
      assert.doesNotMatch(JSON.stringify(w.logs), /secret internal detail/);
    });
  }

  test("ordinary student: deactivation still proceeds as before", async () => {
    const w = makeWorld({ profile: { role: "student", status: "active" }, authRecord: { customClaims: {} } });
    const res = await patchFlow(w, "inactive");
    assert.equal(res.status, 200);
    assert.ok(w.mutations.some((m) => m.op === "auth.updateUser" && m.props.disabled === true));
    assert.ok(w.mutations.some((m) => m.op === "auth.revoke"));
    assert.ok(w.mutations.some((m) => m.op === "profile.update" && m.fields.status === "inactive"));
  });

  test("ordinary student with no custom claims at all is manageable", async () => {
    const w = makeWorld({ profile: { status: "active" }, authRecord: { customClaims: undefined } });
    assert.deepEqual(await checkAccountStatusManageable({ uid: "u1", profile: w.profile, auth: w.auth, logger: w.logger }), { ok: true });
  });

  test("auth/user-not-found: no claims exist, profile role alone decides (matches reconcile policy)", async () => {
    const student = makeWorld({ profile: { role: "student" }, authRecord: "missing" });
    assert.deepEqual(await checkAccountStatusManageable({ uid: "u1", profile: student.profile, auth: student.auth, logger: student.logger }), { ok: true });
    const admin = makeWorld({ profile: { role: "admin" }, authRecord: "missing" });
    const r = await checkAccountStatusManageable({ uid: "u1", profile: admin.profile, auth: admin.auth, logger: admin.logger });
    assert.equal(r.ok, false);
    assert.equal(r.httpStatus, 403);
  });

  for (const [label, customClaims] of [
    ["admin: 'true' (string)", { admin: "true" }],
    ["admin: 1", { admin: 1 }],
    ["role: 'Admin' (case)", { role: "Admin" }],
    ["role: 'administrator'", { role: "administrator" }],
    ["roles: ['admin']", { roles: ["admin"] }],
    ["isAdmin: true", { isAdmin: true }],
    ["teacher: true", { teacher: true }],
  ]) {
    test(`non-policy claim ${label} does not grant admin protection`, async () => {
      const w = makeWorld({ profile: { role: "student" }, authRecord: { customClaims } });
      assert.deepEqual(await checkAccountStatusManageable({ uid: "u1", profile: w.profile, auth: w.auth, logger: w.logger }), { ok: true });
    });
  }

  test("profile role variants other than exact 'admin' do not grant protection", async () => {
    for (const role of ["Admin", "ADMIN", " admin", "administrator"]) {
      const w = makeWorld({ profile: { role }, authRecord: { customClaims: {} } });
      const r = await checkAccountStatusManageable({ uid: "u1", profile: w.profile, auth: w.auth, logger: w.logger });
      assert.equal(r.ok, true, role);
    }
  });
});

describe("PATCH /api/admin/students/[id] wiring", () => {
  const src = readFileSync(new URL("../src/app/api/admin/students/[id]/route.js", import.meta.url), "utf8");
  const patch = src.slice(src.indexOf("export async function PATCH"), src.indexOf("export async function GET"));

  test("guard runs after adminGuard and before transitionAccountStatus", () => {
    const iGuard = patch.indexOf("adminGuard(request)");
    const iCheck = patch.indexOf("checkAccountStatusManageable(");
    const iTransition = patch.indexOf("transitionAccountStatus(");
    assert.ok(iGuard > -1 && iCheck > iGuard && iTransition > iCheck);
    assert.match(patch, /if \(!manageable\.ok\)\s*\{\s*return Response\.json/);
  });

  test("legacy profile-role-only check is gone", () => {
    assert.doesNotMatch(patch, /role === "admin"/);
  });
});
