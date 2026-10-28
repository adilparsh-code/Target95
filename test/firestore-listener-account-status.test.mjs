/**
 * Firestore EMULATOR integration test: what happens to an open real-time
 * listener (onSnapshot) when the listening user's profile is deactivated.
 *
 * Uses the Firebase Web SDK against the emulator with mockUserToken, the same
 * listener API the app uses in src/app/hooks/useFirestore.js. This is emulator
 * evidence only; production listener behaviour still needs a live check.
 *
 *   npm run test:rules
 *
 * Skipped automatically when FIRESTORE_EMULATOR_HOST is not set.
 */
import { test, describe, after } from "node:test";
import assert from "node:assert/strict";

const HOST = process.env.FIRESTORE_EMULATOR_HOST;
const PROJECT = process.env.GCLOUD_PROJECT || "demo-target95";
const BASE = HOST ? `http://${HOST}/v1/projects/${PROJECT}/databases/(default)/documents` : "";
const skip = !HOST && "FIRESTORE_EMULATOR_HOST not set (run via npm run test:rules)";

function enc(v) {
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") return { integerValue: String(v) };
  return { stringValue: String(v) };
}
async function ownerSet(path, data) {
  const res = await fetch(`${BASE}/${path}`, {
    method: "PATCH",
    headers: { Authorization: "Bearer owner", "Content-Type": "application/json" },
    body: JSON.stringify({ fields: Object.fromEntries(Object.entries(data).map(([k, v]) => [k, enc(v)])) }),
  });
  assert.equal(res.status, 200, `owner write ${path} failed: ${res.status}`);
}

const apps = [];
async function listenerFor(uid, path) {
  const { initializeApp } = await import("firebase/app");
  const { getFirestore, connectFirestoreEmulator, doc, onSnapshot } = await import("firebase/firestore");
  const app = initializeApp({ projectId: PROJECT, apiKey: "demo-key" }, `listener-${uid}-${Date.now()}`);
  apps.push(app);
  const db = getFirestore(app);
  const [host, port] = HOST.split(":");
  connectFirestoreEmulator(db, host, Number(port), {
    mockUserToken: { sub: uid, user_id: uid, email: `${uid}@example.com`, email_verified: true },
  });
  const events = [];
  let wake = () => {};
  const unsubscribe = onSnapshot(
    doc(db, path),
    (snap) => { events.push({ type: "data", value: snap.data()?.value ?? null, fromCache: snap.metadata.fromCache }); wake(); },
    (error) => { events.push({ type: "error", code: error.code }); wake(); }
  );
  const waitFor = (predicate, ms = 8000) => new Promise((resolve) => {
    const check = () => { if (predicate(events)) { clearTimeout(timer); resolve(true); } };
    const timer = setTimeout(() => resolve(false), ms);
    wake = check;
    check();
  });
  return { events, waitFor, unsubscribe };
}

describe("onSnapshot listener after account deactivation (emulator)", { skip }, () => {
  after(async () => {
    const { deleteApp } = await import("firebase/app");
    await Promise.all(apps.map((a) => deleteApp(a).catch(() => {})));
  });

  test("profile set inactive: the listener stops receiving data", async () => {
    const uid = "listen-deact";
    await ownerSet(`users/${uid}`, { uid, role: "student", status: "active", disabled: false });
    await ownerSet(`users/${uid}/practiceSessions/s1`, { value: 1 });

    const l = await listenerFor(uid, `users/${uid}/practiceSessions/s1`);
    assert.ok(await l.waitFor((e) => e.some((x) => x.type === "data" && x.value === 1 && !x.fromCache)), "initial snapshot not received");

    await ownerSet(`users/${uid}`, { uid, role: "student", status: "inactive", disabled: true });
    await ownerSet(`users/${uid}/practiceSessions/s1`, { value: 2 });

    // Either the listener is cancelled with permission-denied, or at minimum
    // the post-deactivation value is never delivered.
    await l.waitFor((e) => e.some((x) => x.type === "error" || x.value === 2), 8000);
    const gotNewData = l.events.some((x) => x.type === "data" && x.value === 2);
    const errors = l.events.filter((x) => x.type === "error").map((x) => x.code);
    console.log(`[emulator] deactivated listener events: ${JSON.stringify(l.events)}`);
    assert.equal(gotNewData, false, "deactivated user's listener received data written after deactivation");
    if (errors.length) assert.deepEqual([...new Set(errors)], ["permission-denied"]);
    l.unsubscribe();
  });

  test("RESIDUAL: profile still active (failed profile write): the listener keeps receiving data", async () => {
    const uid = "listen-partial";
    await ownerSet(`users/${uid}`, { uid, role: "student", status: "active", disabled: false });
    await ownerSet(`users/${uid}/practiceSessions/s1`, { value: 1 });
    const l = await listenerFor(uid, `users/${uid}/practiceSessions/s1`);
    assert.ok(await l.waitFor((e) => e.some((x) => x.type === "data" && x.value === 1 && !x.fromCache)));
    // Auth disable is invisible to Firestore; only the token's expiry ends this.
    await ownerSet(`users/${uid}/practiceSessions/s1`, { value: 2 });
    assert.ok(await l.waitFor((e) => e.some((x) => x.type === "data" && x.value === 2)), "listener with active profile should still receive updates");
    l.unsubscribe();
  });
});
