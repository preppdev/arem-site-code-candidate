import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Check, MapPin } from "lucide-react";
import {
  company,
  marketPages,
  packages,
  priceFactors,
  samples,
  serviceDetails,
} from "../../site-data";
import { AgentFastPath } from "../../_components/agent-fast-path";
import { LaunchProofStrip } from "../../_components/launch-proof-strip";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return marketPages.map((market) => ({ slug: market.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const market = marketPages.find((item) => item.slug === slug);

  if (!market) return {};

  return {
    title: `Real Estate Photography in ${market.name}`,
    description: `${market.intro} Published AREM package anchors start at $100, with photography, floor plans, video, drone, Matterport, twilight, and listing media support.`,
    alternates: {
      canonical: `/locations/${market.slug}`,
    },
    openGraph: {
      title: `Real Estate Photography in ${market.name}`,
      description: market.intro,
      url: `/locations/${market.slug}`,
      type: "website",
    },
  };
}

export default async function MarketPage({ params }: Props) {
  const { slug } = await params;
  const market = marketPages.find((item) => item.slug === slug);

  if (!market) notFound();

  const visualProof = samples.filter((sample) => sample.image).slice(0, 3);
  const faqItems = [
    {
      q: `Does AREM serve ${market.name}?`,
      a: `Yes. ${market.name} is part of AREM's ${market.region} service-area focus. Travel-sensitive timing, drone conditions, and special requests are confirmed before the appointment is locked.`,
    },
    {
      q: `What package should a ${market.name} listing start with?`,
      a: "Most standard listings can start with Quick & Easy. Property Spotlight is a stronger fit when video, drone, twilight, or a seller-presentation upgrade matters. Perfect Marketing adds Matterport for premium or relocation-driven listings.",
    },
    {
      q: "How do final prices get confirmed?",
      a: "AREM publishes starting package anchors. Final totals are confirmed before the shoot based on square footage, travel, rush timing, add-ons, weather-sensitive media, and brokerage arrangements.",
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `https://americanrealestatemedia.com/locations/${market.slug}#service`,
      name: `Real estate photography in ${market.name}`,
      provider: {
        "@id": "https://americanrealestatemedia.com/#localbusiness",
      },
      areaServed: {
        "@type": "City",
        name: market.name,
      },
      description: market.intro,
      offers: packages.map((pkg) => ({
        "@type": "Offer",
        name: pkg.name,
        description: `${pkg.priceNote}. ${pkg.bestFor}`,
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          price: pkg.startingPrice,
          minPrice: pkg.startingPrice,
          description: pkg.priceNote,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Locations",
          item: "https://americanrealestatemedia.com/locations",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: market.name,
          item: `https://americanrealestatemedia.com/locations/${market.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        <section className="border-b border-line bg-paper-2">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-7">
              <p className="eyebrow text-brand">{market.region}</p>
              <h1 className="mt-3 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {market.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
                {market.intro}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={company.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
                >
                  Book in {market.name} <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/packages"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-6 py-3 text-sm font-semibold text-ink hover:border-ink"
                >
                  Compare packages
                </a>
              </div>
            </div>
            <div className="border-y border-line py-6 lg:col-span-5">
              <MapPin className="h-5 w-5 text-brand" />
              <h2 className="mt-4 text-base font-semibold text-ink">
                Local listing context
              </h2>
              <div className="mt-4 space-y-3">
                {market.listingContext.map((item) => (
                  <p key={item} className="text-sm leading-relaxed text-ink-2">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AgentFastPath
          title={`Booking in ${market.name}? Start with the default path.`}
          body="Most standard listings can begin with Quick & Easy. Review sample work, confirm market coverage, and add video, drone, twilight, or Matterport only when the listing calls for it."
        />

        <LaunchProofStrip marketName={market.name} />

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="eyebrow text-brand">Services in {market.name}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                One appointment can cover the full launch package.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-2">
                Choose a package or scope the media mix: photography, floor
                plans, walkthrough video, drone where conditions allow,
                Matterport, twilight, virtual staging, and advanced editing.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {serviceDetails.map((service) => (
                <a
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="border-t border-line pt-3 text-sm leading-relaxed text-ink-2 hover:text-ink"
                >
                  <span className="font-semibold text-ink">{service.title}</span>
                  <span className="mt-1 block text-xs text-muted">
                    {service.priceHint}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-paper-2">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
            <div className="lg:col-span-5">
              <p className="eyebrow text-brand">Local planning notes</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                What to think through before a {market.name} shoot.
              </h2>
            </div>
            <div className="divide-y divide-line border-y border-line lg:col-span-7">
              {market.localPoints.map((point) => (
                <p key={point} className="py-4 text-sm leading-relaxed text-ink-2">
                  {point}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-night text-paper">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:py-16">
            <div>
              <p className="eyebrow text-twilight">Local proof</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                Match {market.name} planning to real AREM sample work.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-paper/70">
                Use local context to choose the package, then inspect sample
                media to judge quality before booking.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/samples"
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink hover:bg-paper/90"
                >
                  View samples <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/coverage"
                  className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-5 py-2.5 text-sm font-semibold text-paper hover:border-paper/50"
                >
                  Check coverage
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {visualProof.map((sample) => (
                <a
                  key={sample.title}
                  href="/samples"
                  className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-night"
                >
                  {sample.image && (
                    <Image
                      src={sample.image}
                      alt={`${sample.title} — AREM sample work`}
                      fill
                      sizes="(min-width: 1024px) 22vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 to-transparent p-3 pt-8">
                    <p className="text-xs font-semibold text-paper">{sample.title}</p>
                    <p className="mt-1 text-[0.68rem] leading-snug text-paper/65">
                      {[sample.packageName, sample.useCase].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow text-brand">Package fit</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Published package anchors for local listing decisions.
              </h2>
              <div className="mt-6 border-y border-line py-5">
                <p className="text-sm font-semibold text-ink">
                  Recommended starting point: {market.recommendedPackage}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {market.packageReason}
                </p>
              </div>
            </div>
            <div className="divide-y divide-line border-y border-line lg:col-span-7">
              {packages.map((pkg) => (
                <div key={pkg.name} className="grid gap-3 py-5 sm:grid-cols-[12rem_1fr]">
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{pkg.name}</h3>
                    <p className="mt-1 font-mono text-xs font-semibold text-brand">
                      {pkg.priceNote}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-ink-2">{pkg.bestFor}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="eyebrow text-brand">Quick answers</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Booking media in {market.name}.
              </h2>
            </div>
            <div className="divide-y divide-line border-y border-line">
              {faqItems.map((item) => (
                <div key={item.q} className="py-5">
                  <h3 className="text-sm font-semibold text-ink">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <div className="grid gap-8 border-y border-line py-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-ink">
                What can affect final pricing.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                Starting prices help agents plan, but final totals are confirmed
                before the shoot is locked.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {priceFactors.map((factor) => (
                <p key={factor} className="flex gap-2 text-sm leading-relaxed text-ink-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {factor}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
