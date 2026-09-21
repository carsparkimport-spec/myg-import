import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    // Photos des vehicules Stockcoach
    remotePatterns: [
      { protocol: "https", hostname: "carconnexapp.blob.core.windows.net", pathname: "/images/**" },
    ],
  },
  compress: true,
  async rewrites() {
    // Le sandbox de maquettes n'existe qu'en développement
    if (process.env.NODE_ENV === "production") return [];
    return [
      {
        source: "/__mockup/:path*",
        destination: "http://localhost:23636/__mockup/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.myg-import.com" }],
        destination: "https://myg-import.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      ...(process.env.NODE_ENV !== "production"
        ? [
            {
              source: "/eu/stock",
              headers: [
                { key: "Clear-Site-Data", value: '"cache"' },
                { key: "Cache-Control", value: "no-store, max-age=0" },
              ],
            },
          ]
        : []),
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              process.env.NODE_ENV === "production"
                ? "public, max-age=31536000, immutable"
                : "no-store, max-age=0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
