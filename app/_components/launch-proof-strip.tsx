import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { samples, type ProofService, type Sample } from "../site-data";

type LaunchProofStripProps = {
  marketName?: string;
  marketRegion?: string;
  localCue?: string;
  serviceFocus?: readonly ProofService[];
};

const defaultProofPoints = [
  ["Real work", "Approved AREM sample assets"],
  ["Default path", "Quick & Easy for standard listings"],
  ["Launch stack", "Photos, floor plan, site, downloads"],
] as const;

type ImageSample = Sample & { image: string };
type ProofRelation = "local" | "regional" | "reference" | "general";
type ServiceProofConfidence = "local" | "regional" | "reference" | "library";
type LaunchProofSample = ImageSample & { proofRelation: ProofRelation };

function hasImage(sample: Sample | undefined): sample is ImageSample {
  return Boolean(sample?.image);
}

function relationForSample(
  sample: ImageSample,
  marketName?: string,
  marketRegion?: string,
): ProofRelation {
  const fit = sample.proofFit;
  if (!fit || !marketName) return "general";
  if (fit.localMarkets?.includes(marketName)) return "local";
  if (marketRegion && fit.regions?.includes(marketRegion)) return "regional";
  if (fit.referenceMarkets?.includes(marketName)) return "reference";
  if (marketRegion && fit.referenceRegions?.includes(marketRegion)) {
    return "reference";
  }
  return "general";
}

const relationWeight: Record<ProofRelation, number> = {
  local: 400,
  regional: 300,
  reference: 160,
  general: 20,
};

function overlapCount(a: readonly ProofService[] = [], b: readonly ProofService[] = []) {
  return a.filter((item) => b.includes(item)).length;
}

function curatedProofSamples(
  marketName?: string,
  marketRegion?: string,
  serviceFocus: readonly ProofService[] = [],
): LaunchProofSample[] {
  const imageSamples = samples.filter(hasImage).map((sample) => ({
    ...sample,
    proofRelation: relationForSample(sample, marketName, marketRegion),
  }));
  const score = (sample: LaunchProofSample) => {
    const localMarkets = sample.proofFit?.localMarkets ?? [];
    const isSomeoneElsesLocalSample =
      localMarkets.length > 0 && (!marketName || !localMarkets.includes(marketName));
    const specificityPenalty =
      sample.proofRelation === "regional" || sample.proofRelation === "general"
        ? isSomeoneElsesLocalSample
          ? 24
          : 0
        : 0;

    return (
      relationWeight[sample.proofRelation] +
      (sample.proofFit?.priority ?? 0) -
      specificityPenalty +
      overlapCount(sample.proofFit?.serviceFit, serviceFocus) * 8
    );
  };

  return imageSamples
    .sort((a, b) => {
      return score(b) - score(a);
    })
    .slice(0, 3);
}

function displayRegion(region?: string) {
  return region?.replace(", VA", "").replace("Northeastern North Carolina", "NE North Carolina");
}

function proofSummaryFor(samplesToSummarize: LaunchProofSample[], marketRegion?: string) {
  const relations = new Set(samplesToSummarize.map((sample) => sample.proofRelation));
  const region = displayRegion(marketRegion);

  if (relations.has("local") && relations.has("regional")) {
    return region ? `Local + ${region} regional proof` : "Local + regional proof";
  }
  if (relations.has("local")) return "Local proof available";
  if (relations.has("regional") && relations.has("reference")) {
    return region ? `${region} regional + reference proof` : "Regional + reference proof";
  }
  if (relations.has("regional")) {
    return region ? `${region} regional proof` : "Regional proof set";
  }
  if (relations.has("reference")) return "Reference proof set";
  return "Curated AREM proof set";
}

const serviceLabels: Record<ProofService, string> = {
  Photography: "photo",
  Video: "video",
  Aerial: "drone",
  Twilight: "twilight",
  Matterport: "Matterport",
  "Floor Plans": "floor plan",
  "Virtual Staging": "staging",
  "Advanced Editing": "advanced edits",
};

const serviceProofLabels: Record<ProofService, string> = {
  Photography: "Photo",
  Video: "Video",
  Aerial: "Drone",
  Twilight: "Twilight",
  Matterport: "Matterport",
  "Floor Plans": "Floor plan",
  "Virtual Staging": "Staging",
  "Advanced Editing": "Edit",
};

const serviceConfidenceLabels: Record<ServiceProofConfidence, string> = {
  local: "Local",
  regional: "Regional",
  reference: "Reference",
  library: "Library",
};

function serviceSummaryFor(serviceFocus: readonly ProofService[] = []) {
  const proofedServices = new Set(
    samples.flatMap((sample) => sample.proofFit?.serviceFit ?? []),
  );
  const matched = serviceFocus.filter((service) => proofedServices.has(service));
  const displayed = (matched.length > 0 ? matched : serviceFocus).slice(0, 3);

  if (displayed.length === 0) return "Photos, floor plan, site, downloads";

  return `${displayed.map((service) => serviceLabels[service]).join(", ")} proof`;
}

function confidenceForService(
  service: ProofService,
  imageSamples: readonly LaunchProofSample[],
): ServiceProofConfidence {
  if (service !== "Photography") return "library";

  const photoSample = imageSamples.find((sample) =>
    sample.proofFit?.serviceFit?.includes("Photography"),
  );

  if (photoSample?.proofRelation === "local") return "local";
  if (photoSample?.proofRelation === "regional") return "regional";
  if (photoSample?.proofRelation === "reference") return "reference";
  return "library";
}

function serviceProofLabel(service: ProofService, confidence: ServiceProofConfidence) {
  const label = serviceProofLabels[service];
  if (confidence === "library") return `${label} library`;
  return `${serviceConfidenceLabels[confidence]} ${label.toLowerCase()}`;
}

function serviceProofLinksFor(
  serviceFocus: readonly ProofService[] = [],
  imageSamples: readonly LaunchProofSample[] = [],
) {
  return serviceFocus
    .map((service) => {
      const confidence = confidenceForService(service, imageSamples);

      if (service === "Photography") {
        return {
          service,
          confidence,
          href: "/samples#launch-proof",
          label: serviceProofLabel(service, confidence),
        };
      }

      const sample = samples.find(
        (item) => item.externalUrl && item.proofFit?.serviceFit?.includes(service),
      );
      if (!sample?.externalUrl) return null;

      return {
        service,
        confidence,
        href: sample.externalUrl,
        label: serviceProofLabel(service, confidence),
      };
    })
    .filter(
      (
        link,
        index,
        all,
      ): link is {
        service: ProofService;
        confidence: ServiceProofConfidence;
        href: string;
        label: string;
      } => {
        if (!link) return false;
        return all.findIndex((item) => item?.service === link.service) === index;
      },
    )
    .slice(0, 3);
}

export function LaunchProofStrip({
  marketName,
  marketRegion,
  localCue,
  serviceFocus = [],
}: LaunchProofStripProps) {
  const imageSamples = curatedProofSamples(marketName, marketRegion, serviceFocus);
  const serviceProofLinks = serviceProofLinksFor(serviceFocus, imageSamples);
  const displayMarket = marketName ?? "Coastal Virginia";
  const proofSummary = proofSummaryFor(imageSamples, marketRegion);
  const proofPoints = marketName
    ? ([
        ["Local cue", localCue ?? `Plan the media mix around ${displayMarket} listing context.`],
        ["Proof set", proofSummary],
        ["Media fit", serviceSummaryFor(serviceFocus)],
      ] as const)
    : defaultProofPoints;

  return (
    <section className="border-y border-line bg-paper">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:px-8 lg:grid-cols-[0.5fr_1.5fr] lg:items-center">
        <div>
          <p className="eyebrow text-brand">Launch proof</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            Need proof before booking?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            Quick checkpoint for {displayMarket}; curated samples and the full
            proof stack stay one click away.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="grid gap-3 sm:grid-cols-3">
            {proofPoints.map(([label, detail]) => (
              <div key={label} className="border-t border-line pt-3">
                <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-brand">
                  {label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">
                  {detail}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-[9rem_auto] sm:items-center">
            {imageSamples.length > 0 && (
              <div className="grid w-32 grid-cols-3 gap-1.5 sm:w-36">
                {imageSamples.map((sample) => (
                  <Link
                    key={sample.title}
                    href="/samples#launch-proof"
                    className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] bg-paper-2"
                    aria-label={`View ${sample.proofRelation} launch proof sample: ${sample.title}`}
                  >
                    {sample.image && (
                      <Image
                        src={sample.image}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    )}
                  </Link>
                ))}
              </div>
            )}
            <div className="grid gap-2">
              {serviceProofLinks.length > 0 && (
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {serviceProofLinks.map((link) => (
                    <a
                      key={link.service}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-1 border-b border-brand/25 pb-0.5 text-xs font-semibold text-brand hover:border-brand hover:text-brand-ink"
                      aria-label={`Open ${link.label.toLowerCase()} proof`}
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/samples#launch-proof"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-ink"
                >
                  Full proof <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/listing-launch"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-semibold text-ink hover:border-ink"
                >
                  Workflow
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
