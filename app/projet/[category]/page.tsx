'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Utilisation de useRouter pour la navigation
import Nav from "../../components/Navbar";
import Footer from "../../components/Footer";
import Popup from "../../components/projet/Popup";
import Image from 'next/image';
import projetData from "../../data/projet.json"; // Chemin du fichier JSON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowUp } from '@fortawesome/free-solid-svg-icons';

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

type ProjectsCategory = {
  projects: Project[];
};

type ProjectsData = {
  [key: string]: ProjectsCategory;
};

type CategoryStyles = {
  jeux: { bg: string; text: string };
  ydays: { bg: string; text: string };
  web: { bg: string; text: string };
};

export default function ProjetCategory() {
  const pathname = usePathname(); // Utilisation de usePathname pour récupérer le chemin de l'URL
  const category = pathname?.split('/')[2] as keyof CategoryStyles; // Cast pour garantir que 'category' est une des clés de CategoryStyles
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Contrôle de l'ouverture du menu
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false); // État pour afficher/masquer le bouton Retour en haut

  const categories = ['jeux', 'ydays', 'web'];
  const isValidCategory = categories.includes(String(category));

  if (!isValidCategory) {
    return <div>Catégorie invalide.</div>;
  }

  const categoryStyles: CategoryStyles = {
    ydays: { bg: 'bg-gradient-to-r from-light-green to-green-blue', text: 'text-black' },
    web: { bg: 'bg-gradient-to-r from-green-blue to-blue-darkBlue', text: 'text-black' },
    jeux: { bg: 'bg-gradient-to-r from-blue-darkBlue to-dark-blue', text: 'text-white' },
  };

  const projects = projetData.projectPage[category]?.projects || [];

  const handleShowPopup = (project: Project) => {
    setSelectedProject(project);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProject(null);
  };

  // Gérer l'affichage du bouton Retour en haut en fonction de la position de défilement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTopButton(true); // Afficher le bouton après 200px de défilement
      } else {
        setShowScrollToTopButton(false); // Masquer le bouton
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Nettoyage de l'événement lors de la destruction du composant
    };
  }, []);

  // Fonction pour revenir en haut de la page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`flex h-full ${categoryStyles[category]?.bg}`}>
      <div className="w-1/4 fixed z-50 h-full">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> {/* Passage de l'état */}
      </div>

      <div className={`flex-1 flex flex-col items-center mt-10 mx-auto px-5 lg:pl-56 ${categoryStyles[category]?.text} w-full lg:w-3/4 lg:max-w-9xl`}>
        <h1 className="text-3xl mb-20">{category}</h1>
        
        <div className={`absolute right-3/4 lg:left-1/4 ${isMenuOpen ? "z-10" : "z-50"}`}>
          <button aria-label="revenir au thème">
            <Link href="/projet">
              <FontAwesomeIcon icon={faArrowLeftLong} className="mr-2 mt-5 text-4xl" />
            </Link>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-8 w-full">
            {projects.map((project: Project, index: number) => (
              <div
                key={project.id}
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center text-center mx-auto w-10/12 gap-x-12`}
              >
                <Image
                  src={project.images.find((img: { type: string; url: string }) => img.type === "main")?.url || "/default-image.jpg"}
                  alt={`${project.title} Image`}
                  width={500}
                  height={345}
                  className="rounded-md mb-4"
                />
                <div className="flex flex-col text-center mx-auto gap-6">
                  <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                  <p className="text-md">{project.description}</p>
                  <button
                    onClick={() => handleShowPopup(project)}
                    className="bg-[rgb(1,37,125,0.7)] mx-auto border-black border w-fit text-white font-bold py-2 px-4 rounded-md mt-2 transition-all duration-300"
                  >
                    Voir plus de détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showPopup && selectedProject && (
          <Popup project={selectedProject} category={String(category)} onClose={handleClosePopup} />
        )}

        <Footer />
      </div>

      {/* Bouton Retour en haut */}
      {showScrollToTopButton && (
        <button aria-label="retour en haut"
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
        </button>
      )}
    </div>
  );
}
