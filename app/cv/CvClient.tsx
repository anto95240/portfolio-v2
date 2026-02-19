"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import ProjectImage from "@/components/ui/ProjectImage"; 
import CvModal from "@/components/ui/CvModal"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChartSimple,
  faBriefcase,
  faGraduationCap,
  faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons"; 
import Nav from "@/components/Navbar";
import Footer from "@/components/Footer";
import Skill from "@/components/cv/Skills";
import Experience from "@/components/cv/Experience";
import Formation from "@/components/cv/Formation";
import ProjetCV from "@/components/cv/ProjetCV";
import {
  Experience as ExpType,
  Formation as FormType,
  SkillsData,
  ProjectsData,
} from "@/types";

interface CvClientProps {
  skills: SkillsData;
  experiences: ExpType[];
  formations: FormType[];
  projects: ProjectsData;
}

export default function CvClient({
  skills,
  experiences,
  formations,
  projects,
}: CvClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profil");
  const [showPopup, setShowPopup] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const profilRef = useRef<HTMLElement>(null);
  const skillRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const formationRef = useRef<HTMLElement>(null);
  const projetRef = useRef<HTMLElement>(null);

  const menuItems = useMemo(
    () => [
      { id: "profil", icon: faUser, label: "Profil", ref: profilRef },
      { id: "skill", icon: faChartSimple, label: "Compétences", ref: skillRef },
      { id: "experience", icon: faBriefcase, label: "Expériences", ref: experienceRef },
      { id: "formation", icon: faGraduationCap, label: "Formations", ref: formationRef },
      { id: "projet", icon: faFileCircleCheck, label: "Projets", ref: projetRef },
    ],
    []
  );

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (isScrolling) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    menuItems.forEach((item) => {
      if (item.ref.current) observer.observe(item.ref.current);
    });

    return () => observer.disconnect();
  }, [isScrolling, menuItems]);

  const scrollTo = (id: string, ref: React.RefObject<HTMLElement | null>) => {
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
          
          <ProjectImage
            src="/images/photo.svg"
            alt="Antoine Richard"
            width={230}
            height={310}
            className="w-56 h-auto rounded-lg shadow-lg mb-6"
            priority
          />
          
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold uppercase">Antoine Richard</h2>
            <p className="text-gray-600">Étudiant</p>
          </div>
          
          <button
            type="button"
            onClick={() => setShowPopup(true)}
            className="bg-gradient-to-r from-blue-footer to-blue-projet text-white py-3 px-10 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_25px_rgba(33,129,204,0.5)] hover:-translate-y-1 active:scale-95 transition-all duration-300 font-bold"
          >
            Télécharger mon CV
          </button>
        </section>

        <section id="skill" ref={skillRef} className="w-full scroll-mt-20">
          <Skill data={skills} />
        </section>
        
        <section id="experience" ref={experienceRef} className="w-full scroll-mt-20">
          <Experience data={experiences} />
        </section>
        
        <section id="formation" ref={formationRef} className="w-full scroll-mt-20">
          <Formation data={formations} />
        </section>
        
        <section id="projet" ref={projetRef} className="w-full scroll-mt-20">
          <ProjetCV data={projects} />
        </section>

        <Footer />
      </main>

      {/* Menu latéral espion (ScrollSpy) */}
      <div className="fixed top-1/2 -translate-y-1/2 right-6 z-40 hidden lg:flex flex-col items-center gap-6">
        <div className="bg-menu-cv backdrop-blur-md border border-white/20 py-6 px-3 rounded-full flex flex-col justify-around items-center gap-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]">
          {menuItems.map((item) => {
             const isActive = activeSection === item.id;
             return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id, item.ref)}
                className="relative group flex items-center justify-center"
                aria-label={`Aller à la section ${item.label}`}
              >
                <span className={`absolute right-full mr-4 px-3 py-1.5 rounded-lg text-sm font-bold text-white whitespace-nowrap transition-all duration-300 origin-right
                  ${isActive ? "bg-light-blue opacity-100 scale-100 shadow-md" : "bg-blue-footer/80 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"}`}>
                  {item.label}
                  <span className={`absolute top-1/2 -translate-y-1/2 -right-[5px] border-y-4 border-y-transparent border-l-[6px] ${isActive ? "border-l-light-blue" : "border-l-blue-footer/80"}`}></span>
                </span>
                
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 ease-out
                    ${isActive 
                      ? "bg-gradient-to-br from-light-blue to-dark-blue text-white scale-110 shadow-[0_0_20px_rgba(99,157,240,0.5)]" 
                      : "bg-white/10 text-white/70 hover:bg-white/30 hover:text-white hover:scale-105"
                    }`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`text-xl transition-transform duration-300 ${isActive ? "rotate-0" : "group-hover:rotate-12"}`}
                  />
                </div>
              </button>
             ); 
          })} 
        </div>
      </div>

      {showPopup && <CvModal onClose={() => setShowPopup(false)} />}
      
    </div>
  );
}