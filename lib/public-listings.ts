export type PublicListingStatus = "for_sale";

export type PublicListing = {
  id: string;
  slug: string;
  status: PublicListingStatus | "representative";
  title: string;
  neighborhood: string;
  propertyType: string;
  city: string;
  state: string;
  price: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  livingAreaSqft: number | null;
  heroImage: string;
  heroAlt: string;
  href: string | null;
  media: string[];
  updatedAt: string;
  publicationAllowed: boolean;
};

export type PublicListingFeedRecord = Partial<PublicListing> & {
  listingStatus?: string;
  lastCheckedAt?: string;
};

export type PublicListingFeed = {
  connected: boolean;
  updatedAt: string | null;
  listings: PublicListing[];
};

const MAX_LISTING_AGE_MS = 72 * 60 * 60 * 1000;

function isFresh(value: string | undefined, now: number) {
  if (!value) return false;
  const checkedAt = Date.parse(value);
  return Number.isFinite(checkedAt) && now - checkedAt <= MAX_LISTING_AGE_MS;
}

function isPublicListing(
  value: PublicListingFeedRecord,
  city: string,
  now: number,
): value is PublicListing {
  return Boolean(
    value.id &&
      value.slug &&
      value.title &&
      value.neighborhood &&
      value.propertyType &&
      value.heroImage &&
      value.heroAlt &&
      value.updatedAt &&
      value.publicationAllowed === true &&
      value.listingStatus?.toLowerCase() === "for_sale" &&
      value.status === "for_sale" &&
      value.city?.toLowerCase() === city.toLowerCase() &&
      value.state === "VA" &&
      isFresh(value.lastCheckedAt, now),
  );
}

export function filterPublicListings(
  listings: PublicListingFeedRecord[],
  city: string,
  now = Date.now(),
) {
  return listings.filter((listing) => isPublicListing(listing, city, now));
}

export async function getPublicListings(city: string): Promise<PublicListingFeed> {
  const endpoint = process.env.AREM_PUBLIC_LISTINGS_FEED_URL;
  if (!endpoint) return { connected: false, updatedAt: null, listings: [] };

  try {
    const url = new URL(endpoint);
    url.searchParams.set("city", city);
    url.searchParams.set("status", "for_sale");

    const token = process.env.AREM_PUBLIC_LISTINGS_FEED_TOKEN;
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      next: { revalidate: 900 },
    });
    if (!response.ok) return { connected: false, updatedAt: null, listings: [] };

    const payload = (await response.json()) as {
      updatedAt?: string;
      listings?: PublicListingFeedRecord[];
    };
    const listings = filterPublicListings(payload.listings ?? [], city).slice(0, 12);

    return {
      connected: true,
      updatedAt: payload.updatedAt ?? listings[0]?.updatedAt ?? null,
      listings,
    };
  } catch {
    return { connected: false, updatedAt: null, listings: [] };
  }
}
