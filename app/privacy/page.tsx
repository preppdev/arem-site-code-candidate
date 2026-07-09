import type { Metadata } from "next";
import { company } from "../site-data";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How American Real Estate Media handles website inquiries, booking requests, and lead information.",
};

const sections = [
  {
    title: "Information submitted through forms",
    body: "When you submit a contact, brokerage, or shoot request form, AREM may receive your name, email, phone number, brokerage or team details, listing address, preferred timing, package interest, add-ons, access notes, and the message you choose to send.",
  },
  {
    title: "How AREM uses it",
    body: "AREM uses submitted information to respond to inquiries, scope listing media requests, coordinate booking details, discuss brokerage pilots, prevent spam, and improve follow-up workflows.",
  },
  {
    title: "Operational records",
    body: "The website may store form submissions, basic request metadata, user agent, and IP information for lead routing, abuse prevention, audit history, and service follow-up.",
  },
  {
    title: "Booking and third-party tools",
    body: "Live booking may happen through AREM's booking portal or other operational tools. Those systems may collect additional scheduling, payment, and property information under their own terms.",
  },
  {
    title: "Questions or removal requests",
    body: `Contact ${company.email} or ${company.phone} if you need to update, correct, or request removal of information submitted through this website.`,
  },
] as const;

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow text-brand">Privacy</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Website inquiry and lead privacy.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-2">
            This page explains the information collected by AREM&apos;s public
            website forms and how those details are used to respond to listing
            media, brokerage, and general inquiries.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8 lg:py-16">
        <div className="divide-y divide-line border-y border-line">
          {sections.map((section) => (
            <section key={section.title} className="py-6">
              <h2 className="text-lg font-semibold text-ink">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
