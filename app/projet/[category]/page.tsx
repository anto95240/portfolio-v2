import { getProjectsByCategory } from "@/lib/data";
import ProjectCategoryClient from "./ProjectCategoryClient"; 
import { CATEGORY_SLUGS } from "@/lib/constants";

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({
    category: slug,
  }));
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const category = params.category;
  
  const projects = getProjectsByCategory(category);

  return <ProjectCategoryClient projects={projects} category={category} />;
}