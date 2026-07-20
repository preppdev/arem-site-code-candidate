// GET /api/environment/forecast?address=<free text>
//
// One round-trip for the /weather widget: geocode the address server-side,
// fetch the NWS forecast for that point, find the nearest NOAA tide-prediction
// station, and return its 3-day curve + high/low extremes. Server-side keeps
// the geocoder usage within policy (browser traffic can't set a User-Agent)
// and lets the ~3k-row station list live in module memory per instance.
//
// Sibling route app/api/environment/tides is the booking-window helper pinned
// to Sewells Point; this one is the client-facing, any-address surface.

const UA = "arem-site (aremtours.com; jordan@hrhomepics.com)";
const MAX_STATION_MILES = 120;

type Station = { id: string; name: string; state: string; lat: number; lon: number };

let stationsPromise: Promise<Station[]> | null = null;

async function getJson<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
  const res = await fetch(url, { headers: { "user-agent": UA, accept: "application/json", ...headers } });
  if (!res.ok) throw new Error(`${res.status} from ${new URL(url).host}`);
  return res.json() as Promise<T>;
}

type Geo = { lat: number; lon: number; label: string };

async function geocode(q: string): Promise<Geo | null> {
  // Census geocoder first: free, unlimited-ish, built for US street addresses.
  try {
    const j = await getJson<{
      result?: { addressMatches?: Array<{ coordinates: { x: number; y: number }; matchedAddress: string }> };
    }>(
      "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?benchmark=Public_AR_Current&format=json&address=" +
        encodeURIComponent(q),
    );
    const m = j.result?.addressMatches?.[0];
    if (m) return { lat: m.coordinates.y, lon: m.coordinates.x, label: m.matchedAddress };
  } catch {
    /* fall through to Nominatim */
  }
  // Nominatim fallback covers city/landmark queries the Census matcher rejects.
  try {
    const j = await getJson<Array<{ lat: string; lon: string; display_name: string }>>(
      "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=us&q=" + encodeURIComponent(q),
    );
    if (j.length) return { lat: +j[0].lat, lon: +j[0].lon, label: j[0].display_name };
  } catch {
    /* no match */
  }
  return null;
}

function haversineMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8;
  const toR = Math.PI / 180;
  const dLat = (lat2 - lat1) * toR;
  const dLon = (lon2 - lon1) * toR;
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * toR) * Math.cos(lat2 * toR) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

async function tideStations(): Promise<Station[]> {
  stationsPromise ??= getJson<{
    stations: Array<{ id: string; name: string; state: string; lat: number; lng: number }>;
  }>("https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions")
    .then((j) => j.stations.map((s) => ({ id: s.id, name: s.name, state: s.state, lat: s.lat, lon: s.lng })))
    .catch((e) => {
      stationsPromise = null; // don't cache a failure
      throw e;
    });
  return stationsPromise;
}

function coopsDate(d: Date): string {
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
}

type NwsPeriod = {
  startTime: string;
  temperature: number;
  isDaytime: boolean;
  shortForecast: string;
  detailedForecast?: string;
  windSpeed?: string;
  windDirection?: string;
  relativeHumidity?: { value: number | null };
  probabilityOfPrecipitation?: { value: number | null };
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const address = (url.searchParams.get("address") ?? "").trim();
  if (!address) {
    return Response.json({ error: "address query parameter required" }, { status: 400 });
  }

  const geo = await geocode(address);
  if (!geo) {
    return Response.json({ error: "Address not found — try adding city and state." }, { status: 404 });
  }

  // Weather (required) + station list (best-effort) in parallel.
  let points: {
    properties: {
      forecast: string;
      forecastHourly: string;
      relativeLocation?: { properties?: { city?: string; state?: string } };
    };
  };
  try {
    points = await getJson(`https://api.weather.gov/points/${geo.lat.toFixed(4)},${geo.lon.toFixed(4)}`);
  } catch {
    return Response.json(
      { error: "No forecast available for that location (NWS covers US locations only)." },
      { status: 502 },
    );
  }

  const rel = points.properties.relativeLocation?.properties;
  const place = rel?.city ? `${rel.city}, ${rel.state}` : "this location";

  const [hourlyRes, dailyRes, stationsRes] = await Promise.allSettled([
    getJson<{ properties: { periods: NwsPeriod[] } }>(points.properties.forecastHourly),
    getJson<{ properties: { periods: NwsPeriod[] } }>(points.properties.forecast),
    tideStations(),
  ]);
  if (hourlyRes.status === "rejected" || dailyRes.status === "rejected") {
    return Response.json({ error: "The National Weather Service is not responding — try again shortly." }, { status: 502 });
  }

  const hourly = hourlyRes.value.properties.periods.slice(0, 48).map((p) => ({
    t: p.startTime,
    temp: p.temperature,
    precip: p.probabilityOfPrecipitation?.value ?? 0,
    desc: p.shortForecast,
    isDay: p.isDaytime,
    wind: p.windSpeed ?? "",
    windDir: p.windDirection ?? "",
    humidity: p.relativeHumidity?.value ?? null,
  }));
  const daily = dailyRes.value.properties.periods.map((p) => ({
    t: p.startTime,
    temp: p.temperature,
    isDay: p.isDaytime,
    desc: p.shortForecast,
    detail: p.detailedForecast ?? "",
    precip: p.probabilityOfPrecipitation?.value ?? 0,
  }));

  // Tides: nearest station within range, else null (inland is fine).
  let tide: null | {
    station: { id: string; name: string; state: string };
    miles: number;
    curve: Array<{ t: string; v: number }>;
    hilo: Array<{ t: string; v: number; kind: "H" | "L" }>;
    curveSource: "predicted" | "interpolated";
  } = null;
  if (stationsRes.status === "fulfilled") {
    let best: Station | null = null;
    let bestD = Infinity;
    for (const s of stationsRes.value) {
      const d = haversineMiles(geo.lat, geo.lon, s.lat, s.lon);
      if (d < bestD) {
        bestD = d;
        best = s;
      }
    }
    if (best && bestD <= MAX_STATION_MILES) {
      try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date(start.getTime() + 3 * 864e5);
        const mk = (b: Date, e: Date, interval: string) =>
          "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter" +
          "?product=predictions&application=arem-site&datum=MLLW&units=english&time_zone=lst_ldt&format=json" +
          `&station=${best.id}&begin_date=${coopsDate(b)}&end_date=${coopsDate(e)}&interval=${interval}`;
        // hilo is fetched one day wide on each side: subordinate stations
        // (type S) publish ONLY hilo — the hourly curve request errors for
        // them — and the cosine interpolation below needs extremes beyond
        // the chart edges to draw a complete curve.
        const wideStart = new Date(start.getTime() - 864e5);
        const wideEnd = new Date(end.getTime() + 864e5);
        const [curveRes, hiloRes] = await Promise.allSettled([
          getJson<{ predictions?: Array<{ t: string; v: string }> }>(mk(start, end, "h")),
          getJson<{ predictions?: Array<{ t: string; v: string; type?: "H" | "L" }> }>(mk(wideStart, wideEnd, "hilo")),
        ]);
        const hiloWide =
          hiloRes.status === "fulfilled" && hiloRes.value.predictions
            ? hiloRes.value.predictions.map((p) => ({ t: p.t, v: +p.v, kind: (p.type === "H" ? "H" : "L") as "H" | "L" }))
            : [];
        let curve: Array<{ t: string; v: number }> =
          curveRes.status === "fulfilled" && curveRes.value.predictions?.length
            ? curveRes.value.predictions.map((p) => ({ t: p.t, v: +p.v }))
            : [];
        let curveSource: "predicted" | "interpolated" = "predicted";
        if (!curve.length && hiloWide.length >= 2) {
          // Cosine interpolation between consecutive predicted extremes —
          // the standard tide-curve approximation for subordinate stations.
          curveSource = "interpolated";
          const startMs = start.getTime();
          const endMs = end.getTime();
          const parse = (t: string) => new Date(t.replace(" ", "T")).getTime();
          const fmt = (ms: number) => {
            const d = new Date(ms);
            const p2 = (n: number) => String(n).padStart(2, "0");
            return `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())} ${p2(d.getHours())}:${p2(d.getMinutes())}`;
          };
          for (let i = 0; i < hiloWide.length - 1; i++) {
            const aMs = parse(hiloWide[i].t);
            const bMs = parse(hiloWide[i + 1].t);
            const av = hiloWide[i].v;
            const bv = hiloWide[i + 1].v;
            for (let t = Math.ceil(aMs / 18e5) * 18e5; t < bMs; t += 18e5) { // 30-min samples
              if (t < startMs || t > endMs) continue;
              const f = (t - aMs) / (bMs - aMs);
              curve.push({ t: fmt(t), v: av + (bv - av) * (1 - Math.cos(Math.PI * f)) / 2 });
            }
          }
        }
        const hilo = hiloWide.filter((m) => {
          const ms = new Date(m.t.replace(" ", "T")).getTime();
          return ms >= start.getTime() && ms <= end.getTime();
        });
        if (curve.length && hilo.length) {
          tide = {
            station: { id: best.id, name: best.name, state: best.state },
            miles: Math.round(bestD * 10) / 10,
            curve,
            hilo,
            curveSource,
          };
        }
      } catch {
        tide = null; // tide outage never blocks the weather answer
      }
    }
  }

  return Response.json(
    { geo: { lat: geo.lat, lon: geo.lon, label: geo.label, place }, hourly, daily, tide },
    { headers: { "cache-control": "public, s-maxage=600, stale-while-revalidate=1800" } },
  );
}
