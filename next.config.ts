import { NextConfig } from "next";
import packageJson from "./package.json";
import withBundleAnalyzer from "@next/bundle-analyzer";

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [25, 50, 75, 90, 95, 100],
  },
};

export default analyzer(nextConfig);