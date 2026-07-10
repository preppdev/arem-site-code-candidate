export const packageOrder = [
  "Value Listing",
  "Quick & Easy",
  "Property Spotlight",
  "Perfect Marketing",
] as const;

export type RecommendationInput = {
  situation: string;
  priority: string;
  priceBand: string;
  occupancy: string;
  deadline: string;
  sellerPressure: string;
  squareFootage: string;
  market: string;
};

function clampIndex(index: number) {
  return Math.max(0, Math.min(packageOrder.length - 1, index));
}

export function recommendPackage({
  situation,
  priority,
  priceBand,
  occupancy,
  deadline,
  sellerPressure,
  squareFootage,
  market,
}: RecommendationInput) {
  let score = 1;
  let scopeScore = 0;
  const reasons: string[] = [];
  const scopeNotes: string[] = [];

  if (priority === "Lowest cost") {
    score = 0;
    reasons.push("lowest-cost priority keeps the starting recommendation lean");
  }
  if (priority === "Full photo coverage") {
    score = Math.max(score, 1);
    reasons.push("full photo coverage points to the standard listing package");
  }
  if (priority === "Video and drone") {
    score = Math.max(score, 2);
    reasons.push("video and drone needs move the plan into Property Spotlight");
  }
  if (priority === "Immersive tour") {
    score = Math.max(score, 3);
    reasons.push("immersive tour needs point to Perfect Marketing");
  }

  if (situation === "Seller presentation") {
    score = Math.max(score, 2);
    reasons.push("seller-presentation pressure benefits from video, aerial, and twilight proof");
  }
  if (situation === "Luxury / waterfront") {
    score = Math.max(score, 2);
    reasons.push("luxury, waterfront, or location-driven listings need stronger exterior/context media");
  }
  if (situation === "Relocation buyer") {
    score = Math.max(score, 3);
    reasons.push("relocation buyers benefit from Matterport and immersive review");
  }
  if (situation === "Vacant listing") {
    score = Math.max(score, 1);
    reasons.push("vacancy may require virtual staging or advanced edits as add-ons");
  }

  if (priceBand === "Premium") {
    score = Math.max(score, 2);
    reasons.push("premium listings usually deserve a stronger launch package");
  }
  if (squareFootage === "2,000-3,500") {
    scopeScore += 1;
    scopeNotes.push("mid-size homes may affect photo count and appointment time");
  }
  if (squareFootage === "3,500+") {
    score = Math.max(score, 2);
    scopeScore += 3;
    scopeNotes.push("larger homes should confirm final scope, media count, and appointment timing");
  }
  if (occupancy === "Vacant") {
    scopeScore += 1;
    reasons.push("vacancy may require virtual staging or advanced edits as add-ons");
    scopeNotes.push("vacant spaces may need staging or extra editing decisions");
  }
  if (occupancy === "New construction") {
    score = Math.max(score, 2);
    scopeScore += 1;
    reasons.push("new construction often benefits from drone and seller-facing media");
  }
  if (deadline === "Rush / urgent") {
    scopeScore += 2;
    reasons.push("rush timing should be confirmed before booking so specialty media does not miss launch");
    scopeNotes.push("rush timing should be confirmed before relying on a launch deadline");
  }
  if (market !== "Hampton Roads core") {
    scopeScore += market === "Edenton / corridor edge" ? 2 : 1;
    scopeNotes.push(`${market} orders should confirm service area, travel timing, and any travel terms`);
  }
  if (sellerPressure === "High") {
    score = Math.max(score, 2);
    reasons.push("high listing-appointment pressure favors a more complete presentation package");
  }
  if (sellerPressure === "Low" && priority === "Lowest cost") {
    score = Math.min(score, 0);
  }

  const name = packageOrder[clampIndex(score)];
  const scopeLevel =
    scopeScore >= 3
      ? "Confirm scope before booking"
      : scopeScore >= 1
        ? "Standard with details to confirm"
        : "Routine starting point";
  return {
    name,
    reasons: reasons.slice(0, 4),
    scopeLevel,
    scopeNotes: scopeNotes.slice(0, 4),
  };
}
