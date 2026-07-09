export type LeadBody = {
  kind?: string;
  sourcePath?: string;
  fields?: Record<string, unknown>;
  website?: string;
};

export const allowedLeadKinds = new Set(["contact", "book", "brokerage"]);
export const maxLeadJsonBytes = 12_000;
export const maxLeadFieldLength = 1_500;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function stringField(fields: Record<string, unknown>, key: string) {
  const value = fields[key];
  return typeof value === "string" ? value.trim() : null;
}

export function cleanLeadFields(fields: Record<string, unknown>) {
  const cleaned: Record<string, string> = {};

  for (const [key, value] of Object.entries(fields)) {
    if (typeof value !== "string") continue;
    const cleanKey = key.slice(0, 80);
    cleaned[cleanKey] = value.trim().slice(0, maxLeadFieldLength);
  }

  return cleaned;
}

export function parseLeadDate(value: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  return value;
}

export function isValidLeadEmail(email: string | null) {
  return Boolean(email && emailPattern.test(email));
}

export function getMissingLeadFields(kind: string, fields: Record<string, string>) {
  const missing: string[] = [];
  const requireField = (key: string) => {
    if (!stringField(fields, key)) missing.push(key);
  };

  requireField("name");
  requireField("email");

  if (kind === "book") {
    requireField("phone");
    requireField("package");
    requireField("address");
    requireField("date");
  }

  if (kind === "brokerage") {
    requireField("phone");
    requireField("role");
    requireField("brokerage");
  }

  return missing;
}

export function parseLeadWebhookUrl(value: string | undefined) {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) return null;
    return url;
  } catch {
    return null;
  }
}
