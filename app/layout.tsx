import type { Metadata, Viewport } from "next";
import { Lato as GoogleLato, Montserrat_Alternates } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import des styles nécessaires
config.autoAddCss = false; // Désactiver l'ajout automatique des styles

import "./globals.css";

const Lato = GoogleLato({
  subsets: ["latin"],
  variable: "--font-text",
  weight: ["400"],
})

const MontserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Antoine Richard",
  description: "Mon portfolio",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/logo.svg", // Favicon
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#4A90E2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${Lato.className} ${MontserratAlternates.className}`}>
        {children}
      </body>
    </html>
  );
}
