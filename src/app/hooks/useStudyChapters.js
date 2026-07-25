import { useMemo } from "react";
import { getStudyChapters } from "../../lib/studyCenter";

export default function useStudyChapters() {
  const chapters = useMemo(() => getStudyChapters(), []);
  return chapters;
}