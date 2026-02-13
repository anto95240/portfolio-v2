import { getProjectsByCategory } from "@/lib/data";
// Correction de l'import : on importe depuis le dossier courant
import ProjectCategoryClient from "./ProjectCategoryClient"; 

export function generateStaticParams() {
  return [
    { category: 'web' },
    { category: 'jeux' },
    { category: 'ydays' },
  ];
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const category = params.category;
  
  const projects = getProjectsByCategory(category);

  return <ProjectCategoryClient projects={projects} category={category} />;
}