"use client";

import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS, type Achievement } from "@/lib/data";
import { BRAND_HEX, TechLogo, isBrand } from "../ui/TechLogo";
import { prefersReducedMotion, useInView } from "@/lib/hooks";

function format(a: Achievement, v: number) {
  const n = a.decimals ? v.toFixed(a.decimals) : Math.round(v).toLocaleString("en-ZA").replace(/ /g, ",").replace(/\s/g, ",");
  return `${a.prefix ?? ""}${n}${a.suffix ?? ""}`;
}

function Counter({ a }: { a: Achievement }) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) return setV(a.value);
    const start = performance.now(), dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      setV(a.value * (1 - Math.pow(1 - k, 4)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, a.value]);
  return <span ref={ref} aria-label={format(a, a.value)}>{format(a, v)}</span>;
}

export default function Achievements() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [h, setH] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [focus, setFocus] = useState(0);
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) { setPinned(false); return; }
    let travel = 0, raf = 0;
    const measure = () => {
      const t = track.current;
      if (!t) return;
      travel = Math.max(0, t.scrollWidth - window.innerWidth);
      setH(window.innerHeight + travel);
    };
    const tick = () => {
      raf = 0;
      const o = outer.current, t = track.current;
      if (!o || !t) return;
      const r = o.getBoundingClientRect();
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
      t.style.transform = `translate3d(${-p * travel}px,0,0)`;
      setProgress(p);
      // card nearest the viewport centre
      const cx = window.innerWidth / 2;
      let best = 0, bd = Infinity;
      t.querySelectorAll<HTMLElement>(".ach-card").forEach((c, i) => {
        const b = c.getBoundingClientRect();
        const d = Math.abs(b.left + b.width / 2 - cx);
        if (d < bd) { bd = d; best = i; }
      });
      setFocus(best);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    measure(); tick();
    const onResize = () => { measure(); on(); };
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", onResize); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="achievements" ref={outer} aria-labelledby="achievements-title" style={{ height: pinned && h ? h : undefined, position: "relative" }}>
      <style>{`
        .ach-pin { position: sticky; top: 0; height: 100svh; display: flex; flex-direction: column; justify-content: center; overflow: hidden; padding: 90px 0 40px; }
        .ach-static .ach-pin { position: relative; height: auto; padding: clamp(96px,14vh,160px) 0; }
        .ach-static .ach-track { overflow-x: auto; scroll-snap-type: x mandatory; }
        .ach-head { display: flex; justify-content: space-between; align-items: end; gap: 24px; flex-wrap: wrap; }
        .ach-prog { width: 160px; height: 2px; background: var(--line); border-radius: 99px; overflow: hidden; }
        .ach-prog span { display: block; height: 100%; background: var(--ink); transform-origin: 0 50%; }
        .ach-track { display: flex; gap: 22px; padding: 44px var(--gutter) 30px; will-change: transform; width: max-content; }
        .ach-card { flex: none; width: clamp(340px, 40vw, 540px); height: clamp(260px, 36vh, 310px); border-radius: 28px; background: var(--card); box-shadow: inset 0 0 0 1px var(--line), 0 18px 40px -30px rgba(13,13,13,.35); padding: 24px; display: grid; grid-template-rows: auto 1fr; transition: transform .6s var(--ease), box-shadow .6s var(--ease); scroll-snap-align: center; }
        .ach-card.is-focus { transform: translateY(-12px); box-shadow: inset 0 0 0 1px var(--line), 0 40px 70px -30px rgba(13,13,13,.4); }
        .ach-top { display: flex; justify-content: space-between; align-items: start; }
        .ach-logo { width: 72px; height: 72px; border-radius: 20px; display: grid; place-items: center; background: var(--paper); position: relative; }
        .ach-logo::before { content: ""; position: absolute; inset: 6px; border-radius: 50%; background: var(--glow); opacity: .14; filter: blur(14px); transition: opacity .6s var(--ease); }
        .ach-card.is-focus .ach-logo::before { opacity: .32; }
        .ach-idx { font-family: var(--font-mono); font-size: 12px; color: var(--mute); }
        .ach-bottom { display: flex; justify-content: space-between; align-items: end; gap: 12px; align-self: end; }
        .ach-label { font-weight: 700; font-size: 18px; letter-spacing: -0.03em; }
        .ach-cap { font-size: 13.5px; color: var(--ink-2); margin-top: 4px; }
        .ach-det { font-family: var(--font-mono); font-size: 11px; color: var(--mute); margin-top: 8px; }
        .ach-num { font-weight: 700; font-size: clamp(48px, 5.4vw, 84px); letter-spacing: -0.06em; line-height: .9; font-variant-numeric: tabular-nums; white-space: nowrap; }
        .ach-end { flex: none; align-self: center; font-family: var(--font-serif); font-style: italic; font-size: clamp(28px, 3vw, 44px); color: var(--mute); padding: 0 40px; white-space: nowrap; }
        @media (max-width: 640px) { .ach-card { width: 82vw; } .ach-bottom { flex-direction: column-reverse; align-items: flex-start; } }
      `}</style>
      <div className={pinned ? "" : "ach-static"} style={{ height: "100%" }}>
        <div className="ach-pin">
          <div className="wrap ach-head">
            <div className="rv">
              <span className="tag">06 — Achievements</span>
              <h2 className="h2" id="achievements-title">
                <span className="rv-mask"><span>By the <span className="accent">numbers.</span></span></span>
              </h2>
            </div>
            <div className="ach-prog" aria-hidden><span style={{ transform: `scaleX(${progress})` }} /></div>
          </div>
          <div ref={track} className="ach-track">
            {ACHIEVEMENTS.map((a, i) => (
              <article key={a.label} className={`ach-card ${focus === i ? "is-focus" : ""}`}>
                <div className="ach-top">
                  <span className="ach-logo" style={{ ["--glow" as string]: isBrand(a.logo) ? BRAND_HEX[a.logo] ?? "#0d0d0d" : "#0d0d0d" }}>
                    <TechLogo logo={a.logo} size={40} />
                  </span>
                  <span className="ach-idx">{String(i + 1).padStart(2, "0")} / {String(ACHIEVEMENTS.length).padStart(2, "0")}</span>
                </div>
                <div className="ach-bottom">
                  <div>
                    <h3 className="ach-label">{a.label}</h3>
                    <p className="ach-cap">{a.caption}</p>
                    <p className="ach-det">{a.detail}</p>
                  </div>
                  <span className="ach-num"><Counter a={a} /></span>
                </div>
              </article>
            ))}
            <span className="ach-end">and counting →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
