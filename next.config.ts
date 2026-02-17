// next.config.ts
import withPWA from "@ducanh2912/next-pwa";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: 'standalone', // Laissez commenté
};

const pwaConfig = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    inlineWorkboxRuntime: false, // <--- C'est indispensable
  },
});

export default pwaConfig(nextConfig);