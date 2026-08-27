import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.ui.sh",
        pathname: "/marks/**",
      },
    ],
  },
}

export default nextConfig
