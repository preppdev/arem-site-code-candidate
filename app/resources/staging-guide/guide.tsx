"use client";

import { useEffect, useState } from "react";
import {
  Home,
  Sparkles,
  Utensils,
  UtensilsCrossed,
  Sofa,
  Bath,
  WashingMachine,
  Shirt,
  BedDouble,
  Wand2,
  Check,
  RotateCcw,
  PartyPopper,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import {
  areas,
  phases,
  requiredItemIds,
  type Phase,
} from "./staging-data";
import { company } from "../../site-data";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Sparkles,
  Utensils,
  UtensilsCrossed,
  Sofa,
  Bath,
  WashingMachine,
  Shirt,
  BedDouble,
  Wand2,
};

const KEY = "arem-staging-v1";

const PHASE_STYLE: Record<Phase, string> = {
  before: "bg-twilight/15 text-[color:var(--color-twilight)]",
  "day-before": "bg-brand-soft text-brand-ink",
  "day-of": "bg-brand text-white",
};
const PHASE_LABEL: Record<Phase, string> = {
  before: "2+ days",
  "day-before": "1 day",
  "day-of": "Day of",
};

export function StagingGuide() {
  const [checked, setChecked] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });
  const [filter, setFilter] = useState<Phase | "all">("all");

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify([...checked]));
  }, [checked]);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const requiredDone = requiredItemIds.filter((id) => checked.has(id)).length;
  const total = requiredItemIds.length;
  const pct = total ? Math.round((requiredDone / total) * 100) : 0;
  const allDone = requiredDone === total;

  return (
    <div>
      {/* sticky progress */}
      <div className="sticky top-16 z-40 border-y border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto max-w-3xl px-5 py-3 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm font-semibold text-ink">
              {requiredDone} of {total} essentials done
              <span className="ml-2 font-mono text-brand">{pct}%</span>
            </div>
            <button
              onClick={() => setChecked(new Set())}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-paper-2">
            <div
              className="h-full rounded-full bg-brand transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
        {/* completion banner */}
        {allDone && (
          <div className="mb-8 rounded-[var(--radius-card)] border border-brand bg-brand-soft p-6 text-center">
            <PartyPopper className="mx-auto h-8 w-8 text-brand" />
            <h2 className="mt-3 text-xl font-semibold text-ink">
              You&apos;re 10× more prepared than the average homeowner.
            </h2>
            <p className="mt-2 text-sm text-ink-2">
              That&apos;s everything essential checked off. Now get excited for the next
              step — Picture Day!
            </p>
            <a
              href={company.bookingUrl}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
            >
              Book or confirm your shoot <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}

        {/* timing filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-medium text-muted">Show:</span>
          {(["all", ...phases.map((p) => p.key)] as const).map((key) => {
            const active = filter === key;
            const label = key === "all" ? "Everything" : PHASE_LABEL[key as Phase];
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "bg-ink text-paper"
                    : "border border-line bg-paper text-ink-2 hover:border-ink"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        {filter !== "all" && (
          <p className="mt-3 text-sm text-muted">
            {phases.find((p) => p.key === filter)?.sub}
          </p>
        )}

        {/* areas */}
        <div className="mt-8 space-y-6">
          {areas.map((area) => {
            const visibleItems = area.items.filter(
              (i) => filter === "all" || i.phase === filter,
            );
            if (visibleItems.length === 0) return null;
            const Icon = ICONS[area.icon] ?? Sparkles;
            const done = area.items.filter((i) => checked.has(i.id)).length;
            return (
              <section
                key={area.id}
                className="rounded-[var(--radius-card)] border border-line bg-paper p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-ink">
                        {area.name}
                        {area.optional && (
                          <span className="ml-2 align-middle text-xs font-normal text-muted">
                            optional
                          </span>
                        )}
                      </h3>
                      <p className="mt-0.5 text-sm text-ink-2">{area.intro}</p>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted">
                    {done}/{area.items.length}
                  </span>
                </div>

                <ul className="mt-4 space-y-1.5">
                  {visibleItems.map((item) => {
                    const isOn = checked.has(item.id);
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => toggle(item.id)}
                          aria-pressed={isOn}
                          className="flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-paper-2"
                        >
                          <span
                            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                              isOn
                                ? "border-brand bg-brand text-white"
                                : "border-line-strong bg-paper"
                            }`}
                          >
                            {isOn && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                          </span>
                          <span
                            className={`flex-1 text-sm leading-relaxed ${
                              isOn ? "text-muted line-through" : "text-ink"
                            }`}
                          >
                            {item.text}
                          </span>
                          {filter === "all" && (
                            <span
                              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${PHASE_STYLE[item.phase]}`}
                            >
                              {PHASE_LABEL[item.phase]}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {area.proTip && (
                  <div className="mt-4 flex gap-2.5 rounded-lg bg-paper-2 p-3.5">
                    <Lightbulb className="h-4 w-4 shrink-0 text-twilight" />
                    <p className="text-sm text-ink-2">
                      <span className="font-semibold text-ink">Pro tip — </span>
                      {area.proTip}
                    </p>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Your progress saves automatically on this device. The list isn&apos;t mandatory
          or exhaustive — do what you can, and{" "}
          <a href={company.emailHref} className="font-medium text-brand hover:underline">
            ask us
          </a>{" "}
          if you have questions.
        </p>
      </div>
    </div>
  );
}
