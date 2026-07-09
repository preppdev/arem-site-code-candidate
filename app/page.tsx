import Image from "next/image";
import {
  Camera,
  Video,
  Plane,
  Box,
  Sunset,
  Ruler,
  Sofa,
  Wand2,
  ArrowRight,
  Clock,
  MapPin,
  Award,
  type LucideIcon,
} from "lucide-react";
import {
  company,
  services,
  packages,
  proofImages,
  launchScenarios,
  firstShootFaqs,
} from "./site-data";
import { AgentFastPath } from "./_components/agent-fast-path";
import { RealListingLaunch } from "./_components/real-listing-launch";

const iconMap: Record<string, LucideIcon> = {
  Camera,
  Video,
  Plane,
  Box,
  Sunset,
  Ruler,
  Sofa,
  Wand2,
};

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <AgentFastPath tone="soft" />
      <RealListingLaunch mode="compact" />
      <LaunchProofSystem />
      <Packages />
      <Services />
      <FirstShootFaq />
      <CtaBand />
    </main>
  );
}

/* ---------------------------------------------------------------- Hero */
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-12 lg:py-14">
        <div className="lg:col-span-6">
          <p className="eyebrow text-brand">
            Listing media operation · Coastal Virginia & NE North Carolina
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.7rem]">
            Media back by morning. Listings ready to launch.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
            Photography, video, drone, floor plans, 3D tours, twilight, and
            listing websites from one local team. Book fast, know what it costs,
            and get media back on a predictable schedule.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={company.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-ink"
            >
              Book now <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#work-proof"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              See proof
            </a>
            <a
              href="/packages#delivery-quick-and-easy"
              className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-soft px-5 py-3 text-sm font-semibold text-brand-ink transition-colors hover:border-brand"
            >
              Standard listing: Quick & Easy from $150
            </a>
          </div>

          <div className="mt-8 grid max-w-xl divide-y divide-line border-y border-line text-sm text-ink-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <span className="flex items-center gap-1.5 py-3 sm:px-3 sm:first:pl-0">
              <Award className="h-4 w-4 text-brand" /> {company.stats.shoots}
            </span>
            <span className="flex items-center gap-1.5 py-3 sm:px-3">
              <MapPin className="h-4 w-4 text-brand" /> {company.stats.markets} markets
            </span>
            <span className="flex items-center gap-1.5 py-3 sm:px-3">
              <Clock className="h-4 w-4 text-brand" /> Next morning
            </span>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative">
            <div className="grid gap-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-night shadow-lift">
                <Image
                  src={proofImages[0].src}
                  alt={proofImages[0].alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/85 to-transparent p-4">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-paper/60">
                    Real AREM sample
                  </p>
                  <p className="mt-1 text-base font-semibold text-paper">
                    Shot for MLS, seller presentations, and social launch.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {proofImages.slice(1).map((image) => (
                  <div
                    key={image.src}
                    className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-soft"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-4 left-4 right-4 rounded-[var(--radius-card)] bg-paper/95 px-4 py-3 shadow-lift backdrop-blur">
              <div className="grid gap-2 text-sm sm:grid-cols-3">
                <p className="leading-tight">
                  <span className="block font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                    Tuesday
                  </span>
                  Listing intake
                </p>
                <p className="leading-tight">
                  <span className="block font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                    Wednesday
                  </span>
                  Shoot captured
                </p>
                <p className="leading-tight">
                  <span className="block font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                    Thursday
                  </span>
                  Live listing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------- Launch proof */
function LaunchProofSystem() {
  const googleLink = company.socialLinks.find((link) => link.label === "Google");
  const stages = [
    {
      label: "Tuesday",
      title: "Listing intake",
      body: "Agent selects the package, adds access notes, confirms seller prep, and flags any add-ons or timing constraints.",
    },
    {
      label: "Wednesday",
      title: "Shoot the property",
      body: "AREM captures the ordered media: photos, floor plan, listing website, plus video, drone, 3D, twilight, or staging scope where needed.",
    },
    {
      label: "Thursday",
      title: "Launch-ready by morning",
      body: "Standard listing assets are organized for MLS, social, seller updates, print, and property marketing.",
    },
  ];
  return (
    <section className="border-b border-line bg-night text-paper">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-12 lg:items-center lg:py-14">
        <div className="lg:col-span-4">
          <p className="eyebrow text-twilight">The AREM launch system</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
            Listing intake Tuesday. Shoot Wednesday. Live Thursday morning.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-paper/70">
            Standard listing media should move on a clear launch rhythm:
            package chosen, property captured, assets delivered, and the listing
            ready to publish without agents chasing scattered vendors.
          </p>
        </div>
        <div className="lg:col-span-8">
          <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-paper/10 md:grid-cols-3">
            {stages.map((stage) => (
              <div key={stage.label} className="border-b border-paper/10 bg-paper/5 p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <p className="font-mono text-[0.68rem] uppercase tracking-widest text-twilight">
                  {stage.label}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-paper">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">
                  {stage.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-4">
            {[
              [company.stats.shoots, "Shoots completed"],
              [`Since ${company.stats.since}`, "Operating history"],
              ["from $100", "Published entry"],
              [company.hq, "Local support"],
            ].map(([value, label]) => (
              <div key={label} className="border-t border-paper/10 pt-3">
                <p className="text-lg font-semibold tracking-tight text-paper">{value}</p>
                <p className="mt-1 text-xs text-paper/55">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {googleLink && (
              <a
                href={googleLink.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-5 py-2.5 text-sm font-semibold text-paper hover:border-paper/50"
              >
                View Google profile <ArrowRight className="h-4 w-4" />
              </a>
            )}
            <a
              href={company.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink hover:bg-paper/90"
            >
              Book in Aryeo <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Services */
function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-14">
      <div className="max-w-2xl">
        <p className="eyebrow text-brand">Everything in one shoot</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          One booking. The full media package.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink-2">
          Mix and match across eight services — or pick a package and we handle
          the rest.
        </p>
      </div>

      <div className="mt-8 grid gap-x-8 border-y border-line md:grid-cols-2">
        {services.map((s) => {
          const Icon = iconMap[s.icon] ?? Camera;
          return (
            <div
              key={s.title}
              className="grid gap-4 border-b border-line py-5 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_11rem_1fr]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-paper-2 text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold text-ink lg:pt-2">{s.title}</h3>
              <p className="text-sm leading-relaxed text-ink-2 lg:pt-2">{s.blurb}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Packages */
function Packages() {
  return (
    <section id="packages" className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="eyebrow text-brand">Packages</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Choose by listing situation, not guesswork.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-2">
            Real starting prices from the current AREM package ladder, with
            plain-language guidance for when each package fits.
          </p>
        </div>
        <div className="border-y border-line py-5">
          <p className="text-sm font-semibold text-ink">Common launch scenarios</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {launchScenarios.map((scenario) => (
              <div key={scenario.label} className="border-t border-line pt-3">
                <p className="font-mono text-[0.68rem] uppercase tracking-widest text-brand">
                  {scenario.fit}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-ink">
                  {scenario.label}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-2">
                  {scenario.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 divide-y divide-line border-y border-line">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={[
              "grid gap-3 py-5 md:grid-cols-[1fr_7rem_1.35fr_auto] md:items-center",
              pkg.featured
                ? "bg-brand-soft/45 md:px-4"
                : "",
            ].join(" ")}
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-ink">{pkg.name}</h3>
                {pkg.featured && (
                  <span className="rounded-full bg-brand px-2 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-wider text-white">
                    Popular
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted">{pkg.tagline}</p>
            </div>
            <p className="text-xl font-semibold tracking-tight text-ink md:text-right">
              {pkg.priceNote}
            </p>
            <div>
              <p className="text-sm leading-relaxed text-ink-2">
                <span className="font-semibold text-ink">Best for: </span>
                {pkg.bestFor}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{pkg.deliveryNote}</p>
            </div>

          <a
            href={company.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className={[
              "inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
                pkg.featured
                  ? "bg-brand text-white hover:bg-brand-ink"
                  : "border border-line-strong text-ink hover:border-ink",
            ].join(" ")}
          >
            Book {pkg.name}
          </a>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a
          href="/packages"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-ink"
        >
          View full package details <ArrowRight className="h-4 w-4" />
        </a>
        <p className="text-sm text-muted">
        Final order totals may vary by property size, travel, add-ons,
        reschedules, and brokerage/team arrangements. Add-ons such as virtual
        staging, advanced editing, additional aerial, and specialty video can be
        attached where appropriate.
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------- First shoot FAQ */
function FirstShootFaq() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8">
      <div className="grid gap-8 border-t border-line pt-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="eyebrow text-brand">First shoot with AREM?</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            The details agents usually ask before booking.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {firstShootFaqs.map((item) => (
            <div key={item.q} className="border-t border-line pt-4 first:border-t-0 first:pt-0 md:first:border-t md:first:pt-4">
              <h3 className="text-sm font-semibold text-ink">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- CTA band */
function CtaBand() {
  return (
    <section className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="eyebrow text-brand">Ready when the listing is</p>
          <h2 className="mt-3 max-w-2xl text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Book the shoot, get the media, launch the listing.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-2">
            Serving Hampton Roads, coastal Virginia, and northeastern North
            Carolina with published package anchors and direct team support.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <a
            href={company.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Book now <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={company.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-ink hover:border-ink"
          >
            Call {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
