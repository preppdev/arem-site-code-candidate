import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "./_components/site-header";
import { SiteFooter } from "./_components/site-footer";
import { company, proofImages, services, serviceArea } from "./site-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://americanrealestatemedia.com"),
  title: {
    default: "American Real Estate Media — Real Estate Photography & Media",
    template: "%s — American Real Estate Media",
  },
  description:
    "Professional real estate photography, video, drone, Matterport 3D tours, twilight, and floor plans across Hampton Roads and northeastern North Carolina. 50,000+ shoots since 2016. Next-day delivery.",
  keywords: [
    "real estate photography",
    "drone photography",
    "Matterport 3D tours",
    "real estate video",
    "virtual staging",
    "Portsmouth VA real estate photographer",
  ],
  openGraph: {
    title: "American Real Estate Media",
    description:
      "Real estate photography & media — 50,000+ shoots across Hampton Roads & NE North Carolina, next-day delivery.",
    type: "website",
    url: "https://americanrealestatemedia.com",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://americanrealestatemedia.com/#localbusiness",
  name: company.name,
  url: "https://americanrealestatemedia.com",
  telephone: company.phone,
  email: company.email,
  image: proofImages[0]?.src,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Portsmouth",
    addressRegion: "VA",
    addressCountry: "US",
  },
  areaServed: serviceArea.hubs.map((name) => ({
    "@type": "City",
    name,
  })),
  foundingDate: company.stats.since,
  sameAs: company.socialLinks.map((link) => link.href),
  openingHours: "Mo-Su 08:00-19:00",
  priceRange: "$100+",
  description:
    "Real estate photography, video, drone, Matterport 3D tours, twilight, floor plans, virtual staging, and listing media services across Hampton Roads, coastal Virginia, and northeastern North Carolina.",
  makesOffer: services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.blurb,
      provider: {
        "@id": "https://americanrealestatemedia.com/#localbusiness",
      },
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full overflow-x-clip`}
    >
      <body className="min-h-full overflow-x-clip flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
