import skillsData from '../../data/cv_skill.json';

export default function Skill() {
  const skills = skillsData.cvpage.skills;


  if (!skills) return <p>Chargement des compétences...</p>;

  return (
    <div className="w-8/12 flex flex-col mx-auto">
      <hr className="bg-black w-full my-10 h-[2px] border-none rounded" />
      <h1 className="text-2xl mb-10 text-center">COMPETENCE</h1>

      <div className="flex flex-col gap-8 ml-5">
        {/* Front-end */}
        <div>
          <p className="mb-5">Développement Front-end</p>
          <div className="flex flex-row gap-4">
            {skills.frontend.map((skill: any) => (
              <div key={skill.id} className="flex flex-col items-center">
                <img
                  src={skill.images}
                  alt={skill.title}
                  className="w-16 h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Back-end */}
        <div>
          <p className="mb-5">Développement Back-end</p>
          <div className="flex flex-row gap-4">
            {skills.backend.map((skill: any) => (
              <div key={skill.id} className="flex flex-col items-center">
                <img
                  src={skill.images}
                  alt={skill.title}
                  className="w-16 h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Base de données */}
        <div>
          <p className="mb-5">Base de donnée</p>
          <div className="flex flex-row gap-4">
            {skills.database.map((skill: any) => (
              <div key={skill.id} className="flex flex-col items-center">
                <img
                  src={skill.images}
                  alt={skill.title}
                  className="w-16 h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Logiciels */}
        <div>
          <p className="mb-5">Logiciel</p>
          <div className="flex flex-row gap-4">
            {skills.logiciel.map((skill: any) => (
              <div key={skill.id} className="flex flex-col items-center">
                <img
                  src={skill.images}
                  alt={skill.title}
                  className="w-16 h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
