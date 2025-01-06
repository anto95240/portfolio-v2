'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import projectsData from '../../data/projet.json'; // Chemin vers votre fichier JSON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export default function ProjectCV() {
  const pathname = usePathname()
  const projects = projectsData.homePage.projects;
  
  
  // Gère l'affichage au clic (pour mobile/tablette)
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const toggleInfo = (projectId: string) => {
    setActiveProject(activeProject === projectId ? null : projectId)
  };

  const headerText = pathname === '/cv' ? 'PROJETS' : 'Mes projets';
  const headerStyle =
    pathname === '/cv'
      ? 'text-3xl mb-10 text-center'
      : 'mb-5 text-center';

  return (      
    <div className="w-8/12 flex flex-col">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />
      <h1 className={`${headerStyle}`}>{headerText}</h1>
    <div className="grid grid-cols-1 gap-5 max-w-3xl mx-auto md:grid-cols-2 text-center">
      {projects.map((project) => {
        // Récupérer l'image principale (type: "main")
        const mainImage = project.images.find((image) => image.type === 'main')?.url;

        // Nombre de technologies
        const techCount = project.technologies.length;

        return (
          <div
            key={project.id}
            className="relative z-10 group bg-blue-projet rounded-lg shadow-md overflow-hidden"
          >
            {/* Image principale */}
            <div className='relative z-10'
              onClick={() => toggleInfo(project.id)} // Gérer l'affichage au clic (mobile/tablette)
            >
              <img
                src={mainImage} // Affichage de l'image principale
                alt={project.title}
                className="w-full h-56 object-cover rounded-lg lg:group-hover:opacity-0 transition-opacity duration-300"
              />
              {/* Informations affichées au survol ou au clic */}
              <div
                className={`absolute inset-0 bg-blue-projet pt-1 gap-4 bg-opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300 ${
                  activeProject === project.id ? 'opacity-100 visible' : 'opacity-0 invisible'
                } lg:group-hover:opacity-100 lg:group-hover:visible`}
                onClick={(e) => e.stopPropagation()}
              >
                <h1 className="text-lg font-title mb-2">{project.title}</h1>
                <p className="text-sm font-text mb-3 h-10">{project.description}</p>
                <div className={`grid grid-cols-${techCount} gap-2`}>
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
                  className="mt-4 bg-green-projet w-full h-10 shadow-[0_-4px_4px_0_rgba(0,0,0,0.25)] flex justify-center items-center gap-2 text-black font-title hover:bg-green-600 transition"
                  // onClick={() => window.open(project.links[0]?.url, '_blank')}
                >
                  Plus de détail
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare}  className="text-l" />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bouton VOIR PLUS en bas et au centre de la grille */}
      <div className="col-span-full mt-6 flex justify-center items-center">
        <button className="bg-gradient-to-r from-light-blue via-light-green to-light-blue text-black md:text-lg py-1 px-10 text-base rounded-2xl shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] transition-transform transform hover:scale-105">
          TOUS VOIR
        </button>
      </div>
    </div>
    </div>
  );
}
