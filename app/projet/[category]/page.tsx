'use client';

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Nav from "../../components/Navbar";
import Footer from "../../components/Footer";
import Popup from "../../components/projet/Popup";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type LinkType = { type: string; url: string } | string;
type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  date: string;
  equipe: string[];
  links: LinkType[];
  images: { type: string; url: string }[];
};

type CategoryStyles = {
  jeux: { bg: string; text: string };
  ydays: { bg: string; text: string };
  web: { bg: string; text: string };
};

type ProjectsData = {
  jeux: { projects: Project[] };
  ydays: { projects: Project[] };
  web: { projects: Project[] };
};

// Hook personnalisé pour gérer l'état 'isClient'
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export default function ProjetCategory() {
  const pathname = usePathname();
  const category = pathname?.split("/")[2] as keyof CategoryStyles;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const isClient = useIsClient();

  const categories = ["jeux", "ydays", "web"];
  const isValidCategory = categories.includes(String(category));

  const categoryStyles: CategoryStyles = {
    ydays: { bg: "bg-gradient-to-r from-light-green to-green-blue", text: "text-black" },
    web: { bg: "bg-gradient-to-r from-green-blue to-blue-darkBlue", text: "text-black" },
    jeux: { bg: "bg-gradient-to-r from-blue-darkBlue to-dark-blue", text: "text-white" },
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true); // Active le loading avant l'appel API
  
      try {
        const response = await fetch("/api/projets");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des projets");
        }
        const data = await response.json();
        setProjectsData(data.projectPage || {});
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setLoading(false); // Arrêt du loading dans tous les cas
      }
    };
  
    fetchProjects();
  }, []);

  const projects = useMemo(() => projectsData?.[category]?.projects || [], [projectsData, category]);

  const handleShowPopup = (project: Project) => {
    setSelectedProject(project);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      setShowScrollToTopButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isClient]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    projects.forEach((_: Project, index: number) => {
      const direction = index % 2 === 0 ? "fade-left" : "fade-right";
      const fromX = direction === "fade-left" ? -40 : 40;

      gsap.fromTo(
        `.project-${index} .${direction}`,
        { x: fromX, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: `.project-${index}`,
            start: "top 60%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    });
  }, [projects]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isValidCategory) {
    return <div>Catégorie invalide.</div>;
  }

  if (loading) {
    return <p>Chargement des projets...</p>;
  }
  
  return (
    <div className={`flex h-full ${categoryStyles[category]?.bg}`}>
      <div className="w-1/4 fixed z-50 h-full">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      <div className={`flex-1 flex flex-col items-center mt-10 mx-auto px-5 lg:pl-56 ${categoryStyles[category]?.text} w-full lg:w-3/4 lg:max-w-9xl`}>
        <h1 className="text-3xl mb-20">{category}</h1>

        <div className={`absolute right-3/4 lg:left-1/4 ${isMenuOpen ? "z-10" : "z-50"}`}>
          <button aria-label="Revenir au thème">
            <Link href="/projet">
              <FontAwesomeIcon icon={faArrowLeftLong} className="mr-2 mt-5 text-4xl" />
            </Link>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-8 w-full">
            {projects.length > 0 ? (
              projects.map((project: Project, index: number) => (
                <div
                  key={project.id}
                  className={`project-${index} flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center text-center mx-auto w-10/12 gap-x-12`}
                >
                  <div className={`${index % 2 === 0 ? "fade-left" : "fade-right"}`}>
                    <Image
                      src={project.images.find((img) => img.type === "main")?.url || "/default-image.jpg"}
                      alt={`${project.title} Image`}
                      width={500}
                      height={345}
                      priority
                      className="rounded-md mb-4"
                    />
                  </div>

                  <div className={`flex flex-col text-center mx-auto gap-6 ${index % 2 === 0 ? "fade-left" : "fade-right"}`}>
                    <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                    <p className="text-md">{project.description}</p>
                    <button
                      onClick={() => handleShowPopup(project)}
                      className="bg-[rgb(1,37,125,0.7)] mx-auto border-black border w-fit text-white font-bold py-2 px-4 rounded-md mt-2 transition-transform duration-300 transform active:scale-90"
                    >
                      En savoir plus
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucun projet trouvé pour cette catégorie.</p>
            )}
          </div>
        </div>

        {showPopup && selectedProject && (
          <Popup project={selectedProject} category={String(category)} onClose={handleClosePopup} />
        )}

        <Footer />
      </div>

      {showScrollToTopButton && (
        <button
          aria-label="Retour en haut"
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
        </button>
      )}
    </div>
  );
}
