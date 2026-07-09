import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  allowedLeadKinds,
  cleanLeadFields,
  getMissingLeadFields,
  isValidLeadEmail,
  maxLeadFieldLength,
  parseLeadWebhookUrl,
  parseLeadDate,
  stringField,
} from "./validation.ts";

describe("lead validation", () => {
  it("allows contact, book, and brokerage lead kinds", () => {
    assert.equal(allowedLeadKinds.has("contact"), true);
    assert.equal(allowedLeadKinds.has("book"), true);
    assert.equal(allowedLeadKinds.has("brokerage"), true);
    assert.equal(allowedLeadKinds.has("bad"), false);
  });

  it("validates email shape", () => {
    assert.equal(isValidLeadEmail("jane@example.com"), true);
    assert.equal(isValidLeadEmail("not-an-email"), false);
    assert.equal(isValidLeadEmail(null), false);
  });

  it("cleans fields and bounds values", () => {
    const cleaned = cleanLeadFields({
      name: " Jane Agent ",
      ignored: 123,
      notes: "x".repeat(maxLeadFieldLength + 10),
    });

    assert.equal(stringField(cleaned, "name"), "Jane Agent");
    assert.equal(cleaned.ignored, undefined);
    assert.equal(cleaned.notes.length, maxLeadFieldLength);
  });

  it("accepts only simple ISO dates", () => {
    assert.equal(parseLeadDate("2026-08-10"), "2026-08-10");
    assert.equal(parseLeadDate("08/10/2026"), null);
    assert.equal(parseLeadDate(null), null);
  });

  it("accepts only HTTP webhook URLs", () => {
    assert.equal(parseLeadWebhookUrl("https://hooks.example.com/lead")?.href, "https://hooks.example.com/lead");
    assert.equal(parseLeadWebhookUrl("http://localhost:3000/lead")?.href, "http://localhost:3000/lead");
    assert.equal(parseLeadWebhookUrl("mailto:team@example.com"), null);
    assert.equal(parseLeadWebhookUrl("not a url"), null);
    assert.equal(parseLeadWebhookUrl(undefined), null);
  });

  it("requires operational fields for book leads", () => {
    assert.deepEqual(
      getMissingLeadFields("book", {
        name: "Jane Agent",
        email: "jane@example.com",
      }),
      ["phone", "package", "address", "date"]
    );

    assert.deepEqual(
      getMissingLeadFields("book", {
        name: "Jane Agent",
        email: "jane@example.com",
        phone: "(757) 555-0123",
        package: "Quick & Easy",
        address: "123 Shoreline Dr",
        date: "2026-08-10",
      }),
      []
    );
  });

  it("requires routing fields for brokerage leads", () => {
    assert.deepEqual(
      getMissingLeadFields("brokerage", {
        name: "Jane Manager",
        email: "jane@example.com",
      }),
      ["phone", "role", "brokerage"]
    );
  });
});
