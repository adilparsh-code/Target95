// Minimal in-memory Firestore double: just what mocktestService uses
// (collection/doc/get/set/update, auto ids, runTransaction with get/create/update).
export function createFakeDb() {
  const store = new Map();
  let counter = 0;
  const snapshot = (path) => ({
    exists: store.has(path),
    id: path.split("/").pop(),
    data: () => (store.has(path) ? structuredClone(store.get(path)) : undefined),
  });
  const docRef = (path) => ({
    path,
    id: path.split("/").pop(),
    collection: (name) => collectionRef(`${path}/${name}`),
    get: async () => snapshot(path),
    set: async (data) => { store.set(path, structuredClone(data)); },
    update: async (data) => { store.set(path, { ...store.get(path), ...structuredClone(data) }); },
  });
  const collectionRef = (path) => ({
    doc: (id) => docRef(`${path}/${id ?? `auto${String(++counter).padStart(12, "0")}${"x".repeat(4)}`}`),
  });
  return {
    store,
    collection: (name) => collectionRef(name),
    async runTransaction(fn) {
      const writes = [];
      const tx = {
        get: async (ref) => snapshot(ref.path),
        create: (ref, data) => {
          if (store.has(ref.path) || writes.some((w) => w.path === ref.path)) throw new Error("ALREADY_EXISTS");
          writes.push({ op: "set", path: ref.path, data });
        },
        update: (ref, data) => writes.push({ op: "update", path: ref.path, data }),
      };
      const out = await fn(tx);
      for (const w of writes) {
        if (w.op === "set") store.set(w.path, structuredClone(w.data));
        else store.set(w.path, { ...store.get(w.path), ...structuredClone(w.data) });
      }
      return out;
    },
  };
}
export const fakeServerTimestamp = () => ({ __serverTimestamp: true });
