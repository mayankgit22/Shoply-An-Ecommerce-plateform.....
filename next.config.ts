import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images:{
    remotePatterns:[{
      protocol:"https",
      hostname:"cdn.sanity.io",
    }]}
  }


export default nextConfig;
