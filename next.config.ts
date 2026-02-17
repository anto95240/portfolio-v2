import withPWA from "@ducanh2912/next-pwa";
import { NextConfig } from "next";

// Utilisation de require pour charger le JSON de manière fiable en Node.js
const packageJson = require("./package.json");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    // On s'assure de bien récupérer la version
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },
};

const pwaConfig = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    inlineWorkboxRuntime: false,
  },
});

export default pwaConfig(nextConfig);