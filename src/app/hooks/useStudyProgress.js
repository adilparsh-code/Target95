"use client";

import { useCallback, useEffect, useState } from "react";
import { getStudyProgressState, saveStudyProgressState, STUDY_PROGRESS_STORAGE_KEY } from "../../lib/studyCenter";
import { sanitizeStudyStatus } from "../../lib/mocktest";

export default function useStudyProgress() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    setProgress(getStudyProgressState());
  }, []);

  const updateProgress = useCallback((slug, status) => {
    const safeSlug = String(slug ?? "").trim().toLowerCase();
    const safeStatus = sanitizeStudyStatus(status);

    setProgress((previousProgress) => {
      const nextProgress = {
        ...previousProgress,
        [safeSlug]: safeStatus,
      };

      saveStudyProgressState(nextProgress);
      return nextProgress;
    });
  }, []);

  return { progress, updateProgress, storageKey: STUDY_PROGRESS_STORAGE_KEY };
}
