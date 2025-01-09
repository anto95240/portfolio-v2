import Nav from "../components/Navbar";
import Theme from "../components/projet/theme";
import Footer from "../components/Footer";

export default function Projet() {
  return (
    <div className="flex h-screen">
      {/* Composant Nav */}
      <div className="w-1/4 fixed z-50 h-full">
        <Nav />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col items-center mt-5 mx-auto px-5 lg:pl-56 w-full lg:w-3/4 lg:max-w-9xl">
        <h1 className="text-3xl mb-10">PROJETS</h1>
        <Theme />        
        <Footer />
      </div>
    </div>
  );
}
