import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { register } from "node:module";

// Load the real route handlers and guards with a synthetic Admin SDK boundary.
// This keeps transient Firestore failures deterministic without credentials.
const adminModule = "test:firebase-admin";
const mockAdminSource = `
  export const state = {};
  export function getAdminAuth() {
    return { verifySessionCookie: async (cookie, checkRevoked) => {
      state.verifications.push({ cookie, checkRevoked });
      if (state.verifyError) throw state.verifyError;
      return state.token;
    } };
  }
  export function getAdminDb() {
    return { collection: () => ({ doc: () => ({ get: async () => {
      state.profileReads += 1;
      if (state.lookupError) throw state.lookupError;
      return { exists: state.profile !== null, data: () => state.profile };
    } }) }) };
  }
`;
// Module.register is also available on the Node 20 runtime used in CI.
// Each test file has its own process, so these hooks cannot affect other suites.
const loaderSource = `
  import { existsSync } from "node:fs";
  import { fileURLToPath } from "node:url";
  export function resolve(specifier, context, nextResolve) {
    if (specifier === "@/app/lib/firebase-admin" || specifier === ${JSON.stringify(adminModule)}) {
      return { url: ${JSON.stringify(adminModule)}, shortCircuit: true };
    }
    if (specifier === "next/server") return nextResolve("next/server.js", context);
    if (specifier.startsWith("@/")) {
      const url = new URL(specifier.slice(2), ${JSON.stringify(new URL("../src/", import.meta.url).href)});
      if (!existsSync(fileURLToPath(url))) url.pathname += ".js";
      return nextResolve(url.href, context);
    }
    return nextResolve(specifier, context);
  }
  export function load(url, context, nextLoad) {
    if (url !== ${JSON.stringify(adminModule)}) return nextLoad(url, context);
    return { format: "module", shortCircuit: true, source: ${JSON.stringify(mockAdminSource)} };
  }
`;
register(`data:text/javascript,${encodeURIComponent(loaderSource)}`, import.meta.url);

const { state } = await import(adminModule);
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
    cookies: { get: () => cookie ? { value: cookie } : undefined },
    json: async () => { throw new Error("Request body must not be read when authorization fails"); },
  };
}

beforeEach(() => {
  Object.assign(state, {
    token: { uid: "student", email_verified: true },
    profile: { status: "active", disabled: false },
    lookupError: null,
    verifyError: null,
    profileReads: 0,
    verifications: [],
  });
});

function assertUnavailable(response) {
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("set-cookie"), null, "outages must preserve the session cookie");
}

test("session GET preserves a valid cookie when the profile lookup is unavailable", async () => {
  state.lookupError = new Error("Firestore unavailable");
  const response = await GET(request());
  assertUnavailable(response);
  assert.equal((await response.json()).authenticated, undefined);
  assert.equal(state.profileReads, 1);
  assert.deepEqual(state.verifications, [{ cookie: "valid-session", checkRevoked: true }]);
});

test("session GET authenticates an active profile", async () => {
  const response = await GET(request());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).authenticated, true);
  assert.equal(response.headers.get("set-cookie"), null);
});

test("session GET still rejects inactive and missing profiles and clears their cookies", async () => {
  for (const profile of [{ status: "inactive", disabled: true }, null, {}]) {
    state.profile = profile;
    const response = await GET(request());
    assert.equal(response.status, 401);
    assert.equal((await response.json()).authenticated, false);
    assert.match(response.headers.get("set-cookie"), /session=;/);
  }
});

test("session GET rejects a revoked cookie without querying the profile", async () => {
  state.verifyError = new Error("revoked");
  const response = await GET(request());
  assert.equal(response.status, 401);
  assert.match(response.headers.get("set-cookie"), /session=;/);
  assert.equal(state.profileReads, 0);
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

test("admin APIs retain their existing missing-cookie and non-admin responses", async () => {
  assert.equal((await adminGuard(request(""))).response.status, 401);
  assert.equal((await adminGuard(request())).response.status, 403);
});

for (const [name, POST] of routes) {
  test(`${name} preserves the cookie and returns unavailable on a profile lookup failure`, async () => {
    state.lookupError = new Error("Firestore unavailable");
    const response = await POST(request(), { params: Promise.resolve({ id: "attempt12345" }) });
    assertUnavailable(response);
    assert.equal((await response.json()).status, "unavailable");
  });
  test(`${name} still denies inactive profiles`, async () => {
    state.profile = { status: "inactive", disabled: true };
    assert.equal((await POST(request(), { params: Promise.resolve({ id: "attempt12345" }) })).status, 401);
  });
}
