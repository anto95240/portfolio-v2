"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowUp } from "@fortawesome/free-solid-svg-icons";

// Imports des composants globaux
import Nav from "@/components/Navbar";
import Footer from "@/components/Footer";

// Imports des NOUVEAUX composants refactorisés
import ProjetChoice from "@/components/projet/ChoixProject";
import ProjectLinks from "@/components/projet/ProjectLinks"; // Axe 3
import ProjectImage from "@/components/ui/ProjectImage";     // Axe 2
import { CATEGORY_STYLES, DEFAULT_STYLE } from "@/lib/constants"; // Axe 1

import { Project, ProjectsData } from "@/types";

interface ProjectDetailClientProps {
  project: Project;
  category: string;
  allProjects: ProjectsData;
}

export default function ProjectDetailClient({ project, category, allProjects }: ProjectDetailClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  
  // Utilisation de la constante centralisée (Axe 1)
  const currentStyle = CATEGORY_STYLES[category] || DEFAULT_STYLE;

  useEffect(() => {
    const handleScroll = () => setShowScrollToTopButton(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".fade-down").forEach((elem) => {
            gsap.fromTo(elem,
            { y: 80, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1.5, ease: "power3.out",
                scrollTrigger: { trigger: elem, start: "top 90%", end: "top 15%", scrub: true },
            });
        });
    });
    return () => ctx.revert();
  }, []);

  if (!project) return <p className="text-xl text-center mt-20">Le projet est manquant.</p>;
  
  // Préparation des images
  const mainImage = project.images?.find((img) => img.type === "main")?.url || "/default.jpg";
  const galleryImages = project.images?.filter((img) => img.type === "gallery") || [];

  return (
    <div className={`flex h-full min-h-screen ${currentStyle.bg}`}>
      <div className="w-1/4 fixed z-50 h-full">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      <div className={`flex-1 flex flex-col items-center mx-auto px-5 lg:pl-56 ${currentStyle.text} w-screen lg:w-3/4 lg:max-w-9xl`}>
        <div className="flex flex-col items-center justify-center mt-10 w-full">
          <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
            
            {/* Image Principale via le nouveau composant (Axe 2) */}
            <ProjectImage
              src={mainImage}
              alt={`${project.title} Couverture`}
              width={800}
              height={552}
              priority
              className="rounded-b-3xl w-4/5 h-auto shadow-2xl"
            />

            <div className="flex flex-col w-full gap-x-12 mt-5">
              <div className={`mb-8 relative ${isMenuOpen ? "z-10" : "z-20"}`}>
                <Link href={`/projet/${category}/`}>
                  <button aria-label="Revenir au thème" className="hover:scale-110 transition-transform">
                    <FontAwesomeIcon icon={faArrowLeftLong} className="mr-2 text-4xl" />
                  </button>
                </Link>
              </div>

              <div className="flex flex-col text-left gap-6">
                <h3 className="text-xl font-bold mb-4 uppercase">{project.title}</h3>
                <hr className="bg-black w-full h-[2px] border-none rounded" />
                
                <div className="flex flex-col gap-10 md:flex-row">
                  {/* Infos Gauche */}
                  <div className="flex flex-col gap-5 min-w-[200px]">
                    <p className="text-md uppercase font-bold opacity-80">{category}</p>
                    <p className="text-md uppercase font-bold opacity-80">{project.date}</p>
                    <p className="text-md uppercase font-bold opacity-80">{project.equipe.join(" - ")}</p>
                    <div className="flex flex-wrap gap-2">
                         {project.technologies.map((t, i) => (
                             <span key={i} className="text-md uppercase bg-white/20 px-2 rounded border border-white/20">{t}</span>
                         ))}
                    </div>
                  </div>

                  {/* Description & Liens Droite via nouveau composant (Axe 3) */}
                  <div className="flex flex-col gap-5 flex-1">
                    <p className="text-md text-justify leading-relaxed">{project.description}</p>
                    
                    <ProjectLinks links={project.links} />
                  </div>
                </div>

                {/* Galerie Images via nouveau composant (Axe 2) */}
                <div className="flex flex-col gap-16 mt-16 mx-auto w-full max-w-4xl">
                  {galleryImages.map((img, index) => (
                    <div key={index} className="w-full relative shadow-2xl rounded-lg overflow-hidden fade-down">
                      <ProjectImage 
                        src={img.url}
                        alt={`Galerie ${index + 1}`}
                        width={1200}
                        height={800}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 w-full">
             <ProjetChoice allProjectsData={allProjects} />
        </div>
        
        <Footer />
      </div>

      {showScrollToTopButton && (
        <button
          aria-label="Retour en haut"
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
        </button>
      )}
    </div>
  );
}