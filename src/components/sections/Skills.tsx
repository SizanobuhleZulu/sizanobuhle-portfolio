"use client";

import { useState } from "react";
import { FAMILIES, SKILLS, type Family } from "@/lib/data";
import { SectionHead } from "../ui/Reveal";
import { BRAND_HEX, TechLogo, isBrand } from "../ui/TechLogo";
import { useInView } from "@/lib/hooks";

export default function Skills() {
  const [family, setFamily] = useState<Family | "All">("All");
  const [sel, setSel] = useState(0);
  const [gridRef, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const skill = SKILLS[sel];
  const glow = isBrand(skill.logo) ? BRAND_HEX[skill.logo] ?? "#0d0d0d" : "#0d0d0d";

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <style>{`
        .sk-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 36px; }
        .sk-layout { display: grid; grid-template-columns: minmax(0,1fr) 320px; gap: 28px; margin-top: 28px; align-items: start; }
        .sk-grid { display: grid; grid-template-columns: repeat(8, minmax(0,1fr)); gap: 8px; }
        .el { position: relative; aspect-ratio: 1 / 1.08; border-radius: 14px; background: var(--card); box-shadow: inset 0 0 0 1px var(--line); padding: 9px 10px; text-align: left; display: flex; flex-direction: column; justify-content: space-between; transition: opacity .5s var(--ease), transform .5s var(--ease), background-color .3s var(--ease), color .3s var(--ease), box-shadow .3s var(--ease); opacity: 0; transform: translateY(14px) scale(.96); transition-delay: var(--d); min-width: 0; }
        .is-in .el { opacity: 1; transform: none; }
        .is-in .el[data-dim="true"] { opacity: .22; }
        .el:hover, .el:focus-visible, .el[aria-pressed="true"] { background: var(--ink); color: #fff; box-shadow: none; transition-delay: 0s; }
        .el-n { font-family: var(--font-mono); font-size: 10px; color: var(--mute); }
        .el:hover .el-n, .el[aria-pressed="true"] .el-n, .el:focus-visible .el-n { color: #a9a6a0; }
        .el-s { font-weight: 700; font-size: clamp(18px, 2vw, 28px); letter-spacing: -0.04em; line-height: 1; }
        .el-name { font-size: 11px; font-weight: 500; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .el-fam { font-family: var(--font-mono); font-size: 9px; text-transform: uppercase; color: var(--faint); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .insp { position: sticky; top: 100px; padding: 26px; display: flex; flex-direction: column; gap: 16px; min-height: 420px; }
        .insp-logo { width: 150px; height: 150px; display: grid; place-items: center; margin: 6px auto 4px; position: relative; animation: pop .55s var(--ease); }
        .insp-logo::before { content: ""; position: absolute; inset: 10%; border-radius: 50%; background: var(--glow); opacity: .16; filter: blur(28px); }
        @keyframes pop { from { transform: scale(.7); opacity: 0 } to { transform: none; opacity: 1 } }
        .insp h3 { font-size: 28px; font-weight: 700; letter-spacing: -0.04em; }
        .insp-meta { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; color: var(--mute); text-transform: uppercase; }
        .insp-used { display: flex; flex-wrap: wrap; gap: 6px; }
        @media (max-width: 1080px) { .sk-layout { grid-template-columns: minmax(0,1fr); } .insp { position: relative; top: 0; min-height: 0; } }
        @media (max-width: 640px) { .sk-grid { grid-template-columns: repeat(4, minmax(0,1fr)); } }
      `}</style>
      <div className="wrap">
        <SectionHead index="02" label="Skills" title="The periodic table of my" accent="stack." id="skills" />
        <div className="sk-filters rv" role="group" aria-label="Filter skills by family">
          {(["All", ...FAMILIES] as const).map((f) => (
            <button key={f} className="chip" aria-pressed={family === f} onClick={() => setFamily(f)}>
              {f}
            </button>
          ))}
        </div>
        <div className="sk-layout">
          <div ref={gridRef} className={`sk-grid ${inView ? "is-in" : ""}`}>
            {SKILLS.map((s, n) => {
              const row = Math.floor(n / 8), col = n % 8;
              return (
                <button
                  key={s.name}
                  className="el"
                  data-dim={family !== "All" && s.family !== family}
                  aria-pressed={sel === n}
                  onMouseEnter={() => setSel(n)}
                  onFocus={() => setSel(n)}
                  onClick={() => setSel(n)}
                  style={{ ["--d" as string]: `${(row + col) * 40}ms` }}
                  aria-label={`${s.name}, ${s.family}`}
                >
                  <span className="el-n">{String(n + 1).padStart(2, "0")}</span>
                  <span className="el-s">{s.symbol}</span>
                  <span>
                    <span className="el-name" style={{ display: "block" }}>{s.name}</span>
                    <span className="el-fam" style={{ display: "block" }}>{s.family}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <aside className="card insp" aria-live="polite" aria-label="Skill details">
            <div className="insp-meta"><span>No. {String(sel + 1).padStart(2, "0")}</span><span>{skill.symbol}</span></div>
            <div key={skill.name} className="insp-logo" style={{ ["--glow" as string]: glow }}>
              <TechLogo logo={skill.logo} size={isBrand(skill.logo) ? 112 : 96} title={`${skill.name} logo`} />
            </div>
            <h3>{skill.name}</h3>
            <span className="tag">{skill.family}</span>
            {skill.usedIn.length > 0 && (
              <div>
                <p style={{ fontSize: 13, color: "var(--mute)", marginBottom: 8 }}>Used in</p>
                <div className="insp-used">
                  {skill.usedIn.map((u) => (<span key={u} className="chip">{u}</span>))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
