"use client";

import { useEffect, useRef } from "react";

export const useEscapeKey = (handler: () => void) => {
  // On stocke la fonction dans une référence pour toujours avoir la version la plus récente
  const handlerRef = useRef(handler);

  // On met à jour la référence si la fonction change, sans relancer le gros useEffect
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Vérification de la touche
      if (e.key === "Escape") {
        handlerRef.current();
      }
    };

    // On utilise document.addEventListener qui est plus fiable que window dans React
    document.addEventListener("keydown", handleKeyDown);
    
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []); // Le tableau vide [] garantit que l'écouteur est attaché UNE SEULE FOIS
};