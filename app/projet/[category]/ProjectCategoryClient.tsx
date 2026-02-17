"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Composants UI et Layout
import Nav from "@/components/Navbar";
import Footer from "@/components/Footer";
import Popup from "@/components/projet/Popup";
import ProjectImage from "@/components/ui/ProjectImage"; // Nouveau composant optimisé

// Constantes et Types
import { CATEGORY_STYLES, DEFAULT_STYLE } from "@/lib/constants";
import { Project } from "@/types";

interface ProjectCategoryClientProps {
  projects: Project[];
  category: string;
}

export default function ProjectCategoryClient({ projects, category }: ProjectCategoryClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  
  // Récupération du style centralisé
  const currentStyle = CATEGORY_STYLES[category] || DEFAULT_STYLE;

  // Gestion Popup
  const handleShowPopup = (project: Project) => {
    setSelectedProject(project);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProject(null);
  };

  // Gestion Scroll Top
  useEffect(() => {
    const handleScroll = () => setShowScrollToTopButton(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Animations GSAP
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
        projects.forEach((_: Project, index: number) => {
        const direction = index % 2 === 0 ? "fade-left" : "fade-right";
        const fromX = direction === "fade-left" ? -40 : 40;

        gsap.fromTo(
            `.project-${index} .${direction}`,
            { x: fromX, opacity: 0 },
            {
            x: 0, opacity: 1, duration: 1, stagger: 0.1,
            scrollTrigger: {
                trigger: `.project-${index}`,
                start: "top 60%",
                end: "top 30%",
                scrub: true,
            },
            }
        );
        });
    });
    return () => ctx.revert();
  }, [projects]);

  // Validation simple de la catégorie (optionnel si géré par le parent/serveur)
  const isValidCategory = ["jeux", "ydays", "web"].includes(category);
  if (!isValidCategory) return <div>Catégorie invalide.</div>;

  return (
    <div className={`flex min-h-screen ${currentStyle.bg}`}>
      {/* Navigation Fixe (25% width) */}
      <div className="w-1/4 fixed z-50 h-full">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      {/* Contenu - Layout ajusté avec lg:ml-[25%] */}
      <div className={`flex-1 flex flex-col items-center mt-10 mx-auto px-5 lg:ml-[25%] ${currentStyle.text} w-full lg:w-3/4`}>
        <h1 className="text-3xl mb-20 uppercase font-bold">{category}</h1>

        <div className={`absolute right-5 lg:left-[26%] ${isMenuOpen ? "z-10" : "z-50"}`}>
          <button aria-label="Revenir au thème">
            <Link href="/projet">
              <FontAwesomeIcon icon={faArrowLeftLong} className="mr-2 mt-5 text-4xl" />
            </Link>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-col gap-8 w-full max-w-7xl">
            {projects.length > 0 ? (
              projects.map((project, index) => {
                const mainImage = project.images.find((img) => img.type === "main")?.url || "/default-image.jpg";
                
                return (
                  <div
                    key={project.id}
                    className={`project-${index} flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center text-center mx-auto w-10/12 gap-x-12 mb-16`}
                  >
                    <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? "fade-left" : "fade-right"}`}>
                      {/* Utilisation de ProjectImage optimisé */}
                      <ProjectImage
                        src={mainImage}
                        alt={`${project.title} Image`}
                        width={500}
                        height={345}
                        priority={index < 2} // Charge les premiers projets en priorité
                        className="rounded-md mb-4 shadow-lg w-full h-auto"
                      />
                    </div>

                    <div className={`flex flex-col text-center mx-auto gap-6 w-full lg:w-1/2 ${index % 2 === 0 ? "fade-left" : "fade-right"}`}>
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
                );
              })
            ) : (
              <p>Aucun projet trouvé pour cette catégorie.</p>
            )}
          </div>
        </div>

        {showPopup && selectedProject && (
          <Popup project={selectedProject} category={category} onClose={handleClosePopup} />
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