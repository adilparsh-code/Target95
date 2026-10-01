"use client";

import { useCallback, useEffect, useState } from "react";
import { getStudyProgressState, saveStudyProgressState, STUDY_PROGRESS_STORAGE_KEY } from "../../lib/studyCenter";
import { sanitizeStudyStatus } from "../../lib/mocktest";
import { useAuth } from "@/context/AuthContext";

export default function useStudyProgress() {
  const { user } = useAuth();
  const userId = user?.uid || null;
  const [progress, setProgress] = useState(() => getStudyProgressState(userId));
  useEffect(() => setProgress(getStudyProgressState(userId)), [userId]);

  const updateProgress = useCallback((slug, status) => {
    const safeSlug = String(slug ?? "").trim().toLowerCase();
    const safeStatus = sanitizeStudyStatus(status);

    setProgress((previousProgress) => {
      const nextProgress = {
        ...previousProgress,
        [safeSlug]: safeStatus,
      };

      saveStudyProgressState(nextProgress, userId);
      return nextProgress;
    });
  }, [userId]);

  return { progress, updateProgress, storageKey: STUDY_PROGRESS_STORAGE_KEY };
}
