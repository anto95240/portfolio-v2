"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, faChartSimple, faBriefcase, 
  faGraduationCap, faFileCircleCheck, faArrowUp 
} from "@fortawesome/free-solid-svg-icons";
import Nav from "../Navbar";
import Footer from "../Footer";
import Skill from "./Skills";
import Experience from "./Experience";
import Formation from "./Formation";
import ProjetCV from "./ProjetCV";
import { Experience as ExpType, Formation as FormType, SkillsData, ProjectsData } from "@/types";

interface CvClientProps {
  skills: SkillsData;
  experiences: ExpType[];
  formations: FormType[];
  projects: ProjectsData;
}

export default function CvClient({ skills, experiences, formations, projects }: CvClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profil");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  const [isScrolling, setIsScrolling] = useState(false); 

  // 1. Déclaration individuelle des Refs (Stable)
  const profilRef = useRef<HTMLElement>(null);
  const skillRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const formationRef = useRef<HTMLElement>(null);
  const projetRef = useRef<HTMLElement>(null);

  // 2. useMemo avec dépendances stables
  const menuItems = useMemo(() => [
    { id: "profil", icon: faUser, label: "Profil", ref: profilRef },
    { id: "skill", icon: faChartSimple, label: "Compétences", ref: skillRef },
    { id: "experience", icon: faBriefcase, label: "Expériences", ref: experienceRef },
    { id: "formation", icon: faGraduationCap, label: "Formations", ref: formationRef },
    { id: "projet", icon: faFileCircleCheck, label: "Projets", ref: projetRef },
  ], []); // Les refs sont stables par nature, tableau vide ok ou [profilRef, ...]

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      if (isScrolling) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // On observe chaque ref définie dans menuItems
    menuItems.forEach((item) => { 
      if (item.ref.current) observer.observe(item.ref.current); 
    });
    
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolling, menuItems]); // menuItems est maintenant une dépendance valide

  const scrollTo = (id: string, ref: React.RefObject<HTMLElement>) => {
    setIsScrolling(true);
    setActiveSection(id);
    
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    
    setTimeout(() => setIsScrolling(false), 1000);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-1/4 fixed z-50 h-full hidden lg:block">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      <main className={`flex-1 flex flex-col items-center mt-5 px-5 w-full transition-all duration-300 ${isMenuOpen ? "lg:pl-56 translate-x-1/4 lg:translate-x-0" : "lg:pl-56"}`}>
        <section id="profil" ref={profilRef} className="w-full flex flex-col items-center mb-16 pt-10 scroll-mt-20">
          <h1 className="text-3xl font-bold mb-10">CV</h1>
          <Image src="/images/photo.svg" alt="Antoine Richard" width={230} height={310} className="rounded-lg shadow-lg mb-6" priority quality={100} />
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold uppercase">Antoine Richard</h2>
            <p className="text-gray-600">Étudiant</p>
          </div>
          <button onClick={() => setShowPopup(true)} className="bg-blue-footer text-white py-2 px-10 rounded-full shadow-lg hover:scale-105 transition-transform">
            Télécharger mon CV
          </button>
        </section>

        <section id="skill" ref={skillRef} className="w-full scroll-mt-20"><Skill data={skills} /></section>
        <section id="experience" ref={experienceRef} className="w-full scroll-mt-20"><Experience data={experiences} /></section>
        <section id="formation" ref={formationRef} className="w-full scroll-mt-20"><Formation data={formations} /></section>
        <section id="projet" ref={projetRef} className="w-full scroll-mt-20"><ProjetCV data={projects} /></section>

        <Footer />
      </main>

      <div className="fixed top-1/4 right-0 z-40 hidden md:flex flex-col items-center">
        <div className="bg-menu-cv w-16 h-80 rounded-l-[50px] flex flex-col justify-around items-center p-4 shadow-xl">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id, item.ref)} className="relative group w-full flex justify-center">
               <span className="absolute right-full mr-4 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.label}
              </span>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${activeSection === item.id ? "border-4 border-menuCV-lightBlue bg-white/10 scale-110" : "hover:bg-menuCV-lightBlue/20"}`}>
                <FontAwesomeIcon icon={item.icon} className="text-white text-xl" />
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {showScrollTop && (
        <button aria-label="Retour en haut" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-10 right-10 z-50 bg-blue-500 text-white p-4 rounded-full shadow-lg">
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
       
       {showPopup && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col gap-4 text-center">
            <p className="text-lg font-bold">Choisissez une version :</p>
            <div className="flex gap-4">
              <Link href="/doc/Antoine RICHARD CV-s.pdf" target="_blank" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Stage</Link>
              <Link href="/doc/Antoine RICHARD CV.pdf" target="_blank" className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">Alternance</Link>
            </div>
            <button onClick={() => setShowPopup(false)} className="text-gray-500 underline mt-2 text-sm">Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}