import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus, ArrowRight } from "lucide-react";
import {
  company,
  addOnGuidance,
  bookingConfidence,
  packages,
  packageDeliveryExamples,
  compareColumns,
  compareRows,
  pricingNotes,
  priceFactors,
  serviceDetails,
  type CompareValue,
} from "../site-data";
import { LaunchProofStrip } from "../_components/launch-proof-strip";
import { PackageChooser } from "./chooser";
import { PackagePricingShowcase } from "./package-pricing-showcase";

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
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
          <p className="eyebrow text-brand">Pricing</p>
          <h1 className="mt-3 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Real estate media packages.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            Four clear starting points for a clean MLS launch, a stronger seller
            presentation, or a fully immersive listing campaign.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={company.bookingUrl}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
            >
              Book online <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#bundles"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink"
            >
              See packages <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 grid gap-4 border-t border-line pt-5 sm:grid-cols-3">
            {[
              ["4", "published packages"],
              ["$100", "lowest starting point"],
              ["Next morning", "standard photo delivery"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-lg font-semibold text-ink">{value}</p>
                <p className="mt-1 text-sm text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PackagePricingShowcase />

      <LaunchProofStrip />

      <PackageChooser />

      <section id="services-and-addons" className="scroll-mt-24 border-y border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="eyebrow text-brand">Services and add-ons</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Build around the listing.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-2">
                Start with a package, then add only the specialty media the
                property, seller, and launch plan call for.
              </p>
            </div>
            <div className="grid gap-x-8 sm:grid-cols-2">
              {serviceDetails.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group grid grid-cols-[2rem_1fr_auto] gap-3 border-t border-line py-4"
                >
                  <span className="font-mono text-xs font-semibold text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink group-hover:text-brand">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      {service.lead}
                    </span>
                  </span>
                  <span className="max-w-32 text-right text-xs font-semibold text-brand">
                    {service.priceHint}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-4 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-3">
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
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Start booking <ArrowRight className="h-4 w-4" />
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

      <section className="border-t border-paper/10 bg-night text-paper">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center lg:py-16">
          <div>
            <p className="eyebrow text-paper/50">Ready when the listing is</p>
            <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
              Choose a package now. Confirm the exact scope in the order form.
            </h2>
          </div>
          <a
            href={company.bookingUrl}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm font-semibold text-night hover:bg-paper-2"
          >
            Book online <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
