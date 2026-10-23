import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const turbopackRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: turbopackRoot,
  },
  images: {
    // SVG optimization is the CVE-2026-96889 sink. Keep it off (this is also the default).
    dangerouslyAllowSVG: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
