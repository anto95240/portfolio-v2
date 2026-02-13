"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowUpRightFromSquare, faArrowUp } from "@fortawesome/free-solid-svg-icons";

// Imports composants
import Nav from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjetChoice from "@/components/projet/ChoixProject"; // Assurez-vous du chemin

// Types
import { Project } from "@/types";

type CategoryStyles = {
  [key: string]: { bg: string; text: string };
};

interface ProjectDetailClientProps {
  project: Project;
  category: string;
}

export default function ProjectDetailClient({ project, category }: ProjectDetailClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

  // Styles dynamiques
  const categoryStyles: CategoryStyles = useMemo(() => ({
    ydays: { bg: "bg-gradient-to-r from-light-green to-green-blue", text: "text-black" },
    web: { bg: "bg-gradient-to-r from-green-blue to-blue-darkBlue", text: "text-black" },
    jeux: { bg: "bg-gradient-to-r from-blue-darkBlue to-dark-blue", text: "text-white" },
  }), []);

  const currentStyle = categoryStyles[category] || { bg: "bg-white", text: "text-black" };

  // Gestion du scroll top
  useEffect(() => {
    const handleScroll = () => setShowScrollToTopButton(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation GSAP pour la galerie
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Attendre que les images soient chargées n'est pas strictement nécessaire avec Next/Image 
    // car le DOM est présent, mais on utilise un contexte pour la sécurité.
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll(".fade-down-gallery");
      if (elements.length > 0) {
        gsap.fromTo(
          elements,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.5, ease: "power3.out", stagger: 0.2,
            scrollTrigger: {
              trigger: ".gallery-container",
              start: "top 80%",
              end: "bottom 20%",
              scrub: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const mainImage = project.images.find((img) => img.type === "main")?.url || "/default-image.jpg";
  const galleryImages = project.images.filter((img) => img.type === "gallery");

  return (
    <div className={`flex min-h-screen ${currentStyle.bg}`}>
      <div className="w-1/4 fixed z-50 h-full">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      <div className={`flex-1 flex flex-col items-center mx-auto px-5 lg:pl-56 ${currentStyle.text} w-full lg:w-3/4 lg:max-w-9xl`}>
        <div className="flex flex-col items-center justify-center w-full mt-10">
          <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
            
            {/* Image Principale */}
            <div className="w-full md:w-4/5 relative h-[300px] md:h-[450px]">
                <Image
                src={mainImage}
                alt={`${project.title} Couverture`}
                fill
                className="rounded-b-3xl object-cover shadow-2xl"
                priority
                />
            </div>

            <div className="flex flex-col w-full gap-x-12 mt-5">
              {/* Bouton Retour */}
              <div className={`mb-8 relative ${isMenuOpen ? "z-10" : "z-20"}`}>
                <Link href={`/projet/${category}`}>
                  <button aria-label="Retour à la catégorie" className="hover:-translate-x-2 transition-transform">
                    <FontAwesomeIcon icon={faArrowLeftLong} className="mr-2 text-4xl" />
                  </button>
                </Link>
              </div>

              {/* Détails du Projet */}
              <div className="flex flex-col text-left gap-6">
                <h1 className="text-3xl font-bold mb-4 uppercase tracking-wider border-b-2 border-current pb-4">{project.title}</h1>
                
                <div className="flex flex-col md:flex-row gap-10">
                  {/* Infos Clés */}
                  <div className="flex flex-col gap-4 min-w-[200px] text-lg">
                    <p className="uppercase font-bold opacity-80">{category}</p>
                    <p className="uppercase font-bold opacity-80">{project.date}</p>
                    <p className="uppercase font-bold opacity-80">{project.equipe.join(" - ")}</p>
                    <div className="flex flex-wrap gap-2">
                         {project.technologies.map((tech, i) => (
                             <span key={i} className="bg-white/20 px-2 py-1 rounded text-sm border border-white/30">{tech}</span>
                         ))}
                    </div>
                  </div>

                  {/* Description & Liens */}
                  <div className="flex flex-col gap-6 md:mx-auto flex-1">
                    <p className="text-lg leading-relaxed text-justify">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-4 mt-2">
                      {project.links?.map((link, index) => {
                        // Gestion flexible du format des liens (string ou objet)
                        const url = typeof link === "string" ? link : link.url;
                        const label = typeof link === "string" ? "Voir le site" : (link.type === "site" ? "Accéder au site" : "Voir le code");
                        
                        return (
                          <a 
                            key={index} 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors border border-white/40"
                          >
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                            <span className="underline decoration-1 underline-offset-4">{label}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Galerie d'images */}
                {galleryImages.length > 0 && (
                    <div className="flex flex-col gap-12 mt-16 mx-auto w-full gallery-container">
                    {galleryImages.map((img, index) => (
                        <div key={index} className="relative w-full h-auto fade-down-gallery">
                        <Image 
                            src={img.url} 
                            alt={`Galerie ${project.title} ${index + 1}`} 
                            width={800} 
                            height={500}
                            className="rounded-lg shadow-xl w-full h-auto" 
                        />
                        </div>
                    ))}
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full mt-20">
             <ProjetChoice />
        </div>
        
        <div className="w-full mt-10">
            <Footer />
        </div>
      </div>

      {showScrollToTopButton && (
        <button
          aria-label="Retour en haut"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-10 right-10 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
        </button>
      )}
    </div>
  );
}