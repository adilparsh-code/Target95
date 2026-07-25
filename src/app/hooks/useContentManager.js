"use client";

import { useCallback, useEffect, useState } from "react";
import { deleteContent, listContent, saveContent } from "../services/ContentService";

export default function useContentManager(entity) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try { setItems(await listContent(entity)); }
    catch (err) { setError(err.message || `Unable to load ${entity}.`); }
    finally { setLoading(false); }
  }, [entity]);

  useEffect(() => { refresh(); }, [refresh]);

  const save = useCallback(async (item) => {
    const saved = await saveContent(entity, item);
    setItems((current) => item.id ? current.map((entry) => entry.id === item.id ? { ...entry, ...saved } : entry) : [saved, ...current]);
    return saved;
  }, [entity]);

  const remove = useCallback(async (id) => {
    await deleteContent(entity, id);
    setItems((current) => current.filter((item) => item.id !== id));
  }, [entity]);

  return { items, loading, error, refresh, save, remove };
}
