"use client";

import { useEffect } from "react";

export function ScrollToSection() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const scroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const t = setTimeout(scroll, 100);
    return () => clearTimeout(t);
  }, []);

  return null;
}
