"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, LoaderCircle, X } from "lucide-react";
import { company } from "../site-data";

const bookingTarget = new URL(company.bookingUrl);

function isBookingUrl(url: URL) {
  return url.origin === bookingTarget.origin && url.pathname === bookingTarget.pathname;
}

export function AryeoBookingLightbox() {
  const [open, setOpen] = useState(false);
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [slowLoad, setSlowLoad] = useState(false);
  const [frameUrl, setFrameUrl] = useState<string>(company.bookingUrl);
  const modalRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const closeLightbox = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => {
      if (lastFocusedRef.current?.isConnected) {
        lastFocusedRef.current.focus();
        return;
      }
      document.getElementById("site-menu-trigger")?.focus();
    });
  }, []);

  const openLightbox = useCallback((url: string = company.bookingUrl) => {
    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setFrameUrl(url);
    setFrameLoaded(false);
    setSlowLoad(false);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const anchor = event.target.closest("a[href]") as HTMLAnchorElement | null;
      if (
        !anchor ||
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target !== "_self")
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.origin);
      if (!isBookingUrl(url)) return;

      event.preventDefault();
      openLightbox(url.toString());
    };

    const onCustomOpen = () => openLightbox();

    document.addEventListener("click", onDocumentClick, true);
    window.addEventListener("arem:booking-open", onCustomOpen);

    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("arem:booking-open", onCustomOpen);
    };
  }, [openLightbox]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        modalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute("disabled"));

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    const slowLoadTimer = window.setTimeout(() => setSlowLoad(true), 12000);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(slowLoadTimer);
    };
  }, [closeLightbox, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-night/75 sm:p-4">
      <section
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="aryeo-booking-title"
        className="flex h-[100dvh] w-full flex-col overflow-hidden bg-paper shadow-lift sm:h-[min(92dvh,900px)] sm:max-w-6xl sm:rounded-[var(--radius-card)] sm:border sm:border-line"
      >
        <header className="flex min-h-16 shrink-0 items-center justify-between gap-4 border-b border-line bg-paper px-4 sm:px-5">
          <div className="min-w-0">
            <p className="eyebrow text-brand">American Real Estate Media</p>
            <h2 id="aryeo-booking-title" className="truncate text-lg font-semibold text-ink">
              Book online
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <a
              href={frameUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Open booking form in a new tab"
              title="Open booking form in a new tab"
              className="grid h-10 w-10 place-items-center rounded-lg text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Close booking form"
              title="Close booking form"
              className="grid h-10 w-10 place-items-center rounded-lg text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="relative min-h-0 flex-1 bg-white">
          {!frameLoaded && (
            <div
              role="status"
              aria-live="polite"
              className="absolute inset-0 z-10 grid place-items-center bg-white px-6 text-center"
            >
              <div>
                <LoaderCircle className="mx-auto h-6 w-6 animate-spin text-brand" />
                <p className="mt-3 text-sm font-medium text-ink">
                  {slowLoad ? "The booking form is taking longer than expected." : "Loading booking form..."}
                </p>
                {slowLoad && (
                  <a
                    href={frameUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-ink"
                  >
                    Open full booking page <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          )}
          <iframe
            src={frameUrl}
            title="American Real Estate Media booking form"
            allow="geolocation"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setFrameLoaded(true)}
            className="h-full w-full border-0 bg-white"
          />
        </div>
      </section>
    </div>
  );
}
