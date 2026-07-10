import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, Clock, LogIn, Mail, MapPin, Phone } from "lucide-react";
import { company, marketPages, serviceDetails } from "../site-data";

const exploreLinks = [
  { label: "Packages", href: "/packages" },
  { label: "Samples", href: "/samples" },
  { label: "Listing Launch", href: "/listing-launch" },
  { label: "Brokerages", href: "/brokerages" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
] as const;

function MobileFooterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="group border-t border-paper/10 last:border-b">
      <summary className="flex h-12 cursor-pointer list-none items-center justify-between">
        <span className="font-mono text-xs font-semibold uppercase text-paper/60">
          {label}
        </span>
        <ChevronDown className="h-4 w-4 text-paper/50 transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-night text-paper/80">
      <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:hidden">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-paper text-night font-mono text-sm font-semibold">
            AR
          </span>
          <span className="text-sm font-semibold text-paper">{company.name}</span>
        </div>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/60">
          Listing media across Coastal Virginia and northeastern North Carolina.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-paper/10 pt-4 text-sm">
          <a
            href={company.phoneHref}
            className="flex items-center gap-2 text-paper/70 hover:text-paper"
          >
            <Phone className="h-4 w-4 shrink-0" /> Call team
          </a>
          <a
            href={company.emailHref}
            className="flex items-center gap-2 text-paper/70 hover:text-paper"
          >
            <Mail className="h-4 w-4 shrink-0" /> Email team
          </a>
          <span className="flex items-center gap-2 text-paper/60">
            <MapPin className="h-4 w-4 shrink-0" /> {company.hq}
          </span>
          <span className="flex items-center gap-2 text-paper/60">
            <Clock className="h-4 w-4 shrink-0" /> 8am–7pm
          </span>
        </div>

        <nav className="mt-5">
          <MobileFooterGroup label="Services">
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2.5 text-sm">
              {serviceDetails.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-paper/70 hover:text-paper"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </MobileFooterGroup>

          <MobileFooterGroup label="Markets">
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2.5 text-sm">
              {marketPages.map((market) => (
                <li key={market.slug}>
                  <Link
                    href={`/locations/${market.slug}`}
                    className="text-paper/70 hover:text-paper"
                  >
                    {market.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/locations" className="text-paper/70 hover:text-paper">
                  All service areas
                </Link>
              </li>
            </ul>
          </MobileFooterGroup>

          <MobileFooterGroup label="Explore">
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2.5 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-paper/70 hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </MobileFooterGroup>
        </nav>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href={company.bookingUrl}
            className="inline-flex min-h-10 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Book now
          </a>
          <a
            href={company.portalUrl}
            className="inline-flex min-h-10 items-center gap-2 px-2 text-sm font-medium text-paper/70 hover:text-paper"
          >
            <LogIn className="h-4 w-4" /> Client login
          </a>
        </div>

        <div className="mt-4 flex gap-2">
          {company.socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noreferrer"
              className="grid h-8 w-8 place-items-center rounded-full border border-paper/20 font-mono text-[0.55rem] font-semibold text-paper/70 hover:bg-paper/10"
            >
              {social.label.slice(0, 2).toUpperCase()}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto hidden max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid lg:grid-cols-5">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-paper text-night font-mono text-sm font-semibold">
              AR
            </span>
            <span className="text-sm font-semibold text-paper">
              American Real Estate Media
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-paper/60">
            Real estate photography & media for agents who win listings.{" "}
            {company.stats.shoots} shoots since {company.stats.since}.
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-paper/50">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {serviceDetails.slice(0, 6).map((s) => (
              <li key={s.title}>
                <Link href={`/services/${s.slug}`} className="text-paper/70 hover:text-paper">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-paper/50">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={company.phoneHref} className="flex items-center gap-2.5 text-paper/70 hover:text-paper">
                <Phone className="h-4 w-4 shrink-0" /> {company.phone}
              </a>
            </li>
            <li>
              <a href={company.emailHref} className="flex items-center gap-2.5 text-paper/70 hover:text-paper">
                <Mail className="h-4 w-4 shrink-0" /> {company.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-paper/70">
              <MapPin className="h-4 w-4 shrink-0" /> {company.hq}
            </li>
            <li className="flex items-center gap-2.5 text-paper/70">
              <Clock className="h-4 w-4 shrink-0" /> {company.hours}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-paper/50">Markets</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {marketPages.map((market) => (
              <li key={market.slug}>
                <Link href={`/locations/${market.slug}`} className="text-paper/70 hover:text-paper">
                  {market.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/locations" className="text-paper/70 hover:text-paper">
                All service areas
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-paper/50">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-paper/70 hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={company.bookingUrl}
            className="mt-5 inline-block rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Book now
          </a>
          <a
            href={company.portalUrl}
            className="mt-4 flex items-center gap-2 text-sm font-medium text-paper/70 hover:text-paper"
          >
            <LogIn className="h-4 w-4" /> Client login
          </a>
          <div className="mt-5 flex gap-2.5">
            {company.socialLinks.map((s) => (
              <a
                key={s.href}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-paper/20 font-mono text-[0.6rem] font-semibold text-paper/70 hover:bg-paper/10"
              >
                {s.label.slice(0, 2).toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 px-5 py-4 text-center text-xs text-paper/50 sm:px-8 lg:flex-row lg:gap-2 lg:py-5 lg:text-left">
          <p className="lg:hidden">© {company.stats.since}–present AREM</p>
          <p className="hidden lg:block">
            © {company.stats.since}–present {company.name}. All rights reserved.
          </p>
          <p className="font-mono">Coastal Virginia · NE North Carolina</p>
        </div>
      </div>
    </footer>
  );
}
