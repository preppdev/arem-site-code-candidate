import { NextRequest, NextResponse } from "next/server";
import { hasDb, sql } from "../../../lib/db";
import {
  allowedLeadKinds,
  cleanLeadFields,
  getMissingLeadFields,
  isValidLeadEmail,
  maxLeadJsonBytes,
  parseLeadWebhookUrl,
  parseLeadDate,
  stringField,
  type LeadBody,
} from "./validation";

export const dynamic = "force-dynamic";

function publicError(status = 400) {
  return NextResponse.json({ error: "Unable to accept this request" }, { status });
}

async function markWebhookStatus(
  leadId: number,
  status: string,
  error: string | null = null
) {
  try {
    await sql`
      update leads
      set webhook_status = ${status},
          webhook_attempts = webhook_attempts + 1,
          webhook_last_error = ${error},
          webhook_claimed_at = null,
          webhook_delivered_at = case when ${status} = 'delivered' then now() else webhook_delivered_at end
      where id = ${leadId}
    `;
  } catch (err) {
    console.error("lead webhook status update failed", err);
  }
}

async function forwardLead(leadId: number, payload: Record<string, unknown>) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  const url = parseLeadWebhookUrl(webhookUrl);
  if (!url) {
    if (webhookUrl) {
      console.error("lead webhook invalid URL");
    }
    if (webhookUrl) await markWebhookStatus(leadId, "invalid_url", "Invalid LEAD_WEBHOOK_URL");
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);

  try {
    const response = await fetch(url, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("lead webhook failed", response.status);
      await markWebhookStatus(leadId, "failed", `HTTP ${response.status}`);
      return;
    }
    await markWebhookStatus(leadId, "delivered");
  } catch (err) {
    console.error("lead webhook error", err);
    await markWebhookStatus(
      leadId,
      "failed",
      err instanceof Error ? err.message : "Unknown webhook error"
    );
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(req: NextRequest) {
  let body: LeadBody;

  try {
    const raw = await req.text();
    if (raw.length > maxLeadJsonBytes) return publicError(413);
    body = JSON.parse(raw) as LeadBody;
  } catch {
    return publicError();
  }

  if (body.website) {
    return NextResponse.json({ ok: true, spam: true });
  }

  const kind = typeof body.kind === "string" ? body.kind : "";
  if (!allowedLeadKinds.has(kind)) {
    return publicError();
  }

  const fields =
    body.fields && typeof body.fields === "object" && !Array.isArray(body.fields)
      ? body.fields
      : {};
  const cleaned = cleanLeadFields(fields);
  const name = stringField(cleaned, "name");
  const email = stringField(cleaned, "email");
  const phone = stringField(cleaned, "phone");
  const leadPackage = stringField(cleaned, "package");
  const address = stringField(cleaned, "address");
  const market = stringField(cleaned, "markets") ?? stringField(cleaned, "market");
  const preferredDate = parseLeadDate(stringField(cleaned, "date") ?? stringField(cleaned, "rolloutDate"));

  if (getMissingLeadFields(kind, cleaned).length > 0 || !isValidLeadEmail(email)) {
    return publicError();
  }

  if (!hasDb) {
    return publicError(503);
  }

  const ipAddress =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip");
  const payload = {
    leadId: null as number | null,
    kind,
    name,
    email,
    phone,
    sourcePath: typeof body.sourcePath === "string" ? body.sourcePath : null,
    package: leadPackage,
    address,
    preferredDate,
    market,
    fields: cleaned,
    userAgent: req.headers.get("user-agent"),
    ipAddress,
  };

  let leadId: number;

  try {
    const inserted = (await sql`
      insert into leads (
        kind, name, email, phone, source_path, package, address,
        preferred_date, market, fields, user_agent, ip_address
      )
      values (
        ${kind},
        ${name},
        ${email},
        ${phone},
        ${typeof body.sourcePath === "string" ? body.sourcePath : null},
        ${leadPackage},
        ${address},
        ${preferredDate},
        ${market},
        ${JSON.stringify(cleaned)}::jsonb,
        ${req.headers.get("user-agent")},
        ${ipAddress}
      )
      returning id
    `) as { id: number }[];
    leadId = inserted[0]?.id;
    payload.leadId = leadId;
  } catch (err) {
    console.error("lead insert failed", err);
    return publicError(500);
  }

  if (leadId) {
    await forwardLead(leadId, payload);
  }

  return NextResponse.json({ ok: true });
}
