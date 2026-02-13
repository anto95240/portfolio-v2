// lib/data.ts
import projetsJson from "@/data/projet.json";
import skillsJson from "@/data/cv_skill.json";
import experienceJson from "@/data/cv_experience.json";
import formationJson from "@/data/cv_formation.json";

// On importe les types globaux pour éviter les conflits
import { Project, Experience, Formation, Tool, ProjectsData, SkillsData } from "@/types";

// Cast des données
const projetsData = projetsJson as any;
const skillsData = skillsJson as any;
const experienceData = experienceJson as any;
const formationData = formationJson as any;

// --- ACCUEIL ---
export const getProjetsHome = (): ProjectsData => projetsData.homePage;

export const getHomeTools = (): Tool[] => {
  // Sécurité si homepage n'existe pas dans le JSON
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