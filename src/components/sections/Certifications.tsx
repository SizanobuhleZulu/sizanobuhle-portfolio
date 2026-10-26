"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CERTIFICATIONS } from "@/lib/data";
import { useLenis } from "@/lib/scroll";

/* Preview shown in the empty space under the heading while a row is hovered (mouse/trackpad only). */
function HoverPreview({ index }: { index: number | null }) {
  return (
    <div className={`cp ${index !== null ? "is-on" : ""}`} aria-hidden>
      {CERTIFICATIONS.map((c, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={c.thumb} src={c.thumb} alt="" width={c.width} height={c.height} data-on={i === index} loading="lazy" decoding="async" />
      ))}
    </div>
  );
}

function Viewer({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (d: number) => void }) {
  const c = CERTIFICATIONS[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.documentElement.style.overflow = "";
      prev?.focus({ preventScroll: true });
    };
  }, [lenis, onClose, onStep]);

  return (
    <div className="cv" role="dialog" aria-modal="true" aria-label={c.title} onClick={onClose}>
      <figure className="cv-fig" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={c.image} src={c.image} alt={c.alt} width={c.width} height={c.height} />
        <figcaption>
          <div>
            <p className="cv-t">{c.title}</p>
            <p className="cv-i">{c.issuer}</p>
          </div>
          <div className="cv-actions">
            {c.verify && (
              <a className="btn btn-ghost cv-btn" href={c.verify.href} target="_blank" rel="noreferrer">{c.verify.label} <span aria-hidden>↗</span></a>
            )}
            <span className="cv-count">{String(index + 1).padStart(2, "0")} / {String(CERTIFICATIONS.length).padStart(2, "0")}</span>
          </div>
        </figcaption>
      </figure>
      <button className="cv-nav cv-prev" onClick={(e) => { e.stopPropagation(); onStep(-1); }} aria-label="Previous certificate">←</button>
      <button className="cv-nav cv-next" onClick={(e) => { e.stopPropagation(); onStep(1); }} aria-label="Next certificate">→</button>
      <button ref={closeRef} className="btn btn-primary cv-close" onClick={onClose} aria-label="Close certificate">Close</button>
    </div>
  );
}

export default function Certifications() {
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const n = CERTIFICATIONS.length;
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + n) % n)), [n]);

  return (
    <section id="certifications" className="section ct-band" aria-labelledby="certifications-title">
      <style>{`
        .ct-band { background: var(--card); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .ct { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr); gap: clamp(28px, 5vw, 80px); align-items: start; }
        .ct-head { position: sticky; top: 110px; }
        .ct-count { margin-top: 18px; font-family: var(--font-mono); font-size: 13px; color: var(--mute); }
        .ct-hint { margin-top: 6px; font-size: 13px; color: var(--faint); }
        .ct-list li { border-top: 1px solid var(--line); }
        .ct-list li:last-child { border-bottom: 1px solid var(--line); }
        .ct-row { position: relative; width: 100%; text-align: left; display: grid; grid-template-columns: 56px minmax(0,1fr) auto; gap: 16px; align-items: center; padding: 28px 18px; overflow: hidden; isolation: isolate; border-radius: 4px; cursor: zoom-in; }
        .ct-row::before { content: ""; position: absolute; inset: 0; background: var(--ink); transform: scaleX(0); transform-origin: 0 50%; transition: transform .7s var(--ease); z-index: -1; }
        .ct-row:hover::before, .ct-row:focus-visible::before { transform: scaleX(1); }
        .ct-row:hover, .ct-row:focus-visible { color: #fff; }
        .ct-n { font-family: var(--font-mono); font-size: 13px; color: var(--mute); transition: color .4s; }
        .ct-row:hover .ct-n, .ct-row:focus-visible .ct-n { color: var(--faint); }
        .ct-t { font-size: clamp(19px, 1.9vw, 26px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.2; }
        .ct-i { font-size: 14px; margin-top: 6px; color: var(--mute); transition: color .4s; }
        .ct-row:hover .ct-i, .ct-row:focus-visible .ct-i { color: #cfcdc8; }
        .ct-view { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: .05em; opacity: 0; transform: translateX(-14px); transition: opacity .4s var(--ease), transform .6s var(--ease); white-space: nowrap; }
        .ct-view b { font-size: 20px; font-weight: 400; font-family: var(--font-sans); }
        .ct-row:hover .ct-view, .ct-row:focus-visible .ct-view { opacity: 1; transform: none; }
        .ct-mthumb { display: none; }

        .cp { position: relative; margin-top: 32px; width: min(100%, 340px); height: 300px; pointer-events: none; opacity: 0; transform: translateY(16px) rotate(-3deg) scale(.94); transition: opacity .4s var(--ease), transform .7s var(--ease); }
        .cp.is-on { opacity: 1; transform: rotate(-2deg); }
        .cp img { position: absolute; top: 0; left: 0; width: auto; max-width: 100%; max-height: 100%; height: auto; border-radius: 12px; background: #fff; box-shadow: 0 0 0 1px rgba(13,13,13,.08), 0 30px 60px -24px rgba(13,13,13,.45); opacity: 0; transform: translateY(8px); transition: opacity .35s var(--ease), transform .5s var(--ease); }
        .cp img[data-on="true"] { opacity: 1; transform: none; }
        .ct-hint .t { display: none; }
        @media (hover: none), (pointer: coarse) { .cp { display: none; } .ct-hint .m { display: none; } .ct-hint .t { display: inline; } }

        .cv { position: fixed; inset: 0; z-index: 70; background: rgba(244,242,238,.94); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); display: grid; place-items: center; padding: 72px clamp(16px, 7vw, 110px) 28px; animation: cvIn .45s var(--ease); cursor: zoom-out; }
        @keyframes cvIn { from { opacity: 0 } to { opacity: 1 } }
        .cv-fig { margin: 0; display: flex; flex-direction: column; gap: 16px; max-width: min(1100px, 100%); max-height: 100%; cursor: default; animation: cvPop .55s var(--ease); }
        @keyframes cvPop { from { transform: translateY(18px) scale(.97); opacity: 0 } to { transform: none; opacity: 1 } }
        .cv-fig img { width: auto; max-width: 100%; max-height: calc(100svh - 210px); height: auto; margin: 0 auto; border-radius: 14px; background: #fff; box-shadow: 0 0 0 1px var(--line), var(--shadow-lg); }
        .cv-fig figcaption { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
        .cv-t { font-weight: 700; font-size: 18px; letter-spacing: -0.03em; }
        .cv-i { font-size: 13.5px; color: var(--mute); margin-top: 2px; }
        .cv-actions { display: flex; align-items: center; gap: 14px; }
        .cv-btn { height: 40px; padding: 0 16px; font-size: 14px; }
        .cv-count { font-family: var(--font-mono); font-size: 12px; color: var(--mute); }
        .cv-close { position: absolute; top: 16px; right: var(--gutter); height: 42px; }
        .cv-nav { position: absolute; top: 50%; width: 48px; height: 48px; border-radius: 99px; background: var(--card); box-shadow: inset 0 0 0 1px var(--line), 0 8px 20px -10px rgba(13,13,13,.3); font-size: 20px; translate: 0 -50%; transition: background-color .3s var(--ease), color .3s var(--ease); }
        .cv-nav:hover { background: var(--ink); color: #fff; }
        .cv-prev { left: clamp(10px, 2vw, 32px); } .cv-next { right: clamp(10px, 2vw, 32px); }

        @media (max-width: 860px) {
          .ct { grid-template-columns: 1fr; } .ct-head { position: static; } .cp { display: none; }
          .ct-row { grid-template-columns: 30px minmax(0,1fr) 64px; padding: 20px 8px; gap: 12px; }
          .ct-view { display: none; }
          .ct-mthumb { display: block; width: 64px; height: 48px; object-fit: cover; object-position: top; border-radius: 8px; box-shadow: 0 0 0 1px var(--line); background: #fff; }
          .cv { padding: 68px 12px 20px; }
          .cv-nav { top: auto; bottom: 20px; translate: none; width: 42px; height: 42px; }
          .cv-fig { padding-bottom: 56px; }
          .cv-fig img { max-height: calc(100svh - 260px); }
        }
      `}</style>
      <div className="wrap ct">
        <header className="ct-head rv">
          <span className="tag">04 — Certifications</span>
          <h2 className="h2" id="certifications-title">
            <span className="rv-mask"><span>Always <span className="accent">learning.</span></span></span>
          </h2>
          <p className="ct-count">{String(n).padStart(2, "0")} certificates &amp; awards on record</p>
          <p className="ct-hint"><span className="m">Hover to preview · click to view</span><span className="t">Tap a certificate to view it</span></p>
          <HoverPreview index={open === null ? hover : null} />
        </header>
        <ol className="ct-list" onPointerLeave={() => setHover(null)}>
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.title} className="rv" style={{ ["--i" as string]: i }}>
              <button
                type="button"
                className="ct-row"
                onPointerEnter={(e) => e.pointerType === "mouse" && setHover(i)}
                onFocus={() => setHover(null)}
                onClick={() => { setHover(null); setOpen(i); }}
                aria-haspopup="dialog"
                aria-label={`${c.title}, ${c.issuer}. View certificate`}
              >
                <span className="ct-n">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="ct-t" style={{ display: "block" }}>{c.title}</span>
                  <span className="ct-i" style={{ display: "block" }}>{c.issuer}</span>
                </span>
                <span className="ct-view" aria-hidden>View <b>↗</b></span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ct-mthumb" src={c.thumb} alt="" width={64} height={48} loading="lazy" decoding="async" aria-hidden />
              </button>
            </li>
          ))}
        </ol>
      </div>
      {open !== null && <Viewer index={open} onClose={close} onStep={step} />}
    </section>
  );
}
