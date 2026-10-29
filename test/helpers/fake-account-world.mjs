/**
 * In-memory Firestore (users + accountStatusLeases) and Firebase Auth for
 * account-status tests. No credentials, no network, no emulator.
 *
 * - Every document has an integer updateTime that bumps on each write;
 *   update(fields, { lastUpdateTime }) enforces it like the Admin SDK
 *   (FAILED_PRECONDITION, code 9).
 * - runTransaction is optimistic: reads record versions, writes are buffered
 *   and committed only if no read document changed meanwhile (else retried).
 * - Auth calls can be paused at a named gate so tests interleave two writers
 *   deterministically, and can be made to fail a number of times.
 * - Every mutation is appended to `mutations` in commit order.
 */
export function deferred() {
  let resolve;
  const promise = new Promise((r) => { resolve = r; });
  return { promise, resolve };
}

export function makeFakeAccountWorld({ users = {}, leases = {} } = {}) {
  const mutations = [];
  const store = { users: new Map(), [/* lease collection */ "accountStatusLeases"]: new Map() };
  let clock = 1000;
  for (const [uid, u] of Object.entries(users)) {
    if (u.profile !== undefined && u.profile !== null) store.users.set(uid, { data: structuredClone(u.profile), updateTime: ++clock });
  }
  for (const [uid, l] of Object.entries(leases)) store.accountStatusLeases.set(uid, { data: { ...l }, updateTime: ++clock });

  const authState = new Map();
  for (const [uid, u] of Object.entries(users)) authState.set(uid, u.auth === undefined ? { disabled: false, customClaims: {} } : u.auth);

  const failures = { getUser: 0, updateUser: 0, revoke: 0, profileUpdate: 0, transaction: 0 };
  const gates = {}; // e.g. gates["updateUser:false"] = { reached: deferred(), release: deferred() }
  const boom = (op) => Object.assign(new Error(`${op} unavailable`), { code: "unavailable" });

  const passGate = async (name) => {
    const g = gates[name];
    if (!g) return;
    delete gates[name];
    g.reached.resolve();
    await g.release.promise;
  };

  const docRef = (collection, id) => {
    const ref = {
      id,
      _collection: collection,
      async get() {
        const doc = store[collection].get(id);
        return snapshot(ref, doc);
      },
      async update(fields, precondition) {
        if (collection === "users") await passGate("profileUpdate");
        if (collection === "users" && failures.profileUpdate > 0) { failures.profileUpdate -= 1; throw boom("firestore.update"); }
        const doc = store[collection].get(id);
        if (!doc) throw Object.assign(new Error("not found"), { code: 5 });
        if (precondition && precondition.lastUpdateTime !== undefined && precondition.lastUpdateTime !== doc.updateTime) {
          throw Object.assign(new Error("precondition failed"), { code: 9 });
        }
        doc.data = { ...doc.data, ...structuredClone(fields) };
        doc.updateTime = ++clock;
        mutations.push({ op: `${collection}.update`, uid: id, fields, precondition: precondition ?? null });
      },
    };
    return ref;
  };
  const snapshot = (ref, doc) => ({
    id: ref.id,
    ref,
    exists: Boolean(doc),
    updateTime: doc ? doc.updateTime : undefined,
    data: () => (doc ? structuredClone(doc.data) : undefined),
  });

  const db = {
    collection(name) {
      if (!store[name]) throw new Error(`unexpected collection ${name}`);
      return {
        doc: (id) => docRef(name, id),
        get: async () => ({ docs: [...store[name].entries()].map(([id, doc]) => snapshot(docRef(name, id), doc)) }),
      };
    },
    async runTransaction(fn) {
      if (failures.transaction > 0) { failures.transaction -= 1; throw boom("firestore.transaction"); }
      for (let attempt = 0; attempt < 5; attempt += 1) {
        const reads = new Map();
        const writes = [];
        const tx = {
          async get(ref) {
            const doc = store[ref._collection].get(ref.id);
            reads.set(`${ref._collection}/${ref.id}`, doc ? doc.updateTime : null);
            return snapshot(ref, doc);
          },
          set(ref, data) { writes.push({ kind: "set", ref, data: structuredClone(data) }); },
          delete(ref) { writes.push({ kind: "delete", ref }); },
        };
        const result = await fn(tx);
        const stale = [...reads.entries()].some(([key, version]) => {
          const [c, id] = key.split("/");
          const doc = store[c].get(id);
          return (doc ? doc.updateTime : null) !== version;
        });
        if (stale) continue;
        for (const w of writes) {
          if (w.kind === "set") store[w.ref._collection].set(w.ref.id, { data: w.data, updateTime: ++clock });
          else store[w.ref._collection].delete(w.ref.id);
          mutations.push({ op: `${w.ref._collection}.${w.kind}`, uid: w.ref.id, fields: w.data ?? null });
        }
        return result;
      }
      throw Object.assign(new Error("transaction contention"), { code: 10 });
    },
  };

  const auth = {
    async getUser(uid) {
      if (failures.getUser > 0) { failures.getUser -= 1; throw Object.assign(new Error("lookup down"), { code: "auth/internal-error" }); }
      const a = authState.get(uid);
      if (a instanceof Error) throw a;
      if (a === "missing" || a === undefined) throw Object.assign(new Error("no user"), { code: "auth/user-not-found" });
      return { uid, disabled: Boolean(a.disabled), customClaims: a.customClaims };
    },
    async updateUser(uid, props) {
      await passGate(`updateUser:${props.disabled}`);
      if (failures.updateUser > 0) { failures.updateUser -= 1; throw boom("auth.updateUser"); }
      const a = authState.get(uid);
      if (a && typeof a === "object" && !(a instanceof Error)) a.disabled = props.disabled;
      mutations.push({ op: "auth.updateUser", uid, props });
    },
    async revokeRefreshTokens(uid) {
      await passGate("revoke");
      if (failures.revoke > 0) { failures.revoke -= 1; throw boom("auth.revoke"); }
      const a = authState.get(uid);
      if (a && typeof a === "object" && !(a instanceof Error)) a.tokensRevokedAt = ++clock;
      mutations.push({ op: "auth.revoke", uid });
    },
  };

  const logs = [];
  const logger = {
    error: (...a) => logs.push(["error", ...a]),
    warn: (...a) => logs.push(["warn", ...a]),
    info: (...a) => logs.push(["info", ...a]),
  };

  /** Pause the next matching Auth call until release() is called. */
  const pauseAt = (name) => {
    const g = { reached: deferred(), release: deferred() };
    gates[name] = g;
    return { reached: g.reached.promise, release: () => g.release.resolve() };
  };

  return {
    db, auth, mutations, logs, logger, failures, pauseAt,
    profile: (uid) => (store.users.get(uid) ? structuredClone(store.users.get(uid).data) : null),
    profileUpdateTime: (uid) => store.users.get(uid)?.updateTime,
    authOf: (uid) => authState.get(uid),
    lease: (uid) => (store.accountStatusLeases.get(uid) ? { ...store.accountStatusLeases.get(uid).data } : null),
    // Simulates an out-of-band profile write (e.g. another process).
    touchProfile: (uid, fields) => {
      const doc = store.users.get(uid);
      doc.data = { ...doc.data, ...fields };
      doc.updateTime = ++clock;
    },
  };
}
