import { getProjectById } from "@/lib/data";
import ProjectDetailClient from "./ProjectDetailClient.jsx";

export default async function ProjectDetail(props: { params: Promise<{ category: string; id: string }> }) {
  const params = await props.params;
  const project = getProjectById(params.category, params.id);

  if (!project) {
    return <div className="text-center mt-20">Projet non trouvé</div>;
  }

  return <ProjectDetailClient project={project} category={params.category} />;
}