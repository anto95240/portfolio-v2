import { z } from "zod";

// --- Skills & Tools ---
export const ToolSchema = z.object({
  id: z.union([z.string(), z.number()]),
  images: z.string(),
  title: z.string(),
  usage: z.string().optional(),
});

export const SkillItemSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  images: z.string(),
  usage: z.string(),
  categories: z.array(z.string()).optional(),
});

export const SkillsDataSchema = z.object({
  frontend: z.array(SkillItemSchema),
  backend: z.array(SkillItemSchema),
  database: z.array(SkillItemSchema),
  outils: z.array(SkillItemSchema),
  autres_langages: z.array(SkillItemSchema),
});

export const SkillsJsonStructureSchema = z.object({
  homepage: z.object({ skills: z.array(ToolSchema) }),
  cvpage: z.object({ skills: SkillsDataSchema }),
});

// --- Experience ---
export const ExperienceSchema = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  lieux: z.string(),
  domaine: z.string(),
  realisation: z.string(),
});

export const ExperienceJsonStructureSchema = z.object({
  cvpage: z.object({ experience: z.array(ExperienceSchema) }),
});

// --- Formation ---
export const FormationSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  lieux: z.union([z.string(), z.array(z.string())]),
  specialite: z.union([z.string(), z.array(z.string())]),
});

export const FormationJsonStructureSchema = z.object({
  cvpage: z.object({ formation: z.array(FormationSchema) }),
});

// --- Projects ---
export const LinkTypeSchema = z.object({
  type: z.string(),
  url: z.string(),
});

export const ProjectImageSchema = z.object({
  type: z.enum(["main", "gallery", "logo"]),
  url: z.string(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  date: z.string(),
  equipe: z.array(z.string()),
  links: z.array(z.union([LinkTypeSchema, z.string()])),
  images: z.array(ProjectImageSchema),
  uniqueId: z.string().optional(),
  categorySlug: z.string().optional(),
});

export const ProjectsDataSchema = z.record(
  z.string(),
  z.object({ projects: z.array(ProjectSchema) })
);

export const ProjetsJsonStructureSchema = z.object({
  homePage: ProjectsDataSchema,
  projectPage: ProjectsDataSchema,
});
