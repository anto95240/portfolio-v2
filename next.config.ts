import withBundleAnalyzer from "@next/bundle-analyzer";
import { NextConfig } from "next";

import packageJson from "./package.json";

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [25, 50, 75, 90, 95, 100],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default analyzer(nextConfig);
