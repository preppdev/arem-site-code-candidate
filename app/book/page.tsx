import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Layers3,
  ListChecks,
  LockKeyhole,
  Phone,
  Sparkles,
  Zap,
} from "lucide-react";
import { bookingConfidence, company, packages, serviceArea } from "../site-data";

export const metadata: Metadata = {
  title: "Booking Lightbox Concepts",
  description:
    "Explore four frontend booking lightbox concepts for AREM listing media orders.",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Booking Lightbox Concepts",
    description:
      "Compare four design directions for an AREM-owned booking workflow.",
    url: "/book",
    type: "website",
  },
};

const conceptBoundaries = [
  "Every normal Book now link opens the lightbox instead of sending visitors into a separate embedded flow.",
  "The prototype uses package anchors and concept pricing only; it does not create a live order.",
  "A production version still needs availability, payment, account routing, notifications, and backend validation.",
] as const;

const concepts = [
  {
    key: "guided",
    title: "Guided Checkout",
    eyebrow: "Baseline production flow",
    body: "A structured five-step checkout for first-time users and standard public booking.",
    icon: ListChecks,
    accent: "text-brand",
  },
  {
    key: "express",
    title: "Express Reorder",
    eyebrow: "Repeat-agent speed path",
    body: "A compact path for agents who already know their defaults and need to request quickly.",
    icon: Zap,
    accent: "text-emerald-700",
  },
  {
    key: "concierge",
    title: "Concierge Builder",
    eyebrow: "Recommendation-first flow",
    body: "A goal-led flow that recommends the right package and add-on mix before checkout.",
    icon: Sparkles,
    accent: "text-amber-700",
  },
  {
    key: "team",
    title: "Team Command Desk",
    eyebrow: "Brokerage operations flow",
    body: "A team-aware workflow for coordinators, approval rules, billing, and delivery routing.",
    icon: Building2,
    accent: "text-slate-800",
  },
] as const;

export default function BookPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:items-center lg:py-16">
          <div className="lg:col-span-7">
            <p className="eyebrow text-brand">Booking workflow concepts</p>
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold text-ink sm:text-5xl">
              Four lightbox directions for booking a listing shoot.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
              Instead of embedding a full booking form into a page, this iteration
              treats booking as a site-wide modal. Any Book now CTA can open the
              workflow from the page the agent is already reading.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/book"
                data-booking-concept="guided"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
              >
                Open booking lightbox <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/packages"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-6 py-3 text-sm font-semibold text-ink hover:border-ink"
              >
                Compare packages
              </a>
              <a
                href={company.phoneHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-ink"
              >
                <Phone className="h-4 w-4" />
                Call {company.phone}
              </a>
            </div>
          </div>
          <div className="border-y border-line py-5 lg:col-span-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-brand">
              Shared order skeleton
            </p>
            <div className="mt-4 grid gap-4">
              {[
                ["01", "Address and home details"],
                ["02", "Package or recommendation"],
                ["03", "Add-on selection"],
                ["04", "Appointment preference"],
                ["05", "Summary and concept order"],
              ].map(([number, label]) => (
                <div key={number} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-mono text-sm font-semibold text-brand">
                    {number}
                  </span>
                  <p className="text-sm font-semibold text-ink">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-brand">Choose a concept</p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              Same job, four different buying experiences.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-ink-2">
            The comparison is intentionally broad: fast utility, guided
            checkout, recommendation logic, and brokerage operations all solve
            different parts of AREM’s booking future.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {concepts.map((concept) => {
            const Icon = concept.icon;
            return (
              <article
                key={concept.key}
                className="flex min-h-72 flex-col justify-between rounded-[var(--radius-card)] border border-line bg-paper-2 p-5"
              >
                <div>
                  <Icon className={`h-6 w-6 ${concept.accent}`} />
                  <p className={`mt-4 font-mono text-xs uppercase tracking-widest ${concept.accent}`}>
                    {concept.eyebrow}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-ink">{concept.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{concept.body}</p>
                </div>
                <a
                  href="/book"
                  data-booking-concept={concept.key}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand"
                >
                  Open this concept <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-start lg:py-12">
          <div>
            <p className="eyebrow text-brand">Prototype limits</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
              Designed like the real thing, not wired like the real thing.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {conceptBoundaries.map((item) => (
              <div key={item} className="border-t border-line pt-4">
                <CheckCircle2 className="h-5 w-5 text-brand" />
                <p className="mt-3 text-sm leading-relaxed text-ink-2">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="eyebrow text-brand">Future production layer</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
              The lightbox is only the front door.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              The stronger product question is what should happen after a user
              chooses a package: live availability, rush rules, brokerage
              account logic, payment, routing, confirmation, and post-shoot
              communication.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [Layers3, "Site-wide entry", "Any service, package, sample, location, or homepage CTA can open booking in context."],
              [CalendarCheck, "Scheduling", "Real availability, rush rules, twilight windows, and weather moves still need backend support."],
              [LockKeyhole, "Order controls", "Payment, brokerage accounts, approvals, cancellation rules, and email receipts belong in production."],
            ].map(([Icon, title, body]) => {
              const TypedIcon = Icon as typeof Layers3;
              return (
                <div key={title as string} className="rounded-[var(--radius-card)] border border-line bg-paper p-5">
                  <TypedIcon className="h-5 w-5 text-brand" />
                  <h3 className="mt-4 text-base font-semibold text-ink">{title as string}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{body as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="eyebrow text-brand">Confidence rules</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
              Keep routine orders fast and edge cases obvious.
            </h2>
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

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
        <div className="flex flex-col items-start justify-between gap-6 border-y border-line py-10 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow text-brand">Package anchors</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
              {packages.map((pkg) => `${pkg.name} ${pkg.priceNote}`).join(" · ")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-2">
              Service coverage includes {serviceArea.hubs.slice(0, 6).join(", ")}
              , and surrounding Hampton Roads / northeastern North Carolina
              markets.
            </p>
          </div>
          <a
            href="/book"
            data-booking-concept="concierge"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong bg-paper px-6 py-3 text-sm font-semibold text-ink hover:border-ink"
          >
            Try recommendation flow <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
