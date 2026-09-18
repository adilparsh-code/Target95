import { getProjectGroup } from "@/app/data/projects";
import ProjectIndex from "@/components/projects/ProjectIndex";

export const metadata = {
  title: "CBSE AI 843 Class XI Projects | Target95",
  description: "Complete CBSE Class XI Artificial Intelligence (843) project packages — runnable code for coding projects and complete student packages for research and design projects.",
};

export default function CBSEAI11ProjectIndexPage() {
  return <ProjectIndex group={getProjectGroup("cbse-11-843")} />;
}
