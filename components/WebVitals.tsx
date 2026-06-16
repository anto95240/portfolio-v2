"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Vous pouvez envoyer ces métriques à un outil d'analytics ici
    // Pour l'instant, on les affiche dans la console
    console.log(metric);
  });

  return null;
}
