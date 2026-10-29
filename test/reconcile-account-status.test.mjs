import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { isProtectedAdminAccount } from "../src/lib/accountStatus.mjs";
import { reconcileAccounts } from "../scripts/reconcile-account-status.mjs";

/**
 * In-memory Firestore `users` collection + Firebase Auth. No credentials and
 * no network. Every mutation is recorded in `mutations`.
 * users: { [uid]: { profile, auth?: { disabled, customClaims } | "missing" | Error } }
 */
function makeWorld(users) {
  const mutations = [];
  const docFor = (uid) => ({
    id: uid,
    exists: true,
    data: () => users[uid].profile,
    ref: { update: async (fields) => { mutations.push({ op: "profile.update", uid, fields }); } },
  });
  const db = {
    collection: (name) => {
      assert.equal(name, "users");
      return {
        get: async () => ({ docs: Object.keys(users).map(docFor) }),
        doc: (uid) => ({ get: async () => (users[uid] ? docFor(uid) : { id: uid, exists: false }) }),
      };
    },
  };
  const auth = {
    getUser: async (uid) => {
      const a = users[uid].auth;
      if (a instanceof Error) throw a;
      if (a === "missing") throw Object.assign(new Error("no user"), { code: "auth/user-not-found" });
      return { uid, disabled: a.disabled, customClaims: a.customClaims };
    },
    updateUser: async (uid, props) => { mutations.push({ op: "auth.updateUser", uid, props }); },
    revokeRefreshTokens: async (uid) => { mutations.push({ op: "auth.revoke", uid }); },
  };
  return { db, auth, mutations };
}

const lines = [];
const run = (world, opts = {}) => reconcileAccounts({ db: world.db, auth: world.auth, log: (l) => lines.push(l), now: () => "2026-10-29T00:00:00.000Z", ...opts });

const ACTIVE = { status: "active", disabled: false };
const INACTIVE = { status: "inactive", disabled: true };

describe("isProtectedAdminAccount", () => {
  test("profile role admin, admin claim, or admin role claim protects", () => {
    assert.equal(isProtectedAdminAccount({ role: "admin" }, null), true);
    assert.equal(isProtectedAdminAccount({ role: "student" }, { admin: true }), true);
    assert.equal(isProtectedAdminAccount({}, { admin: true }), true);
    assert.equal(isProtectedAdminAccount(null, { role: "admin" }), true);
  });
  test("non-admin profile and claims do not protect; truthy non-true admin claim is not admin", () => {
    assert.equal(isProtectedAdminAccount({ role: "student" }, null), false);
    assert.equal(isProtectedAdminAccount({ role: "student" }, { admin: false, role: "student" }), false);
    assert.equal(isProtectedAdminAccount({ role: "student" }, { admin: "true" }), false);
  });
});

describe("reconcileAccounts admin protection and fail-closed lookups", () => {
  test("1. profile.role === 'admin' protects the account even with --apply", async () => {
    const w = makeWorld({ a1: { profile: { ...INACTIVE, role: "admin" }, auth: { disabled: false, customClaims: {} } } });
    const r = await run(w, { apply: true });
    assert.equal(r.skippedAdmin, 1);
    assert.deepEqual(w.mutations, []);
  });

  test("2. customClaims.admin === true protects when profile role is missing or non-admin", async () => {
    const w = makeWorld({
      noRole: { profile: { ...INACTIVE }, auth: { disabled: false, customClaims: { admin: true } } },
      student: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: false, customClaims: { admin: true } } },
      activeNoAuth: { profile: { ...ACTIVE, role: "teacher" }, auth: { disabled: true, customClaims: { admin: true } } },
    });
    const r = await run(w, { apply: true });
    assert.equal(r.skippedAdmin, 3);
    assert.equal(r.repaired, 0);
    assert.deepEqual(w.mutations, []);
  });

  test("3. an Auth lookup failure skips the account (no mutation) and is counted", async () => {
    const w = makeWorld({
      broken: { profile: { ...INACTIVE, role: "student" }, auth: Object.assign(new Error("boom"), { code: "auth/internal-error" }) },
      unknown: { profile: { ...ACTIVE, role: "student" }, auth: new Error("network") },
    });
    const r = await run(w, { apply: true });
    assert.equal(r.lookupErrors, 2);
    assert.equal(r.repaired, 0);
    assert.deepEqual(w.mutations, []);
    assert.ok(lines.some((l) => l.includes("users/broken") && l.includes("auth lookup failed")));
  });

  test("4. ordinary non-admin accounts follow decideReconciliation under --apply", async () => {
    const w = makeWorld({
      inactiveEnabled: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: false, customClaims: { role: "student" } } },
      activeDisabled: { profile: { ...ACTIVE, role: "student" }, auth: { disabled: true } },
      gone: { profile: { ...ACTIVE, role: "student" }, auth: "missing" },
      fine: { profile: { ...ACTIVE, role: "student" }, auth: { disabled: false } },
    });
    const r = await run(w, { apply: true });
    assert.equal(r.repaired, 3);
    assert.equal(r.consistent, 1);
    assert.deepEqual(w.mutations.filter((m) => m.uid === "inactiveEnabled").map((m) => m.op), ["auth.updateUser", "auth.revoke", "profile.update"]);
    assert.deepEqual(w.mutations.find((m) => m.uid === "inactiveEnabled" && m.op === "auth.updateUser").props, { disabled: true });
    for (const uid of ["activeDisabled", "gone"]) {
      const ms = w.mutations.filter((m) => m.uid === uid);
      assert.equal(ms.length, 1);
      assert.equal(ms[0].fields.status, "inactive");
      assert.equal(ms[0].fields.disabled, true);
    }
    assert.equal(w.mutations.some((m) => m.uid === "fine"), false);
  });

  test("5. dry run (the default, and any non-true apply) performs no mutations", async () => {
    const users = {
      inactiveEnabled: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: false } },
      activeDisabled: { profile: { ...ACTIVE, role: "student" }, auth: { disabled: true } },
      stale: { profile: { ...INACTIVE, statusSync: { target: "inactive", auth: "pending" } }, auth: { disabled: true } },
    };
    for (const opts of [{}, { apply: false }, { apply: "yes" }, { apply: 1 }]) {
      const w = makeWorld(users);
      const r = await run(w, opts);
      assert.equal(r.mode, "dry-run");
      assert.equal(r.repaired, 0);
      assert.deepEqual(w.mutations, []);
    }
  });

  test("6. no path enables Auth or reactivates a profile", async () => {
    const authStates = [{ disabled: false }, { disabled: true }, { disabled: false, customClaims: { admin: true } }, "missing"];
    const profiles = [
      ACTIVE, INACTIVE, { status: "active", disabled: true }, { status: "pending" },
      { ...INACTIVE, statusSync: { target: "active", auth: "pending" } },
      { ...INACTIVE, statusSync: { target: "inactive", auth: "failed" } },
      { ...ACTIVE, statusSync: { target: "active", auth: "failed" } },
      { ...ACTIVE, statusSync: { target: "inactive", auth: "pending" } },
    ];
    const users = {};
    profiles.forEach((p, i) => authStates.forEach((a, j) => { users[`u${i}_${j}`] = { profile: { ...p, role: "student" }, auth: a }; }));
    const w = makeWorld(users);
    await run(w, { apply: true });
    for (const m of w.mutations) {
      if (m.op === "auth.updateUser") assert.deepEqual(m.props, { disabled: true }, `enabled Auth for ${m.uid}`);
      if (m.op === "profile.update") {
        assert.notEqual(m.fields.status, "active", `activated ${m.uid}`);
        if ("disabled" in m.fields) assert.equal(m.fields.disabled, true);
        if (m.fields.statusSync) assert.notEqual(m.fields.statusSync.target === "active" && "status" in m.fields, true);
      }
    }
  });

  test("--uid targets one account and ignores a missing profile", async () => {
    const w = makeWorld({ one: { profile: { ...INACTIVE, role: "student" }, auth: { disabled: false } }, two: { profile: { ...INACTIVE }, auth: { disabled: false } } });
    const r = await run(w, { uid: "one" });
    assert.equal(r.scanned, 1);
    const none = await run(w, { uid: "nope" });
    assert.equal(none.scanned, 0);
  });
});
