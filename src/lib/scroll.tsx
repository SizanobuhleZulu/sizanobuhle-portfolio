"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";

const LenisCtx = createContext<Lenis | null>(null);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      l.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    setLenis(l);
    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisCtx.Provider value={lenis}>{children}</LenisCtx.Provider>;
}

export function useLenis() {
  return useContext(LenisCtx);
}

export function scrollToTarget(lenis: Lenis | null, id: string) {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(id === "top" ? 0 : (el as HTMLElement), { offset: 0, duration: 1.2 });
  else if (id === "top") window.scrollTo({ top: 0 });
  else el.scrollIntoView();
  if (id !== "top") {
    (el as HTMLElement).setAttribute("tabindex", "-1");
    (el as HTMLElement).focus({ preventScroll: true });
  }
}
