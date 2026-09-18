import { getProjectGroup } from "@/app/data/projects";
import ProjectIndex from "@/components/projects/ProjectIndex";

export const metadata = {
  title: "CBSE Computer Science 083 Class XII Projects | Target95",
  description: "Complete CBSE Class XII Computer Science (083) project packages with SQL schema, sample data, joins, aggregates, Python integration and analytics.",
};

export default function CBSECS12ProjectIndexPage() {
  return <ProjectIndex group={getProjectGroup("cbse-12-083")} />;
}
