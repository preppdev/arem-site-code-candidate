import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { recommendPackage, type RecommendationInput } from "./recommend.ts";

const baseInput: RecommendationInput = {
  situation: "Standard resale",
  priority: "Full photo coverage",
  priceBand: "Mid-market",
  occupancy: "Occupied",
  deadline: "This week",
  sellerPressure: "Medium",
  squareFootage: "Under 2,000",
  market: "Hampton Roads core",
};

describe("recommendPackage", () => {
  it("keeps straightforward full-coverage resale listings on Quick & Easy", () => {
    const result = recommendPackage(baseInput);

    assert.equal(result.name, "Quick & Easy");
    assert.equal(result.scopeLevel, "Routine starting point");
  });

  it("moves immersive relocation listings to Perfect Marketing", () => {
    const result = recommendPackage({
      ...baseInput,
      situation: "Relocation buyer",
      priority: "Immersive tour",
      priceBand: "Premium",
    });

    assert.equal(result.name, "Perfect Marketing");
    assert.match(result.reasons.join(" "), /immersive|relocation/i);
  });

  it("flags large travel-sensitive rush orders for scope confirmation", () => {
    const result = recommendPackage({
      ...baseInput,
      priority: "Video and drone",
      deadline: "Rush / urgent",
      squareFootage: "3,500+",
      market: "OBX / travel-sensitive",
    });

    assert.equal(result.name, "Property Spotlight");
    assert.equal(result.scopeLevel, "Confirm scope before booking");
    assert.match(result.scopeNotes.join(" "), /larger homes|travel/i);
  });

  it("keeps low-pressure lowest-cost orders on Value Listing", () => {
    const result = recommendPackage({
      ...baseInput,
      priority: "Lowest cost",
      sellerPressure: "Low",
    });

    assert.equal(result.name, "Value Listing");
  });
});
