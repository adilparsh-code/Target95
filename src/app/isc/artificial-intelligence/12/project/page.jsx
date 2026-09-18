import { getProjectGroup } from "@/app/data/projects";
import ProjectIndex from "@/components/projects/ProjectIndex";

export const metadata = {
  title: "ISC AI 883 Class XII Projects | Target95",
  description: "Complete ISC Class XII Artificial Intelligence (883) project packages with runnable Python implementations, setup instructions and meaningful sample output.",
};

export default function ISCAI12ProjectIndexPage() {
  return <ProjectIndex group={getProjectGroup("isc-ai-12")} />;
}
