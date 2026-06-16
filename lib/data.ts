// lib/data.ts
import experienceJson from "@/data/cv_experience.json";
import formationJson from "@/data/cv_formation.json";
import skillsJson from "@/data/cv_skill.json";
import projetsJson from "@/data/projet.json";
import { Experience, Formation, Project, ProjectsData, SkillsData, Tool } from "@/types";

import {
  ExperienceJsonStructureSchema,
  FormationJsonStructureSchema,
  ProjetsJsonStructureSchema,
  SkillsJsonStructureSchema,
} from "./schemas";

// Validation Zod des données
const projetsData = ProjetsJsonStructureSchema.parse(projetsJson);
const skillsData = SkillsJsonStructureSchema.parse(skillsJson);
const experienceData = ExperienceJsonStructureSchema.parse(experienceJson);
const formationData = FormationJsonStructureSchema.parse(formationJson);

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
