import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://ecommerce.routemisr.com/**')],
  },
  /* config options here */
};

export default nextConfig;
