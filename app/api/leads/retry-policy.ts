export const maxLeadWebhookAttempts = 5;
export const staleLeadWebhookClaimMinutes = 15;

export type LeadWebhookRetryState = {
  webhook_status: string;
  webhook_attempts: number;
  webhook_claimed_at?: Date | string | null;
};

export function isLeadWebhookRetryCandidate(
  row: LeadWebhookRetryState,
  now = new Date()
) {
  if (row.webhook_attempts >= maxLeadWebhookAttempts) return false;
  if (row.webhook_status === "failed" || row.webhook_status === "invalid_url") {
    return true;
  }
  if (row.webhook_status !== "retrying" || !row.webhook_claimed_at) return false;

  const claimedAt =
    row.webhook_claimed_at instanceof Date
      ? row.webhook_claimed_at
      : new Date(row.webhook_claimed_at);
  if (Number.isNaN(claimedAt.getTime())) return false;

  const staleAfterMs = staleLeadWebhookClaimMinutes * 60 * 1000;
  return now.getTime() - claimedAt.getTime() > staleAfterMs;
}
