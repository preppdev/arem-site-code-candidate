import test from "node:test";
import assert from "node:assert/strict";
import {
  isLeadWebhookRetryCandidate,
  maxLeadWebhookAttempts,
  staleLeadWebhookClaimMinutes,
} from "./retry-policy.ts";

const now = new Date("2026-07-09T12:00:00.000Z");

test("lead webhook retry policy", async (t) => {
  await t.test("retries failed and invalid URL rows under the attempt cap", () => {
    assert.equal(
      isLeadWebhookRetryCandidate(
        { webhook_status: "failed", webhook_attempts: maxLeadWebhookAttempts - 1 },
        now
      ),
      true
    );
    assert.equal(
      isLeadWebhookRetryCandidate(
        { webhook_status: "invalid_url", webhook_attempts: 0 },
        now
      ),
      true
    );
  });

  await t.test("does not retry delivered rows or rows at the attempt cap", () => {
    assert.equal(
      isLeadWebhookRetryCandidate(
        { webhook_status: "delivered", webhook_attempts: 0 },
        now
      ),
      false
    );
    assert.equal(
      isLeadWebhookRetryCandidate(
        { webhook_status: "failed", webhook_attempts: maxLeadWebhookAttempts },
        now
      ),
      false
    );
  });

  await t.test("recovers only stale retrying claims", () => {
    assert.equal(
      isLeadWebhookRetryCandidate(
        {
          webhook_status: "retrying",
          webhook_attempts: 1,
          webhook_claimed_at: new Date(now.getTime() - (staleLeadWebhookClaimMinutes + 1) * 60 * 1000),
        },
        now
      ),
      true
    );
    assert.equal(
      isLeadWebhookRetryCandidate(
        {
          webhook_status: "retrying",
          webhook_attempts: 1,
          webhook_claimed_at: new Date(now.getTime() - 5 * 60 * 1000),
        },
        now
      ),
      false
    );
  });
});
