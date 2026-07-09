"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { company } from "../site-data";

const fieldCls =
  "mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20";
const labelCls = "block text-sm font-medium text-ink";

export function BrokerageInquiryForm() {
  const [sent, setSent] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  if (sent) {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-paper p-8 text-center shadow-soft">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand">
          <Check className="h-6 w-6" />
        </span>
        <h2 className="mt-4 text-xl font-semibold text-ink">
          {usedFallback ? "Email draft opened" : "Pilot request received"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">
          {usedFallback
            ? "Your email app should now have the brokerage details filled in. Send that draft to request a brokerage pilot, or call/text AREM if the timeline is urgent."
            : "The brokerage details were submitted. Call or text AREM if the rollout timeline is urgent."}
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
        const subject = encodeURIComponent("AREM brokerage pilot request");
        const body = encodeURIComponent(
          [
            `Name: ${data.get("name") ?? ""}`,
            `Email: ${data.get("email") ?? ""}`,
            `Phone: ${data.get("phone") ?? ""}`,
            `Role: ${data.get("role") ?? ""}`,
            `Brokerage / team: ${data.get("brokerage") ?? ""}`,
            `Agent count: ${data.get("agentCount") ?? ""}`,
            `Office count: ${data.get("officeCount") ?? ""}`,
            `Monthly listing volume: ${data.get("monthlyListings") ?? ""}`,
            `Markets: ${data.get("markets") ?? ""}`,
            `Billing preference: ${data.get("billing") ?? ""}`,
            `Target rollout date: ${data.get("rolloutDate") ?? ""}`,
            "",
            "Rollout notes:",
            `${data.get("notes") ?? ""}`,
          ].join("\n")
        );
        try {
          const response = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              kind: "brokerage",
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
          <input id="name" name="name" required autoComplete="name" className={fieldCls} placeholder="Jane Manager" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email <span className="text-brand">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldCls} placeholder="jane@brokerage.com" />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone <span className="text-brand">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={fieldCls} placeholder="(757) 555-0123" />
        </div>
        <div>
          <label htmlFor="role" className={labelCls}>
            Role <span className="text-brand">*</span>
          </label>
          <select id="role" name="role" required defaultValue="" className={fieldCls}>
            <option value="" disabled>Select...</option>
            <option>Broker / owner</option>
            <option>Team leader</option>
            <option>Office manager</option>
            <option>Marketing director</option>
            <option>Listing coordinator</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="brokerage" className={labelCls}>
            Brokerage or team <span className="text-brand">*</span>
          </label>
          <input id="brokerage" name="brokerage" required className={fieldCls} placeholder="Brokerage name, office, or team" />
        </div>
        <div>
          <label htmlFor="agentCount" className={labelCls}>
            Agent count
          </label>
          <input id="agentCount" name="agentCount" inputMode="numeric" className={fieldCls} placeholder="200" />
        </div>
        <div>
          <label htmlFor="officeCount" className={labelCls}>
            Office count
          </label>
          <input id="officeCount" name="officeCount" inputMode="numeric" className={fieldCls} placeholder="3" />
        </div>
        <div>
          <label htmlFor="monthlyListings" className={labelCls}>
            Monthly listing volume
          </label>
          <select id="monthlyListings" name="monthlyListings" defaultValue="" className={fieldCls}>
            <option value="" disabled>Select range...</option>
            <option>1-10 listings</option>
            <option>11-25 listings</option>
            <option>26-50 listings</option>
            <option>51+ listings</option>
            <option>Seasonal / varies</option>
          </select>
        </div>
        <div>
          <label htmlFor="billing" className={labelCls}>
            Billing preference
          </label>
          <select id="billing" name="billing" defaultValue="" className={fieldCls}>
            <option value="" disabled>Select preference...</option>
            <option>Agents pay directly</option>
            <option>Office pays</option>
            <option>Monthly invoice</option>
            <option>Need rate-card discussion</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="markets" className={labelCls}>
            Markets covered
          </label>
          <input id="markets" name="markets" className={fieldCls} placeholder="Virginia Beach, Norfolk, Chesapeake..." />
        </div>
        <div>
          <label htmlFor="rolloutDate" className={labelCls}>
            Target rollout date
          </label>
          <input id="rolloutDate" name="rolloutDate" type="date" className={fieldCls} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="notes" className={labelCls}>
            Rollout priorities
          </label>
          <textarea id="notes" name="notes" rows={4} className={fieldCls} placeholder="Package defaults, billing, listing coordinator workflow, seller prep, support routing..." />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-ink sm:w-auto"
      >
        Request brokerage pilot
      </button>
      <p className="mt-3 text-xs text-muted">
        This sends a structured pilot request when lead capture is configured.
        If submission is unavailable, an email draft opens as a fallback. By
        submitting, you agree that AREM may use these details to follow up about
        your request. See <a href="/privacy" className="font-semibold text-brand hover:text-brand-ink">Privacy</a>.
      </p>
    </form>
  );
}
