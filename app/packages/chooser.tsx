"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { company, packages } from "../site-data";
import { recommendPackage } from "./recommend";

const situations = [
  "Standard resale",
  "Seller presentation",
  "Vacant listing",
  "Luxury / waterfront",
  "Relocation buyer",
] as const;

const priorities = [
  "Lowest cost",
  "Full photo coverage",
  "Video and drone",
  "Immersive tour",
] as const;

const priceBands = ["Entry", "Mid-market", "Premium"] as const;
const occupancyOptions = ["Occupied", "Vacant", "New construction"] as const;
const deadlineOptions = ["Flexible", "This week", "Rush / urgent"] as const;
const sellerPressureOptions = ["Low", "Medium", "High"] as const;
const squareFootageBands = ["Under 2,000", "2,000-3,500", "3,500+"] as const;
const marketOptions = [
  "Hampton Roads core",
  "Richmond / extended VA",
  "Eastern Shore",
  "Elizabeth City / NE NC",
  "OBX / travel-sensitive",
] as const;

type Choice<T extends readonly string[]> = T[number];

function PillGroup<T extends readonly string[]>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T;
  value: Choice<T>;
  onChange: (value: Choice<T>) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={[
              "rounded-full border px-3 py-2 text-sm font-medium transition-colors",
              value === item
                ? "border-brand bg-brand text-white"
                : "border-line bg-paper-2 text-ink-2 hover:border-ink",
            ].join(" ")}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PackageChooser() {
  const [situation, setSituation] = useState<Choice<typeof situations>>("Standard resale");
  const [priority, setPriority] = useState<Choice<typeof priorities>>("Full photo coverage");
  const [priceBand, setPriceBand] = useState<Choice<typeof priceBands>>("Mid-market");
  const [occupancy, setOccupancy] = useState<Choice<typeof occupancyOptions>>("Occupied");
  const [deadline, setDeadline] = useState<Choice<typeof deadlineOptions>>("This week");
  const [sellerPressure, setSellerPressure] = useState<Choice<typeof sellerPressureOptions>>("Medium");
  const [squareFootage, setSquareFootage] = useState<Choice<typeof squareFootageBands>>("Under 2,000");
  const [market, setMarket] = useState<Choice<typeof marketOptions>>("Hampton Roads core");

  const result = useMemo(
    () =>
      recommendPackage({
        situation,
        priority,
        priceBand,
        occupancy,
        deadline,
        sellerPressure,
        squareFootage,
        market,
      }),
    [deadline, market, occupancy, priceBand, priority, sellerPressure, situation, squareFootage]
  );

  const recommendation =
    packages.find((pkg) => pkg.name === result.name) ??
    packages.find((pkg) => pkg.name === "Quick & Easy") ??
    packages[0];

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="eyebrow text-brand">Launch plan builder</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Choose the package that fits the listing.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-2">
            Use this as a planning aid before booking. AREM still confirms final
            scope, add-ons, timing, travel, and weather-sensitive media before
            the shoot is locked.
          </p>
        </div>

        <div className="rounded-[var(--radius-card)] border border-line bg-paper p-5 shadow-soft">
          <div className="grid gap-6 md:grid-cols-2">
            <PillGroup label="Listing situation" options={situations} value={situation} onChange={setSituation} />
            <PillGroup label="Primary priority" options={priorities} value={priority} onChange={setPriority} />
            <PillGroup label="Listing tier" options={priceBands} value={priceBand} onChange={setPriceBand} />
            <PillGroup label="Square footage" options={squareFootageBands} value={squareFootage} onChange={setSquareFootage} />
          </div>

          <details className="mt-6 border-t border-line pt-5">
            <summary className="cursor-pointer text-sm font-semibold text-brand">
              Add timing, occupancy, and service-area details
            </summary>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <PillGroup label="Occupancy" options={occupancyOptions} value={occupancy} onChange={setOccupancy} />
              <PillGroup label="Deadline" options={deadlineOptions} value={deadline} onChange={setDeadline} />
              <PillGroup label="Seller-presentation pressure" options={sellerPressureOptions} value={sellerPressure} onChange={setSellerPressure} />
              <PillGroup label="Market / service area" options={marketOptions} value={market} onChange={setMarket} />
            </div>
          </details>

          <div className="mt-6 border-t border-line pt-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
              Recommended starting point
            </p>
            <div className="mt-3 grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-ink">
                  {recommendation.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{recommendation.priceNote}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">
                  {recommendation.bestFor}
                </p>
                <div className="mt-4 rounded-xl bg-paper-2 p-4">
                  <p className="text-sm font-semibold text-ink">Why this package</p>
                  <ul className="mt-2 space-y-2">
                    {result.reasons.map((reason) => (
                      <li key={reason} className="flex gap-2 text-sm leading-relaxed text-ink-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 rounded-xl border border-line bg-paper p-4">
                  <p className="text-sm font-semibold text-ink">
                    Scope read: {result.scopeLevel}
                  </p>
                  {result.scopeNotes.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {result.scopeNotes.map((note) => (
                        <li key={note} className="flex gap-2 text-sm leading-relaxed text-ink-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">
                      Based on these inputs, this looks like a routine package
                      starting point. Final order details are still confirmed in the booking flow.
                    </p>
                  )}
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {recommendation.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-ink-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-3">
                <a
                  href={company.bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
                >
                  Book this package <ArrowRight className="h-4 w-4" />
                </a>
                <p className="max-w-[15rem] text-xs leading-relaxed text-muted">
                  Booking opens in a new tab. Confirm address, square footage,
                  access notes, add-ons, and preferred timing there.
                </p>
                <a
                  href="#compare"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink"
                >
                  Compare details <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/samples"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink"
                >
                  See proof <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
