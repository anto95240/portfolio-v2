"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Nav from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import ProjetChoice from "../../../components/projet/ChoixProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faArrowUpRightFromSquare, faArrowUp } from "@fortawesome/free-solid-svg-icons";
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

export default function ProjetDetail() {
  const { id, category } = useParams<{ id: string; category: keyof CategoryStyles }>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  
  const isClient = useIsClient();

  const categoryStyles: CategoryStyles = useMemo(() => ({
    ydays: { bg: "bg-gradient-to-r from-light-green to-green-blue", text: "text-black" },
    web: { bg: "bg-gradient-to-r from-green-blue to-blue-darkBlue", text: "text-black" },
    jeux: { bg: "bg-gradient-to-r from-blue-darkBlue to-dark-blue", text: "text-white" },
  }), []);

  const project = useMemo(() => {
    if (!projectsData || !category) return null;
    return projectsData[category]?.projects.find((proj) => proj.id === id) || null;
  }, [projectsData, category, id]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/projets");
        if (!response.ok) throw new Error("Erreur lors de la récupération des projets");
        const data = await response.json();
        setProjectsData(data.projectPage || {});
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProjects();
  }, []);  

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Initialiser gsap après le montage côté client
  useEffect(() => {
    if (!isClient || !project) return;
  
    // Cast les éléments comme étant des images HTML
    const images = Array.from(document.querySelectorAll("img.fade-down")) as HTMLImageElement[];
    const totalImages = images.length;
    let loadedImages = 0;
  
    const checkAllImagesLoaded = () => {
      if (loadedImages === totalImages) {
        initializeAnimations();
      }
    };
  
    images.forEach((img) => {
      if (img.complete) {
        loadedImages++;
        checkAllImagesLoaded();
      } else {
        img.addEventListener("load", () => {
          loadedImages++;
          checkAllImagesLoaded();
        });
      }
    });
  
    function initializeAnimations() {
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
              end: "top 15%",
              scrub: true,
            },
          }
        );
      });
    }
  }, [isClient, project]);

  if (loading) {
    return <p>Chargement des projets...</p>;
  }

  if (!project) {
    return (
      <p className="text-xl">Le projet n'a pas été trouvé.</p>
    );
  }
  
  if (!isClient) return null;
  
  return (
    <div className={`flex h-full ${categoryStyles[category]?.bg}`}>
      <div className="w-1/4 fixed z-50 h-full">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      <div className={`flex-1 flex flex-col items-center mx-auto px-5 lg:pl-56 ${categoryStyles[category]?.text} w-screen lg:w-3/4 lg:max-w-9xl`}>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-8 w-full max-w-xl">
            <Image
              src={project.images?.find((img) => img.type === "main")?.url || ""}
              alt={`${project.title} Image`}
              width={500}
              height={345}
              className="rounded-b-3xl h-auto w-4/5"
              priority
            />
            <div className="flex flex-col w-full gap-x-12">
              <div className={`mb-8 relative ${isMenuOpen ? "z-10" : "z-50"}`}>
                <Link href={`/projet/${category}/`}>
                  <button aria-label="Revenir au thème">
                    <FontAwesomeIcon icon={faArrowLeftLong} className="mr-2 text-4xl" />
                  </button>
                </Link>
              </div>
              <div className="flex flex-col text-left gap-6">
                <h3 className="text-xl font-bold mb-4 uppercase">{project.title}</h3>
                <hr className="bg-black w-full h-[2px] border-none rounded" />
                <div className="flex flex-col gap-5 md:flex-row">
                  <div className="flex flex-col gap-5 pl-10">
                    <p className="text-md uppercase">{category}</p>
                    <p className="text-md uppercase">{project.date}</p>
                    <p className="text-md uppercase">{project.equipe.join(" - ")}</p>
                    <p className="text-md uppercase">{project.technologies.join(" / ")}</p>
                  </div>
                  <div className="flex flex-col gap-5 pl-10 md:mx-auto">
                    <p className="text-md text-left md:text-center md:h-32">{project.description}</p>
                    <div className="flex flex-col md:flex-row gap-3">
                      {project.links?.map((link, linkIndex) => {
                        const isObjectLink = typeof link !== "string";
                        const url = isObjectLink ? (link as { url: string }).url : link;
                        const label = isObjectLink ? (link as { type: string }).type === "site" ? "Accéder au site" : "Accéder au code" : "Site web";
                        return (
                          <div key={linkIndex} className="flex gap-3">
                            <div className="flex ml-3">
                              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-2" />
                              <a href={url} className="underline" target="_blank" rel="noopener noreferrer">
                                {label}
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-9 Mt-10 mx-auto">
                  {project.images?.filter((img) => img.type === "gallery").map((img, linkIndex) => (
                    <div key={linkIndex} className="flex flex-col gap-3">
                      <div className="flex ml-3">
                        <Image 
                          alt={`Image ${linkIndex + 1}`} 
                          src={img.url} 
                          width={700} 
                          height={500} 
                          className="rounded-md fade-down" 
                          priority
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProjetChoice />
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
