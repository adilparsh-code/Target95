"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAuthenticatedResumeProgress } from "@/lib/progress/homeResume.mjs";
import { progressStorage } from "@/lib/progress/storage";

const EMPTY_STATE = { userId: null, progress: null };

export function useHomeResumeProgress() {
  const { user, loading: authLoading } = useAuth();
  const [state, setState] = useState(EMPTY_STATE);

  useEffect(() => {
    if (authLoading || !user?.uid) {
      setState(EMPTY_STATE);
      return;
    }

    const progress = getAuthenticatedResumeProgress(progressStorage, user.uid);
    setState({ userId: user.uid, progress });
  }, [authLoading, user?.uid]);

  const belongsToCurrentUser = Boolean(
    user?.uid && state.userId === user.uid && state.progress?.userId === user.uid,
  );

  return {
    progress: belongsToCurrentUser ? state.progress : null,
    loading: authLoading || Boolean(user?.uid && state.userId !== user.uid),
  };
}
