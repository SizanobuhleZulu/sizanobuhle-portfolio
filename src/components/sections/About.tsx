"use client";

import { useEffect, useRef, useState } from "react";
import { ID_BACK, PROFILE, ROLES } from "@/lib/data";
import { SectionHead } from "../ui/Reveal";
import { useRole } from "../App";
import { prefersReducedMotion } from "@/lib/hooks";

function Barcode() {
  // deterministic decorative bars from the name
  const bars = Array.from(PROFILE.name.replace(/\s/g, "")).map((c, i) => ((c.charCodeAt(0) * (i + 7)) % 4) + 1);
  let x = 0;
  return (
    <svg viewBox={`0 0 ${bars.reduce((a, b) => a + b + 2, 0)} 30`} height="30" preserveAspectRatio="none" style={{ width: 132 }} aria-hidden>
      {bars.map((w, i) => {
        const r = <rect key={i} x={x} y="0" width={w} height="30" fill="#2a2a2a" />;
        x += w + 2;
        return r;
      })}
    </svg>
  );
}

function IdCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
    const { role: roleKey } = useRole();
   const role = ROLES.find((r) => r.key === roleKey) ?? ROLES[0];

  // damped pendulum: pointer velocity -> angular impulse, spring back to rest + idle sway
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = cardRef.current;
    const section = document.getElementById("about");
    if (!el || !section) return;
    let angle = 0, vel = 0, lastX = 0, lastT = 0, lastMove = performance.now(), raf = 0, running = false;
    const k = 0.035, damp = 0.9;
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (lastT) {
        const v = (e.clientX - lastX) / Math.max(8, now - lastT); // px per ms
        vel += Math.max(-1.2, Math.min(1.2, v * 0.9));
      }
      lastX = e.clientX;
      lastT = now;
      lastMove = now;
    };
    const step = (t: number) => {
      const idle = t - lastMove > 1800;
      const target = idle ? Math.sin(t / 1300) * 2.2 : 0;
      vel += (target - angle) * k;
      vel *= damp;
      angle += vel;
      angle = Math.max(-22, Math.min(22, angle));
      el.style.transform = `rotate(${angle.toFixed(3)}deg)`;
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; raf = requestAnimationFrame(step); }
      else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(section);
    section.addEventListener("pointermove", onMove);
    return () => { io.disconnect(); cancelAnimationFrame(raf); section.removeEventListener("pointermove", onMove); };
  }, []);

  return (
    <div className="lan">
      <div className="lan-swing" ref={cardRef}>
        <div className="lan-strap" aria-hidden>
          <div className="lan-strap-text">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>{PROFILE.displayName} · {role.short} · </span>
            ))}
          </div>
        </div>
        <div className="lan-clip" aria-hidden><span /></div>
        <button
          type="button"
          className={`idc ${flipped ? "is-flipped" : ""}`}
          onClick={() => setFlipped((f) => !f)}
          aria-pressed={flipped}
          aria-label={`Developer ID card for ${PROFILE.displayName}. Press to flip.`}
        >
          <div className="idc-face idc-front">
            <div className="idc-band"><span>DEVELOPER ID</span><span className="idc-hole" /></div>
            <div className="idc-photo">
              {PROFILE.portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/portrait-bust.webp" alt={`Portrait of ${PROFILE.displayName}`} width={128} height={156} />
              ) : (
                <span className="idc-initials" aria-hidden>{PROFILE.initials}</span>
              )}
            </div>
            <div className="idc-name">{PROFILE.displayName}</div>
            <div className="idc-role">{role.label}</div>
            <dl className="idc-rows">
              <div><dt>Dept.</dt><dd>CS &amp; Physics</dd></div>
              <div><dt>Institution</dt><dd>UniZulu</dd></div>
              <div><dt>Valid till</dt><dd>{PROFILE.graduation}</dd></div>
            </dl>
            <div className="idc-foot"><Barcode /><span className="idc-holo" aria-hidden /></div>
          </div>
          <div className="idc-face idc-back">
            <div className="idc-band"><span>WHAT I AM</span><span className="idc-hole" /></div>
            <ul className="idc-list">
              {ID_BACK.map((l) => (<li key={l}>{l}</li>))}
            </ul>
            <div className="idc-sign">
              <span className="idc-sig">{PROFILE.displayName}</span>
              <span className="idc-found">If found, say hello · {PROFILE.email}</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default function About() {
  const { role, setRole } = useRole();
  const current = ROLES.find((r) => r.key === role) ?? ROLES[0];

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <style>{`
        .ab-grid { display: grid; grid-template-columns: minmax(0,1fr) 320px minmax(0,1fr); gap: clamp(24px, 3vw, 48px); margin-top: 56px; align-items: stretch; }
        .ab-col { display: flex; flex-direction: column; gap: 22px; }
        .ab-hi { font-size: clamp(26px, 2.4vw, 34px); font-weight: 700; letter-spacing: -0.035em; }
        .ab-pick { display: grid; gap: 10px; }
        .ab-pick-label { font-family: var(--font-mono); font-size: 11.5px; letter-spacing: .04em; text-transform: uppercase; color: var(--mute); }
        .ab-pick-note { font-size: 13px; color: var(--mute); }
        .ab-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .ab-sum { color: var(--ink-2); line-height: 1.62; font-size: 16px; min-height: 12em; }
        .ab-sum p { animation: fadeUp .6s var(--ease); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
        .ab-extra { font-size: 14px; color: var(--mute); }
        .ab-btns { display: flex; flex-wrap: wrap; gap: 10px; margin-top: auto; }

        .lan { position: relative; height: 100%; min-height: 560px; display: flex; justify-content: center; }
        .lan-swing { position: relative; display: flex; flex-direction: column; align-items: center; transform-origin: 50% 0; will-change: transform; margin-top: -56px; }
        .lan-strap { width: 30px; height: 96px; background: #1a1a1a; overflow: hidden; border-radius: 0 0 3px 3px; position: relative; }
        .lan-strap::before { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(90deg, transparent 0 4px, rgba(255,255,255,.04) 4px 5px); }
        .lan-strap-text { writing-mode: vertical-rl; font-family: var(--font-mono); font-size: 9px; letter-spacing: .12em; text-transform: uppercase; color: #cfcfcf; white-space: nowrap; animation: strap 14s linear infinite; padding-left: 9px; }
        @keyframes strap { from { transform: translateY(0) } to { transform: translateY(-50%) } }
        .lan-clip { width: 30px; height: 26px; display: grid; place-items: center; }
        .lan-clip span { width: 22px; height: 22px; border-radius: 6px; background: linear-gradient(180deg,#e2e2e2,#8d8d8d); box-shadow: inset 0 0 0 1px rgba(0,0,0,.25), 0 2px 4px rgba(0,0,0,.2); position: relative; }
        .lan-clip span::after { content: ""; position: absolute; left: 50%; bottom: -8px; width: 2px; height: 10px; background: #8d8d8d; transform: translateX(-50%); }
        .idc { width: 300px; height: 404px; position: relative; transform-style: preserve-3d; transition: transform .9s var(--ease); margin-top: 6px; text-align: left; border-radius: 22px; }
        .idc:hover, .idc.is-flipped { transform: rotateY(180deg); }
        @media (hover: none) { .idc:hover { transform: none; } .idc.is-flipped { transform: rotateY(180deg); } }
        .idc-face { position: absolute; inset: 0; border-radius: 22px; background: var(--card); box-shadow: inset 0 0 0 1px var(--line), var(--shadow-lg); backface-visibility: hidden; -webkit-backface-visibility: hidden; overflow: hidden; display: flex; flex-direction: column; align-items: center; }
        .idc-back { transform: rotateY(180deg); align-items: stretch; }
        .idc-band { width: 100%; height: 46px; background: var(--ink); color: #fff; font-family: var(--font-mono); font-size: 11px; letter-spacing: .16em; display: flex; align-items: center; justify-content: space-between; padding: 0 18px; flex: none; }
        .idc-hole { width: 34px; height: 8px; border-radius: 99px; background: var(--paper); }
        .idc-photo { margin-top: 18px; width: 128px; height: 156px; border-radius: 16px; padding: 3px; background: linear-gradient(160deg, #d9d6d0, #8a8781 60%, #e9e6e0); box-shadow: 0 0 0 6px rgba(13,13,13,.035), 0 14px 30px -14px rgba(13,13,13,.45); overflow: hidden; }
        .idc-photo img, .idc-initials { width: 100%; height: 100%; border-radius: 13px; object-fit: cover; transition: transform .6s var(--ease); }
        .idc-initials { display: grid; place-items: center; background: var(--soft); font-family: var(--font-serif); font-style: italic; font-size: 64px; color: var(--ink-2); }
        .idc:hover .idc-photo img, .idc:hover .idc-initials { transform: scale(1.05); }
        .idc-name { margin-top: 14px; font-weight: 700; font-size: 19px; letter-spacing: -0.03em; }
        .idc-role { font-family: var(--font-mono); font-size: 10.5px; color: var(--mute); text-transform: uppercase; letter-spacing: .06em; margin-top: 3px; text-align: center; padding: 0 18px; }
        .idc-rows { width: 100%; padding: 12px 22px 0; margin: 0; display: grid; gap: 4px; }
        .idc-rows div { display: flex; justify-content: space-between; font-size: 12px; border-bottom: 1px dashed var(--line); padding-bottom: 4px; }
        .idc-rows dt { font-family: var(--font-mono); color: var(--mute); font-size: 10.5px; text-transform: uppercase; }
        .idc-rows dd { margin: 0; font-weight: 600; }
        .idc-foot { margin-top: auto; width: 100%; padding: 0 22px 16px; display: flex; justify-content: space-between; align-items: center; }
        .idc-holo { width: 40px; height: 30px; border-radius: 8px; background: conic-gradient(from 210deg, #f2f2f2, #bdbdbd, #f9f9f9, #9c9c9c, #ececec, #c9c9c9, #f2f2f2); box-shadow: inset 0 0 0 1px rgba(0,0,0,.12); }
        .idc-list { padding: 22px 22px 0; display: grid; gap: 12px; }
        .idc-list li { font-size: 13.5px; line-height: 1.4; padding-left: 16px; position: relative; color: var(--ink-2); }
        .idc-list li::before { content: ""; position: absolute; left: 0; top: .55em; width: 6px; height: 6px; border-radius: 99px; background: var(--ink); }
        .idc-sign { margin-top: auto; padding: 0 22px 18px; display: grid; gap: 6px; }
        .idc-sig { font-family: var(--font-serif); font-style: italic; font-size: 24px; border-bottom: 1px solid var(--ink); padding-bottom: 2px; }
        .idc-found { font-family: var(--font-mono); font-size: 10px; color: var(--mute); }

        .qf { display: grid; }
        .qf div { display: grid; grid-template-columns: 110px 1fr; gap: 12px; padding: 14px 0; border-top: 1px solid var(--line); font-size: 15px; }
        .qf div:last-child { border-bottom: 1px solid var(--line); }
        .qf dt { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: .05em; color: var(--mute); padding-top: 3px; }
        .qf dd { margin: 0; font-weight: 500; overflow-wrap: anywhere; }
        .ab-quote { font-family: var(--font-serif); font-style: italic; font-size: clamp(24px, 2.2vw, 30px); line-height: 1.2; letter-spacing: -0.01em; margin-top: auto; }
        .ab-quote::before { content: "“"; } .ab-quote::after { content: "”"; }
        @media (max-width: 1080px) {
          .ab-grid { grid-template-columns: minmax(0,1fr) minmax(0,1fr); }
          .lan { grid-column: 2; grid-row: 1 / span 2; }
        }
        @media (max-width: 760px) {
          .ab-grid { grid-template-columns: minmax(0,1fr); }
          .lan { grid-column: auto; grid-row: auto; min-height: 540px; order: -1; }
        }
      `}</style>
      <div className="wrap">
        <SectionHead index="01" label="About" title="A little about" accent="me." id="about" />
        <div className="ab-grid">
          <div className="ab-col rv">
            <p className="ab-hi">Hi, I&apos;m {PROFILE.firstName}.</p>
            <div className="ab-pick">
              <p className="ab-pick-label" id="ab-pick-label">Select the role you&apos;re hiring for</p>
              <div className="ab-chips" role="group" aria-labelledby="ab-pick-label">
              {ROLES.map((r) => (
                <button key={r.key} className="chip" aria-pressed={role === r.key} onClick={() => setRole(r.key)}>
                  {r.short}
                </button>
              ))}
            </div>
              <p className="ab-pick-note">The summary and the CV download below update to match.</p>
            </div>
            <div className="ab-sum" aria-live="polite">
              <p key={current.key}>{current.summary}</p>
            </div>
            <p className="ab-extra">Member of the Computer Science Society, {PROFILE.university}.</p>
            <div className="ab-btns">
              <a className="btn btn-primary" href={current.resume} download>Résumé · {current.short} <span aria-hidden>↓</span></a>
              <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden>↗</span></a>
              {PROFILE.linkedin && (
                <a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden>↗</span></a>
              )}
            </div>
          </div>
          <IdCard />
          <div className="ab-col rv" style={{ ["--i" as string]: 2 }}>
            <span className="tag">Quick facts</span>
            <dl className="qf">
              <div><dt>Location</dt><dd>{PROFILE.location} · {PROFILE.relocation.toLowerCase()}</dd></div>
              <div><dt>Education</dt><dd>{PROFILE.degree}, {PROFILE.university} (2023 – 2026)</dd></div>
              <div><dt>Now</dt><dd>Final-year student · PGMS capstone group leader</dd></div>
              <div><dt>Available</dt><dd>From January 2027</dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${PROFILE.email}`} style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>{PROFILE.email}</a></dd></div>
            </dl>
            <p className="ab-quote">{PROFILE.quote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
