"use client";

import Link from "next/link";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faDownload } from "@fortawesome/free-solid-svg-icons";

interface CvModalProps {
  onClose: () => void;
}

export default function CvModal({ onClose }: CvModalProps) {
  const modalRef = useClickOutside<HTMLDivElement>(onClose);
  useEscapeKey(onClose);

  // Styles communs pour les boutons de téléchargement
  const btnStyle = "flex items-center justify-center gap-3 px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 font-bold text-white";

  return (
    // Fond sombre avec un flou plus intense (backdrop-blur-md)
    <div className="fixed z-[100] inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300">
      
      {/* Conteneur "Glassmorphism" */}
      <div 
        ref={modalRef} 
        className="relative bg-white/50 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/50 flex flex-col items-center max-w-md w-full transition-all transform scale-100"
      >
        {/* Bouton Fermer (Croix) en haut à droite */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors text-gray-600 hover:text-black"
          type="button"
          aria-label="Fermer"
        >
           <FontAwesomeIcon icon={faTimes} />
        </button>

        <h3 className="text-2xl font-black mb-8 text-center text-transparent bg-clip-text bg-blue-footer">
          Choisir une version
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/doc/Antoine RICHARD CV-s.pdf"
            target="_blank"
            className={`${btnStyle} bg-gradient-to-tr from-blue-600 to-light-blue`}
            onClick={onClose} 
          >
            <FontAwesomeIcon icon={faDownload} />
            CV Stage
          </Link>
          <Link
            href="/doc/Antoine RICHARD CV.pdf"
            target="_blank"
            className={`${btnStyle} bg-gradient-to-tr from-emerald-600 to-light-green`}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faDownload} />
            CV Alternance
          </Link>
        </div>
        
        {/* Le bouton "Annuler" du bas est supprimé car remplacé par la croix */}
      </div>
    </div>
  );
}