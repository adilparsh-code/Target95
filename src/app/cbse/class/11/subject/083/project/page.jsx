import { getProjectGroup } from "@/app/data/projects";
import ProjectIndex from "@/components/projects/ProjectIndex";

export const metadata = {
  title: "CBSE Computer Science 083 Class XI Projects | Target95",
  description: "Complete CBSE Class XI Computer Science (083) project packages with runnable Python code, validation, tests and viva preparation.",
};

export default function CBSECS11ProjectIndexPage() {
  return <ProjectIndex group={getProjectGroup("cbse-11-083")} />;
}
