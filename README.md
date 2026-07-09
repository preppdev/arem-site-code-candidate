This is the American Real Estate Media public-site prototype, built with
[Next.js](https://nextjs.org).

## Environment

Optional production environment variables:

- `DATABASE_URL`: enables `/api/leads`, `/api/shoots/ingest`, and coverage data backed by Neon/Postgres.
- `LEAD_WEBHOOK_URL`: optional POST destination for every accepted lead after DB persistence.
- `LEAD_WEBHOOK_SECRET`: optional bearer token sent to `LEAD_WEBHOOK_URL`.
- `LEAD_RETRY_TOKEN`: bearer token for `POST /api/leads/retry`, which replays failed webhook deliveries.
- `INGEST_TOKEN`: protects `/api/shoots/ingest`.

Run `db/schema.sql` against the production database before enabling first-party
lead capture.

### Lead Delivery Operations

Accepted leads are persisted before webhook forwarding. Webhook payloads include
`leadId`, so the downstream CRM or automation tool should treat that value as an
idempotency key.

Recommended production setup:

1. Set `DATABASE_URL`, `LEAD_WEBHOOK_URL`, and `LEAD_WEBHOOK_SECRET`.
2. Set `LEAD_RETRY_TOKEN` and schedule a protected `POST /api/leads/retry`
   request every 5-15 minutes from Vercel Cron or another trusted scheduler.
3. Alert on repeated `failed`, `invalid_url`, or stale `retrying` lead rows.

Retry behavior:

- Failed and invalid webhook deliveries are retried up to 5 total attempts.
- Rows claimed by a retry worker are marked `retrying` and can be recovered if
  the claim is older than 15 minutes.
- Concurrent retry calls claim rows with `FOR UPDATE SKIP LOCKED`.
- Delivered rows keep `webhook_delivered_at` and are not retried.

## Getting Started

## Launch Smoke Test

Run a public link/copy audit against the deployed site:

```bash
npm run test:public
```

Set `PUBLIC_SMOKE_BASE_URL` to check another deployment:

```bash
PUBLIC_SMOKE_BASE_URL=https://your-preview.vercel.app npm run test:public
```

The smoke test crawls clickable body links, checks external link status, and
fails on known launch-blocker copy such as broken booking/proof references or
staging form language.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
