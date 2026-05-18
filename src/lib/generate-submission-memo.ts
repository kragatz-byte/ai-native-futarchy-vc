import type { StartupSubmission } from "./types";

function tractionSignal(traction: string): string {
  const t = traction.toLowerCase();
  if (/\$|mrr|arr|revenue/.test(t)) {
    return "Early revenue signals strengthen the investment case.";
  }
  if (/user|customer|waitlist|pilot|download/.test(t)) {
    return "User or pilot traction indicates product-market fit exploration is underway.";
  }
  if (/partner|pilot|university|campus|lab/.test(t)) {
    return "Institutional or campus partnerships de-risk go-to-market.";
  }
  return "Traction narrative is early; validate metrics before high-conviction forecasts.";
}

function fundingOutlook(status: StartupSubmission["fundingStatus"]): string {
  const map: Record<StartupSubmission["fundingStatus"], string> = {
    Bootstrapped:
      "Capital-efficient posture; forecasters may weight upside over near-term dilution.",
    "Pre-revenue":
      "Pre-revenue stage — thesis hinges on team, market size, and velocity of learning.",
    "Pre-seed":
      "Typical campus pre-seed profile; align simulated allocation with milestone clarity.",
    Seed: "Seed-stage signals suggest prior investor validation; scrutinize use of proceeds.",
    "Raising now":
      "Active raise — campus pool timing could complement institutional round dynamics.",
  };
  return map[status];
}

function categoryLens(category: StartupSubmission["category"]): string {
  const map: Record<StartupSubmission["category"], string> = {
    AI: "AI category: moat depends on data access, workflow embedding, and inference economics.",
    Climate: "Climate category: impact narrative plus unit economics will drive forecaster sentiment.",
    Health: "Health category: regulatory path and campus distribution are key diligence areas.",
    EdTech: "EdTech category: retention and semester-cycle revenue matter for campus GTM.",
    Fintech: "Fintech category: trust, compliance, and CAC on student segments need scrutiny.",
    Consumer: "Consumer category: growth loops and engagement depth determine forecast confidence.",
  };
  return map[category];
}

export function generateSubmissionMemo(data: StartupSubmission): string {
  const websiteNote = data.website.trim()
    ? `Web presence (${data.website.replace(/^https?:\/\//, "")}) supports credibility for student due diligence.`
    : "No website provided — recommend founders add a landing page before feed promotion.";

  return [
    `**${data.startupName}** — Campus Futarchy VC (simulated memo)`,
    ``,
    `**Founder:** ${data.founderName} (${data.school})`,
    `**Category:** ${data.category} · **Funding status:** ${data.fundingStatus}`,
    ``,
    `**Pitch**`,
    data.shortPitch,
    ``,
    `**Traction**`,
    data.traction,
    ``,
    `**Analysis**`,
    categoryLens(data.category),
    tractionSignal(data.traction),
    fundingOutlook(data.fundingStatus),
    websiteNote,
    ``,
    `**Recommendation (simulated)**`,
    `List on the For You feed for student forecasts. Initial forecast score pending community votes. ` +
      `Founders should prepare metrics updates within 30 days to improve memo confidence.`,
  ].join("\n");
}
