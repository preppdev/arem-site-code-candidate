import type { MetadataRoute } from "next";
import { posts } from "./blog-data";
import { marketPages, serviceDetails } from "./site-data";

const baseUrl = "https://americanrealestatemedia.com";

const staticRoutes = [
  "",
  "/about",
  "/blog",
  "/brokerages",
  "/contact",
  "/coverage",
  "/faq",
  "/listing-launch",
  "/locations",
  "/packages",
  "/privacy",
  "/resources",
  "/resources/staging-guide",
  "/samples",
  "/services",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...serviceDetails.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...marketPages.map((market) => ({
      url: `${baseUrl}/locations/${market.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
