import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { publicCoord, publicCoverageBucketKey } from "./coverage-public.ts";

describe("public coverage coordinates", () => {
  it("generalizes coordinates to two decimals for public map display", () => {
    assert.equal(publicCoord(36.850768), 36.85);
    assert.equal(publicCoord(-76.285873), -76.29);
  });

  it("builds stable public bucket keys from generalized coordinates", () => {
    assert.equal(
      publicCoverageBucketKey({
        lat: 36.850768,
        lng: -76.285873,
        stateIndex: 0,
        year: 2026,
        cityIndex: 12,
      }),
      "36.85|-76.29|0|2026|12"
    );
  });
});
