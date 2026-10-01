'use client';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { progressStorage } from '@/lib/progress/storage';
import { officeChapterKey } from '@/data/office';

export default function useOfficeProgress() {
  const { user, loading } = useAuth();
  const userId = user?.uid || 'office-guest';
  const [snapshot, setSnapshot] = useState({ userId: null, chapters: {} });
  const refresh = useCallback(() => {
    // Reload the established persistence layer to include cross-tab changes.
    progressStorage.data = progressStorage._read();
    setSnapshot({ userId, chapters: Object.fromEntries(progressStorage.getAllChapterProgress(userId).filter((p) => p.chapterId.startsWith('office-')).map((p) => [p.chapterId, p])) });
  }, [userId]);
  useEffect(() => { if (!loading) refresh(); window.addEventListener('storage', refresh); window.addEventListener('office-progress', refresh); return () => { window.removeEventListener('storage', refresh); window.removeEventListener('office-progress', refresh); }; }, [refresh, loading]);
  const chapters = snapshot.userId === userId ? snapshot.chapters : {};
  const update = (appId, chapterId, changes) => {
    if (loading) return;
    const key = officeChapterKey(appId, chapterId);
    progressStorage.data = progressStorage._read();
    progressStorage.updateChapterProgress(userId, key, (current) => ({ ...current, ...changes, lastVisited: new Date().toISOString() }));
    window.dispatchEvent(new Event('office-progress'));
  };
  return { userId, chapters, update, ready: !loading && snapshot.userId === userId, isGuest: !user };
}
