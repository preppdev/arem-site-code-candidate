import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { company } from "../site-data";
import { ContactForm } from "./form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact American Real Estate Media for real estate photography from Richmond through Hampton Roads to Elizabeth City and Edenton. Call (757) 665-8656 or send listing details.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact American Real Estate Media",
    description:
      "Send listing details, ask package questions, or contact AREM for real estate media support.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow text-brand">Contact</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Tell us about your listing.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-2">
            The more you share, the faster we can quote and schedule. We respond
            during business hours, every day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* contact details */}
          <aside className="space-y-5">
            <div className="rounded-[var(--radius-card)] border border-line bg-paper p-6 shadow-soft">
              <h2 className="text-sm font-semibold text-ink">Reach us directly</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <a href={company.phoneHref} className="flex items-start gap-3 text-ink-2 hover:text-ink">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>
                      <span className="block font-medium text-ink">{company.phone}</span>
                      Call or text
                    </span>
                  </a>
                </li>
                <li>
                  <a href={company.emailHref} className="flex items-start gap-3 break-all text-ink-2 hover:text-ink">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>
                      <span className="block font-medium text-ink">Email</span>
                      {company.email}
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-ink-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>
                    <span className="block font-medium text-ink">Hours</span>
                    {company.hours}
                  </span>
                </li>
                <li className="flex items-start gap-3 text-ink-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>
                    <span className="block font-medium text-ink">Headquarters</span>
                    {company.hq} · Richmond to Edenton service corridor
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-[var(--radius-card)] border border-brand/20 bg-brand-soft p-6">
              <h2 className="text-sm font-semibold text-brand-ink">
                Ready to book now?
              </h2>
              <p className="mt-2 text-sm text-ink-2">
                Skip the form — pick a package and preferred timing online, then
                AREM confirms scope and access before the shoot is locked.
              </p>
              <a
                href={company.bookingUrl}
                className="mt-4 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
              >
                Book a shoot
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
