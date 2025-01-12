'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import projectsData from '../../data/projet.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Types des données des projets
type Project = {
  id: string;
  category: string;
  title: string;
  description: string;
  technologies: string[];
  date: string;
  equipe: string[];
  links: { type: string; url: string }[];
  images: { type: string; url: string }[];
  uniqueId?: string; // Ajout de la propriété `uniqueId`
};

export default function ProjectCV() {
  const router = useRouter();

  // Récupérer dynamiquement les catégories depuis le JSON
  const categories = useMemo(() => Object.keys(projectsData.homePage) as Array<keyof typeof projectsData.homePage>, []);

  // Construire la liste de tous les projets
  const allProjects = useMemo(() => {
    return categories.reduce<Project[]>((acc, category) => {
      const categoryProjects = projectsData.homePage[category]?.projects || [];
      return acc.concat(
        categoryProjects.map((project) => ({
          ...project,
          uniqueId: `${category}-${project.id}`, // Ajout d'un identifiant unique
        }))
      );
    }, []);
  }, [categories]);

  const [activeProject, setActiveProject] = useState<string | null>(null);

  const toggleInfo = useCallback((uniqueId: string) => {
    setActiveProject((prevId) => (prevId === uniqueId ? null : uniqueId));
  }, []);

  const handleProjectClick = useCallback(
    (projectId: string, category: keyof typeof projectsData.homePage) => {
      router.push(`/projet/${category}/${projectId}`);
    },
    [router]
  );

  if (allProjects.length === 0) {
    return <p className="text-center">Chargement des projets...</p>;
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
  
      // Sélectionne tous les éléments avec la classe 'fade-down' et applique l'animation
      gsap.utils.toArray<HTMLElement>('.fade-down').forEach((elem) => {
        gsap.fromTo(
          elem,
          { y: 80, opacity: 0 }, // Position initiale
          {
            y: 0, // Position finale
            opacity: 1,
            duration: 2,
            ease: 'power3.out',
            // stagger: 0.1,
            scrollTrigger: {
              trigger: elem, // Chaque élément déclenche son animation
              start: 'top 90%',
              end: 'top 20%',
              scrub: true,
            },
          }
        );
      });
    }
  }, []);   

  return (
    <div className="w-8/12 flex flex-col mx-auto">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />
      <h1 className="text-2xl mb-10 text-center">Mes projets</h1>
      <div className="grid grid-cols-1 gap-5 max-w-3xl mx-auto md:grid-cols-2 text-center">
        {allProjects.map((project, index) => {
          const mainImage = project.images.find((image) => image.type === 'main')?.url || '/default-image.jpg';
          const techCount = project.technologies.length;

          return (
            <div
              key={`${project.uniqueId}-${index}`}
              className="relative fade-down z-10 group bg-blue-projet rounded-lg shadow-[5px_5px_5px_0_rgba(0,0,0,0.25)] overflow-hidden"
            >
              {/* Image principale */}
              <div className="relative z-10" onClick={() => toggleInfo(project.uniqueId as string)}>
                <img
                  src={mainImage}
                  alt={`Image de ${project.title}`}
                  className="w-full h-56 object-cover rounded-lg lg:group-hover:opacity-0 transition-opacity duration-300"
                />
                {/* Informations affichées */}
                <div
                  className={`absolute inset-0 bg-blue-projet pt-1 gap-4 bg-opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300 ${
                    activeProject === project.uniqueId ? 'opacity-100 visible' : 'opacity-0 invisible'
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

                  {/* Bouton pour voir plus de détails */}
                  <button
                    className="mt-4 bg-green-projet w-full h-10 shadow-[0_-4px_4px_0_rgba(0,0,0,0.25)] flex justify-center items-center gap-2 text-black font-title hover:bg-green-600 transition-transform transform active:scale-95"
                    onClick={() => handleProjectClick(project.id, project.category as keyof typeof projectsData.homePage)}
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
          <Link
            href="/projet"
            className="bg-gradient-to-r from-light-blue via-light-green to-light-blue text-black md:text-lg py-1 px-10 text-base rounded-2xl shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] transition-transform transform active:scale-90"
          >
            TOUS VOIR
          </Link>
        </div>
      </div>
    </div>
  );
}
