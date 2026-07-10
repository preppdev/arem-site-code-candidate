import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { company, serviceArea } from "../site-data";
import { coverageRegions } from "../map-data";
import { getCoverageMeta } from "../../lib/coverage";
import { hasDb } from "../../lib/db";
import { CoverageConfidence } from "../_components/coverage-confidence";
import CoverageMap from "./coverage-map";

// Re-pull totals from the DB on a 10-min cadence so the hero/cards stay current.
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Coverage",
  description:
    "Where American Real Estate Media shoots — a density map of 50,000+ shoots across Virginia and northeastern North Carolina, headquartered in Portsmouth, VA.",
  alternates: {
    canonical: "/coverage",
  },
  openGraph: {
    title: "AREM Coverage",
    description:
      "Explore AREM's privacy-conscious public coverage map across Virginia and northeastern North Carolina.",
    url: "/coverage",
    type: "website",
  },
};

export default async function CoveragePage() {
  const meta = hasDb
    ? await getCoverageMeta()
    : { total: 0, byState: {} as Record<string, number>, topCities: {} as Record<string, string[]> };
  const hasLiveCoverage = hasDb && meta.total > 0;
  const byState = meta.byState;
  const topCities = meta.topCities;
  const fallbackCities = {
    VA: serviceArea.hubs.filter((hub) => hub.endsWith(", VA")),
    NC: serviceArea.hubs.filter((hub) => hub.endsWith(", NC")),
  } as Record<string, string[]>;
  const shownRegions = hasLiveCoverage
    ? coverageRegions
    : coverageRegions.filter((region) => region.state === "VA" || region.state === "NC");
  return (
    <main className="flex-1">
      {/* header */}
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
          <div className="grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow text-brand">Coverage</p>
              <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {hasLiveCoverage
                  ? "Every dot represents nearby shoots."
                  : "Core markets, confirmed before you book."}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
                A density map of {company.stats.shoots} shoots since{" "}
                {company.stats.since}. Boots-on-the-ground across Hampton Roads,
                Virginia and northeastern North Carolina — headquartered in{" "}
                {company.hq}.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <a
                href={company.bookingUrl}
                className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-brand"
              >
                Book a shoot <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-paper"
              >
                Talk to the team
              </a>
            </div>
          </div>
        </div>
      </section>

      <CoverageConfidence />

      {/* map */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 lg:pb-24">
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper shadow-soft">
          <CoverageMap />
        </div>
        <p className="mt-3 text-sm text-muted">
          {hasLiveCoverage
            ? `A live privacy-conscious coverage map of ${meta.total.toLocaleString()} real shoot records across Virginia and northeastern North Carolina, spanning every booking platform AREM has used since 2016. Public points are generalized into nearby-area buckets and can be filtered by state or year.`
            : `${company.stats.shoots} shoots since ${company.stats.since}, with regular coverage across Hampton Roads, coastal Virginia, and northeastern North Carolina. Use the market rules above or send the address when timing, travel, drone, or launch deadlines matter.`}
        </p>

        {/* coverage cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {shownRegions.map((region) => {
            const count = byState[region.state] ?? 0;
            const cities = topCities[region.state] ?? fallbackCities[region.state] ?? [];
            return (
              <div
                key={region.state}
                className="rounded-[var(--radius-card)] border border-line bg-paper-2 p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="eyebrow text-brand">{region.label}</p>
                  <p className="font-mono text-sm font-semibold text-ink">
                    {hasLiveCoverage ? count.toLocaleString() : "Core market"}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">
                  {cities.join(" · ")}.
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-muted">
          <MapPin className="mr-1 inline h-3.5 w-3.5 text-brand" />
          Don&apos;t see your area?{" "}
          <a
            href={company.emailHref}
            className="font-medium text-brand underline-offset-2 hover:underline"
          >
            Email the team
          </a>{" "}
          — AREM can confirm travel-sensitive orders before booking.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-night px-8 py-12 sm:flex-row sm:items-center sm:px-12">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
              In our service area? Let&apos;s shoot it.
            </h2>
            <p className="mt-2 text-paper/70">
              Call {company.phone} — open {company.hours}.
            </p>
          </div>
          <a
            href={company.bookingUrl}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Continue to booking <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
