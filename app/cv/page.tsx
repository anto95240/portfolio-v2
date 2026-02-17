import { getExperiences, getFormations, getSkills, getProjetsHome } from "@/lib/data";
import CvClient from "@/components/cv/CvClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon CV | Antoine Richard",
  description: "Parcours, compétences et formations.",
};

export default function CvPage() {
  const skills = getSkills();
  const experiences = getExperiences();
  const formations = getFormations();
  const projects = getProjetsHome();

  return <CvClient skills={skills} experiences={experiences} formations={formations} projects={projects} />;
}