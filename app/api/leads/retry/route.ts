import { NextRequest, NextResponse } from "next/server";
import { hasDb, sql } from "../../../../lib/db";
import { parseLeadWebhookUrl } from "../validation";
import { maxLeadWebhookAttempts, staleLeadWebhookClaimMinutes } from "../retry-policy";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type LeadRetryRow = {
  id: number;
  kind: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  source_path: string | null;
  package: string | null;
  address: string | null;
  preferred_date: string | null;
  market: string | null;
  fields: Record<string, unknown>;
  user_agent: string | null;
  ip_address: string | null;
};

async function sendLead(row: LeadRetryRow, url: URL) {
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
      body: JSON.stringify({
        leadId: row.id,
        kind: row.kind,
        name: row.name,
        email: row.email,
        phone: row.phone,
        sourcePath: row.source_path,
        package: row.package,
        address: row.address,
        preferredDate: row.preferred_date,
        market: row.market,
        fields: row.fields,
        userAgent: row.user_agent,
        ipAddress: row.ip_address,
      }),
    });

    if (!response.ok) return `HTTP ${response.status}`;
    return null;
  } catch (err) {
    return err instanceof Error ? err.message : "Unknown webhook error";
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(req: NextRequest) {
  const token = process.env.LEAD_RETRY_TOKEN;
  if (!token) return NextResponse.json({ error: "retry not configured" }, { status: 503 });

  const auth = req.headers.get("authorization") ?? "";
  if (auth.replace(/^Bearer\s+/i, "") !== token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!hasDb) return NextResponse.json({ error: "database not configured" }, { status: 503 });

  const url = parseLeadWebhookUrl(process.env.LEAD_WEBHOOK_URL);
  if (!url) return NextResponse.json({ error: "webhook not configured" }, { status: 503 });

  const rows = (await sql`
    with claimed as (
      select id
      from leads
      where webhook_attempts < ${maxLeadWebhookAttempts}
        and (
          webhook_status in ('failed', 'invalid_url')
          or (
            webhook_status = 'retrying'
            and webhook_claimed_at < now() - (${staleLeadWebhookClaimMinutes} * interval '1 minute')
          )
        )
      order by created_at asc
      for update skip locked
      limit 25
    ),
    updated as (
      update leads
      set webhook_status = 'retrying',
          webhook_attempts = webhook_attempts + 1,
          webhook_last_error = 'Retry claimed',
          webhook_claimed_at = now()
      where id in (select id from claimed)
      returning id, kind, name, email, phone, source_path, package, address,
                preferred_date, market, fields, user_agent, ip_address
    )
    select * from updated
  `) as LeadRetryRow[];

  let delivered = 0;
  let failed = 0;

  for (const row of rows) {
    const error = await sendLead(row, url);
    if (error) {
      failed++;
      await sql`
        update leads
        set webhook_status = 'failed',
            webhook_last_error = ${error},
            webhook_claimed_at = null
        where id = ${row.id}
      `;
    } else {
      delivered++;
      await sql`
        update leads
        set webhook_status = 'delivered',
            webhook_last_error = null,
            webhook_claimed_at = null,
            webhook_delivered_at = now()
        where id = ${row.id}
      `;
    }
  }

  return NextResponse.json({ ok: true, checked: rows.length, delivered, failed });
}
