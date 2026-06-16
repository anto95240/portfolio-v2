import { Metadata } from "next";

import CvClient from "@/app/cv/CvClient";
import { getExperiences, getFormations, getProjetsHome, getSkills } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mon CV | Antoine Richard",
  description: "Parcours, compétences et formations.",
};

export default function CvPage() {
  const skills = getSkills();
  const experiences = getExperiences();
  const formations = getFormations();
  const projects = getProjetsHome();

  return (
    <CvClient
      skills={skills}
      experiences={experiences}
      formations={formations}
      projects={projects}
    />
  );
}
