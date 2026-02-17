import withPWA from "@ducanh2912/next-pwa";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Désactiver swcMinify résout souvent les problèmes de helpers manquants dans le SW
  swcMinify: false, 
};

const pwaConfig = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    // Cette option est cruciale pour éviter les références manquantes
    inlineWorkboxRuntime: true, 
  },
});

export default pwaConfig(nextConfig);