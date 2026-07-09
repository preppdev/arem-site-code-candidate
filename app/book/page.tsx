import type { Metadata } from "next";
import { ArrowRight, CalendarCheck, Check, MapPin, PackageCheck } from "lucide-react";
import {
  bookingConfidence,
  bookingSteps,
  company,
  packages,
  priceFactors,
  serviceArea,
} from "../site-data";
import { BookRequestForm } from "./form";

export const metadata: Metadata = {
  title: "Request a Listing Shoot",
  description:
    "Send listing details, preferred timing, package, add-ons, and access notes for an American Real Estate Media shoot.",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Request a Listing Shoot",
    description:
      "Schedule in Aryeo or send listing details to AREM for package and scope review.",
    url: "/book",
    type: "website",
  },
};

const bookingDetails = [
  "Listing address, access notes, lockbox or gate details, and seller contact constraints.",
  "Preferred package, square footage, listing timeline, and any MLS or seller deadline.",
  "Add-ons to discuss: drone, twilight, Matterport, video, virtual staging, or advanced editing.",
  "Weather-sensitive priorities, exterior amenities, waterfront/acreage context, and must-show features.",
] as const;

const teamBookingRules = [
  "Monthly invoicing, office-paid orders, or approval flows should be confirmed before agents start booking.",
  "Define who can order, who receives galleries, who approves add-ons, and who handles urgent listing questions.",
  "Use the brokerage pilot path when multiple agents need the same package standard or billing setup.",
] as const;

export default function BookPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <p className="eyebrow text-brand">Request a listing shoot</p>
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Standard listing ready? Schedule in Aryeo.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
              Most standard resale listings start with Quick & Easy from $150.
              Use Aryeo when you know the package and want to lock availability.
              Use the AREM request form only when the listing needs package
              guidance, travel review, rush timing, specialty media, or
              brokerage billing context first.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-2">
              Availability, final scope, payment terms, weather-sensitive media,
              and travel considerations are confirmed through the booking flow or
              by the team before the shoot is locked.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={company.bookingUrl}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
              >
                Schedule in Aryeo <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#request"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-6 py-3 text-sm font-semibold text-ink hover:border-ink"
              >
                Need help choosing?
              </a>
              <a
                href={company.phoneHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-ink"
              >
                Call {company.phone}
              </a>
            </div>
          </div>
          <div className="rounded-[var(--radius-card)] border border-line bg-paper p-6 shadow-soft lg:col-span-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-brand">
              Fast default
            </p>
            <div className="mt-4 border-y border-line py-4">
              <p className="text-2xl font-semibold tracking-tight text-ink">
                Quick & Easy from $150
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                Full photo coverage, CubiCasa floor plan, showcase site, and
                next-morning gallery delivery for routine resale listings.
              </p>
            </div>
            <div className="mt-5 space-y-4">
              {bookingSteps.map((step, index) => (
                <div key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-mono text-sm font-semibold text-brand">
                    0{index + 1}
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-ink">{step.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:py-14">
          <div>
            <p className="eyebrow text-brand">Book with confidence</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Decision rules before you open the portal.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              These rules keep routine listings fast while making edge cases
              visible before they affect launch timing or price.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bookingConfidence.map((item) => (
              <div key={item.topic} className="border-t border-line pt-4">
                <h3 className="text-sm font-semibold text-ink">{item.topic}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
        <div className="rounded-[var(--radius-card)] border border-line bg-paper p-6 shadow-soft sm:p-8 lg:col-span-7">
          <p className="eyebrow text-brand">Before you open Aryeo</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
            Have these details ready so the order can be confirmed quickly.
          </h2>
          <div className="mt-7 grid gap-4">
            {bookingDetails.map((item) => (
              <div key={item} className="flex gap-3 border-t border-line pt-4 first:border-t-0 first:pt-0">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <p className="text-sm leading-relaxed text-ink-2">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={company.bookingUrl}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
            >
              Open booking portal <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/listing-launch"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-ink hover:border-ink"
            >
              See launch workflow
            </a>
          </div>
        </div>

        <aside className="space-y-4 lg:col-span-5">
          {[
            [MapPin, "Coverage", serviceArea.hubs.slice(0, 8).join(" · ")],
            [PackageCheck, "Price anchors", packages.map((pkg) => `${pkg.name} ${pkg.priceNote}`).join(" · ")],
            [CalendarCheck, "Availability", "Appointment availability, rush timing, weather-sensitive media, and travel are confirmed after request."],
            [ArrowRight, "After request", "The team confirms package fit, scheduling, prep instructions, access details, and payment or billing expectations before the shoot is locked."],
          ].map(([Icon, title, body]) => {
            const TypedIcon = Icon as typeof MapPin;
            return (
              <div key={title as string} className="rounded-[var(--radius-card)] border border-line bg-paper-2 p-5">
                <TypedIcon className="h-5 w-5 text-brand" />
                <h2 className="mt-4 text-base font-semibold text-ink">{title as string}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{body as string}</p>
                {title === "Coverage" && (
                  <a
                    href="/coverage"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-ink"
                  >
                    Check core markets <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            );
          })}
        </aside>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div id="request" className="mx-auto grid max-w-7xl scroll-mt-24 gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <div>
            <p className="eyebrow text-brand">Scoping request</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Use this when the listing needs a quick human review first.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              Send package, address, timing, add-ons, and access notes when you
              need AREM to confirm scope before you schedule in Aryeo.
            </p>
            <a
              href={company.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink"
            >
              Open Aryeo instead <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-8 border-y border-line py-5">
              <p className="eyebrow text-brand">Teams or office billing</p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">
                Use the brokerage lane before rolling this out to agents.
              </h3>
              <div className="mt-4 space-y-3">
                {teamBookingRules.map((rule) => (
                  <p key={rule} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {rule}
                  </p>
                ))}
              </div>
              <a
                href="/brokerages#brokerage-inquiry"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-ink"
              >
                Request brokerage setup <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <BookRequestForm />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="grid gap-8 border-t border-line pt-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow text-brand">Price clarity</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              What can change a starting price.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              AREM publishes package anchors so agents can choose quickly. Final
              totals are confirmed before the appointment is locked.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {priceFactors.map((factor) => (
              <div key={factor} className="border-t border-line pt-3 text-sm leading-relaxed text-ink-2">
                {factor}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
