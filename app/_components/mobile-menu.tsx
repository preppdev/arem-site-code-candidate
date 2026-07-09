"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { company, nav } from "../site-data";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        className="grid h-10 w-10 place-items-center rounded-lg text-ink transition-colors hover:bg-paper-2"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <>
          {/* overlay */}
          <div
            onClick={() => setOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-ink/40 opacity-100 backdrop-blur-sm transition-opacity duration-200"
          />

          {/* slide-in panel */}
          <div
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-y-0 right-0 z-50 flex w-[84%] max-w-sm flex-col bg-paper shadow-lift transition-transform duration-200 ease-out"
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <span className="text-sm font-semibold tracking-tight text-ink">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-lg text-ink transition-colors hover:bg-paper-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-3 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-paper-2"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/faq"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-paper-2"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-paper-2"
              >
                Contact
              </Link>
            </nav>

            <div className="mt-auto space-y-3 border-t border-line p-5">
              <a
                href={company.phoneHref}
                className="flex items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-ink"
              >
                <Phone className="h-4 w-4" /> {company.phone}
              </a>
              <a
                href={company.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white"
              >
                Book now <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
