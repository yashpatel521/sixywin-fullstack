import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ESLint is run separately via npx eslint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
