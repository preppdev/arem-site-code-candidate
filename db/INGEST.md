# Coverage shoots database — ingest spec

The `/coverage` map is backed by a **Neon Postgres** database (`shoots` table).
The public site reads that database through `DATABASE_URL` on the Vercel
`platform-site-work` project. The existing AREM Platform ingest still writes to
the legacy `arem-site` deployment below; both deployments share the same Neon
database.

## Endpoint

```
POST https://arem-site.vercel.app/api/shoots/ingest
Authorization: Bearer <INGEST_TOKEN>
Content-Type: application/json
```

`INGEST_TOKEN` is stored as a Vercel env var on the `arem-site` project
(Production). View/rotate it in Vercel → arem-site → Settings → Environment
Variables.

Do not move ingestion to `platform-site-work` until the producer has been
repointed and a managed token has been added there. The public site does not
need `INGEST_TOKEN` to render the map.

## Body

A single shoot, an array of shoots, or `{ "shoots": [ ... ] }` (max 2000/request).

```json
{
  "shoots": [
    {
      "source": "hdphotohub",        // required: hdphotohub | spiro | aryeo | viewshoot | editing | ...
      "source_id": "abc123",          // recommended: the platform's unique id (used for idempotent upsert)
      "shoot_date": "2026-06-30",     // ISO date (or M/D/YYYY)
      "address": "123 Main St",
      "city": "Norfolk",
      "state": "VA",
      "zip": "23510",
      "lat": 36.851,                  // optional — if omitted, we geocode the address (US Census)
      "lng": -76.285
    }
  ]
}
```

## Behavior

- **Idempotent.** Upsert key is `(source, ext_key)` where `ext_key = source_id`
  if provided, else `normalized_address|shoot_date`. Re-sending the same shoot
  updates rather than duplicates — always send `source_id` when you have one.
- **Geocoding.** If `lat`/`lng` are missing but an address is present, the
  endpoint best-effort geocodes via the free US Census geocoder.
- **Coverage.** Only VA/NC/MD/DC geocoded shoots appear on the map, but all rows
  are stored.

## Response

```json
{ "ok": true, "received": 1, "upserted": 1, "geocoded": 0, "skipped": 0 }
```

`401` if the bearer token is wrong/missing. `503` if the DB or token env isn't
configured.

## Read side

- Production map data: `GET https://www.aremtours.com/api/coverage/points`
  (CDN-cached ~10 min, builds a privacy-generalized payload from the DB).
- Public coordinates are rounded to two decimal places and grouped by location,
  state, year, and city before being sent to the browser.
- The map refreshes within ~10 minutes of new ingests.
- The `/coverage` page totals are ISR (10-min revalidate).

## Re-seed / backfill

Full reload from a CSV export (`source,shoot_date,address,city,state,zip,lat,lng`):

```
DATABASE_URL=... node scripts/db-setup.mjs /path/to/export.csv
```

Idempotent — safe to re-run.
