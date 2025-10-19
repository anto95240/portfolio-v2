import { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  // tes options Next.js normales
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: true,
})(nextConfig);
