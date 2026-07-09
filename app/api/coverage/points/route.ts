import { NextResponse } from "next/server";
import { hasDb } from "../../../../lib/db";
import { buildCoveragePayload } from "../../../../lib/coverage";

// Built from the DB on each cache-miss; the CDN caches the (large) response via
// Cache-Control, so we avoid the 2 MB Data Cache limit. ~10 min freshness with
// stale-while-revalidate for resilience.
export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasDb) {
    return NextResponse.json({ error: "database not configured" }, { status: 503 });
  }
  try {
    const payload = await buildCoveragePayload();
    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("coverage points error", err);
    return NextResponse.json({ error: "failed to build coverage" }, { status: 500 });
  }
}
