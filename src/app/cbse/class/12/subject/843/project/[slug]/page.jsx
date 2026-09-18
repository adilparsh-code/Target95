import { notFound } from "next/navigation";
import { getProject, getProjectGroup } from "@/app/data/projects";
import ProjectView from "@/components/projects/ProjectView";

const KEY = "cbse-12-843";

export function generateStaticParams() {
  const group = getProjectGroup(KEY);
  return (group?.projects || []).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(KEY, slug);
  if (!project) return {};
  return {
    title: `${project.title} | CBSE AI 843 Class XII Project | Target95`,
    description: project.shortOutcome || project.summary,
  };
}

export default async function CBSEAI12ProjectPage({ params }) {
  const { slug } = await params;
  const group = getProjectGroup(KEY);
  const project = getProject(KEY, slug);
  if (!project) notFound();

  return <ProjectView project={project} backHref={group.basePath} backLabel="All CBSE XII AI projects" />;
}
