import { sql, titleCase } from "./db";

/* Builds the compact coverage payload (same shape the map already consumes)
   straight from the shoots table. One dot per in-region geocoded shoot. */

export const STATES = ["VA", "NC", "MD", "DC"] as const;
const STATE_SET = new Set<string>(STATES);
const SIDX: Record<string, number> = { VA: 0, NC: 1, MD: 2, DC: 3 };
type Row = {
  lat: number;
  lng: number;
  state: string;
  yr: number;
  city: string;
  n: number;
};

export type CoveragePayload = {
  states: string[];
  cities: string[];
  points: number[][];
  byState: Record<string, number>;
  byYear: Record<string, number>;
  topCities: Record<string, string[]>;
  total: number;
  totalBuckets: number;
  totalShoots: number;
  version: string;
};

/* Lean aggregates for the server-rendered page (hero count + cards) — avoids
   building the full 40k-point payload just to show totals. */
export async function getCoverageMeta(): Promise<{
  total: number;
  byState: Record<string, number>;
  topCities: Record<string, string[]>;
}> {
  const stateRows = (await sql`
    select state, count(*)::int as n from shoots
    where lat is not null and lng is not null
      and state in ('VA','NC','MD','DC') and shoot_date is not null
    group by state
  `) as { state: string; n: number }[];
  const cityRows = (await sql`
    select state, city, count(*)::int as n from shoots
    where lat is not null and lng is not null
      and state in ('VA','NC','MD','DC') and shoot_date is not null and city is not null
    group by state, city
  `) as { state: string; city: string; n: number }[];

  const byState: Record<string, number> = {};
  for (const r of stateRows) byState[r.state] = r.n;
  const total = stateRows.reduce((a, r) => a + r.n, 0);

  const grouped: Record<string, { city: string; n: number }[]> = {};
  for (const r of cityRows) (grouped[r.state] ??= []).push({ city: titleCase(r.city.trim()), n: r.n });
  const topCities: Record<string, string[]> = {};
  for (const st of Object.keys(grouped)) {
    topCities[st] = grouped[st].sort((a, b) => b.n - a.n).slice(0, 7).map((c) => c.city);
  }
  return { total, byState, topCities };
}

export async function buildCoveragePayload(): Promise<CoveragePayload> {
  const rows = (await sql`
    select round(s.lat::numeric, 2)::double precision as lat,
           round(s.lng::numeric, 2)::double precision as lng,
           s.state,
           extract(year from s.shoot_date)::int as yr,
           coalesce(nullif(lower(trim(s.city)), ''), '') as city,
           count(*)::int as n
    from shoots s
    where s.lat is not null and s.lng is not null
      and s.state in ('VA','NC','MD','DC')
      and s.shoot_date is not null
    group by 1, 2, 3, 4, 5
    order by 3, 5, 4
  `) as Row[];

  const cities: string[] = [];
  const cidx = new Map<string, number>();
  const cityIndex = (city: string, st: string) => {
    const label = city ? `${city}, ${st}` : st;
    let i = cidx.get(label);
    if (i === undefined) {
      i = cities.length;
      cities.push(label);
      cidx.set(label, i);
    }
    return i;
  };

  const byState: Record<string, number> = {};
  const byYear: Record<string, number> = {};
  const cityCount: Record<string, Record<string, number>> = {};
  const points: number[][] = [];
  let totalShoots = 0;

  for (const r of rows) {
    if (!STATE_SET.has(r.state)) continue;
    const city = titleCase((r.city || "").trim());
    const stIdx = SIDX[r.state];
    const cIndex = cityIndex(city, r.state);
    points.push([r.lat, r.lng, stIdx, r.yr, cIndex, r.n]);
    totalShoots += r.n;
    byState[r.state] = (byState[r.state] ?? 0) + r.n;
    byYear[r.yr] = (byYear[r.yr] ?? 0) + r.n;
    if (city) {
      (cityCount[r.state] ??= {})[city] = ((cityCount[r.state] ??= {})[city] ?? 0) + r.n;
    }
  }

  const topCities: Record<string, string[]> = {};
  for (const st of Object.keys(cityCount)) {
    topCities[st] = Object.entries(cityCount[st])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([c]) => c);
  }

  const sortedYears: Record<string, number> = {};
  for (const y of Object.keys(byYear).sort()) sortedYears[y] = byYear[y];

  // cheap content version for client cache-busting
  const version =
    points.length.toString(36) +
    "-" +
    (totalShoots % 1000000).toString(36);

  return {
    states: [...STATES],
    cities,
    points,
    byState: Object.fromEntries(Object.entries(byState).sort((a, b) => b[1] - a[1])),
    byYear: sortedYears,
    topCities,
    total: totalShoots,
    totalBuckets: points.length,
    totalShoots,
    version,
  };
}
