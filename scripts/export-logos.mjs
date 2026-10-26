// Copies brand SVGs (official colours) from the simple-icons package into public/logos.
// Run: node scripts/export-logos.mjs
import * as si from "simple-icons";
import { writeFileSync, mkdirSync } from "node:fs";
const slugs = ["flask","scikitlearn","claude","tensorflow","resend","python","javascript","typescript","openjdk","postgresql","pytorch","keras","fastapi","django","react","vite","sqlalchemy","leaflet","sqlite","mongodb","git","githubactions","docker","googlecolab","googlecloud","render","vercel","github","tata","udemy","jsonwebtokens"];
mkdirSync("public/logos", { recursive: true });
for (const s of slugs) {
  const icon = si["si" + s[0].toUpperCase() + s.slice(1)];
  if (!icon) { console.warn("missing", s); continue; }
  // Near-black brand colours render as ink so they stay visible on the paper background.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img"><title>${icon.title}</title><path fill="#${icon.hex}" d="${icon.path}"/></svg>`;
  writeFileSync(`public/logos/${s}.svg`, svg);
}
console.log("done");
