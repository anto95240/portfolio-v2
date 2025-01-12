'use client';

import { useEffect } from 'react';
import skillsData from '../../data/cv_skill.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const skills: Skills = skillsData.cvpage.skills;

  if (!skills) return <p>Chargement des compétences...</p>;

  // Fonction pour afficher les compétences par catégorie
  const renderSkills = (skillsList: SkillItem[], category: string) => (
    <div>
      <p className="mb-5 fade-left">{category}</p>
      <div className="flex flex-row gap-4">
        {skillsList.map((skill) => (
          <div key={skill.id} className="flex flex-col items-center">
            <img
              src={skill.images}
              alt={skill.title}
              className="w-16 h-16 object-contain fade-left"
            />
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Animation fade-left2 avec stagger
      gsap.fromTo(
        '.fade-left',
        { x: -50, opacity: 0 }, // Début de l'animation
        {
          x: 0, // Arrive à sa position finale
          opacity: 1,
          duration: 2,
          ease: 'power3.out',
          stagger: 0.1, // Intervalle entre chaque élément
          scrollTrigger: {
            trigger: '.fade-left',
            start: 'top 90%', // L'animation commence quand l'élément atteint 90% du haut
            end: 'top 0%', // Terminé quand l'élément atteint 30%
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <div className="w-8/12 flex flex-col mx-auto">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />
      <h1 className="text-2xl mb-10 text-center">COMPETENCE</h1>

      <div className="flex flex-col gap-8 ml-5">
        {renderSkills(skills.frontend, 'Développement Front-end')}
        {renderSkills(skills.backend, 'Développement Back-end')}
        {renderSkills(skills.database, 'Base de donnée')}
        {renderSkills(skills.logiciel, 'Logiciel')}
      </div>
    </div>
  );
}
