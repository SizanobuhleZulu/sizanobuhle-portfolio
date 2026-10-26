"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE, ROLES } from "@/lib/data";
import { scrollToTarget, useLenis } from "@/lib/scroll";
import { usePrefersReducedMotion } from "@/lib/hooks";

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const userMuted = useRef(false);
  const visible = useRef(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // 1) try with sound, 2) fall back to muted
    v.muted = false;
    v.play()
      .then(() => setSoundOn(true))
      .catch(() => {
        v.muted = true;
        setBlocked(true);
        v.play().catch(() => {});
      });

    // unlock sound on the first gesture
    const unlock = () => {
      if (userMuted.current || !visible.current) return;
      v.muted = false;
      v.play().then(() => {
        setSoundOn(true);
        setBlocked(false);
      }).catch(() => {});
      remove();
    };
    const evs = ["pointerdown", "keydown", "touchend"] as const;
    const remove = () => evs.forEach((e) => window.removeEventListener(e, unlock));
    evs.forEach((e) => window.addEventListener(e, unlock, { once: true, passive: true }));

    // pause when less than 35% of the hero is visible
    const hero = document.getElementById("hero");
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.intersectionRatio >= 0.35;
        if (visible.current) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );
    if (hero) io.observe(hero);
    return () => {
      remove();
      io.disconnect();
    };
  }, []);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (soundOn) {
      v.muted = true;
      userMuted.current = true;
      setSoundOn(false);
    } else {
      userMuted.current = false;
      v.muted = false;
      v.play().catch(() => {});
      setSoundOn(true);
      setBlocked(false);
    }
  };

  return (
    <div ref={wrapRef} className="hv">
      <video ref={videoRef} className="hv-video" muted loop playsInline preload="auto" aria-label={`${PROFILE.displayName} introducing himself`}>
        <source src="/hero/hero.webm" type="video/webm" />
        <source src="/hero/hero.mp4" type="video/mp4" />
      </video>
      <button type="button" className={`hv-btn ${blocked && !soundOn ? "is-ping" : ""}`} onClick={toggle} aria-label={soundOn ? "Pause sound" : "Play sound"} aria-pressed={soundOn}>
        {soundOn ? (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" /><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden><path d="M8 5.5v13a.6.6 0 0 0 .9.5l10.2-6.5a.6.6 0 0 0 0-1L8.9 5a.6.6 0 0 0-.9.5Z" fill="currentColor" /></svg>
        )}
      </button>
      <p className="sr-only">Transcript: the intro video is a short spoken self-introduction by {PROFILE.displayName}.</p>
    </div>
  );
}

function HeroPlaceholder() {
  return (
    <div className="hv hv-ph" aria-hidden>
      <span className="hv-ph-mark">{PROFILE.initials}</span>
      <span className="hv-ph-note">Intro video slot</span>
    </div>
  );
}

export default function Hero() {
  const lenis = useLenis();
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((n) => (n + 1) % ROLES.length), 3200);
    return () => clearInterval(t);
  }, [reduced]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget(lenis, id);
  };

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <style>{`
        .hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: flex-end; padding-top: 96px; padding-bottom: clamp(28px, 5vh, 56px); overflow: hidden; }
        .hero-ghost { position: absolute; left: 50%; top: 46%; transform: translate(-50%, -50%); font-weight: 800; font-size: clamp(76px, 17.5vw, 300px); letter-spacing: -0.06em; line-height: 1; color: transparent; -webkit-text-stroke: 1.2px rgba(13,13,13,.13); white-space: nowrap; pointer-events: none; user-select: none; }
        .hero-stage { position: absolute; inset: 0; display: grid; place-items: center; padding-top: 70px; pointer-events: none; }
        .hv { position: relative; height: min(96svh, 1040px); aspect-ratio: 768 / 960; max-height: calc(100svh - 120px); pointer-events: auto; }
        .hv-video { width: 100%; height: 100%; object-fit: cover; mix-blend-mode: multiply; -webkit-mask-image: linear-gradient(to right, transparent, #000 14%, #000 86%, transparent), linear-gradient(to bottom, transparent, #000 4%, #000 97%, transparent); -webkit-mask-composite: source-in; mask-image: linear-gradient(to right, transparent, #000 14%, #000 86%, transparent), linear-gradient(to bottom, transparent, #000 4%, #000 97%, transparent); mask-composite: intersect; }
        .hv-btn { position: absolute; right: 12%; bottom: 22%; z-index: 3; width: 46px; height: 46px; border-radius: 99px; background: var(--ink); color: #fff; display: grid; place-items: center; transition: transform .4s var(--ease); }
        .hv-btn:hover { transform: scale(1.06); }
        .hv-btn.is-ping::after { content: ""; position: absolute; inset: -4px; border-radius: 99px; border: 1.5px solid var(--ink); animation: ping 1.8s var(--ease) infinite; }
        @keyframes ping { 0% { transform: scale(.9); opacity: .7 } 100% { transform: scale(1.6); opacity: 0 } }
        .hv-ph { height: min(62svh, 640px); display: grid; place-items: center; align-content: center; gap: 14px; }
        .hv-ph::before { content: ""; position: absolute; inset: 8% 14%; border-radius: 999px 999px 40px 40px; border: 1px dashed rgba(13,13,13,.18); }
        .hv-ph-mark { font-family: var(--font-serif); font-style: italic; font-size: clamp(90px, 13vw, 170px); line-height: .9; color: var(--ink); }
        .hv-ph-note { font-family: var(--font-mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--faint); }
        .hero-bottom { position: relative; z-index: 2; display: grid; grid-template-columns: minmax(0,1fr) min(36vw, 500px) minmax(0,1fr); align-items: end; gap: 24px; pointer-events: none; }
        .hero-bottom > * { pointer-events: auto; }
        .hero-right { grid-column: 3; }
        .hero-kicker { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: .05em; color: var(--mute); margin-bottom: 14px; display: flex; gap: 10px; flex-wrap: wrap; }
        .hero h1 { font-weight: 700; letter-spacing: -0.05em; line-height: .98; font-size: clamp(34px, 3.9vw, 64px); }
        .roles { display: grid; }
        .roles > span { grid-area: 1 / 1; transition: opacity .55s var(--ease) .3s, transform .8s var(--ease) .3s; }
        .roles > span[data-on="false"] { opacity: 0; transform: translateY(.35em); transition-delay: 0s; transition-duration: .3s; }
        .roles .dot { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--mute); }
        .hero-right { justify-self: end; display: flex; flex-direction: column; align-items: flex-end; gap: 16px; text-align: right; }
        .hero-right p { color: var(--ink-2); max-width: 34ch; font-size: 15px; line-height: 1.5; }
        .hero-ctas { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
        @media (max-width: 860px) {
          .hero { justify-content: flex-start; padding-top: 84px; }
          .hero-stage { position: relative; inset: auto; padding-top: 0; }
          .hv { height: min(62svh, 118vw); max-height: none; }
          .hv-ph { height: 46svh; }
          .hero-ghost { top: 34%; }
          .hero-bottom { grid-template-columns: 1fr; margin-top: 8px; }
          .hero-right { grid-column: auto; }
          .hero-right { justify-self: start; align-items: flex-start; text-align: left; }
          .hero-ctas { justify-content: flex-start; }
          .hero h1 { font-size: clamp(30px, 9vw, 44px); }
          .hero-kicker .k-dot, .hero-kicker .k-name { display: none; }
        }
      `}</style>
      <span id="top" />
      <div className="hero-ghost" aria-hidden>{PROFILE.firstName.toUpperCase()}</div>
      <div className="hero-stage">{PROFILE.heroVideo ? <HeroVideo /> : <HeroPlaceholder />}</div>
      <div className="wrap hero-bottom">
        <div className="rv">
          <div className="hero-kicker">
            <span>{PROFILE.discipline}</span>
          </div>
          <h1 id="hero-title">
            <span className="sr-only">{PROFILE.displayName}: {ROLES.map((r) => r.heading).join(", ")}.</span>
            <span className="roles" aria-hidden>
              {ROLES.map((r, n) => (
                <span key={r.key} data-on={n === i}>
                  {r.heading}
                  <span className="dot">.</span>
                </span>
              ))}
            </span>
          </h1>
        </div>
        <div className="hero-right rv" style={{ ["--i" as string]: 2 }}>
          <p>Final-year at the {PROFILE.university}. {PROFILE.availability}, open to relocation.</p>
          <div className="hero-ctas">
            <a href="#work" onClick={go("work")} className="btn btn-primary">Explore work</a>
            <a href="#contact" onClick={go("contact")} className="btn btn-ghost">Let&apos;s talk</a>
            <a href={PROFILE.resume} download className="btn btn-ghost">Résumé <span aria-hidden>↓</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
