import { ECONOMY_CONFIG } from "../../config/economyConfig.js";

export function computeShardRewards({ score, isNewRecord, totalValue }) {
  let shards = 0;
  const reasons = [];

  ECONOMY_CONFIG.scoreRewardThresholds.forEach((threshold, index) => {
    if (score >= threshold) {
      shards += ECONOMY_CONFIG.scoreRewardValues[index] ?? 0;
      reasons.push(`Score threshold ${threshold}`);
    }
  });

  if (isNewRecord) {
    shards += ECONOMY_CONFIG.newRecordRewardBase;
    reasons.push("New record bonus");
  }

  const valueBonus = Math.floor(totalValue * ECONOMY_CONFIG.runValueMultiplier);
  if (valueBonus > 0) {
    shards += valueBonus;
    reasons.push("Total run value bonus");
  }

  return { shards, reasons };
}
