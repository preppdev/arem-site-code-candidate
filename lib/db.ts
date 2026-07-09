import { neon } from "@neondatabase/serverless";

/* Neon serverless client. DATABASE_URL is injected by the Vercel↔Neon
   integration (production/preview) and pulled into .env.local for local dev. */
const url = process.env.DATABASE_URL;
if (!url && process.env.NODE_ENV === "production") {
  // Don't crash the build if the var is missing yet; routes guard at runtime.
  console.warn("DATABASE_URL is not set");
}

// Well-formed placeholder so neon() doesn't throw at import when the env var
// isn't set yet; routes guard on `hasDb` and never actually query without it.
export const sql = neon(url ?? "postgresql://placeholder:placeholder@localhost/placeholder");

export const hasDb = Boolean(url);

/* Shared address helpers — must match the regen/seed logic so the API payload
   is identical to what the map already expects. */
export function normKey(address: string, city: string, state: string) {
  return `${address} ${city} ${state}`
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function streetOnly(address: string) {
  const a = (address || "").replace(/\s+/g, " ").trim();
  const stripped = a.replace(/^\d+[\w/-]*\s+/, ""); // drop leading house number
  return titleCase(stripped || a);
}

export function titleCase(s: string) {
  return s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

export function normState(s: string) {
  const u = (s || "").trim().toUpperCase();
  return u === "VIRGINIA" || u === "VA." ? "VA" : u;
}
