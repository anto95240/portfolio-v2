// types/index.ts

export interface Tool {
  id: number;
  images: string;
  title: string;
}

export interface SkillItem {
  id: string;
  title: string;
  images: string;
  usage: string;
}

export interface SkillsData {
  frontend: SkillItem[];
  backend: SkillItem[];
  database: SkillItem[];
  outils: SkillItem[];
  autres_langages: SkillItem[];
}

export interface Experience {
  id: string;
  date: string;
  title: string;
  lieux: string;
  domaine: string;
  realisation: string;
}

export interface Formation {
  id: string;
  title: string;
  date: string;
  lieux: string | string[];
  specialite: string | string[];
}

export interface LinkType {
  type: string;
  url: string;
}

export interface ProjectImage {
  type: "main" | "gallery" | "logo";
  url: string;
}

export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  technologies: string[];
  date: string;
  equipe: string[];
  links: (LinkType | string)[]; 
  images: ProjectImage[];
  uniqueId?: string;
  categorySlug?: string;
}

export interface ProjectsData {
  [key: string]: { projects: Project[] };
}