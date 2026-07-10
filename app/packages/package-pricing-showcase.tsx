import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Eye, Sparkles } from "lucide-react";
import { company, packages, proofImages, samples } from "../site-data";

const imageByPackage: Record<string, string> = {
  "Value Listing":
    samples.find((sample) => sample.title === "Norfolk listing proof")?.image ??
    proofImages[0].src,
  "Quick & Easy":
    samples.find((sample) => sample.title === "Hampton Roads living area")?.image ??
    proofImages[1].src,
  "Property Spotlight":
    samples.find((sample) => sample.title === "Exterior launch hero")?.image ??
    proofImages[0].src,
  "Perfect Marketing":
    samples.find((sample) => sample.title === "Charlottesville property media")?.image ??
    proofImages[2].src,
};

function packageSlug(name: string) {
  return name.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");
}

export function PackagePricingShowcase() {
  return (
    <section id="bundles" className="scroll-mt-24 border-y border-line bg-paper-2">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-8 border-b border-line pb-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="eyebrow text-brand">Four listing packages</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Start with the media the listing needs.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="border-t border-line pt-3">
              <p className="font-mono text-xs font-semibold uppercase text-brand">
                Pricing
              </p>
              <p className="mt-1 text-sm text-ink-2">Published starting points</p>
            </div>
            <div className="border-t border-line pt-3">
              <p className="font-mono text-xs font-semibold uppercase text-brand">
                Every package
              </p>
              <p className="mt-1 text-sm text-ink-2">Floor plan + listing site</p>
            </div>
            <div className="border-t border-line pt-3">
              <p className="font-mono text-xs font-semibold uppercase text-brand">
                Photo delivery
              </p>
              <p className="mt-1 text-sm text-ink-2">Standard next morning</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5">
          {packages.map((pkg) => {
            const slug = packageSlug(pkg.name);
            return (
              <article
                key={pkg.name}
                className={[
                  "grid overflow-hidden rounded-lg border bg-paper shadow-soft lg:grid-cols-[19rem_1fr]",
                  pkg.featured ? "border-brand" : "border-line",
                ].join(" ")}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-paper-2 lg:aspect-auto lg:min-h-[18rem]">
                  <Image
                    src={imageByPackage[pkg.name] ?? proofImages[0].src}
                    alt={`Representative AREM media for the ${pkg.name} package`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 304px"
                    className="object-cover"
                  />
                  {pkg.featured && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-soft">
                      <Sparkles className="h-3.5 w-3.5" /> Most popular
                    </span>
                  )}
                </div>

                <div className="flex min-w-0 flex-col p-5 sm:p-6 lg:p-7">
                  <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-ink">
                        {pkg.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-brand">{pkg.tagline}</p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-2">
                        {pkg.bestFor}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p className="font-mono text-[0.65rem] font-semibold uppercase text-muted">
                        Starting at
                      </p>
                      <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">
                        ${pkg.startingPrice}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-x-8 gap-y-2 border-t border-line pt-5 sm:grid-cols-2">
                    {pkg.deliverables.map((item) => (
                      <p key={item} className="flex gap-2 text-sm leading-relaxed text-ink-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {item}
                      </p>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs leading-relaxed text-muted">{pkg.deliveryNote}</p>
                      <Link
                        href={`#delivery-${slug}`}
                        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-ink"
                      >
                        <Eye className="h-4 w-4" /> See what arrives
                      </Link>
                    </div>
                    <a
                      href={company.bookingUrl}
                      data-booking-package={pkg.name}
                      className={[
                        "inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                        pkg.featured
                          ? "bg-brand text-white hover:bg-brand-ink"
                          : "border border-line-strong text-ink hover:border-ink",
                      ].join(" ")}
                    >
                      Book {pkg.name} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3 border-t border-line pt-5 md:grid-cols-[1fr_auto] md:items-center">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">
            Property size, travel, rush timing, brokerage terms, and specialty
            add-ons can change the total. The hosted order form confirms the
            exact price before the appointment is locked.
          </p>
          <a
            href="#compare"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-ink"
          >
            Compare every inclusion <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
