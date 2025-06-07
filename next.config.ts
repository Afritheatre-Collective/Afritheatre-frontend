import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.fr-par.scw.cloud",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
