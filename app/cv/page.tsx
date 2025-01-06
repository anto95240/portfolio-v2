import Nav from "../components/Navbar";
import ProjetCV from "../components/cv/ProjetCV";
import Skill from "../components/cv/Skills";
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
        {/* <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
          <div>
            <Image
              className="mb-10"
              src="/images/photo.svg"
              alt="Photo"
              width={230}
              height={310}
            />
          </div>
        </div>*/}
        <Skill/>
        <ProjetCV />
        <Footer />
      </div>
    </div>
  );
}
