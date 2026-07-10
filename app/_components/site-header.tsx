import Link from "next/link";
import { LogIn, Phone } from "lucide-react";
import { company, nav } from "../site-data";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-ink text-paper font-mono text-sm font-semibold tracking-tight">
            AR
          </span>
          <span className="hidden text-[15px] font-semibold tracking-tight text-ink sm:block">
            American Real Estate Media
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-ink sm:hidden">
            AREM
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-2 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={company.phoneHref}
            className="hidden items-center gap-1.5 text-sm font-medium text-ink-2 transition-colors hover:text-ink 2xl:flex"
          >
            <Phone className="h-4 w-4" />
            {company.phone}
          </a>
          <a
            href={company.portalUrl}
            className="hidden items-center gap-1.5 text-sm font-medium text-ink-2 transition-colors hover:text-ink xl:flex"
          >
            <LogIn className="h-4 w-4" />
            Client login
          </a>
          <a
            href={company.bookingUrl}
            className="hidden items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-ink sm:inline-flex"
          >
            Book now
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
