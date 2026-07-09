import type { Metadata } from "next";
import { ArrowRight, Check, ClipboardCheck } from "lucide-react";
import {
  company,
  listingLaunchTimeline,
  mediaStandards,
  prepChecklist,
} from "../site-data";

export const metadata: Metadata = {
  title: "Listing Launch Workflow",
  description:
    "See how American Real Estate Media takes a listing from request to shoot to market-ready media delivery.",
};

export default function ListingLaunchPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow text-brand">Listing launch workflow</p>
          <h1 className="mt-3 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            From request to market-ready media without listing-day guesswork.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
            AREM&apos;s value is not only the finished media. It is the repeatable
            workflow around the shoot: scope, prep, capture, delivery, and the
            handoff agents need to get a listing live.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={company.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
            >
              Open booking portal <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/samples"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-6 py-3 text-sm font-semibold text-ink hover:border-ink"
            >
              See sample media
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow text-brand">Timeline</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              One listing launch, five operating moments.
            </h2>
          </div>
          <div className="grid gap-5">
            {listingLaunchTimeline.map((step, index) => (
              <div
                key={step.title}
                className="grid gap-4 border-t border-line pt-5 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr]"
              >
                <span className="font-mono text-2xl font-semibold text-brand">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <p className="eyebrow text-brand">Seller prep</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              What needs to be ready before the media team arrives.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              The smoother the property handoff, the stronger the final media.
              These are the practical details that reduce day-of friction.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-[var(--radius-card)] border border-line bg-paper p-6 shadow-soft">
              <ClipboardCheck className="h-6 w-6 text-brand" />
              <ul className="mt-5 space-y-3">
                {prepChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand">Delivery standards</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Typical timing, with constraints called out before launch.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-2">
            Availability, drone conditions, video edits, Matterport processing,
            rush timing, and complex add-ons should be confirmed before the
            listing depends on them.
          </p>
        </div>
        <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-line shadow-soft">
          <table className="w-full border-collapse text-left">
            <thead className="bg-paper-2">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-ink">Media</th>
                <th className="px-5 py-4 text-sm font-semibold text-ink">Deliverables</th>
                <th className="px-5 py-4 text-sm font-semibold text-ink">Timing</th>
              </tr>
            </thead>
            <tbody>
              {mediaStandards.map((item) => (
                <tr key={item.service} className="border-t border-line bg-paper align-top">
                  <td className="px-5 py-4 text-sm font-semibold text-ink">
                    {item.service}
                  </td>
                  <td className="px-5 py-4 text-sm leading-relaxed text-ink-2">
                    {item.deliverables}
                    <span className="mt-1 block text-xs text-muted">{item.notes}</span>
                  </td>
                  <td className="px-5 py-4 text-sm leading-relaxed text-ink-2">
                    {item.timing}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 border-y border-line py-10 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              Have a listing timeline already?
            </h2>
            <p className="mt-2 text-sm text-ink-2">
              Send the address, package, deadline, access notes, and add-ons so
              AREM can confirm scope before the shoot.
            </p>
          </div>
          <a
            href={company.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Open booking portal <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
