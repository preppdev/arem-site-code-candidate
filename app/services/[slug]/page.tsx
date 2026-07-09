import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import {
  company,
  mediaStandards,
  packages,
  priceFactors,
  samples,
  serviceArea,
  serviceDetails,
} from "../../site-data";
import { AgentFastPath } from "../../_components/agent-fast-path";

type Props = {
  params: Promise<{ slug: string }>;
};

const serviceKeywords: Record<string, string[]> = {
  photography: ["photo", "photos", "photography", "interior", "exterior"],
  video: ["video", "walkthrough"],
  aerial: ["drone", "aerial"],
  matterport: ["matterport", "3d"],
  twilight: ["twilight"],
  "floor-plans": ["floor plan", "floor plans", "cubi casa", "cubi"],
  "virtual-staging": ["virtual staging", "staging"],
  "advanced-editing": ["advanced editing", "editing", "sky", "removal"],
};

const standardBySlug: Record<string, string> = {
  photography: "Photography",
  video: "Video",
  aerial: "Drone",
  matterport: "Matterport 3D",
  twilight: "Premium edits",
  "floor-plans": "Floor plans",
  "virtual-staging": "Premium edits",
  "advanced-editing": "Premium edits",
};

const proofLinksBySlug: Record<string, { label: string; href: string }[]> = {
  photography: [{ label: "View photo samples", href: "/samples" }],
  video: [
    { label: "View video samples", href: "https://vimeo.com/americanrealestatemedia" },
  ],
  aerial: [
    { label: "View aerial samples", href: "https://americanrealestatemedia.com/aerial-photo-samples" },
  ],
  matterport: [
    { label: "View Matterport details", href: "https://americanrealestatemedia.com/matterport-3d-tours" },
  ],
  twilight: [
    { label: "View twilight samples", href: "https://americanrealestatemedia.com/twilight-photo-samples" },
  ],
  "floor-plans": [{ label: "Compare package deliverables", href: "/packages" }],
  "virtual-staging": [
    { label: "View staging samples", href: "https://americanrealestatemedia.com/virtual-staging-samples" },
  ],
  "advanced-editing": [{ label: "View sample work", href: "/samples" }],
};

const sampleCategoryBySlug: Record<string, string> = {
  photography: "Photography",
  video: "Video",
  aerial: "Aerial",
  "floor-plans": "Floor Plans",
  matterport: "Matterport",
  twilight: "Twilight",
  "virtual-staging": "Virtual Staging",
  "advanced-editing": "Advanced Editing",
};

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceDetails.find((item) => item.slug === slug);

  if (!service) return {};

  return {
    title: `${service.title} for Real Estate Listings`,
    description: `${service.description} Available from American Real Estate Media across Hampton Roads, coastal Virginia, and northeastern North Carolina.`,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} for Real Estate Listings`,
      description: service.description,
      url: `/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = serviceDetails.find((item) => item.slug === slug);

  if (!service) notFound();

  const relatedStandard = mediaStandards.find(
    (item) => item.service === standardBySlug[service.slug]
  );
  const keywords = serviceKeywords[service.slug] ?? [service.title.toLowerCase()];

  const packageFits = packages.filter((pkg) =>
    [...pkg.deliverables, ...pkg.features, ...pkg.addOns]
      .join(" ")
      .toLowerCase()
      .split(/\s*,\s*/)
      .some((text) => keywords.some((keyword) => text.includes(keyword)))
  );

  const shownPackages = packageFits.length > 0 ? packageFits : packages;
  const proofLinks = proofLinksBySlug[service.slug] ?? [{ label: "View sample work", href: "/samples" }];
  const proofSamples = samples
    .filter((sample) => sample.category === sampleCategoryBySlug[service.slug])
    .slice(0, 3);
  const faqItems = [
    {
      q: `Is ${service.title.toLowerCase()} included in a package?`,
      a: `${service.title} is ${service.priceHint.toLowerCase()}. AREM confirms final package fit, add-ons, and scope before the appointment is locked.`,
    },
    {
      q: `When is ${service.title.toLowerCase()} delivered?`,
      a: relatedStandard
        ? `${relatedStandard.timing} ${relatedStandard.notes}`
        : "Timing is confirmed before the shoot based on scope, launch deadline, and any specialty editing requirements.",
    },
    {
      q: `Where is ${service.title.toLowerCase()} available?`,
      a: `AREM serves Hampton Roads, coastal Virginia, and northeastern North Carolina, including ${serviceArea.hubs.slice(0, 4).join(", ")}. Travel-sensitive orders are confirmed before booking.`,
    },
  ];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `https://americanrealestatemedia.com/services/${service.slug}#service`,
      name: `Real estate ${service.title}`,
      description: service.description,
      provider: {
        "@id": "https://americanrealestatemedia.com/#localbusiness",
      },
      areaServed: serviceArea.hubs.map((name) => ({
        "@type": "City",
        name,
      })),
      offers: shownPackages.map((pkg) => ({
        "@type": "Offer",
        name: pkg.name,
        description: pkg.bestFor,
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
          name: "Services",
          item: "https://americanrealestatemedia.com/services",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: service.title,
          item: `https://americanrealestatemedia.com/services/${service.slug}`,
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <main className="flex-1">
        <section className="border-b border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <p className="eyebrow text-brand">Real estate {service.title}</p>
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {service.lead}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
              {service.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={company.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
              >
                Open booking portal <ArrowRight className="h-4 w-4" />
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
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-brand">
              Service fit
            </p>
            <ul className="mt-5 space-y-3">
              {service.bullets.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 inline-block rounded-full bg-paper px-3 py-1 font-mono text-xs font-semibold text-ink-2">
              {service.priceHint}
            </p>
          </div>
        </div>
        </section>

        <AgentFastPath
          title={`Use ${service.title.toLowerCase()} only when it helps the launch.`}
          body="The fastest path is still package first: choose the default, review proof, confirm coverage, then add specialty media when the listing benefits from it."
        />

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:py-20">
          <div>
            <p className="eyebrow text-brand">Proof and next step</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              See how {service.title.toLowerCase()} fits into a listing launch.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              Service pages explain the scope. Samples and package pages show
              how the media supports MLS, seller updates, social, property
              websites, and brokerage standards.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {proofSamples.map((sample) =>
              sample.image ? (
                <a
                  key={sample.title}
                  href="/samples"
                  className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-line bg-night shadow-soft"
                >
                  <Image
                    src={sample.image}
                    alt={`${sample.title} sample`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-paper/65">
                      {sample.packageName ?? sample.category}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-paper">
                      {sample.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-paper/70">
                      {[sample.propertyType, sample.useCase].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </a>
              ) : null
            )}
            <a
              href="/samples"
              className="rounded-[var(--radius-card)] border border-line bg-paper p-5 shadow-soft hover:border-brand"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-widest text-brand">
                Samples
              </p>
              <h3 className="mt-3 text-lg font-semibold text-ink">
                Browse AREM proof
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                Review photo proof, sample libraries, and package use cases.
              </p>
            </a>
            {proofLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="rounded-[var(--radius-card)] border border-line bg-paper p-5 shadow-soft hover:border-brand"
              >
                <p className="font-mono text-[0.68rem] uppercase tracking-widest text-brand">
                  Service proof
                </p>
                <h3 className="mt-3 text-lg font-semibold text-ink">
                  {link.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  Open the closest approved proof destination for this media type.
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow text-brand">Package fit</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Where {service.title.toLowerCase()} fits in the AREM package ladder.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              Published starting prices make planning easier. Final scope,
              availability, weather-sensitive items, and add-ons are confirmed
              before the shoot is locked.
            </p>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {shownPackages.map((pkg) => (
              <div key={pkg.name} className="grid gap-3 py-5 sm:grid-cols-[12rem_1fr_auto] sm:items-start">
                <div>
                  <h3 className="text-sm font-semibold text-ink">{pkg.name}</h3>
                  <p className="mt-1 font-mono text-xs font-semibold text-brand">
                    {pkg.priceNote}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-ink-2">{pkg.bestFor}</p>
                <p className="text-xs leading-relaxed text-muted sm:text-right">
                  {pkg.deliveryNote}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-4 border-y border-line py-5 md:grid-cols-3">
          <a href="/packages" className="group border-t border-line pt-4 md:border-t-0 md:pt-0">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
              Package decision
            </p>
            <h3 className="mt-2 text-base font-semibold text-ink group-hover:text-brand">
              Start with the package ladder
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-2">
              See when this service is included, recommended, or best treated as
              an add-on.
            </p>
          </a>
          <a href="/samples" className="group border-t border-line pt-4 md:border-t-0 md:pt-0">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
              Visual proof
            </p>
            <h3 className="mt-2 text-base font-semibold text-ink group-hover:text-brand">
              Inspect sample delivery
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-2">
              Connect the service to actual listing use, package context, and
              delivery examples.
            </p>
          </a>
          <a
            href={company.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="group border-t border-line pt-4 md:border-t-0 md:pt-0"
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
              Ready to schedule
            </p>
            <h3 className="mt-2 text-base font-semibold text-ink group-hover:text-brand">
              Book in Aryeo
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-2">
              Use the live booking portal when the listing details are ready.
            </p>
          </a>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <p className="eyebrow text-brand">Timing and constraints</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Confirm the details that affect launch day.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              AREM serves {serviceArea.hubs.slice(0, 5).join(", ")} and nearby
              coastal Virginia / northeastern North Carolina markets. Travel and
              unusual media requirements are confirmed before the appointment.
            </p>
          </div>
          <div className="lg:col-span-7">
            {relatedStandard && (
              <div className="border-y border-line py-5">
                <h3 className="text-base font-semibold text-ink">
                  {relatedStandard.service}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {relatedStandard.deliverables}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">
                  <span className="font-semibold text-ink">Typical timing: </span>
                  {relatedStandard.timing}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {relatedStandard.notes}
                </p>
              </div>
            )}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {priceFactors.map((factor) => (
                <p key={factor} className="border-t border-line pt-3 text-sm leading-relaxed text-ink-2">
                  {factor}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow text-brand">Quick answers</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              What agents usually ask before adding {service.title.toLowerCase()}.
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

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-6 border-y border-line py-10 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              Need {service.title.toLowerCase()} for an upcoming listing?
            </h2>
            <p className="mt-2 text-sm text-ink-2">
              Open the live booking portal or call {company.phone} for scoping help.
            </p>
          </div>
          <a
            href={company.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Open booking portal <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
      </main>
    </>
  );
}
