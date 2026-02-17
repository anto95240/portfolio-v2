// lib/data.ts
import projetsJson from "@/data/projet.json";
import skillsJson from "@/data/cv_skill.json";
import experienceJson from "@/data/cv_experience.json";
import formationJson from "@/data/cv_formation.json";

import { Project, Experience, Formation, Tool, ProjectsData, SkillsData } from "@/types";

// Définition des structures JSON pour éviter le 'any'
interface ProjetsJsonStructure {
  homePage: ProjectsData;
  projectPage: ProjectsData;
}

interface SkillsJsonStructure {
  homepage: { skills: Tool[] };
  cvpage: { skills: SkillsData };
}

interface ExperienceJsonStructure {
  cvpage: { experience: Experience[] };
}

interface FormationJsonStructure {
  cvpage: { formation: Formation[] };
}

// Cast propre des données
const projetsData = projetsJson as unknown as ProjetsJsonStructure;
const skillsData = skillsJson as unknown as SkillsJsonStructure;
const experienceData = experienceJson as unknown as ExperienceJsonStructure;
const formationData = formationJson as unknown as FormationJsonStructure;

// --- ACCUEIL ---
export const getProjetsHome = (): ProjectsData => projetsData.homePage;

export const getHomeTools = (): Tool[] => {
  return skillsData.homepage?.skills || [];
};

// --- CV ---
export const getSkills = (): SkillsData => skillsData.cvpage.skills;
export const getExperiences = (): Experience[] => experienceData.cvpage.experience;
export const getFormations = (): Formation[] => formationData.cvpage.formation;

// --- PROJETS ---
export const getProjetsFull = (): ProjectsData => projetsData.projectPage;

export const getProjectsByCategory = (category: string): Project[] => {
  return projetsData.projectPage[category]?.projects || [];
};

export const getProjectById = (category: string, id: string): Project | undefined => {
  const categoryData = projetsData.projectPage[category];
  return categoryData?.projects.find((p: Project) => p.id === id);
};