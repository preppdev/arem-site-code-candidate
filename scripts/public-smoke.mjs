const baseUrl = process.env.PUBLIC_SMOKE_BASE_URL ?? "https://platform-site-work.vercel.app";
const maxPages = Number(process.env.PUBLIC_SMOKE_MAX_PAGES ?? 80);

const forbiddenSignals = [
  {
    name: "known-dead Aryeo hostname",
    pattern: /americanrealestatemedia\.aryeo\.com/i,
  },
  {
    name: "staging form copy",
    pattern: /lead capture is configured|submission is unavailable/i,
  },
  {
    name: "known broken legacy proof URL",
    pattern: /matterport-3d-tours|cubi-casa-floor-plans/i,
  },
];

const skippedHrefPrefixes = ["mailto:", "tel:", "#"];
const requiredExternalLinks = [
  "https://media.americanrealestatemedia.com/order",
  "https://media.americanrealestatemedia.com/portal",
];

function bodyHtml(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match?.[1] ?? html;
}

function hrefsFromBody(html) {
  return [...bodyHtml(html).matchAll(/href="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((href) => !skippedHrefPrefixes.some((prefix) => href.startsWith(prefix)));
}

function sameSitePath(href) {
  const url = new URL(href, baseUrl);
  if (url.origin !== new URL(baseUrl).origin) return null;
  url.hash = "";
  return `${url.pathname}${url.search}`;
}

function isInfrastructureUrl(url) {
  if (url.origin !== new URL(baseUrl).origin) return false;
  return ["/_next/", "/api/", "/cdn-cgi/"].some((prefix) =>
    url.pathname.startsWith(prefix),
  );
}

async function fetchOk(url) {
  const response = await fetch(url, { redirect: "follow" });
  return { status: response.status, url: response.url, ok: response.status < 400 };
}

const queue = ["/"];
const seenPages = new Set();
const externalLinks = new Set();
const failures = [];

while (queue.length > 0 && seenPages.size < maxPages) {
  const path = queue.shift();
  if (!path || seenPages.has(path)) continue;
  seenPages.add(path);

  const pageUrl = new URL(path, baseUrl).href;
  const response = await fetch(pageUrl, { redirect: "follow" });
  if (response.status >= 400) {
    failures.push(`Page ${path} returned ${response.status}`);
    continue;
  }

  const html = await response.text();
  const body = bodyHtml(html);
  for (const signal of forbiddenSignals) {
    if (signal.pattern.test(body)) {
      failures.push(`Page ${path} contains ${signal.name}`);
    }
  }

  for (const href of hrefsFromBody(html)) {
    const url = new URL(href, pageUrl);
    if (isInfrastructureUrl(url)) continue;
    const internalPath = sameSitePath(url.href);
    if (internalPath) {
      if (!seenPages.has(internalPath) && !queue.includes(internalPath)) {
        queue.push(internalPath);
      }
    } else {
      externalLinks.add(url.href.split("#")[0]);
    }
  }
}

for (const url of externalLinks) {
  const result = await fetchOk(url);
  if (!result.ok) {
    failures.push(`External link ${url} returned ${result.status} (${result.url})`);
  }
}

for (const url of requiredExternalLinks) {
  if (!externalLinks.has(url)) {
    failures.push(`Required external link ${url} was not found`);
  }
}

const summary = {
  baseUrl,
  pagesChecked: seenPages.size,
  externalLinksChecked: externalLinks.size,
  failures,
};

console.log(JSON.stringify(summary, null, 2));

if (failures.length > 0) {
  process.exitCode = 1;
}
