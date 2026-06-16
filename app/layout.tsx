import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Lato, Montserrat_Alternates } from "next/font/google";

import ScrollToTop from "@/components/ui/ScrollToTop";
import { WebVitals } from "@/components/WebVitals";

config.autoAddCss = false;

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-text",
  weight: ["400"],
});

const montserrat = Montserrat_Alternates({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.antoine-richard.fr"),

  title: "Antoine Richard | Portfolio",
  description:
    "Étudiant en informatique passionné par le développement web front-end. Découvrez mes projets, mon parcours et mes compétences.",
  keywords: [
    "Antoine Richard",
    "Portfolio",
    "Développeur Web",
    "Front-end",
    "React",
    "Next.js",
    "Ynov",
  ],
  authors: [{ name: "Antoine Richard" }],
  manifest: "/manifest.json",
  icons: { icon: "/images/logo.svg" },
  openGraph: {
    title: "Antoine Richard | Développeur Front-End",
    description: "Découvrez mes projets web, mes jeux et mon parcours.",
    url: "https://www.antoine-richard.fr/",
    siteName: "Portfolio Antoine Richard",
    images: [
      {
        url: "/images/photo.svg",
        width: 800,
        height: 600,
        alt: "Photo de profil Antoine Richard",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antoine Richard | Développeur Front-End",
    description: "Découvrez mes projets web, mes jeux et mon parcours.",
    images: ["/images/photo.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#4A90E2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Antoine Richard",
    jobTitle: "Développeur Web",
    url: "https://www.antoine-richard.fr",
    sameAs: ["https://github.com/anto95240"],
    image: "https://www.antoine-richard.fr/images/photo.svg",
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${lato.variable} ${montserrat.variable} font-sans`}>
        <WebVitals />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
