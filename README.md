# Sizanobuhle Zulu: Talking-Video Portfolio

A one-page personal portfolio built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 and Lenis.
All text comes from the four CVs in `public/resume/`, and every string lives in `src/lib/data.ts`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

Needs Node 18.18+ (Node 20 or 22 recommended).

## Sections

| # | Section | Component | What it does |
|---|---------|-----------|--------------|
| — | Navigation | `Navigation.tsx` | Initials mark, frosted pill after 40 px, sliding active indicator, scroll-progress bar, full-screen mobile menu (Esc closes) |
| — | Hero | `hero/Hero.tsx` | Looping talking video (or placeholder), outlined ghost first name, heading cycling through the four CV specialties |
| 01 | About | `sections/About.tsx` | CV switcher (Backend / ML & Data / Integration / Full-stack) showing each CV's summary verbatim; swinging, flipping lanyard ID card; quick facts |
| 02 | Skills | `sections/Skills.tsx` | "Periodic table" of 40 skills, family filters, diagonal wave reveal, sticky logo inspector |
| 03 | Work | `sections/Work.tsx` | Expanding accordion: Khusela, PGMS, TradeBridge, each with a labelled illustrative mini-UI |
| 04 | Certifications | `sections/Certifications.tsx` | Ink-flood list |
| 05 | Experience | `sections/Experience.tsx` | Scroll-drawn timeline, education and work combined |
| 06 | Achievements | `sections/Achievements.tsx` | Pinned horizontal gallery with count-up numbers |
| 07 | Contact | `sections/Contact.tsx` | Hopping-letter heading, copy-email chip, spinning badge, footer |

## Adding the intro video (hero)

1. Generate the video (8–15 s, 16:9, plain white background, you centred, short pause at start and end).
2. Install `ffmpeg` and `pip install numpy`.
3. Run:

   ```bash
   python scripts/build-hero-assets.py path/to/intro.mp4
   # if auto-detection crops badly, pass it manually:
   python scripts/build-hero-assets.py intro.mp4 --crop 800:1000:560:80
   # optional: use a photo for the ID card portrait
   python scripts/build-hero-assets.py intro.mp4 --photo me.jpg
   ```

   This writes `public/hero/hero.mp4`, `public/hero/hero.webm`, `public/portrait-bust.webp` and `public/og.jpg`.
   The loop is made seamless by cross-fading the last 0.5 s into the first 0.5 s, for both picture and
   audio (audio in numpy, equal-power). The clip is never stretched, so lips stay in sync.
4. In `src/lib/data.ts` set `heroVideo: true` and `portrait: true`.

Video behaviour: it tries to play with sound and falls back to muted if the browser blocks that. The
first click, key press or tap unlocks sound. It pauses when less than 35% of the hero is visible.

## Editing content

Everything is in `src/lib/data.ts`:

- `ROLES`: the four CV variants (heading, verbatim summary, matching PDF)
- `PROFILE`: contact details, GitHub and LinkedIn links
- `SKILLS`, `PROJECTS`, `CERTIFICATIONS`, `TIMELINE`, `ACHIEVEMENTS`, `ID_BACK`

Rule: nothing goes on the site that isn't on a CV.

## Deploying

Live at **https://sizanobuhle-portfolio.vercel.app**. The Vercel project is connected to this GitHub repo,
so every push to `main` redeploys automatically.

## Credits and licences

- Fonts (self-hosted in `src/fonts`): Inter Tight, Instrument Serif, JetBrains Mono, all SIL Open Font License 1.1, via Fontsource.
- Brand logos (`public/logos`): Simple Icons, CC0 1.0. See `public/logos/LICENSE.md`. Trademarks belong to their owners.
  MuleSoft, Azure, VS Code and PayFast use neutral line icons because Simple Icons doesn't ship them.
- Concept icons: drawn for this site.
