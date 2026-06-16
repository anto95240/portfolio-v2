import { MetadataRoute } from "next";

import { getProjetsFull } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.antoine-richard.fr";
  const allProjects = getProjetsFull();
  const projectEntries: MetadataRoute.Sitemap = [];

  for (const category in allProjects) {
    const projects = allProjects[category].projects || [];
    for (const project of projects) {
      projectEntries.push({
        url: `${baseUrl}/projet/${category}/${project.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cv`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projet`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectEntries,
  ];
}
