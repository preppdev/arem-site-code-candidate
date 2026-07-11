"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowUpRight, Camera, Home, MapPin, SlidersHorizontal } from "lucide-react";
import type { PublicListing } from "../../lib/public-listings";

type Props = {
  marketName: string;
  marketSlug: string;
  listings: PublicListing[];
  live: boolean;
  updatedAt: string | null;
};

const ALL = "All";

function formatPrice(price: number | null) {
  if (price === null) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatUpdatedAt(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function LocalListingDirectory({
  marketName,
  marketSlug,
  listings,
  live,
  updatedAt,
}: Props) {
  const [neighborhood, setNeighborhood] = useState(ALL);
  const [propertyType, setPropertyType] = useState(ALL);
  const neighborhoods = useMemo(
    () => [ALL, ...new Set(listings.map((listing) => listing.neighborhood))],
    [listings],
  );
  const propertyTypes = useMemo(
    () => [ALL, ...new Set(listings.map((listing) => listing.propertyType))],
    [listings],
  );
  const filtered = listings.filter(
    (listing) =>
      (neighborhood === ALL || listing.neighborhood === neighborhood) &&
      (propertyType === ALL || listing.propertyType === propertyType),
  );
  const updatedLabel = formatUpdatedAt(updatedAt);

  return (
    <section id={`${marketSlug}-properties`} className="border-y border-line bg-paper-2">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="eyebrow text-brand">
              {live ? `Active ${marketName} listings` : "Property discovery prototype"}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {live
                ? "Explore homes photographed by AREM and currently on the market."
                : `A ${marketName} discovery layer built around the listings AREM photographs.`}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2">
              {live
                ? "Inventory is limited to publication-approved records that are actively for sale and recently verified by the AREM listing-status system."
                : "These anonymized profiles demonstrate the directory structure and do not represent active inventory. The approved live feed will replace them without changing the page layout."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase text-muted">
                <MapPin className="h-3.5 w-3.5" /> Neighborhood
              </span>
              <select
                value={neighborhood}
                onChange={(event) => setNeighborhood(event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-line-strong bg-paper px-3 text-sm text-ink outline-none focus:border-brand"
              >
                {neighborhoods.map((option) => (
                  <option key={option} value={option}>
                    {option === ALL ? "All neighborhoods" : option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase text-muted">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Property type
              </span>
              <select
                value={propertyType}
                onChange={(event) => setPropertyType(event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-line-strong bg-paper px-3 text-sm text-ink outline-none focus:border-brand"
              >
                {propertyTypes.map((option) => (
                  <option key={option} value={option}>
                    {option === ALL ? "All property types" : option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-y border-line py-3 text-sm">
          <p className="font-semibold text-ink">
            {filtered.length} {filtered.length === 1 ? "property" : "properties"}
          </p>
          <p className="text-muted">
            {live && updatedLabel
              ? `Status verified ${updatedLabel}`
              : "Representative AREM media profiles"}
          </p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((listing) => {
            const price = formatPrice(listing.price);
            const external = listing.href?.startsWith("http") ?? false;
            const content = (
              <>
                <div className="relative aspect-[4/3] overflow-hidden bg-line">
                  <Image
                    src={listing.heroImage}
                    alt={listing.heroAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <span
                    className={[
                      "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase",
                      live ? "bg-emerald-700 text-white" : "bg-night/85 text-paper",
                    ].join(" ")}
                  >
                    {live ? "For sale" : "Representative"}
                  </span>
                </div>
                <div className="p-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-brand">
                    <MapPin className="h-3.5 w-3.5" /> {listing.neighborhood}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-ink">{listing.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {listing.propertyType}
                    {price ? ` / ${price}` : ""}
                  </p>
                  {(listing.bedrooms || listing.bathrooms || listing.livingAreaSqft) && (
                    <p className="mt-3 flex items-center gap-2 text-xs text-ink-2">
                      <Home className="h-3.5 w-3.5 text-brand" />
                      {[
                        listing.bedrooms ? `${listing.bedrooms} bd` : null,
                        listing.bathrooms ? `${listing.bathrooms} ba` : null,
                        listing.livingAreaSqft
                          ? `${listing.livingAreaSqft.toLocaleString()} sq ft`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(" / ")}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {listing.media.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 py-1 text-[0.68rem] font-medium text-brand-ink"
                      >
                        <Camera className="h-3 w-3" /> {item}
                      </span>
                    ))}
                  </div>
                  {listing.href && (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      {live ? "View property" : "View AREM work"}
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </>
            );

            return listing.href ? (
              <a
                key={listing.id}
                href={listing.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper shadow-soft transition-shadow hover:shadow-lift"
              >
                {content}
              </a>
            ) : (
              <article
                key={listing.id}
                className="group overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper shadow-soft"
              >
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
