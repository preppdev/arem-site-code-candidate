import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StagingGuide } from "./guide";

export const metadata: Metadata = {
  title: "Interactive Staging Guide",
  description:
    "An interactive, room-by-room checklist to prep your home for its listing-photo appointment — track your progress and get the most from your photos with American Real Estate Media.",
  alternates: {
    canonical: "/resources/staging-guide",
  },
  openGraph: {
    title: "Interactive Listing Photo Staging Guide",
    description:
      "A room-by-room checklist to help sellers and agents prepare for listing photos.",
    url: "/resources/staging-guide",
    type: "website",
  },
};

export default function StagingGuidePage() {
  return (
    <main className="flex-1">
      {/* hero */}
      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 lg:py-14">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Resources
          </Link>
          <p className="eyebrow mt-6 text-brand">Interactive guide</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Get the most from your listing photos.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">
            A few simple steps before your appointment make a big difference in your photos.
            Work through this room-by-room checklist at your own pace — your progress saves
            automatically, so you can knock out the big jobs early and the quick ones on the
            day of your shoot.
          </p>
        </div>
      </section>

      <StagingGuide />
    </main>
  );
}
