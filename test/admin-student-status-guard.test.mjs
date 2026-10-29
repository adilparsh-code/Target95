import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { checkAccountStatusManageable, manageStudentAccountStatus } from "../src/lib/accountStatus.mjs";
import { makeFakeAccountWorld } from "./helpers/fake-account-world.mjs";

/**
 * Regression tests for MEDIUM-1: PATCH /api/admin/students/[id] must protect
 * admins identified by the Firestore profile role OR Firebase Auth custom
 * claims, and must fail closed when the Auth lookup fails.
 * In-memory fakes only: no credentials, no network, no emulator.
 */
function makeWorld({ profile, authRecord }) {
  const fw = makeFakeAccountWorld({ users: { u1: { profile, auth: authRecord instanceof Error ? undefined : structuredClone(authRecord) } } });
  const lookups = [];
  const auth = {
    ...fw.auth,
    getUser: async (uid) => {
      lookups.push(uid);
      if (authRecord instanceof Error) throw authRecord;
      return fw.auth.getUser(uid);
    },
  };
  return {
    ...fw, auth, lookups, profile,
    // Profile and Auth writes only (lease bookkeeping excluded).
    get mutations() {
      return fw.mutations.filter((m) => !m.op.startsWith("accountStatusLeases")).map((m) => (m.op === "users.update" ? { op: "profile.update", fields: m.fields } : m));
    },
  };
}

/** The real PATCH core (route.js delegates to it after adminGuard + validation). */
async function patchFlow(world, target) {
  const res = await manageStudentAccountStatus({
    db: world.db, auth: world.auth, uid: "u1", target, actorUid: "admin-actor", logger: world.logger,
    transitionOptions: { sleep: async () => {}, retryDelaysMs: [] },
  });
  return { status: res.status, body: res.body };
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
    ["empty profile data", {}],
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

  test("route delegates to manageStudentAccountStatus after adminGuard and validation", () => {
    const iGuard = patch.indexOf("adminGuard(request)");
    const iStatus = patch.indexOf("Status must be active or inactive.");
    const iCore = patch.indexOf("manageStudentAccountStatus(");
    assert.ok(iGuard > -1 && iStatus > iGuard && iCore > iStatus);
    assert.match(patch, /db: guard\.adminDb/);
    assert.match(patch, /Response\.json\(payload, \{ status: httpStatus \}\)/);
  });

  test("route has no direct status write or legacy profile-role-only check", () => {
    assert.doesNotMatch(patch, /role === "admin"/);
    assert.doesNotMatch(patch, /transitionAccountStatus\(/);
    assert.doesNotMatch(patch, /\.update\(/);
  });

  test("missing profile is 404 with no Auth lookup or write", async () => {
    const w = makeWorld({ profile: null, authRecord: { customClaims: {} } });
    const res = await patchFlow(w, "inactive");
    assert.equal(res.status, 404);
    assert.deepEqual(w.lookups, []);
    assert.deepEqual(w.mutations, []);
    assert.equal(w.lease("u1"), null, "lease released");
  });
});
