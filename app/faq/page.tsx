import type { Metadata } from "next";
import { Plus, ArrowRight } from "lucide-react";
import { company, faqGroups } from "../site-data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about real estate photography turnaround, photo counts, copyright, weather policy, rescheduling, and booking with American Real Estate Media.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "AREM Real Estate Media FAQ",
    description:
      "Answers about booking, delivery, weather, policies, usage rights, and real estate media packages.",
    url: "/faq",
    type: "website",
  },
};

// FAQPage structured data (SITE_AUDIT #10) — flattens every Q&A for rich snippets.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    }))
  ),
};

export default function FaqPage() {
  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow text-brand">FAQ</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Questions, answered.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-2">
            Everything agents ask before their first shoot. Don&apos;t see yours?{" "}
            <a
              href={company.emailHref}
              className="font-medium text-brand underline-offset-2 hover:underline"
            >
              Email us
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:py-16">
        {faqGroups.map((group) => (
          <div key={group.group} className="mb-12 last:mb-0">
            <h2 className="eyebrow mb-4 text-muted">{group.group}</h2>
            <div className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper">
              {group.items.map((item) => (
                <details key={item.q} className="group px-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-medium text-ink marker:hidden">
                    {item.q}
                    <Plus className="h-4 w-4 shrink-0 text-brand transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-5 pr-8 text-sm leading-relaxed text-ink-2">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] bg-night px-8 py-12 sm:flex-row sm:items-center sm:px-12">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
              Still have a question?
            </h2>
            <p className="mt-2 text-paper/70">
              Call {company.phone}
              {" or send us a note — we're open 8am–7pm, every day."}
            </p>
          </div>
          <a
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Contact us <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
