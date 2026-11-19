import type { NextConfig } from "next";

const YEAR = 60 * 60 * 24 * 365;
const MONTH = 60 * 60 * 24 * 30;

const nextConfig: NextConfig = {
  output: process.env.DOCKER_BUILD ? "standalone" : undefined,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Photographs never change under the same file name, so let the optimiser cache them for a month.
    minimumCacheTTL: MONTH,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion/react"],
  },
  async headers() {
    return [
      {
        // Local photographs, the ornaments and the favicon: cached by browsers and CDNs
        source: "/site/:path*",
        headers: [{ key: "Cache-Control", value: `public, max-age=${MONTH}, stale-while-revalidate=${YEAR}` }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
