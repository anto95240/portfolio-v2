import { getProjectById, getProjetsFull } from "@/lib/data";
import ProjectDetailClient from "./ProjectDetailClient";

export default async function ProjectDetail(props: { params: Promise<{ category: string; id: string }> }) {
  const params = await props.params;
  const project = getProjectById(params.category, params.id);
  const allProjects = getProjetsFull(); // Nécessaire pour ProjectChoice

  if (!project) {
    return <div className="text-center mt-20 text-xl font-bold">Projet non trouvé</div>;
  }

  return <ProjectDetailClient project={project} category={params.category} allProjects={allProjects} />;
}