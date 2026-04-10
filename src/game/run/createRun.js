import { PROGRESSION_CONFIG } from "../../config/progressionConfig.js";

export function createRun({ playerName = "Guest" } = {}) {
  return {
    playerName,
    score: 0,
    level: 1,
    xp: 0,
    xpToNext: PROGRESSION_CONFIG.baseXpToNext,
    boardSize: PROGRESSION_CONFIG.baseGridSize,
    fieldExpansions: 0,
    shardsThisRun: 0,
    bestScoreSnapshot: 0,
    status: "ready",
    rewardsLog: [],
  };
}
