import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { samples } from "../site-data";

type LaunchProofStripProps = {
  marketName?: string;
};

const proofPoints = [
  ["Real work", "Approved AREM sample assets"],
  ["Launch stack", "Photos, floor plan, site, and downloads"],
  ["Use case", "MLS, seller updates, social, and print"],
] as const;

export function LaunchProofStrip({ marketName }: LaunchProofStripProps) {
  const imageSamples = samples.filter((sample) => sample.image).slice(0, 3);
  const displayMarket = marketName ?? "Coastal Virginia";

  return (
    <section className="border-y border-line bg-paper">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:px-8 lg:grid-cols-[0.5fr_1.5fr] lg:items-center">
        <div>
          <p className="eyebrow text-brand">Launch proof</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
            Need proof before booking?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            Quick checkpoint for {displayMarket}; the full sample stack stays on
            the dedicated proof pages.
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
              <div className="grid grid-cols-3 gap-1.5 sm:w-36">
                {imageSamples.map((sample) => (
                  <Link
                    key={sample.title}
                    href="/samples#launch-proof"
                    className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] bg-paper-2"
                    aria-label={`View launch proof sample: ${sample.title}`}
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
    </section>
  );
}
