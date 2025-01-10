import type { Metadata } from "next";
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
  icons: {
    icon: "/images/logo.svg", // Favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${Lato.className} ${MontserratAlternates.className}`}>{children}</body>
    </html>
  );
}
