-- Canonical store of every AREM shoot, powering the /coverage map.
-- Idempotent: safe to run repeatedly.

create table if not exists shoots (
  id          bigserial primary key,
  source      text not null,              -- hdphotohub | spiro | aryeo | viewshoot | editing | ...
  ext_key     text not null,              -- platform's id, or norm_key|date — the dedupe key
  shoot_date  date,
  address     text,
  city        text,
  state       text,
  zip         text,
  lat         double precision,
  lng         double precision,
  norm_key    text,                       -- normalized address+city+state
  created_at  timestamptz not null default now()
);

-- one row per (source, ext_key): re-ingesting the same shoot is a no-op / update
create unique index if not exists shoots_source_extkey on shoots (source, ext_key);
create index if not exists shoots_state_idx   on shoots (state);
create index if not exists shoots_date_idx    on shoots (shoot_date);
create index if not exists shoots_geo_idx      on shoots (lat, lng);
create index if not exists shoots_normkey_idx on shoots (norm_key);

-- Structured public website leads. CRM/email delivery can consume this table
-- or be replaced by a provider webhook once the final destination is chosen.
create table if not exists leads (
  id          bigserial primary key,
  kind        text not null,              -- contact | book | brokerage
  name        text,
  email       text,
  phone       text,
  source_path text,
  package     text,
  address     text,
  preferred_date date,
  market      text,
  lead_status text not null default 'new',
  webhook_status text not null default 'not_configured',
  webhook_attempts int not null default 0,
  webhook_last_error text,
  webhook_claimed_at timestamptz,
  webhook_delivered_at timestamptz,
  fields      jsonb not null default '{}'::jsonb,
  user_agent  text,
  ip_address  text,
  created_at  timestamptz not null default now()
);

alter table leads add column if not exists package text;
alter table leads add column if not exists address text;
alter table leads add column if not exists preferred_date date;
alter table leads add column if not exists market text;
alter table leads add column if not exists lead_status text not null default 'new';
alter table leads add column if not exists ip_address text;
alter table leads add column if not exists webhook_status text not null default 'not_configured';
alter table leads add column if not exists webhook_attempts int not null default 0;
alter table leads add column if not exists webhook_last_error text;
alter table leads add column if not exists webhook_claimed_at timestamptz;
alter table leads add column if not exists webhook_delivered_at timestamptz;

create index if not exists leads_kind_idx on leads (kind);
create index if not exists leads_status_idx on leads (lead_status);
create index if not exists leads_webhook_status_idx on leads (webhook_status);
create index if not exists leads_webhook_retry_idx on leads (webhook_status, webhook_attempts, created_at);
create index if not exists leads_created_idx on leads (created_at desc);
