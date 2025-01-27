"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};

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

type ProjectsData = {
  [key: string]: { projects: Project[] };
};

export default function ProjectCV() {
  const router = useRouter();
  const pathname = usePathname();
  const [projetStyle, setProjetStyle] = useState("mb-5 text-center");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const isClient = useIsClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/projets');
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des projets");
        }
        const data = await response.json();
  
        if (data.homePage) {
          setProjectsData(data.homePage);
          setIsDataLoaded(true);
          setLoading(false);
        } else {
          setError("Aucune donnée disponible.");
          setLoading(false);
        }
      } catch (error) {
        setError("Erreur lors de la récupération des projets");
        setLoading(false);
        console.error("Erreur API:", error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/projet/cv")) {
      setProjetStyle("text-2xl mb-10 text-center");
    } else {
      setProjetStyle("mb-5 text-center");
    }
  }, [pathname]);

  const categories = useMemo(() => {
    const cats = projectsData ? Object.keys(projectsData) : [];
    return cats;
  }, [projectsData]);

  const allProjects = useMemo(() => {
    if (projectsData) {
      const projects = categories.flatMap((category) =>
        projectsData[category]?.projects.map((project) => ({
          ...project,
          uniqueId: `${category}-${project.id}`,
        })) || []
      );
      return projects;
    }
    return [];
  }, [categories, projectsData]);

  const toggleInfo = useCallback((uniqueId: string) => {
    setActiveProject((prevId) => (prevId === uniqueId ? null : uniqueId));
  }, []);

  const handleProjectClick = useCallback((projectId: string, category: string) => {
    router.push(`/projet/${category}/${projectId}`);
  }, [router]);

  const ProjetText = categories.includes(pathname.split('/')[2]) ? pathname.split('/')[2].toUpperCase() : "Mes projets";

  useEffect(() => {   
    if (!isDataLoaded) return;

    gsap.registerPlugin(ScrollTrigger);
  
    gsap.utils.toArray<HTMLElement>(".fade-down").forEach((elem) => {
      gsap.fromTo(
        elem,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 90%",
            end: "top 10%",
            scrub: true,
          },
        }
      );
    });
  }, [isDataLoaded, categories, projectsData]);

  if (!isClient) {
    return null;
  }
  
  if (loading) {
    return <p>Chargement des projets...</p>;
  }
  
  if (error) {
    return <p>{error}</p>;
  }
  
  if (!projectsData || categories.length === 0) {
    return <p>Aucune catégorie disponible ou données corrompues.</p>;
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
              <div className="relative z-10" onClick={() => toggleInfo(project.uniqueId as string)}>
                <Image
                  src={mainImage}
                  alt={`Image de ${project.title}`}
                  width={250}
                  height={250}
                  className="w-full h-56 object-cover rounded-lg lg:group-hover:opacity-0 transition-opacity duration-300"
                />
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

                  <button
                    className="mt-4 bg-green-projet w-full h-10 shadow-[0_-4px_4px_0_rgba(0,0,0,0.25)] flex justify-center items-center gap-2 text-black font-title hover:bg-green-600 transition-transform transform active:scale-95"
                    onClick={() => handleProjectClick(project.id, project.category)}
                  >
                    Plus de détail
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-l" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
