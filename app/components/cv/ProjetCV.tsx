"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  uniqueId?: string;
};

export default function ProjectCV() {
  const router = useRouter();
  const pathname = usePathname();
  const [projetStyle, setProjetStyle] = useState("mb-5 text-center");
  const [projectsData, setProjectsData] = useState<{ homePage: Record<string, { projects: Project[] }> } | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Assurez-vous que le code s'exécute uniquement côté client
  useEffect(() => {
    setIsClient(true); // Code client uniquement
  }, []);


  useEffect(() => {
    setIsClient(true); // Assure-toi que le code ne tourne que côté client
    if (pathname.startsWith("/projet/cv")) {
      setProjetStyle("text-2xl mb-10 text-center");
    } else {
      setProjetStyle("mb-5 text-center");
    }
  }, [pathname]);

  // Chargement des projets depuis l'API
  useEffect(() => {
    if (isClient) { // Ne charger les données qu'une fois côté client
      fetch("/api/projets")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur de chargement des projets");
          }
          return response.json();
        })
        .then((data) => {
          setProjectsData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Une erreur est survenue lors du chargement des projets.");
          setLoading(false);
        });
    }
  }, [isClient]);

  // Vérifiez si projectsData est null avant de l'utiliser
  const categories = useMemo(() => {
    if (!projectsData) return [];
    return Object.keys(projectsData.homePage ?? {});
  }, [projectsData]);

  const allProjects = useMemo(() => {
    if (!projectsData) return [];
    return categories.flatMap((category) =>
      projectsData?.homePage?.[category]?.projects.map((project) => ({
        ...project,
        uniqueId: `${category}-${project.id}`,
      })) || []
    );
  }, [categories, projectsData]);

  const toggleInfo = useCallback((uniqueId: string) => {
    setActiveProject((prevId) => (prevId === uniqueId ? null : uniqueId));
  }, []);

  const handleProjectClick = useCallback((projectId: string, category: string) => {
    router.push(`/projet/${category}/${projectId}`);
  }, [router]);

  const ProjetText = "Mes projets";
  // const ProjetStyle = pathname.startsWith("/projet/cv") ? "text-2xl mb-10 text-center" : "mb-5 text-center";

  // Animation des projets au scroll uniquement côté client
  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      gsap.utils.toArray<HTMLElement>('.fade-down').forEach((elem) => {
        gsap.fromTo(
          elem,
          { y: 80, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 2, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 90%",
              end: "top 20%",
              scrub: true,
            },
          }
        );
      });
    }
  }, [isClient, projectsData]);

  // Si les données ne sont pas encore chargées, afficher le message de chargement
  if (!isClient || loading) {
    return <p>Chargement des projets...</p>;
  }

  if (!projectsData) {
    return <p>Le projet n&#39a pas été trouvé.</p>
  }

  return (
    <div className="w-full md:w-10/12 lg:w-8/12 flex flex-col mx-auto">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />
      <h1 className={projetStyle}>{ProjetText}</h1>
      <div className="grid grid-cols-1 gap-5 max-w-3xl mx-auto md:grid-cols-2 text-center">
        {allProjects.map((project, index) => {
          const mainImage = project.images.find((image) => image.type === "main")?.url || "/default-image.jpg";
          const techCount = project.technologies.length;

          return (
            <div
              key={`${project.uniqueId}-${index}`}
              className="relative fade-down z-10 group bg-blue-projet rounded-lg shadow-[5px_5px_5px_0_rgba(0,0,0,0.25)] overflow-hidden"
            >
              {/* Image principale */}
              <div className="relative z-10" onClick={() => toggleInfo(project.uniqueId as string)}>
                <Image
                  src={mainImage}
                  alt={`Image de ${project.title}`}
                  width={250}
                  height={250}
                  className="w-full h-56 object-cover rounded-lg lg:group-hover:opacity-0 transition-opacity duration-300"
                />
                {/* Informations affichées */}
                <div
                  className={`absolute inset-0 bg-blue-projet pt-1 gap-4 bg-opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-300 ${activeProject === project.uniqueId ? "opacity-100 visible" : "opacity-0 invisible"} lg:group-hover:opacity-100 lg:group-hover:visible`}
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
