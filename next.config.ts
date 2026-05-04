import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/__mockup/:path*",
        destination: "http://localhost:23636/__mockup/:path*",
      },
    ];
  },
};

export default nextConfig;
