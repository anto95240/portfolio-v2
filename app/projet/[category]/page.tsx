import { getProjectsByCategory } from "@/lib/data";
import ProjectCategoryClient from "@/components/projet/ProjectCategoryClient";

// Cette fonction permet de générer les pages statiques au build (optionnel mais recommandé)
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
  
  // Récupération directe des données (plus de fetch API)
  const projects = getProjectsByCategory(category);

  return <ProjectCategoryClient projects={projects} category={category} />;
}