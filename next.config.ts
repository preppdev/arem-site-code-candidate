import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      /* Direct visits fall back to the hosted order form. In-site booking CTAs
         open the same destination in the Aryeo lightbox. */
      {
        source: "/book",
        destination: "https://media.americanrealestatemedia.com/order",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
    ],
  },
};

export default nextConfig;
