"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Vous pouvez envoyer ces métriques à un outil d'analytics ici
    // eslint-disable-next-line no-console
    console.log(metric);
  });

  return null;
}
