// lib/data.ts
import projetsJson from "@/app/data/projet.json";
import skillsJson from "@/app/data/cv_skill.json";
import experienceJson from "@/app/data/cv_experience.json";
import formationJson from "@/app/data/cv_formation.json";

// Cast pour éviter les erreurs de typage strict sur le JSON importé
const projetsData = projetsJson as any;
const skillsData = skillsJson as any;
const experienceData = experienceJson as any;
const formationData = formationJson as any;

export const getProjetsHome = () => projetsData.homePage;
export const getProjetsFull = () => projetsData.projectPage;

export const getSkills = () => skillsData.cvpage.skills;
export const getExperiences = () => experienceData.cvpage.experience;
export const getFormations = () => formationData.cvpage.formation;

// Helper pour récupérer les projets d'une catégorie spécifique
export const getProjectsByCategory = (category: string) => {
  return projetsData.projectPage[category]?.projects || [];
};