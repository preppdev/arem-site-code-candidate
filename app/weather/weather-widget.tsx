"use client";

// Interactive weather + tide widget (board #162). All data flows through
// /api/environment/forecast — the browser never talks to the geocoder or
// NOAA directly. Charts are hand-rolled inline SVG built as strings and
// mounted imperatively (ported from the validated standalone prototype in
// AREM/arem-weather-tide-widget), with a shared crosshair/tooltip layer.
// Data-mark colors are the validated dataviz palette; chrome uses site tokens.

import { useCallback, useEffect, useRef, useState } from "react";

// ── types (mirror the API payload) ─────────────────────────────────────────

type HourlyRow = {
  t: string;
  temp: number;
  precip: number;
  desc: string;
  isDay: boolean;
  wind: string;
  windDir: string;
  humidity: number | null;
};
type DailyRow = { t: string; temp: number; isDay: boolean; desc: string; detail: string; precip: number };
type TidePayload = {
  station: { id: string; name: string; state: string };
  miles: number;
  curve: Array<{ t: string; v: number }>;
  hilo: Array<{ t: string; v: number; kind: "H" | "L" }>;
};
type ForecastPayload = {
  geo: { lat: number; lon: number; label: string; place: string };
  hourly: HourlyRow[];
  daily: DailyRow[];
  tide: TidePayload | null;
};

const EXAMPLES = [
  "3018 Tidewater Dr, Norfolk, VA",
  "2100 Atlantic Ave, Virginia Beach, VA",
  "1 Crawford Pkwy, Portsmouth, VA",
];

// data-mark colors: dataviz reference palette (validated) — temp slot 6, water slot 1
const TEMP = "#eb6834";
const TEMP_SOFT = "rgba(235,104,52,0.10)";
const WATER = "#2a78d6";
const WATER_SOFT = "rgba(42,120,214,0.12)";

// ── formatting ─────────────────────────────────────────────────────────────

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const fmtDay = (d: Date) => DAY_NAMES[d.getDay()];
function fmtHour(d: Date): string {
  let h = d.getHours() % 12;
  if (h === 0) h = 12;
  return h + (d.getHours() < 12 ? "am" : "pm");
}
function fmtTime(d: Date): string {
  let h = d.getHours() % 12;
  if (h === 0) h = 12;
  return `${h}:${String(d.getMinutes()).padStart(2, "0")} ${d.getHours() < 12 ? "AM" : "PM"}`;
}
function icon(shortForecast: string, isDay: boolean): string {
  const s = (shortForecast || "").toLowerCase();
  if (s.includes("thunder")) return "⛈️";
  if (s.includes("snow") || s.includes("flurr")) return "🌨️";
  if (s.includes("rain") || s.includes("shower") || s.includes("drizzle")) return "🌧️";
  if (s.includes("fog") || s.includes("haze")) return "🌫️";
  if (s.includes("mostly cloudy") || s.includes("overcast")) return "☁️";
  if (s.includes("partly")) return isDay ? "⛅" : "☁️";
  if (s.includes("cloud")) return "🌤️";
  if (s.includes("wind")) return "💨";
  return isDay ? "☀️" : "🌙";
}

// ── imperative SVG time chart (shared by temp / precip / tide) ─────────────

type Pt = { t: Date; v: number; [k: string]: unknown };
type Marker = { t: Date; v: number; kind: "H" | "L" };
type ChartOpts = {
  color: string;
  soft?: string;
  height?: number;
  unit?: string;
  area?: boolean;
  bars?: boolean;
  yMin?: number | null;
  yMax?: number | null;
  markers?: Marker[];
  nowLine?: boolean;
  tipLabel: (p: Pt) => string;
};

function buildTimeChart(container: HTMLElement, tipEl: HTMLElement, pts: Pt[], opts: ChartOpts): void {
  const {
    color, soft = "transparent", height = 150, unit = "", area = false, bars = false,
    yMin = null, yMax = null, markers = [], nowLine = true, tipLabel,
  } = opts;
  const W = 720, H = height, padL = 34, padR = 10, padT = 16, padB = 22;
  const iw = W - padL - padR, ih = H - padT - padB;
  const t0 = pts[0].t.getTime(), t1 = pts[pts.length - 1].t.getTime();
  const vs = pts.map((p) => p.v);
  let lo = yMin ?? Math.min(...vs);
  let hi = yMax ?? Math.max(...vs);
  if (hi - lo < 1e-6) { hi += 1; lo -= 1; }
  const span = hi - lo;
  if (yMin == null) lo -= span * 0.08;
  if (yMax == null) hi += span * 0.12;
  const X = (t: number) => padL + ((t - t0) / (t1 - t0)) * iw;
  const Y = (v: number) => padT + (1 - (v - lo) / (hi - lo)) * ih;

  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" style="display:block;width:100%;height:auto">`;
  const fmtTick = (v: number) => {
    let r = hi - lo >= 10 ? Math.round(v) : Math.round(v * 10) / 10;
    if (Object.is(r, -0)) r = 0;
    return r;
  };
  for (let i = 0; i <= 3; i++) {
    const v = lo + ((hi - lo) * i) / 3;
    const y = Y(v);
    s += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#e6e6e0" stroke-width="1"/>`;
    s += `<text x="${padL - 6}" y="${y + 3.5}" text-anchor="end" font-size="10" fill="#6b7280" style="font-variant-numeric:tabular-nums">${fmtTick(v)}</text>`;
  }
  const spanHrs = (t1 - t0) / 3.6e6;
  const stepHrs = spanHrs > 60 ? 12 : 6;
  for (const p of pts) {
    const h = p.t.getHours();
    if (h % stepHrs === 0 && p.t.getMinutes() === 0) {
      const label = h === 0 ? fmtDay(p.t) : fmtHour(p.t);
      s += `<text x="${X(p.t.getTime())}" y="${H - 6}" text-anchor="middle" font-size="10" font-weight="${h === 0 ? 600 : 400}" fill="#6b7280">${label}</text>`;
      if (h === 0)
        s += `<line x1="${X(p.t.getTime())}" y1="${padT}" x2="${X(p.t.getTime())}" y2="${padT + ih}" stroke="#e6e6e0" stroke-width="1"/>`;
    }
  }

  if (bars) {
    const bw = Math.max(2, iw / pts.length - 2); // 2px surface gap between bars
    for (const p of pts) {
      const x = X(p.t.getTime()) - bw / 2;
      const y = Y(p.v), y0 = Y(Math.max(lo, 0));
      if (y0 - y < 0.5) continue;
      s += `<path d="M${x},${y0} L${x},${y + 4} Q${x},${y} ${x + 4},${y} L${x + bw - 4},${y} Q${x + bw},${y} ${x + bw},${y + 4} L${x + bw},${y0} Z" fill="${color}"/>`;
    }
  } else {
    const line = pts.map((p, i) => `${i ? "L" : "M"}${X(p.t.getTime()).toFixed(1)},${Y(p.v).toFixed(1)}`).join("");
    if (area) s += `<path d="${line} L${X(t1)},${Y(lo)} L${X(t0)},${Y(lo)} Z" fill="${soft}"/>`;
    s += `<path d="${line}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
  }

  const now = Date.now();
  if (nowLine && now > t0 && now < t1) {
    const nx = X(now);
    s += `<line x1="${nx}" y1="${padT}" x2="${nx}" y2="${padT + ih}" stroke="#d6d6cd" stroke-width="1" stroke-dasharray="3 3"/>`;
    const j = pts.findIndex((p) => p.t.getTime() > now);
    if (j > 0) {
      const a = pts[j - 1], b = pts[j];
      const f = (now - a.t.getTime()) / (b.t.getTime() - a.t.getTime());
      s += `<circle cx="${nx}" cy="${Y(a.v + (b.v - a.v) * f)}" r="4.5" fill="${color}" stroke="#ffffff" stroke-width="2"/>`;
      if (markers.every((m) => Math.abs(X(m.t.getTime()) - nx) > 46))
        s += `<text x="${nx}" y="${padT - 4}" text-anchor="middle" font-size="10" font-weight="600" fill="#3a4250">now</text>`;
    }
  }

  for (const m of markers) {
    const mx = Math.max(padL + 16, Math.min(W - padR - 16, X(m.t.getTime())));
    const my = Y(m.v);
    s += `<circle cx="${X(m.t.getTime())}" cy="${my}" r="4" fill="${color}" stroke="#ffffff" stroke-width="2"/>`;
    let vTxt = m.v.toFixed(1);
    if (vTxt === "-0.0") vTxt = "0.0";
    let y1 = m.kind === "H" ? my - 9 : my + 15;
    y1 = Math.max(padT + 9, Math.min(padT + ih - 13, y1));
    const y2 = m.kind === "H" ? y1 - 11 : y1 + 11;
    s += `<text x="${mx}" y="${y1}" text-anchor="middle" font-size="10" font-weight="600" fill="#11151c">${vTxt}${unit}</text>`;
    s += `<text x="${mx}" y="${y2}" text-anchor="middle" font-size="9.5" fill="#6b7280">${fmtTime(m.t)}</text>`;
  }

  s += `<rect data-hit x="${padL}" y="${padT}" width="${iw}" height="${ih}" fill="transparent"/></svg>`;
  container.innerHTML = s;

  const svg = container.querySelector("svg")!;
  const hit = svg.querySelector("[data-hit]")!;
  let cross: SVGLineElement | null = null;
  hit.addEventListener("mousemove", (ev) => {
    const e = ev as MouseEvent;
    const rect = svg.getBoundingClientRect();
    const fx = ((e.clientX - rect.left) / rect.width) * W;
    const t = t0 + ((fx - padL) / iw) * (t1 - t0);
    let best = pts[0];
    for (const p of pts) if (Math.abs(p.t.getTime() - t) < Math.abs(best.t.getTime() - t)) best = p;
    if (!cross) {
      cross = document.createElementNS("http://www.w3.org/2000/svg", "line");
      cross.setAttribute("stroke", "#d6d6cd");
      cross.setAttribute("stroke-width", "1");
      svg.insertBefore(cross, hit);
    }
    const cx = X(best.t.getTime());
    cross.setAttribute("x1", String(cx));
    cross.setAttribute("x2", String(cx));
    cross.setAttribute("y1", String(padT));
    cross.setAttribute("y2", String(padT + ih));
    tipEl.innerHTML = `<span style="color:#6b7280">${fmtDay(best.t)} ${fmtTime(best.t)}</span><br><b>${tipLabel(best)}</b>`;
    tipEl.style.display = "block";
    const r = tipEl.getBoundingClientRect();
    tipEl.style.left = Math.min(e.clientX + 14, window.innerWidth - r.width - 8) + "px";
    tipEl.style.top = Math.max(8, e.clientY - r.height - 12) + "px";
  });
  hit.addEventListener("mouseleave", () => {
    tipEl.style.display = "none";
    if (cross) {
      cross.remove();
      cross = null;
    }
  });
}

function Chart({
  pts,
  opts,
  tipRef,
}: {
  pts: Pt[];
  opts: ChartOpts;
  tipRef: React.RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current && tipRef.current && pts.length > 1) buildTimeChart(ref.current, tipRef.current, pts, opts);
    // Rebuild only when the data identity changes — opts are stable per payload.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pts]);
  return <div ref={ref} />;
}

// ── component ──────────────────────────────────────────────────────────────

export function WeatherWidget() {
  const [address, setAddress] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ msg: string; err: boolean } | null>(null);
  const [data, setData] = useState<ForecastPayload | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);

  const run = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setBusy(true);
    setStatus({ msg: "Loading forecast…", err: false });
    setData(null);
    try {
      const res = await fetch("/api/environment/forecast?address=" + encodeURIComponent(q));
      const j = (await res.json()) as ForecastPayload & { error?: string };
      if (!res.ok || j.error) throw new Error(j.error ?? `request failed (${res.status})`);
      setData(j);
      setStatus(null);
    } catch (e) {
      setStatus({ msg: e instanceof Error ? e.message : String(e), err: true });
    } finally {
      setBusy(false);
    }
  }, []);

  const h0 = data?.hourly[0];
  const hourlyPts: Pt[] = (data?.hourly ?? []).map((p) => ({ t: new Date(p.t), v: p.temp, desc: p.desc }));
  const precipPts: Pt[] = (data?.hourly ?? []).map((p) => ({ t: new Date(p.t), v: p.precip }));
  const tidePts: Pt[] = (data?.tide?.curve ?? []).map((p) => ({ t: new Date(p.t.replace(" ", "T")), v: p.v }));
  const tideMarkers: Marker[] = (data?.tide?.hilo ?? []).map((m) => ({
    t: new Date(m.t.replace(" ", "T")),
    v: m.v,
    kind: m.kind,
  }));
  const nextTides = tideMarkers.filter((m) => m.t.getTime() > Date.now()).slice(0, 4);

  // group daily periods into day/night pairs
  const byDay: Array<{ day: DailyRow | null; night: DailyRow | null }> = [];
  for (const p of data?.daily ?? []) {
    if (p.isDay) byDay.push({ day: p, night: null });
    else if (byDay.length) byDay[byDay.length - 1].night = p;
    else byDay.push({ day: null, night: p });
  }

  return (
    <div className="text-ink">
      {/* search */}
      <div className="rounded-card border border-line bg-white p-4 shadow-soft">
        <div className="flex gap-2">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run(address)}
            placeholder="Enter a property address…"
            autoComplete="street-address"
            className="flex-1 rounded-lg border border-line-strong bg-white px-3 py-2.5 text-[15px] outline-none focus:border-brand"
          />
          <button
            onClick={() => run(address)}
            disabled={busy}
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-ink disabled:opacity-50"
          >
            Search
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {EXAMPLES.map((e) => (
            <button
              key={e}
              onClick={() => {
                setAddress(e);
                run(e);
              }}
              className="rounded-full border border-line px-2.5 py-1 text-xs text-ink-2 transition hover:border-brand hover:text-brand"
            >
              {e}
            </button>
          ))}
        </div>
        {status && (
          <p className={`mt-3 text-sm ${status.err ? "text-red-600" : "text-ink-2"}`}>{status.msg}</p>
        )}
      </div>

      {data && h0 && (
        <div className="mt-4 space-y-4">
          {/* current conditions */}
          <section className="rounded-card border border-line bg-white p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-2" title={data.geo.label}>
              Now near {data.geo.place}
            </p>
            <div className="mt-2 flex flex-wrap items-baseline gap-4">
              <span className="text-5xl font-bold leading-none">{h0.temp}°</span>
              <span className="text-base">
                {icon(h0.desc, h0.isDay)} {h0.desc}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-5 text-sm text-ink-2">
              <span>
                Wind <b className="font-semibold text-ink">{h0.wind} {h0.windDir}</b>
              </span>
              <span>
                Humidity <b className="font-semibold text-ink">{h0.humidity != null ? `${h0.humidity}%` : "–"}</b>
              </span>
              <span>
                Rain chance <b className="font-semibold text-ink">{h0.precip}%</b>
              </span>
            </div>
          </section>

          {/* hourly charts */}
          <section className="rounded-card border border-line bg-white p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-2">
              Next 48 hours — temperature (°F)
            </p>
            <Chart
              pts={hourlyPts}
              tipRef={tipRef}
              opts={{
                color: TEMP, soft: TEMP_SOFT, height: 170, area: true,
                tipLabel: (p) => `${p.v}°F · ${p.desc as string}`,
              }}
            />
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-2">Chance of rain (%)</p>
            <Chart
              pts={precipPts}
              tipRef={tipRef}
              opts={{
                color: WATER, height: 90, bars: true, yMin: 0, yMax: 100, nowLine: false,
                tipLabel: (p) => `${p.v}% chance of rain`,
              }}
            />
            <details className="mt-3">
              <summary className="cursor-pointer text-xs text-muted">View as table</summary>
              <table className="mt-2 w-full text-xs text-ink-2">
                <thead>
                  <tr className="text-left text-muted">
                    <th className="py-1 pr-3 font-semibold">Time</th>
                    <th className="py-1 pr-3 font-semibold">Temp</th>
                    <th className="py-1 pr-3 font-semibold">Rain</th>
                    <th className="py-1 font-semibold">Forecast</th>
                  </tr>
                </thead>
                <tbody>
                  {data.hourly.filter((_, i) => i % 3 === 0).map((p) => {
                    const d = new Date(p.t);
                    return (
                      <tr key={p.t} className="border-t border-line">
                        <td className="py-1 pr-3 tabular-nums">{fmtDay(d)} {fmtHour(d)}</td>
                        <td className="py-1 pr-3 tabular-nums">{p.temp}°F</td>
                        <td className="py-1 pr-3 tabular-nums">{p.precip}%</td>
                        <td className="py-1">{p.desc}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </details>
          </section>

          {/* 7-day */}
          <section className="rounded-card border border-line bg-white p-5 shadow-soft">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-2">7-day forecast</p>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {byDay.slice(0, 7).map(({ day, night }, i) => {
                const src = (day ?? night)!;
                const d = new Date(src.t);
                const precip = Math.max(day?.precip ?? 0, night?.precip ?? 0);
                return (
                  <div key={i} className="rounded-lg border border-line p-2 text-center" title={src.detail}>
                    <div className="text-xs font-semibold text-ink-2">{day ? fmtDay(d) : "Tonight"}</div>
                    <div className="my-1 text-xl">{icon(src.desc, !!day)}</div>
                    <div className="text-[15px] font-bold">{day ? `${day.temp}°` : "–"}</div>
                    <div className="text-xs text-muted">{night ? `${night.temp}°` : ""}</div>
                    <div className="min-h-4 text-[11px]" style={{ color: WATER }}>
                      {precip >= 20 ? `💧${precip}%` : ""}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* tides */}
          {data.tide ? (
            <section className="rounded-card border border-line bg-white p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-2">
                Tides — <span className="normal-case">{data.tide.station.name}{data.tide.station.state ? `, ${data.tide.station.state}` : ""}</span>
              </p>
              <Chart
                pts={tidePts}
                tipRef={tipRef}
                opts={{
                  color: WATER, soft: WATER_SOFT, height: 190, area: true, unit: " ft",
                  markers: tideMarkers,
                  tipLabel: (p) => `${p.v.toFixed(2)} ft above MLLW`,
                }}
              />
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {nextTides.map((m, i) => (
                  <div key={i} className="rounded-lg border border-line p-2 text-[13px] text-ink-2">
                    {m.kind === "H" ? "▲ High" : "▽ Low"}{" "}
                    <b className="font-semibold text-ink">{fmtTime(m.t)}</b>
                    <br />
                    {fmtDay(m.t)} · {m.v.toFixed(1)} ft
                  </div>
                ))}
              </div>
              <details className="mt-3">
                <summary className="cursor-pointer text-xs text-muted">View as table</summary>
                <table className="mt-2 w-full text-xs text-ink-2">
                  <thead>
                    <tr className="text-left text-muted">
                      <th className="py-1 pr-3 font-semibold">Day</th>
                      <th className="py-1 pr-3 font-semibold">Tide</th>
                      <th className="py-1 pr-3 font-semibold">Time</th>
                      <th className="py-1 font-semibold">Height</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tideMarkers.map((m, i) => (
                      <tr key={i} className="border-t border-line">
                        <td className="py-1 pr-3">{fmtDay(m.t)}</td>
                        <td className="py-1 pr-3">{m.kind === "H" ? "High" : "Low"}</td>
                        <td className="py-1 pr-3 tabular-nums">{fmtTime(m.t)}</td>
                        <td className="py-1 tabular-nums">{m.v.toFixed(2)} ft</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </details>
              <p className="mt-3 text-xs text-muted">
                Predictions for {data.tide.station.name} (station {data.tide.station.id}),{" "}
                {data.tide.miles.toFixed(1)} mi from this address. Heights above MLLW; times local to the
                station. NOAA CO-OPS data.
              </p>
            </section>
          ) : (
            <p className="text-sm text-muted">This address is too far inland for tide data.</p>
          )}
        </div>
      )}

      {/* shared tooltip */}
      <div
        ref={tipRef}
        style={{
          position: "fixed", display: "none", pointerEvents: "none", zIndex: 50,
          background: "#ffffff", border: "1px solid #d6d6cd", borderRadius: 8,
          padding: "6px 10px", fontSize: 12, color: "#11151c",
          boxShadow: "0 4px 14px rgba(17,21,28,0.18)", whiteSpace: "nowrap",
        }}
      />
    </div>
  );
}
