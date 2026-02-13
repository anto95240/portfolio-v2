"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Types recréés localement pour correspondre à votre fichier
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

export default function ProjectCV({ data }: { data: ProjectsData }) {
  const router = useRouter();
  const pathname = usePathname();
  const [projetStyle, setProjetStyle] = useState("mb-5 text-center");
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Plus de fetch ici, on utilise la prop 'data' directement
  
  useEffect(() => {
    if (pathname.startsWith("/projet/cv")) {
      setProjetStyle("text-2xl mb-10 text-center");
    } else {
      setProjetStyle("mb-5 text-center");
    }
  }, [pathname]);

  const categories = useMemo(() => {
    // On utilise 'data' passée en props
    return data ? Object.keys(data) : [];
  }, [data]);

  const allProjects = useMemo(() => {
    if (data) {
      const projects = categories.flatMap((category) =>
        data[category]?.projects.map((project) => ({
          ...project,
          uniqueId: `${category}-${project.id}`,
        })) || []
      );
      return projects;
    }
    return [];
  }, [categories, data]);

  const toggleInfo = useCallback((uniqueId: string) => {
    setActiveProject((prevId) => (prevId === uniqueId ? null : uniqueId));
  }, []);

  const handleProjectClick = useCallback((projectId: string, category: string) => {
    router.push(`/projet/${category}/${projectId}`);
  }, [router]);

  // Logique du titre conservée
  const pathSegment = pathname.split('/')[2];
  const ProjetText = pathSegment && categories.includes(pathSegment) ? pathSegment.toUpperCase() : "Mes projets";

  useEffect(() => {   
    if (!data) return;

    gsap.registerPlugin(ScrollTrigger);
    
    // Utilisation de gsap.context pour éviter les bugs de re-render
    const ctx = gsap.context(() => {
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
    });
    return () => ctx.revert();
  }, [data, categories]);

  if (!data) return null;

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