import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  HelpCircle,
  ListChecks,
  Images,
  Tag,
  Users,
  Sparkles,
} from "lucide-react";
import { company } from "../site-data";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides, checklists, FAQs, and preferred local vendors to help Hampton Roads agents prep, market, and launch listings — from American Real Estate Media.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "AREM Agent Resources",
    description:
      "Guides, checklists, FAQs, sample work, and listing-prep resources for real estate agents.",
    url: "/resources",
    type: "website",
  },
};

const cards = [
  {
    icon: ListChecks,
    title: "Interactive staging guide",
    body: "Track your prep room-by-room — checks save as you go, right up to shoot day.",
    href: "/resources/staging-guide",
  },
  {
    icon: BookOpen,
    title: "The blog",
    body: "Playbooks on twilight, aerials, 3D tours, and faster launches.",
    href: "/blog",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    body: "Turnaround, deliverables, booking, policies, and pricing answered.",
    href: "/faq",
  },
  {
    icon: Images,
    title: "Sample work",
    body: "See photography, video, twilight, aerial, and 3D samples.",
    href: "/samples",
  },
  {
    icon: Tag,
    title: "Packages & pricing",
    body: "Compare the four packages and pick the right fit per listing.",
    href: "/packages",
  },
  {
    icon: Users,
    title: "Preferred vendors",
    body: "Trusted local stagers, cleaners, and trades to get a home show-ready.",
    href: "#vendors",
  },
];

const prep = [
  {
    area: "Whole house",
    items: [
      "Turn on every light; replace dead bulbs",
      "Open all blinds and curtains",
      "Remove cars from the driveway",
      "Hide trash, recycling, and hoses",
      "Take down personal photos and nameplates",
      "Tuck away visible cords and chargers",
    ],
  },
  {
    area: "Kitchen & baths",
    items: [
      "Clear counters to one or two accents",
      "Strip the fridge of magnets and papers",
      "Hide soap, sponges, and toiletries",
      "Empty sinks; close toilet lids",
      "Hang fresh towels or remove them",
      "Remove bath mats and trash cans",
    ],
  },
  {
    area: "Living & outside",
    items: [
      "Make beds; remove laundry and pet beds",
      "Fluff and square cushions and pillows",
      "Clear floors of toys, shoes, and clutter",
      "Mow, edge, and sweep walkways",
      "Stow toys, tools, and sports gear",
      "Add a clean doormat and a potted plant",
    ],
  },
];

const vendorTypes = [
  "Home stagers",
  "Cleaning services",
  "Landscaping & lawn care",
  "Handyman & punch-list",
  "Painters",
  "Window cleaning",
  "Junk removal",
  "Pressure washing",
];

export default function ResourcesPage() {
  return (
    <main className="flex-1">
      {/* hero */}
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
          <p className="eyebrow text-brand">Resources</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Everything you need to launch a listing well.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-2">
            Guides, checklists, and trusted local pros — so every listing you bring us is
            ready to shine and ready to sell.
          </p>
        </div>
      </section>

      {/* resource cards */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                href={c.href}
                className="group rounded-[var(--radius-card)] border border-line bg-paper p-6 transition-shadow hover:shadow-soft"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-ink">{c.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{c.body}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">
                  Open
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* pre-listing prep guide */}
      <section id="prep" className="scroll-mt-20 border-y border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand">Guide</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              The pre-listing prep checklist
            </h2>
            <p className="mt-4 text-lg text-ink-2">
              The hour before the shoot matters more than the camera. Share this with your
              seller a day ahead and the whole gallery looks better.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {prep.map((group) => (
              <div
                key={group.area}
                className="rounded-[var(--radius-card)] border border-line bg-paper p-6"
              >
                <h3 className="text-base font-semibold text-ink">{group.area}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-ink-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/resources/staging-guide"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
            >
              Open the interactive guide <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog/60-minute-listing-prep-checklist"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              Or read the article version
            </Link>
          </div>
        </div>
      </section>

      {/* preferred vendors */}
      <section id="vendors" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand">Preferred vendors</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Trusted local pros to get a home show-ready
            </h2>
            <p className="mt-4 text-lg text-ink-2">
              Sometimes a listing needs a little help before the camera. We work alongside
              reliable vendors across Hampton Roads — ask your photographer or our team for
              current recommendations in your area.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {vendorTypes.map((v) => (
              <span
                key={v}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm text-ink-2"
              >
                <Sparkles className="h-3.5 w-3.5 text-brand" /> {v}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Need a referral?{" "}
            <a
              href={company.emailHref}
              className="font-medium text-brand underline-offset-2 hover:underline"
            >
              Email us
            </a>{" "}
            and we&apos;ll point you to a vetted local pro.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-night px-8 py-12 sm:flex-row sm:items-center sm:px-12">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
              Listing&apos;s ready? So are we.
            </h2>
            <p className="mt-2 text-paper/70">
              Book online in minutes · delivered next day · {company.phone}.
            </p>
          </div>
          <a
            href={company.bookingUrl}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Book a shoot <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
