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
    if (skills) {
      gsap.registerPlugin(ScrollTrigger);

      // Animation fade-left avec stagger
      gsap.fromTo(
        ".fade-left",
        { x: -50, opacity: 0 }, // Début de l'animation
        {
          x: 0, // Arrive à sa position finale
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          stagger: 0.1, // Intervalle entre chaque élément
          scrollTrigger: {
            trigger: ".fade-left",
            start: "top 90%", // L'animation commence quand l'élément atteint 90% du haut
            end: "top 0%", // Terminé quand l'élément atteint 30%
            scrub: true,
          },
        }
      );
    }
  }, [skills]); // Déclenche l'effet uniquement lorsque les compétences sont disponibles

  // Si les compétences ne sont pas encore chargées
  if (!skills) return <p>Chargement des compétences...</p>;

  // Fonction pour afficher les compétences par catégorie
  const renderSkills = (skillsList: SkillItem[], category: string) => (
    <div>
      <p className="mb-5 fade-left">{category}</p>
      <div className="flex flex-row gap-4">
        {skillsList.map((skill) => (
          <div key={skill.id} className="flex flex-col items-center">
            <Image
              src={skill.images}
              alt={skill.title}
              width={60}
              height={60}
              className="w-16 h-16 object-contain fade-left"
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
