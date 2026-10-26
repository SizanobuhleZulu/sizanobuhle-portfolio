"use client";

import { createContext, useContext, useState } from "react";
import { SmoothScroll } from "@/lib/scroll";
import { ROLES, type RoleKey } from "@/lib/data";
import { RevealObserver } from "./ui/Reveal";
import Navigation from "./Navigation";
import Hero from "./hero/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Work from "./sections/Work";
import Certifications from "./sections/Certifications";
import Experience from "./sections/Experience";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";

type RoleCtx = { role: RoleKey; setRole: (r: RoleKey) => void };
const RoleContext = createContext<RoleCtx>({ role: ROLES[0].key, setRole: () => {} });
export const useRole = () => useContext(RoleContext);

export default function App() {
  const [role, setRole] = useState<RoleKey>(ROLES[0].key);
  return (
    <SmoothScroll>
      <RoleContext.Provider value={{ role, setRole }}>
        <RevealObserver />
        <a href="#main" className="sr-only">Skip to content</a>
        <Navigation />
        <main id="main">
          <Hero />
          <About />
          <Skills />
          <Work />
          <Certifications />
          <Experience />
          <Achievements />
          <Contact />
        </main>
      </RoleContext.Provider>
    </SmoothScroll>
  );
}
