import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { company, sampleCategoryDetails, samples } from "../site-data";
import { RealListingLaunch } from "../_components/real-listing-launch";
import { SampleGallery } from "./gallery";

export const metadata: Metadata = {
  title: "Samples",
  description:
    "Browse real estate photography, video, twilight, aerial, virtual staging, and Matterport 3D samples from American Real Estate Media. Filter by service type.",
  alternates: {
    canonical: "/samples",
  },
  openGraph: {
    title: "American Real Estate Media Samples",
    description:
      "Browse AREM listing photography, video, twilight, aerial, staging, Matterport, floor plan, and editing proof.",
    url: "/samples",
    type: "website",
    images: samples
      .filter((sample) => sample.image)
      .slice(0, 1)
      .map((sample) => ({
        url: sample.image as string,
        alt: sample.title,
      })),
  },
};

export default function SamplesPage() {
  const lead = samples.find((sample) => sample.image);
  const recentProof = samples.filter((sample) => sample.image).slice(0, 4);
  const sampleTypeShortcuts = [
    ["Photography", "/samples?type=photography#gallery"],
    ["Video", "/samples?type=video#gallery"],
    ["Drone", "/samples?type=aerial#gallery"],
    ["Twilight", "/samples?type=twilight#gallery"],
    ["Matterport", "/samples?type=matterport#gallery"],
    ["Floor Plans", "/samples?type=floor-plans#gallery"],
    ["Staging", "/samples?type=virtual-staging#gallery"],
  ] as const;
  const serviceProofLinks = [
    ["Photography", "/services/photography"],
    ["Video", "/services/video"],
    ["Aerial", "/services/aerial"],
    ["Twilight", "/services/twilight"],
    ["Matterport", "/services/matterport"],
    ["Floor Plans", "/services/floor-plans"],
    ["Staging", "/services/virtual-staging"],
    ["Editing", "/services/advanced-editing"],
  ] as const;
  const proofChecks = [
    {
      label: "Photo proof",
      title: "MLS-ready galleries",
      body: "Representative interior, exterior, and feature images from AREM listing work.",
    },
    {
      label: "Launch assets",
      title: "Floor plan and site path",
      body: "Current packages include CubiCasa floor plans and a single-property showcase page.",
    },
    {
      label: "Upgrade media",
      title: "Video, drone, twilight, 3D",
      body: "Specialty samples stay linked to the service that creates the strongest listing case.",
    },
  ] as const;
  const packageScenarios = [
    {
      packageName: "Quick & Easy",
      title: "Standard resale launch",
      fit: "Need photos fast",
      body: "Full photo coverage, floor plan, property website, and gallery delivery for a clean MLS launch.",
    },
    {
      packageName: "Property Spotlight",
      title: "Seller-presentation upgrade",
      fit: "Need to win the appointment",
      body: "Adds walkthrough video, drone, virtual twilight, and floor plan context for stronger listing appointments.",
    },
    {
      packageName: "Perfect Marketing",
      title: "Premium / relocation listing",
      fit: "Need premium buyer confidence",
      body: "Layers Matterport, video, drone, twilight, floor plan, and web delivery for buyers who need more context.",
    },
  ] as const;
  const sampleSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "American Real Estate Media Samples",
    description: metadata.description,
    provider: {
      "@type": "LocalBusiness",
      name: company.name,
      telephone: company.phone,
      url: "https://americanrealestatemedia.com",
    },
    about: Object.entries(sampleCategoryDetails).map(([name, detail]) => ({
      "@type": "Service",
      name,
      description: detail.body,
      url: `https://americanrealestatemedia.com${detail.href}`,
    })),
    hasPart: samples
      .filter((sample) => sample.image || sample.externalUrl)
      .map((sample) => ({
        "@type": sample.image ? "ImageObject" : "CreativeWork",
        name: sample.title,
        description: sample.note,
        contentUrl: sample.image ?? sample.externalUrl,
        genre: sample.category,
        areaServed: sample.market,
        about: [sample.propertyType, sample.useCase].filter(Boolean).join(" · "),
      })),
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sampleSchema) }}
      />
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:items-center lg:py-18">
          <div className="lg:col-span-5">
            <p className="eyebrow text-brand">Samples</p>
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Real AREM media, organized by listing use.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
              Browse embedded photo proof and approved live sample libraries
              from AREM listing shoots, organized for agents who need to judge
              quality quickly before they book.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
              >
                Browse gallery <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/packages"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink"
              >
                Compare packages
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {sampleTypeShortcuts.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink-2 hover:border-brand hover:text-brand"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          {lead?.image && (
            <figure className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-night shadow-lift lg:col-span-7">
              <Image
                src={lead.image}
                alt={`${lead.title} — ${lead.market}`}
                width={1200}
                height={675}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="aspect-[16/9] w-full object-cover"
                priority
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent p-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-widest text-paper/60">
                  Lead proof
                </p>
                <p className="mt-1 text-lg font-semibold text-paper">{lead.title}</p>
                <p className="mt-1 text-sm text-paper/70">
                  {[lead.market, lead.packageName, lead.note].filter(Boolean).join(" · ")}
                </p>
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:py-12">
          <div>
            <p className="eyebrow text-brand">Proof at a glance</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Real work first, service libraries one click away.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              AREM&apos;s current site already separates photo, video, aerial,
              twilight, staging, and Matterport samples. This page keeps that
              breadth, but gets agents to the proof faster.
            </p>
            <div className="mt-6 grid gap-3">
              {proofChecks.map((item) => (
                <div key={item.label} className="border-l border-brand/35 pl-4">
                  <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-brand">
                    {item.label}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
            {recentProof.map((sample) => (
              <figure
                key={sample.title}
                className="relative h-48 min-w-[16rem] snap-start overflow-hidden rounded-[var(--radius-card)] border border-line bg-night shadow-soft sm:h-auto sm:min-w-0 sm:aspect-[4/3]"
              >
                {sample.image && (
                  <Image
                    src={sample.image}
                    alt={`${sample.title} — ${sample.market ?? "AREM sample"}`}
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 50vw, 80vw"
                    className="object-cover"
                  />
                )}
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent p-3 pt-8">
                  <p className="text-xs font-semibold text-paper">{sample.title}</p>
                  <p className="mt-1 text-[0.68rem] text-paper/65">
                    {[sample.market, sample.packageName].filter(Boolean).join(" · ")}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <RealListingLaunch
        mode="compact"
        primaryHref="#gallery"
        primaryLabel="Browse gallery"
        anchorId="launch-proof"
      />

      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-12">
          <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="eyebrow text-brand">Package context</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Sample quality should map to the listing decision.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">
                These representative scenarios connect the visible sample work
                to AREM&apos;s current package ladder without turning the Samples
                page into a second pricing page.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {packageScenarios.map((item) => (
                <div
                  key={item.packageName}
                  className="rounded-[var(--radius-card)] border border-line bg-paper p-4 shadow-soft"
                >
                  <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-brand">
                    {item.packageName}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-muted">{item.fit}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-14">
        <div className="mb-7 grid gap-4 border-b border-line pb-6 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
          <div>
            <p className="eyebrow text-brand">Gallery</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Browse by media type.
            </h2>
          </div>
          <div>
            <p className="max-w-3xl text-sm leading-relaxed text-ink-2">
              Filter across embedded AREM photo proof and approved external
              sample libraries for walkthrough video, aerial, twilight,
              Matterport, staging, floor plans, and advanced editing.
            </p>
          </div>
        </div>
        <div className="mb-7 flex flex-wrap gap-2">
          {serviceProofLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-full border border-line bg-paper-2 px-3 py-1.5 text-xs font-semibold text-ink-2 hover:border-brand hover:text-brand"
            >
              {label} service
            </a>
          ))}
        </div>
        <SampleGallery />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 border-y border-line py-10 sm:flex-row sm:items-center">
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Like what you see? Let&apos;s shoot your listing.
          </h2>
          <a
            href={company.bookingUrl}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Book now <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
