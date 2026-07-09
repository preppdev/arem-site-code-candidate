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
  const recentProof = samples.filter((sample) => sample.image).slice(0, 6);
  const caseStudies = [
    {
      title: "Standard resale launch",
      propertyType: "Single-family listing",
      market: "Hampton Roads, VA",
      packageName: "Quick & Easy",
      deliverables: "Full photo coverage, CubiCasa floor plan, property website, gallery delivery",
      turnaround: "Standard next-morning photo delivery",
      finalUse: "MLS launch, seller update, social post, property website",
    },
    {
      title: "Seller-presentation upgrade",
      propertyType: "Feature-driven listing",
      market: "Coastal Virginia",
      packageName: "Property Spotlight",
      deliverables: "Photos, walkthrough video, drone photos, virtual twilight, floor plan, website",
      turnaround: "Core assets follow the launch schedule; specialty media confirmed at booking",
      finalUse: "Listing appointment proof, MLS, social campaign, print and web marketing",
    },
    {
      title: "Premium / relocation listing",
      propertyType: "Higher-end or distant-buyer property",
      market: "Virginia & northeastern North Carolina",
      packageName: "Perfect Marketing",
      deliverables: "Photo set, Matterport 3D, video, drone, twilight, floor plan, property website",
      turnaround: "Timing confirmed by 3D tour, video, travel, weather, and edit scope",
      finalUse: "Relocation buyer review, immersive property page, seller reporting, brokerage marketing",
    },
  ] as const;
  const deliveryPreview = [
    {
      label: "Photo gallery",
      title: "MLS-ready selects plus full-resolution downloads",
      body: "Core listing photos are organized for MLS upload, seller updates, property websites, and social promotion.",
    },
    {
      label: "Property page",
      title: "A single-property showcase site in the package ladder",
      body: "Current AREM packages include a property website path so agents have a clean destination beyond the MLS.",
    },
    {
      label: "Layout proof",
      title: "CubiCasa floor plan included across current packages",
      body: "Floor plans help buyers understand room flow and give agents one more practical asset for seller reporting.",
    },
    {
      label: "Upgrade media",
      title: "Video, drone, twilight, 3D, staging, and advanced edits where useful",
      body: "Specialty media is tied to listing situation instead of added blindly to every order.",
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

      <section className="border-b border-line bg-night text-paper">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="eyebrow text-twilight">Representative delivered work</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                Real listing media from the AREM body of work.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-paper/70">
                Browse a quick proof set here, then use the filters below for
                photography, walkthrough video, aerial, twilight, Matterport,
                and virtual staging references.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {recentProof.map((sample) => (
                <figure
                  key={sample.title}
                  className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-paper/10 bg-paper/5"
                >
                  {sample.image && (
                    <Image
                      src={sample.image}
                      alt={`${sample.title} — ${sample.market ?? "AREM sample"}`}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 100vw"
                      className="object-cover"
                    />
                  )}
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent p-3 pt-8">
                    <p className="text-xs font-semibold text-paper">{sample.title}</p>
                    <p className="mt-1 text-[0.68rem] text-paper/65">
                      {[sample.market, sample.packageName].filter(Boolean).join(" · ")}
                    </p>
                    {(sample.propertyType || sample.useCase) && (
                      <p className="mt-1 text-[0.68rem] text-paper/60">
                        {[sample.propertyType, sample.useCase].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-start lg:py-14">
          <div>
            <p className="eyebrow text-brand">Delivery proof</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              The finished media has to be easy to launch with.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              AREM&apos;s sample proof should connect the image quality to the
              actual agent workflow: gallery, downloads, floor plan, property
              page, and specialty assets where the listing calls for them.
            </p>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {deliveryPreview.map((item) => (
              <div key={item.label} className="grid gap-2 py-4 md:grid-cols-[9rem_1fr]">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
                  {item.label}
                </p>
                <div>
                  <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RealListingLaunch />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow text-brand">Representative package scenarios</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Proof organized by how agents actually use the media.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              These are not named client case studies. They are representative
              package scenarios built from AREM&apos;s current package ladder and
              sample work, so agents can connect visual quality to listing use.
            </p>
          </div>
          <div className="grid gap-4">
            {caseStudies.map((item) => (
              <div key={item.title} className="rounded-[var(--radius-card)] border border-line bg-paper p-5 shadow-soft">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {[item.propertyType, item.market].join(" · ")}
                    </p>
                  </div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
                    {item.packageName}
                  </p>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">Delivered</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.deliverables}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Timing</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.turnaround}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Used for</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.finalUse}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
        <SampleGallery />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 border-y border-line py-10 sm:flex-row sm:items-center">
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Like what you see? Let&apos;s shoot your listing.
          </h2>
          <a
            href={company.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Book now <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
