import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { marketPages } from "../site-data.ts";
import { localMarketData } from "./local-market-data.ts";

describe("local market data", () => {
  it("provides a complete local discovery layer for every market page", () => {
    assert.deepEqual(
      Object.keys(localMarketData).sort(),
      marketPages.map((market) => market.slug).sort(),
    );

    for (const market of marketPages) {
      const content = localMarketData[market.slug];
      assert.ok(content, `${market.name} is missing local content`);
      assert.ok(content.coverageAreas.length > 0, `${market.name} needs coverage queries`);
      assert.ok(content.neighborhoods.length >= 4, `${market.name} needs local area depth`);
      assert.ok(content.businesses.length >= 3, `${market.name} needs local businesses`);
      assert.ok(content.representativeListings.length >= 4, `${market.name} needs property profiles`);
      assert.ok(content.faqs.length >= 4, `${market.name} needs local FAQs`);
    }
  });

  it("keeps slugs, links, and representative inventory internally consistent", () => {
    for (const [marketSlug, content] of Object.entries(localMarketData)) {
      const neighborhoodSlugs = content.neighborhoods.map((item) => item.slug);
      assert.equal(
        new Set(neighborhoodSlugs).size,
        neighborhoodSlugs.length,
        `${marketSlug} contains duplicate local area slugs`,
      );

      for (const business of content.businesses) {
        assert.match(business.href, /^https:\/\//, `${business.name} needs an HTTPS URL`);
      }

      for (const listing of content.representativeListings) {
        assert.equal(listing.status, "representative");
        assert.equal(listing.state, content.state);
        assert.equal(listing.publicationAllowed, true);
      }
    }
  });
});
