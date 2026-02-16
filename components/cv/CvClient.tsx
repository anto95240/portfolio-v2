"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChartSimple, faBriefcase, faGraduationCap, faFileCircleCheck, faArrowUp } from "@fortawesome/free-solid-svg-icons";
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

  const refs = {
    profil: useRef<HTMLElement>(null),
    skill: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    formation: useRef<HTMLElement>(null),
    projet: useRef<HTMLElement>(null),
  };

  const menuItems = useMemo(() => [
    { id: "profil", icon: faUser, label: "Profil", ref: refs.profil },
    { id: "skill", icon: faChartSimple, label: "Compétences", ref: refs.skill },
    { id: "experience", icon: faBriefcase, label: "Expériences", ref: refs.experience },
    { id: "formation", icon: faGraduationCap, label: "Formations", ref: refs.formation },
    { id: "projet", icon: faFileCircleCheck, label: "Projets", ref: refs.projet },
  ], []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Zone de détection plus étroite au centre
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (isScrolling) return; // Ne change pas le menu si on est en train de scroller via clic

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(refs).forEach((ref) => { if (ref.current) observer.observe(ref.current); });
    
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolling]);

  const scrollTo = (id: string, ref: React.RefObject<HTMLElement>) => {
    setIsScrolling(true); // Bloque l'observer
    setActiveSection(id); // Force l'activation immédiate visuelle
    
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    
    // Réactive l'observer après 1 seconde (temps de l'animation scroll)
    setTimeout(() => setIsScrolling(false), 1000);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-1/4 fixed z-50 h-full hidden lg:block">
        <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>

      <main className={`flex-1 flex flex-col items-center mt-5 px-5 w-full transition-all duration-300 ${isMenuOpen ? "lg:pl-56 translate-x-1/4 lg:translate-x-0" : "lg:pl-56"}`}>
        <section id="profil" ref={refs.profil} className="w-full flex flex-col items-center mb-16 pt-10">
          <h1 className="text-3xl font-bold mb-10">CV</h1>
          <Image src="/images/photo.svg" alt="Antoine Richard" width={230} height={310} className="rounded-lg shadow-lg mb-6" priority />
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold uppercase">Antoine Richard</h2>
            <p className="text-gray-600">Étudiant</p>
          </div>
          <button onClick={() => setShowPopup(true)} className="bg-blue-footer text-white py-2 px-10 rounded-full shadow-lg hover:scale-105 transition-transform">
            Télécharger mon CV
          </button>
        </section>

        <section id="skill" ref={refs.skill} className="w-full"><Skill data={skills} /></section>
        <section id="experience" ref={refs.experience} className="w-full"><Experience data={experiences} /></section>
        <section id="formation" ref={refs.formation} className="w-full"><Formation data={formations} /></section>
        <section id="projet" ref={refs.projet} className="w-full"><ProjetCV data={projects} /></section>

        <Footer />
      </main>

      <div className="fixed top-1/4 right-0 z-40 hidden md:flex flex-col items-center">
        <div className="bg-menu-cv w-16 h-80 rounded-l-[50px] flex flex-col justify-around items-center p-4 shadow-xl">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() =>scrollTo(item.id, item.ref)} className="relative group w-full flex justify-center">
               <span className="absolute right-full mr-4 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.label}
              </span>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${activeSection === item.id ? "border-4 border-menuCV-lightBlue" : "hover:bg-menuCV-lightBlue/20"}`}>
                <FontAwesomeIcon icon={item.icon} className="text-white text-xl" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {showScrollTop && (
        <button aria-label="retour en haut" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-10 right-10 z-50 bg-blue-500 text-white p-4 rounded-full shadow-lg">
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