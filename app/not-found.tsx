import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-white px-5">
      {/* Grand texte 404 avec un dégradé */}
      <h1 className="text-8xl md:text-9xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-projet to-light-blue">
        404
      </h1>
      
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
        Page Introuvable
      </h2>
      
      <p className="mb-10 text-lg md:text-xl text-gray-600 max-w-md mx-auto">
        Oups ! Il semblerait que vous vous soyez perdu. Cette page n'existe pas ou a été déplacée.
      </p>
      
      {/* Bouton stylisé reprenant ton design premium */}
      <Link 
        href="/" 
        className="group relative flex items-center gap-3 bg-gradient-to-r from-blue-footer to-blue-projet text-white py-3 px-8 rounded-full font-bold shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_8px_25px_rgba(33,129,204,0.5)] hover:-translate-y-1 active:scale-95 border border-white/10"
      >
        <FontAwesomeIcon icon={faHouse} className="text-lg transition-transform duration-300 group-hover:-translate-y-1" />
        <span className="text-lg tracking-wide">Retour à l'accueil</span>
      </Link>
    </div>
  );
}