import { getProjectGroup } from "@/app/data/projects";
import ProjectIndex from "@/components/projects/ProjectIndex";

export const metadata = {
  title: "ISC AI 883 Class XI Projects | Target95",
  description: "Complete ISC Class XI Artificial Intelligence (883) project packages with runnable Python code, sample output, tests and viva preparation.",
};

export default function ISCAI11ProjectIndexPage() {
  return <ProjectIndex group={getProjectGroup("isc-ai-11")} />;
}
