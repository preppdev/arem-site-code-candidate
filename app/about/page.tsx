import type { Metadata } from "next";
import { MapPin, ArrowRight, ShieldCheck, Clock, Award } from "lucide-react";
import { company, serviceArea } from "../site-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "American Real Estate Media has completed 50,000+ shoots since 2016 across Hampton Roads and northeastern North Carolina. Headquartered in Portsmouth, VA, with a team of vetted local photographers.",
};

const values = [
  {
    icon: Clock,
    title: "Next-day delivery",
    body: "Edited, MLS-ready media in your inbox the next business day — every shoot, every time.",
  },
  {
    icon: ShieldCheck,
    title: "Vetted local pros",
    body: "Every photographer is screened, trained to our standard, and FAA-licensed for aerial work.",
  },
  {
    icon: Award,
    title: "Consistency at scale",
    body: "One booking experience and one quality bar on every shoot — your first listing or your fiftieth.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* hero */}
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow text-brand">About us</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Real estate media, built for agents who move fast.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-2">
            Since {company.stats.since}, American Real Estate Media has helped
            agents and brokerages market listings with photography and media that
            looks as good as the home deserves — reliably, and on a deadline.
          </p>
        </div>
      </section>

      {/* stats */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 sm:px-8 md:grid-cols-4">
          {[
            { v: company.stats.shoots, l: "Shoots since " + company.stats.since },
            { v: company.stats.markets, l: "Cities, VA & NC" },
            { v: company.stats.turnaround, l: "Average delivery" },
            { v: "8am–7pm", l: "Open every day" },
          ].map((s) => (
            <div key={s.l} className="px-4 py-10 text-center">
              <div className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {s.v}
              </div>
              <div className="mt-1 text-sm text-muted">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* story */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Our story
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-2">
              <p>
                We started in Hampton Roads with a simple belief: great listing
                media should be easy to order, consistently excellent, and fast.
                Agents were juggling unreliable freelancers and slow turnarounds —
                we built a better way.
              </p>
              <p>
                Nearly a decade and more than {company.stats.shoots} shoots later,
                that belief hasn&apos;t changed. What&apos;s grown is our reach:
                a team of photographers, videographers, and licensed drone
                pilots delivering the same standard across coastal Virginia and
                northeastern North Carolina.
              </p>
              <p>
                Whether it&apos;s a starter condo or a waterfront estate, every
                listing gets media that earns the click and the showing.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-[var(--radius-card)] border border-line bg-paper p-5 shadow-soft"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                    {v.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* service area */}
      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand">Where we shoot</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {serviceArea.headline}
            </h2>
            <p className="mt-4 text-lg text-ink-2">{serviceArea.body}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {serviceArea.hubs.map((hub) => (
              <span
                key={hub}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm text-ink-2"
              >
                <MapPin className="h-3.5 w-3.5 text-brand" /> {hub}
              </span>
            ))}
            <span className="inline-flex items-center rounded-full bg-brand-soft px-3.5 py-1.5 text-sm font-medium text-brand-ink">
              + many more
            </span>
          </div>

          <p className="mt-6 text-sm text-muted">
            Don&apos;t see your market?{" "}
            <a href={company.emailHref} className="font-medium text-brand underline-offset-2 hover:underline">
              Email us
            </a>{" "}
            — our network is growing and we can likely cover you.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-night px-8 py-12 sm:flex-row sm:items-center sm:px-12">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
              Let&apos;s make your next listing shine.
            </h2>
            <p className="mt-2 text-paper/70">
              Questions first? Call {company.phone} — open 8am–7pm, every day.
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
