import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  filterPublicListings,
  type PublicListingFeedRecord,
} from "./public-listings.ts";

const now = Date.parse("2026-07-10T12:00:00.000Z");
const valid: PublicListingFeedRecord = {
  id: "listing-1",
  slug: "listing-1",
  status: "for_sale",
  listingStatus: "FOR_SALE",
  title: "Publication-approved listing",
  neighborhood: "Great Bridge",
  propertyType: "Waterfront",
  city: "Chesapeake",
  state: "VA",
  price: 500000,
  bedrooms: 4,
  bathrooms: 3,
  livingAreaSqft: 2800,
  heroImage: "https://example.com/image.jpg",
  heroAlt: "Exterior of the property",
  href: "https://example.com/property",
  media: ["Photography"],
  updatedAt: "2026-07-10T10:00:00.000Z",
  lastCheckedAt: "2026-07-10T10:00:00.000Z",
  publicationAllowed: true,
};

describe("filterPublicListings", () => {
  it("keeps only fresh, approved, for-sale records in the requested city", () => {
    const result = filterPublicListings([valid], "Chesapeake", now);
    assert.equal(result.length, 1);
    assert.equal(result[0].id, "listing-1");
  });

  it("rejects stale, unapproved, pending, and wrong-city records", () => {
    const records: PublicListingFeedRecord[] = [
      { ...valid, id: "stale", lastCheckedAt: "2026-07-06T10:00:00.000Z" },
      { ...valid, id: "private", publicationAllowed: false },
      { ...valid, id: "pending", status: undefined, listingStatus: "PENDING" },
      { ...valid, id: "norfolk", city: "Norfolk" },
    ];

    assert.deepEqual(filterPublicListings(records, "Chesapeake", now), []);
  });
});
