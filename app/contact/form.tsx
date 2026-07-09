"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { company, contactServiceOptions, propertyTypes } from "../site-data";

const fieldCls =
  "mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20";
const labelCls = "block text-sm font-medium text-ink";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  if (sent) {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-paper p-8 text-center shadow-soft">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand">
          <Check className="h-6 w-6" />
        </span>
        <h2 className="mt-4 text-xl font-semibold text-ink">
          {usedFallback ? "Email draft opened" : "Inquiry received"}
        </h2>
        <p className="mt-2 text-sm text-ink-2">
          {usedFallback
            ? "Your email app should now have the inquiry details filled in. Send that draft to reach AREM, or call/text the team if the listing is urgent."
            : "The inquiry details were submitted. Call or text the team if the listing is urgent."}
        </p>
        <a
          href={company.phoneHref}
          className="mt-5 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
        >
          Call or text {company.phone}
        </a>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-5 block w-full text-sm font-medium text-brand hover:underline"
        >
          Edit details
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
        const subject = encodeURIComponent("AREM listing media inquiry");
        const body = encodeURIComponent(
          [
            `Name: ${data.get("name") ?? ""}`,
            `Email: ${data.get("email") ?? ""}`,
            `Phone: ${data.get("phone") ?? ""}`,
            `Service needed: ${data.get("service") ?? ""}`,
            `Property address: ${data.get("address") ?? ""}`,
            `Property type: ${data.get("propertyType") ?? ""}`,
            `Preferred date: ${data.get("date") ?? ""}`,
            "",
            "Message:",
            `${data.get("message") ?? ""}`,
          ].join("\n")
        );
        try {
          const response = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              kind: "contact",
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
          <label htmlFor="name" className={labelCls}>
            Name <span className="text-brand">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldCls} placeholder="Jane Agent" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email <span className="text-brand">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldCls} placeholder="jane@brokerage.com" />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldCls} placeholder="(757) 555-0123" />
        </div>
        <div>
          <label htmlFor="service" className={labelCls}>
            Service needed
          </label>
          <select id="service" name="service" defaultValue="" className={fieldCls}>
            <option value="" disabled>
              Select a service…
            </option>
            {contactServiceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="address" className={labelCls}>
            Property address
          </label>
          <input id="address" name="address" autoComplete="street-address" className={fieldCls} placeholder="123 Shoreline Dr, Virginia Beach, VA" />
        </div>
        <div>
          <label htmlFor="propertyType" className={labelCls}>
            Property type
          </label>
          <select id="propertyType" name="propertyType" defaultValue="" className={fieldCls}>
            <option value="" disabled>
              Select…
            </option>
            {propertyTypes.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className={labelCls}>
            Preferred date
          </label>
          <input id="date" name="date" type="date" className={fieldCls} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>
            Anything else?
          </label>
          <textarea id="message" name="message" rows={4} className={fieldCls} placeholder="Square footage, special requests, deadline…" />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-ink sm:w-auto"
      >
        Send message
      </button>
      <p className="mt-3 text-xs text-muted">
        This sends a structured inquiry when lead capture is configured. If
        submission is unavailable, an email draft opens as a fallback. By
        submitting, you agree that AREM may use these details to follow up about
        your request. See <a href="/privacy" className="font-semibold text-brand hover:text-brand-ink">Privacy</a>.
      </p>
    </form>
  );
}
