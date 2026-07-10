"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardCheck,
  Home,
  MapPin,
  PackageCheck,
  Plus,
  Sparkles,
} from "lucide-react";
import { addOnGuidance, packages, propertyTypes } from "../site-data";

type StepKey = "property" | "package" | "addons" | "appointment" | "summary";

type BookingState = {
  address: string;
  unit: string;
  city: string;
  stateRegion: string;
  zip: string;
  community: string;
  squareFootage: string;
  propertyType: string;
  occupancy: string;
  parking: string;
  access: string;
  orderingRole: string;
  brokerageAccount: string;
  packageDefault: string;
  addOnApproval: string;
  billingRoute: string;
  deliveryRoute: string;
  packageName: string;
  addOns: string[];
  preferredDate: string;
  timeWindow: string;
  urgency: string;
  alternateDate: string;
  accessMethod: string;
  onsiteContact: string;
  prepStatus: string;
  weatherPlan: string;
  readinessItems: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
};

const steps: { key: StepKey; title: string; eyebrow: string; icon: typeof Home }[] = [
  { key: "property", title: "Address", eyebrow: "Property details", icon: Home },
  { key: "package", title: "Package", eyebrow: "Choose the base", icon: PackageCheck },
  { key: "addons", title: "Add-ons", eyebrow: "Enhance the order", icon: Plus },
  { key: "appointment", title: "Appointment", eyebrow: "Timing preference", icon: CalendarDays },
  { key: "summary", title: "Summary", eyebrow: "Review concept", icon: ClipboardCheck },
];

const fieldCls =
  "mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20";
const labelCls = "block text-sm font-medium text-ink";

const bookingAddOns = [
  {
    name: "Drone / aerial",
    price: 95,
    unit: "",
    bestFor: addOnGuidance.find((item) => item.addOn === "Drone / aerial")?.bestFor,
  },
  {
    name: "Walkthrough video",
    price: 150,
    unit: "",
    bestFor: "Flow, seller presentations, social reach, and premium listing launches.",
  },
  {
    name: "Twilight / virtual twilight",
    price: 125,
    unit: "",
    bestFor: addOnGuidance.find((item) => item.addOn === "Twilight / virtual twilight")?.bestFor,
  },
  {
    name: "Matterport 3D",
    price: 175,
    unit: "",
    bestFor: addOnGuidance.find((item) => item.addOn === "Matterport 3D")?.bestFor,
  },
  {
    name: "Virtual staging",
    price: 45,
    unit: "per image",
    bestFor: addOnGuidance.find((item) => item.addOn === "Virtual staging")?.bestFor,
  },
  {
    name: "Advanced edits",
    price: 25,
    unit: "per image",
    bestFor: addOnGuidance.find((item) => item.addOn === "Advanced edits")?.bestFor,
  },
] as const;

const appointmentSlots = [
  { label: "Morning", window: "8:30-11:30", status: "Available" },
  { label: "Midday", window: "11:30-2:30", status: "Limited" },
  { label: "Afternoon", window: "2:30-5:30", status: "Available" },
  { label: "Twilight request", window: "Weather dependent", status: "Confirmation needed" },
] as const;

const urgencyOptions = [
  "Standard next available",
  "Rush / MLS deadline",
  "Flexible this week",
  "Seller-coordinated access",
] as const;

const accessMethods = [
  "Lockbox / combo",
  "Supra / sentri access",
  "Agent meets photographer",
  "Seller home",
  "Tenant occupied",
  "Vacant / unlocked by agent",
] as const;

const humanAccessMethods = new Set([
  "Agent meets photographer",
  "Seller home",
  "Tenant occupied",
]);

const readinessItems = [
  "Photo-ready before arrival",
  "Pets secured",
  "Cars moved",
  "Lights and blinds ready",
  "Pool / yard ready",
  "Rooms to avoid noted",
] as const;

const initialState: BookingState = {
  address: "",
  unit: "",
  city: "Virginia Beach",
  stateRegion: "VA",
  zip: "",
  community: "",
  squareFootage: "",
  propertyType: "Residential",
  occupancy: "Occupied",
  parking: "",
  access: "",
  orderingRole: "Agent",
  brokerageAccount: "No brokerage account selected",
  packageDefault: "Agent choice",
  addOnApproval: "Agent pre-approved",
  billingRoute: "Agent pays",
  deliveryRoute: "Agent only",
  packageName: "Quick & Easy",
  addOns: [],
  preferredDate: "",
  timeWindow: "Morning",
  urgency: "Standard next available",
  alternateDate: "",
  accessMethod: "",
  onsiteContact: "",
  prepStatus: "",
  weatherPlan: "",
  readinessItems: [],
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  notes: "",
};

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

export function BookingWorkflowConcept() {
  const [state, setState] = useState<BookingState>(initialState);
  const [activeStep, setActiveStep] = useState<StepKey>("property");
  const [conceptPlaced, setConceptPlaced] = useState(false);

  const stepIndex = steps.findIndex((step) => step.key === activeStep);
  const selectedPackage =
    packages.find((pkg) => pkg.name === state.packageName) ?? packages[1] ?? packages[0];
  const sizeAdjustment = squareFootageAdjustment(state.squareFootage);
  const addOnTotal = state.addOns.reduce((total, addOnName) => {
    if (includedInPackage(state.packageName, addOnName)) return total;
    const addOn = bookingAddOns.find((item) => item.name === addOnName);
    return total + (addOn?.price ?? 0);
  }, 0);
  const conceptTotal = selectedPackage.startingPrice + sizeAdjustment + addOnTotal;

  const progressLabel = `${stepIndex + 1} of ${steps.length}`;
  const propertyComplete = Boolean(state.address.trim() && state.squareFootage.trim());
  const hasWeatherSensitiveAddOn = state.addOns.some((name) =>
    ["Drone / aerial", "Twilight / virtual twilight"].includes(name),
  );
  const needsOnsiteContact = humanAccessMethods.has(state.accessMethod);
  const contactComplete =
    isValidEmail(state.contactEmail) && isValidPhone(state.contactPhone);
  const operationsComplete =
    Boolean(state.accessMethod && state.prepStatus) &&
    (!needsOnsiteContact || Boolean(state.onsiteContact.trim())) &&
    (!hasWeatherSensitiveAddOn || Boolean(state.weatherPlan));
  const appointmentComplete = Boolean(
    state.preferredDate &&
      state.contactName.trim() &&
      contactComplete &&
      operationsComplete,
  );
  const canAdvance = useMemo(() => {
    if (activeStep === "property") return propertyComplete;
    if (activeStep === "appointment") return appointmentComplete;
    return true;
  }, [activeStep, appointmentComplete, propertyComplete]);
  const maxUnlockedStep = propertyComplete ? (appointmentComplete ? steps.length - 1 : 3) : 0;
  const nextStepTitle = steps[stepIndex + 1]?.title;
  const nextButtonLabel =
    activeStep === "summary"
      ? "Ready to review"
      : stepIndex === steps.length - 2
        ? "Review order"
        : `Continue to ${nextStepTitle}`;
  const previousButtonLabel = stepIndex > 0 ? `Back to ${steps[stepIndex - 1]?.title}` : "Back";
  const readyToPlace = propertyComplete && appointmentComplete;

  const update = (key: keyof BookingState, value: string) => {
    setConceptPlaced(false);
    setState((current) => ({ ...current, [key]: value }));
  };

  const toggleAddOn = (name: string) => {
    setConceptPlaced(false);
    setState((current) => ({
      ...current,
      addOns: current.addOns.includes(name)
        ? current.addOns.filter((item) => item !== name)
        : [...current.addOns, name],
    }));
  };

  const toggleReadiness = (name: string) => {
    setConceptPlaced(false);
    setState((current) => ({
      ...current,
      readinessItems: current.readinessItems.includes(name)
        ? current.readinessItems.filter((item) => item !== name)
        : [...current.readinessItems, name],
    }));
  };

  const goTo = (key: StepKey) => {
    const targetIndex = steps.findIndex((step) => step.key === key);
    if (targetIndex > maxUnlockedStep) return;
    setActiveStep(key);
    setConceptPlaced(false);
  };

  const nextStep = () => {
    const next = steps[Math.min(stepIndex + 1, steps.length - 1)];
    if (next) setActiveStep(next.key);
  };

  const prevStep = () => {
    const previous = steps[Math.max(stepIndex - 1, 0)];
    if (previous) setActiveStep(previous.key);
  };

  return (
    <section className="border-y border-line bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[15rem_1fr_20rem] lg:items-start">
          <aside className="lg:sticky lg:top-24">
            <p className="eyebrow text-brand">Booking flow concept</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
              Build the order in five decisions.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              This prototype does not place a live order or reserve a calendar
              slot. It shows the workflow structure AREM could own directly.
            </p>
            <div className="mt-6 grid gap-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = step.key === activeStep;
                const isComplete = index < stepIndex || conceptPlaced;
                const isLocked = index > maxUnlockedStep;
                return (
                  <button
                    key={step.key}
                    type="button"
                    onClick={() => goTo(step.key)}
                    disabled={isLocked}
                    className={[
                      "grid grid-cols-[2rem_1fr] gap-3 rounded-[var(--radius-card)] border px-3 py-3 text-left transition-colors",
                      isActive
                        ? "border-brand bg-brand-soft text-brand-ink"
                        : "border-line bg-paper-2 text-ink-2 hover:border-brand/40",
                      isLocked ? "cursor-not-allowed opacity-45 hover:border-line" : "",
                    ].join(" ")}
                    aria-current={isActive ? "step" : undefined}
                    aria-disabled={isLocked}
                  >
                    <span
                      className={[
                        "grid h-8 w-8 place-items-center rounded-full",
                        isComplete ? "bg-brand text-white" : "bg-paper text-brand",
                      ].join(" ")}
                    >
                      {isComplete ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </span>
                    <span>
                      <span className="block font-mono text-[0.65rem] uppercase tracking-widest">
                        {step.eyebrow}
                      </span>
                      <span className="mt-0.5 block text-sm font-semibold">{step.title}</span>
                      {isLocked && (
                        <span className="mt-1 block text-xs text-muted">Locked</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
                  Step {progressLabel}
                </p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
                  {steps[stepIndex]?.title}
                </h3>
                <p className="mt-1 text-sm text-ink-2">{steps[stepIndex]?.eyebrow}</p>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={stepIndex === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2.5 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous booking step"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">{previousButtonLabel}</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={stepIndex === steps.length - 1 || !canAdvance}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next booking step"
                >
                  <span>{nextButtonLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {activeStep === "property" && (
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <div className="grid gap-3 rounded-[var(--radius-card)] border border-line bg-paper-2 p-4 md:grid-cols-3">
                    <div>
                      <label htmlFor="booking-role" className={labelCls}>
                        Ordering as
                      </label>
                      <select
                        id="booking-role"
                        value={state.orderingRole}
                        onChange={(event) => update("orderingRole", event.target.value)}
                        className={fieldCls}
                      >
                        <option>Agent</option>
                        <option>Assistant / coordinator</option>
                        <option>Team admin</option>
                        <option>Office admin</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="booking-account" className={labelCls}>
                        Brokerage account
                      </label>
                      <select
                        id="booking-account"
                        value={state.brokerageAccount}
                        onChange={(event) => update("brokerageAccount", event.target.value)}
                        className={fieldCls}
                      >
                        <option>No brokerage account selected</option>
                        <option>Saved office / team account</option>
                        <option>Monthly brokerage billing</option>
                        <option>New account setup needed</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="booking-delivery-route" className={labelCls}>
                        Delivery route
                      </label>
                      <select
                        id="booking-delivery-route"
                        value={state.deliveryRoute}
                        onChange={(event) => update("deliveryRoute", event.target.value)}
                        className={fieldCls}
                      >
                        <option>Agent only</option>
                        <option>Coordinator copied</option>
                        <option>Team inbox copied</option>
                        <option>Brokerage admin copied</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="booking-address" className={labelCls}>
                    Listing address <span className="text-brand">*</span>
                  </label>
                  <input
                    id="booking-address"
                    value={state.address}
                    onChange={(event) => update("address", event.target.value)}
                    autoComplete="street-address"
                    className={fieldCls}
                    placeholder="123 Shoreline Dr"
                  />
                </div>
                <div>
                  <label htmlFor="booking-unit" className={labelCls}>
                    Unit / building
                  </label>
                  <input
                    id="booking-unit"
                    value={state.unit}
                    onChange={(event) => update("unit", event.target.value)}
                    className={fieldCls}
                    placeholder="Unit 4B, building name..."
                  />
                </div>
                <div>
                  <label htmlFor="booking-city" className={labelCls}>
                    City / market
                  </label>
                  <input
                    id="booking-city"
                    value={state.city}
                    onChange={(event) => update("city", event.target.value)}
                    className={fieldCls}
                    placeholder="Virginia Beach"
                  />
                </div>
                <div>
                  <label htmlFor="booking-state" className={labelCls}>
                    State
                  </label>
                  <input
                    id="booking-state"
                    value={state.stateRegion}
                    onChange={(event) => update("stateRegion", event.target.value)}
                    className={fieldCls}
                    placeholder="VA"
                  />
                </div>
                <div>
                  <label htmlFor="booking-zip" className={labelCls}>
                    ZIP
                  </label>
                  <input
                    id="booking-zip"
                    value={state.zip}
                    onChange={(event) => update("zip", event.target.value)}
                    inputMode="numeric"
                    className={fieldCls}
                    placeholder="23451"
                  />
                </div>
                <div>
                  <label htmlFor="booking-square-footage" className={labelCls}>
                    Square footage <span className="text-brand">*</span>
                  </label>
                  <input
                    id="booking-square-footage"
                    value={state.squareFootage}
                    onChange={(event) => update("squareFootage", event.target.value)}
                    inputMode="numeric"
                    className={fieldCls}
                    placeholder="2,400"
                  />
                </div>
                <div>
                  <label htmlFor="booking-property-type" className={labelCls}>
                    Property type
                  </label>
                  <select
                    id="booking-property-type"
                    value={state.propertyType}
                    onChange={(event) => update("propertyType", event.target.value)}
                    className={fieldCls}
                  >
                    {propertyTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="booking-occupancy" className={labelCls}>
                    Occupancy
                  </label>
                  <select
                    id="booking-occupancy"
                    value={state.occupancy}
                    onChange={(event) => update("occupancy", event.target.value)}
                    className={fieldCls}
                  >
                    <option>Occupied</option>
                    <option>Vacant</option>
                    <option>Tenant occupied</option>
                    <option>New construction</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="booking-community" className={labelCls}>
                    Community / gate
                  </label>
                  <input
                    id="booking-community"
                    value={state.community}
                    onChange={(event) => update("community", event.target.value)}
                    className={fieldCls}
                    placeholder="Neighborhood, gate name, condo tower..."
                  />
                </div>
                <div>
                  <label htmlFor="booking-parking" className={labelCls}>
                    Parking / access path
                  </label>
                  <input
                    id="booking-parking"
                    value={state.parking}
                    onChange={(event) => update("parking", event.target.value)}
                    className={fieldCls}
                    placeholder="Street parking, driveway, elevator..."
                  />
                </div>
                <div>
                  <label htmlFor="booking-default" className={labelCls}>
                    Package default
                  </label>
                  <select
                    id="booking-default"
                    value={state.packageDefault}
                    onChange={(event) => update("packageDefault", event.target.value)}
                    className={fieldCls}
                  >
                    <option>Agent choice</option>
                    <option>Use office default</option>
                    <option>Listing-based recommendation</option>
                    <option>Luxury listing default</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="booking-addon-approval" className={labelCls}>
                    Add-on approval
                  </label>
                  <select
                    id="booking-addon-approval"
                    value={state.addOnApproval}
                    onChange={(event) => update("addOnApproval", event.target.value)}
                    className={fieldCls}
                  >
                    <option>Agent pre-approved</option>
                    <option>Requires team approval</option>
                    <option>Agent-paid add-ons</option>
                    <option>Office-approved add-ons only</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="booking-billing" className={labelCls}>
                    Billing route
                  </label>
                  <select
                    id="booking-billing"
                    value={state.billingRoute}
                    onChange={(event) => update("billingRoute", event.target.value)}
                    className={fieldCls}
                  >
                    <option>Agent pays</option>
                    <option>Office invoice</option>
                    <option>Monthly brokerage billing</option>
                    <option>Card on file</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="booking-access" className={labelCls}>
                    Access notes
                  </label>
                  <textarea
                    id="booking-access"
                    value={state.access}
                    onChange={(event) => update("access", event.target.value)}
                    rows={3}
                    className={fieldCls}
                    placeholder="Lockbox, gate code, seller contact limits, pets, parking..."
                  />
                </div>
              </div>
            )}

            {activeStep === "package" && (
              <div className="grid gap-3">
                {packages.map((pkg) => {
                  const isSelected = pkg.name === state.packageName;
                  return (
                    <button
                      key={pkg.name}
                      type="button"
                      onClick={() => update("packageName", pkg.name)}
                      className={[
                        "grid gap-4 rounded-[var(--radius-card)] border p-4 text-left transition-colors md:grid-cols-[1fr_auto]",
                        isSelected ? "border-brand bg-brand-soft" : "border-line bg-paper-2 hover:border-brand/40",
                      ].join(" ")}
                    >
                      <span>
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-lg font-semibold text-ink">{pkg.name}</span>
                          {pkg.featured && (
                            <span className="rounded-full bg-twilight/20 px-2.5 py-1 text-xs font-semibold text-brand-ink">
                              Most popular
                            </span>
                          )}
                        </span>
                        <span className="mt-1 block text-sm font-medium text-brand">
                          {pkg.tagline}
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-ink-2">
                          {pkg.bestFor}
                        </span>
                      </span>
                      <span className="text-left md:text-right">
                        <span className="block text-xl font-semibold text-ink">
                          {pkg.priceNote}
                        </span>
                        <span className="mt-1 block text-xs text-muted">
                          Starting estimate
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {activeStep === "addons" && (
              <div className="grid gap-3 sm:grid-cols-2">
                {bookingAddOns.map((addOn) => {
                  const included = includedInPackage(state.packageName, addOn.name);
                  const selected = state.addOns.includes(addOn.name);
                  return (
                    <button
                      key={addOn.name}
                      type="button"
                      onClick={() => toggleAddOn(addOn.name)}
                      className={[
                        "flex min-h-44 flex-col justify-between rounded-[var(--radius-card)] border p-4 text-left transition-colors",
                        selected ? "border-brand bg-brand-soft" : "border-line bg-paper-2 hover:border-brand/40",
                      ].join(" ")}
                    >
                      <span>
                        <span className="flex items-start justify-between gap-3">
                          <span className="text-base font-semibold text-ink">{addOn.name}</span>
                          <span
                            className={[
                              "grid h-6 w-6 shrink-0 place-items-center rounded-full border",
                              selected ? "border-brand bg-brand text-white" : "border-line bg-paper text-muted",
                            ].join(" ")}
                          >
                            {selected && <Check className="h-3.5 w-3.5" />}
                          </span>
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-ink-2">
                          {addOn.bestFor}
                        </span>
                      </span>
                      <span className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3 text-sm">
                        <span className="font-semibold text-brand">
                          {included ? "Included with package" : `+${formatMoney(addOn.price)}${addOn.unit ? ` ${addOn.unit}` : ""}`}
                        </span>
                        <span className="text-xs text-muted">Concept pricing</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {activeStep === "appointment" && (
              <div className="grid gap-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-date" className={labelCls}>
                      Preferred shoot date <span className="text-brand">*</span>
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      value={state.preferredDate}
                      onChange={(event) => update("preferredDate", event.target.value)}
                      className={fieldCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-urgency" className={labelCls}>
                      Scheduling context
                    </label>
                    <select
                      id="booking-urgency"
                      value={state.urgency}
                      onChange={(event) => update("urgency", event.target.value)}
                      className={fieldCls}
                    >
                      {urgencyOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <p className={labelCls}>Preferred arrival window</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {appointmentSlots.map((slot) => {
                      const selected = state.timeWindow === slot.label;
                      return (
                        <button
                          key={slot.label}
                          type="button"
                          onClick={() => update("timeWindow", slot.label)}
                          className={[
                            "rounded-[var(--radius-card)] border px-4 py-3 text-left transition-colors",
                            selected
                              ? "border-brand bg-brand text-white"
                              : "border-line bg-paper-2 text-ink-2 hover:border-brand",
                          ].join(" ")}
                        >
                          <span className="block text-sm font-semibold">{slot.label}</span>
                          <span className={selected ? "mt-1 block text-xs text-white/75" : "mt-1 block text-xs text-muted"}>
                            {slot.window} · {slot.status}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-5 rounded-[var(--radius-card)] border border-line bg-paper-2 p-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-access-method" className={labelCls}>
                      Access method <span className="text-brand">*</span>
                    </label>
                    <select
                      id="booking-access-method"
                      value={state.accessMethod}
                      onChange={(event) => update("accessMethod", event.target.value)}
                      className={fieldCls}
                    >
                      <option value="">Choose access method</option>
                      {accessMethods.map((method) => (
                        <option key={method}>{method}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="booking-onsite-contact" className={labelCls}>
                      Onsite contact
                    </label>
                    <input
                      id="booking-onsite-contact"
                      value={state.onsiteContact}
                      onChange={(event) => update("onsiteContact", event.target.value)}
                      className={fieldCls}
                      placeholder="Seller, tenant, agent, coordinator..."
                    />
                    {needsOnsiteContact && !state.onsiteContact.trim() && (
                      <p className="mt-1.5 text-xs text-brand">
                        Required when someone is meeting or occupying the home.
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="booking-prep-status" className={labelCls}>
                      Prep confirmation
                    </label>
                    <select
                      id="booking-prep-status"
                      value={state.prepStatus}
                      onChange={(event) => update("prepStatus", event.target.value)}
                      className={fieldCls}
                    >
                      <option value="">Choose prep status</option>
                      <option>Agent confirms ready</option>
                      <option>Seller prep still in progress</option>
                      <option>Tenant coordination needed</option>
                      <option>Vacant and ready</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="booking-weather-plan" className={labelCls}>
                      Weather-sensitive plan
                    </label>
                    <select
                      id="booking-weather-plan"
                      value={state.weatherPlan}
                      onChange={(event) => update("weatherPlan", event.target.value)}
                      className={fieldCls}
                    >
                      <option value="">Choose weather plan</option>
                      <option>Proceed with interiors if drone/twilight moves</option>
                      <option>Reschedule full shoot if exterior media cannot happen</option>
                      <option>Use virtual twilight if real twilight is unavailable</option>
                      <option>Confirm weather plan by phone</option>
                    </select>
                    {hasWeatherSensitiveAddOn && !state.weatherPlan && (
                      <p className="mt-1.5 text-xs text-brand">
                        Required when drone or twilight is selected.
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="booking-alternate-date" className={labelCls}>
                      Alternate date
                    </label>
                    <input
                      id="booking-alternate-date"
                      type="date"
                      value={state.alternateDate}
                      onChange={(event) => update("alternateDate", event.target.value)}
                      className={fieldCls}
                    />
                  </div>
                </div>

                <div>
                  <p className={labelCls}>Readiness checklist</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {readinessItems.map((item) => {
                      const selected = state.readinessItems.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleReadiness(item)}
                          className={[
                            "flex items-center gap-2 rounded-full border px-3 py-2 text-left text-sm font-semibold transition-colors",
                            selected
                              ? "border-brand bg-brand-soft text-brand-ink"
                              : "border-line bg-paper-2 text-ink-2 hover:border-brand",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "grid h-5 w-5 shrink-0 place-items-center rounded-full border",
                              selected ? "border-brand bg-brand text-white" : "border-line bg-paper text-muted",
                            ].join(" ")}
                          >
                            {selected && <Check className="h-3 w-3" />}
                          </span>
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label htmlFor="booking-name" className={labelCls}>
                      Name <span className="text-brand">*</span>
                    </label>
                    <input
                      id="booking-name"
                      value={state.contactName}
                      onChange={(event) => update("contactName", event.target.value)}
                      autoComplete="name"
                      className={fieldCls}
                      placeholder="Jane Agent"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-email" className={labelCls}>
                      Email <span className="text-brand">*</span>
                    </label>
                    <input
                      id="booking-email"
                      value={state.contactEmail}
                      onChange={(event) => update("contactEmail", event.target.value)}
                      type="email"
                      autoComplete="email"
                      className={fieldCls}
                      placeholder="jane@brokerage.com"
                    />
                    {state.contactEmail && !isValidEmail(state.contactEmail) && (
                      <p className="mt-1.5 text-xs text-brand">Enter a valid email address.</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="booking-phone" className={labelCls}>
                      Phone <span className="text-brand">*</span>
                    </label>
                    <input
                      id="booking-phone"
                      value={state.contactPhone}
                      onChange={(event) => update("contactPhone", event.target.value)}
                      type="tel"
                      autoComplete="tel"
                      className={fieldCls}
                      placeholder="(757) 555-0123"
                    />
                    {state.contactPhone && !isValidPhone(state.contactPhone) && (
                      <p className="mt-1.5 text-xs text-brand">Enter at least 10 digits.</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="booking-notes" className={labelCls}>
                    Seller prep or must-show notes
                  </label>
                  <textarea
                    id="booking-notes"
                    value={state.notes}
                    onChange={(event) => update("notes", event.target.value)}
                    rows={4}
                    className={fieldCls}
                    placeholder="Waterfront view, detached garage, tenant needs 30 minutes notice..."
                  />
                </div>
              </div>
            )}

            {activeStep === "summary" && (
              <div className="grid gap-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <SummaryItem
                    label="Address"
                    value={[state.address, state.unit, state.city, state.stateRegion, state.zip].filter(Boolean).join(", ") || "Not entered"}
                  />
                  <SummaryItem
                    label="Property"
                    value={`${state.squareFootage || "No"} sq ft · ${state.propertyType} · ${state.occupancy}`}
                  />
                  <SummaryItem label="Package" value={`${selectedPackage.name} ${selectedPackage.priceNote}`} />
                  <SummaryItem label="Add-ons" value={state.addOns.length ? state.addOns.join(", ") : "No add-ons selected"} />
                  <SummaryItem
                    label="Appointment"
                    value={`${state.preferredDate || "No date"} · ${state.timeWindow} · ${state.urgency}${state.alternateDate ? ` · Alternate ${state.alternateDate}` : ""}`}
                  />
                  <SummaryItem label="Contact" value={[state.contactName, state.contactEmail, state.contactPhone].filter(Boolean).join(" · ") || "Not entered"} />
                  <SummaryItem
                    label="Brokerage context"
                    value={`${state.orderingRole} · ${state.brokerageAccount} · ${state.billingRoute} · ${state.deliveryRoute}`}
                  />
                  <SummaryItem
                    label="Approval rules"
                    value={`${state.packageDefault} · ${state.addOnApproval}`}
                  />
                  <SummaryItem
                    label="Access"
                    value={[state.accessMethod, state.community, state.parking, state.onsiteContact, state.access].filter(Boolean).join(" · ") || "Not entered"}
                  />
                  <SummaryItem
                    label="Prep and weather"
                    value={[state.prepStatus, state.weatherPlan, state.readinessItems.length ? state.readinessItems.join(", ") : ""].filter(Boolean).join(" · ")}
                  />
                  <SummaryItem
                    label="Shoot notes"
                    value={state.notes || "No seller prep or must-show notes entered"}
                  />
                </div>

                <div className="border-y border-line py-5">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
                        Concept order total
                      </p>
                      <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">
                        {formatMoney(conceptTotal)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setConceptPlaced(true)}
                      disabled={!readyToPlace}
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Place concept order <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    Design concept only. No calendar reservation, payment, lead
                    submission, or backend order is created from this prototype.
                  </p>
                </div>

                {conceptPlaced && (
                  <div className="rounded-[var(--radius-card)] border border-brand/30 bg-brand-soft p-5">
                    <div className="flex gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                        <Check className="h-4 w-4" />
                      </span>
                      <div>
                        <h4 className="text-base font-semibold text-ink">
                          Concept order staged
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-ink-2">
                          This is the confirmation state for the future flow.
                          The next build can replace this with account, payment,
                          calendar, and backend order handling.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="border-y border-line py-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand">
                Live estimate
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">
                {formatMoney(conceptTotal)}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Concept pricing based on package, size band, and selected add-ons.
              </p>
            </div>
            <div className="divide-y divide-line border-b border-line">
              <EstimateLine label={selectedPackage.name} value={selectedPackage.startingPrice} />
              {sizeAdjustment > 0 && <EstimateLine label="Square footage band" value={sizeAdjustment} />}
              {state.addOns.map((name) => {
                const addOn = bookingAddOns.find((item) => item.name === name);
                const included = includedInPackage(state.packageName, name);
                return (
                  <EstimateLine
                    key={name}
                    label={included ? `${name} included` : name}
                    value={included ? 0 : addOn?.price ?? 0}
                  />
                );
              })}
            </div>
            <div className="mt-5 grid gap-3 text-sm leading-relaxed text-ink-2">
              <p className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                Service area and travel still need confirmation for edge markets.
              </p>
              <p className="flex gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                Weather-sensitive media can move the final appointment window.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line pt-3">
      <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-brand">
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-ink-2">{value}</p>
    </div>
  );
}

function EstimateLine({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
      <span className="text-ink-2">{label}</span>
      <span className="font-semibold text-ink">{value === 0 ? "Included" : formatMoney(value)}</span>
    </div>
  );
}
