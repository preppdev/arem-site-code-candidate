import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus, ArrowRight } from "lucide-react";
import {
  company,
  addOnGuidance,
  bookingConfidence,
  packages,
  packageDeliveryExamples,
  packageDefaultsByListing,
  compareColumns,
  compareRows,
  pricingNotes,
  priceFactors,
  type CompareValue,
} from "../site-data";
import { AgentFastPath } from "../_components/agent-fast-path";
import { RealListingLaunch } from "../_components/real-listing-launch";
import { PackageChooser } from "./chooser";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Compare AREM's four real estate media packages side by side — Value Listing, Quick & Easy, Property Spotlight, and Perfect Marketing. See exactly what's included in each.",
  alternates: {
    canonical: "/packages",
  },
  openGraph: {
    title: "AREM Real Estate Media Packages",
    description:
      "Compare published AREM package anchors, inclusions, add-ons, and delivery examples.",
    url: "/packages",
    type: "website",
  },
};

function Cell({ value }: { value: CompareValue }) {
  if (value === true)
    return <Check className="mx-auto h-4 w-4 text-brand" aria-label="Included" />;
  if (value === false)
    return (
      <Minus className="mx-auto h-4 w-4 text-line-strong" aria-label="Not included" />
    );
  return <span className="text-sm font-medium text-ink-2">{value}</span>;
}

export default function PackagesPage() {
  const packageSlug = (name: string) =>
    name.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");
  const packageSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "American Real Estate Media listing media packages",
    itemListElement: packages.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      description: `${pkg.tagline}. ${pkg.bestFor}`,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        price: pkg.startingPrice,
        minPrice: pkg.startingPrice,
        description: pkg.priceNote,
      },
      itemOffered: {
        "@type": "Service",
        name: `${pkg.name} real estate media package`,
        provider: {
          "@type": "LocalBusiness",
          name: company.name,
          telephone: company.phone,
        },
      },
    })),
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packageSchema) }}
      />
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow text-brand">Packages</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Compare packages, side by side.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-2">
            Four tiers, one clear table — no hovering, no clicking through four
            pages to figure out what you&apos;re buying.
          </p>
        </div>
      </section>

      <AgentFastPath
        title="Most agents should start with Quick & Easy."
        body="If the listing is straightforward, choose Quick & Easy. Upgrade when video, drone, twilight, Matterport, or seller-presentation proof matters."
      />

      <RealListingLaunch mode="compact" />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="grid gap-4 lg:grid-cols-4">
            {packageDefaultsByListing.map((item) => (
              <a
                key={item.listing}
                href={`#delivery-${packageSlug(item.defaultPackage)}`}
                className="border-t border-line pt-4 hover:border-brand"
              >
                <p className="text-sm font-semibold text-ink">{item.listing}</p>
                <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-widest text-brand">
                  {item.defaultPackage}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {item.addOns}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-14">
        <div className="mb-8 grid gap-5 rounded-[var(--radius-card)] border border-brand bg-brand-soft p-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="eyebrow text-brand">Most standard listings</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
              Start with Quick & Easy. Upgrade when the seller story needs more.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-2">
              For a normal resale listing, Quick & Easy gives full photo
              coverage, floor plan, showcase site, and next-morning gallery
              delivery. Move up to Property Spotlight when video, drone, or
              stronger seller-presentation proof matters.
            </p>
          </div>
          <a
            href={company.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Book Quick & Easy
          </a>
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-start">
          <div>
            <p className="eyebrow text-brand">Choose this if...</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
              Pick the fit first. Compare details second.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              Start with the listing situation. The detailed table, package
              recommender, and delivery examples are lower on the page when you
              need to verify inclusions.
            </p>
          </div>
          <div className="divide-y divide-line border-y border-line">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={[
                "grid gap-3 py-5 md:grid-cols-[1fr_7rem_1.2fr_auto] md:items-center",
                pkg.featured ? "bg-brand-soft/45 md:px-4" : "",
              ].join(" ")}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-ink">{pkg.name}</h3>
                  {pkg.featured && (
                    <span className="rounded-full bg-brand px-2 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-wider text-white">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">{pkg.tagline}</p>
              </div>
              <p className="text-xl font-semibold tracking-tight text-ink md:text-right">
                {pkg.priceNote}
              </p>
              <div>
                <p className="text-sm leading-relaxed text-ink-2">
                  <span className="font-semibold text-ink">Choose if: </span>
                  {pkg.bestFor}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {pkg.deliveryNote}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 md:justify-end">
                <a
                  href={company.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={[
                    "inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
                    pkg.featured
                      ? "bg-brand text-white hover:bg-brand-ink"
                      : "border border-line-strong text-ink hover:border-ink",
                  ].join(" ")}
                >
                  Book
                </a>
                <a href={`#delivery-${packageSlug(pkg.name)}`} className="text-sm font-semibold text-brand hover:text-brand-ink">
                  Example
                </a>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      <PackageChooser />

      <section className="border-y border-line bg-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:py-14">
          <div>
            <p className="eyebrow text-brand">Book with confidence</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
              The quick rules behind the package ladder.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              The live booking portal confirms the order, but agents should not
              have to guess which package fits a standard listing.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bookingConfidence.map((item) => (
              <div key={item.topic} className="border-t border-line pt-4">
                <h3 className="text-sm font-semibold text-ink">{item.topic}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* comparison matrix */}
      <section id="compare" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14 sm:px-8 lg:py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">
          What&apos;s included
        </h2>
        <div className="mt-6 grid gap-3 md:hidden">
          {packages.map((pkg, packageIndex) => (
            <details
              key={pkg.name}
              className="rounded-[var(--radius-card)] border border-line bg-paper p-4 shadow-soft"
              open={pkg.featured}
            >
              <summary className="cursor-pointer list-none">
                <span className="flex items-start justify-between gap-3">
                  <span>
                    <span className="text-base font-semibold text-ink">{pkg.name}</span>
                    <span className="mt-1 block text-sm text-muted">{pkg.tagline}</span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-brand">
                    {pkg.priceNote}
                  </span>
                </span>
              </summary>
              <div className="mt-4 divide-y divide-line border-y border-line">
                {compareRows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[1fr_auto] gap-3 py-3">
                    <p className="text-sm text-ink-2">{row.label}</p>
                    <div className="text-right">
                      <Cell value={row.values[packageIndex]} />
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
        <div className="mt-6 hidden overflow-x-auto rounded-[var(--radius-card)] border border-line shadow-soft md:block">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="bg-paper-2">
                <th className="sticky left-0 z-10 bg-paper-2 px-5 py-4 text-sm font-semibold text-ink">
                  Feature
                </th>
                {compareColumns.map((col, i) => (
                  <th
                    key={col}
                    className={[
                      "px-4 py-4 text-center text-sm font-semibold",
                      packages[i]?.featured
                        ? "bg-brand-soft text-brand-ink"
                        : "text-ink",
                    ].join(" ")}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, r) => (
                <tr
                  key={row.label}
                  className={r % 2 ? "bg-paper" : "bg-paper-2/40"}
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-inherit px-5 py-3.5 text-left text-sm font-medium text-ink"
                  >
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={[
                        "px-4 py-3.5 text-center",
                        packages[i]?.featured ? "bg-brand-soft/40" : "",
                      ].join(" ")}
                    >
                      <Cell value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid gap-4 border-t border-line pt-5 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-sm leading-relaxed text-muted">
            Prices shown are published starting points from the current AREM
            package ladder. Final totals are confirmed before the appointment is
            locked.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {priceFactors.map((factor) => (
              <span key={factor} className="text-sm text-ink-2">
                {factor}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
          <Link
            href="/samples"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink"
          >
            See sample work <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink"
          >
            Review services <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={company.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Book in Aryeo <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-y border-line py-5">
              <span>
                <span className="eyebrow text-brand">Pricing notes</span>
                <span className="mt-2 block text-2xl font-semibold tracking-tight text-ink">
                  What can change the final order
                </span>
              </span>
              <span className="text-sm font-semibold text-brand group-open:hidden">Open</span>
              <span className="hidden text-sm font-semibold text-brand group-open:inline">Close</span>
            </summary>
            <div className="grid gap-8 py-8 lg:grid-cols-[0.7fr_1.3fr]">
              <p className="text-base leading-relaxed text-ink-2">
                Final pricing should be confirmed before the appointment is
                locked, especially when scope, travel, timing, or specialty
                media changes.
              </p>
              <div className="grid gap-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {pricingNotes.map((item) => (
                <div key={item.topic} className="border-t border-line pt-4">
                  <h3 className="text-sm font-semibold text-ink">{item.topic}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid gap-3 md:hidden">
              {addOnGuidance.map((item) => (
                <div key={item.addOn} className="rounded-[var(--radius-card)] border border-line bg-paper p-4">
                  <p className="text-sm font-semibold text-ink">{item.addOn}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.bestFor}</p>
                  <p className="mt-3 font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-brand">
                    Confirm
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.confirm}</p>
                </div>
              ))}
            </div>
            <div className="hidden overflow-x-auto rounded-[var(--radius-card)] border border-line bg-paper shadow-soft md:block">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead className="bg-paper-2">
                  <tr>
                    <th className="px-5 py-4 text-sm font-semibold text-ink">Add-on</th>
                    <th className="px-5 py-4 text-sm font-semibold text-ink">Best for</th>
                    <th className="px-5 py-4 text-sm font-semibold text-ink">Confirm before booking</th>
                  </tr>
                </thead>
                <tbody>
                  {addOnGuidance.map((item) => (
                    <tr key={item.addOn} className="border-t border-line align-top">
                      <td className="px-5 py-4 text-sm font-semibold text-ink">
                        {item.addOn}
                      </td>
                      <td className="px-5 py-4 text-sm leading-relaxed text-ink-2">
                        {item.bestFor}
                      </td>
                      <td className="px-5 py-4 text-sm leading-relaxed text-ink-2">
                        {item.confirm}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            </div>
          </details>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-brand">Example delivery</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              What the agent receives after the shoot.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              These are representative delivery examples based on the current
              package ladder. Final file links and specialty media timing are
              confirmed by the order.
            </p>
          </div>
          <div className="grid gap-4">
            {packageDeliveryExamples.map((item) => (
              <div
                key={item.packageName}
                id={`delivery-${item.packageName.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`}
                className="scroll-mt-24 rounded-[var(--radius-card)] border border-line bg-paper p-5 shadow-soft"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold text-ink">{item.packageName}</h3>
                  <Link
                    href="/samples"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-ink"
                  >
                    See proof <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">Receives</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.receives}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Files and links</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.files}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Used for</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.use}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:pb-20">
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-y border-line py-5">
            <span>
              <span className="eyebrow text-brand">Deliverables</span>
              <span className="mt-2 block text-2xl font-semibold tracking-tight text-ink">
                Exact outputs by package
              </span>
            </span>
            <span className="text-sm font-semibold text-brand group-open:hidden">Open</span>
            <span className="hidden text-sm font-semibold text-brand group-open:inline">Close</span>
          </summary>
          <div className="grid gap-8 py-8 lg:grid-cols-[0.8fr_1.2fr]">
            <p className="text-base leading-relaxed text-ink-2">
              Starting prices get you oriented. Deliverables close the decision:
              what arrives, what can be added, and what timing should be
              confirmed before launch.
            </p>
            <div className="grid gap-4">
            {packages.map((pkg) => (
              <div key={pkg.name} className="rounded-[var(--radius-card)] border border-line bg-paper p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold text-ink">{pkg.name}</h3>
                  <p className="font-mono text-sm font-semibold text-brand">
                    {pkg.priceNote}
                  </p>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-ink">Delivered</p>
                    <ul className="mt-2 space-y-1.5">
                      {pkg.deliverables.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-ink-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Common add-ons</p>
                    <ul className="mt-2 space-y-1.5">
                      {pkg.addOns.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-ink-2">
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs leading-relaxed text-muted">
                      {pkg.deliveryNote}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </details>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-gradient-to-br from-brand to-brand-ink px-8 py-12 sm:flex-row sm:items-center sm:px-12">
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Ready to book? Open the live booking portal.
          </h2>
          <a
            href={company.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-ink hover:scale-[1.02]"
          >
            Open booking portal <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
