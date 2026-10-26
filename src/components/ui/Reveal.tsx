"use client";

import { useEffect } from "react";

/** Global observer: adds .is-in to every .rv / .rv-mask once it enters the viewport. */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    const scan = () => document.querySelectorAll(".rv:not(.is-in), .rv-mask:not(.is-in)").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}

export function SectionHead({ index, label, title, accent, id, children }: { index: string; label: string; title: string; accent: string; id: string; children?: React.ReactNode }) {
  return (
    <header className="rv" style={{ maxWidth: 980 }}>
      <span className="tag">
        {index} — {label}
      </span>
      <h2 className="h2" id={`${id}-title`}>
        <span className="rv-mask">
          <span>
            {title} <span className="accent">{accent}</span>
          </span>
        </span>
      </h2>
      {children}
    </header>
  );
}
