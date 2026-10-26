"use client";

import { useEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { scrollToTarget, useLenis } from "@/lib/scroll";

export default function Navigation() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const progRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  // scrolled state + progress bar
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progRef.current) progRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  // active section
  useEffect(() => {
    const ids = NAV.map((n) => n.id as string);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const els = [...ids, "hero", "certifications"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // indicator pill position
  useEffect(() => {
    const ul = linksRef.current;
    if (!ul) return;
    const a = ul.querySelector<HTMLAnchorElement>(`a[data-id="${active}"]`);
    if (!a) return setPill(null);
    setPill({ x: a.offsetLeft, w: a.offsetWidth });
  }, [active, scrolled]);

  // mobile overlay: lock scroll + Esc
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => scrollToTarget(lenis, id));
  };

  return (
    <>
      <style>{`
        .nav { position: fixed; inset: 0 0 auto 0; z-index: 50; pointer-events: none; }
        .nav-prog { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--ink); transform-origin: 0 50%; transform: scaleX(0); }
        .nav-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-top: 18px; }
        .nav-brand { pointer-events: auto; display: flex; align-items: center; gap: 12px; }
        .nav-mark { width: 44px; height: 44px; border-radius: 99px; display: grid; place-items: center; font-family: var(--font-mono); font-size: 13px; font-weight: 600; box-shadow: inset 0 0 0 1.5px var(--ink); background: var(--paper); transition: background-color .4s var(--ease), color .4s var(--ease), transform .8s var(--ease); }
        .nav-brand:hover .nav-mark { transform: rotate(360deg); }
        .nav.is-scrolled .nav-mark { background: var(--ink); color: #fff; }
        .nav-name { font-weight: 600; letter-spacing: -0.02em; font-size: 15px; transition: opacity .4s var(--ease), transform .4s var(--ease); }
        .nav.is-scrolled .nav-name { opacity: 0; transform: translateX(-8px); pointer-events: none; }
        .nav-pill { pointer-events: auto; position: relative; display: flex; padding: 5px; border-radius: 999px; transition: background-color .4s var(--ease), box-shadow .4s var(--ease); }
        .nav.is-scrolled .nav-pill { background: rgba(255,255,255,.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: inset 0 0 0 1px var(--line), 0 10px 30px -18px rgba(13,13,13,.35); }
        .nav-pill ul { display: flex; position: relative; z-index: 1; }
        .nav-ind { position: absolute; top: 5px; bottom: 5px; left: 5px; border-radius: 999px; background: var(--ink); transition: transform .55s var(--ease), width .55s var(--ease), opacity .3s; z-index: 0; }
        .nav-pill a { position: relative; z-index: 1; display: block; padding: 9px 15px; font-size: 14px; font-weight: 500; border-radius: 999px; color: var(--ink-2); transition: color .35s var(--ease); }
        .nav-pill a[aria-current="true"] { color: #fff; }
        .nav-pill a:not([aria-current="true"]):hover { color: var(--ink); }
        .nav-menu { display: none; pointer-events: auto; }
        .ovl { position: fixed; inset: 0; z-index: 60; background: var(--paper); clip-path: circle(0% at calc(100% - 52px) 40px); transition: clip-path .8s var(--ease); display: flex; flex-direction: column; padding: 90px var(--gutter) 40px; }
        .ovl.is-open { clip-path: circle(150% at calc(100% - 52px) 40px); }
        .ovl a { display: flex; align-items: baseline; gap: 16px; font-weight: 700; font-size: clamp(38px, 11vw, 64px); letter-spacing: -0.045em; line-height: 1.12; opacity: 0; transform: translateY(24px); transition: opacity .6s var(--ease), transform .6s var(--ease); transition-delay: calc(var(--i) * 60ms + 150ms); }
        .ovl.is-open a { opacity: 1; transform: none; }
        .ovl a small { font-family: var(--font-mono); font-size: 12px; font-weight: 400; color: var(--mute); letter-spacing: 0; }
        .ovl-close { position: absolute; top: 18px; right: var(--gutter); }
        @media (max-width: 860px) {
          .nav-pill { display: none; }
          .nav-menu { display: inline-flex; }
          .nav.is-scrolled .nav-menu { background: rgba(255,255,255,.75); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        }
      `}</style>
      <nav className={`nav ${scrolled ? "is-scrolled" : ""}`} aria-label="Primary">
        <div className="nav-prog" ref={progRef} aria-hidden />
        <div className="wrap nav-row">
          <a href="#top" onClick={go("top")} className="nav-brand" aria-label={`${PROFILE.displayName}, back to top`}>
            <span className="nav-mark" aria-hidden>{PROFILE.initials}</span>
            <span className="nav-name">{PROFILE.displayName}</span>
          </a>
          <div className="nav-pill">
            <span className="nav-ind" aria-hidden style={{ width: pill?.w ?? 0, transform: `translateX(${pill?.x ?? 0}px)`, opacity: pill ? 1 : 0 }} />
            <ul ref={linksRef}>
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} data-id={n.id} onClick={go(n.id)} aria-current={active === n.id ? "true" : undefined}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <button className="btn btn-ghost nav-menu" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu-overlay" style={{ height: 42 }}>
            Menu
          </button>
        </div>
      </nav>
      <div id="menu-overlay" className={`ovl ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open} inert={!open}>
        <button className="btn btn-primary ovl-close" onClick={() => setOpen(false)} style={{ height: 42 }}>
          Close
        </button>
        {NAV.map((n, i) => (
          <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} style={{ ["--i" as string]: i }}>
            <small>{String(i + 1).padStart(2, "0")}</small>
            {n.label}
          </a>
        ))}
      </div>
    </>
  );
}
