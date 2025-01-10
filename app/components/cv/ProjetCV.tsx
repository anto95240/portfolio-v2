'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import projectsData from '../../data/projet.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  date: string;
  equipe: string[];
  links: { type: string; url: string }[];
  images: { type: string; url: string }[];
};

export default function ProjectCV() {
  const router = useRouter();
  
  // Définition des catégories
  const categories: Array<keyof typeof projectsData.homePage> = ['jeux', 'web', 'ydays'];
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Récupérer les projets de toutes les catégories
    const allProjects = categories.reduce<Project[]>((acc, category) => {
      return acc.concat(projectsData.homePage[category]?.projects || []);
    }, []);
    setProjects(allProjects);
  }, []);

  // Gérer l'affichage des informations au clic
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const toggleInfo = (projectId: string) => {
    setActiveProject(activeProject === projectId ? null : projectId);
  };

  const handleProjectClick = (projectId: string, category: keyof typeof projectsData.homePage) => {
    // Redirige vers la page du projet avec l'ID et la catégorie
    router.push(`/projet/${category}/${projectId}`);
  };

  return (
    <div className="w-8/12 flex flex-col mx-auto">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />
      <h1 className="text-2xl mb-10 text-center">Mes projets</h1>
      <div className="grid grid-cols-1 gap-5 max-w-3xl mx-auto md:grid-cols-2 text-center">
        {projects.map((project, index) => {
          // Récupérer l'image principale (type: "main")
          const mainImage = project.images.find((image: any) => image.type === 'main')?.url;

          // Nombre de technologies
          const techCount = project.technologies.length;

          return (
            <div
            key={`${project.id}-${index}`}
              className="relative z-10 group bg-blue-projet rounded-lg shadow-md overflow-hidden"
            >
              {/* Image principale */}
              <div className="relative z-10" onClick={() => toggleInfo(project.id)}>
                <img
                  src={mainImage} // Affichage de l'image principale
                  alt={project.title}
                  className="w-full h-56 object-cover rounded-lg lg:group-hover:opacity-0 transition-opacity duration-300"
                />
                {/* Informations affichées au survol ou au clic */}
                <div
                  className={`absolute inset-0 bg-blue-projet pt-1 gap-4 bg-opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300 ${activeProject === project.id ? 'opacity-100 visible' : 'opacity-0 invisible'} lg:group-hover:opacity-100 lg:group-hover:visible`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h1 className="text-lg font-title mb-2">{project.title}</h1>
                  <p className="text-sm font-text mb-3 h-10">{project.description}</p>
                  <div className={`grid grid-cols-${techCount} gap-2`}>
                    {project.technologies.map((tech: string, index: number) => (
                      <div
                        key={index}
                        className="bg-white text-black rounded-sm shadow-[4px_4px_10px_0_rgba(0,0,0,0.35)] text-sm flex justify-center items-center font-title p-1"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>

                  {/* Bouton pour voir plus de détails */}
                  <button
                    className="mt-4 bg-green-projet w-full h-10 shadow-[0_-4px_4px_0_rgba(0,0,0,0.25)] flex justify-center items-center gap-2 text-black font-title hover:bg-green-600 transition"
                    onClick={() => handleProjectClick(project.id, 'jeux')} // Ajustez ici avec la bonne catégorie
                  >
                    Plus de détail
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-l" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {/* Bouton VOIR PLUS */}
        <div className="col-span-full mt-6 flex justify-center items-center">
          <Link href="/projet" className="bg-gradient-to-r from-light-blue via-light-green to-light-blue text-black md:text-lg py-1 px-10 text-base rounded-2xl shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] transition-transform transform hover:scale-105">
            TOUS VOIR
          </Link>
        </div>
      </div>
    </div>
  );
}
