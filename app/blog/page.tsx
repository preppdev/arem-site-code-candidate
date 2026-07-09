import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { posts } from "../blog-data";
import { company } from "../site-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Listing-media tips for Hampton Roads agents — prep checklists, twilight and aerial strategy, 3D tours, and faster launches from American Real Estate Media.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "AREM Listing Media Blog",
    description:
      "Listing media tips, prep checklists, twilight strategy, aerial guidance, 3D tours, and faster launch playbooks.",
    url: "/blog",
    type: "website",
  },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogIndex() {
  const [featured, ...rest] = posts;
  return (
    <main className="flex-1">
      {/* hero */}
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
          <p className="eyebrow text-brand">Resources · Blog</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Sell listings with better media.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-2">
            Practical playbooks for Hampton Roads agents — how to prep a home, what
            actually moves buyers, and how to launch faster.
          </p>
        </div>
      </section>

      {/* featured */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid gap-8 rounded-[var(--radius-card)] border border-line bg-paper p-6 shadow-soft transition-shadow hover:shadow-lift sm:p-8 lg:grid-cols-2"
        >
          <div
            className="rounded-xl border border-line"
            style={{
              minHeight: 220,
              background: "linear-gradient(135deg, var(--color-brand-soft), var(--color-paper-2))",
            }}
          />
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 text-xs">
              <span className="rounded-full bg-brand-soft px-3 py-1 font-medium text-brand-ink">
                {featured.category}
              </span>
              <span className="text-muted">
                {fmtDate(featured.date)} · {featured.readMins} min read
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-2">{featured.excerpt}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
              Read article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </section>

      {/* grid */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-paper p-5 transition-shadow hover:shadow-soft"
            >
              <div className="flex items-center gap-2.5 text-xs">
                <span className="rounded-full bg-brand-soft px-2.5 py-0.5 font-medium text-brand-ink">
                  {p.category}
                </span>
                <span className="text-muted">{p.readMins} min</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{p.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>{fmtDate(p.date)}</span>
                <ArrowUpRight className="h-4 w-4 text-brand opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-night px-8 py-12 sm:flex-row sm:items-center sm:px-12">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
              Ready to shoot your next listing?
            </h2>
            <p className="mt-2 text-paper/70">
              Book in about a minute — delivered next day across Hampton Roads &amp; NE
              North Carolina.
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
