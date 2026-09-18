import { getProjectGroup } from "@/app/data/projects";
import ProjectIndex from "@/components/projects/ProjectIndex";

export const metadata = {
  title: "CBSE AI 843 Class XII Projects | Target95",
  description: "Complete CBSE Class XII Artificial Intelligence (843) project packages, each genuinely usable by a student for the 2026-27 session.",
};

export default function CBSEAI12ProjectIndexPage() {
  return <ProjectIndex group={getProjectGroup("cbse-12-843")} />;
}
