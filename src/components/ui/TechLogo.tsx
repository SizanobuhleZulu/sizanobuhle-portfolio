/* Brand logos (public/logos, Simple Icons, official colours) and custom thin-line concept icons. */

export const BRAND = new Set([
  "python", "javascript", "typescript", "openjdk", "postgresql", "pytorch", "keras", "fastapi", "django",
  "react", "vite", "sqlalchemy", "leaflet", "sqlite", "mongodb", "git", "githubactions", "docker",
  "googlecolab", "googlecloud", "render", "vercel", "github", "tata", "udemy", "jsonwebtokens",
  "flask", "scikitlearn", "claude", "tensorflow", "resend",
]);

export const BRAND_HEX: Record<string, string> = {
  python: "#3776AB", javascript: "#F7DF1E", typescript: "#3178C6", openjdk: "#5382A1", postgresql: "#4169E1",
  pytorch: "#EE4C2C", keras: "#D00000", fastapi: "#009688", django: "#092E20", react: "#61DAFB", vite: "#9135FF",
  sqlalchemy: "#D71F00", leaflet: "#199900", sqlite: "#003B57", mongodb: "#47A248", git: "#F03C2E",
  githubactions: "#2088FF", docker: "#2496ED", googlecolab: "#F9AB00", googlecloud: "#4285F4", tata: "#486AAE",
  udemy: "#A435F0", flask: "#3BABC3", scikitlearn: "#F7931E", claude: "#D97757", tensorflow: "#FF6F00",
};

export const isBrand = (logo: string) => BRAND.has(logo);

const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const CONCEPT: Record<string, React.ReactNode> = {
  "c:sql": (<><ellipse cx="12" cy="6" rx="7" ry="2.6" {...s} /><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6" {...s} /></>),
  "c:db": (<><rect x="4" y="4" width="16" height="5" rx="1.5" {...s} /><rect x="4" y="10" width="16" height="5" rx="1.5" {...s} /><rect x="4" y="16" width="16" height="4" rx="1.5" {...s} /><path d="M7 6.5h.01M7 12.5h.01" {...s} /></>),
  "c:cloud": (<path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 9.3 4.4 4.4 0 0 0 7 18Z" {...s} />),
  "c:code": (<><path d="M9 7 4 12l5 5M15 7l5 5-5 5" {...s} /></>),
  "c:mule": (<><circle cx="12" cy="12" r="8.5" {...s} /><path d="M7.5 15V9.5l4.5 5 4.5-5V15" {...s} /></>),
  "c:spec": (<><path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20V3.5Z" {...s} /><path d="M14 3.5V8h4M9.5 12h5M9.5 15h5M9.5 18h3" {...s} /></>),
  "c:transform": (<><path d="M4 8h12l-3-3M20 16H8l3 3" {...s} /></>),
  "c:pay": (<><rect x="3.5" y="6" width="17" height="12" rx="2" {...s} /><path d="M3.5 10h17M7 14.5h3" {...s} /></>),
  "c:api": (<><path d="M8 4c-2 0-2 2-2 4s-2 4-2 4 2 0 2 4 0 4 2 4M16 4c2 0 2 2 2 4s2 4 2 4-2 0-2 4 0 4-2 4" {...s} /><circle cx="12" cy="12" r="1.2" {...s} /></>),
  "c:nn": (<><circle cx="5" cy="7" r="1.6" {...s} /><circle cx="5" cy="17" r="1.6" {...s} /><circle cx="12" cy="5" r="1.6" {...s} /><circle cx="12" cy="12" r="1.6" {...s} /><circle cx="12" cy="19" r="1.6" {...s} /><circle cx="19" cy="12" r="1.6" {...s} /><path d="M6.5 7.5 10.5 5.5M6.5 7.5l4 4M6.5 16.5l4-4M6.5 16.5l4 2M13.5 5.5l4 5.5M13.5 12h4M13.5 18.5l4-5.5" {...s} /></>),
  "c:transfer": (<><rect x="3" y="5" width="7" height="14" rx="2" {...s} /><rect x="14" y="5" width="7" height="14" rx="2" {...s} /><path d="M10 12h4M12.5 10.5 14 12l-1.5 1.5" {...s} /></>),
  "c:ood": (<><circle cx="10" cy="10" r="6" {...s} /><path d="M7.5 10h5M14.5 14.5 20 20" {...s} /><circle cx="19" cy="6" r="1.4" {...s} /></>),
  "c:layers": (<><path d="m12 4 8.5 4.5L12 13 3.5 8.5 12 4Z" {...s} /><path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" {...s} /></>),
  "c:event": (<><path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" {...s} /></>),
  "c:cicd": (<><path d="M6.5 9a6 6 0 0 1 10.6-2.2L19 9M17.5 15a6 6 0 0 1-10.6 2.2L5 15" {...s} /><path d="M19 4.5V9h-4.5M5 19.5V15h4.5" {...s} /></>),
  "c:trophy": (<><path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H4.5c0 3 1.5 4.5 3.7 4.8M16 6h3.5c0 3-1.5 4.5-3.7 4.8M12 13v4M8.5 20h7M9.5 17h5" {...s} /></>),
  "c:image": (<><rect x="3.5" y="5" width="17" height="14" rx="2" {...s} /><circle cx="9" cy="10" r="1.6" {...s} /><path d="m4 17 5-4.5 3.5 3 3-2.5L20 17" {...s} /></>),
};

export function TechLogo({ logo, size = 24, title, className }: { logo: string; size?: number; title?: string; className?: string }) {
  if (isBrand(logo)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={`/logos/${logo}.svg`} width={size} height={size} alt={title ?? ""} loading="lazy" decoding="async" className={className} style={{ width: size, height: size }} />
    );
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} className={className} style={{ color: "var(--ink)" }}>
      {CONCEPT[logo] ?? CONCEPT["c:code"]}
    </svg>
  );
}
