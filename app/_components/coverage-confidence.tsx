import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { company, marketPages } from "../site-data";

const coreSlugs = [
  "virginia-beach",
  "norfolk",
  "chesapeake",
  "portsmouth",
  "hampton-roads",
] as const;

const travelReviewSlugs = ["richmond", "elizabeth-city", "edenton"] as const;

const coverageRules = [
  {
    label: "Routine core",
    title: "All of Hampton Roads",
    body: "Every Hampton Roads member city and surrounding community is part of the primary service market.",
  },
  {
    label: "Confirm first",
    title: "Confirm corridor-edge timing",
    body: "Richmond, Ashland, Elizabeth City, Edenton, rural acreage, waterfront priorities, and rush deadlines should be confirmed before the appointment is locked.",
  },
  {
    label: "Address check",
    title: "Send the listing when timing matters",
    body: "AREM can confirm travel, drone conditions, access, and launch deadlines before you commit to the order.",
  },
] as const;

type CoverageConfidenceProps = {
  mode?: "full" | "compact";
};

export function CoverageConfidence({ mode = "full" }: CoverageConfidenceProps) {
  const compact = mode === "compact";
  const coreMarkets = marketPages.filter((market) =>
    coreSlugs.includes(market.slug as (typeof coreSlugs)[number]),
  );
  const travelMarkets = marketPages.filter((market) =>
    travelReviewSlugs.includes(market.slug as (typeof travelReviewSlugs)[number]),
  );

  return (
    <section className="border-b border-line bg-paper">
      <div
        className={[
          "mx-auto max-w-7xl px-5 sm:px-8",
          compact ? "py-8" : "py-10 lg:py-12",
        ].join(" ")}
      >
        <div className="grid gap-8 lg:grid-cols-[0.66fr_1.34fr] lg:items-start">
          <div>
            <p className="eyebrow text-brand">Coverage confidence</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Core markets are clear before the live heatmap loads.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              AREM is headquartered in {company.hq}. Current service runs from
              Ashland and Richmond through Hampton Roads to Elizabeth City and
              Edenton. Use the map for historical proof; use these rules when
              you need to know whether to book or confirm timing first.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={company.bookingUrl}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
              >
                Book in core coverage <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink"
              >
                Confirm an address
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            {!compact && (
              <div className="grid gap-4 md:grid-cols-3">
                {coverageRules.map((rule) => (
                  <div key={rule.label} className="border-t border-line pt-4">
                    <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-brand">
                      {rule.label}
                    </p>
                    <h3 className="mt-2 text-base font-semibold text-ink">{rule.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">{rule.body}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="grid gap-4 lg:grid-cols-[1fr_0.72fr]">
              <div className="rounded-[var(--radius-card)] border border-line bg-paper-2 p-5">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand" />
                  <p className="text-sm font-semibold text-ink">Core service markets</p>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {coreMarkets.map((market) => (
                    <Link
                      key={market.slug}
                      href={`/locations/${market.slug}`}
                      className="border-t border-line pt-3 text-sm font-semibold text-ink hover:text-brand-ink"
                    >
                      {market.name}
                      <span className="mt-1 block text-xs font-normal leading-relaxed text-muted">
                        {market.recommendedPackage}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[var(--radius-card)] border border-line bg-paper-2 p-5">
                <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-brand">
                  Confirm first
                </p>
                <div className="mt-4 space-y-3">
                  {travelMarkets.map((market) => (
                    <Link
                      key={market.slug}
                      href={`/locations/${market.slug}`}
                      className="block border-t border-line pt-3 first:border-t-0 first:pt-0"
                    >
                      <span className="text-sm font-semibold text-ink">{market.name}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-muted">
                        {market.localPoints[0]}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
