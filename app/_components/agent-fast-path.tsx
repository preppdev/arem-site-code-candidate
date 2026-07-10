import Link from "next/link";
import { ArrowRight, Camera, MapPin, PackageCheck, Sparkles } from "lucide-react";
import { company } from "../site-data";

const steps = [
  {
    label: "Default",
    title: "Quick & Easy",
    body: "Full photo coverage, floor plan, showcase site, and next-morning gallery delivery for standard resale listings.",
    href: "/packages",
    icon: PackageCheck,
  },
  {
    label: "Proof",
    title: "Inspect real work",
    body: "Review AREM samples before you commit to the media mix.",
    href: "/samples",
    icon: Camera,
  },
  {
    label: "Coverage",
    title: "Confirm market fit",
    body: "Check the service footprint across coastal Virginia and northeastern North Carolina.",
    href: "/coverage",
    icon: MapPin,
  },
] as const;

type AgentFastPathProps = {
  tone?: "light" | "soft";
  title?: string;
  body?: string;
};

export function AgentFastPath({
  tone = "light",
  title = "Need to book a normal listing fast?",
  body = "Start with the default package, verify the work, confirm coverage, then book online.",
}: AgentFastPathProps) {
  const soft = tone === "soft";

  return (
    <section className={soft ? "border-b border-line bg-paper-2" : "border-b border-line bg-paper"}>
      <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.62fr_1.38fr] lg:items-center">
          <div>
            <p className="eyebrow text-brand">Agent fast path</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">{body}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-stretch">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Link
                  key={step.label}
                  href={step.href}
                  className="group flex gap-3 border-t border-line pt-3 hover:border-brand"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>
                    <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-brand">
                      {step.label}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-ink group-hover:text-brand-ink">
                      {step.title}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      {step.body}
                    </span>
                  </span>
                </Link>
              );
            })}
            <a
              href={company.bookingUrl}
              className="inline-flex min-h-24 items-center justify-center gap-2 rounded-[var(--radius-card)] bg-brand px-5 py-4 text-sm font-semibold text-white hover:bg-brand-ink sm:col-span-2 lg:col-span-1"
            >
              <Sparkles className="h-4 w-4" />
              Book now
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
