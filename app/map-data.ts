/*
  Coverage-page reference data.

  The interactive map (app/coverage/coverage-map.tsx) is a Leaflet heatmap
  that fetches real shoot coordinates (+ state + year, no PII) from
  /shoots-points.json. Per-state counts and top cities for the coverage
  cards live in app/coverage-meta.json. This file just holds the card copy.

  These cards summarize historical shoot records, which extend beyond AREM's
  current Ashland/Richmond-to-Edenton service corridor. HQ is Portsmouth, VA.
*/

export const coverageRegions: { state: "VA" | "NC" | "MD"; label: string }[] = [
  { state: "VA", label: "Virginia" },
  { state: "NC", label: "North Carolina" },
  { state: "MD", label: "Maryland" },
];
