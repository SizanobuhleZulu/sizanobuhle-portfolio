"use client";

import { TIMELINE } from "@/lib/data";
import { SectionHead } from "../ui/Reveal";
import { useScrollProgress } from "@/lib/hooks";
import { scrollToTarget, useLenis } from "@/lib/scroll";

export default function Experience() {
  const [ref, p] = useScrollProgress<HTMLDivElement>();
  const lenis = useLenis();
  const n = TIMELINE.length;

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <style>{`
        .tl { position: relative; margin-top: 64px; } .tl-list { display: grid; gap: 18px; }
        .tl::before { content: ""; position: absolute; left: 119px; top: 8px; bottom: 8px; width: 1px; background: var(--line); }
        .tl-spine { position: absolute; left: 119px; top: 8px; bottom: 8px; width: 2px; margin-left: -.5px; background: var(--ink); transform-origin: 50% 0; }
        .tl-item { position: relative; display: grid; grid-template-columns: 96px 48px minmax(0,1fr); align-items: start; opacity: .35; transition: opacity .6s var(--ease); }
        .tl-item.is-lit { opacity: 1; }
        .tl-year { font-family: var(--font-mono); font-size: 14px; padding-top: 22px; text-align: right; }
        .tl-dot { width: 13px; height: 13px; border-radius: 99px; background: var(--paper); box-shadow: inset 0 0 0 2px var(--faint); margin: 26px auto 0; position: relative; z-index: 1; transition: box-shadow .5s var(--ease), background-color .5s var(--ease), transform .5s var(--ease); }
        .tl-item.is-lit .tl-dot { background: var(--ink); box-shadow: 0 0 0 5px rgba(13,13,13,.08); transform: scale(1.1); }
        .tl-card { padding: 22px 26px; }
        .tl-kind { font-family: var(--font-mono); font-size: 10.5px; text-transform: uppercase; letter-spacing: .06em; color: var(--mute); }
        .tl-title { font-size: clamp(20px, 2vw, 26px); font-weight: 700; letter-spacing: -0.03em; margin-top: 6px; }
        .tl-place { font-size: 14px; color: var(--mute); margin-top: 2px; }
        .tl-detail { font-size: 15px; color: var(--ink-2); line-height: 1.55; margin-top: 10px; max-width: 70ch; }
        .tl-next { border: 1.5px dashed rgba(13,13,13,.25); border-radius: 26px; padding: 26px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .tl-next p { font-size: clamp(24px, 2.6vw, 34px); font-weight: 700; letter-spacing: -0.04em; }
        @media (max-width: 640px) {
          .tl::before, .tl-spine { left: 6px; }
          .tl-item { grid-template-columns: 26px minmax(0,1fr); }
          .tl-year { grid-column: 2; text-align: left; padding: 0 0 6px; }
          .tl-dot { grid-row: 1 / span 2; grid-column: 1; margin: 4px 0 0; }
          .tl-card { grid-column: 2; padding: 18px 20px; }
        }
      `}</style>
      <div className="wrap">
        <SectionHead index="05" label="Experience" title="Education & work, one" accent="path." id="experience" />
        <div className="tl" ref={ref}>
          <span className="tl-spine" aria-hidden style={{ transform: `scaleY(${p})` }} />
          <ol className="tl-list">
          {TIMELINE.map((t, i) => (
            <li key={t.year + t.title} className={`tl-item ${p >= (i + 0.3) / (n + 0.6) ? "is-lit" : ""}`}>
              <span className="tl-year">{t.year}</span>
              <span className="tl-dot" aria-hidden />
              <div className="card tl-card">
                <span className="tl-kind">{t.kind === "education" ? "Education" : t.kind === "competition" ? "Competition" : "Experience"}</span>
                <h3 className="tl-title">{t.title}</h3>
                <p className="tl-place">{t.place}</p>
                <p className="tl-detail">{t.detail}</p>
              </div>
            </li>
          ))}
          <li className={`tl-item ${p > 0.92 ? "is-lit" : ""}`}>
            <span className="tl-year">2027</span>
            <span className="tl-dot" aria-hidden />
            <div className="tl-next">
              <p>Next — <span className="accent">Your team?</span></p>
              <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollToTarget(lenis, "contact"); }}>Get in touch</a>
            </div>
          </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
