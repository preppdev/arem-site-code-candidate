"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  sampleCategoryDetails,
  sampleCategories,
  samples,
  type SampleCategory,
} from "../site-data";

const hasProof = (sample: (typeof samples)[number]) =>
  Boolean(sample.image || sample.externalUrl);

const visibleCategories = sampleCategories.filter((cat) => {
  if (cat === "All") return true;
  return samples.some((s) => s.category === cat && hasProof(s));
});

function categorySlug(cat: SampleCategory) {
  return cat.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");
}

function categoryFromParam(value: string | null) {
  if (!value) return null;
  const normalized = value.toLowerCase();
  return (
    visibleCategories.find(
      (cat) => categorySlug(cat) === normalized || cat.toLowerCase() === normalized,
    ) ?? null
  );
}

export function SampleGallery() {
  const [active, setActive] = useState<SampleCategory>("All");

  useEffect(() => {
    const applyRequestedCategory = () => {
      const requested = new URLSearchParams(window.location.search).get("type");
      const category = categoryFromParam(requested);
      if (category) setActive(category);
    };

    applyRequestedCategory();
    window.addEventListener("popstate", applyRequestedCategory);
    window.addEventListener("hashchange", applyRequestedCategory);
    return () => {
      window.removeEventListener("popstate", applyRequestedCategory);
      window.removeEventListener("hashchange", applyRequestedCategory);
    };
  }, []);

  const selectCategory = (cat: SampleCategory) => {
    setActive(cat);
    const nextUrl =
      cat === "All"
        ? `${window.location.pathname}#gallery`
        : `${window.location.pathname}?type=${categorySlug(cat)}#gallery`;
    window.history.replaceState(null, "", nextUrl);
  };

  const shown =
    active === "All" ? samples : samples.filter((s) => s.category === active);
  const proofSamples = shown.filter(hasProof);
  const activeDetail = active === "All" ? null : sampleCategoryDetails[active];

  return (
    <div>
      {/* filter pills */}
      <div className="flex flex-wrap gap-2">
        {visibleCategories.map((cat) => {
          const isActive = cat === active;
          const count =
            cat === "All"
              ? samples.filter(hasProof).length
              : samples.filter((s) => s.category === cat && hasProof(s)).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => selectCategory(cat)}
              aria-pressed={isActive}
              className={[
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-paper text-ink-2 hover:border-ink",
              ].join(" ")}
            >
              {cat}
              <span
                className={[
                  "ml-1.5 font-mono text-xs",
                  isActive ? "text-white/70" : "text-muted",
                ].join(" ")}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {activeDetail && (
        <div className="mt-6 grid gap-4 border-y border-line py-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-brand">{active}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
              {activeDetail.headline}
            </h2>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-ink-2">
              {activeDetail.body}
            </p>
            <a
              href={activeDetail.href}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-ink"
            >
              See {active.toLowerCase()} service details
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {proofSamples.map((s, index) =>
          s.image ? (
            <figure
              key={s.title}
              className={[
                "group relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-night shadow-soft",
                s.tall || index === 0 ? "sm:row-span-2 aspect-[4/5]" : "aspect-[4/3]",
              ].join(" ")}
            >
              <Image
                src={s.image}
                alt={`${s.title} — ${s.market ?? "AREM sample"}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[0.6rem] font-semibold text-ink">
                {s.category}
              </span>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent p-3 pt-8">
                <span className="text-xs font-semibold text-paper">{s.title}</span>
                <span className="mt-1 block text-[0.68rem] text-paper/65">
                  {[s.market, s.packageName].filter(Boolean).join(" · ")}
                </span>
                {(s.propertyType || s.useCase) && (
                  <span className="mt-1 block text-[0.68rem] text-paper/60">
                    {[s.propertyType, s.useCase].filter(Boolean).join(" · ")}
                  </span>
                )}
                {s.note && (
                  <span className="mt-1 block text-[0.68rem] text-paper/55">
                    {s.note}
                  </span>
                )}
              </figcaption>
            </figure>
          ) : (
            <a
              key={s.title}
              href={s.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex aspect-[4/3] flex-col justify-between rounded-[var(--radius-card)] border border-line bg-paper-2 p-5 shadow-soft transition-colors hover:border-brand"
            >
              <div>
                <span className="rounded-full bg-brand/10 px-2.5 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-brand">
                  {s.category}
                </span>
                <h2 className="mt-5 text-xl font-semibold tracking-tight text-ink">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {[s.market, s.packageName].filter(Boolean).join(" · ")}
                </p>
                {(s.propertyType || s.useCase) && (
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    {[s.propertyType, s.useCase].filter(Boolean).join(" · ")}
                  </p>
                )}
                {s.note && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {s.note}
                  </p>
                )}
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                {s.externalLabel ?? "View samples"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          )
        )}
      </div>

      {proofSamples.length === 0 && null}
    </div>
  );
}
