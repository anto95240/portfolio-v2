'use client';

import { useState } from 'react';
import projectsData from '../data/projet.json'; // Chemin vers votre fichier JSON

export default function Home() {
  const projects = projectsData.homePage.projects;

  // Gère l'affichage au clic (pour mobile/tablette)
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const toggleInfo = (projectId: string) => {
    if (activeProject === projectId) {
      setActiveProject(null); // Réinitialiser si on clique à nouveau
    } else {
      setActiveProject(projectId);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 w-10/12 max-w-3xl mx-auto md:grid-cols-2 text-center">
      {projects.map((project) => {
        // Récupérer l'image principale (type: "main")
        const mainImage = project.images.find((image) => image.type === 'main')?.url;

        return (
          <div
            key={project.id}
            className="relative group bg-blue-projet rounded-lg shadow-md overflow-hidden"
          >
            {/* Image principale */}
            <div
              className="relative cursor-pointer"
              onClick={() => toggleInfo(project.id)} // Gérer l'affichage au clic (mobile/tablette)
            >
              <img
                src={mainImage} // Affichage de l'image principale
                alt={project.title}
                className="w-full h-56 object-cover rounded-lg group-hover:opacity-0 transition-opacity duration-300"
              />
              {/* Informations affichées au survol ou au clic */}
              <div
                className={`absolute inset-0 bg-blue-projet pt-1 gap-4 bg-opacity-75 flex flex-col items-center justify-center text-white transition-opacity duration-300 ${
                  activeProject === project.id ? 'opacity-100' : 'opacity-0'
                } group-hover:opacity-100 md:group-hover:opacity-100`}
              >
                <h1 className="text-lg font-title mb-2">{project.title}</h1>
                <p className="text-sm font-text mb-3 h-10">{project.description}</p>
                <div className="grid grid-cols-3 gap-2">
                  {project.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="bg-white text-black rounded-sm shadow-[4px_4px_10px_0_rgba(0,0,0,0.35)] text-sm flex justify-center items-center font-title p-1"
                    >
                      {tech}
                    </div>
                  ))}
                </div>

                {/* Bouton */}
                <button
                  className="mt-4 bg-green-projet w-full h-10 shadow-[0_-4px_4px_0_rgba(0,0,0,0.25)] rounded-md text-white font-title hover:bg-green-600 transition"
                  onClick={() => window.open(project.links[0]?.url, '_blank')}
                >
                  Plus de détail
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
