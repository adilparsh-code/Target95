import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { register } from "node:module";

// Load the real route handlers and guards with a synthetic Admin SDK boundary.
// This keeps transient Firestore failures deterministic without credentials.
// The hooks are process-local, so no other suite is affected.
register(new URL("./support/alias-loader.mjs", import.meta.url), import.meta.url);

const { state, resetState } = await import("./support/fake-firebase-admin.mjs");

const { GET } = await import("../src/app/api/auth/session/route.js");
const { getVerifiedSession, requireAdmin, requireRole } = await import("../src/app/lib/server-auth.js");
const { adminGuard } = await import("../src/app/api/admin/_helpers.js");
const routes = [
  ["mock attempt creation", (await import("../src/app/api/mock-tests/attempts/route.js")).POST],
  ["mock attempt submission", (await import("../src/app/api/mock-tests/attempts/[id]/submit/route.js")).POST],
  ["AI Tutor", (await import("../src/app/api/ai-tutor/route.js")).POST],
];

function request(cookie = "valid-session") {
  return {
    cookies: { get: () => (cookie ? { value: cookie } : undefined) },
    json: async () => {
      throw new Error("Request body must not be read when authorization fails");
    },
  };
}

beforeEach(() => {
  resetState();
});

function assertUnavailable(response) {
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("set-cookie"), null, "outages must preserve the session cookie");
}

test("session GET preserves a valid cookie when the profile lookup is unavailable", async () => {
  state.lookupError = new Error("Firestore unavailable");
  const response = await GET(request());
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("set-cookie"), null);
  const jsonBody = await response.json();
  assert.equal(jsonBody?.authenticated, undefined);
  assert.equal(state.profileReads, 1);
  assert.deepEqual(state.verifications, [{ cookie: "valid-session", checkRevoked: true }]);
});

test("session GET authenticates an active profile", async () => {
  const response = await GET(request());
  assert.equal(response.status, 200);
  const jsonBody = await response.json();
  assert.equal(jsonBody?.authenticated, true);
  assert.equal(response.headers.get("set-cookie"), null);
});

test("session GET still rejects inactive and missing profiles and clears their cookies", async () => {
  for (const profile of [{ status: "inactive", disabled: true }, null, {}]) {
    state.profile = profile;
    const response = await GET(request());
    assert.equal(response.status, 401);
    const jsonBody = await response.json();
    assert.equal(jsonBody?.authenticated, false);
    assert.match(String(response.headers.get("set-cookie")), /session=;/);
  }
});

test("session GET rejects a revoked cookie without querying the profile", async () => {
  state.verifyError = Object.assign(new Error("revoked"), { code: "auth/session-cookie-revoked" });
  const response = await GET(request());
  assert.equal(response.status, 401);
  assert.match(response.headers.get("set-cookie"), /session=;/);
  assert.equal(state.profileReads, 0);
});

test("session GET returns unavailable and preserves the cookie on Auth infrastructure errors", async () => {
  for (const code of ["auth/internal-error", "auth/invalid-credential", "auth/network-request-failed", undefined]) {
    state.verifyError = Object.assign(new Error("Auth unavailable"), { code });
    const response = await GET(request());
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("set-cookie"), null);
    const jsonBody = await response.json();
    assert.equal(jsonBody?.authenticated, undefined);
    assert.equal(state.profileReads, 0);
  }
});

test("session GET rejects missing cookies without querying Auth or Firestore", async () => {
  assert.equal((await GET(request(""))).status, 401);
  assert.equal(state.profileReads, 0);
  assert.equal(state.verifications.length, 0);
});

test("session and role guards propagate lookup failures rather than denying authentication", async () => {
  state.lookupError = new Error("Firestore unavailable");
  for (const guard of [getVerifiedSession, requireAdmin, requireRole]) {
    await assert.rejects(guard(request()), state.lookupError);
  }
});

test("admin APIs report session lookup outages as unavailable", async () => {
  state.token.admin = true;
  state.lookupError = new Error("Firestore unavailable");
  const guard = await adminGuard(request());
  assert.equal(guard.ok, false);
  assertUnavailable(guard.response);
});

test("admin APIs preserve the session and return unavailable on Auth infrastructure failure", async () => {
  state.verifyError = Object.assign(new Error("Auth unavailable"), { code: "auth/internal-error" });
  const guard = await adminGuard(request());
  assert.equal(guard.ok, false);
  assertUnavailable(guard.response);
});

test("admin APIs retain their existing missing-cookie and non-admin responses", async () => {
  const missingCookieGuard = await adminGuard(request(""));
  assert.equal(missingCookieGuard.ok, false);
  assert.equal(missingCookieGuard.response.status, 401);
  const nonAdminGuard = await adminGuard(request());
  assert.equal(nonAdminGuard.ok, false);
  assert.equal(nonAdminGuard.response.status, 403);
});

for (const [name, POST] of routes) {
  test(`${name} preserves the cookie and returns unavailable on a profile lookup failure`, async () => {
    state.lookupError = new Error("Firestore unavailable");
    const response = await POST(request(), { params: Promise.resolve({ id: "attempt12345" }) });
    assertUnavailable(response);
    assert.equal((await response.json()).status, "unavailable");
  });
  test(`${name} returns unavailable on Auth infrastructure failure`, async () => {
    state.verifyError = Object.assign(new Error("Auth unavailable"), { code: "auth/internal-error" });
    assertUnavailable(await POST(request(), { params: Promise.resolve({ id: "attempt12345" }) }));
  });
  test(`${name} still denies inactive profiles`, async () => {
    state.profile = { status: "inactive", disabled: true };
    assert.equal((await POST(request(), { params: Promise.resolve({ id: "attempt12345" }) })).status, 401);
  });
}
