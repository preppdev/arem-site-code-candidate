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
      {
        source: "/virginia-beach-real-estate-photographer",
        destination: "/locations/virginia-beach",
        permanent: true,
      },
      {
        source: "/portsmouth-real-estate-photography",
        destination: "/locations/portsmouth",
        permanent: true,
      },
      {
        source: "/suffolk-real-estate-photography",
        destination: "/locations/suffolk",
        permanent: true,
      },
      {
        source: "/hampton-real-estate-photography",
        destination: "/locations/hampton",
        permanent: true,
      },
      {
        source: "/newport-news-real-estate-photography",
        destination: "/locations/newport-news",
        permanent: true,
      },
      {
        source: "/williamsburg-real-estate-photography",
        destination: "/locations/williamsburg",
        permanent: true,
      },
      {
        source: "/hampton-roads-real-estate-photography",
        destination: "/locations/hampton-roads",
        permanent: true,
      },
      {
        source: "/richmond-real-estate-photography",
        destination: "/locations/richmond",
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
