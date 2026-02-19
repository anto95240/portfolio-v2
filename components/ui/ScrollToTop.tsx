"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export default function ScrollToTop() {
  const scrollY = useScrollPosition();
  const isVisible = scrollY > 200;

  if (!isVisible) return null;

  return (
    <button
      aria-label="Retour en haut"
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      // Design amélioré : dégradé, ombre colorée (glow), rebond au survol
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-blue-projet to-light-blue text-white rounded-full shadow-[0_4px_15px_rgba(33,129,204,0.4)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_25px_rgba(33,129,204,0.7)] active:scale-90 group"
    >
      <FontAwesomeIcon 
        icon={faArrowUp} 
        className="text-2xl transition-transform duration-300 group-hover:-translate-y-1" 
      />
    </button>
  );
}