import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { company, marketPages, serviceDetails } from "../site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-night text-paper/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-5">
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
            {[
              { label: "Packages", href: "/packages" },
              { label: "Samples", href: "/samples" },
              { label: "Listing Launch", href: "/listing-launch" },
              { label: "Brokerages", href: "/brokerages" },
              { label: "Resources", href: "/resources" },
              { label: "Blog", href: "/blog" },
              { label: "FAQ", href: "/faq" },
              { label: "Contact", href: "/contact" },
              { label: "Privacy", href: "/privacy" },
            ].map((l) => (
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-paper/50 sm:flex-row sm:px-8">
          <p>© {company.stats.since}–present {company.name}. All rights reserved.</p>
          <p className="font-mono">Coastal Virginia · NE North Carolina</p>
        </div>
      </div>
    </footer>
  );
}
