"use client";

import { useState, useEffect } from "react";

export const useScrollPosition = (): number => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const updatePosition = () => setScrollPosition(window.scrollY);
    updatePosition();
    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};