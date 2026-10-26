"use client";

import { useState } from "react";
import { PROJECTS, type Project } from "@/lib/data";
import { SectionHead } from "../ui/Reveal";
import { TechLogo } from "../ui/TechLogo";

/* Illustrative grayscale mini-UIs. Labelled so they're never mistaken for screenshots. */
function MiniUI({ kind }: { kind: Project["ui"] }) {
  if (kind === "khusela")
    return (
      <div className="mu-phone">
        <div className="mu-cam"><div className="mu-fruit" /><div className="mu-scan" /></div>
        <div className="mu-row"><span className="mu-pill dark">Class 1</span><span className="mu-pill">Shelf-life · days</span></div>
        <div className="mu-bar"><span style={{ width: "72%" }} /></div>
        <div className="mu-lines"><i style={{ width: "90%" }} /><i style={{ width: "64%" }} /></div>
        <div className="mu-route"><span>Market</span><span>Food bank</span><span>Hold</span></div>
        <div className="mu-langs"><span>EN</span><span>ZU</span><span>XH</span></div>
      </div>
    );
  if (kind === "resifix")
    return (
      <div className="mu-res">
        <div className="mu-res-card">
          <div className="mu-row"><span className="mu-pill dark">Critical</span><span className="mu-pill">Plumbing</span><span className="mu-pill">Block C · Rm 214</span></div>
          <div className="mu-lines"><i style={{ width: "92%" }} /><i style={{ width: "70%" }} /></div>
          <div className="mu-res-alert"><span className="mu-dot" />Matron notified</div>
        </div>
        <div className="mu-res-card">
          <div className="mu-row"><span className="mu-pill dark">Proposal</span><span className="mu-pill">AI-drafted</span></div>
          <div className="mu-lines"><i style={{ width: "84%" }} /><i style={{ width: "58%" }} /></div>
          <div className="mu-vote"><span style={{ width: "68%" }} /></div>
          <div className="mu-row" style={{ justifyContent: "space-between" }}><span className="mu-pill">▲ Support</span><span className="mu-pill">▼ Revise</span></div>
        </div>
        <div className="mu-roles"><span>Student</span><span>Matron</span><span>Admin</span></div>
      </div>
    );
  if (kind === "pgms")
    return (
      <div className="mu-dash">
        <div className="mu-dash-top"><span className="mu-pill dark">Grade</span><span className="mu-pill">Province</span><span className="mu-pill">Market</span></div>
        <div className="mu-map">
          {Array.from({ length: 9 }).map((_, i) => (<span key={i} style={{ opacity: 0.25 + (i % 4) * 0.18 }} />))}
        </div>
        <div className="mu-table">
          {[0.9, 0.7, 0.55].map((w, i) => (<div key={i}><i style={{ width: `${w * 100}%` }} /><b /></div>))}
        </div>
      </div>
    );
  return (
    <div className="mu-layers">
      {["Experience API", "Process API", "System API"].map((l, i) => (
        <div key={l} className="mu-layer" style={{ ["--n" as string]: i }}>
          <span>{l}</span>
          <i />
        </div>
      ))}
      <div className="mu-dw"><span>RAML</span><span>→</span><span>DataWeave</span></div>
    </div>
  );
}

export default function Work() {
  const [open, setOpen] = useState(0);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <style>{`
        .wk { display: flex; gap: 10px; margin-top: 56px; height: clamp(620px, 82svh, 660px); }
        .wk-p { position: relative; flex: 1; min-width: 0; border-radius: 26px; background: var(--card); box-shadow: inset 0 0 0 1px var(--line); overflow: hidden; transition: flex .9s var(--ease), box-shadow .4s var(--ease); cursor: pointer; }
        .wk-p.is-open { flex: 8; cursor: default; box-shadow: inset 0 0 0 1px var(--line), var(--shadow-lg); }
        .wk-spine { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 22px 0; transition: opacity .4s var(--ease); width: 100%; }
        .wk-p.is-open .wk-spine { opacity: 0; pointer-events: none; }
        .wk-spine-n { font-family: var(--font-mono); font-size: 12px; color: var(--mute); }
        .wk-spine-t { writing-mode: vertical-rl; transform: rotate(180deg); font-weight: 700; font-size: 26px; letter-spacing: -0.03em; white-space: nowrap; }
        .wk-plus { width: 38px; height: 38px; border-radius: 99px; box-shadow: inset 0 0 0 1px rgba(13,13,13,.2); display: grid; place-items: center; font-size: 20px; transition: transform .5s var(--ease), background-color .3s; }
        .wk-p:hover .wk-plus { transform: rotate(90deg); background: var(--ink); color: #fff; }
        .wk-body { position: absolute; inset: 0; display: grid; grid-template-columns: minmax(0,1.05fr) minmax(0,1fr); gap: 28px; padding: clamp(24px, 3vw, 40px); opacity: 0; transition: opacity .5s var(--ease); pointer-events: none; min-width: 720px; }
        .wk-p.is-open .wk-body { opacity: 1; transition-delay: .3s; pointer-events: auto; }
        .wk-left { display: flex; flex-direction: column; gap: 12px; overflow: auto; scrollbar-width: none; }
        .wk-k { font-family: var(--font-mono); font-size: 11.5px; color: var(--mute); text-transform: uppercase; letter-spacing: .04em; line-height: 1.5; }
        .wk-t { font-size: clamp(36px, 3.8vw, 58px); font-weight: 700; letter-spacing: -0.05em; line-height: .95; }
        .wk-role { font-size: 14px; font-weight: 600; }
        .wk-d { color: var(--ink-2); line-height: 1.55; font-size: 15px; }
        .wk-f { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 18px; }
        .wk-f li { font-size: 13px; color: var(--ink-2); padding-left: 14px; position: relative; line-height: 1.4; }
        .wk-f li::before { content: ""; position: absolute; left: 0; top: .55em; width: 5px; height: 5px; border-radius: 99px; background: var(--ink); }
        .wk-tech { display: flex; flex-wrap: wrap; gap: 6px; }
        .wk-right { position: relative; border-radius: 20px; background: var(--paper); box-shadow: inset 0 0 0 1px var(--line); display: grid; place-items: center; overflow: hidden; clip-path: inset(0 100% 0 0 round 20px); transition: clip-path 1s var(--ease) .45s; }
        .wk-p.is-open .wk-right { clip-path: inset(0 0 0 0 round 20px); }
        .wk-ill { position: absolute; top: 14px; left: 14px; font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: .08em; color: var(--mute); background: var(--card); padding: 5px 10px; border-radius: 99px; box-shadow: inset 0 0 0 1px var(--line); }

        .mu-phone { width: 210px; background: #fff; border-radius: 28px; padding: 14px; box-shadow: inset 0 0 0 1px var(--line), var(--shadow-lg); display: grid; gap: 10px; }
        .mu-cam { height: 150px; border-radius: 18px; background: #e4e1db; position: relative; overflow: hidden; display: grid; place-items: center; }
        .mu-fruit { width: 72px; height: 72px; border-radius: 50% 50% 46% 54%; background: radial-gradient(circle at 35% 30%, #bdbab4, #6f6c67); }
        .mu-scan { position: absolute; left: 0; right: 0; height: 2px; background: #0d0d0d; top: 20%; animation: scan 2.6s ease-in-out infinite alternate; box-shadow: 0 0 12px 2px rgba(13,13,13,.35); }
        @keyframes scan { to { top: 80%; } }
        .mu-row, .mu-route, .mu-langs, .mu-dash-top, .mu-dw { display: flex; gap: 6px; flex-wrap: wrap; }
        .mu-pill { font-family: var(--font-mono); font-size: 9.5px; padding: 4px 8px; border-radius: 99px; box-shadow: inset 0 0 0 1px var(--line); }
        .mu-pill.dark { background: #0d0d0d; color: #fff; box-shadow: none; }
        .mu-bar { height: 6px; border-radius: 99px; background: var(--soft); overflow: hidden; } .mu-bar span { display: block; height: 100%; background: #3a3a3a; border-radius: 99px; }
        .mu-lines { display: grid; gap: 5px; } .mu-lines i { display: block; height: 6px; border-radius: 99px; background: var(--soft); }
        .mu-route span, .mu-langs span { flex: 1; text-align: center; font-family: var(--font-mono); font-size: 9.5px; padding: 6px 0; border-radius: 10px; background: var(--paper); }
        .mu-route span:first-child { background: #0d0d0d; color: #fff; }
        .mu-res { width: min(86%, 340px); display: grid; gap: 12px; }
        .mu-res-card { background: #fff; border-radius: 18px; padding: 14px; display: grid; gap: 10px; box-shadow: inset 0 0 0 1px var(--line), 0 14px 28px -18px rgba(13,13,13,.4); }
        .mu-res-card:nth-child(2) { margin-left: 22px; }
        .mu-res-alert { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 10px; color: var(--ink-2); }
        .mu-dot { width: 7px; height: 7px; border-radius: 99px; background: #0d0d0d; animation: blink 1.4s ease-in-out infinite; }
        @keyframes blink { 50% { opacity: .2 } }
        .mu-vote { height: 8px; border-radius: 99px; background: var(--soft); overflow: hidden; } .mu-vote span { display: block; height: 100%; background: #3a3a3a; border-radius: 99px; }
        .mu-roles { display: flex; gap: 6px; } .mu-roles span { flex: 1; text-align: center; font-family: var(--font-mono); font-size: 9.5px; padding: 6px 0; border-radius: 10px; background: #fff; box-shadow: inset 0 0 0 1px var(--line); }
        .mu-roles span:first-child { background: #0d0d0d; color: #fff; box-shadow: none; }
        .mu-dash { width: min(86%, 380px); background: #fff; border-radius: 20px; padding: 16px; box-shadow: inset 0 0 0 1px var(--line), var(--shadow-lg); display: grid; gap: 14px; }
        .mu-map { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; } .mu-map span { aspect-ratio: 1.6; border-radius: 10px; background: #0d0d0d; }
        .mu-table { display: grid; gap: 8px; } .mu-table div { display: flex; gap: 10px; align-items: center; } .mu-table i { display: block; height: 8px; border-radius: 99px; background: var(--soft); flex: 1; } .mu-table b { width: 34px; height: 16px; border-radius: 99px; background: #3a3a3a; }
        .mu-layers { width: min(86%, 360px); display: grid; gap: 12px; }
        .mu-layer { background: #fff; border-radius: 16px; padding: 16px 18px; box-shadow: inset 0 0 0 1px var(--line), 0 12px 24px -16px rgba(13,13,13,.35); display: flex; align-items: center; justify-content: space-between; font-family: var(--font-mono); font-size: 12px; margin-left: calc(var(--n) * 18px); }
        .mu-layer i { width: 40px; height: 6px; border-radius: 99px; background: #3a3a3a; opacity: calc(1 - var(--n) * .25); }
        .mu-dw { justify-content: center; font-family: var(--font-mono); font-size: 11px; color: var(--mute); margin-top: 4px; }

        @media (min-width: 901px) and (max-width: 1180px) {
          .wk-body { grid-template-columns: minmax(0,1fr); min-width: 0; }
          .wk-right { display: none; }
        }
        @media (max-width: 900px) {
          .wk { flex-direction: column; height: auto; }
          .wk-p { flex: none !important; height: 84px; transition: height .8s var(--ease); }
          .wk-p.is-open { height: auto; }
          .wk-spine { flex-direction: row; padding: 0 22px; }
          .wk-spine-t { writing-mode: horizontal-tb; transform: none; font-size: 22px; }
          .wk-body { position: relative; grid-template-columns: 1fr; min-width: 0; display: none; }
          .wk-p.is-open .wk-body { display: grid; }
          .wk-p.is-open .wk-spine { display: none; }
          .wk-right { min-height: 320px; padding: 52px 0 22px; }
          .wk-f { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="wrap">
        <SectionHead index="03" label="Selected work" title="Things I've" accent="built." id="work" />
        <div className="wk rv">
          {PROJECTS.map((p, n) => {
            const isOpen = open === n;
            return (
              <article
                key={p.id}
                className={`wk-p ${isOpen ? "is-open" : ""}`}
                onMouseEnter={() => setOpen(n)}
                onClick={() => setOpen(n)}
                aria-labelledby={`wk-${p.id}`}
              >
                <button className="wk-spine" onFocus={() => setOpen(n)} onClick={() => setOpen(n)} aria-expanded={isOpen} aria-controls={`wkb-${p.id}`} tabIndex={isOpen ? -1 : 0}>
                  <span className="wk-spine-n">{p.index}</span>
                  <span className="wk-spine-t">{p.title}</span>
                  <span className="wk-plus" aria-hidden>+</span>
                </button>
                <div className="wk-body" id={`wkb-${p.id}`} aria-hidden={!isOpen}>
                  <div className="wk-left">
                    <span className="wk-k">{p.index} · {p.kicker}</span>
                    <h3 className="wk-t" id={`wk-${p.id}`}>{p.title}</h3>
                    <span className="wk-role">{p.role}</span>
                    <p className="wk-d">{p.description}</p>
                    <ul className="wk-f">{p.features.map((f) => (<li key={f}>{f}</li>))}</ul>
                    <div className="wk-tech">
                      {p.tech.map((t) => (
                        <span key={t.name} className="chip"><TechLogo logo={t.logo} size={14} />{t.name}</span>
                      ))}
                    </div>
                    {(p.link || p.repo) && (
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {p.link && <a className="btn btn-primary" href={p.link.href} target="_blank" rel="noreferrer" tabIndex={isOpen ? 0 : -1}>{p.link.label} <span aria-hidden>↗</span></a>}
                        {p.repo && <a className="btn btn-ghost" href={p.repo.href} target="_blank" rel="noreferrer" tabIndex={isOpen ? 0 : -1}>{p.repo.label} <span aria-hidden>↗</span></a>}
                      </div>
                    )}
                  </div>
                  <div className="wk-right" aria-hidden>
                    <span className="wk-ill">Illustrative UI</span>
                    <MiniUI kind={p.ui} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
