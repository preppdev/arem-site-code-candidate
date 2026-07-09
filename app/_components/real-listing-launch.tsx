import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { company, samples } from "../site-data";

type RealListingLaunchProps = {
  mode?: "full" | "compact";
  marketName?: string;
  primaryHref?: string;
  primaryLabel?: string;
  anchorId?: string;
};

const launchProof = [
  ["Market", "Hampton Roads / Coastal Virginia"],
  ["Package fit", "Quick & Easy baseline, Spotlight upgrade when video or drone matters"],
  ["Timeline", "Booked, captured, delivered for next-morning launch"],
  ["Delivered", "Photo gallery, floor plan path, property website, MLS-ready downloads"],
  ["Final use", "MLS, seller update, social launch, print, and property marketing"],
] as const;

const launchSteps = [
  "Hero exterior and room-flow images help the listing look premium before buyers read the details.",
  "Package context tells the agent what to order instead of forcing them to rebuild the media plan.",
  "Delivery links and files are organized around the actual launch workflow: MLS, seller, social, and web.",
] as const;

export function RealListingLaunch({
  mode = "full",
  marketName,
  primaryHref,
  primaryLabel,
  anchorId,
}: RealListingLaunchProps) {
  const imageSamples = samples.filter((sample) => sample.image).slice(0, 6);
  const lead = imageSamples[0];
  const googleLink = company.socialLinks.find((link) => link.label === "Google");
  const externalProof = samples.filter((sample) => sample.externalUrl).slice(0, 4);
  const compact = mode === "compact";
  const supporting = imageSamples.slice(1, compact ? 3 : 6);
  const displayMarket = marketName ?? "Coastal Virginia";

  if (!lead?.image) return null;

  return (
    <section
      id={anchorId ?? (compact ? undefined : "launch-proof")}
      className="border-y border-line bg-night text-paper"
    >
      <div
        className={[
          "mx-auto max-w-7xl px-5 sm:px-8",
          compact ? "py-10 lg:py-12" : "py-12 lg:py-16",
        ].join(" ")}
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow text-twilight">Real listing launch proof</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
              One AREM launch stack, from first impression to final delivery.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-paper/70">
              Built from approved AREM sample assets and live sample-library
              paths, this proof stack shows how a {displayMarket} listing is
              packaged for launch without exposing private client details.
            </p>

            <div className="mt-5 divide-y divide-paper/12 border-y border-paper/12">
              {launchProof.slice(0, compact ? 4 : launchProof.length).map(([label, value]) => (
                <div key={label} className="grid gap-2 py-3 sm:grid-cols-[7rem_1fr] lg:grid-cols-1 xl:grid-cols-[7rem_1fr]">
                  <p className="font-mono text-[0.68rem] uppercase tracking-widest text-twilight">
                    {label}
                  </p>
                  <p className="text-sm leading-relaxed text-paper/72">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={primaryHref ?? "/samples"}
                className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink hover:bg-paper/90"
              >
                {primaryLabel ?? "Inspect samples"} <ArrowRight className="h-4 w-4" />
              </Link>
              {googleLink && (
                <a
                  href={googleLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-5 py-2.5 text-sm font-semibold text-paper hover:border-paper/50"
                >
                  Google profile <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div className="grid gap-5 lg:col-span-8">
            <div className="grid gap-3 lg:grid-cols-[1.25fr_0.75fr]">
              <figure
                className={[
                  "group relative overflow-hidden rounded-[var(--radius-card)] bg-night shadow-lift",
                  compact ? "min-h-[18rem] sm:min-h-[20rem]" : "min-h-[24rem]",
                ].join(" ")}
              >
                <Image
                  src={lead.image}
                  alt={`${lead.title} - AREM launch proof`}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent p-5">
                  <p className="font-mono text-[0.68rem] uppercase tracking-widest text-paper/60">
                    Launch hero image
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-paper">
                    {lead.title}
                  </h3>
                  <p className="mt-2 text-sm text-paper/70">
                    {[lead.market, lead.packageName, lead.useCase].filter(Boolean).join(" · ")}
                  </p>
                </figcaption>
              </figure>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                {supporting.slice(0, compact ? 2 : 3).map((sample) => (
                  <figure
                    key={sample.title}
                    className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-paper/10 bg-paper/5 lg:aspect-auto"
                  >
                    {sample.image && (
                      <Image
                        src={sample.image}
                        alt={`${sample.title} - ${sample.market ?? "AREM sample"}`}
                        fill
                        sizes="(min-width: 1024px) 18vw, 50vw"
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
                {!compact && (
                  <Link
                    href="/listing-launch"
                    className="grid aspect-[4/3] place-items-center rounded-[var(--radius-card)] border border-paper/15 bg-paper/5 p-4 text-center lg:hidden"
                  >
                    <span>
                      <span className="block font-mono text-[0.68rem] uppercase tracking-widest text-twilight">
                        Workflow
                      </span>
                      <span className="mt-2 block text-sm font-semibold text-paper">
                        See the launch process
                      </span>
                    </span>
                  </Link>
                )}
              </div>
            </div>

            {!compact && (
              <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
                <div className="divide-y divide-paper/12 border-y border-paper/12">
                  {launchSteps.map((step) => (
                    <p key={step} className="flex gap-3 py-3 text-sm leading-relaxed text-paper/72">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-twilight" />
                      {step}
                    </p>
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {externalProof.map((sample) => (
                    <a
                      key={sample.title}
                      href={sample.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[var(--radius-card)] border border-paper/12 bg-paper/5 p-4 hover:border-paper/35"
                    >
                      <p className="font-mono text-[0.68rem] uppercase tracking-widest text-twilight">
                        {sample.category}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-paper">{sample.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-paper/60">
                        {sample.note}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
