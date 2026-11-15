/**
 * Minimal in-memory Firestore for student-bot tests: nested collections,
 * auto ids, get/set, where(==)/orderBy/limit queries and optimistic
 * transactions. No network, no credentials. `mutations` records every write.
 */
export function makeFakeBotDb(seed = {}) {
  const docs = new Map(); // "users/u1/botQuizAttempts/a1" -> { data, version }
  const mutations = [];
  let version = 0;
  let autoId = 0;
  for (const [path, data] of Object.entries(seed)) docs.set(path, { data: structuredClone(data), version: ++version });

  const snap = (path) => {
    const d = docs.get(path);
    return { id: path.split('/').pop(), exists: Boolean(d), data: () => (d ? structuredClone(d.data) : undefined), _path: path };
  };
  const docRef = (path) => ({
    id: path.split('/').pop(),
    path,
    collection: (name) => collRef(`${path}/${name}`),
    async get() { return snap(path); },
    async set(data) { docs.set(path, { data: structuredClone(data), version: ++version }); mutations.push({ op: 'set', path }); },
  });
  const collRef = (path, q = {}) => ({
    doc: (id) => docRef(`${path}/${id ?? `auto${String(++autoId).padStart(10, '0')}`}`),
    where: (field, op, value) => collRef(path, { ...q, where: [...(q.where || []), [field, op, value]] }),
    orderBy: (field, dir = 'asc') => collRef(path, { ...q, order: [field, dir] }),
    limit: (n) => collRef(path, { ...q, limit: n }),
    async get() {
      const prefix = `${path}/`;
      let rows = [...docs.entries()].filter(([p]) => p.startsWith(prefix) && !p.slice(prefix.length).includes('/')).map(([p, d]) => ({ p, data: d.data }));
      for (const [f, op, v] of q.where || []) {
        if (op !== '==') throw new Error('fake db supports == only');
        rows = rows.filter((r) => r.data[f] === v);
      }
      if (q.order) rows.sort((a, b) => (a.data[q.order[0]] - b.data[q.order[0]]) * (q.order[1] === 'desc' ? -1 : 1));
      if (q.limit) rows = rows.slice(0, q.limit);
      return { docs: rows.map((r) => snap(r.p)) };
    },
  });

  const db = {
    collection: (name) => collRef(name),
    async runTransaction(fn) {
      for (let attempt = 0; attempt < 5; attempt += 1) {
        const reads = new Map();
        const writes = [];
        const tx = {
          async get(ref) { reads.set(ref.path, docs.get(ref.path)?.version ?? null); return snap(ref.path); },
          set(ref, data) { writes.push([ref.path, data]); },
        };
        const result = await fn(tx);
        const stale = [...reads].some(([p, v]) => (docs.get(p)?.version ?? null) !== v);
        if (stale) continue;
        for (const [p, data] of writes) { docs.set(p, { data: structuredClone(data), version: ++version }); mutations.push({ op: 'tx.set', path: p }); }
        return result;
      }
      throw new Error('transaction contention');
    },
  };
  return { db, mutations, read: (path) => (docs.has(path) ? structuredClone(docs.get(path).data) : null), paths: () => [...docs.keys()] };
}
