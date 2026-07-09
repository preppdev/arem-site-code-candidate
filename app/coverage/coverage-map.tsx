"use client";

/*
  Interactive coverage map — individual shoot pins on a Leaflet map.

  - CARTO "Positron" basemap tiles (free, no API key)
  - one canvas-rendered point per generalized shoot location (NOT clustered)
  - filter panel: live count, State / Year filters

  Generalized shoot coordinates (state + year + city + bucket count)
  are fetched from /api/coverage/points (served live from the shoots
  database). Leaflet is imported dynamically inside the effect so it never runs
  during SSR (it touches `window`).
*/
import { useEffect, useRef, useState } from "react";
import type * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { company } from "../site-data";

// [lat, lng, stateIdx, year, cityIdx, shootCount]
type Pt = [number, number, number, number, number, number];
type Info = {
  states: string[];
  byState: Record<string, number>;
  byYear: Record<string, number>;
  total: number;
  totalBuckets: number;
  totalShoots: number;
};
type Payload = Info & { points: Pt[]; cities: string[] };

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
  );
}

const STATE_LABELS: Record<string, string> = {
  VA: "Virginia",
  NC: "North Carolina",
  MD: "Maryland",
  DC: "Washington, DC",
};
function pct(sorted: number[], p: number) {
  return sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))];
}

export default function CoverageMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const LRef = useRef<typeof L | null>(null);
  const rendererRef = useRef<L.Renderer | null>(null);
  const layerRef = useRef<L.Layer | null>(null);
  const pointsRef = useRef<Pt[]>([]);
  const citiesRef = useRef<string[]>([]);

  const [ready, setReady] = useState(false);
  const [offStates, setOffStates] = useState<Set<number>>(new Set());
  const [offYears, setOffYears] = useState<Set<number>>(new Set());
  const [count, setCount] = useState(0);
  const [info, setInfo] = useState<Info | null>(null);
  const [loadError, setLoadError] = useState(false);

  const years = info
    ? Object.keys(info.byYear)
        .map(Number)
        .sort((a, b) => b - a)
    : [];

  // ── Mount: load Leaflet + data, build the map once ─────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const leaflet = await import("leaflet");
      const Lmod = leaflet.default;
      // Live data straight from the shoots database (CDN-cached server-side).
      const res = await fetch("/api/coverage/points");
      if (!res.ok) {
        setLoadError(true);
        return;
      }
      const data: Payload = await res.json();
      if (!data.points?.length) {
        setLoadError(true);
        return;
      }
      if (cancelled || !containerRef.current) return;

      LRef.current = Lmod;
      pointsRef.current = data.points;
      citiesRef.current = data.cities ?? [];
      setInfo({
        states: data.states,
        byState: data.byState,
        byYear: data.byYear,
        total: data.total,
        totalBuckets: data.totalBuckets,
        totalShoots: data.totalShoots,
      });
      setCount(data.totalShoots ?? data.total);

      const map = Lmod.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: true,
        preferCanvas: true, // pins render to canvas — handles 30k+ markers
      });
      rendererRef.current = Lmod.canvas({ padding: 0.5 });
      Lmod.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        },
      ).addTo(map);

      const lats = data.points.map((p) => p[0]).sort((a, b) => a - b);
      const lngs = data.points.map((p) => p[1]).sort((a, b) => a - b);
      map.fitBounds([
        [pct(lats, 0.01), pct(lngs, 0.01)],
        [pct(lats, 0.99), pct(lngs, 0.99)],
      ]);

      mapRef.current = map;
      setReady(true);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // ── Render / re-render the pins on filter change ───────────────────────
  useEffect(() => {
    if (!ready) return;
    const Lmod = LRef.current!;
    const map = mapRef.current!;
    const filtered = pointsRef.current.filter(
      (p) => !offStates.has(p[2]) && !offYears.has(p[3]),
    );
    setCount(filtered.reduce((sum, point) => sum + point[5], 0));

    if (layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }

    // Individual generalized points — no clustering. Canvas renderer keeps
    // 30k+ markers performant. Each is clickable for city/count context.
    const group = Lmod.layerGroup();
    const renderer = rendererRef.current!;
    const cities = citiesRef.current;
    const popup = Lmod.popup({ closeButton: true, autoPan: true, maxWidth: 260 });
    for (const p of filtered) {
      const m = Lmod.circleMarker([p[0], p[1]], {
        renderer,
        radius: 4,
        weight: 0,
        fillColor: "#1d4ed8",
        fillOpacity: 0.6,
      });
      m.on("click", () => {
        const city = cities[p[4]] ?? "";
        popup
          .setLatLng([p[0], p[1]])
          .setContent(
            `<div style="min-width:150px">
               <div style="font-weight:600;font-size:15px;color:#11151c;line-height:1.25">${esc(city)}</div>
               <div style="font-size:13px;color:#3a4250;margin-top:3px">${p[5]} shoot${p[5] === 1 ? "" : "s"} represented near this area</div>
             </div>`,
          )
          .openOn(map);
      });
      m.addTo(group);
    }
    group.addTo(map);
    layerRef.current = group;
  }, [ready, offStates, offYears]);

  function toggle<T>(set: Set<T>, v: T): Set<T> {
    const next = new Set(set);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    return next;
  }

  return (
    <div className="relative h-[70vh] min-h-[520px] w-full">
      <div ref={containerRef} className="h-full w-full" />
      {loadError && (
        <div className="absolute inset-0 z-[500] grid place-items-center bg-paper-2 p-6 text-center">
          <div className="max-w-lg">
            <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-widest text-brand">
              Coverage map paused
            </p>
            <p className="text-base font-semibold text-ink">
              Use the market rules above, or confirm the listing address.
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-2">
              AREM serves Hampton Roads, coastal Virginia, and northeastern
              North Carolina. When a listing is travel-sensitive, rush,
              weather-dependent, or outside the routine core, the team can
              confirm coverage before you book.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a
                href="/book"
                className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-ink"
              >
                Continue to booking
              </a>
              <a
                href={company.emailHref}
                className="inline-flex items-center justify-center rounded-full border border-line-strong bg-paper px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink"
              >
                Confirm an address
              </a>
            </div>
          </div>
        </div>
      )}
      {!ready && !loadError && (
        <div className="absolute inset-0 z-[500] grid place-items-center bg-paper-2 p-6 text-center">
          <div>
            <p className="text-sm font-semibold text-ink">Preparing coverage map</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
              The core coverage rules above are available immediately while the
              interactive map prepares.
            </p>
          </div>
        </div>
      )}

      {/* filter panel */}
      <div className="absolute right-3 top-3 z-[600] w-60 max-w-[calc(100%-1.5rem)] overflow-hidden rounded-xl border border-line bg-paper/95 shadow-lift backdrop-blur">
        <div className="max-h-[calc(70vh-1.5rem)] overflow-y-auto p-3.5">
          {!info ? (
            <p className="text-sm text-muted">Preparing map filters…</p>
          ) : (
          <>
          <p className="text-sm font-semibold text-ink">
            {count.toLocaleString()}{" "}
            <span className="font-normal text-muted">
              of {(info.totalShoots ?? info.total).toLocaleString()} shoots
            </span>
          </p>

          {/* state filter */}
          <p className="eyebrow mt-4 text-muted">State</p>
          <ul className="mt-1.5 space-y-0.5">
            {info.states.map((st, i) => {
              const c = (info.byState as Record<string, number>)[st] ?? 0;
              if (!c) return null;
              const on = !offStates.has(i);
              return (
                <li key={st}>
                  <button
                    onClick={() => setOffStates((s) => toggle(s, i))}
                    className={`flex w-full items-center justify-between gap-2 rounded px-1.5 py-1 text-left text-[13px] transition-colors hover:bg-paper-2 ${
                      on ? "text-ink" : "text-muted line-through"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${
                          on ? "bg-brand" : "bg-line-strong"
                        }`}
                      />
                      {STATE_LABELS[st] ?? st}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {c.toLocaleString()}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* year filter */}
          <p className="eyebrow mt-4 text-muted">Year</p>
          <ul className="mt-1.5 space-y-0.5">
            {years.map((y) => {
              const c = (info.byYear as Record<string, number>)[String(y)] ?? 0;
              const on = !offYears.has(y);
              return (
                <li key={y}>
                  <button
                    onClick={() => setOffYears((s) => toggle(s, y))}
                    className={`flex w-full items-center justify-between gap-2 rounded px-1.5 py-1 text-left text-[13px] transition-colors hover:bg-paper-2 ${
                      on ? "text-ink" : "text-muted line-through"
                    }`}
                  >
                    <span>{y}</span>
                    <span className="font-mono text-xs text-muted">
                      {c.toLocaleString()}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
