import { NextRequest, NextResponse } from "next/server";
import { sql, hasDb, normKey, normState } from "../../../../lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type InShoot = {
  source: string;
  source_id?: string | null;
  shoot_date?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  lat?: number | null;
  lng?: number | null;
};

// Best-effort single-address geocode (US Census, free, no key).
async function geocode(address: string, city: string, state: string, zip: string) {
  const oneline = [address, city, state, zip].filter(Boolean).join(", ");
  const url =
    "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress" +
    `?address=${encodeURIComponent(oneline)}&benchmark=Public_AR_Current&format=json`;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 6000);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    const data = await res.json();
    const m = data?.result?.addressMatches?.[0]?.coordinates;
    if (m && typeof m.y === "number" && typeof m.x === "number") {
      return { lat: m.y as number, lng: m.x as number };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export async function POST(req: NextRequest) {
  if (!hasDb) return NextResponse.json({ error: "database not configured" }, { status: 503 });
  const token = process.env.INGEST_TOKEN;
  if (!token) return NextResponse.json({ error: "ingest not configured" }, { status: 503 });

  const auth = req.headers.get("authorization") ?? "";
  if (auth.replace(/^Bearer\s+/i, "") !== token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const list: InShoot[] = Array.isArray(body)
    ? body
    : Array.isArray((body as { shoots?: InShoot[] })?.shoots)
      ? (body as { shoots: InShoot[] }).shoots
      : body
        ? [body as InShoot]
        : [];

  if (list.length === 0) return NextResponse.json({ error: "no shoots provided" }, { status: 400 });
  if (list.length > 2000) return NextResponse.json({ error: "max 2000 shoots per request" }, { status: 413 });

  let upserted = 0;
  let geocoded = 0;
  let skipped = 0;

  for (const s of list) {
    if (!s || !s.source) {
      skipped++;
      continue;
    }
    const address = (s.address ?? "").trim();
    const city = (s.city ?? "").trim();
    const state = normState(s.state ?? "");
    const zip = (s.zip ?? "").trim();
    let lat = typeof s.lat === "number" ? s.lat : null;
    let lng = typeof s.lng === "number" ? s.lng : null;

    if ((lat === null || lng === null) && address) {
      const g = await geocode(address, city, state, zip);
      if (g) {
        lat = g.lat;
        lng = g.lng;
        geocoded++;
      }
    }

    const nk = address ? normKey(address, city, state) : null;
    const extKey = (s.source_id && String(s.source_id)) || `${nk ?? "x"}|${s.shoot_date ?? ""}`;
    const date = s.shoot_date ? s.shoot_date : null;

    try {
      await sql`
        insert into shoots (source, ext_key, shoot_date, address, city, state, zip, lat, lng, norm_key)
        values (${s.source}, ${extKey}, ${date}, ${address || null}, ${city || null},
                ${state || null}, ${zip || null}, ${lat}, ${lng}, ${nk})
        on conflict (source, ext_key) do update set
          shoot_date = excluded.shoot_date,
          address = excluded.address,
          city = excluded.city,
          state = excluded.state,
          zip = excluded.zip,
          lat = coalesce(excluded.lat, shoots.lat),
          lng = coalesce(excluded.lng, shoots.lng),
          norm_key = excluded.norm_key
      `;
      upserted++;
    } catch (err) {
      console.error("ingest upsert failed", err);
      skipped++;
    }
  }

  return NextResponse.json({ ok: true, received: list.length, upserted, geocoded, skipped });
}
