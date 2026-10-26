import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PROFILE, ROLES } from "@/lib/data";

const interTight = localFont({
  src: "../fonts/InterTight-Variable.woff2",
  variable: "--font-inter-tight",
  weight: "100 900",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains-mono",
  weight: "100 800",
  display: "swap",
});

const title = `${PROFILE.displayName} · ${PROFILE.discipline}`;
const description = ROLES[0].summary.split(". ").slice(0, 2).join(". ") + ".";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://sizanobuhle-portfolio.vercel.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: PROFILE.displayName }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
