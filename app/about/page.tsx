import Nav from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function About() {
  return (
    <div className="flex h-screen">
      {/* Composant Nav */}
      <div className="w-1/4 fixed z-50 h-full">
        <Nav />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col items-center mt-5 mx-auto px-5 lg:pl-56 w-full lg:w-3/4 lg:max-w-5xl">
        <h1 className="text-3xl mb-10">ABOUT</h1>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-20 w-full">
          <div>
            <Image
              className="mb-10"
              src="/images/photo.svg"
              alt="Photo"
              width={230}
              height={310}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col justify-center text-center mx-auto lg:text-left max-w-lg">
              <p className="text-base leading-relaxed">
                Hello, moi c’est <b>Antoine</b> ! <b>Etudiant</b> en <b>informatique</b>. Je suis actuellement un cursus de 5 ans en informatique et me passionne de plus en plus pour le <b>domaine du web</b>.
              </p>
            </div>
              <div className="grid grid-cols-3 gap-2 mt-5 justify-items-center lg:justify-items-start">
                <div className="w-24 h-24 bg-blue-300 rounded-full flex items-center justify-center text-lg text-black shadow-md">
                  Football
                </div>
                <div className="w-24 h-24 bg-blue-300 rounded-full flex items-center justify-center text-lg text-black shadow-md">
                  Cinéma
                </div>
                <div className="w-24 h-24 bg-blue-300 rounded-full flex items-center justify-center text-lg text-black shadow-md">
                  Lecture
                </div>
              </div>
            

          </div>          
        </div>

        <Footer />
      </div>
    </div>
  );
}
