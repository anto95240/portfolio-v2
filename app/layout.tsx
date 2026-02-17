import type { Metadata, Viewport } from "next";
import { Lato, Montserrat_Alternates } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

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
  title: "Antoine Richard | Portfolio",
  description: "Développeur Fullstack - Mon portfolio professionnel",
  manifest: "/manifest.json",
  icons: { icon: "/images/logo.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#4A90E2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${lato.variable} ${montserrat.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}