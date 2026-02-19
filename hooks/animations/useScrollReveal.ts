"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealOptions = {
  axis?: "x" | "y";
  offset?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  triggerElement?: string; // Si on veut déclencher l'animation basée sur le parent
};

export const useScrollReveal = (
  selector: string,
  options: RevealOptions = {}
) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const {
      axis = "y",
      offset = 30,
      duration = 1,
      stagger = 0,
      start = "top 90%",
      end = "top 70%",
      scrub = true,
      triggerElement,
    } = options;

    const ctx = gsap.context(() => {
      // Si un trigger parent est défini (ex: pour stagger toute une liste en même temps)
      if (triggerElement) {
        gsap.fromTo(
          selector,
          {
            x: axis === "x" ? offset : 0,
            y: axis === "y" ? offset : 0,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: duration,
            stagger: stagger,
            scrollTrigger: {
              trigger: triggerElement,
              start: start,
              end: end,
              scrub: scrub,
            },
          }
        );
      } else {
        // Animation individuelle pour chaque élément (ex: .fade-down pour les projets)
        const items = gsap.utils.toArray<HTMLElement>(selector);
        items.forEach((item) => {
          gsap.fromTo(
            item,
            {
              x: axis === "x" ? offset : 0,
              y: axis === "y" ? offset : 0,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: duration,
              ease: "power2.out", // Ajout d'un ease par défaut pour les éléments individuels
              scrollTrigger: {
                trigger: item,
                start: start,
                end: end,
                scrub: scrub,
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, [selector, options]);
};