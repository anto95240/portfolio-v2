import { getProjectById, getProjetsFull } from "@/lib/data";
import ProjectDetailClient from "./ProjectDetailClient";

export const revalidate = 3600; // 1 heure

export function generateStaticParams() {
  const allProjects = getProjetsFull();
  const params: { category: string; id: string }[] = [];
  
  for (const category in allProjects) {
    const projects = allProjects[category].projects || [];
    for (const project of projects) {
      params.push({ category, id: project.id });
    }
  }
  
  return params;
}

export default async function ProjectDetail(props: { params: Promise<{ category: string; id: string }> }) {
  const params = await props.params;
  const project = getProjectById(params.category, params.id);
  const allProjects = getProjetsFull(); 
  
  if (!project) {
    return <div className="text-center mt-20 text-xl font-bold">Projet non trouvé</div>;
  }

  return <ProjectDetailClient project={project} category={params.category} allProjects={allProjects} />;
}