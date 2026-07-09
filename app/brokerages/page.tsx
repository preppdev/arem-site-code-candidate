import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import {
  brokerageOperatingModel,
  brokerageCapacityModel,
  brokerageComplianceModel,
  brokeragePilotPlan,
  brokerageRolloutCadence,
  brokerageRolloutPacket,
  brokerageWorkflow,
  mediaStandards,
  packages,
  packageDefaultsByListing,
} from "../site-data";
import { BrokerageInquiryForm } from "./form";

export const metadata: Metadata = {
  title: "Real Estate Media for Teams & Brokerages",
  description:
    "Pilot AREM as the real estate media standard for your team or brokerage with package defaults, coordinator workflow, billing options, local coverage, and a 90-day rollout review.",
};

const coordinatorWorkflow = [
  "Who can place orders: agents, listing coordinators, office staff, or all of the above.",
  "Who receives assets: agent only, coordinator copied, team inbox, or office marketing team.",
  "Who approves add-ons: agent discretion, team lead approval, or office package defaults.",
  "Who handles revisions: direct agent support, coordinator routing, or office escalation path.",
  "How billing works: agent-paid, office-paid, monthly invoice, or preferred rate-card terms.",
] as const;

const pilotOffer = [
  {
    title: "10 agents or one office",
    body: "Start with a controlled cohort so support, adoption, billing, and package defaults can be reviewed before expansion.",
  },
  {
    title: "Setup standards included",
    body: "Define package defaults, coordinator routing, billing preference, seller prep, and revision escalation before launch.",
  },
  {
    title: "Day-90 decision",
    body: "Review order volume, support friction, agent adoption, billing fit, and whether to scale to more agents or offices.",
  },
] as const;

const pilotScorecard = [
  ["Pilot cohort", "10 agents or one office"],
  ["Duration", "90 days"],
  ["Setup deliverables", "Package defaults, routing, billing preference, seller prep, revision path"],
  ["Adoption review", "Order volume, package mix, agent usage, coordinator questions"],
  ["Support review", "Scheduling friction, urgent listings, revisions, reschedules, delivery issues"],
  ["Day-90 decision", "Scale, refine, pause, or define broader office rollout"],
] as const;

const pilotAtAGlance = [
  ["10 agents", "or one office"],
  ["90 days", "controlled pilot"],
  ["Setup call", "defaults and routing"],
  ["Monthly review", "adoption and support"],
  ["Day 90", "scale or refine"],
] as const;

const pilotOutcomes = [
  ["Adoption", "Agent usage and package mix reviewed by month."],
  ["Volume", "Order count, service mix, and seasonal pressure tracked."],
  ["Support", "Scheduling friction, revisions, reschedules, and urgent listings logged."],
  ["Billing", "Agent-paid, office-paid, invoice, or rate-card fit confirmed."],
  ["Expansion", "Day-90 decision on scaling to more agents or offices."],
] as const;

const mediaStandardPreview = [
  ["Default package", "Quick & Easy for standard resale listings"],
  ["Upgrade path", "Property Spotlight for seller-presentation or feature-driven listings"],
  ["Premium path", "Perfect Marketing for luxury, waterfront, relocation, or immersive buyer needs"],
  ["Ordering owner", "Agent or coordinator, confirmed before pilot launch"],
  ["Delivery route", "Agent gallery with coordinator or office copy rules defined"],
  ["Escalation", "Urgent listing, revision, reschedule, and billing route documented"],
] as const;

const onePagerItems = [
  "90-day pilot for 10 agents or one office",
  "Package default map for standard, upgrade, vacant, and premium listings",
  "Coordinator routing for ordering, delivery, revisions, billing, and escalation",
  "Monthly adoption, support, volume, and billing review",
  "Day-90 scale / refine / pause decision",
] as const;

const pilotControls = [
  ["Package defaults", "Quick & Easy standard, Spotlight upgrade, Perfect Marketing premium/relocation path."],
  ["Coordinator routing", "Define who orders, receives assets, approves add-ons, and handles revisions."],
  ["Billing preference", "Agent-paid, office-paid, monthly invoice, or rate-card discussion before rollout."],
  ["Support owner", "Account lead, scheduling contact, billing contact, and escalation route defined in setup."],
  ["90-day review", "Adoption, volume, support friction, package mix, billing fit, and expansion decision."],
] as const;

const artifactExamples = [
  {
    label: "Agent rollout email",
    title: "What agents receive before the pilot starts",
    body: "A short note with the preferred package ladder, booking link, seller prep reminder, billing expectations, and who to contact when a listing is urgent.",
  },
  {
    label: "Support escalation",
    title: "How urgent listings avoid getting lost",
    body: "Define the account lead, scheduling route, billing contact, revision path, and what qualifies as urgent before the first office-wide order.",
  },
  {
    label: "90-day scorecard",
    title: "What leadership reviews before scaling",
    body: "Order volume, package mix, agent adoption, support friction, billing fit, recurring questions, and the decision to scale, refine, or pause.",
  },
] as const;

const executiveSummary = [
  {
    label: "Business case",
    title: "Fewer listing-media decisions for every agent.",
    body: "Set a default package ladder so agents stop rebuilding the same media plan one listing at a time.",
    href: "#office-defaults",
  },
  {
    label: "Risk control",
    title: "Pilot first, then decide whether to scale.",
    body: "Use 90 days to review adoption, billing fit, support friction, package mix, and urgent-listing handling.",
    href: "#pilot-scorecard",
  },
  {
    label: "Operating model",
    title: "Define who orders, pays, receives, and escalates.",
    body: "Clarify coordinator routing, support ownership, media usage, and billing before agents start using the standard.",
    href: "#operating-model",
  },
] as const;

export default function BrokeragesPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <p className="eyebrow text-brand">Teams & brokerages</p>
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Listing media standards your agents can actually use.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
              AREM helps teams and offices turn listing media into a repeatable
              workflow: package defaults, simple agent ordering, service-area
              clarity, and a low-risk brokerage pilot before wider rollout.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#brokerage-inquiry"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
              >
                Request a brokerage pilot <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/packages"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-6 py-3 text-sm font-semibold text-ink hover:border-ink"
              >
                Review package standards
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-[var(--radius-card)] border border-line bg-paper p-6 shadow-soft">
              <p className="font-mono text-[0.68rem] uppercase tracking-widest text-brand">
                Pilot at a glance
              </p>
              <dl className="mt-5 grid gap-4">
                {pilotAtAGlance.map(([term, detail]) => (
                  <div key={term} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
                    <dt className="text-sm font-semibold text-ink">{term}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ink-2">
                      {detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-start">
          <div>
            <p className="eyebrow text-brand">Executive summary</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              The pitch before the operating packet.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              AREM&apos;s brokerage offer is not a discount page. It is a
              controlled way to install media standards, reduce vendor friction,
              and decide whether the workflow can scale across an office.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {executiveSummary.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="border-t border-line pt-4 hover:border-brand"
              >
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
                  {item.label}
                </p>
                <h3 className="mt-3 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="grid gap-4 lg:grid-cols-5">
            {pilotOutcomes.map(([label, body]) => (
              <div key={label} className="border-t border-line pt-3">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:py-14">
          <div>
            <p className="eyebrow text-brand">Pilot controls</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
              The five decisions to make before agents start ordering.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              This is the operating checklist for a controlled office pilot:
              defaults, routing, billing, ownership, and the day-90 decision.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {pilotControls.map(([label, body]) => (
              <div key={label} className="border-t border-line pt-4">
                <h3 className="text-sm font-semibold text-ink">{label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-2">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-night text-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:py-16">
          <div>
            <p className="eyebrow text-twilight">Pilot offer</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              Start with one office or team before changing the whole brokerage.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-paper/70">
              A 90-day pilot gives leadership a real operating picture:
              package adoption, scheduling friction, billing needs, support
              questions, and agent feedback before a wider rollout.
            </p>
            <a
              href="#brokerage-inquiry"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink hover:bg-paper/90"
            >
              Request a brokerage pilot <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-paper/10 md:grid-cols-3">
            {pilotOffer.map((item) => (
              <div key={item.title} className="border-b border-paper/10 bg-paper/5 p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <h3 className="text-base font-semibold text-paper">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow text-brand">Office standard preview</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              What the pilot turns into for agents.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              The pilot should produce a simple office media standard: what to
              order, who routes it, how billing works, and where support issues
              go when timing matters.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-line bg-paper p-5 shadow-soft">
            <div className="border-b border-line pb-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-widest text-brand">
                Sample office media standard
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">
                Brokerage pilot packet
              </h3>
            </div>
            <div className="divide-y divide-line">
              {mediaStandardPreview.map(([label, value]) => (
                <div key={label} className="grid gap-2 py-4 sm:grid-cols-[11rem_1fr]">
                  <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">
                    {label}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-2">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pilot-scorecard" className="scroll-mt-24 border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-16">
          <div>
            <p className="eyebrow text-brand">Pilot one-pager</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              A forwardable summary for leadership.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              Until a designed PDF is approved, this section gives owners,
              brokers, and operations leads the pilot in one place: scope,
              standards, review cadence, and the decision at day 90.
            </p>
            <a
              href="#brokerage-inquiry"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
            >
              Request a brokerage pilot <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/resources/arem-brokerage-pilot-one-pager.html"
              target="_blank"
              rel="noreferrer"
              className="ml-0 mt-3 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink sm:ml-3"
            >
              Open one-pager <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="rounded-[var(--radius-card)] border border-line bg-paper p-5 shadow-soft">
            <div className="border-b border-line pb-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-widest text-brand">
                AREM brokerage pilot
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">
                Your office&apos;s listing media standard, installed in 90 days.
              </h3>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {onePagerItems.map((item) => (
                <p key={item} className="flex gap-2 text-sm leading-relaxed text-ink-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start lg:py-14">
          <div>
            <p className="eyebrow text-brand">Rollout artifacts</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              The pilot should produce usable office materials.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              A serious rollout needs practical artifacts that leaders can share
              with agents, coordinators, and office staff before habits change.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {artifactExamples.map((item) => (
              <div key={item.label} className="border-t border-line pt-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
                  {item.label}
                </p>
                <h3 className="mt-3 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="office-defaults" className="scroll-mt-24 border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:py-16">
          <div>
            <p className="eyebrow text-brand">Office defaults</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              The quick package map agents can remember.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              Brokerage pilots should give agents a simple default map first,
              then let coordinators refine add-ons by listing situation.
            </p>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {packageDefaultsByListing.map((item) => (
              <div key={item.listing} className="grid gap-2 py-4 sm:grid-cols-[12rem_1fr]">
                <div>
                  <p className="text-sm font-semibold text-ink">{item.listing}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-brand">
                    {item.defaultPackage}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-ink-2">{item.addOns}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow text-brand">Rollout workflow</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              From preferred package to office-wide adoption.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              A 200-agent office does not need more vendor ambiguity. It needs
              consistent defaults, a clear ordering path, and support when
              access, weather, billing, or timing gets complicated.
            </p>
          </div>
          <div className="grid gap-4">
            {brokerageWorkflow.map((step, index) => (
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

      <section id="operating-model" className="scroll-mt-24 border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <div>
            <p className="eyebrow text-brand">Operating model</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Define the relationship before agents start ordering.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              AREM does not need to pretend every office relationship works the
              same way. The first conversation should define ownership,
              ordering, billing, support, and rollout expectations.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {brokerageOperatingModel.map((item) => (
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

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-brand">Capacity and account model</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Answer the 200-agent question before rollout.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              A brokerage pilot should produce more than adoption data. It
              should show whether scheduling, coverage, support, and ownership
              are ready for real office volume.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {brokerageCapacityModel.map((item) => (
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

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <div>
            <p className="eyebrow text-brand">Usage and compliance</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Define media rules before agents need exceptions.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              Large offices need plain-language guardrails for usage, edits,
              specialty media, and reuse. Exact terms should be approved before
              a public brokerage program launches.
            </p>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {brokerageComplianceModel.map((item) => (
              <div key={item.topic} className="grid gap-2 py-4 sm:grid-cols-[12rem_1fr]">
                <h3 className="text-sm font-semibold text-ink">{item.topic}</h3>
                <p className="text-sm leading-relaxed text-ink-2">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow text-brand">Coordinator workflow</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Decide who orders, pays, receives, and escalates.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              Large teams usually fail when the media standard is clear but the
              operating rules are not. This is the checklist AREM should review
              before rollout.
            </p>
          </div>
          <div className="grid gap-3">
            {coordinatorWorkflow.map((item) => (
              <p key={item} className="flex gap-3 border-t border-line pt-4 text-sm leading-relaxed text-ink-2 first:border-t-0 first:pt-0">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <p className="eyebrow text-brand">Pilot to rollout</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Prove the workflow before asking every agent to change habits.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              For a large office, the strongest first step is not a massive
              launch. It is a controlled pilot with clear standards, support,
              billing expectations, and a review cadence.
            </p>
          </div>
          <div className="grid gap-8 lg:col-span-7">
            <div className="grid gap-5">
              {brokeragePilotPlan.map((item, index) => (
                <div
                  key={item.phase}
                  className="grid gap-4 border-t border-line pt-5 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr]"
                >
                  <span className="font-mono text-2xl font-semibold text-brand">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{item.phase}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-line pt-6">
              <h3 className="text-base font-semibold text-ink">
                Pilot scorecard
              </h3>
              <div className="mt-4 divide-y divide-line border-y border-line">
                {pilotScorecard.map(([label, value]) => (
                  <div key={label} className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr]">
                    <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
                      {label}
                    </p>
                    <p className="text-sm leading-relaxed text-ink-2">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-line pt-6">
              <h3 className="text-base font-semibold text-ink">
                Brokerage operating packet
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {brokerageRolloutPacket.map((item) => (
                  <p key={item} className="flex gap-2 text-sm leading-relaxed text-ink-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="border-t border-line pt-6">
              <h3 className="text-base font-semibold text-ink">
                30 / 60 / 90 review cadence
              </h3>
              <div className="mt-4 divide-y divide-line border-y border-line">
                {brokerageRolloutCadence.map((item) => (
                  <div key={item.window} className="grid gap-2 py-4 sm:grid-cols-[8rem_1fr]">
                    <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
                      {item.window}
                    </p>
                    <p className="text-sm leading-relaxed text-ink-2">
                      {item.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand">Service expectations</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Typical timing by media type, with constraints called out.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-2">
            Brokerage standards should separate routine deliverables from items
            that depend on scope, weather, travel, airspace, or edit complexity.
          </p>
        </div>
        <div className="mt-8 grid gap-3 md:hidden">
          {mediaStandards.map((item) => (
            <div
              key={item.service}
              className="rounded-[var(--radius-card)] border border-line bg-paper p-4 shadow-soft"
            >
              <p className="text-sm font-semibold text-ink">{item.service}</p>
              <p className="mt-2 font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-brand">
                Typical expectation
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.timing}</p>
              <p className="mt-3 font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-brand">
                Confirm up front
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.notes}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 hidden overflow-x-auto rounded-[var(--radius-card)] border border-line shadow-soft md:block">
          <table className="min-w-[720px] w-full border-collapse text-left">
            <thead className="bg-paper-2">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-ink">Media</th>
                <th className="px-5 py-4 text-sm font-semibold text-ink">Typical expectation</th>
                <th className="px-5 py-4 text-sm font-semibold text-ink">Confirm up front</th>
              </tr>
            </thead>
            <tbody>
              {mediaStandards.map((item) => (
                <tr key={item.service} className="border-t border-line bg-paper align-top">
                  <td className="px-5 py-4 text-sm font-semibold text-ink">
                    {item.service}
                  </td>
                  <td className="px-5 py-4 text-sm leading-relaxed text-ink-2">
                    {item.timing}
                  </td>
                  <td className="px-5 py-4 text-sm leading-relaxed text-ink-2">
                    {item.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow text-brand">Rate-card structure</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Public package anchors, brokerage-specific terms.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              The public package ladder gives agents a clear starting point.
              Brokerage conversations can then define defaults, add-ons, travel
              rules, rush handling, and billing preferences.
            </p>
          </div>
          <div className="grid gap-3 md:hidden">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="rounded-[var(--radius-card)] border border-line bg-paper p-4 shadow-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-ink">{pkg.name}</p>
                  <p className="shrink-0 text-sm font-semibold text-brand">{pkg.priceNote}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{pkg.bestFor}</p>
              </div>
            ))}
          </div>
          <div className="hidden overflow-x-auto rounded-[var(--radius-card)] border border-line shadow-soft md:block">
            <table className="min-w-[680px] w-full border-collapse text-left">
              <thead className="bg-paper-2">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-ink">Package</th>
                  <th className="px-5 py-4 text-sm font-semibold text-ink">Public anchor</th>
                  <th className="px-5 py-4 text-sm font-semibold text-ink">Team use</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg.name} className="border-t border-line bg-paper">
                    <td className="px-5 py-4 text-sm font-semibold text-ink">
                      {pkg.name}
                    </td>
                    <td className="px-5 py-4 text-sm text-ink-2">{pkg.priceNote}</td>
                    <td className="px-5 py-4 text-sm leading-relaxed text-ink-2">
                      {pkg.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="brokerage-inquiry" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow text-brand">Brokerage pilot</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Request a brokerage pilot with the details that matter.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              Send agent count, markets, billing preferences, listing volume,
              and rollout timing so AREM can respond with a more useful account
              setup conversation.
            </p>
            <div className="mt-6 rounded-[var(--radius-card)] border border-line bg-paper-2 p-5">
              <h3 className="text-sm font-semibold text-ink">Best fit for</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-2">
                <li>Teams standardizing media for repeat listing volume.</li>
                <li>Brokerages defining billing, support, and package defaults.</li>
                <li>Coordinators who need predictable ordering and delivery paths.</li>
              </ul>
            </div>
          </div>
          <BrokerageInquiryForm />
        </div>
      </section>
    </main>
  );
}
