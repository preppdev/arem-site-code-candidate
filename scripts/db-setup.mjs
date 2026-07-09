#!/usr/bin/env node
/* One-time (idempotent) DB setup: create schema + seed from the master CSV.
   Usage: DATABASE_URL=... node scripts/db-setup.mjs [path-to-csv]
   If DATABASE_URL isn't in the env, it's read from .env.local. */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CSV = process.argv[2] || "/Users/jordan/Documents/Claude Dev/AREM/arem-all-shoots-master.csv";

function loadEnv() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  try {
    const env = readFileSync(ROOT + ".env.local", "utf8");
    const m = env.match(/^DATABASE_URL=["']?([^"'\n]+)/m);
    if (m) return m[1];
  } catch {}
  throw new Error("DATABASE_URL not set (env or .env.local)");
}

const sql = neon(loadEnv());

// ---- helpers (must match lib/db.ts) ----
const normState = (s) => {
  const u = (s || "").trim().toUpperCase();
  return u === "VIRGINIA" || u === "VA." ? "VA" : u;
};
const normKey = (a, c, s) =>
  `${a} ${c} ${s}`.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const toDate = (s) => {
  s = (s || "").trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return `${m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
  return null;
};
const num = (v) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
};

// minimal CSV parser (handles quoted fields)
function parseCSV(text) {
  const rows = [];
  let field = "", row = [], inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQ = false;
      } else field += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (ch === "\r") { /* skip */ }
    else field += ch;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

async function main() {
  console.log("Creating schema...");
  const ddl = readFileSync(ROOT + "db/schema.sql", "utf8");
  for (const stmt of ddl.split(";").map((s) => s.trim()).filter(Boolean)) {
    await sql.query(stmt);
  }

  console.log("Reading CSV:", CSV);
  const rows = parseCSV(readFileSync(CSV, "utf8"));
  const header = rows.shift().map((h) => h.trim());
  const col = (name) => header.indexOf(name);
  const ci = {
    source: col("source"), date: col("shoot_date"), address: col("address"),
    city: col("city"), state: col("state"), zip: col("zip"), lat: col("lat"), lng: col("lng"),
  };

  const records = [];
  const seen = new Set();
  for (const r of rows) {
    const source = (r[ci.source] || "").trim().toLowerCase();
    if (!source) continue;
    const address = (r[ci.address] || "").trim();
    const city = (r[ci.city] || "").trim();
    const state = normState(r[ci.state]);
    const zip = (r[ci.zip] || "").trim();
    const date = toDate(r[ci.date]);
    const nk = address ? normKey(address, city, state) : null;
    const extKey = `${nk ?? "x"}|${date ?? ""}`;
    const dk = `${source}|${extKey}`;
    if (seen.has(dk)) continue;
    seen.add(dk);
    records.push([source, extKey, date, address || null, city || null, state || null,
      zip || null, num(r[ci.lat]), num(r[ci.lng]), nk]);
  }
  console.log("Unique records to load:", records.length);

  const BATCH = 500;
  let done = 0;
  for (let i = 0; i < records.length; i += BATCH) {
    const batch = records.slice(i, i + BATCH);
    const vals = [];
    const params = [];
    batch.forEach((rec, j) => {
      const b = j * 10;
      vals.push(`($${b + 1},$${b + 2},$${b + 3},$${b + 4},$${b + 5},$${b + 6},$${b + 7},$${b + 8},$${b + 9},$${b + 10})`);
      params.push(...rec);
    });
    await sql.query(
      `insert into shoots (source, ext_key, shoot_date, address, city, state, zip, lat, lng, norm_key)
       values ${vals.join(",")}
       on conflict (source, ext_key) do nothing`,
      params,
    );
    done += batch.length;
    if (done % 5000 < BATCH) console.log(`  ${done}/${records.length}`);
  }

  const [{ count }] = await sql`select count(*)::int as count from shoots`;
  console.log("DONE. Rows in shoots:", count);
}

main().catch((e) => { console.error(e); process.exit(1); });
