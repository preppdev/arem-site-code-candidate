"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarCheck,
  Check,
  Clock3,
  Home,
  Layers3,
  ListChecks,
  LockKeyhole,
  MapPin,
  PackageCheck,
  Phone,
  Plus,
  SearchCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { addOnGuidance, company, packages, propertyTypes, serviceArea } from "../site-data";
import { OrderIntelligenceTools } from "./order-intelligence-tools";

type ConceptKey = "guided" | "express" | "concierge" | "team";

type BookingDraft = {
  address: string;
  unit: string;
  city: string;
  stateRegion: string;
  zip: string;
  squareFootage: string;
  propertyType: string;
  occupancy: string;
  packageName: string;
  addOns: string[];
  preferredDate: string;
  timeWindow: string;
  accessMethod: string;
  accessDetails: string;
  onsiteContactPhone: string;
  alternateDate: string;
  weatherPlan: string;
  exteriorPriorities: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  objective: string;
  readiness: string;
  teamName: string;
  monthlyVolume: string;
  requesterRole: string;
  listingAgent: string;
  coordinatorEmail: string;
  approverName: string;
  billingContactEmail: string;
  invoiceCode: string;
  deliveryPreset: string;
  spendLimit: string;
  approvalRoute: string;
  billingRoute: string;
  deliveryRoute: string;
  notes: string;
};

type ConceptTheme = {
  text: string;
  bg: string;
  soft: string;
  border: string;
  ring: string;
};

type BookingConcept = {
  key: ConceptKey;
  title: string;
  shortTitle: string;
  eyebrow: string;
  bestFor: string;
  thesis: string;
  icon: LucideIcon;
  phases: string[];
  theme: ConceptTheme;
};

const fieldCls =
  "mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20";
const labelCls = "block text-sm font-medium text-ink";

const initialDraft: BookingDraft = {
  address: "",
  unit: "",
  city: "Virginia Beach",
  stateRegion: "VA",
  zip: "",
  squareFootage: "",
  propertyType: "Residential",
  occupancy: "Occupied",
  packageName: "Quick & Easy",
  addOns: [],
  preferredDate: "",
  timeWindow: "Morning",
  accessMethod: "Lockbox / combo",
  accessDetails: "",
  onsiteContactPhone: "",
  alternateDate: "",
  weatherPlan: "",
  exteriorPriorities: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  objective: "MLS-ready fast",
  readiness: "Ready before arrival",
  teamName: "",
  monthlyVolume: "10-25 shoots / month",
  requesterRole: "Team admin / coordinator",
  listingAgent: "",
  coordinatorEmail: "",
  approverName: "",
  billingContactEmail: "",
  invoiceCode: "",
  deliveryPreset: "Agent + coordinator + team inbox",
  spendLimit: "$500 without approval",
  approvalRoute: "Agent can approve routine add-ons",
  billingRoute: "Agent pays",
  deliveryRoute: "Agent only",
  notes: "",
};

const concepts: BookingConcept[] = [
  {
    key: "guided",
    title: "Guided Checkout",
    shortTitle: "Guided",
    eyebrow: "Baseline production flow",
    bestFor: "Public booking, first-time users, and straightforward listing orders.",
    thesis: "A calm, structured checkout that makes every required decision obvious without feeling like a form marathon.",
    icon: ListChecks,
    phases: ["Property", "Package", "Add-ons", "Appointment", "Review"],
    theme: {
      text: "text-brand",
      bg: "bg-brand",
      soft: "bg-brand-soft",
      border: "border-brand",
      ring: "ring-brand/20",
    },
  },
  {
    key: "express",
    title: "Express Reorder",
    shortTitle: "Express",
    eyebrow: "Repeat-agent speed path",
    bestFor: "Busy agents who already know their defaults and just need a shoot requested.",
    thesis: "A compact order lane with remembered preferences, minimal fields, and fast appointment intent.",
    icon: Zap,
    phases: ["Address", "Defaults", "Timing", "Send"],
    theme: {
      text: "text-emerald-700",
      bg: "bg-emerald-600",
      soft: "bg-emerald-50",
      border: "border-emerald-500",
      ring: "ring-emerald-200",
    },
  },
  {
    key: "concierge",
    title: "Concierge Builder",
    shortTitle: "Concierge",
    eyebrow: "Recommendation-first flow",
    bestFor: "Agents who know the listing goal but are unsure which media mix fits.",
    thesis: "Start with the business outcome, then let AREM recommend a package and tune the add-ons.",
    icon: Sparkles,
    phases: ["Goal", "Recommendation", "Tune", "Request"],
    theme: {
      text: "text-amber-700",
      bg: "bg-amber-500",
      soft: "bg-amber-50",
      border: "border-amber-400",
      ring: "ring-amber-200",
    },
  },
  {
    key: "team",
    title: "Team Command Desk",
    shortTitle: "Team",
    eyebrow: "Brokerage operations flow",
    bestFor: "Assistants, team admins, and brokerage leaders managing recurring order volume.",
    thesis: "Put account rules, approvals, delivery routing, and billing context ahead of the individual listing.",
    icon: Building2,
    phases: ["Account", "Rules", "Listing", "Review"],
    theme: {
      text: "text-slate-800",
      bg: "bg-slate-900",
      soft: "bg-slate-100",
      border: "border-slate-700",
      ring: "ring-slate-200",
    },
  },
];

const bookingAddOns = [
  {
    name: "Drone / aerial",
    price: 95,
    bestFor: addOnGuidance.find((item) => item.addOn === "Drone / aerial")?.bestFor,
  },
  {
    name: "Walkthrough video",
    price: 150,
    bestFor: "Motion, seller presentations, social reach, and stronger premium-listing launches.",
  },
  {
    name: "Twilight / virtual twilight",
    price: 125,
    bestFor: addOnGuidance.find((item) => item.addOn === "Twilight / virtual twilight")?.bestFor,
  },
  {
    name: "Matterport 3D",
    price: 175,
    bestFor: addOnGuidance.find((item) => item.addOn === "Matterport 3D")?.bestFor,
  },
  {
    name: "Virtual staging",
    price: 45,
    bestFor: addOnGuidance.find((item) => item.addOn === "Virtual staging")?.bestFor,
  },
  {
    name: "Vertical social clips",
    price: 85,
    bestFor: "Launch reels, agent feeds, and listings that need scroll-native assets.",
  },
] as const;

const timeWindows = [
  { label: "Morning", detail: "8:30-11:30", status: "Most flexible" },
  { label: "Midday", detail: "11:30-2:30", status: "Good for occupied homes" },
  { label: "Afternoon", detail: "2:30-5:30", status: "Useful after prep" },
  { label: "Twilight request", detail: "Weather dependent", status: "Confirm directly" },
] as const;

const objectiveRecommendations = [
  {
    objective: "MLS-ready fast",
    packageName: "Quick & Easy",
    addOns: ["Drone / aerial"],
    reason: "Full photo coverage and floor plan clarity, with aerial context only when it adds listing value.",
  },
  {
    objective: "Win the seller presentation",
    packageName: "Property Spotlight",
    addOns: ["Walkthrough video", "Drone / aerial", "Twilight / virtual twilight"],
    reason: "A stronger media story for sellers: motion, exterior context, and a hero image that feels premium.",
  },
  {
    objective: "Premium relocation buyer",
    packageName: "Perfect Marketing",
    addOns: ["Matterport 3D", "Vertical social clips"],
    reason: "A deeper remote-buyer package with immersive review, launch media, and social-ready assets.",
  },
] as const;

const teamVolumeOptions = [
  "Under 10 shoots / month",
  "10-25 shoots / month",
  "25-50 shoots / month",
  "50+ shoots / month",
] as const;

const requesterRoles = [
  "Team admin / coordinator",
  "Listing agent",
  "Brokerage admin",
  "Marketing director",
] as const;

const approvalRoutes = [
  "Agent can approve routine add-ons",
  "Team admin approves premium add-ons",
  "Brokerage admin approves office-paid orders",
  "Every order requires coordinator review",
] as const;

const billingRoutes = [
  "Agent pays",
  "Card on file",
  "Office invoice",
  "Monthly brokerage billing",
] as const;

const deliveryRoutes = [
  "Agent only",
  "Agent and coordinator",
  "Team inbox copied",
  "Brokerage admin copied",
] as const;

const deliveryPresets = [
  "Agent + coordinator + team inbox",
  "Listing agent + co-list agent",
  "Agent + brokerage admin archive",
  "Coordinator reviews before agent delivery",
] as const;

const spendLimits = [
  "$250 without approval",
  "$500 without approval",
  "$750 without approval",
  "Every order requires approval",
] as const;

const operationsBoard = [
  { label: "Pending approvals", value: "3", detail: "Drone, twilight, and office-paid exceptions" },
  { label: "Upcoming shoots", value: "12", detail: "This-week team appointments" },
  { label: "Billing exceptions", value: "1", detail: "Missing listing code before invoice" },
] as const;

function conceptFromValue(value: string | null | undefined): ConceptKey {
  return concepts.some((concept) => concept.key === value) ? (value as ConceptKey) : "guided";
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function includedInPackage(packageName: string, addOnName: string) {
  if (packageName === "Perfect Marketing") {
    return ["Drone / aerial", "Walkthrough video", "Twilight / virtual twilight", "Matterport 3D"].includes(addOnName);
  }
  if (packageName === "Property Spotlight") {
    return ["Drone / aerial", "Walkthrough video", "Twilight / virtual twilight"].includes(addOnName);
  }
  return false;
}

function squareFootageAdjustment(raw: string) {
  const size = Number(raw.replace(/[^\d]/g, ""));
  if (!size) return 0;
  if (size > 6000) return 175;
  if (size > 4500) return 100;
  if (size > 3000) return 50;
  return 0;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string) {
  return value.replace(/\D/g, "").length >= 10;
}

function needsHumanAccess(method: string) {
  return ["Agent meets photographer", "Seller home", "Tenant occupied"].includes(method);
}

function needsWeatherPlan(draft: BookingDraft) {
  return (
    draft.timeWindow === "Twilight request" ||
    draft.addOns.some((name) => ["Drone / aerial", "Twilight / virtual twilight"].includes(name)) ||
    includedInPackage(draft.packageName, "Drone / aerial") ||
    includedInPackage(draft.packageName, "Twilight / virtual twilight")
  );
}

function addRequirement(missing: string[], condition: boolean, label: string) {
  if (!condition) missing.push(label);
}

function getMissingRequirements(conceptKey: ConceptKey, draft: BookingDraft) {
  const missing: string[] = [];

  addRequirement(missing, Boolean(draft.address.trim()), "listing address");
  addRequirement(missing, Boolean(draft.city.trim()), "city");
  addRequirement(missing, Boolean(draft.zip.trim()), "ZIP");
  addRequirement(missing, Boolean(draft.squareFootage.trim()), "square footage");
  addRequirement(missing, Boolean(draft.preferredDate), "preferred shoot date");
  addRequirement(missing, Boolean(draft.accessMethod), "access method");
  addRequirement(missing, Boolean(draft.accessDetails.trim()), "access details");
  addRequirement(missing, Boolean(draft.contactName.trim()), "contact name");
  addRequirement(missing, isValidEmail(draft.contactEmail), "valid email");
  addRequirement(missing, isValidPhone(draft.contactPhone), "valid phone");

  if (needsHumanAccess(draft.accessMethod)) {
    addRequirement(missing, isValidPhone(draft.onsiteContactPhone), "onsite contact phone");
  }

  if (needsWeatherPlan(draft)) {
    addRequirement(missing, Boolean(draft.weatherPlan), "weather plan");
    addRequirement(missing, Boolean(draft.alternateDate), "alternate date");
  }

  if (conceptKey === "team") {
    addRequirement(missing, Boolean(draft.teamName.trim()), "team or brokerage");
    addRequirement(missing, Boolean(draft.listingAgent.trim()), "listing agent");
    addRequirement(missing, isValidEmail(draft.coordinatorEmail), "coordinator email");
    addRequirement(missing, Boolean(draft.approverName.trim()), "approver");
    addRequirement(missing, isValidEmail(draft.billingContactEmail), "billing contact email");
    addRequirement(missing, Boolean(draft.invoiceCode.trim()), "listing or invoice code");
  }

  return missing;
}

function accessDetailLabel(method: string) {
  if (method === "Lockbox / combo") return "Lockbox code and location";
  if (method === "Supra / sentri access") return "Supra / Sentri instructions";
  if (method === "Gated / condo / elevator") return "Gate, building, elevator, and parking notes";
  if (method === "Tenant occupied") return "Tenant notice window and entry authorization";
  if (method === "Seller home") return "Seller instructions and entry authorization";
  return "Access notes";
}

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={fieldCls}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option || "Select one"}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: "numeric" | "email" | "tel";
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={fieldCls}
      />
    </div>
  );
}

export function BookingLightbox() {
  const [open, setOpen] = useState(false);
  const [activeConcept, setActiveConcept] = useState<ConceptKey>("guided");
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [draft, setDraft] = useState<BookingDraft>(initialDraft);
  const [conceptSubmitted, setConceptSubmitted] = useState(false);
  const modalRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const concept = concepts.find((item) => item.key === activeConcept) ?? concepts[0];
  const selectedPackage =
    packages.find((pkg) => pkg.name === draft.packageName) ?? packages[1] ?? packages[0];
  const recommendation =
    objectiveRecommendations.find((item) => item.objective === draft.objective) ??
    objectiveRecommendations[0];
  const phases = concept.phases;
  const atFirstPhase = phaseIndex === 0;
  const atLastPhase = phaseIndex === phases.length - 1;
  const missingRequirements = useMemo(
    () => getMissingRequirements(activeConcept, draft),
    [activeConcept, draft],
  );
  const readyToStage = missingRequirements.length === 0;

  const addOnTotal = draft.addOns.reduce((total, addOnName) => {
    if (includedInPackage(draft.packageName, addOnName)) return total;
    const addOn = bookingAddOns.find((item) => item.name === addOnName);
    return total + (addOn?.price ?? 0);
  }, 0);
  const estimate = selectedPackage.startingPrice + squareFootageAdjustment(draft.squareFootage) + addOnTotal;

  const summaryLine = useMemo(() => {
    const parts = [
      draft.address || "Address pending",
      draft.squareFootage ? `${draft.squareFootage} sq ft` : "size pending",
      draft.city,
      draft.zip,
    ].filter(Boolean);
    return parts.join(" · ");
  }, [draft.address, draft.city, draft.squareFootage, draft.zip]);

  const closeLightbox = () => {
    setOpen(false);
    requestAnimationFrame(() => lastFocusedRef.current?.focus());
  };

  useEffect(() => {
    const openLightbox = (conceptKey?: string | null, packageName?: string | null) => {
      lastFocusedRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const normalizedPackage = packages.find((pkg) => pkg.name === packageName)?.name;
      setActiveConcept(conceptFromValue(conceptKey));
      setPhaseIndex(0);
      setConceptSubmitted(false);
      if (normalizedPackage) {
        setDraft((current) => ({ ...current, packageName: normalizedPackage }));
      }
      setOpen(true);
    };

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
      if (!anchor || (anchor.target && anchor.target !== "_self")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const url = new URL(anchor.href, window.location.origin);
      if (url.origin === window.location.origin && url.pathname === "/book") {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const nearbyText =
          anchor.closest("article, li, [data-package-card]")?.textContent ?? anchor.textContent ?? "";
        const inferredPackage =
          anchor.dataset.bookingPackage ??
          url.searchParams.get("package") ??
          packages.find((pkg) => nearbyText.includes(pkg.name))?.name;
        openLightbox(anchor.dataset.bookingConcept ?? url.searchParams.get("concept"), inferredPackage);
      }
    };

    const onCustomOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ concept?: ConceptKey; packageName?: string }>;
      openLightbox(customEvent.detail?.concept, customEvent.detail?.packageName);
    };

    window.addEventListener("click", onDocumentClick, true);
    window.addEventListener("arem:booking-open", onCustomOpen as EventListener);
    document.documentElement.dataset.bookingLightboxReady = "true";

    return () => {
      window.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("arem:booking-open", onCustomOpen as EventListener);
      delete document.documentElement.dataset.bookingLightboxReady;
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        modalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute("disabled") && element.offsetParent !== null);

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

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const updateDraft = (key: keyof BookingDraft, value: string) => {
    setConceptSubmitted(false);
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const selectConcept = (key: ConceptKey) => {
    setActiveConcept(key);
    setPhaseIndex(0);
    setConceptSubmitted(false);
  };

  const toggleAddOn = (name: string) => {
    setConceptSubmitted(false);
    setDraft((current) => ({
      ...current,
      addOns: current.addOns.includes(name)
        ? current.addOns.filter((item) => item !== name)
        : [...current.addOns, name],
    }));
  };

  const useRecommendation = () => {
    setConceptSubmitted(false);
    setDraft((current) => ({
      ...current,
      packageName: recommendation.packageName,
      addOns: Array.from(
        new Set([
          ...current.addOns,
          ...recommendation.addOns.filter((addOn) => !includedInPackage(recommendation.packageName, addOn)),
        ]),
      ),
    }));
  };

  const goBack = () => setPhaseIndex((current) => Math.max(current - 1, 0));
  const goNext = () => setPhaseIndex((current) => Math.min(current + 1, phases.length - 1));

  const packagePicker = (
    <div className="grid gap-3">
      {packages.map((pkg) => {
        const selected = pkg.name === draft.packageName;
        return (
          <button
            key={pkg.name}
            type="button"
            onClick={() => updateDraft("packageName", pkg.name)}
            className={[
              "grid gap-3 rounded-[var(--radius-card)] border p-4 text-left transition-colors md:grid-cols-[1fr_auto]",
              selected ? `${concept.theme.border} ${concept.theme.soft}` : "border-line bg-paper-2 hover:border-line-strong",
            ].join(" ")}
          >
            <span>
              <span className="flex flex-wrap items-center gap-2 text-base font-semibold text-ink">
                {pkg.name}
                {pkg.featured && (
                  <span className="rounded-full bg-twilight/20 px-2.5 py-1 text-xs font-semibold text-amber-800">
                    Most popular
                  </span>
                )}
              </span>
              <span className={`mt-1 block text-sm font-medium ${concept.theme.text}`}>
                {pkg.tagline}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-ink-2">
                {pkg.bestFor}
              </span>
            </span>
            <span className="text-left md:text-right">
              <span className="block text-lg font-semibold text-ink">{pkg.priceNote}</span>
              <span className="mt-1 block text-xs text-muted">Starting estimate</span>
            </span>
          </button>
        );
      })}
    </div>
  );

  const addOnPicker = (
    <div className="grid gap-3 sm:grid-cols-2">
                {bookingAddOns.map((addOn) => {
        const selected = draft.addOns.includes(addOn.name);
        const included = includedInPackage(draft.packageName, addOn.name);
        return (
          <button
            key={addOn.name}
            type="button"
            onClick={() => {
              if (!included) toggleAddOn(addOn.name);
            }}
            disabled={included}
            className={[
              "flex min-h-36 flex-col justify-between rounded-[var(--radius-card)] border p-4 text-left transition-colors",
              included
                ? "cursor-default border-line-strong bg-paper text-ink"
                : selected
                  ? `${concept.theme.border} ${concept.theme.soft}`
                  : "border-line bg-paper-2 hover:border-line-strong",
            ].join(" ")}
          >
            <span>
              <span className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold text-ink">{addOn.name}</span>
                <span
                  className={[
                    "grid h-6 w-6 shrink-0 place-items-center rounded-full border",
                    included || selected ? `${concept.theme.bg} border-transparent text-white` : "border-line bg-paper text-muted",
                  ].join(" ")}
                >
                  {(included || selected) && <Check className="h-3.5 w-3.5" />}
                </span>
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-ink-2">
                {addOn.bestFor}
              </span>
            </span>
            <span className="mt-4 border-t border-line pt-3 text-sm font-semibold text-ink">
              {included ? "Included deliverable" : `+${formatMoney(addOn.price)}`}
            </span>
          </button>
        );
      })}
    </div>
  );

  const contactFields = (
    <div className="grid gap-4 sm:grid-cols-3">
      <TextField
        id="booking-contact-name"
        label="Contact name"
        value={draft.contactName}
        onChange={(value) => updateDraft("contactName", value)}
        placeholder="Agent or coordinator"
      />
      <TextField
        id="booking-contact-email"
        label="Email"
        value={draft.contactEmail}
        onChange={(value) => updateDraft("contactEmail", value)}
        placeholder="agent@email.com"
        type="email"
        inputMode="email"
      />
      <TextField
        id="booking-contact-phone"
        label="Phone"
        value={draft.contactPhone}
        onChange={(value) => updateDraft("contactPhone", value)}
        placeholder="(757) 555-0000"
        type="tel"
        inputMode="tel"
      />
    </div>
  );

  const propertyFields = (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <TextField
          id="booking-modal-address"
          label="Listing address"
          value={draft.address}
          onChange={(value) => updateDraft("address", value)}
          placeholder="123 Shoreline Dr"
        />
      </div>
      <TextField
        id="booking-modal-unit"
        label="Unit / building"
        value={draft.unit}
        onChange={(value) => updateDraft("unit", value)}
        placeholder="Unit 4B"
      />
      <TextField
        id="booking-modal-city"
        label="City / market"
        value={draft.city}
        onChange={(value) => updateDraft("city", value)}
        placeholder="Virginia Beach"
      />
      <TextField
        id="booking-modal-state"
        label="State"
        value={draft.stateRegion}
        onChange={(value) => updateDraft("stateRegion", value)}
        placeholder="VA"
      />
      <TextField
        id="booking-modal-zip"
        label="ZIP"
        value={draft.zip}
        onChange={(value) => updateDraft("zip", value)}
        placeholder="23451"
        inputMode="numeric"
      />
      <TextField
        id="booking-modal-size"
        label="Square footage"
        value={draft.squareFootage}
        onChange={(value) => updateDraft("squareFootage", value)}
        placeholder="2,400"
        inputMode="numeric"
      />
      <SelectField
        id="booking-modal-property-type"
        label="Property type"
        value={draft.propertyType}
        options={propertyTypes}
        onChange={(value) => updateDraft("propertyType", value)}
      />
      <SelectField
        id="booking-modal-occupancy"
        label="Occupancy"
        value={draft.occupancy}
        options={["Occupied", "Vacant", "Tenant occupied", "New construction"]}
        onChange={(value) => updateDraft("occupancy", value)}
      />
    </div>
  );

  const timePicker = (
    <div className="grid gap-3 sm:grid-cols-2">
      {timeWindows.map((slot) => {
        const selected = slot.label === draft.timeWindow;
        return (
          <button
            key={slot.label}
            type="button"
            onClick={() => updateDraft("timeWindow", slot.label)}
            className={[
              "rounded-[var(--radius-card)] border p-4 text-left transition-colors",
              selected ? `${concept.theme.border} ${concept.theme.soft}` : "border-line bg-paper-2 hover:border-line-strong",
            ].join(" ")}
          >
            <span className="flex items-center justify-between gap-3">
              <span className="font-semibold text-ink">{slot.label}</span>
              <span className={`text-xs font-semibold ${concept.theme.text}`}>{slot.status}</span>
            </span>
            <span className="mt-1 block text-sm text-ink-2">{slot.detail}</span>
          </button>
        );
      })}
    </div>
  );

  const accessAndWeatherFields = (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id={`booking-${activeConcept}-date`}
          label="Preferred shoot date"
          type="date"
          value={draft.preferredDate}
          onChange={(value) => updateDraft("preferredDate", value)}
        />
        <SelectField
          id={`booking-${activeConcept}-access`}
          label="Access method"
          value={draft.accessMethod}
          options={[
            "Lockbox / combo",
            "Supra / sentri access",
            "Gated / condo / elevator",
            "Agent meets photographer",
            "Seller home",
            "Tenant occupied",
          ]}
          onChange={(value) => updateDraft("accessMethod", value)}
        />
      </div>

      {timePicker}

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id={`booking-${activeConcept}-access-details`}
          label={accessDetailLabel(draft.accessMethod)}
          value={draft.accessDetails}
          onChange={(value) => updateDraft("accessDetails", value)}
          placeholder="Combo, gate, parking, pets, alarm, entry authorization..."
        />
        {needsHumanAccess(draft.accessMethod) ? (
          <TextField
            id={`booking-${activeConcept}-onsite-phone`}
            label="Onsite contact phone"
            value={draft.onsiteContactPhone}
            onChange={(value) => updateDraft("onsiteContactPhone", value)}
            placeholder="Seller, tenant, or meeting agent"
            type="tel"
            inputMode="tel"
          />
        ) : (
          <TextField
            id={`booking-${activeConcept}-readiness`}
            label="Readiness note"
            value={draft.readiness}
            onChange={(value) => updateDraft("readiness", value)}
            placeholder="Photo-ready, pets secured, cars moved..."
          />
        )}
      </div>

      {needsWeatherPlan(draft) && (
        <div className="grid gap-4 rounded-[var(--radius-card)] border border-amber-300 bg-amber-50 p-4 sm:grid-cols-2">
          <SelectField
            id={`booking-${activeConcept}-weather-plan`}
            label="Weather plan"
            value={draft.weatherPlan}
            options={[
              "",
              "Proceed with interiors, reschedule exterior/drone",
              "Reschedule full shoot if exterior conditions are poor",
              "Use virtual twilight if real twilight is unavailable",
            ]}
            onChange={(value) => updateDraft("weatherPlan", value)}
          />
          <TextField
            id={`booking-${activeConcept}-alternate-date`}
            label="Alternate date"
            type="date"
            value={draft.alternateDate}
            onChange={(value) => updateDraft("alternateDate", value)}
          />
          <div className="sm:col-span-2">
            <TextField
              id={`booking-${activeConcept}-exterior-priorities`}
              label="Exterior priorities"
              value={draft.exteriorPriorities}
              onChange={(value) => updateDraft("exteriorPriorities", value)}
              placeholder="Waterfront, pool, acreage, roofline, neighborhood amenities..."
            />
          </div>
        </div>
      )}

      {contactFields}
    </div>
  );

  function renderGuidedPhase() {
    if (phaseIndex === 0) {
      return (
        <div className="grid gap-5">
          <div>
            <h3 className="text-xl font-semibold text-ink">Start with the property.</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              The production version should feel like a clear intake, with the few required details up front and deeper routing fields only when needed.
            </p>
          </div>
          {propertyFields}
        </div>
      );
    }

    if (phaseIndex === 1) return packagePicker;
    if (phaseIndex === 2) return addOnPicker;
    if (phaseIndex === 3) return accessAndWeatherFields;

    return <ReviewPanel concept={concept} draft={draft} estimate={estimate} summaryLine={summaryLine} />;
  }

  function renderExpressPhase() {
    if (phaseIndex === 0) {
      return (
        <div className="grid gap-5">
          <div className="rounded-[var(--radius-card)] border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-800">Fast lane assumption</p>
            <p className="mt-1 text-sm leading-relaxed text-emerald-900">
              Returning agents should not have to re-answer brokerage, delivery, and billing questions every time.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1.4fr_0.5fr_0.5fr]">
            <TextField
              id="booking-express-address"
              label="Listing address"
              value={draft.address}
              onChange={(value) => updateDraft("address", value)}
              placeholder="Paste address"
            />
            <TextField
              id="booking-express-zip"
              label="ZIP"
              value={draft.zip}
              onChange={(value) => updateDraft("zip", value)}
              placeholder="23451"
              inputMode="numeric"
            />
            <TextField
              id="booking-express-size"
              label="Square footage"
              value={draft.squareFootage}
              onChange={(value) => updateDraft("squareFootage", value)}
              placeholder="2,400"
              inputMode="numeric"
            />
          </div>
        </div>
      );
    }

    if (phaseIndex === 1) {
      return (
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {["Quick & Easy", "Property Spotlight"].map((pkgName) => {
              const pkg = packages.find((item) => item.name === pkgName);
              const selected = draft.packageName === pkgName;
              if (!pkg) return null;
              return (
                <button
                  key={pkg.name}
                  type="button"
                  onClick={() => updateDraft("packageName", pkg.name)}
                  className={[
                    "rounded-[var(--radius-card)] border p-4 text-left transition-colors",
                    selected ? "border-emerald-500 bg-emerald-50" : "border-line bg-paper-2 hover:border-line-strong",
                  ].join(" ")}
                >
                  <span className="block text-base font-semibold text-ink">{pkg.name}</span>
                  <span className="mt-1 block text-sm text-emerald-700">{pkg.priceNote}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-ink-2">{pkg.tagline}</span>
                </button>
              );
            })}
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {["Drone / aerial", "Virtual staging", "Twilight / virtual twilight"].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => toggleAddOn(name)}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  draft.addOns.includes(name)
                    ? "border-emerald-500 bg-emerald-600 text-white"
                    : "border-line bg-paper text-ink hover:border-emerald-400",
                ].join(" ")}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (phaseIndex === 2) return accessAndWeatherFields;

    return <ReviewPanel concept={concept} draft={draft} estimate={estimate} summaryLine={summaryLine} />;
  }

  function renderConciergePhase() {
    if (phaseIndex === 0) {
      return (
        <div className="grid gap-3">
          {objectiveRecommendations.map((option) => {
            const selected = draft.objective === option.objective;
            return (
              <button
                key={option.objective}
                type="button"
                onClick={() => updateDraft("objective", option.objective)}
                className={[
                  "rounded-[var(--radius-card)] border p-4 text-left transition-colors",
                  selected ? "border-amber-400 bg-amber-50" : "border-line bg-paper-2 hover:border-line-strong",
                ].join(" ")}
              >
                <span className="block text-base font-semibold text-ink">{option.objective}</span>
                <span className="mt-2 block text-sm leading-relaxed text-ink-2">{option.reason}</span>
              </button>
            );
          })}
        </div>
      );
    }

    if (phaseIndex === 1) {
      return (
        <div className="grid gap-5">
          <div className="rounded-[var(--radius-card)] border border-amber-300 bg-amber-50 p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-amber-800">AREM recommends</p>
            <h3 className="mt-2 text-2xl font-semibold text-ink">{recommendation.packageName}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{recommendation.reason}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {recommendation.addOns.map((addOn) => (
                <span key={addOn} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-800">
                  {addOn}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={useRecommendation}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
            >
              Use this recommendation <Check className="h-4 w-4" />
            </button>
          </div>
          <div>{packagePicker}</div>
        </div>
      );
    }

    if (phaseIndex === 2) return addOnPicker;

    return (
      <div className="grid gap-5">
        {propertyFields}
        {accessAndWeatherFields}
        <ReviewPanel concept={concept} draft={draft} estimate={estimate} summaryLine={summaryLine} compact />
      </div>
    );
  }

  function renderTeamPhase() {
    if (phaseIndex === 0) {
      return (
        <div className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="booking-team-name"
              label="Team / brokerage"
              value={draft.teamName}
              onChange={(value) => updateDraft("teamName", value)}
              placeholder="Coastal Homes Group"
            />
            <SelectField
              id="booking-team-volume"
              label="Expected volume"
              value={draft.monthlyVolume}
              options={teamVolumeOptions}
              onChange={(value) => updateDraft("monthlyVolume", value)}
            />
            <SelectField
              id="booking-team-requester-role"
              label="Requester role"
              value={draft.requesterRole}
              options={requesterRoles}
              onChange={(value) => updateDraft("requesterRole", value)}
            />
            <TextField
              id="booking-team-listing-agent"
              label="Listing agent"
              value={draft.listingAgent}
              onChange={(value) => updateDraft("listingAgent", value)}
              placeholder="Agent responsible for the listing"
            />
            <SelectField
              id="booking-team-billing"
              label="Billing route"
              value={draft.billingRoute}
              options={billingRoutes}
              onChange={(value) => updateDraft("billingRoute", value)}
            />
            <SelectField
              id="booking-team-delivery"
              label="Delivery routing"
              value={draft.deliveryRoute}
              options={deliveryRoutes}
              onChange={(value) => updateDraft("deliveryRoute", value)}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {operationsBoard.map((item) => (
              <div key={item.label} className="rounded-[var(--radius-card)] border border-line bg-paper-2 p-4">
                <LockKeyhole className="h-5 w-5 text-slate-700" />
                <p className="mt-3 text-2xl font-semibold text-ink">{item.value}</p>
                <p className="mt-1 text-sm font-semibold text-ink">{item.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (phaseIndex === 1) {
      return (
        <div className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              id="booking-team-approval"
              label="Approval model"
              value={draft.approvalRoute}
              options={approvalRoutes}
              onChange={(value) => updateDraft("approvalRoute", value)}
            />
            <SelectField
              id="booking-team-spend"
              label="Spend limit"
              value={draft.spendLimit}
              options={spendLimits}
              onChange={(value) => updateDraft("spendLimit", value)}
            />
            <SelectField
              id="booking-team-delivery-preset"
              label="Saved delivery preset"
              value={draft.deliveryPreset}
              options={deliveryPresets}
              onChange={(value) => updateDraft("deliveryPreset", value)}
            />
            <TextField
              id="booking-team-approver"
              label="Approver"
              value={draft.approverName}
              onChange={(value) => updateDraft("approverName", value)}
              placeholder="Admin, broker, or team lead"
            />
            <TextField
              id="booking-team-coordinator-email"
              label="Coordinator email"
              value={draft.coordinatorEmail}
              onChange={(value) => updateDraft("coordinatorEmail", value)}
              placeholder="orders@team.com"
              type="email"
              inputMode="email"
            />
            <TextField
              id="booking-team-billing-email"
              label="Billing contact email"
              value={draft.billingContactEmail}
              onChange={(value) => updateDraft("billingContactEmail", value)}
              placeholder="billing@brokerage.com"
              type="email"
              inputMode="email"
            />
            <TextField
              id="booking-team-invoice-code"
              label="Listing / invoice code"
              value={draft.invoiceCode}
              onChange={(value) => updateDraft("invoiceCode", value)}
              placeholder="MLS, listing ID, or PO"
            />
          </div>
          <label htmlFor="booking-team-notes" className={labelCls}>
            Office notes
            <textarea
              id="booking-team-notes"
              value={draft.notes}
              onChange={(event) => updateDraft("notes", event.target.value)}
              rows={4}
              className={fieldCls}
              placeholder="Preferred photographer notes, rollout limits, assistant contacts, agent exceptions..."
            />
          </label>
        </div>
      );
    }

    if (phaseIndex === 2) {
      return (
        <div className="grid gap-5">
          {propertyFields}
          {packagePicker}
          {accessAndWeatherFields}
        </div>
      );
    }

    return <ReviewPanel concept={concept} draft={draft} estimate={estimate} summaryLine={summaryLine} />;
  }

  const phaseBody =
    activeConcept === "guided"
      ? renderGuidedPhase()
      : activeConcept === "express"
        ? renderExpressPhase()
        : activeConcept === "concierge"
          ? renderConciergePhase()
          : renderTeamPhase();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-night/70 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeLightbox();
      }}
    >
      <div className="flex min-h-svh items-start justify-center overflow-y-auto px-3 py-3 sm:px-5 sm:py-6">
        <section
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-lightbox-title"
          className="relative w-full max-w-7xl overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper shadow-lift"
        >
          <div className="flex items-start justify-between gap-4 border-b border-line bg-paper px-4 py-4 sm:px-5">
            <div>
              <p className={`font-mono text-xs uppercase tracking-widest ${concept.theme.text}`}>
                Booking lightbox concepts
              </p>
              <h2 id="booking-lightbox-title" className="mt-1 text-2xl font-semibold text-ink">
                {concept.title}
              </h2>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-ink-2">{concept.thesis}</p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-paper text-ink hover:border-ink"
              aria-label="Close booking lightbox"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid max-h-[calc(100svh-7rem)] overflow-y-auto lg:grid-cols-[16rem_1fr_20rem]">
            <aside className="border-b border-line bg-paper-2 p-4 lg:border-b-0 lg:border-r">
              <p className="text-xs font-semibold uppercase text-muted">Choose direction</p>
              <div className="mt-3 grid gap-2">
                {concepts.map((item) => {
                  const Icon = item.icon;
                  const selected = item.key === activeConcept;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => selectConcept(item.key)}
                      className={[
                        "rounded-[var(--radius-card)] border p-3 text-left transition-colors",
                        selected ? `${item.theme.border} ${item.theme.soft}` : "border-line bg-paper hover:border-line-strong",
                      ].join(" ")}
                    >
                      <span className="flex items-center gap-2">
                        <span className={["grid h-8 w-8 place-items-center rounded-full text-white", item.theme.bg].join(" ")}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold text-ink">{item.shortTitle}</span>
                      </span>
                      <span className="mt-2 block text-xs leading-relaxed text-ink-2">{item.bestFor}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 rounded-[var(--radius-card)] border border-line bg-paper p-4">
                <p className="text-sm font-semibold text-ink">Prototype boundary</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  This modal models the booking experience only. It does not reserve a calendar slot, collect payment, or submit an order.
                </p>
              </div>
            </aside>

            <div className="min-w-0 p-4 sm:p-5">
              <div className="mb-5 flex flex-wrap gap-2">
                {phases.map((phase, index) => {
                  const selected = index === phaseIndex;
                  const complete = index < phaseIndex;
                  return (
                    <button
                      key={phase}
                      type="button"
                      onClick={() => {
                        setPhaseIndex(index);
                        setConceptSubmitted(false);
                      }}
                      aria-current={selected ? "step" : undefined}
                      className={[
                        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-colors",
                        selected
                          ? `${concept.theme.border} ${concept.theme.soft} ${concept.theme.text}`
                          : "border-line bg-paper-2 text-ink-2 hover:border-line-strong",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "grid h-5 w-5 place-items-center rounded-full text-[0.65rem]",
                          complete || selected ? `${concept.theme.bg} text-white` : "bg-paper text-muted",
                        ].join(" ")}
                      >
                        {complete ? <Check className="h-3 w-3" /> : index + 1}
                      </span>
                      {phase}
                    </button>
                  );
                })}
              </div>

              <div className="min-h-[28rem]">{phaseBody}</div>
              <OrderIntelligenceTools
                address={draft.address}
                city={draft.city}
                zip={draft.zip}
                packageName={draft.packageName}
                addOns={draft.addOns}
                preferredDate={draft.preferredDate}
                timeWindow={draft.timeWindow}
              />
            </div>

            <aside className="border-t border-line bg-paper-2 p-4 lg:border-l lg:border-t-0">
              <div className="lg:sticky lg:top-0">
                <p className="text-xs font-semibold uppercase text-muted">Live concept summary</p>
                <div className="mt-3 rounded-[var(--radius-card)] border border-line bg-paper p-4">
                  <div className="flex items-start gap-3">
                    <span className={["grid h-10 w-10 shrink-0 place-items-center rounded-full text-white", concept.theme.bg].join(" ")}>
                      <PackageCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-base font-semibold text-ink">{selectedPackage.name}</p>
                      <p className={`mt-1 text-sm font-semibold ${concept.theme.text}`}>{formatMoney(estimate)} estimate</p>
                    </div>
                  </div>
                  <dl className="mt-4 grid gap-3 text-sm">
                    <div>
                      <dt className="font-semibold text-ink">Property</dt>
                      <dd className="mt-1 text-ink-2">{summaryLine}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink">Add-ons</dt>
                      <dd className="mt-1 text-ink-2">
                        {draft.addOns.length ? draft.addOns.join(", ") : "None selected yet"}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-ink">Appointment</dt>
                      <dd className="mt-1 text-ink-2">
                        {draft.preferredDate || "Date pending"} · {draft.timeWindow}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-ink-2">
                  <p className="flex items-start gap-2">
                    <CalendarCheck className={`mt-0.5 h-4 w-4 shrink-0 ${concept.theme.text}`} />
                    AREM would still confirm calendar availability, travel, weather, and access.
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${concept.theme.text}`} />
                    Routine coverage includes {serviceArea.hubs.slice(0, 3).join(", ")} and surrounding markets.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={atFirstPhase}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2.5 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  {atLastPhase ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (readyToStage) setConceptSubmitted(true);
                      }}
                      disabled={!readyToStage}
                      className={[
                        "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45",
                        concept.theme.bg,
                      ].join(" ")}
                    >
                      {readyToStage ? "Place concept order" : "Complete required fields"} <Check className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={goNext}
                      className={["inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white", concept.theme.bg].join(" ")}
                    >
                      Continue <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {!readyToStage && (
                  <div className="mt-4 rounded-[var(--radius-card)] border border-line bg-paper p-4">
                    <p className="text-sm font-semibold text-ink">Needed before staging</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">
                      {missingRequirements.slice(0, 6).join(", ")}
                      {missingRequirements.length > 6 ? `, and ${missingRequirements.length - 6} more` : ""}.
                    </p>
                  </div>
                )}

                {conceptSubmitted && (
                  <div className={`mt-4 rounded-[var(--radius-card)] border ${concept.theme.border} ${concept.theme.soft} p-4`}>
                    <p className="text-sm font-semibold text-ink">Concept order staged</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">
                      This confirms the interaction design only. No live order, payment, or appointment was created.
                    </p>
                  </div>
                )}

                <a
                  href={company.phoneHref}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand"
                >
                  <Phone className="h-4 w-4" />
                  Prefer phone? {company.phone}
                </a>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}

function ReviewPanel({
  concept,
  draft,
  estimate,
  summaryLine,
  compact = false,
}: {
  concept: BookingConcept;
  draft: BookingDraft;
  estimate: number;
  summaryLine: string;
  compact?: boolean;
}) {
  return (
    <div className="grid gap-4">
      <div className={`rounded-[var(--radius-card)] border ${concept.theme.border} ${concept.theme.soft} p-5`}>
        <p className={`font-mono text-xs uppercase tracking-widest ${concept.theme.text}`}>
          Ready for review
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-ink">{formatMoney(estimate)} concept estimate</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">
          A production build would turn this into a confirmation screen with payment, account routing, calendar hold, and email receipt logic.
        </p>
      </div>

      <div className={["grid gap-3", compact ? "" : "sm:grid-cols-2"].join(" ")}>
        {[
          [Home, "Property", summaryLine],
          [PackageCheck, "Package", draft.packageName],
          [Plus, "Add-ons", draft.addOns.length ? draft.addOns.join(", ") : "None selected"],
          [Clock3, "Timing", `${draft.preferredDate || "Date pending"} · ${draft.timeWindow}`],
          [SearchCheck, "Access", `${draft.accessMethod}${draft.accessDetails ? ` · ${draft.accessDetails}` : ""}`],
          [CalendarCheck, "Weather", draft.weatherPlan || "No weather-sensitive plan needed yet"],
          [Layers3, "Routing", `${draft.billingRoute} · ${draft.deliveryPreset || draft.deliveryRoute}`],
        ].map(([Icon, title, body]) => {
          const TypedIcon = Icon as LucideIcon;
          return (
            <div key={title as string} className="rounded-[var(--radius-card)] border border-line bg-paper-2 p-4">
              <TypedIcon className={`h-5 w-5 ${concept.theme.text}`} />
              <p className="mt-3 text-sm font-semibold text-ink">{title as string}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{body as string}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
