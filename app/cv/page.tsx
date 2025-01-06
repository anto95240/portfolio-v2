import Nav from "../components/Navbar";
import Index from "../components/cv/ProjetCV";
import Outil from "../components/OutilsHome";
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
      <div className="flex-1 flex flex-col items-center mt-16 lg:mt-10 mx-auto px-5 lg:pl-56 w-full lg:w-3/4 lg:max-w-9xl">
        {/* <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
          <div className="flex flex-col justify-center text-center lg:text-left">
            <p className="text-center">
              Hello, moi c’est <b>Antoine</b> ! <br /> <br />
            </p>
            <p className="text-center">
              <b>Etudiant</b> en <br /> <b>informatique</b>. <br /> <br />
            </p>
            <p className="text-center">
              Je suis actuellement un cursus de 5 ans en <br /> informatique et me passionne de plus en plus pour <br /> le <b>domaine du web</b> et plus précisément pour le <br /> <b>développement web front-end</b>.
            </p>
          </div>
          <div>
            <Image
              className="mb-10"
              src="/images/photo.svg"
              alt="Photo"
              width={230}
              height={310}
            />
          </div>
        </div>
        <hr className="bg-black w-10/12 my-10" />
        <h1 className="mb-5">Mes outils</h1>
        <Outil />
        <hr className="bg-black w-10/12 my-10" />
        <h1 className="mb-5">Mes projets</h1>
        <Index /> */}
        <hr className="bg-black w-10/12 my-10" />
        <Footer />
      </div>
    </div>
  );
}
