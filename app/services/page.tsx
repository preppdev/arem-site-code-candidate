import type { Metadata } from "next";
import Image from "next/image";
import {
  Camera,
  Video,
  Plane,
  Box,
  Sunset,
  Ruler,
  Sofa,
  Wand2,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { company, proofImages, serviceDetails } from "../site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Real estate photography, walkthrough video, drone & aerial, Matterport 3D, twilight, floor plans, virtual staging, and advanced editing — captured by vetted local pros and delivered next day.",
};

const iconMap: Record<string, LucideIcon> = {
  Camera,
  Video,
  Plane,
  Box,
  Sunset,
  Ruler,
  Sofa,
  Wand2,
};

export default function ServicesPage() {
  return (
    <main className="flex-1">
      {/* page hero */}
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow text-brand">Services</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Eight services. One on-site visit.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-2">
            Core listing media captured in a single appointment, with standard
            assets delivered on the normal next-day schedule.
          </p>
        </div>
      </section>

      {/* alternating service rows, each with a sample slot */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {serviceDetails.map((s, i) => {
          const Icon = iconMap[s.icon] ?? Camera;
          const flip = i % 2 === 1;
          return (
            <section
              key={s.slug}
              id={s.slug}
              className="grid items-center gap-10 border-b border-line py-16 lg:grid-cols-2 lg:py-20"
            >
              {/* copy */}
              <div className={flip ? "lg:order-2" : ""}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {s.title}
                </h2>
                <p className="mt-1 text-base font-medium text-brand">{s.lead}</p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-2">
                  {s.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-sm text-ink-2"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 inline-block rounded-full bg-paper-2 px-3 py-1 font-mono text-xs font-semibold text-ink-2">
                  {s.priceHint}
                </p>
                <a
                  href={`/services/${s.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-ink"
                >
                  Explore {s.title.toLowerCase()} <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className={flip ? "lg:order-1" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-line bg-gradient-to-br from-night to-brand-ink shadow-lift">
                  {i < proofImages.length ? (
                    <Image
                      src={proofImages[i].src}
                      alt={`${s.title} sample from American Real Estate Media`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-night p-6 text-paper">
                      <div className="flex h-full flex-col justify-between">
                        <div>
                          <p className="font-mono text-[0.68rem] uppercase tracking-widest text-paper/50">
                            Service fit
                          </p>
                          <h3 className="mt-3 max-w-sm text-2xl font-semibold tracking-tight">
                            {s.lead}
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {s.bullets.slice(0, 2).map((bullet) => (
                            <p key={bullet} className="border-t border-paper/15 pt-3 text-sm text-paper/70">
                              {bullet}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 font-mono text-[0.65rem] font-semibold text-ink">
                    {i < proofImages.length ? "AREM SAMPLE" : s.priceHint}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-sm font-semibold text-paper">{s.sampleType}</p>
                    <p className="mt-1 text-xs text-paper/65">
                      {i < proofImages.length
                        ? "Representative current-site media sample."
                        : "Scoped with the package and listing timeline."}
                    </p>
                  </div>
                    </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-night px-8 py-12 sm:flex-row sm:items-center sm:px-12">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
              Not sure what your listing needs?
            </h2>
            <p className="mt-2 text-paper/70">
              Pick a package and we&apos;ll bring the right gear. Call{" "}
              {company.phone}.
            </p>
          </div>
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
