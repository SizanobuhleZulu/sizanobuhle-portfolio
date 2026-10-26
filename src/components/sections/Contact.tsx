"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget, useLenis } from "@/lib/scroll";

function HopLine({ text }: { text: string }) {
  return (
    <span className="hop" aria-hidden>
      {Array.from(text).map((c, i) => (
        <span key={i} className="hop-c">{c === " " ? " " : c}</span>
      ))}
    </span>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const lenis = useLenis();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  };

  const badge = "SAY HELLO · SAY HELLO · SAY HELLO · ";

  return (
    <section id="contact" className="section" aria-labelledby="contact-title" style={{ paddingBottom: 40 }}>
      <style>{`
        .ctc-h { font-weight: 800; letter-spacing: -0.055em; line-height: .92; font-size: clamp(52px, 10.5vw, 168px); }
        .hop { display: block; }
        .hop-c { display: inline-block; transition: transform .45s var(--ease); }
        .hop-c:hover { transform: translateY(-0.12em); transition-duration: .15s; }
        .ctc-grid { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 40px; align-items: end; margin-top: 56px; }
        .ctc-mail { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .ctc-mail a { font-size: clamp(22px, 3.4vw, 48px); font-weight: 600; letter-spacing: -0.04em; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 8px; overflow-wrap: anywhere; }
        .ctc-links { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 26px; }
        .badge { width: 150px; height: 150px; position: relative; display: grid; place-items: center; }
        .badge svg { position: absolute; inset: 0; animation: spin 18s linear infinite; }
        .badge-c { width: 58px; height: 58px; border-radius: 99px; background: var(--ink); color: #fff; display: grid; place-items: center; font-size: 22px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .foot { margin-top: clamp(80px, 12vh, 140px); border-top: 1px solid var(--line); padding-top: 22px; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; font-size: 13px; color: var(--mute); font-family: var(--font-mono); }
        .foot a:hover { color: var(--ink); }
        @media (max-width: 760px) { .ctc-grid { grid-template-columns: 1fr; } .badge { width: 120px; height: 120px; } }
      `}</style>
      <div className="wrap">
        <span className="tag rv">07 — Contact</span>
        <h2 className="ctc-h rv" id="contact-title" style={{ marginTop: 18 }}>
          <span className="sr-only">Let&apos;s build something together.</span>
          <HopLine text="Let's build" />
          <span className="hop" aria-hidden>
            {Array.from("something ").map((c, i) => (<span key={i} className="hop-c">{c === " " ? " " : c}</span>))}
            <span className="accent" style={{ fontWeight: 400 }}>
              {Array.from("together.").map((c, i) => (<span key={i} className="hop-c">{c}</span>))}
            </span>
          </span>
        </h2>
        <div className="ctc-grid">
          <div className="rv">
            <div className="ctc-mail">
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              <button className="chip" onClick={copy} aria-label="Copy email address">{copied ? "Copied ✓" : "Copy"}</button>
              <span className="sr-only" aria-live="polite">{copied ? "Email copied to clipboard" : ""}</span>
            </div>
            <div className="ctc-links">
              {PROFILE.phones.map((p) => (<a key={p.href} className="btn btn-ghost" href={p.href}>{p.label}</a>))}
              <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden>↗</span></a>
              {PROFILE.linkedin && (<a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden>↗</span></a>)}
            </div>
          </div>
          <a className="badge rv" href={`mailto:${PROFILE.email}`} aria-label="Say hello by email">
            <svg viewBox="0 0 150 150" aria-hidden>
              <defs><path id="circ" d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" /></defs>
              <text fontFamily="var(--font-mono)" fontSize="11.5" letterSpacing="3.2" fill="#0d0d0d"><textPath href="#circ">{badge}</textPath></text>
            </svg>
            <span className="badge-c" aria-hidden>↗</span>
          </a>
        </div>
        <footer className="foot">
          <span>© {new Date().getFullYear()} {PROFILE.displayName}</span>
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollToTarget(lenis, "top"); }}>Back to top ↑</a>
          <span>Built with Next.js</span>
        </footer>
      </div>
    </section>
  );
}
