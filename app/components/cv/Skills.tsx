"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

type SkillItem = {
  id: string;
  title: string;
  images: string;
};

type Skills = {
  frontend: SkillItem[];
  backend: SkillItem[];
  database: SkillItem[];
  logiciel: SkillItem[];
};

export default function Skill() {
  const [skills, setSkills] = useState<Skills | null>(null); // Nouveau state pour les compétences

  // Fonction pour récupérer les compétences depuis l'API interne
  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/cv_skill");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des compétences");
      }
      const data = await response.json();
      setSkills(data.cvpage.skills); // Mettez à jour les compétences
    } catch (error) {
      console.error("Erreur API:", error);
    }
  };

  useEffect(() => {
    // Appel à l'API interne pour récupérer les compétences
    fetchSkills();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (skills) {
        gsap.registerPlugin(ScrollTrigger);
    
        // Animation synchronisée des titres et compétences
        gsap.fromTo(
          ".skills-title, .skills-row > div",
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".skills-container",
              start: "top 90%",
              end: "bottom 0%",
              scrub: true,
            },
          }
        );
      }
    }
  }, [skills]);
   

  // Si les compétences ne sont pas encore chargées
  if (!skills) return <p>Chargement des compétences...</p>;

  // Fonction pour afficher les compétences par catégorie
  const renderSkills = (skillsList: SkillItem[], category: string) => (
    <div className="skills-container">
      <p className="mb-5 skills-title">{category}</p>
      <div className="flex flex-row flex-wrap gap-4 skills-row">
        {skillsList.map((skill) => (
          <div key={skill.id} className="flex flex-col items-center">
            <Image
              src={skill.images}
              alt={skill.title}
              width={0}
              height={0}
              className="w-10 h-10 lg:w-16 lg:h-16 object-contain transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-8/12 flex flex-col mx-auto">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />
      <h1 className="text-2xl mb-10 text-center">COMPETENCE</h1>

      <div className="flex flex-col gap-8 ml-5">
        {renderSkills(skills.frontend, "Développement Front-end")}
        {renderSkills(skills.backend, "Développement Back-end")}
        {renderSkills(skills.database, "Base de donnée")}
        {renderSkills(skills.logiciel, "Logiciel")}
      </div>
    </div>
  );
}
