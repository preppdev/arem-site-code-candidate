import type { Metadata } from "next";
import { ArrowRight, MapPin } from "lucide-react";
import { company, marketPages, serviceArea } from "../site-data";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Explore American Real Estate Media service-area pages for Hampton Roads, coastal Virginia, and northeastern North Carolina real estate photography and listing media.",
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: "AREM Service Areas",
    description:
      "Explore AREM real estate photography and listing media coverage across Hampton Roads, coastal Virginia, and northeastern North Carolina.",
    url: "/locations",
    type: "website",
  },
};

export default function LocationsPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <p className="eyebrow text-brand">Service areas</p>
            <h1 className="mt-3 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Real estate photography across Hampton Roads and coastal North Carolina.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
              AREM is headquartered in {company.hq} and supports agents, teams,
              and brokerages across the core markets below. Travel-sensitive
              orders are confirmed before the shoot is locked.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={company.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
              >
                Book now <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/coverage"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-6 py-3 text-sm font-semibold text-ink hover:border-ink"
              >
                See coverage
              </a>
            </div>
          </div>
          <div className="border-y border-line py-6 lg:col-span-5">
            <MapPin className="h-5 w-5 text-brand" />
            <h2 className="mt-4 text-base font-semibold text-ink">
              Core coverage
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              {serviceArea.body}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {marketPages.map((market) => (
            <a
              key={market.slug}
              href={`/locations/${market.slug}`}
              className="group border-t border-line pt-5"
            >
              <p className="eyebrow text-brand">{market.region}</p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-ink group-hover:text-brand">
                {market.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">
                {market.intro}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                View market page <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
