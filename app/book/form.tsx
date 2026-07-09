"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { company, packages } from "../site-data";

const fieldCls =
  "mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20";
const labelCls = "block text-sm font-medium text-ink";

export function BookRequestForm() {
  const [sent, setSent] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  if (sent) {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-paper p-8 text-center shadow-soft">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand">
          <Check className="h-6 w-6" />
        </span>
        <h2 className="mt-4 text-xl font-semibold text-ink">
          {usedFallback ? "Email draft opened" : "Shoot request received"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">
          {usedFallback
            ? "Your email app should now have the listing request filled in. Send that draft to reach AREM."
            : "The listing request was submitted. Use the live booking portal if you need to lock availability immediately."}
        </p>
        <a
          href={company.bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
        >
          Open booking portal
        </a>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-5 block w-full text-sm font-medium text-brand hover:underline"
        >
          Edit request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const fields = Object.fromEntries(data.entries());
        const subject = encodeURIComponent("AREM shoot request");
        const body = encodeURIComponent(
          [
            `Name: ${data.get("name") ?? ""}`,
            `Email: ${data.get("email") ?? ""}`,
            `Phone: ${data.get("phone") ?? ""}`,
            `Package: ${data.get("package") ?? ""}`,
            `Listing address: ${data.get("address") ?? ""}`,
            `Square footage: ${data.get("squareFootage") ?? ""}`,
            `Preferred date: ${data.get("date") ?? ""}`,
            `Launch deadline: ${data.get("deadline") ?? ""}`,
            `Add-ons: ${data.get("addOns") ?? ""}`,
            "",
            "Access / listing notes:",
            `${data.get("notes") ?? ""}`,
          ].join("\n")
        );

        try {
          const response = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              kind: "book",
              sourcePath: window.location.pathname,
              website: data.get("website") ?? "",
              fields,
            }),
          });
          if (!response.ok) throw new Error("lead API unavailable");
          setUsedFallback(false);
          setSent(true);
        } catch {
          window.location.href = `${company.emailHref}?subject=${subject}&body=${body}`;
          setUsedFallback(true);
          setSent(true);
        }
      }}
      className="rounded-[var(--radius-card)] border border-line bg-paper p-6 shadow-soft sm:p-8"
    >
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="book-name" className={labelCls}>
            Name <span className="text-brand">*</span>
          </label>
          <input id="book-name" name="name" required autoComplete="name" className={fieldCls} placeholder="Jane Agent" />
        </div>
        <div>
          <label htmlFor="book-email" className={labelCls}>
            Email <span className="text-brand">*</span>
          </label>
          <input id="book-email" name="email" type="email" required autoComplete="email" className={fieldCls} placeholder="jane@brokerage.com" />
        </div>
        <div>
          <label htmlFor="book-phone" className={labelCls}>
            Phone <span className="text-brand">*</span>
          </label>
          <input id="book-phone" name="phone" type="tel" required autoComplete="tel" className={fieldCls} placeholder="(757) 555-0123" />
        </div>
        <div>
          <label htmlFor="book-package" className={labelCls}>
            Package <span className="text-brand">*</span>
          </label>
          <select id="book-package" name="package" required defaultValue="Quick & Easy" className={fieldCls}>
            {packages.map((pkg) => (
              <option key={pkg.name} value={pkg.name}>
                {pkg.name} {pkg.priceNote}
              </option>
            ))}
            <option>Not sure yet</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="book-address" className={labelCls}>
            Listing address <span className="text-brand">*</span>
          </label>
          <input id="book-address" name="address" required autoComplete="street-address" className={fieldCls} placeholder="123 Shoreline Dr, Virginia Beach, VA" />
        </div>
        <div>
          <label htmlFor="book-square-footage" className={labelCls}>
            Square footage
          </label>
          <input id="book-square-footage" name="squareFootage" inputMode="numeric" className={fieldCls} placeholder="2,400" />
        </div>
        <div>
          <label htmlFor="book-date" className={labelCls}>
            Preferred shoot date <span className="text-brand">*</span>
          </label>
          <input id="book-date" name="date" type="date" required className={fieldCls} />
        </div>
        <div>
          <label htmlFor="book-deadline" className={labelCls}>
            Launch deadline
          </label>
          <input id="book-deadline" name="deadline" className={fieldCls} placeholder="MLS live Friday morning" />
        </div>
        <div>
          <label htmlFor="book-add-ons" className={labelCls}>
            Add-ons to discuss
          </label>
          <input id="book-add-ons" name="addOns" className={fieldCls} placeholder="Drone, twilight, Matterport..." />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="book-notes" className={labelCls}>
            Access / listing notes
          </label>
          <textarea id="book-notes" name="notes" rows={4} className={fieldCls} placeholder="Lockbox, gate code, pets, seller prep, tenant notes, must-show features..." />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-ink sm:w-auto"
      >
        Send for review
      </button>
      <p className="mt-3 text-xs text-muted">
        This sends your listing details to AREM for review. If the direct
        request path cannot complete, an email draft opens with the same details
        so you can still reach the team. AREM uses these details to follow up
        about your request. See <a href="/privacy" className="font-semibold text-brand hover:text-brand-ink">Privacy</a>.
      </p>
    </form>
  );
}
