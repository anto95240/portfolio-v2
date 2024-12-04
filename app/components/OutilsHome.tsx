import Image from "next/image";
import skillsData from "../data/cv_skill.json"; // Chemin du fichier JSON

export default function Home() {
  // Récupération des données depuis `homepage.skills`
  const tools = skillsData.homepage.skills;

  return (
    <div className="bg-green-outil w-10/12 max-w-2xl mx-auto p-3 rounded-xl">
      {/* Conteneur principal */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Grille des outils */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="flex items-center bg-blue-outil px-2 py-3 rounded-md shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] justify-between"
            >
              <Image
                src={tool.images}
                alt={`${tool.title} Logo`}
                width={30}
                height={30}
              />
              <p className="md:text-lg text-base text-white ml-2 font-text">{tool.title}</p>
            </div>
          ))}
        </div>

        {/* Bouton VOIR PLUS */}
        <div className="mt-6 md:mt-0 md:ml-6 text-center">
          <button className="bg-gradient-to-r from-light-blue via-light-green to-light-blue text-black md:text-lg py-3 px-4 text-base rounded-md shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] transition-transform transform hover:scale-105">
            VOIR PLUS
          </button>
        </div>
      </div>
    </div>
  );
}
