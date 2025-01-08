import Nav from "../components/Navbar";
import ProjetCV from "../components/cv/ProjetCV";
import Skill from "../components/cv/Skills";
import Experience from "../components/cv/Experience";
import Formation from "../components/cv/Formation";
import Footer from "../components/Footer";
import Image from "next/image";

export default function Cv() {
  return (
    <div className="flex h-screen">
      {/* Composant Nav */}
      <div className="w-1/4 fixed z-50 h-full">
        <Nav />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col items-center mt-5 mx-auto px-5 lg:pl-56 w-full lg:w-3/4 lg:max-w-9xl">
        <h1 className="text-3xl mb-10">CV</h1>
        <div className="flex flex-col gap-10 items-center">
          <div>
            <Image
              src="/images/photo.svg"
              alt="Photo"
              width={230}
              height={310}
            />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <p>ANTOINE RICHARD</p>

            <p>Etudiant</p>
          </div>
          <div className="mt-6 md:mt-0 text-center">
            <button className="bg-blue-footer text-white md:text-base py-2 px-20 text-base rounded-full shadow-[4px_4px_10px_0_rgba(0,0,0,0.5)] transition-transform transform hover:scale-105">
              <a href="/doc/CV.pdf"
              target="_blank"
              rel="noopener noreferrer">
              Télécharger mon CV
              </a>
            </button>
          </div>
        </div>

        <Skill/>
        <Experience/>
        <Formation/>
        <ProjetCV />
        <Footer />
      </div>
    </div>
  );
}
