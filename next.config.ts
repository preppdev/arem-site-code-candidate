import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    const noIndexHeaders = [
      {
        key: "X-Robots-Tag",
        value: "noindex, nofollow, noarchive",
      },
    ];

    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "aremtours.com" }],
        headers: noIndexHeaders,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.aremtours.com" }],
        headers: noIndexHeaders,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        headers: noIndexHeaders,
      },
    ];
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
      {
        source: "/chesapeake-real-estate-photographer",
        destination: "/locations/chesapeake",
        permanent: true,
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
